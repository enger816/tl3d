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
var linkplay;
(function (linkplay) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var Rectangle = Pan3d.Rectangle;
    var LinkPlayCreatPanel = /** @class */ (function (_super) {
        __extends(LinkPlayCreatPanel, _super);
        function LinkPlayCreatPanel() {
            return _super.call(this) || this;
        }
        LinkPlayCreatPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/linkplay/room/room.txt", "panelui/linkplay/room/room.png", function () { _this.loadConfigCom(); });
        };
        LinkPlayCreatPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -20, 400, 500);
            this.addChild(this._topRender.getComponent("c_room_name"));
            this.addChild(this._topRender.getComponent("c_win_tittle"));
            this.mapUiItem = new Array;
            for (var i = 0; i < GameData.severinfo.linkplaymap.length; i++) {
                var mc = this.addEvntBut("c_map_frame", this._topRender);
                mc.x = mc.baseRec.x + i % 3 * 100;
                mc.y = mc.baseRec.y + Math.floor(i / 3) * 100;
                mc.goToAndStop(i);
                mc.data = GameData.severinfo.linkplaymap[i];
                this.mapUiItem.push(mc);
            }
            this.c_confirm_bg = this.addEvntBut("c_confirm_bg", this._midRender);
            this.c_cancel_bg = this.addEvntBut("c_cancel_bg", this._midRender);
            this.addChild(this._topRender.getComponent("c_confirm_txt"));
            this.addChild(this._topRender.getComponent("c_cancel_txt"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        LinkPlayCreatPanel.prototype.drawAllPicRefrish = function (value) {
            this.selectMap = value;
            for (var i = 0; i < this.mapUiItem.length; i++) {
                this.drawPicToUi(this.mapUiItem[i]);
            }
        };
        LinkPlayCreatPanel.prototype.drawPicToUi = function ($ui) {
            var _this = this;
            var picurl = $ui.data.pic;
            GameData.loadImgByPicUrl(Scene_data.fileRoot + picurl, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                var context = $ctx;
                context.fillStyle = "rgba(66,66,66,0)";
                context.fillRect(0, 0, $toRect.width, $toRect.width);
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                if (_this.selectMap == $ui.data) {
                    $ctx.fillStyle = "rgba(255,255,255,1)";
                    $ctx.fillRect(0, 0, 5, $toRect.height);
                    $ctx.fillRect(0, 0, $toRect.width, 5);
                    $ctx.fillRect(0, $toRect.height - 5, $toRect.width, 5);
                    $ctx.fillRect($toRect.width - 5, 0, 5, $toRect.height);
                }
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        LinkPlayCreatPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_confirm_bg:
                    MsEngine.getInstance().createRoom(this.selectMap);
                    this.hidePanel();
                    break;
                case this.c_cancel_bg:
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                    this.hidePanel();
                    break;
                case this.base_win_close:
                    this.hidePanel();
                    break;
                default:
                    if (evt.target.name == "c_map_frame") {
                        this.drawAllPicRefrish(evt.target.data);
                    }
                    break;
            }
        };
        LinkPlayCreatPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.drawAllPicRefrish(GameData.severinfo.linkplaymap[2]);
                MsEngine.linkplayGamestatus = 0;
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        LinkPlayCreatPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
            }
        };
        return LinkPlayCreatPanel;
    }(basewin.BaseWinPanel));
    linkplay.LinkPlayCreatPanel = LinkPlayCreatPanel;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayCreatPanel.js.map