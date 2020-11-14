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
var newbieguide;
(function (newbieguide) {
    var NewbieguideModule = /** @class */ (function (_super) {
        __extends(NewbieguideModule, _super);
        function NewbieguideModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewbieguideModule.prototype.getModuleName = function () {
            return "NewbieguideModule";
        };
        NewbieguideModule.prototype.listProcessors = function () {
            return [new NewbieguideProcessor()];
        };
        return NewbieguideModule;
    }(Module));
    newbieguide.NewbieguideModule = NewbieguideModule;
    var NewbieguideEvent = /** @class */ (function (_super) {
        __extends(NewbieguideEvent, _super);
        function NewbieguideEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewbieguideEvent.SHOW_BIEGUIDE_EVENT = "SHOW_BIEGUIDE_EVENT";
        NewbieguideEvent.HIDE_BIEGUIDE_EVENT = "HIDE_BIEGUIDE_EVENT";
        NewbieguideEvent.SHOW_OPTIONL_GUIDE_EVENT = "SHOW_OPTIONL_GUIDE_EVENT";
        NewbieguideEvent.HIDE_OPTIONL_GUIDE_EVENT = "HIDE_OPTIONL_GUIDE_EVENT";
        NewbieguideEvent.SHOW_SYSTRAILER_EVENT = "SHOW_SYSTRAILER_EVENT";
        NewbieguideEvent.HIDE_SYSTRAILER_EVENT = "HIDE_SYSTRAILER_EVENT";
        NewbieguideEvent.SHOW_USEITEM_EVENT = "SHOW_USEITEM_EVENT";
        NewbieguideEvent.HIDE_USEITEM_EVENT = "HIDE_USEITEM_EVENT";
        return NewbieguideEvent;
    }(BaseEvent));
    newbieguide.NewbieguideEvent = NewbieguideEvent;
    var NewbieguideProcessor = /** @class */ (function (_super) {
        __extends(NewbieguideProcessor, _super);
        function NewbieguideProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewbieguideProcessor.prototype.getName = function () {
            return "NewbieguideProcessor";
        };
        NewbieguideProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof NewbieguideEvent) {
                var $skillUIEvent = $event;
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_BIEGUIDE_EVENT) {
                    this.showBieGuideUi($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_BIEGUIDE_EVENT) {
                    this.hideBieGuideUi();
                }
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_OPTIONL_GUIDE_EVENT) {
                    this.showOptionlGuide($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_OPTIONL_GUIDE_EVENT) {
                    this.hideOptionlGuide();
                }
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_SYSTRAILER_EVENT) {
                    this.showsystemtrailer($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_SYSTRAILER_EVENT) {
                    this.hidesystemtrailer();
                }
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_USEITEM_EVENT) {
                    this.showuseitem($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_USEITEM_EVENT) {
                    this.hideuseitem();
                }
            }
            if ($event instanceof EngineEvent) {
                var engEvent = $event;
                if (engEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    this.opensystrailer();
                    this.levChg();
                }
            }
            if ($event instanceof stateup.StateUpEvent) {
                if ($event.type == stateup.StateUpEvent.REFRESH_LEV_PANEL) {
                    this.levChg();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._newbieguide) {
                    this._newbieguide.dispose();
                    this._newbieguide = null;
                    //console.log("释放面板 _newbieguide")
                }
                if (panelEvent.panel == this._systemtrailer) {
                    this._systemtrailer.dispose();
                    this._systemtrailer = null;
                    //console.log("释放面板 _systemtrailer")
                }
            }
        };
        NewbieguideProcessor.prototype.opensystrailer = function () {
            if (!this._tabary) {
                this._tabary = tb.TB_system_preview.getItem();
            }
            for (var i = 0; i < this._tabary.length; i++) {
                if (this._tabary[i].level == GuidData.player.getLevel()) {
                    this.showsystemtrailer(this._tabary[i].id);
                    break;
                }
            }
        };
        NewbieguideProcessor.prototype.showOptionlGuide = function ($data) {
            var _this = this;
            this.optionTbData = $data;
            if (!this._optionalGuidePop) {
                this._optionalGuidePop = new newbieguide.OptionalGuidePop();
            }
            this._optionalGuidePop.load(function () {
                _this._optionalGuidePop.initData(_this.optionTbData);
                UIManager.getInstance().addUIContainer(_this._optionalGuidePop);
            });
        };
        NewbieguideProcessor.prototype.hideOptionlGuide = function () {
            if (this._optionalGuidePop) {
                UIManager.getInstance().removeUIContainer(this._optionalGuidePop);
            }
        };
        NewbieguideProcessor.prototype.hidesystemtrailer = function () {
            if (this._systemtrailer) {
                this._systemtrailer.hide();
            }
        };
        NewbieguideProcessor.prototype.showsystemtrailer = function ($data) {
            var _this = this;
            if (!this._systemtrailer) {
                this._systemtrailer = new newbieguide.Systemtrailer();
            }
            this._systemtrailer.load(function () {
                _this._systemtrailer.show($data);
            });
        };
        NewbieguideProcessor.prototype.hideuseitem = function () {
            if (this._useitempanel) {
                this._useitempanel.hide();
            }
        };
        NewbieguideProcessor.prototype.showuseitem = function ($data) {
            var _this = this;
            if (!this._useitempanel) {
                this._useitempanel = new newbieguide.UseItemPanel();
            }
            this._useitempanel.addData($data);
            this._useitempanel.load(function () {
                UIManager.getInstance().addUIContainer(_this._useitempanel);
            });
        };
        NewbieguideProcessor.prototype.hideBieGuideUi = function () {
            if (this._newbieguide) {
                UIManager.getInstance().removeUIContainer(this._newbieguide);
            }
        };
        NewbieguideProcessor.prototype.showBieGuideUi = function ($data) {
            var _this = this;
            if (!this._newbieguide) {
                this._newbieguide = new newbieguide.Newbieguide();
            }
            else {
                if (this._newbieguide.hasStage) {
                    UIManager.getInstance().removeUIContainer(this._newbieguide);
                }
            }
            this.lastData = $data;
            this._newbieguide.load(function () {
                _this._newbieguide.initData(_this.lastData);
                UIManager.getInstance().addUIContainer(_this._newbieguide);
            });
        };
        NewbieguideProcessor.prototype.levChg = function () {
            var ary = GuidData.bag.getEquBgData();
            for (var i = 0; i < ary.length; i++) {
                var $EquMeshVo = ary[i];
                if (!$EquMeshVo) {
                    continue;
                }
                var bagitem = GuidData.bag.getEquByPart($EquMeshVo.entryData.pos);
                var disableEqu = !this.testGender($EquMeshVo.entryData);
                if (disableEqu) {
                    continue;
                }
                if ($EquMeshVo.entryData.realmbreak_level > GuidData.player.getStateLev()) {
                    continue;
                }
                var equUpDown = false;
                if (bagitem) {
                    if ($EquMeshVo.data.propData.force > bagitem.data.propData.force) {
                        equUpDown = true;
                    }
                }
                else {
                    equUpDown = true;
                }
                if (equUpDown) {
                    var vo = new newbieguide.UseItemVo;
                    vo.itemId = $EquMeshVo.entry;
                    vo.time = 5000;
                    vo.guid = "";
                    vo.equPos = $EquMeshVo.pos;
                    vo.num = 1;
                    vo.force = $EquMeshVo.data.propData.force;
                    this.showuseitem(vo);
                }
            }
        };
        NewbieguideProcessor.prototype.testGender = function ($obj) {
            if ($obj.availableGender) {
                var idx = $obj.availableGender.indexOf(GuidData.player.getCharType());
                return (idx != -1);
            }
            return false;
        };
        NewbieguideProcessor.prototype.listenModuleEvents = function () {
            return [
                new NewbieguideEvent(NewbieguideEvent.SHOW_BIEGUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.HIDE_BIEGUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.SHOW_OPTIONL_GUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.HIDE_OPTIONL_GUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.SHOW_SYSTRAILER_EVENT),
                new NewbieguideEvent(NewbieguideEvent.HIDE_SYSTRAILER_EVENT),
                new NewbieguideEvent(NewbieguideEvent.SHOW_USEITEM_EVENT),
                new stateup.StateUpEvent(stateup.StateUpEvent.REFRESH_LEV_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        };
        return NewbieguideProcessor;
    }(BaseProcessor));
    newbieguide.NewbieguideProcessor = NewbieguideProcessor;
})(newbieguide || (newbieguide = {}));
//# sourceMappingURL=NewbieguideProcessor.js.map