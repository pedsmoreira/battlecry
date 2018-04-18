// @flow

import casex from 'casex';

export default function namedCasex(text: string, name: ?string) {
  if (!name) return text;

  let newStr = text;
  const matches = text.match(/(__na)([^a-zA-Z]+)(me__)/gi) || [];
  matches.forEach(match => {
    // $FlowFixMe
    const withCasex = casex(name, match.substring(2, match.length - 2));
    newStr = newStr.replace(match, withCasex);
  });

  return newStr;
}
