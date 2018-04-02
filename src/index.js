#!/usr/bin/env node

const Reframed = require('./Reframed');

const reframed = new Reframed();
reframed.execute();

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
