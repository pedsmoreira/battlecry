// @flow

import { Samba } from 'samba';

export default function setup(samba: Samba) {
  samba.aliases.g = 'generate';
  samba.aliases.d = 'destroy';
}
