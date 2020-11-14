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
    var MaterialFunContentUI = /** @class */ (function (_super) {
        __extends(MaterialFunContentUI, _super);
        function MaterialFunContentUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialFunContentUI.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI(64, 16);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.inputFunTextUi = new prop.InputFunTextUi(512, 512);
            this.propPanle.addBaseMeshUi(this.inputFunTextUi);
            this.inputFunTextUi.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.texturePicUiChange, this);
            this.height = 100;
        };
        MaterialFunContentUI.prototype.texturePicUiChange = function (evt) {
            console.log("更新变化了", evt.data);
            var $agalStr = evt.data;
            var temp = this.nodeUi.nodeTree;
            if (materialui.NodeTreeFun.isNeedChangePanel($agalStr, temp.funStr)) {
                this.nodeUi.inPutFunStr($agalStr);
            }
            else {
                temp.funStr = $agalStr;
                Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
            }
        };
        MaterialFunContentUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.inputFunTextUi.destory();
            _super.prototype.destory.call(this);
        };
        MaterialFunContentUI.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.inputFunTextUi.width = this.width - 20;
            this.inputFunTextUi.height = this.height - 20;
            this.inputFunTextUi.resize();
        };
        Object.defineProperty(MaterialFunContentUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        MaterialFunContentUI.prototype.refreshViewValue = function () {
            this.nodeUi = this.target[this.FunKey];
            this.inputFunTextUi.text = this.nodeUi.nodeTree.funStr;
        };
        Object.defineProperty(MaterialFunContentUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.inputFunTextUi.x = this._x + 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialFunContentUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y;
                this.inputFunTextUi.y = this._y + 20;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialFunContentUI.prototype, "label", {
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
        return MaterialFunContentUI;
    }(prop.BaseReflComponent));
    prop.MaterialFunContentUI = MaterialFunContentUI;
})(prop || (prop = {}));
//# sourceMappingURL=MaterialFunContentUI.js.map