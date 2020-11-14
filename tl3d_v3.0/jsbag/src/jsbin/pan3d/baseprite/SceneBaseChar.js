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
    var SceneBaseChar = /** @class */ (function (_super) {
        __extends(SceneBaseChar, _super);
        function SceneBaseChar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._avatar = -1;
            _this._visible = true;
            return _this;
        }
        Object.defineProperty(SceneBaseChar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });
        SceneBaseChar.prototype.setAvatar = function (num) {
            if (this._avatar == num) {
                return;
            }
            this._avatar = num;
            this.setRoleUrl(this.getSceneCharAvatarUrl(num));
        };
        SceneBaseChar.prototype.update = function () {
            if (this.visible) {
                _super.prototype.update.call(this);
            }
            if (this._shadow) {
                this._shadow._visible = this.visible;
            }
        };
        SceneBaseChar.prototype.getSceneCharAvatarUrl = function (num) {
            var $url = getRoleUrl(String(num));
            return getRoleUrl(String(num));
        };
        SceneBaseChar.prototype.getSceneCharWeaponUrl = function (num, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            return getModelUrl(String(num + $suffix));
        };
        return SceneBaseChar;
    }(Pan3d.Display3dMovie));
    Pan3d.SceneBaseChar = SceneBaseChar;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SceneBaseChar.js.map