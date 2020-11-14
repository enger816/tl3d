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
var faction;
(function (faction_1) {
    var FactionModule = /** @class */ (function (_super) {
        __extends(FactionModule, _super);
        function FactionModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionModule.prototype.getModuleName = function () {
            return "FactionModule";
        };
        FactionModule.prototype.listProcessors = function () {
            //this.init();
            return [new FactionProcessor(),
                new faction_1.FactionBossProcessor(),
                new faction_1.FactionBuildProcessor(),
                new faction_1.FactionLeagueProcessor()
            ];
        };
        return FactionModule;
    }(Module));
    faction_1.FactionModule = FactionModule;
    var FactionEvent = /** @class */ (function (_super) {
        __extends(FactionEvent, _super);
        function FactionEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionEvent.SHOW_FACTIONUI_EVENT = "SHOW_FACTIONUI_EVENT";
        FactionEvent.HIDE_APPLYFACTIONUI_EVENT = "HIDE_APPLYFACTIONUI_EVENT";
        FactionEvent.HIDE_EXISTFACTIONUI_EVENT = "HIDE_EXISTFACTIONUI_EVENT";
        FactionEvent.REFRESHAPPLYZHAOMUlIST_EVENT = "REFRESHAPPLYZHAOMUlIST_EVENT";
        FactionEvent.REFRESHAPPLYZHAOMUlISTISOK_EVENT = "REFRESHAPPLYZHAOMUlISTISOK_EVENT";
        //加入家族
        FactionEvent.JOINFACTIONITEM_EVENT = "JOINFACTIONITEM_EVENT";
        //家族列表
        FactionEvent.REFRESHFACTIONITEM_EVENT = "REFRESHFACTIONITEM_EVENT";
        //家族申请列表
        FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT = "REFRESHFACTIONITEMAPPLY_EVENT";
        //家族等级变化
        FactionEvent.REFRESHFACTIONLEV_EVENT = "REFRESHFACTIONLEV_EVENT";
        //家族资金变化
        FactionEvent.REFRESHFACTIONMONEY_EVENT = "REFRESHFACTIONMONEY_EVENT";
        //我的贡献变化
        FactionEvent.REFRESHFACTIONGX_EVENT = "REFRESHFACTIONGX_EVENT";
        //家族公告变化
        FactionEvent.REFRESHFACTIONGG_EVENT = "REFRESHFACTIONGG_EVENT";
        //家族职位变化
        FactionEvent.REFRESHFACTIONIDENTITY_EVENT = "REFRESHFACTIONIDENTITY_EVENT";
        //退出家族
        FactionEvent.FACTION_QUIT_EVENT = "faction_quit_event";
        //打开家族职务任免弹框
        FactionEvent.SHOW_FACTIONAPPOINTMENT_EVENT = "SHOW_FACTIONAPPOINTMENT_EVENT";
        //打开家族审批弹框
        FactionEvent.SHOW_FACTIONRECRUITING_EVENT = "SHOW_FACTIONRECRUITING_EVENT";
        //打开家族公告弹框
        FactionEvent.SHOW_FACTIONNOTICE_EVENT = "SHOW_FACTIONNOTICE_EVENT";
        // //选中一条消息回复
        // public static SELECT_INFOMATION_REPLY: string = "SELECT_INFOMATION_REPLY";
        // //周排行变化
        // public static WEEK_RANK_CHANGE_EVENT: string = "WEEK_RANK_CHANGE_EVENT";
        // //打开女王排行面板
        // public static SHOW_QUEEN_RANK_PANEL_EVENT: string = "SHOW_QUEEN_RANK_PANEL_EVENT";
        //打开活动面板
        FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT = "SHOW_FACTIONACTIVE_PANEL_EVENT";
        //打开首领数据变化
        FactionEvent.SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT = "SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT";
        //远征数据变化
        FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT = "SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT";
        //打开技能面板
        FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT = "SHOW_FACTIONSKILL_PANEL_EVENT";
        FactionEvent.SHOW_FACTIONSKILL_CHG_EVENT = "SHOW_FACTIONSKILL_CHG_EVENT";
        //邀请入家族数据变化
        FactionEvent.SHOW_INVITATION_EVENT = "SHOW_INVITATION_EVENT";
        FactionEvent.INVITATION_CHG_EVENT = "INVITATION_CHG_EVENT";
        //家族建筑变化了
        FactionEvent.FUNBUILD_CHG_EVENT = "FUNBUILD_CHG_EVENT";
        FactionEvent.SHOW_FACTION_HONOR_EVENT = "show_faction_honor_event";
        return FactionEvent;
    }(BaseEvent));
    faction_1.FactionEvent = FactionEvent;
    var FactionProcessor = /** @class */ (function (_super) {
        __extends(FactionProcessor, _super);
        function FactionProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionProcessor.prototype.getName = function () {
            return "FactionProcessor";
        };
        FactionProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof FactionEvent) {
                this.processRedPoint();
                var evt = $event;
                if (evt.type == FactionEvent.SHOW_FACTIONUI_EVENT) {
                    this.showFactionUi(evt.data);
                }
                else if (evt.type == FactionEvent.HIDE_APPLYFACTIONUI_EVENT) {
                    this.hideApplyFactionUi();
                }
                else if (evt.type == FactionEvent.HIDE_EXISTFACTIONUI_EVENT) {
                    this.hideExistFactionUi();
                }
                else if (evt.type == FactionEvent.REFRESHAPPLYZHAOMUlIST_EVENT) {
                    this.refreshapplyzhaomulist(evt.data);
                }
                else if (evt.type == FactionEvent.REFRESHAPPLYZHAOMUlISTISOK_EVENT) {
                    this.refreshapplyzhaomulistisok(evt.data);
                }
                else if (evt.type == FactionEvent.REFRESHFACTIONITEM_EVENT) {
                    this.refreshFactionPlayerList();
                }
                else if (evt.type == FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT) {
                    // this.refreshapplyzhaomulistisok(evt.data);
                    this.ApplyFactionListChange();
                    ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
                }
                else if (evt.type == FactionEvent.JOINFACTIONITEM_EVENT) {
                    this.joinFactionevent();
                }
                else if (evt.type == FactionEvent.REFRESHFACTIONLEV_EVENT) {
                    //等级变化
                    this.refreshFactionLev();
                }
                else if (evt.type == FactionEvent.REFRESHFACTIONMONEY_EVENT) {
                    //资金变化
                    this.refreshFactionMoney();
                }
                else if (evt.type == FactionEvent.REFRESHFACTIONGX_EVENT) {
                    //贡献变化
                    this.refreshFactionGX();
                }
                else if (evt.type == FactionEvent.REFRESHFACTIONGG_EVENT) {
                    //公告变化
                    this.refreshFactionGG();
                }
                else if (evt.type == FactionEvent.REFRESHFACTIONIDENTITY_EVENT) {
                    //职位变化
                    this.refreshFactionIdentity();
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONAPPOINTMENT_EVENT) {
                    //打开家族职位任免弹窗
                    this.showFactionAppointment(evt.data);
                }
                else if (evt.type == FactionEvent.FACTION_QUIT_EVENT) {
                    //退出帮派
                    this.exitFactionevent();
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONRECRUITING_EVENT) {
                    //打开家族审批弹窗
                    this.showFactionRecruiting();
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONNOTICE_EVENT) {
                    this.showFactionNotice();
                    // } else if (evt.type == FactionEvent.SELECT_INFOMATION_REPLY) {
                    //     //console.log("--数据---", evt.data);
                    //     this.selectinfomationreply(evt.data);
                    // } else if (evt.type == FactionEvent.WEEK_RANK_CHANGE_EVENT) {
                    //     this.weekrankchang();
                    // } else if (evt.type == FactionEvent.SHOW_QUEEN_RANK_PANEL_EVENT) {
                    //     this.showQueenRankPanel();
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT) {
                    this.showActivePanel(evt.data);
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT) {
                    this.refreshActiveLeadPanel();
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT) {
                    this.refreshActiveTripPanel();
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT) {
                    this.showSkillPanel();
                }
                else if (evt.type == FactionEvent.SHOW_FACTIONSKILL_CHG_EVENT) {
                    this.skillChg();
                }
                else if (evt.type == FactionEvent.SHOW_INVITATION_EVENT) {
                    this.showinvitationpanel();
                }
                else if (evt.type == FactionEvent.INVITATION_CHG_EVENT) {
                    this.invitationchg();
                }
                else if (evt.type == FactionEvent.FUNBUILD_CHG_EVENT) {
                    this.funbuildChg();
                }
                else if (evt.type == FactionEvent.SHOW_FACTION_HONOR_EVENT) {
                    this.showHonorpanel();
                }
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            }
            else if ($event.type == EngineEvent.MONEY_CHANGE) {
                this.Chgmoney();
            }
            if ($event instanceof faction_1.FactionLeaguEvent) {
                if ($event.type == faction_1.FactionLeaguEvent.REFRESH_SESSION_EVENT) {
                    if (this._existFactionUiPanel && this._existFactionUiPanel.hasStage) {
                        this._existFactionUiPanel.refresh();
                    }
                    if (this._applyFactionUiPanel && this._applyFactionUiPanel.hasStage) {
                        this._applyFactionUiPanel.refresh();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._applyFactionUiPanel) {
                    this._applyFactionUiPanel.dispose();
                    this._applyFactionUiPanel = null;
                    //console.log("释放面板 _applyFactionUiPanel")
                }
                if (panelEvent.panel == this._existFactionUiPanel) {
                    this._existFactionUiPanel.dispose();
                    this._existFactionUiPanel = null;
                    //console.log("释放面板 _existFactionUiPanel")
                }
                if (panelEvent.panel == this.appointmentPanel) {
                    this.appointmentPanel.dispose();
                    this.appointmentPanel = null;
                    //console.log("释放面板 appointmentPanel")
                }
                if (panelEvent.panel == this.noticePanel) {
                    this.noticePanel.dispose();
                    this.noticePanel = null;
                    //console.log("释放面板 noticePanel")
                }
                if (panelEvent.panel == this.recruitingPanel) {
                    this.recruitingPanel.dispose();
                    this.recruitingPanel = null;
                    //console.log("释放面板 recruitingPanel")
                }
                if (panelEvent.panel == this._invitationPanel) {
                    this._invitationPanel.dispose();
                    this._invitationPanel = null;
                    //console.log("释放面板 _invitationPanel")
                }
                if (panelEvent.panel == this.activePanel) {
                    this.activePanel.dispose();
                    this.activePanel = null;
                    //console.log("释放面板 activePanel")
                }
                if (panelEvent.panel == this.skillPanel) {
                    this.skillPanel.dispose();
                    this.skillPanel = null;
                    //console.log("释放面板 factionskillPanel")
                }
                if (panelEvent.panel == this._honorPanel) {
                    this._honorPanel.dispose();
                    this._honorPanel = null;
                    //console.log("释放面板 faction_honorPanel")
                }
            }
        };
        FactionProcessor.prototype.funbuildChg = function () {
            if (this._existFactionUiPanel && this._existFactionUiPanel.factionFunctionPanel && this._existFactionUiPanel.factionFunctionPanel.hasStage) {
                this._existFactionUiPanel.factionFunctionPanel.resetData();
            }
        };
        FactionProcessor.prototype.Chgmoney = function () {
            if (this.skillPanel) {
                this.skillPanel.drawBase();
            }
            if (this._applyFactionUiPanel && this._applyFactionUiPanel.applybuildpanel && this._applyFactionUiPanel.applybuildpanel.hasStage) {
                this._applyFactionUiPanel.applybuildpanel.set_a_9();
            }
        };
        FactionProcessor.prototype.processRedPoint = function () {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FACTION, SharedDef.MODULE_FACTION_RECRUIT)) {
                var node = RedPointManager.getInstance().getNodeByID(62);
                var facApplylist;
                if (GuidData.faction) {
                    facApplylist = GuidData.faction.getApplyList();
                }
                if (facApplylist && facApplylist.length > 0 && GuidData.faction.playerIdentity < 4) {
                    node.show = true;
                }
                else {
                    node.show = false;
                }
            }
        };
        FactionProcessor.prototype.showinvitationpanel = function () {
            var _this = this;
            if (!this._invitationPanel) {
                this._invitationPanel = new faction_1.InvitationPanel();
            }
            this._invitationPanel.load(function () {
                _this._invitationPanel.show();
            });
        };
        FactionProcessor.prototype.invitationchg = function () {
            if (this._invitationPanel && this._invitationPanel.invitationList && this._invitationPanel.invitationList.hasStage) {
                this._invitationPanel.invitationList.resetData();
            }
        };
        FactionProcessor.prototype.showActivePanel = function ($data) {
            var _this = this;
            if (!GuidData.faction) {
                this.showFactionUi(null);
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "你还没有加入家族", 99);
                return;
            }
            var vo = faction_1.FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_EVENT);
            if (!vo) {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "模块未开启,请家族大佬尽快升级主殿等级！", 99);
                this.alertpanel();
                return;
            }
            if (!this.activePanel) {
                this.activePanel = new faction_1.FactionActivePanel;
            }
            this.activePanel.load(function () {
                if (!$data) {
                    $data = SharedDef.MODULE_FACTIONACTIVE_TRIAL;
                }
                _this.activePanel.show($data);
            });
        };
        FactionProcessor.prototype.alertpanel = function () {
            AlertUtil.show("模块未开启,是否前往主殿提升等级？", "提示", function (a) {
                if (a == 1) {
                    //购买vip
                    ModulePageManager.openPanel(SharedDef.MODULE_FACTIONMAIN);
                }
            }, 2, ["是", "否"]);
        };
        FactionProcessor.prototype.showSkillPanel = function () {
            var _this = this;
            if (!GuidData.faction) {
                this.showFactionUi(null);
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "你还没有加入家族", 99);
                return;
            }
            var vo = faction_1.FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_SKILL);
            if (!vo) {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "模块未开启", 99);
                this.alertpanel();
                return;
            }
            if (!this.skillPanel) {
                this.skillPanel = new faction_1.FactionSkillPanel;
            }
            this.skillPanel.load(function () {
                _this.skillPanel.show();
            });
        };
        FactionProcessor.prototype.skillChg = function () {
            if (this.skillPanel && this.skillPanel.hasStage) {
                this.skillPanel.dataChg();
            }
        };
        FactionProcessor.prototype.refreshActiveLeadPanel = function () {
            if (this.activePanel && this.activePanel.hasStage) {
                this.activePanel.leadDataChg();
            }
        };
        FactionProcessor.prototype.refreshActiveTripPanel = function () {
            if (this.activePanel && this.activePanel.hasStage) {
                this.activePanel.tripDataChg();
            }
        };
        FactionProcessor.prototype.showFactionAppointment = function ($data) {
            var _this = this;
            if (!this.appointmentPanel) {
                this.appointmentPanel = new faction_1.AppointmentPanel();
            }
            this.appointmentPanel.load(function () {
                //停止绘制前面的ui
                _this.appointmentPanel.show($data);
            });
        };
        FactionProcessor.prototype.showFactionNotice = function () {
            var _this = this;
            if (!this.noticePanel) {
                this.noticePanel = new faction_1.NoticePanel();
            }
            this.noticePanel.load(function () {
                //停止绘制前面的ui
                _this.noticePanel.show();
            });
        };
        FactionProcessor.prototype.showFactionRecruiting = function () {
            var _this = this;
            if (!this.recruitingPanel) {
                this.recruitingPanel = new faction_1.RecruitingPanel();
            }
            this.recruitingPanel.load(function () {
                //停止绘制前面的ui
                _this.recruitingPanel.show();
            });
        };
        FactionProcessor.prototype.ApplyFactionListChange = function () {
            if (this.recruitingPanel && this.recruitingPanel.applyFactionList && this.recruitingPanel.applyFactionList.hasStage) {
                this.recruitingPanel.applyFactionList.refreshDataByNewData();
                return;
            }
        };
        FactionProcessor.prototype.refreshFactionIdentity = function () {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionIdentity();
            }
        };
        FactionProcessor.prototype.refreshFactionGG = function () {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionNotice();
            }
        };
        FactionProcessor.prototype.refreshFactionGX = function () {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionContribution();
            }
            // if (this._existFactionUiPanel
            //     && this._existFactionUiPanel.factionStorePanel) {
            //     this._existFactionUiPanel.factionStorePanel.shopRightPanel.resetMoney();
            // }
        };
        FactionProcessor.prototype.refreshFactionMoney = function () {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionMoney();
            }
        };
        FactionProcessor.prototype.refreshFactionLev = function () {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionLev();
            }
        };
        FactionProcessor.prototype.refreshFactionPlayerList = function () {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel
                && this._existFactionUiPanel.factionPersonPanel.personListPanel) {
                this._existFactionUiPanel.factionPersonPanel.personListPanel.refreshDataByNewData(GuidData.faction.getFactionListBySortType(this._existFactionUiPanel.factionPersonPanel.SortType, this._existFactionUiPanel.factionPersonPanel.SortFlag), false);
            }
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionPlayerNum();
                this._existFactionUiPanel.factionPersonPanel.bottomLeftPanel.resetData();
            }
        };
        FactionProcessor.prototype.joinFactionevent = function () {
            if (this._applyFactionUiPanel && this._applyFactionUiPanel.hasStage) {
                this.hideApplyFactionUi();
                this.showFactionUi(null);
            }
        };
        FactionProcessor.prototype.exitFactionevent = function () {
            if (this._existFactionUiPanel && this._existFactionUiPanel.hasStage) {
                this.hideExistFactionUi();
                this.showFactionUi(null);
            }
        };
        FactionProcessor.prototype.refreshapplyzhaomulist = function ($data) {
            if (this._applyFactionUiPanel
                && this._applyFactionUiPanel.applyzhaomupanel
                && this._applyFactionUiPanel.applyzhaomupanel.applylist) {
                this._applyFactionUiPanel.applyzhaomupanel.setFactionInfo($data);
            }
        };
        FactionProcessor.prototype.refreshapplyzhaomulistisok = function ($data) {
            if (this._applyFactionUiPanel
                && this._applyFactionUiPanel.applyzhaomupanel
                && this._applyFactionUiPanel.applyzhaomupanel.applylist) {
                this._applyFactionUiPanel.applyzhaomupanel.applylist.isokstate($data);
            }
        };
        FactionProcessor.prototype.hideExistFactionUi = function () {
            if (this._existFactionUiPanel) {
                this._existFactionUiPanel.hide();
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        FactionProcessor.prototype.hideApplyFactionUi = function () {
            if (this._applyFactionUiPanel) {
                this._applyFactionUiPanel.hide();
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        FactionProcessor.prototype.showFactionUi = function ($tab) {
            var $obj;
            if (GuidData.faction) {
                //已经加入帮派了 
                if (!this._existFactionUiPanel) {
                    this._existFactionUiPanel = new faction_1.ExistFactionUiPanel();
                }
                $obj = this._existFactionUiPanel;
            }
            else {
                //未加入帮派
                if (!this._applyFactionUiPanel) {
                    this._applyFactionUiPanel = new faction_1.ApplyFactionUiPanel();
                }
                $obj = this._applyFactionUiPanel;
            }
            $obj.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                if (!$tab) {
                    if ($obj instanceof faction_1.ApplyFactionUiPanel) {
                        $tab = SharedDef.MODULE_FACTION_RECRUIT;
                    }
                    else if ($obj instanceof faction_1.ExistFactionUiPanel) {
                        $tab = SharedDef.MODULE_FACTION_MEMBER;
                    }
                }
                $obj.show($tab);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_FACTION;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        FactionProcessor.prototype.showHonorpanel = function () {
            var _this = this;
            if (!this._honorPanel) {
                this._honorPanel = new faction_1.FactionHonorPanel();
            }
            this._honorPanel.load(function () {
                _this._honorPanel.show();
            });
        };
        FactionProcessor.prototype.getNewList = function (byte) {
            var faction = new s2c_faction_get_list_result();
            s2c_faction_get_list_result.read(faction, byte);
            if (this._applyFactionUiPanel && this._applyFactionUiPanel.applyzhaomupanel) {
                this._applyFactionUiPanel.applyzhaomupanel.getDataAndRefresh(faction);
            }
            //console.log("---faction---", faction);
        };
        FactionProcessor.prototype.rankLiskResult = function ($byte) {
            var sral = new s2c_rank_add_like_result();
            s2c_rank_add_like_result.read(sral, $byte);
            //console.log("---sral.type, sral.guid, sral.num--", sral.type, sral.guid, sral.num);
        };
        FactionProcessor.prototype.getnewInvite = function ($byte) {
            var sral = new s2c_show_faction_invite();
            s2c_show_faction_invite.read(sral, $byte);
            //console.log("---来新的邀请了--", sral.faction_guid, sral.faction_name, sral.guid, sral.name);
            faction_1.FactionModel.getInstance().chgInvitationList_add(sral);
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        };
        FactionProcessor.prototype.listenModuleEvents = function () {
            return [
                new FactionEvent(FactionEvent.SHOW_FACTIONUI_EVENT),
                new FactionEvent(FactionEvent.HIDE_APPLYFACTIONUI_EVENT),
                new FactionEvent(FactionEvent.HIDE_EXISTFACTIONUI_EVENT),
                new FactionEvent(FactionEvent.REFRESHAPPLYZHAOMUlIST_EVENT),
                new FactionEvent(FactionEvent.REFRESHAPPLYZHAOMUlISTISOK_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONITEM_EVENT),
                new FactionEvent(FactionEvent.JOINFACTIONITEM_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONLEV_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONMONEY_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONGX_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONGG_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONIDENTITY_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONAPPOINTMENT_EVENT),
                new FactionEvent(FactionEvent.FACTION_QUIT_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONRECRUITING_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONNOTICE_EVENT),
                new FactionEvent(FactionEvent.FUNBUILD_CHG_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTION_HONOR_EVENT),
                new faction_1.FactionLeaguEvent(faction_1.FactionLeaguEvent.REFRESH_SESSION_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONSKILL_CHG_EVENT),
                new FactionEvent(FactionEvent.SHOW_INVITATION_EVENT),
                new FactionEvent(FactionEvent.INVITATION_CHG_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
            ];
        };
        FactionProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_FACTION_GET_LIST_RESULT] = function ($byte) { _this.getNewList($byte); };
            // obj[Protocols.SMSG_SHOW_FACTION_GIFT_PAGE] = ($byte: ByteArray) => { this.getgiftpage($byte) };
            // obj[Protocols.SMSG_SHOW_FACTION_GIFT_INFO] = ($byte: ByteArray) => { this.getgiftinfo($byte) };
            obj[Protocols.SMSG_RANK_ADD_LIKE_RESULT] = function ($byte) { _this.rankLiskResult($byte); };
            // obj[Protocols.SMSG_SHOW_FACTION_GIFT_RANK_INFO] = ($byte: ByteArray) => { this.queenRankList($byte) };
            obj[Protocols.SMSG_SHOW_FACTION_INVITE] = function ($byte) { _this.getnewInvite($byte); };
            return obj;
        };
        return FactionProcessor;
    }(BaseProcessor));
    faction_1.FactionProcessor = FactionProcessor;
})(faction || (faction = {}));
//# sourceMappingURL=FactionProcessor.js.map