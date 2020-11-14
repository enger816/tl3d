module Pan3d {
    export class Display3DFollowLocusPartilce extends Display3DParticle {


        protected _bindPosAry: Array<Array<number>>;

        protected _gpuVc: Float32Array;

        protected _caramPosVec: Array<number>;

        public constructor() {
            super();
            //this.objData = new ParticleGpuData();
            this._caramPosVec = [0, 0, 0];
        }

        public get followlocusdata(): ParticleFollowLocusData {
            return <ParticleFollowLocusData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleFollowLocusData;
        }

        // public setAllByteInfo($byte: ByteArray, version: number = 0): void {
        //     super.setAllByteInfo($byte, version);
        //     this.initBindMatrixAry();
        // }

        public onCreated(): void {
            this.initBindMatrixAry();
        }

        protected initBindMatrixAry(): void {
            this._bindPosAry = new Array;
            this._gpuVc = new Float32Array(this.followlocusdata._fenduanshu * 6);
            for (var i: number = 0; i <= this.followlocusdata._fenduanshu; i++) {
                this._bindPosAry.push([0, 0, 5 * i]);
                this._bindPosAry.push([0, 0, 1]);
            }
        }


        public setVa(): void {
            var tf: boolean = Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 12);
            }
            // Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            // Scene_data.context3D.setVa(1, 2, this.data.objData.uvBuffer);

            this.setMaterialTexture();

            Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        }

        public setVc(): void {

            this.updateMatrix();

            this.updateBind();

       


            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            this.data.vcmatData.set(Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            this.data.vcmatData.set(Scene_data.cam3D.cameraMatrix.m, 16);

            this._caramPosVec[0] = Scene_data.cam3D.x;
            this._caramPosVec[1] = Scene_data.cam3D.y;
            this._caramPosVec[2] = Scene_data.cam3D.z;
            //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "camPos", this._caramPosVec);

            this.data.vcmatData.set(this._caramPosVec, 32);

            Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);

            this.setBindPosVc();

            this.setMaterialVc();

        }

        public setBindPosVc(): void {

            for (var i: number = 0; i < this._bindPosAry.length; i++) {
                Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "bindpos[" + i + "]", this._bindPosAry[i]);
            }
        }
        public reset(): void {
            this.resetPos();
            super.reset();
         
        }

        public updateMatrix(): void {
            this.modelMatrix.identity();

            this.modelMatrix.prepend(this.posMatrix);
        }

        public resetPos(): void {

            for (var i: number = 0; i < this._bindPosAry.length; i += 2) {
                this._bindPosAry[i][0] = this.bindVecter3d.x;
                this._bindPosAry[i][1] = this.bindVecter3d.y;
                this._bindPosAry[i][2] = this.bindVecter3d.z;

            }
            this.flag = TimeUtil.getTimer();
        }

        protected flag: number = 0;
        public static waitCdTime: number = 35
        public updateBind(): void {
            var ctime: number = TimeUtil.getTimer();

            if ((ctime - this.flag) >= Display3DFollowLocusPartilce.waitCdTime) {
                var normal: Array<number> = this._bindPosAry.pop();
                var pos: Array<number> = this._bindPosAry.pop();
                pos[0] = this.bindVecter3d.x;
                pos[1] = this.bindVecter3d.y;
                pos[2] = this.bindVecter3d.z;

                var pos0: Array<number> = this._bindPosAry[0];
                var normal0: Array<number> = this._bindPosAry[1];

                var v3d: Vector3D = new Vector3D(pos[0] - pos0[0], pos[1] - pos0[1], pos[2] - pos0[2]);
                v3d.normalize();
                normal0[0] = v3d.x;
                normal[0] = v3d.x;

                normal0[1] = v3d.y;
                normal[1] = v3d.y;

                normal0[2] = v3d.z;
                normal[2] = v3d.z;

                this._bindPosAry.unshift(normal);
                this._bindPosAry.unshift(pos);

                this.flag = ctime;
            }

        }

    }
}