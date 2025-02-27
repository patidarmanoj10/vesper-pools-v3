'use strict'

const { ethers } = require('hardhat')
const Address = require('./address')
const StrategyTypes = require('../../test/utils/strategyTypes')

const swapManager = Address.SWAP_MANAGER
const interestFee = 2000 // 20%
const config = {
  interestFee,
  debtRatio: 0,
  debtRate: ethers.utils.parseEther('1000000').toString(),
  externalDepositFee: 0,
}

const setup = {
  feeCollector: Address.FEE_COLLECTOR,
  keepers: [Address.KEEPER],
}
// Maker related strategies will have to add more setup config.
// For example const maker = { gemJoin: Address.MCD_JOIN_ETH_A, highWater: 275, lowWater: 250 }

// TODO update setup to remove strategy type, once done remove type from heres too
const StrategyConfig = {
  AaveStrategyDAI: {
    contract: 'AaveStrategy',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aDAI,
      strategyName: 'AaveStrategyDAI',
    },
    config: { ...config }, // Shallow copy
    setup: { ...setup },
  },

  AaveStrategyDPI: {
    contract: 'AaveStrategy',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aDPI,
      strategyName: 'AaveStrategyDPI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AaveStrategyFEI: {
    contract: 'AaveStrategy',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aFEI,
      strategyName: 'AaveStrategyFEI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AaveStrategyLINK: {
    contract: 'AaveStrategy',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aLINK,
      strategyName: 'AaveStrategyLINK',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AaveStrategyUNI: {
    contract: 'AaveStrategy',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aUNI,
      strategyName: 'AaveStrategyUNI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AaveStrategyUSDC: {
    contract: 'AaveStrategy',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aUSDC,
      strategyName: 'AaveStrategyUSDC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  AaveStrategyUSDT: {
    contract: 'AaveStrategy',
    type: StrategyTypes.AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aUSDT,
      strategyName: 'AaveStrategyUSDT',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  // Aave V1 strategy
  AaveV1StrategyUSDC: {
    contract: 'AaveV1Strategy',
    type: StrategyTypes.AAVE_V1,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aUSDCv1,
      strategyName: 'AaveV1StrategyUSDC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },
  EarnVesperStrategyDAIVSPDAI: {
    contract: 'EarnVesperStrategyVSPDrip',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.VDAI,
      dripToken: Address.VSP,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAIVSP',
    },
    config: { ...config },
    setup: { ...setup },
  },
  EarnAaveStrategyWETH: {
    contract: 'EarnAaveStrategy',
    type: StrategyTypes.EARN_AAVE,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aWETH,
      dripToken: Address.DAI,
      strategyName: 'EarnAaveStrategyWETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundStrategyDAI: {
    contract: 'CompoundStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cDAI,
      strategyName: 'CompoundStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundStrategyLINK: {
    contract: 'CompoundStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cLINK,
      strategyName: 'CompoundStrategyLINK',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundStrategyETH: {
    contract: 'CompoundStrategyETH',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cETH,
      strategyName: 'CompoundStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundStrategyUNI: {
    contract: 'CompoundStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cUNI,
      strategyName: 'CompoundStrategyUNI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundStrategyUSDC: {
    contract: 'CompoundStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cUSDC,
      strategyName: 'CompoundStrategyUSDC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  CompoundStrategyUSDT: {
    contract: 'CompoundStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cUSDT,
      strategyName: 'CompoundStrategyUSDT',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  CompoundStrategyWBTC: {
    contract: 'CompoundStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cWBTC,
      strategyName: 'CompoundStrategyWBTC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 8).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  InverseCompoundStrategyETH: {
    contract: 'CompoundStrategyETH',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Inverse.COMPTROLLER,
      rewardToken: Address.Inverse.INV,
      receiptToken: Address.Inverse.anETH,
      strategyName: 'InverseCompoundStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  InverseCompoundLeverageStrategyETH: {
    contract: 'CompoundLeverageStrategyETH',
    type: StrategyTypes.COMPOUND_LEVERAGE,
    constructorArgs: {
      swapManager,
      comptroller: Address.Inverse.COMPTROLLER,
      rewardDistributor: Address.Inverse.COMPTROLLER,
      rewardToken: Address.Inverse.INV,
      aaveAddressProvider: Address.Aave.AddressProvider,
      receiptToken: Address.Inverse.anETH,
      strategyName: 'InverseCompoundLeverageStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  DropsCompoundStrategyETH: {
    contract: 'CompoundStrategyETH',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Drops.COMPTROLLER,
      rewardToken: Address.Drops.DOP,
      receiptToken: Address.Drops.dETH,
      strategyName: 'DropsCompoundStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnCompoundStrategyETH: {
    contract: 'EarnCompoundStrategyETH',
    type: StrategyTypes.EARN_COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cETH,
      dripToken: Address.DAI,
      strategyName: 'EarnCompoundStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnCompoundStrategyWBTC: {
    contract: 'EarnCompoundStrategy',
    type: StrategyTypes.EARN_COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cWBTC,
      dripToken: Address.DAI,
      name: 'EarnCompoundStrategyWBTC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 8).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  CompoundCoverageStrategyDAI: {
    contract: 'CompoundCoverageStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cDAI,
      strategyName: 'CompoundCoverageStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundStableStrategyDAI: {
    contract: 'CompoundStableStrategy',
    type: StrategyTypes.COMPOUND,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cDAI,
      strategyName: 'CompoundStableStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundLeverageStrategyETH: {
    contract: 'CompoundLeverageStrategyETH',
    type: StrategyTypes.COMPOUND_LEVERAGE,
    constructorArgs: {
      swapManager,
      rewardDistributor: Address.Compound.COMPTROLLER,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      aaveAddressProvider: Address.Aave.AddressProvider,
      receiptToken: Address.Compound.cETH,
      strategyName: 'CompoundLeverageStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundLeverageStrategyUNI: {
    contract: 'CompoundLeverageStrategyUNI',
    type: StrategyTypes.COMPOUND_LEVERAGE,
    constructorArgs: {
      swapManager,
      rewardDistributor: Address.Compound.COMPTROLLER,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      aaveAddressProvider: Address.Aave.AddressProvider,
      receiptToken: Address.Compound.cUNI,
      strategyName: 'CompoundLeverageStrategyUNI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundLeverageStrategyLINK: {
    contract: 'CompoundLeverageStrategyLINK',
    type: StrategyTypes.COMPOUND_LEVERAGE,
    constructorArgs: {
      swapManager,
      rewardDistributor: Address.Compound.COMPTROLLER,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      aaveAddressProvider: Address.Aave.AddressProvider,
      receiptToken: Address.Compound.cLINK,
      strategyName: 'CompoundLeverageStrategyLINK',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundLeverageStrategyWBTC: {
    contract: 'CompoundLeverageStrategy',
    type: StrategyTypes.COMPOUND_LEVERAGE,
    constructorArgs: {
      swapManager,
      rewardDistributor: Address.Compound.COMPTROLLER,
      comptroller: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      aaveAddressProvider: Address.Aave.AddressProvider,
      receiptToken: Address.Compound.cWBTC,
      strategyName: 'CompoundLeverageStrategyWBTC',
    },
    config: { ...config },
    setup: { ...setup },
  },

  CompoundXYStrategyETH: {
    contract: 'CompoundXYStrategyETH',
    type: StrategyTypes.COMPOUND_XY,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardDistributor: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cETH,
      borrowCToken: Address.Compound.cWBTC,
      strategyName: 'CompoundXYStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  VesperCompoundXYStrategyWBTC: {
    contract: 'VesperCompoundXYStrategy',
    type: StrategyTypes.VESPER_COMPOUND_XY,
    constructorArgs: {
      swapManager,
      comptroller: Address.Compound.COMPTROLLER,
      rewardDistributor: Address.Compound.COMPTROLLER,
      rewardToken: Address.Compound.COMP,
      receiptToken: Address.Compound.cWBTC,
      borrowCToken: Address.Compound.cDAI,
      vPool: Address.vaDAI,
      strategyName: 'VesperCompoundXYStrategyWBTC',
    },
    config: { ...config },
    setup: { ...setup },
  },

  RariFuseStrategy: {
    contract: 'RariFuseStrategy',
    type: StrategyTypes.RARI_FUSE,
    constructorArgs: {
      swapManager,
      fusePoolId: 23, // default
      fusePoolDirectory: Address.Rari.fusePoolDirectory,
      strategyName: 'RariFuseStrategy',
    },
    config: { ...config },
    setup: { ...setup },
  },

  RariFuseStrategyETH: {
    contract: 'RariFuseStrategyETH',
    type: StrategyTypes.RARI_FUSE,
    constructorArgs: {
      swapManager,
      fusePoolId: 23, // default
      fusePoolDirectory: Address.Rari.fusePoolDirectory,
      strategyName: 'RariFuseStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  RariFuseStrategyDAI: {
    contract: 'RariFuseStrategy',
    type: StrategyTypes.RARI_FUSE,
    constructorArgs: {
      swapManager,
      fusePoolId: 8,
      fusePoolDirectory: Address.Rari.fusePoolDirectory,
      strategyName: 'RariFuseStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  RariFuseLeverageStrategyDAI: {
    contract: 'RariFuseLeverageStrategy',
    type: StrategyTypes.COMPOUND_LEVERAGE,
    constructorArgs: {
      swapManager,
      aaveAddressProvider: Address.Aave.AddressProvider,
      fusePoolId: 8,
      fusePoolDirectory: Address.Rari.fusePoolDirectory,
      strategyName: 'RariFuseLeverageStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  RariFuseLeverageStrategyFEI: {
    contract: 'RariFuseLeverageStrategy',
    type: StrategyTypes.COMPOUND_LEVERAGE,
    constructorArgs: {
      swapManager,
      aaveAddressProvider: Address.Aave.AddressProvider,
      fusePoolId: 8,
      fusePoolDirectory: Address.Rari.fusePoolDirectory,
      strategyName: 'RariFuseLeverageStrategyFEI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnRariFuseStrategy: {
    contract: 'EarnRariFuseStrategy',
    type: StrategyTypes.EARN_RARI_FUSE,
    constructorArgs: {
      swapManager,
      fusePoolId: 23, // default,
      fusePoolDirectory: Address.Rari.fusePoolDirectory,
      dripToken: Address.DAI,
      strategyName: 'EarnRariFuseStrategy',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnRariFuseStrategyETH: {
    contract: 'EarnRariFuseStrategyETH',
    type: StrategyTypes.EARN_RARI_FUSE,
    constructorArgs: {
      swapManager,
      fusePoolId: 23, // default
      fusePoolDirectory: Address.Rari.fusePoolDirectory,
      dripToken: Address.DAI,
      strategyName: 'EarnRariFuseStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AlphaLendStrategyDAI: {
    contract: 'AlphaLendStrategy',
    type: StrategyTypes.ALPHA_LEND,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Alpha.ibDAIv2,
      strategyName: 'AlphaLendStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AlphaLendStrategyDPI: {
    contract: 'AlphaLendStrategy',
    type: StrategyTypes.ALPHA_LEND,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Alpha.ibDPIv2,
      strategyName: 'AlphaLendStrategyDPI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AlphaLendStrategyETH: {
    contract: 'AlphaLendStrategyETH',
    type: StrategyTypes.ALPHA_LEND,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Alpha.ibETHv2,
      strategyName: 'AlphaLendStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AlphaLendStrategyLINK: {
    contract: 'AlphaLendStrategy',
    type: StrategyTypes.ALPHA_LEND,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Alpha.ibLINKv2,
      strategyName: 'AlphaLendStrategyLINK',
    },
    config: { ...config },
    setup: { ...setup },
  },

  AlphaLendStrategyUSDC: {
    contract: 'AlphaLendStrategy',
    type: StrategyTypes.ALPHA_LEND,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Alpha.ibUSDCv2,
      strategyName: 'AlphaLendStrategyUSDC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  AlphaLendStrategyUSDT: {
    contract: 'AlphaLendStrategy',
    type: StrategyTypes.ALPHA_LEND,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Alpha.ibUSDTv2,
      strategyName: 'AlphaLendStrategyUSDT',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  EarnAlphaLendStrategyETH: {
    contract: 'EarnAlphaLendStrategyETH',
    type: StrategyTypes.EARN_ALPHA_LEND,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Alpha.ibETHv2,
      dripToken: Address.DAI,
      strategyName: 'EarnAlphaLendStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Convex2PoolStrategyMIMUSTPoolMIM: {
    contract: 'Convex2PoolStrategyMIMUSTPool',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Convex2PoolStrategyMIMUSTPoolMIM',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Convex3PoolStrategyDAI: {
    contract: 'Convex3PoolStrategy',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Convex3PoolStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  ConvexCoverage3poolStrategyDAI: {
    contract: 'ConvexCoverage3poolStrategy',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'ConvexCoverage3poolStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  ConvexStable3PoolStrategyDAI: {
    contract: 'ConvexStable3PoolStrategy',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'ConvexStable3PoolStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  ConvexSBTCPoolStrategyWBTC: {
    contract: 'ConvexSBTCPoolStrategy',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 1,
      strategyName: 'ConvexSBTCPoolStrategyWBTC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 8).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  ConvexD3PoolStrategyFRAX: {
    contract: 'ConvexD3PoolStrategy',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'ConvexD3PoolStrategyFRAX',
    },
    config: { ...config },
    setup: { ...setup },
  },

  ConvexD3PoolStrategyFEI: {
    contract: 'ConvexD3PoolStrategy',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 1,
      strategyName: 'ConvexD3PoolStrategyFEI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  ConvexD3PoolStrategyAlUSD: {
    contract: 'ConvexD3PoolStrategy',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 2,
      strategyName: 'ConvexD3PoolStrategyAlUSD',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Convex4MetaPoolStrategyMIMPoolMIM: {
    contract: 'Convex4MetaPoolStrategyMIMPool',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Convex4MetaPoolStrategyMIMPoolMIM',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Convex4PoolStrategyMUSDPoolMUSD: {
    contract: 'Convex4PoolStrategyMUSDPool',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Convex4PoolStrategyMUSDPoolMUSD',
    },
    config: { ...config },
    setup: { ...setup },
  },
  Convex4MetaPoolStrategyFRAXPoolFRAX: {
    contract: 'Convex4MetaPoolStrategyFRAXPool',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Convex4MetaPoolStrategyFRAXPool',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Convex4MetaPoolStrategyFRAXPoolDAI: {
    contract: 'Convex4MetaPoolStrategyFRAXPool',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 1,
      strategyName: 'Convex4MetaPoolStrategyFRAXPool',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Convex4MetaPoolStrategyFRAXPoolUSDC: {
    contract: 'Convex4MetaPoolStrategyFRAXPool',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 2,
      strategyName: 'Convex4MetaPoolStrategyFRAXPool',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Convex4MetaPoolStrategyIBBTCPoolWBTC: {
    contract: 'Convex4MetaPoolStrategyIBBTCPool',
    type: StrategyTypes.CONVEX,
    constructorArgs: {
      swapManager,
      collateralIdx: 2,
      strategyName: 'Convex4MetaPoolStrategyIBBTCPoolWBTC',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Crv2PoolStrategyMIMUSTPoolMIM: {
    contract: 'Crv2PoolStrategyMIMUSTPool',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Crv2PoolStrategyMIMUSTPoolMIM',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Crv3PoolStrategyDAI: {
    contract: 'Crv3PoolStrategy',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Crv3PoolStrategyDAI',
    },
    config: { ...config, externalDepositFee: 100 },
    setup: { ...setup },
  },

  Crv3PoolStrategyUSDC: {
    contract: 'Crv3PoolStrategy',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 1,
      strategyName: 'Crv3PoolStrategyUSDC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  CrvSBTCPoolStrategyWBTC: {
    contract: 'CrvSBTCPoolStrategy',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 1,
      strategyName: 'CrvSBTCPoolStrategyWBTC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 8).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  EarnCrvSBTCPoolStrategyWBTC: {
    contract: 'EarnCrvSBTCPoolStrategy',
    type: StrategyTypes.EARN_CURVE,
    constructorArgs: {
      swapManager,
      dripToken: Address.DAI,
      strategyName: 'EarnCrvSBTCPoolStrategyWBTC',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Crv4MetaPoolStrategyMIMPoolDAI: {
    contract: 'Crv4MetaPoolStrategyMIMPool',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 1,
      strategyName: 'Crv4MetaPoolStrategyMIMPoolDAI',
    },
    config: { ...config, externalDepositFee: 100 },
    setup: { ...setup },
  },

  Crv4MetaPoolStrategyFRAXPoolDAI: {
    contract: 'Crv4MetaPoolStrategyFRAXPool',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 1,
      strategyName: 'Crv4MetaPoolStrategyFRAXPoolDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Crv4MetaPoolStrategyMIMPoolMIM: {
    contract: 'Crv4MetaPoolStrategyMIMPool',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Crv4MetaPoolStrategyMIMPoolMIM',
    },
    config: { ...config },
    setup: { ...setup },
  },

  Crv4PoolStrategySUSDPoolDAI: {
    contract: 'Crv4PoolStrategySUSDPool',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'Crv4PoolStrategySUSDPoolDAI',
    },
    config: { ...config, externalDepositFee: 100 },
    setup: { ...setup },
  },

  CrvA3PoolStrategyDAI: {
    contract: 'CrvA3PoolStrategy',
    type: StrategyTypes.CURVE,
    constructorArgs: {
      swapManager,
      collateralIdx: 0,
      strategyName: 'CrvA3PoolStrategyDAI',
    },
    config: { ...config, externalDepositFee: 100 },
    setup: { ...setup },
  },

  AaveMakerStrategyETH: {
    contract: 'AaveMakerStrategy',
    type: StrategyTypes.AAVE_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aDAI,
      collateralType: ethers.utils.formatBytes32String('ETH-A'),
      strategyName: 'AaveMakerStrategyETH',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_ETH_A, highWater: 275, lowWater: 250 } },
  },

  CompoundMakerStrategyETH: {
    contract: 'CompoundMakerStrategy',
    type: StrategyTypes.COMPOUND_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Compound.cDAI,
      collateralType: ethers.utils.formatBytes32String('ETH-C'),
      strategyName: 'CompoundMakerStrategyETH',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_ETH_C, highWater: 250, lowWater: 225 } },
  },

  CompoundMakerStrategyUNI: {
    contract: 'CompoundMakerStrategy',
    type: StrategyTypes.COMPOUND_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Compound.cDAI,
      collateralType: ethers.utils.formatBytes32String('UNI-A'),
      strategyName: 'CompoundMakerStrategyUNI',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_UNI_A, highWater: 275, lowWater: 250 } },
  },

  VesperMakerStrategyETH: {
    contract: 'VesperMakerStrategy',
    type: StrategyTypes.VESPER_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      collateralType: ethers.utils.formatBytes32String('ETH-C'),
      strategyName: 'VesperMakerStrategyETH',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_ETH_C, highWater: 250, lowWater: 225 } },
  },

  VesperMakerStrategyLINK: {
    contract: 'VesperMakerStrategy',
    type: StrategyTypes.VESPER_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      collateralType: ethers.utils.formatBytes32String('LINK-A'),
      strategyName: 'VesperMakerStrategyLINK',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_LINK_A, highWater: 250, lowWater: 225 } },
  },

  VesperMakerStrategyWBTC: {
    contract: 'VesperMakerStrategy',
    type: StrategyTypes.VESPER_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      collateralType: ethers.utils.formatBytes32String('WBTC-C'),
      strategyName: 'VesperMakerStrategyWBTC',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_WBTC_A, highWater: 250, lowWater: 225 } },
  },

  EarnAaveMakerStrategyETH: {
    contract: 'EarnAaveMakerStrategy',
    type: StrategyTypes.EARN_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Aave.aDAI,
      collateralType: ethers.utils.formatBytes32String('ETH-C'),
      dripToken: Address.DAI,
      strategyName: 'EarnAaveMakerStrategyETH',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_ETH_C, highWater: 250, lowWater: 225 } },
  },

  EarnCompoundMakerStrategyETH: {
    contract: 'EarnCompoundMakerStrategy',
    type: StrategyTypes.EARN_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Compound.cDAI,
      collateralType: ethers.utils.formatBytes32String('ETH-C'),
      dripToken: Address.DAI,
      strategyName: 'EarnCompoundMakerStrategyETH',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_ETH_C, highWater: 250, lowWater: 225 } },
  },

  EarnVesperMakerStrategyETH: {
    contract: 'EarnVesperMakerStrategy',
    type: StrategyTypes.EARN_VESPER_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      collateralType: ethers.utils.formatBytes32String('ETH-C'),
      dripToken: Address.DAI,
      strategyName: 'EarnVesperMakerStrategyETH',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_ETH_C, highWater: 250, lowWater: 225 } },
  },

  EarnVesperMakerStrategyLINK: {
    contract: 'EarnVesperMakerStrategy',
    type: StrategyTypes.EARN_VESPER_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      collateralType: ethers.utils.formatBytes32String('LINK-A'),
      dripToken: Address.DAI,
      strategyName: 'EarnVesperMakerStrategyLINK',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_LINK_A, highWater: 275, lowWater: 250 } },
  },

  EarnVesperMakerStrategyWBTC: {
    contract: 'EarnVesperMakerStrategy',
    type: StrategyTypes.EARN_VESPER_MAKER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      collateralType: ethers.utils.formatBytes32String('WBTC-A'),
      dripToken: Address.DAI,
      strategyName: 'EarnVesperMakerStrategyWBTC',
    },
    config: { ...config },
    setup: { ...setup, maker: { gemJoin: Address.Maker.MCD_JOIN_WBTC_A, highWater: 250, lowWater: 225 } },
  },

  EarnVesperStrategyDAIDPI: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      dripToken: Address.DPI,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAIDPI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnVesperStrategyDAILINK: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      dripToken: Address.LINK,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAILINK',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnVesperStrategyLINKDAI: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaLINK,
      dripToken: Address.DAI,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyLINKDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnVesperStrategyDAISHIB: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      dripToken: Address.SHIB,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAISHIB',
    },
    config: { ...config, interestFee: 2500 },
    setup: { ...setup },
  },

  EarnVesperStrategyDAIPUNK: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      dripToken: Address.PUNK,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAIPUNK',
    },
    config: { ...config, interestFee: 2500 },
    setup: { ...setup },
  },

  EarnVesperStrategyDAIVSP: {
    contract: 'EarnVesperStrategyVSPDrip',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      dripToken: Address.VSP,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAIVSP',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnVesperStrategyDAIWBTC: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      dripToken: Address.WBTC,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAIWBTC',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnVesperStrategyDAIWETH: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      dripToken: Address.WETH,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyDAIWETH',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnVesperStrategyETHDAI: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaETH,
      dripToken: Address.DAI,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyETHDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  EarnVesperStrategyWBTCDAI: {
    contract: 'EarnVesperStrategy',
    type: StrategyTypes.EARN_VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaWBTC,
      dripToken: Address.DAI,
      vsp: Address.VSP,
      strategyName: 'EarnVesperStrategyWBTCDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  VesperCoverageStrategyDAI: {
    contract: 'VesperCoverageStrategy',
    type: StrategyTypes.VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      vsp: Address.VSP,
      strategyName: 'VesperCoverageStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  VesperStableStrategyDAI: {
    contract: 'VesperStableStrategy',
    type: StrategyTypes.VESPER,
    constructorArgs: {
      swapManager,
      receiptToken: Address.vaDAI,
      vsp: Address.VSP,
      strategyName: 'VesperStableStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  YearnStrategyDAI: {
    contract: 'YearnStrategy',
    type: StrategyTypes.YEARN,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Yearn.yvDAI,
      strategyName: 'YearnStrategyDAI',
    },
    config: { ...config },
    setup: { ...setup },
  },

  YearnStrategyUSDC: {
    contract: 'YearnStrategy',
    type: StrategyTypes.YEARN,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Yearn.yvUSDC,
      strategyName: 'YearnStrategyUSDC',
    },
    config: { ...config, debtRate: ethers.utils.parseUnits('1000000', 6).toString(), externalDepositFee: 0 },
    setup: { ...setup },
  },

  EarnYearnStrategyETH: {
    contract: 'EarnYearnStrategy',
    type: StrategyTypes.EARN_YEARN,
    constructorArgs: {
      swapManager,
      receiptToken: Address.Yearn.yvWETH,
      dripToken: Address.DAI,
      strategyName: 'EarnYearnStrategyETH',
    },
    config: { ...config },
    setup: { ...setup },
  },
}

module.exports = Object.freeze(StrategyConfig)
