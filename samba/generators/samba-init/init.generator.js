import { Generator } from 'samba';

export default class InitGenerator extends Generator {
  generate() {
    this.generator('generator')
      .args('simple-generator')
      .generate();

    this.template('samba-setup.js').saveAs('samba/');
  }
}
