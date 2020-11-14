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
var dialog;
(function (dialog) {
    var QuestButVo = /** @class */ (function () {
        function QuestButVo() {
        }
        return QuestButVo;
    }());
    dialog.QuestButVo = QuestButVo;
    var DialoguePanel = /** @class */ (function (_super) {
        __extends(DialoguePanel, _super);
        function DialoguePanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.needSelectQuest = false;
            _this.endTime = 0;
            _this.isWho = false;
            _this.center = 0;
            _this.bottom = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        DialoguePanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        DialoguePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/dialogue/dialogue.xml", "ui/uidata/dialogue/dialogue.png", function () { _this.loadConfigCom(); });
        };
        DialoguePanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._midRender.uiAtlas;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.bg = this.addChild(this._bgRender.getComponent("bg"));
            this.bg.addEventListener(InteractiveEvent.Up, this.clickEvt, this);
            this.a_quest_bg_top = this._bottomRender.getComponent("a_quest_bg_top");
            this.a_quest_bg_mid = this._bottomRender.getComponent("a_quest_bg_mid");
            this.a_quest_bg_bottom = this._bottomRender.getComponent("a_quest_bg_bottom");
            this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom], true);
            this.a_but_next = this.addEvntBut("a_but_next", this._topRender);
            this.a_talk_bg = this.addChild(this._bottomRender.getComponent("a_talk_bg"));
            //this.addEvntButUp("a_talk_bg", this._bottomRender)
            this.a_title_bg = this.addChild(this._midRender.getComponent("a_title_bg"));
            this.a_npc_name = this.addChild(this._topRender.getComponent("a_npc_name"));
            this.a_talk_txt = this.addChild(this._topRender.getComponent("a_talk_txt"));
            this.questUiItemTXT = new Array;
            for (var i = 0; i < 3; i++) {
                var $QuestButVo = new QuestButVo();
                $QuestButVo.txt = this.addEvntBut("a_quest_" + i, this._topRender);
                $QuestButVo.bg = this._midRender.getComponent("a_quest_but_bg");
                $QuestButVo.bg.x = $QuestButVo.txt.x;
                $QuestButVo.bg.y = $QuestButVo.txt.y - 5;
                this.questUiItemTXT.push($QuestButVo);
            }
            this.addRoleChar();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();
        };
        DialoguePanel.prototype.addRoleChar = function () {
            var _this = this;
            this.roleChar = new DialogueUIChar();
            this.roleChar.loadFinishFun = function () { _this.loadRoleFinish(); };
            this._topRender.addModel(this.roleChar);
        };
        DialoguePanel.prototype.loadRoleFinish = function () {
            this.resize();
        };
        DialoguePanel.prototype.butClik = function (evt) {
            this.endTime = TimeUtil.getTimer() + 100; //特殊零时延时有BUG
            if (evt.target.data) {
                this.selectQuestToPanel(evt.target.data);
            }
            else {
                this.selectButClik();
            }
        };
        DialoguePanel.prototype.selectQuestToPanel = function ($vo) {
            if ($vo.tb_quest.specialButton) {
                //console.log($vo.tb_quest.specialButton)
                this.sendToNpcTalk(this._entryId, $vo.id);
                this.close();
            }
            else {
                this.needSelectQuest = false;
                this.setButVisible(false);
                this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom], false);
                this.selectQuestTaskVo = $vo;
                this.showTextList(this.selectQuestTaskVo.tb_quest.dialogue);
            }
        };
        DialoguePanel.prototype.setButVisible = function (value) {
            for (var i = 0; i < this.questUiItemTXT.length; i++) {
                this.setUiListVisibleByItem([this.questUiItemTXT[i].txt], false);
                this.setUiListVisibleByItem([this.questUiItemTXT[i].bg], false);
            }
        };
        DialoguePanel.prototype.selectButClik = function () {
            if (this.selectQuestTaskVo && this.selectQuestTaskVo.tb_quest.specialButton) {
                this.close();
            }
            else {
                if (this.selectDialogueVo.next_id) {
                    this.showTextList(this.selectDialogueVo.next_id);
                }
                else {
                    if (this.needSelectQuest) {
                        if (GameInstance.questMoveVo) {
                            this.selectQuestToPanel(GameInstance.questMoveVo.data);
                        }
                        else {
                            //console.log("----")
                        }
                    }
                    else {
                        if (!this.needSelectQuest && this.selectQuestTaskVo) {
                            if (this.selectQuestTaskVo.tb_quest.talk == 1) {
                                if (this.rewardItem && this.rewardItem.length) {
                                }
                                else {
                                    this.showRewaldPanel();
                                    return;
                                }
                            }
                            if (this.selectQuestTaskVo.tb_quest.targetsPosition[0].length == 6) {
                                DialoguePanel.openPanelByTab(this._entryId, this.selectQuestTaskVo.tb_quest.targetsPosition[0][5]);
                            }
                            else {
                                this.sendToNpcTalk(this._entryId, this.selectQuestTaskVo.id);
                            }
                        }
                        else {
                            //this.sendToNpcTalk(this._entryId, 0);
                        }
                        this.close();
                    }
                }
            }
        };
        DialoguePanel.openPanelByTab = function ($entryId, $tabId) {
            var $entryVo = tb.TB_creature_template.get_TB_creature_template($entryId);
            var sdv = tb.TB_creature_dialogue.get_TB_creature_dialogue($entryVo.dialogue_id);
            if (sdv.type > 0) {
                if (sdv.type == 1) {
                    if ($tabId == -1) {
                        ModulePageManager.openPanel(sdv.typedata[0][0]);
                    }
                    else {
                        ModulePageManager.openPanel(sdv.typedata[0][0], $tabId);
                    }
                }
                return true;
            }
            return false;
        };
        DialoguePanel.prototype.clearRewardUi = function () {
            while (this.rewardItem && this.rewardItem.length) {
                this.removeChild(this.rewardItem.pop());
            }
        };
        DialoguePanel.prototype.showRewaldPanel = function () {
            this.clearRewardUi();
            if (!this.rewardItem) {
                this.rewardItem = new Array();
            }
            //  this._bottomRender.uiAtlas.clearCtxTextureBySkilname(this.a_talk_txt.skinName);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_talk_txt.skinName, "任务奖励", 16, TextAlign.LEFT);
            for (var i = 0; this.selectQuestTaskVo && i < this.selectQuestTaskVo.tb_quest.rewards[0].length; i++) {
                var $ui = this.addChild(this._topRender.getComponent("a_rewad_icon_" + i));
                this.rewardItem.push($ui);
                IconManager.getInstance().drawItemIcon60($ui, this.selectQuestTaskVo.tb_quest.rewards[0][i][0], this.selectQuestTaskVo.tb_quest.rewards[0][i][1], false, false);
            }
        };
        DialoguePanel.prototype.sendToNpcTalk = function ($entryId, $quid) {
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                if (GameInstance.roleList[i].unit && GameInstance.roleList[i].unit.getEntry() == $entryId) {
                    //console.log("发送", GameInstance.roleList[i].unit.getUintGuid(), $quid)
                    NetManager.getInstance().protocolos.talk_with_npc(GameInstance.roleList[i].unit.getUintGuid(), $quid);
                    return;
                }
            }
        };
        DialoguePanel.prototype.clickEvt = function ($evt) {
            if (this.endTime < TimeUtil.getTimer() && this.uiAtlasComplet) {
                //   this.close();
                this.selectButClik();
            }
        };
        DialoguePanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            Engine.resetViewMatrx3D();
        };
        DialoguePanel.prototype.refresh = function () {
            this.selectQuestTaskVo = null;
            if (this.a_talk_txt) {
                var $entryVo = tb.TB_creature_template.get_TB_creature_template(this._entryId);
                var $taskItem = quest.QuestModel.getInstance().getQuestDialogueVo(this._entryId);
                // if($taskItem.length == 0){//打开功能
                //     if(this.npcFun($entryVo.dialogue_id)){
                //         return;
                //     }
                // }
                this.npcNameStr = $entryVo.name;
                var $hasSpecial = false;
                for (var i = 0; i < $taskItem.length; i++) {
                    if ($taskItem[i].tb_quest.specialButton) {
                        $hasSpecial = true;
                    }
                }
                this.setButVisible(false);
                var $dialogueId = $entryVo.dialogue_id;
                if ($taskItem.length > 1 || $hasSpecial) {
                    var blen = Math.min(3, $taskItem.length);
                    this.a_quest_bg_top.y = 350 - (16 * 2 + blen * 45);
                    this.a_quest_bg_mid.y = this.a_quest_bg_top.y + this.a_quest_bg_top.height;
                    this.a_quest_bg_mid.height = blen * 45;
                    this.a_quest_bg_bottom.y = this.a_quest_bg_mid.y + this.a_quest_bg_mid.height;
                    this.a_quest_bg_mid.x = this.a_quest_bg_top.x;
                    this.a_quest_bg_bottom.x = this.a_quest_bg_top.x;
                    this.showQuestListBut($taskItem);
                    this.needSelectQuest = true;
                    this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom], true);
                }
                else {
                    this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom], false);
                }
                if ($taskItem.length == 1) {
                    $dialogueId = $taskItem[0].tb_quest.dialogue;
                    this.selectQuestTaskVo = $taskItem[0];
                }
                this.showTextList($dialogueId);
                this.endTime = TimeUtil.getTimer() + 100; //特殊零时延时有BUG
            }
        };
        DialoguePanel.prototype.showQuestListBut = function ($taskItem) {
            for (var i = 0; i < this.questUiItemTXT.length && i < 3; i++) {
                if (Boolean($taskItem[i])) {
                    this.setUiListVisibleByItem([this.questUiItemTXT[i].txt], true);
                    this.setUiListVisibleByItem([this.questUiItemTXT[i].bg], true);
                    this.questUiItemTXT[i].bg.x = this.a_quest_bg_top.x + 20;
                    this.questUiItemTXT[i].txt.x = this.a_quest_bg_top.x + 20;
                    this.questUiItemTXT[i].bg.y = i * 45 + this.a_quest_bg_top.y + this.a_quest_bg_top.height;
                    this.questUiItemTXT[i].txt.y = this.questUiItemTXT[i].bg.y + 15;
                    this.questUiItemTXT[i].txt.data = $taskItem[i];
                    var $txtStr = $taskItem[i].tb_quest.questName;
                    if ($taskItem[i].tb_quest.specialButton) {
                        $txtStr = $taskItem[i].tb_quest.specialButton;
                    }
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.questUiItemTXT[i].txt.skinName, ColorType.color451800 + $txtStr, 16, TextAlign.CENTER);
                }
            }
        };
        DialoguePanel.prototype.showTextList = function ($dialogueId) {
            this.clearRewardUi();
            this.selectDialogueVo = tb.TB_creature_dialogue.get_TB_creature_dialogue($dialogueId);
            var $str = this.selectDialogueVo.npc_dialogue;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_talk_txt.skinName, $str, 16, TextAlign.LEFT);
            var $tb_Vo = tb.TB_creature_template.get_TB_creature_template(this._entryId);
            this.isWho = this.selectDialogueVo.who == 1;
            if (this.selectDialogueVo.who == 1) {
                this.roleChar.setAvatar(GameInstance.mainChar.getCharAvatarNum());
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_npc_name.skinName, getBaseName(GuidData.player.getName()), 18, TextAlign.CENTER, "#ffde45");
            }
            else {
                this.roleChar.setAvatar($tb_Vo.avatar);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_npc_name.skinName, this.npcNameStr, 18, TextAlign.CENTER, "#ffde45");
            }
            this.resize();
        };
        DialoguePanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.roleChar) {
                if (!this.isWho) {
                    this.roleChar.x = 100;
                    this.a_but_next.x = 781;
                    this.roleChar.scale = 5 * UIData.Scale;
                    this.roleChar.y = 600 + this.y / 2;
                }
                else {
                    this.roleChar.x = 800;
                    this.a_but_next.x = 65;
                    this.roleChar.scale = 4.5 * UIData.Scale;
                    this.roleChar.y = 600 + this.y / 2;
                }
                this.roleChar.resize();
                this.roleChar.updateMatrix();
            }
            if (this.bg) {
                this.bg.left = 0;
                this.bg.top = 0;
                this.bg.width = Scene_data.stageWidth / UIData.Scale;
                this.bg.height = Scene_data.stageHeight / UIData.Scale;
                this.a_talk_bg.left = 0;
                this.a_talk_bg.bottom = 0;
                this.a_talk_bg.width = Scene_data.stageWidth / UIData.Scale;
            }
        };
        DialoguePanel.prototype.show = function ($entryId) {
            this._entryId = $entryId;
            this.refresh();
        };
        DialoguePanel.prototype.setCamViewMatrx3d = function () {
            Scene_data.viewMatrx3D.identity();
            var fovw = Scene_data.stageWidth;
            var fovh = Scene_data.stageHeight;
            Scene_data.sceneViewHW = Math.max(fovw, fovh);
            Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 50, Scene_data.camFar);
            Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
            Scene_data.viewMatrx3D.appendScale(1, 1, 0.1);
            Scene_data.viewMatrx3D.appendTranslation(0, 0, 0.9);
        };
        return DialoguePanel;
    }(UIPanel));
    dialog.DialoguePanel = DialoguePanel;
})(dialog || (dialog = {}));
//# sourceMappingURL=DialoguePanel.js.map