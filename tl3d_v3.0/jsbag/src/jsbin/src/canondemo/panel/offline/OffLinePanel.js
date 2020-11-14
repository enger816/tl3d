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
var offline;
(function (offline) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var OffLineMessVo = /** @class */ (function () {
        function OffLineMessVo(value) {
            for (var key in value) {
                this[key] = value[key];
            }
        }
        return OffLineMessVo;
    }());
    offline.OffLineMessVo = OffLineMessVo;
    var OffLinePanel = /** @class */ (function (_super) {
        __extends(OffLinePanel, _super);
        function OffLinePanel() {
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
            _this.h5UIAtlas.setInfo("panelui/offline/offline.txt", "panelui/offline/offline.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        OffLinePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(this._midRender.getComponent("a_pic_bg"));
            this.a_num_label = this.addChild(this._topRender.getComponent("a_num_label"));
            this.a_share_but_get = this.addEvntBut("a_share_but_get", this._topRender);
            this.a_get_but = this.addEvntBut("a_get_but", this._topRender);
            this.a_win_close = this.addEvntBut("a_win_close", this._topRender);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        OffLinePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_share_but_get:
                    this.shareBut_Clik();
                    break;
                case this.a_get_but:
                    GameData.hasdiamondsHavenum += this.chanGetNum;
                    msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + this.chanGetNum);
                    this.hidePanel();
                    break;
                case this.a_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        OffLinePanel.prototype.shareBut_Clik = function () {
            var _this = this;
            if (GameData.isCanUseLookVideoBut) {
                GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                    if (value == 2) {
                        var $tipStr = "需要看完视屏\n才能领取双倍奖励";
                        msgalert.AlertUtil.show($tipStr, "提示", function (value) {
                        }, 2);
                    }
                    if (value == 1) {
                        GameData.hasdiamondsHavenum += _this.chanGetNum * 2;
                        msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + _this.chanGetNum * 2);
                        _this.hidePanel();
                        _this.openBaoxianLog(2);
                    }
                    if (value == 0) {
                        _this.toshareEvet();
                    }
                });
            }
            else {
                this.toshareEvet();
            }
        };
        OffLinePanel.prototype.toshareEvet = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    GameData.hasdiamondsHavenum += _this.chanGetNum * 2;
                    msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + _this.chanGetNum * 2);
                    _this.hidePanel();
                    _this.openBaoxianLog(1);
                }
            }, AllShareMeshVo.type5));
        };
        OffLinePanel.prototype.openBaoxianLog = function (value) {
            var $postAddShare = "";
            $postAddShare += "openid=" + GameData.getStorageSync("openid");
            $postAddShare += "&chest_id=" + 0;
            $postAddShare += "&chest_type=" + value;
            GameData.WEB_SEVER_EVENT_AND_BACK("add_chest_log", $postAddShare);
        };
        OffLinePanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.refrishUi();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        OffLinePanel.prototype.refrishUi = function () {
            if (this.tmsecond) {
                var a = (this.tmsecond - OffLinePanel.offLineMessVo.mintm) / (OffLinePanel.offLineMessVo.maxtm - OffLinePanel.offLineMessVo.mintm);
                a = Math.max(a, 0);
                a = Math.min(a, 1);
                a = OffLinePanel.offLineMessVo.minget + a * (OffLinePanel.offLineMessVo.maxget - OffLinePanel.offLineMessVo.minget);
                a = Math.floor(a);
                this.chanGetNum = a;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_num_label.skinName, Pan3d.ColorType.Redff0000 + "+" + a + Pan3d.ColorType.Black000000 + " 钻石", 24, Pan3d.TextAlign.CENTER);
            }
        };
        OffLinePanel.prototype.hidePanel = function () {
            var _this = this;
            this.chanGetNum = 0;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        return OffLinePanel;
    }(H5UIConatiner));
    offline.OffLinePanel = OffLinePanel;
})(offline || (offline = {}));
//# sourceMappingURL=OffLinePanel.js.map