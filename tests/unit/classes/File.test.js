import { File } from 'samba';

describe('File', () => {
  let file;

  beforeEach(() => {
    file = new File('');
  });

  describe('.glob', () => {
    it('retuns file paths', () => {
      const globBoth = File.glob(`${__dirname}/../fixtures/*.txt`);
      expect(globBoth).toHaveLength(2);
      expect(globBoth[0].filename).toEqual('a.txt');
      expect(globBoth[1].filename).toEqual('b.txt');

      const globA = File.glob(`${__dirname}/../fixtures/a.*`);
      expect(globA).toHaveLength(1);
      expect(globA[0].filename).toEqual('a.txt');
    });
  });

  /*
   * File management
   */

  describe('#binary', () => {
    it('returns true for binary files', () => {
      expect(new File(`${__dirname}/../fixtures/binary`).binary).toBeTruthy();
    });

    it('returns false for text files', () => {
      expect(new File(`${__dirname}/../fixtures/a.txt`).binary).toBeFalsy();
    });

    it('returns false for files that do not exist', () => {
      expect(new File('123456.7890').binary).toBeFalsy();
    });

    it('returns false for .log files', () => {
      expect(new File(`${__dirname}/../fixtures/some-log.log`).binary).toBeFalsy();
    });
  });

  describe('#exists', () => {
    it('returns true if file exists', () => {
      expect(new File(`${__dirname}/../fixtures/a.txt`).exists).toBeTruthy();
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

  });

  describe('#saveAs', () => {

  });

  describe('#move', () => {

  });

  describe('#delete', () => {

  });

  /*
   * Text Helpers
   */

  describe('.joinLines', () => {

  });

  describe('#readText', () => {

  });

  describe('#text', () => {

  });

  describe('#text=', () => {

  });

  describe('#lines', () => {

  });

  describe('#lines=', () => {

  });

  describe('#replaceText', () => {

  });

  describe('#replaceAllText', () => {

  });

  describe('#search', () => {

  });

  describe('#last', () => {

  });

  describe('#before', () => {

  });

  describe('#beforeLast', () => {

  });

  describe('#after', () => {

  });

  describe('#afterLast', () => {

  });

  describe('#prepend', () => {

  });

  describe('#append', () => {

  });

  describe('#replace', () => {

  });

  describe('#replaceLast', () => {

  });

  describe('#remove', () => {

  });

  describe('#removeLast', () => {

  });
});
