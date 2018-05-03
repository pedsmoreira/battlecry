import { Generator } from 'samba';
import format from 'helpers/format';

export default class UsingHelperGenerator extends Generator {
  config = {
    generate: {
      args: 'name'
    }
  };

  generate() {
    const file = this.template('*.txt');
    file.text = format(file.text);
    file.saveAs(`it-worked/using-helpers/`, this.args.name);
  }
}
