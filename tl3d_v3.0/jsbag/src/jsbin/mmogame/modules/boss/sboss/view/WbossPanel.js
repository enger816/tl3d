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
    var WbossPanel = /** @class */ (function (_super) {
        __extends(WbossPanel, _super);
        function WbossPanel() {
            var _this = _super.call(this) || this;
            _this._curid1 = -1;
            _this._curid2 = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        WbossPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._winMidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._midRender = new UIRenderComponent();
            this._midRender.uiAtlas = $uiatlas;
            this.addRender(this._midRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this.initUI();
            this.addSelfRole();
        };
        WbossPanel.prototype.initUI = function () {
            this.initBg();
            this.addUIList(["t_boss_bg1", "t_boss_bg2", "t_right_has_bg"], this._bgRender);
            this.addUIList(["t_title_bg1", "t_title_bg2", "t_reward_l", "t_reward_c", "t_reward_r", "t_reward_l1", "t_reward_c1", "t_reward_r1"], this._midRender);
            this.addUIList(["d_rewardtitle", "d_rewardtitle1"], this._baseRender);
            var ui;
            this.bossName1 = this.addChild(this._baseRender.getComponent("t_boss_name1"));
            this.bossName2 = this.addChild(this._baseRender.getComponent("t_boss_name2"));
            this.rewardAry1 = new Array;
            this.rewardAry2 = new Array;
            for (var i = 0; i < 5; i++) {
                this.rewardAry1.push(this.addChild(this._baseRender.getComponent("t_ba" + i)));
                this.rewardAry2.push(this.addChild(this._baseRender.getComponent("t_bb" + i)));
            }
            this.t_vip_add = this.addChild(this._baseRender.getComponent("t_vip_add"));
            ui = this.addChild(this._baseRender.getComponent("t_boos_desc"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "今日挑战boss从以上怪物中随机，在活动时揭晓", 16, TextAlign.CENTER, ColorType.Green2ca937);
            ui = this.addChild(this._baseRender.getComponent("t_boss_time"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "开启时间：19:00-19:15", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._bgRender.getComponent("t_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.onclick, this);
            this._btnLab = this.addChild(this._baseRender.getComponent("t_btn_lab"));
            this.setBtnLab();
        };
        WbossPanel.prototype.onclick = function ($e) {
            var playType = GuidData.globelValue.getWorldBossState();
            if (playType == SharedDef.WORLD_BOSS_PROCESS_ENROLL) {
                NetManager.getInstance().protocolos.world_boss_enroll();
            }
            else if (playType == SharedDef.WORLD_BOSS_PROCESS_BORN) {
                NetManager.getInstance().protocolos.world_boss_fight();
            }
            else {
                msgtip.MsgTipManager.outStr("世界boss时间未到", 99);
            }
        };
        WbossPanel.prototype.setBtnLab = function () {
            var playType = GuidData.globelValue.getWorldBossState();
            if (playType == SharedDef.WORLD_BOSS_PROCESS_ENROLL) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "报名", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            else if (playType == SharedDef.WORLD_BOSS_PROCESS_BORN) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "挑战", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "未开始", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        };
        WbossPanel.prototype.draw = function () {
            var ids = GuidData.globelValue.getWorldBossId();
            if (this._curid1 != ids[0]) {
                this._curid1 = ids[0];
                var idInfo = TableData.getInstance().getData(TableData.tb_worldboss_base, this._curid1);
                var boss = tb.TB_creature_template.get_TB_creature_template(idInfo.entry);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.bossName1.skinName, boss.name + " LV" + boss.level, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.selfRole1.setAvatar(boss.avatar);
                for (var i = 0; i < this.rewardAry1.length; i++) {
                    if (idInfo.items[i]) {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry1[i], idInfo.items[i], 1);
                    }
                    else {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry1[i], 0, 1);
                    }
                }
            }
            if (this._curid2 != ids[1]) {
                this._curid2 = ids[1];
                var idInfo = TableData.getInstance().getData(TableData.tb_worldboss_base, this._curid2);
                var boss = tb.TB_creature_template.get_TB_creature_template(idInfo.entry);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.bossName2.skinName, boss.name + " LV" + boss.level, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.selfRole2.setAvatar(boss.avatar);
                for (var i = 0; i < this.rewardAry2.length; i++) {
                    if (idInfo.items[i]) {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry2[i], idInfo.items[i], 1);
                    }
                    else {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry2[i], 0, 1);
                    }
                }
            }
        };
        WbossPanel.prototype.initBg = function () {
            this._bgAry = new Array;
            this._bgAry.push(this.addByCopy("cnew_right_bg_top", "t_win_bg1"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_bottom", "t_win_bg2"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_top", "t_win_bg3"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_bottom", "t_win_bg4"));
        };
        WbossPanel.prototype.addByCopy = function ($name1, $name2) {
            var ui = this._winMidRender.getComponent($name1);
            this.setSizeForPanelUiCopy(ui, $name2, this._bgRender);
            return ui;
        };
        WbossPanel.prototype.addSelfRole = function () {
            this.selfRole1 = new MonsterUIChar();
            this._midRender.addModel(this.selfRole1);
            this.selfRole2 = new MonsterUIChar();
            this._midRender.addModel(this.selfRole2);
            //this.selfRole1.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
            //this.selfRole2.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
            //this.selfRole.setBaseRoleWeapon(GuidData.player.getDivineID(), GuidData.player.getCharType());
            this.resize();
        };
        WbossPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.selfRole1) {
                this.selfRole1.resize();
                this.selfRole1.scale = 1.5 * UIData.Scale;
                this.selfRole1.x = 150 * UIData.Scale;
                this.selfRole1.y = -10 * UIData.Scale;
                this.selfRole2.resize();
                this.selfRole2.scale = 1.5 * UIData.Scale;
                this.selfRole2.x = -130 * UIData.Scale;
                this.selfRole2.y = -10 * UIData.Scale;
            }
        };
        WbossPanel.prototype.addWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.addChild(this._bgAry[i]);
            }
        };
        WbossPanel.prototype.removeWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.removeChild(this._bgAry[i]);
            }
        };
        WbossPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            var $obj = TableData.getInstance().getData(TableData.tb_worldboss_time, 1);
            var daliyinfo = ColorType.Brown7a2f21 + "每周";
            for (var i = 0; i < $obj["day"].length; i++) {
                daliyinfo += getDateName($obj["day"][i]);
                if (i < $obj["day"].length - 1) {
                    daliyinfo += ",";
                }
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.t_vip_add.skinName, daliyinfo, 14, TextAlign.CENTER, ColorType.color9a683f);
            if (this._baseUiAtlas) {
                this.addWinmid();
                this.draw();
                this.setBtnLab();
            }
        };
        WbossPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
        };
        return WbossPanel;
    }(UIConatiner));
    sboss.WbossPanel = WbossPanel;
})(sboss || (sboss = {}));
//# sourceMappingURL=WbossPanel.js.map