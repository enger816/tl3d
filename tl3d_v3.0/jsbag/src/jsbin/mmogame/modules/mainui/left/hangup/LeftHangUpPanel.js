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
var leftui;
(function (leftui) {
    var LeftHangUpPanel = /** @class */ (function (_super) {
        __extends(LeftHangUpPanel, _super);
        function LeftHangUpPanel() {
            var _this = _super.call(this) || this;
            _this.isBossPanel = false;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.left = 40;
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender1 = new UIRenderComponent;
            _this.addRender(_this._topRender1);
            _this._topRender.uiAtlas = new UIAtlas();
            _this._tickFun = function () { _this.upTimeFrame(); };
            return _this;
        }
        LeftHangUpPanel.prototype.upTimeFrame = function () {
            if (this.hasStage) {
                // this.refresh();
                this.leftHangUpBaseVo.upTimeFrame();
            }
            else {
                //console.log("移处挂机监听---------------");
                TimeUtil.removeTimeTick(this._tickFun);
            }
        };
        LeftHangUpPanel.prototype.loadAtlas = function ($bfun) {
            var _this = this;
            this.bFun = $bfun;
            this._topRender.uiAtlas.setInfo("ui/uidata/mainui/left/lefthangup/lefthangup.xml", "ui/uidata/mainui/left/lefthangup/lefthangup.png", function () { _this.loadConfigCom(); });
        };
        LeftHangUpPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this._topRender1.uiAtlas = this._topRender.uiAtlas;
            this.leftHangUpBaseVo = new leftui.LeftHangUpBaseVo(this, this._midRender, this._topRender, this._topRender1);
            this.leftHangUpBossVo = new leftui.LeftHangUpBossVo(this, this._midRender, this._topRender);
            if (this.bFun) {
                this.bFun();
            }
        };
        LeftHangUpPanel.prototype.butClik = function (evt) {
        };
        LeftHangUpPanel.prototype.refresh = function () {
            this.leftHangUpBaseVo.refresh();
            this.leftHangUpBossVo.refresh();
        };
        LeftHangUpPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.removeTimeTick(this._tickFun);
            TimeUtil.addTimeTick(1000, this._tickFun);
            this.isBossPanel = GuidData.map.isAdventureBossScene();
            if (this.isBossPanel) {
                this.leftHangUpBaseVo.hide();
                this.leftHangUpBossVo.show();
            }
            else {
                this.leftHangUpBaseVo.show();
                this.leftHangUpBossVo.hide();
            }
        };
        LeftHangUpPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return LeftHangUpPanel;
    }(UIPanel));
    leftui.LeftHangUpPanel = LeftHangUpPanel;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftHangUpPanel.js.map