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
    var CheckBox2DUI = /** @class */ (function (_super) {
        __extends(CheckBox2DUI, _super);
        function CheckBox2DUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckBox2DUI.prototype.initView = function () {
            this.boxIcon = new prop.BaseMeshUi(18, 18);
            this.textLabelUI = new prop.TextLabelUI();
            this.propPanle.addBaseMeshUi(this.boxIcon);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.height = 25;
            this.boxIcon.ui.addEventListener(InteractiveEvent.Up, this.clikMouseUp, this);
        };
        CheckBox2DUI.prototype.clikMouseUp = function (evt) {
            this.target[this.FunKey] = !this.target[this.FunKey];
            this.refreshViewValue();
        };
        CheckBox2DUI.prototype.destory = function () {
            this.boxIcon.ui.removeEventListener(InteractiveEvent.Up, this.clikMouseUp, this);
            this.textLabelUI.destory();
            this.boxIcon.destory();
        };
        CheckBox2DUI.prototype.refreshViewValue = function () {
            if (this.target[this.FunKey]) {
                this.drawUrlImgToUi(this.boxIcon.ui, "icon/checkbox_down.png");
            }
            else {
                this.drawUrlImgToUi(this.boxIcon.ui, "icon/checkbox_up.png");
            }
        };
        Object.defineProperty(CheckBox2DUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x;
                this.boxIcon.x = 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckBox2DUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y + 5;
                this.boxIcon.y = this._y + 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckBox2DUI.prototype, "label", {
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
        return CheckBox2DUI;
    }(prop.BaseReflComponent));
    prop.CheckBox2DUI = CheckBox2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=CheckBox2DUI.js.map