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
    var TreasureUiModule = /** @class */ (function (_super) {
        __extends(TreasureUiModule, _super);
        function TreasureUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TreasureUiModule.prototype.getModuleName = function () {
            return "TreasureUiModule";
        };
        TreasureUiModule.prototype.listProcessors = function () {
            return [new TreasureProcessor()];
        };
        return TreasureUiModule;
    }(Module));
    treasure.TreasureUiModule = TreasureUiModule;
    var TreasureUiEvent = /** @class */ (function (_super) {
        __extends(TreasureUiEvent, _super);
        function TreasureUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示法宝面板
        TreasureUiEvent.SHOW_TREASURE_EVENT = "SHOW_TREASURE_EVENT";
        //隐藏法宝面板
        TreasureUiEvent.HIDE_TREASURE_EVENT = "HIDE_TREASURE_EVENT";
        //选中item
        TreasureUiEvent.SELECT_ITEM_EVENT = "SELECT_ITEM_EVENT";
        //解锁法宝
        TreasureUiEvent.UNLOCK_WEAPON_EVENT = "UNLOCK_WEAPON_EVENT";
        //更新法宝数据
        TreasureUiEvent.CHANGE_WEAPON_EVENT = "CHANGE_WEAPON_EVENT";
        //总战力变化
        TreasureUiEvent.CHANGE_ZHANLI_EVENT = "CHANGE_ZHANLI_EVENT";
        //装备槽变化
        TreasureUiEvent.CHANGE_SLOT_EVENT = "CHANGE_SLOT_EVENT";
        TreasureUiEvent.SHOW_TIPS_EVENT = "SHOW_TIPS_EVENT";
        return TreasureUiEvent;
    }(BaseEvent));
    treasure.TreasureUiEvent = TreasureUiEvent;
    var TreasureProcessor = /** @class */ (function (_super) {
        __extends(TreasureProcessor, _super);
        function TreasureProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // private isNeedItem($chgary:Array<number>):boolean{
            //     if($chgary){
            //         for (let i = 0; i < $chgary.length; i++) {
            //             var hasflag = this._needItem.indexOf($chgary[i]);
            //             if(hasflag != -1){
            //                 return true;
            //             }
            //         }
            //     }
            //     return false;
            // }
            // private _needItem:Array<number>
            _this._nodeInit = false;
            return _this;
        }
        TreasureProcessor.prototype.getName = function () {
            return "TreasureProcessor";
        };
        TreasureProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TreasureUiEvent) {
                this.processRedPoint();
                var $uiEvent = $event;
                if ($uiEvent.type == TreasureUiEvent.SHOW_TREASURE_EVENT) {
                    this.showUi($uiEvent.data);
                }
                else if ($uiEvent.type == TreasureUiEvent.HIDE_TREASURE_EVENT) {
                    this.hideUi();
                }
                else if ($uiEvent.type == TreasureUiEvent.SELECT_ITEM_EVENT) {
                    this.selectitem($uiEvent.data);
                }
                else if ($uiEvent.type == TreasureUiEvent.UNLOCK_WEAPON_EVENT) {
                    this.unlockweapon();
                }
                else if ($uiEvent.type == TreasureUiEvent.CHANGE_WEAPON_EVENT) {
                    this.unlockweapon();
                }
                else if ($uiEvent.type == TreasureUiEvent.SHOW_TIPS_EVENT) {
                    this.showTips($uiEvent.data);
                }
                else if ($uiEvent.type == TreasureUiEvent.CHANGE_SLOT_EVENT) {
                    this.chgslotevent();
                }
                else if ($uiEvent.type == TreasureUiEvent.CHANGE_ZHANLI_EVENT) {
                    this.changezhanli();
                }
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            }
            else if ($event.type == EngineEvent.MONEY_CHANGE || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            }
            if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    // if(this._needItem){
                    //     if(this.isNeedItem((<charbg.CharBgEvent>$event).change)){
                    //         this.processRedPoint();
                    //         this.refreshCost();
                    //     }
                    // }else{
                    this.processRedPoint();
                    this.refreshCost();
                    // }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._treasureUiPanel) {
                    var nodeList = RedPointManager.getInstance().getNodeByID(133).children;
                    for (var i = 0; i < nodeList.length; i++) {
                        nodeList[i].unBind();
                    }
                    this._treasureUiPanel.dispose();
                    this._treasureUiPanel = null;
                    //console.log("释放面板 _treasureUiPanel")
                }
            }
        };
        TreasureProcessor.prototype.initRedNode = function () {
            if (this._nodeInit) {
                return;
            }
            var pnode = RedPointManager.getInstance().getNodeByID(133);
            var $arr = treasure.TreasureModel.getInstance().getList();
            for (var i = 0; i < $arr.length; i++) {
                var node = new RedPointNode();
                node.data = $arr[i];
                pnode.addChild(node);
            }
            this._nodeInit = true;
            this.processRedPoint();
        };
        TreasureProcessor.prototype.processRedPoint = function () {
            // if(!this._needItem){
            //     this._needItem = new Array
            // }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_DIVINE, SharedDef.MODULE_DIVINE_ALL)) {
                var ary = RedPointManager.getInstance().getNodeByID(133).children;
                for (var i = 0; i < ary.length; i++) {
                    var obj = ary[i].data;
                    if (obj.state == 2) {
                        //激活操作
                        var $ary = obj.tabvo.avtivedata[0];
                        // if(this._needItem.indexOf($ary[0]) == -1){
                        //     this._needItem.push($ary[0]);
                        // }
                        if (hasEnoughResItem($ary)) {
                            ary[i].show = true;
                        }
                        else {
                            ary[i].show = false;
                        }
                    }
                    else {
                        var spirittabary = tb.TB_talisman_spirit.get_TB_talisman_spiritByIdArray(obj.tabvo.id);
                        var nextlev = obj.activityvo.lev + 1;
                        if (nextlev > spirittabary[spirittabary.length - 1].level) {
                            //满级
                            ary[i].show = false;
                        }
                        else {
                            //升级
                            var nextlevtab = spirittabary[nextlev - 1];
                            var $ary1 = nextlevtab.item_cost[0];
                            // if(this._needItem.indexOf($ary1[0]) == -1){
                            //     this._needItem.push($ary1[0]);
                            // }
                            // if(this._needItem.indexOf($ary2[0]) == -1){
                            //     this._needItem.push($ary2[0]);
                            // }
                            if (hasEnoughResItem($ary1)) {
                                ary[i].show = true;
                            }
                            else {
                                ary[i].show = false;
                            }
                        }
                    }
                }
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_DIVINE, SharedDef.MODULE_DIVINE_USE)) {
                var node = RedPointManager.getInstance().getNodeByID(132);
                var treasureWearVo = GuidData.grow.gettalismanslotlist();
                var $arr = treasure.TreasureModel.getInstance().getTreasureList();
                if ($arr.length > 0) {
                    for (var i_1 = 0; i_1 < treasureWearVo.length; i_1++) {
                        //先判断有没有可以装备的位置
                        if (treasureWearVo[i_1].state == 1 && treasureWearVo[i_1].treasureid == 0) {
                            node.show = true;
                            return;
                        }
                    }
                }
                node.show = false;
            }
        };
        TreasureProcessor.prototype.chgslotevent = function () {
            if (this._treasureUiPanel && this._treasureUiPanel.treasureWear && this._treasureUiPanel.treasureWear.hasStage) {
                this._treasureUiPanel.treasureWear.chgslot();
            }
            if (this._treasureUiPanel && this._treasureUiPanel.treasureWear && this._treasureUiPanel.treasureWear.wearList && this._treasureUiPanel.treasureWear.wearList.hasStage) {
                this._treasureUiPanel.treasureWear.wearList.refreshDataByNewData();
            }
            if (this._treasureUiPanel && this._treasureUiPanel.treasurePage && this._treasureUiPanel.treasurePage.treasureRightPanel && this._treasureUiPanel.treasurePage.treasureRightPanel.treasureList && this._treasureUiPanel.treasurePage.treasureRightPanel.treasureList.hasStage) {
                this._treasureUiPanel.treasurePage.treasureRightPanel.treasureList.refreshDataByNewData();
            }
        };
        TreasureProcessor.prototype.refreshCost = function () {
            if (this._treasureUiPanel && this._treasureUiPanel.treasurePage && this._treasureUiPanel.treasurePage.treasureRightPanel && this._treasureUiPanel.treasurePage.treasureRightPanel.hasStage) {
                this._treasureUiPanel.treasurePage.treasureRightPanel.treasureList.refreshDataByNewData();
            }
        };
        TreasureProcessor.prototype.changezhanli = function () {
            if (this._treasureUiPanel && this._treasureUiPanel.treasurePage && this._treasureUiPanel.treasurePage.hasStage) {
                this._treasureUiPanel.treasurePage.setZhanli();
            }
        };
        TreasureProcessor.prototype.unlockweapon = function () {
            if (this._treasureUiPanel && this._treasureUiPanel.treasurePage && this._treasureUiPanel.treasurePage.treasureRightPanel && this._treasureUiPanel.treasurePage.treasureRightPanel.treasureList && this._treasureUiPanel.treasurePage.treasureRightPanel.treasureList.hasStage) {
                this._treasureUiPanel.treasurePage.treasureRightPanel.treasureList.refreshDataByNewData();
            }
        };
        // private changeweapon() {
        //     if(this._treasureUiPanel && this._treasureUiPanel.treasureRightPanel && this._treasureUiPanel.treasureRightPanel.treasureList && this._treasureUiPanel.treasureRightPanel.treasureList.hasStage){
        //         this._treasureUiPanel.treasureRightPanel.treasureList.refreshDataByNewDataCopy();
        //     }
        // }
        TreasureProcessor.prototype.selectitem = function ($data) {
            if (this._treasureUiPanel && this._treasureUiPanel.treasurePage && this._treasureUiPanel.treasurePage.treasureRightPanel) {
                this._treasureUiPanel.treasurePage.treasureRightPanel.resetData($data.data);
            }
        };
        TreasureProcessor.prototype.hideUi = function () {
            this._treasureUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        TreasureProcessor.prototype.showUi = function ($data) {
            var _this = this;
            if (!this._treasureUiPanel) {
                this._treasureUiPanel = new treasure.TreasureUiPanel();
            }
            this._treasureUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                if ($data) {
                    if ($data instanceof Array) {
                        $data = $data[0];
                    }
                }
                else {
                    $data = SharedDef.MODULE_DIVINE_ALL;
                }
                _this._treasureUiPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_DIVINE;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        TreasureProcessor.prototype.showTips = function ($data) {
            if (!this.treasureTip) {
                this.treasureTip = new treasure.TreasureTip();
            }
            // this.treasureTip.load(() => {
            this.treasureTip.show($data.id, $data.type);
            // });
        };
        TreasureProcessor.prototype.listenModuleEvents = function () {
            return [
                new TreasureUiEvent(TreasureUiEvent.SHOW_TREASURE_EVENT),
                new TreasureUiEvent(TreasureUiEvent.HIDE_TREASURE_EVENT),
                new TreasureUiEvent(TreasureUiEvent.SELECT_ITEM_EVENT),
                new TreasureUiEvent(TreasureUiEvent.UNLOCK_WEAPON_EVENT),
                new TreasureUiEvent(TreasureUiEvent.CHANGE_WEAPON_EVENT),
                new TreasureUiEvent(TreasureUiEvent.CHANGE_ZHANLI_EVENT),
                new TreasureUiEvent(TreasureUiEvent.CHANGE_SLOT_EVENT),
                new TreasureUiEvent(TreasureUiEvent.SHOW_TIPS_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
            ];
        };
        return TreasureProcessor;
    }(BaseProcessor));
    treasure.TreasureProcessor = TreasureProcessor;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureProcessor.js.map