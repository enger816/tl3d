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
    var BottomUiLeftPanel = /** @class */ (function (_super) {
        __extends(BottomUiLeftPanel, _super);
        function BottomUiLeftPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.left = 0;
            _this.bottom = 0;
            return _this;
        }
        BottomUiLeftPanel.prototype.setRender = function ($bottom, $mid, $top) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        };
        BottomUiLeftPanel.prototype.loadConfigCom = function () {
            this.b_yaogan_bg = this.addChild(this._bottomRender.getComponent("b_yaogan_bg"));
            this.b_yaogan_bar = this.addChild(this._midRender.getComponent("b_yaogan_bar"));
            this.b_qichen = this.addEvntBut("b_qichen", this._bottomRender);
            GameMouseManager.getInstance().setBtn(this.b_yaogan_bar, this.b_yaogan_bg);
        };
        BottomUiLeftPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_qichen:
                    if (GuidData.grow.getMountLevel() == 0) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "坐骑未激活", 99);
                        return;
                    }
                    AotuSkillManager.getInstance().aotuBattle = false;
                    MainCharControlModel.getInstance().ride_mount(GameInstance.mainChar.isMount ? 0 : 1);
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    UIManager.popClikNameFun("f_qichen");
                    break;
                default:
                    break;
            }
        };
        BottomUiLeftPanel.prototype.refresh = function () {
            this.setUiListVisibleByItem([this.b_qichen], GuidData.grow.getMountLevel() > 0);
        };
        return BottomUiLeftPanel;
    }(UIVirtualContainer));
    bottomui.BottomUiLeftPanel = BottomUiLeftPanel;
})(bottomui || (bottomui = {}));
//# sourceMappingURL=BottomUiLeftPanel.js.map