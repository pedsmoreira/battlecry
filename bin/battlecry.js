#!/usr/bin/env node

require('./registerBabel');

// battlecry is not linked yet for this file on Windows
const Battlecry = require(`${__dirname}/../src`).Battlecry;
const battlecry = new Battlecry();

battlecry.load(`${__dirname}/../battlecry`);
battlecry.load(`${process.cwd()}/battlecry`);

battlecry.play();
