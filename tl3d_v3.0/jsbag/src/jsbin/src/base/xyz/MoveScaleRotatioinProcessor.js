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
    var BaseEvent = Pan3d.BaseEvent;
    var Vector3D = Pan3d.Vector3D;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var MouseType = Pan3d.MouseType;
    var Matrix3D = Pan3d.Matrix3D;
    var MathUtil = Pan3d.MathUtil;
    var Object3D = Pan3d.Object3D;
    var Quaternion = Pan3d.Quaternion;
    var Display3D = Pan3d.Display3D;
    var KeyboardType = Pan3d.KeyboardType;
    var MoveScaleRotatioinEvent = /** @class */ (function (_super) {
        __extends(MoveScaleRotatioinEvent, _super);
        function MoveScaleRotatioinEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION = "INIT_MOVE_SCALE_ROTATION";
        MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ = "INIT_UICONTAINER_TO_XYZ"; //设置Panel
        MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE = "MAKE_DTAT_ITEM_TO_CHANGE";
        MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA = "CLEAR_XYZ_MOVE_DATA";
        return MoveScaleRotatioinEvent;
    }(BaseEvent));
    xyz.MoveScaleRotatioinEvent = MoveScaleRotatioinEvent;
    var MoveScaleRotatioinModule = /** @class */ (function (_super) {
        __extends(MoveScaleRotatioinModule, _super);
        function MoveScaleRotatioinModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoveScaleRotatioinModule.prototype.getModuleName = function () {
            return "MoveScaleRotatioinModule";
        };
        MoveScaleRotatioinModule.prototype.listProcessors = function () {
            return [new MoveScaleRotatioinProcessor()];
        };
        return MoveScaleRotatioinModule;
    }(Module));
    xyz.MoveScaleRotatioinModule = MoveScaleRotatioinModule;
    var MoveScaleRotatioinProcessor = /** @class */ (function (_super) {
        __extends(MoveScaleRotatioinProcessor, _super);
        function MoveScaleRotatioinProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.mouseInfo = new xyz.MouseVO;
            _this.A = new Matrix3D;
            _this.B = new Matrix3D;
            _this.C = new Matrix3D;
            _this.disMatrix3D = new Matrix3D;
            return _this;
        }
        MoveScaleRotatioinProcessor.prototype.getName = function () {
            return "MoveScaleRotatioinProcessor";
        };
        MoveScaleRotatioinProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MoveScaleRotatioinEvent) {
                switch ($event.type) {
                    case MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION:
                        this.moveScaleRotationLevel = new xyz.MoveScaleRotationLevel();
                        this.selectScene = $event.data;
                        this.selectScene.addDisplay(this.moveScaleRotationLevel);
                        this.addEvents();
                        break;
                    case MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ:
                        this.uiContainer = $event.data;
                        break;
                    case MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE:
                        // this.moveScaleRotationLevel.xyzMoveData = this.makeBaseData();
                        this.moveScaleRotationLevel.xyzMoveData = $event.data;
                        break;
                    case MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA:
                        this.moveScaleRotationLevel.xyzMoveData = null;
                        break;
                    default:
                        break;
                }
            }
        };
        MoveScaleRotatioinProcessor.prototype.makeBaseData = function () {
            var a = new Display3D();
            a.x = 0;
            a.y = 0;
            a.z = 0;
            a.rotationX = 0;
            a.rotationY = 0;
            a.rotationZ = 0;
            return xyz.TooXyzPosData.getBase([a]);
        };
        MoveScaleRotatioinProcessor.prototype.addEvents = function () {
            var _this = this;
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = function ($evt) { _this.onMouseWheel($evt); };
                this.onMouseDownFun = function ($evt) { _this.onMouseDown($evt); };
                this.onMouseMoveFun = function ($evt) { _this.onMouseMove($evt); };
                this.onMouseUpFun = function ($evt) { _this.onMouseUp($evt); };
                this.onKeyDownFun = function ($evt) { _this.onKeyDown($evt); };
                this.onKeyUpFun = function ($evt) { _this.onKeyUp($evt); };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun);
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun);
            document.addEventListener("contextmenu", function (event) {
                event.preventDefault();
            });
        };
        MoveScaleRotatioinProcessor.prototype.removeEvents = function () {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun);
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun);
        };
        MoveScaleRotatioinProcessor.prototype.getCamData = function (tempMatrix3D) {
            var $Minvert = tempMatrix3D.clone();
            $Minvert.invert();
            var $motherAct = new Object3D;
            $motherAct.x = -$Minvert.position.x;
            $motherAct.y = -$Minvert.position.y;
            $motherAct.z = -$Minvert.position.z;
            return $motherAct;
        };
        Object.defineProperty(MoveScaleRotatioinProcessor.prototype, "isCanToDo", {
            get: function () {
                return AppData.sceneEidtType == 1;
            },
            enumerable: true,
            configurable: true
        });
        MoveScaleRotatioinProcessor.prototype.onMouseMove = function ($e) {
            if (!this.isCanToDo) {
                return;
            }
            this.moveScaleRotationLevel.onMouseMove($e);
            if ($e.altKey) {
                switch ($e.buttons) {
                    case 4:
                        if (this.baseCamData) {
                            var nx = -($e.x - this.mouseInfo.last_mouse_x);
                            var ny = -($e.y - this.mouseInfo.last_mouse_y);
                            var $m = this.B.clone();
                            var $Cinvert = this.C.clone();
                            $Cinvert.invert();
                            $m.appendRotation(nx, Vector3D.Y_AXIS);
                            $m.append(this.C);
                            $m.appendRotation(ny, Vector3D.X_AXIS);
                            $m.append($Cinvert);
                            $m.append(this.disMatrix3D);
                            var obj = this.getCamData($m);
                            this.selectScene.cam3D.x = -obj.x;
                            this.selectScene.cam3D.y = -obj.y;
                            this.selectScene.cam3D.z = -obj.z;
                            this.selectScene.cam3D.rotationX = this.baseCamData.rotationX + ny;
                            this.selectScene.cam3D.rotationY = this.baseCamData.rotationY + nx;
                            MathUtil.MathCam(this.selectScene.cam3D);
                        }
                        break;
                    default:
                        break;
                }
            }
            else {
                switch ($e.buttons) {
                    case 4:
                        if (!this.cancalAltKey) { //防止刚才是中键锁定旋转，忽然跳转到中键盘移动
                            var $v = this.mouseHitInWorld3D(new Vector2D($e.x, $e.y));
                            this.selectScene.cam3D.x = this.mouseInfo.oldPosx + (this._middleMoveVe.x - $v.x);
                            this.selectScene.cam3D.y = this.mouseInfo.oldPosy + (this._middleMoveVe.y - $v.y);
                            this.selectScene.cam3D.z = this.mouseInfo.oldPosz + (this._middleMoveVe.z - $v.z);
                            MathUtil.MathCam(this.selectScene.cam3D);
                        }
                        break;
                    case 2:
                        this.selectScene.cam3D.rotationX = this.mouseInfo.old_rotation_x - ($e.y - this.mouseInfo.last_mouse_y);
                        this.selectScene.cam3D.rotationY = this.mouseInfo.old_rotation_y - ($e.x - this.mouseInfo.last_mouse_x);
                        MathUtil.MathCam(this.selectScene.cam3D);
                        break;
                    default:
                        //  console.log($e.buttons)
                        break;
                }
            }
        };
        MoveScaleRotatioinProcessor.prototype.mouseHitInWorld3D = function ($p) {
            var stageHeight = this.selectScene.cam3D.cavanRect.width;
            var stageWidth = this.selectScene.cam3D.cavanRect.height;
            var $v = new Vector3D();
            $v.x = $p.x - stageWidth / 2;
            $v.y = stageHeight / 2 - $p.y;
            $v.z = 100 * 2;
            var $m = new Matrix3D;
            $m.appendRotation(-this.selectScene.cam3D.rotationX, Vector3D.X_AXIS);
            $m.appendRotation(-this.selectScene.cam3D.rotationY, Vector3D.Y_AXIS);
            return $m.transformVector($v);
        };
        MoveScaleRotatioinProcessor.prototype.onMouseDown = function ($e) {
            if (!this.isCanToDo) {
                return;
            }
            this.moveScaleRotationLevel.onMouseDown($e);
            this.middleMovetType = ($e.button == 1);
            this.mouseInfo.last_mouse_x = $e.x;
            this.mouseInfo.last_mouse_y = $e.y;
            this.mouseInfo.oldPosx = this.selectScene.cam3D.x;
            this.mouseInfo.oldPosy = this.selectScene.cam3D.y;
            this.mouseInfo.oldPosz = this.selectScene.cam3D.z;
            this.mouseInfo.old_rotation_x = this.selectScene.cam3D.rotationX;
            this.mouseInfo.old_rotation_y = this.selectScene.cam3D.rotationY;
            switch ($e.button) {
                case 0:
                    break;
                case 1:
                    if ($e.altKey) {
                        this.cancalAltKey = true; //设置如果是中建移动，ALT取消后，不执行中键移动
                    }
                    else {
                        this.cancalAltKey = false;
                    }
                    this._middleMoveVe = this.mouseHitInWorld3D(new Vector2D($e.x, $e.y)); //中键按下的3D坐标
                    this.selectVec = new Vector3D(0, 0, 0);
                    if (this.moveScaleRotationLevel.xyzMoveData) {
                        this.selectVec.x = this.moveScaleRotationLevel.xyzMoveData.x;
                        this.selectVec.y = this.moveScaleRotationLevel.xyzMoveData.y;
                        this.selectVec.z = this.moveScaleRotationLevel.xyzMoveData.z;
                    }
                    this.baseCamData = this.getCamData(this.selectScene.cam3D.cameraMatrix);
                    this.baseCamData.rotationX = this.selectScene.cam3D.rotationX;
                    this.baseCamData.rotationY = this.selectScene.cam3D.rotationY;
                    this.A.identity();
                    this.B.identity();
                    this.C.identity();
                    this.A = this.selectScene.cam3D.cameraMatrix.clone();
                    this.B.appendTranslation(-this.selectVec.x, -this.selectVec.y, -this.selectVec.z);
                    var $q = new Quaternion;
                    $q.fromMatrix(this.selectScene.cam3D.cameraMatrix);
                    this.C = $q.toMatrix3D();
                    this.disMatrix3D = this.A.clone();
                    var $Binvert = this.B.clone();
                    $Binvert.invert();
                    this.disMatrix3D.prepend($Binvert);
                    break;
                default:
                    break;
            }
        };
        MoveScaleRotatioinProcessor.prototype.onMouseUp = function ($e) {
            if (!this.isCanToDo) {
                return;
            }
            this.moveScaleRotationLevel.onMouseUp($e);
        };
        MoveScaleRotatioinProcessor.prototype.onKeyDown = function ($e) {
            if (!this.isCanToDo) {
                return;
            }
            switch ($e.keyCode) {
                case KeyboardType.W:
                    this.moveScaleRotationLevel._statceType = xyz.TooMathMoveUint.MOVE_XYZ;
                    break;
                case KeyboardType.E:
                    this.moveScaleRotationLevel._statceType = xyz.TooMathMoveUint.MOVE_ROUTATION;
                    break;
                case KeyboardType.R:
                    this.moveScaleRotationLevel._statceType = xyz.TooMathMoveUint.MOVE_SCALE;
                    break;
                case KeyboardType.Q:
                    this.moveScaleRotationLevel.xyzMoveData = null;
                    break;
                default:
                    break;
            }
        };
        MoveScaleRotatioinProcessor.prototype.onKeyUp = function ($e) {
            if (!this.isCanToDo) {
                return;
            }
            if ($e.keyCode == 4) {
                this.cancalAltKey = true;
            }
        };
        MoveScaleRotatioinProcessor.prototype.onMouseWheel = function ($evt) {
            if (!this.isCanToDo) {
                return;
            }
            if ($evt.x > AppData.centenPanel.x && $evt.x < AppData.rightPanel.x) {
                var $slectUi = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
                if (!$slectUi) {
                    var $p = this.getCamForntPos($evt.wheelDelta * 0.1);
                    this.selectScene.cam3D.x = $p.x;
                    this.selectScene.cam3D.y = $p.y;
                    this.selectScene.cam3D.z = $p.z;
                    MathUtil.MathCam(this.selectScene.cam3D);
                }
            }
        };
        MoveScaleRotatioinProcessor.prototype.getCamForntPos = function (dis) {
            var $p = new Vector3D(0, 0, dis);
            var $m = new Matrix3D;
            $m.appendRotation(-this.selectScene.cam3D.rotationX, Vector3D.X_AXIS);
            $m.appendRotation(-this.selectScene.cam3D.rotationY, Vector3D.Y_AXIS);
            $p = $m.transformVector($p);
            $p.x = this.selectScene.cam3D.x + $p.x;
            $p.y = this.selectScene.cam3D.y + $p.y;
            $p.z = this.selectScene.cam3D.z + $p.z;
            return $p;
        };
        MoveScaleRotatioinProcessor.prototype.listenModuleEvents = function () {
            return [
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION),
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ),
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE),
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA),
            ];
        };
        return MoveScaleRotatioinProcessor;
    }(BaseProcessor));
    xyz.MoveScaleRotatioinProcessor = MoveScaleRotatioinProcessor;
})(xyz || (xyz = {}));
//# sourceMappingURL=MoveScaleRotatioinProcessor.js.map