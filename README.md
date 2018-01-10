# typescript-debounce-decorator
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]

> A debounce decorator for typescript class method

* Tiny (993 bytes after uglify compressed)
* No dependency
* Easy to use

## Install
```sh
npm install typescript-debounce-decorator --save
```

## Usage

Syntax:
```typescript
@debounce(debounceTime, options)
```
Params:
- debounceTime: `number` Function execute interval in milliseconds.
- options: `object` Options.
  - leading: `boolean` Should function invoke on the leading or trailing of the wait timeout.

> NOTE: Return value of function which applied debounce decorator will be eaten.

Basic usage:
```typescript
import {debounce} from "typescript-debounce-decorator";

class Foo {

	@debounce
	bar() {
		console.log('foobar');
	}

}
```

With debounce time:
```typescript
import {debounce} from "typescript-debounce-decorator";

class Foo {

	@debounce(1000)
	bar() {
		console.log('foobar');
	}

}
```

With options:
```typescript
import {debounce} from "typescript-debounce-decorator";

class Foo {

	@debounce(1000, {leading: false})
	bar() {
		console.log('foobar');
	}

}
```

# License
MIT

[npm-image]: https://img.shields.io/npm/v/typescript-debounce-decorator.svg?style=flat
[npm-url]: https://npmjs.org/package/typescript-debounce-decorator
[downloads-image]: https://img.shields.io/npm/dm/typescript-debounce-decorator.svg?style=flat
[downloads-url]: https://npmjs.org/package/typescript-debounce-decorator
[travis-image]: https://img.shields.io/travis/duxiaofeng-github/typescript-debounce-decorator.svg?style=flat
[travis-url]: https://travis-ci.org/duxiaofeng-github/typescript-debounce-decorator