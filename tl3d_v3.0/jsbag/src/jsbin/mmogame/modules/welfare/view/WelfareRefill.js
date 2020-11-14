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
    var WelfareRefill = /** @class */ (function (_super) {
        __extends(WelfareRefill, _super);
        function WelfareRefill() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        WelfareRefill.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
        };
        WelfareRefill.prototype.initUiAtlas = function ($uiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        WelfareRefill.prototype.initView = function () {
            var renderLevel = this._baseRender;
            //大背景
            var ui = this.parent.loadBigPicByUrl("ui/uidata/welfare/refillbg.jpg");
            this.parent.setSizeForPanelUiCopy(ui, "d_basebg", this._baseRender);
            this.propAry = new Array;
            this.txtAry = new Array;
            this.resAry = new Array;
            for (var i = 0; i < 3; i++) {
                this.propAry.push(this.addChild(renderLevel.getComponent("d_prop" + i)));
                this.resAry.push(this.addEvntButUp("d_rew" + i, renderLevel));
                this.txtAry.push(this.addChild(renderLevel.getComponent("d_txt" + i)));
            }
            this.d_pro = this.addChild(this._bottomRender.getComponent("d_pro"));
            this.selbtn = this.addChild(renderLevel.getComponent("selbtn"));
            this.selbtn.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.d_info = this.addChild(renderLevel.getComponent("d_info"));
            this.buildFram();
        };
        WelfareRefill.prototype.buildFram = function () {
            var _this = this;
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, function ($ary) {
                    _this.effAry = $ary;
                    for (var i = 0; i < _this.effAry.length; i++) {
                        _this.effAry[i].x = _this.resAry[i].x - 30;
                        _this.effAry[i].y = _this.resAry[i].y - 30;
                        // this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        // this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        _this.effAry[i].speed = 3;
                    }
                    _this.playEff();
                }, this.resAry.length);
            }
        };
        WelfareRefill.prototype.playEff = function () {
            if (!this.effAry) {
                return;
            }
            for (var i = 0; i < this.resAry.length; i++) {
                if (this.resAry[i].data) {
                    if (this.resAry[i].data[0] == 1) {
                        this.addChild(this.effAry[i]);
                        this.effAry[i].play();
                    }
                    else {
                        this.removeChild(this.effAry[i]);
                    }
                }
            }
        };
        WelfareRefill.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        WelfareRefill.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.parent.addBigPic();
            this.resetData();
        };
        WelfareRefill.prototype.hide = function () {
            this.parent.removeBigPic();
            UIManager.getInstance().removeUIContainer(this);
        };
        WelfareRefill.prototype.resetData = function () {
            var tabary = tb.TB_recharge_7day_extra_reward.get_TB_quest_adventure_base();
            var flagary = GuidData.quest.getRefillrewardflag();
            var rechargeday = GuidData.quest.getRechargeDay();
            //进度条进度
            var proratio = 0;
            for (var i = 0; i < tabary.length; i++) {
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.txtAry[i].skinName, "累充" + tabary[i].day + "天", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                var state = 2;
                if (!flagary[i]) {
                    state = tabary[i].day > rechargeday ? 0 : 1;
                }
                if (state > 0) {
                    proratio = i * 0.5;
                }
                this.resAry[i].data = [state, tabary[i].id, tabary[i].reward[0][0]];
                this.drawIcon(this.resAry[i], tabary[i].reward[0][0], tabary[i].reward[0][1], state);
            }
            this.d_pro.scale = proratio;
            this.setUiListVisibleByItem([this.d_info], rechargeday < 7);
            if (rechargeday < 7) {
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, "D_day", String(rechargeday), 32, TextAlign.CENTER, ColorType.Whitefff4d6);
            }
            var $objreward;
            if (GuidData.quest.isRefillToDay()) {
                rechargeday = Math.max(rechargeday, 1);
                $objreward = TableData.getInstance().getData(TableData.tb_recharge_7day_reward, rechargeday)["reward"];
            }
            else {
                rechargeday = Math.min(rechargeday, 7);
                $objreward = TableData.getInstance().getData(TableData.tb_recharge_7day_reward, rechargeday + 1)["reward"];
            }
            for (var k = 0; k < $objreward.length; k++) {
                IconManager.getInstance().drawItemIcon60(this.propAry[k], $objreward[k][0], $objreward[k][1]);
            }
            this.selbtn.goToAndStop(GuidData.quest.isRefillToDay() ? 0 : 1);
            this.playEff();
            this.resize();
        };
        /**
         * @param  $state 0不可领取 1可领取 2已领取
         */
        WelfareRefill.prototype.drawIcon = function ($ui, $id, $num, $state) {
            var _this = this;
            var obj = tb.TB_item_template.get_TB_item_template($id);
            IconManager.getInstance().getIconName(obj.icon, function ($img) {
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                if (obj.type == 1) {
                    UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                    ArtFont.getInstance().writeFontToCtxCenten(ctx, String(obj.level), ArtFont.num63, 18, 4, 4);
                }
                if ($num > 1) {
                    var strNum = Snum($num);
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, strNum, 16, 64, 45, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                }
                if ($state == 0) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68));
                }
                if ($state == 2) {
                    var StateRect2 = _this._baseRender.uiAtlas.getRec("iconrec");
                    ctx.drawImage(_this._baseRender.uiAtlas.useImg, StateRect2.pixelX, StateRect2.pixelY, StateRect2.pixelWitdh, StateRect2.pixelHeight, 3, 20, StateRect2.pixelWitdh, StateRect2.pixelHeight);
                }
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        WelfareRefill.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.selbtn:
                    if (!GuidData.quest.isRefillToDay()) {
                        ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                    }
                    break;
                default:
                    if (evt.target.data[0] == 1) {
                        NetManager.getInstance().protocolos.get_seven_day_recharge_extra_reward(evt.target.data[1]);
                    }
                    else if (evt.target.data[0] == 0) {
                        //查看奖励信息
                        var obj = tb.TB_item_template.get_TB_item_template(evt.target.data[2]);
                        var bag = new BagItemData();
                        bag.entryData = obj;
                        var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                        aa.data = bag;
                        aa.buttonType = -1;
                        ModuleEventManager.dispatchEvent(aa);
                    }
                    break;
            }
        };
        return WelfareRefill;
    }(UIVirtualContainer));
    welfare.WelfareRefill = WelfareRefill;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareRefill.js.map