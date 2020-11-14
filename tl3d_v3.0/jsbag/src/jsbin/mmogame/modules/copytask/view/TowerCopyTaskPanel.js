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
var copytask;
(function (copytask) {
    var TowerCopyTaskPanel = /** @class */ (function (_super) {
        __extends(TowerCopyTaskPanel, _super);
        function TowerCopyTaskPanel() {
            var _this = _super.call(this) || this;
            _this._uvScaleAry = [0.1, 0.3, 0.5, 0.7, 0.9, 1.0];
            _this._drawPage = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        TowerCopyTaskPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._winMidRender.uiAtlas = WindowUi.winUIAtlas;
            // this._winMidRender = new UIRenderComponent();
            // this._winMidRender.uiAtlas = $uiatlas;
            // this.addRender(this._winMidRender);
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._btnRender = new UIRenderComponent();
            this._btnRender.uiAtlas = WindowUi.winUIAtlas;
            this.addRender(this._btnRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this._middleRender = new UIRenderComponent();
            this._middleRender.uiAtlas = $uiatlas;
            this.addRender(this._middleRender);
            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);
            this.initUI();
            this.addSelfRole();
        };
        TowerCopyTaskPanel.prototype.initUI = function () {
            this._bgAry = new Array;
            this._titleAry = new Array;
            this._rewardAry = new Array;
            this._iconAry = new Array;
            this.stateAry = new Array;
            this._mapAry = new Array;
            for (var i = 0; i < 5; i++) {
                this._bgAry.push(this.addByCopy("cnew_right_bg_top", "e_bga" + i));
                this._bgAry.push(this.addByCopy("cnew_right_bg_bottom", "e_bgb" + i));
                var ui;
                this.addChild(this._bgRender.getComponent("e_t_bg" + i));
                this.addChild(this._bgRender.getComponent("e_boss_bg" + i));
                ui = this.addChild(this._baseRender.getComponent("e_title" + i));
                this._titleAry.push(ui);
                ui = this.addChild(this._baseRender.getComponent("e_r" + i));
                this._rewardAry.push(ui);
                ui = this.addChild(this._baseRender.getComponent("e_line" + i));
                var icon1 = this.addChild(this._baseRender.getComponent("e_a" + i));
                var icon2 = this.addChild(this._baseRender.getComponent("e_b" + i));
                this._iconAry.push([icon1, icon2]);
                var fm = this._topRender.getComponent("e_s" + i);
                this.addChild(fm);
                fm.goToAndStop(2);
                this.stateAry.push(fm);
                this._mapAry.push(this.addChild(this._topRender.getComponent("e_t" + i)));
            }
            this._leftBtn = this._topRender.getComponent("e_left");
            this._leftBtn.addEventListener(InteractiveEvent.Down, this.perPage, this);
            this._rightBtn = this._topRender.getComponent("e_right");
            this._rightBtn.addEventListener(InteractiveEvent.Down, this.nextPage, this);
            this.addUIList(["e_bg_line", "e_info_bg1"], this._bgRender);
            this._sweepLabBg = this._bgRender.getComponent("e_info_bg2");
            var ui;
            ui = this.addChild(this._bgRender.getComponent("e_rank"));
            ui.addEventListener(InteractiveEvent.Down, this.getRank, this);
            ui = this.addChild(this._baseRender.getComponent("e_line_bg"));
            this.progresUI = this.addChild(this._middleRender.getComponent("e_line_base"));
            this.progresUI.uvScale = 0.5;
            this._sweepBtn = this._btnRender.getComponent("cnew_btn1");
            this.setSizeForPanelUiCopy(this._sweepBtn, "e_btnbg1", this._bgRender);
            this._sweepBtn.addEventListener(InteractiveEvent.Up, this.sweep, this);
            ui = this.addChild(this._btnRender.getComponent("cnew_btn1"));
            this.setSizeForPanelUiCopy(ui, "e_btnbg2", this._bgRender);
            ui.addEventListener(InteractiveEvent.Down, this.btnclick, this);
            this._sweepBtnLab = this._topRender.getComponent("e_btn0");
            this._maxLab = this.addChild(this._topRender.getComponent("e_info0"));
            this._sweepLab = this._topRender.getComponent("e_info1");
            this.d_vip_add = this.addChild(this._topRender.getComponent("d_vip_add"));
            ui = this.addChild(this._topRender.getComponent("e_btn1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "开始挑战", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        TowerCopyTaskPanel.prototype.visiableBtn = function () {
            this.setUiListVisibleByItem([this._sweepBtn, this._sweepBtnLab, this._sweepLab, this._sweepLabBg], this.sweepCurrent > 0);
        };
        TowerCopyTaskPanel.prototype.getRank = function ($e) {
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_TRIAL, SharedDef.RANK_TYPE_TRIAL, 1, 10);
        };
        TowerCopyTaskPanel.prototype.sweep = function ($e) {
            if (this.sweepNum == 1) {
                NetManager.getInstance().protocolos.sweep_trial_instance();
            }
            else if (this.canBuyNum == 1) {
                var tabObj = TableData.getInstance().getData(TableData.tb_instance_trial, this.trialCurrent);
                AlertUtil.show(ColorType.Brown7a2f21 + "您是否花费" + ColorType.Green2ca937 + tabObj.resetCosts[0][1] + "元宝" + ColorType.Brown7a2f21 + "重置扫荡", "", function (val) {
                    if (val == 1) {
                        NetManager.getInstance().protocolos.reset_trial_instance();
                    }
                });
            }
        };
        TowerCopyTaskPanel.prototype.btnclick = function ($e) {
            NetManager.getInstance().protocolos.enter_trial_instance();
        };
        TowerCopyTaskPanel.prototype.setTowerPage = function () {
            this.setBaseData();
            this.draw();
            this.drawBase();
        };
        TowerCopyTaskPanel.prototype.setBaseData = function () {
            var ary = GuidData.instanceData.getInstanceIntFieldTrialPassed();
            this.sweepCurrent = ary[0];
            this.trialCurrent = ary[1];
            var ary = GuidData.instanceData.getInstanceIntFieldTrialSweep();
            this.sweepNum = ary[0];
            this.canBuyNum = ary[1];
            this._maxPage = Math.floor(this.trialCurrent / 5);
            var maxTab = Math.floor(TableData.getInstance().getTabMaxID(TableData.tb_instance_trial) / 5);
            if (this._maxPage >= maxTab) {
                this._maxPage = maxTab - 1;
            }
            this._curPage = this._maxPage;
        };
        TowerCopyTaskPanel.prototype.refreshSweep = function () {
            this.setBaseData();
            this.drawBase();
        };
        TowerCopyTaskPanel.prototype.perPage = function ($e) {
            if (this._curPage == 0) {
                return;
            }
            this._curPage--;
            this.draw();
        };
        TowerCopyTaskPanel.prototype.nextPage = function ($e) {
            if (this._curPage == this._maxPage) {
                return;
            }
            this._curPage++;
            this.draw();
        };
        TowerCopyTaskPanel.prototype.drawBase = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._maxLab.skinName, ColorType.Brown7a2f21 + "已通关" + ColorType.Green2ca937 + this.trialCurrent + ColorType.Brown7a2f21 + "层", 16, TextAlign.CENTER);
            if (this.sweepCurrent > 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepLab.skinName, ColorType.Brown7a2f21 + "可扫荡：" + ColorType.Green2ca937 + "1-" + this.sweepCurrent + ColorType.Brown7a2f21 + "层", 16, TextAlign.CENTER);
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepLab.skinName, "不可扫荡", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            if (this.sweepNum == 1) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepBtnLab.skinName, "一键扫荡", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepBtnLab.skinName, "重置扫荡", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            // if(this.canBuyNum == 0 && this.sweepNum == 0){
            //     this.removeSweep();
            // }else{
            //     this.addSweep();
            // }
            this.visiableBtn();
        };
        TowerCopyTaskPanel.prototype.removeSweep = function () {
            this.removeChild(this._sweepBtn);
            this.removeChild(this._sweepBtnLab);
            this.removeChild(this._sweepLab);
            this.removeChild(this._sweepLabBg);
        };
        TowerCopyTaskPanel.prototype.addSweep = function () {
            if (this._sweepBtn.parent) {
                return;
            }
            this.addChild(this._sweepBtn);
            this.addChild(this._sweepBtnLab);
            this.addChild(this._sweepLab);
            this.addChild(this._sweepLabBg);
        };
        TowerCopyTaskPanel.prototype.draw = function () {
            // if(this._drawPage == this._curPage){
            //     return;
            // }
            // var ary: any = GuidData.instanceData.getInstanceIntFieldTrialPassed();
            // var sweepCurrent: number = ary[0];
            // var trialCurrent: number = ary[1];
            var flag = -1;
            for (var i = 0; i < 5; i++) {
                var idx = this._curPage * 5 + i;
                var tabObj = TableData.getInstance().getData(TableData.tb_instance_trial, idx + 1);
                this.applyCellView(i, tabObj, idx < this.trialCurrent, idx < this.sweepCurrent, this.sweepNum == 0);
                if (idx < this.trialCurrent) {
                    this.stateAry[i].goToAndStop(2);
                }
                else if (idx == this.trialCurrent) {
                    this.stateAry[i].goToAndStop(0);
                    flag = i;
                }
                else {
                    this.stateAry[i].goToAndStop(1);
                }
            }
            if (flag == -1) {
                flag = 5;
            }
            this.progresUI.uvScale = this._uvScaleAry[flag];
            if (this._curPage == 0) {
                this.removeChild(this._leftBtn);
            }
            else {
                this.addChild(this._leftBtn);
            }
            if (this._curPage == this._maxPage) {
                this.removeChild(this._rightBtn);
            }
            else {
                this.addChild(this._rightBtn);
            }
        };
        TowerCopyTaskPanel.prototype.applyCellView = function ($id, $tabObj, $hasPass, $canSweep, $hasSweep) {
            var contentStr;
            if ($hasPass) {
                if ($canSweep) {
                    if ($hasSweep) {
                        contentStr = ColorType.colorcd2000 + "已扫荡";
                    }
                    else {
                        contentStr = ColorType.Green2ca937 + "可扫荡";
                    }
                }
                else {
                    contentStr = ColorType.colorcd2000 + "明日可扫荡";
                }
            }
            else {
                contentStr = ColorType.Brown7a2f21 + "推荐战力：" + ($tabObj.force > GuidData.player.getForce() ? ColorType.colorcd2000 : ColorType.colorff7200) + Snum($tabObj.force);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleAry[$id].skinName, contentStr, 14, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._mapAry[$id].skinName, "第" + $tabObj.id + "关", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            var rewardInfo;
            if ($hasPass) {
                contentStr = "每日奖励";
                rewardInfo = $tabObj.showreward;
            }
            else {
                contentStr = "首通奖励";
                rewardInfo = $tabObj.firstReward;
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._rewardAry[$id].skinName, contentStr, 14, TextAlign.CENTER, ColorType.color9a683f);
            for (var i = 0; i < 2; i++) {
                if (rewardInfo[i]) {
                    IconManager.getInstance().drawItemIcon40(this._iconAry[$id][i], rewardInfo[i][0], rewardInfo[i][1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon40(this._iconAry[$id][i], 0, 1);
                }
            }
            this._roleList[$id].setAvatar(getAvataByID($tabObj.model));
        };
        TowerCopyTaskPanel.prototype.addByCopy = function ($name1, $name2) {
            var ui = this._winMidRender.getComponent($name1);
            this.setSizeForPanelUiCopy(ui, $name2, this._bgRender);
            return ui;
        };
        TowerCopyTaskPanel.prototype.addSelfRole = function () {
            this._roleList = new Array;
            for (var i = 0; i < 5; i++) {
                var selfRole = new MonsterUIChar();
                this._bgRender.addModel(selfRole);
                this._roleList.push(selfRole);
            }
            this.resize();
        };
        TowerCopyTaskPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this._roleList) {
                for (var i = 0; i < this._roleList.length; i++) {
                    var sr = this._roleList[i];
                    sr.scale = 1.5 * UIData.Scale;
                    sr.x = (230 - 105 * i) * UIData.Scale;
                    sr.y = -20 * UIData.Scale;
                    sr.resize();
                }
            }
        };
        TowerCopyTaskPanel.prototype.addWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.addChild(this._bgAry[i]);
            }
        };
        TowerCopyTaskPanel.prototype.removeWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.removeChild(this._bgAry[i]);
            }
        };
        TowerCopyTaskPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            // LabelTextFont.writeSingleLabel(this._baseUiAtlas,this.d_vip_add.skinName, getvipadd("trialReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            if (this._baseUiAtlas) {
                this.setTowerPage();
                this.addWinmid();
            }
        };
        TowerCopyTaskPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
        };
        return TowerCopyTaskPanel;
    }(UIConatiner));
    copytask.TowerCopyTaskPanel = TowerCopyTaskPanel;
})(copytask || (copytask = {}));
//# sourceMappingURL=TowerCopyTaskPanel.js.map