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
var xyz;
(function (xyz) {
    var Object3D = Pan3d.Object3D;
    var MouseVO = /** @class */ (function (_super) {
        __extends(MouseVO, _super);
        function MouseVO() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._mouseDown = false;
            _this.last_mouse_x = 0;
            _this.last_mouse_y = 0;
            _this.oldPosx = 0;
            _this.oldPosy = 0;
            _this.oldPosz = 0;
            _this.old_rotation_x = 0;
            _this.old_rotation_y = 0;
            return _this;
        }
        return MouseVO;
    }(Object3D));
    xyz.MouseVO = MouseVO;
})(xyz || (xyz = {}));
//# sourceMappingURL=MouseVO.js.map