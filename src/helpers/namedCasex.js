// @flow

import casex from 'casex';
import File from '../classes/File';

export default function namedCasex(text: string | string[], name: ?string) {
  if (Array.isArray(text)) text = File.joinLines(text);
  if (!name) return text;

  let newStr = text;
  const matches = text.match(/(__na)([^a-zA-Z]*)(me__)/gi) || [];
  matches.forEach(match => {
    // $FlowFixMe
    const withCasex = casex(name, match.substring(2, match.length - 2));
    newStr = newStr.replace(match, withCasex);
  });

  return newStr;
}
