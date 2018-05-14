import { Generator } from 'samba';

export default class UnitGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      options: {
        folder: { description: 'Unit test folder', arg: 'required' }
      }
    }
  };

  get folder(): string {
    const { folder } = this.options;
    return folder ? `${folder}/` : '';
  }

  generate() {
    this.templates().forEach(file => file.saveAs(`unit/${this.folder}`, this.args.name));
  }
}
