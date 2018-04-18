// @flow

import fs from 'fs';
import mkdirp from 'mkdirp';
import { basename, dirname, extname } from 'path';

import namedCasex from 'helpers/namedCasex';

export default class File {
  path: string;
  contents: string;

  constructor(path: string) {
    this.path = path;
    this.read();
  }

  /*
   * Actions
   */

  read(): void {
    this.contents = fs.readFileSync(this.path, 'utf8');
  }

  save() {
    this.saveAs(this.path);
  }

  saveAs(path: string, name?: string): File {
    if (path.endsWith('/')) path += this.getFilename();
    path = namedCasex(path, name);

    mkdirp.sync(dirname(path));
    fs.writeFileSync(path, namedCasex(this.contents, name));

    return new File(path);
  }

  delete(): void {
    fs.unlink(this.path);
  }

  /*
   * Text helpers
   */

  static joinLines(lines: string[]): string {
    return lines.join('\r\n');
  }

  setLines(lines: string[]): void {
    this.contents = File.joinLines(lines);
  }

  getLine(lineNumber: number): string {
    return this.getLines()[lineNumber];
  }

  getLines(): string[] {
    return this.contents.match(/[^\r\n]+/g) || [];
  }

  getFilename(): string {
    return basename(this.path);
  }

  getDirectory(): string {
    return dirname(this.path);
  }

  getExtension(): string {
    return extname(this.path);
  }

  replace(search: string | RegExp, replace: string, name?: string): void {
    this.contents.replace(search, namedCasex(replace, name));
  }

  replaceAll(search: string, replace: string, name?: string): void {
    this.replace(new RegExp(search, 'g'), replace, name);
  }

  searchLine(str: string, lines: string[] = this.getLines()): ?number {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.indexOf(str) !== -1) return i;
    }
  }

  searchLastLine(str: string): ?number {
    return this.searchLine(str, this.getLines().reverse());
  }

  addLineBefore(lineNumber: number, contents: string, name?: string) {
    const lines = this.getLines();
    lines.splice(lineNumber, 0, namedCasex(contents, name));

    this.setLines(lines);
  }

  addLineAfter(lineNumber: number, contents: string, name?: string) {
    const lines = this.getLines();
    lines.splice(lineNumber - 1, 0, namedCasex(contents, name));

    this.setLines(lines);
  }

  replaceLine(lineNumber: number, contents: string, name?: string): void {
    const lines = this.getLines();
    lines[lineNumber] = namedCasex(contents, name);

    this.setLines(lines);
  }

  removeLine(number: number): void {
    const lines = this.getLines();
    delete lines[number];

    this.setLines(lines);
  }
}
