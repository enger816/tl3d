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
var platform;
(function (platform) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var PlatFormPanel = /** @class */ (function (_super) {
        __extends(PlatFormPanel, _super);
        function PlatFormPanel() {
            var _this = _super.call(this) || this;
            _this.isDrawFinish = false;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.left = -345;
            _this.middle = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/platform/platform.txt", "panelui/platform/platform.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        PlatFormPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.addChild(this._midRender.getComponent("a_base_bg"));
            this.a_show_but = this.addEvntBut("a_show_but", this._midRender);
            this.a_show_but.selected = true;
            this.uiLoadComplte = true;
            this.showPanel();
        };
        PlatFormPanel.prototype.drawTempUre = function ($ui) {
            var _this = this;
            var $data = $ui.data;
            GameData.loadImgByPicUrl($data.skin, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 10, 0, 60, 60);
                LabelTextFont.writeSingleLabelToCtx($ctx, $data.name, 14, 0, 65, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Whiteffffff);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        PlatFormPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_show_but:
                    if (this.a_show_but.selected) {
                        TweenLite.to(this, 0.3, { left: -345 });
                        this.interfaceUI = true;
                    }
                    else {
                        TweenLite.to(this, 0.3, { left: 0 });
                        this.interfaceUI = false;
                    }
                    break;
                default:
                    GameData.dispatchEvent(new platform.PlatFormEvent(platform.PlatFormEvent.CLIK_PLAT_OTHER_GAME), evt.target.data);
                    break;
            }
        };
        PlatFormPanel.prototype.refrishData = function (value) {
            this.dataItem = value;
            if (this.uiLoadComplte && this.dataItem && !this.isDrawFinish) {
                for (var i = 0; i < this.dataItem.length; i++) {
                    var mc = this.addEvntBut("a_game_icon_frame", this._topRender);
                    mc.x = mc.baseRec.x + i % 4 * 80;
                    mc.y = mc.baseRec.y + Math.floor(i / 4) * 100;
                    mc.goToAndStop(i);
                    mc.data = this.dataItem[i];
                    this.drawTempUre(mc);
                }
                this.isDrawFinish = true;
            }
        };
        PlatFormPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishData(this.dataItem);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        PlatFormPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        return PlatFormPanel;
    }(H5UIConatiner));
    platform.PlatFormPanel = PlatFormPanel;
})(platform || (platform = {}));
//# sourceMappingURL=PlatFormPanel.js.map