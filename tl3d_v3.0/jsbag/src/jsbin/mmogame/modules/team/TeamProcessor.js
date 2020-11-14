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
var team;
(function (team) {
    var TeamEvent = /** @class */ (function (_super) {
        __extends(TeamEvent, _super);
        function TeamEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamEvent.SHOW_TEAM_PANEL = "SHOW_TEAM_PANEL"; //显示面板
        TeamEvent.HIDE_TEAM_PANEL = "HIDE_TEAM_PANEL"; //隐藏面板
        TeamEvent.JOIN_EXIT_TEAM_PANEL = "JOIN_EXIT_TEAM_PANEL"; //加入或退出队伍
        TeamEvent.AUTOMATCH_TEAM_PANEL = "AUTOMATCH_TEAM_PANEL"; //匹配状态改变
        TeamEvent.REFRESHLIST_TEAM_PANEL = "REFRESHLIST_TEAM_PANEL"; //组队list变化
        TeamEvent.SHOW_TEAMTYPE_PANEL = "SHOW_TEAMTYPE_PANEL"; //显示选择任务类型面板
        TeamEvent.SELECT_TEAMTYPE_PANEL = "SELECT_TEAMTYPE_PANEL"; //选中任务类型
        TeamEvent.SURE_TEAMTYPE_PANEL = "SURE_TEAMTYPE_PANEL"; //确认任务类型选则
        TeamEvent.CHG_TEAMTYPE_PANEL = "CHG_TEAMTYPE_PANEL"; //队伍任务类型选则
        TeamEvent.TARGET_INST_TEAM_PANEL = "TARGET_INST_TEAM_PANEL"; //队员确认进入副本面板
        TeamEvent.CONVENIENT_TEAM_PANEL = "CONVENIENT_TEAM_PANEL"; //便捷组队入口
        TeamEvent.CONVENIENT_SELECT_PANEL = "CONVENIENT_SELECT_PANEL"; //便捷组队发送一次请求后
        TeamEvent.APPLY_TEAM_PANEL = "APPLY_TEAM_PANEL"; //入队申请界面
        TeamEvent.CHG_APPLYLIST_TEAM_PANEL = "CHG_APPLYLIST_TEAM_PANEL"; //入队申请数据变化
        TeamEvent.INVITATION_LIST_TEAM_PANEL = "INVITATION_LIST_TEAM_PANEL"; //邀请入队界面
        TeamEvent.BUILD_TEAM_PANEL = "BUILD_TEAM_PANEL"; //创建队伍
        TeamEvent.INVIREQUEST_TEAM_PANEL = "INVIREQUEST_TEAM_PANEL"; //邀请处理
        return TeamEvent;
    }(BaseEvent));
    team.TeamEvent = TeamEvent;
    var TeamModule = /** @class */ (function (_super) {
        __extends(TeamModule, _super);
        function TeamModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamModule.prototype.getModuleName = function () {
            return "TeamModule";
        };
        TeamModule.prototype.listProcessors = function () {
            return [new TeamProcessor()];
        };
        return TeamModule;
    }(Module));
    team.TeamModule = TeamModule;
    var TeamProcessor = /** @class */ (function (_super) {
        __extends(TeamProcessor, _super);
        function TeamProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamProcessor.prototype.getName = function () {
            return "TeamProcessor";
        };
        TeamProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TeamEvent) {
                var $TeamEvent = $event;
                if ($TeamEvent.type == TeamEvent.SHOW_TEAM_PANEL) {
                    this.showPanel($TeamEvent.data);
                }
                else if ($TeamEvent.type == TeamEvent.HIDE_TEAM_PANEL) {
                    this.hidePanel();
                }
                else if ($TeamEvent.type == TeamEvent.REFRESHLIST_TEAM_PANEL) {
                }
                else if ($TeamEvent.type == TeamEvent.SELECT_TEAMTYPE_PANEL) {
                    if (this.chgTeamType && this.chgTeamType.hasStage) {
                        this.chgTeamType.resetData($TeamEvent.data);
                    }
                    if (this.convenientTeam && this.convenientTeam.hasStage) {
                        this.convenientTeam.resetData($TeamEvent.data);
                    }
                }
                else if ($TeamEvent.type == TeamEvent.CONVENIENT_SELECT_PANEL) {
                    if (this.convenientTeam && this.convenientTeam.convenientList && this.convenientTeam.convenientList.hasStage) {
                        this.convenientTeam.convenientList.refreshDataByNewData($TeamEvent.data);
                    }
                    if (this.invitationTeam && this.invitationTeam.incitationList && this.invitationTeam.incitationList.hasStage) {
                        this.invitationTeam.incitationList.refreshDataByNewData($TeamEvent.data);
                    }
                }
                else if ($TeamEvent.type == TeamEvent.CONVENIENT_TEAM_PANEL) {
                    this.showConvenientPanel($TeamEvent.data);
                }
                else if ($TeamEvent.type == TeamEvent.TARGET_INST_TEAM_PANEL) {
                    console.log("--------进入副本确认------", GuidData.team.getTeamTargetInst());
                    if (GuidData.team.getTeamTargetInst() > 0) {
                        this.showTargetInstPanel();
                    }
                }
                else if ($TeamEvent.type == TeamEvent.SURE_TEAMTYPE_PANEL) {
                    if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                        this.teamUiPanel.refreshType($TeamEvent.data);
                    }
                }
                else if ($TeamEvent.type == TeamEvent.CHG_TEAMTYPE_PANEL) {
                    this.drawTarget();
                }
                else if ($TeamEvent.type == TeamEvent.AUTOMATCH_TEAM_PANEL) {
                    this.refreshTeamList();
                    if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                        this.teamUiPanel.setAutoState();
                    }
                }
                else if ($TeamEvent.type == TeamEvent.APPLY_TEAM_PANEL) {
                    this.showApplyPanel();
                }
                else if ($TeamEvent.type == TeamEvent.CHG_APPLYLIST_TEAM_PANEL) {
                    if (this.applyPanel && this.applyPanel.applyTeamList && this.applyPanel.applyTeamList.hasStage) {
                        this.applyPanel.applyTeamList.refreshDataByNewData();
                    }
                    if (this.inviResquestPanel && this.inviResquestPanel.invitationList && this.inviResquestPanel.invitationList.hasStage) {
                        this.inviResquestPanel.invitationList.resetData();
                    }
                }
                else if ($TeamEvent.type == TeamEvent.INVIREQUEST_TEAM_PANEL) {
                    this.showInviRequestPanel();
                }
                else if ($TeamEvent.type == TeamEvent.BUILD_TEAM_PANEL) {
                    if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                        this.teamUiPanel.buildEvent();
                    }
                }
                else if ($TeamEvent.type == TeamEvent.INVITATION_LIST_TEAM_PANEL) {
                    this.showInvitationPanel();
                }
                else if ($TeamEvent.type == TeamEvent.SHOW_TEAMTYPE_PANEL) {
                    this.showTypePanel($TeamEvent.data);
                }
                else if ($TeamEvent.type == TeamEvent.JOIN_EXIT_TEAM_PANEL) {
                    if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                        this.teamUiPanel.chgTeam();
                        this.teamUiPanel.drawExp();
                    }
                    this.refreshTeamList();
                    this.drawTarget();
                    if (this.teamSurePanel && this.teamSurePanel.hasStage) {
                        this.teamSurePanel.refresh();
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                }
                else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.teamUiPanel) {
                    this.teamUiPanel.dispose();
                    this.teamUiPanel = null;
                    //console.log("释放面板 passUiPanel")
                }
                if (panelEvent.panel == this.chgTeamType) {
                    this.chgTeamType.dispose();
                    this.chgTeamType = null;
                    //console.log("释放面板 chgTeamType")
                }
                if (panelEvent.panel == this.teamSurePanel) {
                    this.teamSurePanel.dispose();
                    this.teamSurePanel = null;
                    //console.log("释放面板 teamSurePanel")
                }
                if (panelEvent.panel == this.convenientTeam) {
                    this.convenientTeam.dispose();
                    this.convenientTeam = null;
                    //console.log("释放面板 convenientTeam")
                }
                if (panelEvent.panel == this.applyPanel) {
                    this.applyPanel.dispose();
                    this.applyPanel = null;
                    //console.log("释放面板 applyPanel")
                }
                if (panelEvent.panel == this.invitationTeam) {
                    this.invitationTeam.dispose();
                    this.invitationTeam = null;
                    //console.log("释放面板 invitationTeam")
                }
                if (panelEvent.panel == this.inviResquestPanel) {
                    this.inviResquestPanel.dispose();
                    this.inviResquestPanel = null;
                    //console.log("释放面板 inviResquestPanel")
                }
            }
        };
        TeamProcessor.prototype.drawTarget = function () {
            if (GuidData.team) {
                var $tabvo = team.TeamModel.getInstance().getdefaultTabVo();
                if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                    this.teamUiPanel.refreshType($tabvo);
                }
            }
        };
        TeamProcessor.prototype.refreshTeamList = function () {
            if (this.teamUiPanel && this.teamUiPanel.teamList && this.teamUiPanel.teamList.hasStage) {
                this.teamUiPanel.teamList.refreshDataByNewData();
            }
        };
        TeamProcessor.prototype.hidePanel = function () {
            if (this.teamUiPanel) {
                this.teamUiPanel.hide();
            }
        };
        TeamProcessor.prototype.showPanel = function ($tabvo) {
            var _this = this;
            if ($tabvo === void 0) { $tabvo = null; }
            if (!this.teamUiPanel) {
                this.teamUiPanel = new team.TeamUiPanel();
            }
            this.teamUiPanel.load(function () {
                if (!$tabvo) {
                    $tabvo = team.TeamModel.getInstance().getdefaultTabVo();
                }
                _this.teamUiPanel.show($tabvo);
            });
        };
        TeamProcessor.prototype.showTargetInstPanel = function () {
            var _this = this;
            if (!this.teamSurePanel) {
                this.teamSurePanel = new team.TeamSurePanel();
            }
            this.teamSurePanel.load(function () {
                _this.teamSurePanel.show();
            });
        };
        TeamProcessor.prototype.showInvitationPanel = function () {
            var _this = this;
            if (!this.invitationTeam) {
                this.invitationTeam = new team.InvitationTeam();
            }
            this.invitationTeam.load(function () {
                _this.invitationTeam.show();
            });
        };
        TeamProcessor.prototype.showTypePanel = function ($tabvo) {
            var _this = this;
            if (!this.chgTeamType) {
                this.chgTeamType = new team.ChgTeamType();
            }
            this.chgTeamType.load(function () {
                _this.chgTeamType.show($tabvo);
            });
        };
        TeamProcessor.prototype.showConvenientPanel = function ($tabvo) {
            var _this = this;
            if (!this.convenientTeam) {
                this.convenientTeam = new team.ConvenientTeam();
            }
            this.convenientTeam.load(function () {
                _this.convenientTeam.show($tabvo);
            });
        };
        TeamProcessor.prototype.showApplyPanel = function () {
            var _this = this;
            if (!this.applyPanel) {
                this.applyPanel = new team.ApplyPanel();
            }
            this.applyPanel.load(function () {
                _this.applyPanel.show();
            });
        };
        TeamProcessor.prototype.showInviRequestPanel = function () {
            var _this = this;
            if (!this.inviResquestPanel) {
                this.inviResquestPanel = new team.InviResquestPanel();
            }
            this.inviResquestPanel.load(function () {
                _this.inviResquestPanel.show();
            });
        };
        //便捷组队
        TeamProcessor.prototype.smsgsearchinfolist = function ($byte) {
            var $data = new s2c_show_group_search_info_list();
            s2c_show_group_search_info_list.read($data, $byte);
            if (this.convenientTeam && this.convenientTeam.convenientList) {
                this.convenientTeam.convenientList.show($data.list);
            }
        };
        //申请入队
        TeamProcessor.prototype.smsgjoinrequest = function ($byte) {
            var vo = new team.ApplyCell;
            vo.guid = $byte.readString();
            vo.name = $byte.readString();
            vo.gender = $byte.readUint32();
            vo.lev = $byte.readUint32();
            vo.vip = $byte.readUint32();
            vo.force = $byte.readDouble();
            team.TeamModel.getInstance().addapplyList(vo);
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        };
        //邀请入队
        TeamProcessor.prototype.smsginvitationrequest = function ($byte) {
            var vo = new team.InviRequestCell;
            vo.teamGuid = $byte.readString();
            vo.name = $byte.readString();
            vo.type = $byte.readUint32();
            vo.level = $byte.readUint32();
            vo.force = $byte.readDouble();
            vo.sender_guid = $byte.readString();
            team.TeamModel.getInstance().addInvireqList(vo);
            console.log("---vo---", vo);
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        };
        TeamProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SHOW_GROUP_SEARCH_INFO_LIST] = function ($byte) { _this.smsgsearchinfolist($byte); };
            obj[Protocols.SMSG_SHOW_GROUP_JOIN_REQUEST] = function ($byte) { _this.smsgjoinrequest($byte); };
            obj[Protocols.SMSG_SHOW_GROUP_INVITE] = function ($byte) { _this.smsginvitationrequest($byte); };
            return obj;
        };
        TeamProcessor.prototype.listenModuleEvents = function () {
            return [
                new TeamEvent(TeamEvent.SHOW_TEAM_PANEL),
                new TeamEvent(TeamEvent.HIDE_TEAM_PANEL),
                new TeamEvent(TeamEvent.JOIN_EXIT_TEAM_PANEL),
                new TeamEvent(TeamEvent.INVITATION_LIST_TEAM_PANEL),
                new TeamEvent(TeamEvent.BUILD_TEAM_PANEL),
                new TeamEvent(TeamEvent.INVIREQUEST_TEAM_PANEL),
                new TeamEvent(TeamEvent.AUTOMATCH_TEAM_PANEL),
                new TeamEvent(TeamEvent.SURE_TEAMTYPE_PANEL),
                new TeamEvent(TeamEvent.REFRESHLIST_TEAM_PANEL),
                new TeamEvent(TeamEvent.SELECT_TEAMTYPE_PANEL),
                new TeamEvent(TeamEvent.SHOW_TEAMTYPE_PANEL),
                new TeamEvent(TeamEvent.CHG_APPLYLIST_TEAM_PANEL),
                new TeamEvent(TeamEvent.APPLY_TEAM_PANEL),
                new TeamEvent(TeamEvent.TARGET_INST_TEAM_PANEL),
                new TeamEvent(TeamEvent.CONVENIENT_TEAM_PANEL),
                new TeamEvent(TeamEvent.CONVENIENT_SELECT_PANEL),
                new TeamEvent(TeamEvent.CHG_TEAMTYPE_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
            ];
        };
        return TeamProcessor;
    }(BaseProcessor));
    team.TeamProcessor = TeamProcessor;
})(team || (team = {}));
//# sourceMappingURL=TeamProcessor.js.map