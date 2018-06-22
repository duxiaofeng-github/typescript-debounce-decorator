import { cancel, debounce } from "./index";

// test("test debounce with default 500 millisecond interval", async () => {
// 	async function debounceWithDefault() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce
// 			static bar() {
// 				triggerTimes += 1;
// 			}
// 		}
//
// 		setInterval(() => {
// 			Foo.bar();
// 		}, 1);
//
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(triggerTimes);
// 			}, 500);
// 		});
// 	}
//
// 	expect(await debounceWithDefault()).toBe(1);
// });
//
// test("test debounce with time", async () => {
// 	async function debounceWithTime() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce(1000)
// 			static bar() {
// 				triggerTimes += 1;
// 			}
// 		}
//
// 		setInterval(() => {
// 			Foo.bar();
// 		}, 1);
//
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(triggerTimes);
// 			}, 1000);
// 		});
// 	}
//
// 	expect(await debounceWithTime()).toBe(1);
// });
//
// test("test debounce with true leading", () => {
// 	let triggerTimes = 0;
//
// 	class Foo {
// 		@debounce({ leading: true })
// 		static bar() {
// 			triggerTimes += 1;
// 		}
// 	}
//
// 	Foo.bar();
//
// 	expect(triggerTimes).toBe(1);
// });
//
// test("test debounce with false leading", async () => {
// 	async function debounceWithFalseLeading() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce({ leading: false })
// 			static bar() {
// 				triggerTimes += 1;
// 			}
// 		}
//
// 		Foo.bar();
//
// 		return new Promise((resolve, reject) => {
// 			resolve(triggerTimes);
// 		});
// 	}
//
// 	expect(await debounceWithFalseLeading()).toBe(0);
// });
//
// test("test debounce with true leading as multi-times trigger", async () => {
// 	async function debounceWithMultiTimesTrigger() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce
// 			static bar() {
// 				triggerTimes += 1;
// 			}
// 		}
//
// 		let callTimes = 0;
// 		const timer = setInterval(() => {
// 			if (callTimes < 100) {
// 				Foo.bar();
// 				callTimes += 1;
// 			} else {
// 				clearInterval(timer);
// 			}
// 		}, 10);
//
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(triggerTimes);
// 			}, 500 * 2 + 100);
// 		});
// 	}
//
// 	expect(await debounceWithMultiTimesTrigger()).toBe(1);
// });
//
// test("test debounce with false leading as multi-times trigger", async () => {
// 	async function debounceWithMultiTimesTrigger() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce({ leading: false })
// 			static bar() {
// 				triggerTimes += 1;
// 			}
// 		}
//
// 		let callTimes = 0;
// 		const timer = setInterval(() => {
// 			if (callTimes < 100) {
// 				Foo.bar();
// 				callTimes += 1;
// 			} else {
// 				clearInterval(timer);
// 			}
// 		}, 10);
//
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(triggerTimes);
// 			}, 1000 + 500 + 100);
// 		});
// 	}
//
// 	expect(await debounceWithMultiTimesTrigger()).toBe(1);
// });
//
// test("test debounce with method", () => {
// 	function debounceWithPropertyMethod() {
// 		class Foo {
// 			selfPointer: any;
// 			triggerTime: number = 0;
//
// 			@debounce
// 			bar() {
// 				this.selfPointer = this;
// 				this.triggerTime += 1;
// 			}
// 		}
//
// 		const foo = new Foo();
// 		foo.bar();
//
// 		return foo;
// 	}
//
// 	const foo = debounceWithPropertyMethod();
//
// 	expect(foo.selfPointer === foo).toBeTruthy();
// 	expect(foo.triggerTime).toBe(1);
// });
//
// test("test debounce with property method", () => {
// 	function debounceWithPropertyMethod() {
// 		class Foo {
// 			selfPointer: any;
// 			triggerTime: number = 0;
//
// 			@debounce
// 			bar = () => {
// 				this.selfPointer = this;
// 				this.triggerTime += 1;
// 			};
// 		}
//
// 		const foo = new Foo();
// 		foo.bar();
//
// 		return foo;
// 	}
//
// 	const foo = debounceWithPropertyMethod();
//
// 	expect(foo.selfPointer === foo).toBeTruthy();
// 	expect(foo.triggerTime).toBe(1);
// });
//
// test("test debounce cancellation", async () => {
// 	async function debounceWithCancellation() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce({ leading: false })
// 			static bar() {
// 				triggerTimes += 1;
// 			}
// 		}
//
// 		Foo.bar();
//
// 		setTimeout(() => {
// 			cancel(Foo.bar);
// 		}, 400);
//
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(triggerTimes);
// 			}, 600);
// 		});
// 	}
//
// 	expect(await debounceWithCancellation()).toBe(0);
// });
//
// test("test debounce cancellation with property method", async () => {
// 	async function debounceWithCancellation() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce({ leading: false })
// 			bar = () => {
// 				triggerTimes += 1;
// 			};
// 		}
//
// 		const foo = new Foo();
// 		foo.bar();
//
// 		setTimeout(() => {
// 			cancel(foo.bar);
// 		}, 400);
//
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(triggerTimes);
// 			}, 600);
// 		});
// 	}
//
// 	expect(await debounceWithCancellation()).toBe(0);
// });

test("test debounce with multi-instance", async () => {
	async function debounceWithCancellation() {
		let triggerTimes = 0;

		class Foo {
			@debounce({ leading: false })
			bar() {
				triggerTimes += 1;
			}
		}

		const foo = new Foo();
		const foo2 = new Foo();
		foo.bar();
		foo2.bar();

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(triggerTimes);
			}, 600);
		});
	}

	expect(await debounceWithCancellation()).toBe(2);
});

// test("test debounce with multi-instance and property method", async () => {
// 	async function debounceWithCancellation() {
// 		let triggerTimes = 0;
//
// 		class Foo {
// 			@debounce({ leading: false })
// 			bar = () => {
// 				triggerTimes += 1;
// 			};
// 		}
//
// 		const foo = new Foo();
// 		const foo2 = new Foo();
// 		foo.bar();
// 		foo2.bar();
//
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(triggerTimes);
// 			}, 600);
// 		});
// 	}
//
// 	expect(await debounceWithCancellation()).toBe(2);
// });
