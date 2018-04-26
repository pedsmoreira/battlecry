#!/usr/bin/env node

require('babel-register')({
  presets: [
    `${__dirname}/../node_modules/babel-preset-flow`,
    `${__dirname}/../node_modules/babel-preset-env`,
    `${__dirname}/../node_modules/babel-preset-stage-0`
  ],
  plugins: [
    `${__dirname}/../node_modules/babel-plugin-transform-decorators-legacy`,
    [
      `${__dirname}/../node_modules/babel-plugin-module-resolver`,
      {
        alias: {
          samba: `${__dirname}/..`
        }
      }
    ]
  ]
});

const join = require('path').join;

const Samba = require('samba').Samba;
const samba = new Samba();

samba.load(`${__dirname}/../samba`);
samba.load(`${process.cwd()}/samba`);

samba.play();
