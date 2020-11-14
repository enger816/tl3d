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
var kuafu;
(function (kuafu) {
    var KuaFu3v3MatchTimePanel = /** @class */ (function (_super) {
        __extends(KuaFu3v3MatchTimePanel, _super);
        function KuaFu3v3MatchTimePanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.updateFun = function (t) { _this.update(t); };
            return _this;
        }
        KuaFu3v3MatchTimePanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        KuaFu3v3MatchTimePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/matchlist3v3.xml", "ui/uidata/kuafu/3v3/matchlist3v3.png", function () { _this.loadConfigCom(); });
        };
        KuaFu3v3MatchTimePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._midRender.getComponent("c_pipei_label"));
            this.addChild(this._bottomRender.getComponent("c_matching"));
            this.addChild(this._midRender.getComponent("c_pipei"));
            this.c_matching_time = this.addChild(this._midRender.getComponent("c_matching_time"));
            this.c_close = this.addEvntBut("c_close", this._midRender);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        KuaFu3v3MatchTimePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    //console.log("kuafu_3v3_cancel_match")
                    NetManager.getInstance().protocolos.kuafu_3v3_cancel_match(SharedDef.KUAFU_TYPE_FENGLIUZHEN);
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        KuaFu3v3MatchTimePanel.prototype.update = function (t) {
            var $time = Math.floor((TimeUtil.getTimer() - this.openTime) / 1000);
            if (this.lastTimeTxt != $time) {
                this.lastTimeTxt = $time;
                var $str = "";
                var $m = Math.floor($time / 60);
                var $s = Math.floor($time % 60);
                $str += $m > 9 ? String($m) : "0" + String($m);
                $str += ":";
                $str += $s > 9 ? String($s) : "0" + String($s);
                ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.c_matching_time.skinName, $str, ArtFont.num1, TextAlign.CENTER);
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.updateFun);
            }
        };
        KuaFu3v3MatchTimePanel.prototype.show = function () {
            if (!this.hasStage) {
                this.openTime = TimeUtil.getTimer();
                UIManager.getInstance().addUIContainer(this);
                TimeUtil.addFrameTick(this.updateFun);
            }
        };
        KuaFu3v3MatchTimePanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return KuaFu3v3MatchTimePanel;
    }(UIPanel));
    kuafu.KuaFu3v3MatchTimePanel = KuaFu3v3MatchTimePanel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3MatchTimePanel.js.map