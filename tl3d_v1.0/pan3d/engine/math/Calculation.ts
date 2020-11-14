module Pan3d {
    export class ObjectMath {
        public a: number = 0;
        public b: number = 0;
        public c: number = 0;
        public d: number = 0;
    }

    export class Calculation {

        public constructor() {
        }

        public static _PanelEquationFromThreePt(p1: Vector3D, p2: Vector3D, p3: Vector3D): ObjectMath {
            //得到平面方程 ax+by+cz+d=0(传入三个点,返回平面方程a,b,c,d);
            var a: number = ((p2.y - p1.y) * (p3.z - p1.z) - (p2.z - p1.z) * (p3.y - p1.y));
            var b: number = ((p2.z - p1.z) * (p3.x - p1.x) - (p2.x - p1.x) * (p3.z - p1.z));
            var c: number = ((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x));
            var d: number = (0 - (a * p1.x + b * p1.y + c * p1.z));
            var tempObjectMath: ObjectMath = new ObjectMath;
            tempObjectMath.a = a;
            tempObjectMath.b = b;
            tempObjectMath.c = c;
            tempObjectMath.d = d;
            return tempObjectMath;
        }
        public static calPlaneLineIntersectPoint(planeVector: Vector3D, planePoint: Vector3D, linePointA: Vector3D, linePointB: Vector3D): Vector3D {
            var ret: Vector3D = new Vector3D();
            var vp1: number = planeVector.x;
            var vp2: number = planeVector.y;
            var vp3: number = planeVector.z;
            var n1: number = planePoint.x;
            var n2: number = planePoint.y;
            var n3: number = planePoint.z;
            var v1: number = linePointA.x - linePointB.x;
            var v2: number = linePointA.y - linePointB.y;
            var v3: number = linePointA.z - linePointB.z;
            var m1: number = linePointB.x;
            var m2: number = linePointB.y;
            var m3: number = linePointB.z;
            var vpt: number = v1 * vp1 + v2 * vp2 + v3 * vp3;
            //首先判断直线是否与平面平行
            if (vpt == 0) {
                return null;
            }
            else {
                var t: number = ((n1 - m1) * vp1 + (n2 - m2) * vp2 + (n3 - m3) * vp3) / vpt;
                ret.x = m1 + v1 * t;
                ret.y = m2 + v2 * t;
                ret.z = m3 + v3 * t;
            }
            return ret;
        }

    }
}