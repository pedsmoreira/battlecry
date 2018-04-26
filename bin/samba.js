#!/usr/bin/env node

const dirname = require('path').dirname;

require('babel-register')({
  ignore: function(filename) {
    const folder = dirname(__dirname);
    if (!filename.startsWith(folder) && filename.indexOf('node_modules/')) return false;

    return !filename.startsWith(`${folder}/src`) && !filename.startsWith(`${folder}/samba`);
  },
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

const Samba = require('samba').Samba;
const samba = new Samba();

samba.load(`${__dirname}/../samba`);
samba.load(`${process.cwd()}/samba`);

samba.play();
