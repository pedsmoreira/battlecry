// @flow

import { Battlecry } from 'battlecry';

export default function setup(battlecry: Battlecry) {
  battlecry.aliases.g = 'generate';
  battlecry.aliases.d = 'destroy';
}
