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
var copytask;
(function (copytask) {
    var waitjoinPanel = /** @class */ (function (_super) {
        __extends(waitjoinPanel, _super);
        function waitjoinPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            _this._frameFun = function (t) { _this.upTime(t); };
            return _this;
        }
        waitjoinPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        };
        waitjoinPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/copytask/matejoin.xml", "ui/uidata/copytask/matejoin.png", function () { _this.loadConfigCom(); });
            // });
        };
        waitjoinPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._bgRender.uiAtlas;
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this.bg = this.addEvntBut("bg", this._bgRender);
            this.bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addUIList(["a_timetxt", "a_jointxt"], this._midRender);
            this.addChild(this._midRender.getComponent("a_btntxt"));
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.a_name = this.addChild(this._midRender.getComponent("a_name"));
            this.a_time = this.addChild(this._midRender.getComponent("a_time"));
            this.a_num = this.addChild(this._midRender.getComponent("a_num"));
            this.cnew_btn1 = this.addEvntBut("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", this._midRender);
            this._publicbgRender.applyObjData();
            this.resize();
            this.applyLoadComplete();
        };
        waitjoinPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.cnew_btn1:
                    NetManager.getInstance().protocolos.kuafu_3v3_cancel_match(this._itdata.type);
                    this.close();
                    NetManager.getInstance().protocolos.instance_exit(0);
                    break;
                case this.bg:
                    break;
                default:
                    break;
            }
        };
        waitjoinPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        waitjoinPanel.prototype.show = function ($data) {
            this._itdata = $data;
            if (!this.hasStage) {
                this._curtime = -1;
                this.lasttime = TimeUtil.getTimer();
                TimeUtil.addFrameTick(this._frameFun);
                UIManager.getInstance().addUIContainer(this);
                if ($data.type == SharedDef.KUAFU_TYPE_GROUP_INSTANCE) {
                    var tab = tb.TB_group_instance_base.getTempVo($data.data);
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_name.skinName, tab.name, 16, TextAlign.CENTER, ColorType.Yellowf7d253);
                }
                else if ($data.type == SharedDef.MATCH_TYPE_LOCAL_SINGLE_PVP) {
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_name.skinName, "匹配赛", 16, TextAlign.CENTER, ColorType.Yellowf7d253);
                }
            }
            var str = $data.type == SharedDef.KUAFU_TYPE_GROUP_INSTANCE ? "(" + $data.count + "/" + $data.target + ")" : "...";
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_num.skinName, str, 14, TextAlign.LEFT, ColorType.Yellowffecc6);
        };
        waitjoinPanel.prototype.resize = function () {
            this.bg.top = 0;
            this.bg.left = 0;
            this.bg.y = 0;
            this.bg.x = 0;
            this.bg.height = Scene_data.stageHeight / UIData.Scale;
            this.bg.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        waitjoinPanel.prototype.upTime = function (t) {
            var $time = Math.floor((TimeUtil.getTimer() - this.lasttime) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_time.skinName, getScencdStr(this._curtime), 16, TextAlign.LEFT, ColorType.Yellowffecc6);
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
            }
        };
        return waitjoinPanel;
    }(UIPanel));
    copytask.waitjoinPanel = waitjoinPanel;
})(copytask || (copytask = {}));
//# sourceMappingURL=waitjoinPanel.js.map