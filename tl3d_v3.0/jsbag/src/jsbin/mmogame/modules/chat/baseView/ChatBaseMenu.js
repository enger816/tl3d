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
var Chat;
(function (Chat) {
    var ChatBaseMenu = /** @class */ (function (_super) {
        __extends(ChatBaseMenu, _super);
        function ChatBaseMenu() {
            var _this = _super.call(this) || this;
            _this.gmId = 0;
            _this.chatHtmlText = "";
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.bottom = 0;
            _this.left = 0;
            return _this;
        }
        ChatBaseMenu.prototype.setRender = function ($bg, $mid, $top) {
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top; //没用到
            this.loadConfigCom();
        };
        ChatBaseMenu.prototype.loadConfigCom = function () {
            var _this = this;
            this.addEvntBut("w_bottom_bg", this._bottomRender);
            this.uiList = new Array();
            this.w_input_bg = this.addEvntBut("w_input_bg", this._midRender);
            this.w_horn_but = this.addEvntBut("w_horn_but", this._midRender);
            this.w_face_but = this.addEvntBut("w_face_but", this._midRender);
            this.w_send = this.addEvntBut("w_send", this._midRender);
            this.w_input_ctx = this._topRender.getComponent("w_input_ctx");
            this.uiList.push(this.w_input_bg);
            this.uiList.push(this.w_horn_but);
            this.uiList.push(this.w_face_but);
            this.uiList.push(this.w_send);
            this.uiList.push(this.w_input_ctx);
            this.w_sys_tips = this._midRender.getComponent("w_sys_tips");
            this.w_sys_tips.y = 490;
            document.addEventListener(MouseType.KeyDown, function ($evt) { _this.onKeyDown($evt); });
        };
        ChatBaseMenu.prototype.onKeyDown = function ($vt) {
            if (GameStart.GM && this.parent && this.parent.hasStage) {
                if ($vt.keyCode == KeyboardType.Up || $vt.keyCode == KeyboardType.Down) {
                    var $temp = localStorage.getItem("GMITEM");
                    if ($temp) {
                        var $gmitem = JSON.parse($temp);
                        if ($vt.keyCode == KeyboardType.Up) {
                            this.gmId++;
                        }
                        if ($vt.keyCode == KeyboardType.Down) {
                            this.gmId--;
                        }
                        this.gmId = Math.max(0, this.gmId);
                        this.gmId = Math.min(this.gmId, $gmitem.length - 1);
                        var selectstr = $gmitem[($gmitem.length - this.gmId) - 1];
                        this.setInputLabelStr(selectstr);
                    }
                }
            }
        };
        ChatBaseMenu.prototype.resize = function () {
            _super.prototype.resize.call(this);
            var $rect = new Rectangle();
            $rect.x = this.w_input_bg.x * UIData.Scale;
            $rect.y = this.y + this.w_input_bg.y * UIData.Scale;
            $rect.width = this.w_input_bg.width * UIData.Scale;
            $rect.height = this.w_input_bg.height * UIData.Scale;
        };
        ChatBaseMenu.prototype.butClik = function (evt) {
            var _this = this;
            //console.log(evt.target)
            switch (evt.target) {
                case this.w_send:
                    this.sendCharInfo();
                    break;
                case this.w_horn_but:
                    //  ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.HIDE_CHAT_EVENT));
                    // ModuleEventManager.dispatchEvent(new hornui.HornUiEvent(hornui.HornUiEvent.SHOW_HORN_UI_PANEL));
                    break;
                case this.w_face_but:
                    //var $facePanel: FacePanel = FacePanel.show(this._bottomRender.uiAtlas,null);
                    //$facePanel.bottom = Scene_data.stageHeight - evt.y
                    var $skd = new faceui.FaceUiEvent(faceui.FaceUiEvent.SHOW_FACE_UI_PANEL);
                    $skd.data = { bfun: function ($faceStr) { _this.faceFunBack($faceStr); } };
                    ModuleEventManager.dispatchEvent($skd);
                    break;
                case this.w_input_bg:
                    if (Scene_data.verticalScene == true) {
                        //console.log("横版本输入")
                    }
                    InputPanel.show(function ($str) { _this.inputBfun($str); }, this.chatHtmlText, 0, 12);
                    break;
                default:
                    break;
            }
        };
        ChatBaseMenu.prototype.inputBfun = function ($str) {
            this.setInputLabelStr($str);
        };
        ChatBaseMenu.prototype.setInputLabelStr = function ($str) {
            this.chatHtmlText = $str;
            //console.log($str)
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.w_input_ctx.skinName, ColorType.color9a683f + $str, 16, TextAlign.LEFT);
        };
        ChatBaseMenu.prototype.faceFunBack = function ($faceStr) {
            var str = this.chatHtmlText;
            Chat.ChatModel.getInstance().sendCharInfo(str + $faceStr);
        };
        ChatBaseMenu.prototype.refresh = function () {
            this.setUiListVisibleByItem(this.uiList, Chat.ChatModel.showType > 0);
            this.setUiListVisibleByItem([this.w_sys_tips], Chat.ChatModel.showType == 0);
            if (Scene_data.verticalScene) {
                this.w_input_ctx.x = 17;
            }
            else {
                this.w_input_ctx.x = 17;
            }
            this.resize();
        };
        ChatBaseMenu.prototype.sendCharInfo = function () {
            var str = this.chatHtmlText;
            this.setInputLabelStr("");
            if (!str.length) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "无法发送空字符", 99);
                return;
                // str = "横版本文字.."
            }
            //console.log("频道", ChatModel.showType)
            Chat.ChatModel.getInstance().sendCharInfo(str);
        };
        ChatBaseMenu.testNum = 0;
        return ChatBaseMenu;
    }(UIVirtualContainer));
    Chat.ChatBaseMenu = ChatBaseMenu;
})(Chat || (Chat = {}));
//# sourceMappingURL=ChatBaseMenu.js.map