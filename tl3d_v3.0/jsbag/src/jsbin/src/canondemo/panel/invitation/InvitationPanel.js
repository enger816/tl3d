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
var invitation;
(function (invitation) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var Rectangle = Pan3d.Rectangle;
    var SListItemData = Pan3d.SListItemData;
    var InvitationPanel = /** @class */ (function (_super) {
        __extends(InvitationPanel, _super);
        function InvitationPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = false;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        InvitationPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/invitation/invitation.txt", "panelui/invitation/invitation.png", function () { _this.loadConfigCom(); });
        };
        InvitationPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        InvitationPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, 0, 500, 560);
            this.addChild(this._bottomRender.getComponent("a_win_tittle_txt"));
            this._invitationList = new invitation.InvitationLiseView();
            this._invitationList.init(this._bottomRender.uiAtlas);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        InvitationPanel.prototype.showTaskListData = function () {
            var $textArr = new Array;
            $textArr.push(new invitation.InvitationVO(1, 100, 1));
            $textArr.push(new invitation.InvitationVO(2, 100, 6));
            $textArr.push(new invitation.InvitationVO(3, 100, 3));
            $textArr.push(new invitation.InvitationVO(4, 100, 7));
            $textArr.push(new invitation.InvitationVO(5, 100, 7));
            $textArr.push(new invitation.InvitationVO(6, 100, 7));
            $textArr.push(new invitation.InvitationVO(7, 100, 7));
            $textArr.push(new invitation.InvitationVO(8, 100, 7));
            $textArr.push(new invitation.InvitationVO(9, 100, 7));
            $textArr.push(new invitation.InvitationVO(10, 100, 7));
            var ary = new Array;
            for (var i = 0; i < $textArr.length; i++) {
                var item = new SListItemData;
                var $taskMeshVo = new invitation.InvitationMeshVo();
                $taskMeshVo.txtvo = $textArr[i];
                $taskMeshVo.user = this.userWebItem[i];
                item.data = $taskMeshVo;
                item.id = i;
                ary.push(item);
            }
            this._invitationList.refreshData(ary);
        };
        InvitationPanel.prototype.popOldData = function (value) {
            //处理如果删除了之前的记录，主要是防止删除了记后，再邀请新人，依然需要可以获取奖励
            if (GameData.getStorageSync(invitation.InvitationListRender.INVITATION_SYNC_STR)) {
                var invitationData = JSON.parse(GameData.getStorageSync(invitation.InvitationListRender.INVITATION_SYNC_STR));
                var newData = {};
                var skipNum = 0;
                for (var key in invitationData) {
                    if (skipNum < value) {
                        newData[key] = invitationData[key];
                        skipNum++;
                    }
                }
                GameData.setStorageSync(invitation.InvitationListRender.INVITATION_SYNC_STR, JSON.stringify(newData));
            }
        };
        InvitationPanel.prototype.refrishData = function () {
            var _this = this;
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + 0;
            $postStr += "&type=" + 2;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, function (res) {
                if (res && res.data && res.data.list && res.data.list.length) {
                    console.log("回来的列表", res.data.list);
                    var $openidarr = new Array;
                    for (var i = 0; i < res.data.list.length; i++) {
                        $openidarr.push(res.data.list[i].openid);
                    }
                    _this.popOldData($openidarr.length);
                    GameData.GET_USER_INFO_LIST($openidarr, function ($listArr) {
                        _this.userWebItem = new Array;
                        if ($listArr && $listArr.length) {
                            for (var j = 0; j < $listArr.length; j++) {
                                var $gameUserVo = new GameUserVo();
                                $gameUserVo.name = $listArr[j].name;
                                $gameUserVo.openid = $listArr[j].openid;
                                $gameUserVo.avatar = $listArr[j].avatar;
                                _this.userWebItem.push($gameUserVo);
                            }
                        }
                        _this.showTaskListData();
                    });
                }
                else {
                    _this.userWebItem = new Array;
                    _this.showTaskListData();
                }
            });
        };
        InvitationPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this._invitationList.resize();
        };
        InvitationPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this._invitationList.show();
                this.refrishData();
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        InvitationPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
                _this._invitationList.hide();
            });
        };
        return InvitationPanel;
    }(basewin.BaseWinPanel));
    invitation.InvitationPanel = InvitationPanel;
})(invitation || (invitation = {}));
//# sourceMappingURL=InvitationPanel.js.map