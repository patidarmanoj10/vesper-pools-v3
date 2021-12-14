'use strict'

const { ethers } = require('hardhat')
const Address = require('./address')
const StrategyTypes = require('../../test/utils/strategyTypes')

const swapManager = Address.SWAP_MANAGER
const interestFee = '1500' // 15%
const config = { interestFee, debtRatio: 0, debtRate: ethers.utils.parseEther('1000000').toString() }
const setup = {
  addressListFactory: Address.ADDRESS_LIST_FACTORY,
  feeCollector: Address.FEE_COLLECTOR,
  keepers: [Address.KEEPER],
}

// TODO update setup to remove strategy type, once done remove type from heres too
const StrategyConfig = {
  AaveStrategyAvalancheDAI: {
    contract: 'AaveStrategyAvalanche',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.avDAI,
      strategyName: 'AaveStrategyAvalancheDAI',
    },
    config: { ...config }, // Shallow copy
    setup: { ...setup },
  },
}

module.exports = Object.freeze(StrategyConfig)
