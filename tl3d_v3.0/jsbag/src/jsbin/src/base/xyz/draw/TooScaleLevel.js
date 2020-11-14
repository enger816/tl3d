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
    var Matrix3D = Pan3d.Matrix3D;
    var Scene_data = Pan3d.Scene_data;
    var TooScaleLevel = /** @class */ (function (_super) {
        __extends(TooScaleLevel, _super);
        function TooScaleLevel(value) {
            var _this = _super.call(this, value) || this;
            _this._boxA = new xyz.TooBoxDisplay3DSprite();
            _this._boxB = new xyz.TooBoxDisplay3DSprite();
            _this._boxC = new xyz.TooBoxDisplay3DSprite();
            _this._lineA = new xyz.TooLineTri3DSprite();
            _this._lineB = new xyz.TooLineTri3DSprite();
            _this._lineC = new xyz.TooLineTri3DSprite();
            _this._boxA.colorVect = new Vector3D(1, 0, 0);
            _this._boxB.colorVect = new Vector3D(0, 1, 0);
            _this._boxC.colorVect = new Vector3D(0, 0, 1);
            return _this;
        }
        TooScaleLevel.prototype.isHit = function (mouseVect2d) {
            this.testHitTemp(this._boxA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._boxB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._boxC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);
        };
        TooScaleLevel.prototype.onMouseDown = function (mouseVect2d) {
            if (xyz.TooMathHitModel.testHitModel(this._boxA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._boxB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._boxC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }
            if (this.selectId > 0) {
                var A = new Vector3D(0, 0, 0);
                var B;
                var C;
                switch (this.selectId) {
                    case 1:
                        B = new Vector3D(100, 0, 0);
                        C = new Vector3D(0, 0, 100);
                        break;
                    case 2:
                        B = new Vector3D(100, 0, 0);
                        C = new Vector3D(0, 100, 0);
                        break;
                    case 3:
                        B = new Vector3D(0, 0, 100);
                        C = new Vector3D(0, 100, 0);
                        break;
                    default:
                        break;
                }
                A = this.parent.xyzMoveData.modeMatrx3D.transformVector(A);
                B = this.parent.xyzMoveData.modeMatrx3D.transformVector(B);
                C = this.parent.xyzMoveData.modeMatrx3D.transformVector(C);
                this.pointItem = [A, B, C];
                this.lastMatrix3d = this.parent.xyzMoveData.modeMatrx3D.clone();
                this.lastMousePosV3d = this.getMouseHitPanelPos(mouseVect2d);
                this.lastScaleV3d = new Vector3D(this.parent.xyzMoveData.scaleX, this.parent.xyzMoveData.scaleY, this.parent.xyzMoveData.scaleZ);
            }
        };
        TooScaleLevel.prototype.onMouseUp = function (mouseVect2d) {
            this.lastMousePosV3d = null;
            this.selectId = 0;
        };
        TooScaleLevel.prototype.getMouseHitPanelPos = function (mouseVect2d) {
            var clik3dVect = xyz.TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d, 100); //鼠标前面的3D坐标
            var cam3d = new Vector3D(this._scene.cam3D.x, this._scene.cam3D.y, this._scene.cam3D.z);
            var pos = Pan3d.MathUtil.getLinePlaneInterectPointByTri(cam3d, clik3dVect, this.pointItem);
            var $m = this.lastMatrix3d.clone();
            $m.invert();
            pos = $m.transformVector(pos);
            return pos;
        };
        TooScaleLevel.prototype.onMouseMove = function (mouseVect2d) {
            var isTrue; //是否有执行
            if (this.selectId > 0) {
                if (this.lastMousePosV3d) {
                    var pos = this.getMouseHitPanelPos(mouseVect2d);
                    var addPos = new Vector3D();
                    switch (this.selectId) {
                        case 1:
                            addPos.x = pos.x - this.lastMousePosV3d.x;
                            isTrue = true;
                            break;
                        case 2:
                            addPos.y = pos.y - this.lastMousePosV3d.y;
                            isTrue = true;
                            break;
                        case 3:
                            addPos.z = pos.z - this.lastMousePosV3d.z;
                            isTrue = true;
                            break;
                        default:
                            isTrue = false;
                            break;
                    }
                    console.log(addPos);
                    this.parent.xyzMoveData.scaleX = this.lastScaleV3d.x + addPos.x / 10;
                    this.parent.xyzMoveData.scaleY = this.lastScaleV3d.y + addPos.y / 10;
                    this.parent.xyzMoveData.scaleZ = this.lastScaleV3d.z + addPos.z / 10;
                    /*
                    var $m: Matrix3D = this.lastMatrix3d.clone()
                    $m.prependTranslation(addPos.x, addPos.y, addPos.z)
                    var pos: Vector3D = $m.position
                    this.parent.xyzMoveData.x = pos.x
                    this.parent.xyzMoveData.y = pos.y
                    this.parent.xyzMoveData.z = pos.z

                    */
                }
            }
            return isTrue;
        };
        TooScaleLevel.prototype.getMouseHitPos = function (mouseVect2d) {
            var pos = xyz.TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d, 100);
            var A = new Vector3D(0, 0, 0);
            var B;
            var C;
            switch (this.selectId) {
                case 1:
                    B = new Vector3D(1, 0, 0);
                    C = new Vector3D(0, 0, 1);
                    break;
                case 2:
                    B = new Vector3D(0, 1, 0);
                    C = new Vector3D(0, 0, 1);
                    break;
                case 3:
                    B = new Vector3D(0, 0, 1);
                    C = new Vector3D(1, 0, 0);
                    break;
                default:
                    break;
            }
            return Vector3D.getPointPedalInPlane(pos, A, B, C);
        };
        TooScaleLevel.prototype.update = function () {
            _super.prototype.update.call(this);
            var line50 = 20;
            ;
            if (this.parent.xyzMoveData) {
                this.posMatrix.identity();
                var perentM = this.parent.xyzMoveData.modeMatrx3D.clone();
                perentM = new Matrix3D;
                perentM.appendRotation(this.parent.xyzMoveData.rotationX, Vector3D.X_AXIS);
                perentM.appendRotation(this.parent.xyzMoveData.rotationY, Vector3D.Y_AXIS);
                perentM.appendRotation(this.parent.xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                perentM.appendTranslation(this.parent.xyzMoveData.x, this.parent.xyzMoveData.y, this.parent.xyzMoveData.z);
                var dis = Vector3D.distance(perentM.position, this._scene.cam3D);
                dis = this._scene.cam3D.cameraMatrix.transformVector(perentM.position).z;
                perentM.prependScale(dis / 80, dis / 80, dis / 80);
                this.posMatrix.append(perentM);
            }
            // this.posMatrix.identityScale()
            //this.modelItem[i].x = M.position.x;
            // this.modelItem[i].y = M.position.y;
            // this.modelItem[i].z = M.position.z;
            // var ro: Vector3D = M.toEulerAngles();
            // this.modelItem[i].rotationX = ro.x * 180 / Math.PI;
            // this.modelItem[i].rotationY = ro.y * 180 / Math.PI;
            // this.modelItem[i].rotationZ = ro.z * 180 / Math.PI;
            this._boxA.posMatrix = this.posMatrix.clone();
            this._boxA.posMatrix.prependTranslation(line50, 0, 0);
            this._boxB.posMatrix = this.posMatrix.clone();
            this._boxB.posMatrix.prependTranslation(0, line50, 0);
            this._boxB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);
            ;
            this._boxC.posMatrix = this.posMatrix.clone();
            this._boxC.posMatrix.prependTranslation(0, 0, line50);
            this._boxC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
            this._lineA.posMatrix = this.posMatrix.clone();
            this._lineB.posMatrix = this.posMatrix.clone();
            this._lineB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);
            this._lineC.posMatrix = this.posMatrix.clone();
            this._lineC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
            Scene_data.context3D.cullFaceBack(false);
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);
            this._boxA.update();
            this._boxB.update();
            this._boxC.update();
            this._lineA.update();
            this._lineB.update();
            this._lineC.update();
        };
        return TooScaleLevel;
    }(xyz.TooBaseModelLevel));
    xyz.TooScaleLevel = TooScaleLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooScaleLevel.js.map