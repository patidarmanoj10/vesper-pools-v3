'use strict'

const { expect } = require('chai')
const { ethers } = require('hardhat')
const { getUsers, deployContract, createStrategy } = require('./utils/setupHelper')
const { address, poolConfig, strategyConfig } = require('./utils/chains').getChainData()
const VDAI = poolConfig.VDAI
const AaveStrategyDAI = strategyConfig.AaveStrategyDAI
const MULTICALL = address.MULTICALL
describe('Pool accountant proxy', function () {
  let pool, strategy, poolAccountant, poolAccountantImpl
  let governor, user1
  let proxyAdmin, proxy

  AaveStrategyDAI.config.debtRatio = 9000

  beforeEach(async function () {
    const users = await getUsers()
    ;[governor, user1] = users

    pool = await deployContract(VDAI.contractName, VDAI.poolParams)

    // Deploy pool accountant implementation
    poolAccountantImpl = await deployContract('PoolAccountant', [])
    // Deploy proxy admin
    proxyAdmin = await deployContract('ProxyAdmin', [])
    const initData = poolAccountantImpl.interface.encodeFunctionData('init', [pool.address])
    // Deploy proxy with logic implementation
    proxy = await deployContract('TransparentUpgradeableProxy', [
      poolAccountantImpl.address,
      proxyAdmin.address,
      initData,
    ])
    // Get implementation from proxy
    poolAccountant = await ethers.getContractAt('PoolAccountant', proxy.address)

    AaveStrategyDAI.feeCollector = user1.address
    strategy = await createStrategy(AaveStrategyDAI, pool.address)

    await poolAccountant.connect(governor.signer).addStrategy(strategy.address, 1000, 1000, 1000, 0)
  })

  describe('Update proxy implementation', function () {
    let proxyAddress

    beforeEach(async function () {
      // Deploy new implementation
      poolAccountantImpl = await deployContract('PoolAccountant', [])

      proxyAddress = poolAccountant.address
    })

    it('Should upgrade in proxy directly', async function () {
      const strategiesBefore = await poolAccountant.getStrategies()

      // Upgrade proxy to point to new implementation
      await proxyAdmin.connect(governor.signer).upgrade(proxy.address, poolAccountantImpl.address)
      poolAccountant = await ethers.getContractAt('PoolAccountant', proxy.address)

      expect(poolAccountant.address === proxyAddress, 'Pool accountant proxy address should be same').to.be.true
      const strategiesAfter = await poolAccountant.getStrategies()
      expect(strategiesAfter[0]).to.be.eq(
        strategiesBefore[0],
        'Strategies after proxy upgrade should be same as before',
      )
    })

    describe('Upgrader', function () {
      let upgrader

      beforeEach(async function () {
        // Deploy upgrader
        upgrader = await deployContract('PoolAccountantUpgrader', [MULTICALL])

        // Transfer proxy ownership to the upgrader
        await proxyAdmin.connect(governor.signer).changeProxyAdmin(proxy.address, upgrader.address)
      })

      it('Should upgrade in proxy via upgrader', async function () {
        // Trigger upgrade
        await upgrader.connect(governor.signer).safeUpgrade(proxy.address, poolAccountantImpl.address)

        poolAccountant = await ethers.getContractAt('PoolAccountant', proxy.address)
        expect(poolAccountant.address === proxyAddress, 'Pool accountant proxy address should be same').to.be.true
      })

      it('Should properly revert wrong upgrades via upgrader', async function () {
        // Trigger upgrade
        await expect(upgrader.connect(governor.signer).safeUpgrade(proxy.address, MULTICALL)).to.be.reverted
      })
    })
  })
})
