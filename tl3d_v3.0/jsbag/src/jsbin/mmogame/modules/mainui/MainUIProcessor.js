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
var mainUi;
(function (mainUi) {
    var MainUiModule = /** @class */ (function (_super) {
        __extends(MainUiModule, _super);
        function MainUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainUiModule.prototype.getModuleName = function () {
            return "MainUiModule";
        };
        MainUiModule.prototype.listProcessors = function () {
            return [new MainUiProcessor()];
        };
        return MainUiModule;
    }(Module));
    mainUi.MainUiModule = MainUiModule;
    var MainUiEvent = /** @class */ (function (_super) {
        __extends(MainUiEvent, _super);
        function MainUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainUiEvent.SHOW_MAINUI_EVENT = "SHOW_MAINUI_EVENT";
        MainUiEvent.SHOW_PANDA_EVENT = "SHOW_PANDA_EVENT";
        MainUiEvent.HIDE_MAINUI_EVENT = "HIDE_MAINUI_EVENT";
        MainUiEvent.RESET_SKILL_ICON = "RESET_SKILL_ICON";
        MainUiEvent.ANGER_SKILL_CHANGE = "ANGER_SKILL_CHANGE";
        MainUiEvent.REFRESH_MAINUI_PANEL = "REFRESH_MAINUI_PANEL";
        MainUiEvent.PLAYER_SKILL_CD_REFRESH = "PLAYER_SKILL_CD_REFRESH"; //重新更新自己的CD
        return MainUiEvent;
    }(BaseEvent));
    mainUi.MainUiEvent = MainUiEvent;
    var MainOperatEvent = /** @class */ (function (_super) {
        __extends(MainOperatEvent, _super);
        function MainOperatEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainOperatEvent.SHOW_MAIN_OPERAT_EVENT = "show_main_operat_event";
        MainOperatEvent.HIDE_MAIN_OPERAT_EVENT = "hide_main_operat_event";
        return MainOperatEvent;
    }(BaseEvent));
    mainUi.MainOperatEvent = MainOperatEvent;
    var MainUiProcessor = /** @class */ (function (_super) {
        __extends(MainUiProcessor, _super);
        function MainUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainUiProcessor.prototype.getName = function () {
            return "MainUiProcessor";
        };
        //   private _mainUiPanel: MainUiPanel;
        MainUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MainUiEvent) {
                var $mainUIEvent = $event;
                if ($mainUIEvent.type == MainUiEvent.SHOW_MAINUI_EVENT) {
                    SceneManager.getInstance().render = true;
                    if ((GuidData.map.isAdventureBaseScene() || GuidData.map.isAdventureBossScene()) && mainUi.MainUiModel.skillTabIndex == 0) {
                        //  mainUi.MainUiModel.skillTabIndex =1
                    }
                    ModuleEventManager.dispatchEvent(new rightui.RightUiEvent(rightui.RightUiEvent.SHOW_RIGHT_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.SHOW_LEFT_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.SHOW_TOP_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.SHOW_BOTTOM_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.SHOW_ADVENTURE_INFO_UI_PANEL));
                    if (mainUi.MainUiModel.skillTabIndex == 0) {
                        ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.SHOW_FIGHT_UI_PANEL));
                    }
                    else {
                        ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.SHOW_HOME_UI_PANEL));
                    }
                    AreaType.restAreaPanel();
                    ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_GUIDE_POP_VIEW));
                    Engine.needVertical = true;
                    Engine.resetSize();
                }
                if ($mainUIEvent.type == MainUiEvent.HIDE_MAINUI_EVENT) {
                    ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.HIDE_LEFT_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.HIDE_TOP_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.HIDE_BOTTOM_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.HIDE_HOME_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.HIDE_FIGHT_UI_PANEL));
                }
                if ($mainUIEvent.type == MainUiEvent.REFRESH_MAINUI_PANEL) {
                    ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_PANDA));
                }
            }
        };
        MainUiProcessor.prototype.resetPanel = function () {
        };
        MainUiProcessor.prototype.angerSkillChange = function () {
            //console.log("怒气技能")
        };
        MainUiProcessor.prototype.resetSkillIcon = function () {
            //console.log("技能刷新")
        };
        MainUiProcessor.prototype.hideUi = function () {
        };
        MainUiProcessor.prototype.showUi = function () {
        };
        MainUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new MainUiEvent(MainUiEvent.HIDE_MAINUI_EVENT),
                new MainUiEvent(MainUiEvent.SHOW_MAINUI_EVENT),
                new MainUiEvent(MainUiEvent.RESET_SKILL_ICON),
                new MainUiEvent(MainUiEvent.ANGER_SKILL_CHANGE),
                new MainUiEvent(MainUiEvent.PLAYER_SKILL_CD_REFRESH),
                new MainUiEvent(MainUiEvent.REFRESH_MAINUI_PANEL),
                new MainUiEvent(MainUiEvent.SHOW_PANDA_EVENT),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.PLAYER_EXPAND_INT_XP),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
                new MainOperatEvent(MainOperatEvent.SHOW_MAIN_OPERAT_EVENT),
                new MainOperatEvent(MainOperatEvent.HIDE_MAIN_OPERAT_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        MainUiProcessor.prototype.smsgCombatStateUpData = function ($byte) {
            var a = $byte.readByte();
            ////console.log("战斗状态变化", a);
        };
        MainUiProcessor.prototype.smsgPeaceModeCd = function ($byte) {
        };
        MainUiProcessor.prototype.smsgBagItemCooldwn = function ($byte) {
            var $num = $byte.readUint16();
            for (var i = 0; i < $num; i++) {
                var $vo = new item_cooldown_info();
                $vo.read($byte);
                GameInstance.bagCdItem[$vo.item] = TimeUtil.getTimer() + $vo.cooldown;
            }
        };
        MainUiProcessor.prototype.smsgfieldDeathCooldown = function ($byte) {
            var _this = this;
            var $num = $byte.readUint16();
            //console.log($num)
            TimeUtil.addTimeOut(3000, function () {
                _this.resurrection();
            });
        };
        MainUiProcessor.prototype.resurrection = function () {
            var aotu = AotuSkillManager.getInstance().aotuBattle; //AotuSkillManager.getInstance().aotu
            var hangUpResurrection = GuidData.player.getHangUpResurrection() == 1;
            var $hangupData = GuidData.player.getHangupdata();
            var useA = $hangupData[8] == 1;
            var useB = $hangupData[9] == 1;
            var kId = tb.TB_hook_hp_item_Vo.get_TB_hook_hp_item_Vo(2).items[0];
            var $unit = GameInstance.mainChar.unit;
            var n = $unit.getHp() / $unit.getMaxHp();
            if (!hangUpResurrection) {
                useA = false;
                useB = false;
                if (aotu) {
                    //console.log("退出场景回城")
                    NetManager.getInstance().protocolos.teleport_main_city(); //回城
                    return;
                }
            }
            //console.log(GuidData.player.getHangupdata())
            var $dagItemData = GuidData.bag.getItemByEntry(kId);
            if (aotu) {
                var aa = this.useItem(kId); // 选中的自动吃的物品
                if (!aa) {
                    var $tb_shop = tb.TB_shop.get_TB_shopById(kId);
                    if (useA || useB) {
                        var needMoneyNum = $tb_shop.costResource[0][1];
                        if ($tb_shop && GuidData.player.getBindGold() >= needMoneyNum) {
                            //console.log("使用绑定元宝", GuidData.player.getBindGold())
                            NetManager.getInstance().protocolos.gold_respawn(SharedDef.MONEY_TYPE_BIND_GOLD);
                        }
                        else if (useB) {
                            if ($tb_shop && GuidData.player.getGoldIngot() >= needMoneyNum) {
                                NetManager.getInstance().protocolos.gold_respawn(SharedDef.MONEY_TYPE_GOLD_INGOT);
                                //console.log("使用元宝", "protocolos.gold_respawn", GuidData.player.getGoldIngot())
                            }
                            else {
                                //console.log("无钱购买")
                            }
                        }
                        else {
                            //console.log("绑定元宝不足够")
                        }
                    }
                }
                else {
                    //console.log("从背包中得到复活丹")
                }
            }
        };
        MainUiProcessor.prototype.useItem = function ($id) {
            if (GuidData.bag.hasItem($id, 1)) {
                var $dagItemData = GuidData.bag.getItemByEntry($id);
                NetManager.getInstance().protocolos.bag_item_user($dagItemData.guid, 1);
                //console.log("吃药复活了")
                return true;
            }
            else {
                return false;
            }
        };
        MainUiProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_COMBAT_STATE_UPDATE] = function ($byte) { _this.smsgCombatStateUpData($byte); };
            obj[Protocols.SMSG_PEACE_MODE_CD] = function ($byte) { _this.smsgPeaceModeCd($byte); };
            obj[Protocols.SMSG_BAG_ITEM_COOLDOWN] = function ($byte) { _this.smsgBagItemCooldwn($byte); };
            obj[Protocols.SMSG_FIELD_DEATH_COOLDOWN] = function ($byte) { _this.smsgfieldDeathCooldown($byte); };
            return obj;
        };
        return MainUiProcessor;
    }(BaseProcessor));
    mainUi.MainUiProcessor = MainUiProcessor;
})(mainUi || (mainUi = {}));
//# sourceMappingURL=MainUIProcessor.js.map