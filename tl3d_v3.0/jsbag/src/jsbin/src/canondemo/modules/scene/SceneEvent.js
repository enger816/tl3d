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
var game;
(function (game) {
    var BaseEvent = Pan3d.BaseEvent;
    var SceneEvent = /** @class */ (function (_super) {
        __extends(SceneEvent, _super);
        function SceneEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneEvent.INIT_SCENE_CONFIG = "INIT_SCENE_CONFIG";
        SceneEvent.SELECT_SCENE_LEVEL = "SELECT_SCENE_LEVEL";
        SceneEvent.GAME_LEVE_UP = "GAME_LEVE_UP";
        SceneEvent.GAME_LEVE_LOST = "GAME_LEVE_LOST";
        SceneEvent.WX_GET_FRIEND_CLOUD_STORAGE = "WX_GET_FRIEND_CLOUD_STORAGE";
        SceneEvent.DIAMONDS_SPRITE_HIT_EVENT = "DIAMONDS_SPRITE_HIT_EVENT";
        SceneEvent.ON_SHARE_APP_MESSAGE = "ON_SHARE_APP_MESSAGE";
        SceneEvent.WX_ON_SHOW = "WX_ON_SHOW";
        SceneEvent.WX_SAVE_LEVEL_START_BMP_TO_SHARE = "WX_SAVE_LEVEL_START_BMP_TO_SHARE";
        SceneEvent.WX_GAME_UPDATA_EVENT = "WX_GAME_UPDATA_EVENT";
        SceneEvent.WX_CREATE_USER_INFO_BUTTON = "WX_CREATE_USER_INFO_BUTTON";
        SceneEvent.WEB_SEVER_EVENT_AND_BACK = "WEB_SEVER_EVENT_AND_BACK";
        SceneEvent.SAVE_VIDEO_FILE_TO_WEB = "SAVE_VIDEO_FILE_TO_WEB";
        SceneEvent.WEB_SAVE_SAMPE_FILE_BACK_NAME = "WEB_SAVE_SAMPE_FILE_BACK_NAME";
        SceneEvent.SEND_TO_APPER_DATA = "SEND_TO_APPER_DATA";
        SceneEvent.SHOW_SPECIAL_EFFECT = "SHOW_SPECIAL_EFFECT";
        SceneEvent.DIAMONDS_CHANGE_EVENT = "DIAMONDS_CHANGE_EVENT";
        SceneEvent.REMOVE_USER_STORAGE_INFO = "REMOVE_USER_STORAGE_INFO";
        SceneEvent.WX_RECORDER_START_EVENT = "WX_RECORDER_START_EVENT";
        SceneEvent.WX_RECORDER_END_EVENT = "WX_RECORDER_END_EVENT";
        SceneEvent.WX_LOOK_VIDEO_VD_EVENT = "WX_LOOK_VIDEO_VD_EVENT";
        SceneEvent.WX_SHOW_TOAST_MSG = "WX_SHOW_TOAST_MSG";
        SceneEvent.MINI_GAME_NEED_UPDATA_EVENT = "MINI_GAME_NEED_UPDATA_EVENT";
        SceneEvent.Refresh_share_Canvas_to_Texture = "Refresh_share_Canvas_to_Texture";
        SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT = "ALL_SHARE_SCENE_ONLY_EVENT"; //开始统一分享机制
        SceneEvent.HIDE_FEED_BACK_BUTTON = "HIDE_FEED_BACK_BUTTON"; //开始统一分享机制
        SceneEvent.CHANGE_BOTTOM_PANEL_AD = "CHANGE_BOTTOM_PANEL_AD"; //开始统一分享机制
        return SceneEvent;
    }(BaseEvent));
    game.SceneEvent = SceneEvent;
})(game || (game = {}));
//# sourceMappingURL=SceneEvent.js.map