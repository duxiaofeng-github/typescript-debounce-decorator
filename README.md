# typescript-debounce-decorator
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]

> A debounce decorator for typescript class method

* Tiny (942 bytes after uglify compressed)
* No dependency
* Easy to use

## Install
`npm install typescript-debounce-decorator --save`

## Usage

Basic usage:
```
import {debounce} from "./index";

class Foo {

	@debounce
	static bar() {
		console.log('foobar');
	}

}
```

With debounce time(milliseconds):
```
import {debounce} from "./index";

class Foo {

	@debounce(1000)
	static bar() {
		console.log('foobar');
	}

}
```

# License
MIT