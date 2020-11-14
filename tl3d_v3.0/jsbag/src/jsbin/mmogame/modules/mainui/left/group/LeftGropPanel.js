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
var leftui;
(function (leftui) {
    var LeftGropCell = /** @class */ (function () {
        function LeftGropCell($panel) {
            this.panel = $panel;
        }
        LeftGropCell.prototype.setTeamMemberVo = function ($vo, $render) {
            var $str = "";
            if ($vo.state == SharedDef.GROUP_MEMBER_STATE_OFFLINE) {
                $str = ColorType.Whiteffeec9 + "离线";
            }
            else {
                if ($vo.mapid == GuidData.map.getMapID() && GuidData.map.getLineID() == $vo.lineid) {
                    $str = ColorType.Whiteffeec9 + "附近";
                }
                else {
                    $str = ColorType.Whiteffeec9 + "远离";
                }
            }
            LabelTextFont.writeSingleLabel($render.uiAtlas, this.txt.skinName, "Lv" + $vo.lev + " " + ColorType.Whitefff7db + getBaseName($vo.name) + " " + $str, 16);
        };
        LeftGropCell.prototype.show = function () {
            this.panel.setUiListVisibleByItem([this.bg, this.txt], true);
        };
        LeftGropCell.prototype.hide = function () {
            this.panel.setUiListVisibleByItem([this.bg, this.txt], false);
        };
        return LeftGropCell;
    }());
    leftui.LeftGropCell = LeftGropCell;
    var LeftGropPanel = /** @class */ (function (_super) {
        __extends(LeftGropPanel, _super);
        function LeftGropPanel() {
            var _this = _super.call(this) || this;
            _this.hasGroup = false;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.left = 40;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            return _this;
        }
        LeftGropPanel.prototype.loadAtlas = function ($bfun) {
            var _this = this;
            this.bFun = $bfun;
            this._topRender.uiAtlas.setInfo("ui/uidata/mainui/left/leftgroup/leftgroup.xml", "ui/uidata/mainui/left/leftgroup/leftgroup.png", function () { _this.loadConfigCom(); });
        };
        LeftGropPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("g_tittle_labe"));
            this.addChild(this._bottomRender.getComponent("g_list_bg"));
            this.g_no_group_label = this.addChild(this._topRender.getComponent("g_no_group_label"));
            this.g_open_group_event = this.addEvntBut("g_open_group_event", this._topRender);
            this._groupUiItem = new Array;
            for (var i = 0; i < 3; i++) {
                var $leftGropCell = new LeftGropCell(this);
                $leftGropCell.bg = this.addChild(this._midRender.getComponent("f_group_cell_bg" + i));
                $leftGropCell.txt = this.addChild(this._topRender.getComponent("f_cell_txt_" + i));
                this._groupUiItem.push($leftGropCell);
            }
            this.f_bottom_tip = this.addChild(this._topRender.getComponent("f_bottom_tip"));
            this.f_bottom_txt = this.addChild(this._topRender.getComponent("f_bottom_txt"));
            this.f_duizhang_icon = this.addChild(this._topRender.getComponent("f_duizhang_icon"));
            this.bFun && this.bFun();
        };
        LeftGropPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.g_open_group_event:
                    ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.SHOW_TEAM_PANEL));
                    break;
            }
        };
        LeftGropPanel.prototype.refrish = function () {
            this.hasGroup = false;
            this.hideGroupCell();
            if (GuidData.team) {
                this.hasGroup = true;
            }
            this.setUiListVisibleByItem([this.g_no_group_label, this.g_open_group_event], !this.hasGroup);
            this.setUiListVisibleByItem([this.f_bottom_tip, this.f_bottom_txt, this.f_duizhang_icon], this.hasGroup);
            if (this.hasGroup) {
                var $item = GuidData.team.getTeamItemAry();
                console.log($item);
                var $numid = 0;
                for (var i = 0; i < $item.length; i++) {
                    if ($item[i].guid) {
                        if (GuidData.team.getTeamLeaderGuid() == $item[i].guid) {
                            this.f_duizhang_icon.y = 170 + $numid * 43;
                        }
                        this._groupUiItem[$numid].show();
                        this._groupUiItem[$numid].setTeamMemberVo($item[i], this._bottomRender);
                        $numid++;
                    }
                }
                var $strr = ColorType.Yellowffe9b4 + " 经验加成: " + ColorType.Yellowffe9b4 + team.TeamModel.getInstance().getExp() + "%";
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.f_bottom_txt.skinName, ColorType.Yellowffe9b4 + "队员x " + $numid + $strr, 14);
            }
        };
        LeftGropPanel.prototype.hideGroupCell = function () {
            for (var i = 0; i < this._groupUiItem.length; i++) {
                this._groupUiItem[i].hide();
            }
        };
        LeftGropPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.refrish();
        };
        LeftGropPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return LeftGropPanel;
    }(UIPanel));
    leftui.LeftGropPanel = LeftGropPanel;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftGropPanel.js.map