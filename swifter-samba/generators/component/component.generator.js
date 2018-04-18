import { Generator } from 'samba';
import { join } from 'path';

export default class ComponentGenerator extends Generator {
  static config = {
    generate: {
      args: 'name',
      options: {
        namespace: { description: 'Namespace', arg: 'required' }
      }
    },
    destroy: {
      options: 'name'
    }
  };

  getFolder() {
    const { namespace } = this.options;

    const namespaceStr = namespace ? `/namespaces/${namespace}` : '';
    return `src/app${namespaceStr}/components/${this.args.name}`;
  }

  generate() {
    this.templates().forEach(file => {
      file.saveAs(this.getFolder(), this.args.name);
    });
  }
}
