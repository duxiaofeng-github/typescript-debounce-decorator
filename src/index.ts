function createDebounce(debounceTime: number, leading: boolean, ...args: any[]) {
	if (args.length === 0) throw new Error('function applied debounce decorator should be a method');
	if (args.length === 1) throw new Error('method applied debounce decorator should have valid name');

	const target = args[0], name = args[1];
	const descriptor = args.length === 3 && args[2] ? args[2] : Object.getOwnPropertyDescriptor(target, name);

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
	let leading = true;

	if (
		opts.length &&
		(
			typeof opts[0] === 'number' ||
			(typeof opts[0] === 'object' && opts[0].leading !== undefined)
		)
	) {
		if (typeof opts[0] === 'number') debounceTime = opts[0];

		let options;
		if (typeof opts[0] === 'object' && opts[0].leading !== undefined) options = opts[0];
		if (opts.length > 1 && typeof opts[1] === 'object' && opts[1].leading !== undefined) options = opts[1];
		if (options) leading = options.leading;

		return function (...args: any[]) {
			return createDebounce(debounceTime, leading, ...args);
		};
	}

	return createDebounce(debounceTime, leading, ...opts);
}

