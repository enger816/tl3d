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
var platform;
(function (platform) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var PlatFormEvent = /** @class */ (function (_super) {
        __extends(PlatFormEvent, _super);
        function PlatFormEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlatFormEvent.SHOW_PLAT_FORM_PANEL = "SHOW_TIME_GIFT_PANEL";
        PlatFormEvent.HIDE_PLAT_FORM_PANEL = "HIDE_PLAT_FORM_PANEL";
        PlatFormEvent.CLIK_PLAT_OTHER_GAME = "CLIK_PLAT_OTHER_GAME";
        return PlatFormEvent;
    }(BaseEvent));
    platform.PlatFormEvent = PlatFormEvent;
    var PlatFormModule = /** @class */ (function (_super) {
        __extends(PlatFormModule, _super);
        function PlatFormModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlatFormModule.prototype.getModuleName = function () {
            return "PlatFormModule";
        };
        PlatFormModule.prototype.listProcessors = function () {
            return [
                new PlatFormProcessor()
            ];
        };
        return PlatFormModule;
    }(Module));
    platform.PlatFormModule = PlatFormModule;
    var PlatFormProcessor = /** @class */ (function (_super) {
        __extends(PlatFormProcessor, _super);
        function PlatFormProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlatFormProcessor.prototype.getName = function () {
            return "PlatFormProcessor";
        };
        PlatFormProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case PlatFormEvent.SHOW_PLAT_FORM_PANEL:
                    this.showPlatFramePnae();
                    break;
                case PlatFormEvent.HIDE_PLAT_FORM_PANEL:
                    if (this._platFormPanel) {
                        this._platFormPanel.hidePanel();
                    }
                    break;
                default:
                    break;
            }
        };
        PlatFormProcessor.prototype.showPlatFramePnae = function () {
            var _this = this;
            var $url = "https://jsonconfig.chiji-h5.com/json/wdqq/gamelist.json";
            if (GameData.devicetypepc) {
                $url = "res/gamelist.json";
            }
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE, function ($liststr) {
                var $obj = JSON.parse($liststr);
                if ($obj) {
                    if (!_this._platFormPanel) {
                        _this._platFormPanel = new platform.PlatFormPanel();
                    }
                    _this._platFormPanel.refrishData($obj);
                    _this._platFormPanel.showPanel();
                }
            });
        };
        PlatFormProcessor.prototype.listenModuleEvents = function () {
            return [
                new PlatFormEvent(PlatFormEvent.SHOW_PLAT_FORM_PANEL),
                new PlatFormEvent(PlatFormEvent.HIDE_PLAT_FORM_PANEL),
            ];
        };
        return PlatFormProcessor;
    }(BaseProcessor));
    platform.PlatFormProcessor = PlatFormProcessor;
})(platform || (platform = {}));
//# sourceMappingURL=PlatFormProcessor.js.map