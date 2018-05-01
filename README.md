# 🥁 samba

> A simple and customizable scaffolding tool for all languages and frameworks

[![npm version](https://img.shields.io/npm/v/samba.svg)](https://www.npmjs.org/package/samba)
[![Build Status](https://travis-ci.org/pedsmoreira/samba.svg?branch=master)](https://travis-ci.org/pedsmoreira/samba)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Maintainability](https://api.codeclimate.com/v1/badges/1b10d18cd15953369c3f/maintainability)](https://codeclimate.com/github/pedsmoreira/samba/maintainability)

<!-- [![Test Coverage](https://api.codeclimate.com/v1/badges/1b10d18cd15953369c3f/test_coverage)](https://codeclimate.com/github/pedsmoreira/samba/test_coverage) -->

## Why Samba?

✅ Perfect for creating new modules, components and even new projects
✅ Use it with all languages and frameworks
✅ Plug'n play customizable generators
✅ Simple & Powerful API
✅ Type less, accomplish more

## Requirements

* [NodeJS](https://nodejs.org/en/) installed

🎩 If your project does not use NodeJS don't worry! Samba's API is very simple and you'll only need NodeJS installed to run the commands, no need to change your project setup.

## Install

```sh
npm install -g samba
```

## Usage

Samba has a very simple structure.

`sb <method> <generator> arguments --options`

Samba can be used through both `samba` and it's short verion `sb`

### Initialize Samba on you project

With Samba installed, go to your project folder and run:

```js
sb g init
```

This will perform four actions:

* Create a `samba` folder on the root of your project
* Add a `samba/samba-setup.js` that you can use to add special configurations
* Create a generator called `component`
* Play the just created `component` with the arg `test-abc`

You should now be able to see a file called `it-worked/components/test-abc.txt`. This file was created using the generator at `samba/generators/component.generator.js` folder. Check out the generator to see how it works.

### Creating your own generator

### Generator Methods

### Handling files

### Downloading generators

### Customizing your samba-setup.js

#### Shortcuts

Since you may be using Samba many times throughout your work day, it comes with handy shortcuts and setup process.

#### External packages

### Examples

## Resources

* [Contributing Guide](./CONTRIBUTING.md)
* [Code of Conduct](./CODE_OF_CONDUCT.md)
