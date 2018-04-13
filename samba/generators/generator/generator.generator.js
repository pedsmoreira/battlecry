const Frame = require('samba');

class FrameFrame extends Frame {
  // configure() {
  //   this.option('n, --namespace [name]', 'Specify namespace');
  //   this.arg('name', 0, 'Frame name');
  // }

  // setup() {
  //   this.path = this.namedArgs.name;

  //   const { namespace } = this.options;
  //   if (namespace) this.path = `namespaces/${namespace}/${this.path}`;
  // }

  configure() {
    this.arg('name', 0, 'Frame name');
  }

  generate() {
    const name = this.namedArgs.name;
    this.templates().forEach(file => {
      const newFile = file.copyInStructure(`reframed/${name}`, name);
      if (file.extension === '.frame.js') newFile.applyName(name);
    });
  }
}

module.exports = FrameFrame;
