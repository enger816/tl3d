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
    var Rectangle = Pan3d.Rectangle;
    var Vector2D = Pan3d.Vector2D;
    var TextureManager = Pan3d.TextureManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var UIData = Pan3d.UIData;
    var MouseType = Pan3d.MouseType;
    var MathUtil = Pan3d.MathUtil;
    var TextRegExp = Pan3d.TextRegExp;
    var PanDragEvent = drag.PanDragEvent;
    var SelectFileListText = /** @class */ (function (_super) {
        __extends(SelectFileListText, _super);
        function SelectFileListText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SelectFileListText.prototype, "select", {
            get: function () {
                return this._select;
            },
            set: function (value) {
                this._select = value;
                this.makeData();
            },
            enumerable: true,
            configurable: true
        });
        SelectFileListText.prototype.makeData = function () {
            if (this.tittlestr) {
                var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                var nameStr = this.tittlestr;
                if (this._select) {
                    nameStr = "[ffffff]" + nameStr;
                }
                else {
                    nameStr = "[9c9c9c]" + nameStr;
                }
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, nameStr, 24, 1, 1, TextAlign.LEFT);
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }
        };
        return SelectFileListText;
    }(Disp2DBaseText));
    maineditor.SelectFileListText = SelectFileListText;
    var EditorOpenList = /** @class */ (function () {
        function EditorOpenList(value, render) {
            this.perent = value;
            this.topRender = render;
            this.tabItemArr = [];
            //this.pushPathUrl("角色/新场景.scene")
            //this.pushPathUrl("完美的开始.map")
        }
        EditorOpenList.prototype.tabBgClik = function (evt) {
            var tabVo = evt.target.data;
            var ui = evt.target;
            if ((evt.x - ui.absoluteX) < (ui.absoluteWidth - 20)) {
                this.selectTabStr = tabVo.rightTabInfoVo;
                //if (this.selectTabStr.indexOf(".map") != -1) {
                //    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), this.selectTabStr); //加载场景
                //    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
                //}
                //if (this.selectTabStr.indexOf(".material") != -1) {
                //    Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), this.selectTabStr);
                //}
                maineditor.EditorModel.getInstance().openFileByUrl(this.selectTabStr);
            }
            else {
                console.log("关", tabVo);
                this.removePathUrl(tabVo.rightTabInfoVo);
            }
            this.refrishTabUiSelect();
        };
        EditorOpenList.prototype.removePathUrl = function (value) {
            for (var i = 0; i < this.tabItemArr.length; i++) {
                if (this.tabItemArr[i].rightTabInfoVo == value) {
                    var tabVo = this.tabItemArr[i];
                    this.perent.removeChild(tabVo.bgUi);
                    tabVo.bgUi.removeEventListener(InteractiveEvent.Down, this.tabBgClik, this);
                    this.perent.clearTemp(tabVo.rightTabInfoVo);
                    this.tabItemArr.splice(i, 1);
                }
            }
        };
        EditorOpenList.prototype.changeVoBg = function (vo, value) {
            var skinName = "e_edit_select_bg_1";
            if (value) {
                skinName = "e_edit_select_bg_2";
            }
            else {
                skinName = "e_edit_select_bg_1";
            }
            var tempui = this.perent.addChild(this.topRender.getComponent(skinName));
            if (vo.bgUi) {
                tempui.x = vo.bgUi.x;
                tempui.y = vo.bgUi.y;
                tempui.width = vo.bgUi.width;
                tempui.height = vo.bgUi.height;
                vo.bgUi.removeEventListener(InteractiveEvent.Down, this.tabBgClik, this);
                this.perent.removeChild(vo.bgUi);
            }
            vo.bgUi = tempui; //换上最新的
            vo.bgUi.addEventListener(InteractiveEvent.Down, this.tabBgClik, this);
            vo.bgUi.data = vo;
            vo.select = value;
        };
        EditorOpenList.prototype.refrishTabUiSelect = function () {
            var tx = 2;
            for (var i = 0; i < this.tabItemArr.length; i++) {
                var tabVo = this.tabItemArr[i];
                if (this.tabItemArr[i].rightTabInfoVo == this.selectTabStr) {
                    this.tabItemArr[i].select = true;
                    this.changeVoBg(this.tabItemArr[i], true);
                }
                else {
                    this.tabItemArr[i].select = false;
                    this.changeVoBg(this.tabItemArr[i], false);
                }
                tabVo.bgUi.x = tx - 1;
                tabVo.bgUi.y = 1;
                tabVo.bgUi.width = Math.floor(tabVo.textMetrics.width) + 20 + 25;
                tabVo.bgUi.height = 22;
                tabVo.bgUi.data = tabVo;
                tx += tabVo.bgUi.width;
                tabVo.ui.x = tabVo.bgUi.x + 10;
                tabVo.ui.y = tabVo.bgUi.y + 5;
                tabVo.ui.width = 256;
                tabVo.ui.height = 20;
            }
            this.topRender.applyObjData();
        };
        EditorOpenList.prototype.pushPathUrl = function (value) {
            this.selectTabStr = value;
            var needAdd = true;
            var tx = 1;
            for (var i = 0; i < this.tabItemArr.length; i++) {
                if (this.tabItemArr[i].rightTabInfoVo == value) {
                    needAdd = false;
                }
                tx = this.tabItemArr[i].bgUi.x + this.tabItemArr[i].bgUi.width - 1;
            }
            if (needAdd) {
                var $tittlestr = value.split("/")[value.split("/").length - 1];
                var $pathurl = value;
                var $ctx = UIManager.getInstance().getContext2D(100, 100, false);
                $ctx.font = "13px " + UIData.font;
                var tabVo = this.perent.showTemp($pathurl);
                tabVo.textMetrics = TextRegExp.getTextMetrics($ctx, $tittlestr);
                tabVo.tittlestr = $tittlestr;
                this.changeVoBg(tabVo, false);
                tabVo.select = true;
                this.tabItemArr.push(tabVo);
            }
            this.refrishTabUiSelect();
        };
        return EditorOpenList;
    }());
    maineditor.EditorOpenList = EditorOpenList;
    var MainEditorPanel = /** @class */ (function (_super) {
        __extends(MainEditorPanel, _super);
        function MainEditorPanel() {
            var _this = _super.call(this, SelectFileListText, new Rectangle(0, 0, 512, 40), 10) || this;
            _this.suffix = "prefab|lyf|zzw|skill";
            _this.pageRect = new Rectangle(0, 0, 500, 500);
            _this._sceneViewRender = new maineditor.UiModelViewRender();
            _this.addRender(_this._sceneViewRender);
            return _this;
        }
        Object.defineProperty(MainEditorPanel.prototype, "sceneProjectVo", {
            set: function (value) {
                this._sceneViewRender.sceneProjectVo = value;
            },
            enumerable: true,
            configurable: true
        });
        MainEditorPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.e_centen_panel = this.addChild(this._baseMidRender.getComponent("e_centen_panel"));
            this.editorOpenList = new EditorOpenList(this, this._baseTopRender);
            this.e_line_left = this.addChild(this._baseTopRender.getComponent("e_line_vertical"));
            this.e_line_right = this.addChild(this._baseTopRender.getComponent("e_line_vertical"));
            this.initView();
            this.uiLoadComplete = true;
            this.refrishSize();
            this.showType = AppData.sceneEidtType;
        };
        Object.defineProperty(MainEditorPanel.prototype, "showType", {
            set: function (value) {
                AppData.sceneEidtType = value;
                if (this.uiLoadComplete) {
                    switch (AppData.sceneEidtType) {
                        case 1:
                            this.setUiListVisibleByItem([this.a_scene_view], true);
                            //  this.setUiListVisibleByItem([this.e_centen_panel], true)
                            break;
                        case 2:
                            this.setUiListVisibleByItem([this.a_scene_view], false);
                            // this.setUiListVisibleByItem([this.e_centen_panel], false)
                            break;
                        default:
                            break;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        MainEditorPanel.prototype.initView = function () {
            var _this = this;
            this._sceneViewRender.uiAtlas = this._tRender.uiAtlas;
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/white.jpg", function ($texture) {
                _this._sceneViewRender.textureRes = $texture;
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.upFrame(t); });
            });
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_DROP, this.dragDrop, this);
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_ENTER, this.dragEnter, this);
            this.a_scene_view.addEventListener(InteractiveEvent.Down, this.butClik, this);
            document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onPanellMouseWheel($evt); });
        };
        MainEditorPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_scene_view:
                    if (evt.mouseEvent.ctrlKey || evt.mouseEvent.shiftKey) {
                        ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SCENE_SELECT_SPRITE_DOWN), evt);
                    }
                    break;
                default:
                    break;
            }
        };
        MainEditorPanel.prototype.onPanellMouseWheel = function ($evt) {
            var $slectUi = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi && $slectUi.parent == this) {
                var q = new Pan3d.Quaternion();
                q.fromMatrix(maineditor.MainEditorProcessor.edItorSceneManager.cam3D.cameraMatrix);
                var m = q.toMatrix3D();
                m.invert();
                var $add = m.transformVector(new Vector3D(0, 0, $evt.wheelDelta / 100));
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.x += $add.x;
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.y += $add.y;
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.z += $add.z;
                MathUtil.MathCam(maineditor.MainEditorProcessor.edItorSceneManager.cam3D);
            }
        };
        MainEditorPanel.prototype.dragDrop = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动");
            }
            else {
                console.log("不可以");
            }
        };
        MainEditorPanel.prototype.testSuffix = function (value) {
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
        MainEditorPanel.prototype.dragEnter = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                var obj = {};
                obj.url = drag.DragManager.dragSource.url;
                obj.name = "新对象";
                obj.pos = maineditor.MainEditorProcessor.edItorSceneManager.getGroundPos(new Vector2D(evt.data.x, evt.data.y));
                if (drag.DragManager.dragSource.url.indexOf(".lyf") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_LYF_TO_SCENE), obj);
                }
                if (drag.DragManager.dragSource.url.indexOf(".skill") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_SKILL_TO_SCENE), obj);
                }
                if (drag.DragManager.dragSource.url.indexOf(".prefab") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj);
                }
                if (drag.DragManager.dragSource.url.indexOf(".zzw") != -1) {
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_ZZW_TO_SCENE), obj);
                }
            }
        };
        MainEditorPanel.prototype.upFrame = function (t) {
            if (this.hasStage) {
                maineditor.MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
                var cam3D = maineditor.MainEditorProcessor.edItorSceneManager.cam3D;
                cam3D.cavanRect.x = this.a_scene_view.x + this.left;
                cam3D.cavanRect.y = this.a_scene_view.y + this.top;
                cam3D.cavanRect.width = this.a_scene_view.width;
                cam3D.cavanRect.height = this.a_scene_view.height;
                maineditor.MainEditorProcessor.edItorSceneManager.renderToTexture();
            }
        };
        MainEditorPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MainEditorPanel.prototype.panelEventChanger = function (value) {
            this.setRect(value);
            this.refrishSize();
        };
        MainEditorPanel.prototype.refrishSize = function () {
            if (this.uiLoadComplete) {
                var roundNum = 1;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum + 22;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - roundNum * 2 - 20;
                if (this.e_centen_panel) {
                    this.e_centen_panel.x = 0;
                    this.e_centen_panel.y = 0;
                    this.e_centen_panel.width = this.pageRect.width;
                    this._baseMidRender.applyObjData();
                }
                this.e_line_left.x = 1;
                this.e_line_left.y = 0;
                this.e_line_left.height = this.pageRect.height;
                this.e_line_right.x = this.pageRect.width - 3;
                this.e_line_right.y = 0;
                this.e_line_right.height = this.pageRect.height;
            }
            this.resize();
        };
        return MainEditorPanel;
    }(win.Dis2dBaseWindow));
    maineditor.MainEditorPanel = MainEditorPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorPanel.js.map