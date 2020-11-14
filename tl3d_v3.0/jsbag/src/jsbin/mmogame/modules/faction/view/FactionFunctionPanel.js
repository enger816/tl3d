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
var faction;
(function (faction) {
    var FactionFunctionPanel = /** @class */ (function (_super) {
        __extends(FactionFunctionPanel, _super);
        function FactionFunctionPanel() {
            var _this = _super.call(this) || this;
            _this._bgInit = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            // this._bigPic = new UIRenderOnlyPicComponent();
            // this.addRender(this._bigPic)
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        // private _bigPic: UIRenderOnlyPicComponent;
        FactionFunctionPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
        };
        FactionFunctionPanel.prototype.initUiAtlas = function ($uiAtlas, $win) {
            // this._bigPic.uiAtlas = $uiAtlas;
            this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this.parentWindow = $win;
            var renderLevel = this._baseRender;
            this.initView(renderLevel);
        };
        FactionFunctionPanel.prototype.onAdd = function () {
            this.showBg();
        };
        FactionFunctionPanel.prototype.onRemove = function () {
            this.hideBg();
        };
        FactionFunctionPanel.prototype.showBg = function () {
            if (this.parentWindow && !this._bgInit) {
                var ui = this.parentWindow.loadBigPicByUrl("ui/uidata/faction/factionbg.png");
                this._bgInit = true;
                ui.width = 824;
                ui.height = 448;
            }
            if (this.parentWindow) {
                this.parentWindow.addBigPic();
            }
        };
        FactionFunctionPanel.prototype.hideBg = function () {
            if (this.parentWindow) {
                this.parentWindow.removeBigPic();
            }
        };
        FactionFunctionPanel.prototype.initView = function (renderLevel) {
            var renderLevel = this._baseRender;
            //大背景
            // this._bigPic.setImgUrl("ui/uidata/faction/factionbg.png");
            // this.addChild(this._bigPic.getComponent("ccav"));
            var x_bg1A2 = this.addChild(this._baseRender.getComponent("x_bg1A2"));
            x_bg1A2.isU = true;
            var ary = faction.FactionBuildModel.getInstance().getList();
            this._aryBgUI = new Array;
            this._aryLevUI = new Array;
            this._aryNameUI = new Array;
            this._aryOpenUI = new Array;
            for (var i = 0; i < ary.length; i++) {
                var but = this.addChild(this._bgRender.getComponent("b_btnbg" + i));
                but.addEventListener(InteractiveEvent.Up, this.equClick, this);
                this._aryBgUI.push(but);
                this._aryLevUI.push(this.addChild(renderLevel.getComponent("b_lev" + i)));
                this._aryNameUI.push(this.addChild(renderLevel.getComponent("b_name" + i)));
                this._aryOpenUI.push(this.addChild(renderLevel.getComponent("b_noopen" + i)));
            }
        };
        FactionFunctionPanel.prototype.resetData = function () {
            var ary = faction.FactionBuildModel.getInstance().getList();
            //console.log("---ary---", ary);
            for (var i = 0; i < ary.length; i++) {
                this._aryBgUI[i].data = ary[i];
                this.setUiListVisibleByItem([this._aryOpenUI[i]], ary[i].state == 2);
                // this.setUiListVisibleByItem([this._aryBgUI[i]], ary[i].state != 2);
                this.setUiListVisibleByItem([this._aryLevUI[i]], ary[i].state != 2);
                this.setUiListVisibleByItem([this._aryNameUI[i]], ary[i].state != 2);
                this._aryBgUI[i].x = ary[i].data.pos[0];
                this._aryBgUI[i].y = ary[i].data.pos[1];
                if (ary[i].state != 2) {
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryLevUI[i].skinName, "Lv" + ary[i].data.level, 16, TextAlign.CENTER, ColorType.Whitefffce6);
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryNameUI[i].skinName, String(ary[i].data.name), 16, TextAlign.CENTER, ColorType.Whitefffce6);
                    this._aryNameUI[i].x = this._aryLevUI[i].x = this._aryBgUI[i].x + 19;
                    this._aryLevUI[i].y = this._aryBgUI[i].y + 5;
                    this._aryNameUI[i].y = this._aryBgUI[i].y + 25;
                }
                else {
                    this._aryOpenUI[i].x = this._aryBgUI[i].x + 48;
                    this._aryOpenUI[i].y = this._aryBgUI[i].y + 12;
                }
            }
            this.resize();
        };
        FactionFunctionPanel.prototype.equClick = function ($evt) {
            UiTweenScale.getInstance().changeButSize($evt.target);
            var vo = $evt.target.data;
            if (vo.state == 2) {
                msgtip.MsgTipManager.outStrById(22, 56);
                return;
            }
            // ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.HIDE_EXISTFACTIONUI_EVENT));
            ModulePageManager.openPanel(vo.data.goto, vo.data.goto_sub);
        };
        FactionFunctionPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        FactionFunctionPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();
        };
        FactionFunctionPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return FactionFunctionPanel;
    }(UIVirtualContainer));
    faction.FactionFunctionPanel = FactionFunctionPanel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionFunctionPanel.js.map