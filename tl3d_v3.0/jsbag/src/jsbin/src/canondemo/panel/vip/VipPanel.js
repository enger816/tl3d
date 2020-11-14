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
var vip;
(function (vip) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var FrameUIRender = Pan3d.FrameUIRender;
    var VipPanel = /** @class */ (function (_super) {
        __extends(VipPanel, _super);
        function VipPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/vip/vip.txt", "panelui/vip/vip.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        VipPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addChild(this._midRender.getComponent("v_win_tip_bg"));
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.v_close_but = this.addEvntButUp("v_close_but", this._topRender);
            this.v_share_but = this.addEvntButUp("v_share_but", this._topRender);
            this.v_frame_pic = this.addChild(this._topRender.getComponent("v_frame_pic"));
            this.addChild(this._topRender.getComponent("v_tittle_txt"));
            this.addChild(this._topRender.getComponent("v_tips_info_txt"));
            this.addChild(this._topRender.getComponent("v_message_txt"));
            this.uiLoadComplte = true;
            this.showExpEff();
            this.showPanel();
        };
        VipPanel.prototype.showExpEff = function () {
            var _this = this;
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                var knum = 5;
                this._effRender.setImg("panelui/vip/vipframe.jpg", 10, 9, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.x = _this.v_frame_pic.x + knum;
                    _this.expEff.y = _this.v_frame_pic.y + knum;
                    _this.expEff.width = _this.v_frame_pic.width - knum * 2;
                    _this.expEff.height = _this.v_frame_pic.height - knum * 2;
                    _this.expEff.speed = 1;
                    _this.expEff.playOne(_this);
                    _this.expEff.play();
                });
            }
        };
        VipPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.v_close_but:
                    this.hidePanel();
                    break;
                case this.v_share_but:
                    this.shareBut_Clik();
                    break;
            }
        };
        VipPanel.prototype.shareBut_Clik = function () {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    msgalert.AlertUtil.show("从聊天群进入可获得");
                }
            }, AllShareMeshVo.type12));
        };
        VipPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        VipPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        return VipPanel;
    }(H5UIConatiner));
    vip.VipPanel = VipPanel;
})(vip || (vip = {}));
//# sourceMappingURL=VipPanel.js.map