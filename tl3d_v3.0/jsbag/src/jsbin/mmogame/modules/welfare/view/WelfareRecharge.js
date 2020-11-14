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
    var WelfareRecharge = /** @class */ (function (_super) {
        __extends(WelfareRecharge, _super);
        function WelfareRecharge() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            // this._bottomRender = new UIRenderComponent;
            // this.addRender(this._bottomRender)
            _this._bigPic = new UIRenderOnlyPicComponent();
            _this.addRender(_this._bigPic);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        WelfareRecharge.prototype.dispose = function () {
            this._bigPic.dispose();
            this._bigPic = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.welfareRechargeList) {
                this.welfareRechargeList.dispose();
                this.welfareRechargeList = null;
            }
        };
        WelfareRecharge.prototype.initUiAtlas = function ($uiAtlas) {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._bigPic.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        WelfareRecharge.prototype.initView = function () {
            var renderLevel = this._baseRender;
            //大背景
            this.addChild(this._bigPic.getComponent("b_pic"));
            this._bigPic.setImgUrl("ui/uidata/welfare/adbg.png");
            var t_info = this.addChild(renderLevel.getComponent("t_info1"));
            var tab = tb.TB_welfare_base.get_TB_welfare_baseById(1);
            this.addChild(renderLevel.getComponent("a_probg"));
            this.a_pro = this.addChild(this._topRender.getComponent("a_pro"));
            this.a_info = this.addChild(this._topRender.getComponent("a_info"));
            LabelTextFont.writeTextAutoVerticalCenter(this._baseRender.uiAtlas, t_info.skinName, "活动说明：" + tab.recharge_info, 16, ColorType.Brown40120a, 545, "", true);
            // var tabvo: Array<tb.TB_welfare_level_show> = tb.TB_welfare_level_show.get_TB_welfare_level_show();
            // for (var i = 0; i < tabvo[0].item.length; i++) {
            //     var aa: UICompenent = this.addEvntButUp("l_reward" + i, renderLevel);
            //     aa.data = tabvo[0].item[i]
            //     this.drawReward(aa);
            // }
            // this.addChild(<UICompenent>renderLevel.getComponent("a_37"));
            // this.addChild(<UICompenent>renderLevel.getComponent("a_36"));
            // this._lev = this.addChild(<UICompenent>renderLevel.getComponent("lev"));
            this.slistIndex2 = this.addChild(renderLevel.getComponent("slistIndex2"));
        };
        WelfareRecharge.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.welfareRechargeList) {
                this.welfareRechargeList.left = this.slistIndex2.parent.x / UIData.Scale + this.slistIndex2.x;
                this.welfareRechargeList.top = this.slistIndex2.parent.y / UIData.Scale + this.slistIndex2.y;
            }
        };
        WelfareRecharge.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        };
        WelfareRecharge.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.welfareRechargeList) {
                this.welfareRechargeList.hide();
            }
        };
        WelfareRecharge.prototype.resetData = function () {
            if (!this.welfareRechargeList) {
                this.welfareRechargeList = new WelfareRechargeList();
                this.welfareRechargeList.init(this._baseRender.uiAtlas);
            }
            this.welfareRechargeList.show();
            var vo = this.getItem();
            var raro = 1;
            var str = "已达上限";
            if (vo) {
                raro = GuidData.player.getChongZhiSum() / vo.data.money;
                str = ColorType.Whitefff0b4 + "距离下档奖励还需要充值" + ColorType.Whiteffffff + (vo.data.money - GuidData.player.getChongZhiSum()) + ColorType.Whitefff0b4 + "元";
            }
            this.a_pro.uvScale = raro;
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_info.skinName, str, 16, TextAlign.CENTER);
            this.resize();
        };
        WelfareRecharge.prototype.getItem = function () {
            var a = GuidData.quest.getRechargeRewardList();
            for (var i = 0; i < a.length; i++) {
                if (a[i].state == 2) {
                    return a[i];
                }
            }
            return null;
        };
        return WelfareRecharge;
    }(UIVirtualContainer));
    welfare.WelfareRecharge = WelfareRecharge;
    /**
     * 充值返利list
     */
    var WelfareRechargeList = /** @class */ (function (_super) {
        __extends(WelfareRechargeList, _super);
        function WelfareRechargeList() {
            var _this = _super.call(this) || this;
            _this.left = 222;
            _this.top = 192;
            return _this;
        }
        WelfareRechargeList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        WelfareRechargeList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, WelfareGeneralListRender, 681, 319, 0, 83, 3, 512, 512, 1, 6);
        };
        WelfareRechargeList.prototype.compareAry = function ($ary) {
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
        WelfareRechargeList.prototype.refreshDataByNewData = function () {
            var $flag = true;
            var a = GuidData.quest.getRechargeRewardList();
            if (this._everycheckinlist) {
                $flag = this.compareAry(a);
            }
            if ($flag) {
                //console.log("数据变化了");
                this._everycheckinlist = a;
                var $sListItemData = this.getData(this._everycheckinlist);
                this.refreshData($sListItemData);
            }
        };
        WelfareRechargeList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        WelfareRechargeList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        };
        WelfareRechargeList.prototype.refreshAndselectIndex = function () {
            // var num: number = Math.floor(GuidData.quest.getcurDays() / 7);
            // //console.log("num----", num);
            // this.scrollY(100);
            this.refreshDataByNewData();
        };
        WelfareRechargeList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return WelfareRechargeList;
    }(SList));
    welfare.WelfareRechargeList = WelfareRechargeList;
    var WelfareGeneralListRender = /** @class */ (function (_super) {
        __extends(WelfareGeneralListRender, _super);
        function WelfareGeneralListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        WelfareGeneralListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Txt", 12, 34, 68, 20);
            $container.addChild(this.Txt);
            this.Cost = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cost", 59, 19, 100, 35);
            $container.addChild(this.Cost);
            this._ary = new Array;
            this.I2reward0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward0", 171, 8, 68, 68);
            $container.addChild(this.I2reward0);
            this.I2reward0.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward0);
            this.I2reward1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward1", 251, 8, 68, 68);
            $container.addChild(this.I2reward1);
            this.I2reward1.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward1);
            this.I2reward2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward2", 331, 8, 68, 68);
            $container.addChild(this.I2reward2);
            this.I2reward2.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward2);
            this.I2reward3 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward3", 411, 8, 68, 68);
            $container.addChild(this.I2reward3);
            this.I2reward3.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward3);
            this.I2btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2btn", 536, 19, 105, 46);
            $container.addChild(this.I2btn);
            this.I2btn.addEventListener(InteractiveEvent.Up, this.btnChick, this);
            this.I2tembg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "I2tembg", 0, 0, 681, 83);
            $container.addChild(this.I2tembg);
        };
        WelfareGeneralListRender.prototype.drawBtn = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.I2btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var btnstateRect1;
            if (this.itdata.data.state == 1) {
                //领取
                btnstateRect1 = this.parentTarget.baseAtlas.getRec("receivebtn");
            }
            else if (this.itdata.data.state == 2) {
                //未达到
                btnstateRect1 = this.parentTarget.baseAtlas.getRec("no");
            }
            else {
                //已领取
                btnstateRect1 = this.parentTarget.baseAtlas.getRec("ok");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, btnstateRect1.pixelX, btnstateRect1.pixelY, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight, 0, 0, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        WelfareGeneralListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                //奖励
                for (var i = 0; i < this._ary.length; i++) {
                    var vo = this.itdata.data;
                    if (i < this.itdata.data.data.item.length) {
                        this._ary[i].data = vo.data.item[i];
                        // this.drawIcon(this._ary[i]);
                        IconManager.getInstance().drawItemIcon60(this._ary[i], vo.data.item[i][0], vo.data.item[i][1], vo.state == 3, false);
                    }
                    else {
                        this._ary[i].data = null;
                        UiDraw.clearUI(this._ary[i]);
                    }
                }
                var txt;
                if (this.itdata.data.type == SharedDef.MODULE_WELFARE_CONSUME) {
                    txt = "TxtCost";
                    UiDraw.drawRewardIconAndtxt(this.Cost, [1, this.itdata.data.data.money], false, TextAlign.LEFT, 5);
                }
                else if (this.itdata.data.type == SharedDef.MODULE_WELFARE_RECHARGE) {
                    txt = "TxtRecharge";
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Cost.skinName, this.itdata.data.data.money + "元", 16, TextAlign.CENTER, ColorType.Brown7a2f21, "", 16);
                }
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Txt.skinName, txt);
                this.drawBtn();
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I2tembg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
            }
        };
        WelfareGeneralListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        WelfareGeneralListRender.prototype.equClick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            var ary = evt.target.data;
            if (ary && ary.length > 0) {
                //查看物品详情
                var obj = tb.TB_item_template.get_TB_item_template(ary[0]);
                var bag = new BagItemData();
                bag.entryData = obj;
                var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                aa.data = bag;
                aa.buttonType = -1;
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        WelfareGeneralListRender.prototype.btnChick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                if (this.itdata.data.state == 1) {
                    if (this.itdata.data.type == SharedDef.MODULE_WELFARE_CONSUME) {
                        NetManager.getInstance().protocolos.welfare_get_consume_reward(this.itdata.data.data.id);
                    }
                    else if (this.itdata.data.type == SharedDef.MODULE_WELFARE_RECHARGE) {
                        NetManager.getInstance().protocolos.welfare_get_recharge_reward(this.itdata.data.data.id);
                    }
                }
            }
        };
        WelfareGeneralListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Txt);
            UiDraw.clearUI(this.Cost);
            UiDraw.clearUI(this.I2reward0);
            UiDraw.clearUI(this.I2reward1);
            UiDraw.clearUI(this.I2reward2);
            UiDraw.clearUI(this.I2reward3);
            UiDraw.clearUI(this.I2btn);
            UiDraw.clearUI(this.I2tembg);
        };
        return WelfareGeneralListRender;
    }(SListItem));
    welfare.WelfareGeneralListRender = WelfareGeneralListRender;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareRecharge.js.map