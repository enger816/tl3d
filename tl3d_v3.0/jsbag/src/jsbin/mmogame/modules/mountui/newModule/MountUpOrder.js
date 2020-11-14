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
var mountui;
(function (mountui) {
    var MountUpOrder = /** @class */ (function (_super) {
        __extends(MountUpOrder, _super);
        function MountUpOrder() {
            var _this = _super.call(this) || this;
            /**
             * 一键熔炼状态获取
             */
            _this._info = "";
            // private drawCost($ui: UICompenent, $CostAry: Array<number>): boolean {
            //     var costnum: string;
            //     var flag: boolean;
            //     var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($CostAry[0])
            //     if ($vo.money_type && $vo.money_type > 0) {
            //         //资源
            //         if (GuidData.player.getResType($vo.money_type - 1) >= $CostAry[1]) {
            //             costnum = ColorType.Green98ec2c + Snum($CostAry[1]);
            //             flag = true;
            //         } else {
            //             flag = false;
            //             costnum = ColorType.Redce0a00 + Snum($CostAry[1]);
            //         }
            //     } else {
            //         //材料
            //         if (GuidData.bag.hasItem($CostAry[0], $CostAry[1])) {
            //             costnum = ColorType.Green98ec2c + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
            //             flag = true;
            //         } else {
            //             flag = false;
            //             costnum = ColorType.Redce0a00 + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
            //         }
            //     }
            //     LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $ui.skinName, costnum, 14, TextAlign.CENTER);
            //     return flag;
            // }
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
            _this._redRender = new RedPointRender;
            _this.addRender(_this._redRender);
            return _this;
        }
        MountUpOrder.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redRender.dispose();
            this._redRender = null;
        };
        MountUpOrder.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        MountUpOrder.prototype.initView = function () {
            var _this = this;
            var renderLevel = this._baseRender;
            this.attrary = new Array;
            this.nextattrary = new Array;
            for (var i = 0; i < 8; i++) {
                this.attrary.push(this.addChild(renderLevel.getComponent("c_attr" + i)));
                this.nextattrary.push(renderLevel.getComponent("c_nextattr" + i));
            }
            this.addUIList(["c_titlebg", "c_line2"], this._baseRender);
            this.addUIList(["c_attrtitle"], this._topRender);
            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "cbtnBg", renderLevel);
            this._publicRender.applyObjData();
            this.c_allbtn = this._topRender.getComponent("c_allbtn");
            this.c_allbtn.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.UplevAry = new Array;
            this.OverlevAry = new Array;
            this.UplevAry.push(renderLevel.getComponent("c_item0"));
            this.UplevAry.push(renderLevel.getComponent("c_item1"));
            this.UplevAry.push(renderLevel.getComponent("c_itemnum0"));
            this.UplevAry.push(renderLevel.getComponent("c_itemnum1"));
            this.UplevAry.push(this._topRender.getComponent("c_btntxt"));
            this.UplevAry.push(this.cnew_btn1);
            this.UplevAry.push(this.c_allbtn);
            this.OverlevAry.push(this._topRender.getComponent("c_over"));
            this._redRender.getRedPointUI(this, 134, new Vector2D(this.c_allbtn.x + this.c_allbtn.width, this.c_allbtn.y));
            this.btnRedPoint = this._redRender.getRedPointUI(this, 29, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
            this._tickFun = function () { _this.tickRefreshState(); };
        };
        MountUpOrder.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MountUpOrder.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this._autoplay = false;
            this.drawBtn();
            this.resetData();
            this.resize();
        };
        MountUpOrder.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        MountUpOrder.prototype.resetData = function () {
            this._vo = mountui.NewMountModel.getInstance().getOrderAttribute();
            this.parent.setAvatar();
            this.setcostary();
            this.showAttr();
            this.drawBtnAndProp();
            this.setUiListVisibleByItem([this.c_allbtn], GuidData.grow.getMountStart() != 10);
            if (GuidData.grow.getMountStart() == 10 && this._autoplay) {
                this.removeTick();
            }
            // this.cnew_btn1.y = GuidData.grow.getMountStart() == 10 ? 434 : 461
            // this.btnRedPoint.y = this.cnew_btn1.y
            // this.UplevAry[4].y = GuidData.grow.getMountStart() == 10 ? 451 : 478
        };
        MountUpOrder.prototype.showAttr = function () {
            this.setUiListVisibleByItem(this.nextattrary, this._vo.state != 2);
            var posx;
            //绘制下一级属性
            for (var j = 0; j < this.nextattrary.length; j++) {
                if (this._vo.nexttab == null) {
                    break;
                }
                if (this._vo.nexttab.length - 1 < j) {
                    this.setUiListVisibleByItem([this.nextattrary[j]], false);
                }
                else {
                    UiDraw.drawAddValTop(this.nextattrary[j], this._vo.nexttab[j]);
                }
            }
            //绘制当前属性
            for (var i = 0; i < this.attrary.length; i++) {
                if (this._vo.curtab.prosKeys.length - 1 < i) {
                    this.setUiListVisibleByItem([this.attrary[i]], false);
                }
                else {
                    UiDraw.drawAttVal(this.attrary[i], this._vo.curtab.prosKeys[i], this._vo.curtab.prosValues[i]);
                    this.attrary[i].x = this._vo.state == 2 ? 669 : 630;
                }
            }
        };
        /**
         * 绘制一键升级按钮
         */
        MountUpOrder.prototype.drawBtn = function () {
            var $rec = this.c_allbtn.uiRender.uiAtlas.getRec(this.c_allbtn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var canplay = this.getsmeltallstate();
            var usemsg;
            if (canplay) {
                usemsg = this._autoplay ? "btnbgclose" : "btnbgopen";
            }
            else {
                usemsg = "unlockbtnbg";
            }
            var imgUseRect1 = this.c_allbtn.uiRender.uiAtlas.getRec(usemsg);
            ctx.drawImage(this.c_allbtn.uiRender.uiAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            if (!canplay) {
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, this._info, 14, $rec.pixelWitdh / 2, ($rec.pixelHeight / 2) - (10), TextAlign.CENTER, ColorType.Whitefffce6);
            }
            this.c_allbtn.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        MountUpOrder.prototype.getsmeltallstate = function () {
            this._info = "";
            var canplay = false;
            var $smeltobj = TableData.getInstance().getData(TableData.tb_vip_uplev, 2);
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
        MountUpOrder.prototype.setcostary = function () {
            var costary;
            if (GuidData.grow.getMountStart() == 10) {
                var tab = tb.TB_mount_upgrade.get_TB_mount_upgrade(GuidData.grow.getMountLevel());
                costary = tab.upgradecost;
            }
            else {
                var basetab = tb.TB_mount_train_vo.getTB_mount_train_vo(GuidData.grow.getMountLevel(), GuidData.grow.getMountStart());
                costary = basetab.traincost;
            }
            this._costary = costary;
        };
        MountUpOrder.prototype.drawBtnAndProp = function () {
            this.setUiListVisibleByItem(this.OverlevAry, this._vo.state == 2);
            this.setUiListVisibleByItem(this.UplevAry, this._vo.state != 2);
            if (this._vo.state != 2) {
                var flagary = new Array;
                if (GuidData.grow.getMountStart() == 10) {
                    this.UplevAry[4].goToAndStop(1);
                }
                else {
                    this.UplevAry[4].goToAndStop(0);
                }
                for (var i = 0; i < 2; i++) {
                    if (i < this._costary.length) {
                        IconManager.getInstance().drawItemIcon60(this.UplevAry[i], this._costary[i][0]);
                        //绘制消耗资源图标，并把资源满足情况记录下来
                        flagary.push(UiDraw.drawResHasNumAndAllNum(this.UplevAry[i + 2], this._costary[i]));
                        //调整位置
                        this.UplevAry[2].x = this._costary.length == 1 ? 687 : 633;
                        this.UplevAry[0].x = this._costary.length == 1 ? 699 : 645;
                    }
                    else {
                        LabelTextFont.clearLabel(this._topRender.uiAtlas, this.UplevAry[i + 2].skinName);
                        LabelTextFont.clearLabel(this._topRender.uiAtlas, this.UplevAry[i].skinName);
                    }
                }
                this._canbuy = flagary;
            }
        };
        MountUpOrder.prototype.butClik = function (evt) {
            var _this = this;
            if (this._canclick) {
                UIManager.popClikNameFun(evt.target.name);
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, function () {
                    _this._canclick = true;
                });
                switch (evt.target) {
                    case this.cnew_btn1:
                        //判断资源是否满足
                        if (this._autoplay) {
                            AlertUtil.show("当前正在自动培养坐骑，是否取消？", "提示", function (a) {
                                if (a == 1) {
                                    _this.removeTick();
                                }
                            }, 2, ["是", "否"]);
                            return;
                        }
                        this.tickRefreshState();
                        break;
                    case this.c_allbtn:
                        var canplay = this.getsmeltallstate();
                        if (canplay) {
                            if (this._autoplay) {
                                this.removeTick();
                            }
                            else {
                                this.addTick();
                            }
                        }
                        else {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this._info + "一键培养功能", 99);
                        }
                        break;
                    default:
                        break;
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        };
        MountUpOrder.prototype.addTick = function () {
            this._autoplay = true;
            this.drawBtn();
            TimeUtil.addTimeTick(1000, this._tickFun);
        };
        MountUpOrder.prototype.removeTick = function () {
            this._autoplay = false;
            this.drawBtn();
            TimeUtil.removeTimeTick(this._tickFun);
        };
        MountUpOrder.prototype.tickRefreshState = function () {
            if (!this.hasStage) {
                this.removeTick();
            }
            var $canbuy;
            var $idx;
            if (this._canbuy.length == 2) {
                $canbuy = this._canbuy[0] && this._canbuy[1];
                if (!$canbuy) {
                    $idx = this._canbuy[0] ? this._costary[1][0] : this._costary[0][0];
                }
            }
            else {
                $canbuy = this._canbuy[0];
                if (!$canbuy) {
                    $idx = this._costary[0][0];
                }
            }
            if ($canbuy) {
                if (GuidData.grow.getMountStart() == 10) {
                    NetManager.getInstance().protocolos.upgrade_mount(0);
                }
                else {
                    NetManager.getInstance().protocolos.raise_mount();
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = $idx;
                ModuleEventManager.dispatchEvent($aaa);
                this.removeTick();
            }
        };
        return MountUpOrder;
    }(UIVirtualContainer));
    mountui.MountUpOrder = MountUpOrder;
})(mountui || (mountui = {}));
//# sourceMappingURL=MountUpOrder.js.map