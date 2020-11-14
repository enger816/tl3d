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
 * 背包内的装备
 *   */
var EquItemTip = /** @class */ (function (_super) {
    __extends(EquItemTip, _super);
    function EquItemTip() {
        var _this = _super.call(this) || this;
        _this.center = -115;
        return _this;
    }
    EquItemTip.prototype.refreshIconName = function () {
        var _this = this;
        IconManager.getInstance().getIcon(geteqiconIconUrl(this._entryData.icon), function ($img) {
            var rec = _this._uiAtlas.getRec(_this._t_icon.skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(_this._entryData.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
            ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
            if (_this._entryData.type == 1) {
                UiDraw.cxtDrawImg(ctx, "A_JJ" + _this._entryData.realmbreak_level, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                //ArtFont.getInstance().writeFontToCtxCenten(ctx,String(this._entryData.level),ArtFont.num63,18,4,4);
            }
            _this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        });
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_name.skinName, this._entryData.name, 18, TextAlign.LEFT, this.getColorQua(this._entryData.quality));
    };
    EquItemTip.prototype.initBtn = function () {
        this._useBtn = this._nextRender.getComponent("t_cxh_n");
        this.addChild(this._useBtn);
        this._useBtn.addEventListener(InteractiveEvent.Up, this.useItem, this);
        this._xiaohuiBtn = this._nextRender.getComponent("t_gh_btn");
        this._xiaohuiBtn.addEventListener(InteractiveEvent.Up, this.xiaohuiItem, this);
        this._quchuBtn = this._nextRender.getComponent("t_qc_btn");
        this._quchuBtn.addEventListener(InteractiveEvent.Up, this.quchuItem, this);
        this._shangjiaoBtn = this._nextRender.getComponent("t_sj_btn");
        this._shangjiaoBtn.addEventListener(InteractiveEvent.Up, this.shangjiaoItem, this);
        this._hasInitBtn = true;
        var gap = 50;
        var baseY = 30;
        this._useBtn.y = this.height - 50 - baseY;
        this._xiaohuiBtn.y = this.height - gap * 2 - baseY;
        this._quchuBtn.y = this.height - gap - baseY;
        this._shangjiaoBtn.y = this.height - gap - baseY;
        this.initBottom();
    };
    EquItemTip.prototype.initBottom = function () {
        this._facLab1 = this._nextRender.getComponent("t_fac_lab1");
        this._facVal1 = this._nextRender.getComponent("t_fac_val1");
        this._facIcon1 = this._nextRender.getComponent("t_fac_icon1");
        this._facLab2 = this._nextRender.getComponent("t_fac_lab2");
        this._facVal2 = this._nextRender.getComponent("t_fac_val2");
        this._facIcon2 = this._nextRender.getComponent("t_fac_icon2");
        UiDraw.uiAtlasDrawImg(this._uiAtlas, this._facIcon1.skinName, UIData.publicUi, UIuitl.getInstance().costtype(6));
        UiDraw.uiAtlasDrawImg(this._uiAtlas, this._facIcon2.skinName, UIData.publicUi, UIuitl.getInstance().costtype(6));
        this._facUIAry = [this._facLab1, this._facVal1, this._facIcon1, this._facLab2, this._facVal2, this._facIcon2];
    };
    EquItemTip.prototype.addFac = function () {
        for (var i = 0; i < this._facUIAry.length; i++) {
            this.addChild(this._facUIAry[i]);
        }
        this.removeChild(this._t_info);
    };
    EquItemTip.prototype.removeFac = function () {
        for (var i = 0; i < this._facUIAry.length; i++) {
            this.removeChild(this._facUIAry[i]);
        }
        this.addChild(this._t_info);
    };
    EquItemTip.prototype.showUpFac = function () {
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facLab1.skinName, "上交获得:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facLab2.skinName, "购买消耗:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this._facVal2.x = this._facVal2.baseRec.x;
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facVal1.skinName, Snum(this._entryData.handInReward[0][1]), 16, TextAlign.LEFT, ColorType.colorfde87e);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facVal2.skinName, Snum(this._entryData.exchangeCost[0][1]), 16, TextAlign.LEFT, ColorType.colorfde87e);
    };
    EquItemTip.prototype.showDownFac = function () {
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facLab1.skinName, "购买消耗:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facLab2.skinName, "销毁获得:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.removeChild(this._facIcon2);
        this._facVal2.x = this._facIcon2.x;
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facVal1.skinName, Snum(this._entryData.exchangeCost[0][1]), 16, TextAlign.LEFT, ColorType.colorfde87e);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._facVal2.skinName, "家族资金 " + Snum(this._entryData.destroyReward), 16, TextAlign.LEFT, ColorType.colorfde87e);
    };
    EquItemTip.prototype.testGender = function () {
        if (this._entryData.availableGender) {
            var idx = this._entryData.availableGender.indexOf(GuidData.player.getCharType());
            return (idx != -1);
        }
        return false;
    };
    EquItemTip.prototype.showBtn = function () {
        this.removeAllBtn();
        if (this._needBtn) {
            var gap = 50;
            var baseY = 30;
            if (this._entryData.suitId) {
                baseY = 30;
            }
            else {
                baseY = 150;
            }
            this._xiaohuiBtn.y = this.height - gap * 2 - baseY;
            this._quchuBtn.y = this.height - gap - baseY;
            this._shangjiaoBtn.y = this.height - gap - baseY;
            if (this._btnType == 2) {
                if (this.testGender()) {
                    this.addChild(this._useBtn);
                    this._t_btn_bg.height = 55;
                    if (this._entryData.suitId) {
                        this._t_btn_bg.y = 373;
                    }
                    else {
                        this._t_btn_bg.y = 253;
                    }
                    this._useBtn.y = this.height - 50 - baseY;
                }
                else {
                    this._t_btn_bg.y = 100000;
                }
            }
            else if (this._btnType == 4) {
                this.addChild(this._xiaohuiBtn);
                this.addChild(this._quchuBtn);
                this._t_btn_bg.height = 105;
                if (this._entryData.suitId) {
                    this._t_btn_bg.y = 323;
                }
                else {
                    this._t_btn_bg.y = 203;
                }
            }
            else if (this._btnType == 5) {
                this.addChild(this._shangjiaoBtn);
                this._t_btn_bg.height = 55;
                if (this._entryData.suitId) {
                    this._t_btn_bg.y = 373;
                }
                else {
                    this._t_btn_bg.y = 253;
                }
            }
            this.addChild(this._t_btn_bg);
        }
        else {
            this.removeChild(this._t_btn_bg);
        }
        if (this._btnType == 4) {
            this.addFac();
            this.showDownFac();
        }
        else if (this._btnType == 5) {
            this.addFac();
            this.showUpFac();
        }
        else {
            this.removeFac();
        }
    };
    EquItemTip.prototype.removeAllBtn = function () {
        this.removeChild(this._getBtn);
        this.removeChild(this._selBtn);
        this.removeChild(this._useBtn);
        this.removeChild(this._xiaohuiBtn);
        this.removeChild(this._quchuBtn);
        this.removeChild(this._shangjiaoBtn);
    };
    EquItemTip.prototype.useItem = function () {
        // if(this._entryData.level > GuidData.player.getLevel()){
        //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "等级不足，无法装备", 99);            
        //     return;
        // }
        if (this._entryData.realmbreak_level > GuidData.player.getStateLev()) {
            AlertUtil.show("您的境界不满足需求，是否前往提升境界？", "提示", function (r) {
                if (r == 1) {
                    ModulePageManager.openPanel(SharedDef.MODULE_REALM);
                }
            }, 2);
            return;
        }
        UIManager.popClikNameFun("t_sy_btn");
        NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP_BAG, this._data.pos, SharedDef.BAG_TYPE_EQUIP, Number(this._entryData.pos));
        // this.hide();
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    EquItemTip.prototype.xiaohuiItem = function () {
        var obj = TableData.getInstance().getData(TableData.tb_faction_privilege, 1);
        if (GuidData.faction.playerIdentity <= obj.destroyItem) {
            NetManager.getInstance().protocolos.storehouse_destroy(this._data.pos);
        }
        else {
            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "权限不足", 99);
        }
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    EquItemTip.prototype.quchuItem = function () {
        if (!hasEnoughRes(this._entryData.exchangeCost[0])) {
            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "家族贡献不足", 99);
            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
            $aaa.data = 6;
            ModuleEventManager.dispatchEvent($aaa);
            return;
        }
        NetManager.getInstance().protocolos.storehouse_exchange(this._data.pos);
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    EquItemTip.prototype.shangjiaoItem = function () {
        NetManager.getInstance().protocolos.storehouse_hand_in(String(this._data.pos));
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    EquItemTip.prototype.setFacOffset = function ($offset) {
        this._facLab1.y = this._facLab1.baseRec.y + $offset;
        this._facLab2.y = this._facLab2.baseRec.y + $offset;
        this._facVal1.y = this._facVal1.baseRec.y + $offset;
        this._facVal2.y = this._facVal2.baseRec.y + $offset;
        this._facIcon1.y = this._facIcon1.baseRec.y + $offset;
        this._facIcon2.y = this._facIcon2.baseRec.y + $offset;
    };
    EquItemTip.prototype.refreshBottomInfo = function () {
        if (this._entryData.suitId) {
            this._t_endline.y = this._t_endline.baseRec.y + 120;
            this._t_info.y = this._t_info.baseRec.y + 120;
            if (this._btnType == 4 || this._btnType == 5) {
                this._bg.height = this._bg.baseRec.height + 30;
                this.setFacOffset(0);
            }
            else {
                this._bg.height = this._bg.baseRec.height;
            }
        }
        else {
            this._t_endline.y = this._t_endline.baseRec.y;
            this._t_info.y = this._t_info.baseRec.y;
            if (this._btnType == 4 || this._btnType == 5) {
                this.setFacOffset(-120);
                this._bg.height = this._bg.baseRec.height - 90;
            }
            else {
                this._bg.height = this._bg.baseRec.height - 120;
            }
        }
    };
    return EquItemTip;
}(EquTip));
//# sourceMappingURL=EquItemTip.js.map