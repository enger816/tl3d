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
var treasure;
(function (treasure) {
    var TreasureTip = /** @class */ (function (_super) {
        __extends(TreasureTip, _super);
        function TreasureTip() {
            var _this = _super.call(this) || this;
            _this._fbID = 0;
            _this._buttonType = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this._bgRender = new UIRenderComponent();
            _this._nextRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this.addRender(_this._baseRender);
            //this.addRender(this._nextRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            _this._baseRender.uiAtlas.setInfo("ui/uidata/treasure/tip.xml", "ui/uidata/treasure/tip.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TreasureTip.prototype.show = function ($id, buttonType) {
            this._fbID = $id;
            this._buttonType = buttonType;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (this._bgRender.uiAtlas) {
                this.refresh();
            }
        };
        TreasureTip.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        TreasureTip.prototype.loadConfigCom = function () {
            var _this = this;
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this.t_basebg = this.addChild(this._bgRender.getComponent("t_basebg"));
            this.t_basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
            this.t_basebg.addEventListener(InteractiveEvent.Up, function () { _this.hide(); }, this);
            this.addUIList(["t_bg", "t_btn_bg"], this._bgRender);
            this.btn = this.addChild(this._baseRender.getComponent("t_btn"));
            this.btn.goToAndStop(0);
            this.btn.addEventListener(InteractiveEvent.Up, this.click, this);
            this.addChild(this._baseRender.getComponent("t_line"));
            this.fbIcon = this.addChild(this._baseRender.getComponent("t_icon_fb"));
            this.skillIcon = this.addChild(this._baseRender.getComponent("t_icon_skill"));
            this.fbName = this.addChild(this._baseRender.getComponent("t_fb_name"));
            this.fbType = this.addChild(this._baseRender.getComponent("t_fb_type"));
            this.skillName = this.addChild(this._baseRender.getComponent("t_skill_name"));
            this.skilladd = this.addChild(this._baseRender.getComponent("t_skill_info"));
            this.skillZl = this.addChild(this._baseRender.getComponent("t_zl"));
            this.skillInfo = this.addChild(this._baseRender.getComponent("t_info"));
            if (this._fbID > 0) {
                this.refresh();
            }
        };
        TreasureTip.prototype.click = function ($e) {
            if (this._buttonType == 0) {
                UIManager.popClikNameFun("t_basebg");
                //佩戴
                if (this.hasempty()) {
                    if (this.getslotid(this._fbID) == -1) {
                        NetManager.getInstance().protocolos.talisman_equip(this._fbID);
                        this.hide();
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "已装备该法宝", 99);
                    }
                }
                else {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "槽位装满，无法装备", 99);
                }
            }
            else {
                //卸下
                var slotid = this.getslotid(this._fbID);
                NetManager.getInstance().protocolos.talisman_unequip(slotid);
                this.hide();
            }
        };
        TreasureTip.prototype.hasempty = function () {
            var aaa = GuidData.grow.gettalismanslotlist();
            for (var i = 0; i < aaa.length; i++) {
                if (aaa[i].state == 1 && aaa[i].treasureid == 0) {
                    return true;
                }
            }
            return false;
        };
        TreasureTip.prototype.getslotid = function ($id) {
            var ary = GuidData.grow.gettalismanslotlist();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].treasureid == $id) {
                    return ary[i].slotid;
                }
            }
            return -1;
        };
        TreasureTip.prototype.refresh = function () {
            this.btn.goToAndStop(this._buttonType);
            var fbObj = TableData.getInstance().getData(TableData.tb_talisman_base, this._fbID);
            var skillObj = TableData.getInstance().getData(TableData.tb_skill_base, fbObj.passiveskill[0][0]);
            var skillLevObj = TableData.getInstance().getData(TableData.tb_skill_uplevel, skillObj.uplevel_id[0]);
            IconManager.getInstance().drawCircleIcon(this.fbIcon, 1, fbObj.id);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.fbName.skinName, fbObj.name, 18, TextAlign.LEFT, getColorQua(fbObj.quality));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.fbType.skinName, getQuaName(fbObj.quality) + "法宝", 14, TextAlign.LEFT, ColorType.coloraa874a);
            IconManager.getInstance().drawCircleIcon(this.skillIcon, 2, skillObj.id);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skillName.skinName, skillObj.name, 18, TextAlign.LEFT, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skilladd.skinName, "(佩戴后生效)", 14, TextAlign.LEFT, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skillZl.skinName, ColorType.coloraa874a + "技能战力：" + ColorType.colorfde87e + skillLevObj.fight_value, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skillInfo.skinName, tb.SkillDataVo.getSkillDesc(fbObj.passiveskill[0][0], fbObj.passiveskill[0][1]), 14, TextAlign.LEFT, ColorType.colord6e7ff);
        };
        TreasureTip.prototype.refreshIconName = function () {
        };
        TreasureTip.prototype.initBase = function () {
        };
        return TreasureTip;
    }(UIConatiner));
    treasure.TreasureTip = TreasureTip;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureTip.js.map