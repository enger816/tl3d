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
var Display3DLocusBallPartilce = /** @class */ (function (_super) {
    __extends(Display3DLocusBallPartilce, _super);
    //protected _posAry: Array<number>;
    //protected _angleAry: Array<number>;
    //protected _tangentAry: Array<number>;
    //protected _tangentSpeed:number;
    function Display3DLocusBallPartilce() {
        return _super.call(this) || this;
    }
    Display3DLocusBallPartilce.prototype.creatData = function () {
        this.data = new ParticleLocusballData;
    };
    return Display3DLocusBallPartilce;
}(Display3DBallPartilce));
//# sourceMappingURL=Display3DLocusBallPartilce.js.map