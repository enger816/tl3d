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
    var PopBuyPanel = /** @class */ (function (_super) {
        __extends(PopBuyPanel, _super);
        function PopBuyPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.isEnough = false;
            _this.selectNum = 1;
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
        PopBuyPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/window/popbuy/popbuy.xml", "ui/uidata/window/popbuy/popbuy.png", function () { _this.loadConfigCom(); });
        };
        PopBuyPanel.prototype.setSizeForPanelUi = function ($ui, $uiName) {
            var temp = this._midRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        };
        PopBuyPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.a_cancal = this.addEvntButUp("a_cancal", this._midRender);
            this.a_submit = this.addEvntButUp("a_submit", this._midRender);
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.addChild(this._bottomRender.getComponent("a_tatol_label"));
            this.addChild(this._bottomRender.getComponent("a_num_bg1"));
            this.addChild(this._bottomRender.getComponent("a_num_bg0"));
            this.a_info_tittle = this.addChild(this._bottomRender.getComponent("a_info_tittle"));
            this.a_tittle = this.addChild(this._bottomRender.getComponent("a_tittle"));
            this.a_sub_but = this.addEvntButUp("a_sub_but", this._bottomRender);
            this.a_add_but = this.addEvntButUp("a_add_but", this._bottomRender);
            this.a_res_icon = this.addChild(this._topRender.getComponent("a_res_icon"));
            this.a_need_money = this.addChild(this._topRender.getComponent("a_need_money"));
            this.a_select_num = this.addChild(this._topRender.getComponent("a_select_num"));
            this.uiAtlasComplet = true;
            this.a_info2 = this.addChild(this._topRender.getComponent("a_buildinfo"));
            this.applyLoadComplete();
        };
        PopBuyPanel.prototype.refresh = function (value) {
            //console.log(value)
            this.selectNum = 1;
            this.seletEvent = value;
            this.drawLabelNum();
        };
        PopBuyPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_sub_but:
                    this.toPrent();
                    break;
                case this.a_add_but:
                    this.toNext();
                    break;
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
        PopBuyPanel.prototype.sendSelectNum = function () {
            var _this = this;
            costRes([this.seletEvent.resoureItem[0][0], this._totalNum], function () {
                _this.seletEvent.SubmitFun(_this.selectNum);
            }, function () {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            });
            // if (this.isEnough) {
            //     this.hide();
            //     this.seletEvent.SubmitFun(this.selectNum);
            // } else {
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            // }
        };
        PopBuyPanel.prototype.drawLabelNum = function () {
            var $max = this.seletEvent.cutNum;
            var $k = ColorType.Orange853d07 + this.seletEvent.Info1 + ColorType.colorce0a00 + $max + ColorType.Orange853d07 + "次";
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_info_tittle.skinName, $k, 18, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_info2.skinName, ColorType.Orange853d07 + this.seletEvent.Info2, 16, TextAlign.CENTER);
            this.selectNum = Math.max(0, this.selectNum);
            this.selectNum = Math.min($max, this.selectNum);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_select_num.skinName, ColorType.Orange853d07 + String(this.selectNum), 18, TextAlign.CENTER);
            var $totalNum = 0;
            for (var i = 0; i < this.selectNum; i++) {
                if (this.seletEvent.resoureItem.length > 1) {
                    var $kNum = this.seletEvent.resoureItem.length - $max;
                    $totalNum += this.seletEvent.resoureItem[i + $kNum][1];
                }
                else {
                    $totalNum += this.seletEvent.resoureItem[0][1];
                }
            }
            this._totalNum = $totalNum;
            var $resType = this.seletEvent.resoureItem[0][0];
            UiDraw.uiAtlasDrawImg(this._midRender.uiAtlas, this.a_res_icon.skinName, UIData.publicUi, UIuitl.getInstance().costtype($resType));
            var $hasNum = 0;
            $hasNum = GuidData.player.getResType($resType);
            this.isEnough = $hasNum >= $totalNum;
            //console.log($resType, $hasNum, "/", $totalNum);
            var $color = this.isEnough ? ColorType.Orange853d07 : ColorType.colorce0a00;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_need_money.skinName, $color + String($totalNum), 18, TextAlign.CENTER);
        };
        PopBuyPanel.prototype.toPrent = function () {
            this.selectNum--;
            this.drawLabelNum();
        };
        PopBuyPanel.prototype.toNext = function () {
            this.selectNum++;
            this.drawLabelNum();
        };
        PopBuyPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return PopBuyPanel;
    }(WindowPopUi));
    popbuy.PopBuyPanel = PopBuyPanel;
})(popbuy || (popbuy = {}));
//# sourceMappingURL=PopBuyPanel.js.map