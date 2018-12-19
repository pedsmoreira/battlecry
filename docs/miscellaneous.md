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
