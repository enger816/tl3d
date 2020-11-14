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
    var FubenRightPanel = /** @class */ (function (_super) {
        __extends(FubenRightPanel, _super);
        function FubenRightPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.right = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new UIAtlas;
            _this._baseRender.uiAtlas.setInfo("ui/uidata/fuben/right/fubenright.xml", "ui/uidata/fuben/right/fubenright.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        FubenRightPanel.prototype.loadConfigCom = function () {
            this._expBtn = this.addEvntButUp("t_exp", this._baseRender);
            this._damBtn = this.addEvntButUp("t_dam", this._baseRender);
        };
        FubenRightPanel.prototype.butClik = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            if ($e.target == this._expBtn) {
                this.showExpPanel();
            }
            else if ($e.target == this._damBtn) {
                this.showDamPanel();
            }
        };
        FubenRightPanel.prototype.showDamPanel = function () {
            var _this = this;
            if (!this._damPanel) {
                this._damPanel = new FubenRightDamPanel();
            }
            this._damPanel.load(function () {
                //UIManager.getInstance().addUIContainer(this._damPanel);
                _this._damPanel.show();
            });
        };
        FubenRightPanel.prototype.showExpPanel = function () {
            var _this = this;
            if (!this._expPanel) {
                this._expPanel = new FubenRightExpPanel();
            }
            this._expPanel.load(function () {
                _this._expPanel.show();
            });
        };
        FubenRightPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return FubenRightPanel;
    }(UIConatiner));
    fb.FubenRightPanel = FubenRightPanel;
    var FubenRightDamPanel = /** @class */ (function (_super) {
        __extends(FubenRightDamPanel, _super);
        function FubenRightDamPanel() {
            var _this = _super.call(this) || this;
            //private _topRender: UIRenderComponent;
            _this.uiAtlasComplet = false;
            _this.subType = 0;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            //this._topRender = new UIRenderComponent;
            //this.addRender(this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas;
            return _this;
        }
        FubenRightDamPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/fuben/right/fubenrightdam.xml", "ui/uidata/fuben/right/fubenrightdam.png", function () { _this.loadConfigCom(); });
        };
        FubenRightDamPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            //this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this.addUIList(["t_title", "t_bg"], this._bottomRender);
            var obj = TableData.getInstance().getData(TableData.tb_instance_group_exp, 1);
            var ui = this.addChild(this._baseRender.getComponent("t_lab"));
            this.maxEffNum = obj.buffinfo[1];
            this.goldTimes = obj.goldTimes;
            this.moneyCost = obj.moneyCost[0];
            this.goldCost = obj.goldCost[0];
            var str = ColorType.Brownd662c0d + "每次鼓舞可增加人物" + ColorType.Green2ca937 + obj.buffinfo[0] + "%" + ColorType.Brownd662c0d + "伤害(上限" + ColorType.Green2ca937 + obj.buffinfo[1] + "%" + ColorType.Brownd662c0d + ")";
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, str, 16, TextAlign.CENTER);
            ui = this.addChild(this._baseRender.getComponent("t_lab1"));
            this.drawPrice(ui, "银币鼓舞(", obj.moneyCost[0][0], obj.moneyCost[0][1] + "/次)");
            ui = this.addChild(this._baseRender.getComponent("t_lab2"));
            this.drawPrice(ui, "元宝鼓舞(", obj.goldCost[0][0], obj.goldCost[0][1] + "/次)");
            ui = this.addChild(this._baseRender.getComponent("t_faq"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, ColorType.White9A683F + "(优先使用绑定元宝)", 16, TextAlign.CENTER);
            this.curDamUI = this.addChild(this._baseRender.getComponent("t_cur_dam"));
            this.curYinbiNum = this.addChild(this._baseRender.getComponent("t_info1"));
            ui = this.addChild(this._baseRender.getComponent("t_info2"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, ColorType.White9A683F + "(不限制)", 16, TextAlign.LEFT);
            this.sel1 = this._baseRender.getComponent("t_sel1");
            this.addChild(this.sel1);
            this.sel1.addEventListener(InteractiveEvent.Up, this.selClick, this);
            this.sel2 = this._baseRender.getComponent("t_sel2");
            this.addChild(this.sel2);
            this.sel2.addEventListener(InteractiveEvent.Up, this.selClick, this);
            this.setSel(this.sel1);
            this.cancal = this.addEvntButUp("t_no", this._bottomRender);
            this.submit = this.addEvntButUp("t_yes", this._bottomRender);
            this.drawDynamic();
            this._refreshFun = function () { _this.drawDynamic(); };
            this.applyLoadComplete();
        };
        FubenRightDamPanel.prototype.drawDynamic = function () {
            var info = GuidData.map.getExpFubenInfo();
            this.curEffNum = info.eff;
            this.curGoldTimes = info.buy;
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curDamUI.skinName, ColorType.Brownd662c0d + "当前伤害提升" + ColorType.Green2ca937 + info.eff + "%", 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curYinbiNum.skinName, ColorType.White9A683F + "银币可提升(" + ColorType.Green2ca937 + (this.goldTimes - this.curGoldTimes) + ColorType.White9A683F + ")", 16, TextAlign.LEFT);
        };
        FubenRightDamPanel.prototype.drawPrice = function ($ui, str, $cost, str2) {
            var $rec = this._baseRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var xoff = 20;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.drawCost(ctx, xoff, 0, getresIdByreward($cost));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str2, 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        FubenRightDamPanel.prototype.setSel = function (ui) {
            if (this.sel1 == ui) {
                this.sel1.goToAndStop(0);
                this.subType = 0;
            }
            else {
                this.sel1.goToAndStop(1);
            }
            if (this.sel2 == ui) {
                this.sel2.goToAndStop(0);
                this.subType = 1;
            }
            else {
                this.sel2.goToAndStop(1);
            }
        };
        FubenRightDamPanel.prototype.selClick = function (evt) {
            this.setSel(evt.target);
        };
        FubenRightDamPanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.submit:
                    this.sumbitHandle();
                    break;
                // case this.a_add_but:
                //     this.toNext();
                //     break
                // case this.a_submit:
                //     this.sendSelectNum();
                //     break
                case this.cancal:
                case this.f_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        FubenRightDamPanel.prototype.sumbitHandle = function () {
            if (this.curEffNum >= this.maxEffNum) {
                msgtip.MsgTipManager.outStr("伤害加成已到达上限", 99);
                return;
            }
            if (this.subType == 0) {
                if (this.curGoldTimes >= this.goldTimes) {
                    msgtip.MsgTipManager.outStr("银币购买次数已满", 99);
                    return;
                }
                if (!hasEnoughRes(this.moneyCost)) {
                    msgtip.MsgTipManager.outStr("银币不足", 99);
                    return;
                }
            }
            else {
                if (!hasEnoughRes(this.goldCost)) {
                    msgtip.MsgTipManager.outStr("元宝不足", 99);
                    return;
                }
            }
            NetManager.getInstance().protocolos.buy_inspiration(this.subType);
            //this.hide();
        };
        FubenRightDamPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeTimeTick(this._refreshFun);
        };
        FubenRightDamPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addTimeTick(300, this._refreshFun);
        };
        return FubenRightDamPanel;
    }(WindowPopUi));
    fb.FubenRightDamPanel = FubenRightDamPanel;
    var FubenRightExpPanel = /** @class */ (function (_super) {
        __extends(FubenRightExpPanel, _super);
        function FubenRightExpPanel() {
            var _this = _super.call(this) || this;
            //private _topRender: UIRenderComponent;
            _this.uiAtlasComplet = false;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new UIAtlas;
            return _this;
        }
        FubenRightExpPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/fuben/right/fubenrightexp.xml", "ui/uidata/fuben/right/fubenrightexp.png", function () { _this.loadConfigCom(); }, "ui/uidata/fuben/right/fubenrightexpuse.png");
        };
        FubenRightExpPanel.prototype.loadConfigCom = function () {
            this.addChild(this._baseRender.getComponent("t_title"));
            var ui = this.addChild(this._baseRender.getComponent("t_lab"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, ColorType.Brownd662c0d + "使用经验药水，打怪经验翻倍", 16, TextAlign.CENTER);
            this.initList();
            this.noItemUI = this._baseRender.getComponent("t_no");
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.noItemUI.skinName, ColorType.Brownd662c0d + "(当前背包无经验药水)", 16, TextAlign.CENTER);
            this.storeBtn = this.addEvntButUp("t_btn", this._baseRender);
            this.applyLoadComplete();
        };
        FubenRightExpPanel.prototype.initList = function () {
            this._rlist = new FubenRightExpList();
            this._rlist.init(this._baseRender.uiAtlas);
            this._rlist.pPanel = this;
            if (this.hasStage) {
                this._rlist.show();
            }
        };
        FubenRightExpPanel.prototype.refreshBtn = function () {
            var num = GuidData.bag.getExpItemList().length;
            if (num == 0) {
                this.addChild(this.noItemUI);
                this.addChild(this.storeBtn);
                this._rlist.hide();
            }
            else {
                this.removeChild(this.noItemUI);
                this.removeChild(this.storeBtn);
                this._rlist.show();
            }
        };
        FubenRightExpPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (this._rlist) {
                this._rlist.show();
            }
            this.refreshBtn();
        };
        FubenRightExpPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.f_close:
                    this.hide();
                    break;
                case this.storeBtn:
                    ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_GOLD, 6]);
                    this.hide();
                    break;
            }
        };
        FubenRightExpPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this._rlist) {
                this._rlist.hide();
            }
        };
        return FubenRightExpPanel;
    }(WindowPopUi));
    fb.FubenRightExpPanel = FubenRightExpPanel;
    var FubenRightExpList = /** @class */ (function (_super) {
        __extends(FubenRightExpList, _super);
        function FubenRightExpList() {
            return _super.call(this) || this;
        }
        FubenRightExpList.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            // ArenaDjRewardListItemRender.baseAtlas = $atlas;
            this.initData();
        };
        FubenRightExpList.prototype.initData = function () {
            var ary = new Array();
            var w = 420;
            var h = 200;
            this.setData(ary, FubenRightExpListItemRender, w, h, 400, 100, 2, 512, 512, 1, 5);
            this.center = 30;
            this.middle = -10;
            this.setShowLevel(4);
            this.resize();
        };
        FubenRightExpList.prototype.reget = function () {
            this.refreshData(this.getDataAry());
        };
        FubenRightExpList.prototype.getDataAry = function () {
            var srcList = GuidData.bag.getExpItemList();
            var ary = new Array();
            for (var i = 0; i < srcList.length; i++) {
                var data = new SListItemData();
                data.data = srcList[i];
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        FubenRightExpList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.reget();
        };
        FubenRightExpList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        FubenRightExpList.prototype.sunApplyHide = function () {
            if (this.pPanel) {
                this.pPanel.hide();
            }
        };
        return FubenRightExpList;
    }(SList));
    fb.FubenRightExpList = FubenRightExpList;
    var FubenRightExpListItemRender = /** @class */ (function (_super) {
        __extends(FubenRightExpListItemRender, _super);
        function FubenRightExpListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenRightExpListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "s_bg", 0, 0, 356, 97);
            $container.addChild(this._ibg);
            this._btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_btn", 236, 25, 105, 46);
            $container.addChild(this._btn);
            this._btn.addEventListener(InteractiveEvent.Down, this.onclick, this);
            this._name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_lab", 92, 34, 94, 28);
            $container.addChild(this._name);
            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon", 21, 14, 68, 68);
            $container.addChild(this._icon);
            this._up = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_up", 186, 24, 26, 33);
            $container.addChild(this._up);
        };
        FubenRightExpListItemRender.prototype.onclick = function ($e) {
            //NetManager.getInstance().protocolos.doujiantai_first_reward(this.itdata.data.data.id);
            if (this.itdata && this.itdata.data) {
                this.parentTarget.sunApplyHide();
                GuidData.bag.useItem(this.itdata.data.id);
            }
        };
        FubenRightExpListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && this.itdata.data) {
                this.applyRender();
            }
            else {
                this.applyNull();
            }
        };
        FubenRightExpListItemRender.prototype.applyNull = function () {
            UiDraw.clearUI(this._icon);
            UiDraw.clearUI(this._up);
            UiDraw.clearUI(this._ibg);
            UiDraw.clearUI(this._btn);
            UiDraw.clearUI(this._name);
        };
        FubenRightExpListItemRender.prototype.applyRender = function () {
            var bd = this.itdata.data;
            IconManager.getInstance().drawItemIcon60(this._icon, bd.entryData.id, bd.count);
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, this.itdata.data.name, 16, TextAlign.CENTER,ColorType.Brown7a2f21);
            if (bd.entryData.using_effect.length) {
                var tab = TableData.getInstance().getData(TableData.tb_buff_effect, bd.entryData.using_effect[0]);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, ColorType.Brownd662c0d + "经验" + ColorType.Green2ca937 + tab.value + "%", 16, TextAlign.RIGHT);
            }
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._btn.skinName, "按钮" + bd.state, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            // UiDraw.clearUI(this._btn);
            // this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png",this._btn.skinName);
            // var rary: Array<any> = bd.data.reward;
            // for (var i: number = 0; i < this._iconAry.length; i++) {
            //     if (rary[i]) {
            //         IconManager.getInstance().drawItemIcon60(this._iconAry[i], rary[i][0], rary[i][1]);
            //     } else {
            //         IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 1);
            //     }
            // }
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._up.skinName, UIData.publicUi, PuiData.A_JIANTOU);
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.STATEUP_LISTBG);
            this.drawBtn();
        };
        FubenRightExpListItemRender.prototype.drawBtn = function () {
            var $ui = this._btn;
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var imgUseRect = this.parentTarget.baseAtlas.getRec("u_btn");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return FubenRightExpListItemRender;
    }(SListItem));
    fb.FubenRightExpListItemRender = FubenRightExpListItemRender;
})(fb || (fb = {}));
//# sourceMappingURL=FubenRightPanel.js.map