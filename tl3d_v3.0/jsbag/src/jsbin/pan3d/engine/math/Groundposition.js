var Pan3d;
(function (Pan3d) {
    var Groundposition = /** @class */ (function () {
        function Groundposition() {
        }
        Groundposition.getGroundPos = function ($x, $y) {
            var $ty = -500;
            if (!this._plantObjectMath) {
                var A = new Pan3d.Vector3D(0, $ty, 500);
                var B = new Pan3d.Vector3D(-500, $ty, 0);
                var C = new Pan3d.Vector3D(500, $ty, 0);
                this._plantObjectMath = Pan3d.Calculation._PanelEquationFromThreePt(A, B, C);
                this._plantnormal = new Pan3d.Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
                this._plantnormal.normalize();
                this._plane_a = new Pan3d.Vector3D(A.x, A.y, A.z);
            }
            //计算直线与平面交点
            var line_a = Pan3d.MathUtil.mathDisplay2Dto3DWorldPos(new Pan3d.Vector2D($x, $y), 500);
            var line_b = new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z);
            var crossPoint = Pan3d.Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
            return crossPoint;
        };
        return Groundposition;
    }());
    Pan3d.Groundposition = Groundposition;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Groundposition.js.map