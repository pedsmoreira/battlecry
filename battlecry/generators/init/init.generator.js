// $flow

import { Generator } from 'battlecry';

export default class InitGenerator extends Generator {
  config = {
    generate: {}
  };

  generate() {
    this.generator('generator')
      .setArgs({ name: 'component' })
      .play('generate');

    this.template('battlecry-setup.js').saveAs('battlecry/');

    this.battlecry.load(`${process.cwd()}/battlecry`);
    this.generator('component')
      .setArgs({ name: 'test-abc' })
      .play('generate');
  }
}
