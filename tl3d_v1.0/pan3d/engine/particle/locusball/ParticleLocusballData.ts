module Pan3d {
    export class ParticleLocusballData extends ParticleBallData {
        protected _posAry: Array<number>;
        protected _angleAry: Array<number>;
        protected _tangentAry: Array<number>;
        protected _tangentSpeed: number;

        public getParticle(): Display3DParticle {
            return new Display3DLocusBallPartilce;
        }

        public initBasePos(): void {
            var basePos: Array<number> = new Array;
            for (var i: number = 0; i < this._totalNum; i++) {
                var v3d: Vector3D;
                var index: number = i * 3;
                if (this._isRandom) {
                    var roundv3d: Vector3D = new Vector3D(this._round.x * this._round.w, this._round.y * this._round.w, this._round.z * this._round.w);
                    v3d = new Vector3D(this._posAry[index] + Math.random() * roundv3d.x,
                        this._posAry[index + 1] + Math.random() * roundv3d.y,
                        this._posAry[index + 2] + Math.random() * roundv3d.z);
                } else {
                    v3d = new Vector3D(this._posAry[index], this._posAry[index + 1], this._posAry[index + 2]);
                }

                v3d = v3d.add(this._basePositon);

                for (var j: number = 0; j < 4; j++) {
                    basePos.push(v3d.x, v3d.y, v3d.z, i * this._shootSpeed);
                }
            }

            this.objBallData.basePos = basePos;
        }
        public initSpeed(): void {
            var beMove: Array<number> = new Array;
            for (var i: number = 0; i < this._totalNum; i++) {

                var resultv3d: Vector3D = new Vector3D;

                if (this._tangentSpeed == 0) {
                    resultv3d.addByNum(this._angleAry[i * 3], this._angleAry[i * 3 + 1], this._angleAry[i * 3 + 2]);
                } else if (this._tangentSpeed == 2) {
                    resultv3d.setTo(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                } else {
                    var v3d: Vector3D = new Vector3D(this._tangentAry[i * 3], this._tangentAry[i * 3 + 1], this._tangentAry[i * 3 + 2]);
                    v3d.scaleBy(this._tangentSpeed);
                    resultv3d = resultv3d.add(v3d);
                }


                resultv3d.normalize();

                if (this._isSendRandom) {
                    resultv3d.scaleBy(this._speed * Math.random());
                } else {
                    resultv3d.scaleBy(this._speed);
                }

                //var ranAngle: Number = this._baseRandomAngle * Math.random() * Math.PI / 180;

                for (var j: number = 0; j < 4; j++) {
                    beMove.push(resultv3d.x, resultv3d.y, resultv3d.z);
                }
            }

            this.objBallData.beMove = beMove;

        }

        public setAllByteInfo($byte: Pan3dByteArray): void {



            this._tangentSpeed = $byte.readFloat();
            this._posAry = JSON.parse($byte.readUTF());
            this._angleAry = JSON.parse($byte.readUTF());
            this._tangentAry = JSON.parse($byte.readUTF());

            super.setAllByteInfo($byte);

            this.uploadGpu();

        }
    }
}