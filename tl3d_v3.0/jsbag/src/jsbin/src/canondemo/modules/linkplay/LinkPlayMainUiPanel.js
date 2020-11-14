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
var linkplay;
(function (linkplay) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var TimeUtil = Pan3d.TimeUtil;
    var Vector2D = Pan3d.Vector2D;
    var GameDataModel = game.GameDataModel;
    var LinkPlayMainUiPanel = /** @class */ (function (_super) {
        __extends(LinkPlayMainUiPanel, _super);
        function LinkPlayMainUiPanel() {
            var _this = _super.call(this) || this;
            _this.showPlayTime = true;
            _this.interfaceUI = true;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/linkplay/linkplaymain/linkplaymain.txt", "panelui/linkplay/linkplaymain/linkplaymain.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LinkPlayMainUiPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.a_exit_but = this.addEvntBut("a_exit_but", this._topRender);
            this.a_play_time_txt = this.addEvntBut("a_play_time_txt", this._topRender);
            this.a_add_tm = this.addEvntBut("a_add_tm", this._topRender);
            this.a_sub_tm = this.addEvntBut("a_sub_tm", this._topRender);
            this.a_count_down_txt = this.addChild(this._topRender.getComponent("a_count_down_txt"));
            this.a_reconnect_txt = this._topRender.getComponent("a_reconnect_txt");
            this.a_talk_but = this.addChild(this._topRender.getComponent("a_talk_but"));
            this.a_talk_but.addEventListener(InteractiveEvent.Down, this.TALK_DOWN_CLIK, this);
            this.a_talk_tip_txt = this._topRender.getComponent("a_talk_tip_txt");
            this.uiLoadComplte = true;
            this.showPanel();
            TimeUtil.addFrameTick(function () { _this.upFrame(); });
        };
        LinkPlayMainUiPanel.prototype.TALK_DOWN_CLIK = function (evt) {
            var _this = this;
            this.mouseDownPos = new Vector2D(evt.x, evt.y);
            this.lastButPos = new Vector2D(this.a_talk_but.x, this.a_talk_but.y);
            GameData.WX_RECORDER_START_EVENT(function (value) {
                console.log("录音开始");
                _this.startRecorderTm = TimeUtil.getTimer();
                _this.setUiListVisibleByItem([_this.a_talk_tip_txt], true);
                Scene_data.uiStage.addEventListener(InteractiveEvent.Up, _this.TALK_UP_CLIK, _this);
                Scene_data.uiStage.addEventListener(InteractiveEvent.Move, _this.TALK_MOVE_CLIK, _this);
            });
        };
        LinkPlayMainUiPanel.prototype.TALK_MOVE_CLIK = function (evt) {
            this.a_talk_but.x = this.lastButPos.x + (evt.x - this.mouseDownPos.x) / UIData.Scale;
            this.a_talk_but.y = this.lastButPos.y + (evt.y - this.mouseDownPos.y) / UIData.Scale;
            this.a_talk_tip_txt.y = this.a_talk_but.y - 50;
            this.a_talk_tip_txt.x = this.a_talk_but.x - 20;
        };
        LinkPlayMainUiPanel.prototype.TALK_UP_CLIK = function (evt) {
            if ((TimeUtil.getTimer() - this.startRecorderTm) > 1000) {
                GameData.WX_RECORDER_END_EVENT(function (data) {
                    console.log("录音结束", data);
                    if (data.success) {
                        console.log("发送到其它用户", data.filename);
                        var $soundUrl = "https://api.h5key.com/static/voice/" + data.filename;
                        if (GameData.devicetypepc) {
                            $soundUrl = "https://commcdn.chiji-h5.com/wdqq/v6/sound/pass.mp3";
                        }
                        MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 5, data: $soundUrl }));
                    }
                });
            }
            else {
                console.log("小于1秒不发送");
                GameData.WX_RECORDER_END_EVENT(null);
            }
            this.setUiListVisibleByItem([this.a_talk_tip_txt], false);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.TALK_UP_CLIK, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.TALK_MOVE_CLIK, this);
        };
        LinkPlayMainUiPanel.prototype.showReconnectTxt = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                this.setUiListVisibleByItem([this.a_reconnect_txt], true);
                TimeUtil.addTimeOut(1000, function () {
                    _this.setUiListVisibleByItem([_this.a_reconnect_txt], false);
                });
            }
        };
        LinkPlayMainUiPanel.prototype.upFrame = function () {
            var tm = TimeUtil.getTimer() - GameDataModel.levelStartTm;
            if (this.showPlayTime) {
                var keyStr = " ";
                keyStr += "tm" + tm;
                keyStr += "\n" + Math.floor(tm / 10);
                keyStr += "\n" + Math.floor(tm / 100);
                keyStr += "\n" + Math.floor(tm / 1000);
                //   LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_play_time_txt.skinName, keyStr, 16, TextAlign.LEFT);
            }
            if (tm < 2 * 1000) {
                var stm = 2 - Math.floor(tm / 1000);
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_count_down_txt.skinName, String(stm), "NUM41", TextAlign.CENTER);
                this.a_count_down_txt.x = this.a_count_down_txt.baseRec.x;
            }
            else {
                this.a_count_down_txt.x = this.a_count_down_txt.baseRec.x + 10000;
            }
        };
        LinkPlayMainUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_exit_but:
                    msgalert.AlertUtil.show("是否确定退出", "提示", function (value) {
                        MsEngine.linkplayGamestatus = -1; //退出后将不再重连接
                        if (value == 1) {
                            if (MsEngine.getInstance().BrokenLine) {
                                ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL));
                                Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                            }
                            else {
                                MsEngine.getInstance().leaveRoom(function () {
                                    ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL));
                                    Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                                });
                            }
                        }
                    }, 2);
                    break;
                case this.a_talk_but:
                    break;
                case this.a_add_tm:
                    this.showPlayTime = !this.showPlayTime;
                    break;
                case this.a_sub_tm:
                    GameDataModel.levelStartTm -= 1000;
                    break;
                default:
                    break;
            }
        };
        LinkPlayMainUiPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        LinkPlayMainUiPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
            }
        };
        return LinkPlayMainUiPanel;
    }(H5UIConatiner));
    linkplay.LinkPlayMainUiPanel = LinkPlayMainUiPanel;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayMainUiPanel.js.map