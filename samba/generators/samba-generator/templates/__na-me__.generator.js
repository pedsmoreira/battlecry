import { Generator } from 'samba';

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
    this.templates().forEach(file => file.saveAs(`src/__na-me__s/${this.args.name}/`, this.args.name));
  }
}
