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
    var FamilyLeftUiVo = /** @class */ (function () {
        function FamilyLeftUiVo($perent, $mid, $top, $data) {
            this.id = 0;
            this._y = 0;
            this.perent = $perent;
            this._midRender = $mid;
            this._topRender = $top;
            this.id = $data;
            this.rect = new Rectangle(0, 0, 256, 100);
            this.uiList = new Array();
            this.makeUi();
            this.initBasePos();
        }
        FamilyLeftUiVo.prototype.refresh = function () {
        };
        FamilyLeftUiVo.prototype.makeUi = function () {
            this.addCellBig();
        };
        FamilyLeftUiVo.prototype.addCellBig = function () {
            var w_bg_top = this._midRender.getComponent("w_bg_top");
            var w_bg_mid = this._midRender.getComponent("w_bg_mid");
            var w_bg_bottom = this._midRender.getComponent("w_bg_bottom");
            this.uiList.push(w_bg_top);
            this.uiList.push(w_bg_mid);
            this.uiList.push(w_bg_bottom);
            w_bg_top.x = 2;
            w_bg_mid.x = 2;
            w_bg_bottom.x = 2;
            w_bg_top.y = 0;
            w_bg_mid.y = w_bg_top.height;
            w_bg_mid.height = this.rect.height - w_bg_top.height - w_bg_bottom.height;
            w_bg_bottom.y = this.rect.height - w_bg_bottom.height;
        };
        FamilyLeftUiVo.prototype.initBasePos = function () {
            this.uiBasePos = new Object();
            for (var i = 0; i < this.uiList.length; i++) {
                var $ui = this.uiList[i];
                this.uiBasePos[$ui.name] = new Vector2D($ui.x, $ui.y);
            }
        };
        FamilyLeftUiVo.prototype.get_Tb_faction_base = function () {
            return tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
        };
        //剩余可获令牌
        FamilyLeftUiVo.prototype.getShenyuLinPai = function () {
            var $tb = this.get_Tb_faction_base();
            return $tb.token_daily - GuidData.faction.getBossTokenPointscount();
        };
        FamilyLeftUiVo.prototype.isFullLinPai = function () {
            var $tb = this.get_Tb_faction_base();
            return GuidData.faction.getBossTokenNum() >= $tb.token_max_keep;
        };
        Object.defineProperty(FamilyLeftUiVo.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                for (var i = 0; i < this.uiList.length; i++) {
                    var $ui = this.uiList[i];
                    $ui.y = this.uiBasePos[$ui.name].y + this._y;
                }
            },
            enumerable: true,
            configurable: true
        });
        FamilyLeftUiVo.prototype.clik = function ($evt) {
            for (var i = 0; i < this.uiList.length; i++) {
                if (this.uiList[i].testPoint($evt.x, $evt.y)) {
                    //console.log(this);
                    this.mouseClik();
                    return true;
                }
            }
            return false;
        };
        FamilyLeftUiVo.prototype.mouseClik = function () {
        };
        FamilyLeftUiVo.prototype.show = function () {
            this.perent.setUiListVisibleByItem(this.uiList, true);
            this.refresh();
        };
        FamilyLeftUiVo.prototype.hide = function () {
            this.perent.setUiListVisibleByItem(this.uiList, false);
        };
        return FamilyLeftUiVo;
    }());
    leftui.FamilyLeftUiVo = FamilyLeftUiVo;
    var BoosChallenge = /** @class */ (function (_super) {
        __extends(BoosChallenge, _super);
        function BoosChallenge() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BoosChallenge.prototype.makeUi = function () {
            this.rect = new Rectangle(0, 0, 256, 90);
            this.uiList.push(this._midRender.getComponent("c_bg"));
        };
        return BoosChallenge;
    }(FamilyLeftUiVo));
    leftui.BoosChallenge = BoosChallenge;
    var FamilyPk = /** @class */ (function (_super) {
        __extends(FamilyPk, _super);
        function FamilyPk() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FamilyPk.prototype.makeUi = function () {
            this.rect = new Rectangle(0, 0, 256, 30);
            this.uiList.push(this._topRender.getComponent("d_bg"));
            this.d_attack_name = this._topRender.getComponent("d_attack_name");
            this.uiList.push(this.d_attack_name);
            _super.prototype.makeUi.call(this);
        };
        FamilyPk.prototype.refresh = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.d_attack_name.skinName, ColorType.Coffeeff9200 + "荥蒙受或", 14 * 1.5, TextAlign.LEFT, ColorType.Coffeeff9200, "#27262e", 4);
        };
        return FamilyPk;
    }(FamilyLeftUiVo));
    leftui.FamilyPk = FamilyPk;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftFamilyUiVo.js.map