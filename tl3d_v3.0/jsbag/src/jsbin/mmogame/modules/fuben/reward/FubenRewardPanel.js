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
var fb;
(function (fb) {
    var FubenRewardPanel = /** @class */ (function (_super) {
        __extends(FubenRewardPanel, _super);
        function FubenRewardPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.passID = 1;
            _this.lastTxtNum = 0;
            _this.endTime = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            //this.layer = 90;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.interfaceUI = true;
            _this.upDataFun = function (t) { _this.update(t); };
            return _this;
        }
        FubenRewardPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/fuben/reward/reward.xml", "ui/uidata/fuben/reward/reward.png", function () { _this.loadConfigCom(); });
        };
        FubenRewardPanel.prototype.loadConfigCom = function () {
            this.moveAry = new Array;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._baseRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            //this.base = this.addChild(this._bottomRender.getComponent("base"));
            this.a_win_bg = this.addChild(this._bottomRender.getComponent("a_win_bottom"));
            this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.a_win_bg.addEventListener(InteractiveEvent.Up, function () { }, this);
            this.a_win_bg.addEventListener(InteractiveEvent.Down, function () { }, this);
            this.t_lab1 = this._topRender.getComponent("t_lab1");
            this.t_lab2 = this._topRender.getComponent("t_lab2");
            this.t_lock_bg = this._baseRender.getComponent("t_lock_bg");
            this.t_lock_bg.addEventListener(InteractiveEvent.Up, function () { }, this);
            this.t_lock_bg.addEventListener(InteractiveEvent.Down, function () { }, this);
            this.t_lock_lab = this._topRender.getComponent("t_lock_lab");
            var obj = TableData.getInstance().getData(TableData.tb_instance_stage_auto, 1);
            this.passID = obj.auto;
            this.passObj = TableData.getInstance().getData(TableData.tb_instance_stage, this.passID);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_lock_lab.skinName, ColorType.Whiteffffff + "闯关" + this.passObj.chapterId + "-" + this.passObj.namid + "开启", 16, TextAlign.CENTER);
            //this.moveAry.push(this.addChild(this._topRender.getComponent("a_fenge_line_0")));
            //this.moveAry.push(this.addChild(this._topRender.getComponent("a_fenge_line_1")));
            this.moveAry.push(this.addChild(this._midRender.getComponent("a_content_title_bg")));
            this.moveAry.push(this.addChild(this._topRender.getComponent("a_content_label")));
            this.a_tittle_name = this.addChild(this._topRender.getComponent("a_tittle_name"));
            this.a_exit_time = this.addChild(this._topRender.getComponent("a_exit_time"));
            this.a_exit_but = this.addEvntBut("a_exit_but", this._midRender);
            this.a_next_but = this._midRender.getComponent("a_next_but");
            this.a_next_but.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.moveAry.push(this.a_exit_time, this.a_exit_but);
            this.rewardItem = new Array;
            this.rewardnameItem = new Array;
            for (var i = 0; i < 5; i++) {
                this.rewardItem.push(this.addChild(this._topRender.getComponent("a_reward_icon" + i)));
                this.rewardnameItem.push(this.addChild(this._topRender.getComponent("a_reward_name" + i)));
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        FubenRewardPanel.prototype.setLabMove = function ($tf, $vo) {
            var yoffset = 0;
            if ($tf) {
                yoffset = 60;
                this.a_win_bg.height = this.a_win_bg.baseRec.height + yoffset;
                if (!this.t_lab1.parent) {
                    this.addChild(this.t_lab1);
                    this.addChild(this.t_lab2);
                }
                if ($vo.type == 15) {
                    var nameAry = $vo.data.split("|");
                    var numStr;
                    if (250 == $vo.state) {
                        numStr = ColorType.Green2ca937 + "+" + nameAry[0];
                    }
                    else {
                        numStr = ColorType.colorcd2000 + nameAry[0];
                    }
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_lab1.skinName, ColorType.Brown7a2f21 + "排位赛胜利,排位积分" + numStr, 16, TextAlign.CENTER);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_lab2.skinName, ColorType.Brown7a2f21 + "当前积分:" + ColorType.Orange9a683f + +nameAry[1], 16, TextAlign.CENTER);
                }
            }
            else {
                this.a_win_bg.height = this.a_win_bg.baseRec.height;
                if (this.t_lab1.parent) {
                    this.removeChild(this.t_lab1);
                    this.removeChild(this.t_lab2);
                }
            }
            for (var i = 0; i < this.moveAry.length; i++) {
                this.moveAry[i].y = this.moveAry[i].baseRec.y + yoffset;
            }
            for (var i = 0; i < this.rewardItem.length; i++) {
                this.rewardItem[i].y = this.rewardItem[i].baseRec.y + yoffset;
                this.rewardnameItem[i].y = this.rewardnameItem[i].baseRec.y + yoffset;
            }
        };
        FubenRewardPanel.prototype.showRewardIconItem = function ($rewardData) {
            var $len = Math.min($rewardData.length, 5);
            var xpos = (UIData.designWidth - ($len * 105 - 37)) / 2;
            for (var i = 0; i < 5; i++) {
                var $uiicon = this.rewardItem[i];
                var $uiname = this.rewardnameItem[i];
                if ($rewardData[i]) {
                    $uiicon.x = xpos + i * 105;
                    // $uiicon.x -= ($len - 1) * 50;
                    $uiname.x = $uiicon.x - 15;
                    var $equId = $rewardData[i].item_id;
                    var $tb_item_template = tb.TB_item_template.get_TB_item_template($equId);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $uiname.skinName, getColorQua($tb_item_template.quality) + $tb_item_template.name, 14, TextAlign.CENTER);
                    IconManager.getInstance().drawItemIcon60($uiicon, $equId, $rewardData[i].num);
                }
                else {
                    $uiicon.x = 2000;
                    $uiname.x = 2000;
                }
            }
        };
        FubenRewardPanel.prototype.getBaseData = function () {
            var $arr = new Array();
            for (var i = 0; i < 3; i++) {
                var $temp = new Array();
                $temp.push(104);
                $temp.push(99);
                $arr.push($temp);
            }
            return $arr;
        };
        FubenRewardPanel.prototype.update = function (t) {
            if (this.uiAtlasComplet) {
                if (!this.hasStage) {
                    TimeUtil.removeFrameTick(this.upDataFun);
                }
                else {
                    var $time = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
                    if ($time <= -1) {
                        this.hide();
                        if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_RISK && GuidData.map.isAdventureBossScene()) {
                            this.gotoRisk();
                        }
                        else if (this._currentBtnType == 3 && !this._lockFlag) {
                            NetManager.getInstance().protocolos.enter_stage_instance();
                        }
                    }
                    else if ($time >= 0 && this.lastTxtNum != $time) {
                        this.lastTxtNum = $time;
                        //console.log($time)
                        var endStr;
                        if (this._currentBtnType == 0) {
                            endStr = "自动退出";
                        }
                        else if (this._currentBtnType == 3) {
                            if (this._lockFlag) {
                                endStr = "自动退出";
                            }
                            else {
                                endStr = "自动下一关";
                            }
                        }
                        else {
                            endStr = "自动下一关";
                        }
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exit_time.skinName, ColorType.colorce0a00 + getScencdStr($time) + "秒后" + endStr, 14, TextAlign.CENTER);
                    }
                }
            }
        };
        FubenRewardPanel.prototype.butClik = function (evt) {
            if (evt.target == this.a_exit_but) {
                this.hide();
                NetManager.getInstance().protocolos.instance_exit(0);
            }
            else if (evt.target == this.a_next_but) {
                this.hide();
                if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_RISK && GuidData.map.isAdventureBossScene()) {
                    this.gotoRisk();
                }
                else if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_FACTION_TOWER) {
                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_TOWER_CHALLENGE, 0, 0, "", "");
                }
                else if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_TRIAL) {
                    NetManager.getInstance().protocolos.enter_trial_instance();
                }
                else if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_STAGE) {
                    NetManager.getInstance().protocolos.enter_stage_instance();
                }
            }
        };
        FubenRewardPanel.prototype.gotoRisk = function () {
            ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT));
            TimeUtil.addTimeOut(500, function () {
                NetManager.getInstance().protocolos.enter_risk_instance();
            });
        };
        FubenRewardPanel.prototype.setNextBtn = function ($tf) {
            if ($tf) {
                this.addChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x + 80;
                this.a_next_but.x = this.a_next_but.baseRec.x + 80;
            }
            else {
                this.removeChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x;
            }
        };
        FubenRewardPanel.prototype.showBtnType = function ($type) {
            this._currentBtnType = $type;
            if ($type == 0) {
                this.addChild(this.a_exit_but);
                this.removeChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x;
            }
            else if ($type == 1) {
                this.removeChild(this.a_exit_but);
                this.addChild(this.a_next_but);
                this.a_next_but.x = this.a_exit_but.baseRec.x;
            }
            else if ($type == 2) {
                this.addChild(this.a_exit_but);
                this.addChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x + 80;
                this.a_next_but.x = this.a_next_but.baseRec.x + 80;
            }
            else if ($type == 3) {
                this.addChild(this.a_exit_but);
                this.addChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x + 80;
                this.a_next_but.x = this.a_next_but.baseRec.x + 80;
            }
            this._lockFlag = false;
            if ($type == 3) {
                var curPassID = GuidData.map.getPassID();
                if (curPassID < this.passID) {
                    this._lockFlag = true;
                }
            }
            if (this._lockFlag) {
                this.addChild(this.t_lock_bg);
                this.addChild(this.t_lock_lab);
            }
            else {
                this.removeChild(this.t_lock_bg);
                this.removeChild(this.t_lock_lab);
            }
        };
        FubenRewardPanel.prototype.show = function ($vo) {
            //console.log($vo);
            this._dataVo = $vo;
            if ($vo.type == SharedDef.INSTANCE_SUB_TYPE_QUALIFY) {
                this.setLabMove(true, $vo);
            }
            else {
                this.setLabMove(false, $vo);
            }
            //this.setNextBtn($vo.type == SharedDef.INSTANCE_SUB_TYPE_TRIAL);//试炼塔显示下一关
            var btnType = 0;
            if ($vo.type == SharedDef.INSTANCE_SUB_TYPE_TRIAL
                || $vo.type == SharedDef.INSTANCE_SUB_TYPE_FACTION_TOWER) {
                btnType = 2;
            }
            else if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_RISK && GuidData.map.isAdventureBossScene()) {
                btnType = 1;
            }
            else if ($vo.type == SharedDef.INSTANCE_SUB_TYPE_STAGE) {
                var obj = TableData.getInstance().getData(TableData.tb_instance_stage, GuidData.map.getPassID() + 1);
                if (obj && obj.force < GuidData.player.getForce() && obj.limLev <= GuidData.player.getLevel()) {
                    btnType = 3;
                }
                else {
                    btnType = 0;
                }
            }
            this.showBtnType(btnType);
            var $time = $vo.cd;
            if ($time < 5) {
                $time = 10; //特殊加上的
            }
            $time -= 4;
            this.endTime = TimeUtil.getTimer() + $time * 1000; //未来时间
            TimeUtil.addFrameTick(this.upDataFun);
            UIManager.getInstance().addUIContainer(this);
            if (250 == $vo.state) {
                this.a_tittle_name.goToAndStop(0);
            }
            else {
                this.a_tittle_name.goToAndStop(1);
            }
            this.showRewardIconItem($vo.list);
        };
        FubenRewardPanel.prototype.hide = function () {
            TimeUtil.removeFrameTick(this.upDataFun);
            UIManager.getInstance().removeUIContainer(this);
        };
        return FubenRewardPanel;
    }(UIConatiner));
    fb.FubenRewardPanel = FubenRewardPanel;
})(fb || (fb = {}));
//# sourceMappingURL=FubenRewardPanel.js.map