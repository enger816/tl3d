module Pan3d {
    export class SkillPath {

        public currentPos: Vector3D;
        public currentTargetPos: Vector3D;
        public rotationMatrix: Matrix3D;
        public time: number;

        /**
        * 是否已经到达 
        */
        protected hasReached: boolean;

        public endTime: number;

        /**
        * 当前方向 
        */
        protected _currentDirect: Vector3D = new Vector3D;

        public speed: number;

        public skillTrajectory: SkillTrajectory;

        public endFun: Function;

        public bloodFun: Function;

        public types: number;

        public update(t: number): void {

            this.time = t;

            if (this.hasReached) {
                this.endTime += t;
                if (this.endTime > 200) {
                    this.applyArrive();
                }
                return
            }

            if (this.skillTrajectory.setCurrentPos()) {

                this._currentDirect.x = this.currentTargetPos.x - this.currentPos.x;
                this._currentDirect.y = this.currentTargetPos.y - this.currentPos.y;
                this._currentDirect.z = this.currentTargetPos.z - this.currentPos.z;

                this._currentDirect.normalize();
                this._currentDirect.scaleBy(this.speed);

                this.setRotationMatrix(this.currentTargetPos.subtract(this.currentPos));

                if (this._currentDirect.length == 0) {
                    this.arrive();
                    return;
                }
            }

            var currentDistance: number = this._currentDirect.length * this.time;

            if (!this.hasReached) {

                var targetDistance: number = Vector3D.distance(this.currentPos, this.currentTargetPos);

                this.currentPos.x += this._currentDirect.x * this.time;
                this.currentPos.y += this._currentDirect.y * this.time;
                this.currentPos.z += this._currentDirect.z * this.time;
            }

            if (currentDistance > targetDistance) {
                this.arrive();
            }

            //this.distance += currentDistance;



        }

        public setRotationMatrix($newPos: Vector3D): void {
            $newPos.normalize();
            var base: Vector3D = new Vector3D(0, 0, 1);
            var axis: Vector3D = base.cross($newPos);
            axis.normalize();
            var angle: number = Math.acos($newPos.dot(base));
            var qu: Quaternion = new Quaternion();
            qu.fromAxisAngle(axis, angle);
            qu.toMatrix3D(this.rotationMatrix);
        }

        public arrive(): void {
            this.hasReached = true;

        }

        public applyArrive(): void {
            this.endFun();
            if (this.bloodFun) {
                this.bloodFun();
            }
        }

        public reset(): void {
            this.hasReached = false;
            this._currentDirect.setTo(0, 0, 0);
            this.endTime = 0;
        }

        public add(): void {

        }

        public setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D,
            $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D, $bloodFun: Function): void {

            this.skillTrajectory = $skillTrajectory;
            this.currentPos = $currentPos;
            this.rotationMatrix = $rotationMatrix;
            this.currentTargetPos = $currentTargetPos;
            this.endFun = $endFun;
            this.bloodFun = $bloodFun;
        }




    }
}