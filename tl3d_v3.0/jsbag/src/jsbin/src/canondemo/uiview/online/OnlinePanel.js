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
var online;
(function (online) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var TimeUtil = Pan3d.TimeUtil;
    var Rectangle = Pan3d.Rectangle;
    var OnlinePanel = /** @class */ (function (_super) {
        __extends(OnlinePanel, _super);
        function OnlinePanel() {
            var _this = _super.call(this) || this;
            _this.skipNum = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            return _this;
        }
        OnlinePanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("ui/online/online.txt", "ui/online/online.png", function () { _this.loadConfigCom(); });
        };
        OnlinePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true;
            this.winRect = new Rectangle(0, -20, 400, 400);
            this.ureCellItem = new Array;
            for (var i = 0; i < 9; i++) {
                var $a_usre_cell = this.addChild(this._topRender.getComponent("a_usre_cell"));
                $a_usre_cell.goToAndStop(i);
                $a_usre_cell.x = $a_usre_cell.baseRec.x + 75 * (i % 3);
                $a_usre_cell.y = $a_usre_cell.baseRec.y + 70 * Math.floor(i / 3);
                this.ureCellItem.push($a_usre_cell);
            }
            this.addChild(this._topRender.getComponent("a_tittle_txt"));
            this.a_base_but_bg = this.addEvntBut("a_base_but_bg", this._midRender);
            this.addChild(this._topRender.getComponent("a_online_start_txt"));
            ;
            this.showPanel();
        };
        OnlinePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_base_but_bg:
                    if (this.skipNum > 1) {
                        this.hidePanel();
                        ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.PLAY_ONLINE_SCENE_START));
                    }
                    break;
                default:
                    this.hidePanel();
                    break;
            }
        };
        OnlinePanel.prototype.clearAll = function () {
            this.skipNum = 0;
            for (var i = 0; i < this.ureCellItem.length; i++) {
                var $ui = this.ureCellItem[i];
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.fillStyle = "rgba(66,66,66,1)";
                $ctx.fillRect(0, 0, $toRect.width, $toRect.width);
                $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
            }
        };
        OnlinePanel.prototype.oneByOne = function () {
            var _this = this;
            if (this.skipNum < this.ureCellItem.length) {
                this.drawTempUre(this.ureCellItem[this.skipNum]);
                this.skipNum++;
                TimeUtil.addTimeOut(100, function () { _this.oneByOne(); });
            }
        };
        OnlinePanel.prototype.drawTempUre = function ($ui) {
            var _this = this;
            var $url = "https://api.h5key.com/static/wudiqiuqiu/ui/userpic/" + random(10) + ".jpg";
            GameData.loadImgByPicUrl($url, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                var context = $ctx;
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
                console.log("小熊猫加载成功", $img);
            });
        };
        OnlinePanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.clearAll();
                this.oneByOne();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        OnlinePanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
            }
        };
        return OnlinePanel;
    }(basewin.BaseWinPanel));
    online.OnlinePanel = OnlinePanel;
})(online || (online = {}));
//# sourceMappingURL=OnlinePanel.js.map