# typescript-debounce-decorator
A debounce decorator for typescript class method

* tiny
* no dependency
* easy to use

## Install
`npm install typescript-debounce-decorator --save`

## Usage

Basic usage:
`
import {debounce} from "./index";

class Foo {

	@debounce
	static bar() {
		console.log('foobar');
	}

}
`

With debounce time(milliseconds):
`
import {debounce} from "./index";

class Foo {

	@debounce(1000)
	static bar() {
		console.log('foobar');
	}

}
`

# License
MIT