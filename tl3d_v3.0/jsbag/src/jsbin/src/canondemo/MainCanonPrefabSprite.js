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
    var Vector3D = Pan3d.Vector3D;
    var DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    var Scene_data = Pan3d.Scene_data;
    var ShadowModel = shadow.ShadowModel;
    var MainDirectShadowDisplay3DSprite = /** @class */ (function (_super) {
        __extends(MainDirectShadowDisplay3DSprite, _super);
        function MainDirectShadowDisplay3DSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainDirectShadowDisplay3DSprite.prototype.updateMatrix = function () {
            _super.prototype.updateMatrix.call(this);
        };
        MainDirectShadowDisplay3DSprite.prototype.drawTemp = function ($dis) {
            if (!this._scene.fbo || !ShadowModel.shadowViewMatx3D) {
                return;
            }
            var $objdata = $dis.objData;
            var $shader = this.modelShder;
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);
                var $numr = new Vector3D(0.5, 0.6, -0.7);
                $numr.normalize();
                Scene_data.context3D.setVc3fv($shader, "sunDirect", [$numr.x, $numr.y, $numr.z]);
                Scene_data.context3D.setVc3fv($shader, "sunColor", [0.8, 0.8, 0.8]);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", [0.2, 0.2, 0.2]);
                Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);
                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);
                Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                Scene_data.context3D.setRenderTexture($shader, "fs1", this._scene.fbo.texture, 1);
                Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
            }
        };
        return MainDirectShadowDisplay3DSprite;
    }(DirectShadowDisplay3DSprite));
    canonkey.MainDirectShadowDisplay3DSprite = MainDirectShadowDisplay3DSprite;
    var MainCanonPrefabSprite = /** @class */ (function (_super) {
        __extends(MainCanonPrefabSprite, _super);
        function MainCanonPrefabSprite(value) {
            return _super.call(this, value) || this;
        }
        MainCanonPrefabSprite.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._guijiparticle) {
                this._guijiparticle.x = this.x;
                this._guijiparticle.y = this.y - 5;
                this._guijiparticle.z = this.z;
            }
        };
        MainCanonPrefabSprite.prototype.addToWorld = function () {
            _super.prototype.addToWorld.call(this);
            if (!this._guijiparticle) {
                if (Pan3d.Scene_data.supportBlob) {
                    this.playLyf("model/genshui_lyf.txt", new Pan3d.Vector3D(0, 0, 0));
                }
                else {
                    this.playLyf("model/genshui_base.txt", new Pan3d.Vector3D(0, 0, 0));
                }
            }
            else {
                console.log("有错");
            }
        };
        MainCanonPrefabSprite.prototype.resetParticlePos = function () {
            if (this._guijiparticle) {
                this._guijiparticle.x = this.x;
                this._guijiparticle.y = this.y - 5;
                this._guijiparticle.z = this.z;
                this._guijiparticle.reset();
            }
        };
        MainCanonPrefabSprite.prototype.playLyf = function ($url, $pos, $r) {
            var _this = this;
            if ($r === void 0) { $r = 0; }
            var $scene = this._scene;
            $scene.groupDataManager.scene = $scene;
            $scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = _this.x;
                        $particle.y = _this.y;
                        $particle.z = _this.z;
                        $particle.rotationY = $r;
                        $scene.particleManager.addParticle($particle);
                        _this._guijiparticle = $particle;
                        _this._guijiparticle.reset();
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        MainCanonPrefabSprite.prototype.mathBodyScale = function () {
            var $body = this._body;
            var arr = null;
            for (var i = 0; i < $body.shapes.length; i++) {
                var $shapePos = canonkey.Physics.Vect3dC2W($body.shapeOffsets[i]);
                var $shapeQua = canonkey.Physics.Quaternion2W($body.shapeOrientations[i]);
                var $tempDis = new MainDirectShadowDisplay3DSprite();
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
    canonkey.MainCanonPrefabSprite = MainCanonPrefabSprite;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=MainCanonPrefabSprite.js.map