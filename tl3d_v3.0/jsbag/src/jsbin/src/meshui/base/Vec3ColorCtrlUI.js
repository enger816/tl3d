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
    var Vec3dCtrlUI = /** @class */ (function (_super) {
        __extends(Vec3dCtrlUI, _super);
        function Vec3dCtrlUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Vec3dCtrlUI.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI();
            this.textX = new prop.TextLabelUI(50, 30);
            this.textY = new prop.TextLabelUI(50, 30);
            this.textZ = new prop.TextLabelUI(50, 30);
            this.textX.label = "X:";
            this.textY.label = "Y:";
            this.textZ.label = "Z:";
            this.inputTextUiX = new prop.InputTextUi(100, 30);
            this.inputTextUiY = new prop.InputTextUi(100, 30);
            this.inputTextUiZ = new prop.InputTextUi(100, 30);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.propPanle.addBaseMeshUi(this.textX);
            this.propPanle.addBaseMeshUi(this.textY);
            this.propPanle.addBaseMeshUi(this.textZ);
            this.propPanle.addBaseMeshUi(this.inputTextUiX);
            this.propPanle.addBaseMeshUi(this.inputTextUiY);
            this.propPanle.addBaseMeshUi(this.inputTextUiZ);
            this.inputTextUiX.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.inputTextUiXchange, this);
            this.inputTextUiY.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.inputTextUiYchange, this);
            this.inputTextUiZ.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.inputTextUiZchange, this);
            this.height = 30;
        };
        Vec3dCtrlUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.inputTextUiX.destory();
            this.inputTextUiY.destory();
            this.inputTextUiZ.destory();
            this.textX.destory();
            this.textY.destory();
            this.textZ.destory();
        };
        Object.defineProperty(Vec3dCtrlUI.prototype, "visible", {
            set: function (value) {
                this.inputTextUiX.visible = value;
                this.inputTextUiY.visible = value;
                this.inputTextUiZ.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3dCtrlUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this._v3d = this._data;
            },
            enumerable: true,
            configurable: true
        });
        Vec3dCtrlUI.prototype.inputTextUiXchange = function ($evt) {
            this._v3d.x = Number($evt.data);
            this.changeV3d();
        };
        Vec3dCtrlUI.prototype.inputTextUiYchange = function ($evt) {
            this._v3d.y = Number($evt.data);
            this.changeV3d();
        };
        Vec3dCtrlUI.prototype.inputTextUiZchange = function ($evt) {
            this._v3d.z = Number($evt.data);
            this.changeV3d();
        };
        Vec3dCtrlUI.prototype.changeV3d = function () {
            this.target[this.FunKey] = this._v3d;
            this.changFun && this.changFun(this);
            this.refreshViewValue();
        };
        Vec3dCtrlUI.prototype.colorPickUIchange = function ($evt) {
            var $vec = ($evt.data);
            this.target[this.FunKey] = $vec;
            this.changFun && this.changFun(this);
            this.refreshViewValue();
        };
        Vec3dCtrlUI.prototype.refreshViewValue = function () {
            this._v3d = this.target[this.FunKey];
            this.inputTextUiX.text = this.getNumStr(this._v3d.x);
            this.inputTextUiY.text = this.getNumStr(this._v3d.y);
            this.inputTextUiZ.text = this.getNumStr(this._v3d.z);
        };
        Vec3dCtrlUI.prototype.getNumStr = function (num) {
            var n = Math.floor(num * 100) / 100;
            return n.toString();
        };
        Object.defineProperty(Vec3dCtrlUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x - 0;
                this.textX.x = this._x + 55;
                this.textY.x = this._x + 125;
                this.textZ.x = this._x + 195;
                this.inputTextUiX.x = this._x + 85;
                this.inputTextUiY.x = this._x + 155;
                this.inputTextUiZ.x = this._x + 225;
            },
            enumerable: true,
            configurable: true
        });
        Vec3dCtrlUI.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.inputTextUiX.resize();
            this.inputTextUiY.resize();
            this.inputTextUiZ.resize();
        };
        Object.defineProperty(Vec3dCtrlUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value + 5;
                this.textLabelUI.y = this._y;
                this.textX.y = this._y;
                this.textY.y = this._y;
                this.textZ.y = this._y;
                this.inputTextUiX.y = this._y;
                this.inputTextUiY.y = this._y;
                this.inputTextUiZ.y = this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3dCtrlUI.prototype, "label", {
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
        return Vec3dCtrlUI;
    }(prop.BaseReflComponent));
    prop.Vec3dCtrlUI = Vec3dCtrlUI;
    var Vec3ColorCtrlUI = /** @class */ (function (_super) {
        __extends(Vec3ColorCtrlUI, _super);
        function Vec3ColorCtrlUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Vec3ColorCtrlUI.prototype, "x", {
            set: function (value) {
                this._x = value + 10;
                this.textLabelUI.x = this._x - 20;
                this.textX.x = this._x + 55;
                this.textY.x = this._x + 125;
                this.textZ.x = this._x + 195;
                this.inputTextUiX.x = this._x + 85;
                this.inputTextUiY.x = this._x + 155;
                this.inputTextUiZ.x = this._x + 225;
                this.colorPickUI.x = this._x + 37;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3ColorCtrlUI.prototype, "y", {
            set: function (value) {
                this._y = value + 5;
                this.textLabelUI.y = this._y;
                this.textX.y = this._y;
                this.textY.y = this._y;
                this.textZ.y = this._y;
                this.inputTextUiX.y = this._y;
                this.inputTextUiY.y = this._y;
                this.inputTextUiZ.y = this._y;
                this.colorPickUI.y = this._y + 2;
            },
            enumerable: true,
            configurable: true
        });
        Vec3ColorCtrlUI.prototype.refreshViewValue = function () {
            _super.prototype.refreshViewValue.call(this);
            this.colorPickUI.vec3d = this._v3d;
        };
        Vec3ColorCtrlUI.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.colorPickUI = new prop.ColorPickUI(12, 12);
            this.colorPickUI.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.colorPickUIchange, this);
            this.propPanle.addBaseMeshUi(this.colorPickUI);
        };
        Vec3ColorCtrlUI.prototype.destory = function () {
            _super.prototype.destory.call(this);
            this.colorPickUI.destory();
        };
        return Vec3ColorCtrlUI;
    }(Vec3dCtrlUI));
    prop.Vec3ColorCtrlUI = Vec3ColorCtrlUI;
})(prop || (prop = {}));
//# sourceMappingURL=Vec3ColorCtrlUI.js.map