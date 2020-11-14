var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var menutwo;
(function (menutwo) {
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var UIData = Pan3d.UIData;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var Panel = win.Panel;
    var MenuTwoEvent = /** @class */ (function (_super) {
        __extends(MenuTwoEvent, _super);
        function MenuTwoEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MenuTwoEvent.SHOW_RIGHT_MENU = "SHOW_RIGHT_MENU";
        MenuTwoEvent.SHOW_COMBOX_MENU = "SHOW_COMBOX_MENU";
        return MenuTwoEvent;
    }(BaseEvent));
    menutwo.MenuTwoEvent = MenuTwoEvent;
    var MenuTwoModule = /** @class */ (function (_super) {
        __extends(MenuTwoModule, _super);
        function MenuTwoModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MenuTwoModule.prototype.getModuleName = function () {
            return "MenuTwoModule";
        };
        MenuTwoModule.prototype.listProcessors = function () {
            return [new MenuTwoProcessor()];
        };
        return MenuTwoModule;
    }(Module));
    menutwo.MenuTwoModule = MenuTwoModule;
    var MenuTwoProcessor = /** @class */ (function (_super) {
        __extends(MenuTwoProcessor, _super);
        function MenuTwoProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MenuTwoProcessor.prototype.getName = function () {
            return "MenuTwoProcessor";
        };
        MenuTwoProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MenuTwoEvent) {
                var $materialEvent = $event;
                if ($materialEvent.type == MenuTwoEvent.SHOW_RIGHT_MENU) {
                    this.showMenuPanel($materialEvent.data);
                }
                if ($materialEvent.type == MenuTwoEvent.SHOW_COMBOX_MENU) {
                    console.log("有键菜单");
                    this.showComboBoxMenuPanel($materialEvent);
                }
            }
        };
        MenuTwoProcessor.prototype.showComboBoxMenuPanel = function (evt) {
            if (!this._comboBoxMenuPanel) {
                this._comboBoxMenuPanel = new menutwo.ComboTwoBoxMenu();
            }
            var posv2d = evt.posv2d;
            console.log("posv2d", posv2d);
            this._comboBoxMenuPanel.left = posv2d.x;
            this._comboBoxMenuPanel.top = posv2d.y;
            this._comboBoxMenuPanel.showComboBoxList(evt.comboxData, evt.comboxFun);
            this.addUIContainer(this._comboBoxMenuPanel);
        };
        MenuTwoProcessor.prototype.showMenuPanel = function (value) {
            if (!this._MenuTwoPanel) {
                this._MenuTwoPanel = new menutwo.MenuTwoPanel();
            }
            var posv2d = value.mouse;
            this._MenuTwoPanel.left = posv2d.x / UIData.Scale;
            this._MenuTwoPanel.top = posv2d.y / UIData.Scale;
            this.addUIContainer(this._MenuTwoPanel);
            this._MenuTwoPanel.initMenuData(value);
            this._MenuTwoPanel.showMainUi();
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        };
        MenuTwoProcessor.prototype.addUIContainer = function (value) {
            if (!this.topMenuPanel) {
                this.topMenuPanel = new Panel();
                win.LayerManager.getInstance().addPanel(this.topMenuPanel, 200);
            }
            this.topMenuPanel.addUIContainer(value);
        };
        MenuTwoProcessor.prototype.removeUIContainer = function (value) {
            if (this.topMenuPanel) {
                this.topMenuPanel.removeUIContainer(value);
            }
        };
        MenuTwoProcessor.prototype.onMouseDown = function ($evt) {
        };
        MenuTwoProcessor.prototype.listenModuleEvents = function () {
            return [
                new MenuTwoEvent(MenuTwoEvent.SHOW_RIGHT_MENU),
                new MenuTwoEvent(MenuTwoEvent.SHOW_COMBOX_MENU),
            ];
        };
        return MenuTwoProcessor;
    }(BaseProcessor));
    menutwo.MenuTwoProcessor = MenuTwoProcessor;
})(menutwo || (menutwo = {}));
//# sourceMappingURL=MenuTwoProcessor.js.map