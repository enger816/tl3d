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
var email;
(function (email) {
    var MailModule = /** @class */ (function (_super) {
        __extends(MailModule, _super);
        function MailModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailModule.prototype.getModuleName = function () {
            return "MailModule";
        };
        MailModule.prototype.listProcessors = function () {
            return [new MailProcessor()];
        };
        return MailModule;
    }(Module));
    email.MailModule = MailModule;
    var MailEvent = /** @class */ (function (_super) {
        __extends(MailEvent, _super);
        function MailEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailEvent.SHOW_MAIL_PANEL_EVENT = "SHOW_MAIL_PANEL_EVENT"; //显示翅膀面板
        MailEvent.MAIL_CHG_EVENT = "MAIL_CHG_EVENT"; //显示翅膀面板
        return MailEvent;
    }(BaseEvent));
    email.MailEvent = MailEvent;
    var MailProcessor = /** @class */ (function (_super) {
        __extends(MailProcessor, _super);
        function MailProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailProcessor.prototype.getName = function () {
            return "MailProcessor";
        };
        MailProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MailEvent) {
                var $MailEvent = $event;
                if ($MailEvent.type == MailEvent.SHOW_MAIL_PANEL_EVENT) {
                    this.showPanel();
                }
                else if ($MailEvent.type == MailEvent.MAIL_CHG_EVENT) {
                    this.mailChg($MailEvent.data);
                }
            }
            else if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.refreshRedNode();
                }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._mailPanel) {
                    this._mailPanel.dispose();
                    this._mailPanel = null;
                    //console.log("释放面板 _mailPanel")
                }
            }
        };
        MailProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this._mailPanel) {
                this._mailPanel = new email.MailPanel();
            }
            this._mailPanel.load(function () {
                _this._mailPanel.show();
            }, true);
        };
        MailProcessor.prototype.mailChg = function ($type) {
            if (this._mailPanel && this._mailPanel.hasStage) {
                this._mailPanel.mailChg($type);
            }
            this.refreshRedNode();
        };
        MailProcessor.prototype.refreshRedNode = function () {
            var node;
            var $data = GuidData.giftPacks.getGiftDataItem();
            var hasNoRead = false;
            var hasItem = false;
            for (var i = 0; i < $data.length; i++) {
                if ($data[i].item != "") {
                    if (!$data[i].isGetItem) {
                        hasNoRead = true;
                        hasItem = true;
                    }
                }
                else {
                    if (!$data[i].isRead) {
                        hasNoRead = true;
                    }
                }
            }
            node = RedPointManager.getInstance().getNodeByID(3);
            node.show = hasNoRead;
            node = RedPointManager.getInstance().getNodeByID(4);
            node.show = hasItem;
        };
        MailProcessor.prototype.listenModuleEvents = function () {
            return [
                new MailEvent(MailEvent.SHOW_MAIL_PANEL_EVENT),
                new MailEvent(MailEvent.MAIL_CHG_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return MailProcessor;
    }(BaseProcessor));
    email.MailProcessor = MailProcessor;
})(email || (email = {}));
//# sourceMappingURL=MailProcessor.js.map