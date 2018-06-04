// @flow

import File from '../classes/File';

import log from './log';

export default function dd(error: Error) {
  log.error(`❌  Error: ${error.message}`);
  log.emptyLine();

  const file = new File('battlecry-error.log');
  file.text = error.stack;
  file.save();

  log.emptyLine();
  log.default('🗄  Please check the file battlecry-error.log for the full stack');
  log.emptyLine();
  process.exit();
}
