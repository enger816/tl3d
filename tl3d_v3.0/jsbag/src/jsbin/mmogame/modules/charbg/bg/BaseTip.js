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
var BaseTip = /** @class */ (function (_super) {
    __extends(BaseTip, _super);
    function BaseTip() {
        var _this = _super.call(this) || this;
        _this._needBtn = true;
        _this.quaNameAry = ["凡品", "良品", "上品", "精品", "极品", "圣品"];
        _this.colorNameAry = ["白色", "绿色", "蓝色", "紫色", "橙色", "红色"];
        _this.quaColorAry = ["#ffffff", "#56da35", "#4392ff", "#b759ff", "#ff7200", "#ce0a00"];
        _this.dynamicPosList = new Array;
        _this._basebgRender = new UIRenderComponent();
        _this._baseRender = new UIRenderComponent();
        _this._bgRender = new UIRenderComponent();
        _this._nextRender = new UIRenderComponent();
        _this.addRender(_this._basebgRender);
        _this.addRender(_this._bgRender);
        _this.addRender(_this._baseRender);
        _this.addRender(_this._nextRender);
        return _this;
    }
    BaseTip.prototype.setUIAtlas = function ($us) {
        this._uiAtlas = $us;
        this._basebgRender.uiAtlas = $us;
        this._baseRender.uiAtlas = $us;
        this._bgRender.uiAtlas = $us;
        this._nextRender.uiAtlas = $us;
        this.initBase();
    };
    BaseTip.prototype.show = function ($data, buttonType) {
        this._data = $data;
        this._entryData = this._data.entryData;
        this._btnType = buttonType;
        //this._needBtn = needBtn;
        if (buttonType == -1 || buttonType == 3 || buttonType == 6) {
            this._needBtn = false;
        }
        else {
            this._needBtn = true;
        }
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
            // Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }
        this.refresh();
    };
    BaseTip.prototype.showBtn = function () {
    };
    BaseTip.prototype.hide = function () {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            // Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }
    };
    BaseTip.prototype.clickEvt = function ($evt) {
        //如果有强制引导则不关闭
        // if(GuidData.player.needGuididPop){
        //     return;
        // }
        this.hide();
    };
    BaseTip.prototype.refresh = function () {
        this.refreshIconName();
        ////console.log("道具信息",this._data.tempStr);
        this.showBtn();
    };
    BaseTip.prototype.refreshIconName = function () {
        var _this = this;
        // UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
        // ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
        // UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(3, 3, 62, 62), UIData.publicUi);
        IconManager.getInstance().getIcon(geteqiconIconUrl(this._entryData.icon), function ($img) {
            var rec = _this._uiAtlas.getRec(_this._t_icon.skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(_this._entryData.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
            ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
            if (_this._entryData.type == 1) {
                UiDraw.cxtDrawImg(ctx, "A_JJ" + _this._entryData.realmbreak_level, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                //ArtFont.getInstance().writeFontToCtxCenten(ctx, String(this._entryData.level), ArtFont.num63, 18, 4, 4);
            }
            _this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        });
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_name.skinName, this._entryData.name, 18, TextAlign.LEFT, this.getColorQua(this._entryData.quality));
    };
    BaseTip.prototype.getQuaName = function (qua) {
        return this.quaNameAry[qua];
    };
    BaseTip.prototype.getColorName = function (qua) {
        return this.colorNameAry[qua];
    };
    BaseTip.prototype.getColorQua = function (qua) {
        return this.quaColorAry[qua];
    };
    BaseTip.prototype.getNumColor = function (type) {
        switch (type) {
            case 0:
                return ArtFont.num16;
            case 1:
                return ArtFont.num7;
            case 2:
                return ArtFont.num17;
            case 3:
                return ArtFont.num18;
            case 4:
                return ArtFont.num19;
            case 5:
                return ArtFont.num6;
            default:
                return ArtFont.num16;
        }
    };
    Object.defineProperty(BaseTip.prototype, "isEqu", {
        get: function () {
            return Number(this._entryData.type) == SharedDef.ITEM_TYPE_EQUIP;
        },
        enumerable: true,
        configurable: true
    });
    BaseTip.prototype.resize = function () {
        if (this.b_basebg) {
            this.b_basebg.top = 0;
            this.b_basebg.left = 0;
            this.b_basebg.y = 0;
            this.b_basebg.x = 0;
            this.b_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.b_basebg.width = Scene_data.stageWidth / UIData.Scale;
        }
        _super.prototype.resize.call(this);
    };
    BaseTip.prototype.initBase = function () {
        var ui;
        this.b_basebg = this.addChild(this._basebgRender.getComponent("b_basebg"));
        this.b_basebg.addEventListener(InteractiveEvent.Up, function ($evt) {
            ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
        }, this);
        this.b_basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
        this._bg = this._bgRender.getComponent("t_tip_bg");
        this.addChild(this._bg);
        this._t_icon = this._baseRender.getComponent("t_icon");
        this.addChild(this._t_icon);
        this._t_name = this._baseRender.getComponent("t_name");
        this.addChild(this._t_name);
        ui = this._baseRender.getComponent("t_type");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "类型:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);
        this._t_type_value = this._baseRender.getComponent("t_type_val");
        this.addChild(this._t_type_value);
        this._t_lev_lab = this._baseRender.getComponent("t_lev");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._t_lev_lab.skinName, "等级:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(this._t_lev_lab);
        this._t_lev_value = this._baseRender.getComponent("t_lev_val");
        this.addChild(this._t_lev_value);
        this._t_zl_value = this._baseRender.getComponent("t_zl_val");
        this.addChild(this._t_zl_value);
        // var priceLable: UICompenent = this._nextRender.getComponent("t_price")
        // this.addChild(priceLable);
        // this._t_price = this._nextRender.getComponent("t_price_val");
        // this.addChild(this._t_price);
        // this._t_bind = this._nextRender.getComponent("t_bind");
        // this.addChild(this._t_bind);
        // this._t_time = this._nextRender.getComponent("t_time");
        // this.addChild(this._t_time);
        this._t_btn_bg = this._bgRender.getComponent("t_btn_bg");
        this._t_btn_bg.addEventListener(InteractiveEvent.Down, this.bgUp, this);
        //this.dynamicPosList.push(priceLable, this._t_price, this._t_bind, this._t_time);
        // this._t_use_btn = this._nextRender.getComponent("t_sy_btn");
        // this.addChild(this._t_use_btn);
        // this._t_use_btn.y = 439;
        // this._t_use_btn.addEventListener(InteractiveEvent.Down, this.useItem, this);
        // this._t_sel_btn = this._nextRender.getComponent("t_cs_btn");
        // this.addChild(this._t_sel_btn);
        // this._t_sel_btn.y = 489;
        this.initBtn();
    };
    BaseTip.prototype.bgUp = function () {
    };
    BaseTip.prototype.refreshBottomInfo = function () {
        /* var propData: any;
        if (this._data.data) {
            propData = this._data.data.propData;
        }

        if (propData && propData.ifailtm) {
            //console.log(propData.ifailtm, TimeUtil.getLocalTime(propData.ifailtm))
            LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_time.skinName, TimeUtil.getLocalTime(propData.ifailtm) + " 过期", 12, TextAlign.LEFT, "#ff0000");
        } else {
            LabelTextFont.clearLabel(this._uiAtlas, this._t_time.skinName);
        } */
    };
    BaseTip.prototype.initBtn = function () {
    };
    // protected useItem(): void {
    //     var guid: string = this.getGuid();
    //     if (this._showType == 0) {
    //         if (this.isEqu) {
    //             NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_MAIN_BAG, this._data.pos, SharedDef.BAG_TYPE_EQUIP, Number(this._entryData.pos));
    //         } else {
    //             NetManager.getInstance().protocolos.bag_item_user(guid, 1);
    //         }
    //     } else if (this._showType == 1) {
    //         if (this.isEqu) {
    //             NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP, this._data.pos,
    //                 SharedDef.BAG_TYPE_MAIN_BAG, GuidData.bag.getEmptyPos());
    //         }
    //     }
    //     this.hide();
    // }
    BaseTip.prototype.getGuid = function () {
        return GuidData.bag.getPlayerGuid() + ";" + this._data.id;
    };
    BaseTip.prototype.selItem = function () {
        var guid = this.getGuid();
        NetManager.getInstance().protocolos.bag_item_sell(guid, this._data.count);
        //console.log("出售商品：",guid,"数量",this._data.count);
        // this.hide();
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    return BaseTip;
}(UIConatiner));
//# sourceMappingURL=BaseTip.js.map