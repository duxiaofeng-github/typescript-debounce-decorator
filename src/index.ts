interface IRewriteFunc {
	(...rewriteArgs): void;
	timer: number;
	lastArgs: any[];
	cancel: () => void;
}

export function cancel(func: IRewriteFunc) {
	clearTimeout(func.timer);
}

function getWrapper(
	debounceTime: number,
	leading: boolean,
	originalMethod: Function
) {
	const rewriteFunc = <IRewriteFunc>function(...rewriteArgs) {
		rewriteFunc.lastArgs = rewriteArgs;

		if (!rewriteFunc.timer) {
			if (leading) originalMethod.apply(this, rewriteFunc.lastArgs);

			rewriteFunc.timer = setTimeout(() => {
				if (!leading) originalMethod.apply(this, rewriteFunc.lastArgs);
				clearTimeout(rewriteFunc.timer);
				rewriteFunc.timer = undefined;
			}, debounceTime);
		}
	};

	return rewriteFunc;
}

function defineProperty(
	debounceTime: number,
	leading: boolean,
	target: any,
	name: string
) {
	let wrapperFunc;

	Object.defineProperty(target, name, {
		configurable: true,
		enumerable: false,
		get() {
			return wrapperFunc;
		},
		set(value) {
			wrapperFunc = getWrapper(debounceTime, leading, value);
		}
	});
}

function modifyDescriptor(
	debounceTime: number,
	leading: boolean,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	descriptor.value = getWrapper(debounceTime, leading, originalMethod);
	return descriptor;
}

function createDebounce(
	debounceTime: number,
	leading: boolean,
	...args: any[]
) {
	if (args.length === 0)
		throw new Error("function applied debounce decorator should be a method");
	if (args.length === 1)
		throw new Error("method applied debounce decorator should have valid name");

	const target = args[0],
		name = args[1];
	const descriptor =
		args.length === 3 && args[2]
			? args[2]
			: Object.getOwnPropertyDescriptor(target, name);

	if (descriptor) {
		return modifyDescriptor(debounceTime, leading, descriptor);
	} else {
		// property method has no descriptor to return;
		defineProperty(debounceTime, leading, target, name);
	}
}

export function debounce(...opts: any[]) {
	let debounceTime = 500;
	let leading = true;

	if (
		opts.length &&
		(typeof opts[0] === "number" ||
			(typeof opts[0] === "object" && opts[0].leading !== undefined))
	) {
		if (typeof opts[0] === "number") debounceTime = opts[0];

		let options;
		if (typeof opts[0] === "object" && opts[0].leading !== undefined)
			options = opts[0];
		if (
			opts.length > 1 &&
			typeof opts[1] === "object" &&
			opts[1].leading !== undefined
		)
			options = opts[1];
		if (options) leading = options.leading;

		return function(...args: any[]) {
			return createDebounce(debounceTime, leading, ...args);
		};
	}

	return createDebounce(debounceTime, leading, ...opts);
}
