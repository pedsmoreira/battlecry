const Frame = require('reframed');

class __NaMe__Frame extends Frame {
  generate() {
    this.templates().forEach(file => file.copyInStructure('desiredPath'));
  }
}

module.exports = __NaMe__Frame;
