import { Generator } from 'battlecry';

export default class RequiredArgOptionGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      options: {
        filename: { description: 'Change destination filename', arg: 'required' }
      },
      description: 'Example generator method that have an option with optional arg'
    }
  };

  generate() {
    const file = this.template('*.java');

    const filename = this.options.filename || file.filename;
    file.saveAs(`it-worked/required-arg-options/${filename}`, this.args.name);
  }
}
