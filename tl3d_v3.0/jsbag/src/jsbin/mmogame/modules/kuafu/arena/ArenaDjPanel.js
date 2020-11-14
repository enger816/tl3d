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
    var ArenaDjPanel = /** @class */ (function (_super) {
        __extends(ArenaDjPanel, _super);
        function ArenaDjPanel() {
            var _this = _super.call(this) || this;
            _this._lastTime = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        ArenaDjPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);
            this.initUI();
        };
        ArenaDjPanel.prototype.initUI = function () {
            this._shopBtn = this.addChild(this._baseRender.getComponent("a_icon1"));
            this._shopBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._rankBtn = this.addChild(this._bgRender.getComponent("a_icon4"));
            this._rankBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._rewardBtn = this.addChild(this._bgRender.getComponent("a_icon2"));
            this._rewardBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._logBtn = this.addChild(this._bgRender.getComponent("a_icon3"));
            this._logBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._winUIRenderAry = this.getUIList(["a_bg", "a_line", "a_di0", "a_di1", "a_di2"], this._winMidRender);
            this.addUIList(["a_title_bg0", "a_title_bg1", "a_title_bg2", "a_rankBg", "a_rankBg1", "a_rankBg2", "a_rankBg3", "a_di",
                "a_u_bg1", "a_u_bg2", "a_u_bg3", "a_u_bg01", "a_u_bg02", "a_u_bg03"], this._bgRender);
            this._itemDjRoleAry = new Array;
            for (var i = 0; i < 3; i++) {
                var item = new ItemDjRole;
                item.init(this._bgRender, this._baseRender, i, this);
                this._itemDjRoleAry.push(item);
            }
            var btn;
            btn = this.addChild(this._bgRender.getComponent("a_btn"));
            this.addChild(this._baseRender.getComponent("t_btn_name2"));
            btn.addEventListener(InteractiveEvent.Up, this.refreshEnemy, this);
            btn = this.addChild(this._baseRender.getComponent("a_add_btn1"));
            btn.addEventListener(InteractiveEvent.Up, this.clearCD, this);
            btn = this.addChild(this._baseRender.getComponent("a_add_btn2"));
            btn.addEventListener(InteractiveEvent.Up, this.showBuyMeshBoss, this);
            this._myRank = this.addChild(this._baseRender.getComponent("a_mylab1"));
            this._myForce = this.addChild(this._baseRender.getComponent("a_mylab2"));
            this._myDh = this.addChild(this._baseRender.getComponent("a_bottom_lab1"));
            this._timeLab = this.addChild(this._baseRender.getComponent("a_bottom_lab2"));
            this.c_vip_add = this.addChild(this._baseRender.getComponent("c_vip_add"));
            this.challengeLab = this.addChild(this._baseRender.getComponent("a_bottom_lab3"));
            this.addSelfRole();
            this.drawBaseInfo();
            this.drawChallengNum();
        };
        ArenaDjPanel.prototype.initUpdate = function () {
            var _this = this;
            if (!this._upFun) {
                this._upFun = function () {
                    _this.drawTime();
                };
            }
            TimeUtil.addTimeTick(1000, this._upFun);
        };
        ArenaDjPanel.prototype.addSelfRole = function () {
            this.selfRole = new Person2DChar();
            this._bgRender.addModel(this.selfRole);
            this.selfRole.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
            this.selfRole.setBaseRoleWeapon(GuidData.player.getDivineID(), GuidData.player.getCharType());
            this.resize();
        };
        ArenaDjPanel.prototype.drawBaseInfo = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myRank.skinName, "我的排名:" + GuidData.player.get1v1Rank(), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myForce.skinName, "我的战力:" + Snum(GuidData.player.getForce()), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myDh.skinName, "荣誉:" + GuidData.player.getResTypeStr(7), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        };
        ArenaDjPanel.prototype.dataChg = function () {
            this.drawChallengNum();
        };
        ArenaDjPanel.prototype.djRewardChg = function () {
            if (this._rewardPanel && this._rewardPanel.hasStage) {
                this._rewardPanel.djRewardChg();
            }
        };
        ArenaDjPanel.prototype.clearCD = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            var $addTime = GameInstance.getGameSecond(GuidData.instanceData.getDJcdtime());
            if ($addTime <= 0) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "无冷却时间，不需要清除", 99);
                return;
            }
            var mins = Math.ceil($addTime / 60);
            AlertUtil.show(ColorType.Brown7a2f21 + "您是否花费" + ColorType.Green2ca937 + mins + "元宝" + ColorType.Brown7a2f21 + "重置挑战冷却时间(1分钟=1元宝)", "", function (val) {
                if (val == 1) {
                    costRes([1, mins], function () {
                        NetManager.getInstance().protocolos.doujiantai_clearcd();
                    }, function () {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    });
                }
            });
        };
        ArenaDjPanel.prototype.drawTime = function () {
            var $addTime = GameInstance.getGameSecond(GuidData.instanceData.getDJcdtime());
            if ($addTime > 0) {
                if (this._lastTime == $addTime) {
                    return;
                }
                this._lastTime = $addTime;
                var timeStr = TimeUtil.getLocalTime3($addTime);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, "挑战冷却:" + timeStr, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, "挑战冷却:00:00", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            }
        };
        ArenaDjPanel.prototype.drawChallengNum = function () {
            var aaa = GuidData.instanceData.getHasChallengeNum();
            var obj = TableData.getInstance().getData(TableData.tb_doujiantai_base, 1);
            var bbb = obj.dailytimes;
            var $kk = (bbb - aaa + GuidData.instanceData.getCanbuyChallengeNum()) + "/" + bbb;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.challengeLab.skinName, "挑战次数:" + $kk, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        };
        ArenaDjPanel.prototype.setListData = function ($ary) {
            for (var i = 0; i < this._itemDjRoleAry.length; i++) {
                this._itemDjRoleAry[i].setData($ary[i]);
            }
        };
        ArenaDjPanel.prototype.refreshEnemy = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.doujiantai_refresh_enemys();
        };
        ArenaDjPanel.prototype.showBuyMeshBoss = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            var hasNum = GuidData.instanceData.getHasChallengeNum();
            var tabObj = TableData.getInstance().getData(TableData.tb_doujiantai_base, 1);
            var maxNum = tabObj.dailyTimes + tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel()).djtBuyTimes;
            var curBuyNum = GuidData.instanceData.getCanbuyChallengeNum();
            if (curBuyNum >= hasNum) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前挑战次数已满，请消耗一些再来购买", 99);
                return;
            }
            var $evt = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL);
            $evt.resoureItem = new Array;
            var tbSize = tabObj.buyInfo.length;
            //var canBuyNum:number = hasNum - curBuyNum;
            for (var i = curBuyNum; i < tbSize && i < hasNum; i++) {
                $evt.resoureItem.push(converItem2Cost(tabObj.buyInfo[i]));
            }
            // $evt.Type = popbuy.PopBuyType.MESHBOSS;
            $evt.Info1 = "斗剑台剩余可购买";
            $evt.cutNum = $evt.resoureItem.length;
            if ($evt.cutNum > 0) {
                $evt.SubmitFun = function (value) {
                    //NetManager.getInstance().protocolos.buy_match_single_pvp_times(value); 
                    NetManager.getInstance().protocolos.doujiantai_buytime(value);
                };
                ModuleEventManager.dispatchEvent($evt);
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "购买次数满了", 99);
            }
        };
        ArenaDjPanel.prototype.itemIconClick = function ($e) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize($e.target);
            if ($e.target == this._logBtn) {
                if (!this._logPanel) {
                    this._logPanel = new kuafu.ArenaQualifyingLog();
                }
                this._logPanel.load(function () {
                    _this._logPanel.show(_this._baseUiAtlas, 1);
                });
            }
            else if ($e.target == this._rewardBtn) {
                if (!this._rewardPanel) {
                    this._rewardPanel = new kuafu.ArenaDjRewardPanel();
                }
                this._rewardPanel.load(function () {
                    _this._rewardPanel.show();
                });
            }
            else if ($e.target == this._shopBtn) {
                ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_SCORE, 2]);
            }
            else if ($e.target == this._rankBtn) {
                //doujiantai_get_rank
                NetManager.getInstance().protocolos.doujiantai_get_rank(1, 10);
            }
        };
        ArenaDjPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.selfRole) {
                this.selfRole.resize();
                this.selfRole.scale = 3.5 * UIData.Scale;
                this.selfRole.x = 200 * UIData.Scale;
                this.selfRole.y = -50 * UIData.Scale;
            }
        };
        ArenaDjPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //this.addChild(this._mainBg);
            // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.c_vip_add.skinName, getvipadd("djtReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            if (this._baseUiAtlas) {
                //this.draw();
                this.addWinmid();
                NetManager.getInstance().protocolos.doujiantai_get_enemys_info();
                this.drawBaseInfo();
                this.drawChallengNum();
            }
            this.initUpdate();
        };
        ArenaDjPanel.prototype.addWinmid = function () {
            for (var i = 0; i < this._winUIRenderAry.length; i++) {
                this.addChild(this._winUIRenderAry[i]);
            }
        };
        ArenaDjPanel.prototype.removeWinmid = function () {
            for (var i = 0; i < this._winUIRenderAry.length; i++) {
                this.removeChild(this._winUIRenderAry[i]);
            }
        };
        ArenaDjPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
            //this.removeChild(this._mainBg);
            TimeUtil.removeTimeTick(this._upFun);
        };
        return ArenaDjPanel;
    }(UIConatiner));
    kuafu.ArenaDjPanel = ArenaDjPanel;
    var ItemDjRole = /** @class */ (function () {
        function ItemDjRole() {
            this.id = 0;
            this.role = new Person2DChar();
            this.resize();
        }
        ItemDjRole.prototype.resize = function () {
            this.role.scale = 3 * UIData.Scale;
            this.role.x = (60 - 125 * this.id) * UIData.Scale;
            this.role.y = -50 * UIData.Scale;
            this.role.resize();
        };
        ItemDjRole.prototype.init = function ($roleRender, $render, $id, $container) {
            $roleRender.addModel(this.role);
            this.id = $id;
            this.nameUI = $container.addChild($render.getComponent("a_name" + $id));
            this.froceUI = $container.addChild($render.getComponent("a_force" + $id));
            this.rankUI = $container.addChild($render.getComponent("a_rank" + $id));
            this.challengeBut = $container.addChild($render.getComponent("a_tz" + $id));
            this.challengeBut.addEventListener(InteractiveEvent.Up, this.onClick, this);
            this.rewardUI = $container.addChild($render.getComponent("a_reward" + $id));
            var obj = TableData.getInstance().getData(TableData.tb_doujiantai_base, 1);
            var str = "挑战奖励:" + getResName(obj.tryReward[0][0]) + Snum(obj.tryReward[0][1]);
            LabelTextFont.writeSingleLabel(this.rewardUI.uiRender.uiAtlas, this.rewardUI.skinName, str, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
        };
        ItemDjRole.prototype.setData = function ($data) {
            this.data = $data;
            LabelTextFont.writeSingleLabel(this.nameUI.uiRender.uiAtlas, this.nameUI.skinName, getBaseName($data.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.froceUI.uiRender.uiAtlas, this.froceUI.skinName, "战力：" + $data.force, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.rankUI.uiRender.uiAtlas, this.rankUI.skinName, "第" + $data.rank + "名", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.role.setBaseRoleAvatar($data.avatar, $data.gender);
            this.role.setBaseRoleWeapon($data.divine, $data.gender);
            //console.log($data.gender);
            this.resize();
        };
        ItemDjRole.prototype.onClick = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.doujiantai_fight(this.data.postion - 1);
        };
        return ItemDjRole;
    }());
    kuafu.ItemDjRole = ItemDjRole;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=ArenaDjPanel.js.map