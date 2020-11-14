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
    var ParticleLocusballData = /** @class */ (function (_super) {
        __extends(ParticleLocusballData, _super);
        function ParticleLocusballData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleLocusballData.prototype.getParticle = function () {
            return new Pan3d.Display3DLocusBallPartilce;
        };
        ParticleLocusballData.prototype.initBasePos = function () {
            var basePos = new Array;
            for (var i = 0; i < this._totalNum; i++) {
                var v3d;
                var index = i * 3;
                if (this._isRandom) {
                    var roundv3d = new Pan3d.Vector3D(this._round.x * this._round.w, this._round.y * this._round.w, this._round.z * this._round.w);
                    v3d = new Pan3d.Vector3D(this._posAry[index] + Math.random() * roundv3d.x, this._posAry[index + 1] + Math.random() * roundv3d.y, this._posAry[index + 2] + Math.random() * roundv3d.z);
                }
                else {
                    v3d = new Pan3d.Vector3D(this._posAry[index], this._posAry[index + 1], this._posAry[index + 2]);
                }
                v3d = v3d.add(this._basePositon);
                for (var j = 0; j < 4; j++) {
                    basePos.push(v3d.x, v3d.y, v3d.z, i * this._shootSpeed);
                }
            }
            this.objBallData.basePos = basePos;
        };
        ParticleLocusballData.prototype.initSpeed = function () {
            var beMove = new Array;
            for (var i = 0; i < this._totalNum; i++) {
                var resultv3d = new Pan3d.Vector3D;
                if (this._tangentSpeed == 0) {
                    resultv3d.addByNum(this._angleAry[i * 3], this._angleAry[i * 3 + 1], this._angleAry[i * 3 + 2]);
                }
                else if (this._tangentSpeed == 2) {
                    resultv3d.setTo(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                }
                else {
                    var v3d = new Pan3d.Vector3D(this._tangentAry[i * 3], this._tangentAry[i * 3 + 1], this._tangentAry[i * 3 + 2]);
                    v3d.scaleBy(this._tangentSpeed);
                    resultv3d = resultv3d.add(v3d);
                }
                resultv3d.normalize();
                if (this._isSendRandom) {
                    resultv3d.scaleBy(this._speed * Math.random());
                }
                else {
                    resultv3d.scaleBy(this._speed);
                }
                //var ranAngle: Number = this._baseRandomAngle * Math.random() * Math.PI / 180;
                for (var j = 0; j < 4; j++) {
                    beMove.push(resultv3d.x, resultv3d.y, resultv3d.z);
                }
            }
            this.objBallData.beMove = beMove;
        };
        ParticleLocusballData.prototype.setAllByteInfo = function ($byte) {
            this._tangentSpeed = $byte.readFloat();
            this._posAry = JSON.parse($byte.readUTF());
            this._angleAry = JSON.parse($byte.readUTF());
            this._tangentAry = JSON.parse($byte.readUTF());
            _super.prototype.setAllByteInfo.call(this, $byte);
            this.uploadGpu();
        };
        return ParticleLocusballData;
    }(Pan3d.ParticleBallData));
    Pan3d.ParticleLocusballData = ParticleLocusballData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleLocusballData.js.map