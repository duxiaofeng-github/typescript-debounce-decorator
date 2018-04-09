import { cancel, debounce } from "./index";
import test from "ava";

test("test debounce with default 500 millisecond interval", async t => {
	async function debounceWithDefault() {
		let triggerTimes = 0;

		class Foo {
			@debounce
			static bar() {
				triggerTimes += 1;
			}
		}

		setInterval(() => {
			Foo.bar();
		}, 1);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(triggerTimes);
			}, 500);
		});
	}

	t.is(await debounceWithDefault(), 1);
});

test("test debounce with time", async t => {
	async function debounceWithTime() {
		let triggerTimes = 0;

		class Foo {
			@debounce(1000)
			static bar() {
				triggerTimes += 1;
			}
		}

		setInterval(() => {
			Foo.bar();
		}, 1);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(triggerTimes);
			}, 1000);
		});
	}

	t.is(await debounceWithTime(), 1);
});

test("test debounce with true leading", async t => {
	let triggerTimes = 0;

	class Foo {
		@debounce({ leading: true })
		static bar() {
			triggerTimes += 1;
		}
	}

	Foo.bar();

	t.is(triggerTimes, 1);
});

test("test debounce with false leading", async t => {
	async function debounceWithFalseLeading() {
		let triggerTimes = 0;

		class Foo {
			@debounce({ leading: false })
			static bar() {
				triggerTimes += 1;
			}
		}

		Foo.bar();

		return new Promise((resolve, reject) => {
			resolve(triggerTimes);
		});
	}

	t.is(await debounceWithFalseLeading(), 0);
});

test("test debounce with false leading as multi-times trigger", async t => {
	async function debounceWithMultiTimesTrigger() {
		let triggerTimes = 0;

		class Foo {
			@debounce({ leading: false })
			static bar() {
				triggerTimes += 1;
			}
		}

		setInterval(() => {
			Foo.bar();
		}, 1);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(triggerTimes);
			}, 1000);
		});
	}

	t.is(await debounceWithMultiTimesTrigger(), 1);
});

test("test debounce with property method", t => {
	function debounceWithPropertyMethod() {
		class Foo {
			selfPointer: any;
			triggerTime: number = 0;

			@debounce
			bar = () => {
				this.selfPointer = this;
				this.triggerTime += 1;
			};
		}

		const foo = new Foo();
		foo.bar();

		return foo;
	}

	const foo = debounceWithPropertyMethod();

	t.truthy(foo.selfPointer === foo);
	t.is(foo.triggerTime, 1);
});

test("test debounce cancellation", async t => {
	async function debounceWithCancellation() {
		let triggerTimes = 0;

		class Foo {
			@debounce({ leading: false })
			static bar() {
				triggerTimes += 1;
			}
		}

		Foo.bar();
		cancel(Foo.bar);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(triggerTimes);
			}, 600);
		});
	}

	t.is(await debounceWithCancellation(), 0);
});
