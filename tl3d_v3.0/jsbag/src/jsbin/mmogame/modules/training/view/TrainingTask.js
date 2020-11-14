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
var training;
(function (training) {
    var TaskCell = /** @class */ (function () {
        function TaskCell() {
        }
        TaskCell.prototype.setVo = function ($vo, $indx) {
            this.data = $vo;
            this.parent.setUiListVisibleByItem([this.leftbg, this.rightbg, this.title, this.taskmap, this.taskinfo, this.line, this.resui, this.rewardtitle, this.btn, this.openlev], true);
            this.parent.setUiListVisibleByItem(this.rewardary, true);
            this.setXY($indx);
            LabelTextFont.writeSingleLabel(this.title.uiRender.uiAtlas, this.title.skinName, $vo.tab_quest.questName, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            this.drawReward($vo.tab_quest.rewards);
            this.taskuidraw();
            if ($vo.questData == null) {
                this.btn.goToAndStop(3);
                LabelTextFont.writeSingleLabel(this.openlev.uiRender.uiAtlas, this.openlev.skinName, "LV" + $vo.tab_quest.level + "解锁", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            else {
                UiDraw.clearUI(this.openlev);
                if ($vo.questData.taskState == SharedDef.QUEST_STATUS_END) {
                    this.btn.goToAndStop(2);
                }
                else {
                    this.btnChgbyRes();
                }
            }
            this.btn.addEventListener(InteractiveEvent.Up, this.click, this);
        };
        TaskCell.prototype.click = function (evt) {
            var vo = this.data;
            if (vo.questData != null && vo.questData.taskState != SharedDef.QUEST_STATUS_END) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                if (GuidData.player.getResType(vo.tab_adventure.upres[0]) < vo.tab_adventure.upres[1]) {
                    var $taskVo = new quest.QuestTaskVo();
                    $taskVo.questDataVo = vo.questData;
                    quest.QuestModel.getInstance().meshQuestTargets($taskVo, vo.tab_quest.targetsPosition[0]);
                    ModuleEventManager.dispatchEvent(new training.TrainingEvent(training.TrainingEvent.HIDE_TRAINING_PANEL));
                }
                else {
                    NetManager.getInstance().protocolos.pick_quest_adventure(vo.questData.indx);
                }
            }
        };
        TaskCell.prototype.setXY = function ($indx) {
            var difval = $indx * 266;
            this.leftbg.x = difval + 64;
            this.rightbg.x = this.leftbg.x + this.leftbg.width;
            this.title.x = difval + 141;
            this.taskmap.x = difval + 130;
            this.taskinfo.x = difval + 91;
            this.line.x = difval + 96;
            this.resui.x = difval + 128;
            this.unopened.x = difval + 122;
            this.rewardtitle.x = difval + 86;
            this.btn.x = difval + 138;
            this.openlev.x = difval + 142;
            for (var i = 0; i < this.rewardary.length; i++) {
                this.rewardary[i].x = difval + 111 + i * 60;
            }
        };
        TaskCell.prototype.btnChgbyRes = function () {
            var index = GuidData.player.getResType(this.data.tab_adventure.upres[0]) < this.data.tab_adventure.upres[1] ? 0 : 1;
            this.btn.goToAndStop(index);
        };
        TaskCell.prototype.drawCurCardNum = function () {
            var uiRect = this.resui.uiRender.uiAtlas.getRec(this.resui.skinName);
            var ctx = UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);
            var propid = this.data.tab_adventure.upres[0];
            var propnum = this.data.tab_adventure.upres[1];
            var txtcolor = GuidData.player.getResType(propid) >= propnum ? ColorType.Green2ca937 : ColorType.Redd92200;
            var str = ColorType.color9a683f + getResName(propid) + ":" + txtcolor + GuidData.player.getResTypeStr(propid);
            var posx = LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, 0, 10, TextAlign.LEFT);
            UiDraw.cxtDrawImg(ctx, UIuitl.getInstance().costtype(propid), new Rectangle(posx, 0, 35, 35), UIData.publicUi);
            this.resui.uiRender.uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
            if (this.data.questData != null && this.data.questData.taskState != SharedDef.QUEST_STATUS_END) {
                this.btnChgbyRes();
            }
        };
        TaskCell.prototype.taskuidraw = function () {
            var $vo = this.data;
            this.parent.setUiListVisibleByItem([this.unopened], $vo.questData == null);
            this.parent.setUiListVisibleByItem([this.taskmap, this.taskinfo, this.line, this.resui], $vo.questData != null);
            LabelTextFont.writeSingleLabel(this.taskmap.uiRender.uiAtlas, this.taskmap.skinName, ColorType.Brown7a2f21 + "任务地图：" + ColorType.Green2ca937 + tb.TB_map.getTB_map($vo.tab_quest.targetsPosition[0][1]).name, 16, TextAlign.CENTER);
            var propid = $vo.tab_adventure.upres[0];
            var propnum = $vo.tab_adventure.upres[1];
            var txtcolor = GuidData.player.getResType(propid) >= propnum ? ColorType.Green2ca937 : ColorType.Redd92200;
            var str = ColorType.Brown7a2f21 + $vo.tab_quest.text[0][0] + "(" + txtcolor + GuidData.player.getResTypeStr(propid) + ColorType.Brown7a2f21 + "/" + propnum + ")";
            if ($vo.tab_quest.hint[0] && $vo.tab_quest.hint[0][0]) {
                str = str + "\n" + $vo.tab_quest.hint[0][0];
            }
            LabelTextFont.writeTextAutoCenter(this.taskinfo.uiRender.uiAtlas, this.taskinfo.skinName, str, 16, ColorType.Brown7a2f21, 180, true);
            this.drawCurCardNum();
        };
        TaskCell.prototype.drawReward = function ($reward) {
            for (var i = 0; i < this.rewardary.length; i++) {
                if ($reward[0][i]) {
                    IconManager.getInstance().drawItemIcon40(this.rewardary[i], $reward[0][i][0], $reward[0][i][1]);
                }
                else {
                    UiDraw.clearUI(this.rewardary[i]);
                }
            }
        };
        TaskCell.prototype.clearUi = function () {
            this.btn.removeEventListener(InteractiveEvent.Up, this.click, this);
            this.data = null;
            this.parent.setUiListVisibleByItem([this.leftbg, this.rightbg, this.title, this.taskmap, this.taskinfo, this.line, this.resui, this.rewardtitle, this.btn, this.openlev], false);
            this.parent.setUiListVisibleByItem(this.rewardary, false);
        };
        return TaskCell;
    }());
    training.TaskCell = TaskCell;
    var TrainingTask = /** @class */ (function (_super) {
        __extends(TrainingTask, _super);
        function TrainingTask() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
            // this._redPointRender = new RedPointRender;
            // this.addRender(this._redPointRender);
        }
        // private _redPointRender: RedPointRender;
        TrainingTask.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this._redPointRender.dispose();
            // this._redPointRender = null;
        };
        TrainingTask.prototype.initUiAtlas = function ($uiAtlas) {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        TrainingTask.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.taskCellAry = new Array;
            for (var i = 0; i < 3; i++) {
                var $taskCell = new TaskCell();
                $taskCell.parent = this;
                $taskCell.leftbg = this._bgRender.getComponent("leftbg0");
                $taskCell.leftbg.isU = true;
                $taskCell.rightbg = this._bgRender.getComponent("right0");
                $taskCell.title = this._topRender.getComponent("a_name" + i);
                $taskCell.taskmap = this._baseRender.getComponent("a_task" + i + "0");
                $taskCell.taskinfo = this._baseRender.getComponent("a_task" + i + "1");
                $taskCell.line = this._baseRender.getComponent("a_task02");
                $taskCell.resui = this._baseRender.getComponent("a_task" + i + "3");
                $taskCell.unopened = this._baseRender.getComponent("a_task04");
                $taskCell.rewardtitle = this._baseRender.getComponent("a_rewardtitle0");
                $taskCell.rewardary = new Array;
                for (var j = 0; j < 3; j++) {
                    $taskCell.rewardary.push(this.addChild(this._baseRender.getComponent("a_reward" + i + "" + j)));
                }
                $taskCell.btn = this.addChild(this._baseRender.getComponent("a_btn0"));
                $taskCell.openlev = this.addChild(this._topRender.getComponent("a_openlev" + i));
                this.taskCellAry.push($taskCell);
            }
            this.ArrowAry = new Array;
            this.a_arrowleft = this.addEvntButUp("a_arrowleft", this._topRender);
            this.a_arrowleft.isU = true;
            this.a_arrowright = this.addEvntButUp("a_arrowright", this._topRender);
            this.ArrowAry.push(this.a_arrowright);
            this.ArrowAry.push(this.a_arrowleft);
            this._topRender.applyObjData();
            // this._btn1RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn0.x + this.cnew_btn0.width, this.cnew_btn0.y));
            // this._btn0RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
        };
        TrainingTask.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        Object.defineProperty(TrainingTask.prototype, "curpage", {
            get: function () {
                return this._curpage;
            },
            set: function ($val) {
                if ($val == 1) {
                    this.setUiListVisibleByItem([this.ArrowAry[1]], false);
                }
                else {
                    this.setUiListVisibleByItem([this.ArrowAry[1]], true);
                }
                var total = Math.ceil(this._itemAry.length / 3);
                if (total == $val) {
                    this.setUiListVisibleByItem([this.ArrowAry[0]], false);
                }
                else {
                    this.setUiListVisibleByItem([this.ArrowAry[0]], true);
                }
                this._curpage = $val;
                this.drawUI();
            },
            enumerable: true,
            configurable: true
        });
        TrainingTask.prototype.drawUI = function () {
            for (var i = 0; i < 3; i++) {
                var idx = 3 * (this.curpage - 1) + i;
                if (idx > this._itemAry.length - 1) {
                    this.taskCellAry[i].clearUi();
                }
                else {
                    this.taskCellAry[i].setVo(this._itemAry[idx], i);
                }
            }
        };
        TrainingTask.prototype.refreshServerData = function () {
            this._itemAry = training.TrainingModel.getInstance().getTaskvo();
            this.drawUI();
        };
        //令牌数量变化刷新
        TrainingTask.prototype.refreshCurCardNum = function () {
            for (var i = 0; i < this.taskCellAry.length; i++) {
                if (this.taskCellAry[i].data) {
                    this.taskCellAry[i].taskuidraw();
                }
            }
        };
        TrainingTask.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this._itemAry = training.TrainingModel.getInstance().getTaskvo();
            this.curpage = 1;
            this.resize();
        };
        TrainingTask.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        TrainingTask.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_arrowleft:
                    this.curpage--;
                    break;
                case this.a_arrowright:
                    this.curpage++;
                    break;
                default:
                    break;
            }
        };
        return TrainingTask;
    }(UIVirtualContainer));
    training.TrainingTask = TrainingTask;
})(training || (training = {}));
//# sourceMappingURL=TrainingTask.js.map