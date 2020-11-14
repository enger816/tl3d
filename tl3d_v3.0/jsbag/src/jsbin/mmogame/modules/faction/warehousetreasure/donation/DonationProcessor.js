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
var donation;
(function (donation) {
    var DonationModule = /** @class */ (function (_super) {
        __extends(DonationModule, _super);
        function DonationModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DonationModule.prototype.getModuleName = function () {
            return "DonationModule";
        };
        DonationModule.prototype.listProcessors = function () {
            return [new DonationRrocessor()];
        };
        return DonationModule;
    }(Module));
    donation.DonationModule = DonationModule;
    var DonationEvent = /** @class */ (function (_super) {
        __extends(DonationEvent, _super);
        function DonationEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DonationEvent.SHOW_DONATION_PANEL = "SHOW_DONATION_PANEL";
        DonationEvent.HIDE_DONATION_PANEL = "HIDE_DONATION_PANEL";
        return DonationEvent;
    }(BaseEvent));
    donation.DonationEvent = DonationEvent;
    var DonationRrocessor = /** @class */ (function (_super) {
        __extends(DonationRrocessor, _super);
        function DonationRrocessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DonationRrocessor.prototype.getName = function () {
            return "DonationRrocessor";
        };
        DonationRrocessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof DonationEvent) {
                var evt = $event;
                if (evt.type == DonationEvent.SHOW_DONATION_PANEL) {
                    this.showPanel(evt.data);
                }
                if (this.donationPanel) {
                    if (evt.type == DonationEvent.HIDE_DONATION_PANEL) {
                        this.hidePanel();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.donationPanel) {
                    this.donationPanel.dispose();
                    this.donationPanel = null;
                    //console.log("释放面板 exchangepPanel")
                }
            }
        };
        DonationRrocessor.prototype.hidePanel = function () {
            this.donationPanel.hide();
        };
        DonationRrocessor.prototype.showPanel = function ($type) {
            var _this = this;
            if (!this.donationPanel) {
                this.donationPanel = new donation.DonationPanel();
            }
            this.donationPanel.load(function () {
                _this.donationPanel.show($type);
            }, false);
        };
        DonationRrocessor.prototype.listenModuleEvents = function () {
            return [
                new DonationEvent(DonationEvent.SHOW_DONATION_PANEL),
                new DonationEvent(DonationEvent.HIDE_DONATION_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return DonationRrocessor;
    }(BaseProcessor));
    donation.DonationRrocessor = DonationRrocessor;
})(donation || (donation = {}));
//# sourceMappingURL=DonationProcessor.js.map