var QuestMoveVo = /** @class */ (function () {
    function QuestMoveVo() {
        this.autoplay = false;
    }
    return QuestMoveVo;
}());
var GameInstance = /** @class */ (function () {
    function GameInstance() {
    }
    GameInstance.getGameEndMillisecond = function ($endT) {
        return TimeUtil.getTimer() + ($endT - GameInstance.gameSyncTime.time_now) * 1000;
    };
    GameInstance.getGameSecond = function ($endT) {
        // var $a: number = Math.floor(GameInstance.gameSyncTime.time_now + (TimeUtil.getTimer() - GameInstance.gameSyncClientTime) / 1000);
        var $a = this.getServerNow();
        return $endT - $a;
    };
    GameInstance.getServerNow = function () {
        var $t = (TimeUtil.getTimer() - GameInstance.appSyncClientTime) / 1000 + GameInstance.appSynctTime.time_now;
        return float2int($t);
    };
    Object.defineProperty(GameInstance, "questMoveVo", {
        get: function () {
            return this._questMoveVo;
        },
        set: function (value) {
            if (GuidData.map && GuidData.map.tbMapVo && GuidData.map.tbMapVo.inst_sub_type == 10 && !value) {
                //剧情副本将保留任务
                return;
            }
            this._questMoveVo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameInstance, "threeBattarId", {
        get: function () {
            return this._threeBattarId;
        },
        set: function (value) {
            this._threeBattarId = value;
            ////console.log("this._threeBattarId", this._threeBattarId)
        },
        enumerable: true,
        configurable: true
    });
    GameInstance.setAttackTargetByName = function ($name) {
        for (var i = 0; i < this.roleList.length; i++) {
            if (this.roleList[i].unit.getName() == $name) {
                this.attackTarget = this.roleList[i];
                break;
            }
        }
    };
    GameInstance.init = function () {
        ModuleEventManager.dispatchEvent(new LoginEvent(LoginEvent.LOGIN_CONNET_EVENT));
    };
    Object.defineProperty(GameInstance, "attackTarget", {
        get: function () {
            return GameInstance._attackTarget;
        },
        set: function (value) {
            if (GameInstance._attackTarget) {
                GameInstance._attackTarget.removePart(SceneChar.SEL_PART);
            }
            GameInstance._attackTarget = value;
            if (GameInstance._attackTarget) {
                GameInstance._attackTarget.addPart(SceneChar.SEL_PART, SceneChar.NONE_SLOT, getModelUIUrl("6301"));
            }
        },
        enumerable: true,
        configurable: true
    });
    GameInstance.addSceneChar = function ($char) {
        this.roleList.push($char);
        SceneManager.getInstance().addMovieDisplay($char);
        this.roleListOptimization();
    };
    GameInstance.removeSceneChar = function ($char) {
        this.removeAttackTarget($char);
        var index = this.roleList.indexOf($char);
        if (index != -1) {
            this.roleList.splice(index, 1);
        }
        SceneManager.getInstance().removeMovieDisplay($char);
        this.roleListOptimization();
    };
    GameInstance.clearRoleList = function () {
        while (this.roleList && this.roleList.length) {
            SceneCharManager.getInstance().removeSceneChar(this.roleList.pop());
        }
    };
    GameInstance.roleListOptimization = function () {
        var num = 0;
        for (var i = 0; i < this.roleList.length; i++) {
            if (this.roleList[i].unit && this.roleList[i].unit.isPlayer()) {
                num++;
                if (num > 100 && this.roleList[i] != this.mainChar) {
                    this.roleList[i].optimization = true;
                }
                else {
                    this.roleList[i].optimization = false;
                }
            }
        }
        //console.log("当前场景人数：" + this.roleList.length);
    };
    GameInstance.removeAttackTarget = function ($char) {
        if (GameInstance.attackTarget == $char) {
            //  //console.log("-------------移除攻击目标------")
            GameInstance.attackTarget = null;
        }
    };
    GameInstance.getSceneCharByID = function ($id) {
        for (var i = 0; i < this.roleList.length; i++) {
            if (this.roleList[i].id == $id) {
                return this.roleList[i];
            }
        }
        return null;
    };
    GameInstance.initGameConfig = function () {
    };
    GameInstance.intLoadScene = function ($url) {
        if (SceneManager.getInstance().testUrl($url)) {
            GameInstance.sceneResEqu = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
        }
        else {
            GameInstance.sceneResEqu = false;
            UIManager.getInstance().removeAll();
        }
        GameInstance.setMapData();
        GameInstance.loadScene($url, this.configFinish);
    };
    //public static test(): void {
    //    var movie: Display2dMovie = new Display2dMovie();
    //    movie.initData(6, 1, 40 / 512, 40 / 128, 12);
    //    movie.setUrl("rolemovie/gjs_00.png");
    //    movie.play(CharAction.ATTACK_01);
    //    SceneManager.getInstance().addDisplay2D(movie);
    //}
    GameInstance.loadScene = function (name, completeFun, progressFun) {
        if (completeFun === void 0) { completeFun = null; }
        if (progressFun === void 0) { progressFun = null; }
        GameInstance.mapName = name;
        GameInstance.loadComplteFun = completeFun;
        GameInstance.loadProgressFun = progressFun;
        var loadevt = new SceneLoadEvent(SceneLoadEvent.SHOW_LOAD_EVENT);
        loadevt.backImgUrl = "ui/load/001.jpg";
        ModuleEventManager.dispatchEvent(loadevt);
        var evt = new EngineEvent(EngineEvent.CREAT_SCENE_EVENT);
        evt.sceneName = GameInstance.mapName;
        evt.sceneLoadcomplteFun = GameInstance.mainSceneComplete;
        evt.sceneAnylsizFun = GameInstance.mainSceneAnalysisComplete;
        evt.sceneProgressFun = GameInstance.mainSceneProgress;
        ModuleEventManager.dispatchEvent(evt);
    };
    GameInstance.setMapData = function () {
        //  Scene_data.focus3D.rotationY = 0;
        Scene_data.focus3D.rotationX = -45;
        Scene_data.cam3D.distance = 281;
        Scene_data.focus3D.x = 0;
        Scene_data.focus3D.z = 0;
        Scene_data.focus3D.y = 0;
        SceneManager.mapQudaTreeDistance = 2000;
    };
    GameInstance.mainSceneAnalysisComplete = function () {
        if (GameInstance.loadComplteFun) {
            GameInstance.loadComplteFun();
        }
        ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.REMOVE_LOAD_EVENT));
        GameInstance.firstEnterScene();
    };
    GameInstance.configFinish = function () {
        msgtip.GuideModel.getInstance().stepGuideId = 0; //重置步骤
        msgtip.GuideModel.getInstance().lastPage = null; //重置步骤
        if (GameData.enterSceneNextOpenEvent) {
            ModuleEventManager.dispatchEvent(GameData.enterSceneNextOpenEvent);
            GameData.enterSceneNextOpenEvent = null;
        }
        else {
            SceneManager.getInstance().render = true;
            if (GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                mainUi.MainUiModel.skillTabIndex = 0;
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            AotuSkillManager.getInstance().aotuBattle = Boolean(GuidData.map.tbMapVo.aotubattle == 1);
            if (AotuSkillManager.getInstance().aotuBattle) {
                MainCharControlModel.getInstance().downMount();
            }
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.ENTER_SCENE_EVENT));
            if (GuidData.map.is3V3()) {
                ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.SHOW_KUAFU_PK_SCENE_EVENT));
            }
        }
    };
    GameInstance.firstEnterScene = function () {
        if (GameInstance.first) {
            return;
        }
        GameInstance.first = true;
        if (GuidData.bag) {
            GuidData.bag.setBagAlert();
        }
        //SoundManager.getInstance().playSound();
        GameData.configData.read();
    };
    GameInstance.mainSceneComplete = function () {
        var loadevt = new SceneLoadEvent(SceneLoadEvent.ANALYSIS_LOAD_EVENT);
        ModuleEventManager.dispatchEvent(loadevt);
    };
    GameInstance.mainSceneProgress = function (num) {
        if (GameInstance.loadProgressFun) {
            GameInstance.loadProgressFun(num);
        }
        var loadevt = new SceneLoadEvent(SceneLoadEvent.PROGRESS_LOAD_EVENT);
        loadevt.progress = num;
        ModuleEventManager.dispatchEvent(loadevt);
    };
    GameInstance.teleportMap = function (mapid, lineNo) {
        var tb_map = tb.TB_map.getTB_map(mapid);
        if (tb_map.is_PK) {
            AlertUtil.show(ColorType.Brown7a2f21 + "当前前往地图为PVP地图，可能会被家族外的其他玩家攻击，是否继续前往？", "提示", function (a) {
                if (a == 1) {
                    NetManager.getInstance().protocolos.teleport_map(mapid, lineNo);
                }
            }, 2, ["是", "否"]);
        }
        else {
            NetManager.getInstance().protocolos.teleport_map(mapid, lineNo);
        }
    };
    GameInstance.pingpontm = 9999999;
    GameInstance.pandaVisibel = true;
    GameInstance.canclikFightui = true;
    GameInstance.roleList = new Array;
    GameInstance.bagCdItem = new Object;
    GameInstance.useYaoGan = false;
    GameInstance._threeBattarId = 0; //三连击序号 换场景从0开始
    GameInstance.sceneResEqu = false;
    GameInstance.first = false;
    return GameInstance;
}());
//# sourceMappingURL=GameInstance.js.map