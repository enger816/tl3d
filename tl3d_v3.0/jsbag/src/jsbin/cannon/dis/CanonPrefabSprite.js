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
var canonkey;
(function (canonkey) {
    var Display3DSprite = Pan3d.Display3DSprite;
    var Vector3D = Pan3d.Vector3D;
    var Quaternion = Pan3d.Quaternion;
    var Vector2D = Pan3d.Vector2D;
    var Matrix3D = Pan3d.Matrix3D;
    var DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    var CanonPrefabSprite = /** @class */ (function (_super) {
        __extends(CanonPrefabSprite, _super);
        function CanonPrefabSprite(value) {
            var _this = _super.call(this) || this;
            _this.dispList = new Array;
            _this._body = value;
            _this._bodyLineSprite = new canonkey.CannonLineSprite();
            _this._bodyLineSprite.baseColor = new Vector3D(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1);
            _this._bodyLineSprite.setBody(_this._body);
            _this.mathBodyScale();
            return _this;
        }
        Object.defineProperty(CanonPrefabSprite.prototype, "mass", {
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
        Object.defineProperty(CanonPrefabSprite.prototype, "bodytype", {
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
        CanonPrefabSprite.prototype.mathBodyScale = function () {
            var $body = this._body;
            var arr = null;
            for (var i = 0; i < $body.shapes.length; i++) {
                var $shapePos = canonkey.Physics.Vect3dC2W($body.shapeOffsets[i]);
                var $shapeQua = canonkey.Physics.Quaternion2W($body.shapeOrientations[i]);
                var $tempDis = new DirectShadowDisplay3DSprite();
                switch ($body.shapes[i].type) {
                    case 1:
                        var $sphere = $body.shapes[i];
                        $shapePos.scaleBy(100 / $sphere.radius);
                        $tempDis.setModelById("whiteball");
                        $tempDis.scaleX = $sphere.radius * 1;
                        $tempDis.scaleY = $sphere.radius * 1;
                        $tempDis.scaleZ = $sphere.radius * 1;
                        break;
                    case 4:
                        var $box = $body.shapes[i];
                        var $boxSize = canonkey.Physics.Vect3dC2W($box.halfExtents);
                        $tempDis.setModelById("whitebox");
                        $tempDis.scaleX = $boxSize.x / 50;
                        $tempDis.scaleY = $boxSize.y / 50;
                        $tempDis.scaleZ = $boxSize.z / 50;
                        break;
                    case 16:
                        var $cylinder = $body.shapes[i];
                        var $scaleVec = this.drawCylinderConvexPolyh($cylinder, $shapePos, $shapeQua);
                        $tempDis.setModelById("whitecylinder");
                        $tempDis.scaleX = $scaleVec.x * 1.3;
                        $tempDis.scaleY = $scaleVec.y * 1.5;
                        $tempDis.scaleZ = $scaleVec.x * 1.3;
                        break;
                    case 32:
                        var $heightField = $body.shapes[i];
                        break;
                    default:
                        break;
                }
                this._directShadowDisplay3DSprite = $tempDis;
                this.dispList.push($tempDis);
            }
        };
        CanonPrefabSprite.prototype.drawCylinderConvexPolyh = function ($cylinder, $pos, $qua) {
            var m = new Matrix3D;
            $qua.toMatrix3D(m);
            m.invert();
            m.appendTranslation($pos.x, $pos.y, $pos.z);
            var $radius = 0;
            var $height = 0;
            for (var i = 0; i < $cylinder.faces.length; i++) {
                var a = $cylinder.faces[i][0];
                var b = $cylinder.faces[i][1];
                var c = $cylinder.faces[i][2];
                var d = $cylinder.faces[i][3];
                var A = canonkey.Physics.Vect3dC2W($cylinder.vertices[a]);
                var B = canonkey.Physics.Vect3dC2W($cylinder.vertices[b]);
                var C = canonkey.Physics.Vect3dC2W($cylinder.vertices[c]);
                var D = canonkey.Physics.Vect3dC2W($cylinder.vertices[d]);
                $height = Math.max($height, A.y, B.y, C.y, D.y);
                $radius = Math.max($radius, A.x * A.x + A.z * A.z);
                $radius = Math.max($radius, B.x * B.x + B.z * B.z);
                $radius = Math.max($radius, C.x * C.x + C.z * C.z);
            }
            return new Vector2D(Math.sqrt($radius) / canonkey.Physics.baseScale10, $height / canonkey.Physics.baseScale10);
        };
        CanonPrefabSprite.prototype.updateMatrix = function () {
            if (this._body) {
                this._body.position = canonkey.Physics.Vec3dW2C(new Vector3D(this._x, this._y, this._z));
                var $m = new Matrix3D();
                $m.appendRotation(this._rotationZ, Vector3D.Z_AXIS);
                $m.appendRotation(this._rotationY, Vector3D.Y_AXIS);
                $m.appendRotation(this._rotationX, Vector3D.X_AXIS);
                var $q = new Quaternion();
                $q.fromMatrix($m);
                this._body.quaternion = canonkey.Physics.QuaternionW2C($q);
            }
        };
        CanonPrefabSprite.prototype.update = function () {
            if (this._body) {
                this.mathPosMatrix();
                //this._directShadowDisplay3DSprite.x = this._x;
                //this._directShadowDisplay3DSprite.y = this._y;
                //this._directShadowDisplay3DSprite.z = this._z;
                //this._directShadowDisplay3DSprite.rotationX = this._rotationX;
                //this._directShadowDisplay3DSprite.rotationY = this._rotationY;
                //this._directShadowDisplay3DSprite.rotationZ = this._rotationZ;
                for (var i = 0; i < this.dispList.length; i++) {
                    var $dis = this.dispList[i];
                    var $ma = new Matrix3D;
                    canonkey.Physics.MathBody2WMatrix3D(this._body, $ma);
                    var $shapeQua = canonkey.Physics.Quaternion2W(this._body.shapeOrientations[i]);
                    var $shapePos = canonkey.Physics.Vect3dC2W(this._body.shapeOffsets[i]);
                    var $mqua = $shapeQua.toMatrix3D();
                    $mqua.invert();
                    var $endM = new Matrix3D;
                    $endM.append($mqua);
                    $endM.appendTranslation($shapePos.x, $shapePos.y, $shapePos.z);
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
        Object.defineProperty(CanonPrefabSprite.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        CanonPrefabSprite.prototype.addToWorld = function () {
            if (this._body) {
                this._scene.addDisplay(this);
                this._bodyLineSprite._scene = this._scene;
                //  this._scene.addDisplay(this._bodyLineSprite);
                for (var i = 0; i < this.dispList.length; i++) {
                    this.dispList[i]._scene = this._scene;
                    this._scene.addDisplay(this.dispList[i]);
                }
                canonkey.Physics.world.addBody(this._body);
            }
        };
        CanonPrefabSprite.prototype.mathPosMatrix = function () {
            var $ma = new Matrix3D;
            canonkey.Physics.MathBody2WMatrix3D(this._body, $ma);
            this.posMatrix.m = $ma.m;
            var $shapeQua = canonkey.Physics.Quaternion2W(this._body.shapeOrientations[0]);
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
        CanonPrefabSprite.prototype.getPostionV3d = function () {
            return new Vector3D(this.x, this.y, this.z);
        };
        return CanonPrefabSprite;
    }(Display3DSprite));
    canonkey.CanonPrefabSprite = CanonPrefabSprite;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=CanonPrefabSprite.js.map