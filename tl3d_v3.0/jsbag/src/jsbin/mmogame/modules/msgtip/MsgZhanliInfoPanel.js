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
var msgtip;
(function (msgtip) {
    var MsgZhanliInfoPanel = /** @class */ (function (_super) {
        __extends(MsgZhanliInfoPanel, _super);
        function MsgZhanliInfoPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        MsgZhanliInfoPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/msg/zhanli.xml", "ui/uidata/msg/zhanli.png", function () { _this.loadConfigCom(); });
        };
        MsgZhanliInfoPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this.b_info_bg = this.addChild(this._bottomRender.getComponent("b_info_bg"));
            this.applyLoadComplete();
        };
        MsgZhanliInfoPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        MsgZhanliInfoPanel.prototype.getBaseData = function () {
            var $arr = new Array;
            var $len = random(12);
            for (var i = 0; i < $len; i++) {
                $arr.push(new Vector2D(random(30), random(1000)));
            }
            return $arr;
        };
        MsgZhanliInfoPanel.prototype.setData = function ($arr) {
            //  $arr = this.getBaseData()
            //console.log($arr)
            var _this = this;
            this.clearNameItem();
            this.clearTxtItem();
            //public static PLAYER_FIELD_MAX_HEALTH: number = 17;	// 最大生命
            //public static PLAYER_FIELD_DAMAGE: number = 19;	// 攻击力
            //public static PLAYER_FIELD_ARMOR: number = 21;	// 防御力
            //public static PLAYER_FIELD_HIT: number = 23;	// 命中
            //public static PLAYER_FIELD_MISS: number = 25;	// 闪避
            //public static PLAYER_FIELD_CRIT: number = 27;	// 暴击
            //public static PLAYER_FIELD_TOUGH: number = 29;	// 坚韧
            //public static PLAYER_FIELD_ATTACK_SPEED: number = 31;	// 攻击速度
            //public static PLAYER_FIELD_MOVE_SPEED: number = 33;	// 移动速度
            //public static PLAYER_FIELD_IGNORE_ARMOR: number = 35;	// 忽视防御
            //public static PLAYER_FIELD_IGNORE_MISS: number = 37;	// 忽视闪避
            //public static PLAYER_FIELD_RECOVERY: number = 39;	// 生命值回复
            //public static PLAYER_FIELD_DAMAGE_AMPLIFY_RATE: number = 41;	// 伤害加深(万分比)
            //public static PLAYER_FIELD_DAMAGE_RESIST_RATE: number = 43;	// 伤害减免(万分比)
            //public static PLAYER_FIELD_DAMAGE_RETURN_RATE: number = 45;	// 反弹伤害(万分比)
            //public static PLAYER_FIELD_VAMPIRIC_RATE: number = 47;	// 吸血光环(万分比)
            //public static PLAYER_FIELD_RECOVERY_RATE: number = 49;	// 回复效率(万分比)
            //public static PLAYER_FIELD_CRIT_RATE: number = 51;	// 暴击率(万分比)
            //public static PLAYER_FIELD_CRIT_RESIST_RATE: number = 53;	// 抗暴率(万分比)
            //public static PLAYER_FIELD_CRIT_DAM_RATE: number = 55;	// 暴击伤害倍数(万分比)
            //public static PLAYER_FIELD_CRIT_RESIST_DAM_RATE: number = 57;	// 降暴伤害倍数(万分比)
            //public static PLAYER_FIELD_HIT_RATE: number = 59;	// 命中率(万分比)
            //public static PLAYER_FIELD_MISS_RATE: number = 61;	// 闪避率(万分比)
            //public static PLAYER_FIELD_STUN_RATE: number = 63;	// 眩晕
            //public static PLAYER_FIELD_ROOTS_RATE: number = 65;	// 定身
            //public static PLAYER_FIELD_SILENCE_RATE: number = 67;	// 沉默
            //public static PLAYER_FIELD_CHAOS_RATE: number = 69;	// 混乱
            //public static PLAYER_FIELD_CHARM_RATE: number = 71;	// 魅惑
            //public static PLAYER_FIELD_CONTROL_ENHANCE_RATE: number = 73;	// 控制增强
            //public static PLAYER_FIELD_CONTROL_RESIST_RATE: number = 75;	// 控制减免
            for (var i = 0; i < $arr.length && i < 12; i++) {
                var b_cell_name = this.addChild(this._midRender.getComponent("b_cell_name"));
                b_cell_name.y += i * 25;
                b_cell_name.goToAndStop(i);
                var $frameid = $arr[i].x - 1;
                this.cellNameItem.push(b_cell_name);
                this.drawCellNameToStr(b_cell_name, ColorType.Yellowffe9b4 + getKeyProById($arr[i].x));
                var b_cell_txt = this.addChild(this._midRender.getComponent("b_cell_txt"));
                b_cell_txt.y += i * 25;
                b_cell_txt.goToAndStop(i);
                this.cellTextItem.push(b_cell_txt);
                this.drawTextToName(b_cell_txt, $arr[i].y, $frameid);
            }
            this.b_info_bg.height = $arr.length * 25 + 30;
            TimeUtil.addTimeOut(2000, function () {
                _this.close();
            });
        };
        MsgZhanliInfoPanel.prototype.drawCellNameToStr = function ($ui, $str) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 16, 0, 0, TextAlign.CENTER);
            $ui.drawToCtx(this._bottomRender.uiAtlas, $ctx);
        };
        MsgZhanliInfoPanel.prototype.drawTextToName = function ($ui, $num, $id) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var $color = $num > 0 ? ArtFont.num7 : ArtFont.num6;
            var $txt;
            if ($id < 12) {
                $txt = String(Math.floor($num));
            }
            else {
                $txt = String(Math.floor($num) / 100) + "%";
            }
            if ($num > 0) {
                $txt = "+" + $txt;
            }
            var $colorKey = $num > 0 ? ColorType.Green20a200 : ColorType.Reddb4051;
            LabelTextFont.writeSingleLabelToCtx($ctx, $colorKey + $txt, 16, 0, 0, TextAlign.LEFT);
            $ui.drawToCtx(this._bottomRender.uiAtlas, $ctx);
        };
        MsgZhanliInfoPanel.prototype.clearNameItem = function () {
            while (this.cellNameItem && this.cellNameItem.length) {
                this.removeChild(this.cellNameItem.pop());
            }
            this.cellNameItem = new Array();
        };
        MsgZhanliInfoPanel.prototype.clearTxtItem = function () {
            while (this.cellTextItem && this.cellTextItem.length) {
                this.removeChild(this.cellTextItem.pop());
            }
            this.cellTextItem = new Array();
        };
        return MsgZhanliInfoPanel;
    }(UIConatiner));
    msgtip.MsgZhanliInfoPanel = MsgZhanliInfoPanel;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgZhanliInfoPanel.js.map