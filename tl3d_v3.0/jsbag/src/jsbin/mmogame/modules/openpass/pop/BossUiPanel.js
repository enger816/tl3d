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
var pass;
(function (pass) {
    var BossUiPanel = /** @class */ (function (_super) {
        __extends(BossUiPanel, _super);
        function BossUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.setBlackBg();
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._faceRender = new UIRenderComponent();
            _this.addRender(_this._faceRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        BossUiPanel.prototype.dispose = function () {
            this._faceRender.dispose();
            this._faceRender = null;
            this._midRender.dispose();
            this._midRender = null;
            _super.prototype.dispose.call(this);
        };
        BossUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/openpass/openpass.xml", "ui/uidata/openpass/openpass.png", function () { _this.loadConfigCom(); });
        };
        BossUiPanel.prototype.loadConfigCom = function () {
            this._faceRender.uiAtlas = this._midRender.uiAtlas;
            this.addUIList(["c_title", "c_titlebg0", "c_titlebg1", "c_titlebg2", "c_rolebg", "c_forcebg"], this._midRender);
            this.addUIList(["c_txt0", "c_txt1", "c_txt2", "c_forcetxt0", "c_forcetxt1"], this._faceRender);
            this.c_btn = this.addEvntButUp("c_btn", this._faceRender);
            this.c_force0 = this.addChild(this._faceRender.getComponent("c_force0"));
            this.c_force1 = this.addChild(this._faceRender.getComponent("c_force1"));
            this.c_desc = this.addChild(this._faceRender.getComponent("c_desc"));
            this.c_arrow = this.addChild(this._faceRender.getComponent("c_arrow"));
            this.resiconAry = new Array;
            for (var i = 0; i < 3; i++) {
                this.resiconAry.push(this.addChild(this._faceRender.getComponent("c_res" + i)));
            }
            this.addBossChar();
            this.applyLoadComplete();
        };
        BossUiPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.e_close:
                    ModuleEventManager.dispatchEvent(new pass.PassEvent(pass.PassEvent.HIDE_BOSS_PANEL));
                    break;
                case this.c_btn:
                    UIManager.popClikNameFun("c_btn");
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (GuidData.player.getForce() < this._curvo["force"]) {
                        AlertUtil.show(ColorType.Brown7a2f21 + "当前您的战斗力" + ColorType.colorcd2000 + GuidData.player.getForce()
                            + ColorType.Brown7a2f21 + "低于BOSS战斗力" + this._curvo["force"] + "\n挑战会受到影响，该BOSS属性会大幅增加\n是否进行挑战？", "提示", function (a) {
                            if (a == 1) {
                                _this.challengeFun();
                            }
                            else {
                                ModulePageManager.openPanel(SharedDef.MODULE_STRENGTH);
                            }
                        }, 2, ["前往挑战", "提升战力"]);
                    }
                    else {
                        this.challengeFun();
                    }
                    break;
                default:
                    break;
            }
        };
        BossUiPanel.prototype.challengeFun = function () {
            NetManager.getInstance().protocolos.enter_stage_instance();
            ModuleEventManager.dispatchEvent(new pass.PassEvent(pass.PassEvent.HIDE_BOSS_PANEL));
        };
        BossUiPanel.prototype.show = function ($vo) {
            this._curvo = $vo;
            UIManager.getInstance().addUIContainer(this);
            var descary = $vo["desc"][0];
            var info = "";
            for (var i = 0; i < descary.length; i++) {
                info += descary[i] + "\n";
            }
            LabelTextFont.writeTextLabel(this._faceRender.uiAtlas, this.c_desc.skinName, info, 16, TextAlign.LEFT, 235, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._faceRender.uiAtlas, this.c_force1.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this._faceRender.uiAtlas, this.c_force0.skinName, Snum($vo["force"]), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            var idx = GuidData.player.getForce() < $vo["force"] ? 1 : 0;
            this.c_arrow.goToAndStop(idx);
            var resary = $vo["basereward"];
            for (var i = 0; i < this.resiconAry.length; i++) {
                if (i < resary.length) {
                    IconManager.getInstance().drawItemIcon60(this.resiconAry[i], resary[i][0], resary[i][1]);
                }
                else {
                    IconManager.getInstance().clearItemEvent(this.resiconAry[i]);
                    UiDraw.clearUI(this.resiconAry[i]);
                }
            }
            //boss模型
            var $tb_creature_template = tb.TB_creature_template.get_TB_creature_template($vo["boss"]);
            this.bossChar.setAvatar($tb_creature_template.avatar);
            this.resize();
        };
        BossUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        BossUiPanel.prototype.addBossChar = function () {
            this.bossChar = new MonsterUIChar();
            this.wintopRender.addModel(this.bossChar);
        };
        BossUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.bossChar) {
                this.bossChar.scale = 2 * UIData.Scale;
                this.bossChar.x = 110 * UIData.Scale;
                this.bossChar.y = -90 * UIData.Scale;
                this.bossChar.resize();
            }
        };
        return BossUiPanel;
    }(WindowMinUi));
    pass.BossUiPanel = BossUiPanel;
})(pass || (pass = {}));
//# sourceMappingURL=BossUiPanel.js.map