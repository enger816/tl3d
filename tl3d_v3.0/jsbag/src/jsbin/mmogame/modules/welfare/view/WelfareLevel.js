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
    var WelfareLevel = /** @class */ (function (_super) {
        __extends(WelfareLevel, _super);
        function WelfareLevel() {
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
            return _this;
            // this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender)
        }
        WelfareLevel.prototype.dispose = function () {
            this._bigPic.dispose();
            this._bigPic = null;
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.welfareLevelList) {
                this.welfareLevelList.dispose();
                this.welfareLevelList = null;
            }
        };
        WelfareLevel.prototype.initUiAtlas = function ($uiAtlas) {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._bigPic.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        WelfareLevel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            //大背景
            this.addChild(this._bigPic.getComponent("b_pic"));
            this._bigPic.setImgUrl("ui/uidata/welfare/adbg.png");
            var t_info = this.addChild(renderLevel.getComponent("t_info"));
            var tab = tb.TB_welfare_base.get_TB_welfare_baseById(1);
            LabelTextFont.writeTextAutoVerticalCenter(this._baseRender.uiAtlas, t_info.skinName, "活动说明：" + tab.lev_info, 16, ColorType.Brown40120a, 545, "", true);
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
        WelfareLevel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.welfareLevelList) {
                this.welfareLevelList.left = this.slistIndex2.parent.x / UIData.Scale + this.slistIndex2.x;
                this.welfareLevelList.top = this.slistIndex2.parent.y / UIData.Scale + this.slistIndex2.y;
            }
        };
        WelfareLevel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        };
        WelfareLevel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.welfareLevelList) {
                this.welfareLevelList.hide();
            }
        };
        WelfareLevel.prototype.resetData = function () {
            if (!this.welfareLevelList) {
                this.welfareLevelList = new WelfareLevelList();
                this.welfareLevelList.init(this._baseRender.uiAtlas);
            }
            this.welfareLevelList.show();
            this.resize();
        };
        return WelfareLevel;
    }(UIVirtualContainer));
    welfare.WelfareLevel = WelfareLevel;
    /**
     * 升级奖励list
     */
    var WelfareLevelList = /** @class */ (function (_super) {
        __extends(WelfareLevelList, _super);
        function WelfareLevelList() {
            var _this = _super.call(this) || this;
            _this.left = 222;
            _this.top = 192;
            return _this;
        }
        WelfareLevelList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        WelfareLevelList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, WelfareLevelListRender, 681, 319, 0, 83, 3, 512, 512, 1, 6);
        };
        WelfareLevelList.prototype.compareAry = function ($ary) {
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
        WelfareLevelList.prototype.refreshDataByNewData = function () {
            var $flag = true;
            var a = GuidData.quest.getLevelUpRewardList();
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
        WelfareLevelList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        WelfareLevelList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        };
        WelfareLevelList.prototype.refreshAndselectIndex = function () {
            // var num: number = Math.floor(GuidData.quest.getcurDays() / 7);
            // //console.log("num----", num);
            // this.scrollY(100);
            this.refreshDataByNewData();
        };
        WelfareLevelList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return WelfareLevelList;
    }(SList));
    welfare.WelfareLevelList = WelfareLevelList;
    var WelfareLevelListRender = /** @class */ (function (_super) {
        __extends(WelfareLevelListRender, _super);
        function WelfareLevelListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        WelfareLevelListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.I2name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2name", 45, 34, 100, 20);
            $container.addChild(this.I2name);
            this._ary = new Array;
            this.I2reward0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward0", 171, 8, 68, 68);
            $container.addChild(this.I2reward0);
            // this.I2reward0.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward0);
            this.I2reward1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward1", 251, 8, 68, 68);
            $container.addChild(this.I2reward1);
            // this.I2reward1.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward1);
            this.I2reward2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward2", 331, 8, 68, 68);
            $container.addChild(this.I2reward2);
            // this.I2reward2.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward2);
            this.I2reward3 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward3", 411, 8, 68, 68);
            $container.addChild(this.I2reward3);
            // this.I2reward3.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward3);
            this.I2btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2btn", 536, 19, 105, 46);
            $container.addChild(this.I2btn);
            this.I2btn.addEventListener(InteractiveEvent.Up, this.btnChick, this);
            this.I2tembg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "I2tembg", 0, 0, 681, 83);
            $container.addChild(this.I2tembg);
        };
        // private drawIcon($ui: UICompenent): void {
        //     var vo: LevelUpRewardItemData = this.itdata.data
        //     var ary: Array<number> = $ui.data
        //     IconManager.getInstance().getIcon(GameData.getIconCopyUrl(ary[0]),
        //         ($img: any) => {
        //             var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
        //             var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
        //             UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
        //             //头像
        //             ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
        //             LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whiteffffff + ary[1], 16, 64, 44, TextAlign.RIGHT);
        //             if (vo.state == 1) {
        //                 //领取
        //                 UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(2, 2, 64, 64), UIData.publicUi);
        //             } else if (vo.state == 3) {
        //                 //图像灰
        //                 UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68))
        //             }
        //             this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        //         });
        // }
        WelfareLevelListRender.prototype.drawBtn = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.I2btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var btnstateRect1;
            if (vo.state == 1) {
                //领取
                btnstateRect1 = this.parentTarget.baseAtlas.getRec("receivebtn");
            }
            else if (vo.state == 2) {
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
        WelfareLevelListRender.prototype.drawTitle = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.I2name.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var total = ArtFont.getInstance().getAirFontWidth(ctx, String(vo.data.lev), ArtFont.num26, 5);
            ArtFont.getInstance().writeFontToCtxLeft(ctx, String(vo.data.lev), ArtFont.num26, 0, 2, 5);
            var LibaoRect1 = this.parentTarget.baseAtlas.getRec("Libao");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, LibaoRect1.pixelX, LibaoRect1.pixelY, LibaoRect1.pixelWitdh, LibaoRect1.pixelHeight, total, 0, LibaoRect1.pixelWitdh, LibaoRect1.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        WelfareLevelListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                //奖励
                var vo = this.itdata.data;
                for (var i = 0; i < this._ary.length; i++) {
                    if (i < vo.data.item.length) {
                        this._ary[i].data = vo.data.item[i];
                        // this.drawIcon(this._ary[i]);
                        IconManager.getInstance().drawItemIcon60(this._ary[i], vo.data.item[i][0], vo.data.item[i][1], vo.state == 3, true);
                    }
                    else {
                        this._ary[i].data = null;
                        UiDraw.clearUI(this._ary[i]);
                        IconManager.getInstance().clearItemEvent(this._ary[i]);
                    }
                }
                // this.drawTitle();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2name.skinName, ColorType.Brown7a2f21 + "升到" + ColorType.Green2ca937 + vo.data.lev + ColorType.Brown7a2f21 + "级", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                this.drawBtn();
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I2tembg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
            }
        };
        WelfareLevelListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        // private equClick(evt: InteractiveEvent): void {
        //     if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
        //         return;
        //     }
        //     var ary: Array<number> = evt.target.data
        //     if (ary && ary.length > 0) {
        //         //查看物品详情
        //         var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(ary[0]);
        //         var bag: BagItemData = new BagItemData();
        //         bag.entryData = obj;
        //         var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        //         aa.data = bag;
        //         aa.buttonType = -1;
        //         ModuleEventManager.dispatchEvent(aa);
        //     }
        // }
        WelfareLevelListRender.prototype.btnChick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.state == 1) {
                    NetManager.getInstance().protocolos.welfare_level(vo.data.id);
                }
            }
        };
        WelfareLevelListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.I2name);
            UiDraw.clearUI(this.I2reward0);
            UiDraw.clearUI(this.I2reward1);
            UiDraw.clearUI(this.I2reward2);
            UiDraw.clearUI(this.I2reward3);
            UiDraw.clearUI(this.I2btn);
            UiDraw.clearUI(this.I2tembg);
        };
        return WelfareLevelListRender;
    }(SListItem));
    welfare.WelfareLevelListRender = WelfareLevelListRender;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareLevel.js.map