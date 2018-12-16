# Getting Started

## Requirements

* [NodeJS](https://nodejs.org/en/) installed

🎩 If your project does not use NodeJS don't worry! Battlecry's API is very simple and you'll only need NodeJS installed to run the commands, no need to change your project setup.

## Install

Install globally

```sh
npm install -g battlecry
```

Or just for a project

```sh
npm install --save-dev battlecry
```

## Command structure

Battlecry has a very simple structure.

`cry <method> <generator> arguments --options`

Battlecry can be used through both `battlecry` and it's short version `cry`.

## Initialize BattleCry on you project

With BattleCry installed, go to your project folder and run:

```bash
cry g init
```

This will perform four actions:

* Create a `battlecry` folder on the root of your project
* Add a `battlecry/battlecry-setup.js` that you can use to add special configurations
* Create a generator called `component`
* Play the just created `component` with the arg `test-abc`

You should now be able to see a file called `it-worked/components/test-abc.txt`. This file was created using the generator at `battlecry/generators/component.generator.js` folder.

_Note_: BattleCry uses ES6 with lots of polyfill, so most things should ✨ _just work_ ✨ on your generator class.

## Help

If you need to check how your methods are registered, you can do so with:

```bash
cry --help
```
