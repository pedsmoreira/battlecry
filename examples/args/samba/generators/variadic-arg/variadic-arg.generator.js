import { Generator } from 'samba';

export default class VariadicArgGenerator extends Generator {
  config = {
    generate: {
      args: 'name ...pets', // Variadic args can also be optional: ...pets?
      description: 'Example generator method that have a variadic arg'
    }
  };

  generate() {
    const { name, pets } = this.args;

    const file = this.template('*.txt');
    file.replaceText('@PETS', pets.join(', ')); // pets is an array
    file.saveAs(`it-worked/variadic-arg/`, name);
  }
}
