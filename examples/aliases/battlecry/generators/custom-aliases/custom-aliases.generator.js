import { Generator, log } from 'battlecry';

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
