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
 * 角色身上装备TIP
 */
var EquTip = /** @class */ (function (_super) {
    __extends(EquTip, _super);
    function EquTip() {
        var _this = _super.call(this) || this;
        _this.partNameAry = ["武器", "衣服", "护手", "腰带", "鞋子", "头饰", "项链", "手镯", "戒指", "腰坠"];
        _this.gemTypeAry = ["绿翡翠", "红宝石", "蓝宝石", "黑曜石", "白珊瑚", "紫水晶", "黄玛瑙", "宝石8", "宝石9", "宝石10"];
        _this._hasInitBtn = false;
        _this.width = 354;
        _this.height = 456;
        _this.center = -150;
        _this.middle = 0;
        return _this;
    }
    EquTip.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this.refreshLevTypeZL();
        this.refreshBaseAtt();
        //this.refreshGem();
        this.refreshSuit();
        this.refreshAddAtt();
        this.refreshTxt();
        this.refreshBottomInfo();
    };
    EquTip.prototype.showBtn = function () {
        if (this._needBtn) {
            this.addChild(this._unloadBtn);
            this.addChild(this._strengBtn);
            this.addChild(this._gemBtn);
            this._t_btn_bg.height = 160;
            this.addChild(this._t_btn_bg);
            var gap = 50;
            var baseY = 30;
            if (this._entryData.suitId) {
                this._t_btn_bg.y = 270;
                baseY = 30;
            }
            else {
                this._t_btn_bg.y = 150;
                baseY = 150;
            }
            this._strengBtn.y = this.height - gap * 3 - baseY;
            this._gemBtn.y = this.height - gap * 2 - baseY;
            this._unloadBtn.y = this.height - gap - baseY;
        }
        else {
            this.removeChild(this._unloadBtn);
            this.removeChild(this._strengBtn);
            this.removeChild(this._gemBtn);
            this.removeChild(this._t_btn_bg);
        }
    };
    EquTip.prototype.refreshIconName = function () {
        _super.prototype.refreshIconName.call(this);
        this.addChild(this._t_seal);
    };
    EquTip.prototype.refreshLevTypeZL = function () {
        var rec = this._uiAtlas.getRec(this._t_type_value.skinName);
        var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._t_lev_lab.skinName, "境界:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_type_value.skinName, this.partNameAry[this._entryData.pos - 1], 16, TextAlign.LEFT, ColorType.colorffecc6);
        var daoName = TableData.getInstance().getData(TableData.tb_realmbreak_base, this._entryData.realmbreak_level);
        var daoColor = GuidData.player.getStateLev() >= daoName.id ? ColorType.colorffecc6 : ColorType.Redd92200;
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_lev_value.skinName, daoName.name, 16, TextAlign.LEFT, daoColor);
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_zl_value.skinName, String(this.getZhanLi()), 16, TextAlign.LEFT, ColorType.colorfde87e);
        var strentLev;
        if (this._data.qhGemData) {
            strentLev = this._data.qhGemData.strength_lv;
        }
        else {
            strentLev = GuidData.grow.getPartStrengLev(this._entryData.pos);
        }
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_qh_lev_value.skinName, "+" + String(strentLev), 16, TextAlign.LEFT, ColorType.colorffecc6);
        var jlLev;
        var jlStar;
        if (this._data.qhGemData) {
            jlLev = this._data.qhGemData.refine_rank;
            jlStar = this._data.qhGemData.refine_star;
        }
        else {
            var ary = GuidData.grow.getPartRefineVo(this._entryData.pos);
            jlLev = ary[0];
            jlStar = ary[1];
        }
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_jl.skinName, ColorType.coloraa874a + "精炼:" + ColorType.colorffecc6 + jlLev + "阶", 16, TextAlign.LEFT);
        // var baseRec: any = this._uiAtlas.getRec("u_t" + (this._entryData.pos - 1));
        // ctx.drawImage(this._uiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, 34, 17);
        // this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        //ArtFont.getInstance().writeFontToSkinName(this._uiAtlas, this._t_lev_value.skinName, String(this._entryData.rank), ArtFont.num16);
        //ArtFont.getInstance().writeFontToSkinName(this._uiAtlas, this._t_zl_value.skinName, String(this.getZhanLi()), ArtFont.num3);
        //ArtFont.getInstance().writeFontToSkinName(this._uiAtlas, this._t_qh_lev_value.skinName, String(strentLev), ArtFont.num16);
        var starNum = jlStar;
        for (var i = 0; i < this.starAry.length; i++) {
            if (i < starNum) {
                this.starAry[i].goToAndStop(0);
            }
            else {
                this.starAry[i].goToAndStop(1);
            }
        }
        // rec = this._uiAtlas.getRec(this._t_star.skinName);
        // ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        // var jin: any = this._uiAtlas.getRec("u_st0");
        // var yin: any = this._uiAtlas.getRec("u_st1");
        // for (var i: number = 0; i < 10; i++) {
        //     ctx.drawImage(this._uiAtlas.useImg,
        //         jin.pixelX, jin.pixelY, jin.pixelWitdh, jin.pixelHeight,
        //         i * jin.pixelWitdh, 0, jin.pixelWitdh, jin.pixelHeight);
        //     if (i < starNum) {
        //         ctx.drawImage(this._uiAtlas.useImg,
        //             yin.pixelX, yin.pixelY, yin.pixelWitdh, yin.pixelHeight,
        //             i * yin.pixelWitdh, 0, yin.pixelWitdh, yin.pixelHeight);
        //     }
        // }
        // this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
    };
    EquTip.prototype.getZhanLi = function () {
        if (this._data.data.propData.force) {
            return Number(this._data.data.propData.force);
        }
        // var obj: any = this._entryData.basic_properties;
        // if (obj && obj.length) {
        //     return obj[0][1];
        // }
        return 0;
    };
    EquTip.prototype.refreshBaseAtt = function () {
        var obj = this._entryData.basic_properties;
        if (obj && obj.length) {
            //this.drawLineTxt(this._t_base_att.skinName, this.getAttName(obj[0][0]) + " :", "+" + (obj[0][1]), 0);
            LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_base_att.skinName, this.getAttName(obj[0][0]) + "：+" + float2int(obj[0][1] / 100), 16, TextAlign.LEFT, this.getColorQua(0));
        }
        else {
            UiDraw.clearUI(this._t_base_att);
        }
        var num;
        if (this._data.qhGemData) {
            num = GuidData.grow.getStrengValueByLev(this._entryData.pos, this._data.qhGemData.strength_lv);
        }
        else {
            num = GuidData.grow.getStrengValue(this._entryData.pos);
        }
        //this.drawLineTxt(this._t_qh_att.skinName, "强化 :", "+" + (data ? data[1] : 0), 1)
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_qh_att.skinName, "+" + float2int(num / 100), 16, TextAlign.LEFT, this.getColorQua(1));
    };
    EquTip.prototype.drawLineTxt = function ($skin, $lable, $val, $color, $lableColor) {
        if ($color === void 0) { $color = 0; }
        if ($lableColor === void 0) { $lableColor = 0; }
        var rec = this._uiAtlas.getRec($skin);
        var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        LabelTextFont.writeSingleLabelToCtx(ctx, $lable, 16, 0, 0, TextAlign.LEFT, this.getColorQua($lableColor));
        ArtFont.getInstance().writeFontToCtxLeft(ctx, $val, this.getNumColor($color), 100, 2);
        this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
    };
    EquTip.prototype.drawGemLineTxt = function ($skin, $lable, $val, $color, $lableColor) {
        if ($color === void 0) { $color = 0; }
        if ($lableColor === void 0) { $lableColor = 0; }
        var rec = this._uiAtlas.getRec($skin);
        var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        LabelTextFont.writeSingleLabelToCtx(ctx, $lable, 16, 0, 0, TextAlign.LEFT, this.getGemColor($lableColor));
        ArtFont.getInstance().writeFontToCtxLeft(ctx, $val, this.getGemNumColor($color), 50, 2);
        this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
    };
    EquTip.prototype.drawLine = function ($skin, $lable, $color) {
        if ($color === void 0) { $color = 0; }
        var rec = this._uiAtlas.getRec($skin);
        var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        LabelTextFont.writeSingleLabelToCtx(ctx, $lable, 16, 0, 0, TextAlign.LEFT, this.getColorQua($color));
        this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
    };
    EquTip.prototype.drawIconLine = function ($icon, $skin, $lable, $color) {
        var _this = this;
        if ($color === void 0) { $color = 0; }
        IconManager.getInstance().getIconName($icon, function ($img) {
            var rec = _this._uiAtlas.getRec($skin);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.REWARD_BG1, new Rectangle(0, 0, 22, 22), UIData.publicUi);
            ctx.drawImage($img, 0, 0, 60, 60, 1, 1, 20, 20);
            LabelTextFont.writeSingleLabelToCtx(ctx, $lable, 16, 25, 0, TextAlign.LEFT, _this.getGemColor($color));
            _this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        });
    };
    EquTip.prototype.clearLable = function ($skin) {
        var rec = this._uiAtlas.getRec($skin);
        var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
    };
    EquTip.prototype.refreshGem = function () {
        var ary;
        if (this._data.qhGemData) {
            ary = strengthgem.NewStrengModel.getInstance().getGemvo(this._entryData.pos, [this._data.qhGemData.gem1_lv, this._data.qhGemData.gem2_lv, this._data.qhGemData.gem3_lv]);
        }
        else {
            ary = strengthgem.NewStrengModel.getInstance().getGemvo(this._entryData.pos);
        }
        // var pos: number = this._entryData.pos;
        // var gemData: any = this.getGemInfo(pos);
        for (var i = 0; i < 3; i++) {
            var gemVo = ary[i];
            //var lev: number = GuidData.grow.getGemLev(pos, i);
            var lui = this._t_gem_lableList[i];
            var vui = this._t_gem_valList[i];
            var item = tb.TB_item_template.get_TB_item_template(gemVo.curtab.cost[0][0]);
            if (gemVo.gemlev == 0) {
                this.drawIconLine(item.icon, lui.skinName, item.name + "(未激活)", gemVo.gemlev);
                this.clearLable(vui.skinName);
            }
            else {
                this.drawIconLine(item.icon, lui.skinName, item.name + "(" + gemVo.gemlev + "级)", gemVo.gemlev);
                LabelTextFont.writeSingleLabel(this._uiAtlas, vui.skinName, this.getAttName(gemVo.curtab.props[0][0]) + "：+" + float2int(gemVo.curtab.props[0][1] / 100), 16, TextAlign.LEFT, this.getColorQua(gemVo.gemlev));
            }
        }
    };
    EquTip.prototype.refreshSuit = function () {
        if (!this._entryData.suitId) {
            this.removeChild(this._t_suit_line);
            for (var i = 0; i < this._t_suit_lableList.length; i++) {
                this.removeChild(this._t_suit_lableList[i]);
            }
            for (var i = 0; i < this._t_suit_valList.length; i++) {
                this.removeChild(this._t_suit_valList[i]);
            }
            return;
        }
        var suitObj = TableData.getInstance().getData(TableData.tb_equip_suit_base, this._entryData.suitId);
        var itemAry = suitObj.itemId;
        this.addChild(this._t_suit_line);
        var suitNum = 0;
        for (var i = 0; i < this._t_suit_lableList.length; i++) {
            if (itemAry[i]) {
                var $itemobj = TableData.getInstance().getData(TableData.tb_item_template, itemAry[i]);
                var bagItem = GuidData.bag.getEquPart($itemobj.pos);
                var hasPart = (bagItem && bagItem.entryData && bagItem.entryData.id == $itemobj.id);
                LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_suit_lableList[i].skinName, $itemobj.name, 16, TextAlign.LEFT, hasPart ? this.quaColorAry[1] : ColorType.color9c9b9b);
                if (hasPart) {
                    suitNum++;
                }
            }
            else {
                this.clearLable(this._t_suit_lableList[i].skinName);
            }
            this.addChild(this._t_suit_lableList[i]);
        }
        var itemValAry = suitObj.effectId;
        for (var i = 0; i < this._t_suit_valList.length; i++) {
            if (itemValAry[i]) {
                var $itemValobj = TableData.getInstance().getData(TableData.tb_equip_suit_effect, itemValAry[i][1]);
                var str = itemValAry[i][0] + "件套效果:" + getKeyProById($itemValobj.props[0][0]) + " +" + $itemValobj.props[0][1];
                var hasPart = itemValAry[i][0] <= suitNum;
                LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_suit_valList[i].skinName, str, 16, TextAlign.LEFT, hasPart ? this.quaColorAry[1] : ColorType.color9c9b9b);
            }
            else {
                this.clearLable(this._t_suit_valList[i].skinName);
            }
            this.addChild(this._t_suit_valList[i]);
        }
    };
    EquTip.prototype.getSuitState = function (itemobj) {
    };
    EquTip.prototype.refreshBottomInfo = function () {
        if (this._entryData.suitId) {
            this._t_endline.y = this._t_endline.baseRec.y + 120;
            this._t_info.y = this._t_info.baseRec.y + 120;
            this._bg.height = this._bg.baseRec.height;
        }
        else {
            this._t_endline.y = this._t_endline.baseRec.y;
            this._t_info.y = this._t_info.baseRec.y;
            this._bg.height = this._bg.baseRec.height - 120;
        }
    };
    EquTip.prototype.refreshAddAtt = function () {
        // for (var i: number = 0; i < this._t_add_attList.length; i++) {
        //     var idx:number = float2int(8 * Math.random());
        //     var val:number = float2int(200 * Math.random());
        //     this.drawLineTxt(this._t_add_attList[i].skinName,this.keyProp[idx],"+" + val);
        // }
        if (!this._data.data) {
            for (var i = 0; i < this._t_add_attList.length; i++) {
                this.clearLable(this._t_add_attList[i].skinName);
            }
            return;
        }
        var ary = this._data.data.AttrData;
        // for (var key in addAtt) {
        //     var keyStr: string = String(key);
        //     var keyAry: Array<string> = keyStr.split(",");
        //     if (keyAry.length) {
        //         ary.push({ type: Number(keyAry[1]), lev: Number(keyAry[2]), val: addAtt[key] });
        //     }
        // }
        var len = ary.length / 3;
        for (var i = 0; i < this._t_add_attList.length; i++) {
            if (i < len) {
                var lev = ary[i * 3 + 2];
                //this.drawLineTxt(this._t_add_attList[i].skinName, getKeyProById(ary[i * 3]), "+" + ary[i * 3 + 1], lev, lev);
                LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_add_attList[i].skinName, getKeyProById(ary[i * 3]) + "：+" + float2int(ary[i * 3 + 1] / 100), 16, TextAlign.LEFT, this.getColorQua(lev));
            }
            else {
                //this.clearLable(this._t_add_attList[i].skinName)    
                var colorStr = this.getColorQua(i);
                colorStr = "[" + colorStr.slice(1) + "]";
                LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_add_attList[i].skinName, ColorType.color9c9b9b + "随机属性:装备" + colorStr + this.getColorName(i) + ColorType.color9c9b9b + "品质激活", 16, TextAlign.LEFT);
            }
        }
    };
    EquTip.prototype.refreshTxt = function () {
        LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_info.skinName, this._entryData.info, 14, TextAlign.LEFT, ColorType.colord6e7ff);
    };
    EquTip.prototype.getAttName = function ($type) {
        return getKeyProById($type);
    };
    EquTip.prototype.getGemInfo = function (pos) {
        var data = new Object;
        var obj = TableData.getInstance().getData(TableData.tb_gem_pos, pos);
        var gemType = obj.gemtype;
        data.name = this.gemTypeAry[gemType - 1];
        data.gemType = gemType;
        obj = TableData.getInstance().getData(TableData.tb_gem_icon, gemType);
        data.icon = obj.miniicon;
        return data;
    };
    EquTip.prototype.getGemColor = function ($type) {
        if ($type == 0) {
            return "#9c9b9b";
        }
        return this.quaColorAry[float2int(($type - 1) / 2)];
    };
    EquTip.prototype.getGemNumColor = function ($type) {
        if ($type == 0) {
            return ArtFont.num20;
        }
        else if ($type <= 2) {
            return ArtFont.num16;
        }
        else if ($type <= 4) {
            return ArtFont.num7;
        }
        else if ($type <= 6) {
            return ArtFont.num17;
        }
        else if ($type <= 8) {
            return ArtFont.num18;
        }
        else {
            return ArtFont.num19;
        }
    };
    EquTip.prototype.initBase = function () {
        _super.prototype.initBase.call(this);
        var ui;
        ui = this._baseRender.getComponent("t_zl");
        this.addChild(ui);
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "战力:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        //ui = this._baseRender.getComponent("t_qh_lev")
        //this.addChild(ui);
        //LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "强化等级", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this._t_qh_lev_value = this._baseRender.getComponent("t_qh_lev");
        this.addChild(this._t_qh_lev_value);
        this._t_qh_name = this._baseRender.getComponent("t_qh_name");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._t_qh_name.skinName, "强化:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(this._t_qh_name);
        this._t_jl = this._baseRender.getComponent("t_jl");
        this.addChild(this._t_jl);
        this._t_seal = this._nextRender.getComponent("a_seal");
        //this._t_star = this._baseRender.getComponent("t_star");
        //this.addChild(this._t_star);
        this.starAry = new Array();
        for (var i = 0; i < 10; i++) {
            var fame = this._nextRender.getComponent("t_star" + i);
            fame.goToAndPlay(1);
            this.addChild(fame);
            this.starAry.push(fame);
        }
        this.addChild(this._baseRender.getComponent("t_base_line"));
        this._t_qh_att = this._baseRender.getComponent("t_qh_val");
        this.addChild(this._t_qh_att);
        this._t_base_att = this._baseRender.getComponent("t_base_val");
        this.addChild(this._t_base_att);
        this.addChild(this._baseRender.getComponent("t_add_line"));
        this._t_add_attList = new Array;
        for (var i = 0; i < 5; i++) {
            var _t_add_ui = this._baseRender.getComponent("t_add_val" + i);
            this._t_add_attList.push(_t_add_ui);
            this.addChild(_t_add_ui);
        }
        /** -------------nextRender--------------- */
        //this.initGem();
        this.initSuit();
        this._t_info = this._nextRender.getComponent("t_info");
        this.addChild(this._t_info);
        this._t_endline = this.addChild(this._nextRender.getComponent("t_end_line"));
    };
    EquTip.prototype.initGem = function () {
        this.addChild(this._nextRender.getComponent("t_gem_line"));
        this._t_gem_lableList = new Array;
        for (var i = 0; i < 3; i++) {
            var ui = this._nextRender.getComponent("t_gem" + i);
            this.addChild(ui);
            this._t_gem_lableList.push(ui);
        }
        this._t_gem_valList = new Array;
        for (var i = 0; i < 3; i++) {
            var ui = this._nextRender.getComponent("t_gem_val" + i);
            this.addChild(ui);
            this._t_gem_valList.push(ui);
        }
    };
    /**套装 */
    EquTip.prototype.initSuit = function () {
        this._t_suit_line = this._nextRender.getComponent("a_suit_line");
        this._t_suit_lableList = new Array;
        for (var i = 0; i < 6; i++) {
            var ui = this._nextRender.getComponent("c_suit" + i);
            //this.addChild(ui);
            this._t_suit_lableList.push(ui);
        }
        this._t_suit_valList = new Array;
        for (var i = 0; i < 3; i++) {
            var ui = this._nextRender.getComponent("c_suit_val" + i);
            //this.addChild(ui);
            this._t_suit_valList.push(ui);
        }
    };
    EquTip.prototype.initBtn = function () {
        this._strengBtn = this._nextRender.getComponent("t_qh_btn");
        this.addChild(this._strengBtn);
        this._strengBtn.addEventListener(InteractiveEvent.Up, this.strengClick, this);
        this._gemBtn = this._nextRender.getComponent("t_bs_btn");
        this.addChild(this._gemBtn);
        this._gemBtn.addEventListener(InteractiveEvent.Up, this.gemClick, this);
        this._unloadBtn = this._nextRender.getComponent("t_xh_btn");
        this.addChild(this._unloadBtn);
        this._unloadBtn.addEventListener(InteractiveEvent.Up, this.unLoadItem, this);
        this._hasInitBtn = true;
        //this.setBtnVisible(this._btnVisible);
    };
    // protected _btnVisible: boolean = true;
    // public setBtnVisible(tf: boolean): void {
    //     // if(this._btnVisible == tf){
    //     //     return;
    //     // }
    //     this._btnVisible = tf;
    //     if (!this._hasInitBtn) {
    //         return;
    //     }
    //     if (tf) {
    //         this.addChild(this._unloadBtn);
    //         this.addChild(this._strengBtn);
    //         this.addChild(this._gemBtn);
    //     } else {
    //         this.removeChild(this._unloadBtn);
    //         this.removeChild(this._strengBtn);
    //         this.removeChild(this._gemBtn);
    //     }
    // }
    EquTip.prototype.unLoadItem = function () {
        var guid = this.getGuid();
        if (GuidData.bag.getBagNum(BagData.TYPE_EQU_BG) == GuidData.bag.getBagSize(BagData.TYPE_EQU_BG)) {
            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "装备背包已满，请整理后再试！", 99);
            return;
        }
        NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP, this._data.pos, SharedDef.BAG_TYPE_EQUIP_BAG, GuidData.bag.getEmptyEquBagPos());
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
        //this.hide();
    };
    EquTip.prototype.strengClick = function () {
        var $tb_system_basestrength = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_MIX * 10 + SharedDef.MODULE_MIX_STRENGTH));
        if ($tb_system_basestrength.level <= GuidData.player.getLevel()) {
            ModulePageManager.openPanel(SharedDef.MODULE_MIX, SharedDef.MODULE_MIX_STRENGTH);
        }
        else {
            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "系统未开启", 99);
        }
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    EquTip.prototype.gemClick = function () {
        var $tb_system_basestrength = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_MIX * 10 + SharedDef.MODULE_MIX_GEM));
        if ($tb_system_basestrength.level <= GuidData.player.getLevel()) {
            ModulePageManager.openPanel(SharedDef.MODULE_MIX, SharedDef.MODULE_MIX_GEM);
        }
        else {
            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "系统未开启", 99);
        }
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.HIDE_ALL_TIP_EVENT));
    };
    return EquTip;
}(BaseTip));
//# sourceMappingURL=EquTip.js.map