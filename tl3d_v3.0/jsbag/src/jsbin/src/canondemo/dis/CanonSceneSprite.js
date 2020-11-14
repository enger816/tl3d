var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cannondis;
(function (cannondis) {
    var Display3DSprite = Pan3d.Display3DSprite;
    var Vector3D = Pan3d.Vector3D;
    var Quaternion = Pan3d.Quaternion;
    var Matrix3D = Pan3d.Matrix3D;
    var Physics = canonkey.Physics;
    var CanonSceneSprite = /** @class */ (function (_super) {
        __extends(CanonSceneSprite, _super);
        function CanonSceneSprite(value) {
            var _this = _super.call(this) || this;
            _this.changeDisplayPos = true;
            _this.dispList = new Array;
            _this._body = value;
            return _this;
        }
        Object.defineProperty(CanonSceneSprite.prototype, "mass", {
            get: function () {
                return this._body.mass;
            },
            //体积
            set: function (value) {
                this._body.mass = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanonSceneSprite.prototype, "bodytype", {
            get: function () {
                return this._body.type;
            },
            //类型
            set: function (value) {
                this._body.type = value;
            },
            enumerable: true,
            configurable: true
        });
        CanonSceneSprite.prototype.mathBodyScale = function () {
        };
        CanonSceneSprite.prototype.updateMatrix = function () {
            if (this._body) {
                this._body.position = Physics.Vec3dW2C(new Vector3D(this._x, this._y, this._z));
                var $m = new Matrix3D();
                $m.appendRotation(this._rotationZ, Vector3D.Z_AXIS);
                $m.appendRotation(this._rotationY, Vector3D.Y_AXIS);
                $m.appendRotation(this._rotationX, Vector3D.X_AXIS);
                var $q = new Quaternion();
                $q.fromMatrix($m);
                this._body.quaternion = Physics.QuaternionW2C($q);
                this.changeDisplayPos = true;
            }
        };
        CanonSceneSprite.prototype.update = function () {
            if (this._body) {
                this.mathPosMatrix();
                if (this._body.type == CANNON.Body.KINEMATIC && !this.changeDisplayPos) {
                    //专门为静态对象限制他的更新
                    return;
                }
                this.changeDisplayPos = false;
                for (var i = 0; i < this.dispList.length; i++) {
                    var $dis = this.dispList[i];
                    var $ma = new Matrix3D;
                    Physics.MathBody2WMatrix3D(this._body, $ma);
                    var $shapeQua = Physics.Quaternion2W(this._body.shapeOrientations[i]);
                    var $shapePos = Physics.Vect3dC2W(this._body.shapeOffsets[i]);
                    var $mqua = $shapeQua.toMatrix3D();
                    $mqua.invert();
                    var $endM = new Matrix3D;
                    if (this.dispList.length > 1) {
                        $endM.append($mqua);
                        $endM.appendTranslation($shapePos.x, $shapePos.y, $shapePos.z);
                    }
                    $endM.append($ma);
                    var $pos = $endM.position;
                    $dis.x = $pos.x;
                    $dis.y = $pos.y;
                    $dis.z = $pos.z;
                    var $shapeQua = new Quaternion();
                    $shapeQua.fromMatrix($endM);
                    var $angle = $shapeQua.toEulerAngles();
                    $dis.rotationX = $angle.x * 180 / Math.PI;
                    $dis.rotationY = $angle.y * 180 / Math.PI;
                    $dis.rotationZ = $angle.z * 180 / Math.PI;
                }
            }
        };
        Object.defineProperty(CanonSceneSprite.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        CanonSceneSprite.prototype.addToWorld = function () {
            if (this._body) {
                Physics.world.addBody(this._body);
            }
            this._scene.addDisplay(this);
            for (var i = 0; i < this.dispList.length; i++) {
                this.dispList[i]._scene = this._scene;
                this._scene.addDisplay(this.dispList[i]);
            }
        };
        CanonSceneSprite.prototype.destory = function () {
            _super.prototype.destory.call(this);
            if (this._body) {
                Physics.world.removeBody(this._body);
            }
            while (this.dispList.length) {
                this._scene.removeDisplay(this.dispList.pop());
            }
            this._scene.removeDisplay(this);
        };
        CanonSceneSprite.prototype.mathPosMatrix = function () {
            var $ma = new Matrix3D;
            Physics.MathBody2WMatrix3D(this._body, $ma);
            this.posMatrix.m = $ma.m;
            var $shapeQua = Physics.Quaternion2W(this._body.shapeOrientations[0]);
            var $m = $shapeQua.toMatrix3D();
            this.posMatrix.prepend($m);
            this.posMatrix.prependScale(this._scaleX, this._scaleY, this._scaleZ);
            var $pos = $ma.position;
            this._x = $pos.x;
            this._y = $pos.y;
            this._z = $pos.z;
            var $shapeQua = new Quaternion();
            $shapeQua.fromMatrix(this.posMatrix);
            var $angle = $shapeQua.toEulerAngles();
            this._rotationX = $angle.x * 180 / Math.PI;
            this._rotationY = $angle.y * 180 / Math.PI;
            this._rotationZ = $angle.z * 180 / Math.PI;
        };
        return CanonSceneSprite;
    }(Display3DSprite));
    cannondis.CanonSceneSprite = CanonSceneSprite;
})(cannondis || (cannondis = {}));
//# sourceMappingURL=CanonSceneSprite.js.map