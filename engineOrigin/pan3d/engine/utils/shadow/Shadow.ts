module Pan3d {
    export class Shadow {

        public _visible: boolean = false;

        public display: Display3dShadow;

        public data: Array<number>;

        public constructor() {
            this.data = [0, 0, 0, 5];
        }

        public set visible(value: boolean) {
            this._visible = value;
            this.display.stateChage();
        }

        public get visible(): boolean {
            return this._visible;
        }

        public set x(value: number) {
            this.data[0] = value;
        }
        public get x(): number {
            return this.data[0];
        }

        public set y(value: number) {
            this.data[1] = value;
        }
        public get y(): number {
            return this.data[1];
        }

        public set z(value: number) {
            this.data[2] = value;
        }
        public get z(): number {
            return this.data[2];
        }

        public set size(value: number) {
            this.data[3] = value;
        }
        public get size(): number {
            return this.data[3];
        }


    }
}