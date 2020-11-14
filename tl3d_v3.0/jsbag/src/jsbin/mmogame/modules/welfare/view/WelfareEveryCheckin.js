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
var welfare;
(function (welfare) {
    var WelfareEveryCheckin = /** @class */ (function (_super) {
        __extends(WelfareEveryCheckin, _super);
        function WelfareEveryCheckin() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        WelfareEveryCheckin.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList.dispose();
                this.welfareEveryCheckinList = null;
            }
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
        };
        WelfareEveryCheckin.prototype.initUiAtlas = function ($uiAtlas) {
            this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        WelfareEveryCheckin.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this._aryRewardUI = new Array;
            this._aryRewardnameUI = new Array;
            this._aryRewardstateUI = new Array;
            for (var i = 0; i < 5; i++) {
                var reward = this.addChild(renderLevel.getComponent("t_prop" + i));
                reward.addEventListener(InteractiveEvent.Up, this.RewardClik, this);
                this._aryRewardUI.push(reward);
                this._aryRewardnameUI.push(this.addChild(renderLevel.getComponent("t_name" + i)));
                this._aryRewardstateUI.push(this._topRender.getComponent("a_wj_chuo" + i));
            }
            this._aryProUI = new Array;
            for (var i = 0; i < 4; i++) {
                var frame = this._baseRender.getComponent("a_wj_line" + i);
                this.addChild(frame);
                this._aryProUI.push(frame);
                frame.goToAndStop(1);
            }
            var a_huawen1 = this.addChild(this._bottomRender.getComponent("a_huawen1"));
            a_huawen1.isU = true;
            this.addUIList(["a_titlebg", "a_bg"], this._bgRender);
            this.addUIList(["a_title", "a_huawen", "t_hua1", "t_hua2", "t_hua3", "t_hua4", "t_hua5", "t_hua6"], this._bottomRender);
            this.slistIndex1 = this.addChild(this._bottomRender.getComponent("slistIndex1"));
            this.buildFram();
        };
        WelfareEveryCheckin.prototype.buildFram = function () {
            var _this = this;
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, function ($ary) {
                    _this.effAry = $ary;
                    for (var i = 0; i < _this.effAry.length; i++) {
                        _this.effAry[i].x = _this._aryRewardUI[i].x - 30;
                        _this.effAry[i].y = _this._aryRewardUI[i].y - 30;
                        // this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        // this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        _this.effAry[i].speed = 3;
                    }
                    _this.playEff();
                }, this._aryRewardUI.length);
            }
        };
        WelfareEveryCheckin.prototype.playEff = function () {
            if (!this.effAry) {
                return;
            }
            for (var i = 0; i < this._aryRewardUI.length; i++) {
                var vo = this._aryRewardUI[i].data;
                if (vo && vo.state == 2) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                }
                else {
                    this.removeChild(this.effAry[i]);
                }
            }
        };
        WelfareEveryCheckin.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList.left = this.slistIndex1.parent.x / UIData.Scale + this.slistIndex1.x;
                this.welfareEveryCheckinList.top = this.slistIndex1.parent.y / UIData.Scale + this.slistIndex1.y;
            }
        };
        WelfareEveryCheckin.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        };
        WelfareEveryCheckin.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList.hide();
            }
        };
        WelfareEveryCheckin.prototype.resetData = function () {
            if (!this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList = new WelfareEveryCheckinList();
                this.welfareEveryCheckinList.init(this._baseRender.uiAtlas);
            }
            this.welfareEveryCheckinList.show();
            this.setUiListVisibleByItem(this._aryRewardstateUI, false);
            var $arytabvo = GuidData.quest.getSigninWeekList();
            for (var i = 0; i < $arytabvo.length; i++) {
                var itemary = $arytabvo[i];
                this._aryRewardUI[i].data = itemary;
                this.drawReward(this._aryRewardUI[i]);
                if (itemary.state == 3) {
                    this.setUiListVisibleByItem([this._aryRewardstateUI[i]], true);
                }
                if (i > 0) {
                    if (itemary.state != 1) {
                        this._aryProUI[i - 1].goToAndStop(0);
                    }
                    else {
                        this._aryProUI[i - 1].goToAndStop(1);
                    }
                }
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryRewardnameUI[i].skinName, "签到" + itemary.data.num + "天", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            this.playEff();
            this.resize();
        };
        WelfareEveryCheckin.prototype.drawReward = function ($ui) {
            var _this = this;
            var itemary = $ui.data;
            var $vo = tb.TB_item_template.get_TB_item_template(itemary.data.item[0][0]);
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                //底色
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(3, 3, 62, 62), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String(itemary.data.item[0][1]), 16, 62, 42, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                if (itemary.state != 2) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68));
                }
                else {
                    UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(51, 0, 17, 16), UIData.publicUi);
                }
                _this._bottomRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        WelfareEveryCheckin.prototype.butClik = function (evt) {
            //购买vip
            ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
            ModulePageManager.openPanel(SharedDef.MODULE_MALL, [2]);
        };
        WelfareEveryCheckin.prototype.RewardClik = function (evt) {
            var vo = evt.target.data;
            if (vo) {
                if (vo.state == 2) {
                    //可以领取
                    NetManager.getInstance().protocolos.welfare_checkin_all(vo.data.id);
                }
                else {
                    //查看奖励信息
                    var obj = tb.TB_item_template.get_TB_item_template(vo.data.item[0][0]);
                    var bag = new BagItemData();
                    bag.entryData = obj;
                    var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                    aa.data = bag;
                    aa.buttonType = -1;
                    ModuleEventManager.dispatchEvent(aa);
                }
            }
        };
        return WelfareEveryCheckin;
    }(UIVirtualContainer));
    welfare.WelfareEveryCheckin = WelfareEveryCheckin;
    /**
     * 签到List
     */
    var WelfareEveryCheckinList = /** @class */ (function (_super) {
        __extends(WelfareEveryCheckinList, _super);
        function WelfareEveryCheckinList() {
            var _this = _super.call(this) || this;
            _this.left = 217;
            _this.top = 79;
            return _this;
        }
        // private _frameRender: FrameUIRender;
        WelfareEveryCheckinList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        // private _effUI: FrameTipCompenent;
        WelfareEveryCheckinList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, WelfareEveryCheckinListRender, 686, 295, 98, 128, 2, 1024, 512, 7, 4, 2);
        };
        WelfareEveryCheckinList.prototype.compareAry = function ($ary) {
            if ($ary.length != this._everycheckinlist.length) {
                return true;
            }
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i].state != this._everycheckinlist[i].state) {
                    return true;
                }
            }
            return false;
        };
        WelfareEveryCheckinList.prototype.refreshDataByNewData = function () {
            var $flag = true;
            var a = GuidData.quest.getSigninEveryDayVoList();
            if (this._everycheckinlist) {
                $flag = this.compareAry(a);
            }
            if ($flag) {
                //console.log("数据变化了");
                this._everycheckinlist = a;
                var $sListItemData = this.getData(this._everycheckinlist);
                this.refreshData($sListItemData);
            }
            var effflag = false;
            for (var i = 0; i < a.length; i++) {
                if (a[i].state == 2) {
                    effflag = true;
                }
            }
            if (effflag) {
                // this.showEffect(0, this.getIdxX(this.getscrollX()) - 45, this.getIdxY(this.getscrollnum()) - 55, 1.4, 1.8);
                this.showEffect(0, this.getIdxX(this.getscrollX()) - 25, this.getIdxY(this.getscrollnum()) + 71, 1.1, 0.5);
            }
            else {
                this.hideEffect(0);
            }
        };
        WelfareEveryCheckinList.prototype.effectComplte = function () {
            //console.log("加载好了，回调");
            this.refreshDataByNewData();
            this.scrollIdx(this.getscrollnum());
        };
        WelfareEveryCheckinList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        WelfareEveryCheckinList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            // this.effectComplte();
            this.setEffectUrl("ef_fl", 4, 4);
        };
        WelfareEveryCheckinList.prototype.getscrollnum = function () {
            var num;
            var curday = GuidData.quest.getcurDays();
            var flagary = GuidData.quest.getSigninEveryDayList();
            var isreceive = flagary[curday - 1];
            if (isreceive) {
                num = 0;
            }
            else {
                num = Math.floor((curday - 1) / 7);
            }
            return num;
        };
        WelfareEveryCheckinList.prototype.getscrollX = function () {
            var curday = GuidData.quest.getcurDays();
            return (curday - 1) % 7;
        };
        WelfareEveryCheckinList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
            this.hideEffect();
        };
        return WelfareEveryCheckinList;
    }(EffectSlist));
    welfare.WelfareEveryCheckinList = WelfareEveryCheckinList;
    var WelfareEveryCheckinListRender = /** @class */ (function (_super) {
        __extends(WelfareEveryCheckinListRender, _super);
        function WelfareEveryCheckinListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        WelfareEveryCheckinListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var cententRender = this._customRenderAry[0];
            var topRender = this._customRenderAry[1];
            this.I1bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "I1bg", 0, 0, 98, 128, 22, 22);
            $container.addChild(this.I1bg);
            this.I1icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I1icon", 0, 0, 83, 81);
            $container.addChild(this.I1icon);
            this.I1icon.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.I1btn = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "I1btn", 8, 87, 81, 34);
            $container.addChild(this.I1btn);
            this.I1btn.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this.I1select = this.creatGrid9SUI(topRender, this.parentTarget.baseAtlas, "I1select", 0, 0, 98, 128, 14, 14);
            $container.addChild(this.I1select);
        };
        WelfareEveryCheckinListRender.prototype.drawIcon = function () {
            var _this = this;
            var vo = this.itdata.data;
            var $vo = tb.TB_item_template.get_TB_item_template(vo.data.item[0][0]);
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon), function ($img) {
                //置空和回调先后顺序问题
                if (_this.itdata && _this.itdata.data) {
                    var $rec = _this._baseRender.uiAtlas.getRec(_this.I1icon.skinName);
                    var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(14, 13, 68, 68), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(14, 13, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 18, 17, 60, 60);
                    if (vo.data.vip > 0) {
                        var vipRect1 = _this.parentTarget.baseAtlas.getRec("vip" + vo.data.vip);
                        ctx.drawImage(_this.parentTarget.baseAtlas.useImg, vipRect1.pixelX, vipRect1.pixelY, vipRect1.pixelWitdh, vipRect1.pixelHeight, 2, 2, vipRect1.pixelWitdh, vipRect1.pixelHeight);
                    }
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String(vo.data.item[0][1]), 16, 78, 58, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    if (vo.state == 3) {
                        //图像灰
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(18, 17, 60, 60));
                        UiDraw.cxtDrawImg(ctx, PuiData.A_gou, new Rectangle(42, 41, 38, 38), UIData.publicUi);
                    }
                    _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                }
            });
        };
        WelfareEveryCheckinListRender.prototype.drawBtn = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.I1btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var str = "第" + vo.data.id + "天";
            var colortxt = ColorType.Brown7a2f21;
            if (vo.state == 4) {
                var StateRect1 = this.parentTarget.baseAtlas.getRec("I1bq");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, StateRect1.pixelX, StateRect1.pixelY, StateRect1.pixelWitdh, StateRect1.pixelHeight, 0, 0, StateRect1.pixelWitdh, StateRect1.pixelHeight);
                str = "补签";
                colortxt = ColorType.Green464b11;
            }
            else if (vo.state == 2) {
                var StateRect2 = this.parentTarget.baseAtlas.getRec("I1qd");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, StateRect2.pixelX, StateRect2.pixelY, StateRect2.pixelWitdh, StateRect2.pixelHeight, 0, 0, StateRect2.pixelWitdh, StateRect2.pixelHeight);
            }
            else if (vo.state == 3) {
                colortxt = ColorType.colorb96d49;
            }
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, colortxt + str, 16, 39, 6);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        WelfareEveryCheckinListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                //console.log("--this.itdata.id---", this.itdata.id);
                var vo = this.itdata.data;
                if (vo.state == 3) {
                    //底色
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I1bg.skinName, UIData.publicUi, PuiData.I1bg_2);
                }
                else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I1bg.skinName, UIData.publicUi, PuiData.I1bg_1);
                }
                this.drawBtn();
                this.drawIcon();
                // //高亮
                if (vo.state == 2) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I1select.skinName, UIData.publicUi, PuiData.TITLEHIGHT);
                }
            }
        };
        WelfareEveryCheckinListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        WelfareEveryCheckinListRender.prototype.equClick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                var obj = tb.TB_item_template.get_TB_item_template(vo.data.item[0][0]);
                var bag = new BagItemData();
                bag.entryData = obj;
                var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                aa.data = bag;
                aa.buttonType = -1;
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        WelfareEveryCheckinListRender.prototype.btnClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.state == 2) {
                    //领取事件
                    this.receiveReward();
                }
                else if (vo.state == 4) {
                    //补领事件
                    var $getbackobj = TableData.getInstance().getData(TableData.tb_welfare_checkin, GuidData.player.getBackTimes() + 1);
                    if ($getbackobj) {
                        AlertUtil.show("补签需要消耗" + getResName($getbackobj["getback_cost"][0][0]) + $getbackobj["getback_cost"][0][1] + "个，是否补签?", "补签提示", function (a) {
                            if (a == 1) {
                                costRes($getbackobj["getback_cost"][0], function () {
                                    NetManager.getInstance().protocolos.welfare_checkin_getback(vo.data.id);
                                }, function () {
                                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                                });
                            }
                        }, 2, ["是", "否"]);
                    }
                    else {
                        console.log("-----补签数据没配对----");
                    }
                }
            }
        };
        WelfareEveryCheckinListRender.prototype.receiveReward = function () {
            var vo = this.itdata.data;
            if (vo.data.vip <= GuidData.player.getVipLevel()) {
                //不提示，直接领取
                if (vo.state == 2) {
                    NetManager.getInstance().protocolos.welfare_checkin();
                }
                else {
                    NetManager.getInstance().protocolos.welfare_checkin_getback(vo.data.id);
                }
            }
            else {
                AlertUtil.show("成为vip" + vo.data.vip + "后，可以领取" + vo.data.times + "倍签到奖励", "签到提示", function (a) {
                    if (a == 1) {
                        //直接签到
                        if (vo.state == 2) {
                            NetManager.getInstance().protocolos.welfare_checkin();
                        }
                        else {
                            NetManager.getInstance().protocolos.welfare_checkin_getback(vo.data.id);
                        }
                    }
                    else {
                        //购买vip
                        ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                    }
                }, 2, ["直接签到", "前往充值"]);
                // var $evtee = new welfare.WelfareEvent(welfare.WelfareEvent.OPPENWIN_Qiandao_Welfare_EVENT);
                // $evtee.data = vo
                // ModuleEventManager.dispatchEvent($evtee);
            }
        };
        // private CheckinFun(a: any): void {
        //     if (a == 1) {
        //         var vo: SigninEveryDayItemData = this.itdata.data
        //         //确定
        //         if (vo.state == 2) {
        //             NetManager.getInstance().protocolos.welfare_checkin();
        //         } else {
        //             NetManager.getInstance().protocolos.welfare_checkin_getback(vo.data.id);
        //         }
        //     } else {
        //         //取消
        //         ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
        //         ModulePageManager.openPanel(PanelClass.SHOW_shangcheng_PANEL, [2]);
        //     }
        // }
        WelfareEveryCheckinListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.I1icon);
            UiDraw.clearUI(this.I1bg);
            UiDraw.clearUI(this.I1btn);
            UiDraw.clearUI(this.I1select);
        };
        return WelfareEveryCheckinListRender;
    }(SListItem));
    welfare.WelfareEveryCheckinListRender = WelfareEveryCheckinListRender;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareEveryCheckin.js.map