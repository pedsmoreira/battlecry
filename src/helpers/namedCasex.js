// @flow

import casex from 'casex';

export default function namedCasex(text: string, name: string) {
  let newStr = text;

  const matches = text.match(/(__na)([^a-zA-Z]+)(me__)/gi) || [];
  matches.forEach(match => {
    newStr = newStr.replace(match, casex(name, match.substring(2, match.length - 2)));
  });

  return newStr;
}
