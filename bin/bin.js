#!/usr/bin/env node

require('babel-register');

const join = require('path').join;
const Samba = require('samba').Samba;
const program = require('commander');

const samba = new Samba();
samba.load(`${__dirname}/../samba`);
samba.load(`${process.cwd()}/samba`);

program.parse(process.argv);
