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
var setup;
(function (setup) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var SetupWinPanel = /** @class */ (function (_super) {
        __extends(SetupWinPanel, _super);
        function SetupWinPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        SetupWinPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.o_back_an:
                    this.hidePanel();
                    break;
                case this.o_volume_but:
                    GameData.setStorageSync("o_volume_but", this.o_volume_but.selected);
                    break;
                case this.o_shake_but:
                    GameData.setStorageSync("o_shake_but", this.o_shake_but.selected);
                    Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.CHANG_SETUP_INFO));
                    break;
                case this.o_clear_but:
                    msgalert.AlertUtil.show("是否的要清档。\n这样将会把记录全部归0.", "b", function (value) {
                        if (value == 1) {
                            var openid = GameData.getStorageSync("openid");
                            GameData.clearStorageSync();
                            GameData.setStorageSync("openid", openid);
                            GameData.initGameGetAllSync(function () {
                                game.GameDataModel.levelNum = 1;
                                GameData.dispatchToLevel(game.GameDataModel.levelNum);
                                _this.hidePanel();
                            });
                        }
                    }, 2);
                    break;
                default:
                    break;
            }
        };
        SetupWinPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        SetupWinPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        SetupWinPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.o_tip_bg = this.addEvntButUp("o_tip_bg", this._bottomRender);
            this.o_tip_bg.top = 0;
            this.o_tip_bg.left = 0;
            this.o_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.o_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.o_back_an = this.addEvntButUp("o_back_an", this._topRender);
            this.o_clear_but = this.addEvntBut("o_clear_but", this._midRender);
            this.addChild(this._midRender.getComponent("o_volume_bg"));
            this.addChild(this._midRender.getComponent("o_shake_bg"));
            this.o_volume_but = this.addEvntBut("o_volume_but", this._topRender);
            this.o_shake_but = this.addEvntBut("o_shake_but", this._topRender);
            this.addChild(this._topRender.getComponent("o_volume_txt"));
            this.addChild(this._topRender.getComponent("o_shake_txt"));
            this.addChild(this._topRender.getComponent("o_clear_txt"));
            this.addChild(this._bottomRender.getComponent("o_window_bg"));
            this.resetButState();
            this.uiLoadComplte = true;
            this.showPanel();
        };
        SetupWinPanel.prototype.resetButState = function () {
            this.o_volume_but.selected = GameData.getStorageSync("o_volume_but");
            this.o_shake_but.selected = GameData.getStorageSync("o_shake_but");
        };
        return SetupWinPanel;
    }(H5UIConatiner));
    setup.SetupWinPanel = SetupWinPanel;
})(setup || (setup = {}));
//# sourceMappingURL=SetupWinPanel.js.map