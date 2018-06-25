// @flow

import nodeGlob from 'glob';

export const defaultOptions = {
  dot: true,
  ignore: ['**/.DS_Store']
};

export default function(pattern: string, options: Object = {}) {
  return nodeGlob.sync(pattern, { ...defaultOptions, ...options });
}
