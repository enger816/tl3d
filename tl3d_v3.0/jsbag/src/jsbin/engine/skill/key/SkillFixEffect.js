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
            var ma = new Matrix3D;
            ma.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
            var v3d = ma.transformVector(this.pos);
            v3d.x += this.active.x;
            v3d.y += this.active.y;
            v3d.z += this.active.z;
            this.particle.x = v3d.x;
            this.particle.y = v3d.y;
            this.particle.z = v3d.z;
            this.particle.rotationX = this.rotation.x;
            this.particle.rotationY = this.rotation.y + this.active.rotationY;
            this.particle.rotationZ = this.rotation.z;
            this.particle.bindTarget = null;
        }
    };
    return SkillFixEffect;
}(SkillEffect));
//# sourceMappingURL=SkillFixEffect.js.map