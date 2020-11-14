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
    var Vec2PrameCtrlUI = /** @class */ (function (_super) {
        __extends(Vec2PrameCtrlUI, _super);
        function Vec2PrameCtrlUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Vec2PrameCtrlUI.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI();
            this.textX = new prop.TextLabelUI(50, 30);
            this.textY = new prop.TextLabelUI(50, 30);
            this.textX.label = "X:";
            this.textY.label = "Y:";
            this.inputTextUiX = new prop.InputTextUi(100, 30);
            this.inputTextUiY = new prop.InputTextUi(100, 30);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.propPanle.addBaseMeshUi(this.textX);
            this.propPanle.addBaseMeshUi(this.textY);
            this.propPanle.addBaseMeshUi(this.inputTextUiX);
            this.propPanle.addBaseMeshUi(this.inputTextUiY);
            this.inputTextUiX.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.inputTextUiXchange, this);
            this.inputTextUiY.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.inputTextUiYchange, this);
            this.height = 30;
        };
        Vec2PrameCtrlUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.inputTextUiX.destory();
            this.inputTextUiY.destory();
            this.textX.destory();
            this.textY.destory();
        };
        Object.defineProperty(Vec2PrameCtrlUI.prototype, "visible", {
            set: function (value) {
                this.inputTextUiX.visible = value;
                this.inputTextUiY.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2PrameCtrlUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this._v2d = this._data;
            },
            enumerable: true,
            configurable: true
        });
        Vec2PrameCtrlUI.prototype.inputTextUiXchange = function ($evt) {
            this._v2d.x = Number($evt.data);
            this.changeV3d();
        };
        Vec2PrameCtrlUI.prototype.inputTextUiYchange = function ($evt) {
            this._v2d.y = Number($evt.data);
            this.changeV3d();
        };
        Vec2PrameCtrlUI.prototype.changeV3d = function () {
            this.target[this.FunKey] = this._v2d;
            this.changFun && this.changFun(this);
            this.refreshViewValue();
        };
        Vec2PrameCtrlUI.prototype.colorPickUIchange = function ($evt) {
            var $vec = ($evt.data);
            this.target[this.FunKey] = $vec;
            this.changFun && this.changFun(this);
            this.refreshViewValue();
        };
        Vec2PrameCtrlUI.prototype.refreshViewValue = function () {
            this._v2d = this.target[this.FunKey];
            this.inputTextUiX.text = this.getNumStr(this._v2d.x);
            this.inputTextUiY.text = this.getNumStr(this._v2d.y);
        };
        Vec2PrameCtrlUI.prototype.getNumStr = function (num) {
            var n = Math.floor(num * 100) / 100;
            return n.toString();
        };
        Object.defineProperty(Vec2PrameCtrlUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x - 0;
                this.textX.x = this._x + 55;
                this.textY.x = this._x + 125;
                this.inputTextUiX.x = this._x + 85;
                this.inputTextUiY.x = this._x + 155;
            },
            enumerable: true,
            configurable: true
        });
        Vec2PrameCtrlUI.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.inputTextUiX.resize();
            this.inputTextUiY.resize();
        };
        Object.defineProperty(Vec2PrameCtrlUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value + 5;
                this.textLabelUI.y = this._y;
                this.textX.y = this._y;
                this.textY.y = this._y;
                this.inputTextUiX.y = this._y;
                this.inputTextUiY.y = this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2PrameCtrlUI.prototype, "label", {
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
        return Vec2PrameCtrlUI;
    }(prop.BaseReflComponent));
    prop.Vec2PrameCtrlUI = Vec2PrameCtrlUI;
})(prop || (prop = {}));
//# sourceMappingURL=Vec2PrameCtrlUI.js.map