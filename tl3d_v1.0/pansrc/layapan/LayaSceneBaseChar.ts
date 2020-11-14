/**
* name 
*/
module layapan {
    import CombineParticle = Pan3d.CombineParticle
    import MeshData = Pan3d.MeshData
    import BindParticle = Pan3d.BindParticle
    import Scene_data = Pan3d.Scene_data
    import ParticleManager = Pan3d.ParticleManager
    import GroupRes = Pan3d.GroupRes
    import GroupItem = Pan3d.GroupItem
    import Vector3D = Pan3d.Vector3D
    import BaseRes = Pan3d.BaseRes
    import Material = Pan3d.Material
    import TexItem = Pan3d.TexItem
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import Shader3D = Pan3d.Shader3D
    import MaterialAnimShader = Pan3d.MaterialAnimShader

    import Display3DSprite = Pan3d.Display3DSprite
    import ShadowManager = Pan3d.ShadowManager



    export class LayaSceneBaseChar extends Pan3d.Display3dMovie {
        private _avatar: number = -1;

        public set alpha(value: number) {
            this._alpha = value;
            this.changeColor[0] = 1
            this.changeColor[1] = 1
            this.changeColor[2] = 1
            this.changeColor[3] = value

            //this._partDic[$key]

            for (var strKey in this._partDic) {
                var item: Array<any> = (Array<any>(this._partDic[strKey]))
                for (var i: number = 0; i < item.length; i++) {

                    if (item[i] && item[i][0]) {
                        item[i][0].alpha = value
                    }


                }


            }
        }
        public get alpha(): number {
            return this._alpha;
        }

        public _visible: boolean = true
 
        public isBuff: boolean = false;
        public updateMaterialMesh($mesh: MeshData): void {
            // 如果是在战斗中，不要因为位置在透明层而设置模型的透明度
            // 但是在战斗中中了隐身buff 还是得设置透明度
            if (this.alpha < 1 && (this.isBuff || !this._isBattle)) {
 
                if (!LayaSceneBaseChar.alphaShader) {
                    LayaSceneBaseChar.alphaShader = this.makeAlphaShader();
                }
                var $selfShader = $mesh.material.shader
                $mesh.material.shader = LayaSceneBaseChar.alphaShader
                Scene_data.context3D.setProgram(LayaSceneBaseChar.alphaShader.program);
                Scene_data.context3D.cullFaceBack(false);
                Scene_data.context3D.setBlendParticleFactors(-1);
                this.setVcMatrix($mesh);
                Scene_data.context3D.setRenderTexture($mesh.material.shader, "alphatexture", this.getAlphaTexture($mesh.material, $mesh.materialParam), 0);
                this.setVa($mesh);
                Scene_data.context3D.setVc4fv($mesh.material.shader, "alphadata", [1, 1, 1, this.alpha]);
                this.setMeshVc($mesh);
                Scene_data.context3D.drawCall($mesh.indexBuffer, $mesh.treNum);
                $mesh.material.shader = $selfShader;
            } else {
                super.updateMaterialMesh($mesh);
            }
        }

       
        private static alphaShader: Shader3D
        private makeAlphaShader(): Shader3D {
            var shader: Shader3D = new MaterialAnimShader();
            shader.paramAry = [false, false, false, false, false, false, false, 0]
            shader.fragment =
                "precision mediump float;\n" +
                "uniform sampler2D alphatexture;\n" +
                "uniform vec4 alphadata;\n" +
                "varying vec2 v0;\n" +
                "void main(void){\n" +
                "vec4 ft0 = texture2D(alphatexture,v0);\n" +
                "gl_FragColor =ft0*alphadata;\n" +

                "}"
            var encodetf: boolean = shader.encode();
            return shader
        }


        public get visible(): boolean {
            return this._visible
        }
        public set visible(value: boolean) {
            this._visible = value
        }

        public setAvatar(num: number): void {

            if (this._avatar == num) {
                return;
            }
            this._avatar = num;
            this.setRoleUrl(this.getSceneCharAvatarUrl(num));


        }
        public set shadow(value: boolean) {
            var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene;
            if (value) {
                if (!this._shadow) {
                    console.log("无标识")
                    this._shadow = $scene.shadowManager.addShadow();
                }
            } else {
                if (this._shadow) {
                    $scene.shadowManager.removeShadow(this._shadow);
                }
            }
        }
        public update(): void {
            if (this.visible) {
                super.update()
            }
            if (this._shadow) {
                this._shadow._visible = this.visible;
            }
        }

        protected getSceneCharAvatarUrl(num: number): string {

            var $url: string = getRoleUrl(String(num))
            return getRoleUrl(String(num));
        }
        protected getSceneCharWeaponUrl(num: number, $suffix: string = ""): string {
            return getModelUrl(String(num + $suffix));
        }

        // 是否播放中
        isPlaying(): boolean {
            // if(this._completeState != 1){
            // 	return true;
            // }

            return this._completeState != 1 || !this._curentFrame || (this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1));
        }

        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void {
            if (this._hasDestory) {
                return;
            }
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];

                var posV3d: Vector3D;
                var rotationV3d: Vector3D;
                var scaleV3d: Vector3D;
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }

                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    (<LayaOverride2dSceneManager>this._scene).particleManager.addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                } else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display: Display3DSprite = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    display.alpha = this.alpha
                    this._scene.addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }

                }

            }

            this.applyVisible();

        }

        public removeStage(): void {
            this._onStage = false;
            if (this._shadow) {
                ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary: Array<any> = this._partDic[key];
                for (var i: number = 0; i < ary.length; i++) {
                    if (ary[i] instanceof CombineParticle) {
                        (<LayaOverride2dSceneManager>this._scene).particleManager.removeParticle(ary[i]);
                    } else if (ary[i] instanceof Display3DSprite) {
                        (<LayaOverride2dSceneManager>this._scene).removeSpriteDisplay(ary[i]);
                    }

                }

            }
        }
        public get px(): number {
            return this.x
        }
        public set px(value: number) {
            this.x = value
        }
        public get py(): number {
            return this.y
        }
        public set py(value: number) {
            this.y = value
        }
        public get pz(): number {
            return this.z
        }
        public set pz(value: number) {
            this.z = value
        }
        public addSkinMeshParticle(): void {
            if (!this._skinMesh) {
                return;
            }
            var dicAry: Array<CombineParticle> = new Array;
            this._partDic["mesh"] = dicAry;

            var meshAry: Array<MeshData> = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i: number = 0; i < meshAry.length; i++) {
                var particleAry: Array<BindParticle> = meshAry[i].particleAry;
                for (var j: number = 0; j < particleAry.length; j++) {
                    var bindPartcle: BindParticle = particleAry[j];

                    var particle: CombineParticle;

                    particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);

                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }

                    particle.dynamic = true;

                    particle.bindSocket = bindPartcle.socketName;

                    dicAry.push(particle);

                    particle.bindTarget = this;

                    (<LayaOverride2dSceneManager>this._scene).particleManager.addParticle(particle);

                }
            }
        }
    }
}