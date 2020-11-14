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
var whisper;
(function (whisper) {
    var WhisperUiModule = /** @class */ (function (_super) {
        __extends(WhisperUiModule, _super);
        function WhisperUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WhisperUiModule.prototype.getModuleName = function () {
            return "WhisperUiModule";
        };
        WhisperUiModule.prototype.listProcessors = function () {
            return [new whisperUiProcessor()];
        };
        return WhisperUiModule;
    }(Module));
    whisper.WhisperUiModule = WhisperUiModule;
    var WhisperUiEvent = /** @class */ (function (_super) {
        __extends(WhisperUiEvent, _super);
        function WhisperUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WhisperUiEvent.SHOW_WHISPER_PANEL = "SHOW_WHISPER_PANEL";
        WhisperUiEvent.SELECT_ITEM_EVENT = "SELECT_ITEM_EVENT";
        WhisperUiEvent.RECIVE_NEWS_MSG_EVENT = "RECIVE_NEWS_MSG_EVENT";
        //好友列表数据变化
        WhisperUiEvent.REFRESHFRIENDlIST_EVENT = "REFRESHFRIENDlIST_EVENT";
        //复制一条消息
        WhisperUiEvent.COPY_ONE_MSG_EVENT = "COPY_ONE_MSG_EVENT";
        return WhisperUiEvent;
    }(BaseEvent));
    whisper.WhisperUiEvent = WhisperUiEvent;
    var whisperUiProcessor = /** @class */ (function (_super) {
        __extends(whisperUiProcessor, _super);
        function whisperUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        whisperUiProcessor.prototype.getName = function () {
            return "whisperUiProcessor";
        };
        whisperUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof WhisperUiEvent) {
                var $WhisperUiEvent = $event;
                if ($WhisperUiEvent.type == WhisperUiEvent.SHOW_WHISPER_PANEL) {
                    this.showPanel($WhisperUiEvent.data);
                }
                else if ($WhisperUiEvent.type == WhisperUiEvent.SELECT_ITEM_EVENT) {
                    this.selectItem($WhisperUiEvent.data);
                }
                else if ($WhisperUiEvent.type == WhisperUiEvent.RECIVE_NEWS_MSG_EVENT) {
                    this.recivenewsmsg($WhisperUiEvent.data);
                }
                else if ($WhisperUiEvent.type == WhisperUiEvent.REFRESHFRIENDlIST_EVENT) {
                    this.refreshFriendList();
                }
                else if ($WhisperUiEvent.type == WhisperUiEvent.COPY_ONE_MSG_EVENT) {
                    this.copyonemsg($WhisperUiEvent.data);
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._whisperUiPanel) {
                    this._whisperUiPanel.dispose();
                    this._whisperUiPanel = null;
                    //console.log("释放面板 _whisperUiPanel")
                }
            }
        };
        whisperUiProcessor.prototype.copyonemsg = function ($text) {
            if (this._whisperUiPanel && this._whisperUiPanel.hasStage) {
                this._whisperUiPanel.copyTxt($text);
            }
        };
        whisperUiProcessor.prototype.refreshFriendList = function () {
            if (this._whisperUiPanel && this._whisperUiPanel.whisperFriendList && this._whisperUiPanel.whisperFriendList.hasStage) {
                this._whisperUiPanel.whisperFriendList.resetData();
            }
        };
        whisperUiProcessor.prototype.recivenewsmsg = function ($guidary) {
            if (this._whisperUiPanel && this._whisperUiPanel.hasStage) {
                //来新消息了，处理一下好友列表
                this.refreshFriendList();
                //如果是正在和此人聊天。则刷新一下聊天列表
                var $guid = this._whisperUiPanel.whisperChatListPanel.guid;
                if ($guid && $guid == $guidary[0] || $guid == $guidary[1]) {
                    //正在和此人聊天，刷新聊天记录                    
                    this._whisperUiPanel.whisperChatListPanel.refreshDataByNewData($guid);
                }
            }
        };
        whisperUiProcessor.prototype.selectItem = function ($data) {
            if (this._whisperUiPanel && this._whisperUiPanel.hasStage) {
                this._whisperUiPanel.refreshData($data.data);
            }
        };
        whisperUiProcessor.prototype.showPanel = function ($guid) {
            var _this = this;
            if (!this._whisperUiPanel) {
                this._whisperUiPanel = new whisper.whisperUiPanel();
            }
            this._whisperUiPanel.load(function () {
                _this._whisperUiPanel.show($guid);
            });
        };
        whisperUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new WhisperUiEvent(WhisperUiEvent.SHOW_WHISPER_PANEL),
                new WhisperUiEvent(WhisperUiEvent.SELECT_ITEM_EVENT),
                new WhisperUiEvent(WhisperUiEvent.RECIVE_NEWS_MSG_EVENT),
                new WhisperUiEvent(WhisperUiEvent.REFRESHFRIENDlIST_EVENT),
                new WhisperUiEvent(WhisperUiEvent.COPY_ONE_MSG_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return whisperUiProcessor;
    }(BaseProcessor));
    whisper.whisperUiProcessor = whisperUiProcessor;
})(whisper || (whisper = {}));
//# sourceMappingURL=whisperUiProcessor.js.map