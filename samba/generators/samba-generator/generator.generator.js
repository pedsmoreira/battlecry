// @flow

import { Generator } from 'samba';

export default class GeneratorGenerator extends Generator {
  config = {
    generate: {
      args: 'name ...surnames?',
      options: {
        namespace: { description: 'Name it', arg: 'required' },
        test: { description: 'Name it', arg: 'optional' }
      }
    }
  };

  get nameArg(): string {
    // $FlowFixMe
    return this.args.name;
  }

  getFolder() {
    return `samba/generators/${this.nameArg}/`;
  }

  generate() {
    const folder = this.getFolder();
    this.template('*.generator.js').saveAs(folder, this.nameArg);
    this.templates('templates/**').forEach(file => file.saveAs(`${folder}/templates/`));
  }

  destroy() {
    this.delete(this.getFolder());
  }
}
