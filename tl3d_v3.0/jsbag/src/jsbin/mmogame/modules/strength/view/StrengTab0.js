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
    var StrengTab0 = /** @class */ (function (_super) {
        __extends(StrengTab0, _super);
        function StrengTab0() {
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
        StrengTab0.prototype.dispose = function () {
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
        StrengTab0.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        StrengTab0.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.EuqUIAry = new Array;
            this.StarUIAry = new Array;
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Down, this.equClick, this);
                this.EuqUIAry.push(t_equ);
                this._redPointRender.getRedPointUI(this, 82 + i, new Vector2D(t_equ.x + t_equ.width, t_equ.y));
                this.StarUIAry.push(this.addChild(this._topRender.getComponent("b_star" + i)));
            }
            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));
            this.CostItemUIAry = new Array;
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem1")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum1")));
            this.addUIList(["t_costinfo", "b_bg3_1", "b_bg3_0", "b_bg3_2"], this._baseRender);
            this.a_attr0 = this.addChild(renderLevel.getComponent("b_attr0"));
            this.a_attr1 = this.addChild(renderLevel.getComponent("b_attr1"));
            this.a_attr2 = this.addChild(renderLevel.getComponent("b_attr2"));
            this.a_nextattr1 = this.addChild(renderLevel.getComponent("b_nextattr1"));
            this.a_nextattr0 = this.addChild(renderLevel.getComponent("b_nextattr0"));
            this.a_nextattr2 = this.addChild(renderLevel.getComponent("b_nextattr2"));
            this.a_curlev = this.addChild(renderLevel.getComponent("a_curlev"));
            this.a_maxlevinfo = this.addChild(renderLevel.getComponent("a_maxlevinfo"));
            this.BtnUIAry = new Array;
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("a_btntxt1")));
            this.BtnUIAry.push(this.addChild(renderLevel.getComponent("a_btntxt2")));
            this.cnew_btn0 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn0, "btnBg0", renderLevel);
            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg1", renderLevel);
            this.BtnUIAry.push(this.cnew_btn0);
            this.BtnUIAry.push(this.cnew_btn1);
            this._publicRender.applyObjData();
            this._btn1RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn0.x + this.cnew_btn0.width, this.cnew_btn0.y));
            this._btn0RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
        };
        StrengTab0.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        StrengTab0.prototype.showExpEff = function () {
            var _this = this;
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_qh"), 4, 4, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.x = _this.t_curequ.x - 58;
                    _this.expEff.y = _this.t_curequ.y - 58;
                    _this.expEff.width = _this.expEff.baseRec.width * 1.5;
                    _this.expEff.height = _this.expEff.baseRec.height * 1.5;
                    _this.expEff.speed = 3;
                    _this.expEff.playOne(_this);
                });
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        };
        StrengTab0.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //初始化euq数据
            this.InitEqu();
            this.resize();
        };
        StrengTab0.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        StrengTab0.prototype.InitEqu = function () {
            for (var i = 0; i < 10; i++) {
                this.EuqUIAry[i].data = strengthgem.NewStrengModel.getInstance().getstrengvo(i + 1);
                // } else if ($value == 1) {
                //     this.EuqUIAry[i].data = NewStrengModel.getInstance().getrefiningvo(i + 1);
                // } else if ($value == 2) {
                //     this.EuqUIAry[i].data = NewStrengModel.getInstance().getGemvo(i + 1);
                // } else {
                // }
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
        StrengTab0.prototype.refreshPartChg = function ($partid) {
            this.EuqUIAry[$partid - 1].data = strengthgem.NewStrengModel.getInstance().getstrengvo($partid);
            this.drawEqu(this.EuqUIAry[$partid - 1], this.lastselect == ($partid - 1), strengthgem.StrengUtil.STRENG);
            if (this.lastselect == ($partid - 1)) {
                this.resetData(this.EuqUIAry[$partid - 1].data);
            }
        };
        StrengTab0.prototype.refreshEqu = function () {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this.lastselect == i, strengthgem.StrengUtil.STRENG);
            }
        };
        StrengTab0.prototype.drawEqu = function ($ui, $select, $type) {
            var aa = $ui.data;
            var equData = GuidData.bag.getEquByPart(aa.partid);
            if (equData) {
                strengthgem.StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), [aa.curtab.rank, aa.curtab.star], $select, $type, equData.entryData.quality, equData.entryData.realmbreak_level);
            }
            else {
                strengthgem.StrengUtil.setEquNoIcon($ui, aa.partid, [aa.curtab.rank, aa.curtab.star], $select, $type);
            }
        };
        StrengTab0.prototype.equClick = function (evt) {
            for (var i = 0; i < this.EuqUIAry.length; i++) {
                if (this.EuqUIAry[i] == evt.target) {
                    //选中
                    this.lastselect = i;
                    this.drawEqu(this.EuqUIAry[i], true, strengthgem.StrengUtil.STRENG);
                }
                else {
                    //未选中
                    this.drawEqu(this.EuqUIAry[i], false, strengthgem.StrengUtil.STRENG);
                }
            }
            this.resetData(evt.target.data);
        };
        StrengTab0.prototype.refreshLevAndUp = function () {
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_attr1.skinName, ColorType.Brown7a2f21 + "角色等级   " + ColorType.color9a683f + GuidData.player.getLevel() + "级", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_nextattr1.skinName, ColorType.Brown7a2f21 + "强化上限   " + ColorType.color9a683f + this.getUplev() + "段", 14, TextAlign.LEFT, ColorType.Brown7a2f21);
        };
        StrengTab0.prototype.getUplev = function () {
            //等级上限是200
            // var maxlev:number = GuidData.player.getLevel();
            // var aaa = 20;
            // if(maxlev < 200){
            //     aaa = Math.floor(GuidData.player.getLevel() / 10) + 1;
            // }
            // //console.log("---aaa---",aaa);
            return Math.floor(GuidData.player.getLevel() / 10) - 1;
        };
        StrengTab0.prototype.resetData = function ($data) {
            this.t_curequ.data = $data;
            this._vo = $data;
            this.drawEqu(this.t_curequ, false, strengthgem.StrengUtil.GENERAL);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, strengthgem.StrengUtil.equProp[$data.partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawResItem();
            for (var i = 0; i < 10; i++) {
                if ($data.curtab.star > i) {
                    this.StarUIAry[i].goToAndStop(0);
                }
                else {
                    this.StarUIAry[i].goToAndStop(1);
                }
            }
            this.refreshLevAndUp();
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_curlev.skinName, "强化等级：  " + $data.curtab.rank + "段" + $data.curtab.star + "星", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_attr0.skinName, ColorType.Brown7a2f21 + "强化等级   " + ColorType.color9a683f + $data.curtab.rank + "段" + $data.curtab.star + "星", 14, TextAlign.RIGHT, ColorType.Brown7a2f21);
            UiDraw.drawAttVal(this.a_attr2, $data.curtab.props[0][0], $data.curtab.props[0][1], TextAlign.RIGHT);
            if ($data.nexttab) {
                this.drawAddValRight(this.a_nextattr0, ColorType.Green2ca937 + $data.nexttab.rank + "段" + $data.nexttab.star + "星");
                UiDraw.drawAddValRight(this.a_nextattr2, $data.nexttab.props[0][1], false, TextAlign.LEFT);
            }
            else {
                this.setUiListVisibleByItem([this.a_nextattr0, this.a_nextattr1, this.a_nextattr2], false);
                // UiDraw.clearUI(this.a_nextattr0);
                // UiDraw.clearUI(this.a_nextattr2);
            }
            this.a_attr0.x = $data.nexttab ? 379 : 433;
            this.a_attr1.x = this.a_attr0.x;
            this.a_attr2.x = this.a_attr0.x;
            this.setUiListVisibleByItem([this.a_maxlevinfo], $data.state == 0);
            this.setUiListVisibleByItem(this.BtnUIAry, $data.state != 0);
            //红点逻辑
            var strengary = RedPointManager.getInstance().getNodeByID(38).children;
            if (strengary[$data.partid - 1].show) {
                // var itemtab: tb.TB_equipdevelop_strength = $data.nexttab ? $data.nexttab : $data.curtab
                // var flagarystreng: Array<boolean> = new Array;
                // for (var j = 0; j < itemtab.cost.length; j++) {
                //     flagarystreng.push(hasEnoughResItem([itemtab.cost[j][0], itemtab.cost[j][1] * 5]));
                // }
                // var aaa: boolean = true;
                // for (var flagid = 0; flagid < flagarystreng.length; flagid++) {
                //     if (!flagarystreng[flagid]) {
                //         aaa = false;
                //         break;
                //     }
                // }
                // this._btn0RedPoint.preShow();
                // if (aaa) {
                //     this._btn1RedPoint.preShow();
                // } else {
                //     this._btn1RedPoint.preHide();
                // }
                this._btn0RedPoint.preShow();
                this._btn1RedPoint.preShow();
            }
            else {
                this._btn0RedPoint.preHide();
                this._btn1RedPoint.preHide();
            }
        };
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        StrengTab0.prototype.drawAddValRight = function ($ui, $val) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.ARROW_RIGHT, new Rectangle(0, 3, 16, 12), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, $val, 14, 22, 0, TextAlign.LEFT, ColorType.Green2ca937);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        StrengTab0.prototype.drawResItem = function () {
            var flagary = new Array;
            var itemtab = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab;
            for (var i = 0; i < 2; i++) {
                if (i < itemtab.cost.length) {
                    IconManager.getInstance().drawItemIcon40(this.CostItemUIAry[i], itemtab.cost[i][0]);
                    //绘制消耗资源图标，并把资源满足情况记录下来
                    flagary.push(UiDraw.drawResHasNumAndAllNum(this.CostItemUIAry[i + 2], itemtab.cost[i]));
                    //调整位置
                    this.CostItemUIAry[0].x = itemtab.cost.length == 1 ? 528 : 484;
                    this.CostItemUIAry[2].x = itemtab.cost.length == 1 ? 516 : 463;
                }
                else {
                    UiDraw.clearUI(this.CostItemUIAry[i + 2]);
                    UiDraw.clearUI(this.CostItemUIAry[i]);
                }
            }
            this._canbuy = flagary;
        };
        // if(this._canclick) {
        //     this._canclick = false;
        //     TimeUtil.addTimeOut(500, () => {
        //         this._canclick = true;
        //     });
        // }else{
        //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
        // }
        StrengTab0.prototype.butClik = function (evt) {
            var _this = this;
            if (this._canclick) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, function () {
                    _this._canclick = true;
                });
                switch (evt.target) {
                    case this.cnew_btn0:
                        UIManager.popClikNameFun("cnew_btn1");
                        // if (this._vo.partlev >= GuidData.player.getLevel()) {
                        //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可超过人物等级", 99);
                        //     return;
                        // }
                        var bbb = false;
                        var minLev = 1000;
                        var limitrank = 1000;
                        var flagPart;
                        for (var i = 0; i < 10; i++) {
                            var strengVo = strengthgem.NewStrengModel.getInstance().getstrengvo(i + 1);
                            var uplev = this.getUplev();
                            console.log(":--SSSSSSS--", strengVo.curtab);
                            if (strengVo.state == 1 && strengVo.curtab.rank <= uplev) {
                                var itemtab = strengVo.nexttab ? strengVo.nexttab : strengVo.curtab;
                                //如果下一个数据的阶数大于当前上限，则达到上限
                                console.log(":----", uplev, limitrank, strengVo.nexttab);
                                if (strengVo.nexttab && strengVo.nexttab.rank <= uplev) {
                                    console.log(":----", limitrank);
                                    limitrank--;
                                    //未到达上限时，需要循环便利
                                    var flagarystreng = new Array;
                                    for (var j = 0; j < itemtab.cost.length; j++) {
                                        flagarystreng.push(hasEnoughResItem(itemtab.cost[j]));
                                    }
                                    var cansend = true;
                                    for (var flagid = 0; flagid < flagarystreng.length; flagid++) {
                                        if (!flagarystreng[flagid]) {
                                            cansend = false;
                                            break;
                                        }
                                    }
                                    bbb = cansend;
                                    if (bbb) {
                                        break;
                                    }
                                    //记录下最小等级的部位
                                    if (minLev > strengVo.partlev) {
                                        minLev = strengVo.partlev;
                                        flagPart = i;
                                    }
                                }
                            }
                        }
                        if (limitrank == 1000) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可超过提升上限", 99);
                            return;
                        }
                        if (bbb) {
                            NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_ALL, 0, 0, "", "");
                        }
                        else {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                            var strengVo1 = strengthgem.NewStrengModel.getInstance().getstrengvo(flagPart + 1);
                            var itemtab1 = strengVo1.nexttab ? strengVo1.nexttab : strengVo1.curtab;
                            var $idx = hasEnoughResItem(itemtab1.cost[0]) ? itemtab1.cost[1][0] : itemtab1.cost[0][0];
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = $idx;
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                        break;
                    case this.cnew_btn1:
                        UIManager.popClikNameFun("cnew_btn1");
                        // if (GuidData.player.getResType(this._vo.curtab.cost[0][0]) >= this._vo.curtab.cost[0][1])){
                        if (!this._vo.nexttab) {
                            return;
                        }
                        var uplev = this.getUplev();
                        if (this._vo.curtab.rank == uplev && this._vo.nexttab.rank > uplev) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可超过提升上限", 99);
                            return;
                        }
                        this.sendStreng(1);
                        // }
                        break;
                    default:
                        break;
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        };
        StrengTab0.prototype.sendStreng = function ($num) {
            var $canbuy;
            var $idx;
            var itemtab = this._vo.nexttab ? this._vo.nexttab : this._vo.curtab;
            if (this._canbuy.length == 2) {
                $canbuy = this._canbuy[0] && this._canbuy[1];
                if (!$canbuy) {
                    $idx = this._canbuy[0] ? itemtab.cost[1][0] : itemtab.cost[0][0];
                }
            }
            else {
                $canbuy = this._canbuy[0];
                if (!$canbuy) {
                    $idx = itemtab.cost[0][0];
                }
            }
            if ($canbuy) {
                // var type: number = $num == 1 ? SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_LVUP : SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_ALL
                NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_LVUP, this._vo.partid, $num, "", "");
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = $idx;
                ModuleEventManager.dispatchEvent($aaa);
            }
        };
        return StrengTab0;
    }(UIVirtualContainer));
    strengthgem.StrengTab0 = StrengTab0;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=StrengTab0.js.map