// @flow

const Parser = require('./Parser');

class File {
  path: string;
  autoSave: boolean = false;

  static src(path: string): File {
    // $FlowFixMe
    return '';
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

  duplicate(path: string): File {
    return File.edit(path);
  }

  rename(newName: string): void {}

  move(newPath: string): void {}

  delete(): void {}

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

  replaceNames(name: string) {}
}

module.exports = File;
