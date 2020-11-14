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
    var Vector3D = Pan3d.Vector3D;
    var ConstVec3NodeUI = /** @class */ (function (_super) {
        __extends(ConstVec3NodeUI, _super);
        function ConstVec3NodeUI() {
            var _this = _super.call(this) || this;
            _this._bastTitleStr = "vec3";
            _this.gap = 20;
            _this.width = 162;
            _this.height = 95;
            _this._constValue = new Vector3D;
            _this.initNodeTree();
            _this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.VEC3, false);
            _this.addItems(_this.outItem);
            _this.outAItem = new materialui.ItemMaterialUI("alpha", materialui.MaterialItemType.FLOAT, false);
            _this.addItems(_this.outAItem);
            _this.outRGBAItem = new materialui.ItemMaterialUI("rgba", materialui.MaterialItemType.VEC4, false);
            _this.addItems(_this.outRGBAItem);
            _this.drawTitleToFrame("vec3");
            return _this;
        }
        ConstVec3NodeUI.prototype.getData = function () {
            var obj = _super.prototype.getData.call(this);
            obj.constValue = this._constValue;
            return obj;
        };
        ConstVec3NodeUI.prototype.initNodeTree = function () {
            this.nodeTree = new materialui.NodeTreeVec3;
            this.nodeTree.ui = this;
            this.nodeTree.type = materialui.NodeTree.VEC3;
        };
        ConstVec3NodeUI.prototype.setData = function (obj) {
            _super.prototype.setData.call(this, obj);
            this.constValue = new Vector3D(obj.constValue.x, obj.constValue.y, obj.constValue.z, obj.constValue.w);
            this.nodeTree.constVec3 = this.constValue;
            this.showDynamic();
        };
        Object.defineProperty(ConstVec3NodeUI.prototype, "constValue", {
            get: function () {
                return this._constValue;
            },
            set: function (value) {
                this._constValue = value;
                this.nodeTree.constVec3 = value;
                //_titleLabel.text = _bastTitleStr + "(" + getNumStr(value.x) + "," + getNumStr(value.y) + "," + getNumStr(value.z) + "," + getNumStr(value.w) + ")"
                this.showDynamic();
            },
            enumerable: true,
            configurable: true
        });
        ConstVec3NodeUI.prototype.showDynamic = function () {
            if (this.nodeTree.isDynamic) {
                this.drawTitleToFrame("vec3<" + this.nodeTree.paramName + ">(" + this.getNumStr(this.constValue.x) + "," + this.getNumStr(this.constValue.y) + "," + this.getNumStr(this.constValue.z) + "," + this.getNumStr(this.constValue.w) + ")");
            }
            else {
                this.drawTitleToFrame("vec3(" + this.getNumStr(this.constValue.x) + "," + this.getNumStr(this.constValue.y) + "," + this.getNumStr(this.constValue.z) + "," + this.getNumStr(this.constValue.w) + ")");
            }
        };
        ConstVec3NodeUI.prototype.getNumStr = function (num) {
            var n = Math.floor(num * 100) / 100;
            return n.toString();
        };
        return ConstVec3NodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.ConstVec3NodeUI = ConstVec3NodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=ConstVec3NodeUI.js.map