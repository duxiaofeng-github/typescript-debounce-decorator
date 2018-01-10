export interface IDebounceOptions {
	leading: boolean;
}

export interface IDebounceFactory {
	(options?: IDebounceOptions): (target: Object, propertyKey: string, descriptor?: PropertyDescriptor) => void;
	(debounceTime: number, options?: IDebounceOptions): (target: Object, propertyKey: string, descriptor?: PropertyDescriptor) => void;
	(target: Object, propertyKey: string, descriptor?: PropertyDescriptor): void;
}

export declare const debounce: IDebounceFactory;
