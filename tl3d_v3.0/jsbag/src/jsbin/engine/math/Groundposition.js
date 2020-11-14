var Groundposition = /** @class */ (function () {
    function Groundposition() {
    }
    Groundposition.getGroundPos = function ($x, $y) {
        var $ty = -500;
        if (!this._plantObjectMath) {
            var A = new Vector3D(0, $ty, 500);
            var B = new Vector3D(-500, $ty, 0);
            var C = new Vector3D(500, $ty, 0);
            this._plantObjectMath = Calculation._PanelEquationFromThreePt(A, B, C);
            this._plantnormal = new Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
            this._plantnormal.normalize();
            this._plane_a = new Vector3D(A.x, A.y, A.z);
        }
        //计算直线与平面交点
        var line_a = MathUtil.mathDisplay2Dto3DWorldPos(new Vector2D($x, $y), 500);
        var line_b = new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z);
        var crossPoint = Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
        return crossPoint;
    };
    return Groundposition;
}());
//# sourceMappingURL=Groundposition.js.map