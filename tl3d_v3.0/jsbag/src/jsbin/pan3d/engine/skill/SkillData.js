var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
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
                Pan3d.SkillManager.getInstance().gcSkill(this.srcList[i]);
            }
        };
        SkillData.prototype.testDestory = function () {
            for (var i = 0; i < this.srcList.length; i++) {
                if (!(this.srcList[i].isDeath && this.srcList[i].idleTime >= Pan3d.ResCount.GCTime)) {
                    return false;
                }
            }
            return true;
        };
        return SkillData;
    }(Pan3d.ResCount));
    Pan3d.SkillData = SkillData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillData.js.map