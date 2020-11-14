module Pan3d {
    export class SkillMulPath extends SkillPath {

        private skillMul: SkillMulTrajectory;
        private currentPosAry: Array<Vector3D>;
        private alltime: number;
        private lastTime: number = 0;
        private maxV3d: Vector3D;
        private allTimeList: Array<number>;
        public resultAry: Array<Array<Array<number>>>;


        public setInitCurrentPos(ary: Array<Vector3D>): void {
            this.currentPosAry = ary;
            this.allTimeList = new Array;
            for (var i: number = 0; i < ary.length; i++) {
                this.allTimeList.push(0);
            }
        }
        private directAry: Array<Vector3D>;
        public add(): void {
            this.skillTrajectory.setCurrentPos();

            this.directAry = new Array;

            var maxLenght: number = 0;
            for (var i: number = 0; i < this.currentPosAry.length; i++) {
                var v3d: Vector3D = new Vector3D();

                v3d.x = this.currentTargetPos.x - this.currentPosAry[i].x;
                v3d.y = this.currentTargetPos.y - this.currentPosAry[i].y;
                v3d.z = this.currentTargetPos.z - this.currentPosAry[i].z;

                var le: number = v3d.length;
                if (le > maxLenght) {
                    maxLenght = le;
                    this.maxV3d = this.currentPosAry[i];
                }
                this.allTimeList[i] = le / this.speed;

                v3d.normalize();
                v3d.scaleBy(this.speed);
                this.directAry.push(v3d);
            }

            this.alltime = maxLenght / this.speed;

            this.setAllData();
        }

        public setAllData(): void {


            var frame: number = float2int(this.alltime / 33) + 8;

            this.resultAry = new Array;
            for (var i: number = 0; i < this.currentPosAry.length; i++) {
                var itemAry: Array<Array<number>> = new Array;
                this.resultAry.push(itemAry);
                var directV3d: Vector3D = this.directAry[i];

                for (var k: number = 0; k < 6; k++) {
                    itemAry.push([this.currentPosAry[i].x, this.currentPosAry[i].y, this.currentPosAry[i].z]);
                }

                for (var j: number = 0; j < frame; j++) {
                    this.lastTime = 33 * j;

                    var per: number = (this.lastTime / this.allTimeList[i])
                    var ypos: number = per;
                    var pos: Array<number>;
                    if (per >= 1) {
                        ypos = 0;
                        pos = [this.currentTargetPos.x, this.currentTargetPos.y, this.currentTargetPos.z];
                    } else {
                        ypos = ypos - ypos * ypos;
                        ypos *= 250;
                        pos = [directV3d.x * this.lastTime + this.currentPosAry[i].x, directV3d.y * this.lastTime + ypos + this.currentPosAry[i].y, directV3d.z * this.lastTime + this.currentPosAry[i].z];
                    }


                    var normal: Array<number>;
                    if (j == 0) {
                        normal = [0, 1, 0];
                    } else {
                        var lastpos: Array<number> = itemAry[j * 2 - 2];
                        normal = [pos[0] - lastpos[0], pos[1] - lastpos[1], pos[2] - lastpos[2]];
                        var len: number = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
                        normal[0] /= len;
                        normal[1] /= len;
                        normal[2] /= len;
                    }
                    itemAry.push(pos, normal);

                }

            }

        }


        public update(t: number): void {

            this.time = t;
            this.lastTime += t;

            if (this.hasReached) {
                this.endTime += t;
                if (this.endTime > 200) {
                    this.applyArrive();
                }
                return;
            }

            this.skillTrajectory.setCurrentPos();


            for (var i: number = 0; i < this.currentPosAry.length; i++) {

                var ypos: number = (this.lastTime / this.allTimeList[i]);
                ypos = ypos - ypos * ypos;
                ypos *= 250;

                var basePos: Vector3D = this.currentPosAry[i];

                this._currentDirect.x = this.currentTargetPos.x - basePos.x;
                this._currentDirect.y = this.currentTargetPos.y - basePos.y;
                this._currentDirect.z = this.currentTargetPos.z - basePos.z;
                this._currentDirect.normalize();
                this._currentDirect.scaleBy(this.speed);

                if (this.maxV3d == basePos) {
                    this.setRotationMatrix(this.currentTargetPos.subtract(basePos));
                    if (this._currentDirect.length == 0) {
                        this.arrive();
                        return;
                    }
                }

                var currentDistance: number = this._currentDirect.length * this.time;

                if (!this.hasReached) {

                    var targetDistance: number = Vector3D.distance(basePos, this.currentTargetPos);

                    basePos.x += this._currentDirect.x * this.time;
                    basePos.y += this._currentDirect.y * this.time;
                    basePos.z += this._currentDirect.z * this.time;

                    basePos.w = ypos;
                }

                if (this.maxV3d == basePos) {
                    if (currentDistance > targetDistance) {
                        this.arrive();
                    }
                }

            }

            this.currentPos.setTo(this.currentPosAry[0].x, this.currentPosAry[0].y + this.currentPosAry[0].w, this.currentPosAry[0].z);


        }




        public setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D): void {
            super.setData($skillTrajectory, $endFun, $currentPos, $rotationMatrix, $currentTargetPos, null);
            this.skillMul = <SkillMulTrajectory>$skillTrajectory;
        }

        public applyData(ary: Array<Vector3D>): void {

            for (var i: number = 0; i < ary.length; i++) {
                ary[i].setTo(this.currentPosAry[i].x, this.currentPosAry[i].y + this.currentPosAry[i].w, this.currentPosAry[i].z);
            }

        }

        public reset(): void {
            super.reset();
            this.lastTime = 0;
        }

    }

}