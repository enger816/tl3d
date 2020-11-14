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
var SkillTip = /** @class */ (function (_super) {
    __extends(SkillTip, _super);
    function SkillTip() {
        var _this = _super.call(this) || this;
        _this.width = 370;
        _this.height = 266;
        _this.center = -115;
        _this.middle = 0;
        _this._baseRender = new UIRenderComponent();
        _this._bgRender = new UIRenderComponent();
        _this.addRender(_this._bgRender);
        _this.addRender(_this._baseRender);
        return _this;
    }
    SkillTip.prototype.setUIAtlas = function ($us) {
        this._uiAtlas = $us;
        this._baseRender.uiAtlas = $us;
        this._bgRender.uiAtlas = $us;
        this.initBase();
    };
    SkillTip.prototype.show = function ($data) {
        this.refresh($data);
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }
    };
    SkillTip.prototype.hide = function () {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }
    };
    SkillTip.prototype.clickEvt = function ($evt) {
        this.hide();
    };
    SkillTip.prototype.refresh = function ($data) {
        this.refreshIcon($data.baseData);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_name.skinName, $data.baseData.name, 18, TextAlign.LEFT, ColorType.colorffecc6);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_val1.skinName, String($data.lev), 16, TextAlign.LEFT, ColorType.colorffecc6);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_val2.skinName, ($data.baseData.is_initiative == 1 ? "主动" : "被动"), 16, TextAlign.LEFT, ColorType.colorfde87e);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_val3.skinName, String($data.levData.fight_value), 16, TextAlign.LEFT, ColorType.colorfde87e);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_txt.skinName, tb.SkillDataVo.getSkillDesc($data.baseData.id, $data.lev), 16, TextAlign.LEFT, ColorType.colorfde87e);
    };
    SkillTip.prototype.refreshIcon = function (objskill) {
        var _this = this;
        var url = getSkillIconUrl(String(objskill.icon));
        IconManager.getInstance().getIcon(url, function ($img) {
            var $rec = _this._baseRender.uiAtlas.getRec(_this._t_icon.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG58, new Rectangle(0, 0, 58, 58), UIData.publicUi);
            ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 50, 50);
            _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
    };
    SkillTip.prototype.initBase = function () {
        var ui;
        this._bg = this._bgRender.getComponent("s_tip_bg");
        this.addChild(this._bg);
        this.addUIList(["s_end_line1", "s_end_line2"], this._baseRender);
        this._t_icon = this._baseRender.getComponent("s_icon");
        this.addChild(this._t_icon);
        this._t_name = this._baseRender.getComponent("s_title");
        this.addChild(this._t_name);
        ui = this._baseRender.getComponent("s_lab1");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "等级:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);
        ui = this._baseRender.getComponent("s_lab2");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "类型:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);
        ui = this._baseRender.getComponent("s_lab3");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "战力:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);
        this._t_val1 = this.addChild(this._baseRender.getComponent("s_val1"));
        this._t_val2 = this.addChild(this._baseRender.getComponent("s_val2"));
        this._t_val3 = this.addChild(this._baseRender.getComponent("s_val3"));
        this._t_txt = this.addChild(this._baseRender.getComponent("s_txt"));
    };
    return SkillTip;
}(UIConatiner));
//# sourceMappingURL=SkillTip.js.map