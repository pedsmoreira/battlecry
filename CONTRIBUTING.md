# Contributing

We'd love to have your contribution added to Samba. If you decide to do so, please follow the
[code of conduct](CODE_OF_CONDUCT.md)

## Prerequisites

[Node.js](http://nodejs.org/) >= v8 must be installed.

## Installation

* Running `npm install` in the root directory will install everything you need for development.

## Development

Go to the `samba` folder you cloned and:

* `npm uninstall -g samba` if you have `samba` already installed globally
* `npm link` will link the `samba` and `sb` commanda globally
* `npm link samba` will link the `require('samba')`

## Running Tests

* `npm run test` will run jest

## Code Style

The project uses [prettier](https://github.com/prettier/prettier) hooked on `precommit`, so don't worry too much about it,
it will get formatted automatically once you commit.

## Releasing

```sh
npm version <newversion> -m "Releasing %s"
npm publish
```
