// @flow

import namedCasex from 'helpers/namedCasex';
import Parser from 'classes/Parser';

export default class File {
  path: string;
  autoSave: boolean = false;
  text: string;

  constructor(path: string) {
    this.path = path;
    this.load();
  }

  static src(path: string): File {
    return new File(path);
  }

  static edit(path: string): File {
    const file = this.src(path);
    file.autoSave = true;

    return file;
  }

  static copy(from: string, to: string): File {
    return this.src(from).duplicate(to);
  }

  /*
   * Actions
   */

  load(): void {
    this.text = '';
  }

  duplicate(path: string): File {
    return File.edit(path);
  }

  rename(newName: string): void {}

  move(newPath: string): void {}

  delete(): void {}

  save() {}

  /*
   * Text helpers
   */

  parse(): Parser {
    return Parser.parseFile(this);
  }

  getText(): string {
    return '';
  }

  getTextAsLines(): string[] {
    return [];
  }

  getFilename(): string {
    return '';
  }

  getExtension(): string {
    return '';
  }

  searchLine(str: string): number {
    return 0;
  }

  searchLastLine(str: string): number {
    return 0;
  }

  replaceLine(line: number, str: string): void {}

  searchReplaceLine(search: string, newLine: string): void {}

  replaceAll(search: string, replace: string): void {}

  removeLine(number: number): void {}

  searcRemoveLine(search: string): void {}

  addLineAfter(search: string, newLine: number) {}

  addLineAfterLast(search: string, newLine: number) {}

  applyCasex(name: string) {
    this.rename(namedCasex(this.getFilename(), name));
    this.text = namedCasex(this.text, name);
  }
}
