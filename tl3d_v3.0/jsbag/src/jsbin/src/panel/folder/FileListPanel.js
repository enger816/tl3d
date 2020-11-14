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
var filelist;
(function (filelist) {
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var UIData = Pan3d.UIData;
    var Vector2D = Pan3d.Vector2D;
    var Vector3D = Pan3d.Vector3D;
    var Rectangle = Pan3d.Rectangle;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var TextureManager = Pan3d.TextureManager;
    var MouseType = Pan3d.MouseType;
    var DragSource = drag.DragSource;
    var DragManager = drag.DragManager;
    var FileVo = pack.FileVo;
    var MenuListData = menutwo.MenuListData;
    var SampleFileVo = /** @class */ (function () {
        function SampleFileVo() {
        }
        return SampleFileVo;
    }());
    filelist.SampleFileVo = SampleFileVo;
    var FileListMeshVo = /** @class */ (function (_super) {
        __extends(FileListMeshVo, _super);
        function FileListMeshVo() {
            var _this = _super.call(this) || this;
            _this.cellHeightNum = 1;
            return _this;
        }
        Object.defineProperty(FileListMeshVo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        FileListMeshVo.prototype.destory = function () {
            this.pos = null;
            this._name = null;
            this.needDraw = null;
            this.clear = true;
        };
        return FileListMeshVo;
    }(Pan3d.baseMeshVo));
    filelist.FileListMeshVo = FileListMeshVo;
    var FileListName = /** @class */ (function (_super) {
        __extends(FileListName, _super);
        function FileListName() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastSelect = true;
            return _this;
        }
        FileListName.prototype.makeData = function () {
            var _this = this;
            this.fileListMeshVo = this.rightTabInfoVo;
            if (this.fileListMeshVo) {
                if (this.lastSelect == this.fileListMeshVo.fileXmlVo.data.select && this.lastName == this.fileListMeshVo.fileXmlVo.data.name) {
                    return;
                }
                this.lastSelect = this.fileListMeshVo.fileXmlVo.data.select;
                this.lastName = this.fileListMeshVo.fileXmlVo.data.name;
                var $color = "[9c9c9c]";
                if (this.fileListMeshVo.fileXmlVo.data.select) {
                    $color = "[ffffff]";
                }
                var fileVo = this.fileListMeshVo.fileXmlVo.data;
                this.parent.uiAtlas.clearCtxTextureBySkilname(this.textureStr);
                switch (fileVo.suffix) {
                    case FileVo.JPG:
                    case FileVo.PNG:
                        maineditor.EditorModel.getInstance().loadHideMixImg(Scene_data.ossRoot + fileVo.path, function ($img) {
                            _this.drawFileIconName($img, fileVo.name, $color);
                        });
                        break;
                    case FileVo.PREFAB:
                        this.drawFileIconName(FileListPanel.imgBaseDic["profeb_64x"], fileVo.name, $color);
                        break;
                    case FileVo.MATERIAL:
                        this.drawFileIconName(FileListPanel.imgBaseDic["marterial_64x"], fileVo.name, $color);
                        break;
                    case FileVo.TXT:
                        this.drawFileIconName(FileListPanel.imgBaseDic["txt_64x"], fileVo.name, $color);
                        break;
                    case FileVo.OBJS:
                        this.drawFileIconName(FileListPanel.imgBaseDic["objs_64x"], fileVo.name, $color);
                        break;
                    case FileVo.MAP:
                        this.drawFileIconName(FileListPanel.imgBaseDic["map_64x"], fileVo.name, $color);
                        break;
                    case FileVo.LYF:
                        this.drawFileIconName(FileListPanel.imgBaseDic["lyf_64x"], fileVo.name, $color);
                        break;
                    case FileVo.ZZW:
                        this.drawFileIconName(FileListPanel.imgBaseDic["zzw_64x"], fileVo.name, $color);
                        break;
                    case FileVo.MD5ANIM:
                        this.drawFileIconName(FileListPanel.imgBaseDic["md5anim_64x"], fileVo.name, $color);
                        break;
                    case FileVo.MD5MESH:
                        this.drawFileIconName(FileListPanel.imgBaseDic["md5mesh_64x"], fileVo.name, $color);
                        break;
                    case FileVo.SKILL:
                        this.drawFileIconName(FileListPanel.imgBaseDic["skill_64x"], fileVo.name, $color);
                        break;
                    default:
                        this.drawFileIconName(FileListPanel.imgBaseDic["icon_Folder_64x"], fileVo.name, $color);
                        break;
                }
            }
        };
        FileListName.prototype.tempDown = function ($img, name, $color) {
            var _this = this;
            var sceneRes = new inputres.SceneRes();
            sceneRes.bfun = function () {
                var imgUrl = "working/scene007/scene007_hide/lightuv/build2.jpg";
                var tbaimg = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + imgUrl);
                if (tbaimg) { //新加的图
                    console.log(tbaimg);
                    _this.drawFileIconName(tbaimg, name, $color);
                }
            };
            Pan3d.LoadManager.getInstance().load(Scene_data.fileRoot + "pan/expmapinfo.txt", LoadManager.BYTE_TYPE, function ($byte) {
                sceneRes.loadComplete($byte);
            });
        };
        FileListName.prototype.drawFileIconName = function ($img, name, $color) {
            var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
            this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
            this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
            // var $textMetrics: TextMetrics = Pan3d.TextRegExp.getTextMetrics(this.parent.uiAtlas.ctx, outStr);
            var outStr = name.split(".")[0];
            var $textMetrics = editscene.ChangeNameModel.getInstance().getTextMetrics(outStr, 14);
            var twoLine = false;
            if ($textMetrics.width > 70) {
                twoLine = true;
            }
            if (this.fileListMeshVo.fileXmlVo.data.select) {
                this.parent.uiAtlas.ctx.fillStyle = "rgba(255,255,255,0.1)";
                ; // text color
                if (twoLine) {
                    this.parent.uiAtlas.ctx.fillRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight - 3);
                }
                else {
                    this.parent.uiAtlas.ctx.fillRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight - 10);
                }
            }
            var drawPicRect = new Rectangle(18, 1, 64, 64);
            var tw = drawPicRect.width;
            var th = drawPicRect.height;
            if ($img.width) {
                tw = Math.max($img.width * 1.5, 20);
                th = Math.max($img.heigh * 1.5, 20);
                tw = Math.min($img.width * 1.5, drawPicRect.width);
                th = Math.min($img.height * 1.5, drawPicRect.height);
            }
            this.parent.uiAtlas.ctx.drawImage($img, drawPicRect.x + (drawPicRect.width - tw) / 2, drawPicRect.y + (drawPicRect.height - th) / 2, tw, th);
            if (twoLine) {
                var inset = Math.floor(outStr.length * (2 / 5));
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substr(0, inset), 15, 0 - 2, 60, TextAlign.CENTER);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substring(inset, outStr.length), 15, 0 - 2, 78, TextAlign.CENTER);
            }
            else {
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr, 18, 0, 65, TextAlign.CENTER);
            }
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
        };
        FileListName.prototype.update = function () {
            this.fileListMeshVo = this.rightTabInfoVo;
            if (this.fileListMeshVo) {
                if (this.fileListMeshVo.needDraw) {
                    this.makeData();
                    this.fileListMeshVo.needDraw = false;
                }
                if (this.fileListMeshVo.pos) {
                    this.ui.x = this.fileListMeshVo.pos.x;
                    this.ui.y = this.fileListMeshVo.pos.y;
                    this.ui.width = this.ui.baseRec.width * this.fileListMeshVo.uiScale;
                    this.ui.height = this.ui.baseRec.height * this.fileListMeshVo.uiScale;
                }
                if (this.fileListMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return FileListName;
    }(Disp2DBaseText));
    filelist.FileListName = FileListName;
    var PathurlRect = /** @class */ (function (_super) {
        __extends(PathurlRect, _super);
        function PathurlRect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PathurlRect;
    }(Rectangle));
    filelist.PathurlRect = PathurlRect;
    var PathurlLabel = /** @class */ (function (_super) {
        __extends(PathurlLabel, _super);
        function PathurlLabel() {
            var _this = _super.call(this, 512, 22) || this;
            _this.label = "目录/文件夹";
            _this.ui.addEventListener(InteractiveEvent.Down, _this.pathurlLabelDown, _this);
            _this.ui.addEventListener(InteractiveEvent.Move, _this.pathurlLabelMove, _this);
            return _this;
        }
        PathurlLabel.prototype.pathurlLabelMove = function ($evt) {
            //  console.log("pathurlLabelMove")
        };
        PathurlLabel.prototype.pathurlLabelDown = function ($evt) {
            //console.log("pathurlLabelDown", this.areaRectItem)
            var tempMouse = new Vector2D($evt.x - this.textureContext.left, $evt.y - this.textureContext.top);
            tempMouse.x /= this.textureContext.uiViewScale;
            tempMouse.y /= this.textureContext.uiViewScale; //UI已被放大
            for (var i = 0; i < this.areaRectItem.length; i++) {
                var tempRect = this.areaRectItem[i];
                if (tempRect.isHitByPoint(tempMouse.x, tempMouse.y)) {
                    var pathUrl = tempRect.pathurl.replace(Pan3d.Scene_data.ossRoot, "");
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathUrl);
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_OSS_FOLDER_FILE), pathUrl);
                }
            }
        };
        Object.defineProperty(PathurlLabel.prototype, "label", {
            set: function (value) {
                LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 26, TextAlign.LEFT, "#ffffff", "#27262e", 5);
            },
            enumerable: true,
            configurable: true
        });
        PathurlLabel.prototype.setPath = function (value) {
            this.areaRectItem = [];
            var $uiAtlas = this.ui.uiRender.uiAtlas;
            var $uiRect = $uiAtlas.getRec(this.ui.skinName);
            var $ctx = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $ctx.fillStyle = "#ffffff";
            $ctx.font = +26 + "px " + UIData.font;
            $ctx.strokeStyle = "#27262e";
            $ctx.lineWidth = 4;
            var tempArr = value.split("/");
            var tx = 20;
            var tempSaveName = "";
            for (var i = 0; i < tempArr.length; i++) {
                var tempStr = tempArr[i];
                if (tempStr && tempStr.length) {
                    $ctx.fillText(tempStr, tx, 0);
                    tempSaveName += tempStr + "/";
                    var tempRect = new PathurlRect(tx, 0, $ctx.measureText(tempStr).width, 22);
                    tempRect.pathurl = tempSaveName;
                    this.areaRectItem.push(tempRect);
                    tx += $ctx.measureText(tempStr).width;
                    $ctx.fillText(" / ", tx, 0);
                    tx += 30;
                }
            }
            $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        };
        return PathurlLabel;
    }(prop.TextLabelUI));
    filelist.PathurlLabel = PathurlLabel;
    var FileListPanel = /** @class */ (function (_super) {
        __extends(FileListPanel, _super);
        function FileListPanel() {
            var _this = _super.call(this, FileListName, new Rectangle(0, 0, 100, 100), 48) || this;
            _this.timeOutMakeDragFun = function () { _this.makeDragData(); };
            return _this;
        }
        FileListPanel.prototype.loadConfigCom = function () {
            var _this = this;
            _super.prototype.loadConfigCom.call(this);
            this._baseRender.mask = this._uiMask;
            this.pathlistBg = this.addChild(this._baseTopRender.getComponent("a_round_line"));
            this.pathlistBg.x = 0;
            this.pathlistBg.y = -20;
            this.pathlistBg.width = 100;
            this.pathlistBg.height = 20;
            this.pathurlLabel = new PathurlLabel();
            this.addRender(this.pathurlLabel.ui.uiRender);
            this.setUiListVisibleByItem([this.c_scroll_bar_bg], true);
            this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.loadAssetImg(function () {
                _this.makeItemUiList();
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.update(t); });
            });
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = function ($evt) { _this.onMouseWheel($evt); };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            this.resize();
        };
        FileListPanel.prototype.onMouseWheel = function ($evt) {
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
        Object.defineProperty(FileListPanel.prototype, "isCanToDo", {
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
        FileListPanel.prototype.resize = function () {
            this.resetSampleFilePos();
            if (this.uiLoadComplete) {
                this.contentHeight = this.getcontentHeight();
                if (this.pathlistBg) {
                    this.pathlistBg.width = this.pageRect.width;
                }
                if (this.pathurlLabel) {
                    this.pathurlLabel.textureContext.resize();
                    this.pathurlLabel.textureContext.left = this.left + 20;
                    this.pathurlLabel.textureContext.top = this.top - 22;
                }
            }
            _super.prototype.resize.call(this);
        };
        FileListPanel.prototype.loadAssetImg = function (bfun) {
            FileListPanel.imgBaseDic = {};
            var item = [];
            item.push("icon_Folder_64x");
            item.push("profeb_64x");
            item.push("marterial_64x");
            item.push("txt_64x");
            item.push("objs_64x");
            item.push("lyf_64x");
            item.push("zzw_64x");
            item.push("map_64x");
            item.push("skill_64x");
            item.push("md5anim_64x");
            item.push("md5mesh_64x");
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
        FileListPanel.prototype.loadTempOne = function (name, bfun) {
            var tempImg = makeImage();
            FileListPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = function () {
                bfun();
            };
            tempImg.url = Scene_data.fileuiRoot + "ui/icon/" + name + ".png";
            tempImg.src = Scene_data.fileuiRoot + "ui/icon/" + name + ".png";
        };
        FileListPanel.prototype.update = function (t) {
            _super.prototype.update.call(this, t);
        };
        FileListPanel.prototype.fileMouseDown = function (evt) {
            if (this._lastfileDonwInfo && this._lastfileDonwInfo.target == evt.target) {
                if (this._lastfileDonwInfo.tm > (Pan3d.TimeUtil.getTimer() - 1000) && this._lastfileDonwInfo.x == evt.x && this._lastfileDonwInfo.y == evt.y) {
                    this.fileDuboclik(evt);
                    return;
                }
            }
            this._lastfileDonwInfo = { x: evt.x, y: evt.y, target: evt.target, tm: Pan3d.TimeUtil.getTimer() };
            this.lastDragEvent = evt;
            Pan3d.TimeUtil.addTimeOut(100, this.timeOutMakeDragFun);
        };
        FileListPanel.prototype.makeDragData = function () {
            var vo = this.getItemVoByUi(this.lastDragEvent.target);
            if (vo) {
                var fileUrl = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                var dsragSource = new DragSource();
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                    dsragSource.icon = "icon/icon_Folder_64x.png";
                }
                else {
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case FileVo.MATERIAL:
                            dsragSource.icon = "icon/marterial_64x.png";
                            break;
                        case "jpg":
                        case "png":
                            dsragSource.icon = "icon/profeb_64x.png";
                            break;
                        case "objs":
                            dsragSource.icon = "icon/objs_64x.png";
                            break;
                        default:
                            dsragSource.icon = "icon/objs_64x.png";
                            break;
                    }
                }
                dsragSource.url = fileUrl;
                dsragSource.type = "file";
                DragManager.doDragdoDrag(this, dsragSource);
            }
        };
        FileListPanel.prototype.fileDuboclik = function (evt) {
            var vo = this.getItemVoByUi(evt.target);
            if (vo) {
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                    this.refrishPath(vo.fileListMeshVo.fileXmlVo.data.path);
                }
                else {
                    var fileUrl = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                    fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                    maineditor.EditorModel.getInstance().openFileByUrl(fileUrl);
                    //switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                    //    case FileVo.MATERIAL:
                    //        Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
                    //        break
                    //    case FileVo.MAP:
                    //        Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), fileUrl); //加载场景
                    //        break;
                    //    default:
                    //        break;
                    //}
                }
            }
        };
        FileListPanel.prototype.selectFileClik = function (evt) {
            var vo = this.getItemVoByUi(evt.target);
            if (vo) {
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                }
                else {
                    var fileUrl = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                    fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case FileVo.PREFAB:
                            pack.PackPrefabManager.getInstance().getPrefabByUrl(fileUrl, function (value) {
                                var tempview = new filelist.PrefabMeshView(prop.PropModel.getInstance().propPanle);
                                tempview.data = value;
                                prop.PropModel.getInstance().showOtherMeshView(tempview);
                            });
                            break;
                        case FileVo.ZZW:
                            pack.PackRoleManager.getInstance().getRoleZzwByUrl(fileUrl, function (value) {
                                var tempRoleView = new filelist.RoleMeshView(prop.PropModel.getInstance().propPanle);
                                tempRoleView.data = value;
                                prop.PropModel.getInstance().showOtherMeshView(tempRoleView);
                            });
                            break;
                        case FileVo.SKILL:
                            pack.PackSkillManager.getInstance().getPrefabByUrl(fileUrl, function (value) {
                                var tempSkilView = new filelist.SkillMeshView(prop.PropModel.getInstance().propPanle);
                                tempSkilView.data = value;
                                prop.PropModel.getInstance().showOtherMeshView(tempSkilView);
                            });
                            break;
                        case FileVo.LYF:
                            var tempFileMView = new filelist.FileMeshView(prop.PropModel.getInstance().propPanle);
                            tempFileMView.data = fileUrl;
                            prop.PropModel.getInstance().showOtherMeshView(tempFileMView);
                            break;
                        case FileVo.LYF:
                        case FileVo.OBJS:
                            var tempFileMView = new filelist.FileMeshView(prop.PropModel.getInstance().propPanle);
                            tempFileMView.data = fileUrl;
                            prop.PropModel.getInstance().showOtherMeshView(tempFileMView);
                            break;
                        default:
                            console.log("还没有的类型", vo.fileListMeshVo.fileXmlVo.data.path);
                            break;
                    }
                }
            }
        };
        FileListPanel.prototype.fileMouseUp = function (evt) {
            Pan3d.TimeUtil.removeTimeOut(this.timeOutMakeDragFun);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
            this.selectFileIcon(evt);
        };
        FileListPanel.prototype.selectFileIcon = function (evt) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.ui == evt.target) {
                        $vo.fileListMeshVo.fileXmlVo.data.select = true;
                    }
                    else {
                        $vo.fileListMeshVo.fileXmlVo.data.select = false;
                    }
                    $vo.fileListMeshVo.needDraw = true;
                }
            }
            this.selectFileClik(evt);
        };
        //移除不显示的对象
        FileListPanel.prototype.clearListAll = function () {
            while (this.fileItem.length) {
                var vo = this.fileItem.pop();
                vo.destory();
            }
        };
        FileListPanel.prototype.refrishPath = function (filePath) {
            var _this = this;
            console.log("刷新目录", filePath);
            this.pathurlLabel.setPath(filePath);
            AppData.rootFilePath = AppData.getPerentPath(filePath);
            this.moveListTy = 0;
            this.clearListAll();
            pack.FileOssModel.getFolderArr(AppData.rootFilePath, function (value) {
                for (var i = 0; i < value.length; i++) {
                    var sampleFile = new SampleFileVo;
                    sampleFile.id = i;
                    sampleFile.data = value[i];
                    if (sampleFile.data.path == filePath) {
                        sampleFile.data.select = true;
                    }
                    var $vo = _this.getCharNameMeshVo(sampleFile);
                    $vo.pos = new Vector3D(i * 64, 40, 0);
                    _this.fileItem.push($vo);
                }
                _this.resize();
            });
        };
        FileListPanel.prototype.addRender = function ($uiRender) {
            _super.prototype.addRender.call(this, $uiRender);
            //这里的监听和之前有冲突之前添加过的 需要优化，暂时没问题
            for (var i = 0; this._uiItem && i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.fileMouseDown, this);
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.fileMouseUp, this);
            }
        };
        FileListPanel.prototype.getItemVoByUi = function (ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.ui == ui) {
                    return $vo;
                }
            }
            return null;
        };
        FileListPanel.prototype.makeItemUiList = function () {
            var _this = this;
            this.fileItem = [];
            for (var i = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.fileMouseDown, this);
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.fileMouseUp, this);
            }
            var rootDic = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            this.refrishPath(rootDic);
            if (!this.onRightMenuFun) {
                this.onRightMenuFun = function ($evt) { _this.onRightMenu($evt); };
            }
            document.addEventListener("contextmenu", this.onRightMenuFun);
        };
        FileListPanel.prototype.onRightMenu = function ($evt) {
            $evt.preventDefault();
            var $slectUi = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi) {
                if ($slectUi.parent instanceof FileListPanel) {
                    var vo = this.getItemVoByUi($slectUi);
                    if (vo) {
                        //在当前文件上
                        this.makeFileFloadMenu($evt);
                        return;
                    }
                }
            }
            //范围其它区域
            if (this.pageRect.isHitByPoint($evt.x, $evt.y)) {
                this.makeFileListMenu($evt);
            }
        };
        FileListPanel.prototype.makeFileFloadMenu = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY);
            var menuA = new Array();
            menuA.push(new MenuListData("删除文件", "21"));
            menuA.push(new MenuListData("重命名", "22"));
            menuA.push(new MenuListData("下载文件", "23"));
            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        FileListPanel.prototype.makeFileListMenu = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            var menuB = new Array();
            menuB.push(new MenuListData("上传文件", "1"));
            menuB.push(new MenuListData("创建文件夹", "2"));
            menuB.push(new MenuListData("创建Texture", "3"));
            menuB.push(new MenuListData("创建prefab", "4"));
            menuB.push(new MenuListData("刷新", "5"));
            temp.mouse = new Vector2D($evt.clientX, Math.min($evt.clientY, Scene_data.stageHeight - menuB.length * 20));
            temp.menuXmlItem = menuB;
            temp.info = {};
            temp.info.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        FileListPanel.prototype.menuBfun = function (value, evt) {
            switch (value.key) {
                case "1":
                    this.upTempFileToOss();
                    break;
                case "3":
                    this.creatTexture();
                    break;
                case "4":
                    this.creatPefab();
                    break;
                case "5":
                    this.refrishIndexGroup(AppData.rootFilePath);
                    break;
                case "21":
                    this.deleFile();
                    break;
                case "22":
                    this.changeFileName();
                    break;
                case "23":
                    this.downFile();
                    break;
                default:
                    console.log("没处理对象", value.key);
                    break;
            }
        };
        FileListPanel.prototype.downFile = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {
                        var basePath = $vo.fileListMeshVo.fileXmlVo.data.path;
                        window.open(Scene_data.ossRoot + basePath);
                    }
                }
            }
        };
        FileListPanel.prototype.changeFileName = function () {
            var _this = this;
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {
                        var rect = new Rectangle();
                        rect.x = $vo.ui.x + this.left;
                        rect.y = $vo.ui.y + this.top;
                        rect.x += 5;
                        rect.y += 45;
                        rect.width = 60;
                        rect.height = 20;
                        var nameStr = $vo.fileListMeshVo.fileXmlVo.data.name;
                        var receet = editscene.ChangeNameModel.getInstance().getTextMetrics(nameStr, 14);
                        rect.width = receet.width + 20;
                        var basePath = $vo.fileListMeshVo.fileXmlVo.data.path;
                        editscene.ChangeNameModel.getInstance().changeName(rect, nameStr, function (value) {
                            if (value.length) {
                                console.log("准备修改名字");
                                var toPath = basePath.substr(0, basePath.lastIndexOf("/") + 1);
                                toPath = toPath + value;
                                console.log(basePath);
                                console.log(toPath);
                                pack.FileOssModel.copyFile(toPath, basePath, function () {
                                    pack.FileOssModel.deleFile(basePath, function () {
                                        _this.refrishIndexGroup(AppData.rootFilePath);
                                    });
                                });
                            }
                        });
                    }
                }
            }
        };
        FileListPanel.prototype.creatTexture = function () {
            var _this = this;
            //复制文件
            var baseTextureUrl = "baseedit/assets/base/base.material";
            var pathurl = AppData.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.copyFile(pathurl + "base.material", baseTextureUrl, function () {
                _this.refrishIndexGroup(AppData.rootFilePath);
            });
        };
        FileListPanel.prototype.refrishIndexGroup = function (url) {
            var _this = this;
            pack.FileOssModel.getDisByOss(url, function (value) {
                _this.refrishPath(url);
            });
        };
        FileListPanel.prototype.creatPefab = function () {
            var _this = this;
            //复制文件
            var basePrefabUrl = "baseedit/assets/base/base.prefab";
            var pathurl = AppData.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.copyFile(pathurl + "base.prefab", basePrefabUrl, function () {
                _this.refrishIndexGroup(AppData.rootFilePath);
            });
        };
        FileListPanel.prototype.deleFile = function () {
            var _this = this;
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {
                        var truthBeTold = window.confirm("是否确定要删除选取的对象。");
                        if (truthBeTold) {
                            pack.FileOssModel.deleFile($vo.fileListMeshVo.fileXmlVo.data.path, function () {
                                _this.refrishIndexGroup(AppData.rootFilePath);
                                console.log("删除成功");
                            });
                        }
                        else {
                        }
                    }
                }
            }
        };
        FileListPanel.prototype.upTempFileToOss = function () {
            var _this = this;
            this._inputHtmlSprite = document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", function (cevt) { _this.changeFile(cevt); });
        };
        FileListPanel.prototype.changeFile = function (evt) {
            var _this = this;
            for (var i = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i];
                console.log(simpleFile);
                console.log(AppData.rootFilePath);
                var pathurl = AppData.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
                console.log(pathurl + simpleFile.name);
                pack.FileOssModel.upOssFile(simpleFile, pathurl + simpleFile.name, function () {
                    console.log("文件上传成功");
                    pack.FileOssModel.getDisByOss(pathurl, function () {
                        _this.refrishPath(AppData.rootFilePath);
                    });
                });
            }
            this._inputHtmlSprite = null;
        };
        FileListPanel.prototype.resetSampleFilePos = function () {
            var w = Math.round((this.pageRect.width - 50) / 100);
            var moveTy = this.moveListTy + 10;
            for (var i = 0; this.fileItem && i < this.fileItem.length; i++) {
                var vo = this.fileItem[i];
                vo.uiScale = 0.7;
                vo.pos.x = i % w * 100 + 10;
                vo.pos.y = Math.floor(i / w) * 70 + moveTy;
            }
        };
        FileListPanel.prototype.getcontentHeight = function () {
            if (this.uiLoadComplete && this.fileItem) {
                var w = Math.round((this.pageRect.width - 50) / 100);
                return Math.round(this.fileItem.length / w) * 70;
            }
            else {
                return 0;
            }
        };
        FileListPanel.prototype.getCharNameMeshVo = function (value) {
            var $vo = new FileListMeshVo;
            $vo.fileXmlVo = value;
            this.showTemp($vo);
            return $vo;
        };
        return FileListPanel;
    }(win.Dis2dBaseWindow));
    filelist.FileListPanel = FileListPanel;
})(filelist || (filelist = {}));
//# sourceMappingURL=FileListPanel.js.map