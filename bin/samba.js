#!/usr/bin/env node

require('babel-register');

const join = require('path').join;
const program = require('commander');

const Samba = require('samba').Samba;
const samba = new Samba();

samba.load(`${__dirname}/../samba`);
samba.load(`${process.cwd()}/samba`);
samba.setup(`${process.cwd()}/samba/samba-setup.js`);

program.parse(process.argv);
