var PathManager = /** @class */ (function () {
    function PathManager() {
    }
    PathManager.reg = function (types, cls) {
        this.dic[types] = cls;
    };
    PathManager.getNewPath = function (types) {
        var cls = this.dic[types];
        return new cls();
    };
    PathManager.init = function () {
        this.dic[0] = SkillPath;
        this.dic[1] = SkillSinPath;
        this.dic[2] = SkillCosPath;
    };
    PathManager.dic = new Object;
    return PathManager;
}());
//# sourceMappingURL=PathManager.js.map