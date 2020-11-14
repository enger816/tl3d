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
var kuafu;
(function (kuafu) {
    var WaitListRoleUi = /** @class */ (function () {
        function WaitListRoleUi() {
        }
        return WaitListRoleUi;
    }());
    kuafu.WaitListRoleUi = WaitListRoleUi;
    var KuaFu3v3MatchListPanel = /** @class */ (function (_super) {
        __extends(KuaFu3v3MatchListPanel, _super);
        function KuaFu3v3MatchListPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.updateFun = function (t) { _this.update(t); };
            return _this;
        }
        KuaFu3v3MatchListPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        KuaFu3v3MatchListPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/matchlist3v3.xml", "ui/uidata/kuafu/3v3/matchlist3v3.png", function () { _this.loadConfigCom(); });
        };
        KuaFu3v3MatchListPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("d_bg"));
            this.addChild(this._topRender.getComponent("d_3v3_title"));
            this.d_but0 = this.addEvntBut("d_but0", this._midRender);
            this.d_but1 = this.addEvntBut("d_but1", this._midRender);
            this.d_end_txt = this.addChild(this._topRender.getComponent("d_end_txt"));
            this.d_enabel_mask0 = this._topRender.getComponent("d_enabel_mask0");
            this.d_enabel_mask1 = this._topRender.getComponent("d_enabel_mask1");
            this.roleUiList = new Array();
            for (var i = 0; i < 6; i++) {
                var $temp = new WaitListRoleUi();
                $temp.pic = this.addChild(this._topRender.getComponent("d_role_icon" + i));
                $temp.txt = this.addChild(this._topRender.getComponent("d_role_name" + i));
                this.roleUiList.push($temp);
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();
        };
        KuaFu3v3MatchListPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                var $tw = 100;
                var $vo = kuafu.KuaFu3v3Model.getInstance().wait_info_vo;
                var $len = $vo.list.length;
                for (var i = 0; i < $len; i++) {
                    var $waitListRoleUi = this.roleUiList[i];
                    $waitListRoleUi.pic.x = 480 - ($len * ($tw / 2)) + (i * $tw) - ($waitListRoleUi.pic.width / 2) + $tw / 2;
                    $waitListRoleUi.txt.x = this.roleUiList[i].pic.x - 5;
                    $waitListRoleUi.txt.y = this.roleUiList[i].pic.y + this.roleUiList[i].pic.height;
                    this.drawRole($waitListRoleUi, $vo.list[i]);
                }
            }
        };
        KuaFu3v3MatchListPanel.prototype.drawRole = function ($uiVo, $wait_info) {
            var _this = this;
            var $color = "[d6e7ff]";
            if ($wait_info.state == -1) {
                $color = "[ff0000]";
            }
            if ($wait_info.state == 1 || $wait_info.state == 11 || $wait_info.state == 2 || $wait_info.state == 12) {
                $color = "[00ff00]";
            }
            var $roleName = getBaseName($wait_info.name);
            var $picUrl = "ui/tou/2.png";
            if ($wait_info.name == GuidData.player.getName()) {
                $roleName = getBaseName(GuidData.player.getName());
                $picUrl = getTouPic(GuidData.player.getCharType());
            }
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, $uiVo.txt.skinName, $color + $roleName, 16, TextAlign.CENTER);
            IconManager.getInstance().getIcon($picUrl, function ($img) {
                var $skillrec = _this._topRender.uiAtlas.getRec($uiVo.pic.skinName);
                var $ctx = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                $ctx.drawImage($img, 1, 1, $skillrec.pixelWitdh - 2, $skillrec.pixelHeight - 2);
                if ($color == "[00ff00]") {
                    UiDraw.cxtDrawImg($ctx, PuiData.A_gou, new Rectangle(10, 10, 38, 38), UIData.publicUi);
                }
                if ($color == "[ff0000]") {
                    UiDraw.cxtDrawImg($ctx, PuiData.A_cha, new Rectangle(10, 10, 38, 38), UIData.publicUi);
                }
                UiDraw.cxtDrawImg($ctx, PuiData.A_BLACK_C, new Rectangle(0, 0, 69, 69), UIData.publicUi);
                _this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
            });
        };
        KuaFu3v3MatchListPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.d_but0:
                    this.hide();
                    //console.log("拒绝")
                    NetManager.getInstance().protocolos.kuafu_3v3_match_oper(0);
                    break;
                case this.d_but1:
                    this.d_but1.selected = true;
                    this.d_but1.enable = false;
                    this.d_but0.enable = false;
                    this.d_but0.selected = true;
                    this.setUiListVisibleByItem([this.d_enabel_mask0, this.d_enabel_mask1], true);
                    //console.log("接受")
                    NetManager.getInstance().protocolos.kuafu_3v3_match_oper(1);
                    break;
                default:
                    break;
            }
        };
        KuaFu3v3MatchListPanel.prototype.update = function (t) {
            var $time = Math.floor((this._endTime - TimeUtil.getTimer()) / 1000);
            if ($time > 0) {
                var $vo = kuafu.KuaFu3v3Model.getInstance().wait_info_vo;
                var $need = false;
                for (var i = 0; i < $vo.list.length; i++) {
                    if ($vo.list[i].state != 2) {
                        $need = true;
                    }
                }
                if ($need) {
                    ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_end_txt.skinName, String($time), ArtFont.num1, TextAlign.CENTER);
                }
            }
            else {
                this.hide();
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.updateFun);
            }
        };
        KuaFu3v3MatchListPanel.prototype.show = function () {
            if (!this.hasStage) {
                this._endTime = TimeUtil.getTimer() + 60 * 1000;
                UIManager.getInstance().addUIContainer(this);
                TimeUtil.addFrameTick(this.updateFun);
                this.d_but1.selected = false;
                this.d_but1.enable = true;
                this.d_but0.enable = true;
                this.d_but0.selected = false;
                this.setUiListVisibleByItem([this.d_enabel_mask0, this.d_enabel_mask1], false);
            }
            this.refresh();
        };
        KuaFu3v3MatchListPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return KuaFu3v3MatchListPanel;
    }(UIPanel));
    kuafu.KuaFu3v3MatchListPanel = KuaFu3v3MatchListPanel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3MatchListPanel.js.map