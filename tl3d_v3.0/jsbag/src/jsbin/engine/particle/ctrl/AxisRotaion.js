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
var AxisRotaion = /** @class */ (function (_super) {
    __extends(AxisRotaion, _super);
    function AxisRotaion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AxisRotaion.prototype, "data", {
        set: function (value) {
            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            }
            else {
                this.lastTime = Number(value[1].value);
            }
            var vc = String(value[2].value).split("|");
            this.axis = new Vector3D(Number(vc[0]), Number(vc[1]), Number(vc[2]));
            vc = String(value[3].value).split("|");
            this.axisPos = new Vector3D(Number(vc[0]) * 100, Number(vc[1]) * 100, Number(vc[2]) * 100);
            this.speed = Number(value[4].value) * 0.1;
            this.aSpeed = Number(value[5].value) * 0.1;
        },
        enumerable: true,
        configurable: true
    });
    AxisRotaion.prototype.dataByte = function (va, arr) {
        this.beginTime = Number(arr[0]);
        if (Number(arr[1]) == -1) {
            this.lastTime = Scene_data.MAX_NUMBER;
        }
        else {
            this.lastTime = Number(arr[1]);
        }
        this.axis = arr[2];
        this.axisPos = arr[3];
        this.speed = arr[4] * 0.1;
        this.aSpeed = arr[5] * 0.1;
    };
    return AxisRotaion;
}(BaseAnim));
//# sourceMappingURL=AxisRotaion.js.map