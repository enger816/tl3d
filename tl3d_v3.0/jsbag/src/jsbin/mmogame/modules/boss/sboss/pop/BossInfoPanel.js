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
var sboss;
(function (sboss) {
    var BossInfoPanel = /** @class */ (function (_super) {
        __extends(BossInfoPanel, _super);
        function BossInfoPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        BossInfoPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            _super.prototype.dispose.call(this);
        };
        BossInfoPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/boss/bosshow.xml", "ui/uidata/boss/bosshow.png", function () { _this.loadConfigCom(); });
        };
        BossInfoPanel.prototype.loadConfigCom = function () {
            this._roleRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this.addUIList(["t_title", "t_bg", "t_bg2"], this._roleRender);
            this.t_name = this.addChild(this._topRender.getComponent("t_name"));
            this.uiary = new Array;
            for (var i = 0; i < 6; i++) {
                this.uiary.push(this.addChild(this._topRender.getComponent("t_lab" + i)));
            }
            this.addBossChar();
            this.resize();
            this.applyLoadComplete();
        };
        BossInfoPanel.prototype.addBossChar = function () {
            this.bossChar = new MonsterUIChar();
            this._roleRender.addModel(this.bossChar);
        };
        BossInfoPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.bossChar) {
                this.bossChar.resize();
                this.bossChar.scale = 1.8 * UIData.Scale;
                this.bossChar.x = 1 * UIData.Scale;
                this.bossChar.y = -70 * UIData.Scale;
            }
        };
        BossInfoPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        BossInfoPanel.prototype.show = function ($tb) {
            UIManager.getInstance().addUIContainer(this);
            var $tb_Vo = tb.TB_creature_template.get_TB_creature_template($tb.bossEntry);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_name.skinName, $tb_Vo.name + " Lv" + $tb_Vo.level, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.bossChar.setAvatar($tb_Vo.avatar);
            for (var i = 0; i < 6; i++) {
                if ($tb.props.length > i) {
                    UiDraw.drawAttVal(this.uiary[i], $tb.props[i][0], $tb.props[i][1]);
                }
                else {
                    UiDraw.clearUI(this.uiary[i]);
                }
            }
            this.resize();
        };
        BossInfoPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return BossInfoPanel;
    }(WindowCentenMin));
    sboss.BossInfoPanel = BossInfoPanel;
})(sboss || (sboss = {}));
//# sourceMappingURL=BossInfoPanel.js.map