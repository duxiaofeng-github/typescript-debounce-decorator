import {debounce} from "./index";
import test from 'ava';

const resolveTime = 5000;

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

test('test debounce with default 500 millisecond interval', async (t) => {
	t.is(await debounceWithDefault(), resolveTime / 500);
});

const debounceTime = 1000;

async function debounceWithTime() {
	let triggerTimes = 0;

	class Foo {

		@debounce(debounceTime)
		static  bar() {
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

test('test debounce with time', async (t) => {
	t.is(await debounceWithTime(), resolveTime / debounceTime);
});
