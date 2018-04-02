// @flow

const program = require('commander');
const chalk = require('chalk');

const aliases = require('./aliases');

function hasHelpOption(): boolean {
  return process.argv.indexOf('--help') !== -1 || process.argv.indexOf('-h') !== -1;
}

function help() {
  program
    .command('new')
    .alias('n')
    .usage('<name>')
    .description('Create a new frame under reframed/');

  program
    .command('generate')
    .alias(aliases.generate)
    .usage('<name> [options] <args ...>')
    .description('Call frame generate method');

  program
    .command('rename')
    .alias(aliases.rename)
    .usage('<name> [options] <args ...>')
    .description('Call frame rename method');

  program
    .command('move')
    .alias(aliases.move)
    .usage('<name> [options] <args ...>')
    .description('Call frame move method');

  program
    .command('destroy')
    .alias(aliases.destroy)
    .usage('<name> [options] <args ...>')
    .description('Call frame destroy method');

  // $FlowFixMe
  program.help(hasHelpOption() ? null : chalk.red);
}

module.exports = help;
