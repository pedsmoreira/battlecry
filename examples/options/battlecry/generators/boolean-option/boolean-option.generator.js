import { Generator } from 'battlecry';

export default class BooleanOptionGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      options: {
        dangerous: { description: 'Adds a warning text at the beginning end' }
      },
      description: 'Example generator method that have a boolean option'
    }
  };

  generate() {
    const { dangerous } = this.options;

    const file = this.template('*.txt');
    if (dangerous) file.prepend('').prepend('CAUTION: This is a dangerous file');
    file.saveAs(`it-worked/boolean-option/`, this.args.name);
  }
}
