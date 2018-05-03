import { Generator, File } from 'samba';

export default class ExecTouchGenerator extends Generator {
  config = {
    generate: {
      args: 'name'
    }
  };

  generate() {
    const file = new File('it-worked/exec-touchs/__na-me__.txt', this.args.name).save();
    this.exec(`chmod 777 ${file.path}`);
  }
}
