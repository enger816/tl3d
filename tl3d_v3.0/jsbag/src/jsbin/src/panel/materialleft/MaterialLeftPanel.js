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
var materialleft;
(function (materialleft) {
    var ByteArray = Pan3d.Pan3dByteArray;
    var ModelShowModel = left.ModelShowModel;
    var MaterialLeftPanel = /** @class */ (function (_super) {
        __extends(MaterialLeftPanel, _super);
        function MaterialLeftPanel() {
            var _this = _super.call(this) || this;
            _this.only = true; //标记需要移除
            _this.addPojectView();
            _this.initView();
            return _this;
        }
        MaterialLeftPanel.prototype.addPojectView = function () {
            this.propPanle = new prop.UiMeshSprite();
            this.materiaMeshView = new materialleft.MateriaMeshView(this.propPanle);
            this.propPanle.addMeshView(this.materiaMeshView);
        };
        Object.defineProperty(MaterialLeftPanel.prototype, "materialTree", {
            set: function (value) {
                var _this = this;
                this._materialTree = value;
                this.materiaMeshView.data = this._materialTree;
                if (this._materialTree.laterTextureurl && !this._materialTree.laterTexture) {
                    pack.PackMaterialManager.getInstance().getMaterialByUrl(this._materialTree.laterTextureurl, function ($laterTexture) {
                        _this._materialTree.laterTexture = $laterTexture;
                        _this.materiaMeshView.data = _this._materialTree;
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        MaterialLeftPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.setUiListVisibleByItem([this.e_panel_1], true);
        };
        MaterialLeftPanel.prototype.butClik = function (evt) {
            if (evt.target == this.b_win_close) {
                this.perent.removeUIContainer(this);
            }
        };
        MaterialLeftPanel.prototype.initView = function () {
            ModelShowModel.getInstance().addBaseModel();
            this.resize();
        };
        MaterialLeftPanel.prototype.resize = function () {
            var panel = this.perent;
            if (panel) {
                this.pageRect.x = panel.x;
                this.pageRect.y = panel.y;
                this.pageRect.width = panel.width;
                this.pageRect.height = panel.height;
            }
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete) {
                this.propPanle.resize();
            }
        };
        MaterialLeftPanel.prototype.selectInputDae = function (evt) {
            var _this = this;
            this._inputHtmlSprite = document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", function (cevt) { _this.changeFile(cevt); });
        };
        MaterialLeftPanel.prototype.changeFile = function (evt) {
            var _this = this;
            for (var i = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i];
                if (!/image\/\w+/.test(simpleFile.type)) {
                    var $reader = new FileReader();
                    if (simpleFile.name.indexOf(".md5mesh") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = function ($temp) {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalMeshByStr($reader.result);
                        };
                        return;
                    }
                    if (simpleFile.name.indexOf(".md5anim") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = function ($temp) {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalAdimByStr($reader.result);
                            ModelShowModel.getInstance().changeWebModel();
                        };
                        return;
                    }
                    if (simpleFile.name.indexOf("objs.txt") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = function ($temp) {
                            ModelShowModel.getInstance().readTxtToModelBy($reader.result);
                        };
                    }
                    else {
                        // alert("objs.txt结尾对象0" + simpleFile.name);
                        $reader.readAsArrayBuffer(simpleFile);
                        $reader.onload = function ($temp) {
                            if (_this.isRoleFile($reader.result)) {
                                console.log("是角色", simpleFile.name);
                                pack.RoleChangeModel.getInstance().loadLocalFile($reader.result, null);
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 1000;
                            }
                            else {
                                alert("不确定类型");
                            }
                        };
                    }
                }
                else {
                    alert("请确保文件类型为图像类型");
                }
            }
            this._inputHtmlSprite = null;
        };
        MaterialLeftPanel.prototype.isRoleFile = function (arrayBuffer) {
            var $byte = new ByteArray(arrayBuffer);
            $byte.position = 0;
            var $version = $byte.readInt();
            var $url = $byte.readUTF();
            if ($url.indexOf("role/") != -1) {
                return true;
            }
            else {
                return false;
            }
        };
        return MaterialLeftPanel;
    }(win.BaseWindow));
    materialleft.MaterialLeftPanel = MaterialLeftPanel;
})(materialleft || (materialleft = {}));
//# sourceMappingURL=MaterialLeftPanel.js.map