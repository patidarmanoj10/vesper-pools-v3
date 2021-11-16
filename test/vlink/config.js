'use strict'

const { getUsers, setupVPool } = require('../utils/setupHelper')
const StrategyType = require('../utils/strategyTypes')
const PoolConfig = require('../../helper/mainnet/poolConfig')
const { ethers } = require('hardhat')
const ONE_MILLION = ethers.utils.parseEther('1000000')

function prepareConfig(_strategies) {
  const interestFee = '1500' // 15%
  const strategies = _strategies || [
    {
      name: 'AlphaLendStrategyLINK',
      type: StrategyType.ALPHA_LEND,
      config: { interestFee, debtRatio: 9000, debtRate: ONE_MILLION },
    },
    {
      name: 'AlphaLendStrategyLINK',
      type: StrategyType.ALPHA_LEND,
      config: { interestFee, debtRatio: 0, debtRate: ONE_MILLION },
    },
  ]
  beforeEach(async function () {
    const users = await getUsers()
    this.users = users
    await setupVPool(this, {
      poolConfig: PoolConfig.VLINK,
      feeCollector: users[7].address,
      strategies: strategies.map((item, i) => ({
        ...item,
        feeCollector: users[i + 8].address, // leave first 8 users for other testing
      })),
    })
  })
  return strategies
}

module.exports = { prepareConfig }
