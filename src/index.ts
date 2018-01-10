function createDebounce(debounceTime: number, ...args: any[]) {
	if (args.length === 0) throw new Error('function applied debounce decorator should be a method');
	if (args.length === 1) throw new Error('method applied debounce decorator should have valid name');

	const target = args[0], name = args[1];
	const descriptor = args.length === 3 ? args[2] : Object.getOwnPropertyDescriptor(target, name);

	const originalMethod = descriptor.value;

	let timeStart;

	descriptor.value = function (...rewriteArgs) {
		const now = (new Date()).getTime();
		if (!timeStart) {
			timeStart = now;
			return originalMethod.apply(this, rewriteArgs);
		} else if (timeStart + debounceTime <= now) {
			timeStart = undefined;
			return originalMethod.apply(this, rewriteArgs);
		}
	};

	return descriptor;
}

export function debounce(...args: any[]) {
	let debounceTime = 500;

	if (args.length && typeof args[0] === 'number') {
		debounceTime = args[0];

		return function (...args: any[]) {
			return createDebounce(debounceTime, ...args);
		};
	}

	return createDebounce(debounceTime, ...args);
}

