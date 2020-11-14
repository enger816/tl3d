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
var setingui;
(function (setingui) {
    var SetingUiPanel = /** @class */ (function (_super) {
        __extends(SetingUiPanel, _super);
        function SetingUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = 500;
            _this.height = 350;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender.uiAtlas = new UIAtlas;
            return _this;
        }
        SetingUiPanel.prototype.applyLoad = function () {
            var _this = this;
            GameData.getPublicUiAtlas(function ($uiAtlas) { _this.makePanelUi($uiAtlas); });
        };
        SetingUiPanel.prototype.makePanelUi = function ($uiAtlas) {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/chat/seting/seting.xml", "ui/uidata/chat/seting/seting.png", function () { _this.loadConfigCom(); });
        };
        SetingUiPanel.prototype.setSizeForPanelUi = function ($ui, $uiName) {
            var temp = this._topRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        };
        SetingUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = GameData.publicbgUiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            var guiBg0 = this.addChild(this._bottomRender.getComponent("guiBg0"));
            this.setSizeForPanelUi(guiBg0, "a_bg");
            this.b_close = this.addEvntBut("b_close", this._bottomRender);
            this.setSizeForPanelUi(this.b_close, "a_close");
            var titleBg = this.addChild(this._bottomRender.getComponent("titleBg"));
            this.setSizeForPanelUi(titleBg, "a_tittle_bg");
            this._bottomRender.applyObjData();
            this.addChild(this._midRender.getComponent("a_tittle_txt"));
            this.addChild(this._midRender.getComponent("a_label2"));
            this.addChild(this._midRender.getComponent("a_label1"));
            this.addChild(this._midRender.getComponent("a_label4"));
            this.addChild(this._midRender.getComponent("a_label3"));
            this.addChild(this._midRender.getComponent("a_label0"));
            this.a_select_0 = this.addEvntBut("a_select_0", this._midRender);
            this.a_select_1 = this.addEvntBut("a_select_1", this._midRender);
            this.a_select_2 = this.addEvntBut("a_select_2", this._midRender);
            this.a_select_3 = this.addEvntBut("a_select_3", this._midRender);
            this.a_select_4 = this.addEvntBut("a_select_4", this._midRender);
            this.a_pinbi_but = this.addEvntBut("a_pinbi_but", this._midRender);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        SetingUiPanel.prototype.getData = function () {
            var ba = new ByteArray;
            ba.endian = Endian.LITTLE_ENDIAN;
            ba.writeUint8(this.a_select_0.selected ? 0 : 1);
            ba.writeUint8(this.a_select_1.selected ? 0 : 1);
            ba.writeUint8(this.a_select_2.selected ? 0 : 1);
            ba.writeUint8(this.a_select_3.selected ? 0 : 1);
            ba.writeUint8(this.a_select_4.selected ? 0 : 1);
            ba.writeUint8(0);
            ba.writeUint8(0);
            ba.writeUint8(0);
            return ba;
        };
        SetingUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_close:
                    this.close();
                    break;
                case this.a_select_0:
                case this.a_select_1:
                case this.a_select_2:
                case this.a_select_3:
                case this.a_select_4:
                    var ba = this.getData();
                    ba.position = 0;
                    var aa = ba.readUint32();
                    var bb = ba.readUint32();
                    //console.log(aa, bb);
                    NetManager.getInstance().protocolos.msg_decline(aa, bb);
                    break;
                case this.a_pinbi_but:
                    this.close();
                    ModuleEventManager.dispatchEvent(new shieldui.ShieldUiEvent(shieldui.ShieldUiEvent.SHOW_SHIELD_UI_PANEL));
                    break;
                default:
                    break;
            }
        };
        SetingUiPanel.prototype.close = function () {
            ModuleEventManager.dispatchEvent(new setingui.SetingUiEvent(setingui.SetingUiEvent.HIDE_SETING_UI_PANEL));
        };
        SetingUiPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                var $arr = GuidData.player.getPlayerFieldDeclineChanel();
                //console.log($arr)
                this.a_select_0.selected = $arr[0] == 0;
                this.a_select_1.selected = $arr[1] == 0;
                this.a_select_2.selected = $arr[2] == 0;
                this.a_select_3.selected = $arr[3] == 0;
                this.a_select_4.selected = $arr[4] == 0;
            }
        };
        return SetingUiPanel;
    }(UIConatiner));
    setingui.SetingUiPanel = SetingUiPanel;
})(setingui || (setingui = {}));
//# sourceMappingURL=SetingUiPanel.js.map