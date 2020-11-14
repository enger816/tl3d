module Pan3d {
    export class Display3DParticle extends Object3D {

        public visible: boolean;
        public timeline: TimeLine;
        protected _time: number;
        private _beginTime: number;

        public data: ParticleData;

        public bindMatrix: Matrix3D;
        public bindVecter3d: Vector3D;
        public bindScale: Vector3D;


        public invertBindMatrix: Matrix3D;
        public groupMatrix: Matrix3D;

        protected _rotationMatrix: Matrix3D;
        public modelMatrix: Matrix3D;

        public isInGroup: boolean = false;
        public groupPos: Vector3D;
        public groupScale: Vector3D;
        public groupRotation: Vector3D;

        public constructor() {
            super();
            this.visible = true;
            this._rotationMatrix = new Matrix3D();
            this.modelMatrix = new Matrix3D();
        }

        public onCreated(): void {

        }

        public setBind($pos: Vector3D, $rotation: Matrix3D, $scale: Vector3D, $invertRotation: Matrix3D, $groupMatrix: Matrix3D): void {
            this.bindVecter3d = $pos;
            this.bindMatrix = $rotation;
            this.bindScale = $scale;
            this.invertBindMatrix = $invertRotation;
            this.groupMatrix = $groupMatrix;
        }

        public getMulBindList(): Array<Vector3D> {
            return null;
        }

        public updateMatrix(): void {

            if (!this.bindMatrix) {
                return;
            }
            this.modelMatrix.identity();
            if (!this.groupMatrix.isIdentity) {
                this.posMatrix.append(this.groupMatrix);
            }
            this.modelMatrix.append(this.posMatrix);
            this.modelMatrix.append(this.bindMatrix);

            this.modelMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z);

        }
        //特效配置等级显示  是否能显示
        private get cantUseEffectsLev(): boolean {
            var temp: boolean = this.data._renderPriority <= Scene_data.effectsLev  //0
            return !temp;
        }
        public updateTime(t: number): void {
            if (this.cantUseEffectsLev) {
                return;
            }
            this._time = t - this._beginTime;
            this._time += this.data._delayedTime; //加上延时 
            this.timeline.updateTime(t);
            this.visible = this.timeline.visible;
            this.posMatrix.identity();
            this.posMatrix.prependScale(this._scaleX * 0.1 * this.bindScale.x * this.data.overAllScale,
                this._scaleY * 0.1 * this.bindScale.y * this.data.overAllScale,
                this._scaleZ * 0.1 * this.bindScale.z * this.data.overAllScale);



            this.timeline.updateMatrix(this.posMatrix, this);
        }

        public reset(): void {
            this.timeline.reset();
            this.updateTime(0);
        }

        public clearAllAnim(): void {

        }
        public update(): void {
            if (this.cantUseEffectsLev) {
                return;
            }
            if (!this.visible) {
                return;
            }
            if (!this.data.materialParam) {
                return;
            }
            if (this.data._alphaMode == 0) {
                this.data._alphaMode = -1;//特殊调整，还需要AS那边核对
              //  console.log("改了")
            }
            Scene_data.context3D.setBlendParticleFactors(this.data._alphaMode);
            Scene_data.context3D.cullFaceBack(this.data.materialParam.material.backCull);

            if (this.data.materialParam) {
                Scene_data.context3D.setProgram(this.data.materialParam.program);
            }
            this.updateMatrix();
            this.setVc();
            this.setVa();
            this.resetVa();
        }

        public setVc(): void {

        }
        public pushVc(): void {
            Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);
        }


        public setVa(): void {

        }

        public resetVa(): void {

        }

        public setMaterialVc(): void {
            if (!this.data.materialParam) {
                return;
            }
            var dynamicConstList: Array<DynamicConstItem> = this.data.materialParam.dynamicConstList;
            var t: number = this._time % (Scene_data.frameTime * this.data._life);
            ////console.log(this._time);
            for (var i: number = 0; i < dynamicConstList.length; i++) {
                dynamicConstList[i].update(t);
            }


            if (this.data.materialParam.material.fcNum <= 0) {
                return;
            }

            t = t * this.data.materialParam.material.timeSpeed;

            this.data.materialParam.material.update(t);

            ////console.log("fc5",this.data.materialParam.material.fcData[4]);

            Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "fc", this.data.materialParam.material.fcData);

            // Scene_data.context3D.setVc4fv(this.data.materialParam.shader,"fc",[1,0,0,0,this.data.materialParam.material.fcData[4],0,0,0]); 
            /**
            if (this.data.materialParam.material.hasTime) {
                t = t * this.data.materialParam.material.timeSpeed;
    
                Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "fc0", [1, 0, 0, t])
            }
    
            var constVec: Array<ConstItem> = this.data.materialParam.material.constList;
            for (var i:number = 0; i < constVec.length; i++) {
                Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "fc" + constVec[i].id, constVec[i].vecNum);
            }
             */
        }

        public setMaterialTexture(): void {
            if (!this.data.materialParam) {
                return;
            }
            var texVec: Array<TexItem> = this.data.materialParam.material.texList;
            for (var i: number = 0; i < texVec.length; i++) {
                if (texVec[i].isDynamic) {
                    continue;
                }
                //_context3D.setTextureAt(texVec[i].id, texVec[i].texture);
                Scene_data.context3D.setRenderTexture(this.data.materialParam.shader, texVec[i].name, texVec[i].texture, texVec[i].id, true);
            }

            var texDynamicVec: Array<DynamicTexItem> = this.data.materialParam.dynamicTexList;
            for (var i: number = 0; i < texDynamicVec.length; i++) {
                // _context3D.setTextureAt(texDynamicVec[i].target.id, texDynamicVec[i].texture);
                Scene_data.context3D.setRenderTexture(this.data.materialParam.shader, texDynamicVec[i].target.name, texDynamicVec[i].texture, texDynamicVec[i].target.id, true);
            }
        }

        public inverBind(): void {
            if (!this.invertBindMatrix.isIdentity) {
                //this.bindMatrix.invert();
                this._rotationMatrix.prepend(this.invertBindMatrix);
                //this.bindMatrix.invert();
            }
        }

        public resetPos(): void {

        }

        public resetMulPos(ary: Array<Array<Array<number>>>): void {

        }


        public getVector3DByObject(obj: any): Vector3D {
            if (!obj) {
                return null;
            }
            return new Vector3D(obj.x, obj.y, obj.z, obj.w);
        }


        public clone(): Display3DParticle {
            return null;
        }

        public setAllByteInfo($byte: Pan3dByteArray, version: number = 0): void {
            this.creatData();
            this.data.version = version;
            this.data.setAllByteInfo($byte);
            this.timeline = new TimeLine();
            this.timeline.setAllDataInfo(this.data.timelineData);
            this._beginTime = this.timeline.beginTime;
        }

        public creatData(): void {
            this.data = new ParticleData;
        }

        public setTimeLine($tl: TimeLine): void {
            this.timeline = $tl;
            this._beginTime = $tl.beginTime;
        }

        public destory(): void {

            this.timeline = null;

            this.bindMatrix = null;
            this.bindVecter3d = null;
            this.bindScale = null;
            this.invertBindMatrix = null;
            this.groupMatrix = null;

            this._rotationMatrix = null;
            this.modelMatrix = null;

            this.groupPos = null;
            this.groupScale = null;
            this.groupRotation = null;
        }

    }
}