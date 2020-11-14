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
var fb;
(function (fb) {
    var FubenFailPanel = /** @class */ (function (_super) {
        __extends(FubenFailPanel, _super);
        function FubenFailPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.lastTxtNum = 0;
            _this.endTime = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.upDataFun = function (t) { _this.update(t); };
            return _this;
        }
        FubenFailPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/fuben/reward/reward.xml", "ui/uidata/fuben/reward/reward.png", function () { _this.loadConfigCom(); });
        };
        FubenFailPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("b_win_bottom"));
            this.addChild(this._midRender.getComponent("b_win_tittle"));
            // this.addChild(this._midRender.getComponent("b_fenge_line_0"));
            // this.addChild(this._midRender.getComponent("b_fenge_line_1"));
            this.b_exit_time = this.addChild(this._topRender.getComponent("b_exit_time"));
            var b_tittle_name = this.addChild(this._topRender.getComponent("b_tittle_name"));
            b_tittle_name.goToAndStop(1);
            this.addChild(this._bottomRender.getComponent("b_content_title_bg"));
            this.b_icon0 = this.addEvntButUp("b_icon0", this._topRender);
            this.b_icon1 = this.addEvntButUp("b_icon1", this._topRender);
            this.b_icon2 = this.addEvntButUp("b_icon2", this._topRender);
            this.b_icon3 = this.addEvntButUp("b_icon3", this._topRender);
            this.b_exit_but = this.addEvntButUp("b_exit_but", this._topRender);
            this.addChild(this._topRender.getComponent("b_content_label"));
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        FubenFailPanel.prototype.update = function (t) {
            if (this.uiAtlasComplet) {
                if (!this.hasStage) {
                    TimeUtil.removeFrameTick(this.upDataFun);
                }
                else {
                    var $time = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
                    if ($time <= -1) {
                        this.hide();
                    }
                    else if ($time >= 0 && this.lastTxtNum != $time) {
                        this.lastTxtNum = $time;
                        //console.log($time)
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_exit_time.skinName, ColorType.colorce0a00 + getScencdStr($time) + "秒后自动进行按钮操作", 14, TextAlign.CENTER);
                    }
                }
            }
        };
        FubenFailPanel.prototype.butClik = function (evt) {
            this.hide();
            switch (evt.target) {
                case this.b_icon0:
                    //翅膀
                    GameData.enterSceneNextOpenEvent = new wing.WingEvent(wing.WingEvent.SHOW_WING_PANEL_EVENT);
                    NetManager.getInstance().protocolos.instance_exit(0);
                    break;
                case this.b_icon1:
                    //坐骑
                    GameData.enterSceneNextOpenEvent = new mountui.MountUiEvent(mountui.MountUiEvent.SHOW_MOUNT_EVENT);
                    NetManager.getInstance().protocolos.instance_exit(0);
                    break;
                case this.b_icon2:
                    //装备强化
                    GameData.enterSceneNextOpenEvent = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.SHOW_STRENGTHGEM_PANEL);
                    NetManager.getInstance().protocolos.instance_exit(0);
                    break;
                case this.b_icon3:
                    //商城
                    GameData.enterSceneNextOpenEvent = new store.StoreEvent(store.StoreEvent.SHOW_Store_EVENT);
                    NetManager.getInstance().protocolos.instance_exit(0);
                    break;
                case this.b_exit_but:
                    NetManager.getInstance().protocolos.instance_exit(0);
                    break;
                default:
                    break;
            }
        };
        FubenFailPanel.prototype.show = function () {
            var $time = GameInstance.getGameSecond(GuidData.map.getMapIntFieldEndTM());
            if ($time < 1) {
                $time = 10; //特殊加上的
            }
            this.endTime = TimeUtil.getTimer() + $time * 1000; //未来时间
            TimeUtil.addFrameTick(this.upDataFun);
            UIManager.getInstance().addUIContainer(this);
        };
        FubenFailPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return FubenFailPanel;
    }(UIConatiner));
    fb.FubenFailPanel = FubenFailPanel;
})(fb || (fb = {}));
//# sourceMappingURL=FubenFailPanel.js.map