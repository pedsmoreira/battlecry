// $Flow

import { Generator } from 'samba';

export default class InitGenerator extends Generator {
  config = {
    generate: {}
  };

  generate() {
    this.generator('generator')
      .setArgs({ name: 'component' })
      .play('generate');

    this.template('samba-setup.js').saveAs('samba/');

    this.samba.load(`${process.cwd()}/samba`);
    this.generator('component')
      .setArgs({ name: 'test-abc' })
      .play('generate');
  }
}
