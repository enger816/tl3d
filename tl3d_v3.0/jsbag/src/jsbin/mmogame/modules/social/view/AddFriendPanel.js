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
    var AddFriendPanel = /** @class */ (function (_super) {
        __extends(AddFriendPanel, _super);
        function AddFriendPanel() {
            var _this = _super.call(this) || this;
            _this.lasttime = 0;
            _this.nextTime = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.setBlackBg();
            //添加好友面板渲染器
            _this._AbgRender = new UIRenderComponent;
            _this.addRender(_this._AbgRender);
            _this._AbottomRender = new UIRenderComponent;
            _this.addRender(_this._AbottomRender);
            _this._AbaseRender = new UIRenderComponent;
            _this.addRender(_this._AbaseRender);
            _this._AtopRender = new UIRenderComponent;
            _this.addRender(_this._AtopRender);
            _this._AbgRender.uiAtlas = new UIAtlas;
            _this.upDataFun = function (t) { _this.update(t); };
            return _this;
        }
        AddFriendPanel.prototype.dispose = function () {
            this._AbgRender.dispose();
            this._AbgRender = null;
            this._AbaseRender.dispose();
            this._AbaseRender = null;
            this._AtopRender.dispose();
            this._AtopRender = null;
            if (this.addfriendList) {
                this.addfriendList.dispose();
                this.addfriendList = null;
            }
            _super.prototype.dispose.call(this);
        };
        AddFriendPanel.prototype.applyLoad = function () {
            var _this = this;
            this._AbottomRender.uiAtlas = WindowUi.winUIAtlas;
            this._AbgRender.uiAtlas.setInfo("ui/uidata/social/socialmodel.xml", "ui/uidata/social/socialmodel.png", function () { _this.loadConfigCom(); }, "ui/uidata/social/socialpc.png");
        };
        AddFriendPanel.prototype.update = function (t) {
            this.setUiListVisibleByItem([this.aF_time], true);
            var currentnum = Math.ceil((this.nextTime - TimeUtil.getTimer()) / 1000);
            if (this._AtopRender) {
                if (this.lasttime != currentnum) {
                    LabelTextFont.writeSingleLabel(this._AtopRender.uiAtlas, this.aF_time.skinName, currentnum + "秒", 14, TextAlign.LEFT, ColorType.colorb96d49);
                    this.lasttime = currentnum;
                }
                if (TimeUtil.getTimer() > this.nextTime) {
                    TimeUtil.removeFrameTick(this.upDataFun);
                    this.setUiListVisibleByItem([this.aF_time], false);
                }
            }
            else {
                TimeUtil.removeFrameTick(this.upDataFun);
            }
        };
        AddFriendPanel.prototype.loadConfigCom = function () {
            this._AbaseRender.uiAtlas = this._AbgRender.uiAtlas;
            this._AtopRender.uiAtlas = this._AbgRender.uiAtlas;
            var renderLevel = this._AtopRender;
            this.a_btn = this.addEvntButUp("a_btn", renderLevel);
            this.aF_refreshbtn = this.addEvntButUp("aF_refreshbtn", renderLevel);
            this.addUIList(["aF_txt3", "aF_txt2", "aF_txt1", "line1111", "line11111", "aF_txt", "line22", "line3_1"], renderLevel);
            this.aF_time = renderLevel.getComponent("aF_time");
            this._a_8 = this.addChild(renderLevel.getComponent("a_8"));
            this.aF_bg1_1 = this.addEvntButUp("aF_bg1_1", this._AbaseRender);
            this.listIndex1 = this.addChild(renderLevel.getComponent("listIndex1"));
            this._msg = "输入玩家昵称或者ID";
            this._type = false;
            this.refreshInputBfun(this._msg, this._type);
            this.applyLoadComplete();
            this.resize();
        };
        AddFriendPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.addfriendList) {
                this.addfriendList.left = this.listIndex1.parent.x / UIData.Scale + this.listIndex1.x;
                this.addfriendList.top = this.listIndex1.parent.y / UIData.Scale + this.listIndex1.y;
            }
        };
        AddFriendPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.addfriendList) {
                this.addfriendList = new social.AddFriendList();
                this.addfriendList.init(this._AbaseRender.uiAtlas);
            }
            this.addfriendList.show();
            this.listrecommend();
            this.resize();
        };
        AddFriendPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.addfriendList.hide();
        };
        AddFriendPanel.prototype.listrecommend = function () {
            if (TimeUtil.getTimer() > this.nextTime) {
                this.nextTime = TimeUtil.getTimer() + 5 * 1000;
                TimeUtil.addFrameTick(this.upDataFun);
                this.addfriendList.recommend();
            }
        };
        AddFriendPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.aF_refreshbtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this.listrecommend();
                    break;
                case this.aF_bg1_1:
                    InputPanel.show(function ($str) { _this.inputBfun($str); }, this._type ? this._msg : "", 0, 12);
                    break;
                case this.a_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this.addFriend();
                    break;
                default:
                    break;
            }
        };
        AddFriendPanel.prototype.addFriend = function () {
            // for (var i: number = 0; i < GameInstance.roleList.length; i++) {
            //     if (GameInstance.roleList[i].unit.isPlayer() && GameInstance.roleList[i] != GameInstance.mainChar) {
            //         NetManager.getInstance().protocolos.social_add_friend(this.itdata.data.guid);
            //         //console.log("发送成功");
            //         var $evt = new social.SocialUiEvent(social.SocialUiEvent.REFRESHADDlIST_EVENT);
            //         $evt.index = this.itdata.id;
            //         ModuleEventManager.dispatchEvent($evt);
            //         break;
            //     }
            // }
            if (this._msg) {
                NetManager.getInstance().protocolos.social_add_friend_byname(this._msg);
                this.inputBfun("");
            }
        };
        AddFriendPanel.prototype.inputBfun = function ($str) {
            if ($str.length > 0) {
                this._type = true;
                this._msg = $str;
            }
            else {
                this._type = false;
                this._msg = "输入玩家昵称或者ID";
            }
            this.refreshInputBfun(this._msg, this._type);
        };
        AddFriendPanel.prototype.refreshInputBfun = function ($str, $type) {
            LabelTextFont.writeSingleLabel(this._AtopRender.uiAtlas, this._a_8.skinName, $str, 16, TextAlign.CENTER, ColorType.colorb96d49);
        };
        return AddFriendPanel;
    }(WindowMinUi));
    social.AddFriendPanel = AddFriendPanel;
})(social || (social = {}));
//# sourceMappingURL=AddFriendPanel.js.map