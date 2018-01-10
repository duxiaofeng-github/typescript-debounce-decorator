# typescript-debounce-decorator
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]

> A debounce decorator for typescript class method

* Tiny (942 bytes after uglify compressed)
* No dependency
* Easy to use

## Install
```
npm install typescript-debounce-decorator --save
```

## Usage

Basic usage:
```
import {debounce} from "./index";

class Foo {

	@debounce
	bar() {
		console.log('foobar');
	}

}
```

With debounce time(milliseconds):
```
import {debounce} from "./index";

class Foo {

	@debounce(1000)
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