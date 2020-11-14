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
var EngineProcessor = /** @class */ (function (_super) {
    __extends(EngineProcessor, _super);
    function EngineProcessor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coreDataNum = 0;
        _this.hasCoreDataInit = false;
        return _this;
    }
    EngineProcessor.prototype.getName = function () {
        return "EngineProcessor";
    };
    EngineProcessor.prototype.receivedModuleEvent = function ($event) {
        var engEvt = $event;
        if (engEvt.type == EngineEvent.CREAT_SCENE_EVENT) {
            GameInstance.threeBattarId = 0;
            var sName = engEvt.sceneName;
            SceneManager.getInstance().loadScene(sName, engEvt.sceneLoadcomplteFun, engEvt.sceneProgressFun, engEvt.sceneAnylsizFun);
        }
        else if (engEvt.type == EngineEvent.ENTER_SCENE_EVENT) {
            GameControlManager.getInstance().init();
            this.AnalysisMapData();
            this.enterSceneDothing();
        }
        else if (engEvt.type == EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS) {
            this.mapIntFieldQuestsProcess();
        }
        else if (engEvt.type == EngineEvent.CORE_DATA_CREATED_EVENT) {
            this.addCoreNum();
        }
    };
    EngineProcessor.prototype.addCoreNum = function () {
        if (this.hasCoreDataInit) {
            return;
        }
        this.coreDataNum++;
        if (this.coreDataNum >= 9) {
            this.hasCoreDataInit = true;
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT));
        }
    };
    EngineProcessor.prototype.findNextTaskPos = function () {
        if (Boolean(GuidData.map.tbMapVo.aotubattle == 1)) {
            //自动战斗地图将不找下个任务
            return;
        }
        //console.log("--findNextTaskPos---");
        TimeUtil.addTimeOut(250, function () {
            // if (GameInstance.questMoveVo && GuidData.map.isBaseMap()) {
            if (GameInstance.questMoveVo) {
                // console.log("寻路到下个坐标点", GameInstance.questMoveVo)
                if (GameInstance.questMoveVo.autoplay) {
                    //寻路后回调
                    var item = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), GameInstance.questMoveVo.pos);
                    if (item && item.length) {
                        MainCharControlModel.getInstance().setWalkPathFun(item, function () {
                            AotuSkillManager.getInstance().aotuBattle = true;
                        });
                    }
                    GameInstance.questMoveVo = null;
                }
                else {
                    quest.QuestModel.getInstance().toplay(GameInstance.questMoveVo.pos);
                }
            }
        });
    };
    /**进入场景需要处理的逻辑*/
    EngineProcessor.prototype.enterSceneDothing = function () {
        if (GuidData.map.isFuBen() || GuidData.map.is1V1() || GuidData.map.is3V3()) {
            if (GameInstance.questMoveVo && GameInstance.questMoveVo.autoplay) {
                //全民boss自动寻路找boss
            }
            else {
                GameInstance.questMoveVo = null;
            }
        }
        this.findNextTaskPos();
        //console.log("----前置地图----", GuidData.player.getLastMapType());
        if (GuidData.player.getLastMapType() == SharedDef.INSTANCE_SUB_TYPE_PRIVATE_BOSS) {
            ModulePageManager.openPanel(SharedDef.MODULE_BOSS, SharedDef.MODULE_BOSS_PERSON_BOSS);
        }
        else if (GuidData.player.getLastMapType() == SharedDef.INSTANCE_SUB_TYPE_STAGE) {
            var bbb = TableData.getInstance().getData(TableData.tb_instance_stage, GuidData.player.getCurPassId());
            if (bbb) {
                if (GuidData.map.tbMapVo.inst_sub_type != SharedDef.INSTANCE_SUB_TYPE_STAGE) {
                    //如果我不在当前地图里
                    if (bbb["autoui"] == 1) {
                        TimeUtil.addTimeOut(500, function () {
                            ModulePageManager.openPanel(SharedDef.MODULE_CP);
                        });
                    }
                }
            }
        }
        else if (GuidData.player.getLastMapType() == SharedDef.INSTANCE_SUB_TYPE_RES) {
            TimeUtil.addTimeOut(500, function () {
                ModulePageManager.openNpcPanel(SharedDef.MODULE_INSTANCE, [SharedDef.MODULE_INSTANCE_RES]);
            });
        }
    };
    EngineProcessor.prototype.mapIntFieldQuestsProcess = function () {
        ////console.log("更新副本进度")
        if (GuidData.map.is3V3()) {
        }
        else if (GuidData.map.isFuBen()) {
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST)); //副本
        }
    };
    EngineProcessor.prototype.AnalysisMapData = function () {
        //if (GuidData.map.isFuBen()) {  //副本
        //    AotuSkillManager.getInstance().aotuBattle = true;
        //}
        //if (GuidData.map.isBaseMap()) {  //基础场景
        //    AotuSkillManager.getInstance().aotuBattle = false;
        //}
        //if (GuidData.map.tbMapVo && GuidData.map.tbMapVo.inst_type == 2) {
        //    AotuSkillManager.getInstance().aotuBattle = true;
        //} else {
        //    AotuSkillManager.getInstance().aotuBattle = false;
        //}
        //AotuSkillManager.getInstance().aotuBattle = false;
        if (GuidData.map.tbMapVo.path.length) {
            var $path = new Array();
            for (var i = 0; i < GuidData.map.tbMapVo.path.length; i++) {
                $path.push(new Vector2D(GuidData.map.tbMapVo.path[i][0], GuidData.map.tbMapVo.path[i][1]));
            }
            AotuSkillManager.getInstance().pathItem = $path;
            //console.log($path)
        }
        else {
            AotuSkillManager.getInstance().pathItem = null;
        }
        quest.QuestModel.getInstance().changeTab();
    };
    EngineProcessor.prototype.loadSecenCom = function () {
        //console.log("over");
    };
    EngineProcessor.prototype.loadProgress = function (num) {
        //console.log("loading " + float2int(num * 100) + "%");
    };
    EngineProcessor.prototype.listenModuleEvents = function () {
        return [
            new EngineEvent(EngineEvent.CREAT_SCENE_EVENT),
            new EngineEvent(EngineEvent.CREAT_MAINCHAR_EVENT),
            new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
            new EngineEvent(EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS),
            new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT),
        ];
    };
    return EngineProcessor;
}(BaseProcessor));
//# sourceMappingURL=EngineProcessor.js.map