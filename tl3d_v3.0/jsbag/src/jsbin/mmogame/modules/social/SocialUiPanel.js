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
var social;
(function (social) {
    var SocialUiPanel = /** @class */ (function (_super) {
        __extends(SocialUiPanel, _super);
        function SocialUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._PaneltopRender = new UIRenderComponent;
            _this.addRender(_this._PaneltopRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._redPointRender1 = new RedPointRender;
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        SocialUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._PaneltopRender.dispose();
            this._PaneltopRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            this._redPointRender1.dispose();
            this._redPointRender1 = null;
            if (this.socialListPanel) {
                this.socialListPanel.dispose();
                this.socialListPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        SocialUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._publicRender.uiAtlas = WindowUi.winUIAtlas;
            this._baseRender.uiAtlas.setInfo("ui/uidata/social/socialmodel.xml", "ui/uidata/social/socialmodel.png", function () { _this.loadConfigCom(); }, "ui/uidata/social/socialpc.png");
        };
        SocialUiPanel.prototype.loadConfigCom = function () {
            this.winmidRender.uiAtlas = this._publicRender.uiAtlas;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._PaneltopRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._topRender;
            this.initUI(renderLevel);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bottomRender);
            var cnew_line = this.addChild(this._publicRender.getComponent("cnew_line"));
            this.setSizeForPanelUiCopy(cnew_line, "cnew_line", this._bottomRender);
            this.winmidRender.applyObjData();
            this._publicRender.applyObjData();
            this.addUIList(["a_title", "a_1", "a_4", "a_3", "a_2", "line1", "line11", "line111", "line2", "line3"], this._topRender);
            this.listIndex = this.addChild(this._topRender.getComponent("listIndex"));
            this.bottomUiparts = new BottomUiparts();
            this.bottomUiparts.setRender(this._bottomRender, this._baseRender, this._publicRender, this._topRender, this._redPointRender1);
            this.addVirtualContainer(this.bottomUiparts);
            this._redPointRender.getRedPointUI(this, 56, new Vector2D(this.tab_0.x + this.tab_0.width - 5, this.tab_0.y));
            this._redPointRender.getRedPointUI(this, 58, new Vector2D(this.tab_1.x + this.tab_1.width - 5, this.tab_1.y));
            this.applyLoadComplete();
        };
        SocialUiPanel.prototype.initUI = function (renderLevel) {
            this.tab_0 = this.addEvntBut("tab_0", this._bottomRender);
            this.tab_1 = this.addEvntBut("tab_1", this._bottomRender);
        };
        SocialUiPanel.prototype.selecttype = function ($value) {
            if ($value == 0) {
                this.tab_0.selected = true;
                this.tab_1.selected = false;
                this.addRender(this._redPointRender1);
            }
            else {
                this.removeRender(this._redPointRender1);
                this.tab_0.selected = false;
                this.tab_1.selected = true;
                GuidData.social.enemyredstate = false;
            }
            this.selectdata($value);
        };
        SocialUiPanel.prototype.selectdata = function ($value) {
            this.type = $value;
            //处理逻辑
            if (this.bottomUiparts) {
                this.bottomUiparts.resetData($value);
            }
            if (!this.socialListPanel) {
                this.socialListPanel = new social.SocialListPanel(this);
                this.socialListPanel.init(this._baseRender.uiAtlas);
            }
            this.socialListPanel.show(this.type);
        };
        SocialUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(0);
            this.resize();
        };
        SocialUiPanel.prototype.hide = function () {
            // Poppanel.close();
            this.socialListPanel.hide();
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        };
        SocialUiPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        SocialUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.tab_0:
                    this.selecttype(0);
                    break;
                case this.tab_1:
                    this.selecttype(1);
                    break;
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.HIDE_SOCIAL_EVENT));
                    break;
                default:
                    break;
            }
        };
        SocialUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.socialListPanel) {
                this.socialListPanel.left = this.listIndex.parent.x / UIData.Scale + this.listIndex.x;
                this.socialListPanel.top = this.listIndex.parent.y / UIData.Scale + this.listIndex.y;
            }
        };
        return SocialUiPanel;
    }(WindowUi));
    social.SocialUiPanel = SocialUiPanel;
    var BottomUiparts = /** @class */ (function (_super) {
        __extends(BottomUiparts, _super);
        function BottomUiparts() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        BottomUiparts.prototype.setRender = function ($bottomRender, $base, $public, $topRender, $redRender) {
            this._bottomRender = $bottomRender;
            this._publicRender = $public;
            this._topRender = $topRender;
            this._baseRender = $base;
            this._redPointRender = $redRender;
            this.loadConfigCom();
        };
        BottomUiparts.prototype.loadConfigCom = function () {
            var renderLevel = this._topRender;
            this.RevengeList = new Array();
            this.RevengeList.push(renderLevel.getComponent("fC_cishu"));
            this.RevengeList.push(this._baseRender.getComponent("a_txtbg"));
            this.a_btn4 = this.addEvntButUp("a_btn4", renderLevel);
            this.RevengeList.push(this.a_btn4);
            this.FriendList = new Array();
            this.FriendList.push(this._baseRender.getComponent("fra_txt1"));
            this.FriendList.push(renderLevel.getComponent("fra_txt2"));
            this.a_btn1 = this.addEvntButUp("a_btn1", renderLevel);
            this.FriendList.push(this.a_btn1);
            this.a_btn2 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.a_btn2, "a_btn2", renderLevel);
            this.FriendList.push(this.a_btn2);
            this.fri_num = renderLevel.getComponent("fri_num");
            this.FriendList.push(this.fri_num);
            this._redPointRender.getRedPointUI(this, 57, new Vector2D(this.a_btn2.x + this.a_btn2.width, this.a_btn2.y));
            this._publicRender.applyObjData();
        };
        BottomUiparts.prototype.resetData = function ($type) {
            this._type = $type;
            this.setUiListVisibleByItem(this.FriendList, $type == 0);
            this.setUiListVisibleByItem(this.RevengeList, $type != 0);
            if ($type != 0) {
                this.setrevengenum();
            }
            else {
                this.setFriendNum();
            }
        };
        BottomUiparts.prototype.setFriendNum = function () {
            var $tabvo = tb.TB_social_num.get_TB_social_num(GuidData.player.getLevel());
            var str = GuidData.social.getFriendList().length + "/" + $tabvo.num;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.fri_num.skinName, "好友:" + str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        /**
         * 复仇次数
         */
        BottomUiparts.prototype.setrevengenum = function () {
            var tab = tb.TB_enemy_revenge_base.get_TB_enemy_revenge_baseById(1);
            var str = "剩余复仇次数:" + GuidData.player.getSocial_revenge_num() + "/" + tab.daily_revenge_times;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.RevengeList[0].skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        BottomUiparts.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_btn4:
                    //购买复仇次数
                    var tabary = tb.TB_enemy_revenge_buy.get_TB_enemy_revenge_buy();
                    var resary = new Array;
                    for (var i = GuidData.player.getRevengeBuyNum(); i < tabary.length; i++) {
                        resary.push(tabary[i].cost[0]);
                    }
                    var $evt = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL);
                    $evt.resoureItem = resary;
                    // $evt.Type = popbuy.PopBuyType.SPEEDBUILD;
                    $evt.Info1 = "今日仇人挑战可购买";
                    $evt.cutNum = tabary.length - GuidData.player.getRevengeBuyNum();
                    if ($evt.cutNum > 0) {
                        $evt.SubmitFun = function (value) {
                            NetManager.getInstance().protocolos.social_buy_revenge_times(value);
                        };
                        ModuleEventManager.dispatchEvent($evt);
                    }
                    else {
                        msgtip.MsgTipManager.outStrById(22, 58);
                    }
                    break;
                case this.a_btn2:
                    //好友申请
                    //console.log("applyPanel");
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.SHOW_APPLYPANEL_EVENT));
                    break;
                case this.a_btn1:
                    //添加好友
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.SHOW_ADDFRIEND_EVENT));
                    break;
                default:
                    break;
            }
        };
        return BottomUiparts;
    }(UIVirtualContainer));
    social.BottomUiparts = BottomUiparts;
})(social || (social = {}));
//# sourceMappingURL=SocialUiPanel.js.map