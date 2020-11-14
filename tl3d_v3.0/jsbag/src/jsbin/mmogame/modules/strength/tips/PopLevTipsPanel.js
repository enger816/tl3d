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
    var PopLevTipsPanel = /** @class */ (function (_super) {
        __extends(PopLevTipsPanel, _super);
        function PopLevTipsPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        PopLevTipsPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            _super.prototype.dispose.call(this);
        };
        PopLevTipsPanel.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/streng/tips.xml", "ui/uidata/streng/tips.png", function () { _this.loadConfigCom(); });
        };
        PopLevTipsPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.addUIList(["c_title", "c_line"], this._bgRender);
            this.c_info = this.addChild(this._bgRender.getComponent("c_info"));
            this.c_lev = this.addChild(this._baseRender.getComponent("c_lev"));
            this.AttrCurAry = new Array;
            for (var i = 0; i < 9; i++) {
                this.AttrCurAry.push(this.addChild(this._baseRender.getComponent("c_attr" + i)));
            }
            this.applyLoadComplete();
            this.resize();
        };
        PopLevTipsPanel.prototype.resetData = function ($data) {
            //console.log("----奖励tips----");
            var $value;
            if ($data[0] == 25) {
                $value = SharedDef.MODULE_MIX_STRENGTH;
            }
            else if ($data[0] == 26) {
                $value = SharedDef.MODULE_MIX_POLISHED;
            }
            else {
                $value = SharedDef.MODULE_MIX_GEM;
            }
            var lev = $data[1] == 0 ? 1 : $data[1];
            var type = $value - 1;
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.c_lev.skinName, String(lev), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.c_info.goToAndStop(type);
            var ary = this.getTabAry($value);
            var curtab = ary[lev - 1];
            // if (lev > 0) {
            for (var i = 0; i < this.AttrCurAry.length; i++) {
                if (i < curtab.props.length) {
                    UiDraw.drawAttValAdd(this.AttrCurAry[i], curtab.props[i][0], curtab.props[i][1]);
                    // this.drawAttrVal(this.AttrCurAry[i], curtab.props[i][0], curtab.props[i][1]);
                }
                else {
                    UiDraw.clearUI(this.AttrCurAry[i]);
                }
            }
            // } else {
            //     UiDraw.clearUI(this.AttrCurAry[0]);
            //     UiDraw.clearUI(this.AttrCurAry[1]);
            //     UiDraw.clearUI(this.AttrCurAry[2]);
            //     UiDraw.clearUI(this.AttrCurAry[3]);
            //     UiDraw.clearUI(this.AttrCurAry[4]);
            //     UiDraw.clearUI(this.AttrCurAry[5]);
            //     UiDraw.clearUI(this.AttrCurAry[6]);
            // }
        };
        // private drawAttrVal($ui: UICompenent, $att: number, $val: number) {
        //     var num = Math.floor($val / 100);
        //     LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, ColorType.color802626 + getKeyProById($att) + ":    " + ColorType.color9a683f + "+" + Snum(num), 14, TextAlign.LEFT);
        // }
        PopLevTipsPanel.prototype.getTabAry = function ($type) {
            var comebackary = new Array;
            var ary = tb.TB_equipdevelop_bonus.get_TB_equipdevelop_bonus();
            for (var index = 0; index < ary.length; index++) {
                if (ary[index].type == $type) {
                    comebackary.push(ary[index]);
                }
            }
            //console.log("--comebackary--", comebackary);
            return comebackary;
        };
        PopLevTipsPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        PopLevTipsPanel.prototype.show = function ($data) {
            UIManager.getInstance().addUIContainer(this);
            this.resetData($data);
        };
        PopLevTipsPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return PopLevTipsPanel;
    }(WindowCentenMin));
    strengthgem.PopLevTipsPanel = PopLevTipsPanel;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=PopLevTipsPanel.js.map