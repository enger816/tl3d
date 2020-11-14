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
    var ColorType = Pan3d.ColorType;
    var Rectangle = Pan3d.Rectangle;
    var SListItemData = Pan3d.SListItemData;
    var LinkPlayRoomPanel = /** @class */ (function (_super) {
        __extends(LinkPlayRoomPanel, _super);
        function LinkPlayRoomPanel() {
            return _super.call(this) || this;
        }
        LinkPlayRoomPanel.prototype.baseWindowLoadFinish = function () {
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
        LinkPlayRoomPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -20, 450, 600);
            this.a_task_list_tittle = this.addEvntBut("a_task_list_tittle", this._topRender);
            this.a_creat_room_bg = this.addEvntButUp("a_creat_room_bg", this._midRender);
            this.a_join_room_bg = this.addEvntButUp("a_join_room_bg", this._midRender);
            this.addChild(this._topRender.getComponent("a_creat_room_but"));
            this.addChild(this._topRender.getComponent("a_join_room_but"));
            this._taskUiList = new linkplay.LinkPlayRoomList();
            this._taskUiList.init(this._topRender.uiAtlas);
            MsEngine.getInstance().initMsEngine(function () {
                _this.uiLoadComplte = true;
                _this.showPanel();
                _this.loadPanelH5UiXml();
            });
        };
        LinkPlayRoomPanel.prototype.loadPanelH5UiXml = function () {
            var $arr = new Array;
            $arr.push("panelui/linkplay/linkplaymain/linkplaymain");
            $arr.push("panelui/linkplay/roomstart/roomstart");
            for (var i = 0; i < $arr.length; i++) {
                var $name = $arr[i];
                var $h5UIAtlas = new H5UIAtlas;
                $h5UIAtlas.setInfo($name + ".txt", $name + ".png", function () { });
            }
        };
        LinkPlayRoomPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.a_join_room_bg:
                    if (this.selectRoomVo) {
                        MsEngine.getInstance().getRoomDetail(this.selectRoomVo.data, function (rsp) {
                            console.log("rsp", rsp);
                            if (rsp.state == 2) {
                                msgalert.AlertUtil.show("此房已关闭", "提示", function (value) {
                                    if (value == 1) {
                                        _this.showPanel();
                                    }
                                }, 2);
                            }
                            else {
                                MsEngine.getInstance().joinRoom(_this.selectRoomVo.data);
                                _this.hidePanel();
                            }
                        });
                    }
                    break;
                case this.a_creat_room_bg:
                    // MsEngine.getInstance().createRoom();
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.CREAT_LINK_PLAY_PANEL));
                    this.hidePanel();
                    break;
                case this.base_win_close:
                    this.hidePanel();
                    break;
                case this.a_task_list_tittle:
                    this.showPanel();
                    break;
                default:
                    break;
            }
        };
        LinkPlayRoomPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                this.selectRoomVo = null;
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this._taskUiList.show();
                MsEngine.getInstance().getRoomListEx();
                MsEngine.linkplayGamestatus = 0;
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        LinkPlayRoomPanel.prototype.roomListPesonse = function (value) {
            var ary = new Array;
            for (var i = 0; i < value.length; i++) {
                var item = new SListItemData;
                var roomMeshVo = new linkplay.RoomMeshVo();
                roomMeshVo.txt = ColorType.Whitefff4d6 + "每日无尽榜单奖励";
                roomMeshVo.data = value[i];
                item.data = roomMeshVo;
                item.id = i;
                ary.push(item);
            }
            this._taskUiList.refreshData(ary);
        };
        LinkPlayRoomPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
                this._taskUiList.hide();
            }
        };
        return LinkPlayRoomPanel;
    }(basewin.BaseWinPanel));
    linkplay.LinkPlayRoomPanel = LinkPlayRoomPanel;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayRoomPanel.js.map