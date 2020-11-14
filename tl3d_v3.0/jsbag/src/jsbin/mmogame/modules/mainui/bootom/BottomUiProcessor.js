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
var bottomui;
(function (bottomui) {
    var BottomUiModule = /** @class */ (function (_super) {
        __extends(BottomUiModule, _super);
        function BottomUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BottomUiModule.prototype.getModuleName = function () {
            return "BottomUiModule";
        };
        BottomUiModule.prototype.listProcessors = function () {
            return [new BottomUiProcessor()];
        };
        return BottomUiModule;
    }(Module));
    bottomui.BottomUiModule = BottomUiModule;
    var BottomUiEvent = /** @class */ (function (_super) {
        __extends(BottomUiEvent, _super);
        function BottomUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BottomUiEvent.SHOW_BOTTOM_UI_PANEL = "SHOW_BOTTOM_UI_PANEL";
        BottomUiEvent.HIDE_BOTTOM_UI_PANEL = "HIDE_BOTTOM_UI_PANEL";
        BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO = "BOTTOM_SYSTIME_HORM_INFO";
        BottomUiEvent.BOTTOM_REFRESH_INFO_ICON = "BOTTOM_REFRESH_INFO_ICON";
        BottomUiEvent.BOTTOM_REFRESH_CHAT_INFO = "BOTTOM_REFRESH_CHAT_INFO";
        return BottomUiEvent;
    }(BaseEvent));
    bottomui.BottomUiEvent = BottomUiEvent;
    var BottomUiProcessor = /** @class */ (function (_super) {
        __extends(BottomUiProcessor, _super);
        function BottomUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BottomUiProcessor.prototype.getName = function () {
            return "BottomUiProcessor";
        };
        BottomUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof BottomUiEvent) {
                var $topUiEvent = $event;
                if ($topUiEvent.type == BottomUiEvent.SHOW_BOTTOM_UI_PANEL) {
                    if (!GuidData.map.is1V1()) {
                        this.showPanel();
                    }
                }
                if (this.bootomUiPanel) {
                    if ($topUiEvent.type == BottomUiEvent.HIDE_BOTTOM_UI_PANEL) {
                        this.hidePanel();
                    }
                    if ($topUiEvent.type == BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO) {
                        this.bootomUiPanel.pushSysInfoTop($topUiEvent.data);
                    }
                    if ($topUiEvent.type == BottomUiEvent.BOTTOM_REFRESH_CHAT_INFO) {
                        this.restChatListh();
                    }
                    if ($topUiEvent.type == BottomUiEvent.BOTTOM_REFRESH_INFO_ICON) {
                        this.bootomUiPanel.refreshInfoTipManager();
                        console.log("提示变化");
                    }
                }
            }
            // if ($event instanceof faction.GiftreceiveEvent) {
            //     if (this.bootomUiPanel) {
            //         var $fiftprocessingEvent: faction.GiftreceiveEvent = <faction.GiftreceiveEvent>$event;
            //         if ($fiftprocessingEvent.type == faction.GiftreceiveEvent.QUEEN_RECEIVE_GIFT_EVENT) {
            //             this.bootomUiPanel.refreshInfoTipManager();
            //         }
            //         if ($fiftprocessingEvent.type == faction.GiftreceiveEvent.QUEEN_RECEIVE_REMOVE_GIFT_EVENT) {
            //             GuidData.faction.queenGiftUncheckNum = 0
            //             this.bootomUiPanel.refreshInfoTipManager();
            //         }
            //     }
            // }
            if (this.bootomUiPanel) {
                if ($event instanceof fightui.FightUiEvent) {
                    this.bootomUiPanel.setShowChatGrid(true);
                }
                if ($event instanceof homeui.HomeUiEvent) {
                    this.bootomUiPanel.setShowChatGrid(false);
                }
            }
        };
        BottomUiProcessor.prototype.hidePanel = function () {
            if (this.bootomUiPanel) {
                UIManager.getInstance().removeUIContainer(this.bootomUiPanel);
            }
        };
        BottomUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.bootomUiPanel) {
                this.bootomUiPanel = new bottomui.BottomUiPanel();
            }
            this.bootomUiPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.bootomUiPanel);
                _this.bootomUiPanel.refresh();
            }, false);
        };
        BottomUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new BottomUiEvent(BottomUiEvent.SHOW_BOTTOM_UI_PANEL),
                new BottomUiEvent(BottomUiEvent.HIDE_BOTTOM_UI_PANEL),
                new BottomUiEvent(BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO),
                new BottomUiEvent(BottomUiEvent.BOTTOM_REFRESH_INFO_ICON),
                new BottomUiEvent(BottomUiEvent.BOTTOM_REFRESH_CHAT_INFO),
                new fightui.FightUiEvent(fightui.FightUiEvent.SHOW_FIGHT_UI_PANEL),
                new homeui.HomeUiEvent(homeui.HomeUiEvent.SHOW_HOME_UI_PANEL),
            ];
        };
        BottomUiProcessor.prototype.restChatListh = function () {
            if (this.bootomUiPanel && this.bootomUiPanel.bottomChatPanel) {
                this.bootomUiPanel.bottomChatPanel.restChatList();
                ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.CHAT_INFO_TO_PANEL));
            }
        };
        BottomUiProcessor.prototype.smsgSendChat = function ($byte) {
            var $vo = new s2c_send_chat();
            s2c_send_chat.read($vo, $byte);
            Chat.ChatModel.getInstance().pushNewMes($vo);
            //console.log("==聊天==", $vo);
            if ($vo.channel == SharedDef.CHAT_TYPE_HORM) {
                this.bootomUiPanel.pushSysInfoTop($vo);
            }
            this.restChatListh();
            if ($vo.channel == SharedDef.CHAT_TYPE_WHISPER) {
                ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
                var aaa = new whisper.WhisperUiEvent(whisper.WhisperUiEvent.RECIVE_NEWS_MSG_EVENT);
                aaa.data = [$vo.guid, $vo.to_guid];
                ModuleEventManager.dispatchEvent(aaa);
            }
        };
        BottomUiProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SEND_CHAT] = function ($byte) { _this.smsgSendChat($byte); };
            return obj;
        };
        return BottomUiProcessor;
    }(BaseProcessor));
    bottomui.BottomUiProcessor = BottomUiProcessor;
})(bottomui || (bottomui = {}));
//# sourceMappingURL=BottomUiProcessor.js.map