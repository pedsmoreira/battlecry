const Frame = require('reframed/Frame');

class InitFrame extends Frame {
  generate() {
    this.reframed('generate frame simple-frame');
    this.reframed('generate parser simple-parser');
  }
}

module.exports = InitFrame;
