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
var adventuremap;
(function (adventuremap) {
    var AdventureMapModule = /** @class */ (function (_super) {
        __extends(AdventureMapModule, _super);
        function AdventureMapModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureMapModule.prototype.getModuleName = function () {
            return "AdventureMapModule";
        };
        AdventureMapModule.prototype.listProcessors = function () {
            return [new AdventureMapProcessor()];
        };
        return AdventureMapModule;
    }(Module));
    adventuremap.AdventureMapModule = AdventureMapModule;
    var AdventureMapEvent = /** @class */ (function (_super) {
        __extends(AdventureMapEvent, _super);
        function AdventureMapEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureMapEvent.SHOW_ADVENTURE_MAP_PANEL = "SHOW_ADVENTURE_UI_PANEL";
        AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL = "HIDE_ADVENTURE_UI_PANEL";
        return AdventureMapEvent;
    }(BaseEvent));
    adventuremap.AdventureMapEvent = AdventureMapEvent;
    var AdventureMapProcessor = /** @class */ (function (_super) {
        __extends(AdventureMapProcessor, _super);
        function AdventureMapProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureMapProcessor.prototype.getName = function () {
            return "AdventureMapProcessor";
        };
        AdventureMapProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof AdventureMapEvent) {
                var evt = $event;
                if (evt.type == AdventureMapEvent.SHOW_ADVENTURE_MAP_PANEL) {
                    this.showPanel(evt.data);
                }
                if (evt.type == AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL) {
                    this.hidePanel();
                }
            }
            if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                if (this.worldAdventureUiPanel) {
                    this.worldAdventureUiPanel.refreshOpenLev();
                }
            }
        };
        AdventureMapProcessor.prototype.hidePanel = function () {
            if (this.worldAdventureUiPanel) {
                this.worldAdventureUiPanel.hide();
            }
        };
        AdventureMapProcessor.prototype.showPanel = function ($data) {
            var _this = this;
            if (!this.worldAdventureUiPanel) {
                this.worldAdventureUiPanel = new adventuremap.WorldAdventureUiPanel();
            }
            this.worldAdventureUiPanel.load(function () {
                //console.log("--$data---",$data);
                if (!$data) {
                    $data = SharedDef.MODULE_TEST_RISK;
                }
                _this.worldAdventureUiPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_WORLD_RISK;
                ModuleEventManager.dispatchEvent($scenePange);
            }, false);
        };
        AdventureMapProcessor.prototype.showRank = function (byte) {
            var _this = this;
            var rankresult = new s2c_risk_get_rank_result();
            s2c_risk_get_rank_result.read(rankresult, byte);
            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list = new Array;
            for (var i = 0; i < rankresult.list.length; i++) {
                var $obj = new WindowRankVo();
                var $name = rankresult.list[i].name;
                if ($name) {
                    $obj.rank = String(i + 1);
                    var tab = tb.TB_risk_data.get_TB_risk_data(rankresult.list[i].value);
                    $obj.val = tab.name;
                    $obj.name = getBaseName($name);
                    $obj.isme = rankresult.list[i].name == GuidData.player.getName();
                    list.push($obj);
                }
            }
            var myStr = "我的排名：未上榜";
            for (var j = 0; j < list.length; j++) {
                if (list[j].isme) {
                    myStr = "我的排名：" + list[j].rank;
                    break;
                }
            }
            this._rankPanle.load(function () {
                _this._rankPanle.show(["排名", "玩家名字", "关卡"], list, myStr);
            });
        };
        AdventureMapProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_RISK_GET_RANK_RESULT] = function ($byte) { _this.showRank($byte); };
            return obj;
        };
        AdventureMapProcessor.prototype.listenModuleEvents = function () {
            return [
                new AdventureMapEvent(AdventureMapEvent.SHOW_ADVENTURE_MAP_PANEL),
                new AdventureMapEvent(AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        };
        return AdventureMapProcessor;
    }(BaseProcessor));
    adventuremap.AdventureMapProcessor = AdventureMapProcessor;
})(adventuremap || (adventuremap = {}));
//# sourceMappingURL=AdventureMapProcessor.js.map