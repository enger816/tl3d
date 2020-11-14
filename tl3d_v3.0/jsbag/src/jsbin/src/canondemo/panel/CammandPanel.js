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
    var PandaMeshData = rightpanda.PandaMeshData;
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
            _this.keyNum = 10;
            _this.iconNum = 0;
            _this.colorId = 0;
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
                "审核模式",
                "钻石1000",
                "离线时间",
                "看完视屏",
                "更新openid",
                "删除微信",
                "场景颜色",
                "隐藏界面",
                "增加邀请",
                "显示阴影",
                "完成特殊",
                "测试面板",
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
        CammandPanel.prototype.uploadFile = function () {
            var client = new OSS.Wrapper({
                accessKeyId: this.info.AccessKeyId,
                accessKeySecret: this.info.AccessKeySecret,
                stsToken: this.info.SecurityToken,
                endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                bucket: "webpan"
            });
            var storeAs = "upfile/ossfile" + random(9999) + ".txt";
            var $byte = new Pan3d.Pan3dByteArray();
            $byte.writeUTF("就是这样子");
            var file = new File([$byte.buffer], "ossfile.txt");
            client.multipartUpload(storeAs, file).then(function (result) {
                console.log(result);
            }).catch(function (err) {
                console.log(err);
            });
        };
        CammandPanel.prototype.itemDataClick = function ($listItemData) {
            var _this = this;
            var str = $listItemData.data.txt;
            this.hide();
            switch (str) {
                case "离线时间":
                    console.log(GameData.getStorageSyncNumber("offlinetime"));
                    GameData.setStorageSync("offlinetime", GameData.getStorageSyncNumber("offlinetime") - offline.OffLinePanel.offLineMessVo.mintm * 1000);
                    console.log(GameData.getStorageSyncNumber("offlinetime"));
                    break;
                case "WXOPENID":
                    console.log(GameData.getStorageSync("wxopenid"));
                    break;
                case "完成特殊":
                    Pan3d.ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.FINISH_LIST_SPECIAL));
                    break;
                case "测试面板":
                    //console.log(GameData.onLaunchRes);
                    //console.log(GameData.onshowRes);
                    //GameData.onshowRes.scene = 1035;
                    //console.log("useConcernd", GameData.getStorageSync("useConcernd"))
                    GameData.setStorageSync("isvip", true);
                    break;
                case "更新openid":
                    var openid = "panjiazhi_" + random(9999);
                    GameData.setStorageSync("openid", openid);
                    console.log(GameData.getStorageSync("openid"));
                    break;
                case "看完视屏":
                    GameData.isLookVideoErr();
                    break;
                case "增加邀请":
                    var $postStr = "";
                    $postStr += "from_openid=" + GameData.getStorageSync("openid"); //别人的
                    $postStr += "&openid=" + "id_" + random(300000); //自己的
                    $postStr += "&info=" + 1254;
                    $postStr += "&type=" + 4;
                    GameData.WEB_SEVER_EVENT_AND_BACK("add_advertise", $postStr, function (res) { });
                    break;
                case "隐藏界面":
                    Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL));
                    break;
                case "神秘宝箱":
                    PandaMeshData.showRightPanda(PandaMeshData.key15, Scene_data.fileRoot + "ui/panda/15.png", new offline.OffLineEvent(offline.OffLineEvent.SHOW_OFFLINE_PANEL));
                    break;
                case "审核模式":
                    if (GameData.severinfo.wxcloudModel == 1) {
                        GameData.severinfo.wxcloudModel = 2;
                    }
                    else {
                        GameData.severinfo.wxcloudModel = 1;
                    }
                    break;
                case "显示阴影":
                    shadow.ShadowModel.visible = !shadow.ShadowModel.visible;
                    break;
                case "请求oss":
                    GameData.webseverurl = "https://api.h5key.com/api/";
                    GameData.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, function (res) {
                        _this.info = res.data.info;
                        console.log(_this.info);
                        _this.uploadFile();
                    });
                    GameData.webseverurl = "https://wxwdqq.chiji-h5.com/api/";
                    break;
                case "场景颜色":
                    game.GameSceneColor.makeBaseColor(this.colorId++ % 5);
                    break;
                case "求助图标":
                    break;
                case "多人联机":
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                    break;
                case "好友排行":
                    Pan3d.ModuleEventManager.dispatchEvent(new friendrank.FriendRankEvent(friendrank.FriendRankEvent.SHOW_FRIEND_RANK_PANEL));
                    break;
                case "删除微信":
                    Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.REMOVE_USER_STORAGE_INFO));
                    break;
                case "无尽模式":
                    this.hide();
                    //   Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START))
                    /*
                    var obj: PandaMeshData = new PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/11.png";
                    obj.type = PandaMeshData.type1;
                    obj.key = PandaMeshData.key11
                    obj.data = new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START)
                    var $topUiViewEvent: rightpanda.RightPandaEvent = new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent)
                    */
                    PandaMeshData.showRightPanda(PandaMeshData.key11, Scene_data.fileRoot + "ui/panda/11.png", new endless.EndLessStartEvent(endless.EndLessStartEvent.SHOW_ENDLESS_START_PANEL));
                    break;
                case "显示帮助":
                    PandaMeshData.showRightPanda(PandaMeshData.key1, Scene_data.fileRoot + "ui/panda/1.png", new help.HelpEvent(help.HelpEvent.SHOW_HELP_LIST_PANEL));
                    PandaMeshData.showRightPanda(PandaMeshData.key6, Scene_data.fileRoot + "ui/panda/6.png", new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL));
                    this.hide();
                    break;
                case "关闭返回":
                    this.hide();
                    break;
                case "联机夺宝":
                    this.hide();
                    /*
                    var obj: PandaMeshData = new PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/13.png";
                    obj.type = PandaMeshData.type1;
                    obj.key = PandaMeshData.key13
                    obj.data = new online.OnlineEvent(online.OnlineEvent.SHOW_ONLINE_START_PANEL)
                    var $topUiViewEvent: rightpanda.RightPandaEvent = new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent)
                    */
                    PandaMeshData.showRightPanda(PandaMeshData.key13, Scene_data.fileRoot + "ui/panda/13.png", new online.OnlineStartEvent(online.OnlineStartEvent.SHOW_ONLINE_START_PANEL));
                    break;
                case "显示任务":
                    this.hide();
                    Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                    break;
                case "错误视屏":
                    this.hide();
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
                    break;
                case "保存自己":
                    GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SEND_TO_APPER_DATA), { key: "保存自己", data: { level: game.GameDataModel.levelNum, time: random(999999) } });
                    break;
                case "分享游戏":
                    break;
                case "钻石1000":
                    GameData.hasdiamondsHavenum = 300;
                    break;
                case "显示本地":
                    break;
                case "显示外部":
                    PandaMeshData.showRightPanda(this.keyNum++, Scene_data.fileRoot + "ui/userpic/" + random(10) + ".jpg", null);
                    this.hide();
                    break;
                case "提示框":
                    msgalert.AlertUtil.show("请收集更多钻石!\n请收集更多钻石请收集更多钻石 ");
                    this.hide();
                    break;
                case "打印位置":
                    var $pos = new Pan3d.Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z);
                    console.log($pos);
                    break;
                case "显示日志":
                    this.hide();
                    break;
                case "显示皮肤":
                    Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.SHOW_SKIN_LIST_PANEL));
                    this.hide();
                    break;
                case "开起关卡":
                    var maxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) + 1;
                    GameData.setStorageSync(GameData.SELF_MAX_LEVEL, 70);
                    PandaMeshData.showRightPanda(PandaMeshData.key16, Scene_data.fileRoot + "ui/panda/16.png", new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    break;
                case "开关物理":
                    canonkey.Physics.ready = !canonkey.Physics.ready;
                    break;
                case "Fram3d开关":
                    frame3d.FrameCanonPrefabSprite.isMove = !frame3d.FrameCanonPrefabSprite.isMove;
                    break;
                case "开关Fps":
                    break;
                case "选择关卡":
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