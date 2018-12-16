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
  <img src="./assets/screencast.gif" />
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

## Who uses Battlecry?

Check out the list of companies using Battlecry. If you're using it too, please consider adding your company to the list :)

https://github.com/pedsmoreira/battlecry/issues/10

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

# Resources

* [Contributing Guide](./CONTRIBUTING.md)
* [Code of Conduct](./CODE_OF_CONDUCT.md)
