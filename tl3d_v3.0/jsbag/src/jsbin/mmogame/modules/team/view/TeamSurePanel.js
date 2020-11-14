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
var team;
(function (team) {
    var MemberCell = /** @class */ (function () {
        function MemberCell() {
        }
        MemberCell.prototype.visiable = function () {
            this.parent.setUiListVisibleByItem([this.icon, this.name, this.lev, this.state], true);
        };
        MemberCell.prototype.unvisiable = function () {
            this.parent.setUiListVisibleByItem([this.icon, this.name, this.lev, this.state], false);
        };
        MemberCell.prototype.setX = function ($posx) {
            this.icon.x = $posx;
            this.icon.y = 189;
            this.name.x = this.icon.x - 16;
            this.name.y = 257;
            this.lev.x = this.icon.x - 16;
            this.lev.y = 278;
            this.state.x = this.icon.x + 44;
            this.state.y = 224;
        };
        MemberCell.prototype.draw = function ($cell) {
            this.drawImg(getTouPic($cell.icon), this.icon);
            this.drawTxt(this.name, ColorType.Brown7a2f21 + getBaseName($cell.name));
            this.drawTxt(this.lev, ColorType.Green2ca937 + "Lv " + $cell.lev);
            this.state.goToAndStop($cell.response);
        };
        MemberCell.prototype.drawImg = function ($url, $ui) {
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $toRect.width, $toRect.height);
                $ui.drawToCtx($ui.uiRender.uiAtlas, $ctx);
            });
        };
        MemberCell.prototype.drawTxt = function ($ui, $txt) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $txt, 16);
            $ui.drawToCtx($ui.uiRender.uiAtlas, $ctx);
        };
        return MemberCell;
    }());
    team.MemberCell = MemberCell;
    var TeamSurePanel = /** @class */ (function (_super) {
        __extends(TeamSurePanel, _super);
        function TeamSurePanel() {
            var _this = _super.call(this) || this;
            _this._refusehide = 0;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        TeamSurePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/team/teamsure.xml", "ui/uidata/team/teamsure.png", function () { _this.loadConfigCom(); });
        };
        TeamSurePanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_title"));
            this.a_info = this.addChild(this._topRender.getComponent("a_info"));
            this.cellAry = new Array;
            for (var i = 0; i < 3; i++) {
                var cell = new MemberCell;
                cell.parent = this;
                var icon = this._midRender.getComponent("a_icon");
                icon.goToAndStop(i);
                cell.icon = icon;
                var a_name = this._midRender.getComponent("a_name");
                a_name.goToAndStop(i);
                cell.name = a_name;
                var a_lev = this._midRender.getComponent("a_lev");
                a_lev.goToAndStop(i);
                cell.lev = a_lev;
                cell.state = this._midRender.getComponent("a_state");
                this.cellAry.push(cell);
            }
            this.btnAry = new Array;
            this.a_nobtn = this.addEvntButUp("a_nobtn", this._topRender);
            this.a_okbtn = this.addEvntButUp("a_okbtn", this._topRender);
            this.btnAry.push(this.a_nobtn);
            this.btnAry.push(this.a_okbtn);
            this._tickFun = function (t) { _this.tickRefreshState(t); };
            this.applyLoadComplete();
        };
        TeamSurePanel.prototype.tickRefreshState = function (t) {
            var $time = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                // console.log("刷新", $time);
                var str;
                if (this._select) {
                    str = ColorType.Redd92200 + $time + ColorType.color4392ff + "秒后默认选择同意";
                }
                else {
                    str = ColorType.color4392ff + "请等待...";
                }
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_info.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                if (!this._refused) {
                    this._refusehide++;
                }
                if ($time < 0 || this._refusehide % 3 == 2) {
                    this.hide();
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
            }
        };
        TeamSurePanel.prototype.refresh = function () {
            this._refused = true;
            var memberary = GuidData.team.getTeamItemAry();
            var ary = new Array;
            for (var i = 0; i < memberary.length; i++) {
                if (memberary[i].guid != "") {
                    ary.push(memberary[i]);
                }
            }
            for (var index = 0; index < 3; index++) {
                if (index < ary.length) {
                    this.cellAry[index].visiable();
                    this.cellAry[index].draw(ary[index]);
                    if (ary.length == 2) {
                        this.cellAry[index].setX(365 + index * 167);
                    }
                    else {
                        this.cellAry[index].setX(291 + index * 167);
                    }
                    var flag = ary[index].response == SharedDef.GROUP_MEMBER_RESPONSE_STATE_NONE;
                    var flag1 = ary[index].response != SharedDef.GROUP_MEMBER_RESPONSE_STATE_DECLINE;
                    if (ary[index].guid == GuidData.player.getGuid()) {
                        //isme
                        this._select = flag;
                        this.setUiListVisibleByItem(this.btnAry, this._select);
                    }
                    this._refused = this._refused && flag1;
                }
                else {
                    this.cellAry[index].unvisiable();
                }
            }
        };
        TeamSurePanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.refresh();
            this._refusehide = 0;
            this._endtime = 16 * 1000 + TimeUtil.getTimer();
            TimeUtil.addFrameTick(this._tickFun);
        };
        TeamSurePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_nobtn:
                    NetManager.getInstance().protocolos.select_group_enter(0);
                    break;
                case this.a_okbtn:
                    NetManager.getInstance().protocolos.select_group_enter(1);
                    break;
                default:
                    break;
            }
        };
        TeamSurePanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return TeamSurePanel;
    }(PopWindowMin));
    team.TeamSurePanel = TeamSurePanel;
})(team || (team = {}));
//# sourceMappingURL=TeamSurePanel.js.map