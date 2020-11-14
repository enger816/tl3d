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
    var ConvenientTeam = /** @class */ (function (_super) {
        __extends(ConvenientTeam, _super);
        function ConvenientTeam() {
            var _this = _super.call(this) || this;
            _this._cansend = true;
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
        ConvenientTeam.prototype.dispose = function () {
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
            if (this.convenientList) {
                this.convenientList.dispose();
                this.convenientList = null;
            }
            _super.prototype.dispose.call(this);
        };
        ConvenientTeam.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/team/team.xml", "ui/uidata/team/team.png", function () { _this.loadConfigCom(); }, "ui/uidata/team/teampc.png");
        };
        ConvenientTeam.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this._topupRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.c_index = this.addChild(this._bgRender.getComponent("c_index"));
            this.c_index1 = this.addChild(this._bgRender.getComponent("c_index1"));
            this.addUIList(["c_line1", "c_basebg", "c_title"], this._bgRender);
            this.addUIList(["c_txt0", "c_baseline0", "c_line", "c_txt1", "c_baseline1", "c_txt2"], this._midRender);
            this.addUIList(["c_txt4", "c_txt3", "c_txt5"], this._topRender);
            this.c_autobtn = this.addEvntButUp("cnew_but_operation", this.winmidRender);
            this.setSizeForPanelUiCopy(this.c_autobtn, "c_autobtn", this._midRender);
            this.c_buildbtn = this.addEvntButUp("cnew_but_yes", this.winmidRender);
            this.setSizeForPanelUiCopy(this.c_buildbtn, "c_buildbtn", this._midRender);
            this.c_refrebtn = this.addEvntButUp("cnew_but_yes", this.winmidRender);
            this.setSizeForPanelUiCopy(this.c_refrebtn, "c_refrebtn", this._midRender);
            this.resize();
            this.applyLoadComplete();
        };
        ConvenientTeam.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.c_buildbtn:
                    NetManager.getInstance().protocolos.group_create(this._curTypeVo.tab.tab.id, this._curTypeVo.minlev, this._curTypeVo.maxlev, 1);
                    this.hide();
                    break;
                case this.c_refrebtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this._cansend) {
                        this._cansend = false;
                        this.sendmsg();
                        TimeUtil.addTimeOut(5000, function () {
                            _this._cansend = true;
                        });
                    }
                    else {
                        msgtip.MsgTipManager.outStr("[ff0000]冷却中...", 99);
                    }
                    break;
                case this.c_autobtn:
                    NetManager.getInstance().protocolos.auto_group_match(this._curTypeVo.tab.tab.id);
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        ConvenientTeam.prototype.resetData = function ($tab) {
            this._curTypeVo = $tab;
            this.sendmsg();
        };
        ConvenientTeam.prototype.sendmsg = function () {
            NetManager.getInstance().protocolos.get_group_search_info_list(this._curTypeVo.tab.tab.id);
        };
        ConvenientTeam.prototype.show = function ($tabvo) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (!this.convenientList) {
                this.convenientList = new ConvenientList;
                this.convenientList.init(this._bgRender.uiAtlas);
            }
            if (!this.tablist) {
                this.tablist = new team.TeamTypeTabList;
                this.tablist.init(this._bgRender.uiAtlas);
            }
            this.tablist.show($tabvo);
            this.resize();
        };
        ConvenientTeam.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.tablist) {
                this.tablist.hide();
            }
            if (this.convenientList) {
                this.convenientList.hide();
            }
        };
        ConvenientTeam.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.tablist) {
                this.tablist.left = this.c_index.parent.x / UIData.Scale + this.c_index.x;
                this.tablist.top = this.c_index.parent.y / UIData.Scale + this.c_index.y;
            }
            if (this.convenientList) {
                this.convenientList.left = this.c_index1.parent.x / UIData.Scale + this.c_index1.x;
                this.convenientList.top = this.c_index1.parent.y / UIData.Scale + this.c_index1.y;
            }
        };
        return ConvenientTeam;
    }(WindowMinUi));
    team.ConvenientTeam = ConvenientTeam;
    var ConvenientVo = /** @class */ (function () {
        function ConvenientVo() {
        }
        return ConvenientVo;
    }());
    team.ConvenientVo = ConvenientVo;
    /**
     * 便捷组队list
     */
    var ConvenientList = /** @class */ (function (_super) {
        __extends(ConvenientList, _super);
        function ConvenientList() {
            return _super.call(this) || this;
        }
        ConvenientList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        ConvenientList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, ConvenientListRender, 413, 288, 0, 58, 4, 256, 512, 1, 8);
        };
        ConvenientList.prototype.refreshDataByNewData = function ($id) {
            for (var i = 0; i < this._curAry.length; i++) {
                if ($id == this._curAry[i].data.groupvo.guid) {
                    this._curAry[i].data.isselect = true;
                }
            }
            this.refreshDraw();
        };
        ConvenientList.prototype.getData = function ($aary) {
            var ary = new Array;
            for (var i = 0; i < $aary.length; i++) {
                var vo = new ConvenientVo;
                vo.groupvo = $aary[i];
                vo.isselect = false;
                var item = new SListItemData;
                item.data = vo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        ConvenientList.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var itemDataList = this.getData($data);
            this._curAry = itemDataList;
            this.refreshData(itemDataList);
        };
        ConvenientList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return ConvenientList;
    }(SList));
    team.ConvenientList = ConvenientList;
    var ConvenientListRender = /** @class */ (function (_super) {
        __extends(ConvenientListRender, _super);
        function ConvenientListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConvenientListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Csbtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Csbtn", 305, 7, 106, 47);
            $container.addChild(this.Csbtn);
            this.Csbtn.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Csname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Csname", 24, 20, 100, 20);
            $container.addChild(this.Csname);
            this.Csnum = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Csnum", 185, 20, 50, 20);
            $container.addChild(this.Csnum);
            this.Csbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Csbg", 6, 0, 407, 58);
            $container.addChild(this.Csbg);
        };
        ConvenientListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Csbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.Csbg.skinName);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Csname.skinName, getBaseName(vo.groupvo.cap_name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Csnum.skinName, vo.groupvo.members + "/3", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Csbtn.skinName, vo.isselect ? "ApplyTeamOK" : "ApplyTeam");
            }
        };
        ConvenientListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        ConvenientListRender.prototype.refreshDraw = function () {
            this.render(this.itdata);
        };
        ConvenientListRender.prototype.equClick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.isselect) {
                    return;
                }
                NetManager.getInstance().protocolos.group_join_request(vo.groupvo.guid);
                var bb = new team.TeamEvent(team.TeamEvent.CONVENIENT_SELECT_PANEL);
                bb.data = vo.groupvo.guid;
                ModuleEventManager.dispatchEvent(bb);
            }
        };
        ConvenientListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Csbtn);
            UiDraw.clearUI(this.Csname);
            UiDraw.clearUI(this.Csnum);
            UiDraw.clearUI(this.Csbg);
        };
        return ConvenientListRender;
    }(SListItem));
    team.ConvenientListRender = ConvenientListRender;
})(team || (team = {}));
//# sourceMappingURL=ConvenientTeam.js.map