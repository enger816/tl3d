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
var strengthgem;
(function (strengthgem) {
    var NewStrengUiPanel = /** @class */ (function (_super) {
        __extends(NewStrengUiPanel, _super);
        function NewStrengUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._publicbguiRender = new UIRenderComponent;
            _this.addRender(_this._publicbguiRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        NewStrengUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.strengTab0) {
                this.strengTab0.dispose();
                this.strengTab0 = null;
            }
            if (this.strengTab1) {
                this.strengTab1.dispose();
                this.strengTab1 = null;
            }
            if (this.strengTab2) {
                this.strengTab2.dispose();
                this.strengTab2 = null;
            }
            if (this.strengTab3) {
                this.strengTab3.dispose();
                this.strengTab3 = null;
            }
            if (this._redPointRender) {
                this._redPointRender.dispose();
                this._redPointRender = null;
            }
            _super.prototype.dispose.call(this);
        };
        NewStrengUiPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/streng/newstreng.xml", "ui/uidata/streng/newstreng.png", function () { _this.loadConfigCom(); }, "ui/uidata/streng/strengthuse.png");
            // });
        };
        NewStrengUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._baseRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        NewStrengUiPanel.prototype.initData = function () {
            this.TabAry = new Array;
            for (var i = 0; i < 4; i++) {
                var a = this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = SharedDef.MODULE_MIX_STRENGTH + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
                this._redPointRender.getRedPointUI(this, 38 + i * 3, new Vector2D(a.x + a.width - 5, a.y));
            }
            this.MasterUIAry = new Array;
            this.MasterUIAry.push(this._baseRender.getComponent("b_txtbg1"));
            this.t_rewardBtn = this.addEvntButUp("t_rewardBtn", this._roleRender);
            this.MasterUIAry.push(this.t_rewardBtn);
            this.MasterUIAry.push(this._roleRender.getComponent("t_curlev"));
            this.MasterUIAry.push(this._roleRender.getComponent("e_force"));
            this.MasterUIAry.push(this._roleRender.getComponent("t_name"));
            this.MasterUIAry.push(this._bgRender.getComponent("e_bg"));
            this.MasterUIAry.push(this._baseRender.getComponent("b_txtbg0"));
            this.UnlockUIAry = new Array;
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock1);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock2);
            this.t_unlock3 = this.addEvntBut("t_unlock3", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock3);
            this.OtherBgUIAry = new Array;
            this.OtherBgUIAry.push(this._bgRender.getComponent("t_bgleft"));
            this.OtherBgUIAry.push(this._bgRender.getComponent("t_bgcenter"));
            this.OtherBgUIAry.push(this._bgRender.getComponent("t_bgright"));
            this.OtherBgUIAry.push(this._roleRender.getComponent("t_huawenright"));
            var t_huawenleft = this._roleRender.getComponent("t_huawenleft");
            t_huawenleft.isU = true;
            this.OtherBgUIAry.push(t_huawenleft);
            this.OtherBgUIAry.push(this._roleRender.getComponent("t_huawen1right"));
            var t_huawen1left = this._roleRender.getComponent("t_huawen1left");
            t_huawen1left.isU = true;
            this.OtherBgUIAry.push(t_huawen1left);
            this._roleRender.applyObjData();
            this.OtherBgUIAry.push(this._baseRender.getComponent("t_uparrow"));
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);
            var cnew_bg_yellow = this.addChild(this.winmidRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._roleRender);
            this.winmidRender.applyObjData();
            // this.addUIList(["a_titlt", "a_line1", "t_mountshadow", "a_namebg"], this._roleRender)
            this.addUIList(["t_title", "t_equBg"], this._bgRender);
            this.addUIList(["t_line"], this._baseRender);
        };
        NewStrengUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        NewStrengUiPanel.prototype.refreshOpenLev = function () {
            var tabsysary = new Array;
            //读表，判断解锁情况
            for (var j = 0; j < SharedDef.MODULE_MIX_WASH; j++) {
                var $tb_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_MIX * 10 + j + 1));
                tabsysary.push($tb_system_base);
            }
            for (var i = 0; i < tabsysary.length; i++) {
                if (tabsysary[i].level <= GuidData.player.getLevel()) {
                    this.setUiListVisibleByItem([this.TabAry[i]], true);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                }
                else {
                    this.setUiListVisibleByItem([this.TabAry[i]], false);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
                    this.UnlockUIAry[i].data = tabsysary[i];
                }
            }
        };
        NewStrengUiPanel.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.refreshOpenLev();
            this.selectedTab($data);
        };
        NewStrengUiPanel.prototype.hide = function () {
            if (this.strengTab3) {
                if (!this.strengTab3.canshowAlert()) {
                    return;
                }
            }
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        };
        NewStrengUiPanel.prototype.selectedTab = function ($value) {
            this._lastvalue = $value;
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            //公共背景显隐逻辑
            this.setUiListVisibleByItem(this.OtherBgUIAry, $value != SharedDef.MODULE_MIX_GEM);
            this.setUiListVisibleByItem(this.MasterUIAry, $value != SharedDef.MODULE_MIX_WASH);
            this.hideTabPage($value);
            this.showTabPage($value);
        };
        NewStrengUiPanel.prototype.drawPage = function () {
            var ary = GuidData.grow.getMasterLevVo();
            var $nextobj = TableData.getInstance().getData(TableData.tb_equipdevelop_bonus, (this._type + 1) * 100 + ary[this._type] + 1);
            var prop;
            if ($nextobj) {
                //未满级
                this.setUiListVisibleByItem([this.MasterUIAry[6]], true);
                var $v = Math.floor((GuidData.player.getCharType() - 1) / 2);
                if ($v == 0) {
                    prop = $nextobj["props0"];
                }
                if ($v == 1) {
                    prop = $nextobj["props1"];
                }
                if ($v == 2) {
                    prop = $nextobj["props2"];
                }
                var att_id = new Array;
                var att_val = new Array;
                for (var i = 0; i < prop.length; i++) {
                    att_id.push(prop[i][0]);
                    att_val.push(prop[i][1]);
                }
                var force = getForceByAtt(att_id, att_val);
                var maxLev;
                var targetLev = 0;
                var $value = (this._type + 1);
                if ($value == SharedDef.MODULE_MIX_STRENGTH) {
                    maxLev = 10;
                    for (var i = 0; i < 10; i++) {
                        if ($nextobj["need_lv"][0] <= GuidData.grow.getPartStrengLev(i + 1)) {
                            targetLev++;
                        }
                    }
                    // targetLev  maxLev
                }
                else if ($value == SharedDef.MODULE_MIX_POLISHED) {
                    maxLev = 10;
                    for (var i = 0; i < 10; i++) {
                        if ($nextobj["need_lv"][0] <= GuidData.grow.getPartRefineVo(i + 1)[1]) {
                            targetLev++;
                        }
                    }
                }
                else if ($value == SharedDef.MODULE_MIX_GEM) {
                    maxLev = $nextobj["need_lv"][0];
                    for (var i = 0; i < 10; i++) {
                        var gemlevary = GuidData.grow.getPartGemVo(i + 1);
                        for (var k = 0; k < gemlevary.length; k++) {
                            targetLev += gemlevary[k];
                        }
                    }
                }
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + "进度: " + targetLev + "/" + maxLev, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[3].skinName, ColorType.color802626 + "战力: +" + Snum(force), 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[4].skinName, ColorType.color802626 + $nextobj["desc"], 14, TextAlign.CENTER);
                //console.log("-----maxLev----", maxLev, targetLev);
            }
            else {
                //满级
                UiDraw.clearUI(this.MasterUIAry[4]);
                UiDraw.clearUI(this.MasterUIAry[2]);
                this.setUiListVisibleByItem([this.MasterUIAry[6]], false);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[3].skinName, ColorType.color802626 + strengthgem.StrengUtil.KeyNameByType[this._type] + ":" + ary[this._type] + "级", 14, TextAlign.LEFT);
            }
        };
        NewStrengUiPanel.prototype.showTabPage = function ($value) {
            this._type = $value - 1; //比value少1
            switch ($value) {
                case SharedDef.MODULE_MIX_STRENGTH:
                    if (!this.strengTab0) {
                        this.strengTab0 = new strengthgem.StrengTab0();
                        this.strengTab0.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab0.parent = this;
                    }
                    this.strengTab0.show();
                    this.drawPage();
                    // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[0] + ":" + ary[0] + "级", 14, TextAlign.CENTER);
                    break;
                case SharedDef.MODULE_MIX_POLISHED:
                    if (!this.strengTab1) {
                        this.strengTab1 = new strengthgem.StrengTab1();
                        this.strengTab1.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab1.parent = this;
                    }
                    this.strengTab1.show();
                    this.drawPage();
                    // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[1] + ":" + ary[1] + "级", 14, TextAlign.CENTER);
                    break;
                case SharedDef.MODULE_MIX_GEM:
                    if (!this.strengTab2) {
                        this.strengTab2 = new strengthgem.StrengTab2();
                        this.strengTab2.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab2.parent = this;
                    }
                    this.strengTab2.show();
                    this.drawPage();
                    // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[2] + ":" + ary[2] + "级", 14, TextAlign.CENTER);
                    break;
                case SharedDef.MODULE_MIX_WASH:
                    if (!this.strengTab3) {
                        this.strengTab3 = new strengthgem.StrengTab3();
                        this.strengTab3.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab3.parent = this;
                    }
                    this.strengTab3.show();
                    break;
                default:
                    break;
            }
        };
        NewStrengUiPanel.prototype.hideTabPage = function ($value) {
            if ($value === void 0) { $value = -1; }
            switch ($value) {
                case SharedDef.MODULE_MIX_STRENGTH:
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
                case SharedDef.MODULE_MIX_POLISHED:
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
                case SharedDef.MODULE_MIX_GEM:
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
                case SharedDef.MODULE_MIX_WASH:
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    break;
                default:
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
            }
        };
        // public refreshCurMasterLev() {
        //     var ary = GuidData.grow.getMasterLevVo();
        //     LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[this._type] + ":" + ary[this._type] + "级", 14, TextAlign.CENTER);
        // }
        NewStrengUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.HIDE_STRENGTHGEM_PANEL));
                    break;
                case this.t_rewardBtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var $evttt = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.SHOW_MASTER_TIPS_EVENT);
                    $evttt.data = this._lastvalue;
                    ModuleEventManager.dispatchEvent($evttt);
                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock1.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock2.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock3:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock3.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        };
        NewStrengUiPanel.prototype.click = function (evt) {
            if (this.strengTab3) {
                if (!this.strengTab3.canshowAlert()) {
                    //tab按钮状态设置
                    for (var i = 0; i < this.TabAry.length; i++) {
                        if (i == 3) {
                            this.TabAry[i].selected = true;
                        }
                        else {
                            this.TabAry[i].selected = false;
                        }
                    }
                    return;
                }
            }
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        };
        return NewStrengUiPanel;
    }(WindowUi));
    strengthgem.NewStrengUiPanel = NewStrengUiPanel;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=NewStrengUiPanel.js.map