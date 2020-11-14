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
var offlinereward;
(function (offlinereward) {
    var OfflineRewardPanel = /** @class */ (function (_super) {
        __extends(OfflineRewardPanel, _super);
        function OfflineRewardPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        OfflineRewardPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/offlinereward/offlinereward.xml", "ui/uidata/adventure/offlinereward/offlinereward.png", function () { _this.loadConfigCom(); });
        };
        OfflineRewardPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.a_submit = this.addEvntButUp("a_submit", this._midRender);
            this.b_close = this.addEvntButUp("b_close", this._topRender);
            this.addChild(this._topRender.getComponent("a_title"));
            this.a_equ = this.addChild(this._topRender.getComponent("a_equ"));
            this.a_exp = this.addChild(this._topRender.getComponent("a_exp"));
            this.a_lev = this.addChild(this._topRender.getComponent("a_lev"));
            this.a_time = this.addChild(this._topRender.getComponent("a_time"));
            this.a_info = this.addChild(this._topRender.getComponent("a_info"));
            this.a_btnname = this.addChild(this._topRender.getComponent("a_btnname"));
            this.applyLoadComplete();
        };
        OfflineRewardPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_submit:
                    if (this._type == 1) {
                        ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_GOLD, 6]);
                    }
                    this.hide();
                    break;
                case this.b_close:
                    this.hide();
                    break;
            }
        };
        OfflineRewardPanel.prototype.hide = function () {
            ModuleEventManager.dispatchEvent(new offlinereward.OfflineRewardEvent(offlinereward.OfflineRewardEvent.HIDE_OFFLINE_REWARD_PANEL));
        };
        OfflineRewardPanel.prototype.refresh = function ($data) {
            //console.log("=============================================$data", $data);
            var sell = $data.reserve & 65535;
            var getnum = $data.reserve >> 16;
            var minutes = $data.reserve2; //已经挂了多少分钟
            var exp = $data.reserve3;
            var level = $data.reserve4;
            var topLevel = $data.reserve5;
            var endtime = GuidData.player.getHangUpTime();
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_lev.skinName, "角色等级: " + level + "~" + topLevel, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_exp.skinName, ColorType.Brown7a2f21 + "获得人物经验: " + ColorType.Green2ca937 + exp, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_equ.skinName, "获得装备: " + getnum + "件(已卖出" + sell + "件)", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            var infostr;
            var btnstr;
            var color;
            if (endtime < 60) {
                this._type = 1;
                infostr = "(当前离线时间不足1小时)";
                btnstr = "前往获取";
                color = ColorType.Redd92200;
            }
            else {
                this._type = 0;
                btnstr = "我知道了";
                infostr = "(角色战力越高离线收益越大)";
                color = ColorType.Brown7a2f21;
            }
            var str = ColorType.Brown7a2f21 + "离线挂机时间: " + float2int(minutes / 60) + "时" + (minutes % 60) + "分(剩余: " + color + float2int(endtime / 60) + "时" + (endtime % 60) + "分" + ColorType.Brown7a2f21 + ")";
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_time.skinName, str, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_info.skinName, infostr, 20, TextAlign.CENTER, ColorType.Redd92200);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_btnname.skinName, btnstr, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        };
        return OfflineRewardPanel;
    }(PopWindowMin));
    offlinereward.OfflineRewardPanel = OfflineRewardPanel;
})(offlinereward || (offlinereward = {}));
//# sourceMappingURL=OfflineRewardPanel.js.map