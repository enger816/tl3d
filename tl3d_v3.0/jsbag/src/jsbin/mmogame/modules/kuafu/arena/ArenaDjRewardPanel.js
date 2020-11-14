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
var kuafu;
(function (kuafu) {
    var ArenaDjRewardPanel = /** @class */ (function (_super) {
        __extends(ArenaDjRewardPanel, _super);
        function ArenaDjRewardPanel() {
            var _this = _super.call(this) || this;
            _this._idx = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this.setBlackBg();
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._baseUiAtlas = new UIAtlas();
            return _this;
        }
        ArenaDjRewardPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            _super.prototype.dispose.call(this);
        };
        ArenaDjRewardPanel.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        ArenaDjRewardPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/kuafu/arena/arenadjreward.xml", "ui/uidata/kuafu/arena/arenadjreward.png", function () { _this.loadConfigCom(); }, "ui/uidata/kuafu/arena/arenadjrewardbtn.png");
        };
        ArenaDjRewardPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            this.applyLoadComplete();
            this.resize();
        };
        ArenaDjRewardPanel.prototype.initUI = function () {
            this.addChild(this.winmidRender.getComponent("t_main_bg"));
            var nameAry = ["首胜奖励", "每日排名", "每日连胜", "挑战奖励"];
            this._btnAry = new Array();
            for (var i = 0; i < 4; i++) {
                var btn = this.addChild(this._bgRender.getComponent("t_btn" + i));
                btn.goToAndStop(1);
                btn.data = i;
                btn.addEventListener(InteractiveEvent.Down, this.onClick, this);
                this._btnAry.push(btn);
                var ui = this.addChild(this._baseRender.getComponent("t_btn_lab" + i));
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, nameAry[i], 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            this._title1 = this.addChild(this._baseRender.getComponent("t_title1"));
            this._title2 = this._baseRender.getComponent("t_title2");
            this._titleLab1 = this._baseRender.getComponent("t_title_lab1");
            this._titleLab2 = this._baseRender.getComponent("t_title_lab2");
            this._titleBg1 = this._bgRender.getComponent("t_title_bg1");
            this._titleBg2 = this._bgRender.getComponent("t_title_bg2");
            this.addChild(this._bgRender.getComponent("a_title"));
            if (this.hasStage) {
                this.setIdx(0);
            }
        };
        ArenaDjRewardPanel.prototype.addReward = function () {
            if (!this._rewardList) {
                this._rewardList = new ArenaDjRewardList();
                this._rewardList.init(this._baseUiAtlas);
            }
            this._rewardList.show();
            if (this._infoList) {
                this._infoList.hide();
            }
        };
        ArenaDjRewardPanel.prototype.addInfo = function ($type) {
            if (!this._infoList) {
                this._infoList = new ArenaDjInfoList();
                this._infoList.init(this._baseUiAtlas);
            }
            this._infoList.show($type);
            if (this._rewardList) {
                this._rewardList.hide();
            }
        };
        ArenaDjRewardPanel.prototype.hideList = function () {
            if (this._infoList) {
                this._infoList.hide();
            }
            if (this._rewardList) {
                this._rewardList.hide();
            }
        };
        ArenaDjRewardPanel.prototype.setIdx0 = function () {
            this.addListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "最佳首胜排名：" + GuidData.instanceData.getvictoryrecord(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title2.skinName, "首次胜利挑战以下名次将获得以下奖励：", 14, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab1.skinName, "首胜排名", 16, TextAlign.CENTER, ColorType.color9a683f);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab2.skinName, "排名奖励", 16, TextAlign.CENTER, ColorType.color9a683f);
            this.addReward();
        };
        ArenaDjRewardPanel.prototype.setIdx1 = function () {
            this.addListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "今日当前排名：" + GuidData.player.get1v1Rank(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title2.skinName, "每日22 :00结算奖励，并以邮件发放：", 14, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab1.skinName, "每日排名", 16, TextAlign.CENTER, ColorType.color9a683f);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab2.skinName, "排名奖励", 16, TextAlign.CENTER, ColorType.color9a683f);
            this.addInfo(0);
        };
        ArenaDjRewardPanel.prototype.setIdx2 = function () {
            this.addListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "今日连胜次数：" + GuidData.instanceData.getwinningstreakrecord(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title2.skinName, "每日主动挑战并连胜达到以下数，可获额外奖励", 14, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab1.skinName, "连胜次数", 16, TextAlign.CENTER, ColorType.color9a683f);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab2.skinName, "额外奖励", 16, TextAlign.CENTER, ColorType.color9a683f);
            this.addInfo(1);
        };
        ArenaDjRewardPanel.prototype.setIdx3 = function () {
            this.removeListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "每次挑战都会获得10荣誉", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.hideList();
        };
        ArenaDjRewardPanel.prototype.setIdx = function ($idx) {
            //console.log("---进来了");
            // if (this._idx == $idx) {
            //     return;
            // }
            this._idx = $idx;
            if ($idx == 0) {
                this.setIdx0();
            }
            else if ($idx == 1) {
                this.setIdx1();
            }
            else if ($idx == 2) {
                this.setIdx2();
            }
            else if ($idx == 3) {
                this.setIdx3();
            }
            for (var i = 0; i < this._btnAry.length; i++) {
                if (i == $idx) {
                    this._btnAry[i].goToAndStop(0);
                }
                else {
                    this._btnAry[i].goToAndStop(1);
                }
            }
        };
        ArenaDjRewardPanel.prototype.addListTitle = function () {
            if (this._title2.parent) {
                return;
            }
            this._title1.y = this._title1.baseRec.y;
            this.addChild(this._title2);
            this.addChild(this._titleLab1);
            this.addChild(this._titleLab2);
            this.addChild(this._titleBg1);
            this.addChild(this._titleBg2);
        };
        ArenaDjRewardPanel.prototype.removeListTitle = function () {
            if (!this._title2.parent) {
                return;
            }
            this._title1.y = this._title1.baseRec.y + 50;
            this.removeChild(this._title2);
            this.removeChild(this._titleLab1);
            this.removeChild(this._titleLab2);
            this.removeChild(this._titleBg1);
            this.removeChild(this._titleBg2);
        };
        ArenaDjRewardPanel.prototype.onClick = function ($e) {
            this.setIdx($e.target.data);
        };
        ArenaDjRewardPanel.prototype.djRewardChg = function () {
            if (this._rewardList && this._rewardList.hasStage) {
                this._rewardList.reget();
            }
        };
        ArenaDjRewardPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //this.addChild(this._mainBg);
            if (this._baseUiAtlas) {
                //this.draw();
                this.setIdx(0);
            }
        };
        ArenaDjRewardPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.hideList();
            this._idx = -1;
        };
        return ArenaDjRewardPanel;
    }(WindowMinUi));
    kuafu.ArenaDjRewardPanel = ArenaDjRewardPanel;
    /**rewardlist */
    var ArenaDjRewardList = /** @class */ (function (_super) {
        __extends(ArenaDjRewardList, _super);
        function ArenaDjRewardList() {
            return _super.call(this) || this;
        }
        ArenaDjRewardList.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            // ArenaDjRewardListItemRender.baseAtlas = $atlas;
            this.initData();
        };
        ArenaDjRewardList.prototype.initData = function () {
            var ary = new Array();
            var w = 420;
            var h = 300;
            this.setData(ary, ArenaDjRewardListItemRender, w, h, 400, 100, 3, 512, 512, 1, 6);
            this.center = 95;
            this.middle = 55;
            this.setShowLevel(4);
            this.resize();
        };
        ArenaDjRewardList.prototype.reget = function () {
            this.refreshData(this.getDataAry());
        };
        ArenaDjRewardList.prototype.getDataAry = function () {
            var baseary = GuidData.instanceData.getFirstvictoryList();
            var ary = new Array();
            for (var i = 0; i < baseary.length; i++) {
                var data = new SListItemData();
                data.data = baseary[i];
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        ArenaDjRewardList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.reget();
        };
        ArenaDjRewardList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return ArenaDjRewardList;
    }(SList));
    kuafu.ArenaDjRewardList = ArenaDjRewardList;
    var ArenaDjRewardListItemRender = /** @class */ (function (_super) {
        __extends(ArenaDjRewardListItemRender, _super);
        function ArenaDjRewardListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArenaDjRewardListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "s_bg", 0, 0, 400, 100);
            $container.addChild(this._ibg);
            this._btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_btn", 296, 30, 107, 46);
            $container.addChild(this._btn);
            this._btn.addEventListener(InteractiveEvent.Down, this.onclick, this);
            this._name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_lab", 15, 43, 100, 20);
            $container.addChild(this._name);
            this._iconAry = new Array;
            for (var i = 0; i < 3; i++) {
                var ui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon" + i, 86 + 70 * i, 18, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }
        };
        ArenaDjRewardListItemRender.prototype.onclick = function ($e) {
            NetManager.getInstance().protocolos.doujiantai_first_reward(this.itdata.data.data.id);
        };
        ArenaDjRewardListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && this.itdata.data) {
                this.applyRender();
            }
        };
        ArenaDjRewardListItemRender.prototype.applyRender = function () {
            if (this.itdata.id % 2) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            var bd = this.itdata.data;
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, this.itdata.data.name, 16, TextAlign.CENTER,ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, "第" + bd.data.rank + "名", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._btn.skinName, "按钮" + bd.state, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawBtn(bd.state);
            // UiDraw.clearUI(this._btn);
            // this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png",this._btn.skinName);
            var rary = bd.data.reward;
            for (var i = 0; i < this._iconAry.length; i++) {
                if (rary[i]) {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], rary[i][0], rary[i][1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 1);
                }
            }
        };
        ArenaDjRewardListItemRender.prototype.drawBtn = function ($state) {
            var $ui = this._btn;
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var imgUseRect = this.parentTarget.baseAtlas.getRec("u_s" + $state);
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return ArenaDjRewardListItemRender;
    }(SListItem));
    kuafu.ArenaDjRewardListItemRender = ArenaDjRewardListItemRender;
    /**end rewardlist */
    /**连胜list***/
    var ArenaDjInfoList = /** @class */ (function (_super) {
        __extends(ArenaDjInfoList, _super);
        function ArenaDjInfoList() {
            return _super.call(this) || this;
        }
        ArenaDjInfoList.prototype.init = function ($atlas) {
            ArenaDjInfoListItemRender.baseAtlas = $atlas;
            this.initData();
        };
        ArenaDjInfoList.prototype.initData = function () {
            var ary = new Array;
            var w = 420;
            var h = 320;
            this.setData(ary, ArenaDjInfoListItemRender, w, h, 400, 55, 6, 128, 512, 1, 10);
            this.center = 95;
            this.middle = 70;
            this.setShowLevel(4);
            this.resize();
        };
        ArenaDjInfoList.prototype.resetData = function ($type) {
            if ($type == 0) {
                this.refreshData(this.getDayReward());
            }
            else {
                this.refreshData(this.getCombatwinReward());
            }
        };
        ArenaDjInfoList.prototype.getCombatwinReward = function () {
            var ary = new Array();
            var arytab = tb.TB_doujiantai_combat_win.get_TB_doujiantai_combat_win();
            for (var i = 0; i < arytab.length; i++) {
                var obj = new Object;
                obj.lab = arytab[i].id + "连胜";
                obj.val = getResName(arytab[i].reward[0][0]) + arytab[i].reward[0][1];
                var data = new SListItemData();
                data.data = obj;
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        ArenaDjInfoList.prototype.getDayReward = function () {
            var ary = new Array();
            var arytab = tb.TB_doujiantai_day.get_TB_doujiantai_day();
            for (var i = 0; i < arytab.length; i++) {
                var obj = new Object;
                if (i == 0) {
                    obj.lab = "第" + arytab[i].rank + "名";
                }
                else {
                    var r = arytab[i - 1].rank + 1;
                    if (r != arytab[i].rank) {
                        obj.lab = "第" + r + "-" + arytab[i].rank + "名";
                    }
                    else {
                        obj.lab = "第" + arytab[i].rank + "名";
                    }
                }
                obj.val = getResName(arytab[i].reward[0][0]) + arytab[i].reward[0][1];
                var data = new SListItemData();
                data.data = obj;
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        ArenaDjInfoList.prototype.show = function ($type) {
            if ($type === void 0) { $type = 0; }
            UIManager.getInstance().addUIContainer(this);
            this.resetData($type);
        };
        ArenaDjInfoList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return ArenaDjInfoList;
    }(SList));
    kuafu.ArenaDjInfoList = ArenaDjInfoList;
    var ArenaDjInfoListItemRender = /** @class */ (function (_super) {
        __extends(ArenaDjInfoListItemRender, _super);
        function ArenaDjInfoListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArenaDjInfoListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, ArenaDjInfoListItemRender.baseAtlas, "b_bg", 0, 0, 400, 55);
            $container.addChild(this._ibg);
            this._val = this.creatSUI($baseRender, ArenaDjInfoListItemRender.baseAtlas, "b_lab2", 200, 20, 120, 20);
            $container.addChild(this._val);
            this._lab = this.creatSUI($baseRender, ArenaDjInfoListItemRender.baseAtlas, "b_lab1", 20, 20, 100, 20);
            $container.addChild(this._lab);
        };
        ArenaDjInfoListItemRender.prototype.onclick = function ($e) {
            NetManager.getInstance().protocolos.doujiantai_first_reward(this.itdata.data.data.id);
        };
        ArenaDjInfoListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && this.itdata.data) {
                this.applyRender();
            }
            else {
                UiDraw.clearUI(this._ibg);
                UiDraw.clearUI(this._lab);
                UiDraw.clearUI(this._val);
            }
        };
        ArenaDjInfoListItemRender.prototype.applyRender = function () {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            else {
                UiDraw.clearUI(this._ibg);
            }
            var bd = this.itdata.data;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab.skinName, bd.lab, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._val.skinName, bd.val, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        return ArenaDjInfoListItemRender;
    }(SListItem));
    kuafu.ArenaDjInfoListItemRender = ArenaDjInfoListItemRender;
    /**end 连胜list***/
})(kuafu || (kuafu = {}));
//# sourceMappingURL=ArenaDjRewardPanel.js.map