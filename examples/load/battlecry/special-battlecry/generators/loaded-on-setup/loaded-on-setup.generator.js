import { Generator } from 'battlecry';

export default class LoadedOnSetupGenerator extends Generator {
  config = {
    generate: {
      args: 'name'
    }
  };

  generate() {
    this.template('*.txt').saveAs('it-worked/loaded-on-setup/', this.args.name);
  }
}
