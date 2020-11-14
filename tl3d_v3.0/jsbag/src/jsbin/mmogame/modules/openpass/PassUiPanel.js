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
var pass;
(function (pass) {
    var OpenpassCell = /** @class */ (function () {
        function OpenpassCell() {
        }
        OpenpassCell.prototype.clearUi = function () {
            this.parent.setUiListVisibleByItem([this.pic, this.tittle, this.bg, this.pass_icon, this.arrow], false);
        };
        OpenpassCell.prototype.addUi = function () {
            this.parent.setUiListVisibleByItem([this.pic, this.tittle, this.bg], true);
        };
        OpenpassCell.prototype.setPost = function ($pos) {
            this.pic.x = $pos[0];
            this.pic.y = $pos[1];
            this.tittle.x = this.pic.x - 8;
            this.tittle.y = this.pic.y + 112;
            this.bg.x = this.pic.x - 18;
            this.bg.y = this.pic.y + 110;
            this.pass_icon.x = this.pic.x + 6;
            this.pass_icon.y = this.pic.y + 16;
            this.arrow.x = this.pic.x + 20;
            this.arrow.y = this.pic.y + 7;
        };
        return OpenpassCell;
    }());
    pass.OpenpassCell = OpenpassCell;
    var PassUiPanel = /** @class */ (function (_super) {
        __extends(PassUiPanel, _super);
        function PassUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._boxRender = new UIRenderComponent;
            _this.addRender(_this._boxRender);
            _this._boxstateRender = new UIRenderComponent;
            _this.addRender(_this._boxstateRender);
            _this._unlockbgRender = new UIRenderComponent;
            _this.addRender(_this._unlockbgRender);
            _this._unlockarrowRender = new UIRenderComponent;
            _this.addRender(_this._unlockarrowRender);
            _this._unlockiconRender = new UIRenderComponent;
            _this.addRender(_this._unlockiconRender);
            _this._unlockinfobgRender = new UIRenderComponent;
            _this.addRender(_this._unlockinfobgRender);
            _this._unlockinfoRender = new UIRenderComponent;
            _this.addRender(_this._unlockinfoRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        PassUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._boxRender.dispose();
            this._boxRender = null;
            this._boxstateRender.dispose();
            this._boxstateRender = null;
            this._unlockbgRender.dispose();
            this._unlockbgRender = null;
            this._unlockarrowRender.dispose();
            this._unlockarrowRender = null;
            this._unlockiconRender.dispose();
            this._unlockiconRender = null;
            this._unlockinfobgRender.dispose();
            this._unlockinfobgRender = null;
            this._unlockinfoRender.dispose();
            this._unlockinfoRender = null;
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            _super.prototype.dispose.call(this);
        };
        PassUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._roleRender.uiAtlas.setInfo("ui/uidata/openpass/openpass.xml", "ui/uidata/openpass/openpass.png", function () { _this.loadConfigCom(); });
        };
        PassUiPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this._boxstateRender.uiAtlas = this._roleRender.uiAtlas;
            this._boxRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockbgRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockarrowRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockiconRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockinfobgRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockinfoRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.initData();
            this.initBoxUI();
            this.initUnlockUI();
            this._updateFun = function () {
                _this.updateY();
            };
            this.resize();
            this.applyLoadComplete();
        };
        PassUiPanel.prototype.initUnlockUI = function () {
            this.UnlockAry = new Array;
            var d_namebg1 = this.addChild(this._unlockinfobgRender.getComponent("d_namebg1"));
            d_namebg1.isU = true;
            this.UnlockAry.push(this._unlockiconRender.getComponent("d_icon"));
            this.UnlockAry.push(this._unlockinfoRender.getComponent("d_name"));
            this.UnlockAry.push(this._unlockinfoRender.getComponent("d_info"));
            this.UnlockAry.push(this._unlockinfobgRender.getComponent("d_namebg0"));
            this.UnlockAry.push(d_namebg1);
            this.UnlockAry.push(this._unlockarrowRender.getComponent("d_iconbg"));
            this.closeBtn = this.addEvntButUp("e_close", this._unlockinfoRender);
            var basebg = this._unlockbgRender.getComponent("d_basebg");
            basebg.addEventListener(InteractiveEvent.Up, function () { }, this);
            basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
            this.UnlockAry.push(basebg);
        };
        PassUiPanel.prototype.initData = function () {
            //添加UI控件初始化
            this.addChild(this._bgRender.getComponent("a_title"));
            this.a_chapter = this.addChild(this._topRender.getComponent("a_chapter"));
            var a_chapterbg1 = this.addChild(this._bgRender.getComponent("a_chapterbg1"));
            a_chapterbg1.isU = true;
            this.addChild(this._bgRender.getComponent("a_chapterbg"));
            this.right_arrow = this.addEvntButUp("a_arrow1", this._unlockarrowRender);
            this.right_arrow.isU = true;
            this.left_arrow = this.addEvntButUp("a_arrow", this._unlockarrowRender);
            this.mapIconUiList = new Array();
            for (var i = 0; i < 6; i++) {
                var $vo = new OpenpassCell();
                $vo.idex = i;
                $vo.pic = this._roleRender.getComponent("a_chart_frame");
                $vo.pic.goToAndStop(i);
                $vo.pass_icon = this._topRender.getComponent("a_pass_icon");
                $vo.tittle = this._topRender.getComponent("a_tittle_frame");
                $vo.tittle.goToAndStop(i);
                $vo.bg = this._roleRender.getComponent("a_txt_bg");
                $vo.arrow = this._topRender.getComponent("w_cur");
                $vo.parent = this;
                this.mapIconUiList.push($vo);
            }
        };
        PassUiPanel.prototype.buildFram = function () {
            var _this = this;
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, function ($ary) {
                    _this.effAry = $ary;
                    for (var i = 0; i < _this.effAry.length; i++) {
                        _this.effAry[i].x = _this.boxAry[i].x - 25;
                        _this.effAry[i].y = _this.boxAry[i].y - 20;
                        _this.effAry[i].width = _this.effAry[i].baseRec.width * 0.9;
                        _this.effAry[i].height = _this.effAry[i].baseRec.height * 0.8;
                        _this.effAry[i].speed = 3;
                    }
                    _this.playEff();
                }, this.boxAry.length);
            }
        };
        PassUiPanel.prototype.playEff = function () {
            if (!this.effAry) {
                return;
            }
            for (var i = 0; i < this.boxAry.length; i++) {
                var vo = this.boxAry[i].data;
                if (vo) {
                    if (this.boxAry[i].current > 0 && vo.canbuy) {
                        this.addChild(this.effAry[i]);
                        this.effAry[i].play();
                    }
                    else {
                        this.removeChild(this.effAry[i]);
                    }
                }
            }
        };
        PassUiPanel.prototype.initBoxUI = function () {
            this.a_pro = this.addChild(this._roleRender.getComponent("a_pro"));
            this.addUIList(["a_huawen", "a_2", "a_4", "a_6"], this._topRender);
            this.addUIList(["a_boxbg", "a_probg"], this._bgRender);
            this.boxAry = new Array;
            this.boxstaAry = new Array;
            for (var i = 0; i < 3; i++) {
                var boxui = this.addChild(this._boxRender.getComponent("a_box" + i));
                boxui.goToAndStop(0);
                this.boxAry.push(boxui);
                this.boxstaAry.push(this._boxstateRender.getComponent("a_ok" + i));
            }
            this.buildFram();
        };
        PassUiPanel.prototype.resize = function () {
            // if (this.UnlockAry[6] && this.UnlockAry[6].parent) {
            //     this.UnlockAry[6].top = 0
            //     this.UnlockAry[6].left = 0
            //     this.UnlockAry[6].y = 0;
            //     this.UnlockAry[6].x = 0;
            //     this.UnlockAry[6].height = Scene_data.stageHeight / UIData.Scale;
            //     this.UnlockAry[6].width = Scene_data.stageWidth / UIData.Scale;
            // }
            _super.prototype.resize.call(this);
        };
        PassUiPanel.prototype.drawMapIcon = function ($vo, $tab) {
            var _this = this;
            var $iconUrl;
            if (GuidData.player.getCurPassId() + 1 >= $tab["id"]) {
                $iconUrl = "ui/load/adventure/icon/1.png";
            }
            else {
                $iconUrl = "ui/load/adventure/icon/2.png";
            }
            LoadManager.getInstance().load(Scene_data.fileRoot + $iconUrl, LoadManager.IMG_TYPE, function ($img) {
                var $toRect = $vo.pic.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                $vo.pic.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
            //如果通关了
            this.setUiListVisibleByItem([$vo.pass_icon], GuidData.player.getCurPassId() + 1 > $tab["id"]);
            this.drawLabelTittle($vo.tittle, $tab["name"]);
            $vo.setPost($tab["iconpos"]);
            //当前位置
            if (GuidData.player.getCurPassId() + 1 == $tab["id"]) {
                this.setUiListVisibleByItem([$vo.arrow], true);
                this._curCell = $vo;
                this._lastY = $vo.arrow.y;
                TimeUtil.addFrameTick(this._updateFun);
                $vo.pic.data = $tab;
                $vo.pic.addEventListener(InteractiveEvent.Up, this.click, this);
            }
            else {
                this.setUiListVisibleByItem([$vo.arrow], false);
                $vo.pic.removeEventListener(InteractiveEvent.Up, this.click, this);
            }
        };
        PassUiPanel.prototype.drawLabelTittle = function ($ui, $txt) {
            var $skillrec = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whitefffce6 + $txt, 16, 0, 0, TextAlign.CENTER);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        PassUiPanel.prototype.refreshCell = function () {
            var $chapterobj = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_chapter.skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
            this.loadBigPicByUrl("ui/load/adventure/" + $chapterobj["back"] + ".jpg");
            var $stages = $chapterobj["stages"];
            for (var k = 0; k < this.mapIconUiList.length; k++) {
                var stagetab = TableData.getInstance().getData(TableData.tb_instance_stage, $stages[k]);
                if (stagetab) {
                    this.mapIconUiList[k].addUi();
                    this.drawMapIcon(this.mapIconUiList[k], stagetab);
                }
                else {
                    this.mapIconUiList[k].clearUi();
                }
            }
        };
        PassUiPanel.prototype.getOpenstate = function ($val) {
            var $chapterobj = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, $val);
            var levstate = $chapterobj["limLev"] <= GuidData.player.getLevel();
            var passstate = $chapterobj["stages"][0] - 1 <= GuidData.player.getCurPassId();
            //console.log("-----levstate-----", levstate, passstate);
            if (levstate && passstate) {
                return true;
            }
            else {
                return false;
            }
        };
        PassUiPanel.prototype.refreshBox = function () {
            var $chapterobj = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId);
            var ary = GuidData.instanceData.getOpenPassBoxReceiveAry();
            for (var i = 0; i < $chapterobj["bonuses"].length; i++) {
                var idx = (this.curchapterId - 1) * 3 + i;
                var $bonusobj = TableData.getInstance().getData(TableData.tb_instance_stage_bonus, $chapterobj["bonuses"][i]);
                var vo = new pass.BoxVo();
                vo.id = idx;
                vo.title = 0;
                vo.canbuy = $bonusobj["stage"] <= GuidData.player.getCurPassId();
                // if ($vo.needpass > GuidData.player.getCurPassId()) {
                vo.rewardary = $bonusobj["reward"];
                this.drawBox(i, ary[idx], vo);
            }
            //进度条
            var stagesary = $chapterobj["stages"];
            if (GuidData.player.getCurPassId() >= stagesary[stagesary.length - 1]) {
                this.a_pro.uvScale = 1;
            }
            else if (GuidData.player.getCurPassId() < stagesary[0]) {
                this.a_pro.uvScale = 0;
            }
            else {
                var aaa = GuidData.player.getCurPassId() % 6;
                var ratio = aaa / 6;
                this.a_pro.uvScale = ratio;
            }
            this.playEff();
        };
        PassUiPanel.prototype.drawBox = function ($index, $flag, $vo) {
            this.setUiListVisibleByItem([this.boxstaAry[$index]], $flag);
            if (!$flag) {
                //判断是未达到条件，还是等待领取
                this.boxAry[$index].addEventListener(InteractiveEvent.Up, this.boxcilck, this);
                this.boxAry[$index].goToAndStop($index + 1);
                //data里放置需达到关卡的id
                this.boxAry[$index].data = $vo;
                // if ($vo.needpass <= GuidData.player.getCurPassId()) {
                //     //关卡达成 动效
                // }
            }
            else {
                this.boxAry[$index].goToAndStop(0);
                this.boxAry[$index].removeEventListener(InteractiveEvent.Up, this.boxcilck, this);
            }
        };
        PassUiPanel.prototype.refreshUnlock = function () {
            var $chapterobj = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId - 1);
            var $newobj = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId);
            if ($chapterobj) {
                var stagesary = $chapterobj["stages"];
                if (GuidData.player.getCurPassId() >= stagesary[stagesary.length - 1]) {
                    if ($newobj["limLev"] > GuidData.player.getLevel()) {
                        this.setUiListVisibleByItem(this.UnlockAry, true);
                        this._bgRender.uiAtlas.upDataPicToTexture("ui/load/adventure/icon/2.png", this.UnlockAry[0].skinName);
                        LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[2].skinName, "Lv" + $newobj["limLev"] + " 解锁", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                        LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[1].skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                    }
                    else {
                        this.setUiListVisibleByItem(this.UnlockAry, false);
                    }
                }
                else {
                    this.setUiListVisibleByItem(this.UnlockAry, true);
                    this._bgRender.uiAtlas.upDataPicToTexture("ui/load/adventure/icon/2.png", this.UnlockAry[0].skinName);
                    LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[2].skinName, "通关前置章节后开启", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                    LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[1].skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                }
            }
            else {
                this.setUiListVisibleByItem(this.UnlockAry, false);
            }
        };
        Object.defineProperty(PassUiPanel.prototype, "curchapterId", {
            get: function () {
                return this._curchapterId;
            },
            set: function ($val) {
                this._curchapterId = $val;
                this.setUiListVisibleByItem([this.left_arrow], $val != 1);
                this.setUiListVisibleByItem([this.right_arrow], this.getOpenstate($val));
                this.refreshCell();
                this.refreshBox();
                this.refreshUnlock();
            },
            enumerable: true,
            configurable: true
        });
        PassUiPanel.prototype.showSysOpenEff = function () {
            var _this = this;
            this.setUiListVisibleByItem(this.UnlockAry, true);
            this._bgRender.uiAtlas.upDataPicToTexture("ui/load/adventure/icon/1.png", this.UnlockAry[0].skinName);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[2].skinName, "新章节开启中", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[1].skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
            GameMouseManager.getInstance().useMouseEvent = false;
            var topos = UiTweenVo.getPosByPanel(new Vector2D(84, 77), { width: UIData.designWidth, height: UIData.designHeight, center: 0, middle: 0 }, this);
            TimeUtil.addTimeOut(1500, function () {
                TweenMoveTo(_this.UnlockAry[0], 0.6, { x: topos.x, y: topos.y, onComplete: function () { _this.changeButEnd(); } });
            });
        };
        PassUiPanel.prototype.changeButEnd = function () {
            GameMouseManager.getInstance().useMouseEvent = true;
            this.UnlockAry[0].x = 436;
            this.UnlockAry[0].y = 194;
            this.setUiListVisibleByItem(this.UnlockAry, false);
        };
        PassUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            //当前章节id
            var bbb = TableData.getInstance().getData(TableData.tb_instance_stage, GuidData.player.getCurPassId() + 1);
            //console.log("=====GuidData.player.getCurPassId()=====", bbb);
            if (bbb) {
                this._maxflag = false;
                this.curchapterId = bbb["chapterId"];
            }
            else {
                this._maxflag = true;
                this.curchapterId = TableData.getInstance().getData(TableData.tb_instance_stage, GuidData.player.getCurPassId())["chapterId"];
            }
            this.resize();
        };
        PassUiPanel.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
        };
        PassUiPanel.prototype.hide = function () {
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        };
        PassUiPanel.prototype.boxcilck = function (evt) {
            var $eee = new pass.PassEvent(pass.PassEvent.SHOW_BOXREWARD_PANEL);
            $eee.data = evt.target.data;
            $eee.SubmitFun = function (value) {
                NetManager.getInstance().protocolos.pick_stage_instance_bonus(evt.target.data.id);
            };
            ModuleEventManager.dispatchEvent($eee);
        };
        PassUiPanel.prototype.click = function (evt) {
            var $eee = new pass.PassEvent(pass.PassEvent.SHOW_BOSS_PANEL);
            $eee.data = evt.target.data;
            ModuleEventManager.dispatchEvent($eee);
            UIManager.popClikNameFun("a_chart_frame");
        };
        PassUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.closeBtn:
                    ModuleEventManager.dispatchEvent(new pass.PassEvent(pass.PassEvent.HIDE_PASS_PANEL));
                    break;
                case this.right_arrow:
                    var $chapterobj = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId + 1);
                    if ($chapterobj) {
                        this.curchapterId++;
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "敬请期待...", 99);
                    }
                    break;
                case this.left_arrow:
                    this.curchapterId--;
                    break;
                default:
                    break;
            }
        };
        PassUiPanel.prototype.updateY = function () {
            var ypos = Math.sin(TimeUtil.getTimer() / 250) * 5;
            if (!this._curCell.arrow.parent) {
                return;
            }
            this._curCell.arrow.y = this._lastY + ypos;
        };
        return PassUiPanel;
    }(WindowUi));
    pass.PassUiPanel = PassUiPanel;
})(pass || (pass = {}));
//# sourceMappingURL=PassUiPanel.js.map