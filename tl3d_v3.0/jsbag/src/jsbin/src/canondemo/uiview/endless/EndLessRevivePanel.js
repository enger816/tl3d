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
    var EndLessRevivePanel = /** @class */ (function (_super) {
        __extends(EndLessRevivePanel, _super);
        function EndLessRevivePanel() {
            var _this = _super.call(this) || this;
            _this.endTime = 0;
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
        EndLessRevivePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_revive_share_but:
                    var $tm = this.endTime - Pan3d.TimeUtil.getTimer();
                    if ($tm > 0) {
                        if (GameData.hasdiamondsHavenum >= endless.EndlessManager.getInstance().layerNum) {
                            GameData.hasdiamondsHavenum -= endless.EndlessManager.getInstance().layerNum;
                            endless.EndlessManager.getInstance().revivePlay();
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
        EndLessRevivePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._topTxtRender.uiAtlas = this.h5UIAtlas;
            var r_tip_bg = this.addEvntBut("r_tip_bg", this._bottomRender);
            r_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            r_tip_bg.top = 0;
            r_tip_bg.left = 0;
            r_tip_bg.width = 540 * Pan3d.UIData.Scale;
            r_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.c_base_win_bg = this.addChild(this._midRender.getComponent("c_base_win_bg"));
            this.c_revive_share_but = this.addEvntButUp("c_revive_share_but", this._midRender);
            this.r_realplay_but_txt = this.addChild(this._topTxtRender.getComponent("r_realplay_but_txt"));
            this.r_diamond_icon = this.addChild(this._topTxtRender.getComponent("r_diamond_icon"));
            this.r_need_diamond_num = this.addChild(this._topTxtRender.getComponent("r_need_diamond_num"));
            this.c_revive_info_txt = this.addEvntButUp("c_revive_info_txt", this._topTxtRender);
            this.r_wait_time = this.addChild(this._topTxtRender.getComponent("r_wait_time"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        EndLessRevivePanel.prototype.upFrame = function () {
            if (this.uiLoadComplte && this.hasStage) {
                var $tm = this.endTime - Pan3d.TimeUtil.getTimer();
                var $labeStr;
                if ($tm > 0) {
                    $labeStr = String(Math.ceil($tm / 1000));
                }
                else {
                    $labeStr = "0";
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_revive_info_txt.skinName, "已过可复活时间。请重新开始", 16, TextAlign.CENTER, ColorType.Black000000);
                    this.r_realplay_but_txt.goToAndStop(1);
                    this.r_realplay_but_txt.x = this.r_realplay_but_txt.baseRec.x - 40;
                    this.setUiListVisibleByItem([this.r_diamond_icon, this.r_need_diamond_num], false);
                }
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_wait_time.skinName, $labeStr, "NUM43", TextAlign.CENTER);
            }
        };
        EndLessRevivePanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.endTime = TimeUtil.getTimer() + endless.EndlessManager.getInstance().endlessConfigVo.waitrevivetime;
                TimeUtil.addFrameTick(this.frameFun);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_revive_info_txt.skinName, "复活可以从失误层继续", 16, TextAlign.CENTER, ColorType.Black000000);
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_need_diamond_num.skinName, "12", "NUM41", TextAlign.CENTER);
                this.r_realplay_but_txt.goToAndStop(0);
                this.r_realplay_but_txt.x = this.r_realplay_but_txt.baseRec.x;
                this.setUiListVisibleByItem([this.r_diamond_icon, this.r_need_diamond_num], true);
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_need_diamond_num.skinName, String(endless.EndlessManager.getInstance().layerNum), "NUM41", TextAlign.CENTER);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        EndLessRevivePanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeFrameTick(this.frameFun);
        };
        return EndLessRevivePanel;
    }(H5UIConatiner));
    endless.EndLessRevivePanel = EndLessRevivePanel;
})(endless || (endless = {}));
//# sourceMappingURL=EndLessRevivePanel.js.map