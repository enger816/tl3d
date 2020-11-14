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
var MeshData = /** @class */ (function (_super) {
    __extends(MeshData, _super);
    function MeshData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boneIDAry = new Array;
        _this.boneWeightAry = new Array;
        _this.boneNewIDAry = new Array;
        _this.particleAry = new Array;
        return _this;
    }
    MeshData.prototype.destory = function () {
        _super.prototype.destory.call(this);
        if (this.materialParam) {
            this.materialParam.destory();
            this.materialParam = null;
            this.materialParamData = null;
        }
        this.boneIDAry.length = 0;
        this.boneWeightAry.length = 0;
        this.boneNewIDAry.length = 0;
        this.boneIDAry = null;
        this.boneWeightAry = null;
        this.boneNewIDAry = null;
        if (this.boneWeightBuffer) {
            Scene_data.context3D.deleteBuffer(this.boneWeightBuffer);
            this.boneWeightBuffer = null;
        }
        if (this.boneIdBuffer) {
            Scene_data.context3D.deleteBuffer(this.boneIdBuffer);
            this.boneIdBuffer = null;
        }
        if (this.material) {
            this.material.clearUseNum();
        }
        this.particleAry.length = 0;
        this.particleAry = null;
        //for (){
        //}
    };
    return MeshData;
}(ObjData));
var BindParticle = /** @class */ (function () {
    //public particle: CombineParticle;
    function BindParticle($url, $socketName) {
        this.url = $url;
        this.socketName = $socketName;
    }
    return BindParticle;
}());
//# sourceMappingURL=MeshData.js.map