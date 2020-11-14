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
    var SkillKeyVo = /** @class */ (function () {
        function SkillKeyVo() {
            this.frame = 0;
        }
        SkillKeyVo.prototype.setData = function ($data) {
            this.frame = $data.frame;
            this.url = $data.url;
        };
        return SkillKeyVo;
    }());
    Pan3d.SkillKeyVo = SkillKeyVo;
    var SkillShockVo = /** @class */ (function () {
        function SkillShockVo() {
        }
        SkillShockVo.prototype.setData = function ($data) {
            this.time = $data.time * Pan3d.Scene_data.frameTime;
            this.lasttime = $data.lasttime * Pan3d.Scene_data.frameTime;
            this.amp = $data.amp;
        };
        return SkillShockVo;
    }());
    Pan3d.SkillShockVo = SkillShockVo;
    var SkillFixEffectKeyVo = /** @class */ (function (_super) {
        __extends(SkillFixEffectKeyVo, _super);
        function SkillFixEffectKeyVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillFixEffectKeyVo.prototype.setData = function ($data) {
            _super.prototype.setData.call(this, $data);
            this.hasSocket = $data.hasSocket;
            if (this.hasSocket) {
                this.socket = $data.socket;
            }
            else {
                this.pos = new Pan3d.Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
                this.rotation = new Pan3d.Vector3D($data.rotation.x, $data.rotation.y, $data.rotation.z);
            }
        };
        return SkillFixEffectKeyVo;
    }(SkillKeyVo));
    Pan3d.SkillFixEffectKeyVo = SkillFixEffectKeyVo;
    var SkillTrajectoryTargetKeyVo = /** @class */ (function (_super) {
        __extends(SkillTrajectoryTargetKeyVo, _super);
        function SkillTrajectoryTargetKeyVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillTrajectoryTargetKeyVo.prototype.setData = function ($data) {
            _super.prototype.setData.call(this, $data);
            this.beginType = $data.beginType;
            if (this.beginType == 0) {
                this.beginPos = new Pan3d.Vector3D($data.beginPos.x, $data.beginPos.y, $data.beginPos.z);
            }
            else if (this.beginType == 1) {
                this.beginSocket = $data.beginSocket;
            }
            this.speed = $data.speed;
            if ($data.hitSocket) {
                this.hitSocket = $data.hitSocket;
            }
            if ($data.endParticle) {
                this.endParticleUrl = $data.endParticle;
            }
            this.multype = $data.multype;
        };
        return SkillTrajectoryTargetKeyVo;
    }(SkillKeyVo));
    Pan3d.SkillTrajectoryTargetKeyVo = SkillTrajectoryTargetKeyVo;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillKeyVo.js.map