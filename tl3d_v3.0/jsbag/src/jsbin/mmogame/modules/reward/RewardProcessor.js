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
var reward;
(function (reward) {
    var RewardEvent = /** @class */ (function (_super) {
        __extends(RewardEvent, _super);
        function RewardEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RewardEvent.SHOW_FUBEN_EVENT = "SHOW_FUBEN_EVENT"; //显示面板
        return RewardEvent;
    }(BaseEvent));
    reward.RewardEvent = RewardEvent;
    var RewardModule = /** @class */ (function (_super) {
        __extends(RewardModule, _super);
        function RewardModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RewardModule.prototype.getModuleName = function () {
            return "RewardModule";
        };
        RewardModule.prototype.listProcessors = function () {
            return [new RewardProcessor()];
        };
        return RewardModule;
    }(Module));
    reward.RewardModule = RewardModule;
    var RewardProcessor = /** @class */ (function (_super) {
        __extends(RewardProcessor, _super);
        function RewardProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RewardProcessor.prototype.getName = function () {
            return "RewardProcessor";
        };
        RewardProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof RewardEvent) {
            }
            if ($event instanceof EngineEvent) {
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._rewardPanel) {
                    this._rewardPanel.dispose();
                    this._rewardPanel = null;
                    //console.log("释放面板 _rewardPanel")
                }
            }
        };
        RewardProcessor.prototype.showPanel = function ($vo) {
            var _this = this;
            if (!this._rewardPanel) {
                this._rewardPanel = new reward.RewardPanel();
                this._rewardPanel.rewardVo = $vo;
            }
            else {
                this._rewardPanel.rewardVo = $vo;
                this._rewardPanel.refresh();
            }
            this._rewardPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this._rewardPanel);
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
            });
        };
        RewardProcessor.prototype.smsgSweepInstanceReward = function ($byte) {
            var vo = new s2c_sweep_instance_reward();
            //console.log(vo)
            s2c_sweep_instance_reward.read(vo, $byte);
            this.showPanel(vo);
            // var $inst_sub_type: number = vo.inst_sub_type
            // var $waitTime:number=1
            // switch ($inst_sub_type) {
            //     case SharedDef.INSTANCE_SUB_TYPE_VIP:
            //         $waitTime = 2
            //         break;
            //     case SharedDef.INSTANCE_SUB_TYPE_TRIAL:
            //         $waitTime = 1000
            //         break;
            //     default:
            //         break
            // }
            // TimeUtil.addTimeOut($waitTime, () => {
            //     this.showPanel(vo);
            // });
        };
        RewardProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SWEEP_INSTANCE_REWARD] = function ($byte) { _this.smsgSweepInstanceReward($byte); };
            return obj;
        };
        RewardProcessor.prototype.listenModuleEvents = function () {
            return [
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return RewardProcessor;
    }(BaseProcessor));
    reward.RewardProcessor = RewardProcessor;
})(reward || (reward = {}));
//# sourceMappingURL=RewardProcessor.js.map