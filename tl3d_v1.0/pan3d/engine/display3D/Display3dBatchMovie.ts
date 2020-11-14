module Pan3d {
    export class Display3dBatchMovie extends Display3dMovie {

        public batchNum: number = 0;

        public batchPos: Array<Movie3D> = new Array;

        constructor() {
            super();
        }

        public set fileScale(value: number) {
            this._fileScale = value;

            for (var i: number = 0; i < this.batchPos.length; i++) {
                this.batchPos[i].fileScale = value;
            }

        }

        public addSun($obj: Movie3D): void {
            this.batchPos.push($obj);
            $obj.fileScale = this._fileScale;
        }

        public setVcMatrix($mesh: MeshData): void {
            Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);

            for (var i: number = 0; i < this.batchPos.length; i++) {
                Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrixAry[" + i + "]", this.batchPos[i].posMatrix.m);
            }
        }

        public setLightProbeVc($material: Material): void {

        }

        public setVa($mesh: MeshData): void {
            Scene_data.context3D.setVa(0, 3, $mesh.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, $mesh.uvBuffer);
            Scene_data.context3D.setVa(2, 4, $mesh.boneIdBuffer);
            Scene_data.context3D.setVa(3, 4, $mesh.boneWeightBuffer);

            if ($mesh.material.usePbr) {
                Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
                if ($mesh.material.useNormal) {
                    Scene_data.context3D.setVa(5, 4, $mesh.tangentBuffer);
                    Scene_data.context3D.setVa(6, 4, $mesh.bitangentBuffer);
                }
            } else {
                if ($mesh.material.lightProbe || $mesh.material.directLight) {
                    Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
                }
            }
        }

        public addStage(): void {
            super.addStage();
            if (this.batchPos.length) {
                for (var i: number = 0; i < this.batchPos.length; i++) {
                    this.batchPos[i].add();
                }
            }
        }

        public removeStage(): void {
            super.removeStage();
            if (this.batchPos.length) {
                for (var i: number = 0; i < this.batchPos.length; i++) {
                    this.batchPos[i].remove();
                }
            }
        }


    }

    export  class Movie3D extends Object3D {

        private _shadow: Shadow;

        public posData: Array<number> = [0, 0, 0, 10];

        public retinueShadowFix: Vector3D;

        public target: Vector3D;

        public hasReach: boolean = false;

        public set shadow(value: boolean) {
            if (value) {
                if (!this._shadow) {
                    this._shadow = ShadowManager.getInstance().addShadow();
                    this._shadow.x = this._x;
                    this._shadow.y = this._y;
                    this._shadow.z = this._z;
                }
            }
        }

        public _fileScale: number = 1;

        public set fileScale(value: number) {
            this._fileScale = value;
            this._scaleX *= value;
            this._scaleY *= value;
            this._scaleZ *= value;
            this.updateMatrix();
        }

        public set scale(value: number) {
            this._scaleX = value * this._fileScale;
            this._scaleY = value * this._fileScale;
            this._scaleZ = value * this._fileScale;

            this.posData[3] = 20 * value;

            this.updateMatrix();
        }

        public set x(value: number) {
            this._x = value;
            this.posData[0] = value;
            this.updateMatrix();
            if (this._shadow) {
                if (this.retinueShadowFix) {
                    this._shadow.x = value + this.retinueShadowFix.x;
                } else {
                    this._shadow.x = value;
                }
            }
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.posData[1] = value;
            this.updateMatrix();
            if (this._shadow) {
                if (this.retinueShadowFix) {
                    this._shadow.y = value + this.retinueShadowFix.y + 2;
                } else {
                    this._shadow.y = value + 2;
                }
            }
        }
        public get y(): number {
            return this._y
        }
        public set z(value: number) {
            this._z = value;
            this.posData[2] = value;
            this.updateMatrix();
            if (this._shadow) {

                if (this.retinueShadowFix) {
                    this._shadow.z = value + this.retinueShadowFix.z;
                } else {
                    this._shadow.z = value;
                }

            }
        }
        public get z(): number {
            return this._z
        }

        public add(): void {
            if (this._shadow) {
                this._shadow.visible = true;
            }
        }

        public remove(): void {
            if (this._shadow) {
                this._shadow.visible = false;
            }
        }


    }
}