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
    var KuaFu3v3PkTopPanel = /** @class */ (function (_super) {
        __extends(KuaFu3v3PkTopPanel, _super);
        function KuaFu3v3PkTopPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.center = 0;
            return _this;
        }
        KuaFu3v3PkTopPanel.prototype.setRender = function ($bg, $mid, $top) {
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        };
        KuaFu3v3PkTopPanel.prototype.loadConfigCom = function () {
            this.e_top_bg = this.addEvntBut("e_top_bg", this._bottomRender);
            this.d_top_left_txt = this.addChild(this._midRender.getComponent("d_top_left_txt"));
            this.d_top_right_txt = this.addChild(this._midRender.getComponent("d_top_right_txt"));
            this.d_time_txt = this.addChild(this._midRender.getComponent("d_time_txt"));
            this.e_start_time_bg = this._midRender.getComponent("e_start_time_bg");
            this.e_start_time_txt = this._midRender.getComponent("e_start_time_txt");
            this.e_die_label = this.addChild(this._midRender.getComponent("e_die_label"));
        };
        KuaFu3v3PkTopPanel.prototype.reeee = function () {
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_top_left_txt.skinName, String(kuafu.KuaFu3v3Model.getInstance().killTittleTxt.x), ArtFont.num23, TextAlign.CENTER);
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_top_right_txt.skinName, String(kuafu.KuaFu3v3Model.getInstance().killTittleTxt.y), ArtFont.num23, TextAlign.CENTER);
        };
        KuaFu3v3PkTopPanel.prototype.initTime = function () {
            var stim = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            PopTimeOutUtil.show(PopTimeOutUtil.PLAYGO, stim);
            this.startTime = stim + TimeUtil.getTimer();
            this.endTime = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
            if (this.endTime < 0) {
                this.endTime = 60 * 10000;
            }
            this.endTime += TimeUtil.getTimer();
        };
        KuaFu3v3PkTopPanel.prototype.update = function (t) {
            if (kuafu.KuaFu3v3Model.getInstance().end) {
                return;
            }
            if (TimeUtil.getTimer() < this.startTime) {
                ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_time_txt.skinName, "00:00", ArtFont.num12, TextAlign.CENTER, 4);
            }
            else {
                var $time = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
                if ($time < 0) {
                }
                else {
                    if (this.lastTimeTxt != $time) {
                        this.lastTimeTxt = $time;
                        var $str = "";
                        var $m = Math.floor($time / 60);
                        var $s = Math.floor($time % 60);
                        $str += $m > 9 ? String($m) : "0" + String($m);
                        $str += ":";
                        $str += $s > 9 ? String($s) : "0" + String($s);
                        ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_time_txt.skinName, $str, ArtFont.num12, TextAlign.CENTER, 4);
                    }
                }
            }
            this.setUiListVisibleByItem([this.e_die_label], kuafu.KuaFu3v3Model.getInstance().isSelfDie);
        };
        KuaFu3v3PkTopPanel.testNum = 0;
        return KuaFu3v3PkTopPanel;
    }(UIVirtualContainer));
    kuafu.KuaFu3v3PkTopPanel = KuaFu3v3PkTopPanel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3PkTopPanel.js.map