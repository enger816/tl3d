module Pan3d {
    export class Display3DFacetParticle extends Display3DParticle {

        private _lifeVisible: boolean = true;

        private _resultUvVec: Array<number>;


        public constructor() {
            super();
            //this.objData = new ParticleGpuData();
            //this.program = ProgrmaManager.getInstance().getProgram(Display3DFacetShader.Display3D_Facet_Shader);
            this._resultUvVec = new Array(2);
        }

        public get facetdata(): ParticleFacetData {
            return <ParticleFacetData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleFacetData;
        }

        public update(): void {
            if (!this._lifeVisible) {
                return;
            }
            super.update();
        }

        public reset(): void {
            super.reset();
            this._lifeVisible = true;
        }

        public setVc(): void {

            this.updateRotaionMatrix();
            this.updateUV();

            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.data.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);//0
            this.data.vcmatData.set(Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.data.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);//16
            this.data.vcmatData.set(Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            //this.data.setFloat32Mat("posMatrix3D", this.modelMatrix.m);//48
            this.data.vcmatData.set(this.modelMatrix.m, 48);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "rotationMatrix3D", this._rotationMatrix.m);
            //this.data.setFloat32Mat("rotationMatrix3D", this._rotationMatrix.m);//32
            this.data.vcmatData.set(this._rotationMatrix.m, 32);
            //Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvMove", this._resultUvVec);
            //this.data.setFloat32Vec("uvMove",this._resultUvVec);//64
            this.data.vcmatData.set(this._resultUvVec, 64);

            this.setMaterialVc();

            if (!this.facetdata._isCycle && this._time / Scene_data.frameTime > (this.data._life - 2)) {
                this._lifeVisible = false;
            }

            Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);

        }

        public setVa(): void {
            var tf: boolean = Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 12);
            }

            //Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            //Scene_data.context3D.setVa(1, 2, this.data.objData.uvBuffer);

            this.setMaterialTexture();

            Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        }

        public updateRotaionMatrix(): void {
            this._rotationMatrix.identity();

            if (this.data._watchEye) {
                this.timeline.inverAxisRotation(this._rotationMatrix);

                if (!this.facetdata._locky && !this.facetdata._lockx) {
                    this.inverBind();
                }

                if (!this.facetdata._locky) {
                    this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
                }
                if (!this.facetdata._lockx) {
                    this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);
                }
            }

            if (this.data._isZiZhuan) {
                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
            }


        }

        public updateUV(): void {

            var currentFrame: number = float2int(this._time / Scene_data.frameTime);
            currentFrame = currentFrame > this.facetdata._maxAnimTime ? this.facetdata._maxAnimTime : currentFrame;
            currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);

            this._resultUvVec[0] = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Scene_data.frameTime * this.data._uSpeed;
            this._resultUvVec[1] = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Scene_data.frameTime * this.data._vSpeed;

        }




    }
}