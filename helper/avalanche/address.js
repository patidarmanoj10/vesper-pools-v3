'use strict'

const Address = {
  ZERO: '0x0000000000000000000000000000000000000000',
  DAI: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  ADDRESS_LIST_FACTORY: '0xc5CdF8CBE886FC5c1EF5CD4fdd599C975eC6BB54',
  ANY_ERC20: '0x60781C2586D68229fde47564546784ab3fACA982', // PNG
  SWAP_MANAGER: '0xEbedFD259c9FB1F5c0ab9A9f24E79F8d80E29B23',
  SUSHI_ROUTER: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // TraderJoe router
  UNI2_ROUTER: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // TraderJoe router
  NATIVE_TOKEN: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // WAVAX
  USDC: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  USDT: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  WETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  WBTC: '0x50b7545627a5162F82A992c33b87aDc75187B218',
  FEE_COLLECTOR: '0x1cbfae0367a9b1e4ac2c158e57b5f00ccb337271', // Same as deployer
  MULTICALL: '0x98e2060F672FD1656a07bc12D7253b5e41bF3876',
  DEPLOYER: '0x1cbfae0367a9b1e4ac2c158e57b5f00ccb337271',
  CRV: '0x47536F17F4fF30e64A96a7555826b8f9e66ec468',
  KEEPER: '0x76d266DFD3754f090488ae12F6Bd115cD7E77eBD', // Bot address
  Aave: {
    AddressProvider: '0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f',
    avDAI: '0x47AFa96Cdc9fAb46904A55a6ad4bf6660B53c38a',
    avWETH: '0x53f7c5869a859F0AeC3D334ee8B4Cf01E3492f21',
    avWBTC: '0x686bEF2417b6Dc32C50a3cBfbCC3bb60E1e9a15D',
    avWAVAX: '0xDFE521292EcE2A4f44242efBcD66Bc594CA9714B',
    avUSDC: '0x46A51127C3ce23fb7AB1DE06226147F446e4a857',
  },
  TraderJoe: {
    COMPTROLLER: '0xdc13687554205E5b89Ac783db14bb5bba4A1eDaC',
    REWARD_DISTRIBUTOR: '0x45B2C4139d96F44667577C0D7F7a7D170B420324',
    jAVAX: '0xC22F01ddc8010Ee05574028528614634684EC29e',
    jWETH: '0x929f5caB61DFEc79a5431a7734a68D714C4633fa',
    jWBTC: '0x3fE38b7b610C0ACD10296fEf69d9b18eB7a9eB1F',
    jUSDC: '0xEd6AaF91a2B084bd594DBd1245be3691F9f637aC',
    jUSDT: '0x8b650e26404AC6837539ca96812f0123601E4448',
    jDAI: '0xc988c170d0E38197DC634A45bF00169C7Aa7CA19',
    jLINK: '0x585E7bC75089eD111b656faA7aeb1104F5b96c15',
    jMIM: '0xcE095A9657A02025081E0607c8D8b081c76A75ea',
    JOE: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
  },
  Benqi: {
    COMPTROLLER: '0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4',
    REWARD_DISTRIBUTOR: '0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4',
    qiAVAX: '0x5C0401e81Bc07Ca70fAD469b451682c0d747Ef1c',
    qiETH: '0x334AD834Cd4481BB02d09615E7c11a00579A7909',
    qiBTC: '0xe194c4c5aC32a3C9ffDb358d9Bfd523a0B6d1568',
    qiUSDC: '0xBEb5d47A3f720Ec0a390d04b4d41ED7d9688bC7F',
    qiUSDT: '0xc9e5999b8e75C3fEB117F6f73E664b9f3C8ca65C',
    qiDAI: '0x835866d37AFB8CB8F8334dCCdaf66cf01832Ff5D',
    qiLINK: '0x4e9f683A27a6BdAD3FC2764003759277e93696e6',
    QI: '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5',
  },
  MultiSig: {
    safe: '0x0000000000000000000000000000000000000000',
  },
  Alpha: {
    ibDAIv2: '0x69491FD9a6D9e32f32113cC076B1B69D8B9EBD3F',
    ibWETHv2: '0xf9EB24B83B51fBC0Bcb1204221c8C9f1Cef33994',
    ibUSDCv2: '0xD3843b60e69f958eF93BeC299467e6Ed301CbEeB',
    ibUSDTv2: '0x858D6353A52c25C53Df1869230282d22b41f5790',
    ibWBTCv2: '0x1DE90c0cE3D940412C3Ba7322a257F7BDcC00ceB',
    ibAVAXv2: '0x21C630B7824D15BcDFeefA73CBd4e49cAfe9F836',
  },
}

module.exports = Object.freeze(Address)
