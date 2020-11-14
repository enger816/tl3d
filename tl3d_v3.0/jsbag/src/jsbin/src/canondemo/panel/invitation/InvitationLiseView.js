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
    var SList = Pan3d.SList;
    var UIManager = Pan3d.UIManager;
    var SListItem = Pan3d.SListItem;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var Vector2D = Pan3d.Vector2D;
    var TextureManager = Pan3d.TextureManager;
    var UiDraw = Pan3d.UiDraw;
    var Rectangle = Pan3d.Rectangle;
    var InvitationVO = /** @class */ (function () {
        function InvitationVO($id, $resnum, $resicon) {
            this.id = $id;
            this.resnum = $resnum;
            this.resSkinId = $resicon;
        }
        return InvitationVO;
    }());
    invitation.InvitationVO = InvitationVO;
    var InvitationMeshVo = /** @class */ (function () {
        function InvitationMeshVo() {
        }
        return InvitationMeshVo;
    }());
    invitation.InvitationMeshVo = InvitationMeshVo;
    var InvitationLiseView = /** @class */ (function (_super) {
        __extends(InvitationLiseView, _super);
        function InvitationLiseView() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -0;
            _this._maskLevel = 7;
            return _this;
        }
        InvitationLiseView.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        InvitationLiseView.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, InvitationListRender, 450, 120 * 4, 0, 120, 4, 512, 1024, 1, 7);
        };
        InvitationLiseView.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        InvitationLiseView.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return InvitationLiseView;
    }(SList));
    invitation.InvitationLiseView = InvitationLiseView;
    var InvitationListRender = /** @class */ (function (_super) {
        __extends(InvitationListRender, _super);
        function InvitationListRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        InvitationListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            //this.Task_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 64);
            this.List_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "List_bg", 0, 0, 450, 118, 25, 25);
            $container.addChild(this.List_bg);
            this.B_icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_icon", 20, 20, 64, 64);
            $container.addChild(this.B_icon);
            this.B_user_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_user_name", 2, 90, 100, 22);
            $container.addChild(this.B_user_name);
            this.B_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_select_bt", 315, 30, 110, 49);
            $container.addChild(this.B_select_bt);
            this.B_tittle_txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_tittle_txt", 100, 30, 250, 26);
            $container.addChild(this.B_tittle_txt);
            this.B_tip_rward_txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_tip_rward_txt", 100, 60, 150, 26);
            $container.addChild(this.B_tip_rward_txt);
            this.B_select_bt.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.B_select_bt.addEventListener(InteractiveEvent.Up, this.butUp, this);
        };
        InvitationListRender.prototype.butDown = function (evt) {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y);
            this.downTarget = evt.target;
        };
        InvitationListRender.prototype.butUp = function (evt) {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $taskMeshVo = this.itdata.data;
                if ($taskMeshVo.user) {
                    if (!$taskMeshVo.isget) {
                        $taskMeshVo.isget = true;
                        var invitationData = {};
                        if (GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR)) {
                            invitationData = JSON.parse(GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR));
                        }
                        invitationData[$taskMeshVo.txtvo.id] = true;
                        GameData.setStorageSync(InvitationListRender.INVITATION_SYNC_STR, JSON.stringify(invitationData));
                        GameData.hasdiamondsHavenum += $taskMeshVo.txtvo.resnum;
                        msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + $taskMeshVo.txtvo.resnum);
                        this.render(this.itdata);
                    }
                }
                else {
                    console.log("需要邀请");
                    GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                    }, AllShareMeshVo.type2));
                }
            }
        };
        InvitationListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $taskMeshVo = $data.data;
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.List_bg.skinName, UIData.textlist, "List_base_bg_1");
                var invitationData = {};
                if (GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR)) {
                    invitationData = JSON.parse(GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR));
                }
                $taskMeshVo.isget = Boolean(invitationData[$taskMeshVo.txtvo.id]);
                var $butPic = "But_base_1";
                var $butStr = ColorType.Whiteffffff + "邀请好友";
                if ($taskMeshVo.user) {
                    if ($taskMeshVo.isget) {
                        $butPic = "But_base_2";
                        $butStr = ColorType.Whiteffffff + "已领取";
                    }
                    else {
                        $butPic = "But_base_1";
                        $butStr = ColorType.Black000000 + "领取奖励";
                    }
                    this.setNull(this.B_icon.skinName);
                    this.uiAtlas.upDataWebPicToTexture($taskMeshVo.user.avatar, this.B_icon.skinName);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_user_name.skinName, ColorType.Black000000 + $taskMeshVo.user.name, 14, TextAlign.CENTER);
                }
                else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.B_icon.skinName, UIData.textlist, "PIC_add_role");
                    this.setNull(this.B_user_name.skinName);
                }
                this.drawPicAndTxt(this.B_select_bt, $butPic, $butStr, new Vector2D(0, 15), TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_tittle_txt.skinName, ColorType.Black000000 + "邀请到第" + $taskMeshVo.txtvo.id + "位好友", 18, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_tip_rward_txt.skinName, ColorType.Black000000 + "奖励:" + $taskMeshVo.txtvo.resnum + "钻石", 18, TextAlign.LEFT);
                this.uiAtlas.copyPicToTexture;
            }
        };
        InvitationListRender.prototype.setNull = function (skinName) {
            LabelTextFont.writeSingleLabel(this.uiAtlas, skinName, "", 14, TextAlign.CENTER);
        };
        InvitationListRender.prototype.drawPicAndTxt = function ($ui, puslicname, txt, pos, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $rect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 18, pos.x, pos.y, $align);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        };
        InvitationListRender.prototype.fileColor = function ($iconName, $color) {
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
        InvitationListRender.INVITATION_SYNC_STR = "invitation_sync_str";
        return InvitationListRender;
    }(SListItem));
    invitation.InvitationListRender = InvitationListRender;
})(invitation || (invitation = {}));
//# sourceMappingURL=InvitationLiseView.js.map