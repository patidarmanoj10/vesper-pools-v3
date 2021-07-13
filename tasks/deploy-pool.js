'use strict'

const del = require('del')
const copy = require('recursive-copy')
const fs = require('fs')

/* eslint-disable no-param-reassign */
task('deploy-pool', 'Deploy vesper pool')
  .addParam('pool', 'Vesper pool name')
  .addOptionalParam('release', 'Vesper release semantic version. It will create release file under /releases directory')
  .addOptionalParam(
    'deployParams',
    `any param passed inside deployParams object will be passed to hardhat-deploy
  -----------------------------------------------------------------------------------------
  deploy-scripts      override deploy script folder path 
  export              export current network deployments 
  export-all          export all deployments into one file 
  gasprice            gas price to use for transactions 
  no-compile          disable pre compilation 
  no-impersonation    do not impersonate unknown accounts 
  reset               whether to delete deployments files first 
  silent              whether to remove log 
  tags                specify which deploy script to execute via tags, separated by commas 
  watch               redeploy on every change of contract or deploy script 
  write               whether to write deployments to file
  -----------------------------------------------------------------------------------------
  `
  )
  .setAction(async function ({pool, release, deployParams = {}}) {
    if (typeof deployParams === 'string') {
      deployParams = JSON.parse(deployParams)
    }

    if (!deployParams.tags) {
      deployParams.tags = pool
    }
    const network = hre.network.name
    const networkDir = `./deployments/${network}`
    console.log(`Deploying ${pool} on ${network} with deployParams`, deployParams)
    pool = pool.toLowerCase()
    const poolDir = `${networkDir}/${pool}`

    // Copy source directory, solcInputs. do not copy v(pool) directory and DefaultProxyAdmin.json
    const copyFilter = ['*', 'solcInputs/*', '!v*', '!DefaultProxyAdmin.json']

    // Copy files from pool directory to network directory for deployment
    if (fs.existsSync(poolDir)) {
      await copy(poolDir, networkDir, {overwrite: true, filter: copyFilter})
    }

    await run('deploy', {...deployParams})

    // Copy files from network directory to pool specific directory after deployment
    // Note: This operation will overwrite files. Anything start with dot(.) will not be copied
    await copy(networkDir, poolDir, {overwrite: true, filter: copyFilter})

    // Delete all json files except DefaultProxyAdmin.json. Also delete solcInputs directory
    // Anything start with dot(.) will not be deleted
    const deleteFilter = [`${networkDir}/*.json`, `${networkDir}/solcInputs`, `!${networkDir}/DefaultProxyAdmin.json`]
    // Delete copied files from network directory
    del.sync(deleteFilter)

    if (release) {
      await run('create-release', {pool, release})
    }
  })

module.exports = {}
