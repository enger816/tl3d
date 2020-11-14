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
    var UiMeshSprite = /** @class */ (function (_super) {
        __extends(UiMeshSprite, _super);
        function UiMeshSprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.metaViewItem = [];
            return _this;
        }
        UiMeshSprite.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.perent) {
                this.rect = this.perent.rect;
            }
            for (var i = 0; i < this._containerList.length; i++) {
                this._containerList[i].left = this.rect.x + 2;
                this._containerList[i].top = this.rect.y + 12;
            }
            for (var i = 0; i < this.metaViewItem.length; i++) {
                this.metaViewItem[i].top = this.rect.y + this.metaViewItem[i].y;
                this.metaViewItem[i].width = this.rect.width - 5;
                this.metaViewItem[i].resize();
            }
        };
        UiMeshSprite.prototype.onAdd = function () {
            for (var i = 0; i < this.metaViewItem.length; i++) {
                this.metaViewItem[i].onAdd();
            }
        };
        UiMeshSprite.prototype.onRemove = function () {
            for (var i = 0; i < this.metaViewItem.length; i++) {
                this.metaViewItem[i].onRemove();
            }
        };
        UiMeshSprite.prototype.addBaseMeshUi = function (value) {
            this.addUIContainer(value.textureContext);
            this.resize();
        };
        UiMeshSprite.prototype.addMeshView = function (value) {
            this.metaViewItem.push(value);
        };
        return UiMeshSprite;
    }(win.Sprite));
    prop.UiMeshSprite = UiMeshSprite;
})(prop || (prop = {}));
//# sourceMappingURL=UiMeshSprite.js.map