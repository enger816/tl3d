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
var copytask;
(function (copytask) {
    var CopytaskUiModule = /** @class */ (function (_super) {
        __extends(CopytaskUiModule, _super);
        function CopytaskUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CopytaskUiModule.prototype.getModuleName = function () {
            return "CopytaskUiModule";
        };
        CopytaskUiModule.prototype.listProcessors = function () {
            return [new CopytaskProcessor()];
        };
        return CopytaskUiModule;
    }(Module));
    copytask.CopytaskUiModule = CopytaskUiModule;
    var CopytaskUiEvent = /** @class */ (function (_super) {
        __extends(CopytaskUiEvent, _super);
        function CopytaskUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示法宝面板
        CopytaskUiEvent.SHOW_COPYTASK_EVENT = "SHOW_COPYTASK_EVENT";
        //隐藏法宝面板
        CopytaskUiEvent.HIDE_COPYTASK_EVENT = "HIDE_COPYTASK_EVENT";
        //选中item
        CopytaskUiEvent.SELECT_ITEM_EVENT = "SELECT_ITEM_EVENT";
        //解锁法宝
        CopytaskUiEvent.UNLOCK_WEAPON_EVENT = "UNLOCK_WEAPON_EVENT";
        //更新法宝数据
        CopytaskUiEvent.CHANGE_WEAPON_EVENT = "CHANGE_WEAPON_EVENT";
        //首胜flag变化
        CopytaskUiEvent.CHANGE_FIRST_EVENT = "CHANGE_FIRST_EVENT";
        //打开匹配面板
        CopytaskUiEvent.SHOW_WAITJOIN_PANEL = "SHOW_WAITJOIN_PANEL";
        CopytaskUiEvent.RES_FUBEN_REFRESH = "RES_FUBEN_REFRESH";
        CopytaskUiEvent.TOWER_FUBEN_SWEEP = "TOWER_FUBEN_SWEEP";
        CopytaskUiEvent.SHOW_TOWER_RANK = "SHOW_TOWER_RANK";
        //组队副本挑战次数变化
        CopytaskUiEvent.CHG_TEAM_NUM = "CHG_TEAM_NUM";
        return CopytaskUiEvent;
    }(BaseEvent));
    copytask.CopytaskUiEvent = CopytaskUiEvent;
    var CopytaskProcessor = /** @class */ (function (_super) {
        __extends(CopytaskProcessor, _super);
        function CopytaskProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._nodeInit = false;
            return _this;
        }
        CopytaskProcessor.prototype.getName = function () {
            return "TreasureProcessor";
        };
        CopytaskProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof CopytaskUiEvent) {
                var $uiEvent = $event;
                if ($uiEvent.type == CopytaskUiEvent.SHOW_COPYTASK_EVENT) {
                    this.showUi($uiEvent.data, $uiEvent.seltab);
                }
                else if ($uiEvent.type == CopytaskUiEvent.HIDE_COPYTASK_EVENT) {
                    this.hideUi();
                }
                else if ($uiEvent.type == CopytaskUiEvent.UNLOCK_WEAPON_EVENT) {
                    // this.unlockweapon();
                }
                else if ($uiEvent.type == CopytaskUiEvent.CHANGE_WEAPON_EVENT) {
                    // this.changeweapon();
                }
                else if ($uiEvent.type == CopytaskUiEvent.CHANGE_FIRST_EVENT) {
                    this.changezhanli();
                }
                else if ($uiEvent.type == CopytaskUiEvent.SHOW_WAITJOIN_PANEL) {
                    this.showwaitjoinPanel($uiEvent.data);
                }
                else if ($uiEvent.type == CopytaskUiEvent.RES_FUBEN_REFRESH) {
                    this.refreshRes();
                    this.refreshHardList();
                    this.processRedPoint();
                }
                else if ($uiEvent.type == CopytaskUiEvent.TOWER_FUBEN_SWEEP) {
                    this.refreshTower();
                }
                else if ($uiEvent.type == CopytaskUiEvent.SHOW_TOWER_RANK) {
                    this.showRank($uiEvent.data);
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._copytaskUiPanel) {
                    var ary122 = RedPointManager.getInstance().getNodeByID(122).children;
                    for (var i = 0; i < ary122.length; i++) {
                        ary122[i].unBind();
                    }
                    this._copytaskUiPanel.dispose();
                    this._copytaskUiPanel = null;
                    //console.log("释放面板 _copytaskUiPanel")
                }
                if (panelEvent.panel == this._waitjoinPanel) {
                    this._waitjoinPanel.dispose();
                    this._waitjoinPanel = null;
                    //console.log("释放面板 _waitjoinPanel")
                }
            }
            if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            }
            else if ($event.type == EngineEvent.PLAYER_FIELD_FORCE) {
                if (this._copytaskUiPanel && this._copytaskUiPanel.resCopyTaskPanel && this._copytaskUiPanel.resCopyTaskPanel.hasStage) {
                    this._copytaskUiPanel.resCopyTaskPanel.drawForce();
                }
            }
            else if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                    this._copytaskUiPanel.sysopen();
                }
                this.processRedPoint();
            }
            else if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                this.refreshHardList();
                this.processRedPoint();
            }
        };
        CopytaskProcessor.prototype.refreshHardList = function () {
            //console.log("-----refreshHardList---");
            if (this._copytaskUiPanel && this._copytaskUiPanel.resCopyTaskPanel && this._copytaskUiPanel.resCopyTaskPanel.hardList && this._copytaskUiPanel.resCopyTaskPanel.hardList.hasStage) {
                this._copytaskUiPanel.resCopyTaskPanel.hardList.refreshDataByNewData();
                //console.log("-----refreshDataByNewData---");
            }
            if (this._copytaskUiPanel && this._copytaskUiPanel.resCopyTaskPanel && this._copytaskUiPanel.resCopyTaskPanel.hasStage) {
                this._copytaskUiPanel.resCopyTaskPanel.drawTypeTimes();
            }
        };
        CopytaskProcessor.prototype.initRedNode = function () {
            if (this._nodeInit) {
                return;
            }
            var pnode122 = RedPointManager.getInstance().getNodeByID(122);
            var $arr122 = fb.FuBenModel.getInstance().getFubenResItem();
            for (var i = 0; i < $arr122.length; i++) {
                var node = new RedPointNode();
                node.data = $arr122[i];
                pnode122.addChild(node);
            }
            this._nodeInit = true;
            this.processRedPoint();
        };
        CopytaskProcessor.prototype.processRedPoint = function () {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_INSTANCE, SharedDef.MODULE_INSTANCE_RES)) {
                var $arr122 = fb.FuBenModel.getInstance().getFubenResItem();
                var ary122 = RedPointManager.getInstance().getNodeByID(122).children;
                for (var j = 0; j < ary122.length; j++) {
                    ary122[j].data = $arr122[j];
                    var aa = $arr122[j];
                    ary122[j].show = aa.num < aa.maxtime && aa.data.limLev <= GuidData.player.getLevel();
                }
            }
        };
        CopytaskProcessor.prototype.changezhanli = function () {
            if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                // this._copytaskUiPanel.setZhanli();
            }
        };
        CopytaskProcessor.prototype.refreshRes = function () {
            if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                this._copytaskUiPanel.refreshRes();
            }
        };
        CopytaskProcessor.prototype.refreshTower = function () {
            if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                this._copytaskUiPanel.refreshTower();
            }
        };
        CopytaskProcessor.prototype.showRank = function ($data) {
            var _this = this;
            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list = new Array;
            for (var i = 0; i < $data.list.length; i++) {
                var $guidObject = $data.list[i];
                var $obj = new WindowRankVo();
                var $name = $guidObject.GetStr(SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_NAME);
                if ($name) {
                    $obj.rank = String($guidObject.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_RANKING));
                    $obj.val = String($guidObject.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_TRIAL));
                    $obj.name = getBaseName($name);
                    list.push($obj);
                }
            }
            var myStr;
            if ($data.self > 0) {
                myStr = "我的排名：" + $data.self;
            }
            else {
                myStr = "我的排名：未上榜";
            }
            this._rankPanle.load(function () {
                _this._rankPanle.show(["排名", "玩家名字", "关卡"], list, myStr);
            });
        };
        CopytaskProcessor.prototype.hideUi = function () {
            this._copytaskUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        CopytaskProcessor.prototype.showUi = function ($data, $seltab) {
            var _this = this;
            if (!this._copytaskUiPanel) {
                this._copytaskUiPanel = new copytask.CopytaskUiPanel();
            }
            this._copytaskUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                if (!$data) {
                    $data = [2, 3, 4];
                }
                else {
                    if (!($data instanceof Array)) {
                        $data = [$data];
                    }
                }
                if (!$seltab) {
                    $seltab = $data[0];
                }
                else {
                    if ($seltab instanceof Array) {
                        $seltab = $seltab[0];
                    }
                }
                _this._copytaskUiPanel.show($data, $seltab);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_INSTANCE;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        CopytaskProcessor.prototype.showwaitjoinPanel = function ($data) {
            var _this = this;
            if (!this._waitjoinPanel) {
                this._waitjoinPanel = new copytask.waitjoinPanel();
            }
            this._waitjoinPanel.load(function () {
                _this._waitjoinPanel.show($data);
            }, false);
        };
        CopytaskProcessor.prototype.listenModuleEvents = function () {
            return [
                new CopytaskUiEvent(CopytaskUiEvent.SHOW_COPYTASK_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.HIDE_COPYTASK_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.SELECT_ITEM_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.UNLOCK_WEAPON_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.CHANGE_WEAPON_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.CHANGE_FIRST_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.RES_FUBEN_REFRESH),
                new CopytaskUiEvent(CopytaskUiEvent.TOWER_FUBEN_SWEEP),
                new CopytaskUiEvent(CopytaskUiEvent.SHOW_TOWER_RANK),
                new CopytaskUiEvent(CopytaskUiEvent.CHG_TEAM_NUM),
                new CopytaskUiEvent(CopytaskUiEvent.SHOW_WAITJOIN_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        };
        return CopytaskProcessor;
    }(BaseProcessor));
    copytask.CopytaskProcessor = CopytaskProcessor;
})(copytask || (copytask = {}));
//# sourceMappingURL=CopytaskProcessor.js.map