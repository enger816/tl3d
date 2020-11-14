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
    var Material2DUI = /** @class */ (function (_super) {
        __extends(Material2DUI, _super);
        function Material2DUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Material2DUI.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.height = 300;
        };
        Material2DUI.prototype.destory = function () {
            _super.prototype.destory.call(this);
            if (this._materialTreeMc) {
                this._materialTreeMc.destory();
                this._materialTreeMc = null;
            }
        };
        Object.defineProperty(Material2DUI.prototype, "data", {
            set: function (value) {
                this._data = value;
                //  console.log("data", value)
            },
            enumerable: true,
            configurable: true
        });
        Material2DUI.prototype.refreshViewValue = function () {
            this.textureTree = this.target[this.FunKey];
            if (this.textureTree) {
                this.texturePicUi.url = this.textureTree.url;
                var $arr = this.textureTree.url.split("/");
                this.textureUrlText.label = $arr[$arr.length - 1];
                this.showMaterialParamUi();
            }
            else {
                this.texturePicUi.url = "icon/base.jpg";
                this.textureUrlText.label = "无材质";
            }
        };
        Material2DUI.prototype.paramChange = function (item) {
            this.changFun(item);
        };
        Material2DUI.prototype.showMaterialParamUi = function () {
            var _this = this;
            if (!this._materialTreeMc) {
                console.log(this.propPanle == prop.PropModel.getInstance().propPanle);
                this._materialTreeMc = new prop.MaterialParamUi(this.propPanle);
                this._materialTreeMc.changFun = function (value) { _this.paramChange(value); };
            }
            this.textureTree = this.target[this.FunKey];
            this._materialTreeMc.setData(this.makeTempInfo(this.textureTree));
            this._materialTreeMc.y = this._y + 100;
            this.height = 100 + this._materialTreeMc.height;
        };
        Material2DUI.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this._materialTreeMc) {
                this._materialTreeMc.resize();
                this._materialTreeMc.y = this._y + 100;
                this.height = 100 + this._materialTreeMc.height;
            }
        };
        Material2DUI.prototype.searchClik = function (evt) {
            console.log(this.textureTree.url);
            this.searchFileByPath(this.textureTree.url);
        };
        Material2DUI.prototype.makeTempInfo = function ($materialTree) {
            var item = [];
            for (var i = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic) {
                    var temp;
                    if ($materialTree.data[i].type == materialui.NodeTree.TEX) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.url;
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.VEC3) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue;
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.FLOAT) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue;
                    }
                    if (temp) {
                        temp.type = $materialTree.data[i].type;
                        temp.paramName = $materialTree.data[i].data.paramName;
                        var tempValue = this.target.getParamItem(temp.paramName); //如果有对象替换纹理中的
                        if (tempValue) {
                            temp.data = tempValue;
                        }
                        item.push(temp);
                    }
                }
            }
            return item;
        };
        return Material2DUI;
    }(prop.Texturue2DUI));
    prop.Material2DUI = Material2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=Material2DUI.js.map