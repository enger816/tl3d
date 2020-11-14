interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}

module Pan3d {
    export class Dictionary implements IDictionary {

        _keys: string[] = new Array;
        _values: any[] = new Array;

        constructor(init: { key: string; value: any; }[]) {

            for (var x = 0; init && x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }

        add(key: string, value: any) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }
        has(key: string): boolean {
            if (this[key]) {
                return true
            } else {
                return false
            }

        }

        remove(key: string) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);

            delete this[key];
        }

        keys(): string[] {
            return this._keys;
        }

        values(): any[] {
            return this._values;
        }

        containsKey(key: string) {
            if (typeof this[key] === "undefined") {
                return false;
            }

            return true;
        }

        toLookup(): IDictionary {
            return this;
        }
    }


    class WeakSet {
        _item: Array<any>;
        constructor() {
            this._item = new Array
        }

        add($data: any) {

            this._item.push($data);
        }
        has($data: any): boolean {

            for (var i: number = 0; i < this._item.length; i++) {
                if (this._item[i] == $data) {
                    return true
                }

            }
            return false


        }
    }
}