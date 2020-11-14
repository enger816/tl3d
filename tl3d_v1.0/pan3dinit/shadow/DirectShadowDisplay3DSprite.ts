module shadow {
    import ProgrmaManager = Pan3d.ProgrmaManager
    import ObjData = Pan3d.ObjData
    import UIManager = Pan3d.UIManager
    import Vector3D = Pan3d.Vector3D
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import ObjDataManager = Pan3d.ObjDataManager
    import Shader3D = Pan3d.Shader3D
    import Display3DSprite = Pan3d.Display3DSprite
    import TextureRes = Pan3d.TextureRes
    import GroupDataManager = Pan3d.GroupDataManager
    import GroupItem = Pan3d.GroupItem
    import GroupRes = Pan3d.GroupRes
    import BaseRes = Pan3d.BaseRes


    export class DirectShadowDisplay3DShader extends Shader3D {
        static DirectShadowDisplay3DShader: string = "DirectShadowDisplay3DShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            $context.bindAttribLocation(this.program, 2, "v3Normal");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 v2CubeTexST;" +
                "varying vec2 v0;" +
                "varying vec3 v_PositionFromLight;" +
                "varying vec3 v2;" +

                "varying float cosTheta;" +
                "varying float onsunFace;" +


                "varying vec3 ambientColorF;" +

                "attribute vec3 v3Normal;" +
                "uniform vec3 sunDirect;" +
                "uniform vec3 sunColor;" +
                "uniform vec3 ambientColor;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "uniform mat4 shadowViewMatx3D;" +

                "uniform mat3 rotationMatrix3D;" +
                "void main(void){;" +
                "ambientColorF =ambientColor;" +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y); " +
                "vec4 vt0= vec4(v3Position, 1.0);" +
                "vt0 = posMatrix3D * vt0;" +
                "vt0 = vpMatrix3D * vt0;" +

                "   vec4 vt1= vec4(v3Position, 1.0);" +
                "   vt1 = posMatrix3D * vt1;" +
                "   vt1 = shadowViewMatx3D * vt1;" +
                "   v_PositionFromLight = vec3(vt1.x, vt1.y,vt1.z);" +


                "vec3 n = rotationMatrix3D * v3Normal;" +
                "float suncos = dot(n.xyz,sunDirect.xyz);" +
                "onsunFace = suncos;" +
                "cosTheta =1.0-abs(suncos);" +


                "suncos = clamp(suncos,0.0,1.0);" +


                "v2 = sunColor * suncos ;" +
                "gl_Position = vt0;" +
                "}"
            return $str;
        }

        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "uniform sampler2D fs1;\n" +
                "varying vec2 v0;\n" +
                "varying vec3 v_PositionFromLight;\n" +
                "varying vec3 v2;" +
                "varying float cosTheta;" +
                "varying float onsunFace;" +
                "varying vec3 ambientColorF;" +

                "void main(void)\n" +
                "{\n" +
                "vec4 ft5 = texture2D(fs1, v_PositionFromLight.xy); " +   //深度图采样
                "float  bias  = 0.01*cosTheta; " +
                "bias = clamp(bias, 0.003, 0.01); " +

                "float visibility = (v_PositionFromLight.z > ft5.x + bias) ? 0.9 : 1.0;\n" +    //深度判断
                "visibility =onsunFace<0.0?1.0:visibility ; " +


                "vec4 ft0 = texture2D(fs0, v0); " +    //正常纹理采样
                "vec4 ft1 = vec4(v2.xyz, 1.0); " +       //法线值
                //  "ft0.xyz = ft1.xyz*ft0.xyz; " +
                "vec4 ft2 = vec4(1, 1, 1, 1); " +

                "float isalp = (ft5.z >0.1254) ? 1.0 : 0.2;\n" +    //深度判断1254=  1236

                "gl_FragColor = vec4((ft1.xyz*visibility+ambientColorF.xyz)*ft0.rgb , 1.0); " +

                //    "gl_FragColor = vec4(ft1.xyz+ambientColorF.xyz, 1.0); " +




                "}"
            return $str

        }

    }

    export  class DirectShadowDisplay3DSprite extends Display3DSprite {

        constructor() {
            super();
            this.initData()
        }
        public needScanShadow: boolean = true
        protected initData(): void {
            ProgrmaManager.getInstance().registe(DirectShadowDisplay3DShader.DirectShadowDisplay3DShader, new DirectShadowDisplay3DShader);
            this.modelShder = ProgrmaManager.getInstance().getProgram(DirectShadowDisplay3DShader.DirectShadowDisplay3DShader);
        }
        protected modelShder: Shader3D
        public setObjUrl(value: string): void {
            ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + value, ($obj: ObjData) => {
                this.objData = $obj
            });
        }

        private nrmFlag: number = 0

        protected _uvTextureRes: TextureRes
        public update(): void {
     
            for (var i: number = 0; i < this.groupItem.length; i++) {
                this.drawTemp(this.groupItem[i]);
            }

        }
        protected drawTemp($dis: Display3DSprite): void {

            if (!(<scene3d.OverrideSceneManager>this._scene).fbo || !ShadowModel.shadowViewMatx3D) {
                return;
            }
            var $objdata: ObjData = $dis.objData;
            var $shader: Shader3D = this.modelShder;
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);


                Scene_data.context3D.setVc3fv($shader, "sunDirect", (<scene3d.OverrideSceneManager>this._scene).light.sunDirect);
                Scene_data.context3D.setVc3fv($shader, "sunColor", (<scene3d.OverrideSceneManager>this._scene).light.sunColor);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", (<scene3d.OverrideSceneManager>this._scene).light.ambientColor);

                Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);


                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);

                Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                Scene_data.context3D.setRenderTexture($shader, "fs1", (<scene3d.OverrideSceneManager>this._scene).fbo.texture, 1);
                Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);



            }
        }
        
        public updateRotationMatrix(): void {
            super.updateRotationMatrix();
            for (var i: number = 0; this.groupItem&&i < this.groupItem.length; i++) {
                var $dis: Display3DSprite = <Display3DSprite>this.groupItem[i];
                if ($dis && $dis._rotationData) {
                    if ($dis._rotationData) {
                        this._rotationMatrix.getRotaion($dis._rotationData);
                    }
                }
            }
        }
        public setPicUrl($str: string): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + $str, ($texture: TextureRes) => {
                this._uvTextureRes = $texture
            });

        }
        public groupItem: Array<Display3DSprite>
        public setModelById($str: string): void {

            this.groupItem = new Array()
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + getModelUrl($str), (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    if (item.types == BaseRes.PREFAB_TYPE) {
                        var $dis: Display3DSprite = new Display3DSprite();
                        $dis.setObjUrl(item.objUrl)
                        $dis._rotationData = new Float32Array(9)
                        this.groupItem.push($dis);
                        if (item.materialInfoArr && item.materialInfoArr.length) {
                            this.setPicUrl(item.materialInfoArr[0].url);
                        } else {
                            console.log("没有指定贴图")
                        }
                    }
                }

                this.updateRotationMatrix();
            })


        }

    }

}