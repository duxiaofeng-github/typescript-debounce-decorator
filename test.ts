import {debounce} from "./index";
import test from 'ava';

const resolveTime = 5000;
const debounceTime = 1000;

test('test debounce with default 500 millisecond interval', async (t) => {
	async function debounceWithDefault() {
		let triggerTimes = 0;

		class Foo {

			@debounce
			static bar() {
				triggerTimes+=1;
			}

		}

		return new Promise((resolve, reject) => {
			setInterval(() => {
				Foo.bar();
			}, 1);

			setTimeout(() => {
				resolve(triggerTimes);
			}, resolveTime);
		});
	}

	t.is(await debounceWithDefault(), resolveTime / 500);
});

test('test debounce with time', async (t) => {
	async function debounceWithTime() {
		let triggerTimes = 0;

		class Foo {

			@debounce(debounceTime)
			static bar() {
				triggerTimes+=1;
			}

		}

		return new Promise((resolve, reject) => {
			setInterval(() => {
				Foo.bar();
			}, 1);

			setTimeout(() => {
				resolve(triggerTimes);
			}, resolveTime);
		});
	}

	t.is(await debounceWithTime(), resolveTime / debounceTime);
});

test('test debounce with true leading', async (t) => {
	let trueLeadingTriggerTimes = 0;

	async function debounceWithTrueLeading() {
		class Foo {

			@debounce(debounceTime, {leading: true})
			static bar() {
				trueLeadingTriggerTimes+=1;
			}

		}

		Foo.bar();
	}

	debounceWithTrueLeading();

	t.is(trueLeadingTriggerTimes, 1);
});

test('test debounce with false leading', async (t) => {
	let falseLeadingTriggerTimes = 0;

	async function debounceWithFalseLeading() {
		class Foo {

			@debounce(debounceTime, {leading: false})
			static bar() {
				falseLeadingTriggerTimes+=1;
			}

		}

		Foo.bar();
	}

	debounceWithFalseLeading();

	t.is(falseLeadingTriggerTimes, 0);
});

test('test debounce with property method', (t) => {
	function debounceWithPropertyMethod() {
		class Foo {
			selfPointer: any;
			triggerTime: number = 0;

			@debounce
			bar = () => {
				this.selfPointer = this;
				this.triggerTime += 1;
			}
		}

		const foo = new Foo();
		foo.bar();

		return foo;
	}

	const foo = debounceWithPropertyMethod();

	t.truthy(foo.selfPointer === foo);
	t.is(foo.triggerTime, 1);
});
