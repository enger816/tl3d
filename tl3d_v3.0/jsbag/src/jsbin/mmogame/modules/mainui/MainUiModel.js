var mainUi;
(function (mainUi) {
    var MainUiModel = /** @class */ (function () {
        function MainUiModel() {
        }
        /*
        *获得提示信息 好友，家族，聊天，邮件;
        */
        MainUiModel.mainUiLoadFinish = function () {
            // //console.log("主菜单加载完毕");
            // //如果是女王需要检查是否有人赠送礼物
            // if(GuidData.faction){
            //     GuidData.faction.queenGiftUncheck();
            // }
            // //检测是否有女王回复礼物
            // ModuleEventManager.dispatchEvent(new faction.GiftreceiveEvent(faction.GiftreceiveEvent.RECEIVE_THANK_GIFT_EVENT));
        };
        MainUiModel.getMsgTipData = function () {
            var $arr = new Array;
            if (GuidData.social) {
                if (GuidData.social.getApplyList().length) {
                    $arr.push(1);
                }
            }
            if (GuidData.faction) {
                if (GuidData.faction.getApplyList().length && GuidData.faction.playerIdentity < 4) {
                    $arr.push(2);
                }
                // if (GuidData.faction.queenGiftUncheckNum > 0) {
                //     $arr.push(3);
                // }
            }
            else {
                if (faction.FactionModel.getInstance().getInvitationList().length) {
                    $arr.push(2);
                }
            }
            if (Chat.ChatModel.getInstance().getHaveNewChatInfo()) {
                $arr.push(4);
            }
            if (email.EmailModel.getInstance().getHaveNewEmailInfo()) {
                $arr.push(5);
            }
            if (team.TeamModel.getInstance().getApplyList().length) {
                $arr.push(6);
            }
            if (team.TeamModel.getInstance().getInvireqList().length) {
                $arr.push(7);
                console.log("有申请组除要处理");
            }
            //  FactionModel.getInstance().getInvitationList()
            return $arr;
        };
        //采集按钮
        MainUiModel.collectionMouseDown = function () {
            //console.log("collectionMouseDown");
            if (GameData.collectionType == 1) {
                this.talkNearNpc();
            }
            else {
                this.getNextCollention();
            }
        };
        MainUiModel.getNextCollention = function () {
            var $nearChar;
            var $dis;
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                var $sceneChar = GameInstance.roleList[i];
                if ($sceneChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT && !$sceneChar.isDeath) {
                    if (!$nearChar || $dis > GameInstance.mainChar.math_distance($sceneChar)) {
                        $nearChar = $sceneChar;
                        $dis = GameInstance.mainChar.math_distance($sceneChar);
                    }
                }
            }
            if ($nearChar) {
                //console.log($nearChar.unit.getName(), $nearChar.isDeath)
                TimeUtil.addTimeOut(50, function () {
                    quest.QuestModel.getInstance().use_gameobject($nearChar);
                });
            }
        };
        MainUiModel.talkNearNpc = function () {
            var $nearChar;
            var $dis;
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                var $sceneChar = GameInstance.roleList[i];
                if ($sceneChar.unit.isNpc()) {
                    if (!$nearChar || $dis > $sceneChar.math_distance(GameInstance.mainChar)) {
                        $nearChar = $sceneChar;
                        $dis = GameInstance.mainChar.math_distance($sceneChar);
                    }
                }
            }
            if ($nearChar) {
                var $k = new dialog.DialogueEvent(dialog.DialogueEvent.SHOW_DIALOGUE_PANEL);
                $k.entryId = $nearChar.unit.getEntry();
                ModuleEventManager.dispatchEvent($k); //
            }
        };
        MainUiModel.getIllusionSkillItem = function () {
            // var $skillList: Array<tb.SkillBaseVo> = tb.SkillData.skillList;
            var $illusionList = new Array;
            var $illusionId = GameInstance.mainChar.unit.getIllusionId();
            var $tb = tb.TB_item_illusion.get_TB_item_illusion($illusionId);
            for (var j = 0; j < $tb.skills.length; j++) {
                var $vo = tb.SkillDataVo.getSkillBaseDataById($tb.skills[j][0]);
                $vo.slot = (j + 1);
                $vo.level = 1;
            }
            return $illusionList;
        };
        MainUiModel.getSysList = function () {
            var $sysArr = GuidData.player.systemOpenItem;
            var $showData = new Array();
            for (var i = 0; i < $sysArr.length; i++) {
                var $tb = tb.TB_system_icon.getTempVo($sysArr[i].systemId);
                if ($sysArr[i].needShowIcon) {
                    if ($tb.bindactive.length > 0) {
                        if (this.getActiveIsOpen($tb.bindactive)) {
                            $showData.push($tb);
                        }
                    }
                    else {
                        $showData.push($tb);
                    }
                }
            }
            $showData.sort(function (a, b) {
                return a.index - b.index;
            });
            return $showData;
        };
        MainUiModel.getActiveIsOpen = function ($ary) {
            var activeAry = GuidData.globelValue.getActiveList();
            for (var i = 0; i < $ary.length; i++) {
                if (activeAry.indexOf($ary[i]) != -1) {
                    return true;
                }
            }
            return false;
        };
        MainUiModel.getPandaPostionBySysId = function ($sysId) {
            var $showData = this.getSysList();
            var $postion1 = 0;
            var $postion2 = 0;
            var $postion4 = 0;
            var $postion5 = 0;
            var $pos = new Vector2D();
            for (var j = 0; j < $showData.length; j++) {
                var $tb = $showData[j];
                if ($tb.position == 1) {
                    $postion1++;
                }
                if ($tb.position == 2) {
                    $postion2++;
                }
                if ($tb.position == 4) {
                    $postion4++;
                }
                if ($tb.position == 5) {
                    $postion5++;
                }
                if ($tb.id == $sysId) {
                    if ($tb.position == 1) {
                        $pos = new Vector2D(730 - $postion1 * 65, 10);
                    }
                    if ($tb.position == 2) {
                        $pos = new Vector2D(730 - $postion2 * 65, 10 + 65);
                    }
                    if ($tb.position == 4) {
                        $pos = new Vector2D(890, 464 - $postion4 * 65);
                    }
                    if ($tb.position == 5) {
                        $pos = new Vector2D(950 - $postion5 * 65, 464);
                    }
                }
                if ($tb.position == 9) {
                    $pos = new Vector2D(731, 160);
                }
            }
            return $pos;
        };
        MainUiModel.pandaState = true;
        MainUiModel.pandaCanAotu = true; //是否为人为关闭
        MainUiModel.skillTabIndex = 0; //0技能，1为系统
        MainUiModel.systemTab = 1; //true第一组，false第二组
        return MainUiModel;
    }());
    mainUi.MainUiModel = MainUiModel;
})(mainUi || (mainUi = {}));
//# sourceMappingURL=MainUiModel.js.map