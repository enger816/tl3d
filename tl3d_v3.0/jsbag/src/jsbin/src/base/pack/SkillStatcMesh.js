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
var pack;
(function (pack) {
    var EventDispatcher = Pan3d.EventDispatcher;
    var SkillStatcMesh = /** @class */ (function (_super) {
        __extends(SkillStatcMesh, _super);
        function SkillStatcMesh() {
            var _this = _super.call(this) || this;
            _this.actionnum = -1;
            _this.interval = 2;
            return _this;
        }
        SkillStatcMesh.prototype.getObject = function () {
            var obj = {};
            obj.skillUrl = this.skillUrl;
            obj.roleUrl = this.roleUrl;
            obj.url = this.url;
            obj.actionnum = this.actionnum;
            obj.interval = this.interval;
            obj.version = this.version;
            return obj;
        };
        SkillStatcMesh.prototype.getName = function () {
            return "skill";
        };
        return SkillStatcMesh;
    }(EventDispatcher));
    pack.SkillStatcMesh = SkillStatcMesh;
})(pack || (pack = {}));
//# sourceMappingURL=SkillStatcMesh.js.map