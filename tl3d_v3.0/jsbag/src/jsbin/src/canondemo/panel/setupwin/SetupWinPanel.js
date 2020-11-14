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
var setupui;
(function (setupui) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Rectangle = Pan3d.Rectangle;
    var SetupWinPanel = /** @class */ (function (_super) {
        __extends(SetupWinPanel, _super);
        function SetupWinPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        SetupWinPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/setupwin/setupwin.txt", "panelui/setupwin/setupwin.png", function () { _this.loadConfigCom(); });
        };
        SetupWinPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel();
                    break;
                case this.o_volume_but:
                    GameData.setStorageSync("o_volume_but", this.o_volume_but.selected);
                    break;
                case this.o_shake_but:
                    GameData.setStorageSync("o_shake_but", this.o_shake_but.selected);
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
                                GameData.skinType = 4; //首次进来给足球
                                GameData.setStorageSync("skinType", GameData.skinType);
                                game.GameDataModel.centenBall.changeSkinById(GameData.skinType);
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
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                Pan3d.UIManager.getInstance().removeUIContainer(_this);
            });
        };
        SetupWinPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        SetupWinPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, 0, 450, 250);
            this.o_volume_but = this.addEvntBut("o_volume_but", this._topRender);
            this.o_shake_but = this.addEvntBut("o_shake_but", this._topRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(this._topRender.getComponent("o_volume_txt"));
            this.addChild(this._topRender.getComponent("o_shake_txt"));
            this.addChild(this._topRender.getComponent("o_win_tittle"));
            this.o_clear_but = this.addEvntBut("o_clear_but", this._topRender);
            this.resetButState();
            this.uiLoadComplte = true;
            this.showPanel();
        };
        SetupWinPanel.prototype.resetButState = function () {
            this.o_volume_but.selected = GameData.getStorageSync("o_volume_but");
            this.o_shake_but.selected = GameData.getStorageSync("o_shake_but");
        };
        return SetupWinPanel;
    }(basewin.BaseWinPanel));
    setupui.SetupWinPanel = SetupWinPanel;
})(setupui || (setupui = {}));
//# sourceMappingURL=SetupWinPanel.js.map