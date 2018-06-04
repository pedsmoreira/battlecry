import { namedCasex } from 'battlecry';

describe('namedCasex', () => {
  it('replaces all __name__ occurrences', () => {
    const text = 'Hi, my name is __Na Me__, but you can call me __na--me__ or __NaMe__.';
    const transformedText = 'Hi, my name is John Doe, but you can call me john--doe or JohnDoe.';

    expect(namedCasex(text, 'john-doe')).toEqual(transformedText);
  });

  it('transforms array into multiline text', () => {
    const text = ['Hi', 'my name is __Na Me__'];
    const transformedText = 'Hi\r\nmy name is John Doe';

    expect(namedCasex(text, 'john-doe')).toEqual(transformedText);
  });
});
