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
var wintittle;
(function (wintittle) {
    var WindowRestTittleModule = /** @class */ (function (_super) {
        __extends(WindowRestTittleModule, _super);
        function WindowRestTittleModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WindowRestTittleModule.prototype.getModuleName = function () {
            return "WindowRestTittleModule";
        };
        WindowRestTittleModule.prototype.listProcessors = function () {
            return [new WindowRestTittleProcessor()];
        };
        return WindowRestTittleModule;
    }(Module));
    wintittle.WindowRestTittleModule = WindowRestTittleModule;
    var WindowRestTittleEvent = /** @class */ (function (_super) {
        __extends(WindowRestTittleEvent, _super);
        function WindowRestTittleEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WindowRestTittleEvent.SHOW_WINDOW_RES_TITTLE_PANEL = "SHOW_WINDOW_RES_TITTLE_PANEL";
        WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL = "HIDE_WINDOW_RES_TITTLE_PANEL";
        WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL = "SHOW_WINDOW_RES_PANEL";
        WindowRestTittleEvent.HIDE_WINDOW_RES_PANEL = "HIDE_WINDOW_RES_PANEL";
        WindowRestTittleEvent.LOCK_WINDOW_RES_TITTLE_PANEL = "LOCK_WINDOW_RES_TITTLE_PANEL";
        WindowRestTittleEvent.UNLOCK_WINDOW_RES_TITTLE_PANEL = "UNLOCK_WINDOW_RES_TITTLE_PANEL";
        WindowRestTittleEvent.REFRESH_WINDOW_RES_TITTLE_PANEL = "REFRESH_WINDOW_RES_TITTLE_PANEL";
        return WindowRestTittleEvent;
    }(BaseEvent));
    wintittle.WindowRestTittleEvent = WindowRestTittleEvent;
    var WindowRestTittleProcessor = /** @class */ (function (_super) {
        __extends(WindowRestTittleProcessor, _super);
        function WindowRestTittleProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WindowRestTittleProcessor.prototype.getName = function () {
            return "WindowRestTittleProcessor";
        };
        WindowRestTittleProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof WindowRestTittleEvent) {
                var evt = $event;
                if (evt.type == WindowRestTittleEvent.SHOW_WINDOW_RES_TITTLE_PANEL) {
                    this.hidePanel();
                    this.showPanel(evt.data);
                }
                else if (evt.type == WindowRestTittleEvent.LOCK_WINDOW_RES_TITTLE_PANEL) {
                    if (this.donationPanel) {
                        this.donationPanel.lock = true;
                    }
                }
                else if (evt.type == WindowRestTittleEvent.UNLOCK_WINDOW_RES_TITTLE_PANEL) {
                    if (this.donationPanel) {
                        this.donationPanel.lock = false;
                    }
                }
                else if (evt.type == WindowRestTittleEvent.REFRESH_WINDOW_RES_TITTLE_PANEL) {
                    if (this.donationPanel) {
                        this.donationPanel.forceRefresh();
                    }
                }
                if (this.donationPanel) {
                    if (evt.type == WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL) {
                        if (!UIManager.getInstance().hasWindowUI()) {
                            this.hidePanel();
                        }
                    }
                    // if (evt.type == WindowRestTittleEvent.REFRISH_RES_DATA) {
                    //     this.donationPanel.refresh()
                    // }
                }
                if (evt.type == WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL) {
                    this.showResPanel(evt.data);
                }
                else if (evt.type == WindowRestTittleEvent.HIDE_WINDOW_RES_PANEL) {
                    this.hideResPanel();
                }
            }
            if ($event instanceof EngineEvent) {
                if (this.donationPanel) {
                    this.donationPanel.refresh();
                }
            }
        };
        WindowRestTittleProcessor.prototype.hidePanel = function () {
            if (this.donationPanel) {
                this.donationPanel.lock = false;
                UIManager.getInstance().removeUIContainer(this.donationPanel);
            }
        };
        WindowRestTittleProcessor.prototype.showPanel = function ($data) {
            var _this = this;
            if (!this.donationPanel) {
                this.donationPanel = new wintittle.WindowRestTittlePanel();
            }
            this.donationPanel.load(function () {
                _this.donationPanel.lock = false;
                _this.donationPanel.refresh($data);
                UIManager.getInstance().addUIContainer(_this.donationPanel);
            }, false);
        };
        WindowRestTittleProcessor.prototype.showResPanel = function ($data) {
            var _this = this;
            if (!this.windowResPanel) {
                this.windowResPanel = new WindowResPanel();
            }
            this.windowResPanel.load(function () {
                _this.windowResPanel.show($data);
            }, false);
        };
        WindowRestTittleProcessor.prototype.hideResPanel = function () {
            if (this.windowResPanel) {
                this.windowResPanel.hide();
            }
        };
        WindowRestTittleProcessor.prototype.listenModuleEvents = function () {
            return [
                new WindowRestTittleEvent(WindowRestTittleEvent.SHOW_WINDOW_RES_TITTLE_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.HIDE_WINDOW_RES_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.UNLOCK_WINDOW_RES_TITTLE_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.LOCK_WINDOW_RES_TITTLE_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.REFRESH_WINDOW_RES_TITTLE_PANEL),
                // new WindowRestTittleEvent(WindowRestTittleEvent.REFRISH_RES_DATA),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
            ];
        };
        return WindowRestTittleProcessor;
    }(BaseProcessor));
    wintittle.WindowRestTittleProcessor = WindowRestTittleProcessor;
})(wintittle || (wintittle = {}));
//# sourceMappingURL=WindowRestTittleProcessor.js.map