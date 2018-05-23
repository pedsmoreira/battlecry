#!/usr/bin/env node

require('./registerBabel');

const Samba = require(`samba`).Samba;
const samba = new Samba();

samba.load(`${__dirname}/../samba`);
samba.load(`${process.cwd()}/samba`);

samba.play();
