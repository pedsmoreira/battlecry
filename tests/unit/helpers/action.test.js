import action from 'helpers/action';

describe('action', () => {
  describe('given an action with alias', () => {
    it('returns the aliased action', () => {
      process.argv = 'node build/index.js g model'.split(' ');
      expect(action()).toEqual('generate');
    });
  });

  describe('given an action without alias', () => {
    it('returns the action', () => {
      process.argv = 'node build/index.js someOtherAction model'.split(' ');
      expect(action()).toEqual('someOtherAction');
    });
  });
});
