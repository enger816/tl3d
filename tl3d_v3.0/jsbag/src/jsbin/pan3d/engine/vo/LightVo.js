var Pan3d;
(function (Pan3d) {
    var LightVo = /** @class */ (function () {
        function LightVo() {
            this.sunDirect = new Array(0, 1, 0);
            this.sunColor = new Array(2, 0, 0);
            this.ambientColor = new Array(0, 0, 0);
        }
        LightVo.prototype.setData = function (sd, sc, ac) {
            this.sunDirect[0] = sd.x;
            this.sunDirect[1] = sd.y;
            this.sunDirect[2] = sd.z;
            this.sunColor[0] = sc.x;
            this.sunColor[1] = sc.y;
            this.sunColor[2] = sc.z;
            this.ambientColor[0] = ac.x;
            this.ambientColor[1] = ac.y;
            this.ambientColor[2] = ac.z;
        };
        return LightVo;
    }());
    Pan3d.LightVo = LightVo;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=LightVo.js.map