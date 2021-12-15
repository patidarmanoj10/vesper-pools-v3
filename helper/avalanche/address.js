'use strict'

const Address = {
  ZERO: '0x0000000000000000000000000000000000000000',
  DAI: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  ADDRESS_LIST_FACTORY: '0xc5CdF8CBE886FC5c1EF5CD4fdd599C975eC6BB54',
  ANY_ERC20: '0x60781C2586D68229fde47564546784ab3fACA982', // PNG
  SWAP_MANAGER: '0xEbedFD259c9FB1F5c0ab9A9f24E79F8d80E29B23',
  SUSHI_ROUTER: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // TraderJoe router
  NATIVE_TOKEN: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // WAVAX
  USDC: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  USDT: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  WETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  WBTC: '0x50b7545627a5162F82A992c33b87aDc75187B218',
  FEE_COLLECTOR: '0x1cbfae0367a9b1e4ac2c158e57b5f00ccb337271', // Same as deployer
  MULTICALL: '0x98e2060F672FD1656a07bc12D7253b5e41bF3876',
  DEPLOYER: '0x1cbfae0367a9b1e4ac2c158e57b5f00ccb337271',
  CRV: '0x47536F17F4fF30e64A96a7555826b8f9e66ec468',
  Aave: {
    avDAI: '0x47AFa96Cdc9fAb46904A55a6ad4bf6660B53c38a',
  },
}

module.exports = Object.freeze(Address)
