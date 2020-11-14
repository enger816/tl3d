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
var kuafu;
(function (kuafu) {
    var KuaFu3v3PkEvent = /** @class */ (function (_super) {
        __extends(KuaFu3v3PkEvent, _super);
        function KuaFu3v3PkEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KuaFu3v3PkEvent.SHOW_KUAFU_PK_SCENE_EVENT = "SHOW_KUAFU_PK_SCENE_EVENT";
        KuaFu3v3PkEvent.KUAFU_3V3_FIELDS_REFRESH_EVENT = "KUAFU_3V3_FIELDS_REFRESH_EVENT";
        KuaFu3v3PkEvent.KUAFU_3V3_FINISH_EVENT = "KUAFU_3V3_FINISH_EVENT";
        return KuaFu3v3PkEvent;
    }(BaseEvent));
    kuafu.KuaFu3v3PkEvent = KuaFu3v3PkEvent;
    var KuaFu3v3PkProcessor = /** @class */ (function (_super) {
        __extends(KuaFu3v3PkProcessor, _super);
        function KuaFu3v3PkProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KuaFu3v3PkProcessor.prototype.getName = function () {
            return "KuaFu3v3PkProcessor";
        };
        KuaFu3v3PkProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof KuaFu3v3PkEvent) {
                var evt = $event;
                if (evt.type == KuaFu3v3PkEvent.SHOW_KUAFU_PK_SCENE_EVENT) {
                    this.showKuaFuPkPanel();
                    // GameInstance.mainUi.topLeftPanel.hide()
                }
                if (evt.type == KuaFu3v3PkEvent.KUAFU_3V3_FIELDS_REFRESH_EVENT) {
                    if (this._kuaFuPkPanel) {
                        this._kuaFuPkPanel.refresh();
                    }
                }
                if (evt.type == KuaFu3v3PkEvent.KUAFU_3V3_FINISH_EVENT) {
                    TimeUtil.addTimeOut(3000, function () {
                        kuafu.KuaFu3v3Model.getInstance().end = true;
                        kuafu.KuaFu3v3Model.getInstance().refreshKufuData();
                        if (!_this._kuaFuEndPanel) {
                            _this._kuaFuEndPanel = new kuafu.Kuafu3V3FinishPanel();
                        }
                        else {
                            _this._kuaFuEndPanel.refrish();
                        }
                        UIManager.getInstance().addUIContainer(_this._kuaFuEndPanel);
                        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                    });
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._kuaFuEndPanel) {
                    this._kuaFuEndPanel.dispose();
                    this._kuaFuEndPanel = null;
                    //console.log("释放面板 _kuaFuEndPanel")
                }
                if (panelEvent.panel == this._kuaFuPkPanel) {
                    this._kuaFuPkPanel.dispose();
                    this._kuaFuPkPanel = null;
                    //console.log("释放面板 _kuaFuPkPanel")
                }
            }
        };
        KuaFu3v3PkProcessor.prototype.showKuaFuPkPanel = function () {
            var _this = this;
            kuafu.KuaFu3v3Model.getInstance().end = false;
            if (!this._kuaFuPkPanel) {
                this._kuaFuPkPanel = new kuafu.KuaFu3v3PkPanel();
            }
            this._kuaFuPkPanel.load(function () {
                _this._kuaFuPkPanel.show();
                _this._kuaFuPkPanel.refresh();
            });
        };
        KuaFu3v3PkProcessor.prototype.listenModuleEvents = function () {
            return [
                new KuaFu3v3PkEvent(KuaFu3v3PkEvent.SHOW_KUAFU_PK_SCENE_EVENT),
                new KuaFu3v3PkEvent(KuaFu3v3PkEvent.KUAFU_3V3_FINISH_EVENT),
                new KuaFu3v3PkEvent(KuaFu3v3PkEvent.KUAFU_3V3_FIELDS_REFRESH_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        KuaFu3v3PkProcessor.prototype.smsgKuafu3V3KillDetail = function ($byte) {
            var $aIndx = $byte.readUint32();
            var $bIndx = $byte.readUint32();
            if (this._kuaFuPkPanel) {
                this._kuaFuPkPanel.showKillLastInfo($aIndx, $bIndx);
            }
        };
        KuaFu3v3PkProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_KUAFU_3V3_KILL_DETAIL] = function ($byte) { _this.smsgKuafu3V3KillDetail($byte); };
            return obj;
        };
        return KuaFu3v3PkProcessor;
    }(BaseProcessor));
    kuafu.KuaFu3v3PkProcessor = KuaFu3v3PkProcessor;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3PkProcessor.js.map