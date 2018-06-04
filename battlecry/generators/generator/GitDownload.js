// @flow

import fs from 'fs';
import tmp from 'tmp';
import downloadGitRepo from 'download-git-repo';
import { basename, join } from 'path';
import { log, File } from 'battlecry';

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

  get battlecryPath(): string {
    return `${this.path}/battlecry`;
  }

  get hasBattlecry(): boolean {
    return fs.existsSync(this.battlecryPath) && fs.lstatSync(this.battlecryPath).isDirectory();
  }

  copyGenerators(): void {
    this.logBattlecryFolderGuessed();
    this.logCopyingPath();

    log.addIndentation();

    const globPath = this.hasBattlecry ? this.battlecryPath : this.path;
    File.glob(join(globPath, '**')).forEach(file => {
      const newPath = join('battlecry', file.path.substring(globPath.length));
      file.saveAs(newPath);
    });

    log.removeIndentation();
  }

  logBattlecryFolderGuessed() {
    if (this.hasBattlecry) log.success('🧠  Found a battlecry/ folder at the selected directory');
  }

  logCopyingPath() {
    let logPath = '';
    if (this.dir) logPath = join(logPath, this.dir);
    if (this.hasBattlecry) logPath = join(logPath, 'battlecry');
    if (!logPath.endsWith('/')) logPath += '/';

    log.success(`📋  Copying all files from repository dir: ${logPath}`);
  }
}
