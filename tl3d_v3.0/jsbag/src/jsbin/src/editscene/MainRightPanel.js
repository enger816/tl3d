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
    var Rectangle = Pan3d.Rectangle;
    var TextureManager = Pan3d.TextureManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var UIData = Pan3d.UIData;
    var Panel = win.Panel;
    var RightTabInfoVo = /** @class */ (function () {
        function RightTabInfoVo() {
        }
        return RightTabInfoVo;
    }());
    editscene.RightTabInfoVo = RightTabInfoVo;
    var RightTabText = /** @class */ (function (_super) {
        __extends(RightTabText, _super);
        function RightTabText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(RightTabText.prototype, "select", {
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
        RightTabText.prototype.makeData = function () {
            if (this.rightTabInfoVo) {
                var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                var nameStr = this.rightTabInfoVo.label;
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
        return RightTabText;
    }(Disp2DBaseText));
    editscene.RightTabText = RightTabText;
    var RightOpenList = /** @class */ (function () {
        function RightOpenList(value, render) {
            this.perent = value;
            this.topRender = render;
            this.tabItemArr = [];
            //this.pushPathUrl("角色/新场景.scene")
            //this.pushPathUrl("完美的开始.map")
        }
        RightOpenList.prototype.tabBgClik = function (evt) {
            var tabVo = evt.target.data;
            var ui = evt.target;
            if ((evt.x - ui.absoluteX) < (ui.absoluteWidth - 20)) {
                this.selectRightTabInfoVo = tabVo.rightTabInfoVo;
                var tempMeshView = tabVo.rightTabInfoVo.view;
                tempMeshView.replayUiList();
                prop.PropModel.getInstance().showOtherMeshView(tabVo.rightTabInfoVo.view);
            }
            else {
                this.removePathUrl(tabVo.rightTabInfoVo);
            }
            this.refrishTabUiSelect();
        };
        RightOpenList.prototype.removePathUrl = function (value) {
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
        RightOpenList.prototype.changeVoBg = function (vo, value) {
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
        RightOpenList.prototype.refrishTabUiSelect = function () {
            var tx = 2;
            for (var i = 0; i < this.tabItemArr.length; i++) {
                var tabVo = this.tabItemArr[i];
                if (this.tabItemArr[i].rightTabInfoVo == this.selectRightTabInfoVo) {
                    this.tabItemArr[i].select = true;
                    this.changeVoBg(this.tabItemArr[i], true);
                }
                else {
                    this.tabItemArr[i].select = false;
                    this.changeVoBg(this.tabItemArr[i], false);
                }
                tabVo.bgUi.x = tx - 1;
                tabVo.bgUi.y = 13;
                tabVo.bgUi.width = Math.floor(tabVo.textMetrics.width) + 0 + 25;
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
        RightOpenList.prototype.testIsNeedAdd = function (value) {
            for (var i = 0; i < this.tabItemArr.length; i++) {
                var tempMeshView = this.tabItemArr[i].rightTabInfoVo.view;
                console.log("--");
                if (tempMeshView.data == value.view.data || ((tempMeshView.type == value.view.type) && value.view.type)) {
                    return false;
                }
            }
            return true;
        };
        RightOpenList.prototype.pushPathUrl = function (value) {
            var needAdd = this.testIsNeedAdd(value);
            //for (var i: number = 0; i < this.tabItemArr.length; i++) {
            //    if (this.tabItemArr[i].rightTabInfoVo.view.data == value.view.data) {
            //        needAdd = false;
            //        this.selectRightTabInfoVo = this.tabItemArr[i].rightTabInfoVo;
            //    }
            //}
            if (needAdd) {
                var $ctx = UIManager.getInstance().getContext2D(100, 100, false);
                $ctx.font = "13px " + UIData.font;
                var tabVo = this.perent.showTemp(value.label);
                tabVo.rightTabInfoVo = value;
                this.selectRightTabInfoVo = tabVo.rightTabInfoVo;
                tabVo.textMetrics = new Rectangle(0, 0, 40, 20);
                this.changeVoBg(tabVo, false);
                this.tabItemArr.unshift(tabVo);
                // this.tabItemArr.push(tabVo);
            }
            this.refrishTabUiSelect();
        };
        return RightOpenList;
    }());
    editscene.RightOpenList = RightOpenList;
    var MainRightBaseWin = /** @class */ (function (_super) {
        __extends(MainRightBaseWin, _super);
        function MainRightBaseWin() {
            var _this = _super.call(this, RightTabText, new Rectangle(0, 0, 512, 40), 10) || this;
            _this.skilNum = 0;
            return _this;
        }
        MainRightBaseWin.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.setUiListVisibleByItem([this.e_panel_1], true);
            this.e_file_list_path_bg = this.addChild(this._baseMidRender.getComponent("e_file_list_path_bg"));
            this.rightOpenList = new RightOpenList(this, this._baseTopRender);
            //  this.rightOpenList.pushPathUrl(this.getTempTabInfo("场景"));
        };
        MainRightBaseWin.prototype.pushViewToTab = function (value) {
            var vo = new RightTabInfoVo();
            //  vo.label = "属性" + this.skilNum++;
            if (value instanceof filelist.FileMeshView) {
                vo.label = "文件";
                value.type = "文件";
            }
            else if (value instanceof filelist.PrefabMeshView) {
                vo.label = "模型";
                value.type = "模型";
            }
            else if (value instanceof filelist.RoleMeshView) {
                vo.label = "角色";
                value.type = "角色";
            }
            else if (value instanceof filelist.SkillMeshView) {
                vo.label = "技能";
                value.type = "技能";
            }
            else if (value instanceof maineditor.ScenePojectMeshView) {
                vo.label = "场景";
                value.type = "场景";
            }
            else {
                console.log("没有设置胡对象", value);
                vo.label = value.type;
            }
            vo.view = value;
            this.rightOpenList.pushPathUrl(vo);
        };
        MainRightBaseWin.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete && this.e_file_list_path_bg) {
                this.e_file_list_path_bg.x = 0;
                this.e_file_list_path_bg.y = 12;
                this.e_file_list_path_bg.height = 22;
                this.e_file_list_path_bg.width = this.pageRect.width - this.e_file_list_path_bg.x;
                this._baseMidRender.applyObjData();
            }
        };
        return MainRightBaseWin;
    }(win.Dis2dBaseWindow));
    editscene.MainRightBaseWin = MainRightBaseWin;
    var MainRightPanel = /** @class */ (function (_super) {
        __extends(MainRightPanel, _super);
        function MainRightPanel(has) {
            if (has === void 0) { has = true; }
            var _this = _super.call(this) || this;
            if (has) {
                _this.winBg = new MainRightBaseWin();
                _this.addUIContainer(_this.winBg);
                _this.changeSize();
            }
            return _this;
        }
        Object.defineProperty(MainRightPanel.prototype, "mainRightBaseWin", {
            get: function () {
                return this.winBg;
            },
            enumerable: true,
            configurable: true
        });
        MainRightPanel.prototype.changeSize = function () {
            if (this.winBg) {
                this.winBg.setRect(this.rect);
            }
        };
        return MainRightPanel;
    }(Panel));
    editscene.MainRightPanel = MainRightPanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=MainRightPanel.js.map