import { Generator } from 'samba';

export default class GeneratorTwoGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      options: {
        special: { description: 'Special option' }
      }
    }
  };

  generate() {
    let name = this.args.name;
    if (this.options.special) name += '-special';
    this.templates().forEach(file => file.saveAs(`it-worked/generator-two/`, name));
  }
}
