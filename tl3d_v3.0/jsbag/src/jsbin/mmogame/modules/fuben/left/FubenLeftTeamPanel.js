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
    var FubenLeftTeamPanel = /** @class */ (function (_super) {
        __extends(FubenLeftTeamPanel, _super);
        function FubenLeftTeamPanel() {
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
        FubenLeftTeamPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.a_top_bg = this.addChild(this._bottomRender.getComponent("a_top_bg"));
            this.a_mid_bg = this.addChild(this._bottomRender.getComponent("a_mid_bg"));
            this.a_bottom_bg = this.addChild(this._bottomRender.getComponent("a_bottom_bg"));
            this.a_tittle_name = this.addChild(this._topRender.getComponent("a_tittle_name"));
            this.a_mid_bg.addEventListener(InteractiveEvent.Down, this.midClick, this);
            this._labNum = this.getEmptyFrameUi();
            this._labExp = this.getEmptyFrameUi();
            this._labDamBuff = this.getEmptyFrameUi();
            this._labExpBuff = this.getEmptyFrameUi();
            this._labTeamBuff = this.getEmptyFrameUi();
            var $th = this.useFrameItem.length * 22;
            $th += 5;
            this.a_bottom_bg.y = this.getBasyTy() + $th;
            this.a_mid_bg.height = this.a_bottom_bg.y - this.a_top_bg.y - this.a_top_bg.height;
            this.uiAtlasComplet = true;
            var obj = TableData.getInstance().getData(TableData.tb_buff_base, 1);
            this.expBuffID = obj.exp;
            this.refresh();
        };
        FubenLeftTeamPanel.prototype.midClick = function ($e) { };
        FubenLeftTeamPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                this.drawReward();
            }
        };
        //private refresnum: number = 0;
        //private hasMoreReward: boolean = false;
        FubenLeftTeamPanel.prototype.drawReward = function () {
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
        FubenLeftTeamPanel.prototype.refreshQuestList = function () {
            if (this.uiAtlasComplet) {
                var info = GuidData.map.getExpFubenInfo();
                this.drawFrontToFrame(this._labNum, ColorType.Yellowffe9b4 + "累计杀怪：" + info.num);
                this.drawFrontToFrame(this._labExp, ColorType.Yellowffe9b4 + "经验获得：" + info.exp);
                this.drawFrontToFrame(this._labDamBuff, ColorType.Yellowffe9b4 + "伤害鼓舞加成：" + info.eff + "%");
                //GameInstance.mainChar.unit.buffUnit.getBuffByID()
                var buffInfo = GameInstance.mainChar.unit.buffUnit.getBuffByID(this.expBuffID);
                var expVal = 0;
                if (buffInfo && buffInfo.effectid) {
                    var obj = TableData.getInstance().getData(TableData.tb_buff_effect, buffInfo.effectid);
                    expVal = obj.value;
                }
                this.drawFrontToFrame(this._labExpBuff, ColorType.Yellowffe9b4 + "药水经验加成：" + expVal + "%");
            }
        };
        FubenLeftTeamPanel.prototype.getBasyTy = function () {
            return this.a_top_bg.y + 25;
        };
        //private timeUiFrame: FrameCompenent
        FubenLeftTeamPanel.prototype.drawFrontToFrame = function ($ui, $str) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 14 * 1.5, 0, 0, TextAlign.LEFT);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        FubenLeftTeamPanel.prototype.getEmptyFrameUi = function () {
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
        FubenLeftTeamPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return FubenLeftTeamPanel;
    }(UIConatiner));
    fb.FubenLeftTeamPanel = FubenLeftTeamPanel;
})(fb || (fb = {}));
//# sourceMappingURL=FubenLeftTeamPanel.js.map