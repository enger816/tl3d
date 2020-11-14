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
var wing;
(function (wing) {
    var WingPanel = /** @class */ (function (_super) {
        __extends(WingPanel, _super);
        function WingPanel() {
            var _this = _super.call(this) || this;
            _this._curTab = 0;
            // public setIdxBgPos(idx: number): void {
            // if (idx == 0) {
            // this.titleBg.y = this.titleBg.baseRec.y;
            // this.zLlab.x = this.zLlab.baseRec.x;
            // this.zLlab.y = this.zLlab.baseRec.y;
            // this.wingZl.x = this.wingZl.baseRec.x;
            // this.wingZl.y = this.wingZl.baseRec.y;
            // } else {
            //     this.titleBg.y = 78;
            //     this.zLlab.x = 293;
            //     this.zLlab.y = 93;
            //     this.wingZl.x = 348;
            //     this.wingZl.y = 93;
            // }
            // }
            _this._canclick = true;
            _this._currentIdx = 0;
            _this.curWingID = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._baseUiAtlas = new UIAtlas();
            return _this;
        }
        WingPanel.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            if (this.qianghuaPanel) {
                this.qianghuaPanel.dispose();
                this.qianghuaPanel = null;
            }
            if (this.jinjiePanel) {
                this.jinjiePanel.dispose();
                this.jinjiePanel = null;
            }
            if (this.showDisPlay) {
                this.showDisPlay.destory();
                this.showDisPlay = null;
            }
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }
        };
        WingPanel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                this.hide();
            }
        };
        WingPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/wing/wing.xml", "ui/uidata/wing/wing.png", function () { _this.loadConfigCom(); }, "ui/uidata/wing/wingpc.png");
        };
        WingPanel.prototype.loadConfigCom = function () {
            this.applyLoadComplete();
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.addPersonChar();
            this.initBaseUI();
            this.resize();
        };
        WingPanel.prototype.addPersonChar = function () {
            var $person2DChar = new Person2DChar();
            $person2DChar.needUIUrl = false;
            this._bgRender.addModel($person2DChar);
            this.showDisPlay = $person2DChar;
        };
        WingPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = 6.5 * UIData.Scale;
                this.showDisPlay.x = 100 * UIData.Scale;
                this.showDisPlay.y = -45 * UIData.Scale;
            }
        };
        WingPanel.prototype.initBaseUI = function () {
            // this.addUIList(["t_bg1", "t_bg2", "t_bg3"], this.winmidRender);
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "t_bg1", this._bgRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "t_bg2", this._bgRender);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "t_bg3", this._bgRender);
            this.winmidRender.applyObjData();
            this.addChild(this._bgRender.getComponent("a_rolebg"));
            var huawenbg = this.addChild(this._bgRender.getComponent("a_huawenbg"));
            var huawenbg1 = this.addChild(this._bgRender.getComponent("a_huawenbg"));
            huawenbg1.isU = true;
            huawenbg1.x = huawenbg.x - huawenbg.width;
            this.addUIList(["t_main_title", "a_namebg"], this._bgRender);
            this.titleBg = this.addChild(this._bgRender.getComponent("t_title_bg"));
            this.zLlab = this.addChild(this._baseRender.getComponent("t_zl_lab"));
            this.mainBtn = this._bgRender.getComponent("t_btn_bg");
            this.mainBtn.addEventListener(InteractiveEvent.Up, this.applyClick, this);
            this.addChild(this.mainBtn);
            this.addChild(this._baseRender.getComponent("t_bg5"));
            this.UnlockAry = new Array;
            this.UnlockAry.push(this._bgRender.getComponent("t_bg4"));
            this.wingExPer = this._bgRender.getComponent("t_pre");
            this.UnlockAry.push(this.wingExPer);
            this.wingName = this._baseRender.getComponent("t_name");
            this.addChild(this.wingName);
            this.wingZl = this._baseRender.getComponent("t_zl");
            this.addChild(this.wingZl);
            this.wingStarAry = new Array;
            for (var i = 0; i < 10; i++) {
                var star = this._baseRender.getComponent("t_star" + i);
                // this.addChild(star);
                // star.goToAndStop(1);
                // this.addChild(star);
                this.wingStarAry.push(star);
            }
            this.wingExp = this._baseRender.getComponent("t_exp");
            this.UnlockAry.push(this.wingExp);
            this.tab0 = this._bgRender.getComponent("t_tab0");
            this.addChild(this.tab0);
            this.tab0.addEventListener(InteractiveEvent.Down, this.tabClick, this);
            this.tab1 = this._bgRender.getComponent("t_tab1");
            //this.addChild(this.tab1);
            this.tab1.addEventListener(InteractiveEvent.Down, this.tabClick, this);
            this.tab1dis = this._bgRender.getComponent("t_tab_qiang_dis");
            this.showTab1();
            this.jinjiePanel = new WingJinjiePanel();
            this.jinjiePanel.parentPanel = this;
            this.jinjiePanel.setUiAtlas(this._baseUiAtlas);
            this.qianghuaPanel = new WingQianghuaPanel();
            this.qianghuaPanel.parentPanel = this;
            this.qianghuaPanel.setUiAtlas(this._baseUiAtlas);
            this.tab0RedPoint = this._redPointRender.getRedPointUI(this, 51, new Vector2D(this.tab0.x + this.tab0.width - 5, this.tab0.y));
            this.tab1RedPoint = this._redPointRender.getRedPointUI(this, 53, new Vector2D(this.tab1.x + this.tab1.width - 5, this.tab1.y));
            this.btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.mainBtn.x + this.mainBtn.width, this.mainBtn.y));
            this.drawBaseWingInfo();
        };
        WingPanel.prototype.showTab1 = function () {
            var $tb_system_basestrength = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_WING * 10 + SharedDef.MODULE_WING_STRENGTH));
            if ($tb_system_basestrength.level <= GuidData.player.getLevel()) {
                this.addChild(this.tab1);
                this.removeChild(this.tab1dis);
                this.disableqh = false;
            }
            else {
                this.removeChild(this.tab1);
                this.addChild(this.tab1dis);
                this.disableqh = true;
            }
        };
        WingPanel.prototype.applyClick = function ($e) {
            var _this = this;
            UIManager.popClikNameFun("t_btn_bg");
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._canclick) {
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, function () {
                    _this._canclick = true;
                });
                if (this._currentIdx == 0) {
                    if (this.jinjiePanel.autoplay) {
                        AlertUtil.show("当前正在自动升阶神羽，是否取消？", "提示", function (a) {
                            if (a == 1) {
                                _this.jinjiePanel.removeTick();
                            }
                        }, 2, ["是", "否"]);
                        return;
                    }
                    this.jinjiePanel.applyClick();
                }
                else {
                    this.qianghuaPanel.applyClick();
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        };
        WingPanel.prototype.showBtnBg = function (tf) {
            if (tf) {
                this.addChild(this.mainBtn);
            }
            else {
                this.removeChild(this.mainBtn);
            }
        };
        WingPanel.prototype.tabClick = function ($e) {
            switch ($e.target) {
                case this.tab0:
                    this.setSelectIdx(0);
                    break;
                case this.tab1:
                    this.setSelectIdx(1);
                    break;
            }
        };
        WingPanel.prototype.setSelectIdx = function (idx) {
            this._curTab = idx;
            this.setUiListVisibleByItem(this.UnlockAry, this._curTab == 0 && GuidData.grow.getWingIsActive());
            this.setUiListVisibleByItem(this.wingStarAry, this._curTab == 0 && GuidData.grow.getWingIsActive());
            if (!this.hasStage) {
                return;
            }
            if (idx == 0) {
                this.tab0.selected = true;
                this.tab1.selected = false;
                UIManager.getInstance().addUIContainer(this.jinjiePanel);
                UIManager.getInstance().removeUIContainer(this.qianghuaPanel);
                this.jinjiePanel.drawInfo();
                this._currentIdx = 0;
                this.btnRedPoint.bindNode(52);
                // this.setIdxBgPos(0);
            }
            else if (idx == 1) {
                if (!GuidData.grow.getWingIsActive()) {
                    this.tab0.selected = true;
                    this.tab1.selected = false;
                    this._currentIdx = 0;
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请先激活神羽", 99);
                    return;
                }
                this.tab0.selected = false;
                this.tab1.selected = true;
                UIManager.getInstance().removeUIContainer(this.jinjiePanel);
                UIManager.getInstance().addUIContainer(this.qianghuaPanel);
                this.qianghuaPanel.drawInfo();
                this._currentIdx = 1;
                this.btnRedPoint.bindNode(54);
                // this.setIdxBgPos(1);
            }
            var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
            $scenePange.data = SharedDef.MODULE_WING;
            ModuleEventManager.dispatchEvent($scenePange);
        };
        WingPanel.prototype.drawUnActiveInfo = function () {
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, 100);
            var wingInfo = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingName.skinName, wingInfo.name, 16, TextAlign.LEFT, ColorType.Brown6a4936);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingTitleJie.skinName, targetData.rank + "阶", 16, TextAlign.LEFT, ColorType.Coffeeff9200);
        };
        WingPanel.prototype.drawBaseWingInfo = function () {
            // this.setUiListVisibleByItem(this.UnlockAry,GuidData.grow.getWingIsActive());
            // this.setUiListVisibleByItem(this.wingStarAry,GuidData.grow.getWingIsActive());
            // if (!GuidData.grow.getWingIsActive()) {
            //     this.drawUnActiveInfo();
            //     return;
            // }
            this.setSelectIdx(this._curTab);
            var wingID = GuidData.grow.getWingID();
            if (wingID == 0) {
                wingID = 100;
            }
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, wingID);
            var wingInfo = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
            var nameStr = getChiNum(wingInfo.id) + "阶  " + wingInfo.name;
            if (!this.disableqh) {
                nameStr += "   +" + GuidData.grow.getWingQh();
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingName.skinName, nameStr, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            if (this.curWingID != wingInfo.id) {
                // LoadManager.getInstance().load(Scene_data.fileRoot + "/ui/load/wing/" + wingInfo.id + ".png", LoadManager.IMG_TYPE, ($img) => {
                //     var $rec: UIRectangle = this._baseUiAtlas.getRec(this.wingName.skinName);
                //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                //     ctx.drawImage($img, 0, 0, $rec.pixelWitdh, $rec.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
                //     this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                // })
                this.showDisPlay.setAvatar(wingInfo.model);
                this.curWingID = wingInfo.id;
            }
            // if (GuidData.grow.getWingIsActive()) {
            //     ArtFont.getInstance().writeFontToSkinNameCenter(this._baseUiAtlas, this.wingZl.skinName, Snum(GuidData.player.getWingForce()), ArtFont.num56)
            // } else {
            // }
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseUiAtlas, this.wingZl.skinName, Snum(getForceByAtt(targetData.attr_id, targetData.attr_value)), ArtFont.num56);
            var starStr = "";
            for (var i = 0; i < this.wingStarAry.length; i++) {
                if (targetData.star > i) {
                    this.wingStarAry[i].goToAndStop(0);
                }
                else {
                    this.wingStarAry[i].goToAndStop(1);
                }
            }
            // LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingStar.skinName, starStr, 16, TextAlign.CENTER, ColorType.Redce0a00);
            this.drawExp();
        };
        WingPanel.prototype.drawExp = function () {
            var str = "已满级";
            var ratio = 1;
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            var nextData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID() + 1);
            if (nextData) {
                str = GuidData.grow.getWingExp() + "/" + targetData.need_exp;
                ratio = GuidData.grow.getWingExp() / targetData.need_exp;
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.wingExp.skinName, str, 14, TextAlign.CENTER, ColorType.Whiteffffff, "", 0, 0, true);
            this.wingExPer.uvScale = ratio;
        };
        WingPanel.prototype.show = function (idx) {
            if (idx === void 0) { idx = 0; }
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            SceneManager.getInstance().render = false;
            if (this.tab0) {
                this.setSelectIdx(idx);
            }
            var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        };
        WingPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            UIManager.getInstance().removeUIContainer(this.jinjiePanel);
            UIManager.getInstance().removeUIContainer(this.qianghuaPanel);
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        WingPanel.prototype.wingIdChg = function () {
            if (!this._baseRender.uiAtlas) {
                return;
            }
            this.drawBaseWingInfo();
            this.jinjiePanel.drawInfo();
        };
        WingPanel.prototype.wingExpChg = function () {
            if (!this._baseRender.uiAtlas) {
                return;
            }
            this.drawExp();
            this.jinjiePanel.drawIconNum();
            this.showExpEff();
        };
        WingPanel.prototype.showExpEff = function () {
            var _this = this;
            //console.log("up skill lev");
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_cb"), 3, 4, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.x = 70;
                    _this.expEff.y = 422;
                    _this.expEff.width = _this.expEff.baseRec.width * 1.5;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    _this.expEff.speed = 5;
                    _this.expEff.playOne(_this);
                });
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        };
        WingPanel.prototype.wingLevChg = function () {
            if (!this._baseRender.uiAtlas) {
                return;
            }
            this.drawBaseWingInfo();
            this.qianghuaPanel.drawInfo();
        };
        WingPanel.prototype.showflyword = function ($str) {
            if (this.wingExPer.parent) {
                var v21d = new Vector2D(this.wingExPer.parent.x + this.wingExPer.width, this.wingExPer.y);
                var v2d = UiTweenVo.getPosByPanel(v21d, { width: UIData.designWidth, height: UIData.designHeight });
                // var v2d: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(204, 473), { width: 960, height: 540 })
                v2d.x = v2d.x * UIData.Scale;
                v2d.y = v2d.y * UIData.Scale;
                msgtip.MsgTipManager.outStr(ColorType.Yellowedce7e + "祝福值+" + $str, msgtip.PopMsgVo.type8, v2d);
            }
        };
        WingPanel.prototype.refreshItem = function () {
            if (this.jinjiePanel.hasStage) {
                this.jinjiePanel.drawIconNum();
            }
            else if (this.qianghuaPanel.hasStage) {
                this.qianghuaPanel.drawIconNum();
            }
        };
        return WingPanel;
    }(WindowUi));
    wing.WingPanel = WingPanel;
    var WingJinjiePanel = /** @class */ (function (_super) {
        __extends(WingJinjiePanel, _super);
        function WingJinjiePanel() {
            var _this = _super.call(this) || this;
            /**
             * 一键熔炼状态获取
             */
            _this._info = "";
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._redPointRender = new RedPointRender();
            _this.addRender(_this._redPointRender);
            return _this;
        }
        WingJinjiePanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
        };
        WingJinjiePanel.prototype.setUiAtlas = function ($uiatlas) {
            var _this = this;
            this._baseUiAtlas = $uiatlas;
            this._baseRender.uiAtlas = $uiatlas;
            this.addUIList(["t_line"], this._baseRender);
            this._title1 = this._baseRender.getComponent("t_lab0");
            this._title0 = this._baseRender.getComponent("t_top_title0");
            this._propAry = new Array;
            this._valAry = new Array;
            for (var i = 0; i < 7; i++) {
                var lab = this._baseRender.getComponent("t_lab" + (i + 1));
                this.addChild(lab);
                this._propAry.push(lab);
                var val = this._baseRender.getComponent("t_val" + (i + 1));
                this.addChild(val);
                this._valAry.push(val);
            }
            this._icon1 = this._baseRender.getComponent("t_icon1");
            this._icon2 = this._baseRender.getComponent("t_icon2");
            this._iconLab1 = this._baseRender.getComponent("t_icon_lab1");
            this._iconLab2 = this._baseRender.getComponent("t_icon_lab2");
            this._jinjieLab = this._baseRender.getComponent("t_sj_lab");
            this.a_limit = this._baseRender.getComponent("a_limit");
            this._btn = this._baseRender.getComponent("t_btn");
            this.addChild(this._btn);
            //this._btn.addEventListener(InteractiveEvent.Down, this.applyClick, this);
            this._btn.goToAndStop(1);
            this._jihuoLab = this._baseRender.getComponent("t_jihuo_lab");
            //this.addChild(this._jihuoLab);
            this.b_allbtn = this._baseRender.getComponent("b_allbtn");
            this.b_allbtn.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this._redPointRender.getRedPointUI(this, 135, new Vector2D(this.b_allbtn.x + this.b_allbtn.width, this.b_allbtn.y));
            this.drawInfo();
            this._tickFun = function () { _this.tickRefreshState(); };
        };
        WingJinjiePanel.prototype.addTick = function () {
            this.autoplay = true;
            this.drawBtn();
            TimeUtil.addTimeTick(1000, this._tickFun);
        };
        WingJinjiePanel.prototype.removeTick = function () {
            this.autoplay = false;
            this.drawBtn();
            TimeUtil.removeTimeTick(this._tickFun);
        };
        WingJinjiePanel.prototype.tickRefreshState = function () {
            if (!this.hasStage) {
                this.removeTick();
            }
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            if (targetData.operate_type == 1) {
                if (this._itemNeedNum > this._itemAllNum) {
                    //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "道具不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = this._itemID;
                    ModuleEventManager.dispatchEvent($aaa);
                    this.removeTick();
                    return;
                }
                if (this._costVal > GuidData.player.getResType(this._costType)) {
                    //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = this._costType;
                    ModuleEventManager.dispatchEvent($aaa);
                    this.removeTick();
                    return;
                }
                NetManager.getInstance().protocolos.wings_bless();
            }
            else {
                if (this._costVal > GuidData.player.getResType(this._costType)) {
                    //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = this._costType;
                    ModuleEventManager.dispatchEvent($aaa);
                    this.removeTick();
                    return;
                }
                NetManager.getInstance().protocolos.wings_rankup();
            }
        };
        WingJinjiePanel.prototype.applyClick = function () {
            if (GuidData.grow.getWingIsActive()) {
                var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
                if (targetData.operate_type == 1) {
                    if (this._itemNeedNum > this._itemAllNum) {
                        //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "道具不足", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = this._itemID;
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }
                    if (this._costVal > GuidData.player.getResType(this._costType)) {
                        //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = this._costType;
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }
                    NetManager.getInstance().protocolos.wings_bless();
                }
                else {
                    if (this._costVal > GuidData.player.getResType(this._costType)) {
                        //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = this._costType;
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }
                    NetManager.getInstance().protocolos.wings_rankup();
                }
            }
            else {
                NetManager.getInstance().protocolos.wings_active();
            }
        };
        WingJinjiePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_allbtn:
                    UiTweenScale.getInstance().changeButSize(this.b_allbtn);
                    var canplay = this.getsmeltallstate();
                    if (canplay) {
                        if (this.autoplay) {
                            this.removeTick();
                        }
                        else {
                            this.addTick();
                        }
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this._info + "一键升阶功能", 99);
                    }
                    break;
                default:
                    break;
            }
        };
        WingJinjiePanel.prototype.drawInfo = function () {
            if (GuidData.grow.getWingIsActive()) {
                this.drawBase();
            }
            else {
                this.drawUnActive();
                this.parentPanel.showBtnBg(true);
            }
        };
        WingJinjiePanel.prototype.drawUnActive = function () {
            if (this.b_allbtn.parent) {
                this.removeChild(this.b_allbtn);
            }
            if (!this._jihuoLab.parent) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._jihuoLab.skinName, "激活后即可拥有一阶外观", 16, TextAlign.LEFT, ColorType.Orange853d07);
                this.addChild(this._jihuoLab);
                this.addChild(this._title0);
            }
            this._btn.goToAndStop(0);
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, 100);
            //属性
            var targetForce = getForceByAtt(targetData.attr_id, targetData.attr_value);
            for (var i = 0; i < this._propAry.length; i++) {
                //getKeyProById()
                // var keyStr: string = "";
                // if (targetData.attr_id[i]) {
                //     keyStr = ColorType.Orange7a2f21 + getKeyProById(targetData.attr_id[i]) + "   " + ColorType.Orange853d07 + Snum(targetData.attr_value[i]);
                // }
                // LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._propAry[i].skinName, keyStr, 14, TextAlign.LEFT);
                UiDraw.drawAttVal(this._propAry[i], targetData.attr_id[i], targetData.attr_value[i]);
            }
        };
        /**
         * 绘制一键升级按钮
         */
        WingJinjiePanel.prototype.drawBtn = function () {
            var $rec = this.b_allbtn.uiRender.uiAtlas.getRec(this.b_allbtn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var canplay = this.getsmeltallstate();
            var usemsg;
            if (canplay) {
                usemsg = this.autoplay ? "btnbgclose" : "btnbgopen";
            }
            else {
                usemsg = "unlockbtnbg";
            }
            var imgUseRect1 = this.b_allbtn.uiRender.uiAtlas.getRec(usemsg);
            ctx.drawImage(this.b_allbtn.uiRender.uiAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            if (!canplay) {
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, this._info, 14, $rec.pixelWitdh / 2, ($rec.pixelHeight / 2) - (10), TextAlign.CENTER, ColorType.Whitefffce6);
            }
            this.b_allbtn.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        WingJinjiePanel.prototype.getsmeltallstate = function () {
            this._info = "";
            var canplay = false;
            var $smeltobj = TableData.getInstance().getData(TableData.tb_vip_uplev, 1);
            var viplev = $smeltobj["viplev"];
            if (viplev && viplev > 0) {
                //vip需求等级
                if (GuidData.player.getVipLevel() >= viplev) {
                    canplay = true;
                }
                else {
                    this._info = "VIP" + viplev;
                }
            }
            if (!canplay) {
                var rolelev = $smeltobj["rolelev"];
                if (rolelev && rolelev > 0) {
                    //角色需求等级
                    if (GuidData.player.getLevel() >= rolelev) {
                        canplay = true;
                    }
                    else {
                        if (viplev && viplev > 0) {
                            this._info += "或";
                        }
                        this._info += "Lv" + rolelev;
                    }
                }
            }
            this._info += "解锁";
            return canplay;
        };
        WingJinjiePanel.prototype.drawBase = function () {
            if (this._jihuoLab && this._jihuoLab.parent) {
                this.removeChild(this._jihuoLab);
                this._jihuoLab = null;
                this.removeChild(this._title0);
            }
            this.drawBtn();
            if (!this._title1.parent) {
                this.addChild(this._title1);
            }
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            var nextData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID() + 1);
            if (targetData.operate_type == 1) {
                this._btn.goToAndStop(1);
                this.removeChild(this.a_limit);
                if (!this._icon1.parent) {
                    this.addChild(this._icon1);
                    this.addChild(this._icon2);
                    this.addChild(this._iconLab1);
                    this.addChild(this._iconLab2);
                    this.removeChild(this._jinjieLab);
                    if (!this.b_allbtn.parent) {
                        this.addChild(this.b_allbtn);
                    }
                }
                this.parentPanel.showBtnBg(true);
            }
            else if (targetData.operate_type == 2) {
                this.removeChild(this._icon1);
                this.removeChild(this._icon2);
                this.removeChild(this._iconLab1);
                this.removeChild(this._iconLab2);
                this.addChild(this._jinjieLab);
                this.removeChild(this.a_limit);
                this._btn.goToAndStop(2);
                if (this.autoplay) {
                    this.removeTick();
                }
                if (this.b_allbtn.parent) {
                    this.removeChild(this.b_allbtn);
                }
                this.parentPanel.showBtnBg(true);
            }
            else if (targetData.operate_type == 0) {
                this.removeChild(this._icon1);
                this.removeChild(this._icon2);
                this.removeChild(this._iconLab1);
                this.removeChild(this._iconLab2);
                this.removeChild(this._jinjieLab);
                this.removeChild(this._btn);
                this.addChild(this.a_limit);
                if (this.b_allbtn.parent) {
                    this.removeChild(this.b_allbtn);
                }
                this.parentPanel.showBtnBg(false);
            }
            for (var i = 0; i < this._propAry.length; i++) {
                UiDraw.drawAttVal(this._propAry[i], targetData.attr_id[i], targetData.attr_value[i]);
                var addStr = "";
                if (nextData && nextData.attr_value[i]) {
                    UiDraw.drawAddValTop(this._valAry[i], nextData.attr_value[i] - targetData.attr_value[i]);
                }
                else {
                    LabelTextFont.clearLabel(this._baseUiAtlas, this._valAry[i].skinName);
                }
            }
            if (targetData.operate_type == 1) {
                IconManager.getInstance().drawItemIcon40(this._icon1, targetData.item_cost[0][0]);
                IconManager.getInstance().drawItemIcon40(this._icon2, targetData.money_cost[0][0]);
                this.drawIconNum();
            }
            else if (targetData.operate_type == 2) {
                this.drawCost(this._jinjieLab.skinName);
            }
        };
        WingJinjiePanel.prototype.drawIconNum = function () {
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            if (!targetData) {
                return;
            }
            if (targetData.length == 0) {
                return;
            }
            if (targetData.item_cost.length == 0) {
                return;
            }
            this._itemNeedNum = targetData.item_cost[0][1];
            this._itemAllNum = GuidData.bag.getItemCount(targetData.item_cost[0][0]);
            this._costVal = targetData.money_cost[0][1];
            this._costType = targetData.money_cost[0][0];
            this._itemID = targetData.item_cost[0][0];
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas,this._icon1.skinName,)
            UiDraw.drawResHasNumAndAllNum(this._iconLab1, targetData.item_cost[0]);
            UiDraw.drawResHasNumAndAllNum(this._iconLab2, targetData.money_cost[0]);
            // var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this._iconLab1.skinName);
            // var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            // UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
            // var str: string = this._itemAllNum + "/" + this._itemNeedNum;
            // LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, $rec.pixelWitdh - ctx.measureText(str).width - 15, 5, TextAlign.LEFT, ColorType.Orange7a2f21, "", true);
            // this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        WingJinjiePanel.prototype.drawCost = function (skin) {
            var $rec = this._baseRender.uiAtlas.getRec(skin);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 10, $rec.pixelWitdh, $rec.pixelHeight - 10), UIData.publicUi);
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            UiDraw.cxtDrawImg(ctx, UIuitl.getInstance().costtype(targetData.money_cost[0][0]), new Rectangle(5, 0, 35, 35), UIData.publicUi);
            this._costVal = targetData.money_cost[0][1];
            this._costType = targetData.money_cost[0][0];
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Orange7a2f21 + String(targetData.money_cost[0][1]), 16, $rec.pixelWitdh - 5, 13, TextAlign.RIGHT);
            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return WingJinjiePanel;
    }(UIConatiner));
    wing.WingJinjiePanel = WingJinjiePanel;
    var WingQianghuaPanel = /** @class */ (function (_super) {
        __extends(WingQianghuaPanel, _super);
        function WingQianghuaPanel() {
            var _this = _super.call(this) || this;
            _this.width = 960;
            _this.height = 540;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            return _this;
        }
        WingQianghuaPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
        };
        WingQianghuaPanel.prototype.setUiAtlas = function ($uiatlas) {
            this._baseUiAtlas = $uiatlas;
            this._baseRender.uiAtlas = $uiatlas;
            this.addUIList(["t_top_title2", "t_line2"], this._baseRender);
            this._qhLev = this._baseRender.getComponent("t_qianghua_lev");
            this.addChild(this._qhLev);
            this._qhNextLev = this._baseRender.getComponent("t_qianghua_nextlev");
            this.addChild(this._qhNextLev);
            this.a_arrow = this._baseRender.getComponent("a_arrow");
            this.addChild(this.a_arrow);
            this.aA_limit = this._baseRender.getComponent("a_limit");
            this._propAry = new Array;
            this._valAry = new Array;
            for (var i = 0; i < 7; i++) {
                var lab = this._baseRender.getComponent("t_lab" + (i + 1) + "_qh");
                this.addChild(lab);
                this._propAry.push(lab);
                var val = this._baseRender.getComponent("t_val" + (i + 1) + "_qh");
                this.addChild(val);
                this._valAry.push(val);
            }
            this._icon1 = this._baseRender.getComponent("t_icon1_qh");
            this.addChild(this._icon1);
            this._icon2 = this._baseRender.getComponent("t_icon2_qh");
            this.addChild(this._icon2);
            this._iconLab1 = this._baseRender.getComponent("t_icon_lab1_qh");
            this.addChild(this._iconLab1);
            this._iconLab2 = this._baseRender.getComponent("t_icon_lab2_qh");
            this.addChild(this._iconLab2);
            this._btn = this._baseRender.getComponent("t_btn_qh");
            //this._btn.addEventListener(InteractiveEvent.Down, this.btnClick, this);
            this.addChild(this._btn);
            this._btn.goToAndStop(3);
            //this._qhLab1 = this._baseRender.getComponent("t_qianghua_lab1");
            //this.addChild(this._qhLab1);
            //this._qhLab2 = this._baseRender.getComponent("t_qianghua_lab2");
            //this.addChild(this._qhLab2);
            this._qhLab3 = this._baseRender.getComponent("t_qianghua_lab3");
            this.addChild(this._qhLab3);
            //this._qhVal1 = this._baseRender.getComponent("t_qianghua_val1");
            //this.addChild(this._qhVal1);
            //this._qhVal2 = this._baseRender.getComponent("t_qianghua_val2");
            //this.addChild(this._qhVal2);
            this._qhVal3 = this._baseRender.getComponent("t_qianghua_val3");
            this.addChild(this._qhVal3);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLab1.skinName, "当前强化加成:", 14, TextAlign.LEFT, ColorType.Orange7a2f21);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLab2.skinName, "下级强化加成:", 14, TextAlign.LEFT, ColorType.Orange7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLab3.skinName, "当前成功率:", 14, TextAlign.LEFT, ColorType.Orange7a2f21);
            this.drawInfo();
        };
        WingQianghuaPanel.prototype.applyClick = function () {
            if (this._itemNeedNum > this._itemAllNum) {
                //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "道具不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = this._itemID;
                ModuleEventManager.dispatchEvent($aaa);
                return;
            }
            if (this._costVal > GuidData.player.getResType(this._costType)) {
                //msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._costType) + "不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = this._costType;
                ModuleEventManager.dispatchEvent($aaa);
                return;
            }
            NetManager.getInstance().protocolos.wings_strength();
        };
        WingQianghuaPanel.prototype.drawInfo = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhLev.skinName, ColorType.Orange7a2f21 + "强化:" + ColorType.Orange9a683f + GuidData.grow.getWingQh(), 16, TextAlign.LEFT);
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            if (!targetData) {
                return;
            }
            var curQuData = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh());
            var nextQhData = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
            //尚未处理 nextQhData = null 的情况
            // if(!curQuData){
            //     return;
            // }
            for (var i = 0; i < this._propAry.length; i++) {
                //var keyStr: string = "";
                var addStr = "";
                if (targetData.attr_id[i]) {
                    // var impove: number = 0;
                    // if (curQuData) {
                    //     impove = curQuData.improve;
                    // }
                    if (curQuData) {
                        UiDraw.drawAttVal(this._propAry[i], curQuData.attr_id[i], curQuData.attr_value[i]);
                        if (nextQhData) {
                            UiDraw.drawAddValRight(this._valAry[i], nextQhData.attr_value[i]);
                        }
                        else {
                            // UiDraw.drawAddValRight(this._valAry[i], 0);
                            UiDraw.clearUI(this._valAry[i]);
                        }
                    }
                    else if (nextQhData) {
                        UiDraw.drawAttVal(this._propAry[i], nextQhData.attr_id[i], 0);
                        UiDraw.drawAddValRight(this._valAry[i], nextQhData.attr_value[i]);
                    }
                }
                else {
                    UiDraw.clearUI(this._propAry[i]);
                    UiDraw.clearUI(this._valAry[i]);
                }
            }
            if (nextQhData) {
                //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhVal1.skinName, (curQuData ? float2int(curQuData.improve / 100) : 0) + "%", 14, TextAlign.RIGHT, ColorType.color4392ff);
                //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhVal2.skinName, (nextQhData ? float2int(nextQhData.improve / 100) : 0) + "%", 14, TextAlign.RIGHT, ColorType.color4392ff);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhVal3.skinName, (nextQhData ? float2int(nextQhData.possibility / 100) : 0) + "%", 14, TextAlign.RIGHT, ColorType.color4392ff);
                IconManager.getInstance().drawItemIcon40(this._icon1, nextQhData.item_cost[0][0]);
                IconManager.getInstance().drawItemIcon40(this._icon2, nextQhData.money_cost[0][0]);
                this.drawIconNum();
                //this.drawCost(this._iconLab2.skinName);
                this.parentPanel.showBtnBg(true);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._qhNextLev.skinName, ColorType.Orange7a2f21 + "强化:" + ColorType.Orange9a683f + (GuidData.grow.getWingQh() + 1), 16, TextAlign.RIGHT);
            }
            else {
                this.removeChild(this._qhVal1);
                this.removeChild(this._qhVal2);
                this.removeChild(this._qhVal3);
                this.removeChild(this._icon1);
                this.removeChild(this._icon2);
                this.removeChild(this._iconLab1);
                this.removeChild(this._iconLab2);
                this.removeChild(this._qhLab1);
                this.removeChild(this._qhLab2);
                this.removeChild(this._qhLab3);
                this.removeChild(this._btn);
                this.removeChild(this._qhNextLev);
                this.removeChild(this.a_arrow);
                this.parentPanel.showBtnBg(false);
                this.addChild(this.aA_limit);
            }
        };
        WingQianghuaPanel.prototype.drawIconNum = function () {
            var nextQhData = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
            if (!nextQhData) {
                return;
            }
            this._itemNeedNum = nextQhData.item_cost[0][1];
            this._itemAllNum = GuidData.bag.getItemCount(nextQhData.item_cost[0][0]);
            this._itemID = nextQhData.item_cost[0][0];
            this._costType = nextQhData.money_cost[0][0];
            this._costVal = nextQhData.money_cost[0][1];
            UiDraw.drawResHasNumAndAllNum(this._iconLab1, nextQhData.item_cost[0]);
            UiDraw.drawResHasNumAndAllNum(this._iconLab2, nextQhData.money_cost[0]);
        };
        WingQianghuaPanel.prototype.drawCost = function (skin) {
            var $rec = this._baseRender.uiAtlas.getRec(skin);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
            var nextQhData = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
            UiDraw.drawCost(ctx, 5, 2, nextQhData.money_cost[0][0]);
            this._costVal = nextQhData.money_cost[0][1];
            this._costType = nextQhData.money_cost[0][0];
            var str = "" + nextQhData.money_cost[0][1];
            LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, $rec.pixelWitdh - ctx.measureText(str).width - 15, 5, TextAlign.LEFT, ColorType.Orange7a2f21, "", true);
            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return WingQianghuaPanel;
    }(UIConatiner));
    wing.WingQianghuaPanel = WingQianghuaPanel;
})(wing || (wing = {}));
//# sourceMappingURL=WingPanel.js.map