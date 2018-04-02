#!/usr/bin/env node

// @flow

const program = require('commander');
const chalk = require('chalk');

// $FlowFixMe
const workingDirectory = process.cwd();
const methodAliases = { generate: 'g', rename: 'r', move: 'm', destroy: 'd' };
const actionName = process.argv[2];

function help() {
  program
    .command('new')
    .alias('n')
    .usage('<name>')
    .description('Create a new frame under reframed/');

  program
    .command('generate')
    .alias(methodAliases.generate)
    .usage('<name> [options] <args ...>')
    .description('Call frame generate method');

  program
    .command('rename')
    .alias(methodAliases.rename)
    .usage('<name> [options] <args ...>')
    .description('Call frame rename method');

  program
    .command('move')
    .alias(methodAliases.move)
    .usage('<name> [options] <args ...>')
    .description('Call frame move method');

  program
    .command('destroy')
    .alias(methodAliases.destroy)
    .usage('<name> [options] <args ...>')
    .description('Call frame destroy method');

  // $FlowFixMe
  program.help(chalk.red);
}

if (actionName === 'new' || actionName === 'n') {
  const frameName = process.argv[3];
  if (!frameName) help();
}

const frameName = process.argv[3];
if (!frameName) help();

const aliasIndex = Object.values(methodAliases).indexOf(actionName);
let methodName = aliasIndex === -1 ? actionName : Object.keys(methodAliases)[aliasIndex];

// $FlowFixMe
const frameClass = require(`${workingDirectory}/reframed/frames/${frameName}/${frameName}.frame.js`);
const frame = new frameClass();

const method = frame[methodName];
if (!method) throw new Error(`Method ${methodName} not found in frame ${frameName}`);

method();

// program
//   .version(pkg.version)
//   usage('<action> <name> [options] <args ...>');
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   // .option('-n, --namespace <n>', 'Namespace')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv);

// console.log(program.args);
// console.log(program);

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// if (program.namespace) console.log('  - %s', program.namespace);
// console.log('  - %s cheese', program.cheese);
