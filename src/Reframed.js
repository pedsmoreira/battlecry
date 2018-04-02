// @flow

const program = require('commander');
const chalk = require('chalk');

const help = require('./help');
const action = require('./action');

class Reframed {
  path: string;
  action: string;
  frame: string;

  constructor() {
    this.path = process.cwd();
    this.action = action();
    this.frame = process.argv[3];
  }

  hasHelpOption(): boolean {
    return process.argv.indexOf('--help') !== -1 || process.argv.indexOf('-h') !== -1;
  }

  createFrame() {}

  callFrameMethod() {
    // $FlowFixMe
    const frameClass = require(`${this.path}/reframed/frames/${this.frame}/${this.frame}.frame.js`);
    const frame = new frameClass();

    const method = frame[this.action];
    if (!method) {
      console.log(chalk.red(`Method ${this.action} not found in frame ${this.frame}`));
      process.exit(1);
    }

    method();
  }

  execute() {
    if (!this.frame) help();

    if (this.action === 'new') this.createFrame();
    else this.callFrameMethod();
  }
}

module.exports = Reframed;
