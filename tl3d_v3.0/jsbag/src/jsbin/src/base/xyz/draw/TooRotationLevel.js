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
    var TooRotationDisplay3DSprite = cctv.TooRotationDisplay3DSprite;
    var TooRotationLevel = /** @class */ (function (_super) {
        __extends(TooRotationLevel, _super);
        function TooRotationLevel(value) {
            var _this = _super.call(this, value) || this;
            _this._roundA = new TooRotationDisplay3DSprite();
            _this._roundB = new TooRotationDisplay3DSprite();
            _this._roundC = new TooRotationDisplay3DSprite();
            _this._roundA.colorVect = new Vector3D(1, 0, 0);
            _this._roundB.colorVect = new Vector3D(0, 1, 0);
            _this._roundC.colorVect = new Vector3D(0, 0, 1);
            return _this;
        }
        TooRotationLevel.prototype.isHit = function (mouseVect2d) {
            this.testHitTemp(this._roundA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._roundB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._roundC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);
        };
        TooRotationLevel.prototype.onMouseDown = function (mouseVect2d) {
            if (xyz.TooMathHitModel.testHitModel(this._roundA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._roundB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._roundC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }
            if (this.selectId) {
                var a, b, c;
                switch (this.selectId) {
                    case 1:
                        a = new Vector3D(0, -100, +50);
                        b = new Vector3D(0, -100, -50);
                        c = new Vector3D(0, 100, +50);
                        break;
                    case 2:
                        a = new Vector3D(-100, 0, +50);
                        b = new Vector3D(-100, 0, -50);
                        c = new Vector3D(+100, 0, +50);
                        break;
                    case 3:
                        a = new Vector3D(-100, +50, 0);
                        b = new Vector3D(-100, -50, 0);
                        c = new Vector3D(+100, +50, 0);
                        break;
                    default:
                        break;
                }
                console.log("旋转轴", this.selectId);
                this.showYaix(a, b, c);
                this.lastDis = this.testInfo(this._linePosinA, this._linePosinB, mouseVect2d);
            }
        };
        TooRotationLevel.prototype.showYaix = function (a, b, c) {
            var scene = this._scene;
            var mat = scene.cam3D.cameraMatrix.clone();
            var viewMatrx3D = scene.viewMatrx3D.clone();
            mat.append(viewMatrx3D);
            var _xyzMoveData = this.parent.xyzMoveData;
            a = _xyzMoveData.modeMatrx3D.transformVector(a);
            b = _xyzMoveData.modeMatrx3D.transformVector(b);
            c = _xyzMoveData.modeMatrx3D.transformVector(c);
            var $triNrm = Vector3D.calTriNormal(a, b, c, true); //获取平面法线
            var centen2d = xyz.TooMathHitModel.math3DWorldtoDisplay2DPos(_xyzMoveData.modeMatrx3D.position, mat, scene.cam3D.cavanRect);
            var outPos2d = xyz.TooMathHitModel.math3DWorldtoDisplay2DPos($triNrm.add(_xyzMoveData.modeMatrx3D.position), mat, scene.cam3D.cavanRect);
            this._linePosinA = centen2d;
            this._linePosinB = outPos2d;
        };
        TooRotationLevel.prototype.onMouseUp = function (mouseVect2d) {
            this.selectId = 0;
            this.lastDis = null;
        };
        TooRotationLevel.prototype.testInfo = function (A, B, C) {
            var a = new Vector2D(0, 0);
            var b = new Vector2D(-1, 1);
            var c = new Vector2D(10, 10);
            a = A;
            b = B;
            c = C;
            var r = Math.atan2(b.y - a.y, b.x - a.x);
            var m = new Matrix3D();
            m.appendRotation(90 - (r * 180 / Math.PI), Vector3D.Z_AXIS);
            var d = m.transformVector(new Vector3D(c.x, c.y, 0));
            return d.x;
        };
        TooRotationLevel.prototype.onMouseMove = function (mouseVect2d) {
            var isTrue; //是否有执行
            if (this.selectId > 0) {
                var dis = this.testInfo(this._linePosinA, this._linePosinB, mouseVect2d);
                if (!isNaN(this.lastDis)) {
                    var addRotation = dis - this.lastDis;
                    var _xyzMoveData = this.parent.xyzMoveData;
                    var $m = new Matrix3D;
                    $m.appendRotation(_xyzMoveData.rotationX, Vector3D.X_AXIS);
                    $m.appendRotation(_xyzMoveData.rotationY, Vector3D.Y_AXIS);
                    $m.appendRotation(_xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                    var $addM = new Matrix3D();
                    switch (this.selectId) {
                        case 1:
                            $addM.appendRotation(addRotation, Vector3D.X_AXIS);
                            break;
                        case 2:
                            $addM.appendRotation(-addRotation, Vector3D.Y_AXIS);
                            break;
                        case 3:
                            $addM.appendRotation(addRotation, Vector3D.Z_AXIS);
                            break;
                        default:
                            break;
                    }
                    $m.prepend($addM);
                    var outVec3d = $m.toEulerAngles();
                    //   console.log(outVec3d)
                    _xyzMoveData.rotationX = outVec3d.x;
                    _xyzMoveData.rotationY = outVec3d.y;
                    _xyzMoveData.rotationZ = outVec3d.z;
                    isTrue = true;
                }
                else {
                    console.log("开始");
                }
                this.lastDis = dis;
            }
            return isTrue;
        };
        TooRotationLevel.prototype.update = function () {
            _super.prototype.update.call(this);
            this.posMatrix.identity();
            if (this.parent.xyzMoveData) {
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
            this._roundA.posMatrix = this.posMatrix.clone();
            this._roundB.posMatrix = this.posMatrix.clone();
            this._roundB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);
            this._roundC.posMatrix = this.posMatrix.clone();
            this._roundC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
            Scene_data.context3D.renderContext.enable(Scene_data.context3D.renderContext.CULL_FACE);
            Scene_data.context3D.renderContext.cullFace(Scene_data.context3D.renderContext.BACK);
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);
            this._roundA.update();
            this._roundB.update();
            this._roundC.update();
        };
        return TooRotationLevel;
    }(xyz.TooBaseModelLevel));
    xyz.TooRotationLevel = TooRotationLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooRotationLevel.js.map