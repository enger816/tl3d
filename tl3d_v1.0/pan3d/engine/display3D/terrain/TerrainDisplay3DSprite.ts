
module Pan3d {
    export class GroundDataMesh {
        public tx: number;
        public ty: number;
        public idBitmap: BitMapData;
        public infoBitmap: BitMapData;
        public sixurl: string

        //处理成可以使用的2幂材质数据源
        private mekeUseTexture($img: BitMapData): BitMapData {
            var $textureRect: Rectangle = new Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));
            if ($textureRect.width != $img.width || $textureRect.height != $img.height) {
                var $temp: BitMapData = new BitMapData($textureRect.width, $textureRect.height);
                for (var i: number = 0; i < $temp.width; i++) {
                    for (var j: number = 0; j < $temp.height; j++) {
                        var $v: Vector3D = $img.getRgb(i / $temp.width * $img.width, j / $temp.height * $img.height);
                        $temp.setRgb(i, j, $v)
                    }
                }
                //    //console.log("地形信息图调整:注需要编辑器地面设置为2幂")
                return $temp
            } else {
                return $img
            }
        }
        public calibration(): void {
            this.idBitmap = this.mekeUseTexture(this.idBitmap)
            this.infoBitmap = this.mekeUseTexture(this.infoBitmap)
        }
        public static meshAllgroundData($byte: Pan3dByteArray): Array<GroundDataMesh> {
            var cellNumX: number = $byte.readInt();
            var cellNumZ: number = $byte.readInt();

            var $groudItem: Array<GroundDataMesh> = new Array()
            for (var i: number = 0; i < cellNumX; i++) {
                for (var j: number = 0; j < cellNumZ; j++) {
                    var tx: number = $byte.readInt();
                    var ty: number = $byte.readInt();
                    var $tw: number = $byte.readInt();
                    var $th: number = $byte.readInt();

                    var $groundDataMesh: GroundDataMesh = new GroundDataMesh();
                    $groundDataMesh.idBitmap = new BitMapData($tw, $th)
                    $groundDataMesh.infoBitmap = new BitMapData($tw, $th)
                    $groundDataMesh.tx = tx
                    $groundDataMesh.ty = ty
                    $groudItem.push($groundDataMesh);
                    for (var k: number = 0; k < $tw; k++) {
                        for (var h: number = 0; h < $th; h++) {

                            var $vid: Vector3D;
                            var $indexKey: number = $byte.readByte();
                            switch ($indexKey) {
                                case 0:
                                    $vid = new Vector3D(0, 1, 2);
                                    break;
                                case 1:
                                    $vid = new Vector3D(0, 1, 3);
                                    break;
                                case 2:
                                    $vid = new Vector3D(0, 2, 3)
                                    break;
                                case 3:
                                    $vid = new Vector3D(1, 2, 3)
                                    break;
                                default:
                                    throw new Error("信息索引没有编入");
                                //break;
                            }
                            $groundDataMesh.idBitmap.setRgb(k, h, new Vector3D($vid.x / 255, $vid.y / 255, $vid.z / 255, 1));
                            var $vinfo: Vector3D = new Vector3D();
                            $vinfo.x = $byte.readByte() + 128;
                            $vinfo.y = $byte.readByte() + 128;
                            $vinfo.z = 255 - $vinfo.x - $vinfo.y;

                            $groundDataMesh.infoBitmap.setRgb(k, h, new Vector3D($vinfo.x / 255, $vinfo.y / 255, $vinfo.z / 255, 1));
                        }
                    }
                    $groundDataMesh.calibration()
                }
            }
            var $sixUrl: string = $byte.readUTF();
            for (var $tempidx: number = 0; $tempidx < $groudItem.length; $tempidx++) {
                $groudItem[$tempidx].sixurl = $sixUrl;
            }
            return $groudItem

        }
    }

    export class TerrainDisplay3DSprite extends Display3DSprite {
        private groundShader: Shader3D;
        private baseSixteenRes: TextureRes;
        private idMapPicDataTexture: WebGLTexture;
        private infoMapPicDataTexture: WebGLTexture;
        constructor() {
            super();
            ProgrmaManager.getInstance().registe(TerrainDisplay3DShader.TerrainDisplay3DShader, new TerrainDisplay3DShader());
            this.groundShader = ProgrmaManager.getInstance().getProgram(TerrainDisplay3DShader.TerrainDisplay3DShader);

        }
        public update(): void {
            if (this.groundShader && this.baseSixteenRes && this.idMapPicDataTexture) {
                this.upDataToDraw();
            } else {
                super.update();
            }
        }
        private upDataToDraw(): void {
            if (this.groundShader && this.baseSixteenRes) {
                Scene_data.context3D.cullFaceBack(false);
                Scene_data.context3D.setProgram(this.groundShader.program);
                Scene_data.context3D.setVcMatrix4fv(this.groundShader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.groundShader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.groundShader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.setVc4fv(this.groundShader, "colorData", [1, 0, 1, 1]);
                var tf: boolean = Scene_data.context3D.pushVa(this.objData.vertexBuffer);
                if (!tf) {
                    Scene_data.context3D.setVaOffset(0, 3, this.objData.stride, 0);
                    Scene_data.context3D.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
                }
                Scene_data.context3D.setRenderTexture(this.groundShader, "idmaptexture", this.idMapPicDataTexture, 0);
                Scene_data.context3D.setRenderTexture(this.groundShader, "infotexture", this.infoMapPicDataTexture, 1);
                Scene_data.context3D.setRenderTexture(this.groundShader, "sixtexture", this.baseSixteenRes.texture, 2);
                Scene_data.context3D.setRenderTexture(this.groundShader, "lightexture", this.lightMapTexture, 3);

                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        }

        public setGrounDataMesh($groundDataMesh: GroundDataMesh): void {
            this.idMapPicDataTexture = Scene_data.context3D.getTexture($groundDataMesh.idBitmap.imgData, 0, 1);
            this.infoMapPicDataTexture = Scene_data.context3D.getTexture($groundDataMesh.infoBitmap.imgData, 0, 1);

            var $textureUrl: string = $groundDataMesh.sixurl;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + $textureUrl, ($texture: TextureRes) => {
                this.baseSixteenRes = $texture;
            });
        }


    }
}