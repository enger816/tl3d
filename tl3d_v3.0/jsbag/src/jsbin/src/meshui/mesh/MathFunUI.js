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
    var AgalFunUI = /** @class */ (function (_super) {
        __extends(AgalFunUI, _super);
        function AgalFunUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AgalFunUI.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI();
            this.textFunNameUI = new prop.TextLabelUI();
            this.height = 20;
        };
        AgalFunUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.textFunNameUI.destory();
        };
        Object.defineProperty(AgalFunUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        AgalFunUI.prototype.onChangeInput = function ($evt) {
            this.target[this.FunKey] = this.target[this.FunKey] + this.KeyStep * Number($evt.data);
            this.refreshViewValue();
        };
        AgalFunUI.prototype.refreshViewValue = function () {
            var $vo = this.target[this.FunKey];
            this.textFunNameUI.label = $vo.nodeTree.funName;
        };
        Object.defineProperty(AgalFunUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.textFunNameUI.x = this._x + 75;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AgalFunUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y;
                this.textFunNameUI.y = this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AgalFunUI.prototype, "label", {
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
        return AgalFunUI;
    }(prop.BaseReflComponent));
    prop.AgalFunUI = AgalFunUI;
})(prop || (prop = {}));
//# sourceMappingURL=MathFunUI.js.map