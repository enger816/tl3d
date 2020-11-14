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
    var ResCopyTaskPanel = /** @class */ (function (_super) {
        __extends(ResCopyTaskPanel, _super);
        function ResCopyTaskPanel() {
            var _this = _super.call(this) || this;
            _this._curDataTYPE = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        ResCopyTaskPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._winMidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._btnRender = new UIRenderComponent();
            this._btnRender.uiAtlas = WindowUi.winUIAtlas;
            this.addRender(this._btnRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);
            this._topRender.sortnum = 101;
            this.initUI();
        };
        ResCopyTaskPanel.prototype.initUI = function () {
            this.initBg();
            this.addUIList(["t_title1", "t_bg"], this._bgRender);
            var ui = this.addChild(this._baseRender.getComponent("t_reset"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "次数每日零点重置", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.t_lab1 = this.addChild(this._baseRender.getComponent("t_lab1"));
            this.t_listindex = this.addChild(this._baseRender.getComponent("t_listindex"));
            this.t_myforce = this.addChild(this._baseRender.getComponent("t_myforce"));
            this.t_num = this.addChild(this._baseRender.getComponent("t_num"));
            this.addChild(this._topRender.getComponent("d_line"));
            this.drawForce();
        };
        ResCopyTaskPanel.prototype.initBg = function () {
            this._bgAry = new Array;
            this._bgAry.push(this.addByCopy("cnew_bg_yellow", "t_list_bg"));
        };
        ResCopyTaskPanel.prototype.addByCopy = function ($name1, $name2) {
            var ui = this._winMidRender.getComponent($name1);
            this.setSizeForPanelUiCopy(ui, $name2, this._bgRender);
            return ui;
        };
        ResCopyTaskPanel.prototype.drawForce = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.t_myforce.skinName, ColorType.Brown7a2f21 + "我的战力: " + ColorType.Green2ca937 + Snum(GuidData.player.getForce()), 16, TextAlign.LEFT, ColorType.colorb96d49);
        };
        ResCopyTaskPanel.prototype.draw = function ($data) {
            if (this._curDataTYPE == $data.data.type) {
                return;
            }
            this._curDataData = $data;
            this._curDataTYPE = $data.data.type;
            if (!this.hardList) {
                this.hardList = new HardList;
                this.hardList.init(this._baseUiAtlas);
            }
            this.hardList.show(this._curDataTYPE);
            this.drawTypeTimes();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.t_lab1.skinName, $data.data.name, 14, TextAlign.CENTER, ColorType.colorb96d49);
            this.resize();
        };
        ResCopyTaskPanel.prototype.drawTypeTimes = function () {
            var kk = GuidData.instanceData.getInstanceIntFieldResSatrt();
            var times = this._curDataData.maxtime - kk[this._curDataTYPE - 1].num;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.t_num.skinName, ColorType.Brown7a2f21 + "剩余挑战次数: " + ColorType.Green2ca937 + times, 16, TextAlign.LEFT, ColorType.colorb96d49);
        };
        ResCopyTaskPanel.prototype.refreshRes = function () {
            if (this._slist) {
                this._slist.reget();
            }
        };
        ResCopyTaskPanel.prototype.showList = function () {
            if (!this._slist) {
                this._slist = new ResCopyList();
                this._slist.init(this._baseUiAtlas, this);
            }
            this._slist.show();
        };
        ResCopyTaskPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.hardList) {
                this.hardList.left = this.t_listindex.parent.x / UIData.Scale + this.t_listindex.x;
                this.hardList.top = this.t_listindex.parent.y / UIData.Scale + this.t_listindex.y;
            }
        };
        ResCopyTaskPanel.prototype.addWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.addChild(this._bgAry[i]);
            }
        };
        ResCopyTaskPanel.prototype.removeWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.removeChild(this._bgAry[i]);
            }
        };
        ResCopyTaskPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //this.addChild(this._mainBg);
            this._curDataTYPE = -1;
            if (this._baseUiAtlas) {
                //this.draw();
                this.addWinmid();
                this.showList();
            }
        };
        ResCopyTaskPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
            this._slist.hide();
            if (this.hardList) {
                this.hardList.hide();
            }
        };
        return ResCopyTaskPanel;
    }(UIConatiner));
    copytask.ResCopyTaskPanel = ResCopyTaskPanel;
    /**list */
    var ResCopyList = /** @class */ (function (_super) {
        __extends(ResCopyList, _super);
        function ResCopyList() {
            return _super.call(this) || this;
        }
        ResCopyList.prototype.init = function ($atlas, $panel) {
            this._panel = $panel;
            this.baseAtlas = $atlas;
            this.initData();
        };
        ResCopyList.prototype.initData = function () {
            var ary = new Array;
            var w = 312;
            var h = 434;
            this.setData(ary, ResCopyListItemRender, w, h, 310, 80, 5, 512, 512, 1, 6, 2);
            this.center = -280;
            this.middle = 40;
            this.setShowLevel(4);
            this.resize();
        };
        ResCopyList.prototype.setSelect = function ($item) {
            if ($item.itdata && $item.itdata.data) {
                _super.prototype.setSelect.call(this, $item);
                this._panel.draw($item.itdata.data);
            }
        };
        ResCopyList.prototype.reget = function () {
            this._itemary = this.getDataAry();
            this.refreshData(this._itemary);
        };
        ResCopyList.prototype.getDataAry = function () {
            var tabarr = fb.FuBenModel.getInstance().getFubenResItem();
            var ary = new Array();
            var nodeList = RedPointManager.getInstance().getNodeByID(122).children;
            for (var i = 0; i < tabarr.length; i++) {
                nodeList[i].data = tabarr[i];
                tabarr[i].node = nodeList[i];
                var data = new SListItemData();
                data.data = tabarr[i];
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        /**
         * 选中页签，按配表顺序来
         */
        ResCopyList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.reget();
            this.setSelectIndex(0);
            this._panel.draw(this._itemary[0].data);
        };
        ResCopyList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return ResCopyList;
    }(EffectSlist));
    copytask.ResCopyList = ResCopyList;
    var ResCopyListItemRender = /** @class */ (function (_super) {
        __extends(ResCopyListItemRender, _super);
        function ResCopyListItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._curDataID = -1;
            return _this;
        }
        ResCopyListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var topRender = $customizeRenderAry[0];
            var cententRender = $customizeRenderAry[1];
            this._ibg = this.creatGrid9SUI($baseRender, this.parentTarget.baseAtlas, "sa_bg", 2, 2, 230, 78, 10, 10);
            $container.addChild(this._ibg);
            this._ibg.addEventListener(InteractiveEvent.Down, this.onclick, this);
            this._name = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_lab1", 115, 15, 120, 20);
            $container.addChild(this._name);
            this._numlab = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_lab3", 115, 43, 120, 20);
            $container.addChild(this._numlab);
            this._img = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_img", 3, 3, 107, 74);
            $container.addChild(this._img);
            this._topImg = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_top", 0, 0, 61, 60);
            $container.addChild(this._topImg);
            this.Redpoint = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "sa_redpoint", 212, 1, 17, 16);
            this.Redpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Redpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        ResCopyListItemRender.prototype.onclick = function ($e) {
            UIManager.popClikNameFun("sa_bg");
            this.parentTarget.setSelect(this);
        };
        Object.defineProperty(ResCopyListItemRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                if (this._selected == val) {
                    return;
                }
                this._selected = val;
                this.drawSel();
            },
            enumerable: true,
            configurable: true
        });
        ResCopyListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        ResCopyListItemRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this._name.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._numlab.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._ibg.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._img.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._topImg.skinName);
            this.Redpoint.preHide();
        };
        ResCopyListItemRender.prototype.drawSel = function () {
            if (this.selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_select);
            }
            else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_nselect);
            }
        };
        ResCopyListItemRender.prototype.applyRender = function () {
            var bd = this.itdata.data;
            if (bd.node) {
                bd.node.bindUI(this.Redpoint);
            }
            this.drawSel();
            if (this._curDataID != bd.data.id) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, bd.data.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            }
            var numStr;
            var levflag = GuidData.player.getLevel() < bd.data.limLev;
            if (levflag) {
                numStr = ColorType.colorcd2000 + "需要等级：" + bd.data.limLev;
            }
            else {
                numStr = ColorType.color9a683f + "今日次数：" + ColorType.Green2ca937 + (bd.maxtime - bd.num) + "/" + bd.maxtime;
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._numlab.skinName, numStr, 15, TextAlign.LEFT, ColorType.Brown7a2f21);
            if (this._curDataID != bd.data.id) {
                this.uiAtlas.upDataPicToTexture("ui/load/rescopy/" + bd.data.type + ".png", this._img.skinName);
                this.uiAtlas.upDataPicToTexture("ui/load/rescopy/t" + bd.data.type + ".png", this._topImg.skinName);
            }
            this._curDataID = bd.data.id;
        };
        return ResCopyListItemRender;
    }(SListItem));
    copytask.ResCopyListItemRender = ResCopyListItemRender;
    /**end list */
    /**
     * 右侧list
     */
    var HardList = /** @class */ (function (_super) {
        __extends(HardList, _super);
        function HardList() {
            var _this = _super.call(this) || this;
            _this._complete = false;
            return _this;
        }
        HardList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        HardList.prototype.initData = function () {
            var ary = new Array();
            this.setData(ary, HardListRender, 548, 326, 198, 0, 3, 1024, 512, 5, 1, 1);
            this.setShowLevel(6);
        };
        HardList.prototype.refreshDataByNewData = function () {
            //console.log("------数据变化了--------");
            var $data = copytask.CopytaskModel.getInstance().getResItems(this._curTYPE);
            for (var i = 0; i < this._ItemDataList.length; i++) {
                this._ItemDataList[i].data = $data[i];
                if (this.effList[i]) {
                    if ($data[i].receive == 0 && $data[i].passed == 1) {
                        this.effplay(this.effList[i]);
                    }
                    else {
                        this.hideEffect(i);
                    }
                }
            }
            this.refreshDraw();
            // this.draweff();
        };
        HardList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        HardList.prototype.draweff = function () {
            if (!this._complete) {
                return;
            }
            //特效播放
            for (var i = 0; i < this._ItemDataList.length; i++) {
                var vo = this._ItemDataList[i].data;
                if (vo.receive == 0 && vo.passed == 1) {
                    this.showEffect(i, this.getIdxX(i) + 41, this.getIdxY(0) + 143, 0.9, 0.8);
                }
                else {
                    this.hideEffect(i);
                }
            }
        };
        HardList.prototype.effectComplte = function () {
            //console.log("加载好了，回调");
            this._complete = true;
            this.refreshData(this._ItemDataList);
            this.draweff();
        };
        HardList.prototype.show = function ($type) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._curTYPE = $type;
            this._ItemDataList = this.getData(copytask.CopytaskModel.getInstance().getResItems(this._curTYPE));
            this.setEffectUrl("ef_fl", 4, 4, this._ItemDataList.length);
        };
        HardList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
            this.hideEffect();
        };
        return HardList;
    }(TransverseSList));
    copytask.HardList = HardList;
    var HardListRender = /** @class */ (function (_super) {
        __extends(HardListRender, _super);
        function HardListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HardListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._container = $container;
            var cententRender = this._customRenderAry[0];
            this.DRbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "DRbg", 0, 0, 193, 326, 22);
            $container.addChild(this.DRbg);
            this.DRicon = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "DRicon", 46, 16, 98, 98);
            $container.addChild(this.DRicon);
            // this.DRname = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "DRname", 42, 93, 100, 20);
            // $container.addChild(this.DRname);
            this.uiAry = new Array;
            this.UnlockAry = new Array;
            this.DRforce = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "DRforce", 4, 127, 180, 20);
            this.DRbtn = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "DRbtn", 40, 265, 108, 48);
            this.DRbtn.addEventListener(InteractiveEvent.Up, this.btncilck, this);
            this.DRbox = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "DRbox", 58, 172, 78, 69);
            this.DRbox.addEventListener(InteractiveEvent.Up, this.boxclick, this);
            this.uiAry.push(this.DRforce);
            this.uiAry.push(this.DRbtn);
            this.uiAry.push(this.DRbox);
            this.DRunlocklev = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "DRunlocklev", 45, 278, 100, 20);
            this.DRunlock = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "DRunlock", 30, 148, 133, 108);
            this.UnlockAry.push(this.DRunlocklev);
            this.UnlockAry.push(this.DRunlock);
            this.DRbasebg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "DRbasebg", 19, 205, 163, 120);
            $container.addChild(this.DRbasebg);
        };
        HardListRender.prototype.btncilck = function ($evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D($evt.x, $evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                UIManager.popClikNameFun($evt.target.name);
                UiTweenScale.getInstance().changeButSize($evt.target);
                if ($vo.num > 0) {
                    NetManager.getInstance().protocolos.res_instance_enter($vo.tab["id"]);
                }
                else {
                    msgtip.MsgTipManager.outStr("副本次数已用完", 99);
                }
            }
        };
        HardListRender.prototype.boxclick = function ($evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D($evt.x, $evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                if ($vo.receive == 0) {
                    var aaa = new pass.BoxVo;
                    aaa.rewardary = $vo.tab["firstReward"];
                    aaa.id = 1;
                    aaa.title = 0;
                    aaa.canbuy = $vo.passed == 1 && $vo.receive == 0;
                    var $eee = new pass.PassEvent(pass.PassEvent.SHOW_BOXREWARD_PANEL);
                    $eee.data = aaa;
                    $eee.SubmitFun = function (value) {
                        NetManager.getInstance().protocolos.pick_res_instance_first_reward($vo.tab["id"]);
                    };
                    ModuleEventManager.dispatchEvent($eee);
                }
            }
        };
        HardListRender.prototype.pushUI = function ($ary) {
            for (var i = 0; i < $ary.length; i++) {
                if (!$ary[i].parent) {
                    this._container.addChild($ary[i]);
                }
            }
        };
        HardListRender.prototype.popUI = function ($ary) {
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i].parent) {
                    this._container.removeChild($ary[i]);
                }
            }
        };
        HardListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.DRbg.skinName, UIData.publicUi, PuiData.I1bg_1);
                // LabelTextFont.writeSingleLabel(this.uiAtlas, this.DRname.skinName, $vo.tab["hardDesc"], 16, TextAlign.CENTER, ColorType.White9A683F);
                this.DRicon.uiRender.uiAtlas.upDataPicToTexture(getrestaskhardIconUrl($vo.tab["hardDesc"]), this.DRicon.skinName);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.DRbasebg.skinName, "BASEBG");
                if ($vo.tab["limLev"] > GuidData.player.getLevel()) {
                    //未解锁
                    this.pushUI(this.UnlockAry);
                    this.popUI(this.uiAry);
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.DRunlock.skinName, "UNLOCK");
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.DRunlocklev.skinName, "Lv " + $vo.tab["limLev"] + "解锁", 16, TextAlign.CENTER, ColorType.colorcd2000);
                }
                else {
                    //已解锁
                    this.pushUI(this.uiAry);
                    this.popUI(this.UnlockAry);
                    var color = $vo.tab["force"] > GuidData.player.getForce() ? ColorType.colorcd2000 : ColorType.Green2ca937;
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.DRforce.skinName, ColorType.Brown7a2f21 + "推荐战力: " + color + $vo.tab["force"], 16, TextAlign.CENTER, ColorType.colorcd2000);
                    var receivestr = "BOX0";
                    if ($vo.receive == 1) {
                        receivestr = "BOX1";
                    }
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.DRbox.skinName, receivestr);
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.DRbtn.skinName, "BTN");
                }
            }
        };
        HardListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        HardListRender.prototype.refreshDraw = function () {
            this.render(this.itdata);
        };
        HardListRender.prototype.equClick = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
            }
        };
        HardListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.DRbg);
            UiDraw.clearUI(this.DRicon);
            // UiDraw.clearUI(this.DRname);
            UiDraw.clearUI(this.DRforce);
            UiDraw.clearUI(this.DRbasebg);
            UiDraw.clearUI(this.DRunlock);
            UiDraw.clearUI(this.DRbox);
            UiDraw.clearUI(this.DRunlocklev);
            UiDraw.clearUI(this.DRbtn);
        };
        return HardListRender;
    }(SListItem));
    copytask.HardListRender = HardListRender;
})(copytask || (copytask = {}));
//# sourceMappingURL=ResCopyTaskPanel.js.map