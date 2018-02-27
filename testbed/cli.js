'use strict'
const yargs = require('yargs')

const paramedic = require('..')
const ParamedicConfig = require('../lib/ParamedicConfig')

async function main() {
  const parser = yargs
    .option('platform')
    .option('plugin')
    .option('verbose', {
      default: false,
    })
    .version()
    .help()
  const argv = parser.argv

  const paramedicConfig = ParamedicConfig.parseFromArguments(argv)

  if (argv.plugin) {
    paramedicConfig.setPlugins(argv.plugin)
  }

  if (argv.platform) {
    paramedicConfig.setPlatform(argv.platform)
  }

  const isTestPassed = await paramedic.run(paramedicConfig)
  const exitCode = isTestPassed ? 0 : 1
  console.log(`Finished with exit code ${exitCode}`)
  process.exit(exitCode)
}

main()
