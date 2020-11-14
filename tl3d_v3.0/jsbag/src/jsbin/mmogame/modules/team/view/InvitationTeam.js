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
    var InvitationTeam = /** @class */ (function (_super) {
        __extends(InvitationTeam, _super);
        function InvitationTeam() {
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
        InvitationTeam.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._topupRender.dispose();
            this._topupRender = null;
            if (this.incitationList) {
                this.incitationList.dispose();
                this.incitationList = null;
            }
            _super.prototype.dispose.call(this);
        };
        InvitationTeam.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/team/team.xml", "ui/uidata/team/team.png", function () { _this.loadConfigCom(); }, "ui/uidata/team/teampc.png");
        };
        InvitationTeam.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this._topupRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.d_index = this.addChild(this._bgRender.getComponent("d_index"));
            this.addUIList(["d_line", "d_basebg", "d_title"], this._bgRender);
            this.addUIList(["d_txt1", "d_txt2", "d_txt0"], this._midRender);
            // this.addUIList(["c_txt4", "c_txt3", "c_txt5"], this._topRender);
            this.TabAry = new Array;
            for (var i = 0; i < 3; i++) {
                var a = this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }
            this.resize();
            this.applyLoadComplete();
        };
        InvitationTeam.prototype.selectedTab = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            this.incitationList.show(team.TeamModel.getInstance().getInvitationList($value));
        };
        InvitationTeam.prototype.click = function (evt) {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        };
        InvitationTeam.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        InvitationTeam.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (!this.incitationList) {
                this.incitationList = new IncitationList;
                this.incitationList.init(this._bgRender.uiAtlas);
            }
            this.selectedTab(0);
            this.resize();
        };
        InvitationTeam.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.incitationList) {
                this.incitationList.hide();
            }
        };
        InvitationTeam.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.incitationList) {
                this.incitationList.left = this.d_index.parent.x / UIData.Scale + this.d_index.x;
                this.incitationList.top = this.d_index.parent.y / UIData.Scale + this.d_index.y;
            }
        };
        return InvitationTeam;
    }(WindowMinUi));
    team.InvitationTeam = InvitationTeam;
    /**
     * 邀请组队list
     */
    var IncitationList = /** @class */ (function (_super) {
        __extends(IncitationList, _super);
        function IncitationList() {
            return _super.call(this) || this;
        }
        IncitationList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        IncitationList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, IncitationListRender, 407, 388, 0, 87, 4, 256, 1024, 1, 8);
        };
        IncitationList.prototype.refreshDataByNewData = function ($id) {
            for (var i = 0; i < this._curAry.length; i++) {
                if ($id == this._curAry[i].data.guid) {
                    this._curAry[i].data.isflag = true;
                }
            }
            this.refreshDraw();
        };
        IncitationList.prototype.getData = function ($aary) {
            var ary = new Array;
            for (var i = 0; i < $aary.length; i++) {
                var item = new SListItemData;
                item.data = $aary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        IncitationList.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var itemDataList = this.getData($data);
            this._curAry = itemDataList;
            this.refreshData(itemDataList);
        };
        IncitationList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return IncitationList;
    }(SList));
    team.IncitationList = IncitationList;
    var IncitationListRender = /** @class */ (function (_super) {
        __extends(IncitationListRender, _super);
        function IncitationListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        IncitationListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Dsbtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dsbtn", 299, 20, 106, 47);
            $container.addChild(this.Dsbtn);
            this.Dsbtn.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Dsicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dsicon", 9, 8, 68, 68);
            $container.addChild(this.Dsicon);
            this.Dsname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dsname", 96, 15, 100, 20);
            $container.addChild(this.Dsname);
            this.Dslev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dslev", 96, 45, 100, 20);
            $container.addChild(this.Dslev);
            this.Dsbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Dsbg", 0, 0, 407, 87);
            $container.addChild(this.Dsbg);
        };
        IncitationListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Dsbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.Dsbg.skinName);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Dsname.skinName, getBaseName(vo.name), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Dslev.skinName, vo.lev + "级", 16, TextAlign.LEFT, ColorType.Green2ca937);
                team.TeamModel.getInstance().loadRolePic(vo.icon, this.Dsicon, vo.online);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Dsbtn.skinName, vo.isflag ? "ApplyTeamOK" : "InvitationTeam");
            }
        };
        IncitationListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        IncitationListRender.prototype.refreshDraw = function () {
            this.render(this.itdata);
        };
        IncitationListRender.prototype.equClick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.isflag) {
                    return;
                }
                if (!vo.online) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "玩家不在线", 99);
                    return;
                }
                if (!GuidData.team) {
                    //如果没有队伍。先创建队伍
                    ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.BUILD_TEAM_PANEL));
                }
                NetManager.getInstance().protocolos.group_send_invite(vo.guid);
                var bb = new team.TeamEvent(team.TeamEvent.CONVENIENT_SELECT_PANEL);
                bb.data = vo.guid;
                ModuleEventManager.dispatchEvent(bb);
            }
        };
        IncitationListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Dsbtn);
            UiDraw.clearUI(this.Dsname);
            UiDraw.clearUI(this.Dslev);
            UiDraw.clearUI(this.Dsbg);
            UiDraw.clearUI(this.Dsicon);
        };
        return IncitationListRender;
    }(SListItem));
    team.IncitationListRender = IncitationListRender;
})(team || (team = {}));
//# sourceMappingURL=InvitationTeam.js.map