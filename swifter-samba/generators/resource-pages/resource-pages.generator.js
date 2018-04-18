// @flow
import { Generator } from 'samba';

export default class ResourcePagesGenerator extends Generator {
  get routes() {}

  generate() {}

  generateIndex() {
    if (!this.routes.index) return;
  }

  generateShow() {
    if (!this.routes.show) return;
  }

  generateEdit() {
    if (!this.routes.edit) return;
  }
}
