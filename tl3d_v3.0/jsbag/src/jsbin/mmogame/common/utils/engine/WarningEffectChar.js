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
var WarningEffectChar = /** @class */ (function (_super) {
    __extends(WarningEffectChar, _super);
    function WarningEffectChar() {
        var _this = _super.call(this) || this;
        _this.shadow = false;
        return _this;
    }
    WarningEffectChar.prototype.removeStage = function () {
        _super.prototype.removeStage.call(this);
    };
    WarningEffectChar.prototype.showBlood = function ($colorType) {
        if ($colorType === void 0) { $colorType = 0; }
    };
    WarningEffectChar.prototype.updateFrame = function (t) {
        if (this._disappearTm < TimeUtil.getTimer()) {
            SceneManager.getInstance().removeMovieDisplay(this);
        }
        else {
            _super.prototype.updateFrame.call(this, t);
        }
    };
    WarningEffectChar.prototype.setSpellName = function ($alarmEffect) {
        this.addPart("abc", "cde", getModelUrl(String($alarmEffect)));
        this.tittleHeight = 20;
        this._disappearTm = TimeUtil.getTimer() + 2000;
    };
    WarningEffectChar.prototype.addStage = function () {
        _super.prototype.addStage.call(this);
    };
    return WarningEffectChar;
}(SceneChar));
//# sourceMappingURL=WarningEffectChar.js.map