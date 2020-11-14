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
var fb;
(function (fb) {
    var FubenLeftBossPanel = /** @class */ (function (_super) {
        __extends(FubenLeftBossPanel, _super);
        function FubenLeftBossPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.hideOrShow = true;
            _this.useFrameItem = new Array();
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.left = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this._midRender.uiAtlas.setInfo("ui/uidata/fuben/left/fubenleft.xml", "ui/uidata/fuben/left/fubenleft.png", function () { _this.loadConfigCom(); });
            return _this;
            //this.upDataFun = (t: number) => { this.update(t) }
        }
        FubenLeftBossPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.a_top_bg = this.addChild(this._bottomRender.getComponent("a_top_bg"));
            this.a_mid_bg = this.addChild(this._bottomRender.getComponent("a_mid_bg"));
            this.a_bottom_bg = this.addChild(this._bottomRender.getComponent("a_bottom_bg"));
            this.a_tittle_name = this.addChild(this._topRender.getComponent("a_tittle_name"));
            this.a_mid_bg.addEventListener(InteractiveEvent.Down, this.midClick, this);
            // this._bossList = new Array;
            // var ary: Array<SListItemData> = sboss.SbossModel.getInstance().getItemData();
            // for (var i: number = 0; i < ary.length; i++) {
            //     var ui: FrameCompenent = this.getEmptyFrameUi();
            //     this._bossList.push(ui);
            // }
            var $th = this.useFrameItem.length * 22;
            $th += 5;
            this.a_bottom_bg.y = this.getBasyTy() + $th;
            this.a_mid_bg.height = this.a_bottom_bg.y - this.a_top_bg.y - this.a_top_bg.height;
            this.uiAtlasComplet = true;
            this.refresh();
        };
        FubenLeftBossPanel.prototype.midClick = function ($e) { };
        FubenLeftBossPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                this.drawReward();
            }
        };
        //private refresnum: number = 0;
        //private hasMoreReward: boolean = false;
        FubenLeftBossPanel.prototype.drawReward = function () {
            //this.hasMoreReward = rewardObj.morereward;
            //var $reward: Array<Array<number>> = rewardObj.reward;
            // for (var i: number = 0; i < 3; i++) {
            //     var $ui: UICompenent = this["a_reward_icon_" + i];
            //     $ui.y = 255;
            //     if ($reward[i]) {
            //         IconManager.getInstance().drawItemIcon40($ui, $reward[i][0], $reward[i][1]);
            //         $ui.x = 12 + i * 60;
            //     } else {
            //         $ui.x = -200;
            //     }
            // }
            //LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_reward_name.skinName, ColorType.Yellowffe9b4 + rewardObj.name, 14 * 1.5, TextAlign.LEFT);
            this.refreshQuestList();
            //var floorID: number = GuidData.map.getFloorNum();
            var nameStr = tb.TB_map.getTB_map(GuidData.map.getMapID()).name;
            // if (rewardObj.lev) {
            //     nameStr += "[第" + rewardObj.lev + "关]";
            // }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_tittle_name.skinName, ColorType.Yellowffd500 + nameStr, 14 * 1.5, TextAlign.LEFT);
        };
        FubenLeftBossPanel.prototype.refreshQuestList = function () {
            if (this.uiAtlasComplet) {
                //var info: Array<SListItemData> = sboss.SbossModel.getInstance().getItemData();
                // for (var i: number = 0; i < this._bossList.length; i++) {
                //     this.drawFrontToFrame(this._bossList[i], ColorType.Yellowffe9b4 + "boss" + i);
                // }
                this.useFrameItem.length = 0;
                var ary = sboss.SbossModel.getInstance().getItemData();
                for (var i = 0; i < ary.length; i++) {
                    var ui = this.getEmptyFrameUi();
                    var entry = ary[i].data.tb.bossEntry;
                    var obj = tb.TB_creature_template.get_TB_creature_template(entry);
                    this.drawFrontToFrame(ui, ColorType.Yellowffe9b4 + obj.name + "  Lv." + obj.level);
                }
                var $th = this.useFrameItem.length * 22;
                $th += 5;
                this.a_bottom_bg.y = this.getBasyTy() + $th;
                this.a_mid_bg.height = this.a_bottom_bg.y - this.a_top_bg.y - this.a_top_bg.height;
            }
        };
        FubenLeftBossPanel.prototype.getBasyTy = function () {
            return this.a_top_bg.y + 25;
        };
        //private timeUiFrame: FrameCompenent
        FubenLeftBossPanel.prototype.drawFrontToFrame = function ($ui, $str) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 14 * 1.5, 0, 0, TextAlign.LEFT);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        FubenLeftBossPanel.prototype.getEmptyFrameUi = function () {
            var $ui = this.addChild(this._topRender.getComponent("a_task_frame"));
            $ui.goToAndStop(this.useFrameItem.length);
            $ui.y = this.getBasyTy() + this.useFrameItem.length * 22;
            this.useFrameItem.push($ui);
            return $ui;
        };
        // private clearFrameItem(): void {
        //     while (this.useFrameItem.length) {
        //         this.removeChild(this.useFrameItem.pop());
        //     }
        // }
        FubenLeftBossPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return FubenLeftBossPanel;
    }(UIConatiner));
    fb.FubenLeftBossPanel = FubenLeftBossPanel;
})(fb || (fb = {}));
//# sourceMappingURL=FubenLeftBossPanel.js.map