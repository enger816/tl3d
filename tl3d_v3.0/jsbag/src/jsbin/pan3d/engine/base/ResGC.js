var Pan3d;
(function (Pan3d) {
    var ResGC = /** @class */ (function () {
        function ResGC() {
            var _this = this;
            this._dic = new Object();
            Pan3d.TimeUtil.addTimeTick(60000, function () { _this.gc(); });
        }
        ResGC.prototype.gc = function () {
            //var a:number = 1;
            for (var key in this._dic) {
                var rc = this._dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;
                    if (rc.idleTime >= Pan3d.ResCount.GCTime) {
                        //console.log("清理 -" + key);
                        rc.destory();
                        delete this._dic[key];
                    }
                }
            }
        };
        return ResGC;
    }());
    Pan3d.ResGC = ResGC;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ResGC.js.map