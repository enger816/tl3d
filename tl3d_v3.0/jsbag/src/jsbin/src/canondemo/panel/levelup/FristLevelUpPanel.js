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
var leveluppan;
(function (leveluppan) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var GameDataModel = game.GameDataModel;
    var Rectangle = Pan3d.Rectangle;
    var FristLevelUpPanel = /** @class */ (function (_super) {
        __extends(FristLevelUpPanel, _super);
        function FristLevelUpPanel() {
            var _this = _super.call(this) || this;
            _this.nextShowBestFriend = 0;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        FristLevelUpPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/levelup/levelup.txt", "panelui/levelup/levelup.png", function () { _this.loadConfigCom(); });
        };
        FristLevelUpPanel.prototype.willToNextLevel = function () {
            if (this.needUseNumToNextLevel) {
                GameData.hasdiamondsHavenum = Math.max(0, GameData.hasdiamondsHavenum - 10);
            }
            else {
                GameData.hasdiamondsHavenum += GameData.getFristLevelUpByLevel(GameDataModel.levelNum);
            }
            GameData.dispatchToLevel(GameDataModel.levelNum + 1);
            this.hidePanel();
            Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.LEVEL_UP_TEST_NEED_SKIN));
            Pan3d.ModuleEventManager.dispatchEvent(new leveluppan.LevelUpEvent(leveluppan.LevelUpEvent.SHOW_BEST_FRIEND_PANEL));
            if (GameData.severinfo.wxcloudModel != 1) {
                if (GameDataModel.levelNum == GameData.severinfo.showSkinefficLevel) {
                    Pan3d.ModuleEventManager.dispatchEvent(new skineffict.SkineffictEvent(skineffict.SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                }
                if (GameDataModel.levelNum == GameData.severinfo.vippanel.level && GameData.severinfo.vippanel.open) {
                    Pan3d.ModuleEventManager.dispatchEvent(new vip.VipEvent(vip.VipEvent.SHOW_VIP_PANEL));
                }
                if (GameDataModel.levelNum == GameData.severinfo.special.openlevel) {
                    msgalert.AlertUtil.show("你已具备挑战神秘关卡的能力，点确定前往", "提示", function (value) {
                        if (value == 1) {
                            Pan3d.ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL));
                        }
                    }, 2);
                }
            }
            if (this.nextShowBestFriend < Pan3d.TimeUtil.getTimer()) {
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.WX_GET_FRIEND_CLOUD_STORAGE)); //选择关卡后，将本关最佳成绩的好友显示到纹理上
                if (GameData.severinfo.wxcloudModel == 1) {
                    this.nextShowBestFriend = Pan3d.TimeUtil.getTimer() + 1000 * 1;
                }
                else {
                    this.nextShowBestFriend = Pan3d.TimeUtil.getTimer() + 1000 * 60;
                }
            }
        };
        FristLevelUpPanel.prototype.clearFristLevelUp = function ($level) {
            if ($level >= 10) {
                var $str = GameData.getStorageSync("fristlevelupdata");
                if ($str) {
                    var $arr = JSON.parse($str);
                    for (var i = 0; i < $arr.length; i++) {
                        if ($arr[i] == $level) {
                            $arr.splice(i, 1);
                        }
                    }
                    GameData.setStorageSync("fristlevelupdata", JSON.stringify($arr));
                }
            }
        };
        FristLevelUpPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.win_tip_bg:
                    break;
                case this.base_win_close:
                    if (this.isNeeShareLevelUp) {
                        GameData.clearFristLevelUp(GameDataModel.levelNum);
                        GameDataModel.levelNum--; //需要分享。将将关卡退一组
                    }
                    this.willToNextLevel();
                    break;
                case this.b_next_but:
                    if (this.b_but_txt_frame.current == 0) {
                        this.willToNextLevel();
                    }
                    else {
                        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                            if (value == 1) {
                                _this.willToNextLevel();
                            }
                        }, AllShareMeshVo.type3));
                    }
                    break;
                default:
                    break;
            }
        };
        FristLevelUpPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        FristLevelUpPanel.prototype.needUseMunToNext = function (value) {
            if (GameData.hasdiamondsHavenum > 10) {
                for (var i = 0; i < GameData.severinfo.levelupneedmunArr.length; i++) {
                    if (value == GameData.severinfo.levelupneedmunArr[i]) {
                        return true;
                    }
                }
            }
            return false;
        };
        FristLevelUpPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                var $addNum = GameData.getFristLevelUpByLevel(GameDataModel.levelNum);
                this.needUseNumToNextLevel = this.needUseMunToNext(GameDataModel.levelNum);
                var $str = "";
                if (this.needUseNumToNextLevel) {
                    $str = Pan3d.ColorType.Brown40120a + "开启下一关卡消耗x10钻石";
                }
                else {
                    $str = Pan3d.ColorType.Brown40120a + "x " + $addNum;
                }
                this.setUiListVisibleByItem([this.b_info_top_txt], !this.needUseNumToNextLevel);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_context_txt.skinName, $str, 20, TextAlign.CENTER);
                this.isShowLevelUpInfo();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        FristLevelUpPanel.prototype.isShowLevelUpInfo = function () {
            var $tipstr = "";
            if (this.isNeeShareLevelUp) {
                $tipstr = Pan3d.ColorType.Redff0000 + "只需要分享成功就可以进行下一关";
                this.b_but_txt_frame.goToAndStop(1);
            }
            else {
                this.b_but_txt_frame.goToAndStop(0);
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_friend_tips.skinName, $tipstr, 18, Pan3d.TextAlign.CENTER);
        };
        Object.defineProperty(FristLevelUpPanel.prototype, "isNeeShareLevelUp", {
            get: function () {
                var $arr = GameData.severinfo.needshareToNextLevelArr;
                if (GameData.severinfo.wxcloudModel == 2 && AllShareMeshVo.shareSkipId < $arr[$arr.length - 1]) {
                    for (var i = 0; i < $arr.length - 1; i++) {
                        if ($arr[i] == GameDataModel.levelNum) {
                            return true;
                        }
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        FristLevelUpPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -30, 400, 260);
            this.b_next_but = this.addEvntButUp("b_next_but", this._topRender);
            this.addChild(this._topRender.getComponent("b_big_icon"));
            this.addChild(this._topRender.getComponent("b_tittle_txt"));
            this.b_info_top_txt = this.addChild(this._topRender.getComponent("b_info_top_txt"));
            this.b_context_txt = this.addChild(this._topRender.getComponent("b_context_txt"));
            this.b_but_txt_frame = this.addChild(this._topRender.getComponent("b_but_txt_frame"));
            this.b_friend_tips = this.addChild(this._topRender.getComponent("b_friend_tips"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        return FristLevelUpPanel;
    }(basewin.BaseWinPanel));
    leveluppan.FristLevelUpPanel = FristLevelUpPanel;
})(leveluppan || (leveluppan = {}));
//# sourceMappingURL=FristLevelUpPanel.js.map