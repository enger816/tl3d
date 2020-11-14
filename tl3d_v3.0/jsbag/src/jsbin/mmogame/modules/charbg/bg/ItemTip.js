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
/**
 * 物品TIP
 */
var ItemTip = /** @class */ (function (_super) {
    __extends(ItemTip, _super);
    function ItemTip() {
        var _this = _super.call(this) || this;
        _this.width = 370;
        _this.height = 266;
        _this.center = -115;
        _this.middle = 0;
        return _this;
    }
    ItemTip.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this.refreshLevTypeZL();
        this.refreshTxt();
        this.refreshBottomInfo();
    };
    ItemTip.prototype.showBtn = function () {
        /* if (this._needBtn) {
            this.addChild(this._getBtn);
            this.addChild(this._selBtn);
            this.addChild(this._useBtn);
        } else {
            this.removeChild(this._getBtn);
            this.removeChild(this._selBtn);
            this.removeChild(this._useBtn);
        } */
        this._t_btn_bg.height = 55;
        this._t_btn_bg.y = 220;
        this.addChild(this._t_btn_bg);
        if (this._btnType == -1) {
            this.addChild(this._getBtn);
            this.removeChild(this._useBtn);
        }
        else {
            if (this._entryData.type_c == 3) {
                this.addChild(this._getBtn);
                this.removeChild(this._useBtn);
            }
            else if (this._entryData.type_c == 2 || this._entryData.type_c == 21 || this._entryData.type_c == 22) {
                this.addChild(this._useBtn);
                this.removeChild(this._getBtn);
            }
        }
    };
    ItemTip.prototype.refreshLevTypeZL = function () {
        //var rec: UIRectangle = this._uiAtlas.getRec(this._t_zl_value.skinName);
        //var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        // var baseRec: any = this._uiAtlas.getRec("u_s" + (this._entryData.quality));
        // ctx.drawImage(this._uiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, 34, 17);
        // this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);getQuaName
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_lev_lab.skinName, "等级:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_zl_value.skinName, this.getQuaName(this._entryData.quality), 16, TextAlign.LEFT, this.getColorQua(this._entryData.quality));
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_lev_value.skinName, String(this._entryData.rank), 16, TextAlign.LEFT, ColorType.colorffecc6);
        //ArtFont.getInstance().writeFontToSkinName(this._uiAtlas, this._t_lev_value.skinName, String(this._entryData.level), ArtFont.num16);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_type_value.skinName, this.getTypeName(this._entryData.type), 16, TextAlign.LEFT, ColorType.colorffecc6);
    };
    ItemTip.prototype.refreshTxt = function () {
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._txt.skinName, "  " + this._entryData.info /* + " \nid:" + this._entryData.id*/, 14, TextAlign.LEFT, ColorType.colord6e7ff);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._info.skinName, "  " + this._entryData.zhuangbility, 14, TextAlign.LEFT, ColorType.colord6e7ff);
    };
    ItemTip.prototype.initBase = function () {
        _super.prototype.initBase.call(this);
        var ui = this._baseRender.getComponent("i_qua");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "品质:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);
        this.addChild(this._baseRender.getComponent("i_line"));
        this.addChild(this._baseRender.getComponent("i_line2"));
        this._txt = this._baseRender.getComponent("i_txt");
        this.addChild(this._txt);
        this._info = this._baseRender.getComponent("i_info");
        this.addChild(this._info);
        this._bg.height = 300;
        for (var i = 0; i < this.dynamicPosList.length; i++) {
            this.dynamicPosList[i].y -= 232;
        }
    };
    ItemTip.prototype.initBtn = function () {
        this._getBtn = this._nextRender.getComponent("t_hq_btn");
        this._getBtn.y = 222;
        this._getBtn.addEventListener(InteractiveEvent.Up, this.getItem, this);
        this._selBtn = this._nextRender.getComponent("t_cs_btn");
        this._selBtn.y = 222;
        this._selBtn.addEventListener(InteractiveEvent.Up, this.selItem, this);
        this._useBtn = this._nextRender.getComponent("t_sy_btn");
        this._useBtn.y = 222;
        this._useBtn.addEventListener(InteractiveEvent.Up, this.useItem, this);
    };
    ItemTip.prototype.useItem = function () {
        if (this._entryData.type_c == 22) {
            var $e = new activity.ActivityEvent(activity.ActivityEvent.USEEXPCARD_EVENT);
            $e.data = this._data.id;
            ModuleEventManager.dispatchEvent($e);
        }
        else {
            NetManager.getInstance().protocolos.bag_item_user(this.getGuid(), 1);
        }
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    ItemTip.prototype.getItem = function () {
        if (this._entryData.output && this._entryData.output.length) {
            //ModulePageManager.openPanel(Number(this._entryData.output[0]),Number(this._entryData.output[1]));
            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
            $aaa.data = this._entryData.id;
            ModuleEventManager.dispatchEvent($aaa);
        }
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    ItemTip.prototype.getTypeName = function ($type) {
        switch ($type) {
            case 10:
                return "道具";
            case 11:
                return "任务道具";
            case 12:
                return "药品";
            case 13:
                return "丹药";
            case 14:
                return "礼包";
            case 15:
                return "宝箱";
            case 16:
                return "宝物";
            case 30:
                return "材料";
            case 31:
                return "货币";
            case 32:
                return "资源";
        }
        return "其他";
    };
    return ItemTip;
}(BaseTip));
//# sourceMappingURL=ItemTip.js.map