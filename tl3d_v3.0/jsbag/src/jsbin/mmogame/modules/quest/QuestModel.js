var quest;
(function (quest) {
    var QuestType = /** @class */ (function () {
        function QuestType() {
        }
        QuestType.MAIN = 0; //主线;
        QuestType.XUANSHANG = 1; //悬赏;
        QuestType.ZHIXIAN = 2; //悬赏;
        QuestType.RING = 4; //环;
        QuestType.DAILY = 5; //环;
        return QuestType;
    }());
    quest.QuestType = QuestType;
    var DailyQuestVo = /** @class */ (function () {
        function DailyQuestVo() {
        }
        return DailyQuestVo;
    }());
    quest.DailyQuestVo = DailyQuestVo;
    var QuestTaskVo = /** @class */ (function () {
        function QuestTaskVo() {
            this.huanNum = 0;
            this.finishNum = 0;
            this.finish = false;
        }
        Object.defineProperty(QuestTaskVo.prototype, "id", {
            get: function () {
                if (this.tb_quest) {
                    return this.tb_quest.id;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuestTaskVo.prototype, "questName", {
            get: function () {
                if (this.tb_quest.type == 4 && this.tb_quest.start == 0) {
                    var $dailyLimit = tb.TB_quest_daily_base.getTempByID(1).dailyLimit;
                    return this.tb_quest.questName + "(" + (this.huanNum + 1) + "/" + $dailyLimit + ")";
                }
                if (this.tb_quest.type == QuestType.DAILY && this.tb_quest.start == 0) {
                    return this.tb_quest.questName + "(" + this.finishNum + "/" + this.huanNum + ")";
                }
                return this.tb_quest.questName;
            },
            enumerable: true,
            configurable: true
        });
        QuestTaskVo.prototype.refresh = function () {
            var $item = new Array;
            if (!this.tb_quest.rewards) {
                //console.log("无数据")
                return;
            }
            if (this.tb_quest.rewards.length == 1) {
                $item = this.tb_quest.rewards[0];
            }
            // if (this.tb_quest.rewards.length == 2) {
            //     $item = this.tb_quest.rewards[GuidData.player.getCharType() - 1];
            // }
            this.resItemReward = new Array;
            this.equItemReward = new Array;
            for (var i = 0; i < $item.length; i++) {
                var $arr = $item[i];
                var $vo = tb.TB_item_template.get_TB_item_template(Number($arr[0]));
                if ($vo.money_type > 0) {
                    this.resItemReward.push($arr);
                }
                else {
                    this.equItemReward.push($arr);
                }
            }
            this.finish = Boolean(this.questDataVo.taskState == SharedDef.QUEST_STATUS_COMPLETE);
        };
        return QuestTaskVo;
    }());
    quest.QuestTaskVo = QuestTaskVo;
    var QuestModel = /** @class */ (function () {
        function QuestModel() {
            this._questDic = new Object(); //存放创建过的任务对象
            QuestModel.TrackDic = new Dictionary([]);
        }
        QuestModel.getIconNameById = function (value) {
            var $iconName = PuiData.A_quest_ion1;
            if (value == 2) {
                $iconName = PuiData.A_quest_ion3;
            }
            return $iconName;
        };
        QuestModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new QuestModel();
            }
            return this._instance;
        };
        QuestModel.prototype.refresh = function () {
            this._taskItem = new Array;
            var $arr = GuidData.quest.getTaskList();
            for (var i = 0; i < $arr.length; i++) {
                var $vo;
                if (this._questDic[$arr[i].id]) {
                    $vo = this._questDic[$arr[i].id];
                }
                else {
                    $vo = new QuestTaskVo;
                    this._questDic[$arr[i].id] = $vo;
                    $vo.tb_quest = tb.TB_quest.getTbById($arr[i].id);
                }
                if ($vo.tb_quest.type == QuestType.RING) {
                    $vo.huanNum = GuidData.player.getPlayerIntFieldDailyQuestFinished();
                    //continue;
                }
                $vo.questDataVo = $arr[i];
                $vo.refresh();
                if ($vo.tb_quest.type == QuestType.DAILY && $vo.tb_quest.start != 1) {
                }
                else {
                    //  this._taskItem.push($vo);
                    this._taskItem.unshift($vo);
                }
                if (!QuestModel.TrackDic.containsKey(String($vo.id))) {
                    QuestModel.TrackDic[$vo.id] = true;
                }
            }
        };
        QuestModel.prototype.getQuestDailyVo = function () {
            var $combackAry = new Array();
            var $arr = GuidData.quest.getDaliyQuestList();
            for (var i = 0; i < $arr.length; i++) {
                var $dailyvo = new QuestTaskVo();
                $dailyvo.index = i;
                $dailyvo.questDataVo = $arr[i];
                $dailyvo.tb_quest = tb.TB_quest.getTbById($arr[i].id);
                $dailyvo.tb_quest_daily2_set = tb.TB_quest_daily2_set.getTempVo($dailyvo.tb_quest.belongSet);
                $combackAry.push($dailyvo);
            }
            $combackAry.sort(function (a, b) {
                if (a.questDataVo.taskState == b.questDataVo.taskState) {
                    return a.tb_quest_daily2_set.quality - b.tb_quest_daily2_set.quality;
                }
                else {
                    return a.questDataVo.taskState - b.questDataVo.taskState;
                }
            });
            return $combackAry;
        };
        QuestModel.prototype.restNpcQuestTittle = function () {
            for (var i = 0; GuidData.quest && GameInstance.roleList && i < GameInstance.roleList.length; i++) {
                var $tempChar = GameInstance.roleList[i];
                if ($tempChar.unit && $tempChar.unit.isNpc()) {
                    var $showType = 0;
                    var $dk = this.getItemShow();
                    for (var j = 0; j < $dk.length; j++) {
                        if ($dk[j].tb_quest && $dk[j].tb_quest.targetsPosition.length) {
                            if ($dk[j].tb_quest.targetsPosition[0][0] == 3 && $tempChar.unit.getEntry() == $dk[j].tb_quest.targetsPosition[0][4]) {
                                if ($dk[j].tb_quest.flag == 1) {
                                    $showType = Math.max($showType, 1);
                                }
                                else {
                                    $showType = Math.max($showType, 2);
                                }
                            }
                        }
                    }
                    if ($showType == 0) {
                        $tempChar.removePart(SceneChar.QUEST_ICON);
                    }
                    else {
                        $tempChar.addPart(SceneChar.QUEST_ICON, SceneChar.NONE_SLOT, getModelUIUrl($showType == 1 ? "gantanhao" : "wenhao"));
                    }
                }
            }
        };
        QuestModel.prototype.getItemShow = function () {
            var taskItem = new Array();
            taskItem.push(QuestModel.getInstance().getMainTaskVo());
            var $dailyQuestTaskVo = QuestModel.getInstance().getDailyQuestVoTemp();
            if ($dailyQuestTaskVo) {
                //console.log("---$dailyQuestTaskVo---",$dailyQuestTaskVo);
                taskItem.push($dailyQuestTaskVo);
            }
            var $arr = QuestModel.getInstance().getOtherTaskVo();
            for (var i = 0; i < $arr.length; i++) {
                if (quest.QuestModel.TrackDic[$arr[i].id] && $arr[i].tb_quest.ctype != 2) {
                    taskItem.push($arr[i]);
                }
            }
            taskItem.sort(function (a, b) {
                return b.tb_quest.ctype - a.tb_quest.ctype;
            });
            return taskItem;
        };
        QuestModel.prototype.getQuestDialogueVo = function ($entryId) {
            this.refresh();
            var $arr = new Array;
            var $npcQuestList = this.getQuestDailyVo();
            $npcQuestList = $npcQuestList.concat(this._taskItem);
            for (var i = 0; i < $npcQuestList.length; i++) {
                for (var j = 0; j < $npcQuestList[i].tb_quest.targetsPosition.length; j++) {
                    var $temp = $npcQuestList[i].tb_quest.targetsPosition[j];
                    if ($temp[0] == 3 && $temp[4] == $entryId) {
                        ////console.log($temp[4], $entryId);
                        ////console.log(this._taskItem[i].tb_quest.questName)
                        if (!$npcQuestList[i].finish) {
                            $arr.push($npcQuestList[i]);
                        }
                    }
                }
            }
            return $arr;
        };
        QuestModel.prototype.getMainTaskVo = function () {
            this.refresh();
            for (var i = 0; i < this._taskItem.length; i++) {
                if (this._taskItem[i].tb_quest.type == QuestType.MAIN) {
                    return this._taskItem[i];
                }
            }
            return null;
        };
        QuestModel.prototype.getOtherTaskVo = function () {
            this.refresh();
            var $arr = new Array;
            for (var i = 0; i < this._taskItem.length; i++) {
                if (this._taskItem[i].tb_quest.type != QuestType.MAIN) {
                    $arr.push(this._taskItem[i]);
                }
            }
            return $arr;
        };
        QuestModel.prototype.getDailyQuestVoTemp = function () {
            // var $dailyQuestItem: Array<DailyQuestVo> = GuidData.quest.getDaliyQuestList()
            var $dailyQuestItem = this.getQuestDailyVo();
            var $len = $dailyQuestItem.length;
            var $num = 0;
            var $onlyQuestTaskVo;
            for (var i = 0; i < $len; i++) {
                if ($dailyQuestItem[i].questDataVo.taskState == SharedDef.QUEST_STATUS_END) {
                    $num++;
                }
                $onlyQuestTaskVo = $dailyQuestItem[i];
            }
            if (!GuidData.quest.getDailyQuestSubmitState()) {
                //console.log("日常", $num, "/", $len)
                if ($onlyQuestTaskVo) {
                    $onlyQuestTaskVo.huanNum = $len;
                    $onlyQuestTaskVo.finishNum = $num;
                }
                return $onlyQuestTaskVo;
            }
            else {
                return null;
            }
        };
        QuestModel.prototype.pick_quest_reward = function ($taskVo) {
            if (GuidData.map.isBaseMap()) {
                if ($taskVo.tb_quest.popup == 0) {
                    //console.log("$taskVo.questDataVo.indx", $taskVo.questDataVo.indx);
                    NetManager.getInstance().protocolos.pick_quest_reward($taskVo.questDataVo.indx);
                }
                else if ($taskVo.tb_quest.popup == 1 && $taskVo.tb_quest.type == QuestType.MAIN) {
                    //console.log("pick_quest_reward_popup", $taskVo.tb_quest.popup)
                    ModulePageManager.openPanel(SharedDef.MODULE_QUEST, -1);
                }
            }
        };
        QuestModel.prototype.changeTab = function () {
            var $item = training.TrainingModel.getInstance().getTaskvo();
            for (var j = 0; j < $item.length; j++) {
                if ($item[j].questData) {
                    if ($item[j].tab_adventure.map_id == GuidData.map.tbMapVo.id) {
                        //     leftui.TaskListUi.showType = 1//如果有历练任务，并是进入新图，将指定显示到历练任务
                    }
                }
            }
        };
        QuestModel.prototype.getTaskStrItemByTaskVo = function ($ctx, $taskVo) {
            var $lineWidth225 = quest.QuestModel.lineWidth225;
            var $uiScale = leftui.TaskListUi.taskUiScale15;
            var $itemStrList = new Array();
            var $needLevelStr;
            $taskVo.textrectH = new Array;
            $taskVo.textrectH.push(1); //头加一条件
            $taskVo.textRectHeight = 1;
            if ($taskVo.meshBossVo) {
                $taskVo.textRectHeight = 1.3; //特殊。
                $itemStrList.push($taskVo.meshBossVo.str);
                return $itemStrList;
            }
            else {
                $itemStrList.push("[59d9fe]" + $taskVo.tb_quest.chapterName + $taskVo.questName);
            }
            if ($taskVo.questDataVo.taskState == SharedDef.QUEST_STATUS_UNAVAILABLE) {
                if ($taskVo.tb_quest.level > GuidData.player.getLevel()) {
                    $itemStrList.push("[ff0000]需要达到等级" + $taskVo.tb_quest.level + "[]");
                    $taskVo.textrectH.push(1);
                    $taskVo.textRectHeight++;
                    for (var j = 0; j < $taskVo.tb_quest.text.length; j++) {
                        // $itemStrList.push("[d8d49c]"+$taskVo.tb_quest.text[j]);
                        //  $taskVo.textrectH.push(1)
                        //  $taskVo.textRectHeight++;
                    }
                }
            }
            if ($taskVo.tb_quest.type == QuestType.DAILY && $taskVo.tb_quest.start != 1) {
                $itemStrList.push("[d8d49c]" + tb.TB_quest_daily2_base.getTempVo(1).questshow);
                $taskVo.textrectH.push(1); //头加一条件
                $taskVo.textRectHeight++;
                return $itemStrList;
            }
            for (var i = 0; i < $taskVo.questDataVo.items.length; i++) {
                var $temp = $taskVo.questDataVo.items[i];
                ////console.log("目标:", )
                ////console.log("目标:值", )
                ////console.log("进度", )
                var $str = "";
                $str += "(" + $temp.process;
                $str += "/" + $temp.num + ")";
                if ($taskVo.tb_quest.targetsPosition && $taskVo.tb_quest.targetsPosition[0] && $taskVo.tb_quest.targetsPosition[0][0] == 3 && $taskVo.tb_quest.ctype != 2) {
                    $str = ""; //npc对话不需要进度条
                }
                var $tempStr = $taskVo.tb_quest.text[i][0];
                if ($temp.num == $temp.process) {
                    $str = "[77e313]" + TextRegExp.getTextOnlyTxt($ctx, $tempStr) + $str;
                }
                else {
                    $str = "[d8d49c]" + $tempStr + $str;
                }
                $ctx.font = (true ? "bolder " : "") + " " + 14 * $uiScale + "px " + UIData.font;
                var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
                var $tthh = Math.ceil($textMetrics.width / $lineWidth225);
                $taskVo.textrectH.push(Math.ceil($textMetrics.width / $lineWidth225));
                $taskVo.textRectHeight += $tthh;
                $itemStrList.push($str);
            }
            if ($taskVo.tb_quest.type == QuestType.MAIN && $taskVo.tb_quest.hint.length) {
                //  var $strHint: string = "[ff0000]（挑战BOSS必定掉落玫瑰）[]";
                for (var k = 0; k < $taskVo.tb_quest.hint.length; k++) {
                    var $strHint = $taskVo.tb_quest.hint[k][0];
                    //console.log("$strHint===========>", $taskVo.tb_quest.hint)
                    $ctx.font = (true ? "bolder " : "") + " " + 14 * $uiScale + "px " + UIData.font;
                    var $textMetrics = TextRegExp.getTextMetrics($ctx, $strHint);
                    var $tthh = Math.ceil($textMetrics.width / $lineWidth225);
                    if ($textMetrics.width % $lineWidth225 < 4 && $tthh > 1) {
                        $tthh--;
                    }
                    $taskVo.textrectH.push(Math.ceil($textMetrics.width / $lineWidth225));
                    $taskVo.textRectHeight += $tthh;
                    $itemStrList.push($strHint);
                }
            }
            $taskVo.itemStrList = $itemStrList;
            return $itemStrList;
        };
        QuestModel.prototype.toplay = function ($to2D) {
            var _this = this;
            var item = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), $to2D);
            ////console.log(GameInstance.mainChar.getAstarPos())
            ////console.log($to2D)
            ////console.log(item)
            ////console.log("--------------------")
            if (item && item.length > 1) {
                if (!GameInstance.mainChar.isMount) {
                    if (GuidData.player.isOpenSystemById(SharedDef.MODULE_MOUNT)) {
                        //console.log("得上坐骑看看")
                        if (Vector2D.distance(GameInstance.mainChar.getAstarPos(), $to2D) > 10) {
                            MainCharControlModel.getInstance().ride_mount(1);
                        }
                    }
                }
                AotuSkillManager.getInstance().aotuWalk = true;
                MainCharControlModel.getInstance().setWalkPathFun(item, function () { _this.walkPathComplete(); });
            }
            else {
                this.walkPathComplete();
            }
        };
        QuestModel.prototype.walkPathComplete = function () {
            AotuSkillManager.getInstance().aotuWalk = false;
            if (GameInstance.questMoveVo) {
                if (GameInstance.questMoveVo.data instanceof quest.QuestTaskVo) {
                    var $taskVo = GameInstance.questMoveVo.data;
                    var $temp = $taskVo.clikInfo;
                    if ($temp) {
                        var $type = $temp[0];
                        var $collectionType = 0;
                        switch ($type) {
                            case 7:
                            case 1:
                                AotuSkillManager.getInstance().aotuBattle = true;
                                $collectionType = 0;
                                //if (mainUi.MainUiModel.skillTabIndex ==1) {
                                //    mainUi.MainUiModel.skillTabIndex = 0
                                //    GameInstance.mainUi.setSkillMenuPanelType(mainUi.MainUiModel.skillTabIndex)
                                //}
                                break;
                            case 3:
                                //console.log("npc对话")
                                var $k = new dialog.DialogueEvent(dialog.DialogueEvent.SHOW_DIALOGUE_PANEL);
                                $k.entryId = $temp[4];
                                if ($temp.length > 5) {
                                    $k.tabId = $temp[5];
                                }
                                else {
                                    $k.tabId = -1;
                                }
                                ModuleEventManager.dispatchEvent($k); //
                                $collectionType = 1;
                                break;
                            case 4:
                                //console.log("采集宝箱")
                                $collectionType = 2;
                                //this.aoutPlayQuest($taskVo)
                                var $tb = tb.TB_gameobject_template.get_TB_gameobject_template($temp[4]);
                                $collectionType = $tb.style;
                                this.findNearCollectionTaget($temp[4]);
                                break;
                            case 5:
                                //console.log("使用物品", $temp[4], $temp[5])
                                // UseItemPanel.getInstance().show($temp[4], $temp[5], "", false, 0, 5000);
                                // UseItemPanel.getInstance().show($temp[5], "", false, 0, 5000);
                                var vo = new newbieguide.UseItemVo;
                                vo.itemId = $temp[5];
                                vo.time = 5000;
                                vo.guid = "";
                                vo.equPos = 0;
                                vo.num = 1;
                                var $evt = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_USEITEM_EVENT);
                                $evt.data = vo;
                                ModuleEventManager.dispatchEvent($evt);
                                $collectionType = 3;
                                break;
                            default:
                                break;
                        }
                        // GameInstance.mainUi.bottomRightSystem.changeBaskSkillIcon($collectionType);
                    }
                    // AotuSkillManager.getInstance().aotu = true
                }
                // GameInstance.questMoveVo = null;
            }
        };
        QuestModel.prototype.getClikTaskItemByIndx = function ($taskVo, indx) {
            var $temp;
            var $QuestDataMeshVo;
            var s = 0;
            var e = 0;
            for (var i = 0; $taskVo.textrectH && i < $taskVo.textrectH.length; i++) {
                e = $taskVo.textrectH[i] + s;
                if (indx >= s && indx < e && i >= 1) {
                    $QuestDataMeshVo = $taskVo.questDataVo.items[i - 1];
                    if ($QuestDataMeshVo && $QuestDataMeshVo.num != $QuestDataMeshVo.process) {
                        $temp = $taskVo.tb_quest.targetsPosition[i - 1]; //因为主标题没有任务目标，所以要-1
                        break;
                    }
                }
                s = e;
            }
            if (!$temp) {
                for (var j = 0; j < $taskVo.questDataVo.items.length; j++) {
                    $QuestDataMeshVo = $taskVo.questDataVo.items[j];
                    if ($QuestDataMeshVo.num != $QuestDataMeshVo.process) {
                        $temp = $taskVo.tb_quest.targetsPosition[j];
                        break;
                    }
                }
            }
            return $temp;
        };
        QuestModel.prototype.clikTaskVoCell = function ($taskVo, indx) {
            if ($taskVo.finish) {
                NetManager.getInstance().protocolos.pick_quest_reward($taskVo.questDataVo.indx);
                // quest.QuestModel.getInstance().pick_quest_reward($taskVo)
                //   ModulePageManager.openPanel(PanelClass.SHOW_QUEST_PANEL, $taskVo.tb_quest.type);
            }
            else {
                if ($taskVo.tb_quest.type == QuestType.DAILY && $taskVo.tb_quest.start != 1) {
                    // ModuleEventManager.dispatchEvent(new quest.QuestEvent(quest.QuestEvent.SHOW_DAILY_QUEST_EVENT));
                    //console.log("---111-日常任务");
                    ModulePageManager.openPanel(SharedDef.MODULE_DAILY_TASKS, SharedDef.MODULE_DAILY_TASKS);
                }
                else {
                    if ($taskVo.tb_quest.targetsPosition) {
                        var $temp = this.getClikTaskItemByIndx($taskVo, indx);
                        //    GameInstance.mainUi.bottomRightSystem.changeBaskSkillIcon(0);
                        this.meshQuestTargets($taskVo, $temp);
                    }
                }
            }
        };
        QuestModel.prototype.meshQuestTargets = function ($taskVo, $temp) {
            if ($temp) {
                var $type = $temp[0];
                switch ($type) {
                    case 1:
                    case 3:
                    case 4:
                    case 5:
                    case 7:
                        if (SceneManager.getInstance().render == false) {
                            UIManager.getInstance().removeAll();
                            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
                        }
                        GameInstance.questMoveVo = new QuestMoveVo();
                        GameInstance.questMoveVo.pos = new Vector2D($temp[2], $temp[3]);
                        $taskVo.clikInfo = $temp;
                        GameInstance.questMoveVo.data = $taskVo;
                        if ($temp[1] != 0) {
                            if (GuidData.map.getMapID() == $temp[1]) {
                                this.toplay(new Vector2D($temp[2], $temp[3]));
                            }
                            else {
                                var $moveV2d = GuidData.map.tbMapVo.getTeleportmap($temp[1]);
                                if ($moveV2d) {
                                    //console.log("走过去")
                                    AotuSkillManager.getInstance().aotuBattle = false;
                                    if (!GameInstance.mainChar.isMount) {
                                        if (GuidData.player.isOpenSystemById(SharedDef.MODULE_MOUNT)) {
                                            MainCharControlModel.getInstance().sendStop();
                                            MainCharControlModel.getInstance().ride_mount(1);
                                        }
                                    }
                                    MainCharControlModel.getInstance().setWalkPathFun(AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), $moveV2d), function () { GameMouseManager.getInstance().walkPathComplete(); });
                                }
                                else {
                                    /*
                                    bottomui.Progress_line.getInstance().show(1000, () => {
                                    });
                                    */
                                    NetManager.getInstance().protocolos.teleport_map($temp[1], GuidData.map.getLineID());
                                }
                            }
                        }
                        else {
                            this.walkPathComplete();
                        }
                        break;
                    case 2:
                        this.openPanel($temp[1], $temp[2]);
                        break;
                    case 8:
                        //console.log("任务下标", $taskVo.questDataVo.indx)
                        GameInstance.questMoveVo = new QuestMoveVo();
                        GameInstance.questMoveVo.data = $taskVo;
                        NetManager.getInstance().protocolos.execute_quest_cmd_after_accepted($taskVo.questDataVo.indx);
                        break;
                    case 6:
                        var ary = [$temp[2], $temp[3]];
                        this.openPanel($temp[1], ary);
                        break;
                    case 10://传往试练塔
                        AotuSkillManager.getInstance().aotuBattle = true;
                        if (!GuidData.map.isAdventureBaseScene()) {
                            NetManager.getInstance().protocolos.enter_trial_instance();
                        }
                        break;
                    case 11://挑战BOSS
                        AotuSkillManager.getInstance().aotuBattle = true;
                        if (!GuidData.map.isAdventureBossScene()) {
                            NetManager.getInstance().protocolos.challange_boss();
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        QuestModel.prototype.openPanel = function (value, $data) {
            // if (GuidData.player.isOpenSystemById(value) || value == SharedDef.MODULE_BAG) {  //
            // //console.log("从任务准备打开的系统", value);
            // switch (value) {
            //     // case SharedDef.MODULE_DIVINE:
            //     //     this.showActivityTittle(tb.TB_system_preview.getTempVo(1))
            //     //     break;
            //     default:
            var page;
            if (value == SharedDef.MODULE_MALL) {
                page = $data[0];
            }
            else {
                page = $data;
            }
            var $obj = TableData.getInstance().getData(TableData.tb_system_base, Number(value * 10 + page));
            if ($obj) {
                if ($obj["level"] > GuidData.player.getLevel()) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + $obj["level"] + "级后开启系统", 99);
                    return;
                }
            }
            else {
                //console.log("---------------系统开启表没有查找到",Number(value * 10 + page),"--------------"); 
            }
            ModulePageManager.openPanel(value, $data);
            // break;
            // }
            // } else {
            //     //console.log("系统还没打开请稍后", value);
            // }
        };
        // private showActivityTittle($tb: tb.TB_system_preview): void {
        //     var a: vec3DshowVo = new vec3DshowVo();
        //     a.info = $tb.p_info;
        //     a.name = $tb.p_name;
        //     a.type = $tb.type;
        //     a.id = $tb.id;
        //     if ($tb.p_model[0].length > 1) {
        //         if (GuidData.player.getCharType() == 1) {
        //             a.modelid = $tb.p_model[0][0];
        //         } else {
        //             a.modelid = $tb.p_model[0][1];
        //         }
        //     } else {
        //         a.modelid = $tb.p_model[0][0];
        //     }
        //     a.state = 0;
        //     Vec3DshowPanel.getInstance().show(a);
        // }
        QuestModel.prototype.use_gameobject = function ($sceneChar) {
            var _this = this;
            var $uintGuid = $sceneChar.unit.getUintGuid();
            var $tb = tb.TB_gameobject_template.get_TB_gameobject_template($sceneChar.unit.getEntry());
            var $type = 0;
            if ($tb.style == 3) {
                $type = 1;
            }
            if ($tb.style == 4) {
                $type = 2;
            }
            if (GameInstance.mainChar.isMount) {
                MainCharControlModel.getInstance().ride_mount(0);
            }
            bottomui.Progress_line.getInstance().show(3000, function () {
                NetManager.getInstance().protocolos.use_gameobject($uintGuid);
                TimeUtil.addTimeOut(500, function () {
                    _this.collectionNextQuest();
                });
            }, $type);
        };
        //采集下一个目标
        QuestModel.prototype.collectionNextQuest = function () {
            if (GameInstance.questMoveVo) {
                var $last = GameInstance.questMoveVo.data;
                var $new = QuestModel.getInstance().getMainTaskVo();
                if ($last.id != $new.id) {
                    this.walkToNewMainQuest();
                }
                else {
                    QuestModel.getInstance().clikTaskVoCell($last, 0);
                }
            }
        };
        QuestModel.prototype.getNextRingQuest = function () {
            for (var i = 0; i < this._taskItem.length; i++) {
                if (this._taskItem[i].tb_quest.type == QuestType.RING) {
                    return this._taskItem[i];
                }
            }
            return null;
        };
        //去下一个主线任务
        QuestModel.prototype.walkToNewMainQuest = function () {
            if (GameInstance.questMoveVo) {
                var $last = GameInstance.questMoveVo.data;
                var $new;
                if ($last && $last.tb_quest) {
                    switch ($last.tb_quest.type) {
                        case QuestType.MAIN:
                            $new = this.getMainTaskVo();
                            break;
                        case QuestType.XUANSHANG:
                            $new = this.getNextXuanshangQuest();
                            break;
                        case QuestType.RING:
                            $new = this.getNextRingQuest();
                            break;
                        default:
                            break;
                    }
                }
                if ($new && $new.tb_quest.targetsPosition.length) {
                    if ($new.tb_quest.targetsPosition[0][0] != 2) {
                        if ($last.id != $new.id) {
                            this.clikTaskVoCell($new, 0);
                        }
                    }
                }
            }
        };
        QuestModel.prototype.getNextXuanshangQuest = function () {
            for (var i = 0; i < this._taskItem.length; i++) {
                if (this._taskItem[i].tb_quest.ctype == QuestType.XUANSHANG) {
                    return this._taskItem[i];
                }
            }
            return null;
        };
        QuestModel.prototype.isNeedMoveNextQuestPos = function () {
            if (!GameInstance.attackTarget) {
                if (GameInstance.questMoveVo) {
                    var $last = GameInstance.questMoveVo.data;
                    if ($last.clikInfo[0] == 7) {
                        for (var i = 0; i < $last.questDataVo.items.length; i++) {
                            var $QuestDataMeshVo = $last.questDataVo.items[i];
                            if ($QuestDataMeshVo.num == $QuestDataMeshVo.process) {
                                if ($last.clikInfo == $last.tb_quest.targetsPosition[i]) {
                                    AotuSkillManager.getInstance().aotuBattle = false;
                                    QuestModel.getInstance().clikTaskVoCell($last, 0);
                                }
                            }
                        }
                    }
                }
            }
        };
        //找到最近可采集对象
        QuestModel.prototype.findNearCollectionTaget = function ($entryId) {
            var $displayList = GameInstance.roleList;
            var $nearChar;
            var $dis = 100000;
            for (var i = 0; $displayList && i < $displayList.length; i++) {
                var $tempChar = $displayList[i];
                if ($tempChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT && !$tempChar.isDeath && $tempChar.unit.getEntry() == $entryId) {
                    this.use_gameobject($tempChar);
                }
            }
        };
        QuestModel.prototype.frameUpData = function () {
            if (GameInstance.questMoveVo) {
                if (GameInstance.questMoveVo.data instanceof QuestTaskVo) {
                    var $questTaskVo = GameInstance.questMoveVo.data;
                    if ($questTaskVo.finish) {
                        GameInstance.questMoveVo = null;
                        if (AotuSkillManager.getInstance().aotuBattle) {
                            var $mainTaskVo = this.getMainTaskVo();
                            if ($mainTaskVo) {
                                //console.log($mainTaskVo);
                                this.clikTaskVoCell($mainTaskVo, 0);
                            }
                            AotuSkillManager.getInstance().aotuBattle = false;
                        }
                    }
                    else {
                        this.isNeedMoveNextQuestPos();
                    }
                }
            }
        };
        QuestModel.lineWidth225 = 225;
        return QuestModel;
    }());
    quest.QuestModel = QuestModel;
})(quest || (quest = {}));
//# sourceMappingURL=QuestModel.js.map