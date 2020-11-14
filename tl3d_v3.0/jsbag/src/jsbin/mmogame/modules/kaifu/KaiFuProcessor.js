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
var kaifu;
(function (kaifu) {
    var KaiFuModule = /** @class */ (function (_super) {
        __extends(KaiFuModule, _super);
        function KaiFuModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KaiFuModule.prototype.getModuleName = function () {
            return "KaiFuModule";
        };
        KaiFuModule.prototype.listProcessors = function () {
            return [new MailProcessor()];
        };
        return KaiFuModule;
    }(Module));
    kaifu.KaiFuModule = KaiFuModule;
    var KaiFuEvent = /** @class */ (function (_super) {
        __extends(KaiFuEvent, _super);
        function KaiFuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KaiFuEvent.SHOW_KAIFU_PANEL_EVENT = "SHOW_KAIFU_PANEL_EVENT"; //显示翅膀面板
        //public static MAIL_CHG_EVENT: string = "MAIL_CHG_EVENT";//显示翅膀面板
        KaiFuEvent.KAIFU_CHOUJING_CHG_EVENT = "KAIFU_CHOUJING_CHG_EVENT";
        return KaiFuEvent;
    }(BaseEvent));
    kaifu.KaiFuEvent = KaiFuEvent;
    var MailProcessor = /** @class */ (function (_super) {
        __extends(MailProcessor, _super);
        function MailProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailProcessor.prototype.getName = function () {
            return "KaiFuProcessor";
        };
        MailProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof KaiFuEvent) {
                var $KaiFuEvent = $event;
                if ($KaiFuEvent.type == KaiFuEvent.SHOW_KAIFU_PANEL_EVENT) {
                    this.showPanel();
                }
                // else if($KaiFuEvent.type == KaiFuEvent.MAIL_CHG_EVENT){
                //     this.mailChg($KaiFuEvent.data);
                // }
            }
            else if ($event instanceof ActiveEvent) {
                if ($event.type == ActiveEvent.ACTIVE_GLOBEL_CHOUJIANG_EVENT) {
                    this.choujiangChg();
                }
                else if ($event.type == ActiveEvent.ACTIVE_PLAYER_CHANGE_EVENT) {
                    this.playerDataChg();
                }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._kaifuPanel) {
                    this._kaifuPanel.dispose();
                    this._kaifuPanel = null;
                    //console.log("释放面板 _mailPanel")
                }
            }
        };
        MailProcessor.prototype.choujiangChg = function () {
            if (this._kaifuPanel && this._kaifuPanel.hasStage) {
                this._kaifuPanel.choujiangChg();
            }
        };
        MailProcessor.prototype.playerDataChg = function () {
            if (this._kaifuPanel && this._kaifuPanel.hasStage) {
                this._kaifuPanel.playerDataChg();
            }
        };
        MailProcessor.prototype.showPanel = function () {
            var _this = this;
            var ary = GuidData.globelValue.getKaiFuActiveList();
            if (!this._kaifuPanel) {
                this._kaifuPanel = new kaifu.KaiFuActivePanel();
            }
            this._kaifuPanel.load(function () {
                _this._kaifuPanel.show(ary);
            }, true);
        };
        MailProcessor.prototype.dayTargetList = function ($byte) {
            var saosrl = new s2c_activity_opt_show_rank_list();
            s2c_activity_opt_show_rank_list.read(saosrl, $byte);
            if (this._kaifuPanel && this._kaifuPanel.hasStage) {
                this._kaifuPanel.dayTargetList(saosrl);
            }
        };
        MailProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_ACTIVITY_OPT_SHOW_RANK_LIST] = function ($byte) { _this.dayTargetList($byte); };
            return obj;
        };
        MailProcessor.prototype.listenModuleEvents = function () {
            return [
                new KaiFuEvent(KaiFuEvent.SHOW_KAIFU_PANEL_EVENT),
                new KaiFuEvent(KaiFuEvent.KAIFU_CHOUJING_CHG_EVENT),
                new ActiveEvent(ActiveEvent.ACTIVE_GLOBEL_CHOUJIANG_EVENT),
                new ActiveEvent(ActiveEvent.ACTIVE_PLAYER_CHANGE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return MailProcessor;
    }(BaseProcessor));
    kaifu.MailProcessor = MailProcessor;
})(kaifu || (kaifu = {}));
/**活动事件 */
var ActiveEvent = /** @class */ (function (_super) {
    __extends(ActiveEvent, _super);
    function ActiveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActiveEvent.ACTIVE_PLAYER_CHANGE_EVENT = "ACTIVE_PLAYER_CHANGE_EVENT"; //角色活动数据变化
    ActiveEvent.ACTIVE_GLOBEL_CHOUJIANG_EVENT = "ACTIVE_GLOBEL_CHOUJIANG_EVENT"; //活动抽奖数据变化
    return ActiveEvent;
}(BaseEvent));
//# sourceMappingURL=KaiFuProcessor.js.map