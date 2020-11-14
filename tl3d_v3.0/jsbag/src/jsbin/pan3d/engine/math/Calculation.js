var Pan3d;
(function (Pan3d) {
    var ObjectMath = /** @class */ (function () {
        function ObjectMath() {
            this.a = 0;
            this.b = 0;
            this.c = 0;
            this.d = 0;
        }
        return ObjectMath;
    }());
    Pan3d.ObjectMath = ObjectMath;
    var Calculation = /** @class */ (function () {
        function Calculation() {
        }
        Calculation._PanelEquationFromThreePt = function (p1, p2, p3) {
            //得到平面方程 ax+by+cz+d=0(传入三个点,返回平面方程a,b,c,d);
            var a = ((p2.y - p1.y) * (p3.z - p1.z) - (p2.z - p1.z) * (p3.y - p1.y));
            var b = ((p2.z - p1.z) * (p3.x - p1.x) - (p2.x - p1.x) * (p3.z - p1.z));
            var c = ((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x));
            var d = (0 - (a * p1.x + b * p1.y + c * p1.z));
            var tempObjectMath = new ObjectMath;
            tempObjectMath.a = a;
            tempObjectMath.b = b;
            tempObjectMath.c = c;
            tempObjectMath.d = d;
            return tempObjectMath;
        };
        Calculation.calPlaneLineIntersectPoint = function (planeVector, planePoint, linePointA, linePointB) {
            var ret = new Pan3d.Vector3D();
            var vp1 = planeVector.x;
            var vp2 = planeVector.y;
            var vp3 = planeVector.z;
            var n1 = planePoint.x;
            var n2 = planePoint.y;
            var n3 = planePoint.z;
            var v1 = linePointA.x - linePointB.x;
            var v2 = linePointA.y - linePointB.y;
            var v3 = linePointA.z - linePointB.z;
            var m1 = linePointB.x;
            var m2 = linePointB.y;
            var m3 = linePointB.z;
            var vpt = v1 * vp1 + v2 * vp2 + v3 * vp3;
            //首先判断直线是否与平面平行
            if (vpt == 0) {
                return null;
            }
            else {
                var t = ((n1 - m1) * vp1 + (n2 - m2) * vp2 + (n3 - m3) * vp3) / vpt;
                ret.x = m1 + v1 * t;
                ret.y = m2 + v2 * t;
                ret.z = m3 + v3 * t;
            }
            return ret;
        };
        return Calculation;
    }());
    Pan3d.Calculation = Calculation;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Calculation.js.map