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

* `save(): this`: Save file changes on it's current path
* `saveAs(path: string, name?: string): File`: Save file on a different path
* `move(path: string, name?: ?string): this`: Move file to a different path
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
