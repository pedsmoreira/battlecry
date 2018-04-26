import { Generator } from 'samba';

export default class InitGenerator extends Generator {
  config = {
    generate: {}
  };

  generate() {
    this.generator('generator')
      .setArgs({ name: 'components' })
      .generate();
    this.template('samba-setup.js').saveAs('samba/');
  }
}
