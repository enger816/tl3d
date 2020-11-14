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
var camand;
(function (camand) {
    var ListItemRender = Pan3d.ListItemRender;
    var UIManager = Pan3d.UIManager;
    var UIConatiner = Pan3d.UIConatiner;
    var TextAlign = Pan3d.TextAlign;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIMask = Pan3d.UIMask;
    var UIListRenderComponent = Pan3d.UIListRenderComponent;
    var Vector2D = Pan3d.Vector2D;
    var ListItemData = Pan3d.ListItemData;
    var CammandRender = /** @class */ (function (_super) {
        __extends(CammandRender, _super);
        function CammandRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CammandRender.prototype.draw = function () {
            var ctx = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            // UiDraw.cxtDrawImg(ctx, PuiData.Slist_select, new Rectangle(0, 0, 98, 50), UIData.publicUi);
            ctx.fillStyle = "rgba(66,66,66,0.5)";
            ctx.fillRect(0, 0, 98, 50);
            this.drawLable(ctx, 50, 15, this._listItemData.data.txt, 16, "#ffffff", false);
            this.atlas.updateCtx(ctx, this.uvData.ox, this.uvData.oy);
        };
        CammandRender.prototype.drawLable = function (ctx, $xpos, $ypos, $str, fontsize, fontColor, bolder) {
            if (bolder === void 0) { bolder = false; }
            ctx.textAlign = TextAlign.CENTER;
            ctx.font = "italic 16px 黑体";
            ctx.fillStyle = "White";
            ctx.fillText($str, $xpos, $ypos);
        };
        return CammandRender;
    }(ListItemRender));
    camand.CammandRender = CammandRender;
    var CammandPanel = /** @class */ (function (_super) {
        __extends(CammandPanel, _super);
        function CammandPanel() {
            var _this = _super.call(this) || this;
            _this.isShadowVisible = true;
            _this.keyNum = 10;
            _this.iconNum = 0;
            _this.width = 400;
            _this.height = 600;
            _this.center = 0;
            _this.middle = 0;
            _this._listRender = new UIListRenderComponent;
            _this.addRender(_this._listRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this.addList();
            return _this;
        }
        CammandPanel.getInstance = function () {
            if (!this._instance) {
                this._instance = new CammandPanel();
            }
            return this._instance;
        };
        CammandPanel.prototype.addList = function () {
            var $pos = new Vector2D(0, 0);
            this._bgList = this._listRender.createGridList();
            this._bgList.x = $pos.x;
            this._bgList.y = $pos.y;
            this.addChild(this._bgList);
            this._bgMask = new UIMask();
            this._bgMask.x = $pos.x;
            this._bgMask.y = $pos.y;
            this._bgMask.width = 512;
            this._bgMask.height = 512;
            this.addMask(this._bgMask);
            this._listRender.mask = this._bgMask;
            this._bgMask.level = 7;
            this.refreshData();
        };
        CammandPanel.prototype.refreshData = function () {
            var _this = this;
            var ary = new Array;
            var butItem = [
                "关闭返回",
                "开起关卡",
                "更新重起",
                "显示日志",
                "错误视屏",
                "开关Fps",
                "提示框",
                "打印位置",
                "无尽模式",
                "显示本地",
                "显示外部",
                "钻石1000",
                "显示任务",
                "分享游戏",
                "联机夺宝",
                "显示助力",
            ];
            for (var i = 0; i < butItem.length; i++) {
                var listItemData = new ListItemData();
                listItemData.data = { txt: butItem[i], id: i };
                listItemData.clickFun = function ($listItemData) { _this.itemDataClick($listItemData); };
                ary.push(listItemData);
            }
            this._bgList.contentY = 0;
            this._bgList.setGridData(ary, CammandRender, 4, 100, 52, 512, 512, 512, 512);
        };
        CammandPanel.prototype.itemDataClick = function ($listItemData) {
            var str = $listItemData.data.txt;
            this.hide();
            switch (str) {
                case "无尽模式":
                    this.hide();
                    //   Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START))
                    var obj = new tips.PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/11.png";
                    obj.type = tips.PandaMeshData.type1;
                    obj.key = tips.PandaMeshData.key11;
                    obj.data = new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START);
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                    break;
                case "关闭返回":
                    this.hide();
                    break;
                case "联机夺宝":
                    this.hide();
                    var obj = new tips.PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/13.png";
                    obj.type = tips.PandaMeshData.type1;
                    obj.key = tips.PandaMeshData.key13;
                    obj.data = new online.OnlineEvent(online.OnlineEvent.SHOW_ONLINE_START_PANEL);
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                    break;
                case "显示任务":
                    this.hide();
                    Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                    break;
                case "错误视屏":
                    this.hide();
                    game.GameVideoManager.loadVideoXml({ record_file: "9b30d141-62ca-4b69-8362-eceaaf52e4f6.txt" });
                    break;
                case "显示助力":
                    this.hide();
                    Pan3d.ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                    break;
                case "更新重起":
                    this.hide();
                    Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_GAME_UPDATA_EVENT));
                    break;
                case "读取录像":
                    this.hide();
                    //GameData.isPlayVideo = true;
                    //game. GameVideoManager.loadVideoXml()
                    var obj = new tips.PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/8.png";
                    obj.type = tips.PandaMeshData.type1;
                    obj.key = tips.PandaMeshData.key8;
                    // obj.data = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_ALL_BANG_VIEW)
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                    break;
                case "保存自己":
                    var $sendInfo = new game.SceneEvent(game.SceneEvent.SEND_TO_APPER_DATA);
                    $sendInfo.data = { key: "保存自己", data: { level: game.GameDataModel.levelNum, time: random(999999) } };
                    Pan3d.ModuleEventManager.dispatchEvent($sendInfo);
                    break;
                case "分享游戏":
                    var shareobj = {};
                    shareobj.url = Scene_data.fileRoot + "ui/panda/4.png";
                    shareobj.type = tips.PandaMeshData.type1;
                    shareobj.key = tips.PandaMeshData.key4; //分享
                    shareobj.data = new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL);
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = shareobj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                    break;
                case "钻石1000":
                    GameData.hasdiamondsHavenum = 100;
                    break;
                case "显示本地":
                    var obj = new tips.PandaMeshData();
                    this.iconNum++;
                    obj.url = Scene_data.fileRoot + "ui/panda/" + this.iconNum + ".png";
                    obj.type = tips.PandaMeshData.type1;
                    obj.key = this.keyNum++; //求助
                    obj.data = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_SELECT_LEVEL_PANEL);
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                    break;
                case "显示外部":
                    var obj = new tips.PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/userpic/" + random(10) + ".jpg";
                    obj.type = tips.PandaMeshData.type1;
                    obj.key = this.keyNum++; //求助
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                    this.hide();
                    break;
                case "提示框":
                    msgalert.AlertUtil.show("\n请收集更多钻石!\n更换更有趣的外观,祝你好运");
                    this.hide();
                    break;
                case "打印位置":
                    var $pos = new Pan3d.Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z);
                    console.log($pos);
                    break;
                case "显示日志":
                    Pan3d.ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_HIDE_LOG_TXT_PANEL));
                    this.hide();
                    break;
                case "显示皮肤":
                    Pan3d.ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_SKIN_LIST_PANEL));
                    this.hide();
                    break;
                case "开起关卡":
                    GameData.setStorageSync(GameData.SELF_MAX_LEVEL, GameData.maxLevel);
                    break;
                case "开关物理":
                    canonkey.Physics.ready = !canonkey.Physics.ready;
                    break;
                case "Fram3d开关":
                    frame3d.FrameCanonPrefabSprite.isMove = !frame3d.FrameCanonPrefabSprite.isMove;
                    break;
                case "开关Fps":
                    game.GameDataModel.showGameFpsTm = !game.GameDataModel.showGameFpsTm;
                    Pan3d.ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_HIDE_LOG_TXT_PANEL));
                    break;
                case "选择关卡":
                    break;
                case "关闭阴影":
                    this.isShadowVisible = !this.isShadowVisible;
                    shadow.ShadowModel.getInstance().setShowdowVisible(this.isShadowVisible);
                    break;
                default:
                    break;
            }
        };
        CammandPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        CammandPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return CammandPanel;
    }(UIConatiner));
    camand.CammandPanel = CammandPanel;
})(camand || (camand = {}));
//# sourceMappingURL=CammandPanel.js.map