var Pan3d;
(function (Pan3d) {
    var MathUtil = /** @class */ (function () {
        function MathUtil() {
        }
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        MathUtil.mathDisplay2Dto3DWorldPos = function ($point, $depht) {
            if ($depht === void 0) { $depht = 300; }
            var $disNum = $depht / (Pan3d.Scene_data.sceneViewHW / 2);
            var $far = Pan3d.Scene_data.sceneViewHW / 2 * $disNum;
            var fovw = Pan3d.Scene_data.stageWidth;
            var fovh = Pan3d.Scene_data.stageHeight;
            var m = new Pan3d.Matrix3D;
            m.prependRotation(-Pan3d.Scene_data.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
            m.prependRotation(-Pan3d.Scene_data.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
            var uc = Pan3d.Scene_data.viewMatrx3D.transformVector(new Pan3d.Vector3D(500, 0, 500));
            var zScale = uc.x / uc.w;
            var fw = (fovw / 2 / zScale) * $disNum;
            var fh = (fovh / 2 / zScale) * $disNum;
            var tx = (($point.x / fovw) * fw) * 2;
            var ty = (($point.y / fovh) * fh) * 2;
            var p = this.gettempPos(new Pan3d.Vector3D(-fw + tx, +fh - ty, $far), m);
            return p;
        };
        //计算出鼠标与地面Y为0的坐标点
        MathUtil.getGroundPanelPos = function ($evt) {
            var pos = Pan3d.MathClass.mathDisplay2Dto3DWorldPos(new Pan3d.Rectangle(0, 0, Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight), new Pan3d.Vector2D($evt.x, $evt.y), 300);
            var triItem = new Array;
            triItem.push(new Pan3d.Vector3D(0, 0, 0));
            triItem.push(new Pan3d.Vector3D(-100, 0, 100));
            triItem.push(new Pan3d.Vector3D(+100, 0, 100));
            var camPos = new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z);
            return this.getLinePlaneInterectPointByTri(camPos, pos, triItem);
        };
        MathUtil.gettempPos = function (a, m) {
            var b = m.transformVector(a);
            b = b.add(new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z));
            return b;
        };
        //3d坐标转换成场景像素坐标
        MathUtil.math3DWorldtoDisplay2DPos = function ($pos) {
            var m = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
            m.append(Pan3d.Scene_data.viewMatrx3D.clone());
            var fovw = Pan3d.Scene_data.stageWidth;
            var fovh = Pan3d.Scene_data.stageHeight;
            var p = m.transformVector($pos);
            var b = new Pan3d.Vector2D;
            b.x = ((p.x / p.w) + 1) * (fovw / 2);
            b.y = ((-p.y / p.w) + 1) * (fovh / 2);
            return b;
        };
        //计算2D 点到直线的距离
        MathUtil.pointToLine2dDis = function (point1, point2, out) {
            var A = (point1.y - point2.y) / Math.sqrt(Math.pow((point1.y - point2.y), 2) + Math.pow((point1.x - point2.x), 2));
            var B = (point2.x - point1.x) / Math.sqrt(Math.pow((point1.y - point2.y), 2) + Math.pow((point1.x - point2.x), 2));
            var C = (point1.x * point2.y - point2.x * point1.y) / Math.sqrt(Math.pow((point1.y - point2.y), 2) + Math.pow((point1.x - point2.x), 2));
            return Math.abs(A * out.x + B * out.y + C) / Math.sqrt(Math.pow(A, 2) + Math.pow(B, 2));
        };
        MathUtil.argbToHex = function (a, r, g, b) {
            // 转换颜色
            var color = a << 24 | r << 16 | g << 8 | b;
            return color;
        };
        MathUtil.hexToArgb = function (expColor) {
            var color = new Pan3d.Vector3D();
            color.w = (expColor >> 24) & 0xFF;
            color.x = (expColor >> 16) & 0xFF;
            color.y = (expColor >> 8) & 0xFF;
            color.z = (expColor) & 0xFF;
            return color;
        };
        /**
     *
     * @param linePoint_a  线起点
     * @param linePoint_b  线结点
     * @param planePoint  构成面的三个点
     * @return 交点坐标
     *
     */
        MathUtil.getLinePlaneInterectPointByTri = function (linePoint_a, linePoint_b, planePoint) {
            if (planePoint.length < 3)
                return null;
            var nomal = new Pan3d.Vector3D(0, 2000, 0);
            nomal = Pan3d.Vector3D.calTriNormal(planePoint[0], planePoint[1], planePoint[2]);
            return this.getLineAndPlaneIntersectPoint(linePoint_a, linePoint_b, planePoint[0], nomal);
        };
        /**
         * 空间一条射线和平面的交点
         * @param linePoint_a  过直线的一点
         * @param linePoint_b  过直线另一点
         * @param planePoint   过平面一点
         * @param planeNormal  平面的法线
         * @return
         *
         */
        MathUtil.getLineAndPlaneIntersectPoint = function (linePoint_a, linePoint_b, planePoint, planeNormal) {
            var lineVector = new Pan3d.Vector3D(linePoint_a.x - linePoint_b.x, linePoint_a.y - linePoint_b.y, linePoint_a.z - linePoint_b.z);
            lineVector.normalize();
            var pt = lineVector.x * planeNormal.x + lineVector.y * planeNormal.y + lineVector.z * planeNormal.z;
            var t = ((planePoint.x - linePoint_a.x) * planeNormal.x + (planePoint.y - linePoint_a.y) * planeNormal.y + (planePoint.z - linePoint_a.z) * planeNormal.z) / pt;
            var aPro1 = new Pan3d.Vector3D;
            aPro1.setTo(linePoint_a.x + lineVector.x * t, linePoint_a.y + lineVector.y * t, linePoint_a.z + lineVector.z * t);
            return aPro1;
        };
        MathUtil.lookAt = function (eyePos, lookAt) {
            var matr = new Pan3d.Matrix3D();
            matr.buildLookAtLH(eyePos, lookAt, Pan3d.Vector3D.Y_AXIS);
            return matr;
        };
        MathUtil.MathCam = function (_Cam) {
            _Cam.cameraMatrix.identity();
            _Cam.cameraMatrix.prependRotation(_Cam.rotationX, Pan3d.Vector3D.X_AXIS);
            _Cam.cameraMatrix.prependRotation(_Cam.rotationY, Pan3d.Vector3D.Y_AXIS);
            _Cam.cameraMatrix.prependTranslation(-_Cam.x + _Cam.offset.x, -_Cam.y + _Cam.offset.y, -_Cam.z + _Cam.offset.z);
        };
        return MathUtil;
    }());
    Pan3d.MathUtil = MathUtil;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MathUtil.js.map