// @flow

import casex from 'casex';
import pluralize from 'pluralize';

import ArgBuilder from './classes/ArgBuilder';
import File from './classes/File';
import Generator from './classes/Generator';
import GeneratorMethod from './classes/GeneratorMethod';
import OptionBuilder from './classes/OptionBuilder';
import Battlecry from './classes/Battlecry';

import log from './helpers/log';
import namedCasex, { applyPluralization, extractPluraizedPattern } from './helpers/namedCasex';

export {
  ArgBuilder,
  File,
  Generator,
  GeneratorMethod,
  OptionBuilder,
  Battlecry,
  log,
  namedCasex,
  applyPluralization,
  extractPluraizedPattern,
  casex,
  pluralize
};
