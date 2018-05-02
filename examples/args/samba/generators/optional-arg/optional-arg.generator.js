import { Generator } from 'samba';

export default class OptionalArgGenerator extends Generator {
  config = {
    generate: {
      args: 'name neighborhood?',
      description: 'Example generator method that have an optional arg'
    }
  };

  generate() {
    const { name, neighborhood } = this.args;

    const template = this.template('*.txt');
    if (neighborhood) template.append('I live in the __Na Me__ neighborhood.', neighborhood);
    template.saveAs(`it-worked/optional-args/`, name);
  }
}
