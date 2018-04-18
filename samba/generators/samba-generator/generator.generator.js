import { Generator } from 'samba';

export default class GeneratorGenerator extends Generator {
  static config = {
    generate: {
      args: 'name'
    }
  };

  getFolder() {
    return `samba/generators/${this.args.name}`;
  }

  generate() {
    const folder = this.getFolder();
    this.template('*.generator.js').saveAs(folder, this.args.name);
    this.templates('templates/**').forEach(file => file.saveAs(folder));
  }

  destroy() {
    this.delete(this.getFolder());
  }
}
