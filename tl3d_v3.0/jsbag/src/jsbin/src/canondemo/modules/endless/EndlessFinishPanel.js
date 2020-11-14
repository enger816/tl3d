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
var endless;
(function (endless) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TimeUtil = Pan3d.TimeUtil;
    var ColorType = Pan3d.ColorType;
    var EndlessFinishPanel = /** @class */ (function (_super) {
        __extends(EndlessFinishPanel, _super);
        function EndlessFinishPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = false;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._topTxtRender = new UIRenderComponent();
            _this.addRender(_this._topTxtRender);
            _this.frameFun = function () { _this.upFrame(); };
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        EndlessFinishPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_base_but_bg0:
                    var $tm = this.endTime - Pan3d.TimeUtil.getTimer();
                    if ($tm > 0) {
                        var needNum = endless.EndlessManager.getInstance().endlessConfigVo.timefinishrealplaynum;
                        if (GameData.hasdiamondsHavenum > needNum) {
                            GameData.hasdiamondsHavenum -= needNum;
                            Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START));
                            this.hidePanel();
                        }
                        else {
                            msgalert.AlertUtil.show("你的钻石不足");
                        }
                    }
                    else {
                        Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START));
                        this.hidePanel();
                    }
                    break;
                default:
                    break;
            }
        };
        EndlessFinishPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._topTxtRender.uiAtlas = this.h5UIAtlas;
            var b_tip_bg = this.addEvntBut("b_tip_bg", this._bottomRender);
            b_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            b_tip_bg.top = 0;
            b_tip_bg.left = 0;
            b_tip_bg.width = 540 * Pan3d.UIData.Scale;
            b_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.base_win_bg = this.addChild(this._midRender.getComponent("b_base_win_bg"));
            this.b_base_but_bg0 = this.addEvntButUp("b_base_but_bg0", this._topRender);
            this.b_try_again_but = this.addChild(this._topTxtRender.getComponent("b_try_again_but"));
            this.b_revive_info_txt = this.addChild(this._topTxtRender.getComponent("b_revive_info_txt"));
            this.b_wait_time = this.addChild(this._topTxtRender.getComponent("b_wait_time"));
            this.b_need_diamond_num = this.addChild(this._topTxtRender.getComponent("b_need_diamond_num"));
            this.b_diamond_icon = this.addChild(this._topTxtRender.getComponent("b_diamond_icon"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        EndlessFinishPanel.prototype.upFrame = function () {
            if (this.uiLoadComplte && this.hasStage) {
                var $tm = this.endTime - Pan3d.TimeUtil.getTimer();
                var $labeStr;
                if ($tm > 0) {
                    $labeStr = String(Math.ceil($tm / 1000));
                }
                else {
                    $labeStr = "0";
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_revive_info_txt.skinName, "倒计时结束，无需钻石开启下一局", 16, TextAlign.CENTER, ColorType.Black000000);
                    this.setUiListVisibleByItem([this.b_need_diamond_num, this.b_diamond_icon], false);
                    this.b_try_again_but.goToAndStop(2);
                    this.b_try_again_but.x = this.b_try_again_but.baseRec.x - 50;
                    TimeUtil.addFrameTick(this.frameFun);
                }
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.b_wait_time.skinName, $labeStr, "NUM43", TextAlign.CENTER);
            }
        };
        EndlessFinishPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.endTime = 20 * 1000 + TimeUtil.getTimer();
                TimeUtil.addFrameTick(this.frameFun);
                this.setUiListVisibleByItem([this.b_need_diamond_num, this.b_diamond_icon], true);
                this.b_try_again_but.goToAndStop(1);
                this.b_try_again_but.x = this.b_try_again_but.baseRec.x;
                var $numstr = String(endless.EndlessManager.getInstance().endlessConfigVo.timefinishrealplaynum);
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.b_need_diamond_num.skinName, $numstr, "NUM41", TextAlign.RIGHT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_revive_info_txt.skinName, "这次的时间已用完", 16, TextAlign.CENTER, ColorType.Black000000);
                game.GameSoundManager.getInstance().setBgVolume(0);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        EndlessFinishPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeFrameTick(this.frameFun);
        };
        return EndlessFinishPanel;
    }(H5UIConatiner));
    endless.EndlessFinishPanel = EndlessFinishPanel;
})(endless || (endless = {}));
//# sourceMappingURL=EndlessFinishPanel.js.map