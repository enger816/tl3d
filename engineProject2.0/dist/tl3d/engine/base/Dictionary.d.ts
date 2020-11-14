export declare class Dictionary implements IDictionary {
    _keys: string[];
    _values: any[];
    constructor(init: {
        key: string;
        value: any;
    }[]);
    add(key: string, value: any): void;
    has(key: string): boolean;
    remove(key: string): void;
    keys(): string[];
    values(): any[];
    containsKey(key: string): boolean;
    toLookup(): IDictionary;
}
interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}
export {};
