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
    var TextCtrlInput = /** @class */ (function (_super) {
        __extends(TextCtrlInput, _super);
        function TextCtrlInput() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextCtrlInput.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI();
            this.inputTextUi = new prop.InputTextUi();
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.propPanle.addBaseMeshUi(this.inputTextUi);
            this.inputTextUi.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.onChangeInput, this);
            this.height = 20;
        };
        TextCtrlInput.prototype.destory = function () {
            this.textLabelUI.destory();
            this.inputTextUi.destory();
        };
        Object.defineProperty(TextCtrlInput.prototype, "visible", {
            set: function (value) {
                this.inputTextUi.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextCtrlInput.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        TextCtrlInput.prototype.onChangeInput = function ($evt) {
            this.target[this.FunKey] = Number($evt.data);
            this.changFun && this.changFun(this);
            this.refreshViewValue();
        };
        TextCtrlInput.prototype.refreshViewValue = function () {
            this.inputTextUi.text = this.getNumStr(this.target[this.FunKey]);
        };
        TextCtrlInput.prototype.getNumStr = function (num) {
            return num.toString();
        };
        Object.defineProperty(TextCtrlInput.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.inputTextUi.x = this._x + 75;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextCtrlInput.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y;
                this.inputTextUi.y = this._y + 5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextCtrlInput.prototype, "label", {
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
        return TextCtrlInput;
    }(prop.BaseReflComponent));
    prop.TextCtrlInput = TextCtrlInput;
})(prop || (prop = {}));
//# sourceMappingURL=TextCtrlInput.js.map