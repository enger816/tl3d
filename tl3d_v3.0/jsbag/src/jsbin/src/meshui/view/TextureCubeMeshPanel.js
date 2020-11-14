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
    var TextureCubeMeshPanel = /** @class */ (function (_super) {
        __extends(TextureCubeMeshPanel, _super);
        function TextureCubeMeshPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextureCubeMeshPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "picurl", target: this, Category: "属性" },
                { Type: prop.ReflectionData.ComboBox, Label: "Wrap:", FunKey: "wrapValue", target: this, Data: [{ name: "repeat", type: 0 }, { name: "clamp", type: 1 }] },
                { Type: prop.ReflectionData.ComboBox, Label: "Mipmap:", FunKey: "mipmapValue", target: this, Data: [{ name: "no", type: 0 }, { name: "mipnearest", type: 1 }, { name: "miplinear", type: 2 }] },
                { Type: prop.ReflectionData.ComboBox, Label: "filter:", FunKey: "filterValue", target: this, Data: [{ name: "linear", type: 0 }, { name: "nearest", type: 1 }] },
                { Type: prop.ReflectionData.ComboBox, Label: "预乘:", FunKey: "permulValue", target: this, Data: [{ name: "false", type: 0 }, { name: "true", type: 1 }] },
            ];
            return ary;
        };
        Object.defineProperty(TextureCubeMeshPanel.prototype, "data", {
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
        Object.defineProperty(TextureCubeMeshPanel.prototype, "picurl", {
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
        Object.defineProperty(TextureCubeMeshPanel.prototype, "constValue", {
            get: function () {
                return 1;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureCubeMeshPanel.prototype, "wrapValue", {
            get: function () {
                return this.textureSampleNodeUI.nodeTree.wrap;
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.wrap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureCubeMeshPanel.prototype, "mipmapValue", {
            get: function () {
                return this.textureSampleNodeUI.nodeTree.mipmap;
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.mipmap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureCubeMeshPanel.prototype, "filterValue", {
            get: function () {
                return this.textureSampleNodeUI.nodeTree.filter;
            },
            set: function (value) {
                this.textureSampleNodeUI.nodeTree.filter = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureCubeMeshPanel.prototype, "permulValue", {
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
        TextureCubeMeshPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return TextureCubeMeshPanel;
    }(prop.MetaDataView));
    prop.TextureCubeMeshPanel = TextureCubeMeshPanel;
})(prop || (prop = {}));
//# sourceMappingURL=TextureCubeMeshPanel.js.map