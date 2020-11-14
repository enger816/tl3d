var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var xyz;
(function (xyz) {
    var Display3D = Pan3d.Display3D;
    var Matrix3D = Pan3d.Matrix3D;
    var MoveScaleRotationLevel = /** @class */ (function (_super) {
        __extends(MoveScaleRotationLevel, _super);
        function MoveScaleRotationLevel() {
            var _this = _super.call(this) || this;
            _this._statceType = xyz.TooMathMoveUint.MOVE_NULL;
            _this._tooMoveLevel = new xyz.TooMoveLevel(_this);
            _this._tooRotationLevel = new xyz.TooRotationLevel(_this);
            _this._tooScaleLevel = new xyz.TooScaleLevel(_this);
            return _this;
        }
        MoveScaleRotationLevel.prototype.update = function () {
            var focuV3d = new Vector3D;
            if (this._xyzMoveData) {
                this._xyzMoveData.modeMatrx3D.identity();
                this._xyzMoveData.changeModelMatrix3d();
                //console.log(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z)
                this.lookLenToFocu = Vector3D.distance(this._scene.cam3D, this._xyzMoveData);
            }
            switch (this._statceType) {
                case xyz.TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.update();
                    break;
                case xyz.TooMathMoveUint.MOVE_ROUTATION:
                    this._tooRotationLevel.update();
                    break;
                case xyz.TooMathMoveUint.MOVE_SCALE:
                    this._tooScaleLevel.update();
                    break;
                default:
                    break;
            }
        };
        MoveScaleRotationLevel.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            this._tooMoveLevel._scene = this._scene;
            this._tooRotationLevel._scene = this._scene;
            this._tooScaleLevel._scene = this._scene;
        };
        MoveScaleRotationLevel.prototype.dataUpDate = function () {
        };
        Object.defineProperty(MoveScaleRotationLevel.prototype, "xyzMoveData", {
            get: function () {
                return this._xyzMoveData;
            },
            set: function (value) {
                this._xyzMoveData = value;
                if (this._xyzMoveData == null) {
                    this._statceType = xyz.TooMathMoveUint.MOVE_NULL;
                    return;
                }
                else {
                    this._statceType = xyz.TooMathMoveUint.MOVE_XYZ;
                }
                this._xyzMoveData.modeMatrx3D = new Matrix3D;
                this._xyzMoveData.changeModelMatrix3d();
            },
            enumerable: true,
            configurable: true
        });
        MoveScaleRotationLevel.prototype.onMouseMove = function ($e) {
            var mouseVect2d = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y);
            if ($e.buttons == 0) {
                switch (this._statceType) {
                    case xyz.TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.isHit(mouseVect2d);
                        break;
                    case xyz.TooMathMoveUint.MOVE_ROUTATION:
                        this._tooRotationLevel.isHit(mouseVect2d);
                        break;
                    case xyz.TooMathMoveUint.MOVE_SCALE:
                        this._tooScaleLevel.isHit(mouseVect2d);
                        break;
                    default:
                        break;
                }
            }
            else {
                if ($e.buttons == 1) {
                    var needUpData = false;
                    switch (this._statceType) {
                        case xyz.TooMathMoveUint.MOVE_XYZ:
                            needUpData = this._tooMoveLevel.onMouseMove(mouseVect2d);
                            break;
                        case xyz.TooMathMoveUint.MOVE_ROUTATION:
                            needUpData = this._tooRotationLevel.onMouseMove(mouseVect2d);
                            break;
                        case xyz.TooMathMoveUint.MOVE_SCALE:
                            needUpData = this._tooScaleLevel.onMouseMove(mouseVect2d);
                            break;
                        default:
                            break;
                    }
                    if (needUpData) {
                        this.upChange();
                    }
                }
            }
        };
        MoveScaleRotationLevel.prototype.upChange = function () {
            if (this.xyzMoveData) {
                this.xyzMoveData.upRootMatrix3DToItem();
                this.xyzMoveData.dataUpDate && this.xyzMoveData.dataUpDate();
            }
        };
        MoveScaleRotationLevel.prototype.onMouseUp = function ($e) {
            var mouseVect2d = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y);
            switch (this._statceType) {
                case xyz.TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.onMouseUp(mouseVect2d);
                    break;
                case xyz.TooMathMoveUint.MOVE_ROUTATION:
                    this._tooRotationLevel.onMouseUp(mouseVect2d);
                    break;
                case xyz.TooMathMoveUint.MOVE_SCALE:
                    this._tooScaleLevel.onMouseUp(mouseVect2d);
                    break;
                default:
                    break;
            }
        };
        MoveScaleRotationLevel.prototype.onMouseDown = function ($e) {
            if (!this._xyzMoveData) {
                return;
            }
            this._xyzMoveData.oldx = this._xyzMoveData.x;
            this._xyzMoveData.oldy = this._xyzMoveData.y;
            this._xyzMoveData.oldz = this._xyzMoveData.z;
            this._xyzMoveData.oldscale_x = this._xyzMoveData.scaleX;
            this._xyzMoveData.oldscale_y = this._xyzMoveData.scaleY;
            this._xyzMoveData.oldscale_z = this._xyzMoveData.scaleZ;
            this._xyzMoveData.oldangle_x = this._xyzMoveData.rotationX;
            this._xyzMoveData.oldangle_y = this._xyzMoveData.rotationY;
            this._xyzMoveData.oldangle_z = this._xyzMoveData.rotationZ;
            var mouseVect2d = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y);
            if ($e.button == 0) {
                switch (this._statceType) {
                    case xyz.TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.onMouseDown(mouseVect2d);
                        break;
                    case xyz.TooMathMoveUint.MOVE_ROUTATION:
                        this._tooRotationLevel.onMouseDown(mouseVect2d);
                        break;
                    case xyz.TooMathMoveUint.MOVE_SCALE:
                        this._tooScaleLevel.onMouseDown(mouseVect2d);
                        break;
                    default:
                        break;
                }
            }
        };
        return MoveScaleRotationLevel;
    }(Display3D));
    xyz.MoveScaleRotationLevel = MoveScaleRotationLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=MoveScaleRotationLevel.js.map