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
    var StrengTab3 = /** @class */ (function (_super) {
        __extends(StrengTab3, _super);
        function StrengTab3() {
            var _this = _super.call(this) || this;
            _this.keyPropaa = [
                "生       命", "攻       击", "防       御", "命       中", "闪       避", "暴       击", "抗       暴", "攻       速", "移       速", "破       防", "忽视闪避", "生命值回复", "伤害加深", "伤害减免", "反弹伤害" //15个
                ,
                "吸       血", "回复效率", "暴暴击击", "抗       暴", "暴击伤害", "暴伤减免", "命中率", "闪避率", "眩       晕", "定       身", "沉       默", "混       乱", "魅       惑", "控制增强", "控制减免" //15个
                ,
                "防       御"
            ];
            _this._canclick = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        StrengTab3.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }
        };
        StrengTab3.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        StrengTab3.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.EuqUIAry = new Array;
            for (var i = 0; i < 10; i++) {
                var t_equ = this.addChild(this._topRender.getComponent("t_equ" + i));
                t_equ.addEventListener(InteractiveEvent.Up, this.equClick, this);
                this.EuqUIAry.push(t_equ);
            }
            this.t_curequ = this.addChild(renderLevel.getComponent("t_curequ"));
            this.t_curname = this.addChild(renderLevel.getComponent("t_curname"));
            this.d_bg3_1 = this.addChild(this._bgRender.getComponent("d_bg3_1"));
            this.addUIList(["t_costinfo", "d_bg3_0", "d_arrow"], this._bgRender);
            this.BtnUI0Ary = new Array;
            this.btn0 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn0, "d_btn0", renderLevel);
            this.BtnUI0Ary.push(this.btn0);
            this.BtnUI0Ary.push(renderLevel.getComponent("d_btntxt0"));
            this.BtnUI1Ary = new Array;
            this.btn1 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn1, "d_btn1", renderLevel);
            this.BtnUI1Ary.push(this.btn1);
            this.btn2 = this.addEvntButUp("cnew_btn2", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn2, "d_btn2", renderLevel);
            this.BtnUI1Ary.push(this.btn2);
            this.BtnUI1Ary.push(renderLevel.getComponent("d_btntxt1"));
            this.BtnUI1Ary.push(renderLevel.getComponent("d_btntxt2"));
            this.d_force0 = this.addChild(renderLevel.getComponent("d_force0"));
            this.d_force1 = this.addChild(renderLevel.getComponent("d_force1"));
            this.d_forceArrow = this._topRender.getComponent("d_forceArrow");
            this.Attr0Ary = new Array;
            this.Attr1Ary = new Array;
            this.ProbgAry = new Array;
            this.Probg1Ary = new Array;
            this.ProAry = new Array;
            this.Pro1Ary = new Array;
            this.AttrnameAry = new Array;
            this.AttrnameAry_n = new Array;
            for (var j = 0; j < 6; j++) {
                this.Attr0Ary.push(this.addChild(this._topRender.getComponent("d_attr" + j)));
                this.Attr1Ary.push(this.addChild(this._topRender.getComponent("d_nattr" + j)));
                this.ProbgAry.push(this.addChild(this._bgRender.getComponent("d_probg" + j)));
                this.ProAry.push(this.addChild(this._baseRender.getComponent("d_pro" + j)));
                this.Probg1Ary.push(this.addChild(this._bgRender.getComponent("d_nprobg" + j)));
                this.Pro1Ary.push(this.addChild(this._baseRender.getComponent("d_npro" + j)));
                this.AttrnameAry.push(this.addChild(this._baseRender.getComponent("d_attrname" + j)));
                this.AttrnameAry_n.push(this.addChild(this._baseRender.getComponent("d_nattrname" + j)));
            }
            this.CostItemUIAry = new Array;
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costitem1")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum0")));
            this.CostItemUIAry.push(this.addChild(renderLevel.getComponent("t_costnum1")));
            this._publicRender.applyObjData();
        };
        StrengTab3.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        StrengTab3.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //初始化euq数据
            this.InitEqu();
            this.resize();
        };
        StrengTab3.prototype.hide = function () {
            if (this.canshowAlert()) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        StrengTab3.prototype.refreshEqu = function () {
            for (var i = 0; i < 10; i++) {
                this.drawEqu(this.EuqUIAry[i], this._lastselect == i, strengthgem.StrengUtil.GENERAL);
            }
        };
        StrengTab3.prototype.InitEqu = function () {
            for (var i = 0; i < 10; i++) {
                //部位id
                this.EuqUIAry[i].data = i + 1;
            }
            var vo = this.getCurWashVo();
            var selectid = vo ? vo.partid - 1 : 0;
            //模拟选中第一条数据
            var evt = new InteractiveEvent(InteractiveEvent.Up);
            evt.target = this.EuqUIAry[selectid];
            this.equClick(evt);
        };
        /**
         * 返回当前部位上有洗练过的装备数据
         */
        StrengTab3.prototype.getCurWashVo = function () {
            var washinfo = GuidData.grow.getWashVo();
            if (washinfo.length > 0) {
                var washvo = strengthgem.StrengUtil.parseStr(washinfo);
                var equData = GuidData.bag.getEquByPart(washvo.partid); //该部位的当前装备数据
                if (equData && equData.guid == washvo.guid) {
                    //如果当前部位的装备没有变化，则显示
                    return washvo;
                }
            }
            return null;
        };
        StrengTab3.prototype.drawEqu = function ($ui, $select, $type) {
            var aa = $ui.data;
            var equData = GuidData.bag.getEquByPart(aa);
            var stateary = [];
            if ($select) {
                if (equData) {
                    this._equid = equData.entryData.id;
                }
                else {
                    this._equid = null;
                }
            }
            if (equData) {
                strengthgem.StrengUtil.setEquIcon($ui, geteqiconIconUrl(equData.entryData.icon), stateary, $select, $type, equData.entryData.quality, equData.entryData.realmbreak_level);
            }
            else {
                strengthgem.StrengUtil.setEquNoIcon($ui, aa, stateary, $select, $type);
            }
        };
        StrengTab3.prototype.equClick = function (evt) {
            if (this.canshowAlert()) {
                for (var i = 0; i < this.EuqUIAry.length; i++) {
                    if (this.EuqUIAry[i] == evt.target) {
                        //选中
                        this._lastselect = i;
                        this.drawEqu(this.EuqUIAry[i], true, strengthgem.StrengUtil.GENERAL);
                    }
                    else {
                        //未选中
                        this.drawEqu(this.EuqUIAry[i], false, strengthgem.StrengUtil.GENERAL);
                    }
                }
                this.resetData(evt.target.data);
            }
        };
        StrengTab3.prototype.resetData = function ($partid) {
            this.t_curequ.data = $partid;
            this._vo = $partid;
            this.drawEqu(this.t_curequ, false, strengthgem.StrengUtil.GENERAL);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.t_curname.skinName, strengthgem.StrengUtil.equProp[$partid - 1] + "部位", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawResItem();
            this.drawBtn();
            this.drawAttr();
            this.drawNewAttr();
        };
        //是否需要弹出提示框
        StrengTab3.prototype.canshowAlert = function () {
            var _this = this;
            var vo = this.getCurWashVo();
            //console.log(this._vo, vo);
            if (this._vo && vo && vo.partid == this._vo) {
                AlertUtil.show("你有未保存的新属性，是否保存？", "提示", function (a) {
                    if (a == 1) {
                        _this.sendwash(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_SAVE);
                    }
                    else {
                        //console.log("--取消");
                        NetManager.getInstance().protocolos.equipdevelop_operate(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_DEL, 0, 0, "", "");
                    }
                }, 2, ["是", "否"]);
                return false;
            }
            else {
                return true;
            }
        };
        StrengTab3.prototype.drawBtn = function () {
            var vo = this.getCurWashVo();
            var flag = vo && vo.partid == this._lastselect + 1;
            this.setUiListVisibleByItem(this.BtnUI1Ary, flag);
            this.setUiListVisibleByItem(this.BtnUI0Ary, !flag);
        };
        StrengTab3.prototype.drawNewAttr = function () {
            this.setUiListVisibleByItem(this.Pro1Ary, false);
            this.setUiListVisibleByItem(this.Probg1Ary, false);
            this.setUiListVisibleByItem(this.AttrnameAry_n, false);
            this.setUiListVisibleByItem([this.d_forceArrow], false);
            var vo = this.getCurWashVo();
            if (vo && vo.partid == this._lastselect + 1) {
                this.Attr1Ary[1].x = 629;
                var att_id = new Array;
                var att_val = new Array;
                for (var i = 0; i < this.Attr1Ary.length; i++) {
                    if (i < vo.attrary.length) {
                        this.setUiListVisibleByItem([this.Pro1Ary[i], this.Probg1Ary[i], this.AttrnameAry_n[i]], true);
                        var attid = vo.attrary[i][0];
                        var cur = Math.floor(vo.attrary[i][1] / 100);
                        var nminmaxAry = strengthgem.StrengUtil.getMinMax(this._equid, attid);
                        var lim = Math.floor(nminmaxAry[1] / 100);
                        var max = Math.floor(nminmaxAry[2] / 100);
                        var raio = (cur - lim) / (max - lim);
                        //console.log("------raio-------",raio);
                        att_id.push(attid);
                        att_val.push(vo.attrary[i][1]);
                        this.Pro1Ary[i].uvScale = raio;
                        // this.drawNewAttrVal(this.Attr1Ary[i], vo.attrary[i][0], vo.attrary[i][1], getColorQua(vo.attrary[i][2]));
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.AttrnameAry_n[i].skinName, ColorType.Orange7a2f21 + this.getKeyProByIdaaa(attid), 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr1Ary[i].skinName, Snum(cur) + "/" + Snum(max), 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                    }
                    else {
                        UiDraw.clearUI(this.Attr1Ary[i]);
                    }
                }
                var force = getForceByAtt(att_id, att_val);
                var str = ColorType.Brown7a2f21 + "战力： ";
                if (this._lastforce > force) {
                    this.setUiListVisibleByItem([this.d_forceArrow], true);
                    this.d_forceArrow.goToAndStop(1);
                    str += ColorType.colorce0a00 + force;
                }
                else if (this._lastforce < force) {
                    this.setUiListVisibleByItem([this.d_forceArrow], true);
                    this.d_forceArrow.goToAndStop(0);
                    str += ColorType.color2daa35 + force;
                }
                else {
                    str += ColorType.Brown7a2f21 + force;
                }
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.d_force1.skinName, str, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            else {
                this.Attr1Ary[1].x = 598;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr1Ary[1].skinName, "点击按钮开始洗炼", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.d_force1);
                UiDraw.clearUI(this.Attr1Ary[0]);
                UiDraw.clearUI(this.Attr1Ary[2]);
                UiDraw.clearUI(this.Attr1Ary[3]);
                UiDraw.clearUI(this.Attr1Ary[4]);
                UiDraw.clearUI(this.Attr1Ary[5]);
            }
        };
        StrengTab3.prototype.drawAttr = function () {
            this.setUiListVisibleByItem(this.ProAry, false);
            this.setUiListVisibleByItem(this.ProbgAry, false);
            this.setUiListVisibleByItem(this.AttrnameAry, false);
            var equData = GuidData.bag.getEquByPart(this._vo);
            if (equData) {
                //一位数组、间隔3
                this.Attr0Ary[1].x = 416;
                var ary = equData.data.AttrData;
                var len = ary.length / 3;
                var att_id = new Array;
                var att_val = new Array;
                for (var i = 0; i < this.Attr0Ary.length; i++) {
                    if (i < len) {
                        this.setUiListVisibleByItem([this.ProAry[i], this.ProbgAry[i], this.AttrnameAry[i]], true);
                        var attid = ary[i * 3];
                        var cur = Math.floor(ary[i * 3 + 1] / 100);
                        var minmaxary = strengthgem.StrengUtil.getMinMax(this._equid, attid);
                        var lim = Math.floor(minmaxary[1] / 100);
                        var max = Math.floor(minmaxary[2] / 100);
                        var raio = (cur - lim) / (max - lim);
                        att_id.push(attid);
                        att_val.push(ary[i * 3 + 1]);
                        this.ProAry[i].uvScale = raio;
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.AttrnameAry[i].skinName, ColorType.Orange7a2f21 + this.getKeyProByIdaaa(attid), 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr0Ary[i].skinName, Snum(cur) + "/" + Snum(max), 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                        // this.drawNewAttrVal(this.Attr0Ary[i], ary[i * 3], ary[i * 3 + 1], getColorQua(ary[i * 3 + 2]));
                        // var lev: number = ary[i * 3 + 2];
                        // this.drawLineTxt(this._t_add_attList[i].skinName, getKeyProById(ary[i * 3]), "+" + ary[i * 3 + 1], lev, lev);
                    }
                    else {
                        UiDraw.clearUI(this.Attr0Ary[i]);
                    }
                }
                var force = getForceByAtt(att_id, att_val);
                this._lastforce = force;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.d_force0.skinName, "战力： " + force, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            else {
                this.Attr0Ary[1].x = 381;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Attr0Ary[1].skinName, "请穿戴相应装备", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.d_force0);
                UiDraw.clearUI(this.Attr0Ary[0]);
                UiDraw.clearUI(this.Attr0Ary[2]);
                UiDraw.clearUI(this.Attr0Ary[3]);
                UiDraw.clearUI(this.Attr0Ary[4]);
                UiDraw.clearUI(this.Attr0Ary[5]);
            }
        };
        StrengTab3.prototype.getKeyProByIdaaa = function ($id) {
            return this.keyPropaa[$id - 1];
        };
        /**属性 - value */
        StrengTab3.prototype.drawNewAttrVal = function ($ui, $att, $val, color) {
            var keyStr = "";
            if (typeof ($att) == "undefined") {
                UiDraw.clearUI($ui);
                return;
            }
            var num = Math.floor($val / 100);
            keyStr = ColorType.Orange7a2f21 + this.getKeyProByIdaaa($att) + ":  " + color + Snum(num);
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, keyStr, 14, TextAlign.LEFT);
        };
        StrengTab3.prototype.setcostary = function ($que) {
            var itemtab = tb.TB_equipdevelop_washattrs.get_TB_equipdevelop_washattrsById(this._vo, $que);
            this._costary = itemtab.cost;
        };
        StrengTab3.prototype.drawResItem = function () {
            var flagary = new Array;
            var equData = GuidData.bag.getEquByPart(this._vo);
            var que = equData ? equData.entryData.quality : 0;
            this.setcostary(que);
            for (var i = 0; i < 2; i++) {
                if (i < this._costary.length) {
                    IconManager.getInstance().drawItemIcon40(this.CostItemUIAry[i], this._costary[i][0]);
                    //绘制消耗资源图标，并把资源满足情况记录下来
                    flagary.push(UiDraw.drawResHasNumAndAllNum(this.CostItemUIAry[i + 2], this._costary[i]));
                    //调整位置
                    this.CostItemUIAry[0].x = this._costary.length == 1 ? 528 : 494;
                    this.CostItemUIAry[2].x = this._costary.length == 1 ? 516 : 482;
                }
                else {
                    UiDraw.clearUI(this.CostItemUIAry[i + 2]);
                    UiDraw.clearUI(this.CostItemUIAry[i]);
                }
            }
            this._canbuy = flagary;
        };
        StrengTab3.prototype.showExpEff = function () {
            var _this = this;
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_xl"), 4, 4, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.x = _this.d_bg3_1.x - 58;
                    _this.expEff.y = _this.d_bg3_1.y - 70;
                    _this.expEff.width = _this.expEff.baseRec.width * 1.2;
                    // this.expEff.height = this.expEff.baseRec.height * 0.8;
                    _this.expEff.speed = 3;
                    _this.expEff.playOne(_this);
                });
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        };
        StrengTab3.prototype.butClik = function (evt) {
            var _this = this;
            if (this._canclick) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, function () {
                    _this._canclick = true;
                });
                switch (evt.target) {
                    case this.btn0:
                    case this.btn1:
                        this.sendwash(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_WASH);
                        break;
                    case this.btn2:
                        this.sendwash(SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_SAVE);
                        break;
                    default:
                        break;
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        };
        StrengTab3.prototype.sendwash = function ($type) {
            var equData = GuidData.bag.getEquByPart(this._vo);
            if (equData) {
                var $canbuy = true;
                var $idx;
                if ($type == SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_WASH) {
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
                }
                if ($canbuy) {
                    if ($type == SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_WASH) {
                        this.showExpEff();
                    }
                    NetManager.getInstance().protocolos.equipdevelop_operate($type, 0, 0, equData.guid, "");
                }
                else {
                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = $idx;
                    ModuleEventManager.dispatchEvent($aaa);
                }
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请穿戴上装备再洗炼", 99);
            }
        };
        return StrengTab3;
    }(UIVirtualContainer));
    strengthgem.StrengTab3 = StrengTab3;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=StrengTab3.js.map