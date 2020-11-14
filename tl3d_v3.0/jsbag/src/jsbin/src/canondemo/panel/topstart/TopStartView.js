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
var topstart;
(function (topstart) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var TimeUtil = Pan3d.TimeUtil;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var PandaMeshData = rightpanda.PandaMeshData;
    var GameDataModel = game.GameDataModel;
    var TopStartView = /** @class */ (function (_super) {
        __extends(TopStartView, _super);
        function TopStartView() {
            var _this = _super.call(this) || this;
            _this.isFrist = true;
            _this.startPanelScale = 1;
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
            _this.lastUserInfo = GameData.getStorageSync("userInfo");
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/topstart/topstart.txt", "panelui/topstart/topstart.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TopStartView.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.win_tip_bg:
                    break;
                case this.c_game_star_bg:
                    var $intervalTm = GameData.intervalLoginTm > GameData.severinfo.starPlayVideo.mintm && GameData.intervalLoginTm < GameData.severinfo.starPlayVideo.maxtm; //间隔时间内，不是审核模式，第一次点击才会播放视屏
                    if (GameData.severinfo.wxcloudModel != 1 && $intervalTm && !this.isStartPlayVideo) {
                        this.isStartPlayVideo = true;
                        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                            _this.clikStartBut();
                            _this.saveStartVideoValueToWeb(value);
                        });
                    }
                    else {
                        this.clikStartBut();
                    }
                    break;
                case this.c_skin_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.SHOW_SKIN_LIST_PANEL));
                    ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.HIDE_FEED_BACK_BUTTON));
                    break;
                case this.c_level_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.HIDE_FEED_BACK_BUTTON));
                    break;
                case this.c_system_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new setupui.SetupWinEvent(setupui.SetupWinEvent.SHOW_SETUP_WIN_PANEL));
                    ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.HIDE_FEED_BACK_BUTTON));
                    break;
                case this.c_rank_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL));
                    ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.HIDE_FEED_BACK_BUTTON));
                    break;
                case this.c_ad_cell_0:
                case this.c_ad_cell_1:
                case this.c_ad_cell_2:
                    GameData.dispatchEvent(new platform.PlatFormEvent(platform.PlatFormEvent.CLIK_PLAT_OTHER_GAME), evt.target.data);
                    break;
                case this.c_concern_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new concern.ConcernEvent(concern.ConcernEvent.SHOW_CONCERN_PANEL));
                    break;
                default:
                    break;
            }
        };
        TopStartView.prototype.saveStartVideoValueToWeb = function (value) {
            var $postAddShare = "";
            $postAddShare += "openid=" + GameData.getStorageSync("openid");
            $postAddShare += "&chest_id=" + "startvideo";
            $postAddShare += "&chest_type=" + value;
            GameData.WEB_SEVER_EVENT_AND_BACK("add_chest_log", $postAddShare);
        };
        TopStartView.prototype.loadPanelH5UiXml = function () {
            new basewin.BaseWinPanel();
            var $arr = new Array;
            $arr.push("panelui/basewin/basewin");
            $arr.push("panelui/levelup/levelup");
            $arr.push("panelui/resetplay/resetplay");
            $arr.push("panelui/skin/skin");
            $arr.push("panelui/alert/alert");
            $arr.push("panelui/help/help");
            $arr.push("panelui/invitation/invitation");
            $arr.push("panelui/task/task");
            for (var i = 0; i < $arr.length; i++) {
                var $name = $arr[i];
                var $h5UIAtlas = new H5UIAtlas;
                $h5UIAtlas.setInfo($name + ".txt", $name + ".png", function () { });
            }
        };
        TopStartView.prototype.getSelfInfo = function () {
            var _this = this;
            GameData.GET_USER_INFO_LIST([GameData.getStorageSync("openid")], function ($listArr) {
                if ($listArr && $listArr.length) {
                    if (String($listArr[0].name).length < 1) {
                        GameData.changeWebUserInfo("name", "无名");
                    }
                    else {
                        if (GameData.userInfo) {
                            if (GameData.userInfo.nickName != $listArr[0].name) {
                                console.log("服务器信息和自己名字不一样");
                                GameData.changeWebUserInfo("name", GameData.userInfo.nickName);
                            }
                        }
                    }
                    GameData.webuserInfo = $listArr;
                }
                else {
                    console.log("没有我的用户信息");
                    _this.user_create();
                }
            });
        };
        //user_create (openid,avatar,name,area,gender,enter_type)
        TopStartView.prototype.user_create = function () {
            var _this = this;
            //GameData.userInfo.avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq3WqyPdicRC94cdib7xaor446tP803NprpvsP80mwqKT4OwovKicicaEf0Y1vWxYTxs3KOErGamXE37g/132"
            //GameData.userInfo.city = "Xiamen";
            //GameData.userInfo.country = "China";
            //GameData.userInfo.gender = 1;
            //GameData.userInfo.language = "zh_CN";
            //GameData.userInfo.nickName = "美丽人生";
            //GameData.userInfo.province = "Fujian";
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            if (GameData.userInfo) {
                $postStr += "&avatar=" + GameData.userInfo.avatarUrl;
                $postStr += "&area=" + GameData.userInfo.province;
                $postStr += "&gender=" + (GameData.userInfo.gender == 1 ? "男" : "女");
                $postStr += "&name=" + GameData.userInfo.nickName;
                var $enter_type = this.getInputQuest(GameData.onLaunchRes);
                if ($enter_type.length <= 0) {
                    if (GameData.onshowRes && GameData.onshowRes.referrerInfo) {
                        if (GameData.onshowRes.referrerInfo.appId) {
                            $enter_type = "&enter_type=" + GameData.onshowRes.referrerInfo.appId;
                        }
                        else {
                            $enter_type = "&enter_type=" + GameData.onshowRes.scene;
                        }
                    }
                }
                if ($enter_type.length <= 0) {
                    $enter_type = this.getInputQuest(GameData.onshowRes);
                    if ($enter_type.length <= 0 && GameData.onshowRes) {
                        $enter_type = "&enter_type=" + "不确定_" + GameData.onshowRes.scene;
                    }
                }
                $postStr += $enter_type;
            }
            else {
                $postStr += "&name=" + "没有授权";
            }
            GameData.WEB_SEVER_EVENT_AND_BACK("user_create", $postStr, function (res) {
                GameData.setStorageSync("user_create", true);
                console.log("第一次登入，注册用户信息");
                if (res && res.data && res.data.success) {
                    _this.getSelfInfo();
                    _this.makeWxOpenId();
                }
            });
        };
        TopStartView.prototype.getInputQuest = function (value) {
            //获取邀请进入的
            var $enter_type = "";
            if (value) {
                var query = value.query;
                if (query && query.type) {
                    switch (query.type) {
                        case "only_share":
                            if (GameData.getStorageSync("openid") != query.openid) {
                                $enter_type = "&enter_type=" + query.openid;
                            }
                            break;
                        default:
                            console.log("对应类型还没处理好");
                            break;
                    }
                }
            }
            return $enter_type;
        };
        TopStartView.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addEvntButUp("c_tip_bg", this._bottomRender);
            this.addChild(this._midRender.getComponent("c_game_name"));
            this.addChild(this._midRender.getComponent("c_self_level_label"));
            this.c_level_txt = this.addChild(this._topRender.getComponent("c_level_txt"));
            this.addChild(this._midRender.getComponent("c_ad_bg"));
            this.addChild(this._topRender.getComponent("c_link_game"));
            this.c_ad_cell_0 = this.addEvntButUp("c_ad_cell_0", this._topRender);
            this.c_ad_cell_1 = this.addEvntButUp("c_ad_cell_1", this._topRender);
            this.c_ad_cell_2 = this.addEvntButUp("c_ad_cell_2", this._topRender);
            this.c_concern_but = this.addEvntButUp("c_concern_but", this._topRender);
            this.c_concern_but.right = 0;
            // this.c_concern_but.middle = 0
            this.c_level_but = this.addEvntButUp("c_level_but", this._topRender);
            this.c_rank_but = this.addEvntButUp("c_rank_but", this._topRender);
            this.c_skin_but = this.addEvntButUp("c_skin_but", this._topRender);
            this.c_system_but = this.addEvntButUp("c_system_but", this._topRender);
            this.c_engine_info_txt = this.addChild(this._topRender.getComponent("c_engine_info_txt"));
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_engine_info_txt.skinName, "Powered by LayaAir Engine", 14, TextAlign.CENTER, Pan3d.ColorType.Whiteffffff);
            this.c_game_star_bg = this.addEvntButUp("c_game_star_but", this._midRender);
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_CREATE_USER_INFO_BUTTON), function (res) {
                if (res) {
                    _this.clikStartBut();
                }
            });
            this.uiLoadComplte = true;
            this.startPanelScale = UIData.Scale;
            this.showPanel();
        };
        TopStartView.prototype.makeWxOpenId = function () {
            var $wxopenid = GameData.getStorageSync("wxopenid");
            if ($wxopenid && $wxopenid.length > 5) {
                var $postStr = "";
                $postStr += "wxid=" + $wxopenid;
                GameData.WEB_SEVER_EVENT_AND_BACK("find_user_by_wxid", $postStr, function (res) {
                    if (res && res.data) {
                        if (res.data.success) {
                            console.log("找到了我的openid", res.data.user);
                        }
                        else {
                            console.log("设置我的微信OpenID", $wxopenid);
                            GameData.changeWebUserInfo("wxid", $wxopenid);
                        }
                    }
                });
            }
        };
        TopStartView.prototype.clikStartBut = function () {
            var _this = this;
            this.hidePanel();
            if (this.isFrist) {
                GameData.getAdvertiseList();
                GameData.setStorageSync("loginnum", GameData.getStorageSyncNumber("loginnum") + 1);
                this.makeWxOpenId();
                this.isFrist = false; //每次打开只执行一次
                if (this.lastUserInfo && Boolean(GameData.getStorageSync("user_create"))) {
                    var $postStr = "";
                    $postStr += "openid=" + GameData.getStorageSync("openid");
                    GameData.WEB_SEVER_EVENT_AND_BACK("user_login", $postStr, function (res) {
                        console.log("user_login", res);
                    });
                    this.getSelfInfo();
                }
                else {
                    this.user_create();
                }
                TimeUtil.addTimeOut(1000 * 60, function () {
                    _this.loadPanelH5UiXml();
                });
                ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.CHECK_SELF_HELP_INFO));
                TimeUtil.addTimeOut(2000, function () {
                    PandaMeshData.showRightPanda(PandaMeshData.key4, Scene_data.fileRoot + "ui/panda/4.png", new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                    PandaMeshData.showRightPanda(PandaMeshData.key14, Scene_data.fileRoot + "ui/panda/14.png", new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                    PandaMeshData.showRightPanda(PandaMeshData.key7, Scene_data.fileRoot + "ui/panda/7.png", new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL));
                    if (game.CannonGameStart.iSresetLevel) {
                        //重置关卡的情况下，有选关卡图标
                        game.CannonGameStart.iSresetLevel = false;
                        PandaMeshData.showRightPanda(PandaMeshData.key16, Scene_data.fileRoot + "ui/panda/16.png", new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    }
                });
            }
        };
        TopStartView.prototype.showPanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                if (!GameDataModel.levelNum) {
                    GameDataModel.levelNum = 1;
                }
                this.setUiListVisibleByItem([this.c_concern_but], false);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_level_txt.skinName, Pan3d.ColorType.Whiteffffff + String(GameDataModel.levelNum), 24, TextAlign.CENTER);
                this.TweenLiteScale(this.startPanelScale, UIData.Scale, 0.5, function () {
                    _this.setUiListVisibleByItem([_this.c_concern_but], !GameData.getStorageSync("useConcernd"));
                });
                this.showAdList();
                Pan3d.ModuleEventManager.dispatchEvent(new megame.MeGameEvent(megame.MeGameEvent.SHOW_ME_GAME_PANEL));
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        TopStartView.prototype.showAdList = function () {
            var _this = this;
            var $url = "https://jsonconfig.chiji-h5.com/json/wdqq/adlist.json";
            if (GameData.devicetypepc) {
                $url = "res/adlist.json";
            }
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE, function ($liststr) {
                var $objItem = JSON.parse($liststr);
                for (var i = 0; i < $objItem.length && i < 3; i++) {
                    var $ui = _this["c_ad_cell_" + i];
                    $ui.data = $objItem[i];
                    _this.drawTempUre($ui);
                }
            });
        };
        TopStartView.prototype.drawTempUre = function ($ui) {
            var _this = this;
            var $data = $ui.data;
            GameData.loadImgByPicUrl($data.skin, function ($img) {
                var rec = _this._topRender.uiAtlas.getRec($ui.skinName);
                _this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                _this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelWitdh);
                LabelTextFont.writeSingleLabelToCtx(_this._topRender.uiAtlas.ctx, Pan3d.ColorType.Whiteffffff + $data.name, 14, 0, rec.pixelWitdh + 5, Pan3d.TextAlign.CENTER);
                TextureManager.getInstance().updateTexture(_this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, _this._topRender.uiAtlas.ctx);
            });
        };
        TopStartView.prototype.hidePanel = function () {
            var _this = this;
            if (this.hasStage) {
                ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.HIDE_FEED_BACK_BUTTON));
                this.setUiListVisibleByItem([this.c_concern_but], false);
                this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                    _this.startPanelScale = 0.3;
                    UIManager.getInstance().removeUIContainer(_this);
                    ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                });
            }
            Pan3d.ModuleEventManager.dispatchEvent(new megame.MeGameEvent(megame.MeGameEvent.HIDE_ME_GAME_PANEL));
        };
        return TopStartView;
    }(H5UIConatiner));
    topstart.TopStartView = TopStartView;
})(topstart || (topstart = {}));
//# sourceMappingURL=TopStartView.js.map