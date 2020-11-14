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
var charbg;
(function (charbg) {
    var CharBgEvent = /** @class */ (function (_super) {
        __extends(CharBgEvent, _super);
        function CharBgEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CharBgEvent.SHOW_CHAR_BG_PANEL = "SHOW_CHAR_BG_PANEL"; //显示面板
        CharBgEvent.SHOW_CHAR_INFO_PANEL = "SHOW_CHAR_INFO_PANEL"; //显示面板
        CharBgEvent.REFRESH_TIME_CHAR_BG_PANEL = "REFRESH_TIME_CHAR_BG_PANEL"; //显示面板
        CharBgEvent.BGDATA_CHANGE_EVENT = "bgdata_change_event";
        CharBgEvent.EQUVIEW_CHANGE_EVENT = "equview_change_event";
        CharBgEvent.EQUDATA_CHANG_EVENT = "equdata_chang_event";
        CharBgEvent.SHOW_VIP_EVENT = "SHOW_VIP_EVENT";
        CharBgEvent.VIP_GIFT_EVENT = "SHOW_VIP_GIFT_EVENT";
        CharBgEvent.VIP_CHG_EVENT = "VIP_CHG_EVENT";
        CharBgEvent.BAG_DATA_INIT_EVENT = "BAG_DATA_INIT_EVENT";
        CharBgEvent.HIDE_ALL_TIP_EVENT = "HIDE_ALL_TIP_EVENT";
        return CharBgEvent;
    }(BaseEvent));
    charbg.CharBgEvent = CharBgEvent;
    var ItemTipEvent = /** @class */ (function (_super) {
        __extends(ItemTipEvent, _super);
        function ItemTipEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.buttonType = -1; //-1纯信息 1装备栏装备 2背包物品 3背包装备 4家族仓库中物品 5上交家族装备
            return _this;
        }
        ItemTipEvent.SHOW_TIP_ITEM_EVENT = "show_tip_item_event";
        ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT = "show_tip_item_id_event";
        return ItemTipEvent;
    }(BaseEvent));
    charbg.ItemTipEvent = ItemTipEvent;
    var CharBgModule = /** @class */ (function (_super) {
        __extends(CharBgModule, _super);
        function CharBgModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CharBgModule.prototype.getModuleName = function () {
            return "CharBgModule";
        };
        CharBgModule.prototype.listProcessors = function () {
            return [new CharBgProcessor()];
        };
        return CharBgModule;
    }(Module));
    charbg.CharBgModule = CharBgModule;
    var CharBgProcessor = /** @class */ (function (_super) {
        __extends(CharBgProcessor, _super);
        function CharBgProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseTipItemData = new BagItemData;
            return _this;
        }
        CharBgProcessor.prototype.getName = function () {
            return "CharBgProcessor";
        };
        CharBgProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.PLAYER_FIELD_FORCE) {
                    if (this._charBgPanel) {
                        this._charBgPanel.refreshForce();
                    }
                }
                else if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL || $event.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL) {
                    if (this._charBgPanel) {
                        this._charBgPanel.refreshLevel();
                    }
                    if (this._charBgPanel && this._charBgPanel.smeltPanel && this._charBgPanel.smeltPanel.hasStage) {
                        this._charBgPanel.smeltPanel.drawBtn();
                    }
                }
                // else if ($event.type == EngineEvent.MONEY_TYPE_SILVER) {
                //     if (this._charBgPanel) {
                //         this._charBgPanel.refreshMoney();
                //     }
                // } else if ($event.type == EngineEvent.MONEY_TYPE_GOLD_INGOT) {
                //     if (this._charBgPanel) {
                //         this._charBgPanel.refreshYuanbao();
                //     }
                // }
            }
            else if ($event instanceof CharBgEvent) {
                var evt = $event;
                if (evt.type == CharBgEvent.SHOW_CHAR_BG_PANEL) {
                    this.showChatEvent(evt.showType);
                }
                else if (evt.type == CharBgEvent.BGDATA_CHANGE_EVENT) {
                    this.setBgChgData(evt.data, evt.showType);
                }
                else if (evt.type == CharBgEvent.EQUVIEW_CHANGE_EVENT) {
                    this.setPanelRole(evt.showType);
                }
                else if (evt.type == CharBgEvent.SHOW_VIP_EVENT) {
                    this.showVip();
                }
                else if (evt.type == CharBgEvent.VIP_CHG_EVENT) {
                    this.vipChg();
                }
                else if (evt.type == CharBgEvent.HIDE_ALL_TIP_EVENT) {
                    this.hideAllTip();
                }
                else if (evt.type == CharBgEvent.VIP_GIFT_EVENT) {
                    this.vipGift();
                }
            }
            else if ($event instanceof ItemTipEvent) {
                var itemevt = $event;
                if (itemevt.type == ItemTipEvent.SHOW_TIP_ITEM_EVENT) {
                    this.showTip(itemevt.data, itemevt.buttonType);
                }
                else if (itemevt.type == ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT) {
                    this.showBaseTip(itemevt.id);
                }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._charBgPanel) {
                    this._charBgPanel.dispose();
                    this._charBgPanel = null;
                    //console.log("释放面板 _charBgPanel")
                }
            }
        };
        CharBgProcessor.prototype.showChatEvent = function ($type) {
            var _this = this;
            if (!this._charBgPanel) {
                this._charBgPanel = new charbg.CharBgPanel();
            }
            this._charBgPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this._charBgPanel);
                _this._charBgPanel.add($type);
                SceneManager.getInstance().render = false;
                var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_BAG;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        CharBgProcessor.prototype.showVip = function () {
            var _this = this;
            if (!this._vipPanel) {
                this._vipPanel = new charbg.VipPanel();
            }
            this._vipPanel.load(function () {
                _this._vipPanel.show();
            });
        };
        CharBgProcessor.prototype.vipGift = function () {
            if (this._vipPanel && this._vipPanel.hasStage) {
                this._vipPanel.redrawVipInfo();
            }
        };
        CharBgProcessor.prototype.vipChg = function () {
            if (this._vipPanel && this._vipPanel.hasStage) {
                this._vipPanel.drawBaseVip();
            }
        };
        CharBgProcessor.prototype.setPanelRole = function ($type) {
            if (this._charBgPanel) {
                this._charBgPanel.refreshRoleType($type);
            }
        };
        // private wingChg():void{
        //     if(this._charBgPanel){
        //         this._charBgPanel.setWing();
        //     }
        // }
        CharBgProcessor.prototype.showTip = function ($data, $btnType) {
            // if (!this._goodsTip){
            //     this._goodsTip = new GoodsTip();
            //     //this._goodsTip.setUIAtlas(this._charBgPanel._baseUiAtlas);
            // }
            //this._goodsTip.setData($data);
            //this._goodsTip.show($showType);
            GoodsTip.getInstance().show($data, $btnType);
        };
        CharBgProcessor.prototype.hideAllTip = function () {
            GoodsTip.getInstance().hideAllTip();
        };
        CharBgProcessor.prototype.showBaseTip = function (itemId) {
            this.baseTipItemData.entryData = TableData.getInstance().getData(TableData.tb_item_template, itemId);
            GoodsTip.getInstance().show(this.baseTipItemData, -1);
        };
        CharBgProcessor.prototype.setBgChgData = function ($data, $showType) {
            if (!this._charBgPanel) {
                return;
            }
            this._charBgPanel.bgDataChg($data, $showType);
        };
        CharBgProcessor.prototype.showCharInfo = function (spo) {
            var _this = this;
            if (!this._charInfo) {
                this._charInfo = new charbg.CharInfoPanel;
            }
            this._charInfo.load(function () {
                _this._charInfo.show(spo);
            });
        };
        CharBgProcessor.prototype.receiveInfo = function ($byte) {
            var pvo = new PlayerOverview;
            var spo = new s2c_show_player_overview();
            s2c_show_player_overview.read(spo, $byte);
            pvo.spo = spo;
            var equLen = $byte.readUint16();
            for (var i = 0; i < equLen; i++) {
                var ei = new equip_info();
                ei.equip = $byte.readUTF();
                ei.strength_lv = $byte.readUint32();
                ei.refine_rank = $byte.readUint32();
                ei.refine_star = $byte.readUint32();
                ei.gem1_lv = $byte.readUint32();
                ei.gem2_lv = $byte.readUint32();
                ei.gem3_lv = $byte.readUint32();
                pvo.equAry.push(ei);
            }
            this.showCharInfo(pvo);
        };
        CharBgProcessor.prototype.listenModuleEvents = function () {
            return [
                new CharBgEvent(CharBgEvent.SHOW_CHAR_BG_PANEL),
                new CharBgEvent(CharBgEvent.SHOW_CHAR_INFO_PANEL),
                new CharBgEvent(CharBgEvent.HIDE_ALL_TIP_EVENT),
                new CharBgEvent(CharBgEvent.REFRESH_TIME_CHAR_BG_PANEL),
                //new CharBgEvent(CharBgEvent.SHOW_TIP_BG_EVENT),
                new ItemTipEvent(ItemTipEvent.SHOW_TIP_ITEM_EVENT),
                new ItemTipEvent(ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT),
                new CharBgEvent(CharBgEvent.BGDATA_CHANGE_EVENT),
                new CharBgEvent(CharBgEvent.EQUVIEW_CHANGE_EVENT),
                new CharBgEvent(CharBgEvent.SHOW_VIP_EVENT),
                new CharBgEvent(CharBgEvent.VIP_CHG_EVENT),
                new CharBgEvent(CharBgEvent.VIP_GIFT_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                //new wing.WingEvent(wing.WingEvent.WING_ID_CHANG_EVENT),
                // new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                // new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        CharBgProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SHOW_PLAYER_OVERVIEW] = function ($byte) { _this.receiveInfo($byte); };
            return obj;
        };
        return CharBgProcessor;
    }(BaseProcessor));
    charbg.CharBgProcessor = CharBgProcessor;
    var PlayerOverview = /** @class */ (function () {
        function PlayerOverview() {
            this.equAry = new Array;
        }
        return PlayerOverview;
    }());
    charbg.PlayerOverview = PlayerOverview;
})(charbg || (charbg = {}));
//# sourceMappingURL=CharBgProcessor.js.map