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
    var BossModule = /** @class */ (function (_super) {
        __extends(BossModule, _super);
        function BossModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BossModule.prototype.getModuleName = function () {
            return "BossModule";
        };
        BossModule.prototype.listProcessors = function () {
            return [new BossProcessor()];
        };
        return BossModule;
    }(Module));
    boss.BossModule = BossModule;
    var BossEvent = /** @class */ (function (_super) {
        __extends(BossEvent, _super);
        function BossEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BossEvent.SHOW_BOSS_PANEL_EVENT = "show_boss_panel_event";
        BossEvent.HIDE_BOSS_PANEL_EVENT = "hide_boss_panel_event";
        BossEvent.SHOW_BOSSHP_EVENT = "show_bosshp_event";
        BossEvent.HIDE_BOSSHP_EVENT = "hide_bosshp_event";
        BossEvent.SHOW_CHEST_EVENT = "show_chest_event";
        BossEvent.HIDE_CHEST_EVENT = "hide_chest_event";
        BossEvent.BOSS_HP_CHANGE_EVENT = "boss_hp_change_event";
        BossEvent.BOSS_OWNER_CHANGE_EVENT = "BOSS_OWNER_CHANGE_EVENT";
        BossEvent.CHEST_CHANGE_EVENT = "chest_change_event";
        BossEvent.SHOW_OFTENRANK_PANEL = "SHOW_OFTENRANK_PANEL";
        BossEvent.HIDE_OFTENRANK_PANEL = "HIDE_OFTENRANK_PANEL";
        BossEvent.SHOW_BOSSVIEW_PANEL = "SHOW_BOSSVIEW_PANEL";
        return BossEvent;
    }(BaseEvent));
    boss.BossEvent = BossEvent;
    var BossProcessor = /** @class */ (function (_super) {
        __extends(BossProcessor, _super);
        function BossProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BossProcessor.prototype.getName = function () {
            return "BossProcessor";
        };
        BossProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof BossEvent) {
                var $bossEvent = $event;
                if ($bossEvent.type == BossEvent.SHOW_BOSS_PANEL_EVENT) {
                    //this.show($bossEvent.data);
                }
                else if ($bossEvent.type == BossEvent.HIDE_BOSS_PANEL_EVENT) {
                    //this.hide();
                }
                else if ($bossEvent.type == BossEvent.SHOW_BOSSHP_EVENT) {
                    //this.showBossUiHp()
                    this.showHp($bossEvent.data);
                }
                else if ($bossEvent.type == BossEvent.HIDE_BOSSHP_EVENT) {
                    this.hideHp();
                }
                else if ($bossEvent.type == BossEvent.BOSS_HP_CHANGE_EVENT) {
                    this.refreshHp($bossEvent.data);
                }
                else if ($bossEvent.type == BossEvent.BOSS_OWNER_CHANGE_EVENT) {
                    this.refreshOwner();
                }
                else if ($bossEvent.type == BossEvent.SHOW_CHEST_EVENT) {
                    //this.showChest($bossEvent.data);
                }
                else if ($bossEvent.type == BossEvent.HIDE_CHEST_EVENT) {
                    //this.hideChest();
                }
                else if ($bossEvent.type == BossEvent.CHEST_CHANGE_EVENT) {
                    //this.refreshChest($bossEvent.data)
                }
                else if ($bossEvent.type == BossEvent.SHOW_OFTENRANK_PANEL) {
                    //时时排行榜
                    this.showrank(Boolean($bossEvent.data));
                }
                else if ($bossEvent.type == BossEvent.HIDE_OFTENRANK_PANEL) {
                    this.hiderank();
                }
                else if ($bossEvent.type == BossEvent.SHOW_BOSSVIEW_PANEL) {
                    this.showBossView($bossEvent.data);
                }
            }
        };
        BossProcessor.prototype.showwindowRank = function ($data) {
            var _this = this;
            var $vo = new s2c_show_faction_bossdefense_damage_list();
            s2c_show_faction_bossdefense_damage_list.read($vo, $data);
            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var myrank = -1;
            var list = new Array;
            for (var i = 0; i < $vo.list.length; i++) {
                var $rankvo = $vo.list[i];
                var $obj = new WindowRankVo();
                var $name = $rankvo.name;
                if ($name) {
                    $obj.rank = String(i + 1);
                    $obj.val = String($rankvo.dam);
                    $obj.name = getBaseName($name);
                    list.push($obj);
                }
                if ($rankvo.name == GuidData.player.getName()) {
                    myrank = Number($obj.rank);
                }
            }
            var myStr;
            if (myrank > 0) {
                myStr = "我的排名：" + myrank;
            }
            else {
                myStr = "我的排名：未上榜";
            }
            this._rankPanle.load(function () {
                _this._rankPanle.show(["排名", "玩家名字", "输出"], list, myStr);
            });
        };
        BossProcessor.prototype.showBossView = function ($data) {
            var _this = this;
            if (!this._bossViewPanel) {
                this._bossViewPanel = new boss.BossViewPanel();
            }
            this._bossViewPanel.load(function () {
                //UIManager.getInstance().addUIContainer(this._bossViewPanel);
                _this._bossViewPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = 901;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        BossProcessor.prototype.showrank = function (value) {
            var _this = this;
            if (!this.bossRankPanel) {
                this.bossRankPanel = new boss.BossRankPanel();
            }
            if (this.bossRankPanel.hasStage && value) {
                this.bossRankPanel.hide();
            }
            else {
                this.bossRankPanel.load(function () {
                    _this.bossRankPanel.show(value);
                }, false);
            }
        };
        BossProcessor.prototype.hiderank = function () {
            //console.log("---隐藏--");
            if (this.bossRankPanel) {
                this.bossRankPanel.hide();
            }
        };
        // private hide(): void {
        //     if (this._outBossPanel) {
        //         this._outBossPanel.hide();
        //     }
        //     ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        // }
        // private show($data: any): void {
        //     if (!this._outBossPanel) {
        //         this._outBossPanel = new OutBossPanel();
        //     }
        //     this._outBossPanel.load(() => {
        //         if ($data) {
        //             this._outBossPanel.pageTab = $data
        //         }
        //         SceneManager.getInstance().render = false;
        //         ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
        //         this._outBossPanel.show();
        //     })
        // }
        BossProcessor.prototype.showHp = function ($data) {
            var _this = this;
            if (!this._bossHpPanel) {
                this._bossHpPanel = new BossHpPanel();
            }
            this._bossHpPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this._bossHpPanel);
                _this._bossHpPanel.initUnitData($data);
            }, false);
        };
        BossProcessor.prototype.hideHp = function () {
            if (this._bossHpPanel) {
                UIManager.getInstance().removeUIContainer(this._bossHpPanel);
            }
        };
        // private showChest($data: any): void {
        //     if (!this._chestPanel) {
        //         this._chestPanel = new ChestPanel();
        //         if (this._bossHpPanel ) {
        //           //  this._chestPanel.init(this._bossHpPanel.uiAtlas);
        //         } else {
        //             this._chestPanel.init(null);
        //         }
        //     }
        //     this._chestPanel.setData($data);
        //     UIManager.getInstance().addUIContainer(this._chestPanel);
        // }
        // private hideChest(): void {
        //     if (this._chestPanel) {
        //         UIManager.getInstance().removeUIContainer(this._chestPanel);
        //     }
        // }
        BossProcessor.prototype.refreshHp = function ($data) {
            if (this._bossHpPanel) {
                if ($data.num <= 0) {
                    this.hideHp();
                }
                else {
                    this._bossHpPanel.setHp($data.num, $data.id);
                }
            }
        };
        BossProcessor.prototype.refreshOwner = function () {
            if (this._bossHpPanel) {
                this._bossHpPanel.refreshOwner();
            }
        };
        // private refreshChest($data: any): void {
        //     this._chestPanel.setHp($data);
        // }
        BossProcessor.prototype.listenModuleEvents = function () {
            return [
                new BossEvent(BossEvent.SHOW_BOSS_PANEL_EVENT),
                new BossEvent(BossEvent.HIDE_BOSS_PANEL_EVENT),
                new BossEvent(BossEvent.SHOW_BOSSHP_EVENT),
                new BossEvent(BossEvent.HIDE_BOSSHP_EVENT),
                new BossEvent(BossEvent.SHOW_CHEST_EVENT),
                new BossEvent(BossEvent.HIDE_CHEST_EVENT),
                new BossEvent(BossEvent.BOSS_HP_CHANGE_EVENT),
                new BossEvent(BossEvent.BOSS_OWNER_CHANGE_EVENT),
                new BossEvent(BossEvent.CHEST_CHANGE_EVENT),
                new BossEvent(BossEvent.SHOW_OFTENRANK_PANEL),
                new BossEvent(BossEvent.HIDE_OFTENRANK_PANEL),
                new BossEvent(BossEvent.SHOW_BOSSVIEW_PANEL),
            ];
        };
        BossProcessor.prototype.smsg_world_boss_rank = function ($byte) {
            var $vo = new s2c_boss_rank();
            s2c_boss_rank.read($vo, $byte);
            if (this.bossRankPanel && this.bossRankPanel.hasStage) {
                this.bossRankPanel.setRankData($vo);
            }
            // if (this._bossHpPanel) {
            //     this._bossHpPanel.showRankBut(true);
            // }
        };
        BossProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            //obj[Protocols.SMSG_FACTION_GET_LIST_RESULT] = ($byte: ByteArray) => { this.getNewList($byte) };
            obj[Protocols.SMSG_BOSS_RANK] = function ($byte) { _this.smsg_world_boss_rank($byte); };
            obj[Protocols.SMSG_SHOW_FACTION_BOSSDEFENSE_DAMAGE_LIST] = function ($byte) { _this.showwindowRank($byte); };
            return obj;
        };
        return BossProcessor;
    }(BaseProcessor));
    boss.BossProcessor = BossProcessor;
})(boss || (boss = {}));
//# sourceMappingURL=BossProcessor.js.map