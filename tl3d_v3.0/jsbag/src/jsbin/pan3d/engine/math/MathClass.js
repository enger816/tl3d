var Pan3d;
(function (Pan3d) {
    var MathClass = /** @class */ (function () {
        function MathClass() {
        }
        MathClass.getCamView = function (_Cam, _focus_3d) {
            //var $dis: number = 1000;
            _Cam.update();
            //计算出相机的位置
            var $m = new Pan3d.Matrix3D;
            $m.appendRotation(-_focus_3d.rotationX, Pan3d.Vector3D.X_AXIS);
            $m.appendRotation(-_focus_3d.rotationY, Pan3d.Vector3D.Y_AXIS);
            $m.appendTranslation(_focus_3d.x, _focus_3d.y, _focus_3d.z);
            var $p = $m.transformVector(new Pan3d.Vector3D(0, 0, -_Cam.distance));
            _Cam.x = $p.x;
            _Cam.y = $p.y;
            _Cam.z = $p.z;
            _Cam.rotationX = _focus_3d.rotationX;
            _Cam.rotationY = _focus_3d.rotationY;
            //重置相机矩阵
            _Cam.cameraMatrix.identity();
            _Cam.cameraMatrix.prependTranslation(0, 0, _Cam.distance);
            _Cam.cameraMatrix.prependRotation(_Cam.rotationX, Pan3d.Vector3D.X_AXIS);
            _Cam.cameraMatrix.prependRotation(_Cam.rotationY, Pan3d.Vector3D.Y_AXIS);
            _Cam.cameraMatrix.prependTranslation(-_focus_3d.x, -_focus_3d.y, -_focus_3d.z);
            this.camOffSetShock(_Cam);
            this.updateVp();
            return _Cam.cameraMatrix.m;
        };
        MathClass.camOffSetShock = function (_Cam) {
            if (this.SetShock) {
                _Cam.cameraMatrix.prependTranslation(_Cam.offset.x, _Cam.offset.y, _Cam.offset.z);
            }
        };
        MathClass.updateVp = function () {
            Pan3d.Scene_data.vpMatrix.identity();
            Pan3d.Scene_data.vpMatrix.prepend(Pan3d.Scene_data.viewMatrx3D);
            Pan3d.Scene_data.vpMatrix.prepend(Pan3d.Scene_data.cam3D.cameraMatrix);
        };
        MathClass.MathCam = function (_Cam) {
            var camera3dMatrix = new Pan3d.Matrix3D();
            camera3dMatrix.prependRotation(_Cam.rotationX, Pan3d.Vector3D.X_AXIS);
            camera3dMatrix.prependRotation(_Cam.rotationY, Pan3d.Vector3D.Y_AXIS);
            camera3dMatrix.prependTranslation(-_Cam.x, -_Cam.y, -_Cam.z);
            _Cam.cameraMatrix.identity();
            _Cam.cameraMatrix.append(camera3dMatrix);
        };
        MathClass.GetViewHitBoxData = function ($far) {
            var cameraMatrixInvert = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
            cameraMatrixInvert.invert();
            var sx = Pan3d.Scene_data.viewMatrx3D.m[0];
            var sy = Pan3d.Scene_data.viewMatrx3D.m[5];
            if (this.viewBoxVecItem) {
                if (this.lastViewScale.x != sx || this.lastViewScale.y != sy) {
                    this.viewBoxVecItem[0] = (new Pan3d.Vector3D(-$far / sx, -$far / sy, $far));
                    this.viewBoxVecItem[1] = (new Pan3d.Vector3D(-$far / sx, +$far / sy, $far));
                    this.viewBoxVecItem[2] = (new Pan3d.Vector3D(+$far / sx, -$far / sy, $far));
                    this.viewBoxVecItem[3] = (new Pan3d.Vector3D(+$far / sx, +$far / sy, $far));
                    this.viewBoxVecItem[4] = (new Pan3d.Vector3D(0, 0, 0));
                }
            }
            else {
                this.lastViewScale = new Pan3d.Vector2D(sx, sy);
                this.viewBoxVecItem = new Array;
                this.viewBoxVecItem.push(new Pan3d.Vector3D(-$far / sx, -$far / sy, $far));
                this.viewBoxVecItem.push(new Pan3d.Vector3D(-$far / sx, +$far / sy, $far));
                this.viewBoxVecItem.push(new Pan3d.Vector3D(+$far / sx, -$far / sy, $far));
                this.viewBoxVecItem.push(new Pan3d.Vector3D(+$far / sx, +$far / sy, $far));
                this.viewBoxVecItem.push(new Pan3d.Vector3D(0, 0, 0));
            }
        };
        MathClass.GetViewHitBoxDataCopy = function ($dis) {
            if (!this.viewBoxVecItem) {
                this.viewBoxVecItem = new Array;
                this.viewBoxVecItem.push(new Pan3d.Vector3D());
                this.viewBoxVecItem.push(new Pan3d.Vector3D());
                this.viewBoxVecItem.push(new Pan3d.Vector3D());
                this.viewBoxVecItem.push(new Pan3d.Vector3D());
            }
            var $disNum = $dis / (Pan3d.Scene_data.sceneViewHW / 2);
            var $far = Pan3d.Scene_data.sceneViewHW / 2 * $disNum;
            var fovw = Pan3d.Scene_data.stageWidth;
            var fovh = Pan3d.Scene_data.stageHeight;
            var m = new Pan3d.Matrix3D;
            m.prependRotation(-Pan3d.Scene_data.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
            m.prependRotation(-Pan3d.Scene_data.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
            var uc = Pan3d.Scene_data.viewMatrx3D.transformVector(new Pan3d.Vector3D(500, 0, 500));
            var zScale = uc.x / uc.w;
            var ss = 0.8;
            var fw = (fovw / 2 / zScale) * $disNum * ss;
            var fh = (fovh / 2 / zScale) * $disNum * ss;
            this.viewBoxVecItem[0] = this.gettempPos(new Pan3d.Vector3D(-fw, -fh, $far), m);
            this.viewBoxVecItem[1] = this.gettempPos(new Pan3d.Vector3D(+fw, -fh, $far), m);
            this.viewBoxVecItem[2] = this.gettempPos(new Pan3d.Vector3D(+fw, +fh, $far), m);
            this.viewBoxVecItem[3] = this.gettempPos(new Pan3d.Vector3D(-fw, +fh, $far), m);
        };
        MathClass.gettempPos = function (a, m) {
            var b = m.transformVector(a);
            b = b.add(new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z));
            return b;
        };
        MathClass.mathmidpoint = function (a, b, t) {
            var _nx, _ny, _nz;
            _nx = a.x + (b.x - a.x) * t;
            _ny = a.y + (b.y - a.y) * t;
            _nz = a.z + (b.z - a.z) * t;
            a.x = _nx;
            a.y = _ny;
            a.z = _nz;
        };
        MathClass.drawbezier = function (_array, _time) {
            var _newarray = new Array();
            if (_array.length == 0) {
                return { x: 0, y: 0, z: 0 };
            }
            for (var i = 0; i < _array.length; i++) {
                _newarray.push({ x: _array[i].x, y: _array[i].y, z: _array[i].z });
            }
            while (_newarray.length > 1) {
                for (var j = 0; j < _newarray.length - 1; j++) {
                    this.mathmidpoint(_newarray[j], _newarray[j + 1], _time);
                }
                _newarray.pop();
            }
            return _newarray[0];
        };
        MathClass.math_distance = function (x1, y1, x2, y2) {
            return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
        };
        MathClass.math_angle = function (x1, y1, x2, y2) {
            var d_x = x1 - x2;
            var d_y = y1 - y2;
            var z = Math.atan(d_y / d_x) * 180 / Math.PI;
            return z;
        };
        MathClass.easeIn = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };
        MathClass.easeOut = function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };
        MathClass.easeInOut = function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            else {
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        };
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $stage3DVO 为stage3d的坐标信息
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        MathClass.mathDisplay2Dto3DWorldPos = function ($stage3DVO, $point, $depht) {
            if ($depht === void 0) { $depht = 300; }
            var cameraMatrixInvert = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
            var viewMatrx3DInvert = Pan3d.Scene_data.viewMatrx3D.clone();
            cameraMatrixInvert.invert();
            viewMatrx3DInvert.invert();
            var a = new Pan3d.Vector3D();
            a.x = $point.x - $stage3DVO.x;
            a.y = $point.y - $stage3DVO.y;
            a.x = a.x * 2 / $stage3DVO.width - 1;
            a.y = 1 - a.y * 2 / $stage3DVO.height;
            a.w = $depht;
            a.x = a.x * a.w;
            a.y = a.y * a.w;
            a = viewMatrx3DInvert.transformVector(a);
            a.z = $depht;
            a = cameraMatrixInvert.transformVector(a);
            return a;
        };
        MathClass.SetShock = true;
        return MathClass;
    }());
    Pan3d.MathClass = MathClass;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MathClass.js.map