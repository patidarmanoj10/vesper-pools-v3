'use strict'

const {expect} = require('chai')
const {getUsers} = require('../utils/setupHelper')
const {deposit} = require('../utils/poolOps')
const time = require('../utils/time')
const {constants} = require('@openzeppelin/test-helpers')
let ANY_ERC20 = require('../../helper/ethereum/address').ANY_ERC20
if (process.env.CHAIN === 'polygon') {
  ANY_ERC20 =require('../../helper/polygon/address').ANY_ERC20
}

const aaveLendingPoolAddressesProvider = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'

// Aave strategy specific tests
function shouldBehaveLikeAaveStrategy(strategyIndex) {
  let strategy, owner, user1, user2
  let pool, token, collateralToken

  describe('AaveStrategy specific tests', function () {
    beforeEach(async function () {
      const users = await getUsers()
      ;[owner, user1, user2] = users
      strategy = this.strategies[strategyIndex].instance
      token = this.strategies[strategyIndex].token
      pool = this.pool
      collateralToken = this.collateralToken
    })

    it('Should increase totalValue due to aave rewards', async function () {
      await deposit(pool, collateralToken, 10, user2)
      await strategy.rebalance()
      const totalValueBefore = await strategy.totalValue()
      const aTokenBefore = await token.balanceOf(strategy.address)
      expect(totalValueBefore).to.be.eq(aTokenBefore, 'Total value should be = aToken balance')
      // Time travel to earn some aave rewards
      await time.increase(5 * 24 * 60 * 60)
      const totalValueAfter = await strategy.totalValue()
      const aTokenAfter = await token.balanceOf(strategy.address)
      expect(aTokenAfter).to.be.gt(aTokenBefore, 'aToken balance after should be > aToken balance before')
      expect(totalValueAfter).to.be.gt(aTokenAfter, 'total value should be > aToken balance after')
    })

    it('Should revert when Cooldown started from non keeper user', async function () {
      await expect(strategy.connect(user2.signer).startCooldown()).to.be.revertedWith('caller-is-not-a-keeper')
    })

    it('Should start Cooldown when called from keeper user', async function () {
      await strategy.addKeeper(user1.address)
      await expect(strategy.connect(user1.signer).startCooldown()).to.not.reverted
    })

    it('Should revert when update address provider is called from non governor', async function () {
      await expect(strategy.connect(user1.signer).updateAddressesProvider(ANY_ERC20)).to.be.revertedWith(
        'caller-is-not-the-governor'
      )
      await expect(strategy.connect(owner.signer).updateAddressesProvider(ANY_ERC20)).to.be.reverted
    })

    it('Should revert when provider address is not correct', async function () {
      await expect(strategy.connect(owner.signer).updateAddressesProvider(ANY_ERC20)).to.be.reverted
      await expect(strategy.connect(owner.signer).updateAddressesProvider(constants.ZERO_ADDRESS)).to.be.revertedWith(
        'provider-address-is-zero'
      )
    })

    it('Should revert when provider address is same', async function () {
      const currentProviderAddress = await strategy.aaveAddressesProvider()
      await expect(strategy.connect(owner.signer).updateAddressesProvider(currentProviderAddress)).to.be.revertedWith(
        'same-addresses-provider'
      )
      await expect(
        strategy.connect(owner.signer).updateAddressesProvider(aaveLendingPoolAddressesProvider)
      ).to.be.revertedWith('same-addresses-provider')
    })
  })
}

module.exports = {shouldBehaveLikeAaveStrategy}
