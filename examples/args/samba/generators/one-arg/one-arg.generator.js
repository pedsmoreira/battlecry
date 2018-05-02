import { Generator } from 'samba';

export default class OneArgGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      description: 'Example generator method that uses one arg'
    }
  };

  generate() {
    this.template('*.txt').saveAs(`it-worked/one-arg/`, this.args.name);
  }
}
