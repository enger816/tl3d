var ResGC = /** @class */ (function () {
    function ResGC() {
        var _this = this;
        this._dic = new Object();
        TimeUtil.addTimeTick(60000, function () { _this.gc(); });
    }
    ResGC.prototype.gc = function () {
        //var a:number = 1;
        for (var key in this._dic) {
            var rc = this._dic[key];
            if (rc.useNum <= 0) {
                rc.idleTime++;
                if (rc.idleTime >= ResCount.GCTime) {
                    //console.log("清理 -" + key);
                    rc.destory();
                    delete this._dic[key];
                }
            }
        }
    };
    return ResGC;
}());
//# sourceMappingURL=ResGC.js.map