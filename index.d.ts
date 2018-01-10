export interface IDebounceFactory {
	(debounceTime: number): (target: Object, propertyKey: string, descriptor?: PropertyDescriptor) => void;
	(target: Object, propertyKey: string, descriptor?: PropertyDescriptor): void;
}

export declare const debounce: IDebounceFactory;
