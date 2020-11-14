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
    var StrengTab2 = /** @class */ (function (_super) {
        __extends(StrengTab2, _super);
        function StrengTab2() {
            var _this = _super.call(this) || this;
            _this._canclick = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            return _this;
        }
        StrengTab2.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }
        };
        StrengTab2.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        StrengTab2.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.EuqUIAry = new Array;
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Down, this.equClick, this);
                this.EuqUIAry.push(t_equ);
                this._redPointRender.getRedPointUI(this, 102 + i, new Vector2D(t_equ.x + t_equ.width, t_equ.y));
            }
            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));
            this.BtnUIAry = new Array;
            this.btn0 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn0, "c_btn0", renderLevel);
            this.btn1 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn1, "c_btn1", renderLevel);
            this.btn2 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn2, "c_btn2", renderLevel);
            this.BtnUIAry.push(this.btn0);
            this.BtnUIAry.push(this.btn1);
            this.BtnUIAry.push(this.btn2);
            this.GemUIIconAry = new Array;
            this.GemUIattrAry = new Array;
            this.GemUICostAry = new Array;
            this.GemUIHasAry = new Array;
            this.GemUILevAry = new Array;
            this.UnlockUIAry = new Array;
            this.GemUIattrAry_n = new Array;
            this.GemUILevAry_n = new Array;
            this.GemUIArrowAry = new Array;
            for (var j = 0; j < 3; j++) {
                this.UnlockUIAry.push(renderLevel.getComponent("c_unlockinfo" + j));
                this.BtnUIAry.push(this.addChild(renderLevel.getComponent("c_btntxt" + j)));
                this.GemUIIconAry.push(this.addChild(this._topRender.getComponent("c_grm" + j)));
                this.GemUILevAry.push(this.addChild(this._topRender.getComponent("c_gemlev" + j)));
                this.GemUIattrAry.push(this.addChild(this._topRender.getComponent("c_attr" + j)));
                this.GemUICostAry.push(this.addChild(this._topRender.getComponent("c_cost" + j)));
                this.GemUIHasAry.push(this.addChild(this._topRender.getComponent("c_has" + j)));
                this.GemUILevAry_n.push(this.addChild(this._topRender.getComponent("c_nlev" + j)));
                this.GemUIattrAry_n.push(this.addChild(this._topRender.getComponent("c_nattr" + j)));
                this.GemUIArrowAry.push(this._topRender.getComponent("c_arrow" + j));
                //画背景
                var cnew_bg_yellow = this.addChild(this._publicRender.getComponent("cnew_bg_yellow"));
                this.setSizeForPanelUiCopy(cnew_bg_yellow, "c_yellowbg" + j, this._topRender);
            }
            this._publicRender.applyObjData();
            this._redbtnary = new Array;
            this._redbtnary.push(this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.btn0.x + this.btn0.width, this.btn0.y)));
            this._redbtnary.push(this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.btn1.x + this.btn1.width, this.btn1.y)));
            this._redbtnary.push(this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.btn2.x + this.btn2.width, this.btn2.y)));
        };
        StrengTab2.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        StrengTab2.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //初始化euq数据
            this.InitEqu();
            this.resize();
        };
        StrengTab2.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        StrengTab2.prototype.InitEqu = function () {
            for (var i = 0; i < 10; i++) {
                this.EuqUIAry[i].data = strengthgem.NewStrengModel.getInstance().getGemvo(i + 1);
            }
            //模拟选中第一条数据
            var evt = new InteractiveEvent(InteractiveEvent.Down);
            evt.target = this.EuqUIAry[0];
            this.equClick(evt);
        };
        /**
         * 某个部位数据变化时，刷新单个部位
         * @param
         * @param
         * @param
         */
        StrengTab2.prototype.refreshPartChg = function ($partid) {
            this.EuqUIAry[$partid - 1].data = strengthgem.NewStrengModel.getInstance().getGemvo($partid);
            this.drawEqu(this.EuqUIAry[$partid - 1], this.lastselect == ($partid - 1), strengthgem.StrengUtil.GEM);
            if (this.lastselect == ($partid - 1)) {
                this.resetData(this.EuqUIAry[$partid - 1].data);
            }
            this.showExpEff();
        };
        StrengTab2.prototype.refreshEqu = function () {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this.lastselect == i, strengthgem.StrengUtil.GEM);
            }
        };
        StrengTab2.prototype.showExpEff = function () {
            var _this = this;
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_qh"), 4, 4, function ($ui) {
                    _this.expEff = $ui;
                    _this.seteffsize();
                    _this.expEff.speed = 3;
                    _this.expEff.playOne(_this);
                });
            }
            if (this.expEff) {
                this.seteffsize();
                this.expEff.playOne(this);
            }
        };
        StrengTab2.prototype.seteffsize = function () {
            //console.log("this._clickId==============", this._clickId);
            var $index = this._clickId - 1;
            if ($index >= 0 && $index < this.GemUIIconAry.length) {
                this.expEff.x = this.GemUIIconAry[$index].x - 58;
                this.expEff.y = this.GemUIIconAry[$index].y - 58;
                this.expEff.width = this.expEff.baseRec.width * 1.5;
                this.expEff.height = this.expEff.baseRec.height * 1.5;
            }
        };
        StrengTab2.prototype.drawEqu = function ($ui, $select, $type) {
            var aa = $ui.data;
            var equData = GuidData.bag.getEquByPart(aa[0].partid);
            var stateary = [aa[0].state, aa[1].state, aa[2].state];
            if (equData) {
                strengthgem.StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), stateary, $select, $type, equData.entryData.quality, equData.entryData.realmbreak_level);
            }
            else {
                strengthgem.StrengUtil.setEquNoIcon($ui, aa[0].partid, stateary, $select, $type);
            }
        };
        StrengTab2.prototype.equClick = function (evt) {
            for (var i = 0; i < this.EuqUIAry.length; i++) {
                if (this.EuqUIAry[i] == evt.target) {
                    //选中
                    this.lastselect = i;
                    this.drawEqu(this.EuqUIAry[i], true, strengthgem.StrengUtil.GEM);
                }
                else {
                    //未选中
                    this.drawEqu(this.EuqUIAry[i], false, strengthgem.StrengUtil.GEM);
                }
            }
            this.resetData(evt.target.data);
        };
        StrengTab2.prototype.resetData = function ($data) {
            this.t_curequ.data = $data;
            this._vo = $data;
            this.drawEqu(this.t_curequ, false, strengthgem.StrengUtil.GENERAL);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, strengthgem.StrengUtil.equProp[$data[0].partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.setUiListVisibleByItem(this.GemUIArrowAry, false);
            var flagary = new Array;
            for (var i = 0; i < 3; i++) {
                if (i < this._vo.length) {
                    // this.drawPic(, );
                    IconManager.getInstance().drawItemIcon60(this.GemUIIconAry[i], this._vo[i].curtab.cost[0][0]);
                    if (this._vo[i].state != 2) {
                        var lev = this._vo[i].gemlev == 0 ? 1 : this._vo[i].gemlev;
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUILevAry[i].skinName, ColorType.Orange7a2f21 + "等级:  " + ColorType.color9a683f + lev, 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        UiDraw.drawAttVal(this.GemUIattrAry[i], this._vo[i].curtab.props[0][0], this._vo[i].curtab.props[0][1], TextAlign.LEFT, true);
                        var tabvo = this._vo[i].nexttab ? this._vo[i].nexttab : this._vo[i].curtab;
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUICostAry[i].skinName, ColorType.Orange7a2f21 + "消耗:  " + ColorType.color9a683f + tabvo.cost[0][1] + "个" + GameData.getPropName(tabvo.cost[0][0]), 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        flagary.push(UiDraw.drawResHasNumAndAllNum(this.GemUIHasAry[i], tabvo.cost[0], "拥有:"));
                        if (this._vo[i].state == 3) {
                            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUILevAry_n[i].skinName, ColorType.Orange7a2f21 + "等级:  " + ColorType.color9a683f + (lev + 1), 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                            // UiDraw.drawAttVal(this.GemUIattrAry_n[i], tabvo.props[0][0], tabvo.props[0][1], TextAlign.LEFT, true);
                            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUIattrAry_n[i].skinName, ColorType.Green2ca937 + "+" + Snum(Math.floor(tabvo.props[0][1] / 100)), 14, TextAlign.LEFT);
                            this.setUiListVisibleByItem([this.GemUIArrowAry[i]], true);
                        }
                        else {
                            UiDraw.clearUI(this.GemUILevAry_n[i]);
                            UiDraw.clearUI(this.GemUIattrAry_n[i]);
                        }
                    }
                    else {
                        // UiDraw.clearUI(this.GemUILevAry[i]);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.GemUILevAry[i].skinName, ColorType.Orange7a2f21 + "等级:  " + ColorType.color9a683f + 1, 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        UiDraw.drawAttVal(this.GemUIattrAry[i], this._vo[i].curtab.props[0][0], this._vo[i].curtab.props[0][1], TextAlign.LEFT, true);
                        UiDraw.clearUI(this.GemUICostAry[i]);
                        UiDraw.clearUI(this.GemUIHasAry[i]);
                        UiDraw.clearUI(this.GemUILevAry_n[i]);
                        UiDraw.clearUI(this.GemUIattrAry_n[i]);
                    }
                    this.drawBtn(this._vo[i], i);
                }
                else {
                    UiDraw.clearUI(this.GemUIIconAry[i]);
                    UiDraw.clearUI(this.GemUIattrAry[i]);
                    UiDraw.clearUI(this.GemUICostAry[i]);
                    UiDraw.clearUI(this.GemUIHasAry[i]);
                    UiDraw.clearUI(this.GemUILevAry[i]);
                    UiDraw.clearUI(this.UnlockUIAry[i]);
                    UiDraw.clearUI(this.BtnUIAry[i]);
                    UiDraw.clearUI(this.BtnUIAry[i + 3]);
                    UiDraw.clearUI(this.GemUILevAry_n[i]);
                    UiDraw.clearUI(this.GemUIattrAry_n[i]);
                }
            }
            this._canbuyary = flagary;
            //红点逻辑
            var gemary = RedPointManager.getInstance().getNodeByID(44).children;
            if (gemary[$data[0].partid - 1].show) {
                for (var index = 0; index < $data.length; index++) {
                    this._redbtnary[index].preHide();
                    if ($data[index].state == 1 || $data[index].state == 3) {
                        var gemvo = $data[index].nexttab ? $data[index].nexttab : $data[index].curtab;
                        var flagarygem = new Array;
                        for (var j = 0; j < gemvo.cost.length; j++) {
                            flagarygem.push(hasEnoughResItem(gemvo.cost[j]));
                        }
                        var aaa = true;
                        for (var flagid = 0; flagid < flagarygem.length; flagid++) {
                            if (!flagarygem[flagid]) {
                                aaa = false;
                                flagid = flagarygem.length;
                            }
                        }
                        if (aaa) {
                            this._redbtnary[index].preShow();
                            //console.log("---红点zhanshi--", this._redbtnary[index]);
                        }
                    }
                }
            }
            else {
                this._redbtnary[0].preHide();
                this._redbtnary[1].preHide();
                this._redbtnary[2].preHide();
            }
        };
        StrengTab2.prototype.drawPic = function ($ui, $data) {
            var _this = this;
            IconManager.getInstance().getIcon(getgemIconUrl($data.gemid), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        StrengTab2.prototype.drawBtn = function ($data, $index) {
            this.setUiListVisibleByItem([this.UnlockUIAry[$index]], $data.state == 2 || $data.state == 4);
            this.setUiListVisibleByItem([this.BtnUIAry[$index], this.BtnUIAry[$index + 3]], $data.state == 1 || $data.state == 3);
            if ($data.state == 1) {
                this.BtnUIAry[$index + 3].goToAndStop(1);
            }
            else if ($data.state == 2) {
                var tab_gem_part = tb.TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_partById($data.partid);
                // for (var i = 0; i < tab_gem_part.gem_array.length; i++) {
                if (tab_gem_part.unlock_refine_lv[$index] > strengthgem.NewStrengModel.getInstance().getrefiningvo($data.partid).partlevstar[0]) {
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.UnlockUIAry[$index].skinName, strengthgem.StrengUtil.equProp[$data.partid - 1] + "部位精炼达到" + (tab_gem_part.unlock_refine_lv[$index] + 1) + "段解锁", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
                    return;
                }
                if (tab_gem_part.unlock_strength_lv[$index] > strengthgem.NewStrengModel.getInstance().getstrengvo($data.partid).partlev) {
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.UnlockUIAry[$index].skinName, strengthgem.StrengUtil.equProp[$data.partid - 1] + "部位强化+" + tab_gem_part.unlock_strength_lv[$index] + "解锁", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
                    return;
                }
                // }
            }
            else if ($data.state == 3) {
                this.BtnUIAry[$index + 3].goToAndStop(0);
            }
            else {
                UiDraw.clearUI(this.GemUICostAry[$index]);
                UiDraw.clearUI(this.GemUIHasAry[$index]);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.UnlockUIAry[$index].skinName, "已满级", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            }
        };
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        StrengTab2.prototype.drawAddValRight = function ($ui, $val) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.ARROW_RIGHT, new Rectangle(0, 3, 16, 12), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, $val, 14, 22, 0, TextAlign.LEFT, ColorType.Green2ca937);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        StrengTab2.prototype.butClik = function (evt) {
            var _this = this;
            if (this._canclick) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, function () {
                    _this._clickId = -1;
                    _this._canclick = true;
                });
                switch (evt.target) {
                    case this.btn0:
                        this.senduplevgem(this._vo[0], this._canbuyary[0], 0);
                        break;
                    case this.btn1:
                        this.senduplevgem(this._vo[1], this._canbuyary[1], 1);
                        break;
                    case this.btn2:
                        this.senduplevgem(this._vo[2], this._canbuyary[2], 2);
                        break;
                    default:
                        break;
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        };
        StrengTab2.prototype.senduplevgem = function ($vo, canbuy, $idx) {
            if (canbuy) {
                var type;
                if ($vo.state == 1) {
                    type = SharedDef.EQUIPDEVELOP_TYPE_GEM_ACTIVE;
                }
                else if ($vo.state == 3) {
                    type = SharedDef.EQUIPDEVELOP_TYPE_GEM_LVUP;
                }
                this._clickId = $vo.index;
                NetManager.getInstance().protocolos.equipdevelop_operate(type, $vo.partid, $vo.index, "", "");
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                var tabvo = this._vo[$idx].nexttab ? this._vo[$idx].nexttab : this._vo[$idx].curtab;
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = tabvo.cost[0][0];
                ModuleEventManager.dispatchEvent($aaa);
            }
        };
        return StrengTab2;
    }(UIVirtualContainer));
    strengthgem.StrengTab2 = StrengTab2;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=StrengTab2.js.map