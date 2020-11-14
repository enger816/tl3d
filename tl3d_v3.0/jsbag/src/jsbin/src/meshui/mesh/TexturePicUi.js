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
    var TextureManager = Pan3d.TextureManager;
    var TimeUtil = Pan3d.TimeUtil;
    var UIManager = Pan3d.UIManager;
    var Scene_data = Pan3d.Scene_data;
    var TexturePicUi = /** @class */ (function (_super) {
        __extends(TexturePicUi, _super);
        function TexturePicUi(w, h) {
            if (w === void 0) { w = 64; }
            if (h === void 0) { h = 64; }
            var _this = _super.call(this, w, h) || this;
            _this.$dulbelClikTm = 0;
            _this.haveDoubleCilk = true;
            _this.initView();
            _this.resize();
            return _this;
        }
        TexturePicUi.prototype.initView = function () {
            this.addEvets();
        };
        TexturePicUi.prototype.addEvets = function () {
            _super.prototype.addEvets.call(this);
            var $ui = this.ui;
            $ui.addEventListener(drag.PanDragEvent.DRAG_DROP, this.dragDrop, this);
            $ui.addEventListener(drag.PanDragEvent.DRAG_ENTER, this.dragEnter, this);
        };
        TexturePicUi.prototype.dragDrop = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动");
            }
            else {
                console.log("不可以");
            }
        };
        TexturePicUi.prototype.dragEnter = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                this.url = drag.DragManager.dragSource.url;
                this.dispatchEvent(new prop.ReflectionEvet(prop.ReflectionEvet.CHANGE_DATA));
            }
        };
        TexturePicUi.prototype.butClik = function (evt) {
            if (TimeUtil.getTimer() < this.$dulbelClikTm) {
                if (this._url && this._url.indexOf(".material") != -1) {
                    var fileUrl = this._url;
                    Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
                }
                else {
                    if (this.haveDoubleCilk) {
                        console.log("选文件");
                        this.doubleClick();
                    }
                    else {
                        console.log("关闭了选取事件");
                    }
                }
            }
            this.$dulbelClikTm = TimeUtil.getTimer() + 1000;
        };
        TexturePicUi.prototype.doubleClick = function () {
            var _this = this;
            this._inputHtmlSprite = document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", function (cevt) { _this.changeFile(cevt); });
        };
        TexturePicUi.prototype.testSuffix = function (value) {
            if (!this.suffix) {
                return;
            }
            var tempItem = this.suffix.split("|");
            for (var i = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i]) != -1) {
                    return true;
                }
            }
            return false;
        };
        TexturePicUi.prototype.changeFile = function (evt) {
            for (var i = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i];
                //if (!/image\/\w+/.test(simpleFile.type)) {
                //    alert("请确保文件类型为图像类型");
                //}
                console.log(this.testSuffix(simpleFile.name));
                if (this.testSuffix(simpleFile.name)) {
                    var $reflectionEvet = new prop.ReflectionEvet(prop.ReflectionEvet.CHANGE_DATA);
                    $reflectionEvet.data = simpleFile;
                    this.dispatchEvent($reflectionEvet);
                }
                else {
                    alert("请确保文件类型 " + this.suffix);
                }
            }
            this._inputHtmlSprite = null;
        };
        Object.defineProperty(TexturePicUi.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                this._url = value;
                if (!this._url) {
                    this._url = "";
                }
                var picUrl = this._url;
                if (this._url.indexOf(".material") != -1) {
                    picUrl = "icon/marterial_64x.png";
                }
                if (this._url.indexOf(".objs") != -1) {
                    picUrl = "icon/objs_64x.png";
                }
                if (this._url.indexOf(".md5anim") != -1) {
                    picUrl = "icon/txt_64x.png";
                }
                if (this._url.indexOf(".txt") != -1) {
                    picUrl = "icon/txt_64x.png";
                }
                if (this._url.indexOf(".zzw") != -1) {
                    picUrl = "icon/zzw_64x.png";
                }
                if (this._url.indexOf(".md5mesh") != -1) {
                    picUrl = "icon/txt_64x.png";
                }
                var $img = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + picUrl);
                var $uiRender = this.textureContext.ui.uiRender;
                if ($img) {
                    var rec = $uiRender.uiAtlas.getRec(this.textureContext.ui.skinName);
                    $uiRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    $uiRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    TextureManager.getInstance().updateTexture($uiRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $uiRender.uiAtlas.ctx);
                }
                else {
                    this.textureContext.ui.uiRender.uiAtlas.upDataPicToTexture(picUrl, this.textureContext.ui.skinName);
                }
            },
            enumerable: true,
            configurable: true
        });
        return TexturePicUi;
    }(prop.BaseMeshUi));
    prop.TexturePicUi = TexturePicUi;
})(prop || (prop = {}));
//# sourceMappingURL=TexturePicUi.js.map