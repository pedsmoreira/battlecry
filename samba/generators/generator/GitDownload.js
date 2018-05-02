// @flow

import fs from 'fs';
import tmp from 'tmp';
import downloadGitRepo from 'download-git-repo';
import { basename, join } from 'path';
import { log, File } from 'samba';

export default class GitDownload {
  repository: string;
  dir: ?string;
  tmpPath: string;

  constructor(repository: string, dir: ?string) {
    this.repository = repository;
    this.dir = dir;
    this.tmpPath = tmp.tmpNameSync();
  }

  async handle() {
    // $FlowFixMe
    return new Promise((resolve, reject) => {
      log.success(`☁️  Downloading ${this.repository} repository`);
      downloadGitRepo(this.repository, this.tmpPath, err => {
        if (err) return reject(err);

        this.copyGenerators();
        resolve();
      });
    });
  }

  get path(): string {
    if (!this.dir) return this.tmpPath;
    return join(this.tmpPath, this.dir);
  }

  get sambaPath(): string {
    return `${this.path}/samba`;
  }

  get hasSamba(): boolean {
    return fs.existsSync(this.sambaPath) && fs.lstatSync(this.sambaPath).isDirectory();
  }

  copyGenerators(): void {
    this.logSambaFolderGuessed();
    this.logCopyingPath();

    log.addIndentation();

    const globPath = this.hasSamba ? this.sambaPath : this.path;
    File.glob(join(globPath, '**')).forEach(file => {
      const newPath = join('samba', file.path.substring(globPath.length));
      file.saveAs(newPath);
    });

    log.removeIndentation();
  }

  logSambaFolderGuessed() {
    if (this.hasSamba) log.success('🧠  Found a samba/ folder at the selected directory');
  }

  logCopyingPath() {
    let logPath = '';
    if (this.dir) logPath = join(logPath, this.dir);
    if (this.hasSamba) logPath = join(logPath, 'samba');
    if (!logPath.endsWith('/')) logPath += '/';

    log.success(`📋  Copying all files from repository dir: ${logPath}`);
  }
}
