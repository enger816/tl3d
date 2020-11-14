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
var selectserver;
(function (selectserver) {
    var JoinGameUiPanel = /** @class */ (function (_super) {
        __extends(JoinGameUiPanel, _super);
        function JoinGameUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baImg = new UIBackImg();
            _this.addRender(_this._baImg);
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._middleRender = new UIRenderComponent;
            _this.addRender(_this._middleRender);
            // this._baseRender = new UIRenderComponent;
            // this.addRender(this._baseRender)
            // this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender)
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        JoinGameUiPanel.prototype.dispose = function () {
            this._baImg.dispose();
            this._baImg = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._middleRender.dispose();
            this._middleRender = null;
            // this._baseRender.dispose();
            // this._baseRender = null;
            // this._topRender.dispose();
            // this._topRender = null;
        };
        JoinGameUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/selectserver/goplay.xml", "ui/uidata/selectserver/goplay.png", function () { _this.loadConfigCom(); }, "ui/uidata/selectserver/selectserverpc.png");
        };
        JoinGameUiPanel.prototype.loadConfigCom = function () {
            var _this = this;
            // this._topRender.uiAtlas = this._baseRender.uiAtlas
            // this._bgRender.uiAtlas = this._baseRender.uiAtlas
            this._middleRender.uiAtlas = this._bgRender.uiAtlas;
            this.removeChild;
            var renderLevel = this._middleRender;
            this.a_gg = this.addEvntButUp("a_gg", renderLevel);
            this.a_bg = this.addEvntButUp("a_bg", this._bgRender);
            this.a_enter = this.addEvntButUp("a_enter", renderLevel);
            this.a_state = this.addChild(renderLevel.getComponent("a_state"));
            this.a_serverid = this.addChild(renderLevel.getComponent("a_serverid"));
            this.a_servername = this.addChild(renderLevel.getComponent("a_servername"));
            this._baImg.setImgInfo("ui/load/goplay.png", 1024, 512);
            this.resize();
            LoadManager.getInstance().load("tb_server_list.txt", LoadManager.XML_TYPE, function ($str) {
                var obj = JSON.parse($str);
                selectserver.SelectServerModel.getInstance().convertObj(obj);
                _this.applyLoadComplete();
                // //console.log("--公告---", obj["aaa"]);
            });
        };
        JoinGameUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        };
        JoinGameUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        JoinGameUiPanel.prototype.resetData = function () {
            this._curvo = selectserver.SelectServerModel.getInstance().getCurVo();
            var statestr = selectserver.SelectServerModel.getInstance().StateKey[this._curvo.state];
            UiDraw.SharedDrawImg(this._bgRender.uiAtlas, this._bgRender.uiAtlas, this.a_state.skinName, statestr);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_serverid.skinName, this._curvo.id + "服", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_servername.skinName, this._curvo.name, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            this.resize();
        };
        JoinGameUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this._baImg) {
                this._baImg.resize();
            }
        };
        JoinGameUiPanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_enter:
                    GameData.mergeServerMsgVo.id = this._curvo.id;
                    GameData.mergeServerMsgVo.host = this._curvo.gate_ip;
                    GameData.mergeServerMsgVo.port = this._curvo.gate_port;
                    GameData.mergeServerMsgVo.sid = String(this._curvo.sid);
                    GameData.mergeServerMsgVo.platformid = String(this._curvo.pid);
                    GameInstance.init();
                    ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.HIDE_JOINGAME_EVENT));
                    break;
                case this.a_bg:
                    this.hide();
                    ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.OPEN_SELECTSERVER_EVENT));
                    break;
                case this.a_gg:
                    ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.OPEN_GG_EVENT));
                    break;
                default:
                    break;
            }
        };
        return JoinGameUiPanel;
    }(UIPanel));
    selectserver.JoinGameUiPanel = JoinGameUiPanel;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=JoinGameUiPanel.js.map