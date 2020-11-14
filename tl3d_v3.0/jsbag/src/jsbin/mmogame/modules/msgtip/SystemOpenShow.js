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
var msgtip;
(function (msgtip) {
    var SystemOpenShow = /** @class */ (function (_super) {
        __extends(SystemOpenShow, _super);
        function SystemOpenShow() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this._roationRenderComponent = new RoationUIRenderComponent();
            _this.addRender(_this._roationRenderComponent);
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        SystemOpenShow.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/msg/systemopenshow.xml", "ui/uidata/msg/systemopenshow.png", function () { _this.loadConfigCom(); });
        };
        SystemOpenShow.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._roationRenderComponent.uiAtlas = this._midRender.uiAtlas;
            this.a_round_bg = this.addChild(this._roationRenderComponent.getComponent("a_round_bg"));
            this.a_round_bg.x = this.a_round_bg.x + this.a_round_bg.width / 2;
            this.a_round_bg.y = this.a_round_bg.y + this.a_round_bg.height / 2;
            this.a_round_bg.aotuRotation = 1;
            this.addChild(this._midRender.getComponent("a_ico_bg"));
            this.a_text_frame = this.addChild(this._topRender.getComponent("a_text_frame"));
            this.a_text_frame.goToAndStop(0);
            this.addPersonChar();
            this.a_round_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.addEvntBut("a_empty", this._topRender);
            this.applyLoadComplete();
        };
        SystemOpenShow.prototype.addPersonChar = function () {
            this.showDisPlay = new Person2DChar();
            this._midRender.addModel(this.showDisPlay);
            //  this.showDisPlay.setAvatar(5101);
            //   this.resizeRole()
        };
        SystemOpenShow.prototype.setModelByID = function ($tb) {
            var _this = this;
            switch ($tb.showmodel) {
                case 4101:
                    this._scale = 3;
                    this._posy = -50;
                    this.showDisPlay.rotationY = 45;
                    this.a_text_frame.goToAndStop(0);
                    break;
                case 951:
                    this._scale = 5;
                    this._posy = 0;
                    this.showDisPlay.rotationY = 0;
                    this.a_text_frame.goToAndStop(1);
                    break;
                case 801:
                    this._scale = 3;
                    this._posy = -30;
                    this.showDisPlay.rotationY = 0;
                    this.a_text_frame.goToAndStop(2);
                    break;
                default:
                    this._scale = 3;
                    this._posy = -30;
                    this.showDisPlay.rotationY = 0;
                    break;
            }
            this.showDisPlay.setAvatar($tb.showmodel);
            this.resizeRole();
            TimeUtil.addTimeOut(10000, function () {
                _this.close();
            });
        };
        SystemOpenShow.prototype.resizeRole = function () {
            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = this._scale * UIData.Scale;
                this.showDisPlay.y = this._posy * UIData.Scale;
            }
        };
        SystemOpenShow.prototype.butClik = function (evt) {
            this.close();
        };
        SystemOpenShow.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
            ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.REFRISH_SYS_AND_UI_CHANGE));
        };
        return SystemOpenShow;
    }(UIConatiner));
    msgtip.SystemOpenShow = SystemOpenShow;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=SystemOpenShow.js.map