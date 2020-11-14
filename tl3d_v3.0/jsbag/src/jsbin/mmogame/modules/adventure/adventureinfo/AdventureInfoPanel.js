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
var adventureinfo;
(function (adventureinfo) {
    var AdventureInfoPanel = /** @class */ (function (_super) {
        __extends(AdventureInfoPanel, _super);
        function AdventureInfoPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this._autoplayflag = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.bottom = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.interfaceUI = true;
            return _this;
        }
        AdventureInfoPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/adventurinfo/adventurinfo.xml", "ui/uidata/adventure/adventurinfo/adventurinfo.png", function () { _this.loadConfigCom(); });
        };
        AdventureInfoPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.unlockArray = new Array();
            this.a_unlockbtn = this.addEvntButUp("a_unlockbtn", this._topRender);
            this.unlockArray.push(this.a_unlockbtn);
            this.unlockArray.push(this._bottomRender.getComponent("a_bg"));
            this.unlockArray.push(this._topRender.getComponent("a_unlockinfo"));
            this.a_boss_but = this.addEvntButUp("a_boss_but", this._topRender);
            this.a_autoplay = this.addEvntButUp("a_autoplay", this._topRender);
            this.killInfoUiList = new Array();
            this.a_kill_info_bg = this.addChild(this._bottomRender.getComponent("a_kill_info_bg"));
            this.a_info_bar = this.addChild(this._midRender.getComponent("a_info_bar"));
            this.a_kill_info = this.addChild(this._topRender.getComponent("a_kill_info"));
            this.a_move_point = this.addChild(this._topRender.getComponent("a_move_point"));
            this.killInfoUiList.push(this.a_move_point);
            this.killInfoUiList.push(this.a_kill_info_bg);
            this.killInfoUiList.push(this.a_info_bar);
            this.killInfoUiList.push(this.a_kill_info);
            this.uiAtlasComplet = true;
            this.buildFram();
        };
        AdventureInfoPanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_boss_but:
                    UIManager.popClikNameFun("a_boss_but");
                    this.setUiListVisibleByItem([this.a_boss_but], false);
                    this.playEff(false);
                    //  ModuleEventManager.dispatchEvent(new adventurebossnotice.AdventureBossNoticeEvent(adventurebossnotice.AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL))
                    TimeUtil.addTimeOut(100, this.showBossView);
                    break;
                case this.a_unlockbtn:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this._curtb.level + "级开启本关BOSS挑战", 99);
                    break;
                case this.a_autoplay:
                    this.setautoflag(!this._autoplayflag);
                    this.refresh();
                    break;
                default:
                    break;
            }
        };
        AdventureInfoPanel.prototype.setautoflag = function ($val) {
            this._autoplayflag = $val;
            if (this.a_autoplay) {
                this.a_autoplay.goToAndStop(this._autoplayflag ? 1 : 0);
            }
        };
        AdventureInfoPanel.prototype.showBossView = function () {
            var $tb = adventure.AdventureModel.getInstance().getCurBossTb();
            var $rewardList = new Array;
            for (var i = 0; i < $tb.showitems.length; i++) {
                $rewardList.push([$tb.showitems[i], 1]);
            }
            var $bossId = $tb.bossId;
            //var obj:any = TableData.getInstance().getData(TableData.tb_creature_worldrisk,$bossId)
            var $tb_creature_template = tb.TB_creature_template.get_TB_creature_template($bossId);
            var $bossName = $tb.name.replace("BOSS", $tb_creature_template.name);
            var evt = new boss.BossEvent(boss.BossEvent.SHOW_BOSSVIEW_PANEL);
            var data = new boss.BossViewData();
            data.bossID = $tb.bossId;
            data.force = $tb.advisepoint;
            data.checkpoint = $tb.name;
            data.showRank = false;
            data.rewardList = $rewardList;
            data.submitFun = function () {
                UIManager.popClikNameFun("t_btn");
                NetManager.getInstance().protocolos.challange_boss();
                //console.log("请求挑战boss")
            };
            evt.data = data;
            ModuleEventManager.dispatchEvent(evt);
        };
        AdventureInfoPanel.prototype.buildFram = function () {
            var _this = this;
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_tzboss"), 4, 4, function ($ui) {
                    _this.effui = $ui;
                    _this.effui.x = _this.a_boss_but.x + 5;
                    _this.effui.y = _this.a_boss_but.y - 33;
                    _this.effui.width = _this.effui.baseRec.width * 1.2;
                    _this.effui.height = _this.effui.baseRec.height * 1.2;
                    _this.effui.speed = 3;
                    _this.applyLoadComplete();
                }, 1);
            }
            else {
                this.applyLoadComplete();
            }
        };
        AdventureInfoPanel.prototype.playEff = function ($isvisiable) {
            if (!this.effui) {
                return;
            }
            if ($isvisiable) {
                this.addChild(this.effui);
                this.effui.play();
            }
            else {
                this.removeChild(this.effui);
            }
        };
        AdventureInfoPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                var $curNum = GuidData.player.getPlayerIntFieldTrialProcessCur();
                var $tatolNum = GuidData.player.getPlayerIntFieldTrialProcessTotal();
                var $strInfo = ColorType.Yellowffe9b4 + "击杀小怪 " + $curNum + "/" + $tatolNum + " ";
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_kill_info.skinName, $strInfo, 14, TextAlign.CENTER, "#ffffff");
                var $temp = $curNum >= $tatolNum;
                var unlockflag = false; //未解锁状态
                // var enoughflag: boolean = false;//是否足够数量
                var attackflag = false; //是否正在打boss
                var $tb = adventure.AdventureModel.getInstance().getCurBossTb();
                this._curtb = $tb;
                // enoughflag = GuidData.map.isAdventureBaseScene() && $temp;
                if ($tb.level && $tb.level > GuidData.player.getLevel()) {
                    unlockflag = true;
                    attackflag = false;
                }
                else {
                    unlockflag = false;
                    attackflag = $temp && GuidData.map.isAdventureBossScene();
                }
                var autoflag = false;
                var tabid = Number(String($tb.id).substr(1, 6));
                if (tabid > 1003) {
                    autoflag = GuidData.map.isAdventureBaseScene() || GuidData.map.isAdventureBossScene();
                    if ($tb.level && $tb.level > GuidData.player.getLevel()) {
                        autoflag = false;
                    }
                }
                var limitflag = GuidData.map.isAdventureBaseScene() && unlockflag && $temp;
                this.setUiListVisibleByItem(this.killInfoUiList, GuidData.map.isAdventureBaseScene() && !$temp);
                this.setUiListVisibleByItem([this.a_boss_but], GuidData.map.isAdventureBaseScene() && !unlockflag && $temp);
                this.setUiListVisibleByItem(this.unlockArray, limitflag);
                this.setUiListVisibleByItem([this.a_autoplay], autoflag);
                this.playEff(GuidData.map.isAdventureBaseScene() && !unlockflag && $temp);
                if (limitflag) {
                    var str = $tb.level + "级开启本关BOSS挑战";
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.unlockArray[2].skinName, str, 14, TextAlign.CENTER, ColorType.Yellowffe9b4);
                }
                if (autoflag) {
                    this.a_autoplay.goToAndStop(this._autoplayflag ? 1 : 0);
                    if (GuidData.map.isAdventureBaseScene() && $temp && this._autoplayflag) {
                        NetManager.getInstance().protocolos.challange_boss();
                    }
                }
                // //console.log("----tb----", $tb);
                //console.log("显示退出boss", unlockflag, attackflag, GuidData.map.isAdventureBossScene(), GuidData.map.isAdventureBaseScene(), $temp);
                this.a_info_bar.uvScale = $curNum / $tatolNum;
                if ($curNum == $tatolNum || $curNum == 0) {
                    this.a_move_point.x = 10000;
                }
                else {
                    this.a_move_point.x = this.a_info_bar.x + this.a_info_bar.width * ($curNum / $tatolNum) - this.a_move_point.width / 2;
                    this.a_move_point.y = this.a_info_bar.y - 2;
                }
                this._midRender.applyObjData();
            }
        };
        AdventureInfoPanel.prototype.hideExitBossBut = function () {
        };
        AdventureInfoPanel.prototype.needUpLevShow = function () {
            var aaa = GuidData.player.getworldrisklastid();
            var $tb = adventure.AdventureModel.getInstance().getCurTb();
            var type = Math.floor($tb.id / 1000000);
            if (type == 1 && $tb.id > 1001001 && aaa != $tb.id) {
                return true;
            }
            return false;
        };
        AdventureInfoPanel.prototype.showuppanel = function () {
            var $tb = adventure.AdventureModel.getInstance().getCurTb();
            NetManager.getInstance().protocolos.set_world_risk_last_id($tb.id);
            ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.UPLEV_SHOW));
        };
        return AdventureInfoPanel;
    }(UIPanel));
    adventureinfo.AdventureInfoPanel = AdventureInfoPanel;
})(adventureinfo || (adventureinfo = {}));
//# sourceMappingURL=AdventureInfoPanel.js.map