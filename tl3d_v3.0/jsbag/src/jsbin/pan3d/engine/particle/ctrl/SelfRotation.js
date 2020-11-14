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
    var SelfRotation = /** @class */ (function (_super) {
        __extends(SelfRotation, _super);
        function SelfRotation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SelfRotation.prototype, "data", {
            set: function (value) {
                this.beginTime = Number(value[0].value);
                if (Number(value[1].value) == -1) {
                    this.lastTime = Pan3d.Scene_data.MAX_NUMBER;
                }
                else {
                    this.lastTime = Number(value[1].value);
                }
                this.speed = Number(value[2].value) * 0.1;
                this.aSpeed = Number(value[3].value) * 0.1;
            },
            enumerable: true,
            configurable: true
        });
        SelfRotation.prototype.dataByte = function (va, arr) {
            this.beginTime = arr[0];
            if (arr[1] == -1) {
                this.lastTime = Pan3d.Scene_data.MAX_NUMBER;
            }
            else {
                this.lastTime = arr[1];
            }
            this.speed = arr[2] * 0.1;
            this.aSpeed = arr[3] * 0.1;
        };
        return SelfRotation;
    }(Pan3d.BaseAnim));
    Pan3d.SelfRotation = SelfRotation;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SelfRotation.js.map