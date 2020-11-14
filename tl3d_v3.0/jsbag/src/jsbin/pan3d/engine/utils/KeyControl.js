var Pan3d;
(function (Pan3d) {
    var MouseType = /** @class */ (function () {
        function MouseType() {
        }
        MouseType.MouseDown = "mousedown";
        MouseType.MouseUp = "mouseup";
        MouseType.MouseMove = "mousemove";
        MouseType.MouseClick = "mouseclick";
        MouseType.KeyDown = "keydown";
        MouseType.KeyUp = "keyup";
        MouseType.MouseWheel = "mousewheel";
        //public static TouchMown = "panstart";   
        //public static TouchMove = "panmove";
        //public static TouchUp = "panend";
        //public static TouchClick = "tap";
        MouseType.TouchStart = "touchstart";
        MouseType.TouchMove = "touchmove";
        MouseType.TouchEnd = "touchend";
        MouseType.TouchClick = "touchstart";
        return MouseType;
    }());
    Pan3d.MouseType = MouseType;
    var KeyControl = /** @class */ (function () {
        function KeyControl() {
            var _this = this;
            this._isUpData = true;
            this.speedNum = 10;
            this._keyDic = new Object;
            this._lostMousePos = new Pan3d.Object3D;
            this._lastFousce = new Pan3d.Object3D;
            this._isMouseDown = false;
            setInterval(function () { _this.upData(); }, 1000 / 60);
        }
        Object.defineProperty(KeyControl, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new KeyControl();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        KeyControl.getInstance = function () {
            if (!this._instance) {
                this._instance = new KeyControl();
            }
            return this._instance;
        };
        KeyControl.prototype.init = function () {
            document.addEventListener(MouseType.MouseDown, this.onMouseDown);
            document.addEventListener(MouseType.MouseUp, this.onMouseUp);
            document.addEventListener(MouseType.MouseMove, this.onMouseMove);
            document.addEventListener(MouseType.KeyDown, this.onKeyDown);
            document.addEventListener(MouseType.KeyUp, this.onKeyUp);
        };
        KeyControl.prototype.clearAllEvet = function () {
            document.removeEventListener(MouseType.MouseDown, this.onMouseDown);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUp);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMove);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDown);
            document.removeEventListener(MouseType.KeyUp, this.onKeyUp);
        };
        KeyControl.prototype.clearMouseEvent = function () {
            document.removeEventListener(MouseType.MouseDown, this.onMouseDown);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUp);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMove);
            this._isUpData = false;
        };
        KeyControl.prototype.onMouseMove = function ($evt) {
            var $keyControl = KeyControl.instance;
            var $nowPos = new Pan3d.Object3D;
            $nowPos.x = $evt.pageX;
            $nowPos.y = $evt.pageY;
            if ($keyControl._isMouseDown) {
                Pan3d.Scene_data.cam3D.rotationY = $keyControl._lastFousce.rotationY - ($nowPos.x - $keyControl._lostMousePos.x) / 10;
                Pan3d.Scene_data.cam3D.rotationX = $keyControl._lastFousce.rotationX - ($nowPos.y - $keyControl._lostMousePos.y) / 10;
            }
        };
        KeyControl.prototype.onMouseDown = function ($evt) {
            var $keyControl = KeyControl.instance;
            $keyControl._isMouseDown = true;
            $keyControl._lostMousePos.x = $evt.pageX;
            $keyControl._lostMousePos.y = $evt.pageY;
            $keyControl._lastFousce.rotationX = Pan3d.Scene_data.cam3D.rotationX;
            $keyControl._lastFousce.rotationY = Pan3d.Scene_data.cam3D.rotationY;
        };
        KeyControl.prototype.onMouseUp = function ($evt) {
            var $keyControl = KeyControl.instance;
            $keyControl._isMouseDown = false;
            // FpsMc.tipStr = $evt.layerX + ":" + $evt.layerY;
        };
        KeyControl.prototype.upData = function () {
            if (!this._isUpData) {
                return;
            }
            var _keyDic = this._keyDic;
            if (_keyDic[65]) { //A
                this.tureLeft();
            }
            if (_keyDic[83]) { //S
                // FpsMc.tipStr = "S"
                this.tureDown();
            }
            if (_keyDic[68]) { //D
                this.tureRight();
            }
            if (_keyDic[87]) { //W
                this.tureUp();
            }
            if (_keyDic[81]) { //Q
                Pan3d.Scene_data.cam3D.y -= this.speedNum;
            }
            if (_keyDic[69]) { //E
                Pan3d.Scene_data.cam3D.y += this.speedNum;
            }
            Pan3d.MathClass.MathCam(Pan3d.Scene_data.cam3D);
        };
        KeyControl.prototype.tureLeft = function () {
            var $p = new Pan3d.Vector3D(-this.speedNum, 0, 0, 1); //dis
            var $m = new Pan3d.Matrix3D;
            this.mathFocus3D($p);
        };
        KeyControl.prototype.tureRight = function () {
            var $p = new Pan3d.Vector3D(this.speedNum, 0, 0, 1); //dis
            this.mathFocus3D($p);
        };
        KeyControl.prototype.tureUp = function () {
            var $p = new Pan3d.Vector3D(0, 0, this.speedNum, 1); //dis
            this.mathFocus3D($p);
        };
        KeyControl.prototype.tureDown = function () {
            var $p = new Pan3d.Vector3D(0, 0, -this.speedNum, 1); //dis
            this.mathFocus3D($p);
        };
        KeyControl.prototype.mathFocus3D = function ($p) {
            var $m = new Pan3d.Matrix3D;
            $m.prependRotation(-Pan3d.Scene_data.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
            $m.prependRotation(-Pan3d.Scene_data.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
            $p = $m.transformVector($p);
            Pan3d.Scene_data.cam3D.x += $p.x;
            Pan3d.Scene_data.cam3D.y += $p.y;
            Pan3d.Scene_data.cam3D.z += $p.z;
        };
        KeyControl.prototype.onKeyDown = function ($evt) {
            var _keyDic = KeyControl.instance._keyDic;
            _keyDic[$evt.keyCode] = true;
            if ($evt.keyCode == 0) {
            }
        };
        KeyControl.prototype.onKeyUp = function ($evt) {
            var _keyDic = KeyControl.instance._keyDic;
            _keyDic[$evt.keyCode] = false;
        };
        return KeyControl;
    }());
    Pan3d.KeyControl = KeyControl;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=KeyControl.js.map