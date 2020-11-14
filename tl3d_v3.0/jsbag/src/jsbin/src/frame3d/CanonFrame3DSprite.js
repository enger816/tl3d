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
    var Display3D = Pan3d.Display3D;
    var Mainbcdddddd = /** @class */ (function (_super) {
        __extends(Mainbcdddddd, _super);
        function Mainbcdddddd(value) {
            return _super.call(this, value) || this;
        }
        Mainbcdddddd.prototype.mathBodyScale = function () {
            var $body = this._body;
            var arr = null;
            for (var i = 0; i < $body.shapes.length; i++) {
                var $shapePos = canonkey.Physics.Vect3dC2W($body.shapeOffsets[i]);
                var $shapeQua = canonkey.Physics.Quaternion2W($body.shapeOrientations[i]);
                var $tempDis = new canonkey.MainDirectShadowDisplay3DSprite();
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
        return Mainbcdddddd;
    }(canonkey.CanonPrefabSprite));
    canonkey.Mainbcdddddd = Mainbcdddddd;
    var FrameCanonPrefabSprite = /** @class */ (function (_super) {
        __extends(FrameCanonPrefabSprite, _super);
        function FrameCanonPrefabSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.frameFileNode = new frame3d.FrameFileNode;
            _this.frameFileNode.sprite = new Pan3d.Object3D;
            _this.maxTime = 0;
            _this.x = 0;
            _this.y = 100;
            _this.z = 0;
            return _this;
        }
        FrameCanonPrefabSprite.prototype.update = function () {
            if (FrameCanonPrefabSprite.isMove) {
                var $f = Pan3d.TimeUtil.getTimer() / 60;
                var $frameTime = $f % this.maxTime;
                this.frameFileNode.update($frameTime);
                var $m = new Pan3d.Matrix3D();
                $m.appendTranslation(this.frameFileNode.sprite.x * 10, this.frameFileNode.sprite.y * 10, this.frameFileNode.sprite.z * 10);
                var tempM = this.bindMatrix.clone();
                tempM.prepend($m);
                this._x = tempM.position.x;
                this._y = tempM.position.y;
                this._z = tempM.position.z;
                this.updateMatrix();
                _super.prototype.update.call(this);
            }
        };
        FrameCanonPrefabSprite.prototype.destory = function () {
            canonkey.Physics.world.removeBody(this._body);
            while (this.dispList.length) {
                this._scene.removeDisplay(this.dispList.pop());
            }
            this._scene.removeDisplay(this);
            _super.prototype.destory.call(this);
        };
        FrameCanonPrefabSprite.isMove = true;
        return FrameCanonPrefabSprite;
    }(Mainbcdddddd));
    canonkey.FrameCanonPrefabSprite = FrameCanonPrefabSprite;
    var CanonFrame3DSprite = /** @class */ (function (_super) {
        __extends(CanonFrame3DSprite, _super);
        function CanonFrame3DSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CanonFrame3DSprite.prototype.loadJiguanByName = function ($name) {
            var _this = this;
            this.spriteItem = new Array();
            this.frame3dRes = new frame3d.Frame3dRes();
            this.frame3dRes.load(Pan3d.Scene_data.fileRoot + "frame3d/jiguan001_frame_base.txt", function () { return _this.loadFrame3DFinish(); });
        };
        CanonFrame3DSprite.prototype.destory = function () {
            console.log("清理机关");
            while (this.spriteItem.length) {
                var dis = this.spriteItem.pop();
                dis.destory();
            }
            _super.prototype.destory.call(this);
        };
        CanonFrame3DSprite.prototype.loadFrame3DFinish = function () {
            for (var i = 0; i < this.frame3dRes.frameItem.length; i++) {
                var $box = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
                var $body = new CANNON.Body({ mass: 1 });
                $body.type = CANNON.Body.KINEMATIC;
                $body.addShape($box);
                var $sprite = new FrameCanonPrefabSprite($body);
                $sprite.frame3dRes = this.frame3dRes;
                $sprite.frameFileNode.setFrameNodeVo(this.frame3dRes.frameItem[i]);
                $sprite._scene = this._scene;
                $sprite.addToWorld();
                this.spriteItem.push($sprite);
                for (var j = 0; j < this.frame3dRes.frameItem[i].pointitem.length; j++) {
                    $sprite.maxTime = Math.max($sprite.maxTime, this.frame3dRes.frameItem[i].pointitem[j].time);
                }
                $sprite.bindMatrix = this.posMatrix;
            }
        };
        return CanonFrame3DSprite;
    }(Display3D));
    canonkey.CanonFrame3DSprite = CanonFrame3DSprite;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=CanonFrame3DSprite.js.map