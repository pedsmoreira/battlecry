import { Generator } from 'samba';
import { join } from 'path';

import { namespaced } from 'samba/helpers';

export default class ComponentGenerator extends Generator {
  static config = {
    generate: {
      args: 'name',
      options: {
        namespace: { description: 'Namespace', arg: 'required' },
        only: { description: 'Only these resource options (comma separated)', arg: 'required' },
        except: { description: 'Except these resource options (comma separated)', arg: 'required' }
      }
    },
    destroy: {
      options: 'name'
    }
  };

  generate() {
    this.generator('model')
      .args(this.args)
      .generate();

    this.generator('resource-pages')
      .args({ name: this.args.name })
      .options(this.options)
      .generate();

    this.addRouteToFile();
  }

  addRouteToFile() {
    const routesFilePath = namespaced(`app.routes.js`, this.options.namespace);
    const file = new File(routesFilePath);
    const lineNumber = file.searchLastLine('route.default(');

    const newLine = `route('__naMe__', () => import('./pages/__NaMe__'));`;
    file.addLineBefore(lineNumber - 1, newLine, this.args.name);
  }
}
