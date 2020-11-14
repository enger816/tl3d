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
var Pan3d;
(function (Pan3d) {
    var SkinMesh = /** @class */ (function (_super) {
        __extends(SkinMesh, _super);
        function SkinMesh() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.meshAry = new Array;
            _this.fileScale = 1;
            _this.tittleHeight = 0;
            _this.hitBox = new Pan3d.Vector2D(0, 0);
            _this.type = 0;
            _this.animDic = new Object;
            _this.ready = false;
            _this.hasDestory = false;
            return _this;
        }
        SkinMesh.prototype.makeHitBoxItem = function () {
            this.hitPosItem = new Array;
            var w = this.hitBox.x;
            var h = this.hitBox.y;
            var a = new Pan3d.Vector3D(-w, 0, -w);
            var b = new Pan3d.Vector3D(w, 0, -w);
            var c = new Pan3d.Vector3D(w, 0, w);
            var d = new Pan3d.Vector3D(-w, 0, w);
            this.hitPosItem.push(a);
            this.hitPosItem.push(b);
            this.hitPosItem.push(c);
            this.hitPosItem.push(d);
            var a1 = new Pan3d.Vector3D(-w, h, -w);
            var b1 = new Pan3d.Vector3D(w, h, -w);
            var c1 = new Pan3d.Vector3D(w, h, w);
            var d1 = new Pan3d.Vector3D(-w, h, w);
            this.hitPosItem.push(a1);
            this.hitPosItem.push(b1);
            this.hitPosItem.push(c1);
            this.hitPosItem.push(d1);
        };
        SkinMesh.prototype.addMesh = function ($mesh) {
            $mesh.uid = this.meshAry.length;
            this.meshAry.push($mesh);
        };
        SkinMesh.prototype.loadParticle = function () {
        };
        SkinMesh.prototype.loadMaterial = function ($fun) {
            if ($fun === void 0) { $fun = null; }
            for (var i = 0; i < this.meshAry.length; i++) {
                this.loadByteMeshDataMaterial(this.meshAry[i], $fun);
            }
        };
        SkinMesh.prototype.loadByteMeshDataMaterial = function ($meshData, $fun) {
            if ($fun === void 0) { $fun = null; }
            var url = Pan3d.Scene_data.fileRoot + $meshData.materialUrl;
            url = url.replace("_byte.txt", ".txt");
            url = url.replace(".txt", "_byte.txt");
            Pan3d.MaterialManager.getInstance().getMaterialByte(url, function ($material) {
                $meshData.material = $material;
                if ($material.usePbr) {
                    Pan3d.MeshDataManager.getInstance().uploadPbrMesh($meshData, $material.useNormal);
                }
                else if ($material.lightProbe || $material.directLight) {
                    Pan3d.MeshDataManager.getInstance().uploadPbrMesh($meshData, false);
                }
                if ($meshData.materialParamData) {
                    $meshData.materialParam = new Pan3d.MaterialBaseParam();
                    $meshData.materialParam.setData($meshData.material, $meshData.materialParamData);
                }
                if ($fun) {
                    $fun($material);
                }
            }, null, true, Pan3d.MaterialAnimShader.MATERIAL_ANIM_SHADER, Pan3d.MaterialAnimShader);
        };
        SkinMesh.prototype.setAction = function (actionAry, roleUrl) {
            this.animUrlAry = new Array;
            for (var i = 0; i < actionAry.length; i++) {
                var name = actionAry[i];
                var url = roleUrl + actionAry[i];
                var anim = Pan3d.AnimManager.getInstance().getAnimDataImmediate(url);
                anim.processMesh(this);
                this.animDic[name] = anim;
                this.animUrlAry.push(url);
            }
        };
        SkinMesh.prototype.destory = function () {
            if (this.allParticleDic) {
                for (var key in this.allParticleDic) {
                    Pan3d.ParticleManager.getInstance().releaseUrl(key);
                }
                this.allParticleDic = null;
            }
            for (var i = 0; i < this.meshAry.length; i++) {
                this.meshAry[i].destory();
            }
            this.meshAry.length = 0;
            this.meshAry = null;
            this.boneSocketDic = null;
            for (var i = 0; i < this.animUrlAry.length; i++) {
                Pan3d.AnimManager.getInstance().clearAnim(this.animUrlAry[i]);
            }
            for (var key in this.animDic) {
                delete this.animDic[key];
            }
            this.animDic = null;
            this.hasDestory = true;
        };
        SkinMesh.prototype.clone = function () {
            var temp = new SkinMesh();
            for (var key in this) {
                temp[key] = this[key];
            }
            temp.meshAry = [];
            for (var i = 0; i < this.meshAry.length; i++) {
                temp.meshAry.push(this.meshAry[i].clone());
            }
            return temp;
        };
        return SkinMesh;
    }(Pan3d.ResCount));
    Pan3d.SkinMesh = SkinMesh;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkinMesh.js.map