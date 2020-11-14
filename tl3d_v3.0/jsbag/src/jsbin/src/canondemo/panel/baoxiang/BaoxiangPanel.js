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
var baoxiang;
(function (baoxiang) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var BaoxiangPanel = /** @class */ (function (_super) {
        __extends(BaoxiangPanel, _super);
        function BaoxiangPanel() {
            var _this = _super.call(this) || this;
            _this.tobeLookVideo = false;
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
            _this.h5UIAtlas.setInfo("panelui/baoxiang/baoxiang.txt", "panelui/baoxiang/baoxiang.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        BaoxiangPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(this._topRender.getComponent("a_big_pic"));
            this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.addChild(this._topRender.getComponent("a_info_txt"));
            this.a_get_num_label = this._topRender.getComponent("a_get_num_label");
            //this.a_share_but = this.addEvntBut("a_share_but", this._topRender);
            //this.a_look_video = this.addEvntBut("a_look_video", this._topRender);
            this.a_big_but = this.addEvntBut("a_big_but", this._topRender);
            this.a_small = this.addEvntBut("a_small", this._topRender);
            this.a_close = this.addEvntBut("a_close", this._topRender);
            this.a_win_close_but = this.addEvntBut("a_win_close_but", this._topRender);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        BaoxiangPanel.prototype.resetBaoxiang = function () {
            var $str = GameData.getStorageSync("hasBaoxiang");
            var $arr;
            if ($str) {
                $arr = JSON.parse($str);
                for (var i = 0; i < $arr.length; i++) {
                    if ($arr[i].name == this.selectVo.name) {
                        $arr.splice(i, 1);
                    }
                }
                GameData.setStorageSync("hasBaoxiang", JSON.stringify($arr));
            }
        };
        BaoxiangPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_close:
                case this.a_win_close_but:
                    this.hidePanel();
                    this.resetBaoxiang();
                    break;
                case this.a_big_but:
                    if (this.tobeLookVideo) {
                        this.toLookAdAndPlay();
                    }
                    else {
                        this.shareBut_Clik();
                    }
                    break;
                case this.a_small:
                    if (this.tobeLookVideo) {
                        this.shareBut_Clik();
                    }
                    else {
                        this.toLookAdAndPlay();
                    }
                    break;
                default:
                    break;
            }
            this.changeButSelect();
        };
        BaoxiangPanel.prototype.shareBut_Clik = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    _this.openBaoxianLog(1);
                    GameData.hasdiamondsHavenum += _this.selectVo.num;
                    msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + _this.selectVo.num);
                    _this.hidePanel();
                }
            }, AllShareMeshVo.type11));
        };
        BaoxiangPanel.prototype.openBaoxianLog = function (value) {
            var $postAddShare = "";
            $postAddShare += "openid=" + GameData.getStorageSync("openid");
            $postAddShare += "&chest_id=" + this.selectVo.name;
            $postAddShare += "&chest_type=" + value;
            GameData.WEB_SEVER_EVENT_AND_BACK("add_chest_log", $postAddShare);
        };
        BaoxiangPanel.prototype.toLookAdAndPlay = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                if (value == 2) {
                    var $tipStr = "需要看完视屏才能领取宝箱";
                    if (GameData.severinfo.adshareModel == 0) {
                        $tipStr = "需要看完视屏才能领取双倍宝箱";
                    }
                    msgalert.AlertUtil.show($tipStr, "提示", function (value) {
                    }, 2);
                }
                if (value == 1) {
                    _this.openBaoxianLog(2);
                    var $addNum = _this.selectVo.num;
                    if (GameData.severinfo.adshareModel == 0) {
                        $addNum += _this.selectVo.num;
                    }
                    msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + $addNum);
                    GameData.hasdiamondsHavenum += $addNum;
                    _this.hidePanel();
                }
                if (value == 0) {
                    //视频看完了，就只能分享；
                    _this.shareBut_Clik();
                }
            });
        };
        BaoxiangPanel.prototype.refrishData = function (value) {
            this.selectVo = value;
            if (this.selectVo && this.uiLoadComplte) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_get_num_label.skinName, Pan3d.ColorType.Redff0000 + this.selectVo.num, 26, Pan3d.TextAlign.CENTER);
            }
        };
        BaoxiangPanel.prototype.changeButSelect = function () {
            if (GameData.severinfo.adshareModel == 1) {
                this.tobeLookVideo = true;
            }
            else {
                this.tobeLookVideo = false;
            }
            if (GameData.severinfo.adshareModel != 0) {
                this.setUiListVisibleByItem([this.a_small], false);
                this.a_close.y = this.a_close.baseRec.y - 40;
            }
            else {
                if (!this.tobeLookVideo && !GameData.isCanUseLookVideoBut) {
                    this.setUiListVisibleByItem([this.a_small], false);
                    this.a_close.y = this.a_close.baseRec.y - 40;
                }
            }
            if (GameData.SystemInfo) {
                var th = GameData.SystemInfo.windowHeight;
                this.a_close.bottom = th * UIData.Scale * 0.23;
            }
            this.a_big_but.selected = this.tobeLookVideo;
            this.a_small.selected = this.tobeLookVideo;
        };
        BaoxiangPanel.prototype.showPanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.refrishData(this.selectVo);
                this.changeButSelect();
                this.setUiListVisibleByItem([this.a_win_close_but, this.a_close], false);
                Pan3d.TimeUtil.addTimeOut(1000, function () {
                    _this.setUiListVisibleByItem([_this.a_close], true);
                });
                Pan3d.TimeUtil.addTimeOut(3000, function () {
                    _this.setUiListVisibleByItem([_this.a_win_close_but], true);
                });
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        BaoxiangPanel.prototype.hidePanel = function () {
            var _this = this;
            this.setUiListVisibleByItem([this.a_win_close_but, this.a_close], false);
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        return BaoxiangPanel;
    }(H5UIConatiner));
    baoxiang.BaoxiangPanel = BaoxiangPanel;
})(baoxiang || (baoxiang = {}));
//# sourceMappingURL=BaoxiangPanel.js.map