// @flow

import chalk from 'chalk';

export type OptionProperties = {
  [name: string]: {
    description: string,
    arg?: 'required' | 'optional',
    shortcut?: string
  }
};

export default class OptionBuilder {
  name: string;
  description: string;
  shortcut: string;
  arg: ?('required' | 'optional');

  constructor(name: string, properties: Object) {
    this.name = name;
    this.description = properties.description;
    this.arg = properties.arg;
    this.shortcut = properties.shortcut || name[0];
  }

  get commanderArg(): string {
    if (this.arg === 'required') return '<value>';
    if (this.arg === 'optional') return '[value]';

    return '';
  }

  build() {
    return `-${this.shortcut}, --${this.name} ${this.commanderArg}`;
  }

  help() {
    let optionText = chalk.blueBright(`    -${this.shortcut} --${this.name}`);

    if (this.arg === 'required') {
      optionText += chalk.cyanBright(` value`);
    } else if (this.arg === 'optional') {
      optionText += chalk.hex('#99C')(` value?`);
    }

    console.log(`${optionText} \t${chalk.hex('#AAA')(this.description)}`);
  }
}
