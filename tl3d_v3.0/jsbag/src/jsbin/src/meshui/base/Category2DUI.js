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
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Category2DUI = /** @class */ (function (_super) {
        __extends(Category2DUI, _super);
        function Category2DUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Category2DUI.prototype.initView = function () {
            this.categoryBgUi = new prop.BaseMeshUi();
            this.categoryIcon = new prop.BaseMeshUi(16, 16);
            this.categoryOpen = new prop.BaseMeshUi(16, 16);
            this.textLabelUI = new prop.TextLabelUI();
            this.propPanle.addBaseMeshUi(this.categoryBgUi);
            this.propPanle.addBaseMeshUi(this.categoryIcon);
            this.propPanle.addBaseMeshUi(this.categoryOpen);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.height = 25;
            this.categoryBgUi.ui.width = 400;
            this.categoryBgUi.ui.height = this.height - 2;
            this.drawOutColor(this.categoryBgUi.ui, new Vector3D(60, 60, 60));
            this.drawUrlImgToUi(this.categoryIcon.ui, "icon/profeb_16.png");
            this.categoryBgUi.ui.addEventListener(InteractiveEvent.Up, this.clikMouseUp, this);
        };
        Category2DUI.prototype.clikMouseUp = function (evt) {
            this.changFun(this.label);
            this.data = !this.data;
        };
        Category2DUI.prototype.resize = function () {
            this.categoryBgUi.ui.width = this.width;
        };
        Category2DUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.categoryBgUi.destory();
            this.categoryIcon.destory();
            this.categoryOpen.destory();
        };
        Object.defineProperty(Category2DUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                if (this._data) {
                    this.drawUrlImgToUi(this.categoryOpen.ui, "icon/icon_PanUp.png");
                }
                else {
                    this.drawUrlImgToUi(this.categoryOpen.ui, "icon/icon_PanRight.png");
                }
            },
            enumerable: true,
            configurable: true
        });
        Category2DUI.prototype.refreshViewValue = function () {
        };
        Object.defineProperty(Category2DUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 50;
                this.categoryBgUi.x = 0;
                this.categoryOpen.x = 10;
                this.categoryIcon.x = 40;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Category2DUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y + 5;
                this.categoryBgUi.y = this._y;
                this.categoryIcon.y = this._y + 5;
                this.categoryOpen.y = this._y + 5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Category2DUI.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
                this.textLabelUI.label = value;
            },
            enumerable: true,
            configurable: true
        });
        return Category2DUI;
    }(prop.BaseReflComponent));
    prop.Category2DUI = Category2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=Category2DUI.js.map