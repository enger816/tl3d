module Pan3d {
    export class DynamicBaseConstItem {
        public target: ConstItem;
        public paramName: string;
        public currentValue: Array<number>;
        public targetOffset: number;
        protected _type: number;

        public update(t: number = 0): void {
            if (this.target) {
                this.target.setDynamic(this);
            }
        }

        public get type(): number {
            return this._type;
        }

        public set type(value: number) {
            this._type = value;
        }

        public setTargetInfo($target: ConstItem, $paramName: string, $type: number): void {
            this.target = $target;
            this.paramName = $paramName;
            this.type = $type;
            if (this.target) {
                this.target.setDynamicOffset(this);
            }
            this.currentValue = new Array($type);
        }

        public setCurrentVal(...args): void {
            for (var i: number = 0; i < args.length; i++) {
                this.currentValue[i] = args[i];
                // if (i == 0) {
                //     this.currentValue.x = args[i];
                // } else if (i == 1) {
                //     this.currentValue.y = args[i];
                // } else if (i == 2) {
                //     this.currentValue.z = args[i];
                // }
            }
        }

    }
}