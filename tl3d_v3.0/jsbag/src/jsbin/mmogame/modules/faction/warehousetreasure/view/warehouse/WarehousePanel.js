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
var warehousetreasure;
(function (warehousetreasure) {
    var WarehousePanel = /** @class */ (function (_super) {
        __extends(WarehousePanel, _super);
        function WarehousePanel() {
            var _this = _super.call(this) || this;
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
            return _this;
        }
        WarehousePanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.treasurehouseList) {
                this.treasurehouseList.dispose();
                this.treasurehouseList = null;
            }
        };
        WarehousePanel.prototype.initView = function ($uiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.e_shangjiao_but = this.addEvntButUp("e_shangjiao_but", this._topRender);
            this.e_txt_bg_0 = this.addChild(this._bottomRender.getComponent("e_txt_bg_0"));
            this.e_txt_bg_1 = this.addChild(this._bottomRender.getComponent("e_txt_bg_1"));
            var e_gonxian_label = this.addChild(this._topRender.getComponent("e_gonxian_label"));
            // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, e_gonxian_label.skinName, ColorType.Brown6a4936 + "贡献:", 16, TextAlign.LEFT);
            var e_cangku_num_label = this.addChild(this._topRender.getComponent("e_cangku_num_label"));
            // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, e_cangku_num_label.skinName, ColorType.Brown6a4936 + "仓库上限:", 16, TextAlign.LEFT);
            // this.e_gonxian_txt= this.addChild(this._topRender.getComponent("e_gonxian_txt"));
            // this.e_cangku_num_txt = this.addChild(this._topRender.getComponent("e_cangku_num_txt"));
            this.treasurehouseList = new warehousetreasure.WarehouseList(this, $uiAtlas);
            // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_gonxian_txt.skinName, ColorType.Orange + "99999", 16, TextAlign.CENTER);
        };
        WarehousePanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.e_shangjiao_but:
                    // ModuleEventManager.dispatchEvent(new WarehouseEvent(WarehouseEvent.SHOW_WAREHOUSE_UP_PANEL))
                    ModuleEventManager.dispatchEvent(new turnonwarehouse.TurnonWarehouseEvent(turnonwarehouse.TurnonWarehouseEvent.SHOW_TURNON_WAREHOUSE_PANEL));
                    break;
                default:
                    break;
            }
        };
        WarehousePanel.prototype.refreshWareBagList = function () {
            if (this.hasStage) {
                this.treasurehouseList.refresh();
                var $list = GuidData.faction.getFactionStorehouse();
                var $tb = faction.FactionBuildModel.getInstance().getTabvo(2);
                var $has = 0;
                for (var i = 0; i < $list.length; i++) {
                    if ($list[i]) {
                        $has++;
                    }
                }
                // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_cangku_num_txt.skinName, ColorType.Orange853d07 + $has+"/" + $tb.params[0], 16, TextAlign.CENTER);
                UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.e_txt_bg_0.skinName, [String(-1), $has + "/" + $tb.params[0]], ColorType.Orange853d07, 100, 20);
                UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.e_txt_bg_1.skinName, [6, GuidData.player.getResTypeStr(6)], ColorType.Orange853d07, 83, 20);
                // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_gonxian_txt.skinName, String(GuidData.player.getResTypeStr(6)), 16, TextAlign.CENTER, ColorType.Orange853d07);
            }
        };
        WarehousePanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.treasurehouseList.show();
                this.refreshWareBagList();
            }
        };
        WarehousePanel.prototype.hide = function () {
            this.treasurehouseList.hide();
            UIManager.getInstance().removeUIContainer(this);
            ModuleEventManager.dispatchEvent(new turnonwarehouse.TurnonWarehouseEvent(turnonwarehouse.TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL));
        };
        WarehousePanel.prototype.getListItem = function () {
            var $ary = GuidData.faction.getFactionStorehouseLog();
            var $backAry = new Array;
            for (var i = $ary.length - 1; i >= 0; i--) {
                var item = new SListItemData;
                item.data = this.getListStr($ary[i]);
                item.id = $backAry.length;
                ;
                $backAry.push(item);
            }
            return $backAry;
        };
        WarehousePanel.prototype.getListStr = function ($str) {
            //·玩家将道具放入仓库，显示：【玩家名称】将【装备名称】放入仓库					0| playerName | entry
            //·玩家将道具从仓库取出，显示：【玩家名称】将【道具名称】从仓库取出				1| playerName | entry
            //·系统将道具放入仓库，显示：系统奖励 【道具名称】								2 | entry
            //·装备销毁，显示：【玩家名称】将【道具名称】销毁 获得家族资金【N】	
            var $arr = $str.split("|");
            var $showStr = $str;
            switch (Number($arr[0])) {
                case 0:
                    $showStr = getBaseName($arr[1]) + "将" + this.getEquName($arr[2]) + "放入仓库";
                    break;
                case 1:
                    $showStr = getBaseName($arr[1]) + "将" + this.getEquName($arr[2]) + "从仓库取出";
                    break;
                case 2:
                    $showStr = "系统奖励" + this.getEquName($arr[1]);
                    break;
                case 3:
                    $showStr = getBaseName($arr[1]) + "将" + this.getEquName($arr[2]) + "销毁 获得家族资金" + ColorType.Green56da35 + $arr[3];
                    break;
                default:
                    $showStr = $str;
                    break;
            }
            return ColorType.Orange853d07 + $showStr;
        };
        WarehousePanel.prototype.getEquName = function ($idStr) {
            var $tb = tb.TB_item_template.get_TB_item_template(Number($idStr));
            var $str = "[" + tb.TB_item_quality_color.getTempVo($tb.quality).color + "]";
            return $str + " " + $tb.name + " " + ColorType.Orange853d07;
        };
        return WarehousePanel;
    }(UIVirtualContainer));
    warehousetreasure.WarehousePanel = WarehousePanel;
})(warehousetreasure || (warehousetreasure = {}));
//# sourceMappingURL=WarehousePanel.js.map