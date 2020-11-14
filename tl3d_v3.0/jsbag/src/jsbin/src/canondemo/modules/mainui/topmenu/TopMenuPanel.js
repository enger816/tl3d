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
var topmenu;
(function (topmenu) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var Scene_data = Pan3d.Scene_data;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameDataModel = game.GameDataModel;
    var TopMenuPanel = /** @class */ (function (_super) {
        __extends(TopMenuPanel, _super);
        function TopMenuPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.top = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/topmenu/topmenu.txt", "panelui/topmenu/topmenu.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TopMenuPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.centreInofTxtView = new tips.CentreInofTxtView(this, this._topRender);
            this.a_tittle_level_bg = this.addEvntButUp("a_tittle_level_bg", this._midRender);
            this.a_back_home = this.addEvntButUp("a_back_home", this._midRender);
            this.a_top_level_num_txt = this.addChild(this._topRender.getComponent("a_top_level_num_txt"));
            this.a_reset_level_but = this.addEvntButUp("a_reset_level_but", this._topRender);
            this.a_effict_skin_icon = this.addEvntButUp("a_effict_skin_icon", this._topRender);
            this.addChild(this._topRender.getComponent("a_diamonds_icon"));
            this.a_diamonds_num_txt = this.addChild(this._topRender.getComponent("a_diamonds_num_txt"));
            this.a_sound_but = this.addEvntButUp("a_sound_but", this._topRender);
            this.a_vip_but = this.addEvntButUp("a_vip_but", this._topRender);
            if (Scene_data.stageHeight / Scene_data.stageWidth > 2) {
                this.a_sound_but.y = this.a_sound_but.baseRec.y + 40;
            }
            this.a_effict_skin_icon.y = this.a_sound_but.y;
            this.a_vip_but.y = this.a_sound_but.y + (this.a_vip_but.baseRec.y - this.a_sound_but.baseRec.y);
            this.setVolumeBut();
            this.uiLoadComplte = true;
            this.showPanel();
            this.setTittleTxt("第 " + GameDataModel.levelNum + " 关");
        };
        TopMenuPanel.prototype.setVolumeBut = function () {
            this.a_sound_but.goToAndStop(Boolean(GameData.getStorageSync("o_volume_but")) ? 0 : 1);
        };
        TopMenuPanel.prototype.showColorFrame = function () {
            if (!this.colorMcItem) {
                this.colorMcItem = new Array();
                for (var i = 0; i < 4; i++) {
                    var $temp = this._topRender.getComponent("a_color_frame");
                    var tw = $temp.baseRec.width + 4;
                    $temp.addEventListener(InteractiveEvent.Up, this.butClik, this);
                    $temp.goToAndStop(i);
                    $temp.data = i;
                    this.colorMcItem.push($temp);
                    $temp.x = $temp.baseRec.x + i * tw - 3 * tw;
                }
            }
            this.setUiListVisibleByItem(this.colorMcItem, true);
        };
        TopMenuPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_tittle_level_bg:
                    this.showCammandPanel();
                    break;
                case this.a_vip_but:
                    if (this.a_vip_but.current == 0) {
                        this.showColorFrame();
                    }
                    else {
                        Pan3d.ModuleEventManager.dispatchEvent(new vip.VipEvent(vip.VipEvent.SHOW_VIP_PANEL));
                    }
                    break;
                case this.a_sound_but:
                    GameData.setStorageSync("o_volume_but", !Boolean(GameData.getStorageSync("o_volume_but")));
                    this.setVolumeBut();
                    game.GameSoundManager.getInstance().changeBgUrl();
                    break;
                case this.a_effict_skin_icon:
                    GameData.setStorageSync("useEffictSkin", !GameData.getStorageSync("useEffictSkin"));
                    game.GameDataModel.changeMainEffict();
                    break;
                case this.a_reset_level_but:
                    if (GameData.gameType == 5) {
                        ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SELECT_SPECIAL_LEVEL));
                    }
                    else {
                        GameData.dispatchToLevel(GameDataModel.levelNum);
                    }
                    break;
                case this.a_back_home:
                    ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new topstart.TopStartEvent(topstart.TopStartEvent.SHOW_TOP_START_PANEL));
                    break;
                default:
                    if (evt.target.name == "a_color_frame") {
                        this.setUiListVisibleByItem(this.colorMcItem, false);
                        switch (evt.target.data) {
                            case 0:
                                game.GameSceneColor.makeBaseColor(0);
                                break;
                            case 1:
                                game.GameSceneColor.makeBaseColor(1);
                                break;
                            case 2:
                                game.GameSceneColor.makeBaseColor(2);
                                break;
                            case 3:
                                game.GameSceneColor.makeBaseColor(3);
                                break;
                            default:
                                game.GameSceneColor.makeBaseColor(4);
                                break;
                        }
                    }
                    break;
            }
        };
        TopMenuPanel.prototype.refrishUi = function () {
            if (this.uiLoadComplte) {
                this.setUiListVisibleByItem([this.a_effict_skin_icon], GameData.getStorageSync("isUseEffictSkin"));
                TweenLite.to(this, 0.3, { showhaveNum: GameData.hasdiamondsHavenum });
                this.setUiListVisibleByItem([this.a_vip_but], (GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) + 1) >= GameData.severinfo.vippanel.level);
                if (GameData.getStorageSync("isvip")) {
                    this.a_vip_but.goToAndStop(0);
                }
                else {
                    this.a_vip_but.goToAndStop(1);
                }
            }
        };
        Object.defineProperty(TopMenuPanel.prototype, "showhaveNum", {
            get: function () {
                return this._showhaveNum;
            },
            set: function (value) {
                this._showhaveNum = value;
                if (this.lastNumStr != String(Math.floor(value))) {
                    this.lastNumStr = String(Math.floor(value));
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_diamonds_num_txt.skinName, Pan3d.ColorType.Whiteffffff + this.lastNumStr, 26, TextAlign.CENTER);
                }
            },
            enumerable: true,
            configurable: true
        });
        TopMenuPanel.prototype.setTittleTxt = function (value) {
            if (this.uiLoadComplte) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_top_level_num_txt.skinName, value, 26, TextAlign.CENTER);
            }
        };
        TopMenuPanel.prototype.showCammandPanel = function () {
            if (camand.CammandPanel.getInstance().hasStage) {
                camand.CammandPanel.getInstance().hide();
            }
            else {
                camand.CammandPanel.getInstance().show();
            }
        };
        TopMenuPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishUi();
                TweenLite.to(this, 0.3, {
                    top: 0, ease: Back.easeInOut, onComplete: function () {
                    }
                });
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        TopMenuPanel.prototype.hidePanel = function () {
            var _this = this;
            TweenLite.to(this, 0.3, {
                top: -100, ease: Back.easeInOut, onComplete: function () {
                    Pan3d.UIManager.getInstance().removeUIContainer(_this);
                }
            });
        };
        return TopMenuPanel;
    }(H5UIConatiner));
    topmenu.TopMenuPanel = TopMenuPanel;
})(topmenu || (topmenu = {}));
//# sourceMappingURL=TopMenuPanel.js.map