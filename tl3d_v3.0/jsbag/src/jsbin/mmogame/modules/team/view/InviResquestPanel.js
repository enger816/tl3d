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
    var InviResquestPanel = /** @class */ (function (_super) {
        __extends(InviResquestPanel, _super);
        function InviResquestPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            return _this;
        }
        InviResquestPanel.prototype.dispose = function () {
            this._topRender.dispose();
            this._topRender = null;
            if (this.invitationList) {
                this.invitationList.dispose();
                this.invitationList = null;
            }
            _super.prototype.dispose.call(this);
        };
        InviResquestPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/team/requset.xml", "ui/uidata/team/requset.png", function () { _this.loadConfigCom(); }, "ui/uidata/team/teampc.png");
        };
        InviResquestPanel.prototype.loadConfigCom = function () {
            var renderLevel = this._topRender;
            this.addUIList(["a_baseline", "a_title"], renderLevel);
            this.slistIndex = this.addChild(renderLevel.getComponent("a_index"));
            this.btn = this.addEvntButUp("a_btn", this._topRender);
            this.applyLoadComplete();
        };
        InviResquestPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.invitationList) {
                this.invitationList = new InvitationList();
                this.invitationList.init(this._topRender.uiAtlas);
            }
            this.invitationList.show();
            this.resize();
        };
        InviResquestPanel.prototype.close = function () {
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
            UIManager.getInstance().removeUIContainer(this);
            if (this.invitationList) {
                this.invitationList.hide();
            }
        };
        InviResquestPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    this.close();
                    break;
                case this.btn:
                    team.TeamModel.getInstance().removeAllInvitation();
                    break;
                default:
                    break;
            }
        };
        InviResquestPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.invitationList) {
                this.invitationList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x;
                this.invitationList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y;
            }
        };
        return InviResquestPanel;
    }(WindowMinUi));
    team.InviResquestPanel = InviResquestPanel;
    /**
     * 邀请入队伍list
     */
    var InvitationList = /** @class */ (function (_super) {
        __extends(InvitationList, _super);
        function InvitationList() {
            var _this = _super.call(this) || this;
            _this.setShowLevel(6);
            return _this;
        }
        InvitationList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        InvitationList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, InvitationListRender, 588, 315, 0, 57, 5, 512, 512, 1, 8);
        };
        InvitationList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        InvitationList.prototype.resetData = function () {
            var $sListItemData = this.getData(team.TeamModel.getInstance().getInvireqList());
            this.refreshData($sListItemData);
        };
        InvitationList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        };
        InvitationList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return InvitationList;
    }(SList));
    team.InvitationList = InvitationList;
    var InvitationListRender = /** @class */ (function (_super) {
        __extends(InvitationListRender, _super);
        function InvitationListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvitationListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Asbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Asbg", 0, 0, 588, 57);
            $container.addChild(this.Asbg);
            this.Asinfo = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asinfo", 16, 18, 364, 20);
            $container.addChild(this.Asinfo);
            this.Asagreebtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asagreebtn", 391, 5, 71, 45);
            $container.addChild(this.Asagreebtn);
            this.Asagreebtn.addEventListener(InteractiveEvent.Up, this.AgreeEvt, this);
            this.Asrefusebtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asrefusebtn", 497, 5, 71, 45);
            $container.addChild(this.Asrefusebtn);
            this.Asrefusebtn.addEventListener(InteractiveEvent.Up, this.HelpEvt, this);
        };
        InvitationListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Asbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                else {
                    UiDraw.clearUI(this.Asbg);
                }
                var vo = this.itdata.data;
                var tab = tb.TB_group_type.get_TB_group_typeById(vo.type);
                var str = ColorType.Green2ca937 + "Lv." + vo.level + " " + getBaseName(vo.name) + ColorType.White9A683F + "邀请你加入" + ColorType.colorcd2000 + tab.name + ColorType.White9A683F + "队伍!";
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Asinfo.skinName, str, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Asrefusebtn.skinName, "REFUSE");
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Asagreebtn.skinName, "AGREE");
            }
        };
        InvitationListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        InvitationListRender.prototype.HelpEvt = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                NetManager.getInstance().protocolos.group_invite_denied(vo.teamGuid);
                team.TeamModel.getInstance().popInvireqList(vo);
            }
        };
        InvitationListRender.prototype.AgreeEvt = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                NetManager.getInstance().protocolos.group_agree_invite(vo.teamGuid, vo.sender_guid);
                team.TeamModel.getInstance().popInvireqList(vo);
            }
        };
        InvitationListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Asrefusebtn);
            UiDraw.clearUI(this.Asinfo);
            UiDraw.clearUI(this.Asbg);
            UiDraw.clearUI(this.Asagreebtn);
        };
        return InvitationListRender;
    }(SListItem));
    team.InvitationListRender = InvitationListRender;
})(team || (team = {}));
//# sourceMappingURL=InviResquestPanel.js.map