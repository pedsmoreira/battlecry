import { File } from 'samba';
import rimraf from 'rimraf';
import fs from 'fs';

const tmpPath = `${__dirname}/File-tmp`;
const fixturesPath = `${__dirname}/../fixtures`;

describe('File', () => {
  let textFile;

  beforeEach(() => {
    textFile = new File('');
    textFile.lines = ['a', 'b', 'c', 'a'];
  });

  afterAll(() => {
    rimraf.sync(tmpPath);
  });

  describe('.glob', () => {
    it('returns file paths', () => {
      const globA = File.glob(`${fixturesPath}/a.*`);
      expect(globA).toHaveLength(1);
      expect(globA[0].filename).toEqual('a.txt');

      const globFirstFolder = File.glob(`${fixturesPath}/*.txt`);
      expect(globFirstFolder).toHaveLength(2);
      expect(globFirstFolder[0].filename).toEqual('a.txt');
      expect(globFirstFolder[1].filename).toEqual('b.txt');

      const globDeep = File.glob(`${fixturesPath}/**/*.txt`);
      expect(globDeep).toHaveLength(3);
      expect(globDeep[0].filename).toEqual('a.txt');
      expect(globDeep[1].filename).toEqual('b.txt');
      expect(globDeep[2].filename).toEqual('c.txt');
    });

    it('does not return folders', () => {
      const globFolder = File.glob(`${fixturesPath}/folder/**`);
      expect(globFolder).toHaveLength(1);
      expect(globFolder[0].filename).toEqual('c.txt');
    });
  });

  /*
   * File management
   */

  describe('#binary', () => {
    it('returns true for binary files', () => {
      expect(new File(`${fixturesPath}/binary`).binary).toBeTruthy();
    });

    it('returns false for text files', () => {
      expect(new File(`${fixturesPath}/a.txt`).binary).toBeFalsy();
    });

    it('returns false for files that do not exist', () => {
      expect(new File('123456.7890').binary).toBeFalsy();
    });

    it('returns false for .log files', () => {
      expect(new File(`${fixturesPath}/some-log.log`).binary).toBeFalsy();
    });
  });

  describe('#exists', () => {
    it('returns true if file exists', () => {
      expect(new File(`${fixturesPath}/a.txt`).exists).toBeTruthy();
    });

    it('returns false if file does not exist', () => {
      expect(new File(`file-that-does-not-exist`).exists).toBeFalsy();
    });
  });

  describe('#filename', () => {
    it('returns file name with extension', () => {
      expect(new File(`some-folder/a.txt`).filename).toEqual('a.txt');
    });
  });

  describe('#dirnmame', () => {
    it('returns file directory', () => {
      expect(new File(`some-folder/a.txt`).dirname).toEqual('some-folder');
    });
  });

  describe('#extension', () => {
    it('returns file extension', () => {
      expect(new File(`some-folder/a.txt`).extension).toEqual('.txt');
    });
  });

  describe('#save', () => {
    it('calls saveAs with file path and name', () => {
      const file = new File('path/__naMe__', 'test-name');
      file.saveAs = jest.fn();

      file.save();
      expect(file.saveAs).toHaveBeenCalledWith('path/testName');
    });
  });

  describe('#saveAs', () => {
    it('saves existing file with new content', () => {
      const path = `${tmpPath}/save-existing.txt`;

      const firstFile = new File(path);
      firstFile.text = '123';
      firstFile.save();

      const secondFile = new File(path);
      expect(secondFile.text).toEqual('123');
      secondFile.text = 'abc';
      secondFile.save();

      expect(new File(path).text).toEqual('abc');
    });

    it('saves new file with content', () => {
      const path = `${tmpPath}/save-new.txt`;

      const file = new File(path);
      expect(file.exists).toBeFalsy;

      file.text = 'abc';
      file.save();
      expect(new File(path).text).toEqual('abc');
    });

    it('applies namedCasex to file path', () => {
      const path = `${tmpPath}/save-__na-me__.txt`;
      const realPath = `${tmpPath}/save-with-cool-name.txt`;

      const file = new File(path, 'withCoolName');
      file.save();

      expect(new File(path).exists).toBeFalsy();
      expect(new File(realPath).exists).toBeTruthy();
    });

    it('create necessary directories to save file', () => {
      expect(fs.existsSync(`${tmpPath}/a/`)).toBeFalsy();

      const path = `${tmpPath}/a/b/c/file.txt`;
      new File(path).save();

      expect(fs.existsSync(`${tmpPath}/a/b/c/`)).toBeTruthy();
      expect(new File(path).exists).toBeTruthy();
    });

    it('saves binary files', () => {
      const path = `${tmpPath}/binary-__na-me__`;
      const realPath = `${tmpPath}/binary-saved-as`;

      new File(`${fixturesPath}/binary`).saveAs(path, 'saved-as');
      expect(new File(realPath).exists).toBeTruthy();
    });

    it('appends the filename if the given path ends with /', () => {
      const path = `${tmpPath}/binary-folder-__na-me__/`;
      const realPath = `${tmpPath}/binary-folder-saved-as/binary`;

      new File(`${fixturesPath}/binary`).saveAs(path, 'saved-as');
      expect(new File(realPath).exists).toBeTruthy();
    });
  });

  describe('#move', () => {
    it('moves the file', () => {
      const path = `${tmpPath}/file-to-be-moved.txt`;
      const file = new File(path).save();

      const newPath = `${tmpPath}/moved-__name__.txt`;
      const realNewPath = `${tmpPath}/moved-abc.txt`;
      file.move(newPath, 'abc');

      expect(new File(realNewPath).exists).toBeTruthy();
      expect(new File(path).exists).toBeFalsy();
    });
  });

  describe('#delete', () => {
    it('deletes the file', () => {
      const path = `${tmpPath}/file-to-be-deleted.txt`;

      const file = new File(path).save();
      expect(file.exists).toBeTruthy();
      file.delete();

      expect(new File(path).exists).toBeFalsy();
    });
  });

  /*
   * Text Helpers
   */

  describe('.joinLines', () => {
    it('returns one line if only one item in the array', () => {
      expect(File.joinLines(['a'])).toEqual('a');
    });

    it('returns lines joined by \r\n', () => {
      expect(File.joinLines(['a', 'b', 'c'])).toEqual('a\r\nb\r\nc');
    });
  });

  describe('#readText', () => {
    it('sets text if file exists', () => {
      const file = new File(`${fixturesPath}/a.txt`);
      file.readText();
      expect(file.text).toEqual('content on file a');
    });

    it('assigns an empty string to text if the file doesnt exist', () => {
      const file = new File(`file-that-does-not-exist.txt`);
      file.readText();
      expect(file.text).toEqual('');
    });
  });

  describe('#text', () => {
    it('throws an error if the file is a binary', () => {
      const file = new File(`${fixturesPath}/binary`);
      expect(() => file.text).toThrowError();
    });

    it('reads text if no text has been assigned yet', () => {
      const file = new File(`${fixturesPath}/a.txt`);
      expect(file.text).toEqual('content on file a');
    });

    it('returns existing text', () => {
      const file = new File(`${fixturesPath}/a.txt`);
      expect(file.__text).toBeUndefined();
      file.text = 'set some text';
      expect(file.text).toEqual('set some text');
    });
  });

  describe('#lines', () => {
    it('returns text as an array broken by line', () => {
      expect(textFile.lines).toEqual(['a', 'b', 'c', 'a']);
    });

    it('works with only \n', () => {
      textFile.text = 'a\nb\r\nc';
      expect(textFile.lines).toEqual(['a', 'b', 'c']);
    });

    it('returns an empty array if text is empty', () => {
      const file = new File('');
      expect(file.text);
    });
  });

  describe('#lines=', () => {
    it('sets text joined by \r\n', () => {
      textFile.lines = [1, 'b', 3];
      expect(textFile.text).toEqual('1\r\nb\r\n3');
    });
  });

  describe('#replaceText', () => {
    it('replaces first text occurrence', () => {
      textFile.replaceText('a', '123456');
      expect(textFile.lines).toEqual(['123456', 'b', 'c', 'a']);
    });
  });

  describe('#replaceAllText', () => {
    it('replaces all occurrences of a text', () => {
      textFile.replaceAllText('a', '123456');
      expect(textFile.lines).toEqual(['123456', 'b', 'c', '123456']);
    });
  });

  describe('#search', () => {
    it('returns line number of the first encounter', () => {
      expect(textFile.search('a')).toBe(0);
      expect(textFile.search('b')).toBe(1);
    });

    it('returns search if a number', () => {
      expect(textFile.search(101)).toEqual(101);
    });

    it('throws an error when nothing is found', () => {
      expect(() => textFile.search('text-not-in-file')).toThrowError();
    });
  });

  describe('#last', () => {
    it('returns line number of the last encounter', () => {
      expect(textFile.last('a')).toBe(3);
      expect(textFile.last('b')).toBe(1);
    });

    it('returns search if a number', () => {
      expect(textFile.last(101)).toEqual(101);
    });

    it('throws an error when nothing is found', () => {
      expect(() => textFile.last('text-not-in-file')).toThrowError();
    });
  });

  describe('#before', () => {
    it('adds line with content before first occurrence', () => {
      textFile.before('a', '__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['coolName', 'a', 'b', 'c', 'a']);
    });
  });

  describe('#beforeLast', () => {
    it('adds line with content before last occurence', () => {
      textFile.beforeLast('a', '__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['a', 'b', 'c', 'coolName', 'a']);
    });
  });

  describe('#after', () => {
    it('adds line with content after first occurrence', () => {
      textFile.after('a', '__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['a', 'coolName', 'b', 'c', 'a']);
    });
  });

  describe('#afterLast', () => {
    it('adds line with content after last occurence', () => {
      textFile.afterLast('a', '__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['a', 'b', 'c', 'a', 'coolName']);
    });
  });

  describe('#prepend', () => {
    it('adds line with content to the beginning of the file', () => {
      textFile.prepend('__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['coolName', 'a', 'b', 'c', 'a']);
    });
  });

  describe('#append', () => {
    it('adds line with content to the end of the file', () => {
      textFile.append('__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['a', 'b', 'c', 'a', 'coolName']);
    });
  });

  describe('#replace', () => {
    it('replaces first occurrence with new content', () => {
      textFile.replace('a', '__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['coolName', 'b', 'c', 'a']);
    });
  });

  describe('#replaceLast', () => {
    it('replaces last occurrence with new content', () => {
      textFile.replaceLast('a', '__naMe__', 'cool-name');
      expect(textFile.lines).toEqual(['a', 'b', 'c', 'coolName']);
    });
  });

  describe('#remove', () => {
    it('removes line of the first occurrence', () => {
      textFile.remove('__name__', 'a');
      expect(textFile.lines).toEqual(['b', 'c', 'a']);
    });
  });

  describe('#removeLast', () => {
    it('removes line of the last occurrence', () => {
      textFile.removeLast('__name__', 'a');
      expect(textFile.lines).toEqual(['a', 'b', 'c']);
    });
  });
});
