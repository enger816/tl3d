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
/*
* name;
*/
var GameUIChar = /** @class */ (function (_super) {
    __extends(GameUIChar, _super);
    function GameUIChar() {
        var _this = _super.call(this) || this;
        /**移动完成*/
        _this.movesucc = false;
        return _this;
    }
    //重写一下2d界面角度 -45+30
    GameUIChar.prototype.updateMatrix = function () {
        this.posMatrix.identity();
        this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
        this.posMatrix.appendRotation(this._rotationY, tl3d.Vector3D.Y_AXIS);
        this.posMatrix.appendRotation(30, tl3d.Vector3D.X_AXIS);
        this.posMatrix.appendRotation(this._rotationZ, tl3d.Vector3D.Z_AXIS);
        this.posMatrix.appendTranslation(this._x, this._y, this._z);
    };
    /**
     * 移除显示
     */
    GameUIChar.prototype.removeSelf = function () {
        if (this._hasDestory) {
            return;
        }
        clearTimeout(this.hptick);
        clearTimeout(this.dietick);
        // this.lifenum = 0;
        this.hp = 0;
        this.clearBloodBar();
        this._scene.removeMovieDisplay(this);
        this.destory();
    };
    /**
     * 删除血条
     */
    GameUIChar.prototype.clearBloodBar = function () {
        // if (this._charBloodVo) {
        //     (<BloodManagerExt>(this._scene).bloodMgr).clearBloodLineMeshVo(this._charBloodVo);
        //     this._charBloodVo.destory();
        //     this._charBloodVo = null;
        // }
    };
    return GameUIChar;
}(Game2dChar));
//# sourceMappingURL=GameUIChar.js.map