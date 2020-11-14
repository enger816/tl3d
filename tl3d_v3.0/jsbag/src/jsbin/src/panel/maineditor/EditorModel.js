var maineditor;
(function (maineditor) {
    var EditorModel = /** @class */ (function () {
        function EditorModel() {
            this.selectItem = [];
            this.fileItem = [];
        }
        EditorModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new EditorModel();
            }
            return this._instance;
        };
        EditorModel.prototype.loadHideMixImg = function ($url, $fun) {
            var _this = this;
            var mixUrl = $url.replace(Pan3d.Scene_data.fileRoot, Pan3d.Scene_data.fileRoot + "hide_min_icon/");
            Pan3d.LoadManager.getInstance().load(mixUrl, Pan3d.LoadManager.IMG_TYPE, function ($img) {
                $fun($img);
            }, { errorFun: function () { _this.makeMixPicByUrl($url, mixUrl, $fun); } });
        };
        EditorModel.prototype.convertCanvasToImage = function (canvas) {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        };
        EditorModel.prototype.makeMixPicByUrl = function (baseUrl, toUrl, bfun) {
            var _this = this;
            console.log("没有小图，需要重置", baseUrl);
            Pan3d.LoadManager.getInstance().load(baseUrl, Pan3d.LoadManager.IMG_TYPE, function (downImg) {
                bfun(downImg);
                var ctx = Pan3d.UIManager.getInstance().getContext2D(128, 128, false);
                var rect = new Pan3d.Rectangle();
                rect.width = Math.min(128, downImg.width);
                rect.height = Math.min(128, downImg.height);
                rect.x = (128 - rect.width) / 2;
                rect.y = (128 - rect.height) / 2;
                ctx.drawImage(downImg, rect.x, rect.y, rect.width, rect.height);
                var imageData = ctx.getImageData(0, 0, 128, 128);
                var tempCanvas = document.createElement("CANVAS");
                tempCanvas.width = 128;
                tempCanvas.height = 128;
                tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
                var upImg = _this.convertCanvasToImage(tempCanvas);
                var $upfile = _this.dataURLtoFile(upImg.src, "333.jpg");
                toUrl = toUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile($upfile, toUrl, function (value) {
                    console.log("更新完成", toUrl);
                });
            });
        };
        EditorModel.prototype.dataURLtoFile = function (dataurl, filename) {
            var arr = dataurl.split(',');
            var mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        };
        EditorModel.prototype.openFileByUrl = function (fileUrl) {
            if (fileUrl.indexOf(".map") != -1) {
                Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), fileUrl); //加载场景
                Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
            }
            if (fileUrl.indexOf(".material") != -1) {
                Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
            }
        };
        EditorModel.prototype.addSelctItem = function (value, isShift) {
            if (isShift) {
                for (var i = 0; i < value.length; i++) {
                    if (this.selectItem.indexOf(value[i]) == -1) {
                        this.selectItem.push(value[i]);
                    }
                }
            }
            else {
                this.selectItem = value;
            }
        };
        EditorModel.prototype.keyDeleSelectItem = function () {
            if (this.selectItem.length) {
                var truthBeTold = window.confirm("是否确定要删除选取的对象。");
                if (truthBeTold) {
                    this.deleSelectItem();
                }
                else {
                }
            }
        };
        EditorModel.prototype.deleSelectItem = function () {
            while (this.selectItem.length) {
                var vo = this.selectItem.pop();
                this.hierarchyListPanel.deleFile(this.fileItem, vo);
            }
            Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA));
        };
        EditorModel.prototype.mouseHitSprite = function (item, mouseVect2d, selectArr) {
            var nearDis;
            var selectModel;
            for (var i = 0; i < item.length; i++) {
                var hit = xyz.TooMathHitModel.testHitModel(item[i].dis, item[i].dis._scene, mouseVect2d);
                if (hit != 0) {
                    if (!nearDis || hit < nearDis) {
                        nearDis = hit;
                        selectModel = item[i];
                    }
                }
            }
            if (selectModel) {
                console.log(nearDis);
                selectArr.push(selectModel);
                console.log("-----------------------");
            }
        };
        EditorModel.prototype.selectModel = function (mouseVect2d) {
            var tempItem = [];
            this.mouseHitSprite(this.fileItem, mouseVect2d, tempItem);
            return tempItem;
        };
        return EditorModel;
    }());
    maineditor.EditorModel = EditorModel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=EditorModel.js.map