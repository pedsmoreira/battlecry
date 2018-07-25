# 🥁 battlecry

> A simple and customizable scaffolding tool for all languages and frameworks

[![npm version](https://img.shields.io/npm/v/battlecry.svg)](https://www.npmjs.org/package/battlecry)
[![Build Status](https://travis-ci.org/pedsmoreira/battlecry.svg?branch=master)](https://travis-ci.org/pedsmoreira/battlecry)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Maintainability](https://api.codeclimate.com/v1/badges/a2c3f76f8d99cfe9ef1c/maintainability)](https://codeclimate.com/github/pedsmoreira/battlecry/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a2c3f76f8d99cfe9ef1c/test_coverage)](https://codeclimate.com/github/pedsmoreira/battlecry/test_coverage)

## What is Battlecry?

Battlecry is a cross-platform tool for automating repetitive software development tasks.

Designed to boost developers' performance, Battlecry provides an interface for creating simple and customizable commands that can perform any type of action. Since most of the time developers need to `create`, `copy`, `move`, `edit` or `delete` text files, Battlecry already comes with file helpers that make templating a breeze.

<p align="center">
  <img src="./docs/screencast.gif" />
</p>

_Note: Battlecry got renamed from Samba to avoid confusions with the Samba Linux software_

## Why Battlecry?

* ✅ Perfect for creating new modules, components and even new projects
* ✅ Easy to share with your team through your favorite version control system
* ✅ Use it with all languages and frameworks
* ✅ Plug'n play customizable generators
* ✅ Simple & Powerful API
* ✅ Next generation naming with [casex](https://github.com/pedsmoreira/casex)

The farther you go on a project, the more likely you are to have a custom architecture and need your own generators to fit it. Each project has it's own requirements and it's only fair that it get it's own generators. With Battlecry you can create your own or download generators to give you a nice quickstart, and when you need to customize them, it's very easy to do so and you can share the changes with your whole team.

## Examples

Each example can be downloaded with `cry download generator examples/example_name_here`.

1.  [args](./examples/args): Working with arguments
2.  [options](./examples/options): Working with options
3.  [multiple-templates](./examples/multiple-templates): Working with multiple template files
4.  [aliases](./examples/aliases): Creating your own method aliases
5.  [helpers](./examples/helpers): Using helpers to share methods across generators
6.  [call-other-generators](./examples/call-other-generators): Using one generator to call multiple generators in a clean fashion
7.  [exec](./examples/exec): Executing a command line
8.  [load](./examples/load): Loading generators from a folder other than `battlecry/`

Advanced examples

9.  [WIP] - [advanced-crud](./examples/advanced-crud): Make magical CRUDs

# Getting Started

## Requirements

* [NodeJS](https://nodejs.org/en/) installed

🎩 If your project does not use NodeJS don't worry! Battlecry's API is very simple and you'll only need NodeJS installed to run the commands, no need to change your project setup.

## Install

```sh
npm install -g battlecry
```

## Command structure

Battlecry has a very simple structure.

`cry <method> <generator> arguments --options`

Battlecry can be used through both `battlecry` and it's short verion `cry`.

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

## Casex naming

This project uses [casex](https://github.com/pedsmoreira/casex), an open source library designed to be an `All in one function for transforming word casings`. You may see many functions that can optionally receive `name?: string`. This means that all occurrences of the `__name__` pattern will be substituted using `casex` if the `name` parameter is provided.

Here are a few examples of how it works, considering you're using the name `John Doe`:

* `__name__`: johndoe
* `__naMe__`: johnDoe
* `__NaMe__`: JohnDoe
* `__na-me__`: john-doe
* `__na me__`: john doe

### Pluralization and singularization

BattleCry provides pluralization and singularization out of the box with [pluralize](https://github.com/blakeembrey/pluralize).

To use this feature, instead of `__name__`, use `_name_`, with one underscore. Here are a few examples of how it works:

* Regulars: `user`
  * `_name_`: user
  * `_name_s`: users
* Irregulars: `person`
  * `_name_`: person
  * `_name_s`: people
* Composed names: `user name`
  * `_na me_`: user name
  * `_na me_s`: user names
* Names in the plural: `users`
  * `_na me_`: user
  * `_na me_s`: users

## Creating your own generators

```bash
cry g generator your_generator_name_here
```

This command will create a `battlecry/generators/your_generator_name_here`

# Generator API

## Configuring your methods

Each generator must have a `config` variable defining all BattleCry methods.

```js
config = {
  options?: {
    [name: string]: {
      description: string,
      arg?: 'required' | 'optional', // An option may receive an argument
      alias?: string // Defaults to the first letter of the option name
    }
  },
  args?: string, // name ...surnames?
  description?: string
}
```

## File helpers

* `files(pattern: string, name?: ?string, globOptions?: Object): File[]`: Get files that match `pattern`
* `file(pattern: string, name?: ?string, globOptions?: Object): File`: Get first file that matches `pattern`
* `delete(path: string, name?: string): void`: Delete a file or directory

- `templates(pattern?: string, globOptions?: Object): File[]`: Get files inside the generator's `templates/` subdirectory
- `template(pattern?: string, globOptions?: Object): File`: Get first file that matches the pattern

As you may have noticed, most of these methods return one or an array of File(s). For more details about the `File` class API, please check the [File API](#File API) section below.

_Note: BattleCry performs all IO operations synchronously_

### [Advanced] Glob Options

By default BattleCry lists all files except for `.DS_Store` _(created on OSX)_.

If you need to provide custom `globOptions`, please refer to the list of options is available on the node-glob _(this is the library used to do globbing on BattleCry)_ repository: https://github.com/isaacs/node-glob#options

## Helpers to call other generators

There may be cases when you may want to call multiple generators from one generators. BattleCry provides nice helpers for you to accomplish that in you `Generator` class.

* `generator(name: string): Generator`: Get a new generator instance by name
* `setArgs(args: Object): this`: Setup generator arguments to be consumed when `play` is called
* `setOptions(options: Object): this`: Setup generator options to be consumed when `play` is called
* `play(methodName: string)`: Play a generator method

## Executing command line directly

In some cases you may wanna call command lines directly.

* `exec(command: string): string | Buffer`: Execute command line

# File API

Both text files and binaries (such as images) are supported out of the box.

## Creating a new File instance

In most cases you'll use the file helpers on the generator. But if you need to create it manually:

* `constructor(path: string, name?: string)`

## Cool shortcuts

* `get binary(): boolean`: Check if it's a binary or text file
* `get exists(): boolean`: Check if the file exists
* `get filename(): string`: Get file name
* `get dirname(): string`: Get file directory path
* `get extension(): string`: Get file extension

## Persistence

* `save(): void`: Save file changes on it's current path
* `saveAs(path: string, name?: string): File`: Save file on a different path
* `delete(): void`: Delete file

_Tip_: When using `saveAs`, you can end the path with `/` and BattleCry will add the current filename.

## Text helpers

Lot's of `text` helpers receive `search: number | string`. This means that if a number is provided it assumes it as being a line number, otherwise it wil search for a line with the given string or throw an error.

* `get text(): string`: Get content as text
* `set text(text: string): void`: Set content as string (Eg. `file.text = 'abc'`)

- `get lines(): string[]`: Return file text split by line
- `set lines(lines: string[]): void`: Set file text from an array of lines (Eg. `file.lines = ['a', 'b', 'c']`)

* `replaceText(search: string | RegExp, replace: string, name?: string): this`: Replace one text ocurrence
* `replaceAllText(search: string, replace: string, name?: string): this`: Replace all text occurrences
* `replaceNames(name: string): this`: Replace casex namings

- `search(search: string | number, name?: string): number`: Get line number of the first line including `search`
- `last(search: string | number, name?: string): number`: Like `search`, but starting from the last line

* `before(search: string | number, text: string | string[], name?: string): this`: Add text before given line
* `beforeLast(search: string | number, text: string | string[], name?: string): this`: Like `before`, but using `last`

- `after(search: number | string, text: string | string[], name?: string): this`: Add text after given line
- `afterLast(search: number | string, text: string | string[], name?: string): this`: Like `after`, but using `last`

* `prepend(text: string | string[], name?: string): this`: Add text at the beginning of the file
* `append(text: string | string[], name?: string): this`: Add text at the end of the file

- `replace(search: string | number, text: string | string[], name?: string): this`: Replace line with a given text
- `replaceLast(search: string | number, text: string | string[], name?: string): this`: Like `replace`, but using `last`

* `remove(search: string | number, name?: string): this`: Remove line (`search` method is called to resolve line number)
* `removeLast(search: string | number, name?: string): this`: Like `remove`, but using `last`

_Note_: If you attempt to use any text helper in a binary file (such as an image), BattleCry will throw an error.

# Miscellaneous

## Sharing helpers across generators

It's not uncommon to have multiple generators share similar helpers. To facilitate you doing that, you can include files from your BattleCry directory directly, without navigating with `..`.

If you have a `testHelper.js` file under `BattleCry/helpers/testHelper.js` for instance, you could include it as:

```javascript
import testHelper from 'helpers/testHelper';
```

## Downloading generators

You may not have to write all your generators yourself. BattleCry comes with a handy tool for downloading generators from GitHub.

```
cry download generator owner/path
```

If you want to a service provider other then GitHub, please check the [download-git-repo examples](https://github.com/flipxfx/download-git-repo#examples)

### Selecting directory to download from

BattleCry looks for a `battlecry/` folder in the repository root. If none is found it defaults to the repository root. You may also set a custom directory to start BattleCry's search with `--dir`.

```
cry download generator owner/path --dir test-battlecry
```

## Customizing your battlecry-setup.js

### Loading generators from other folders

```js
export default function setup(battlecry) {
  battlecry.load('node_modules/battlecry-generatores-from-node-modules');
}
```

### Adding new aliases

By default BattleCry comes with two aliases: `g: generate` and `d: destroy`. You can both override these aliases and/or create new ones.

```js
export default function setup(battlecry) {
  battlecry.aliases.s = 'strike';
  // You can now use `cry s component` and it will be translated to `cry strike component`
}
```

### Updating default globOptions

BattleCry values convention over configuration, so it comes with the following optinos by default: `{ dot: true, ignore: ['**/.DS_Store'] }`. This means that files starting with `.`, such as `.babelrc` will be included on your list _(if it matches the pattern provided)_.

```js
export default function setup(battlecry) {
  battlecry.globOptions({ dot: false, nocase: false });
}
```

_For a complete list of options available, please refer to https://github.com/isaacs/node-glob#options._

## [Advanced] Using namedCasex outside of the helper methods

Sometimes you may need to apply casex namings separetely. This usually happens when you want to apply casex naming to two different values
in the same line or piece of text.

```js
import { namedCasex } from 'battlecry';

namedCasex(text: string, name?: string);
```

## [Advanced] Other exports

Battlecry exports a few internal methods and libraries that it uses.

You can import them in case you need to so something that can't be covered by file or generator helpers.

* Libraries

  * [casex](https://github.com/pedsmoreira/casex)
  * [pluralize](https://github.com/blakeembrey/pluralize)

- Battlecry display helpers
  * [log](https://github.com/pedsmoreira/battlecry/blob/master/src/helpers/log.js)
  * [dd](https://github.com/pedsmoreira/battlecry/blob/master/src/helpers/dd.js)

* Battlecry classes

  * [Battlecry](https://github.com/pedsmoreira/battlecry/blob/master/src/classes/Battlecry.js)
  * [ArgBuilder](https://github.com/pedsmoreira/battlecry/blob/master/src/classes/ArgBuilder.js)
  * [File](https://github.com/pedsmoreira/battlecry/blob/master/src/classes/File.js)
  * [Generator](https://github.com/pedsmoreira/battlecry/blob/master/src/classes/Generator.js)
  * [GeneratorMethod](https://github.com/pedsmoreira/battlecry/blob/master/src/classes/GeneratorMethod.js)
  * [OptionBuilder](https://github.com/pedsmoreira/battlecry/blob/master/src/classes/OptionBuilder.js)

* `namedCasex` internal methods:

  * [applyPluralization](https://github.com/pedsmoreira/battlecry/blob/master/src/helpers/namedCasex.js#L23)
  * [extractPluralizedPattern](https://github.com/pedsmoreira/battlecry/blob/master/src/helpers/namedCasex.js#L30)

# Resources

* [Contributing Guide](./CONTRIBUTING.md)
* [Code of Conduct](./CODE_OF_CONDUCT.md)
