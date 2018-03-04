'use strict'
const ms = require('ms')
const yargs = require('yargs')

const paramedic = require('..')
const ParamedicConfig = require('../lib/ParamedicConfig')

async function main() {
  const parser = yargs
    .option('platform', {
      choices: ['ios', 'browser', 'windows', 'android', 'wp8'],
    })
    .option('plugin', {
      type: 'array',
      desc:
        "Set relative or absolute path to a plugin folder with a 'tests' folder, use multiple --plugin flags to test plugins together",
    })
    .option('build-only', {
      default: false,
      desc: 'Build the project without running the tests',
    })
    .option('timeout', {
      default: ms('10m'),
      desc: 'Wait number of millisecs for tests to pass|fail',
    })
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

  if (argv.buildOnly) {
    paramedicConfig.setAction('build')
  }

  const isTestPassed = await paramedic.run(paramedicConfig)
  const exitCode = isTestPassed ? 0 : 1
  console.log(`Finished with exit code ${exitCode}`)
  process.exit(exitCode)
}

main()
