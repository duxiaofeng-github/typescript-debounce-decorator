function createDebounce(debounceTime: number, options: any, ...args: any[]) {
	if (args.length === 0) throw new Error('function applied debounce decorator should be a method');
	if (args.length === 1) throw new Error('method applied debounce decorator should have valid name');

	const target = args[0], name = args[1];
	const descriptor = args.length === 3 ? args[2] : Object.getOwnPropertyDescriptor(target, name);
	const leading = options && options.leading !== undefined ? options.leading : true;

	const originalMethod = descriptor.value;

	let timer;
	let lastArgs;

	descriptor.value = function (...rewriteArgs) {
		lastArgs = rewriteArgs;

		if (!timer) {
			if (leading) originalMethod.apply(this, lastArgs);

			timer = setTimeout(() => {
				if (!leading) originalMethod.apply(this, lastArgs);
				timer = undefined;
			}, debounceTime);
		}
	};

	return descriptor;
}

export function debounce(...opts: any[]) {
	let debounceTime = 500;
	let options;

	if (opts.length && typeof opts[0] === 'number') {
		debounceTime = opts[0];

		if (opts.length >= 2) options = opts[1];

		return function (...args: any[]) {
			return createDebounce(debounceTime, options, ...args);
		};
	}

	return createDebounce(debounceTime, options, ...opts);
}

