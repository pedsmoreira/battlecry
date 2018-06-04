import { Generator } from 'battlecry';

export default class __NaMe__Generator extends Generator {
  config = {
    generate: {
      args: 'name',
      options: {
        special: { description: 'Special option' }
      }
    }
  };

  generate() {
    this.templates().forEach(file => file.saveAs(`it-worked/__na-me__s/`, this.args.name));
  }
}
