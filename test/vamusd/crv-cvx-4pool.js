'use strict'

const { prepareConfig } = require('./config')
const { shouldBehaveLikePool } = require('../behavior/vesper-pool')
const { shouldBehaveLikeStrategy } = require('../behavior/strategy')
const { strategyConfig } = require('../utils/chains').getChainData()

describe('vMUSD Pool with Convex4PoolStrategy', function () {
  const strategy1 = strategyConfig.Convex4PoolStrategyMUSDPoolMUSD
  strategy1.config.debtRatio = 10000
  const strategies = [strategy1]
  prepareConfig(strategies)

  describe('Pool Tests', function () {
    shouldBehaveLikePool('vMUSD', 'MUSD')
  })

  describe('Strategy Tests', function () {
    shouldBehaveLikeStrategy(0, strategies[0].type, strategies[0].contract)
  })
})
