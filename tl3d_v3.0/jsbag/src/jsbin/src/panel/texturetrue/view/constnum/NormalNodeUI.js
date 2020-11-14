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
    var NormalNodeUI = /** @class */ (function (_super) {
        __extends(NormalNodeUI, _super);
        function NormalNodeUI() {
            var _this = _super.call(this) || this;
            _this._bastTitleStr = "Normal";
            _this.gap = 20;
            _this.width = 162;
            _this.height = 60;
            _this._constValue = new Vector3D;
            _this.initNodeTree();
            _this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.VEC3, false);
            _this.addItems(_this.outItem);
            _this.drawTitleToFrame("Normal");
            return _this;
        }
        NormalNodeUI.prototype.getData = function () {
            var obj = _super.prototype.getData.call(this);
            obj.constValue = this._constValue;
            return obj;
        };
        NormalNodeUI.prototype.initNodeTree = function () {
            this.nodeTree = new materialui.NodeTreeNormal;
            this.nodeTree.ui = this;
            this.nodeTree.type = materialui.NodeTree.NORMAL;
        };
        NormalNodeUI.prototype.setData = function (obj) {
            _super.prototype.setData.call(this, obj);
            this.constValue = new Vector3D(obj.constValue.x, obj.constValue.y, obj.constValue.z, obj.constValue.w);
            this.nodeTree.constVec3 = this.constValue;
        };
        Object.defineProperty(NormalNodeUI.prototype, "constValue", {
            get: function () {
                return this._constValue;
            },
            set: function (value) {
                this._constValue = value;
                this.nodeTree.constVec3 = value;
            },
            enumerable: true,
            configurable: true
        });
        return NormalNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.NormalNodeUI = NormalNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=NormalNodeUI.js.map