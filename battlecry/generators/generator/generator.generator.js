// @flow

import { Generator } from 'battlecry';
import GitDownload from './GitDownload';

export default class GeneratorGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      description: 'Generate a new generator'
    },
    download: {
      args: 'repository',
      options: {
        dir: { description: 'The repository directory where the generators are located', arg: 'required' }
      },
      description: 'Download one or more generators from GitHub'
    },
    destroy: {
      args: 'name',
      description: 'Destroy an existing generator'
    }
  };

  get nameArg(): string {
    // $FlowFixMe
    return this.args.name;
  }

  get folder(): string {
    return `battlecry/generators/${this.nameArg}/`;
  }

  generate() {
    this.template('*.generator.js').saveAs(this.folder, this.nameArg);
    this.templates('templates/**').forEach(file => file.saveAs(`${this.folder}templates/`));
  }

  download() {
    // $FlowFixMe
    return new GitDownload(this.args.repository, this.options.dir).handle();
  }

  destroy() {
    this.delete(this.folder);
  }
}
