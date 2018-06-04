import { Generator } from 'battlecry';

export default class ExampleGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      options: {
        special: { description: 'Special option' }
      }
    }
  };

  generate() {
    this.template('README.md')
      .remove(0)
      .saveAs(`__na-me__/`, this.args.name);
  }
}
