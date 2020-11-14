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
    var SList = Pan3d.SList;
    var UIManager = Pan3d.UIManager;
    var SListItem = Pan3d.SListItem;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var Vector2D = Pan3d.Vector2D;
    var TextureManager = Pan3d.TextureManager;
    var RoomMeshVo = /** @class */ (function () {
        function RoomMeshVo() {
        }
        return RoomMeshVo;
    }());
    linkplay.RoomMeshVo = RoomMeshVo;
    var LinkPlayRoomList = /** @class */ (function (_super) {
        __extends(LinkPlayRoomList, _super);
        function LinkPlayRoomList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -0;
            _this._maskLevel = 7;
            return _this;
        }
        LinkPlayRoomList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        LinkPlayRoomList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, TaskViewRender, 400, 64 * 7, 0, 64, 7, 256, 1024, 1, 10);
        };
        LinkPlayRoomList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        LinkPlayRoomList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return LinkPlayRoomList;
    }(SList));
    linkplay.LinkPlayRoomList = LinkPlayRoomList;
    var TaskViewRender = /** @class */ (function (_super) {
        __extends(TaskViewRender, _super);
        function TaskViewRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        TaskViewRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Task_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 64);
            $container.addChild(this.Task_bg);
            this.RoomId = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RoomId", 10, 28, 50, 20);
            $container.addChild(this.RoomId);
            this.Task_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_ion_pic", 70, 15, 44, 44);
            $container.addChild(this.Task_ion_pic);
            this.RoomName = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RoomName", 50, 28, 190, 20);
            $container.addChild(this.RoomName);
            this.Maptxt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Maptxt", 250, 28, 53, 20);
            $container.addChild(this.Maptxt);
            this.PlayNum = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "PlayNum", 300, 28, 60, 20);
            $container.addChild(this.PlayNum);
            this.Task_bg.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.Task_bg.addEventListener(InteractiveEvent.Up, this.butUp, this);
        };
        TaskViewRender.prototype.butDown = function (evt) {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y);
            this.downTarget = evt.target;
            if (this.itdata && this.itdata.data) {
                var $taskMeshVo = this.itdata.data;
                GameData.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT), $taskMeshVo);
            }
        };
        TaskViewRender.prototype.butUp = function (evt) {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $taskMeshVo = this.itdata.data;
                GameData.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT), $taskMeshVo);
            }
        };
        TaskViewRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $vo = $data.data;
                var $txtColor = ColorType.Green20a200;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.RoomId.skinName, String($data.id + 1), 16, TextAlign.CENTER, $txtColor);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.RoomName.skinName, String($vo.data.roomName), 16, TextAlign.CENTER, $txtColor);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Maptxt.skinName, $vo.data.roomProperty, 16, TextAlign.CENTER, $txtColor);
                var $stateStr;
                if ($vo.data.state == 2) {
                    $stateStr = ColorType.Redd92200 + "进行中...";
                }
                else {
                    $stateStr = ColorType.Green20a200 + $vo.data.gamePlayer + "/" + $vo.data.maxPlayer;
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.PlayNum.skinName, $stateStr, 16, TextAlign.CENTER);
                this.fileColor(this.Task_bg.skinName, $data.id % 2 == 0 ? "rgba(66,66,66,1)" : "rgba(56,53,54,1)");
            }
            else {
                LabelTextFont.clearLabel(this.uiAtlas, this.RoomId.skinName);
                LabelTextFont.clearLabel(this.uiAtlas, this.RoomName.skinName);
                LabelTextFont.clearLabel(this.uiAtlas, this.Maptxt.skinName);
                LabelTextFont.clearLabel(this.uiAtlas, this.PlayNum.skinName);
                this.fileColor(this.Task_bg.skinName, "rgba(66,66,66,0)");
            }
        };
        TaskViewRender.prototype.fileColor = function ($iconName, $color) {
            var rec = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color;
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        };
        return TaskViewRender;
    }(SListItem));
    linkplay.TaskViewRender = TaskViewRender;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayRoomList.js.map