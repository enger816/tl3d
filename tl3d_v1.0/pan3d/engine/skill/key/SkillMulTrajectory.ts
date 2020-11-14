module Pan3d {
    export class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
        public activeList: Array<Object3D>;
        public currentPosList: Array<Vector3D>;
        public pathMul: SkillMulPath;


        public update(t: number): void {

            this.pathMul.update(t);

        }

        public getSunType(): number {
            return 1;
        }


        public addToRender(): void {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            ParticleManager.getInstance().addParticle(this.particle);

            if (!this.currentPosList) {
                this.currentPosList = new Array;
                for (var i: number = 0; i < this.activeList.length; i++) {
                    this.currentPosList.push(new Vector3D(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5));
                }
                this.pathMul.setInitCurrentPos(this.currentPosList);
            } else {
                for (var i: number = 0; i < this.activeList.length; i++) {
                    this.currentPosList[i].setTo(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5);
                    this.currentPosList[i].w = 0;
                }
            }

            //this.particle.setMulPos(this.currentPosList);
            this.pathMul.add();
            this.particle.setMulPos(this.pathMul.resultAry);
        }

        public setMulPlayData($activeList: Array<Object3D>, $target: Object3D, $removeCallFun: Function, types: number = 0): void {
            this.activeList = $activeList;
            this.active = this.activeList[0];
            this.target = $target;
            this.removeCallFun = $removeCallFun;

            this._currentPos.setTo(0, 0, 0);
            this.rotationMatrix.identity();
            this._socketMaxrix.identity();
            this._currentTargetPos.setTo(0, 0, 0);

            if (!this.pathMul) {
                this.pathMul = PathManager.getNewPath(types);
                this.pathMul.setData(this, () => { this.reset() }, this._currentPos, this.rotationMatrix, this._currentTargetPos);
                this.pathMul.speed = this.data.speed;
            }

            this.pathMul.reset();
        }

        public getMulSocket(ary: Array<Vector3D>): void {
            if (ary) {
                this.pathMul.applyData(ary);
            }
        }

    }
}