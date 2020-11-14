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
var boss;
(function (boss) {
    var BossViewPanel = /** @class */ (function (_super) {
        __extends(BossViewPanel, _super);
        function BossViewPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._baseUiAtlas = new UIAtlas;
            _this.setBlackBg();
            return _this;
        }
        BossViewPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/boss/bossview.xml", "ui/uidata/boss/bossview.png", function () { _this.loadConfigCom(); });
        };
        BossViewPanel.prototype.loadConfigCom = function () {
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this.addBossChar();
            this.uiAtlasComplet = true;
            this.initUI();
            this.applyLoadComplete();
        };
        BossViewPanel.prototype.initUI = function () {
            this.addUIList(["t_bg1"], this.winmidRender);
            this.addUIList(["t_name_bg", "t_bg3", "t_bg2", "t_win_title"], this._bgRender);
            var drop = this._baseRender.getComponent("t_drop");
            this.addChild(drop);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, drop.skinName, "关卡掉落", 14, TextAlign.CENTER, ColorType.colorb96d49);
            this.addChild(this._baseRender.getComponent("t_namebg"));
            this.mapLab = this._baseRender.getComponent("t_gk");
            this.addChild(this.mapLab);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mapLab.skinName, "虎牢关-1", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.nameLab = this._baseRender.getComponent("t_name");
            this.addChild(this.nameLab);
            this.bangIcon = this._baseRender.getComponent("t_bang");
            this.bangIcon.addEventListener(InteractiveEvent.Down, this.showrankPanel, this);
            //this.addChild(this.bangIcon);
            this.submitBtn = this._baseRender.getComponent("t_btn");
            this.submitBtn.addEventListener(InteractiveEvent.Up, this.submit, this);
            this.addChild(this.submitBtn);
            this.rewardList = new Array;
            for (var i = 0; i < 6; i++) {
                var rewarui = this._baseRender.getComponent("t_reward" + i);
                this.addChild(rewarui);
                this.rewardList.push(rewarui);
                //IconManager.getInstance().drawItemIcon60(this.rewardList[i], 0, 0);
            }
        };
        BossViewPanel.prototype.showrankPanel = function () {
            if (this._data && this._data.rankFun) {
                this._data.rankFun();
            }
        };
        BossViewPanel.prototype.addBossChar = function () {
            this.bossChar = new MonsterUIChar();
            this.wintopRender.addModel(this.bossChar);
        };
        BossViewPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
                    this.hide();
            }
        };
        BossViewPanel.prototype.submit = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._data && this._data.submitFun) {
                this._data.submitFun();
                this.hide();
            }
        };
        BossViewPanel.prototype.refresh = function () {
            var $bossId = this._data.bossID;
            var $tb_creature_template = tb.TB_creature_template.get_TB_creature_template($bossId);
            var $bossName = $tb_creature_template.name;
            if (this._data.checkpoint && this._data.checkpoint.length > 0) {
                $bossName = this._data.checkpoint;
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nameLab.skinName, $bossName, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.bossChar.setAvatar($tb_creature_template.avatar);
            if (this._data.showRank) {
                if (!this.bangIcon.parent) {
                    this.addChild(this.bangIcon);
                }
            }
            else {
                if (this.bangIcon.parent) {
                    this.removeChild(this.bangIcon);
                }
            }
            if (this._data.force) {
                var colorstr = this._data.force > GuidData.player.getForce() ? ColorType.colorce0a00 : ColorType.color2daa35;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mapLab.skinName, ColorType.color9a683f + "推荐战力：" + colorstr + this._data.force, 14, TextAlign.CENTER);
            }
            else {
                UiDraw.clearUI(this.mapLab);
            }
            if (this._data.rewardList) {
                for (var i = 0; i < this.rewardList.length; i++) {
                    if (this._data.rewardList[i]) {
                        IconManager.getInstance().drawItemIcon60(this.rewardList[i], this._data.rewardList[i][0], this._data.rewardList[i][1]);
                    }
                    else {
                        IconManager.getInstance().drawItemIcon60(this.rewardList[i], 0, 5);
                    }
                }
            }
            else {
                for (var i = 0; i < this.rewardList.length; i++) {
                    IconManager.getInstance().drawItemIcon60(this.rewardList[i], 0, 5);
                }
            }
        };
        BossViewPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.bossChar) {
                this.bossChar.scale = 1.5 * UIData.Scale;
                this.bossChar.x = 0 * UIData.Scale;
                this.bossChar.y = -20 * UIData.Scale;
                this.bossChar.resize();
            }
        };
        BossViewPanel.prototype.drawReward = function () {
        };
        BossViewPanel.prototype.show = function ($data) {
            UIManager.getInstance().addUIContainer(this);
            this._data = $data;
            this.refresh();
        };
        BossViewPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this._data.rankFun = null;
            this._data.submitFun = null;
            this._data = null;
        };
        return BossViewPanel;
    }(WindowMinUi));
    boss.BossViewPanel = BossViewPanel;
    var BossViewData = /** @class */ (function () {
        function BossViewData() {
        }
        return BossViewData;
    }());
    boss.BossViewData = BossViewData;
})(boss || (boss = {}));
//# sourceMappingURL=BossViewPanel.js.map