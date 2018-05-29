#!/usr/bin/env node

require('./registerBabel');

// samba is not linked yet for this file on Windows
const Samba = require(`${__dirname}/../src`).Samba;
const samba = new Samba();

samba.load(`${__dirname}/../samba`);
samba.load(`${process.cwd()}/samba`);

samba.play();
