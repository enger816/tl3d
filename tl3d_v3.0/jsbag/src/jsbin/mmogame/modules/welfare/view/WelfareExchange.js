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
var welfare;
(function (welfare) {
    var WelfareExchange = /** @class */ (function (_super) {
        __extends(WelfareExchange, _super);
        function WelfareExchange() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        WelfareExchange.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
        };
        WelfareExchange.prototype.initUiAtlas = function ($uiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        WelfareExchange.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.addChild(this._bottomRender.getComponent("f_info"));
            this.f_txtbg = this.addEvntButUp("f_txtbg", this._bottomRender);
            this.f_txt = this.addChild(renderLevel.getComponent("f_txt"));
            this.f_btn = this.addEvntButUp("f_btn", renderLevel);
        };
        WelfareExchange.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        WelfareExchange.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        };
        WelfareExchange.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        WelfareExchange.prototype.resetData = function () {
            this.resetInputtxt();
            this.resize();
        };
        WelfareExchange.prototype.resetInputtxt = function () {
            this._msg = "";
            this._type = false;
            this.refreshInputBfunGG();
        };
        WelfareExchange.prototype.inputBfunGG = function ($str) {
            var byte = new ByteArray();
            byte.writeUTF($str);
            if (byte.length > 0) {
                this._type = true;
                this._msg = $str;
            }
            else {
                this._type = false;
                this._msg = "";
            }
            this.refreshInputBfunGG();
        };
        WelfareExchange.prototype.refreshInputBfunGG = function () {
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.f_txt.skinName, this._msg, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        WelfareExchange.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.f_txtbg:
                    //输入框
                    InputPanel.show(function ($str) { _this.inputBfunGG($str); }, this._type ? this._msg : "", 0, 320);
                    break;
                case this.f_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    //确定
                    if (this._type) {
                        var byte = new ByteArray();
                        byte.writeUTF(this._msg);
                        if (byte.length > 25) {
                            console.log("=-----byte.length----", byte.length);
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "兑换码不正确", 99);
                            return;
                        }
                        NetManager.getInstance().protocolos.use_giftcode(this._msg);
                        // this.resetInputtxt();
                    }
                    break;
                default:
                    if (evt.target.data[0] == 1) {
                        NetManager.getInstance().protocolos.get_seven_day_recharge_extra_reward(evt.target.data[1]);
                    }
                    else if (evt.target.data[0] == 0) {
                        //查看奖励信息
                        var obj = tb.TB_item_template.get_TB_item_template(evt.target.data[2]);
                        var bag = new BagItemData();
                        bag.entryData = obj;
                        var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                        aa.data = bag;
                        aa.buttonType = -1;
                        ModuleEventManager.dispatchEvent(aa);
                    }
                    break;
            }
        };
        return WelfareExchange;
    }(UIVirtualContainer));
    welfare.WelfareExchange = WelfareExchange;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareExchange.js.map