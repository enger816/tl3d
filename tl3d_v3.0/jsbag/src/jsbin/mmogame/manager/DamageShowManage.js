//伤害飘字显示类
var DamageShowManage = /** @class */ (function () {
    function DamageShowManage() {
    }
    DamageShowManage.getInstance = function () {
        if (!this._instance) {
            this._instance = new DamageShowManage();
        }
        return this._instance;
    };
    DamageShowManage.prototype.showHP = function ($sc, hp) {
        //console.log($sc.unit.getName() + "掉血:" + hp);
    };
    return DamageShowManage;
}());
//# sourceMappingURL=DamageShowManage.js.map