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
var social;
(function (social) {
    var SocialUiModule = /** @class */ (function (_super) {
        __extends(SocialUiModule, _super);
        function SocialUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SocialUiModule.prototype.getModuleName = function () {
            return "SocialUiModule";
        };
        SocialUiModule.prototype.listProcessors = function () {
            return [new SocialProcessor()];
        };
        return SocialUiModule;
    }(Module));
    social.SocialUiModule = SocialUiModule;
    var SocialUiEvent = /** @class */ (function (_super) {
        __extends(SocialUiEvent, _super);
        function SocialUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示添加好友面板
        SocialUiEvent.SHOW_ADDFRIEND_EVENT = "SHOW_ADDFRIEND_EVENT";
        //展示添加好友面板
        SocialUiEvent.SHOW_APPLYPANEL_EVENT = "SHOW_APPLYPANEL_EVENT";
        //展示技能面板
        SocialUiEvent.SHOW_SOCIAL_EVENT = "SHOW_SOCIAL_EVENT";
        //隐藏技能面板
        SocialUiEvent.HIDE_SOCIAL_EVENT = "HIDE_SOCIAL_EVENT";
        //添加好友 推荐列表数据变化
        SocialUiEvent.REFRESHADDlIST_EVENT = "REFRESHADDlIST_EVENT";
        //好友申请列表数据变化
        SocialUiEvent.REFRESHAPPLYlIST_EVENT = "REFRESHAPPLYlIST_EVENT";
        //好友列表数据变化
        SocialUiEvent.REFRESHFRIENDlIST_EVENT = "REFRESHFRIENDlIST_EVENT";
        //好友列表selected选中处理
        SocialUiEvent.REFRESHFRIENDSELECTED_EVENT = "REFRESHFRIENDSELECTED_EVENT";
        //复仇次数变化
        SocialUiEvent.REVENGE_NUM_CHG_EVENT = "REVENGE_NUM_CHG_EVENT";
        //复仇面板变化
        SocialUiEvent.REVENGE_PANEL_EVENT = "REVENGE_PANEL_EVENT";
        return SocialUiEvent;
    }(BaseEvent));
    social.SocialUiEvent = SocialUiEvent;
    var SocialProcessor = /** @class */ (function (_super) {
        __extends(SocialProcessor, _super);
        function SocialProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SocialProcessor.prototype.getName = function () {
            return "SocialProcessor";
        };
        SocialProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SocialUiEvent) {
                this.processRedPoint();
                var $socialUiEvent = $event;
                if ($socialUiEvent.type == SocialUiEvent.SHOW_SOCIAL_EVENT) {
                    this.showUi();
                }
                else if ($socialUiEvent.type == SocialUiEvent.HIDE_SOCIAL_EVENT) {
                    this.hideUi();
                }
                else if ($socialUiEvent.type == SocialUiEvent.REFRESHADDlIST_EVENT) {
                    this.refreshAddList($socialUiEvent.index);
                }
                else if ($socialUiEvent.type == SocialUiEvent.REFRESHAPPLYlIST_EVENT) {
                    this.refreshApplyList($socialUiEvent.isvisiable);
                }
                else if ($socialUiEvent.type == SocialUiEvent.REFRESHFRIENDlIST_EVENT) {
                    this.refreshFriendList();
                }
                else if ($socialUiEvent.type == SocialUiEvent.REFRESHFRIENDSELECTED_EVENT) {
                    this.refreshFriendList($socialUiEvent.index);
                }
                else if ($socialUiEvent.type == SocialUiEvent.REVENGE_NUM_CHG_EVENT) {
                    this.revengenumchg();
                }
                else if ($socialUiEvent.type == SocialUiEvent.SHOW_ADDFRIEND_EVENT) {
                    this.showAddFriendUi();
                }
                else if ($socialUiEvent.type == SocialUiEvent.SHOW_APPLYPANEL_EVENT) {
                    this.showApplyPanelUi();
                }
                else if ($socialUiEvent.type == SocialUiEvent.REVENGE_PANEL_EVENT) {
                    this.refreshRevengeList();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._socialUiPanel) {
                    this._socialUiPanel.dispose();
                    this._socialUiPanel = null;
                    //console.log("释放面板 _socialUiPanel")
                }
                if (panelEvent.panel == this._addfriendUi) {
                    this._addfriendUi.dispose();
                    this._addfriendUi = null;
                    //console.log("释放面板 _addfriendUi")
                }
                if (panelEvent.panel == this._applyPanelUi) {
                    this._applyPanelUi.dispose();
                    this._applyPanelUi = null;
                    //console.log("释放面板 _addfriendUi")
                }
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                if (GuidData.social) {
                    var enemylist = GuidData.social.getEnemyList();
                    if (enemylist && enemylist.length > 0) {
                        GuidData.social.enemyredstate = true;
                    }
                    else {
                        GuidData.social.enemyredstate = false;
                    }
                    this.processRedPoint();
                }
            }
            // if ($event instanceof EngineEvent) {
            //     var $engineEvent: EngineEvent = <EngineEvent>$event;
            //     if ($engineEvent.type == EngineEvent.MONEY_TYPE_QI || $engineEvent.type == EngineEvent.MONEY_TYPE_SILVER) {
            //         if (this._socialUiPanel) {
            //             this._socialUiPanel.skillTopRightPanel.resetMoney()
            //             this.resetSkillUiData()
            //         }
            //     }
            // }
        };
        // private resetSkillUiData(): void {
        //    if (this._skillUiPanel) {
        //         this._skillUiPanel.refresh()
        //    }
        // }
        /**
         *选择技能详细内容
         */
        // private selectSkillContent($SkillBaseDataVo: tb.SkillBaseDataVo): void {
        //     if (this._skillUiPanel) {
        //         this._skillUiPanel.skillPanelC.resetData($SkillBaseDataVo);
        //     }
        // }
        SocialProcessor.prototype.processRedPoint = function () {
            //console.log("---红点----", GuidData.social.getApplyList());
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_SOCIAL, SharedDef.MODULE_SOCIAL_FRIEND)) {
                var node = RedPointManager.getInstance().getNodeByID(57);
                if (GuidData.social) {
                    var friendlist;
                    friendlist = GuidData.social.getApplyList();
                    if (friendlist && friendlist.length > 0) {
                        node.show = true;
                    }
                    else {
                        node.show = false;
                    }
                    var node1 = RedPointManager.getInstance().getNodeByID(58);
                    node1.show = GuidData.social.enemyredstate;
                }
            }
        };
        SocialProcessor.prototype.revengenumchg = function () {
            if (this._socialUiPanel && this._socialUiPanel.hasStage && this._socialUiPanel.type == 1) {
                this._socialUiPanel.bottomUiparts.setrevengenum();
            }
        };
        SocialProcessor.prototype.refreshFriendList = function ($index) {
            if ($index === void 0) { $index = 0; }
            if (this._socialUiPanel && this._socialUiPanel.socialListPanel && this._socialUiPanel.socialListPanel.hasStage && this._socialUiPanel.socialListPanel.type == 0) {
                this._socialUiPanel.bottomUiparts.setFriendNum();
                this._socialUiPanel.socialListPanel.refreshDataByNewData($index, 0);
            }
        };
        SocialProcessor.prototype.refreshRevengeList = function ($index) {
            if ($index === void 0) { $index = 0; }
            if (this._socialUiPanel && this._socialUiPanel.socialListPanel && this._socialUiPanel.socialListPanel.hasStage && this._socialUiPanel.socialListPanel.type == 1) {
                this._socialUiPanel.socialListPanel.refreshDataByNewData($index, 1);
            }
        };
        SocialProcessor.prototype.refreshApplyList = function ($isvisiable) {
            if (this._applyPanelUi && this._applyPanelUi.applyList && this._applyPanelUi.applyList.hasStage) {
                this._applyPanelUi.applyList.refreshDataByNewData();
            }
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        };
        SocialProcessor.prototype.refreshAddList = function ($index) {
            if (this._addfriendUi && this._addfriendUi.addfriendList && this._addfriendUi.addfriendList.hasStage) {
                this._addfriendUi.addfriendList.refreshDataByindex($index);
            }
        };
        SocialProcessor.prototype.hideUi = function () {
            if (this._socialUiPanel) {
                this._socialUiPanel.hide();
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            }
        };
        SocialProcessor.prototype.showUi = function () {
            var _this = this;
            if (!this._socialUiPanel) {
                this._socialUiPanel = new social.SocialUiPanel();
            }
            this._socialUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this._socialUiPanel.show();
            });
        };
        SocialProcessor.prototype.showAddFriendUi = function () {
            var _this = this;
            if (!this._addfriendUi) {
                this._addfriendUi = new social.AddFriendPanel();
            }
            this._addfriendUi.load(function () {
                _this._addfriendUi.show();
            });
        };
        SocialProcessor.prototype.showApplyPanelUi = function () {
            var _this = this;
            if (!this._applyPanelUi) {
                this._applyPanelUi = new social.ApplyPanel();
            }
            this._applyPanelUi.load(function () {
                _this._applyPanelUi.show();
            });
        };
        SocialProcessor.prototype.getRecommend = function ($byte) {
            var parmLen = $byte.readUint16();
            var ary = new Array;
            for (var i = 0; i < parmLen; i++) {
                var sitem = new social_friend_info;
                sitem.read($byte);
                var item = new SocialItemData();
                item.guid = sitem.guid;
                item.name = sitem.name;
                item.faction = sitem.faction;
                item.level = sitem.level;
                item.gender = sitem.icon;
                item.vip = sitem.vip;
                ary.push(item);
            }
            // alert(str);
            if (this._addfriendUi && this._addfriendUi.addfriendList) {
                this._addfriendUi.addfriendList.refreshDataByNewData(ary);
            }
        };
        SocialProcessor.prototype.listenModuleEvents = function () {
            return [
                new SocialUiEvent(SocialUiEvent.SHOW_SOCIAL_EVENT),
                new SocialUiEvent(SocialUiEvent.HIDE_SOCIAL_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHADDlIST_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHAPPLYlIST_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHFRIENDlIST_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHFRIENDSELECTED_EVENT),
                new SocialUiEvent(SocialUiEvent.REVENGE_NUM_CHG_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new SocialUiEvent(SocialUiEvent.SHOW_ADDFRIEND_EVENT),
                new SocialUiEvent(SocialUiEvent.SHOW_APPLYPANEL_EVENT),
                new SocialUiEvent(SocialUiEvent.REVENGE_PANEL_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
            ];
        };
        SocialProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SOCIAL_GET_RECOMMEND_FRIEND] = function ($byte) { _this.getRecommend($byte); };
            return obj;
        };
        return SocialProcessor;
    }(BaseProcessor));
    social.SocialProcessor = SocialProcessor;
})(social || (social = {}));
//# sourceMappingURL=SocialProcessor.js.map