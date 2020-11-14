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
var bottomui;
(function (bottomui) {
    var BottomUiChatPanel = /** @class */ (function (_super) {
        __extends(BottomUiChatPanel, _super);
        function BottomUiChatPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.bottom = 0;
            _this.center = 0;
            return _this;
        }
        BottomUiChatPanel.prototype.setRender = function ($bottom, $mid, $top) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        };
        BottomUiChatPanel.prototype.loadConfigCom = function () {
            this.a_chat_bg = this.addEvntButUp("a_chat_bg", this._bottomRender);
            this.a_chat_bg.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            this.a_chat_msg = this.addChild(this._bottomRender.getComponent("a_chat_msg"));
        };
        BottomUiChatPanel.prototype.setShowChatGrid = function (value) {
            this.setUiListVisibleByItem([this.a_chat_bg, this.a_chat_msg], value);
        };
        BottomUiChatPanel.prototype.restChatList = function () {
            //var $vvv: Array<string> = new Array;
            //$vvv.push("李逍遥获得了绝世神兵赵灵儿加入了家族兵兵绝世神兵");
            //$vvv.push("李逍遥获得了绝世神兵世神兵");
            //$vvv.push("[84d500]赵灵儿加入了家族");
            //$vvv.push("[58e3ff]林月如退出了队伍");
            var $fontSize22 = 22;
            var $rect = this._midRender.uiAtlas.getRec(this.a_chat_msg.skinName);
            var $ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            $ctx.font = (true ? "bolder " : "") + " " + $fontSize22 + "px " + UIData.font; //设置字体大小
            // UiDraw.cxtDrawImg($ctx, PuiData.A_HIGHT_F, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.publicUi);
            var $arr = Chat.ChatModel.getInstance().getLastThreeChatVo();
            console.log("getLastThreeChatVo", $arr);
            var $totalH = 0;
            var weightNum420 = 400;
            for (var i = 0; i < $arr.length; i++) {
                var contxt = "[世界]" + getBaseName($arr[i].s2c_send_chat.name) + ":" + $arr[i].contentTxt;
                var th = FaceFontLabel.getTextHeight($ctx, contxt, $fontSize22, weightNum420);
                //console.log("宽度", TextRegExp.getTextMetrics($ctx, contxt))
                //console.log("高度", th)
                $totalH += th;
                //console.log("$totalH", th)
            }
            var ty = Math.min(3 - $totalH, 0);
            for (var i = 0; i < $arr.length; i++) {
                var $adTxt = "";
                var $color = "#ff0000";
                switch ($arr[i].s2c_send_chat.channel) {
                    case SharedDef.CHAT_TYPE_WORLD:
                        $color = "#ffc13a";
                        $adTxt = "[世界]";
                        break;
                    case SharedDef.CHAT_TYPE_FACTION:
                        $color = "#00b1f1";
                        $adTxt = "[家族]";
                        break;
                    case SharedDef.CHAT_TYPE_CURRENT:
                        $color = "#58e3ff";
                        $adTxt = "[附近]";
                        break;
                    case SharedDef.CHAT_TYPE_SYSTEM:
                        $color = "#58e3ff";
                        $adTxt = "[系统]";
                        break;
                    default:
                        break;
                }
                var contxt = $adTxt + getBaseName($arr[i].s2c_send_chat.name) + ":" + $arr[i].contentTxt;
                ty += FaceFontLabel.writeMultiFaceLineToCtx($ctx, contxt, 22, 0, ty * 32, weightNum420, 10, $color);
            }
            this._midRender.uiAtlas.updateCtx($ctx, $rect.pixelX, $rect.pixelY);
        };
        BottomUiChatPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_chat_bg:
                    ModulePageManager.openPanel(SharedDef.MODULE_CHAT);
                    break;
                default:
                    break;
            }
        };
        return BottomUiChatPanel;
    }(UIVirtualContainer));
    bottomui.BottomUiChatPanel = BottomUiChatPanel;
})(bottomui || (bottomui = {}));
//# sourceMappingURL=BottomUiChatPanel.js.map