# Customizing your battlecry-setup.js

## Loading generators from other folders

```js
export default function setup(battlecry) {
  battlecry.load('node_modules/battlecry-generatores-from-node-modules');
}
```

## Adding new aliases

By default BattleCry comes with two aliases: `g: generate` and `d: destroy`. You can both override these aliases and/or create new ones.

```js
export default function setup(battlecry) {
  battlecry.aliases.s = 'strike';
  // You can now use `cry s component` and it will be translated to `cry strike component`
}
```

## Updating default globOptions

BattleCry values convention over configuration, so it comes with the following optinos by default: `{ dot: true, ignore: ['**/.DS_Store'] }`. This means that files starting with `.`, such as `.babelrc` will be included on your list _(if it matches the pattern provided)_.

```js
export default function setup(battlecry) {
  battlecry.globOptions({ dot: false, nocase: false });
}
```

_For a complete list of options available, please refer to https://github.com/isaacs/node-glob#options._
