// @flow

const File = require('./File');

class Parser {
  file: File;

  static connectedParsers: { [extension: string]: Parser } = {};

  static connect(extension: string, parser: Parser): void {
    Parser.connectedParsers[extension] = parser;
  }

  static getParser(extension: string): Parser {
    const parser = this.connectedParsers[extension];
    if (!parser) throw new Error(`Parser connection not found for extension ${extension}`);

    return parser;
  }

  static parseFile(file: File): Parser {
    return this.getParser(file.getExtension());
  }

  toString(): string {
    return '';
  }
}

module.exports = Parser;
