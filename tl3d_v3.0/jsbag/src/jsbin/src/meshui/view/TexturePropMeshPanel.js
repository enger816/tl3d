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
var prop;
(function (prop) {
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var TexturePropMeshPanel = /** @class */ (function (_super) {
        __extends(TexturePropMeshPanel, _super);
        function TexturePropMeshPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TexturePropMeshPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "picurl", target: this, Suffix: "jpg|png", Category: "属性" },
                { Type: prop.ReflectionData.ComboBox, Label: "Wrap:", FunKey: "wrapValue", target: this, Data: [{ name: "repeat", type: 0 }, { name: "clamp", type: 1 }] },
                { Type: prop.ReflectionData.ComboBox, Label: "Mipmap:", FunKey: "mipmapValue", target: this, Data: [{ name: "no", type: 0 }, { name: "mipnearest", type: 1 }, { name: "miplinear", type: 2 }] },
                { Type: prop.ReflectionData.ComboBox, Label: "filter:", FunKey: "filterValue", target: this, Data: [{ name: "linear", type: 0 }, { name: "nearest", type: 1 }] },
                { Type: prop.ReflectionData.ComboBox, Label: "预乘:", FunKey: "permulValue", target: this, Data: [{ name: "false", type: 0 }, { name: "true", type: 1 }] },
            ];
            return ary;
        };
        Object.defineProperty(TexturePropMeshPanel.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.textureSampleNodeUI = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexturePropMeshPanel.prototype, "picurl", {
            get: function () {
                return this.textureSampleNodeUI.nodeTree.url;
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.url = value;
                this.textureSampleNodeUI.drawPicBmp();
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexturePropMeshPanel.prototype, "constValue", {
            get: function () {
                return 1;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexturePropMeshPanel.prototype, "wrapValue", {
            get: function () {
                return this.textureSampleNodeUI.nodeTree.wrap;
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.wrap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexturePropMeshPanel.prototype, "mipmapValue", {
            get: function () {
                return this.textureSampleNodeUI.nodeTree.mipmap;
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.mipmap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexturePropMeshPanel.prototype, "filterValue", {
            get: function () {
                return this.textureSampleNodeUI.nodeTree.filter;
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.filter = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexturePropMeshPanel.prototype, "permulValue", {
            get: function () {
                if (this.textureSampleNodeUI.nodeTree.permul) {
                    return 1;
                }
                else {
                    return 0;
                }
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.permul = Boolean(value);
            },
            enumerable: true,
            configurable: true
        });
        TexturePropMeshPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return TexturePropMeshPanel;
    }(prop.MetaDataView));
    prop.TexturePropMeshPanel = TexturePropMeshPanel;
})(prop || (prop = {}));
//# sourceMappingURL=TexturePropMeshPanel.js.map