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
var AxisMove = /** @class */ (function (_super) {
    __extends(AxisMove, _super);
    function AxisMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AxisMove.prototype, "data", {
        set: function (value) {
            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            }
            else {
                this.lastTime = Number(value[1].value);
            }
            var vc = (value[2].value).split("|");
            this.axis = new Vector3D(Number(vc[0]), Number(vc[1]), Number(vc[2]));
            this.axis.normalize();
            this.speed = Number(value[3].value) * 0.1;
            this.aSpeed = Number(value[4].value) * 0.001;
        },
        enumerable: true,
        configurable: true
    });
    AxisMove.prototype.dataByte = function (va, arr) {
        this.beginTime = arr[0];
        if (arr[1] == -1) {
            this.lastTime = Scene_data.MAX_NUMBER;
        }
        else {
            this.lastTime = arr[1];
        }
        this.axis = arr[2];
        this.axis.normalize();
        this.speed = arr[3] * 0.1;
        this.aSpeed = arr[4] * 0.001;
    };
    return AxisMove;
}(BaseAnim));
//# sourceMappingURL=AxisMove.js.map