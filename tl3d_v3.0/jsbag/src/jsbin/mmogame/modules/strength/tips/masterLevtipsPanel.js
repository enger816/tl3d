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
    var masterLevtipsPanel = /** @class */ (function (_super) {
        __extends(masterLevtipsPanel, _super);
        function masterLevtipsPanel() {
            var _this = _super.call(this) || this;
            _this.KeyByType = ["全身强化:  ", "全身精炼:  ", "全身镶嵌总和:  "];
            _this.KeyLevNameByType = ["段", "级", "级"];
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            // this._publicbgRender = new UIRenderComponent;
            // this.addRender(this._publicbgRender)
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        masterLevtipsPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._topRender.dispose();
            this._topRender = null;
            _super.prototype.dispose.call(this);
        };
        masterLevtipsPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            //     this._publicbgRender.uiAtlas = $publicbgUiAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/streng/tips.xml", "ui/uidata/streng/tips.png", function () { _this.loadConfigCom(); });
            // });
        };
        masterLevtipsPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.addUIList(["b_title", "d_huawen2", "d_huawen21", "d_huawen3", "d_huawen32", "d_huawen0", "d_huawen1"], this._bgRender);
            this.addUIList(["b_arrow", "b_line", "d_huawen31", "d_huawen33"], this._midRender);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._midRender);
            var d_huawen11 = this.addChild(this._bgRender.getComponent("d_huawen11"));
            d_huawen11.isU = true;
            var d_huawen01 = this.addChild(this._bgRender.getComponent("d_huawen01"));
            d_huawen01.isU = true;
            var d_huawen35 = this.addChild(this._bgRender.getComponent("d_huawen35"));
            d_huawen35.isV = true;
            var d_huawen34 = this.addChild(this._bgRender.getComponent("d_huawen34"));
            d_huawen34.isV = true;
            this.AttrCurAry = new Array;
            this.AttrNextAry = new Array;
            for (var i = 0; i < 11; i++) {
                this.AttrCurAry.push(this.addChild(this._topRender.getComponent("b_attr" + i)));
                this.AttrNextAry.push(this.addChild(this._topRender.getComponent("b_nattr" + i)));
            }
            this.b_tab0 = this.addEvntBut("b_tab0", this._bgRender);
            this.b_tab1 = this.addEvntBut("b_tab1", this._bgRender);
            this.b_tab2 = this.addEvntBut("b_tab2", this._bgRender);
            this.TabAry = new Array;
            this.TabAry.push(this.b_tab0);
            this.TabAry.push(this.b_tab1);
            this.TabAry.push(this.b_tab2);
            this.resize();
            this.applyLoadComplete();
        };
        masterLevtipsPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    UIManager.getInstance().removeUIContainer(this);
                    break;
                case this.b_tab0:
                    this.setSelectTab(SharedDef.MODULE_MIX_STRENGTH);
                    break;
                case this.b_tab1:
                    this.setSelectTab(SharedDef.MODULE_MIX_POLISHED);
                    break;
                case this.b_tab2:
                    this.setSelectTab(SharedDef.MODULE_MIX_GEM);
                    break;
                default:
                    break;
            }
        };
        masterLevtipsPanel.prototype.setSelectTab = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if ((i + 1) == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            for (var i_1 = 0; i_1 < this.AttrNextAry.length; i_1++) {
                UiDraw.clearUI(this.AttrNextAry[i_1]);
                UiDraw.clearUI(this.AttrCurAry[i_1]);
            }
            this.drawPage($value);
        };
        masterLevtipsPanel.prototype.drawPage = function ($value) {
            var type = $value - 1;
            var lev = this._masterlevvo[type] == 0 ? 1 : this._masterlevvo[type];
            var ary = this.getTabAry($value);
            var curtab = ary[lev - 1];
            // //console.log("---lev--", lev, curtab, ary);
            //下一级加成情况
            if (lev == ary.length) {
                //满级
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[3].skinName, "已满级", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.AttrNextAry[0]);
                UiDraw.clearUI(this.AttrNextAry[1]);
                UiDraw.clearUI(this.AttrNextAry[2]);
                UiDraw.clearUI(this.AttrNextAry[4]);
                UiDraw.clearUI(this.AttrNextAry[5]);
                UiDraw.clearUI(this.AttrNextAry[6]);
            }
            else if (lev < ary.length) {
                var tabvo;
                var poplev;
                if (this._masterlevvo[type] == 0) {
                    tabvo = curtab;
                }
                else {
                    tabvo = ary[lev];
                }
                poplev = tabvo.need_lv[0];
                if (type == 0) {
                    var $objstrength = TableData.getInstance().getData(TableData.tb_equipdevelop_strength, 1000 + poplev);
                    poplev = $objstrength["rank"];
                }
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[0].skinName, ColorType.color802626 + strengthgem.StrengUtil.KeyNameByType[type] + ":  " + ColorType.Green2ca937 + tabvo.level + "级", 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[1].skinName, ColorType.color802626 + this.KeyByType[type] + ColorType.Green2ca937 + poplev + this.KeyLevNameByType[type], 14, TextAlign.LEFT);
                for (var i = 0; i < this.AttrNextAry.length - 2; i++) {
                    if (i < tabvo.props.length) {
                        UiDraw.drawAttValAdd(this.AttrNextAry[i + 2], tabvo.props[i][0], tabvo.props[i][1]);
                    }
                    else {
                        UiDraw.clearUI(this.AttrNextAry[i + 2]);
                    }
                }
            }
            else {
                return;
            }
            var curlev = curtab.need_lv[0];
            if (type == 0) {
                var $objstrength = TableData.getInstance().getData(TableData.tb_equipdevelop_strength, 1000 + curlev);
                curlev = $objstrength["rank"];
            }
            //现有属性加成情况
            if (this._masterlevvo[type] > 0) {
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[0].skinName, ColorType.color802626 + strengthgem.StrengUtil.KeyNameByType[type] + ":  " + ColorType.color9a683f + curtab.level + "级", 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[1].skinName, ColorType.color802626 + this.KeyByType[type] + ColorType.color9a683f + curlev + this.KeyLevNameByType[type], 14, TextAlign.LEFT);
                for (var i = 0; i < this.AttrCurAry.length - 2; i++) {
                    if (i < curtab.props.length) {
                        this.drawAttrVal(this.AttrCurAry[i + 2], curtab.props[i][0], curtab.props[i][1]);
                    }
                    else {
                        UiDraw.clearUI(this.AttrCurAry[i + 2]);
                    }
                }
            }
            else {
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[3].skinName, this.KeyByType[type] + curlev + this.KeyLevNameByType[type], 14, TextAlign.CENTER, ColorType.color802626);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[4].skinName, "即可获得属性提升", 14, TextAlign.CENTER, ColorType.color802626);
                UiDraw.clearUI(this.AttrCurAry[0]);
                UiDraw.clearUI(this.AttrCurAry[1]);
                UiDraw.clearUI(this.AttrCurAry[2]);
                UiDraw.clearUI(this.AttrCurAry[5]);
                UiDraw.clearUI(this.AttrCurAry[6]);
            }
        };
        masterLevtipsPanel.prototype.getTabAry = function ($type) {
            var comebackary = new Array;
            var ary = tb.TB_equipdevelop_bonus.get_TB_equipdevelop_bonus();
            for (var index = 0; index < ary.length; index++) {
                if (ary[index].type == $type) {
                    comebackary.push(ary[index]);
                }
            }
            return comebackary;
        };
        masterLevtipsPanel.prototype.show = function ($tabid) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._masterlevvo = GuidData.grow.getMasterLevVo();
            this.setSelectTab($tabid);
        };
        masterLevtipsPanel.prototype.drawAttrVal = function ($ui, $att, $val) {
            var num = Math.floor($val / 100);
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, ColorType.color802626 + getKeyProById($att) + ":    " + ColorType.color9a683f + "+" + Snum(num), 14, TextAlign.LEFT);
        };
        return masterLevtipsPanel;
    }(WindowMinUi));
    strengthgem.masterLevtipsPanel = masterLevtipsPanel;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=masterLevtipsPanel.js.map