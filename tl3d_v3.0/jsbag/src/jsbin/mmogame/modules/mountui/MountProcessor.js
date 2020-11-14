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
var mountui;
(function (mountui) {
    var MountUiModule = /** @class */ (function (_super) {
        __extends(MountUiModule, _super);
        function MountUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MountUiModule.prototype.getModuleName = function () {
            return "MountUiModule";
        };
        MountUiModule.prototype.listProcessors = function () {
            return [new MountUiProcessor()];
        };
        return MountUiModule;
    }(Module));
    mountui.MountUiModule = MountUiModule;
    var MountUiEvent = /** @class */ (function (_super) {
        __extends(MountUiEvent, _super);
        function MountUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示坐骑面板
        MountUiEvent.SHOW_MOUNT_EVENT = "SHOW_MOUNT_EVENT";
        //隐藏坐骑面板
        MountUiEvent.HIDE_MOUNT_EVENT = "HIDE_MOUNT_EVENT";
        //坐骑服务端数据处理回调事件
        MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT = "MOUNT_LEVET_STAR_CHANGE_EVENT";
        MountUiEvent.CHANGE_jingjie_SKILL_PANEL = "CHANGE_jingjie_SKILL_PANEL";
        MountUiEvent.EFF_EVENT = "EFF_EVENT";
        //技能变化
        MountUiEvent.SKILL_CHANGE_EVENT = "SKILL_CHANGE_EVENT";
        //坐骑等级变化
        MountUiEvent.MOUNT_LEV_CHANGE_EVENT = "MOUNT_LEV_CHANGE_EVENT";
        //幻化list选择item
        MountUiEvent.HUANHUA_SELECT_ITEM_EVENT = "HUANHUA_SELECT_ITEM_EVENT";
        //激活幻化
        MountUiEvent.POP_THE_UNREAL_PANEL = "POP_THE_UNREAL_PANEL";
        //坐骑战力变化
        MountUiEvent.CHG_MOUNT_FORCE = "CHG_MOUNT_FORCE";
        return MountUiEvent;
    }(BaseEvent));
    mountui.MountUiEvent = MountUiEvent;
    var MountUiProcessor = /** @class */ (function (_super) {
        __extends(MountUiProcessor, _super);
        function MountUiProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // private isNeedItem($chgary:Array<number>):boolean{
            //     if($chgary){
            //         for (let i = 0; i < $chgary.length; i++) {
            //             var hasflag = this._needItem.indexOf($chgary[i]);
            //             if(hasflag != -1){
            //                 return true;
            //             }
            //         }
            //     }
            //     return false;
            // }
            // private _needItem:Array<number>
            _this._nodeInit = false;
            return _this;
        }
        MountUiProcessor.prototype.getName = function () {
            return "MountUiProcessor";
        };
        MountUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MountUiEvent) {
                var $mountUiEvent = $event;
                if ($mountUiEvent.type == MountUiEvent.SHOW_MOUNT_EVENT) {
                    this.showUi($mountUiEvent.data);
                }
                else if ($mountUiEvent.type == MountUiEvent.HIDE_MOUNT_EVENT) {
                    this.hideUi();
                }
                else if ($mountUiEvent.type == MountUiEvent.CHANGE_jingjie_SKILL_PANEL) {
                    this.changeSkillPanel();
                }
                else if ($mountUiEvent.type == MountUiEvent.POP_THE_UNREAL_PANEL) {
                    this.actionHuanhua($mountUiEvent.data);
                }
                else if ($mountUiEvent.type == MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT) {
                    //星数和阶数变化的回调
                    this.lev_starchangeevent();
                }
                else if ($mountUiEvent.type == MountUiEvent.SKILL_CHANGE_EVENT) {
                    this.skillchangeevent();
                }
                else if ($mountUiEvent.type == MountUiEvent.MOUNT_LEV_CHANGE_EVENT) {
                    this.mountlevchange();
                }
                else if ($mountUiEvent.type == MountUiEvent.HUANHUA_SELECT_ITEM_EVENT) {
                    this.huanhuaselectitem($mountUiEvent.data);
                }
                else if ($mountUiEvent.type == MountUiEvent.EFF_EVENT) {
                    this.showflyword($mountUiEvent.data);
                }
                else if ($mountUiEvent.type == MountUiEvent.CHG_MOUNT_FORCE) {
                    if (this._newmountUiPanel && this._newmountUiPanel.hasStage) {
                        this._newmountUiPanel.setForce();
                    }
                }
                this.processRedPoint();
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            }
            else if ($event.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL || $event.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                if (this._newmountUiPanel && this._newmountUiPanel.mountUpOrder && this._newmountUiPanel.mountUpOrder.hasStage) {
                    this._newmountUiPanel.mountUpOrder.drawBtn();
                }
            }
            else if ($event.type == EngineEvent.MONEY_CHANGE || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
                this.refreshCost();
            }
            if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    // if(this._needItem){
                    //     if(this.isNeedItem((<charbg.CharBgEvent>$event).change)){
                    //         this.processRedPoint();
                    //         this.refreshCost();
                    //     }
                    // }else{
                    this.processRedPoint();
                    this.refreshCost();
                    // }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._newmountUiPanel) {
                    var nodeList33 = RedPointManager.getInstance().getNodeByID(33).children;
                    for (var i = 0; i < nodeList33.length; i++) {
                        nodeList33[i].unBind();
                    }
                    var nodeList35 = RedPointManager.getInstance().getNodeByID(35).children;
                    for (var i = 0; i < nodeList35.length; i++) {
                        nodeList35[i].unBind();
                    }
                    this._newmountUiPanel.dispose();
                    this._newmountUiPanel = null;
                    //console.log("释放面板 _newmountUiPanel")
                }
            }
        };
        MountUiProcessor.prototype.initRedNode = function () {
            if (this._nodeInit) {
                return;
            }
            var pnode = RedPointManager.getInstance().getNodeByID(33);
            var $arr = mountui.NewMountModel.getInstance().getSkillList();
            for (var i = 0; i < $arr.length; i++) {
                var node = new RedPointNode();
                node.data = $arr[i];
                pnode.addChild(node);
            }
            var pnode1 = RedPointManager.getInstance().getNodeByID(35);
            var $arr1 = mountui.NewMountModel.getInstance().getHuanhuaVO();
            for (var i = 0; i < $arr1.length; i++) {
                var node = new RedPointNode();
                node.data = $arr1[i];
                pnode1.addChild(node);
            }
            this._nodeInit = true;
            this.processRedPoint();
        };
        MountUiProcessor.prototype.processRedPoint = function () {
            if (!GuidData.grow) {
                return;
            }
            if (GuidData.grow.getMountLevel() == 0) {
                return;
            }
            // if(!this._needItem){
            //     this._needItem = new Array
            // }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MOUNT, SharedDef.MODULE_MOUNT_UPGRADE)) {
                //处理节点29
                var node29 = RedPointManager.getInstance().getNodeByID(29);
                var tabary = tb.TB_mount_train_vo.getTabelItem();
                if (GuidData.grow.getMountLevel() == tabary[tabary.length - 1].level && GuidData.grow.getMountStart() == tabary[tabary.length - 1].star) {
                    //满级
                    node29.show = false;
                }
                else {
                    var costary;
                    if (GuidData.grow.getMountStart() == 10) {
                        var tab = tb.TB_mount_upgrade.get_TB_mount_upgrade(GuidData.grow.getMountLevel());
                        costary = tab.upgradecost;
                    }
                    else {
                        var basetab = tb.TB_mount_train_vo.getTB_mount_train_vo(GuidData.grow.getMountLevel(), GuidData.grow.getMountStart());
                        costary = basetab.traincost;
                    }
                    var flagary29 = new Array;
                    for (var i = 0; i < costary.length; i++) {
                        flagary29.push(hasEnoughResItem(costary[i]));
                        // if(this._needItem.indexOf(costary[i][0]) == -1){
                        //     this._needItem.push(costary[i][0]);
                        // }
                    }
                    node29.show = true;
                    for (var flagid = 0; flagid < flagary29.length; flagid++) {
                        node29.show = node29.show && flagary29[flagid];
                    }
                }
                //一键升级是否满足条件
                var $smeltobj = TableData.getInstance().getData(TableData.tb_vip_uplev, 2);
                var viplev = $smeltobj["viplev"];
                var rolelev = $smeltobj["rolelev"];
                var canred = false;
                if (viplev > 0) {
                    canred = GuidData.player.getVipLevel() >= viplev;
                }
                if (!canred && rolelev > 0) {
                    canred = GuidData.player.getLevel() >= rolelev;
                }
                if (GuidData.grow.getMountStart() == 10) {
                    canred = false;
                }
                RedPointManager.getInstance().getNodeByID(134).show = (node29.show && canred);
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MOUNT, SharedDef.MODULE_MOUNT_LEVEL)) {
                //处理节点31
                var node31 = RedPointManager.getInstance().getNodeByID(31);
                var mountlev = GuidData.grow.getMountlev() + 1;
                var tablevary = tb.TB_mount_raise_level.get_TB_mount_raise_level();
                if (mountlev >= tablevary.length || GuidData.player.getLevel() <= mountlev) {
                    //满级//不得超过人物等级
                    node31.show = false;
                }
                else {
                    var flagary31 = new Array;
                    for (var i = 0; i < tablevary[mountlev - 1].cost.length; i++) {
                        flagary31.push(hasEnoughResItem(tablevary[mountlev - 1].cost[i]));
                        // if(this._needItem.indexOf(tablevary[mountlev - 1].cost[i][0]) == -1){
                        //     this._needItem.push(tablevary[mountlev - 1].cost[i][0]);
                        // }
                    }
                    node31.show = true;
                    for (var flagid = 0; flagid < flagary31.length; flagid++) {
                        node31.show = node31.show && flagary31[flagid];
                    }
                }
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MOUNT, SharedDef.MODULE_MOUNT_SKILL)) {
                //处理技能列表节点33
                var aryskill = RedPointManager.getInstance().getNodeByID(33).children;
                for (var i = 0; i < aryskill.length; i++) {
                    var obj = aryskill[i].data;
                    if (obj.state == 0) {
                        if (GuidData.player.getLevel() <= obj.lev) {
                            aryskill[i].show = false;
                        }
                        else {
                            var flagaryskill = new Array;
                            for (var j = 0; j < obj.tabskill_uplev.uplevel_cost.length; j++) {
                                flagaryskill.push(hasEnoughResItem(obj.tabskill_uplev.uplevel_cost[j]));
                                // if(this._needItem.indexOf(obj.tabskill_uplev.uplevel_cost[j][0]) == -1){
                                //     this._needItem.push(obj.tabskill_uplev.uplevel_cost[j][0]);
                                // }
                            }
                            aryskill[i].show = true;
                            for (var flagid = 0; flagid < flagaryskill.length; flagid++) {
                                aryskill[i].show = aryskill[i].show && flagaryskill[flagid];
                            }
                        }
                    }
                    else {
                        aryskill[i].show = false;
                    }
                }
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MOUNT, SharedDef.MODULE_MOUNT_ILLUSION)) {
                //处理幻化列表节点35
                var aryhuanhua = RedPointManager.getInstance().getNodeByID(35).children;
                for (var i = 0; i < aryhuanhua.length; i++) {
                    var nodedata = aryhuanhua[i].data;
                    if (nodedata.state == 1) {
                        var flagaryhuanhua = new Array;
                        for (var j = 0; j < nodedata.tab.costResource.length; j++) {
                            var cost = nodedata.tab.costResource[j];
                            flagaryhuanhua.push(hasEnoughResItem(cost));
                            // if(this._needItem.indexOf(nodedata.tab.costItem[j][0]) == -1){
                            //     this._needItem.push(nodedata.tab.costItem[j][0]);
                            // }
                        }
                        aryhuanhua[i].show = true;
                        for (var flagid = 0; flagid < flagaryhuanhua.length; flagid++) {
                            aryhuanhua[i].show = aryhuanhua[i].show && flagaryhuanhua[flagid];
                        }
                    }
                    else {
                        aryhuanhua[i].show = false;
                    }
                    //暂时先把幻化删除（策划需求）
                    aryhuanhua[i].show = false;
                }
            }
        };
        MountUiProcessor.prototype.showflyword = function ($data) {
            if (this._newmountUiPanel && this._newmountUiPanel.hasStage) {
                this._newmountUiPanel.showflyword($data);
            }
        };
        MountUiProcessor.prototype.refreshCost = function () {
            if (this._newmountUiPanel && this._newmountUiPanel.mountUpOrder && this._newmountUiPanel.mountUpOrder.hasStage) {
                this._newmountUiPanel.mountUpOrder.resetData();
            }
            if (this._newmountUiPanel && this._newmountUiPanel.mountUpLev && this._newmountUiPanel.mountUpLev.hasStage) {
                this._newmountUiPanel.mountUpLev.drawResItem();
            }
            if (this._newmountUiPanel && this._newmountUiPanel.mountSkill && this._newmountUiPanel.mountSkill.mountSkillList && this._newmountUiPanel.mountSkill.mountSkillList.hasStage) {
                this._newmountUiPanel.mountSkill.mountSkillList.refreshDataByNewData();
            }
        };
        MountUiProcessor.prototype.lev_starchangeevent = function () {
            //判断激活状态的变化
            if (this._newmountUiPanel && this._newmountUiPanel.hasStage && GuidData.grow.getMountLevel() == 1 && GuidData.grow.getMountStart() == 0 && GuidData.grow.getMountExp() == 0) {
                this._newmountUiPanel.show(SharedDef.MODULE_MOUNT_UPGRADE);
                return;
            }
            //判断升阶和升星时，进度条的变化
            if (this._newmountUiPanel && this._newmountUiPanel.hasStage) {
                if (GuidData.grow.getMountLevel() > 0) {
                    this._newmountUiPanel.refreshLevStar();
                    this._newmountUiPanel.showExpEff();
                    // this._newmountUiPanel.setForce();
                    this._newmountUiPanel.setAvatar();
                    this._newmountUiPanel.refreshSkill();
                }
            }
            //判断升阶和升星时，升阶面板的数据变化
            if (this._newmountUiPanel && this._newmountUiPanel.mountUpOrder && this._newmountUiPanel.mountUpOrder.hasStage) {
                this._newmountUiPanel.mountUpOrder.resetData();
            }
        };
        MountUiProcessor.prototype.changeSkillPanel = function () {
            if (this._newmountUiPanel && this._newmountUiPanel.mountSkill && this._newmountUiPanel.mountSkill.mountSkillList && this._newmountUiPanel.mountSkill.mountSkillList.hasStage) {
                this._newmountUiPanel.mountSkill.mountSkillList.refreshDataByNewData();
            }
            if (this._newmountUiPanel && this._newmountUiPanel.hasStage) {
                // this._newmountUiPanel.setForce();
            }
        };
        MountUiProcessor.prototype.actionHuanhua = function ($data) {
            if (this._newmountUiPanel && this._newmountUiPanel.mountHuanhua && this._newmountUiPanel.mountHuanhua.huanhuaList && this._newmountUiPanel.mountHuanhua.huanhuaList.hasStage) {
                this._newmountUiPanel.mountHuanhua.huanhuaList.refreshDataByNewData();
                // this._newmountUiPanel.mountHuanhua.huanhuaList.setSelectIndexCopy(this._newmountUiPanel.mountHuanhua.huanhuaList.getCurrentSelectIndex());
                this._newmountUiPanel.mountHuanhua.huanhuaList.setSelectIndex(this._newmountUiPanel.mountHuanhua.huanhuaList.getCurrentSelectIndex());
            }
        };
        MountUiProcessor.prototype.huanhuaselectitem = function ($data) {
            if (this._newmountUiPanel && this._newmountUiPanel.mountHuanhua && this._newmountUiPanel.mountHuanhua.hasStage) {
                this._newmountUiPanel.mountHuanhua.resetData($data.data);
            }
        };
        MountUiProcessor.prototype.mountlevchange = function () {
            if (this._newmountUiPanel && this._newmountUiPanel.mountUpLev && this._newmountUiPanel.mountUpLev.hasStage) {
                this._newmountUiPanel.mountUpLev.resetData();
                // this._newmountUiPanel.setForce();
                // this._newmountUiPanel.showLevelUp(5);
            }
        };
        MountUiProcessor.prototype.skillchangeevent = function () {
            if (this._newmountUiPanel && this._newmountUiPanel.hasStage) {
                this._newmountUiPanel.refreshSkill();
            }
        };
        MountUiProcessor.prototype.hideUi = function () {
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            if (this._newmountUiPanel) {
                this._newmountUiPanel.hide();
            }
        };
        MountUiProcessor.prototype.showUi = function ($data) {
            var _this = this;
            //console.log("----------类型---------", $data);
            if (!this._newmountUiPanel) {
                this._newmountUiPanel = new mountui.NewMountUiPanel();
            }
            this._newmountUiPanel.load(function () {
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_MOUNT;
                ModuleEventManager.dispatchEvent($scenePange);
                if (!$data) {
                    $data = SharedDef.MODULE_MOUNT_UPGRADE;
                }
                if ($data instanceof Array) {
                    _this._newmountUiPanel.show($data[0]);
                }
                else {
                    _this._newmountUiPanel.show($data);
                }
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_MOUNT;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        MountUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new MountUiEvent(MountUiEvent.SHOW_MOUNT_EVENT),
                new MountUiEvent(MountUiEvent.HIDE_MOUNT_EVENT),
                new MountUiEvent(MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT),
                new MountUiEvent(MountUiEvent.CHANGE_jingjie_SKILL_PANEL),
                new MountUiEvent(MountUiEvent.POP_THE_UNREAL_PANEL),
                new MountUiEvent(MountUiEvent.EFF_EVENT),
                new MountUiEvent(MountUiEvent.CHG_MOUNT_FORCE),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new MountUiEvent(MountUiEvent.SKILL_CHANGE_EVENT),
                new MountUiEvent(MountUiEvent.MOUNT_LEV_CHANGE_EVENT),
                new MountUiEvent(MountUiEvent.HUANHUA_SELECT_ITEM_EVENT),
            ];
        };
        return MountUiProcessor;
    }(BaseProcessor));
    mountui.MountUiProcessor = MountUiProcessor;
})(mountui || (mountui = {}));
//# sourceMappingURL=MountProcessor.js.map