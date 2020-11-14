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
var materialui;
(function (materialui) {
    var TexItem = Pan3d.TexItem;
    var Material = Pan3d.Material;
    var ConstItem = Pan3d.ConstItem;
    var MaterialTree = /** @class */ (function (_super) {
        __extends(MaterialTree, _super);
        function MaterialTree() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.texList = new Array;
            _this.constList = new Array;
            _this.killNum = 0;
            _this.writeZbuffer = true;
            _this.fcIDAry = new Array; //[]
            return _this;
        }
        Object.defineProperty(MaterialTree.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        MaterialTree.prototype.setData = function (value) {
            this.data = value.data;
            this.compileData = value.compileData;
        };
        MaterialTree.prototype.clone = function () {
            var $temp = new MaterialTree;
            var $treeMater = this;
            $temp.data = $treeMater.data;
            $temp.constList = $treeMater.constList;
            $temp.fcNum = $treeMater.fcNum;
            $temp.fcData = $treeMater.fcData;
            $temp.texList = $treeMater.texList;
            $temp.useNormal = $treeMater.useNormal;
            $temp.useLightUv = $treeMater.useLightUv;
            $temp.hasTime = $treeMater.hasTime;
            $temp.timeSpeed = $treeMater.timeSpeed;
            $temp.timeValue = $treeMater.timeValue;
            $temp.useUv = $treeMater.useUv;
            $temp.blendMode = $treeMater.blendMode;
            return $temp;
        };
        Object.defineProperty(MaterialTree.prototype, "compileData", {
            set: function (value) {
                if (!value) {
                    return;
                }
                this._compileData = value;
                this.shaderStr = this._compileData.shaderStr;
                this.hasTime = this._compileData.hasTime;
                this.timeSpeed = this._compileData.timeSpeed;
                this.blendMode = this._compileData.blendMode;
                this.backCull = this._compileData.backCull;
                this.killNum = this._compileData.killNum;
                this.hasVertexColor = this._compileData.hasVertexColor;
                this.usePbr = this._compileData.usePbr;
                this.useNormal = this._compileData.useNormal;
                this.roughness = this._compileData.roughness;
                this.writeZbuffer = this._compileData.writeZbuffer;
                this.hasFresnel = this._compileData.hasFresnel;
                this.useDynamicIBL = this._compileData.useDynamicIBL;
                this.normalScale = this._compileData.normalScale;
                this.lightProbe = this._compileData.lightProbe;
                this.directLight = this._compileData.directLight;
                this.noLight = this._compileData.noLight;
                this.fogMode = this._compileData.fogMode;
                this.scaleLightMap = this._compileData.scaleLightMap;
                this.useKill = this._compileData.useKill;
                this.fcNum = this._compileData.fcNum;
                this.fcIDAry = this._compileData.fcIDAry;
                this.hasAlpha = this._compileData.hasAlpha;
                this.skyBoxTextId = this._compileData.skyBoxTextId;
                this.hasSkyBox = this._compileData.hasSkyBox;
                this.materialBaseData = new materialui.MaterialBaseData;
                this.materialBaseData.setData(this._compileData.materialBaseData);
                if (this._compileData.texList) {
                    var ary = this._compileData.texList;
                    this.texList = new Array;
                    for (var i = 0; i < ary.length; i++) {
                        var texItem = new TexItem;
                        texItem.id = ary[i].id;
                        texItem.url = ary[i].url;
                        texItem.isDynamic = ary[i].isDynamic;
                        texItem.paramName = ary[i].paramName;
                        texItem.isMain = ary[i].isMain;
                        texItem.wrap = ary[i].wrap;
                        texItem.filter = ary[i].filter;
                        texItem.mipmap = ary[i].mipmap;
                        texItem.permul = ary[i].permul;
                        texItem.isParticleColor = ary[i].isParticleColor;
                        texItem.type = ary[i].type;
                        this.texList.push(texItem);
                    }
                }
                if (this._compileData.constList) {
                    ary = this._compileData.constList;
                    this.constList = new Array;
                    for (i = 0; i < ary.length; i++) {
                        var constItem = new ConstItem;
                        constItem.setData(ary[i]);
                        this.constList.push(constItem);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return MaterialTree;
    }(Material));
    materialui.MaterialTree = MaterialTree;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialTree.js.map