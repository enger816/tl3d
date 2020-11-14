var Pan3d;
(function (Pan3d) {
    var TestTriangle = /** @class */ (function () {
        function TestTriangle($p1, $p2, $p3, $precision) {
            if ($p1 === void 0) { $p1 = null; }
            if ($p2 === void 0) { $p2 = null; }
            if ($p3 === void 0) { $p3 = null; }
            if ($precision === void 0) { $precision = 0.1; }
            this.p1 = $p1;
            this.p2 = $p2;
            this.p3 = $p3;
            this.precision = $precision;
        }
        TestTriangle.prototype.setAllPoint = function ($p1, $p2, $p3) {
            this.p1 = $p1;
            this.p2 = $p2;
            this.p3 = $p3;
        };
        TestTriangle.prototype.checkPointIn = function (tp) {
            var area = this.getArea();
            var targetThreeTimesArea = 0;
            targetThreeTimesArea += TestTriangle.getAreaByPoints(tp, this.p1, this.p2);
            targetThreeTimesArea += TestTriangle.getAreaByPoints(tp, this.p2, this.p3);
            targetThreeTimesArea += TestTriangle.getAreaByPoints(tp, this.p3, this.p1);
            return targetThreeTimesArea == area || Math.abs(targetThreeTimesArea - area) < this.precision;
        };
        TestTriangle.prototype.getArea = function () {
            return TestTriangle.getAreaByPoints(this.p1, this.p2, this.p3);
        };
        TestTriangle.getAreaByPoints = function (p1, p2, p3) {
            // 方法一
            // 利用两点之间距离公式，求出三角形的三边长a，b，c后，
            // 令p = (a+b+c)/2。再套入以下公式就可以求出三角形的面积S :
            // S = sqrt(p*(p-a)*(p-b)*(p-c))
            var dx = p1.x - p2.x;
            var dy = p1.y - p2.y;
            var p1Len = Math.sqrt(dx * dx + dy * dy);
            dx = p2.x - p3.x;
            dy = p2.y - p3.y;
            var p2Len = Math.sqrt(dx * dx + dy * dy);
            dx = p3.x - p1.x;
            dy = p3.y - p1.y;
            var p3Len = Math.sqrt(dx * dx + dy * dy);
            var p = (p1Len + p2Len + p3Len) / 2;
            var v = p * (p - p1Len) * (p - p2Len) * (p - p3Len);
            if (v > 0) {
                return Math.sqrt(v);
            }
            return 0;
        };
        TestTriangle.baseTri = new TestTriangle;
        return TestTriangle;
    }());
    Pan3d.TestTriangle = TestTriangle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=TestTriangle.js.map