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
var SkillData = /** @class */ (function (_super) {
    __extends(SkillData, _super);
    function SkillData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.srcList = new Array();
        return _this;
    }
    SkillData.prototype.addSrcSkill = function ($skill) {
        this.srcList.push($skill);
    };
    SkillData.prototype.destory = function () {
        for (var i = 0; i < this.srcList.length; i++) {
            this.srcList[i].destory();
            SkillManager.getInstance().gcSkill(this.srcList[i]);
        }
    };
    SkillData.prototype.testDestory = function () {
        for (var i = 0; i < this.srcList.length; i++) {
            if (!(this.srcList[i].isDeath && this.srcList[i].idleTime >= ResCount.GCTime)) {
                return false;
            }
        }
        return true;
    };
    return SkillData;
}(ResCount));
//# sourceMappingURL=SkillData.js.map