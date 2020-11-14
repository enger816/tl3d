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
var msgtip;
(function (msgtip) {
    var MsgZhanliPanel = /** @class */ (function (_super) {
        __extends(MsgZhanliPanel, _super);
        function MsgZhanliPanel() {
            var _this = _super.call(this) || this;
            _this.waitTime2000 = 2000;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.frameUpFun = function (t) { _this.upData(t); };
            return _this;
        }
        MsgZhanliPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/msg/zhanli.xml", "ui/uidata/msg/zhanli.png", function () { _this.loadConfigCom(); });
        };
        MsgZhanliPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.a_zanli_txt = this.addChild(this._midRender.getComponent("a_zanli_txt"));
            this.a_up_txt = this.addChild(this._midRender.getComponent("a_up_txt"));
            this.a_jiantou = this.addChild(this._midRender.getComponent("a_jiantou"));
            this.applyLoadComplete();
        };
        MsgZhanliPanel.prototype.upData = function (t) {
            if (this.endTime > TimeUtil.getTimer()) {
                var a = this.forceVect.x;
                var b = this.forceVect.y;
                var tn = ((this.endTime - TimeUtil.getTimer()) / this.waitTime2000);
                tn = 1 - Math.max(0, Math.min((tn - (1 / 5)) * (1 / (3 / 5)), 1));
                var $tnum = MathClass.easeInOut(tn, 0, b - a, 1);
                var $showTxt = String(Math.floor($tnum + a));
                ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, this.a_zanli_txt.skinName, $showTxt, ArtFont.num61, TextAlign.CENTER);
                if (b > a) {
                    this.a_jiantou.goToAndStop(0);
                    ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, this.a_up_txt.skinName, String(Math.floor(b - a)), ArtFont.num61, TextAlign.LEFT);
                }
                else {
                    this.a_jiantou.goToAndStop(1);
                    ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, this.a_up_txt.skinName, String(Math.abs(b - a)), ArtFont.num61, TextAlign.LEFT);
                }
            }
            else {
                this.close();
            }
        };
        MsgZhanliPanel.prototype.close = function () {
            TimeUtil.removeFrameTick(this.frameUpFun);
            UIManager.getInstance().removeUIContainer(this);
        };
        MsgZhanliPanel.prototype.setData = function ($forceVe) {
            this.forceVect = $forceVe;
            this.endTime = TimeUtil.getTimer() + this.waitTime2000;
            TimeUtil.addFrameTick(this.frameUpFun);
        };
        return MsgZhanliPanel;
    }(UIConatiner));
    msgtip.MsgZhanliPanel = MsgZhanliPanel;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgZhanliPanel.js.map