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
var adventuresettlement;
(function (adventuresettlement) {
    var AdventureSettlementPanel = /** @class */ (function (_super) {
        __extends(AdventureSettlementPanel, _super);
        function AdventureSettlementPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.rewardUiArr = new Array;
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
            _this.updataFun = function (t) { _this.updata(t); };
            return _this;
        }
        AdventureSettlementPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/adventuresettlement/adventuresettlement.xml", "ui/uidata/adventure/adventuresettlement/adventuresettlement.png", function () { _this.loadConfigCom(); });
        };
        AdventureSettlementPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._topRender.getComponent("a_label1"));
            this.addChild(this._topRender.getComponent("a_tittle"));
            this.addChild(this._topRender.getComponent("a_line0"));
            this.addChild(this._topRender.getComponent("a_line1"));
            this.addChild(this._bottomRender.getComponent("a_reward_bg"));
            this.a_close_time = this.addChild(this._topRender.getComponent("a_close_time"));
            this.a_get_but = this.addEvntBut("a_get_but", this._bottomRender);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        AdventureSettlementPanel.prototype.butClik = function (evt) {
            this.hide();
            switch (evt.target) {
                case this.a_get_but:
                    break;
                default:
                    break;
            }
        };
        AdventureSettlementPanel.prototype.refresh = function () {
            var $rewardStr = GuidData.map.getVipInstanceFieldReward();
            //console.log("奖励：",$rewardStr);
            if ($rewardStr.length < 1) {
                $rewardStr = "2001:1,2002:1,2003:1,2004:1,2005:1,2006:1,2007:2,2008:1";
                return;
            }
            var $arr = $rewardStr.split(",");
            this.clearRewardUi();
            for (var i = 0; i < $arr.length; i++) {
                var rwid = $arr[i].split(":");
                var $ui = this.addChild(this._topRender.getComponent("a_reward_icon"));
                $ui.goToAndStop(i);
                $ui.x += (i % 4) * 100;
                $ui.y += Math.floor(i / 4) * 100;
                this.rewardUiArr.push($ui);
                this.drawRewardIconCtx($ui, Number(rwid[0]), Number(rwid[1]));
            }
            /*
            for (var i: number = 0; i < 10; i++) {
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("a_reward_icon"));
                $ui.goToAndStop(i)
                $ui.x += (i % 4) * 60;
                $ui.y += Math.floor(i / 4) * 60;
                this.rewardUiArr.push($ui);
                this.drawRewardIconCtx($ui, 3, 100);
            }
            */
        };
        AdventureSettlementPanel.prototype.drawRewardIconCtx = function ($ui, $id, $num) {
            var _this = this;
            $ui.data = $id;
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($id), function ($img) {
                var $skillrec = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
                UiDraw.cxtDrawImg($ctx, PuiData.NewPicBg, new Rectangle(10, 0, 70, 70), UIData.publicUi);
                $ctx.drawImage($img, 0, 0, 60, 60, 16, 6, 58, 58);
                //  ArtFont.getInstance().writeFontToCtxRight($ctx, String($num), ArtFont.num1, 50, 35)
                var $name = tb.TB_item_template.get_TB_item_template($id).getColorName();
                LabelTextFont.writeSingleLabelToCtx($ctx, $name, 15, 50 - 5, 76, TextAlign.CENTER);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        AdventureSettlementPanel.prototype.clearRewardUi = function () {
            while (this.rewardUiArr.length) {
                this.removeChild(this.rewardUiArr.pop());
            }
        };
        AdventureSettlementPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addFrameTick(this.updataFun);
            this.refresh();
            //console.log("添加时间事件")
        };
        AdventureSettlementPanel.prototype.updata = function (t) {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.updataFun);
                //console.log("移除事件")
            }
            else {
                if (this.endTime > TimeUtil.getTimer()) {
                    var $tn = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
                    var $timeStr = ColorType.Whiteffffff + Math.min($tn, 9);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_close_time.skinName, $timeStr, 16);
                }
            }
        };
        AdventureSettlementPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return AdventureSettlementPanel;
    }(WindowCentenMin));
    adventuresettlement.AdventureSettlementPanel = AdventureSettlementPanel;
})(adventuresettlement || (adventuresettlement = {}));
//# sourceMappingURL=AdventureSettlementPanel.js.map