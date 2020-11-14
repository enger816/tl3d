module Pan3d {
    export class SkillTrajectory extends SkillKey implements IBind {
        public active: Object3D;
        public target: Object3D;

        public data: SkillTrajectoryTargetKeyVo;

        protected _currentPos: Vector3D = new Vector3D;
        public rotationMatrix: Matrix3D = new Matrix3D;
        protected _socketMaxrix: Matrix3D = new Matrix3D;
        protected _currentTargetPos: Vector3D = new Vector3D;

        public endParticle: CombineParticle;


        protected path: SkillPath;

        public constructor() {
            super();

            //this.path = new SkillSinPath();
            //this.path.setData(this, () => { this.applyArrive() } ,this._currentPos, this.rotationMatrix, this._currentTargetPos);

        }

        public update(t: number): void {

            this.path.update(t);

        }


        public reset(): void {
            super.reset();

            //if(false){ 
            if (this.endParticle) {
                ParticleManager.getInstance().addParticle(this.endParticle);
                this.endParticle.reset();
                this.endParticle.setPos(this._currentTargetPos.x, this._currentTargetPos.y, this._currentTargetPos.z);
            }
            if (this.removeCallFun) {
                this.removeCallFun(this);
            }
        }

        public endPlayFun(e: BaseEvent = null): void {
            ParticleManager.getInstance().removeParticle(this.endParticle);
            this.endParticle.removeEventListener(BaseEvent.COMPLETE, this.endPlayFun, this);
        }



        public setCurrentPos(): boolean {
            if (this.data.hitSocket) {
                var targetMovie: Display3dMovie = <Display3dMovie>(this.target);
                if (targetMovie) {
                    targetMovie.getSocket(this.data.hitSocket, this._socketMaxrix);
                    this._currentTargetPos.setTo(this._socketMaxrix.position.x, this._socketMaxrix.position.y, this._socketMaxrix.position.z);
                } else {
                    //console.log("需要处理,特殊没有指定对象")
                }
                return true;

            } else {
                if (this._currentTargetPos.x == this.target.x && this._currentTargetPos.y == this.target.y && this._currentTargetPos.z == this.target.z) {
                    return false;
                } else {
                    this._currentTargetPos.setTo(this.target.x, this.target.y, this.target.z);
                    return true;
                }
            }
        }

        public addToRender(): void {
            super.addToRender();

            var beginPos: Vector3D;
            if (this.data.beginType == 0) {
                var ma: Matrix3D = new Matrix3D;
                ma.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
                beginPos = ma.transformVector(this.data.beginPos);
                this._currentPos.setTo(this.active.x + beginPos.x, this.active.y + beginPos.y, this.active.z + beginPos.z);
            } else if (this.data.beginType == 1) {
                var tempMa: Matrix3D = new Matrix3D;
                var bindActive: Display3dMovie = <Display3dMovie>(this.active);
                bindActive.getSocket(this.data.beginSocket, tempMa);
                beginPos = tempMa.position;
                this._currentPos.setTo(beginPos.x, beginPos.y, beginPos.z);
            }

            this.particle.setPos(this._currentPos.x, this._currentPos.y, this._currentPos.z);

            this.path.add();
        }


        public getSocket(socketName: string, resultMatrix: Matrix3D): void {
            resultMatrix.identity();
            resultMatrix.append(this.rotationMatrix);
            resultMatrix.appendTranslation(this._currentPos.x, this._currentPos.y, this._currentPos.z);
        }

        public getSunType(): number {
            return 0;
        }

        public setInfo(obj: SkillKeyVo): void {
            super.setInfo(obj);
            this.particle.bindTarget = this;
            this.data = <SkillTrajectoryTargetKeyVo>obj;
            //this.path.speed = this.data.speed;
            if (this.data.endParticleUrl) {
                this.endParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + this.data.endParticleUrl);
                this.endParticle.addEventListener(BaseEvent.COMPLETE, this.endPlayFun, this);
            }
        }

        public setPlayData($active: Object3D, $target: Object3D, $removeCallFun: Function, types: number = 0, $bloodFun: Function = null): void {
            this.active = $active;
            this.target = $target;
            this.removeCallFun = $removeCallFun;

            this._currentPos.setTo(0, 0, 0);
            this.rotationMatrix.identity();
            this._socketMaxrix.identity();
            this._currentTargetPos.setTo(0, 0, 0);

            if (!this.path) {
                this.path = PathManager.getNewPath(2);
                this.path.setData(this, () => { this.reset() }, this._currentPos, this.rotationMatrix, this._currentTargetPos, $bloodFun);
                this.path.speed = this.data.speed;
            }

            this.path.reset();
        }

        public destory(): void {
            super.destory();
            this.active = null;
            this.target = null;

            this.data = null;

            this._currentPos = null;
            this.rotationMatrix = null;
            this._socketMaxrix = null;
            this._currentTargetPos = null;


            this.path = null;
        }






    }
}