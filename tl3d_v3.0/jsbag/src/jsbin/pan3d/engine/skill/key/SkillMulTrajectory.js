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
    var SkillMulTrajectory = /** @class */ (function (_super) {
        __extends(SkillMulTrajectory, _super);
        function SkillMulTrajectory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillMulTrajectory.prototype.update = function (t) {
            this.pathMul.update(t);
        };
        SkillMulTrajectory.prototype.getSunType = function () {
            return 1;
        };
        SkillMulTrajectory.prototype.addToRender = function () {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            Pan3d.ParticleManager.getInstance().addParticle(this.particle);
            if (!this.currentPosList) {
                this.currentPosList = new Array;
                for (var i = 0; i < this.activeList.length; i++) {
                    this.currentPosList.push(new Pan3d.Vector3D(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5));
                }
                this.pathMul.setInitCurrentPos(this.currentPosList);
            }
            else {
                for (var i = 0; i < this.activeList.length; i++) {
                    this.currentPosList[i].setTo(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5);
                    this.currentPosList[i].w = 0;
                }
            }
            //this.particle.setMulPos(this.currentPosList);
            this.pathMul.add();
            this.particle.setMulPos(this.pathMul.resultAry);
        };
        SkillMulTrajectory.prototype.setMulPlayData = function ($activeList, $target, $removeCallFun, types) {
            var _this = this;
            if (types === void 0) { types = 0; }
            this.activeList = $activeList;
            this.active = this.activeList[0];
            this.target = $target;
            this.removeCallFun = $removeCallFun;
            this._currentPos.setTo(0, 0, 0);
            this.rotationMatrix.identity();
            this._socketMaxrix.identity();
            this._currentTargetPos.setTo(0, 0, 0);
            if (!this.pathMul) {
                this.pathMul = Pan3d.PathManager.getNewPath(types);
                this.pathMul.setData(this, function () { _this.reset(); }, this._currentPos, this.rotationMatrix, this._currentTargetPos);
                this.pathMul.speed = this.data.speed;
            }
            this.pathMul.reset();
        };
        SkillMulTrajectory.prototype.getMulSocket = function (ary) {
            if (ary) {
                this.pathMul.applyData(ary);
            }
        };
        return SkillMulTrajectory;
    }(Pan3d.SkillTrajectory));
    Pan3d.SkillMulTrajectory = SkillMulTrajectory;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillMulTrajectory.js.map