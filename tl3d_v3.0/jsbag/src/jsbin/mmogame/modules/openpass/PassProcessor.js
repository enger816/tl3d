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
var pass;
(function (pass) {
    var PassEvent = /** @class */ (function (_super) {
        __extends(PassEvent, _super);
        function PassEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PassEvent.SHOW_PASS_PANEL = "SHOW_PASS_PANEL"; //显示面板
        PassEvent.HIDE_PASS_PANEL = "HIDE_PASS_PANEL"; //隐藏面板
        PassEvent.SHOW_BOXREWARD_PANEL = "SHOW_BOXREWARD_PANEL"; //显示宝箱奖励面板
        PassEvent.HIDE_BOXREWARD_PANEL = "HIDE_BOXREWARD_PANEL"; //隐藏宝箱奖励面板
        PassEvent.SHOW_BOSS_PANEL = "SHOW_BOSS_PANEL"; //显示宝箱奖励面板
        PassEvent.HIDE_BOSS_PANEL = "HIDE_BOSS_PANEL"; //隐藏宝箱奖励面板
        PassEvent.REFFRESH_BOX_PANEL = "REFFRESH_BOX_PANEL"; //宝箱奖励刷新面板
        return PassEvent;
    }(BaseEvent));
    pass.PassEvent = PassEvent;
    var PassModule = /** @class */ (function (_super) {
        __extends(PassModule, _super);
        function PassModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PassModule.prototype.getModuleName = function () {
            return "PassModule";
        };
        PassModule.prototype.listProcessors = function () {
            return [new PassProcessor()];
        };
        return PassModule;
    }(Module));
    pass.PassModule = PassModule;
    var PassProcessor = /** @class */ (function (_super) {
        __extends(PassProcessor, _super);
        function PassProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PassProcessor.prototype.getName = function () {
            return "PassProcessor";
        };
        PassProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof PassEvent) {
                var $PassEvent = $event;
                if ($PassEvent.type == PassEvent.SHOW_PASS_PANEL) {
                    this.showmapPanel();
                }
                else if ($PassEvent.type == PassEvent.HIDE_PASS_PANEL) {
                    this.hidemapPanel();
                }
                else if ($PassEvent.type == PassEvent.SHOW_BOXREWARD_PANEL) {
                    this.showboxrewardpanel($PassEvent);
                }
                else if ($PassEvent.type == PassEvent.HIDE_BOXREWARD_PANEL) {
                    this.hideboxrewardpanel();
                }
                else if ($PassEvent.type == PassEvent.SHOW_BOSS_PANEL) {
                    this.showbosspanel($PassEvent.data);
                }
                else if ($PassEvent.type == PassEvent.HIDE_BOSS_PANEL) {
                    this.hidebosspanel();
                }
                else if ($PassEvent.type == PassEvent.REFFRESH_BOX_PANEL) {
                    this.refreshBox();
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.passUiPanel && this.passUiPanel.hasStage) {
                        if (this.openChapter()) {
                            //播放效果
                            this.passUiPanel.showSysOpenEff();
                        }
                    }
                }
                else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.init();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.passUiPanel) {
                    this.passUiPanel.dispose();
                    this.passUiPanel = null;
                    //console.log("释放面板 passUiPanel")
                }
                if (panelEvent.panel == this.boxrewardpanel) {
                    this.boxrewardpanel.dispose();
                    this.boxrewardpanel = null;
                    //console.log("释放面板 boxrewardpanel")
                }
                if (panelEvent.panel == this.bossUiPanel) {
                    this.bossUiPanel.dispose();
                    this.bossUiPanel = null;
                    //console.log("释放面板 bossUiPanel")
                }
            }
        };
        PassProcessor.prototype.init = function () {
            this._openAry = new Array;
            //按章节顺序记录。已开启为true
            var $obj = TableData.getInstance().getTableByName(TableData.tb_instance_stage_chapter);
            for (var $key in $obj.data) {
                if ($obj.data[$key]["stages"][0] <= GuidData.player.getCurPassId()) {
                    //已开放
                    this._openAry.push(true);
                }
                else {
                    if ($obj.data[$key]["stages"][0] == GuidData.player.getCurPassId() + 1 && $obj.data[$key]["limLev"] <= GuidData.player.getLevel()) {
                        this._openAry.push(true);
                    }
                    else {
                        this._openAry.push(false);
                    }
                }
            }
        };
        PassProcessor.prototype.openChapter = function () {
            for (var i = 0; i < this._openAry.length; i++) {
                if (!this._openAry[i]) {
                    var $obj = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, i + 1);
                    if ($obj["stages"][0] == GuidData.player.getCurPassId() + 1 && $obj["limLev"] <= GuidData.player.getLevel()) {
                        this._openAry[i] = true;
                        return true;
                    }
                }
            }
            return false;
        };
        PassProcessor.prototype.refreshBox = function () {
            if (this.passUiPanel && this.passUiPanel.hasStage) {
                this.passUiPanel.refreshBox();
            }
        };
        PassProcessor.prototype.hidebosspanel = function () {
            if (this.bossUiPanel) {
                this.bossUiPanel.hide();
            }
        };
        PassProcessor.prototype.showbosspanel = function ($data) {
            var _this = this;
            if (!this.bossUiPanel) {
                this.bossUiPanel = new pass.BossUiPanel();
            }
            this.bossUiPanel.load(function () {
                _this.bossUiPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_CP;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        PassProcessor.prototype.hideboxrewardpanel = function () {
            if (this.boxrewardpanel) {
                this.boxrewardpanel.hide();
            }
        };
        PassProcessor.prototype.showboxrewardpanel = function ($data) {
            var _this = this;
            if (!this.boxrewardpanel) {
                this.boxrewardpanel = new pass.BoxRewardPanel();
            }
            this.boxrewardpanel.load(function () {
                _this.boxrewardpanel.show($data);
            });
        };
        PassProcessor.prototype.hidemapPanel = function () {
            if (this.passUiPanel) {
                this.passUiPanel.hide();
            }
        };
        PassProcessor.prototype.showmapPanel = function () {
            var _this = this;
            if (!this.passUiPanel) {
                this.passUiPanel = new pass.PassUiPanel();
            }
            this.passUiPanel.load(function () {
                _this.passUiPanel.show();
                if (_this.openChapter()) {
                    _this.passUiPanel.showSysOpenEff();
                }
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_CP;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        // private smsgSendMapLine($byte: ByteArray): void {
        //     if(this.mapUiPanel && this.mapUiPanel.minimap && this.mapUiPanel.minimap.hasStage){
        //         var $vo: s2c_send_map_line = new s2c_send_map_line();
        //         s2c_send_map_line.read($vo, $byte)
        //         this.mapUiPanel.minimap.refreshLine($vo)
        //     }
        // }
        // public getHanderMap(): Object {
        //     var obj: Object = new Object;
        //     obj[Protocols.SMSG_SEND_MAP_LINE] = ($byte: ByteArray) => { this.smsgSendMapLine($byte) };
        //     return obj;
        // }
        PassProcessor.prototype.listenModuleEvents = function () {
            return [
                new PassEvent(PassEvent.SHOW_PASS_PANEL),
                new PassEvent(PassEvent.HIDE_PASS_PANEL),
                new PassEvent(PassEvent.SHOW_BOXREWARD_PANEL),
                new PassEvent(PassEvent.HIDE_BOXREWARD_PANEL),
                new PassEvent(PassEvent.SHOW_BOSS_PANEL),
                new PassEvent(PassEvent.HIDE_BOSS_PANEL),
                new PassEvent(PassEvent.REFFRESH_BOX_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
            ];
        };
        return PassProcessor;
    }(BaseProcessor));
    pass.PassProcessor = PassProcessor;
})(pass || (pass = {}));
//# sourceMappingURL=PassProcessor.js.map