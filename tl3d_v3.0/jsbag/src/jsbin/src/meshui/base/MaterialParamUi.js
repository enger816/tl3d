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
    var MaterialParamUi = /** @class */ (function (_super) {
        __extends(MaterialParamUi, _super);
        function MaterialParamUi() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialParamUi.prototype.initView = function () {
            this.height = 100;
            this.uiItem = [];
        };
        MaterialParamUi.prototype.setData = function (item) {
            var _this = this;
            this.destory();
            var $changFun = function (value) { _this.changeDataEvtFun(value); };
            for (var i = 0; i < item.length; i++) {
                var tempBaseReflComponent;
                if (item[i].type == materialui.NodeTree.TEX) {
                    var texturue2DUI = new prop.Texturue2DUI(this.propPanle);
                    texturue2DUI.suffix = "jpg|png";
                    tempBaseReflComponent = texturue2DUI;
                }
                if (item[i].type == materialui.NodeTree.VEC3) {
                    tempBaseReflComponent = new prop.Vec3ColorCtrlUI(this.propPanle);
                    tempBaseReflComponent.KeyStep = 0.01;
                    if (isNaN(item[i].data.x) || isNaN(item[i].data.y) || isNaN(item[i].data.z)) {
                        item[i].data = new Vector3D();
                    }
                }
                if (item[i].type == materialui.NodeTree.VEC2) {
                    tempBaseReflComponent = new prop.Vec2PrameCtrlUI(this.propPanle);
                    tempBaseReflComponent.KeyStep = 0.01;
                    if (isNaN(item[i].data.x) || isNaN(item[i].data.y)) {
                        item[i].data = new Vector2D();
                    }
                }
                if (item[i].type == materialui.NodeTree.FLOAT) {
                    tempBaseReflComponent = new prop.TextCtrlInput(this.propPanle);
                    if (isNaN(item[i].data)) {
                        item[i].data = 1;
                    }
                }
                if (tempBaseReflComponent) {
                    tempBaseReflComponent.FunKey = "data";
                    tempBaseReflComponent.target = item[i];
                    tempBaseReflComponent.label = item[i].paramName;
                    tempBaseReflComponent.changFun = $changFun;
                    this.uiItem.push(tempBaseReflComponent);
                }
            }
            this.refreshViewValue();
        };
        MaterialParamUi.prototype.changeDataEvtFun = function (temp) {
            var infoArr = [];
            for (var i = 0; i < this.uiItem.length; i++) {
                infoArr.push(this.uiItem[i].target);
            }
            this.changFun(infoArr);
        };
        MaterialParamUi.prototype.refreshViewValue = function () {
            for (var i = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].refreshViewValue();
            }
        };
        MaterialParamUi.prototype.destory = function () {
            for (var i = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].destory();
            }
            this.uiItem = [];
        };
        MaterialParamUi.prototype.resize = function () {
            _super.prototype.resize.call(this);
            for (var i = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].resize();
            }
        };
        Object.defineProperty(MaterialParamUi.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialParamUi.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialParamUi.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                var ty = 10;
                this.height = 50;
                for (var i = 0; i < this.uiItem.length; i++) {
                    this.uiItem[i].y = this.y + ty;
                    if (this.uiItem[i] instanceof prop.Vec3ColorCtrlUI) {
                        ty += 50;
                        this.uiItem[i].x = 50;
                        this.height += 50;
                    }
                    if (this.uiItem[i] instanceof prop.Vec2PrameCtrlUI) {
                        ty += 50;
                        this.uiItem[i].x = 50;
                        this.height += 50;
                    }
                    if (this.uiItem[i] instanceof prop.TextCtrlInput) {
                        ty += 50;
                        this.uiItem[i].x = 50;
                        this.height += 50;
                    }
                    if (this.uiItem[i] instanceof prop.Texturue2DUI) {
                        ty += 100;
                        this.uiItem[i].x = 50;
                        this.height += 100;
                    }
                }
                this.height += 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialParamUi.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
            },
            enumerable: true,
            configurable: true
        });
        return MaterialParamUi;
    }(prop.BaseReflComponent));
    prop.MaterialParamUi = MaterialParamUi;
})(prop || (prop = {}));
//# sourceMappingURL=MaterialParamUi.js.map