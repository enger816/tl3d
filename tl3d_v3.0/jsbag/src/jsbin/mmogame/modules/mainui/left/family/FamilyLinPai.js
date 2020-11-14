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
    var FamilyLinPai = /** @class */ (function (_super) {
        __extends(FamilyLinPai, _super);
        function FamilyLinPai() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FamilyLinPai.prototype.makeUi = function () {
            this.rect = new Rectangle(0, 0, 256, 70);
            this.a_bg = this._topRender.getComponent("a_bg");
            this.uiList.push(this.a_bg);
            this.a_xiaoguai_label = this._topRender.getComponent("a_xiaoguai_label");
            this.uiList.push(this.a_xiaoguai_label);
            this.a_jifen_num = this._topRender.getComponent("a_jifen_num");
            this.uiList.push(this.a_jifen_num);
            this.baseNum = 1000;
            _super.prototype.makeUi.call(this);
        };
        FamilyLinPai.prototype.refresh = function () {
            if (GuidData.faction) {
                var $token_points = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev()).token_points;
                var $bossCur = GuidData.faction.getBosschallengeidCur();
                var $tokenPointStr = "当前积分:" + String(GuidData.faction.getBossTokenPoints()) + "/" + $token_points;
                var $strInfo = "";
                this.modelType = 0;
                if ($bossCur == 0) {
                    if (this.isFullLinPai()) {
                        this.modelType = 1;
                    }
                    else {
                        if (this.getShenyuLinPai() == 0) {
                            if (GuidData.faction.getBossTokenNum() > 0) {
                                this.modelType = 2;
                            }
                            else {
                                this.modelType = 3;
                            }
                        }
                        else {
                            this.modelType = 4;
                        }
                    }
                }
                else {
                    this.modelType = 5;
                }
                switch (this.modelType) {
                    case 1:
                        $strInfo = "当前令牌已满！";
                        $tokenPointStr = ColorType.Green56da35 + "前往[00ff00]召唤BOSS";
                        break;
                    case 2:
                        $strInfo = "前往召唤 BOSS[]";
                        $tokenPointStr = "请明日再来获取令牌";
                        break;
                    case 3:
                        $strInfo = "今日可获得令牌都于用完";
                        $tokenPointStr = "请明日再来获取令牌";
                        break;
                    case 4:
                        $strInfo = "击杀" + ColorType.colorce0a00 + "家族小怪[],获得BOSS令牌";
                        break;
                    case 5:
                        $strInfo = "家族正在挑战BOSS，请前往";
                        break;
                    default:
                        break;
                }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_xiaoguai_label.skinName, ColorType.Yellowffe9b4 + $strInfo, 14 * 1.5, TextAlign.LEFT, ColorType.Yellowffe9b4, "#27262e", 4);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_jifen_num.skinName, ColorType.Yellowffe9b4 + $tokenPointStr, 14 * 1.5, TextAlign.LEFT, ColorType.Yellowffe9b4, "#27262e", 4);
                // //console.log("身上有", GuidData.faction.getBossTokenNum(), "剩余", $residue,"   现有", GuidData.faction.getBossTokenPointscount())
            }
        };
        FamilyLinPai.prototype.mouseClik = function () {
            var _this = this;
            switch (this.modelType) {
                case 4:
                case 5:
                    var item = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), new Vector2D(132, 93));
                    AotuSkillManager.getInstance().aotuWalk = true;
                    MainCharControlModel.getInstance().setWalkPathFun(item, function () { _this.walkPathComplete(); });
                    break;
                case 3:
                case 2:
                case 1:
                    ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.SHOW_BOSS_EVENT));
                    break;
                default:
                    break;
            }
            //console.log(this.modelType)
        };
        FamilyLinPai.prototype.walkPathComplete = function () {
            AotuSkillManager.getInstance().aotuWalk = false;
            AotuSkillManager.getInstance().aotuBattle = true;
        };
        return FamilyLinPai;
    }(leftui.FamilyLeftUiVo));
    leftui.FamilyLinPai = FamilyLinPai;
})(leftui || (leftui = {}));
//# sourceMappingURL=FamilyLinPai.js.map