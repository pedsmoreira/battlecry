import { Generator } from 'samba';

export default class JohnGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      options: {
        special: { description: 'Special option' }
      }
    }
  };

  generate() {
    this.templates().forEach(file => file.saveAs(`src/johns/`, this.args.name));
  }
}
