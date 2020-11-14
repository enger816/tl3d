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
    var ResultNodeUI = /** @class */ (function (_super) {
        __extends(ResultNodeUI, _super);
        function ResultNodeUI() {
            var _this = _super.call(this) || this;
            _this._blenderMode = 0;
            _this._killNum = 0;
            _this._backCull = true;
            _this._writeZbuffer = true;
            _this._useDynamicIBL = false;
            _this._normalScale = 0;
            _this._lightProbe = false;
            _this._directLight = false;
            _this._noLight = false;
            _this._fogMode = 0;
            _this._scaleLightMap = false;
            _this._hdr = false;
            _this.name = "ResultNodeUI" + random(9999999);
            _this.left = 900;
            _this.top = 300;
            _this.gap = 30;
            _this.width = 162;
            _this.height = 180;
            _this.nodeTree = new materialui.NodeTreeOP;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.OP;
            _this.initItem();
            _this.resetBgSize();
            return _this;
        }
        ResultNodeUI.prototype.initItem = function () {
            this.diffuseItem = new materialui.ItemMaterialUI("漫反射", materialui.MaterialItemType.VEC3);
            this.normalItem = new materialui.ItemMaterialUI("法线", materialui.MaterialItemType.VEC3);
            this.reflectItem = new materialui.ItemMaterialUI("反射", materialui.MaterialItemType.VEC3);
            this.alphaItem = new materialui.ItemMaterialUI("透明度", materialui.MaterialItemType.FLOAT);
            this.killItem = new materialui.ItemMaterialUI("不透明蒙版", materialui.MaterialItemType.FLOAT);
            this.addItems(this.diffuseItem);
            this.addItems(this.normalItem);
            this.addItems(this.reflectItem);
            this.addItems(this.alphaItem);
            this.addItems(this.killItem);
        };
        Object.defineProperty(ResultNodeUI.prototype, "blenderMode", {
            get: function () {
                return this._blenderMode;
            },
            set: function (value) {
                this._blenderMode = value;
                this.nodeTree.blendMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "normalScale", {
            get: function () {
                return this._normalScale;
            },
            set: function (value) {
                this._normalScale = value;
                this.nodeTree.normalScale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "lightProbe", {
            get: function () {
                return this._lightProbe;
            },
            set: function (value) {
                this._lightProbe = value;
                this.nodeTree.lightProbe = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "directLight", {
            get: function () {
                return this._directLight;
            },
            set: function (value) {
                this._directLight = value;
                this.nodeTree.directLight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "noLight", {
            get: function () {
                return this._noLight;
            },
            set: function (value) {
                this._noLight = value;
                this.nodeTree.noLight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "fogMode", {
            get: function () {
                return this._fogMode;
            },
            set: function (value) {
                this._fogMode = value;
                this.nodeTree.fogMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "scaleLightMap", {
            get: function () {
                return this._scaleLightMap;
            },
            set: function (value) {
                this._scaleLightMap = value;
                this.nodeTree.scaleLightMap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "writeZbuffer", {
            get: function () {
                return this._writeZbuffer;
            },
            set: function (value) {
                this._writeZbuffer = value;
                this.nodeTree.writeZbuffer = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultNodeUI.prototype, "hdr", {
            get: function () {
                return this._hdr;
            },
            set: function (value) {
                this._hdr = value;
                this.nodeTree.hdr = value;
            },
            enumerable: true,
            configurable: true
        });
        ResultNodeUI.prototype.getData = function () {
            var obj = _super.prototype.getData.call(this);
            obj.blenderMode = this.blenderMode;
            obj.killNum = this._killNum;
            obj.backCull = this._backCull;
            obj.useDynamicIBL = this._useDynamicIBL;
            obj.normalScale = this.normalScale;
            obj.lightProbe = this.lightProbe;
            obj.directLight = this.directLight;
            obj.noLight = this.noLight;
            obj.fogMode = this.fogMode;
            obj.scaleLightMap = this.scaleLightMap;
            obj.writeZbuffer = this.writeZbuffer;
            obj.hdr = this.hdr;
            return obj;
        };
        ResultNodeUI.prototype.setData = function (obj) {
            _super.prototype.setData.call(this, obj);
            this.blenderMode = obj.blenderMode;
            this._killNum = obj.killNum;
            this._backCull = obj.backCull;
            this._useDynamicIBL = obj.useDynamicIBL;
            this._normalScale = obj.normalScale;
            this._lightProbe = obj.lightProbe;
            this._directLight = obj.directLight;
            this._noLight = obj.noLight;
            this._fogMode = obj.fogMode;
            this._scaleLightMap = obj.scaleLightMap;
            this.hdr = obj.hdr;
            if (obj.hasOwnProperty("writeZbuffer")) {
                this._writeZbuffer = obj.writeZbuffer;
            }
            if (isNaN(this._killNum)) {
                this._killNum = 0;
            }
            if (isNaN(this._normalScale)) {
                this._normalScale = 1;
            }
            this.nodeTree.blendMode = this.blenderMode;
            this.nodeTree.killNum = this._killNum;
            this.nodeTree.backCull = this._backCull;
            this.nodeTree.useDynamicIBL = this._useDynamicIBL;
            this.nodeTree.normalScale = this._normalScale;
            this.nodeTree.lightProbe = this._lightProbe;
            this.nodeTree.directLight = this._directLight;
            this.nodeTree.noLight = this._noLight;
            this.nodeTree.fogMode = this._fogMode;
            this.nodeTree.scaleLightMap = this._scaleLightMap;
            this.nodeTree.writeZbuffer = this._writeZbuffer;
            this.nodeTree.hdr = this._hdr;
        };
        return ResultNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.ResultNodeUI = ResultNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=ResultNodeUI.js.map