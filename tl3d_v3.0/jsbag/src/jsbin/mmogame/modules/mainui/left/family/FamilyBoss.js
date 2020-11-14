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
    var FamilyBoss = /** @class */ (function (_super) {
        __extends(FamilyBoss, _super);
        function FamilyBoss() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 0;
            _this.skipNum = 0;
            return _this;
        }
        FamilyBoss.prototype.makeUi = function () {
            this.rect = new Rectangle(0, 0, 256, 70);
            this.uiList.push(this._topRender.getComponent("b_bg"));
            this.b_boss_label = this._topRender.getComponent("b_boss_label");
            this.uiList.push(this.b_boss_label);
            this.b_boss_time = this._topRender.getComponent("b_boss_time");
            this.uiList.push(this.b_boss_time);
            _super.prototype.makeUi.call(this);
        };
        FamilyBoss.prototype.refresh = function () {
            if (GuidData.faction) {
                // //console.log(GuidData.faction.getBosschallengeidCur())
                var $bossCur = GuidData.faction.getBosschallengeidCur();
                var $str1 = "";
                var $str2 = "";
                this.type = 0;
                if ($bossCur != 0) {
                    $str1 = "击杀" + ColorType.colorce0a00 + "家族BOSS[]获得奖励";
                    var $tb = tb.TB_faction_boss.get_TB_faction_bossById($bossCur);
                    var $kt = -GameInstance.getGameSecond(GuidData.faction.getBosschallengeStartTime());
                    if ($kt < $tb.wait_time) {
                        this.type = 1;
                        $str2 = "BOSS出现倒计时:" + ColorType.colorce0a00 + TimeUtil.getLocalTime3($tb.wait_time - $kt);
                    }
                    else {
                        this.type = 2;
                        $str2 = "挑战剩余时间:" + ColorType.colorce0a00 + TimeUtil.getLocalTime3(($tb.time + $tb.wait_time) - $kt);
                    }
                }
                else {
                    $str1 = "剩余家族BOSS令牌： " + GuidData.faction.getBossTokenNum();
                    if (GuidData.faction.getBossTokenNum() > 0) {
                        this.type = 3;
                        $str2 = ColorType.Green56da35 + "前往召唤BOSS[]";
                    }
                    else {
                        this.type = 4;
                        $str2 = "击杀" + ColorType.Green56da35 + "家族小怪[]收获令牌";
                    }
                }
                if (this.type == 3 || this.type == 4) {
                    if (this.getShenyuLinPai() == 0 && GuidData.faction.getBossTokenNum() == 0) {
                        //  $str1 = "[ff0000]今日令牌已用完";
                        //    $str1 = "[000000]家族BOSS令牌[00ff00]" + GuidData.faction.getBossTokenNum() + "/" + GuidData.faction.getBossTokenPointscount();
                        $str2 = "[ff0000]今日令牌已用完";
                    }
                }
                if (this.skipNum++ % 1000 == 0) {
                    //console.log("身上现在令牌", GuidData.faction.getBossTokenNum());
                    //console.log("还可以获得令牌", this.getShenyuLinPai());
                    //console.log("可以获得的总数", GuidData.faction.getBossTokenPointscount());
                    //console.log("----------------------")
                }
                if (this.b_boss_label.data != $str1) {
                    this.b_boss_label.data = $str1;
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_boss_label.skinName, ColorType.Yellowffe9b4 + $str1, 14 * 1.5, TextAlign.LEFT, ColorType.Yellowffe9b4, "#27262e", 4);
                }
                if (this.b_boss_time.data != $str2) {
                    this.b_boss_time.data = $str2;
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_boss_time.skinName, ColorType.Yellowffe9b4 + $str2, 14 * 1.5, TextAlign.LEFT, ColorType.Yellowffe9b4, "#27262e", 4);
                }
            }
        };
        FamilyBoss.prototype.mouseClik = function () {
            var _this = this;
            //console.log(this.type)
            switch (this.type) {
                case 4:
                    var item = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), new Vector2D(132, 93));
                    AotuSkillManager.getInstance().aotuWalk = true;
                    MainCharControlModel.getInstance().setWalkPathFun(item, function () { _this.walkPathComplete(); });
                    break;
                case 3:
                    ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.SHOW_BOSS_EVENT));
                    break;
                case 2:
                case 1:
                    var item = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), new Vector2D(132, 93));
                    MainCharControlModel.getInstance().setWalkPathFun(item);
                    break;
                default:
                    break;
            }
        };
        FamilyBoss.prototype.walkPathComplete = function () {
            AotuSkillManager.getInstance().aotuWalk = false;
            AotuSkillManager.getInstance().aotuBattle = true;
        };
        return FamilyBoss;
    }(leftui.FamilyLeftUiVo));
    leftui.FamilyBoss = FamilyBoss;
})(leftui || (leftui = {}));
//# sourceMappingURL=FamilyBoss.js.map