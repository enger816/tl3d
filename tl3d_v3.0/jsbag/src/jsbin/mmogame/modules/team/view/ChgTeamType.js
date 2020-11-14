var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var team;
(function (team) {
    var ChgTeamType = /** @class */ (function (_super) {
        __extends(ChgTeamType, _super);
        function ChgTeamType() {
            var _this = _super.call(this) || this;
            _this._lastMouseX = 0;
            _this._type = 0;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topupRender = new UIRenderComponent;
            _this.addRender(_this._topupRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        ChgTeamType.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._topupRender.dispose();
            this._topupRender = null;
            if (this.tablist) {
                this.tablist.dispose();
                this.tablist = null;
            }
            _super.prototype.dispose.call(this);
        };
        ChgTeamType.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/team/team.xml", "ui/uidata/team/team.png", function () { _this.loadConfigCom(); }, "ui/uidata/team/teampc.png");
        };
        ChgTeamType.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this._topupRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.addUIList(["b_line", "b_basebg", "b_title", "b_btntxt"], this._bgRender);
            this.addUIList(["b_targettitle1", "b_targettitle0", "a_27_max", "a_27_min"], this._midRender);
            this.addUIList(["b_maxlevtxt", "b_minlevtxt"], this._topRender);
            this.a_26_min = this.addChild(this._topRender.getComponent("a_26_min"));
            this.a_26_max = this.addChild(this._topRender.getComponent("a_26_max"));
            this.a_32_max = this.addChild(this._topRender.getComponent("a_32_max"));
            this.a_32_min = this.addChild(this._topRender.getComponent("a_32_min"));
            this.b_33max = this.addChild(this._topupRender.getComponent("b_33max"));
            this.b_33min = this.addChild(this._topupRender.getComponent("b_33min"));
            this.a_25_min = this.addEvntBut("a_25_min", this._topupRender);
            this.a_25_min.data = 0;
            this.a_25_max = this.addEvntBut("a_25_max", this._topupRender);
            this.a_25_max.data = 1;
            this.b_index = this.addChild(this._midRender.getComponent("b_index"));
            this.b_minus_min = this.addEvntButUp("b_minus_min", this._topRender);
            this.b_add_min = this.addEvntButUp("b_add_min", this._topRender);
            this.b_minus_max = this.addEvntButUp("b_minus_max", this._topRender);
            this.b_add_max = this.addEvntButUp("b_add_max", this._topRender);
            this.b_btnbg_sure = this.addEvntButUp("cnew_but_yes", this.winmidRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_sure, "b_btnbg_sure", this._topRender);
            this.resize();
            this.applyLoadComplete();
        };
        ChgTeamType.prototype.A_left_bg_MouseDown = function (evt) {
            this._lastMouseX = evt.x;
            this._type = evt.target.data;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        ChgTeamType.prototype.A_left_bg_MouseMove = function (evt) {
            // var posx: number = (evt.x - this._lastMouseX) / UIData.Scale;
            var curx = evt.x / UIData.Scale;
            curx = Math.min(curx, 678);
            curx = Math.max(curx, 421);
            var raio = (curx + 16 - 437) / 257;
            if (this._type == 0) {
                var totalmin = this._curTypeVo.tab.tab.min_lev[1] - this._curTypeVo.tab.tab.min_lev[0];
                var finnum = Math.floor(raio * totalmin) + this._curTypeVo.tab.tab.min_lev[0];
                this._curTypeVo.minlev = finnum;
                this.drawMinPro();
            }
            else {
                var totalmax = this._curTypeVo.tab.tab.max_lev[1] - this._curTypeVo.tab.tab.max_lev[0];
                var finnum = Math.floor(raio * totalmax) + this._curTypeVo.tab.tab.max_lev[0];
                this._curTypeVo.maxlev = finnum;
                this.drawMaxPro();
            }
        };
        ChgTeamType.prototype.A_left_bg_MouseUp = function (evt) {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        ChgTeamType.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.a_25_max:
                case this.a_25_min:
                    this.A_left_bg_MouseDown(evt);
                    break;
                case this.b_minus_min:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var minNum = this._curTypeVo.minlev - 1;
                    this._curTypeVo.minlev = Math.max(minNum, this._curTypeVo.tab.tab.min_lev[0]);
                    this.drawMinPro();
                    break;
                case this.b_add_min:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var minNum1 = this._curTypeVo.minlev + 1;
                    this._curTypeVo.minlev = Math.min(minNum1, this._curTypeVo.tab.tab.min_lev[1]);
                    this.drawMinPro();
                    break;
                case this.b_minus_max:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var maxNum = this._curTypeVo.maxlev - 1;
                    this._curTypeVo.maxlev = Math.max(maxNum, this._curTypeVo.tab.tab.max_lev[0]);
                    this.drawMaxPro();
                    break;
                case this.b_add_max:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var maxNum1 = this._curTypeVo.maxlev + 1;
                    this._curTypeVo.maxlev = Math.min(maxNum1, this._curTypeVo.tab.tab.max_lev[1]);
                    this.drawMaxPro();
                    break;
                case this.b_btnbg_sure:
                    if (this._curTypeVo.minlev > this._curTypeVo.maxlev) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "最小等级不能大于最大等级", 99);
                        return;
                    }
                    var $teamtype = new team.TeamEvent(team.TeamEvent.SURE_TEAMTYPE_PANEL);
                    $teamtype.data = this._curTypeVo;
                    ModuleEventManager.dispatchEvent($teamtype);
                    NetManager.getInstance().protocolos.group_change_config(this._curTypeVo.tab.tab.id, this._curTypeVo.minlev, this._curTypeVo.maxlev, 1);
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        ChgTeamType.prototype.resetData = function ($tab) {
            this._curTypeVo = $tab;
            this.drawMinPro();
            this.drawMaxPro();
        };
        ChgTeamType.prototype.drawMaxPro = function () {
            var totalmax = this._curTypeVo.tab.tab.max_lev[1] - this._curTypeVo.tab.tab.max_lev[0];
            var curmax = this._curTypeVo.maxlev - this._curTypeVo.tab.tab.max_lev[0];
            var raromax = curmax / totalmax;
            if (raromax == 0) {
                raromax = 0.01;
            }
            this.a_26_max.uvScale = raromax;
            var maxX = this.a_26_max.x + this.a_26_max.width * raromax - 16;
            maxX = Math.min(maxX, 672);
            this.a_32_max.x = maxX;
            this.b_33max.x = this.a_32_max.x + 2;
            this.a_25_max.x = this.a_32_max.x + 4;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_33max.skinName, this._curTypeVo.maxlev + "级", 14, TextAlign.CENTER, ColorType.Whitefff7db);
        };
        ChgTeamType.prototype.drawMinPro = function () {
            var totalmin = this._curTypeVo.tab.tab.min_lev[1] - this._curTypeVo.tab.tab.min_lev[0];
            var curmin = this._curTypeVo.minlev - this._curTypeVo.tab.tab.min_lev[0];
            var raromin = curmin / totalmin;
            if (raromin == 0) {
                raromin = 0.01;
            }
            this.a_26_min.uvScale = raromin;
            var maxX = this.a_26_min.x + this.a_26_min.width * raromin - 16;
            maxX = Math.min(maxX, 672);
            this.a_32_min.x = maxX;
            this.b_33min.x = this.a_32_min.x + 2;
            this.a_25_min.x = this.a_32_min.x + 4;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_33min.skinName, this._curTypeVo.minlev + "级", 14, TextAlign.CENTER, ColorType.Whitefff7db);
        };
        ChgTeamType.prototype.show = function ($tabvo) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (!this.tablist) {
                this.tablist = new TeamTypeTabList;
                this.tablist.init(this._bgRender.uiAtlas);
            }
            this.tablist.show($tabvo);
            this.resize();
        };
        ChgTeamType.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.tablist) {
                this.tablist.hide();
            }
        };
        ChgTeamType.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.tablist) {
                this.tablist.left = this.b_index.parent.x / UIData.Scale + this.b_index.x;
                this.tablist.top = this.b_index.parent.y / UIData.Scale + this.b_index.y;
            }
        };
        return ChgTeamType;
    }(WindowMinUi));
    team.ChgTeamType = ChgTeamType;
    var TabVo = /** @class */ (function () {
        function TabVo() {
        }
        return TabVo;
    }());
    team.TabVo = TabVo;
    /**
     * 左侧tablist
     */
    var TeamTypeTabList = /** @class */ (function (_super) {
        __extends(TeamTypeTabList, _super);
        function TeamTypeTabList() {
            return _super.call(this) || this;
        }
        TeamTypeTabList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        TeamTypeTabList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, TeamTypeTabListRender, 152, 400, 0, 50, 8, 256, 512, 1, 10);
        };
        TeamTypeTabList.prototype.getData = function ($aary) {
            var ary = new Array;
            for (var i = 0; i < $aary.length; i++) {
                var vo = new TabVo;
                // vo.id = i;
                vo.tab = $aary[i];
                if (this._selvo.tab.tab.id == vo.tab.tab.id) {
                    vo.maxlev = this._selvo.maxlev;
                    vo.minlev = this._selvo.minlev;
                }
                else {
                    vo.maxlev = vo.tab.tab.max_lev[1];
                    vo.minlev = vo.tab.tab.min_lev[0];
                }
                var item = new SListItemData;
                item.data = vo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        TeamTypeTabList.prototype.show = function ($vo) {
            this._selvo = $vo;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var tbary = team.TeamModel.getInstance().getGroupTypeAry();
            var itemDataList = this.getData(tbary);
            this.refreshData(itemDataList);
            var idx = $vo.tab.idx - 1;
            this.scrollIdx(idx);
            this.setSelectIndex(idx);
        };
        TeamTypeTabList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return TeamTypeTabList;
    }(SList));
    team.TeamTypeTabList = TeamTypeTabList;
    var TeamTypeTabListRender = /** @class */ (function (_super) {
        __extends(TeamTypeTabListRender, _super);
        function TeamTypeTabListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamTypeTabListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Tabbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tabbg", 0, 0, 152, 48);
            $container.addChild(this.Tabbg);
            this.Tabbg.addEventListener(InteractiveEvent.Down, this.equClick, this);
            this.Tabname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tabname", 26, 14, 100, 20);
            $container.addChild(this.Tabname);
        };
        Object.defineProperty(TeamTypeTabListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
                if (val) {
                    var bb = new team.TeamEvent(team.TeamEvent.SELECT_TEAMTYPE_PANEL);
                    bb.data = this.itdata.data;
                    ModuleEventManager.dispatchEvent(bb);
                }
            },
            enumerable: true,
            configurable: true
        });
        TeamTypeTabListRender.prototype.drawTab = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.Tabbg.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("Selectbg");
            }
            else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("Unselectbg");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        TeamTypeTabListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                this.drawTab();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, vo.tab.tab.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        };
        TeamTypeTabListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        TeamTypeTabListRender.prototype.equClick = function () {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        };
        TeamTypeTabListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Tabbg);
            UiDraw.clearUI(this.Tabname);
        };
        return TeamTypeTabListRender;
    }(SListItem));
    team.TeamTypeTabListRender = TeamTypeTabListRender;
})(team || (team = {}));
//# sourceMappingURL=ChgTeamType.js.map