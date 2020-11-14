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
var editscene;
(function (editscene) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var TextureManager = Pan3d.TextureManager;
    var Rectangle = Pan3d.Rectangle;
    var UIAtlas = Pan3d.UIAtlas;
    var ByteArray = Pan3d.Pan3dByteArray;
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    var MenuListData = /** @class */ (function () {
        function MenuListData($label, $key) {
            if ($key === void 0) { $key = null; }
            this.select = false;
            this.label = $label;
            this.key = $key;
        }
        return MenuListData;
    }());
    editscene.MenuListData = MenuListData;
    var LabelTxtVo = /** @class */ (function (_super) {
        __extends(LabelTxtVo, _super);
        function LabelTxtVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.uiScale = 0.5;
            return _this;
        }
        LabelTxtVo.prototype.makeData = function () {
            if (this.rightTabInfoVo) {
                this.ui.width = this.ui.baseRec.width * this.uiScale;
                this.ui.height = this.ui.baseRec.height * this.uiScale;
                var $menuListData = this.rightTabInfoVo;
                var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                var colorFont = $menuListData.select ? "[ffffff]" : "[9c9c9c]";
                var tx;
                switch ($menuListData.level) {
                    case 0:
                        if ($menuListData.select) {
                            this.drawToUiAtlasToCtx(this.parent.uiAtlas.ctx, LabelTxtVo.shareUiAtlas, MenuListData.showSon ? "S_menu_down_bg" : "S_menu_bg", new Rectangle(0, 0, $uiRec.pixelWitdh + 1, $uiRec.pixelHeight + 1));
                        }
                        colorFont = $menuListData.select ? "#ffffff" : "#ffffff";
                        tx = 40;
                        break;
                    case 1:
                        colorFont = $menuListData.select ? "#ffffff" : "#000000";
                        var colorBg = $menuListData.select ? "#000000" : "#ffffff";
                        this.parent.uiAtlas.ctx.fillStyle = colorBg; // text color
                        this.parent.uiAtlas.ctx.fillRect(0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                        tx = 10;
                        break;
                    default:
                        colorFont = $menuListData.select ? "[ffffff]" : "[9c9c9c]";
                        break;
                }
                var ctx = this.parent.uiAtlas.ctx;
                ctx.font = "24px Helvetica";
                ctx.fillStyle = colorFont;
                ctx.lineWidth = 0;
                ctx.fillText($menuListData.label, tx, 15);
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }
        };
        LabelTxtVo.prototype.drawToUiAtlasToCtx = function ($ctx, $fromuiAtlas, $shareName, $posRect) {
            var imgUseRect = $fromuiAtlas.getRec($shareName);
            $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, $posRect.width, $posRect.height);
        };
        return LabelTxtVo;
    }(Disp2DBaseText));
    editscene.LabelTxtVo = LabelTxtVo;
    var EditTopMenuPanel = /** @class */ (function (_super) {
        __extends(EditTopMenuPanel, _super);
        function EditTopMenuPanel() {
            var _this = _super.call(this, LabelTxtVo, new Rectangle(0, 0, 140, 48), 50) || this;
            _this.meneType = 0;
            _this._bottomRender = new UIRenderComponent();
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", function () { _this.loadConfigCom(); });
            _this.addRenderAt(_this._bottomRender, 0);
            AppData.topPanel.addUIContainer(_this);
            return _this;
        }
        EditTopMenuPanel.getInstance = function () {
            if (!this._instance) {
                this._instance = new EditTopMenuPanel();
            }
            return this._instance;
        };
        EditTopMenuPanel.prototype.loadConfigCom = function () {
            LabelTxtVo.shareUiAtlas = this._bottomRender.uiAtlas;
            this.winBg = this.addChild(this._bottomRender.getComponent("e_topmenu_bg"));
            this.uiLoadComplete = true;
            if (this.uiLoadComplete) {
                if (this.meneType == 0) {
                    this.makeSceneTopMenu();
                }
                if (this.meneType == 1) {
                    this.makeTextureTopMenu();
                }
            }
            this.resize();
        };
        EditTopMenuPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete) {
                this.winBg.x = 0;
                this.winBg.y = 0;
                this.winBg.width = Scene_data.stageWidth;
                this.winBg.height = 29;
            }
        };
        EditTopMenuPanel.prototype.initMenuData = function (value) {
            this.clearAll();
            this.menuXmlItem = value.menuXmlItem;
            meshFunSon(this.menuXmlItem, 0);
            function meshFunSon(subMenu, level) {
                for (var i = 0; subMenu && i < subMenu.length; i++) {
                    subMenu[i].level = level;
                    meshFunSon(subMenu[i].subMenu, level + 1);
                }
            }
        };
        EditTopMenuPanel.prototype.getMenu0 = function () {
            var $vo = new MenuListData("菜单", "1");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("保存场景", "11"));
            $vo.subMenu.push(new MenuListData("清理场景", "12"));
            return $vo;
        };
        EditTopMenuPanel.prototype.getMenu1 = function () {
            var $vo = new MenuListData("窗口", "2");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("场景属性", "21"));
            $vo.subMenu.push(new MenuListData("测试导入场景", "22"));
            $vo.subMenu.push(new MenuListData("文件列表", "23"));
            return $vo;
        };
        EditTopMenuPanel.prototype.getMenu2 = function () {
            var $vo = new MenuListData("导入", "3");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("导入场景", "31"));
            $vo.subMenu.push(new MenuListData("导入模型", "32"));
            $vo.subMenu.push(new MenuListData("导入特效", "33"));
            $vo.subMenu.push(new MenuListData("临时修改", "34"));
            return $vo;
        };
        EditTopMenuPanel.prototype.makeSceneTopMenu = function () {
            var _this = this;
            this.meneType = 0;
            if (this.uiLoadComplete) {
                var temp = {};
                var menuA = new Array();
                menuA.push(this.getMenu0());
                menuA.push(this.getMenu1());
                menuA.push(this.getMenu2());
                menuA.push(new MenuListData("系统", "3"));
                temp.menuXmlItem = menuA;
                this.bfun = function (value, evt) { _this.menuBfun(value, evt); };
                this.initMenuData(temp);
                this.showMainUi();
            }
        };
        EditTopMenuPanel.prototype.makeTextureTopMenu = function () {
            var _this = this;
            this.meneType = 1;
            if (this.uiLoadComplete) {
                var temp = {};
                var menuB = new Array();
                menuB.push(new MenuListData("保存材质", "1001"));
                menuB.push(new MenuListData("编译材质", "1002"));
                menuB.push(new MenuListData("关闭材质窗口", "1003"));
                menuB.push(new MenuListData("返回场景", "1004"));
                temp.menuXmlItem = menuB;
                this.bfun = function (value, evt) { _this.menuBfun(value, evt); };
                this.initMenuData(temp);
                this.showMainUi();
            }
        };
        EditTopMenuPanel.prototype.menuBfun = function (value, evt) {
            var _this = this;
            console.log(value.key);
            switch (value.key) {
                case "11":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SAVE_SCENE_MAP_TO_SEVER));
                    break;
                case "12":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.CLEAR_SCENE_MAP_ALL));
                    break;
                case "21":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW));
                    break;
                case "22":
                    break;
                case "23":
                    break;
                case "31":
                    //解析地图
                    pack.FileOssModel.upTempFileToOss(function ($file) {
                        var idx = AppData.mapOpenUrl.lastIndexOf(".");
                        if (idx != -1) {
                            var mapDic = AppData.mapOpenUrl.substring(0, idx) + "/";
                            inputres.ImputGameResModel.getInstance().inputSceneFile($file, mapDic);
                        }
                    });
                    break;
                case "32":
                    pack.FileOssModel.upTempFileToOss(function ($file) {
                        _this.inputH5roleRes($file);
                    });
                    break;
                case "34":
                    break;
                case "1001":
                    ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SAVE_MATERIA_PANEL));
                    break;
                case "1002":
                    ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                    break;
                case "1003":
                    break;
                case "1004":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
                    break;
                default:
                    break;
            }
        };
        EditTopMenuPanel.prototype.isRoleFile = function (arrayBuffer) {
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
        EditTopMenuPanel.prototype.inputH5roleRes = function (soureFile) {
            var _this = this;
            var $reader = new FileReader();
            $reader.readAsArrayBuffer(soureFile);
            $reader.onload = function ($temp) {
                if (_this.isRoleFile($reader.result)) {
                    var role = new left.MaterialRoleSprite();
                    maineditor.MainEditorProcessor.edItorSceneManager.addMovieDisplay(role);
                    pack.RoleChangeModel.getInstance().loadLocalFile($reader.result, role);
                    var $roleStr = pack.RoleChangeModel.getInstance().getChangeRoleStr();
                    if ($roleStr) {
                        var $file = new File([$roleStr], "ossfile.txt");
                        console.log(soureFile.name);
                        var baseRoot = AppData.getPerentPath(AppData.rootFilePath);
                        console.log(baseRoot);
                        var pathurl = baseRoot + soureFile.name.replace(".txt", ".zzw");
                        pack.FileOssModel.upOssFile($file, pathurl, function () {
                            console.log("上传成功", pathurl);
                        });
                    }
                    else {
                        console.log("没有可上传mesh数据");
                    }
                }
                else {
                    alert("不确定类型,需要角色文件role/");
                }
            };
        };
        EditTopMenuPanel.prototype.changeZZW = function () {
            var $url = "pefab/role_base.zzw";
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE, function ($str) {
                var temp = JSON.parse($str);
                temp.textureurl = "base.material";
                var $file = new File([JSON.stringify(temp)], "ossfile.txt");
                var pathUrl = Pan3d.Scene_data.fileRoot + $url;
                var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile($file, pathurl, function () {
                    console.log("上传成功");
                });
            });
        };
        EditTopMenuPanel.prototype.showMainUi = function () {
            this.clearAll();
            Pan3d.Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            this.showSon(this.menuXmlItem, 20, 0);
        };
        EditTopMenuPanel.prototype.onStageMouseUp = function ($evt) {
            var needOut = true;
            for (var i = 0; i < this._uiItem.length; i++) {
                var menuListData = this._uiItem[i].rightTabInfoVo;
                if (menuListData && this._uiItem[i].ui.testPoint($evt.x, $evt.y)) {
                    needOut = false;
                }
            }
            if (needOut) {
                for (var i = 0; i < this._uiItem.length; i++) {
                    var menuListData = this._uiItem[i].rightTabInfoVo;
                    if (menuListData && menuListData.select) {
                        menuListData.select = false;
                        this._uiItem[i].makeData();
                    }
                }
                this.removeOtherSonMenu(0);
            }
        };
        EditTopMenuPanel.prototype.showTempMenu = function ($data, i, tx, ty) {
            var temp = _super.prototype.showTemp.call(this, $data);
            if ($data.level == 0) {
                temp.ui.x = i * 70 + 5;
                temp.ui.y = 1;
            }
            else {
                temp.ui.x = tx + 4;
                temp.ui.y = i * 20 + ty - 4;
            }
            temp.ui.addEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.addEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            return temp;
        };
        //清理单元内的内容并需要将对象移出显示队例
        EditTopMenuPanel.prototype.clearTemp = function ($data) {
            var temp = this.getVoByData($data);
            temp.ui.removeEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.removeEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            _super.prototype.clearTemp.call(this, $data);
        };
        EditTopMenuPanel.prototype.setColorByLevel = function (value) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var menuListData = this._uiItem[i].rightTabInfoVo;
                if (menuListData && menuListData.level == value) {
                    menuListData.select = false;
                    this._uiItem[i].makeData();
                }
            }
        };
        EditTopMenuPanel.prototype.removeOtherSonMenu = function (level) {
            console.log("removeOtherSonMenu");
            for (var i = this._uiItem.length - 1; i >= 0; i--) {
                var $menuListData = this._uiItem[i].rightTabInfoVo;
                if ($menuListData && $menuListData.level > level) {
                    $menuListData.select = false;
                    this.clearTemp($menuListData);
                }
            }
        };
        EditTopMenuPanel.prototype.butMove = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.rightTabInfoVo) {
                var menuListData = temp.rightTabInfoVo;
                this.setColorByLevel(menuListData.level);
                menuListData.select = true;
                temp.makeData();
                if (MenuListData.showSon) {
                    this.removeOtherSonMenu(menuListData.level);
                    this.showSon(menuListData.subMenu, temp.ui.x, temp.ui.y + temp.ui.height);
                }
            }
        };
        EditTopMenuPanel.prototype.onMouseUp = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.rightTabInfoVo) {
                this.bfun(temp.rightTabInfoVo, evt);
                if (MenuListData.showSon) {
                    this.removeOtherSonMenu(0);
                    MenuListData.showSon = false;
                }
                else {
                    MenuListData.showSon = true;
                    this.butMove(evt);
                }
            }
        };
        EditTopMenuPanel.prototype.showSon = function (subMenu, tx, ty) {
            for (var i = 0; subMenu && i < subMenu.length; i++) {
                var labelTxtVo = this.getVoByData(subMenu[i]);
                if (!labelTxtVo) {
                    this.showTempMenu(subMenu[i], i, tx, ty);
                }
            }
        };
        return EditTopMenuPanel;
    }(Dis2DUIContianerPanel));
    editscene.EditTopMenuPanel = EditTopMenuPanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditTopMenuPanel.js.map