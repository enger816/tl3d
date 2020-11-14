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
    var LeftUiPanel = /** @class */ (function (_super) {
        __extends(LeftUiPanel, _super);
        function LeftUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.openOrClose = true;
            _this.tempLeft = 0;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.left = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.leftUiQuestPanel = new leftui.LeftUiQuestPanel();
            _this.leftGropPanel = new leftui.LeftGropPanel();
            return _this;
        }
        LeftUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this.leftUiQuestPanel.loadAtlas(function () {
                _this.leftGropPanel.loadAtlas(function () {
                    _this._midRender.uiAtlas.setInfo("ui/uidata/mainui/left/left.xml", "ui/uidata/mainui/left/left.png", function () { _this.loadConfigCom(); });
                });
            });
        };
        LeftUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.a_quest = this.addEvntBut("a_state2_tab0", this._midRender);
            this.a_lilian = this.addEvntBut("a_state2_tab1", this._midRender);
            this.a_boss = this.addEvntBut("a_boss", this._midRender);
            this.a_team = this.addEvntBut("a_team", this._midRender);
            this.a_boss.x = this.a_lilian.x = this.a_quest.x;
            this.a_change = this._midRender.getComponent("a_change");
            this.a_change.addEventListener(InteractiveEvent.Up, this.changeClick, this);
            this._redPointRender.getRedPointUI(this, 123, new Vector2D(this.a_change.x + this.a_change.width - 5, this.a_change.y));
            this.a_hide_but = this.addEvntBut("a_hide_but", this._midRender);
            this.a_hide_but.left = 6;
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            mainUi.MainUiModel.mainUiLoadFinish();
        };
        LeftUiPanel.prototype.changeClick = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            var $evt = new chgfish.ChgfishEvent(chgfish.ChgfishEvent.SHOW_Chgfish_EVENT);
            $evt.data = this.a_change;
            ModuleEventManager.dispatchEvent($evt);
        };
        LeftUiPanel.prototype.refreshQuestPanel = function () {
            if (this.uiAtlasComplet) {
                this.leftUiQuestPanel.refresh();
            }
        };
        LeftUiPanel.prototype.refreshGroupPanel = function () {
            if (this.uiAtlasComplet) {
                this.leftGropPanel.refrish();
            }
        };
        LeftUiPanel.prototype.showChange = function () {
            var sysopen = GuidData.player.getsyspageopen(SharedDef.MODULE_FISH, SharedDef.MODULE_FISH_ALL);
            var redary = chgfish.ChgfishModel.getInstance().getList();
            this.setUiListVisibleByItem([this.a_change], sysopen && redary.length > 0);
        };
        LeftUiPanel.prototype.refresh = function () {
            this.showChange();
            if (GuidData.map.showAreaById(AreaType.topleftpalce_2)) {
                this.left = 0;
                this.setUiListVisibleByItem([this.a_hide_but], true);
            }
            else {
                this.left = -1000;
                this.setUiListVisibleByItem([this.a_hide_but], false);
                return;
            }
            this.setUiListVisibleByItem([this.a_team], true);
            this.setUiListVisibleByItem([this.a_lilian], GuidData.player.isOpenSystemById(SharedDef.MODULE_EXP));
            this.showTab();
            this.a_hide_but.isU = !this.openOrClose;
            if (!this.openOrClose) {
                this.pxleft = -300;
            }
            else {
                this.pxleft = 0;
            }
            this.selectTab(leftui.TaskListUi.showType);
        };
        LeftUiPanel.prototype.showTab = function () {
            /*
            if(GuidData.map.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_MASS_BOSS){
                this.removeChild(this.a_quest);
                this.addChild(this.a_boss);
                TaskListUi.showType = 2;
            }else{
                this.addChild(this.a_quest);
                this.removeChild(this.a_boss);
                TaskListUi.showType = 0;
            }
            */
        };
        LeftUiPanel.prototype.selectTab = function ($type) {
            if ($type != 3) {
                if (GuidData.map.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_MASS_BOSS) {
                    $type = 2;
                }
                else {
                    $type = 0;
                }
            }
            leftui.TaskListUi.showType = $type;
            this.a_team.selected = false;
            this.a_quest.selected = false;
            this.a_lilian.selected = false;
            this.a_boss.selected = false;
            if ($type == 0) {
                this.setUiListVisibleByItem([this.a_quest], true);
                this.setUiListVisibleByItem([this.a_lilian, this.a_boss], false);
                this.a_quest.selected = true;
                this.leftUiQuestPanel.refreshType(leftui.TaskListUi.showType);
            }
            else if ($type == 1) {
                this.setUiListVisibleByItem([this.a_lilian], true);
                this.setUiListVisibleByItem([this.a_quest, this.a_boss], false);
                this.a_lilian.selected = true;
                this.leftUiQuestPanel.refreshType(leftui.TaskListUi.showType);
            }
            else if ($type == 2) {
                this.setUiListVisibleByItem([this.a_boss], true);
                this.setUiListVisibleByItem([this.a_quest, this.a_lilian], false);
                this.a_boss.selected = true;
                this.leftUiQuestPanel.refreshType(leftui.TaskListUi.showType);
            }
            else if ($type == 3) {
                this.a_team.selected = true;
            }
            if (leftui.TaskListUi.showType == 3) {
                this.leftGropPanel.show();
                this.leftUiQuestPanel.hide();
            }
            else {
                this.leftGropPanel.hide();
                this.leftUiQuestPanel.show();
            }
        };
        LeftUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_quest:
                    this.selectTab(0);
                    break;
                case this.a_lilian:
                    this.selectTab(1);
                    break;
                case this.a_boss:
                    this.selectTab(2);
                    break;
                case this.a_team:
                    if (leftui.TaskListUi.showType == 3) {
                        this.selectTab(3);
                        ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.SHOW_TEAM_PANEL));
                    }
                    else {
                        this.selectTab(3);
                    }
                    break;
                case this.a_hide_but:
                    this.openOrClose = !this.openOrClose;
                    if (!this.openOrClose) {
                        TweenMoveTo(this, 0.2, { pxleft: -300 });
                    }
                    else {
                        TweenMoveTo(this, 0.2, { pxleft: 0 });
                    }
                    this.a_hide_but.isU = !this.openOrClose;
                    this._midRender.applyObjData();
                    break;
                default:
                    break;
            }
        };
        Object.defineProperty(LeftUiPanel.prototype, "pxleft", {
            get: function () {
                return this.tempLeft;
            },
            set: function (value) {
                this.tempLeft = value;
                this.left = this.tempLeft;
                this.leftUiQuestPanel.left = value;
                this.leftUiQuestPanel.resize();
                this.leftGropPanel.left = value + 40;
                this.leftGropPanel.resize();
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        LeftUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.refresh();
        };
        LeftUiPanel.prototype.hide = function () {
            this.leftUiQuestPanel.hide();
            this.leftGropPanel.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        return LeftUiPanel;
    }(UIPanel));
    leftui.LeftUiPanel = LeftUiPanel;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftUiPanel.js.map