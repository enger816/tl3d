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
var adventureinfo;
(function (adventureinfo) {
    var UplevfoPanel = /** @class */ (function (_super) {
        __extends(UplevfoPanel, _super);
        function UplevfoPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.endTime = 0;
            _this.lastTxtNum = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this.removeRender;
            _this._midRender.uiAtlas = new UIAtlas;
            _this.interfaceUI = true;
            return _this;
        }
        UplevfoPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/uplev/uplev.xml", "ui/uidata/adventure/uplev/uplev.png", function () { _this.loadConfigCom(); });
        };
        UplevfoPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.a_time = this.addChild(this._midRender.getComponent("a_time"));
            this._attrary = new Array;
            this._nextattrary = new Array;
            for (var i = 0; i < 3; i++) {
                this._attrary.push(this.addChild(this._midRender.getComponent("a_attr" + i)));
                this._nextattrary.push(this.addChild(this._midRender.getComponent("a_nextattr" + i)));
            }
            this.tickFun = function (t) { _this.update(t); };
            this.applyLoadComplete();
        };
        UplevfoPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this._curtime = -1;
            this.endTime = TimeUtil.getTimer() + 6 * 1000; //未来时间
            TimeUtil.addFrameTick(this.tickFun);
            var $tb = adventure.AdventureModel.getInstance().getCurTb();
            var exp = $tb.expReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._nextattrary[0].skinName, exp + "/小时 ", 16, TextAlign.CENTER, ColorType.Green54db36, ColorType.colord27262e);
            var gold = $tb.goldReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._nextattrary[1].skinName, gold + "/小时 ", 16, TextAlign.CENTER, ColorType.Green54db36, ColorType.colord27262e);
            var equipnum = Math.ceil($tb.suitScore * 360 / $tb.suitScoreChange);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._nextattrary[2].skinName, equipnum + "件/小时", 16, TextAlign.CENTER, ColorType.Green54db36, ColorType.colord27262e);
            var $lasttb = tb.TB_risk_data.get_TB_risk_data($tb.parentid);
            var lastexp = $lasttb.expReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._attrary[0].skinName, lastexp + "/小时 ", 16, TextAlign.CENTER, ColorType.Whitefff7db, ColorType.colord27262e);
            var lastgold = $lasttb.goldReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._attrary[1].skinName, lastgold + "/小时 ", 16, TextAlign.CENTER, ColorType.Whitefff7db, ColorType.colord27262e);
            var lastequipnum = Math.ceil($lasttb.suitScore * 360 / $lasttb.suitScoreChange);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._attrary[2].skinName, lastequipnum + "件/小时", 16, TextAlign.CENTER, ColorType.Whitefff7db, ColorType.colord27262e);
        };
        UplevfoPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        UplevfoPanel.prototype.update = function (t) {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.tickFun);
            }
            else {
                var $time = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
                if ($time <= -1) {
                    this.hide();
                }
                else if ($time >= 0 && this.lastTxtNum != $time) {
                    this.lastTxtNum = $time;
                    //console.log($time)
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_time.skinName, ColorType.Whitefff7db + getScencdStr($time) + "秒后自动关闭", 14, TextAlign.CENTER);
                }
            }
        };
        return UplevfoPanel;
    }(UIPanel));
    adventureinfo.UplevfoPanel = UplevfoPanel;
})(adventureinfo || (adventureinfo = {}));
//# sourceMappingURL=UplevfoPanel.js.map