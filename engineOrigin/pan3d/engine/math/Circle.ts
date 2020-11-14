module Pan3d {
    export class Circle {
        public _x: number;
        public _y: number;
        public radius: number
        public constructor($x: number = 0, $y: number = 0, $radius: number = 0) {
            this.setData($x, $y, $radius);
        }

        public setData($x: number, $y: number, $radius: number): void {
            this.x = $x;
            this.y = $y;
            this.radius = $radius;
        }

        public setPos($x: number, $y: number): void {
            this.x = $x;
            this.y = $y;
        }

        public set x(value: number) {
            this._x = value;
        }
        public get x(): number {
            return this._x;
        }

        public set y(value: number) {
            this._y = value;
        }
        public get y(): number {
            return this._y;
        }

        public setRadius($radius: number): void {
            this.radius = $radius;
        }

        public testPoint($point: Vector2D): boolean {
            var xx: number = this.x - $point.x;
            var yy: number = this.y - $point.y;
            return Math.sqrt(xx * xx + yy * yy) < this.radius;
        }

    }
}