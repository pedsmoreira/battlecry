# Contributing

We'd love to have your contribution added to Battlecry. If you decide to do so, please follow the
[code of conduct](CODE_OF_CONDUCT.md)

## Prerequisites

[Node.js](http://nodejs.org/) >= v8 must be installed.

## Installation

* Running `npm install` in the root directory will install everything you need for development.

## Development

Go to the `battlecry` folder you cloned and:

* `npm uninstall -g battlecry` if you have `battlecry` already installed globally
* `npm link` will link the `battlecry` and `cry` commands globally
* `npm link battlecry` will link the `require('battlecry')`

## Running Tests

* `npm run test` will run jest

## Code Style

The project uses [prettier](https://github.com/prettier/prettier) hooked on `precommit`, so don't worry too much about it,
it will get formatted automatically once you commit.

## Releasing

```sh
npm version <patch|minor|major>
npm publish
```
