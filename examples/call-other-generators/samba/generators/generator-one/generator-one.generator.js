import { Generator } from 'samba';

export default class GeneratorOneGenerator extends Generator {
  config = {
    generate: {
      args: 'name'
    }
  };

  generate() {
    this.generator('generator-two')
      .setArgs({ name: this.args.name })
      .setOptions({ special: true })
      .play('generate');
  }
}
