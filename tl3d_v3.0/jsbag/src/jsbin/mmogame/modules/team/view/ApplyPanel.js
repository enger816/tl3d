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
    var ApplyPanel = /** @class */ (function (_super) {
        __extends(ApplyPanel, _super);
        function ApplyPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._AtopRender1 = new UIRenderComponent;
            _this.addRender(_this._AtopRender1);
            return _this;
        }
        ApplyPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            if (this.applyTeamList) {
                this.applyTeamList.dispose();
                this.applyTeamList = null;
            }
            _super.prototype.dispose.call(this);
        };
        ApplyPanel.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas = new UIAtlas();
            this._bgRender.uiAtlas.setInfo("ui/uidata/team/apply.xml", "ui/uidata/team/apply.png", function () { _this.loadConfigCom(); }, "ui/uidata/team/teampc.png");
        };
        ApplyPanel.prototype.loadConfigCom = function () {
            this._AtopRender1.uiAtlas = this._bgRender.uiAtlas;
            this.addUIList(["a_title", "a_basebg"], this._bgRender);
            this.addUIList(["a_txt1", "a_line0", "a_txt2", "a_line1", "a_txt3", "a_line2", "a_txt4", "a_baseline", "a_txt0"], this._AtopRender1);
            this.a_selbtn = this.addEvntBut("a_selbtn", this._AtopRender1);
            this.a_btn = this.addEvntButUp("a_btn", this._AtopRender1);
            this.a_index = this.addChild(this._AtopRender1.getComponent("a_index"));
            this.applyLoadComplete();
        };
        ApplyPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.applyTeamList) {
                this.applyTeamList.left = this.a_index.parent.x / UIData.Scale + this.a_index.x;
                this.applyTeamList.top = this.a_index.parent.y / UIData.Scale + this.a_index.y;
            }
        };
        ApplyPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var flag = GuidData.team.getTeamAutoAccept();
            this.a_selbtn.selected = flag == 1;
            if (!this.applyTeamList) {
                this.applyTeamList = new ApplyTeamList;
                this.applyTeamList.init(this._AtopRender1.uiAtlas);
            }
            this.applyTeamList.show();
            this.resize();
        };
        ApplyPanel.prototype.hide = function () {
            if (this.applyTeamList) {
                this.applyTeamList.hide();
            }
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        };
        ApplyPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
                case this.a_selbtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    NetManager.getInstance().protocolos.group_change_config(0, 0, 0, this.a_selbtn.selected ? 1 : 0);
                    break;
                case this.a_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    team.TeamModel.getInstance().removeAllApply();
                    break;
                default:
                    break;
            }
        };
        return ApplyPanel;
    }(WindowCentenMin));
    team.ApplyPanel = ApplyPanel;
    var ApplyTeamList = /** @class */ (function (_super) {
        __extends(ApplyTeamList, _super);
        function ApplyTeamList() {
            return _super.call(this) || this;
        }
        ApplyTeamList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        ApplyTeamList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, ApplyFactionRender, 350, 277, 0, 53, 5, 256, 512, 1, 8);
        };
        /**
         * refreshData
         */
        ApplyTeamList.prototype.refreshDataByNewData = function () {
            var $ary = team.TeamModel.getInstance().getApplyList();
            var $sListItemData = this.getData($ary);
            this.refreshData($sListItemData);
        };
        ApplyTeamList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        ApplyTeamList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        };
        ApplyTeamList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return ApplyTeamList;
    }(SList));
    team.ApplyTeamList = ApplyTeamList;
    var ApplyFactionRender = /** @class */ (function (_super) {
        __extends(ApplyFactionRender, _super);
        function ApplyFactionRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        ApplyFactionRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.I2zhanli = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2zhanli", 188, 20, 88, 20);
            $container.addChild(this.I2zhanli);
            this.I2name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2name", 2, 20, 100, 20);
            $container.addChild(this.I2name);
            this.I2vip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2vip", 100, 21, 29, 14);
            $container.addChild(this.I2vip);
            this.I2lev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2lev", 142, 20, 35, 20);
            $container.addChild(this.I2lev);
            this.I2btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2btn", 277, 5, 71, 46);
            $container.addChild(this.I2btn);
            this.I2bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "I2bg", 0, 0, 350, 53);
            $container.addChild(this.I2bg);
        };
        ApplyFactionRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo = $data.data;
                this.I2btn.addEventListener(InteractiveEvent.Down, this.butClik, this);
                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I2bg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.I2bg.skinName);
                }
                //名字
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2name.skinName, getBaseName(vo.name), 16, TextAlign.CENTER, ColorType.Orange853d07);
                // //vip等级
                this.uiAtlas.upDataPicToTexture(getVipIconUrl(vo.vip), this.I2vip.skinName);
                //等级
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2lev.skinName, String(vo.lev), 16, TextAlign.CENTER, ColorType.Orange853d07);
                //战力
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2zhanli.skinName, Snum(vo.force), 16, TextAlign.CENTER, ColorType.Orange853d07);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.I2btn.skinName, "ApplyOk");
            }
            else {
                this.I2btn.removeEventListener(InteractiveEvent.Down, this.butClik, this);
                this.setnull();
            }
        };
        ApplyFactionRender.prototype.setnull = function () {
            UiDraw.clearUI(this.I2zhanli);
            UiDraw.clearUI(this.I2name);
            UiDraw.clearUI(this.I2vip);
            UiDraw.clearUI(this.I2lev);
            UiDraw.clearUI(this.I2btn);
            UiDraw.clearUI(this.I2bg);
        };
        ApplyFactionRender.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.I2btn:
                    if (this.itdata && this.itdata.data) {
                        var vo = this.itdata.data;
                        NetManager.getInstance().protocolos.group_join_accept(vo.guid);
                        team.TeamModel.getInstance().popapplyList(vo);
                    }
                    break;
                default:
                    break;
            }
        };
        return ApplyFactionRender;
    }(SListItem));
    team.ApplyFactionRender = ApplyFactionRender;
})(team || (team = {}));
//# sourceMappingURL=ApplyPanel.js.map