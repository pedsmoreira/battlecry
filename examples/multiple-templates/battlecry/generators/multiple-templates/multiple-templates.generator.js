import { Generator } from 'battlecry';

export default class MultipleTemplatesGenerator extends Generator {
  config = {
    generate: {
      args: 'name'
    }
  };

  generate() {
    this.templates().forEach(file => file.saveAs(`it-worked/multiple-templates/__na-me__/`, this.args.name));
  }
}
