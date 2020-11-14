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
    var SkillBugBind = /** @class */ (function () {
        function SkillBugBind() {
        }
        SkillBugBind.prototype.getSocket = function (socketName, resultMatrix) {
            this.bindMatrix.clone(resultMatrix);
        };
        SkillBugBind.prototype.getSunType = function () {
            return 1;
        };
        return SkillBugBind;
    }());
    Pan3d.SkillBugBind = SkillBugBind;
    var SkillFixEffect = /** @class */ (function (_super) {
        __extends(SkillFixEffect, _super);
        function SkillFixEffect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillFixEffect.prototype.setInfo = function (obj) {
            _super.prototype.setInfo.call(this, obj);
            var data = obj;
            this.pos = data.pos;
            this.rotation = data.rotation;
            this.hasSocket = data.hasSocket;
            this.socket = data.socket;
        };
        SkillFixEffect.prototype.addToRender = function () {
            _super.prototype.addToRender.call(this);
            if (this.outPos) {
                this.particle.x = this.outPos.x;
                this.particle.y = this.outPos.y;
                this.particle.z = this.outPos.z;
                this.particle.rotationX = this.rotation.x;
                this.particle.rotationY = this.rotation.y + this.active.rotationY;
                this.particle.rotationZ = this.rotation.z;
                this.particle.bindTarget = null;
            }
            else if (this.hasSocket) {
                var targetActive = this.active;
                this.particle.bindTarget = (targetActive);
                this.particle.bindSocket = this.socket;
            }
            else {
                var ma = new Pan3d.Matrix3D;
                ma.appendRotation(this.active.rotationY, Pan3d.Vector3D.Y_AXIS);
                var v3d = ma.transformVector(this.pos);
                v3d.x += this.active.x;
                v3d.y += this.active.y;
                v3d.z += this.active.z;
                /* //原来小刘写的方法，在有编辑器中因为角色角度为0,当游戏场景时就会有错。
                this.particle.x = v3d.x;
                this.particle.y = v3d.y;
                this.particle.z = v3d.z;

                this.particle.rotationX = this.rotation.x;
                this.particle.rotationY = this.rotation.y +this.active.rotationY
                this.particle.rotationZ = this.rotation.z;

                */
                // 当绑定对象有三个轴变化时有异常，需
                var $SkillBugBind = new SkillBugBind();
                $SkillBugBind.bindMatrix = new Pan3d.Matrix3D;
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.x, Pan3d.Vector3D.X_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.y, Pan3d.Vector3D.Y_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.z, Pan3d.Vector3D.Z_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.active.rotationY, Pan3d.Vector3D.Y_AXIS);
                $SkillBugBind.bindMatrix.appendTranslation(v3d.x, v3d.y, v3d.z);
                this.particle.bindTarget = $SkillBugBind;
            }
        };
        return SkillFixEffect;
    }(Pan3d.SkillEffect));
    Pan3d.SkillFixEffect = SkillFixEffect;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillFixEffect.js.map