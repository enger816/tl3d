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
var faction;
(function (faction) {
    var InvitationPanel = /** @class */ (function (_super) {
        __extends(InvitationPanel, _super);
        function InvitationPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            return _this;
        }
        InvitationPanel.prototype.dispose = function () {
            this._topRender.dispose();
            this._topRender = null;
            if (this.invitationList) {
                this.invitationList.dispose();
                this.invitationList = null;
            }
            _super.prototype.dispose.call(this);
        };
        InvitationPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/invitation/fac_invitation.xml", "ui/uidata/faction/invitation/fac_invitation.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
            // });
        };
        InvitationPanel.prototype.loadConfigCom = function () {
            var renderLevel = this._topRender;
            this.addUIList(["a_title", "a_line", "a_btntxt"], renderLevel);
            this.slistIndex = this.addChild(renderLevel.getComponent("slistIndex"));
            this.btn = this.addEvntBut("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.btn, "btn", renderLevel);
            this._publicbgRender.applyObjData();
            this.applyLoadComplete();
        };
        InvitationPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.invitationList) {
                this.invitationList = new InvitationList();
                this.invitationList.init(this._topRender.uiAtlas);
            }
            this.invitationList.show();
            this.resize();
        };
        InvitationPanel.prototype.close = function () {
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
            UIManager.getInstance().removeUIContainer(this);
            if (this.invitationList) {
                this.invitationList.hide();
            }
        };
        InvitationPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    this.close();
                    break;
                case this.btn:
                    faction.FactionModel.getInstance().chgInvitationList_clear();
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.INVITATION_CHG_EVENT));
                    break;
                default:
                    break;
            }
        };
        InvitationPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.invitationList) {
                this.invitationList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x;
                this.invitationList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y;
            }
        };
        return InvitationPanel;
    }(WindowMinUi));
    faction.InvitationPanel = InvitationPanel;
    /**
     * 邀请入家族list
     */
    var InvitationList = /** @class */ (function (_super) {
        __extends(InvitationList, _super);
        function InvitationList() {
            var _this = _super.call(this) || this;
            _this.left = 184;
            _this.top = 99;
            _this.setShowLevel(6);
            return _this;
        }
        InvitationList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        InvitationList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, InvitationListRender, 593, 308, 0, 84, 3, 512, 512, 1, 6);
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
            var $sListItemData = this.getData(faction.FactionModel.getInstance().getInvitationList());
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
    faction.InvitationList = InvitationList;
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
            this.Aslist_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Aslist_bg", 0, 0, 593, 84);
            $container.addChild(this.Aslist_bg);
            this.Aslist_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Aslist_info", 33, 32, 438, 20);
            $container.addChild(this.Aslist_info);
            this.Aslist_btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Aslist_btn", 498, 19, 71, 45);
            $container.addChild(this.Aslist_btn);
            this.Aslist_btn.addEventListener(InteractiveEvent.Up, this.HelpEvt, this);
        };
        InvitationListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Aslist_bg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                var vo = this.itdata.data;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Aslist_info.skinName, ColorType.Brown7a2f21 + getBaseName(vo.name) + ColorType.color9a683f + "邀请你加入" + ColorType.Brown7a2f21 + getBaseName(vo.faction_name) + ColorType.color9a683f + ",共同闯荡江湖。", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Aslist_btn.skinName, "Agree");
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
            var vo = this.itdata.data;
            NetManager.getInstance().protocolos.faction_join(vo.faction_guid);
            faction.FactionModel.getInstance().chgInvitationList_remove(vo);
            //刷新一下数据源
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.INVITATION_CHG_EVENT));
        };
        InvitationListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Aslist_btn);
            UiDraw.clearUI(this.Aslist_info);
            UiDraw.clearUI(this.Aslist_bg);
        };
        return InvitationListRender;
    }(SListItem));
    faction.InvitationListRender = InvitationListRender;
})(faction || (faction = {}));
//# sourceMappingURL=invitationPanel.js.map