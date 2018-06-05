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

  it('does not pluralize __name__', () => {
    const text = 'One __name__, two __name__s';
    const transformedText = 'One person, two persons';

    expect(namedCasex(text, 'person')).toEqual(transformedText);
  });

  it('does not singularize __name__', () => {
    const text = 'One __name__, two __name__s';
    const transformedText = 'One people, two peoples';

    expect(namedCasex(text, 'people')).toEqual(transformedText);
  });

  it('pluralizes and singularizes regular _name_', () => {
    const text = 'One _name_, two _name_s';
    const transformedText = 'One duck, two ducks';

    expect(namedCasex(text, 'duck')).toEqual(transformedText);
    expect(namedCasex(text, 'ducks')).toEqual(transformedText);
  });

  it('pluralizes and singularizes irregular _name_', () => {
    const text = 'I am a _name_s _name_';
    const transformedText = 'I am a people person';

    expect(namedCasex(text, 'person')).toEqual(transformedText);
    expect(namedCasex(text, 'people')).toEqual(transformedText);
  });

  it('pluralizes and singularizes composed _name_', () => {
    const text = 'Create new _na me_s on the current _na me_';
    const transformedText = 'Create new user folders on the current user folder';

    expect(namedCasex(text, 'user_folder')).toEqual(transformedText);
    expect(namedCasex(text, 'user_folders')).toEqual(transformedText);
  });

  it('understand when _na_me_ is part of the replaced content', () => {
    const text = 'My name is _na_me_ _na_me_ _na_me_';
    const transformedText = 'My name is a_na_me_b a_na_me_b a_na_me_b';

    expect(namedCasex(text, 'a_na_me_b')).toEqual(transformedText);
  });
});
