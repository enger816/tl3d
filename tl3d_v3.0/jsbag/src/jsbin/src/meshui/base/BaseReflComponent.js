var prop;
(function (prop) {
    var TextureManager = Pan3d.TextureManager;
    var UIManager = Pan3d.UIManager;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var BaseReflComponent = /** @class */ (function () {
        function BaseReflComponent(value) {
            this._width = 1;
            this._height = 1;
            this._x = 0;
            this._y = 0;
            this.KeyStep = 1;
            this.propPanle = value;
            this.width = 100;
            this.height = 100;
            this.initView();
        }
        Object.defineProperty(BaseReflComponent.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseReflComponent.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseReflComponent.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseReflComponent.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseReflComponent.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseReflComponent.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseReflComponent.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        BaseReflComponent.prototype.setTarget = function (obj) {
            this.target = obj;
            this.refreshViewValue();
        };
        BaseReflComponent.prototype.refreshViewValue = function () {
        };
        BaseReflComponent.prototype.initView = function () {
        };
        BaseReflComponent.prototype.destory = function () {
        };
        BaseReflComponent.prototype.resize = function () {
        };
        BaseReflComponent.prototype.drawOutColor = function (ui, $vcolor) {
            var $UIAtlas = ui.uiRender.uiAtlas;
            var $textureStr = ui.skinName;
            var rec = $UIAtlas.getRec($textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0);
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        };
        BaseReflComponent.prototype.drawUrlImgToUi = function (ui, url) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + url, LoadManager.IMG_TYPE, function ($img) {
                _this.drawImgToUi(ui, $img);
            });
        };
        BaseReflComponent.prototype.drawImgToUi = function (ui, $img) {
            var $UIAtlas = ui.uiRender.uiAtlas;
            var $textureStr = ui.skinName;
            var rec = $UIAtlas.getRec($textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        };
        return BaseReflComponent;
    }());
    prop.BaseReflComponent = BaseReflComponent;
})(prop || (prop = {}));
//# sourceMappingURL=BaseReflComponent.js.map