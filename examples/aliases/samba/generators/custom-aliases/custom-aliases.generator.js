import { Generator, log } from 'samba';

export default class CustomAliasesGenerator extends Generator {
  config = {
    strike: {},
    roll: {}
  };

  strike() {
    log.success('Strike!!!');
  }

  roll() {
    log.success("That's how we roll!");
  }
}
