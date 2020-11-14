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
var adventurebossnotice;
(function (adventurebossnotice) {
    var AdventureBossNoticePanel = /** @class */ (function (_super) {
        __extends(AdventureBossNoticePanel, _super);
        function AdventureBossNoticePanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.rewardUiArr = new Array;
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
        AdventureBossNoticePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/adventurebossnotice/adventurebossnotice.xml", "ui/uidata/adventure/adventurebossnotice/adventurebossnotice.png", function () { _this.loadConfigCom(); });
        };
        AdventureBossNoticePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._topRender.getComponent("a_tittle"));
            this.addChild(this._topRender.getComponent("a_reward_tittle"));
            this.a_boss_name_txt = this.addChild(this._topRender.getComponent("a_boss_name_txt"));
            this.addChild(this._midRender.getComponent("a_boss_name_bg"));
            this.addChild(this._midRender.getComponent("a_line0"));
            this.addChild(this._midRender.getComponent("a_reward_bg"));
            this.addChild(this._midRender.getComponent("a_line1"));
            this.a_submit = this.addEvntBut("a_submit", this._bottomRender);
            this.addBossChar();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        AdventureBossNoticePanel.prototype.addBossChar = function () {
            this.bossChar = new MonsterUIChar();
            this._bottomRender.addModel(this.bossChar);
        };
        AdventureBossNoticePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_submit:
                    UIManager.popClikNameFun("a_submit");
                    NetManager.getInstance().protocolos.challange_boss();
                    break;
                default:
                    ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
                    break;
            }
            this.hide();
        };
        AdventureBossNoticePanel.prototype.refresh = function () {
            var $tb = adventure.AdventureModel.getInstance().getCurBossTb();
            this.clearRewardUi();
            for (var i = 0; i < $tb.showitems.length; i++) {
                var $ui = this.addChild(this._topRender.getComponent("a_boss_reward_frame"));
                $ui.goToAndStop(i);
                $ui.x = i * 70 + 440 - (($tb.showitems.length - 1) / 5 * 170);
                this.rewardUiArr.push($ui);
                this.drawRewardIconCtx($ui, $tb.showitems[i]);
            }
            //  var $bossName: string = "青螺山1-BOSS";
            var $bossId = $tb.bossId;
            if (!$bossId) {
                $bossId = 40001;
            }
            var $tb_creature_template = tb.TB_creature_template.get_TB_creature_template($bossId);
            var $bossName = $tb.name.replace("BOSS", $tb_creature_template.name);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_boss_name_txt.skinName, $bossName, 16, TextAlign.CENTER, ColorType.color843b11);
            this.bossChar.setAvatar($tb_creature_template.avatar);
        };
        AdventureBossNoticePanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.bossChar) {
                this.bossChar.scale = 1.5 * UIData.Scale;
                this.bossChar.x = 0 * UIData.Scale;
                this.bossChar.y = 0 * UIData.Scale;
                this.bossChar.resize();
            }
        };
        AdventureBossNoticePanel.prototype.drawRewardIconCtx = function ($ui, $id) {
            var _this = this;
            $ui.data = $id;
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($id), function ($img) {
                var $skillrec = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
                UiDraw.cxtDrawImg($ctx, PuiData.NewPicBg, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                $ctx.drawImage($img, 0, 0, 60, 60, 6, 6, 56, 56);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        AdventureBossNoticePanel.prototype.clearRewardUi = function () {
            while (this.rewardUiArr.length) {
                this.removeChild(this.rewardUiArr.pop());
            }
        };
        AdventureBossNoticePanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.refresh();
        };
        AdventureBossNoticePanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return AdventureBossNoticePanel;
    }(WindowCentenMin));
    adventurebossnotice.AdventureBossNoticePanel = AdventureBossNoticePanel;
})(adventurebossnotice || (adventurebossnotice = {}));
//# sourceMappingURL=AdventureBossNoticePanel.js.map