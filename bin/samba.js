#!/usr/bin/env node

require('babel-register');

const join = require('path').join;

const Samba = require('samba').Samba;
const samba = new Samba();

samba.load(`${__dirname}/../samba`);
samba.load(`${process.cwd()}/samba`);

samba.play();
