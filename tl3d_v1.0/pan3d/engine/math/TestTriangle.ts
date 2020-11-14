module Pan3d {
    export
        class TestTriangle {
        public static baseTri: TestTriangle = new TestTriangle
        public p1: Vector2D;
        public p2: Vector2D;
        public p3: Vector2D;
        public precision: number;
        public constructor($p1: Vector2D = null, $p2: Vector2D = null, $p3: Vector2D = null, $precision: number = 0.1) {
            this.p1 = $p1;
            this.p2 = $p2;
            this.p3 = $p3;
            this.precision = $precision;
        }
        public setAllPoint($p1: Vector2D, $p2: Vector2D, $p3: Vector2D): void {
            this.p1 = $p1;
            this.p2 = $p2;
            this.p3 = $p3;
        }

        public checkPointIn(tp: Vector2D): Boolean {
            var area: number = this.getArea();
            var targetThreeTimesArea: number = 0;
            targetThreeTimesArea += TestTriangle.getAreaByPoints(tp, this.p1, this.p2);
            targetThreeTimesArea += TestTriangle.getAreaByPoints(tp, this.p2, this.p3);
            targetThreeTimesArea += TestTriangle.getAreaByPoints(tp, this.p3, this.p1);
            return targetThreeTimesArea == area || Math.abs(targetThreeTimesArea - area) < this.precision;
        }

        public getArea(): number {
            return TestTriangle.getAreaByPoints(this.p1, this.p2, this.p3);
        }

        public static getAreaByPoints(p1: Vector2D, p2: Vector2D, p3: Vector2D): number {
            // 方法一
            // 利用两点之间距离公式，求出三角形的三边长a，b，c后，
            // 令p = (a+b+c)/2。再套入以下公式就可以求出三角形的面积S :
            // S = sqrt(p*(p-a)*(p-b)*(p-c))
            var dx: number = p1.x - p2.x;
            var dy: number = p1.y - p2.y;
            var p1Len: number = Math.sqrt(dx * dx + dy * dy);
            dx = p2.x - p3.x;
            dy = p2.y - p3.y;
            var p2Len: number = Math.sqrt(dx * dx + dy * dy);
            dx = p3.x - p1.x;
            dy = p3.y - p1.y;
            var p3Len: number = Math.sqrt(dx * dx + dy * dy);

            var p: number = (p1Len + p2Len + p3Len) / 2;
            var v: number = p * (p - p1Len) * (p - p2Len) * (p - p3Len);
            if (v > 0) {
                return Math.sqrt(v);
            }
            return 0;
        }
    }
}