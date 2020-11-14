module Pan3d {
    export class ObjDataManager extends ResGC {

        //private _dic: Object;
        private _loadList: Object;
        constructor() {
            //this._dic = new Object();
            super();
            this._loadList = new Object();
        }

        private static _instance: ObjDataManager;
        public static getInstance(): ObjDataManager {
            if (!this._instance) {
                this._instance = new ObjDataManager();
            }
            return this._instance;
        }

        public getObjData($url: string, $fun: Function): void {

            if (this._dic[$url]) {
                $fun(this._dic[$url]);
                this._dic[$url].useNum++;
                return;
            }
            var ary: Array<Function>;
            if (!this._loadList[$url]) {
                this._loadList[$url] = new Array;

                LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                    this.loadObjCom($byte, $url);
                });

            }
            ary = this._loadList[$url];
            ary.push($fun);

        }

        public registerUrl($url: string): void {
            if (this._dic[$url]) {
                this._dic[$url].useNum++;
            }
        }

        public releaseUrl($url: string): void {
            if (this._dic[$url]) {
                this._dic[$url].clearUseNum();
            }
        }

        public gc(): void {
            super.gc();
        }

        public readFloatNrm(byte: Pan3dByteArray, vertices: Array<number>): void {
            var verLength: number = byte.readInt();
            if (verLength > 0) {
                for (var i: number = 0; i < verLength; i++) {
                    vertices.push(byte.readFloat())
                }
            }
        }
        private readcollisionItem(byte: Pan3dByteArray, $objData: ObjData): void {
            //将碰撞体都写入对象的OBJ对象中
            var $len: number = byte.readInt();
            if ($len > 0) {
                $objData.collision = new CollisionItemVo();
                $objData.collision.collisionItem = new Array;
                for (var i: number = 0; i < $len; i++) {
                    var $xmlcollisionVo = JSON.parse(byte.readUTF());
                    var $collisionVo: CollisionVo = new CollisionVo();
                    $collisionVo.scaleX = $xmlcollisionVo.scale_x
                    $collisionVo.scaleY = $xmlcollisionVo.scale_y;
                    $collisionVo.scaleZ = $xmlcollisionVo.scale_z;
                    $collisionVo.x = $xmlcollisionVo.x;
                    $collisionVo.y = $xmlcollisionVo.y;
                    $collisionVo.z = $xmlcollisionVo.z;
                    $collisionVo.rotationX = $xmlcollisionVo.rotationX;
                    $collisionVo.rotationY = $xmlcollisionVo.rotationY;
                    $collisionVo.rotationZ = $xmlcollisionVo.rotationZ;
                    $collisionVo.scaleX = this.getFloadNum($collisionVo.scaleX)
                    $collisionVo.scaleY = this.getFloadNum($collisionVo.scaleY)
                    $collisionVo.scaleZ = this.getFloadNum($collisionVo.scaleZ)
                    $collisionVo.rotationX = this.getFloadNum($collisionVo.rotationX)
                    $collisionVo.rotationY = this.getFloadNum($collisionVo.rotationY)
                    $collisionVo.rotationZ = this.getFloadNum($collisionVo.rotationZ)
                    $collisionVo.type = $xmlcollisionVo.type;
                    $collisionVo.data = $xmlcollisionVo.data;
                    $objData.collision.collisionItem.push($collisionVo);
                }
            }
         
           
        }
        private getFloadNum(value: number): number {
            return Math.floor(value * 1000) / 1000;
        }
        public loadObjCom($byte: ArrayBuffer, $url: string): ObjData {
            if (this._dic[$url]) {
                return;
            }
            ////console.log($objData);
            var $objData: ObjData = new ObjData();
            var byte: Pan3dByteArray = new Pan3dByteArray($byte);
            var version: number = byte.readInt()

            var str: string = byte.readUTF();

            if (version >= 20) {
                this.readObj2OneBuffer(byte, $objData);
                if (version >= 37 && byte.position<byte.length) { //加上碰撞体
                    this.readcollisionItem(byte, $objData)
                }
            } else {

                BaseRes.readFloatTwoByte(byte, $objData.vertices);
                BaseRes.readFloatTwoByte(byte, $objData.uvs);
                BaseRes.readFloatOneByte(byte, $objData.lightuvs);
                BaseRes.readFloatTwoByte(byte, $objData.normals);

                BaseRes.readIntForTwoByte(byte, $objData.indexs)
                BaseRes.readFloatTwoByte(byte, $objData.tangents);
                BaseRes.readFloatTwoByte(byte, $objData.bitangents);

                $objData.vertexBuffer = Scene_data.context3D.uploadBuff3D($objData.vertices);
                $objData.uvBuffer = Scene_data.context3D.uploadBuff3D($objData.uvs);
                $objData.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objData.lightuvs);
                $objData.normalsBuffer = Scene_data.context3D.uploadBuff3D($objData.normals);
            }


            $objData.treNum = $objData.indexs.length;



            $objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objData.indexs);

            this._dic[$url] = $objData;
            var ary: Array<Function> = this._loadList[$url];
            if (ary) {
                for (var i: number = 0; i < ary.length; i++) {
                    ary[i]($objData);
                }
                delete this._loadList[$url];
            }
            return $objData;
        }

        public readObj2OneBuffer(byte: Pan3dByteArray, $objData: ObjData): void {

            var typeItem: Array<boolean> = new Array;
            var len: number;

            var typeItem: Array<boolean> = new Array;
            var dataWidth: number = 0;
            for (var i: number = 0; i < 6; i++) {
                var tf: boolean = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    switch (i) {
                        case 1://uv
                            dataWidth += 2;
                            break;
                        case 2://lightuv
                            dataWidth += 2;
                            break;
                        default:
                            dataWidth += 3;
                            break;
                    }

                }

            }

            len = byte.readFloat();

            var baseLenght: number = len;

            len *= dataWidth * 4;

            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            var uvsOffsets: number = 3;
            var lightuvsOffsets: number = uvsOffsets + 2;
            var normalsOffsets: number = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
            var tangentsOffsets: number = normalsOffsets + 3;
            var bitangentsOffsets: number = tangentsOffsets + 3;

            BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth);//vertices
            BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth);//uvs
            BaseRes.readBytes2ArrayBuffer(byte, data, 2, lightuvsOffsets, dataWidth, 1);//lightuvs
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth);//normals
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth);//tangents
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth);//bitangents

            // BaseRes.readFloatTwoByte(byte, $objData.vertices);
            // BaseRes.readFloatTwoByte(byte, $objData.uvs);
            // BaseRes.readLightUvForByte(byte, $objData.lightuvs);
            // BaseRes.readFloatTwoByte(byte, $objData.normals);
            // BaseRes.readFloatTwoByte(byte, $objData.tangents);
            // BaseRes.readFloatTwoByte(byte, $objData.bitangents);

            BaseRes.readIntForTwoByte(byte, $objData.indexs);

            // var dataAry: Array<number> = new Array;

            // for (var i: number = 0; i < baseLenght; i++) {
            //     dataAry.push($objData.vertices[i * 3]);
            //     dataAry.push($objData.vertices[i * 3 + 1]);
            //     dataAry.push($objData.vertices[i * 3 + 2]);

            //     dataAry.push($objData.uvs[i * 2]);
            //     dataAry.push($objData.uvs[i * 2 + 1]);

            //     dataAry.push($objData.lightuvs[i * 2]);
            //     dataAry.push($objData.lightuvs[i * 2 + 1]);
            // }

            ////console.log(dataAry);


            // $objData.vertexBuffer = Scene_data.context3D.uploadBuff3D($objData.vertices);
            // $objData.uvBuffer = Scene_data.context3D.uploadBuff3D($objData.uvs);
            // $objData.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objData.lightuvs);
            // $objData.normalsBuffer = Scene_data.context3D.uploadBuff3D($objData.normals);


            $objData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);

            $objData.compressBuffer = true;
            $objData.uvsOffsets = uvsOffsets * 4;
            $objData.lightuvsOffsets = lightuvsOffsets * 4;
            $objData.normalsOffsets = normalsOffsets * 4;
            $objData.tangentsOffsets = tangentsOffsets * 4;
            $objData.bitangentsOffsets = bitangentsOffsets * 4;
            $objData.stride = dataWidth * 4;

       

        }

        public creatTBNBuffer($objData: ObjData) {
            $objData.tangentBuffer = Scene_data.context3D.uploadBuff3D($objData.tangents);
            $objData.bitangentBuffer = Scene_data.context3D.uploadBuff3D($objData.bitangents);
        }

    }
}