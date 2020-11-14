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
    var ChatBaseLeftMenu = /** @class */ (function (_super) {
        __extends(ChatBaseLeftMenu, _super);
        function ChatBaseLeftMenu() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.left = 0;
            return _this;
        }
        ChatBaseLeftMenu.prototype.setRender = function ($bg, $mid, $top) {
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        };
        ChatBaseLeftMenu.prototype.loadConfigCom = function () {
            this.w_black = this.addEvntButUp("w_black", this._bottomRender);
            //   w_black
            this.menuTypeButs = new Array;
            this.a_an0 = this.addEvntBut("a_an0", this._midRender);
            this.a_an0.data = SharedDef.CHAT_TYPE_SYSTEM;
            this.a_an1 = this.addEvntBut("a_an1", this._midRender);
            this.a_an1.data = SharedDef.CHAT_TYPE_WORLD;
            this.a_an2 = this.addEvntBut("a_an2", this._midRender);
            this.a_an2.data = SharedDef.CHAT_TYPE_CURRENT;
            this.a_an3 = this.addEvntBut("a_an3", this._midRender);
            this.a_an3.data = SharedDef.CHAT_TYPE_FACTION;
            this.menuTypeButs.push(this.a_an0);
            this.menuTypeButs.push(this.a_an1);
            this.menuTypeButs.push(this.a_an2);
            this.menuTypeButs.push(this.a_an3);
            this.a_an_txt_0 = this.addChild(this._topRender.getComponent("a_an_txt_0"));
            this.a_an_txt_1 = this.addChild(this._topRender.getComponent("a_an_txt_1"));
            this.a_an_txt_2 = this.addChild(this._topRender.getComponent("a_an_txt_2"));
            this.a_an_txt_3 = this.addChild(this._topRender.getComponent("a_an_txt_3"));
            this.redItem = new Array();
            for (var i = 0; i <= 5; i++) {
                this.redItem.push(this.addChild(this._topRender.getComponent("a_mes_red_icon")));
            }
            this.redItem[0].data = SharedDef.CHAT_TYPE_SYSTEM; //系统
            this.redItem[1].data = SharedDef.CHAT_TYPE_WORLD; //世界
            this.redItem[2].data = SharedDef.CHAT_TYPE_CURRENT; //附近
            this.redItem[3].data = SharedDef.CHAT_TYPE_FACTION; //家族
        };
        ChatBaseLeftMenu.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.w_black.height = Scene_data.stageHeight / UIData.Scale - 65;
            this.w_black.width = 480;
        };
        ChatBaseLeftMenu.prototype.setMenuByType = function (value) {
            for (var i = 0; i < this.menuTypeButs.length; i++) {
                this.menuTypeButs[i].selected = Boolean(this.menuTypeButs[i].data == value);
            }
            Chat.ChatModel.showType = value;
        };
        ChatBaseLeftMenu.prototype.refresh = function () {
            this.setMenuByType(Chat.ChatModel.showType);
            for (var i = 0; i < this.redItem.length; i++) {
                var $redui = this.redItem[i];
                $redui.x = -600;
                $redui.y = i * 46;
                var $needShow = false;
                for (var j = 0; j < Chat.ChatModel.getInstance().chatItem.length; j++) {
                    var vo = Chat.ChatModel.getInstance().chatItem[j];
                    if (!vo.showLast && Number($redui.data) == vo.s2c_send_chat.channel) {
                        $needShow = true;
                        $redui.x = 60;
                    }
                }
            }
        };
        ChatBaseLeftMenu.prototype.butClik = function (evt) {
            if (!isNaN(evt.target.data)) {
                this.setMenuByType(evt.target.data);
                this.parent.refresh();
            }
        };
        ChatBaseLeftMenu.testNum = 0;
        return ChatBaseLeftMenu;
    }(UIVirtualContainer));
    Chat.ChatBaseLeftMenu = ChatBaseLeftMenu;
})(Chat || (Chat = {}));
//# sourceMappingURL=ChatBaseLeftMenu.js.map