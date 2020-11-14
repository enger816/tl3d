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
    var Vector2D = Pan3d.Vector2D;
    var PannerNodeUI = /** @class */ (function (_super) {
        __extends(PannerNodeUI, _super);
        function PannerNodeUI() {
            var _this = _super.call(this) || this;
            _this.gap = 20;
            _this.width = 162;
            _this.height = 85;
            _this._coordinate = new Vector2D;
            _this._speed = new Vector2D;
            _this.nodeTree = new materialui.NodeTreePanner;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.PANNER;
            _this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.VEC2, false);
            _this.addItems(_this.outItem);
            _this.inItem = new materialui.ItemMaterialUI("coordinate", materialui.MaterialItemType.VEC2, true);
            _this.addItems(_this.inItem);
            _this.inSpeedItem = new materialui.ItemMaterialUI("speed", materialui.MaterialItemType.VEC2, true);
            _this.addItems(_this.inSpeedItem);
            _this.drawTitleToFrame("UV");
            return _this;
        }
        Object.defineProperty(PannerNodeUI.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (value) {
                this._speed = value;
                this.nodeTree.speedValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PannerNodeUI.prototype, "coordinate", {
            get: function () {
                return this._coordinate;
            },
            set: function (value) {
                this._coordinate = value;
                this.nodeTree.coordinateValue = value;
            },
            enumerable: true,
            configurable: true
        });
        PannerNodeUI.prototype.setData = function (obj) {
            _super.prototype.setData.call(this, obj);
            this.coordinate = new Vector2D(obj.coordinate.x, obj.coordinate.y);
            this.speed = new Vector2D(obj.speed.x, obj.speed.y);
        };
        return PannerNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.PannerNodeUI = PannerNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=PannerNodeUI.js.map