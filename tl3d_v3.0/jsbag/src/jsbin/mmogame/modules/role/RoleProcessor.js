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
var role;
(function (role) {
    var RoleUiModule = /** @class */ (function (_super) {
        __extends(RoleUiModule, _super);
        function RoleUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RoleUiModule.prototype.getModuleName = function () {
            return "RoleUiModule";
        };
        RoleUiModule.prototype.listProcessors = function () {
            return [new RoleProcessor()];
        };
        return RoleUiModule;
    }(Module));
    role.RoleUiModule = RoleUiModule;
    var RoleUiEvent = /** @class */ (function (_super) {
        __extends(RoleUiEvent, _super);
        function RoleUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示角色面板
        RoleUiEvent.SHOW_ROLE_EVENT = "SHOW_ROLE_EVENT";
        //隐藏角色面板
        RoleUiEvent.HIDE_ROLE_EVENT = "HIDE_ROLE_EVENT";
        // //选中item
        // public static SELECT_ITEM_EVENT: string = "SELECT_ITEM_EVENT";
        // //解锁法宝
        // public static UNLOCK_WEAPON_EVENT: string = "UNLOCK_WEAPON_EVENT";
        // //更新法宝数据
        // public static CHANGE_WEAPON_EVENT: string = "CHANGE_WEAPON_EVENT";
        // //首胜flag变化
        // public static CHANGE_FIRST_EVENT: string = "CHANGE_FIRST_EVENT";
        // //打开匹配面板
        // public static SHOW_WAITJOIN_PANEL: string = "SHOW_WAITJOIN_PANEL";
        //选择Tab事件
        RoleUiEvent.Achievement_SELECT_TAB_EVENT = "Achievement_SELECT_TAB_EVENT";
        //展示右侧数据事件
        RoleUiEvent.Achievement_VIEW_ITEM_EVENT = "Achievement_VIEW_ITEM_EVENT";
        //领取奖励事件
        RoleUiEvent.Achievement_RECEIVE_EVENT = "Achievement_RECEIVE_EVENT";
        //改名界面
        RoleUiEvent.CHANGE_NAME_EVENT = "CHANGE_NAME_EVENT";
        //玩家名变化
        RoleUiEvent.NAME_CHG_EVENT = "NAME_CHG_EVENT";
        //称号战斗力变化
        RoleUiEvent.TITLE_FORCE_CHG_EVENT = "TITLE_FORCE_CHG_EVENT";
        //展示称号详情信息
        RoleUiEvent.SHOWVIEW_Designation_EVENT = "SHOWVIEW_Designation_EVENT";
        //装备称号发生变化
        RoleUiEvent.CHANGE_MY_Designation_EVENT = "CHANGE_MY_Designation_EVENT";
        //新称号初始化
        RoleUiEvent.INIT_Designation_EVENT = "INIT_Designation_EVENT";
        return RoleUiEvent;
    }(BaseEvent));
    role.RoleUiEvent = RoleUiEvent;
    var RoleProcessor = /** @class */ (function (_super) {
        __extends(RoleProcessor, _super);
        function RoleProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._nodeInit = false;
            _this._type = -2;
            _this._stype = -2;
            return _this;
        }
        RoleProcessor.prototype.getName = function () {
            return "TreasureProcessor";
        };
        RoleProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof RoleUiEvent) {
                this.processRedPoint();
                var $uiEvent = $event;
                //console.log("---变化type---", $uiEvent.type);
                if ($uiEvent.type == RoleUiEvent.SHOW_ROLE_EVENT) {
                    this.showUi();
                }
                else if ($uiEvent.type == RoleUiEvent.HIDE_ROLE_EVENT) {
                    this.hideUi();
                }
                else if ($uiEvent.type == RoleUiEvent.Achievement_SELECT_TAB_EVENT) {
                    this.selectTab($uiEvent.data);
                }
                else if ($uiEvent.type == RoleUiEvent.Achievement_VIEW_ITEM_EVENT) {
                    this.viewItem($uiEvent.data);
                }
                else if ($uiEvent.type == RoleUiEvent.Achievement_RECEIVE_EVENT) {
                    this.receive();
                }
                else if ($uiEvent.type == RoleUiEvent.CHANGE_NAME_EVENT) {
                    this.showchangenamePanel();
                }
                else if ($uiEvent.type == RoleUiEvent.NAME_CHG_EVENT) {
                    this.chgname();
                }
                else if ($uiEvent.type == RoleUiEvent.TITLE_FORCE_CHG_EVENT) {
                    this.titleforcechg();
                }
                else if ($uiEvent.type == RoleUiEvent.SHOWVIEW_Designation_EVENT) {
                    this.showrightview($uiEvent.data);
                }
                else if ($uiEvent.type == RoleUiEvent.INIT_Designation_EVENT) {
                    this.initData();
                }
                else if ($uiEvent.type == RoleUiEvent.CHANGE_MY_Designation_EVENT) {
                    this.selectdatatoindex();
                }
            }
            else if ($event.type == EngineEvent.PLAYER_EXPAND_INT_XP) {
                //经验变化
                this.setexp();
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            }
            else if ($event.type == EngineEvent.MONEY_CHANGE || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            }
            else if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                // if (this._needItem) {
                //     if (this.isNeedItem((<charbg.CharBgEvent>$event).change)) {
                //         this.processRedPoint();
                //     }
                // } else {
                this.processRedPoint();
                // }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._roleUiPanel) {
                    this.disposenode();
                    this._roleUiPanel.dispose();
                    this._roleUiPanel = null;
                    //console.log("释放面板 _roleUiPanel")
                }
                if (panelEvent.panel == this._changenamePanel) {
                    this._changenamePanel.dispose();
                    this._changenamePanel = null;
                    //console.log("释放面板 _changenamePanel")
                }
            }
        };
        // private isNeedItem($chgary: Array<number>): boolean {
        //     if ($chgary) {
        //         for (let i = 0; i < $chgary.length; i++) {
        //             var hasflag = this._needItem.indexOf($chgary[i]);
        //             if (hasflag != -1) {
        //                 return true;
        //             }
        //         }
        //     }
        //     return false;
        // }
        // private _needItem: Array<number>
        RoleProcessor.prototype.disposenode = function () {
            var ary12 = RedPointManager.getInstance().getNodeByID(12).children;
            for (var i = 0; i < ary12.length; i++) {
                ary12[i].unBind();
            }
            var ary115 = RedPointManager.getInstance().getNodeByID(115).children;
            for (var i = 0; i < ary115.length; i++) {
                ary115[i].unBind();
            }
        };
        RoleProcessor.prototype.initRedNode = function () {
            if (this._nodeInit) {
                return;
            }
            var pnode12 = RedPointManager.getInstance().getNodeByID(12);
            var $arr112 = role.RoleModel.getInstance().getListByTab(role.TabKey.TabAction);
            for (var i = 0; i < $arr112.length; i++) {
                var node = new RedPointNode();
                node.data = $arr112[i];
                pnode12.addChild(node);
            }
            var pnode115 = RedPointManager.getInstance().getNodeByID(115);
            var $arr115 = role.RoleModel.getInstance().getListByTab(role.TabKey.Tabdesignation);
            for (var i = 0; i < $arr115.length; i++) {
                var node = new RedPointNode();
                node.data = $arr115[i];
                pnode115.addChild(node);
            }
            this._nodeInit = true;
            this.processRedPoint();
        };
        RoleProcessor.prototype.processRedPoint = function () {
            // if (!this._needItem) {
            //     this._needItem = new Array
            // }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_ROLE, SharedDef.MODULE_ROLE_ACHIEVE)) {
                var node7 = RedPointManager.getInstance().getNodeByID(7);
                var firstlist = role.RoleModel.getInstance().getFirstList();
                node7.show = false;
                for (var index = 0; index < firstlist.length; index++) {
                    var element = firstlist[index];
                    if (element.hasReach) {
                        if (!element.hasReward) {
                            node7.show = true;
                            break;
                        }
                    }
                }
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_ROLE, SharedDef.MODULE_ROLE_TITLE)) {
                var $arr112 = role.RoleModel.getInstance().getListByTab(role.TabKey.TabAction);
                var ary12 = RedPointManager.getInstance().getNodeByID(12).children;
                for (var i = 0; i < ary12.length; i++) {
                    ary12[i].data = $arr112[i];
                    this.chgState(ary12[i]);
                }
                var $arr115 = role.RoleModel.getInstance().getListByTab(role.TabKey.Tabdesignation);
                var ary115 = RedPointManager.getInstance().getNodeByID(115).children;
                for (var j = 0; j < ary115.length; j++) {
                    ary115[j].data = $arr115[j];
                    this.chgState(ary115[j]);
                }
            }
        };
        RoleProcessor.prototype.chgState = function ($node) {
            var obj = $node.data;
            if (obj.state == 2) {
                $node.show = true;
            }
            else if (obj.state == 1) {
                $node.show = false;
                if (obj.data.unlock_type != 1) {
                    // if (this._needItem.indexOf(obj.data.unlock_cost[0][0]) == -1) {
                    //     this._needItem.push(obj.data.unlock_cost[0][0]);
                    // }
                    if (hasEnoughResItem(obj.data.unlock_cost[0])) {
                        $node.show = true;
                    }
                }
            }
            else {
                $node.show = false;
            }
        };
        RoleProcessor.prototype.setexp = function () {
            if (this._roleUiPanel && this._roleUiPanel.attributeUiPanel && this._roleUiPanel.attributeUiPanel.hasStage) {
                this._roleUiPanel.attributeUiPanel.setEXP();
            }
        };
        RoleProcessor.prototype.selectdatatoindex = function () {
            //console.log("===来消息了");
            if (this._roleUiPanel && this._roleUiPanel.designationPanel && this._roleUiPanel.designationPanel.gdesignationList && this._roleUiPanel.designationPanel.gdesignationList.hasStage) {
                this._roleUiPanel.designationPanel.gdesignationList.selectDataToIndex();
            }
        };
        RoleProcessor.prototype.initData = function () {
            if (this._roleUiPanel && this._roleUiPanel.designationPanel && this._roleUiPanel.designationPanel.gdesignationList && this._roleUiPanel.designationPanel.gdesignationList.hasStage) {
                this._roleUiPanel.designationPanel.gdesignationList.selectDataToIndex();
            }
        };
        RoleProcessor.prototype.showrightview = function ($data) {
            if (this._roleUiPanel && this._roleUiPanel.designationPanel && this._roleUiPanel.designationPanel.hasStage) {
                this._roleUiPanel.designationPanel.resetData($data.data);
            }
        };
        RoleProcessor.prototype.titleforcechg = function () {
            if (this._roleUiPanel && this._roleUiPanel.designationPanel && this._roleUiPanel.designationPanel.hasStage) {
                this._roleUiPanel.designationPanel.setAllForce();
            }
        };
        RoleProcessor.prototype.chgname = function () {
            if (this._roleUiPanel && this._roleUiPanel.attributeUiPanel && this._roleUiPanel.attributeUiPanel.hasStage) {
                this._roleUiPanel.attributeUiPanel.setRolemsg();
            }
        };
        RoleProcessor.prototype.selectTab = function ($data) {
            var $vo = $data.data;
            if ($vo.state == 1) {
                //一级页签切换
                if (this._roleUiPanel && this._roleUiPanel.achievementPanel && this._roleUiPanel.achievementPanel.achievementTabList && this._roleUiPanel.achievementPanel.achievementTabList.hasStage) {
                    if ($vo.selecteds) {
                        this._roleUiPanel.achievementPanel.achievementTabList.refreshDataByNewData(-1);
                    }
                    else {
                        this._roleUiPanel.achievementPanel.achievementTabList.refreshDataByNewData($vo.id);
                    }
                }
            }
            if ($vo.state == 2) {
                //二级页签的切换，数据展示
                this.viewItem($vo.data);
                this._type = $vo.data[0].data.type;
                this._stype = $vo.data[0].data.stype;
            }
        };
        RoleProcessor.prototype.viewItem = function ($data) {
            if (this._roleUiPanel && this._roleUiPanel.achievementPanel && this._roleUiPanel.achievementPanel.achievementList) {
                this._roleUiPanel.achievementPanel.achievementList.show($data);
            }
        };
        RoleProcessor.prototype.receive = function () {
            if (this._roleUiPanel && this._roleUiPanel.achievementPanel && this._roleUiPanel.achievementPanel.achievementTabList && this._roleUiPanel.achievementPanel.achievementTabList.hasStage) {
                this._roleUiPanel.achievementPanel.achievementTabList.refreshDataByNewData();
                var aa1;
                if (this._type == -2 && this._stype == -2) {
                    //未选择页签
                    aa1 = role.RoleModel.getInstance().getFirstList();
                }
                else {
                    //已选择页签
                    aa1 = role.RoleModel.getInstance().getListBy2Type(this._type, this._stype);
                }
                this.viewItem(aa1);
            }
        };
        RoleProcessor.prototype.hideUi = function () {
            this._roleUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        RoleProcessor.prototype.showUi = function () {
            var _this = this;
            if (!this._roleUiPanel) {
                this._roleUiPanel = new role.RoleUiPanel();
            }
            this._roleUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this._roleUiPanel.show();
            });
        };
        RoleProcessor.prototype.showchangenamePanel = function () {
            var _this = this;
            if (!this._changenamePanel) {
                this._changenamePanel = new role.changenamePanel();
            }
            this._changenamePanel.load(function () {
                _this._changenamePanel.show();
            }, false);
        };
        RoleProcessor.prototype.listenModuleEvents = function () {
            return [
                new RoleUiEvent(RoleUiEvent.SHOW_ROLE_EVENT),
                new RoleUiEvent(RoleUiEvent.HIDE_ROLE_EVENT),
                new RoleUiEvent(RoleUiEvent.Achievement_SELECT_TAB_EVENT),
                new RoleUiEvent(RoleUiEvent.Achievement_VIEW_ITEM_EVENT),
                new RoleUiEvent(RoleUiEvent.Achievement_RECEIVE_EVENT),
                new RoleUiEvent(RoleUiEvent.CHANGE_NAME_EVENT),
                new RoleUiEvent(RoleUiEvent.NAME_CHG_EVENT),
                new RoleUiEvent(RoleUiEvent.TITLE_FORCE_CHG_EVENT),
                new RoleUiEvent(RoleUiEvent.SHOWVIEW_Designation_EVENT),
                new RoleUiEvent(RoleUiEvent.CHANGE_MY_Designation_EVENT),
                new RoleUiEvent(RoleUiEvent.INIT_Designation_EVENT),
                // new RoleUiEvent(RoleUiEvent.CHANGE_FIRST_EVENT),
                // new RoleUiEvent(RoleUiEvent.SHOW_WAITJOIN_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.PLAYER_EXPAND_INT_XP),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
            ];
        };
        return RoleProcessor;
    }(BaseProcessor));
    role.RoleProcessor = RoleProcessor;
})(role || (role = {}));
//# sourceMappingURL=RoleProcessor.js.map