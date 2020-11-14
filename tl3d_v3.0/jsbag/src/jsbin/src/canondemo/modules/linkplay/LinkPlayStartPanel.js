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
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var Rectangle = Pan3d.Rectangle;
    var LinkPlayStartPanel = /** @class */ (function (_super) {
        __extends(LinkPlayStartPanel, _super);
        function LinkPlayStartPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LinkPlayStartPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/linkplay/roomstart/roomstart.txt", "panelui/linkplay/roomstart/roomstart.png", function () { _this.loadConfigCom(); });
        };
        LinkPlayStartPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -20, 400, 500);
            this.addChild(this._topRender.getComponent("a_line_play_tittle"));
            this.a_map_name = this.addChild(this._topRender.getComponent("a_map_name"));
            this.a_map_pic = this.addChild(this._topRender.getComponent("a_map_pic"));
            this.a_self_info_txt = this.addChild(this._topRender.getComponent("a_self_info_txt"));
            this.a_leave_roon_but = this.addEvntBut("a_out_roon_but", this._topRender);
            this.a_enter_game = this.addEvntBut("a_enter_game", this._topRender);
            this.a_ready_but = this.addEvntBut("a_ready_but", this._topRender);
            this.a_ready_but.goToAndStop(0);
            this.ureCellItem = new Array;
            for (var i = 0; i < 4; i++) {
                var $a_usre_cell = this.addChild(this._topRender.getComponent("a_use_info_frame"));
                $a_usre_cell.goToAndStop(i);
                $a_usre_cell.x = $a_usre_cell.baseRec.x + 75 * i;
                this.ureCellItem.push($a_usre_cell);
            }
            this.uiLoadComplte = true;
            this.showPanel();
            this.refreshPanel();
        };
        LinkPlayStartPanel.prototype.refreshPanel = function () {
            var txtstr = "";
            txtstr += MsEngine.getInstance().msRegistRsp.userID;
            txtstr += "\n" + "openid_" + GameData.getStorageSync("openid");
            txtstr += "\n" + "名字=>" + GameData.userInfo.nickName;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_info_txt.skinName, txtstr, 16, TextAlign.LEFT, Pan3d.ColorType.Black000000);
        };
        LinkPlayStartPanel.prototype.refrishUserData = function () {
            if (this.uiLoadComplte && MsEngine.getInstance().roomUserInfoList) {
                for (var j = 0; j < this.ureCellItem.length; j++) {
                    this.ureCellItem[j].x = 10000;
                }
                for (var i = 0; i < MsEngine.getInstance().roomUserInfoList.length; i++) {
                    var vo = MsEngine.getInstance().roomUserInfoList[i];
                    var userInfo = JSON.parse(vo.msRoomUserInfo.userProfile).userInfo;
                    this.drawTempUre(this.ureCellItem[i], userInfo.avatarUrl, vo.ready);
                    this.ureCellItem[i].x = this.ureCellItem[i].baseRec.x + 75 * i;
                }
            }
            this.setUiListVisibleByItem([this.a_enter_game], MsEngine.getInstance().isRoomOwner());
            this.setUiListVisibleByItem([this.a_ready_but], !MsEngine.getInstance().isRoomOwner());
        };
        LinkPlayStartPanel.prototype.drawTempUre = function ($ui, $url, $ready) {
            var _this = this;
            GameData.loadImgByPicUrl($url, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                var context = $ctx;
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                if ($ready) {
                    $ctx.fillStyle = "rgba(255,0,0,1)";
                }
                else {
                    $ctx.fillStyle = "rgba(255,255,255,1)";
                }
                $ctx.fillRect(0, 0, 5, $toRect.height);
                $ctx.fillRect(0, 0, $toRect.width, 5);
                $ctx.fillRect(0, $toRect.height - 5, $toRect.width, 5);
                $ctx.fillRect($toRect.width - 5, 0, 5, $toRect.height);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        LinkPlayStartPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_enter_game:
                    if (MsEngine.getInstance().BrokenLine) {
                        msgalert.AlertUtil.show("正在重连接中", "提示", function (value) {
                        }, 2);
                    }
                    else {
                        MsEngine.getInstance().joinOver();
                        this.hidePanel();
                    }
                    break;
                case this.a_leave_roon_but:
                    MsEngine.getInstance().leaveRoom(function () {
                        Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                    });
                    this.hidePanel();
                    break;
                case this.base_win_close:
                    MsEngine.getInstance().leaveRoom();
                    this.hidePanel();
                    break;
                case this.a_ready_but:
                    if (this.a_ready_but.current == 0) {
                        this.a_ready_but.goToAndStop(1);
                    }
                    else {
                        this.a_ready_but.goToAndStop(0);
                    }
                    var $vo = MsEngine.getInstance().getUserByuserId(MsEngine.getInstance().msRegistRsp.userID);
                    $vo.ready = this.a_ready_but.current == 1;
                    MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 2, current: this.a_ready_but.current }));
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT));
                    break;
                default:
                    break;
            }
        };
        LinkPlayStartPanel.prototype.refrishMapInfo = function () {
            var $obj = JSON.parse(MsEngine.getInstance().roomInfo.roomProperty);
            this._topRender.uiAtlas.upDataPicToTexture($obj.pic, this.a_map_pic.skinName);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, $obj.name, 16, TextAlign.CENTER, ColorType.Black000000, "", 2);
        };
        LinkPlayStartPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishUserData();
                this.refrishMapInfo();
                MsEngine.linkplayGamestatus = 1;
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        LinkPlayStartPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
            }
        };
        return LinkPlayStartPanel;
    }(basewin.BaseWinPanel));
    linkplay.LinkPlayStartPanel = LinkPlayStartPanel;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayStartPanel.js.map