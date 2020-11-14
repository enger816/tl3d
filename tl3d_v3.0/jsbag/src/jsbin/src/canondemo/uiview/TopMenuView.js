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
var uiview;
(function (uiview) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameDataModel = game.GameDataModel;
    var TopTiittlePanel = topui.TopTiittlePanel;
    var HandMoveUiA = /** @class */ (function () {
        function HandMoveUiA($uiConatiner) {
            var _this = this;
            this._visible = false;
            this.tureDownleft = true;
            this.perent = $uiConatiner;
            this.frmeFun = function () { _this.upFram(); };
        }
        Object.defineProperty(HandMoveUiA.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                if (this._visible != value) {
                    if (value) {
                        this.perent.addChild(this.ui);
                        TimeUtil.addFrameTick(this.frmeFun);
                    }
                    else {
                        this.perent.removeChild(this.ui);
                        TimeUtil.removeFrameTick(this.frmeFun);
                    }
                }
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });
        HandMoveUiA.prototype.upFram = function () {
            var $tm = TimeUtil.getTimer();
            var $n = Math.sin($tm / 500) * 100;
            if (this.tureDownleft) {
                this.ui.x = this.ui.baseRec.x + $n;
                this.ui.y = this.ui.baseRec.y;
            }
            else {
                this.ui.x = this.ui.baseRec.x;
                this.ui.y = this.ui.baseRec.y + $n;
            }
        };
        return HandMoveUiA;
    }());
    uiview.HandMoveUiA = HandMoveUiA;
    var TopMenuView = /** @class */ (function (_super) {
        __extends(TopMenuView, _super);
        function TopMenuView() {
            var _this = _super.call(this) || this;
            _this.lastShowEndlEssPandaTm = 0;
            //private a_endLess_enter_but: UICompenent
            _this.lastShowShareTm = 10 * 1000;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.top = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.timeFun = function () { _this.upTimeFrame(); };
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TopMenuView.prototype.loadConfigCom = function () {
            var _this = this;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._topTiittlePanel = new TopTiittlePanel();
            this._topTiittlePanel.setRender(this._midRender, this._midRender, this._topRender);
            this.rightPandaView = new tips.RightPandaView(this, this._topRender);
            this.centreInofTxtView = new tips.CentreInofTxtView(this, this._topRender);
            this.rightPandaView.a_panda_tip_msg_txt = this.addChild(this._midRender.getComponent("a_panda_tip_msg_txt"));
            this.tip_bg = this.addEvntBut("tip_bg", this._topRender);
            this.a_temp_but = this.addEvntButUp("a_temp_but", this._topRender);
            this.a_temp_but.right = 30;
            this.a_temp_but.bottom = 30;
            var fovw = Pan3d.Scene_data.stageWidth;
            var fovh = Pan3d.Scene_data.stageHeight;
            this._handMoveUi = new HandMoveUiA(this);
            this._handMoveUi.ui = this._topRender.getComponent("a_hand_pic0");
            this.lastShowEndlEssPandaTm = TimeUtil.getTimer();
            this.tip_bg.width = this.width * 2;
            this.tip_bg.height = this.height * 2;
            this.tip_bg.top = 0;
            this.tip_bg.left = -10000;
            this.uiLoadComplte = true;
            this.addTimeFrame();
            //  GameData.setStorageSync("fristShowEndLell", false);
            this.refrishUi();
            TimeUtil.addTimeTick(30 * 1000, function () {
                _this.testHasNeedHelpList();
                TimeUtil.addTimeOut(3000, function () {
                    _this.textcheck_advertise_reward();
                });
                TimeUtil.addTimeOut(6000, function () {
                    _this.tipShareTipBut();
                });
                _this.textShowEndLessPanda();
                GameData.getAdvertiseList();
            });
        };
        TopMenuView.prototype.textShowEndLessPanda = function () {
            if (this.lastShowEndlEssPandaTm < TimeUtil.getTimer()) {
                if (GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) >= 15 && GameData.severinfo.endless) {
                    this.lastShowEndlEssPandaTm = TimeUtil.getTimer() + 1 * 60 * 1000;
                    TimeUtil.addTimeOut(9000, function () {
                        if (GameData.gameType == 1) {
                            var obj = new tips.PandaMeshData();
                            obj.url = Scene_data.fileRoot + "ui/panda/11.png";
                            obj.type = tips.PandaMeshData.type1;
                            obj.key = tips.PandaMeshData.key11;
                            obj.data = new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START);
                            var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                            $topUiViewEvent.data = obj;
                            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                        }
                    });
                }
            }
        };
        TopMenuView.prototype.tipShareTipBut = function () {
            if (Pan3d.TimeUtil.getTimer() > this.lastShowShareTm) {
                var obj = new tips.PandaMeshData();
                obj.url = Scene_data.fileRoot + "ui/panda/4.png";
                obj.type = tips.PandaMeshData.type1;
                obj.key = tips.PandaMeshData.key4; //分享
                obj.data = new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL);
                var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                $topUiViewEvent.data = obj;
                Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                this.lastShowShareTm = Pan3d.TimeUtil.getTimer() + 3 * 60 * 1000;
            }
        };
        TopMenuView.prototype.textcheck_advertise_reward = function () {
            GameData.WEB_SEVER_EVENT_AND_BACK("check_advertise_reward", "openid=" + GameData.getStorageSync("openid"), function (res) {
                if (res && res.data && res.data.reward > 0) {
                    console.log("有奖励", res.data.reward);
                    var obj = new tips.PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/9.png";
                    obj.type = tips.PandaMeshData.type1;
                    obj.key = tips.PandaMeshData.key9;
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                }
            });
        };
        TopMenuView.prototype.testHasNeedHelpList = function () {
            if (GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) > 2) {
                if (this._topRender.uiAtlas) {
                    var $postStr = "";
                    $postStr += "level=" + GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
                    $postStr += "&openid=" + GameData.getStorageSync("openid");
                    GameData.WEB_SEVER_EVENT_AND_BACK("find_random_help_list", $postStr, function (res) {
                        if (res && res.data && res.data.list && res.data.list.length) {
                            var obj = new tips.PandaMeshData();
                            obj.url = Scene_data.fileRoot + "ui/panda/1.png";
                            obj.type = tips.PandaMeshData.type1;
                            obj.key = tips.PandaMeshData.key1;
                            obj.data = new help.HelpViewEvent(help.HelpViewEvent.SHOW_HELP_CALL_PANEL);
                            var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                            $topUiViewEvent.data = obj;
                            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                        }
                    });
                }
            }
        };
        TopMenuView.prototype.showPandaInfo = function (value) {
            if (this.uiLoadComplte) {
                if (value.type == tips.PandaMeshData.type1) {
                    this.rightPandaView.pushPandaInfo(value);
                }
                else if (value.type == tips.PandaMeshData.type2) {
                    this.centreInofTxtView.pushTextInfo(value);
                    console.log("显示提示");
                }
            }
        };
        TopMenuView.prototype.clearPandaInfo = function (value) {
            if (this.uiLoadComplte) {
                if (value.type == tips.PandaMeshData.type1) {
                    this.rightPandaView.clearPandaInfo(value);
                }
                else if (value.type == tips.PandaMeshData.type2) {
                    this.centreInofTxtView.clearTextInfo(value);
                }
            }
        };
        TopMenuView.prototype.addTimeFrame = function () {
            Pan3d.TimeUtil.addTimeTick(1000 * 5, this.timeFun);
        };
        TopMenuView.prototype.removeTimeFrame = function () {
            Pan3d.TimeUtil.removeTimeTick(this.timeFun);
        };
        TopMenuView.prototype.upTimeFrame = function () {
            var _this = this;
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            GameData.WEB_SEVER_EVENT_AND_BACK("get_help_info", $postStr, function (res) {
                var nextFunction = false;
                if (res && res.data && res.data.info) {
                    var info = res.data.info;
                    if (info.state == 2) {
                        nextFunction = false;
                        var helpViewEvent = new help.HelpViewEvent(help.HelpViewEvent.SHOW_HELP_SPEED_PANEL);
                        helpViewEvent.data = info;
                        var obj = new tips.PandaMeshData();
                        obj.url = getWxAvatar64UrlByUrl(String(info.helper_info).split("|")[1]);
                        obj.type = tips.PandaMeshData.type1;
                        obj.key = tips.PandaMeshData.key2;
                        obj.data = helpViewEvent;
                        var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                        $topUiViewEvent.data = obj;
                        Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                    }
                    else {
                        nextFunction = true;
                    }
                }
                else {
                    nextFunction = false;
                }
                if (nextFunction) {
                    tips.PandaMeshData.showCentenTxtInfoType(tips.PandaMeshData.key101, "正在请求帮助中.......");
                }
                if (!nextFunction) {
                    _this.removeTimeFrame();
                }
            });
        };
        TopMenuView.prototype.showWaitHelpUserIconPic = function () {
            this.addTimeFrame();
        };
        TopMenuView.prototype.refrishTopTittleUi = function () {
            if (this.uiLoadComplte) {
                this._topTiittlePanel.refrishUi();
            }
        };
        TopMenuView.prototype.refrishUi = function () {
            if (this.uiLoadComplte) {
                if (GameDataModel.levelNum <= 2) {
                    this._handMoveUi.visible = true;
                    this._handMoveUi.tureDownleft = (GameDataModel.levelNum == 1);
                }
                else {
                    this._handMoveUi.visible = false;
                }
                this.refrishTopTittleUi();
                this.refrishDiamondNum();
                //第一次进入并从没玩过无尽模式
            }
        };
        TopMenuView.prototype.refrishDiamondNum = function () {
            if (this.uiLoadComplte) {
                this._topTiittlePanel.refrishDiamondNum();
            }
        };
        TopMenuView.prototype.butClik = function (evt) {
            if (GameData.isPlayVideo) {
                console.log("读取录像现在不操作");
                return;
            }
            switch (evt.target) {
                case this.a_temp_but:
                    ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_SELECT_MENU_PANEL));
                    break;
                default:
                    break;
            }
        };
        return TopMenuView;
    }(H5UIConatiner));
    uiview.TopMenuView = TopMenuView;
})(uiview || (uiview = {}));
//# sourceMappingURL=TopMenuView.js.map