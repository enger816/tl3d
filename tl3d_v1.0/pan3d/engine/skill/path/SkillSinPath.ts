module Pan3d {
    export class SkillSinPath extends SkillPath {

        private alltime: number;

        private lastTime: number;

        protected basePos: Vector3D = new Vector3D;


        public add(): void {
            this.skillTrajectory.setCurrentPos();

            var v3d: Vector3D = new Vector3D();
            v3d.x = this.currentTargetPos.x - this.currentPos.x;
            v3d.y = this.currentTargetPos.y - this.currentPos.y;
            v3d.z = this.currentTargetPos.z - this.currentPos.z;

            this.basePos.setTo(this.currentPos.x, this.currentPos.y, this.currentPos.z);

            this.alltime = v3d.length / this.speed;

        }

        public update(t: number): void {

            this.time = t;
            this.lastTime += t;

            if (this.hasReached) {
                this.endTime += t;
                if (this.endTime > 200) {
                    this.applyArrive();
                }
                return
            }

            this.skillTrajectory.setCurrentPos();


            var ypos: number = (this.lastTime / this.alltime);
            if (ypos > 1) {
                ypos = 1;
            }
            //ypos = ypos - ypos * ypos;   
            //ypos *= 150; 
            var offsetv3d: Vector3D = this.getOffset(ypos);


            this._currentDirect.x = this.currentTargetPos.x - this.basePos.x;
            this._currentDirect.y = this.currentTargetPos.y - this.basePos.y;
            this._currentDirect.z = this.currentTargetPos.z - this.basePos.z;
            this._currentDirect.normalize();
            this._currentDirect.scaleBy(this.speed);

            this.setRotationMatrix(this.currentTargetPos.subtract(this.basePos));
            if (this._currentDirect.length == 0) {
                this.arrive();
                return;
            }


            var currentDistance: number = this._currentDirect.length * this.time;

            if (!this.hasReached) {

                var targetDistance: number = Vector3D.distance(this.basePos, this.currentTargetPos);

                this.basePos.x += this._currentDirect.x * this.time;
                this.basePos.y += this._currentDirect.y * this.time;
                this.basePos.z += this._currentDirect.z * this.time;

                // this.currentPos.x = this.basePos.x + ypos;
                // this.currentPos.y = this.basePos.y;
                // this.currentPos.z = this.basePos.z;
                this.setApplyPos(offsetv3d);
            }

            if (currentDistance > targetDistance) {
                this.arrive();
            }

            //this.distance += currentDistance;


        }

        public setApplyPos($offset: Vector3D): void {
            this.currentPos.x = this.basePos.x + $offset.x;
            this.currentPos.y = this.basePos.y + $offset.y;
            this.currentPos.z = this.basePos.z + $offset.z;
        }

        public getOffset(ypos: number): Vector3D {
            ypos = Math.sin(ypos * Math.PI) * 100;
            var offsetv3d: Vector3D = this._currentDirect.cross(new Vector3D(0, 1, 0));
            offsetv3d.scaleBy(ypos);
            return new Vector3D;
        }

        public reset(): void {
            super.reset();
            this.lastTime = 0;
        }

    }

    export class SkillCosPath extends SkillSinPath {
        public getOffset(ypos: number): Vector3D {
            ypos = (ypos - ypos * ypos) * 300;//Math.sin(ypos * Math.PI) * 100;
            var offsetv3d: Vector3D = this._currentDirect.cross(new Vector3D(0, -1, 0));
            offsetv3d.scaleBy(ypos);
            return new Vector3D;
        }
    }
}