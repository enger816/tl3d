var FocusRect = /** @class */ (function () {
    function FocusRect($centX, $centZ, $minx, $minz, $maxx, $maxz, $mindis, $maxdis) {
        this.centX = $centX;
        this.centZ = $centZ;
        this.minx = $minx;
        this.minz = $minz;
        this.maxx = $maxx;
        this.maxz = $maxz;
        this.mindis = $mindis;
        this.maxdis = $maxdis;
    }
    return FocusRect;
}());
var KeyControlManager = /** @class */ (function () {
    function KeyControlManager() {
        this.focusRect = new FocusRect(0, 0, -200, -200, 200, 200, 500, 1500);
        this.lastFopcus3DPos = new Vector3D;
        this.lastMouseHit = new Vector3D;
        this.lastRotationY = 0;
        this._lastMousePos = new Vector3D;
        this._lastFocus = new Vector3D;
        this._isMouseDown = false;
        this._lock = false;
    }
    KeyControlManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new KeyControlManager();
        }
        return this._instance;
    };
    KeyControlManager.prototype.init = function () {
        var _this = this;
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.PinchStart, this.onMousePinchStart, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Pinch, this.onMouseSwipe, this);
        document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
    };
    KeyControlManager.prototype.onMousePinchStart = function ($evt) {
        this.lastCamDis = Scene_data.cam3D.distance;
    };
    KeyControlManager.prototype.onMouseSwipe = function ($evt) {
        var num = Math.max(0.2, Math.min($evt.data, 2));
        Scene_data.cam3D.distance = this.lastCamDis * (2 - $evt.data);
        this.upData();
        // Scene_data.focus3D.rotationY = this.lastRotationY + $evt.roation
    };
    KeyControlManager.prototype.onMouseWheel = function ($evt) {
        Scene_data.cam3D.distance += $evt.wheelDelta / 10;
    };
    KeyControlManager.prototype.onMouseMove = function ($evt) {
        if (this._isMouseDown) {
            var _E = Groundposition.getGroundPos($evt.x, $evt.y);
            Scene_data.focus3D.x = this.lastFopcus3DPos.x - (_E.x - this.lastMouseHit.x);
            Scene_data.focus3D.z = this.lastFopcus3DPos.z - (_E.z - this.lastMouseHit.z);
        }
        this.upData();
    };
    KeyControlManager.prototype.upData = function () {
        if (this.focusRect) {
            if (Scene_data.focus3D.x < (this.focusRect.minx + this.focusRect.centX)) {
                Scene_data.focus3D.x = (this.focusRect.minx + this.focusRect.centX);
            }
            if (Scene_data.focus3D.x > (this.focusRect.maxx + this.focusRect.centX)) {
                Scene_data.focus3D.x = (this.focusRect.maxx + this.focusRect.centX);
            }
            if (Scene_data.focus3D.z < (this.focusRect.minz + this.focusRect.centZ)) {
                Scene_data.focus3D.z = (this.focusRect.minz + this.focusRect.centZ);
            }
            if (Scene_data.focus3D.z > (this.focusRect.maxz + this.focusRect.centZ)) {
                Scene_data.focus3D.z = (this.focusRect.maxz + this.focusRect.centZ);
            }
        }
        Scene_data.cam3D.distance = Math.max(Scene_data.cam3D.distance, this.focusRect.mindis);
        Scene_data.cam3D.distance = Math.min(Scene_data.cam3D.distance, this.focusRect.maxdis);
    };
    KeyControlManager.prototype.addCentZ = function ($num) {
        Scene_data.focus3D.z += $num;
        this.focusRect.centZ += $num;
        this.upData();
    };
    KeyControlManager.prototype.onMouseDown = function ($evt) {
        this._lastMousePos.x = $evt.x;
        this.lastRotationY = Scene_data.focus3D.rotationY;
        this._isMouseDown = true;
        this.lastFopcus3DPos.x = Scene_data.focus3D.x;
        this.lastFopcus3DPos.y = Scene_data.focus3D.y;
        this.lastFopcus3DPos.z = Scene_data.focus3D.z;
        this.lastMouseHit = Groundposition.getGroundPos($evt.x, $evt.y);
    };
    KeyControlManager.prototype.onMouseUp = function ($evt) {
        this._isMouseDown = false;
    };
    return KeyControlManager;
}());
//# sourceMappingURL=KeyControlManager.js.map