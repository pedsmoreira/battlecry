class Scaffold {
  setup() {
    this.option('n, --namespace [name]', 'Specify namespace');
  }

  generate() {
    console.log('generate a new scaffold');
  }
}

module.exports = Scaffold;
