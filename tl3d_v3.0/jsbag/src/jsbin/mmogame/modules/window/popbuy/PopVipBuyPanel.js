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
var popbuy;
(function (popbuy) {
    var PopVipBuyPanel = /** @class */ (function (_super) {
        __extends(PopVipBuyPanel, _super);
        function PopVipBuyPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        PopVipBuyPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/window/popbuy/popbuy.xml", "ui/uidata/window/popbuy/popbuy.png", function () { _this.loadConfigCom(); });
        };
        PopVipBuyPanel.prototype.setSizeForPanelUi = function ($ui, $uiName) {
            var temp = this._midRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        };
        PopVipBuyPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.a_cancal = this.addEvntButUp("b_cancal", this._midRender);
            this.a_submit = this.addEvntButUp("b_submit", this._midRender);
            this.a_tittle = this.addChild(this._bottomRender.getComponent("b_tittle"));
            // this.addUIList([""], this._bottomRender);
            this.addChild(this._bottomRender.getComponent("b_txt0"));
            this.b_curnum = this.addChild(this._midRender.getComponent("b_curnum"));
            this.b_nextnum = this._midRender.getComponent("b_nextnum");
            this.b_info = this.addChild(this._midRender.getComponent("b_info"));
            this.b_viptxt1 = this._midRender.getComponent("b_viptxt1");
            this.b_viptxt0 = this.addChild(this._midRender.getComponent("b_viptxt0"));
            this.CurVipAry = new Array;
            this.CurVipAry.push(this.addChild(this._bottomRender.getComponent("b_bg0")));
            this.CurVipAry.push(this.addChild(this._midRender.getComponent("b_vip0")));
            this.CurVipAry.push(this.addChild(this._midRender.getComponent("b_txt1")));
            this.NextVipAry = new Array;
            this.NextVipAry.push(this._bottomRender.getComponent("b_bg1"));
            this.NextVipAry.push(this._midRender.getComponent("b_vip1"));
            this.NextVipAry.push(this._bottomRender.getComponent("b_arrow"));
            this.NextVipAry.push(this.b_viptxt1);
            this.NextVipAry.push(this.b_nextnum);
            this.applyLoadComplete();
        };
        PopVipBuyPanel.prototype.refresh = function (value) {
            //console.log(value)
            this.seletEvent = value;
            this.selectNum = 1;
            var info = ColorType.Brownd662c0d + "是否使用" + ColorType.Green2ca937 + this.seletEvent.resoureItem[0][1] + ColorType.Brownd662c0d + getResName(this.seletEvent.resoureItem[0][0]) + "购买" + ColorType.Green2ca937 + "1" + ColorType.Brownd662c0d + "次此副本次数";
            var curnum = ColorType.Brownd662c0d + "今日还可购买" + ColorType.Green2ca937 + this.seletEvent.cutNum + ColorType.Brownd662c0d + "次";
            var $obj = this.seletEvent.data;
            if ($obj) {
                this.setUiListVisibleByItem(this.NextVipAry, true);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_nextnum.skinName, this.seletEvent.Info1, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.b_viptxt1.skinName, String($obj["id"]), ArtFont.num58, TextAlign.LEFT);
            }
            else {
                //达到上限
                this.setUiListVisibleByItem(this.NextVipAry, false);
                this.CurVipAry[0].x = 411;
                this.CurVipAry[1].x = this.CurVipAry[0].x + 25;
                this.CurVipAry[2].x = this.CurVipAry[0].x + 47;
                this.b_viptxt0.x = this.CurVipAry[0].x + 82;
                this.b_curnum.x = this.CurVipAry[0].x - 4;
            }
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.b_viptxt0.skinName, String(GuidData.player.getVipLevel()), ArtFont.num58, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_curnum.skinName, curnum, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_info.skinName, info, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        PopVipBuyPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_submit:
                    this.sendSelectNum();
                    break;
                case this.a_cancal:
                case this.f_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        PopVipBuyPanel.prototype.sendSelectNum = function () {
            var _this = this;
            costRes([this.seletEvent.resoureItem[0][0], this.selectNum], function () {
                _this.seletEvent.SubmitFun(_this.selectNum);
            }, function () {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            });
        };
        PopVipBuyPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return PopVipBuyPanel;
    }(WindowPopUi));
    popbuy.PopVipBuyPanel = PopVipBuyPanel;
})(popbuy || (popbuy = {}));
//# sourceMappingURL=PopVipBuyPanel.js.map