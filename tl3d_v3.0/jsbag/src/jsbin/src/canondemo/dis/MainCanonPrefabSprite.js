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
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var BaseRes = Pan3d.BaseRes;
    var TimeUtil = Pan3d.TimeUtil;
    var Physics = canonkey.Physics;
    var MainCanonPrefabSprite = /** @class */ (function (_super) {
        __extends(MainCanonPrefabSprite, _super);
        function MainCanonPrefabSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.bodyfouce = new Vector3D;
            return _this;
        }
        MainCanonPrefabSprite.prototype.LinearFun = function (t, b, c, d) {
            return c * t / d + b;
        };
        MainCanonPrefabSprite.prototype.update = function () {
            this.hasGravityVoDown();
            _super.prototype.update.call(this);
            if (this.guijiparticle) {
                if (this.tureMovePos) {
                    this.guijiparticle.x = this.x + this.tureMovePos.x;
                    this.guijiparticle.y = this.y + this.tureMovePos.y;
                    this.guijiparticle.z = this.z + this.tureMovePos.z;
                }
                else {
                    this.guijiparticle.x = this.x;
                    this.guijiparticle.y = this.y;
                    this.guijiparticle.z = this.z;
                }
            }
        };
        MainCanonPrefabSprite.prototype.hasGravityVoDown = function () {
            if (this.beginGravityVo && this.endGravityVo) {
                var n = TimeUtil.getTimer() - this.aotuFallDownTm;
                var $tmNum = 400;
                if (n < $tmNum) {
                    var add = new Vector3D(this.endGravityVo.x - this.beginGravityVo.x, this.endGravityVo.y - this.beginGravityVo.y, this.endGravityVo.z - this.beginGravityVo.z);
                    add.scaleBy(this.LinearFun(n, 0, 1, $tmNum));
                    this.body.position = Physics.Vec3dW2C(new Vector3D(this.beginGravityVo.x + add.x, this.beginGravityVo.y + add.y, this.beginGravityVo.z + add.z));
                }
                else {
                    this.body.position = Physics.Vec3dW2C(new Vector3D(this.endGravityVo.x, this.endGravityVo.y, this.endGravityVo.z));
                    this.beginGravityVo = null;
                    this.endGravityVo = null;
                    this.body.wakeUp();
                }
                return true;
            }
            else {
                if (this.body && this.bodyfouce) {
                    this.body.force = canonkey.Physics.Vec3dW2C(this.bodyfouce);
                }
                return false;
            }
        };
        MainCanonPrefabSprite.prototype.destory = function () {
            Physics.world.removeBody(this._body);
            while (this.dispList.length) {
                this._scene.removeDisplay(this.dispList.pop());
            }
            this._scene.removeDisplay(this);
            _super.prototype.destory.call(this);
        };
        MainCanonPrefabSprite.prototype.resetParticlePos = function () {
            if (this.guijiparticle) {
                if (this.tureMovePos) {
                    this.guijiparticle.x = this.x + this.tureMovePos.x;
                    this.guijiparticle.y = this.y + this.tureMovePos.y;
                    this.guijiparticle.z = this.z + this.tureMovePos.z;
                }
                else {
                    this.guijiparticle.x = this.x;
                    this.guijiparticle.y = this.y;
                    this.guijiparticle.z = this.z;
                }
                this.guijiparticle.reset();
            }
        };
        MainCanonPrefabSprite.prototype.playLyf = function ($url, $pos, $scale, $bfun) {
            var _this = this;
            if ($pos === void 0) { $pos = null; }
            if ($scale === void 0) { $scale = 1; }
            if ($bfun === void 0) { $bfun = null; }
            var $scene = this._scene;
            $scene.groupDataManager.scene = $scene;
            $scene.groupDataManager.getGroupData(Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = $scene.particleManager.getParticleByte(Scene_data.fileRoot + item.particleUrl);
                        if (_this.guijiparticle) {
                            $scene.particleManager.removeParticle(_this.guijiparticle);
                        }
                        $scene.particleManager.addParticle($particle);
                        _this.guijiparticle = $particle;
                        _this.guijiparticle.scaleX = $scale;
                        _this.guijiparticle.scaleY = $scale;
                        _this.guijiparticle.scaleZ = $scale;
                        _this.tureMovePos = $pos;
                        _this.resetParticlePos();
                        $bfun && $bfun();
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        MainCanonPrefabSprite.prototype.changeSkinById = function (value) {
            this._directShadowDisplay3DSprite.setOtherPic("panelui/skin/pic/skin" + value + ".png");
        };
        MainCanonPrefabSprite.prototype.mathBodyScale = function () {
            var $body = this._body;
            var arr = null;
            for (var i = 0; i < $body.shapes.length; i++) {
                var $shapePos = canonkey.Physics.Vect3dC2W($body.shapeOffsets[i]);
                var $shapeQua = canonkey.Physics.Quaternion2W($body.shapeOrientations[i]);
                var $tempDis = new cannondis.MainDirectShadowDisplay3DSprite();
                switch ($body.shapes[i].type) {
                    case 1:
                        var $sphere = $body.shapes[i];
                        $shapePos.scaleBy(100 / $sphere.radius);
                        $tempDis.setModelById("whiteball");
                        $tempDis.scaleX = $sphere.radius * 1;
                        $tempDis.scaleY = $sphere.radius * 1;
                        $tempDis.scaleZ = $sphere.radius * 1;
                        break;
                    default:
                        break;
                }
                this._directShadowDisplay3DSprite = $tempDis;
                this.dispList.push($tempDis);
            }
        };
        return MainCanonPrefabSprite;
    }(canonkey.CanonPrefabSprite));
    cannondis.MainCanonPrefabSprite = MainCanonPrefabSprite;
})(cannondis || (cannondis = {}));
//# sourceMappingURL=MainCanonPrefabSprite.js.map