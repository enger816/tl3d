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
    var refiningtipsPanel = /** @class */ (function (_super) {
        __extends(refiningtipsPanel, _super);
        function refiningtipsPanel() {
            var _this = _super.call(this) || this;
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
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        refiningtipsPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        };
        refiningtipsPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            //     this._publicbgRender.uiAtlas = $publicbgUiAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/streng/tips.xml", "ui/uidata/streng/tips.png", function () { _this.loadConfigCom(); });
            // });
        };
        refiningtipsPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this.a_closebtn = this.addEvntBut("a_closebtn", this._midRender);
            this.a_closebtn.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addUIList(["a_bg"], this._bgRender);
            this.addUIList(["a_txt"], this._midRender);
            this.AttrCurAry = new Array;
            this.AttrNextAry = new Array;
            for (var i = 0; i < 7; i++) {
                this.AttrCurAry.push(this.addChild(this._midRender.getComponent("a_attr" + i)));
                this.AttrNextAry.push(this.addChild(this._midRender.getComponent("a_nattr" + i)));
            }
            this.resize();
            this.applyLoadComplete();
        };
        refiningtipsPanel.prototype.butClik = function (evt) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.butClik, this);
        };
        refiningtipsPanel.prototype.show = function ($partid_rare) {
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.butClik, this);
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var equData = GuidData.bag.getEquByPart($partid_rare[0]);
            //基础属性绘制
            var obj = equData.entryData.basic_properties;
            //console.log("==基础属性绘制==", obj);
            if (obj && obj.length) {
                this.drawAttrVal(this.AttrCurAry[0], obj[0][0], obj[0][1]);
                UiDraw.drawAddValRight(this.AttrNextAry[0], ($partid_rare[1] + 1) * obj[0][1], false, TextAlign.LEFT);
            }
            else {
                UiDraw.clearUI(this.AttrCurAry[0]);
                UiDraw.clearUI(this.AttrNextAry[0]);
            }
            //附加属性绘制
            var ary = equData.data.AttrData;
            var len = ary.length / 3;
            //console.log("==附加属性绘制==", ary, len);
            for (var i = 0; i < this.AttrCurAry.length - 1; i++) {
                if (i < len) {
                    this.drawAttrVal(this.AttrCurAry[i + 1], ary[i * 3], ary[i * 3 + 1]);
                    UiDraw.drawAddValRight(this.AttrNextAry[i + 1], ($partid_rare[1] + 1) * ary[i * 3 + 1], false, TextAlign.LEFT);
                }
                else {
                    UiDraw.clearUI(this.AttrCurAry[i + 1]);
                    UiDraw.clearUI(this.AttrNextAry[i + 1]);
                }
            }
        };
        refiningtipsPanel.prototype.drawAttrVal = function ($ui, $att, $val) {
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, ColorType.colorefe4c4 + getKeyProById($att) + ":  " + Snum($val), 14, TextAlign.RIGHT);
        };
        return refiningtipsPanel;
    }(UIPanel));
    strengthgem.refiningtipsPanel = refiningtipsPanel;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=refiningtipsPanel.js.map