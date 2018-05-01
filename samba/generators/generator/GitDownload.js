// @flow

import fs from 'fs';
import glob from 'glob';
import tmp from 'tmp';
import downloadGitRepo from 'download-git-repo';
import { File } from 'samba';
import { basename, join } from 'path';

export default class GitDownload {
  repository: string;
  dir: ?string;
  tmpPath: string;

  constructor(repository: string, dir: ?string) {
    this.repository = repository;
    this.dir = dir;
    this.tmpPath = tmp.fileSync().name;
  }

  async handle() {
    // $FlowFixMe
    return new Promise((resolve, reject) => {
      downloadGitRepo(this.repository, this.tmpPath, err => {
        if (err) return reject(err);

        this.copyGenerators();
        resolve();
      });
    });
  }

  get path(): string {
    if (!this.dir) return this.tmpPath;
    return `${this.tmpPath}/${this.dir}`;
  }

  get sambaPath(): string {
    return `${this.path}/samba`;
  }

  get hasSamba(): boolean {
    return fs.existsSync(this.sambaPath) && fs.lstatSync(this.sambaPath).isDirectory();
  }

  copyGenerators() {
    const globPath = this.hasSamba ? this.sambaPath : this.path;

    File.glob(`${globPath}/**`).forEach(file => {
      const newPath = join(process.cwd(), 'samba', file.path.substring(globPath.length));
      file.saveAs(newPath);
    });
  }
}
