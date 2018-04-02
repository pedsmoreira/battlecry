#!/usr/bin/env node

const program = require('commander');
// const pkg = require('./package.json');
console.log(require.main);

const methodArg = process.argv[2];
const frameArg = process.argv[3];

const methodAliases = { g: 'generate', r: 'rename', d: 'destroy' };
let method = methodAliases[methodArg] || methodArg;

// const frameClass = require(`./reframed/frames/${frameArg}/${frameArg}.frame.js`);
// const frame = new frameClass();
// frame[method]();

// program
//   .version(pkg.version)
//   .usage('<type> <name> [options] <files ...>')
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
