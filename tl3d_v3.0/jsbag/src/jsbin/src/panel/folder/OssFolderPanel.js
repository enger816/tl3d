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
var ossfolder;
(function (ossfolder) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var Rectangle = Pan3d.Rectangle;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var MouseType = Pan3d.MouseType;
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var OssListFile = /** @class */ (function () {
        function OssListFile() {
        }
        return OssListFile;
    }());
    ossfolder.OssListFile = OssListFile;
    var FolderMeshVo = /** @class */ (function (_super) {
        __extends(FolderMeshVo, _super);
        function FolderMeshVo() {
            return _super.call(this) || this;
        }
        Object.defineProperty(FolderMeshVo.prototype, "name", {
            set: function (value) {
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        FolderMeshVo.prototype.destory = function () {
            this.pos = null;
            this.needDraw = null;
            this.clear = true;
        };
        return FolderMeshVo;
    }(Pan3d.baseMeshVo));
    ossfolder.FolderMeshVo = FolderMeshVo;
    var FolderName = /** @class */ (function (_super) {
        __extends(FolderName, _super);
        function FolderName() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FolderName.prototype.makeData = function () {
            this.folderMeshVo = this.rightTabInfoVo;
            if (this.folderMeshVo) {
                var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.baseFile.name, 18, 50, 5, TextAlign.LEFT);
                if (this.folderMeshVo.ossListFile.isOpen) {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanRight"], 2, 7, 14, 14);
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderOpen_dark"], 20, 2, 18 * 1.4, 16 * 1.4);
                }
                else {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanUp"], 3, 7, 14, 14);
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderClosed_dark"], 20, 2, 18 * 1.4, 16 * 1.4);
                }
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }
        };
        FolderName.prototype.update = function () {
            this.folderMeshVo = this.rightTabInfoVo;
            if (this.folderMeshVo) {
                if (this.folderMeshVo.needDraw) {
                    this.makeData();
                    this.folderMeshVo.needDraw = false;
                }
                if (this.folderMeshVo.pos) {
                    this.ui.x = this.folderMeshVo.pos.x;
                    this.ui.y = this.folderMeshVo.pos.y;
                    this.ui.width = this.ui.baseRec.width * this.folderMeshVo.uiScale;
                    this.ui.height = this.ui.baseRec.height * this.folderMeshVo.uiScale;
                }
                if (this.folderMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return FolderName;
    }(Disp2DBaseText));
    ossfolder.FolderName = FolderName;
    var OssFolderPanel = /** @class */ (function (_super) {
        __extends(OssFolderPanel, _super);
        function OssFolderPanel() {
            var _this = _super.call(this, FolderName, new Rectangle(0, 0, 256, 22), 5) || this;
            _this.folderCellHeight = 20;
            _this.left = 0;
            _this.pageRect = new Rectangle(0, 0, 200, 200);
            return _this;
        }
        OssFolderPanel.prototype.loadConfigCom = function () {
            var _this = this;
            _super.prototype.loadConfigCom.call(this);
            this._baseRender.mask = this._uiMask;
            this.loadAssetImg(function () {
                _this.makeItemUiList();
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.update(t); });
            });
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = function ($evt) { _this.onMouseWheel($evt); };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
        };
        OssFolderPanel.prototype.loadAssetImg = function (bfun) {
            OssFolderPanel.imgBaseDic = {};
            var item = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");
            var finishNum = 0;
            for (var i = 0; i < item.length; i++) {
                this.loadTempOne(item[i], function () {
                    finishNum++;
                    if (finishNum >= item.length) {
                        bfun();
                    }
                });
            }
        };
        OssFolderPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete) {
                var needScroll = this.contentHeight > this._uiMask.height;
                this.setUiListVisibleByItem([this.c_scroll_bar_bg], needScroll);
                if (needScroll) {
                    this._uiMask.width -= this.c_scroll_bar_bg.width;
                }
            }
        };
        OssFolderPanel.prototype.loadTempOne = function (name, bfun) {
            var tempImg = makeImage();
            OssFolderPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = function () {
                bfun();
            };
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png";
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png";
        };
        OssFolderPanel.prototype.update = function (t) {
            _super.prototype.update.call(this, t);
        };
        OssFolderPanel.prototype.fileOssFolderDic = function (value) {
            this.fileAndOpenDicByUrl(value, this.fileItem);
        };
        OssFolderPanel.prototype.fileAndOpenDicByUrl = function (value, arr) {
            var _this = this;
            for (var i = 0; arr && i < arr.length; i++) {
                var vo = arr[i];
                if (value.indexOf(vo.ossListFile.baseFile.path) != -1) {
                    console.log("找到文件目录", vo.ossListFile.baseFile.path);
                    if (!vo.ossListFile.isOpen) {
                        vo.ossListFile.isOpen = true;
                        if (vo.childItem) {
                            this.resetHideDic(vo.childItem);
                            this.refrishFolder();
                            this.fileAndOpenDicByUrl(value, vo.childItem);
                        }
                        else {
                            this.pushChidrenDic(vo, function () {
                                _this.refrishFolder();
                                _this.fileAndOpenDicByUrl(value, vo.childItem);
                            }); //显示mu
                        }
                    }
                    else {
                        this.fileAndOpenDicByUrl(value, vo.childItem);
                    }
                }
            }
        };
        OssFolderPanel.prototype.itemMouseUp = function (evt) {
            if (this.c_scroll_bar_bg.parent && evt.x > this.c_scroll_bar_bg.x) {
                console.log("在外面---");
                return;
            }
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.ui == evt.target) {
                    if ((evt.x - this.left) - $vo.ui.x < 20) {
                        $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                        if ($vo.folderMeshVo.ossListFile.isOpen) {
                            this.pushChidrenDic($vo.folderMeshVo);
                        }
                        else {
                            this.clearChildern($vo.folderMeshVo); //将要关闭
                        }
                    }
                    else {
                        if (!$vo.folderMeshVo.ossListFile.isOpen) {
                            this.pushChidrenDic($vo.folderMeshVo);
                        }
                        $vo.folderMeshVo.ossListFile.isOpen = true;
                        Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), $vo.folderMeshVo.ossListFile.baseFile.path);
                    }
                    $vo.folderMeshVo.needDraw = true;
                }
            }
            this.refrishFolder();
        };
        OssFolderPanel.prototype.resetHideDic = function (arr) {
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].clear = false;
                arr[i].pos = new Vector3D();
                this.showTemp(arr[i]);
                this.resetHideDic(arr[i].childItem);
            }
        };
        OssFolderPanel.prototype.pushChidrenDic = function (folderMeshVo, bfun) {
            var _this = this;
            if (folderMeshVo.childItem) {
                console.log("已经有了，直接显示就行");
                this.resetHideDic(folderMeshVo.childItem);
            }
            else {
                var pathurl = folderMeshVo.ossListFile.baseFile.path;
                pack.FileOssModel.getFolderArr(pathurl, function (value) {
                    if (!folderMeshVo.childItem) {
                        folderMeshVo.childItem = [];
                        for (var i = 0; value && i < value.length; i++) {
                            if (value[i].isFolder) {
                                var $vo = _this.getCharNameMeshVo(value[i]);
                                $vo.pos = new Vector3D(0, i * 15, 0);
                                folderMeshVo.childItem.push($vo);
                            }
                        }
                        _this.refrishFolder();
                        bfun && bfun();
                    }
                    else {
                        console.log("已获取过，注意可能是网络问题");
                    }
                });
            }
        };
        OssFolderPanel.prototype.clearChildern = function ($folderMeshVo) {
            if ($folderMeshVo.childItem) {
                for (var i = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo = $folderMeshVo.childItem[i];
                    $vo.destory();
                    this.clearChildern($vo);
                }
            }
        };
        OssFolderPanel.prototype.makeItemUiList = function () {
            var _this = this;
            this.fileItem = [];
            for (var i = 0; i < this._uiItem.length; i++) {
                //  this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            }
            //"upfile/shadertree/"
            //
            //Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            var rootDic = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.getFolderArr(rootDic, function (value) {
                for (var i = 0; i < value.length; i++) {
                    if (value[i].isFolder) {
                        var $vo = _this.getCharNameMeshVo(value[i]);
                        $vo.pos = new Vector3D(0, i * 15, 0);
                        _this.fileItem.push($vo);
                    }
                }
                _this.refrishFolder();
            });
        };
        OssFolderPanel.prototype.getCharNameMeshVo = function (value) {
            var $vo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.ossListFile.baseFile = value;
            var tmep = this.showTemp($vo);
            tmep.ui.removeEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            tmep.ui.addEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            return $vo;
        };
        OssFolderPanel.prototype.makeOtherRender = function () {
            var tempRender = new UIRenderComponent;
            console.log("添加新对象");
            tempRender.mask = this._uiMask;
            return tempRender;
        };
        OssFolderPanel.prototype.refrishFolder = function () {
            OssFolderPanel.listTy = this.moveListTy;
            var frist = OssFolderPanel.listTy;
            this.disChiendren(this.fileItem, 10);
            var moveTy = 0;
            this.moveAllTy(this.fileItem, moveTy);
            this.contentHeight = OssFolderPanel.listTy - frist;
            this.resize();
        };
        Object.defineProperty(OssFolderPanel.prototype, "isCanToDo", {
            get: function () {
                if (this && this.hasStage) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        OssFolderPanel.prototype.onMouseWheel = function ($evt) {
            if (!this.isCanToDo) {
                return;
            }
            if (this.pageRect.isHitByPoint($evt.x, $evt.y)) {
                if (this.contentHeight > this._uiMask.height) {
                    this.c_scroll_bar.y += $evt.deltaY / 30;
                    this.changeScrollBar();
                    this.resize();
                }
            }
        };
        OssFolderPanel.prototype.changeScrollBar = function () {
            _super.prototype.changeScrollBar.call(this);
            this.refrishFolder();
        };
        OssFolderPanel.prototype.moveAllTy = function (arr, ty) {
            if (ty === void 0) { ty = 0; }
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].pos.y += ty;
                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty);
                }
            }
        };
        OssFolderPanel.prototype.disChiendren = function (arr, tx) {
            if (tx === void 0) { tx = 0; }
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].pos.x = tx;
                arr[i].pos.y = OssFolderPanel.listTy;
                arr[i].uiScale = 0.7;
                OssFolderPanel.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx + 20);
                }
            }
        };
        OssFolderPanel.listTy = 0;
        return OssFolderPanel;
    }(win.Dis2dBaseWindow));
    ossfolder.OssFolderPanel = OssFolderPanel;
})(ossfolder || (ossfolder = {}));
//# sourceMappingURL=OssFolderPanel.js.map