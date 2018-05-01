// @flow

import chalk from 'chalk';

class Log {
  indentation: string = '';
  hasEmptyLine: boolean = false;

  addIndentation() {
    this.indentation += '  ';
  }

  removeIndentation() {
    if (this.indentation.length) this.indentation = this.indentation.substring(0, this.indentation.length - 2);
  }

  log(chalker: Function, message: string) {
    this.hasEmptyLine = false;
    console.log(chalker(this.indentation + message));
  }

  success(message: string) {
    this.log(chalk.green, message);
  }

  warn(message: string) {
    // $FlowFixMe
    this.log(chalk, `⚠️  ${message}`);
  }

  error(message: string) {
    this.log(chalk.red, message);
  }

  emptyLine() {
    if (this.hasEmptyLine) return;

    this.hasEmptyLine = true;
    console.log();
  }
}

export default new Log();
