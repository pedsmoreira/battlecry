import { Generator } from 'samba';

class __NaMe__Generator extends Generator {
  generate() {
    this.templates().forEach(file => file.saveAs('src/__na-me__s'));
  }
}

module.exports = __NaMe__Generator;
