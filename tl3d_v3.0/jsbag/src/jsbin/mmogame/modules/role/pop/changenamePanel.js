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
var role;
(function (role) {
    var changenamePanel = /** @class */ (function (_super) {
        __extends(changenamePanel, _super);
        function changenamePanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        changenamePanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        };
        changenamePanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/role/changename.xml", "ui/uidata/role/changename.png", function () { _this.loadConfigCom(); });
            // });
        };
        changenamePanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.a_basebg = this.addEvntBut("a_basebg", this._bgRender);
            this.a_basebg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(this._bgRender.getComponent("a_bg"));
            this.a_name = this.addChild(this._midRender.getComponent("a_name"));
            this.a_cost = this.addChild(this._midRender.getComponent("a_cost"));
            this.a_txtbg = this.addEvntButUp("a_txtbg", this._baseRender);
            this.addUIList(["a_title", "a_txt", "a_btnqd", "a_btnqx"], this._midRender);
            this.cnew_btn0 = this.addEvntButUp("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.cnew_btn0, "btnBg0", this._midRender);
            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg1", this._midRender);
            this.resize();
            this.applyLoadComplete();
        };
        changenamePanel.prototype.resize = function () {
            this.a_basebg.top = 0;
            this.a_basebg.left = 0;
            this.a_basebg.y = 0;
            this.a_basebg.x = 0;
            this.a_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.a_basebg.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        changenamePanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.a_basebg:
                    break;
                case this.cnew_btn0:
                    //确定
                    if (this.checkStr(this._msg) && this._type && this._canbuy) {
                        var byte = new ByteArray();
                        byte.writeUTF(this._msg);
                        if (byte.length > 20) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "字符太长", 99);
                            return;
                        }
                        NetManager.getInstance().protocolos.rename(this._msg);
                        UIManager.getInstance().removeUIContainer(this);
                    }
                    else {
                        if (!this._type) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "名称修改失败，与原名相同", 99);
                            return;
                        }
                        if (!this._canbuy) {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = this._resid;
                            ModuleEventManager.dispatchEvent($aaa);
                            return;
                        }
                        if (!this.checkStr(this._msg)) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "含敏感词汇,请更正", 99);
                            return;
                        }
                    }
                    break;
                case this.cnew_btn1:
                    //取消
                    UIManager.getInstance().removeUIContainer(this);
                    break;
                case this.a_txtbg:
                    //输入框
                    InputPanel.show(function ($str) { _this.inputBfunGG($str); }, this._type ? this._msg : "", 0, 320);
                    break;
                default:
                    break;
            }
        };
        changenamePanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetInputtxt();
            var num = GuidData.player.getChgNameTime();
            var panum = num + 1;
            var tabary = tb.TB_rename_info.get_TB_rename_info();
            for (var i = 0; i < tabary.length; i++) {
                var start = tabary[i].range[0];
                var end = tabary[i].range[1] == -1 ? 100000 : tabary[i].range[1];
                if (panum >= start && panum <= end) {
                    this._resid = tabary[i].costs[0][0];
                    this.drawCost(tabary[i].costs[0]);
                    break;
                }
            }
        };
        changenamePanel.prototype.drawCost = function ($costary) {
            if ($costary[1] == 0) {
                this._canbuy = true;
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_cost.skinName, "首次改名免费", 16, TextAlign.LEFT, ColorType.colorff7200);
            }
            else {
                this._canbuy = UiDraw.drawRewardIconAndtxt(this.a_cost, $costary, true, TextAlign.LEFT);
            }
        };
        changenamePanel.prototype.resetInputtxt = function () {
            this._msg = GuidData.player.getBaseName();
            this._type = false;
            this.refreshInputBfunGG();
        };
        changenamePanel.prototype.inputBfunGG = function ($str) {
            var byte = new ByteArray();
            byte.writeUTF($str);
            if (byte.length > 20 || $str.length > 6) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "输入太长了（超过6个字了）", 99);
                return;
            }
            else if (byte.length > 0) {
                this._type = true;
                this._msg = $str;
            }
            else {
                this._type = false;
                this._msg = GuidData.player.getBaseName();
            }
            this.refreshInputBfunGG();
        };
        changenamePanel.prototype.refreshInputBfunGG = function () {
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_name.skinName, this._msg, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        //Fix
        changenamePanel.prototype.checkStr = function ($str) {
            return true;
        };
        return changenamePanel;
    }(UIPanel));
    role.changenamePanel = changenamePanel;
})(role || (role = {}));
//# sourceMappingURL=changenamePanel.js.map