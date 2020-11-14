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
var SkinMesh = /** @class */ (function (_super) {
    __extends(SkinMesh, _super);
    function SkinMesh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.meshAry = new Array;
        _this.fileScale = 1;
        _this.tittleHeight = 0;
        _this.hitBox = new Vector2D(0, 0);
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
        var a = new Vector3D(-w, 0, -w);
        var b = new Vector3D(w, 0, -w);
        var c = new Vector3D(w, 0, w);
        var d = new Vector3D(-w, 0, w);
        this.hitPosItem.push(a);
        this.hitPosItem.push(b);
        this.hitPosItem.push(c);
        this.hitPosItem.push(d);
        var a1 = new Vector3D(-w, h, -w);
        var b1 = new Vector3D(w, h, -w);
        var c1 = new Vector3D(w, h, w);
        var d1 = new Vector3D(-w, h, w);
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
        var url = Scene_data.fileRoot + $meshData.materialUrl;
        url = url.replace("_byte.txt", ".txt");
        url = url.replace(".txt", "_byte.txt");
        MaterialManager.getInstance().getMaterialByte(url, function ($material) {
            $meshData.material = $material;
            if ($material.usePbr) {
                MeshDataManager.getInstance().uploadPbrMesh($meshData, $material.useNormal);
            }
            else if ($material.lightProbe || $material.directLight) {
                MeshDataManager.getInstance().uploadPbrMesh($meshData, false);
            }
            if ($meshData.materialParamData) {
                $meshData.materialParam = new MaterialBaseParam();
                $meshData.materialParam.setData($meshData.material, $meshData.materialParamData);
            }
            if ($fun) {
                $fun($material);
            }
        }, null, true, MaterialAnimShader.MATERIAL_ANIM_SHADER, MaterialAnimShader);
    };
    SkinMesh.prototype.setAction = function (actionAry, roleUrl) {
        this.animUrlAry = new Array;
        for (var i = 0; i < actionAry.length; i++) {
            var name = actionAry[i];
            var url = roleUrl + actionAry[i];
            var anim = AnimManager.getInstance().getAnimDataImmediate(url);
            anim.processMesh(this);
            this.animDic[name] = anim;
            this.animUrlAry.push(url);
        }
    };
    SkinMesh.prototype.destory = function () {
        if (this.allParticleDic) {
            for (var key in this.allParticleDic) {
                ParticleManager.getInstance().releaseUrl(key);
            }
            this.allParticleDic = null;
        }
        for (var i = 0; i < this.meshAry.length; i++) {
            this.meshAry[i].destory();
        }
        this.meshAry.length = 0;
        this.meshAry = null;
        this.bindPosMatrixAry.length = 0;
        this.bindPosMatrixAry = null;
        this.bindPosInvertMatrixAry.length = 0;
        this.bindPosInvertMatrixAry = null;
        this.boneSocketDic = null;
        for (var i = 0; i < this.animUrlAry.length; i++) {
            AnimManager.getInstance().clearAnim(this.animUrlAry[i]);
        }
        for (var key in this.animDic) {
            delete this.animDic[key];
        }
        this.animDic = null;
        this.hasDestory = true;
    };
    return SkinMesh;
}(ResCount));
//# sourceMappingURL=SkinMesh.js.map