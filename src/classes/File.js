// @flow

import fs from 'fs';
import mkdirp from 'mkdirp';
import { basename, dirname, extname } from 'path';
import fileChecker from 'istextorbinary';

import namedCasex from '../helpers/namedCasex';
import log from '../helpers/log';

export default class File {
  path: string;
  __text: string;

  constructor(path: string) {
    this.path = path;
  }

  /*
   * File management
   */

  get binary(): boolean {
    return !fileChecker.isTextSync(this.path);
  }

  get text(): string {
    if (this.binary) throw new Error('Attempting to treat binary file as text');
    return this.__text || fs.readFileSync(this.path, 'utf8');
  }

  set text(text: string): void {
    this.__text = text;
  }

  get persisted(): boolean {
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

  save(): void {
    this.saveAs(this.path);
  }

  saveAs(path: string, name?: string): File {
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

  before(search: string | number, contents: string, name?: string): this {
    const lines = this.lines;
    lines.splice(this.search(search), 0, namedCasex(contents, name));

    this.lines = lines;
    return this;
  }

  beforeLast(search: string | number, contents: string, name?: string): this {
    return this.before(this.last(search), contents, name);
  }

  after(search: number | string, contents: string, name?: string): this {
    return this.before(this.search(search) + 1, contents, name);
  }

  afterLast(search: number | string, contents: string, name?: string): this {
    return this.after(this.last(search), contents, name);
  }

  add(contents: string, name?: string): this {
    return this.before(this.lines.length, contents, name);
  }

  replace(search: string | number, contents: string, name?: string): this {
    const lines = this.lines;
    lines[this.search(search)] = namedCasex(contents, name);

    this.lines = lines;
    return this;
  }

  remove(search: string | number): this {
    const lines = this.lines;
    delete lines[this.search(search)];

    this.lines = lines;
    return this;
  }
}
