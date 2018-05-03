// @flow

import fs from 'fs';
import glob from 'glob';
import mkdirp from 'mkdirp';
import { basename, dirname, extname } from 'path';
import fileChecker from 'istextorbinary';

import namedCasex from '../helpers/namedCasex';
import log from '../helpers/log';

export default class File {
  path: string;
  name: ?string;
  __text: string;

  constructor(path: string, name?: string) {
    this.path = path;
    this.name = name;
  }

  static glob(pattern: string, name?: string): File[] {
    const files = [];

    glob.sync(namedCasex(pattern, name)).forEach(path => {
      if (basename(path).includes('.')) files.push(new File(path));
    });

    return files;
  }

  /*
   * File management
   */

  get binary(): boolean {
    if (!this.exists || this.extension === '.log') return false;
    return !fileChecker.isTextSync(this.path);
  }

  get exists(): boolean {
    return fs.existsSync(this.path);
  }

  get filename(): string {
    return basename(this.path);
  }

  get dirname(): string {
    return dirname(this.path);
  }

  get extension(): string {
    return extname(this.path);
  }

  save(): this {
    return this.saveAs(this.path, this.name);
  }

  saveAs(path: string, name?: ?string): File {
    if (path.endsWith('/')) path += this.filename;
    path = namedCasex(path, name);

    const creating = !fs.existsSync(path);
    mkdirp.sync(dirname(path));

    if (this.binary) {
      fs.createReadStream(this.path).pipe(fs.createWriteStream(path));
    } else {
      fs.writeFileSync(path, namedCasex(this.text, name));
    }

    if (creating) log.success(`✅  File created: ${path}`);
    else log.success(`☑️  File updated: ${path}`);

    return new File(path);
  }

  delete(): void {
    fs.unlinkSync(this.path);
    log.success(`🔥  File deleted: ${this.path}`);
  }

  /*
   * Text helpers
   */

  static joinLines(lines: string[]): string {
    return lines.join('\r\n');
  }

  readText() {
    this.text = this.exists ? fs.readFileSync(this.path, 'utf8') : '';
  }

  get text(): string {
    if (this.binary) throw new Error('Attempting to treat binary file as text');

    if (!this.__text) this.readText();
    return this.__text;
  }

  set text(text: string): void {
    this.__text = text;
  }

  get lines(): string[] {
    return this.text.split(/\r?\n/) || [];
  }

  set lines(lines: string[]): void {
    this.text = File.joinLines(lines);
  }

  replaceText(search: string | RegExp, replace: string, name?: string): this {
    this.text = this.text.replace(search, namedCasex(replace, name));
    return this;
  }

  replaceAllText(search: string, replace: string, name?: string): this {
    return this.replaceText(new RegExp(search, 'g'), replace, name);
  }

  search(search: string | number, lines: string[] = this.lines): number {
    if (typeof search === 'number') return search;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.indexOf(search) !== -1) return i;
    }

    throw new Error(`'${search}' not found on file ${this.path}`);
  }

  last(search: string | number, lines: string[] = this.lines): number {
    return lines.length - this.search(search, lines.reverse()) - 1;
  }

  before(search: string | number, text: string, name?: string): this {
    const lines = this.lines;
    lines.splice(this.search(search), 0, namedCasex(text, name));

    this.lines = lines;
    return this;
  }

  beforeLast(search: string | number, text: string, name?: string): this {
    return this.before(this.last(search), text, name);
  }

  after(search: number | string, text: string, name?: string): this {
    return this.before(this.search(search) + 1, text, name);
  }

  afterLast(search: number | string, text: string, name?: string): this {
    return this.after(this.last(search), text, name);
  }

  prepend(text: string, name?: string): this {
    return this.before(0, text, name);
  }

  append(text: string, name?: string): this {
    return this.before(this.lines.length, text, name);
  }

  replace(search: string | number, text: string, name?: string): this {
    const lines = this.lines;
    lines[this.search(search)] = namedCasex(text, name);

    this.lines = lines;
    return this;
  }

  replaceLast(search: string | number, text: string, name?: string): this {
    return this.replace(this.last(search), text, name);
  }

  remove(search: string | number): this {
    const lines = this.lines;
    lines.splice(this.search(search), 1);

    this.lines = lines;
    return this;
  }

  removeLast(search: string | number): this {
    return this.remove(this.last(search));
  }
}
