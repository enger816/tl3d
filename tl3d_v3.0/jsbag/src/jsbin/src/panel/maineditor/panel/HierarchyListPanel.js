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
var maineditor;
(function (maineditor) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var Rectangle = Pan3d.Rectangle;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var MouseType = Pan3d.MouseType;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var LoadManager = Pan3d.LoadManager;
    var KeyboardType = Pan3d.KeyboardType;
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var BaseEvent = Pan3d.BaseEvent;
    var CombineReflectionView = prop.CombineReflectionView;
    var TooXyzPosData = xyz.TooXyzPosData;
    var MenuListData = menutwo.MenuListData;
    var TestDiplay3dShader = /** @class */ (function (_super) {
        __extends(TestDiplay3dShader, _super);
        function TestDiplay3dShader() {
            return _super.call(this) || this;
        }
        TestDiplay3dShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        TestDiplay3dShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = vpMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        TestDiplay3dShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        TestDiplay3dShader.TestDiplay3dShader = "TestDiplay3dShader";
        return TestDiplay3dShader;
    }(Shader3D));
    maineditor.TestDiplay3dShader = TestDiplay3dShader;
    var ModelSprite = /** @class */ (function (_super) {
        __extends(ModelSprite, _super);
        function ModelSprite() {
            return _super.call(this) || this;
        }
        ModelSprite.prototype.update = function () {
            var showTempModel = false;
            if (showTempModel) {
                this.drawBaseModel();
            }
            else {
                _super.prototype.update.call(this);
            }
        };
        ModelSprite.prototype.drawBaseModel = function () {
            if (this.objData) {
                if (!this.baseModeShader) {
                    ProgrmaManager.getInstance().registe(TestDiplay3dShader.TestDiplay3dShader, new TestDiplay3dShader);
                    this.baseModeShader = ProgrmaManager.getInstance().getProgram(TestDiplay3dShader.TestDiplay3dShader);
                    var $ctx = UIManager.getInstance().getContext2D(128, 128, false);
                    $ctx.fillStyle = "rgb(255,255,255)";
                    $ctx.fillRect(0, 0, 128, 128);
                    this.baseTextureres = TextureManager.getInstance().getCanvasTexture($ctx);
                }
                Scene_data.context3D.setProgram(this.baseModeShader.program);
                Scene_data.context3D.setVpMatrix(this.baseModeShader, Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.baseModeShader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setRenderTexture(this.baseModeShader, "s_texture", this.baseTextureres.texture, 0);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        Object.defineProperty(ModelSprite.prototype, "prefab", {
            get: function () {
                return this._prefab;
            },
            set: function (value) {
                this._prefab = value;
                this._prefab.addEventListener(BaseEvent.COMPLETE, this.meshParamInfo, this);
                this.meshParamInfo();
            },
            enumerable: true,
            configurable: true
        });
        ModelSprite.prototype.meshParamInfo = function () {
            var _this = this;
            if (this._prefab.objsurl) {
                pack.PackObjDataManager.getInstance().getObjDataByUrl(this._prefab.objsurl, function (value) {
                    _this._prefab.objData = value;
                    _this.objData = value;
                });
            }
            if (this._prefab.textureurl) {
                pack.PackMaterialManager.getInstance().getMaterialByUrl(this._prefab.textureurl, function ($materialTree) {
                    _this._prefab.material = $materialTree;
                    _this.material = $materialTree;
                });
            }
            if (this.material) {
                if (this._prefab.paramInfo) {
                    this.materialParam = new Pan3d.MaterialBaseParam;
                    this.materialParam.material = this.material;
                    pack.PackPrefabManager.getInstance().makeMaterialBaseParam(this.materialParam, this._prefab.paramInfo);
                }
            }
        };
        ModelSprite.prototype.setPreFabUrl = function (url, bfun) {
            var _this = this;
            pack.PackPrefabManager.getInstance().getPrefabByUrl(url, function (value) {
                _this.prefab = value;
                bfun && bfun();
            });
        };
        return ModelSprite;
    }(left.MaterialModelSprite));
    maineditor.ModelSprite = ModelSprite;
    var OssListFile = /** @class */ (function (_super) {
        __extends(OssListFile, _super);
        function OssListFile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OssListFile;
    }(maineditor.HierarchyFileNode));
    maineditor.OssListFile = OssListFile;
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
            this.needDraw = null;
            this.clear = true;
        };
        return FolderMeshVo;
    }(Pan3d.baseMeshVo));
    maineditor.FolderMeshVo = FolderMeshVo;
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
                // this.parent.uiAtlas.ctx.fillStyle = "#3c3c3c"; // text color
                // this.parent.uiAtlas.ctx.fillRect(1, 1, $uiRec.pixelWitdh-2, $uiRec.pixelHeight-2);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.name, 24, 70, 10, TextAlign.LEFT);
                var uiScaleVo = 2;
                if (this.folderMeshVo.ossListFile.children || this.folderMeshVo.ossListFile.type == maineditor.HierarchyNodeType.Folder) {
                    if (this.folderMeshVo.ossListFile.isOpen) {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanRight"], 2, 5, 20, 20);
                    }
                    else {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanUp"], 3, 5, 20, 20);
                    }
                }
                switch (this.folderMeshVo.ossListFile.type) {
                    case maineditor.HierarchyNodeType.Prefab:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["profeb_16"], 30, 5, 26, 32);
                        break;
                    case maineditor.HierarchyNodeType.Role:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["zzw_16x"], 30, 5, 26, 32);
                        break;
                    case maineditor.HierarchyNodeType.SKILL:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["skill_16x"], 30, 5, 26, 32);
                        break;
                    case maineditor.HierarchyNodeType.Light:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_point16"], 30, 5, 26, 32);
                        break;
                    case maineditor.HierarchyNodeType.Particle:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["particle_16x"], 30, 5, 26, 32);
                        break;
                    case maineditor.HierarchyNodeType.Folder:
                        if (this.folderMeshVo.ossListFile.isOpen) {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderOpen_dark"], 15, 2, 18, 16);
                        }
                        else {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderClosed_dark"], 15, 2, 18, 16);
                        }
                        break;
                    default:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["water_plane16"], 15, 2, 18, 16);
                        break;
                }
                //icon_point16
                //profeb_16
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
                if (this.folderMeshVo.cellPos) {
                    this.ui.x = this.folderMeshVo.cellPos.x;
                    this.ui.y = this.folderMeshVo.cellPos.y;
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
    maineditor.FolderName = FolderName;
    var HierarchyListPanel = /** @class */ (function (_super) {
        __extends(HierarchyListPanel, _super);
        function HierarchyListPanel() {
            var _this = _super.call(this, FolderName, new Rectangle(0, 0, 400, 40), 20) || this;
            _this.only = true; //标记需要移除
            _this.cellBgItem = [];
            _this.left = 0;
            _this.pageRect = new Rectangle(0, 0, 200, 200);
            maineditor.EditorModel.getInstance().hierarchyListPanel = _this;
            _this.maskRoundRect = new Rectangle(0, 13, 0, 14);
            return _this;
        }
        HierarchyListPanel.prototype.makeOtherRender = function () {
            var tempRender = new UIRenderComponent;
            console.log("添加新对象");
            tempRender.mask = this._uiMask;
            return tempRender;
        };
        HierarchyListPanel.prototype.loadConfigCom = function () {
            var _this = this;
            _super.prototype.loadConfigCom.call(this);
            this.setUiListVisibleByItem([this.c_scroll_bar_bg], true);
            this.setUiListVisibleByItem([this.c_win_bg], false);
            this.setUiListVisibleByItem([this.e_panel_1], true);
            this.resize();
            this.loadAssetImg(function () {
                _this.makeItemUiList();
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.update(t); });
                //  console.log("图片加载完")
            });
        };
        Object.defineProperty(HierarchyListPanel.prototype, "isCanToDo", {
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
        HierarchyListPanel.prototype.onMouseWheel = function ($evt) {
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
        HierarchyListPanel.prototype.loadAssetImg = function (bfun) {
            HierarchyListPanel.imgBaseDic = {};
            var item = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");
            item.push("profeb_16");
            item.push("icon_point16");
            item.push("water_plane16");
            item.push("particle_16x");
            item.push("zzw_16x");
            item.push("skill_16x");
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
        HierarchyListPanel.prototype.loadTempOne = function (name, bfun) {
            var tempImg = makeImage();
            HierarchyListPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = function () {
                bfun();
            };
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png";
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png";
        };
        HierarchyListPanel.prototype.update = function (t) {
            _super.prototype.update.call(this, t);
        };
        HierarchyListPanel.prototype.changeFileName = function ($vo) {
            if ($vo.folderMeshVo && $vo.ui) {
                var name = $vo.folderMeshVo.ossListFile.name;
                var rect = new Rectangle();
                rect.x = $vo.ui.x + this.left;
                rect.y = $vo.ui.y + this.top;
                rect.x += 30;
                rect.y += 0;
                rect.width = name.length * 8;
                rect.height = 20;
                var receet = editscene.ChangeNameModel.getInstance().getTextMetrics(name, 14);
                rect.width = receet.width + 20;
                editscene.ChangeNameModel.getInstance().changeName(rect, name, function (value) {
                    $vo.folderMeshVo.ossListFile.name = value;
                    $vo.makeData();
                    console.log($vo);
                });
            }
        };
        HierarchyListPanel.prototype.makeFileFloadMenu = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY);
            var menuA = new Array();
            menuA.push(new MenuListData("删除文件", "1"));
            menuA.push(new MenuListData("重命名", "2"));
            menuA.push(new MenuListData("查找文件", "3"));
            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        HierarchyListPanel.prototype.menuBfun = function (value, evt) {
            switch (value.key) {
                case "1":
                    if (this.selectFolderMeshVo) {
                        this.deleFile(maineditor.EditorModel.getInstance().fileItem, this.selectFolderMeshVo.folderMeshVo);
                        Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA));
                        this.refrishFolder();
                    }
                    break;
                case "2":
                    this.changeFileName(this.selectFolderMeshVo);
                    break;
                case "3":
                    var pathurl = Pan3d.Scene_data.fileRoot + this.selectFolderMeshVo.folderMeshVo.ossListFile.url;
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""));
                    break;
                default:
                    break;
            }
        };
        HierarchyListPanel.prototype.deleFile = function (item, vo) {
            var idx = item.indexOf(vo);
            if (idx == -1) {
                console.log("没找到需要到子目录找");
            }
            else {
                item.splice(idx, 1);
                switch (vo.ossListFile.type) {
                    case maineditor.HierarchyNodeType.Prefab:
                        maineditor.MainEditorProcessor.edItorSceneManager.removeDisplay(vo.dis);
                        break;
                    case maineditor.HierarchyNodeType.Particle:
                        maineditor.MainEditorProcessor.edItorSceneManager.removeDisplay(vo.dis);
                        break;
                    case maineditor.HierarchyNodeType.Role:
                        maineditor.MainEditorProcessor.edItorSceneManager.removeMovieDisplay((vo.dis));
                        break;
                    default:
                        break;
                }
                this.clearTemp(vo);
            }
            this.refrishFolder();
        };
        HierarchyListPanel.prototype.itemMouseUp = function (evt) {
            var $clikVo;
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.ui == evt.target) {
                    $clikVo = $vo;
                    if ((evt.x - this.left) - $vo.ui.x < 20) {
                        $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                        if ($vo.folderMeshVo.ossListFile.isOpen) {
                        }
                        else {
                            this.clearChildern($vo.folderMeshVo); //将要关闭
                        }
                    }
                    $vo.folderMeshVo.needDraw = true;
                }
            }
            if ($clikVo) {
                this.hidefileItemBg(maineditor.EditorModel.getInstance().fileItem);
                $clikVo.folderMeshVo.ossListFile.treeSelect = true;
                maineditor.EditorModel.getInstance().selectItem = [$clikVo.folderMeshVo];
                this.showXyzMove();
            }
            this.refrishFolder();
            this.resize();
        };
        HierarchyListPanel.prototype.showMeshView = function (value, $vo) {
            var propanle = prop.PropModel.getInstance().propPanle;
            var _combineReflectionView = new CombineReflectionView(propanle);
            var A = new maineditor.PropertyMeshView(propanle);
            A.data = value;
            _combineReflectionView.addView(A);
            switch ($vo.ossListFile.type) {
                case maineditor.HierarchyNodeType.Prefab:
                    if ($vo.dis.prefab) {
                        var B = new filelist.PrefabMeshView(propanle);
                        B.data = $vo.dis.prefab;
                        _combineReflectionView.addView(B);
                    }
                    else {
                        console.log("还没准备好");
                    }
                    break;
                case maineditor.HierarchyNodeType.Role:
                    console.log($vo.dis.roleStaticMesh);
                    if ($vo.dis.roleStaticMesh) {
                        var C = new filelist.RoleMeshView(propanle);
                        C.data = $vo.dis.roleStaticMesh;
                        _combineReflectionView.addView(C);
                    }
                    else {
                        console.log("还没准备好");
                    }
                    break;
                case maineditor.HierarchyNodeType.SKILL:
                    if ($vo.dis.skillStaticMesh) {
                        var D = new filelist.SkillMeshView(propanle);
                        D.data = $vo.dis.skillStaticMesh;
                        _combineReflectionView.addView(D);
                    }
                    else {
                        console.log("还没准备好");
                    }
                    break;
                case maineditor.HierarchyNodeType.Particle:
                    if ($vo.dis) {
                        var E = new filelist.FileMeshView(propanle);
                        E.data = $vo.ossListFile.url;
                        _combineReflectionView.addView(E);
                    }
                    else {
                        console.log("还没准备好");
                    }
                    break;
                default:
                    break;
            }
            _combineReflectionView.type = "物件";
            prop.PropModel.getInstance().showOtherMeshView(_combineReflectionView);
        };
        HierarchyListPanel.prototype.showXyzMove = function () {
            var disItem = [];
            var selctprefab;
            for (var i = 0; i < maineditor.EditorModel.getInstance().selectItem.length; i++) {
                var vo = maineditor.EditorModel.getInstance().selectItem[i];
                vo.ossListFile.treeSelect = true;
                disItem.push(vo.dis);
                selctprefab = vo;
            }
            var data = TooXyzPosData.getBase(disItem);
            this.showMeshView(data, selctprefab);
            Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE), data);
        };
        HierarchyListPanel.prototype.hidefileItemBg = function (arr) {
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].ossListFile.treeSelect = false;
                this.hidefileItemBg(arr[i].childItem);
            }
        };
        HierarchyListPanel.prototype.clearChildern = function ($folderMeshVo) {
            if ($folderMeshVo.childItem) {
                for (var i = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo = $folderMeshVo.childItem[i];
                    $vo.cellPos.x = -1000;
                    this.clearChildern($vo);
                }
            }
        };
        HierarchyListPanel.prototype.makeItemUiList = function () {
            var _this = this;
            this._baseRender.mask = this._uiMask;
            if (!this.onRightMenuFun) {
                this.onRightMenuFun = function ($evt) { _this.onRightMenu($evt); };
            }
            document.addEventListener("contextmenu", this.onRightMenuFun);
            if (!this.onKeyDownFun) {
                this.onKeyDownFun = function ($evt) { _this.onKeyDown($evt); };
            }
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun);
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = function ($evt) { _this.onMouseWheel($evt); };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            this.loadBaseSceneUrl();
        };
        HierarchyListPanel.prototype.onKeyDown = function ($evt) {
            if (maineditor.EditorModel.getInstance().selectItem && maineditor.EditorModel.getInstance().selectItem.length == 1) {
                var selectVo = maineditor.EditorModel.getInstance().selectItem[0];
                var idex = maineditor.EditorModel.getInstance().fileItem.indexOf(selectVo);
                if ($evt.ctrlKey) {
                    switch ($evt.keyCode) {
                        case KeyboardType.Up:
                            if (idex > 0) {
                                maineditor.EditorModel.getInstance().fileItem.splice(idex, 1);
                                maineditor.EditorModel.getInstance().fileItem.splice(idex - 1, 0, selectVo);
                            }
                            console.log("向上");
                            break;
                        case KeyboardType.Down:
                            if (idex < maineditor.EditorModel.getInstance().fileItem.length - 2) {
                                maineditor.EditorModel.getInstance().fileItem.splice(idex, 1);
                                maineditor.EditorModel.getInstance().fileItem.splice(idex + 1, 0, selectVo);
                            }
                            console.log("向下");
                            break;
                    }
                }
                this.refrishFolder();
            }
        };
        HierarchyListPanel.prototype.addRender = function ($uiRender) {
            _super.prototype.addRender.call(this, $uiRender);
            //这里的监听和之前有冲突之前添加过的 需要优化，暂时没问题
            for (var i = 0; this._uiItem && i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.itemMouseUp, this);
            }
        };
        HierarchyListPanel.prototype.loadBaseSceneUrl = function () {
            ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.EDITE_SCENE_UI_LOAD_COMPLETE));
        };
        HierarchyListPanel.prototype.onRightMenu = function ($evt) {
            $evt.preventDefault();
            var $slectUi = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi) {
                if ($slectUi.parent instanceof HierarchyListPanel) {
                    var vo = this.getItemVoByUi($slectUi);
                    if (vo) {
                        this.selectFolderMeshVo = vo;
                        this.makeFileFloadMenu($evt);
                    }
                }
            }
        };
        HierarchyListPanel.prototype.getItemVoByUi = function (ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].ui == ui) {
                    return this._uiItem[i];
                }
            }
            return null;
        };
        HierarchyListPanel.prototype.wirteItem = function (childItem) {
            var $item = new Array;
            for (var i = 0; childItem && i < childItem.length; i++) {
                var $vo = new FolderMeshVo;
                $vo.ossListFile = new OssListFile;
                $vo.ossListFile.name = childItem[i].name;
                $vo.ossListFile.url = childItem[i].url;
                $vo.ossListFile.type = childItem[i].type;
                $vo.ossListFile.treeSelect = childItem[i].treeSelect;
                ;
                $vo.cellPos = new Vector2D();
                this.showTemp($vo);
                switch ($vo.ossListFile.type) {
                    case maineditor.HierarchyNodeType.Prefab:
                        var prefabSprite = new ModelSprite();
                        prefabSprite.setPreFabUrl(childItem[i].url);
                        $vo.dis = prefabSprite;
                        maineditor.MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
                        break;
                    case maineditor.HierarchyNodeType.Particle:
                        var lyfSprite = new maineditor.LyfSpriteDisplay();
                        lyfSprite.addLyfByUrl(childItem[i].url);
                        $vo.dis = lyfSprite;
                        maineditor.MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
                        break;
                    case maineditor.HierarchyNodeType.Role:
                        var roleSprite = new left.MaterialRoleSprite();
                        roleSprite.setRoleZwwUrl(childItem[i].url);
                        $vo.dis = roleSprite;
                        maineditor.MainEditorProcessor.edItorSceneManager.addMovieDisplay(roleSprite);
                        break;
                    case maineditor.HierarchyNodeType.SKILL:
                        var skillsprite = new maineditor.SkillSpriteDisplay();
                        skillsprite.addSkillByUrl(childItem[i].url);
                        $vo.dis = skillsprite;
                        maineditor.MainEditorProcessor.edItorSceneManager.addDisplay(skillsprite);
                        break;
                    default:
                        break;
                }
                $vo.dis.x = childItem[i].x;
                $vo.dis.y = childItem[i].y;
                $vo.dis.z = childItem[i].z;
                $vo.dis.scaleX = childItem[i].scaleX;
                $vo.dis.scaleY = childItem[i].scaleY;
                $vo.dis.scaleZ = childItem[i].scaleZ;
                $vo.dis.rotationX = childItem[i].rotationX;
                $vo.dis.rotationY = childItem[i].rotationY;
                $vo.dis.rotationZ = childItem[i].rotationZ;
                $vo.childItem = this.wirteItem(childItem[i].children);
                $item.push($vo);
            }
            return $item;
        };
        HierarchyListPanel.prototype.inputZzwToScene = function (temp) {
            var role = new left.MaterialRoleSprite();
            role.setRoleZwwUrl(temp.url);
            maineditor.MainEditorProcessor.edItorSceneManager.addMovieDisplay(role);
            //  pack.RoleChangeModel.getInstance().changeRoleModel(temp.url, role)
            var $vo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = role;
            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = maineditor.HierarchyNodeType.Role;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();
            this.showTemp($vo);
            maineditor.EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize();
        };
        HierarchyListPanel.prototype.inputLyfToScene = function (temp) {
            var lyfSprite = new maineditor.LyfSpriteDisplay();
            lyfSprite.addLyfByUrl(temp.url);
            maineditor.MainEditorProcessor.edItorSceneManager.addDisplay(lyfSprite);
            var $vo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = lyfSprite;
            maineditor.MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = maineditor.HierarchyNodeType.Particle;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();
            this.showTemp($vo);
            maineditor.EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize();
        };
        HierarchyListPanel.prototype.inputSkillToScene = function (temp) {
            var skillSprite = new maineditor.SkillSpriteDisplay();
            skillSprite.addSkillByUrl(temp.url);
            maineditor.MainEditorProcessor.edItorSceneManager.addDisplay(skillSprite);
            var $vo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = skillSprite;
            maineditor.MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = maineditor.HierarchyNodeType.SKILL;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();
            this.showTemp($vo);
            maineditor.EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize();
        };
        HierarchyListPanel.prototype.inputPrefabToScene = function (temp) {
            var $url = temp.url;
            var $vo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            var $mode = new ModelSprite();
            $mode.setPreFabUrl($url);
            $vo.dis = $mode;
            if (temp.scale) {
                $vo.dis.x = temp.pos.x;
                $vo.dis.y = temp.pos.y;
                $vo.dis.z = temp.pos.z;
            }
            if (temp.scale) {
                $vo.dis.scaleX = temp.scale.x;
                $vo.dis.scaleY = temp.scale.y;
                $vo.dis.scaleZ = temp.scale.z;
            }
            if (temp.rotation) {
                $vo.dis.rotationX = temp.rotation.x;
                $vo.dis.rotationY = temp.rotation.y;
                $vo.dis.rotationZ = temp.rotation.z;
            }
            maineditor.MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = maineditor.HierarchyNodeType.Prefab;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();
            this.showTemp($vo);
            maineditor.EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize();
        };
        HierarchyListPanel.prototype.makeModelSprite = function (dis, prefab) {
            LoadManager.getInstance().load(Scene_data.fileRoot + prefab.objsurl, LoadManager.XML_TYPE, function ($modelxml) {
                dis.readTxtToModel($modelxml);
            });
            pack.PackMaterialManager.getInstance().getMaterialByUrl(prefab.textureurl, function ($materialTree) {
                dis.material = $materialTree;
            });
        };
        HierarchyListPanel.prototype.clearSceneAll = function () {
            this.moveListTy = 0;
            while (maineditor.EditorModel.getInstance().fileItem.length) {
                this.deleFile(maineditor.EditorModel.getInstance().fileItem, maineditor.EditorModel.getInstance().fileItem[0]);
            }
        };
        HierarchyListPanel.prototype.readMapFile = function (mapUrl) {
            var _this = this;
            AppData.mapOpenUrl = mapUrl;
            localStorage.setItem("mapurl", mapUrl);
            this.clearSceneAll();
            LoadManager.getInstance().load(Scene_data.fileRoot + mapUrl, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                var $fileObj = JSON.parse($byte.readUTF());
                _this._sceneProjectVo = new maineditor.SceneProjectVo($fileObj);
                var $item = _this.wirteItem($fileObj.list);
                for (var i = 0; i < $item.length; i++) {
                    maineditor.EditorModel.getInstance().fileItem.push($item[i]);
                }
                _this.isCompelet = true;
                _this.refrishFolder();
                _this.resize();
                ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW), _this._sceneProjectVo);
                //  this.addTempRole();
                //  this.addBasrole()
            });
        };
        HierarchyListPanel.prototype.addBasrole = function () {
            var webmd5Sprite = new md5list.Md5MoveSprite();
            webmd5Sprite.setMd5url("2/body.md5mesh", "2/stand.md5anim", "white.jpg");
            maineditor.MainEditorProcessor.edItorSceneManager.addSpriteDisplay(webmd5Sprite);
            console.log(webmd5Sprite);
        };
        HierarchyListPanel.prototype.selectModelEvet = function (tempItem, isshift) {
            if (isshift === void 0) { isshift = false; }
            if (tempItem.length) {
                this.hidefileItemBg(maineditor.EditorModel.getInstance().fileItem);
                maineditor.EditorModel.getInstance().addSelctItem(tempItem, isshift);
                this.showXyzMove();
                this.refrishFolder();
                this.resize();
            }
        };
        //  public mapOpenUrl: string
        HierarchyListPanel.prototype.saveMap = function () {
            // EditorModel.getInstance().fileItem=[]
            //  var tempObj: any = { list: this.getWillSaveItem(EditorModel.getInstance().fileItem) };
            var tempObj = this._sceneProjectVo.getSaveObj();
            tempObj.list = this.getWillSaveItem(maineditor.EditorModel.getInstance().fileItem);
            tempObj.version = pack.FileOssModel.version;
            var $byte = new Pan3d.Pan3dByteArray();
            var $fileUrl = Pan3d.Scene_data.fileRoot + AppData.mapOpenUrl;
            $byte.writeUTF(JSON.stringify(tempObj));
            var $file = new File([$byte.buffer], "scene.map");
            var pathurl = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, pathurl, function () {
                console.log("上传完成");
            });
        };
        HierarchyListPanel.prototype.getWillSaveItem = function (item) {
            var $arr = [];
            for (var i = 0; i < item.length; i++) {
                var $obj = {};
                $obj.type = item[i].ossListFile.type;
                $obj.name = item[i].ossListFile.name;
                $obj.url = item[i].ossListFile.url;
                $obj.x = item[i].dis.x;
                $obj.y = item[i].dis.y;
                $obj.z = item[i].dis.z;
                $obj.scaleX = item[i].dis.scaleX;
                $obj.scaleY = item[i].dis.scaleY;
                $obj.scaleZ = item[i].dis.scaleZ;
                $obj.rotationX = item[i].dis.rotationX;
                $obj.rotationY = item[i].dis.rotationY;
                $obj.rotationZ = item[i].dis.rotationZ;
                $obj.data = item[i].ossListFile.name;
                if (item[i].childItem) {
                    $obj.childItem = this.getWillSaveItem(item[i].childItem);
                }
                $arr.push($obj);
            }
            if ($arr.length) {
                return $arr;
            }
            else {
                return null;
            }
        };
        HierarchyListPanel.prototype.changeScrollBar = function () {
            _super.prototype.changeScrollBar.call(this);
            this.refrishFolder();
        };
        HierarchyListPanel.prototype.resize = function () {
            if (this.isCompelet) {
                this.contentHeight = this.getItemDisNum(maineditor.EditorModel.getInstance().fileItem) * 20;
            }
            _super.prototype.resize.call(this);
            for (var i = 0; i < this.cellBgItem.length; i++) {
                this.cellBgItem[i].width = this.pageRect.width - 20;
            }
        };
        HierarchyListPanel.prototype.refrishFolder = function () {
            if (this.isCompelet) {
                this.listTy = 0 + this.moveListTy;
                this.disChiendren(maineditor.EditorModel.getInstance().fileItem, 10);
                var moveTy = this._uiMask.y;
                this.moveAllTy(maineditor.EditorModel.getInstance().fileItem, moveTy);
                while (this.cellBgItem.length) {
                    this.removeChild(this.cellBgItem.pop());
                }
                this.showSelectBg(maineditor.EditorModel.getInstance().fileItem);
            }
        };
        HierarchyListPanel.prototype.showSelectBg = function (arr) {
            for (var i = 0; arr && i < arr.length; i++) {
                if (arr[i].ossListFile.isOpen) {
                    this.showSelectBg(arr[i].childItem);
                }
                if (arr[i].ossListFile.treeSelect) {
                    var ui = this.addChild(this._baseMidRender.getComponent("e_select_cell_bg"));
                    ui.y = arr[i].cellPos.y;
                    ui.x = 1;
                    ui.width = this.pageRect.width - 2;
                    ui.height = 20;
                    this.cellBgItem.push(ui);
                }
            }
            //  this._baseMidRender.applyObjData()
        };
        HierarchyListPanel.prototype.moveAllTy = function (arr, ty) {
            if (ty === void 0) { ty = 0; }
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.y += ty;
                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty);
                }
            }
        };
        //获取显示数量
        HierarchyListPanel.prototype.getItemDisNum = function (arr) {
            var num = 0;
            for (var i = 0; arr && i < arr.length; i++) {
                num++;
                if (arr[i].ossListFile.isOpen) {
                    num += this.getItemDisNum(arr[i].childItem);
                }
            }
            return num;
        };
        HierarchyListPanel.prototype.disChiendren = function (arr, tx) {
            if (tx === void 0) { tx = 0; }
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.x = tx;
                arr[i].cellPos.y = this.listTy;
                arr[i].uiScale = 0.5;
                this.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx + 20);
                }
            }
        };
        return HierarchyListPanel;
    }(win.Dis2dBaseWindow));
    maineditor.HierarchyListPanel = HierarchyListPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=HierarchyListPanel.js.map