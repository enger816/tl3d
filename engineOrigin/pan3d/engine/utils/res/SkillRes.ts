module Pan3d {
    export class SkillRes extends BaseRes {

        public skillUrl: string;
        private _fun: Function;
        public meshBatchNum: number;
        public data: any;

        constructor() {
            super();
            this.meshBatchNum = 1;
        }

        public load(url: string, $fun: Function): void {
            this._fun = $fun;
            LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadComplete($byte);
            });
        }

        public loadComplete($byte: ArrayBuffer): void {
            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0
            this.version = this._byte.readInt();
            this.skillUrl = this._byte.readUTF();

            ////console.log("aaaaaaaaaaaaaa " + $byte.byteLength + "," + this._byte.length);
            this.read(() => { this.readNext() });//readimg 


        }

        private readNext(): void {
            this.read();//readmaterial
            this.read();//readparticle;

            if (this.version < 27) {
                var str: string = this._byte.readUTF();
            }

            this.data = this.readData(this._byte)


            this._fun();
        }

        private readData($byte: Pan3dByteArray): any {
            var len: number = $byte.readInt();
            var byteData: any = new Object;

            for (var i: number = 0; i < len; i++) {
                var $obj: any = new Object;
                var $name: string = $byte.readUTF()
                var $action: string = $byte.readUTF();
                $obj.skillname = $name;
                $obj.action = $action;

                $obj.type = $byte.readFloat();
                if (this.version >= 26) {
                    $obj.blood = $byte.readInt();
                    if ($obj.blood == 0) {
                        $obj.blood = SkillVo.defaultBloodTime;
                    }
                } else {
                    $obj.blood = SkillVo.defaultBloodTime;
                }
                if (this.version >= 32) {
                    var soundTime: number = $byte.readInt();
                    if (soundTime > 0) {
                        var soundName: string = $byte.readUTF();
                        $obj.sound = { time: soundTime, name: soundName };
                    }
                }

                if (this.version >= 33) {

                    var shockLen: number = $byte.readInt();
                    if (shockLen) {
                        var shockAry: Array<any> = new Array;
                        for (var k: number = 0; k < shockLen; k++) {
                            var shobj: any = new Object;
                            shobj.time = $byte.readInt();
                            shobj.lasttime = $byte.readInt();
                            shobj.amp = $byte.readFloat();
                            shockAry.push(shobj);
                        }
                        $obj.shock = shockAry;
                    }
                }
                // $obj.data=JSON.parse($byte.readUTF())

                $obj.data = new Array;
                var dLen: number = $byte.readInt()
                for (var j: number = 0; j < dLen; j++) {
                    var dataObj: any = new Object;
                    dataObj.url = $byte.readUTF()
                    dataObj.frame = $byte.readFloat()
                    switch ($obj.type) {
                        case 1:
                            dataObj.beginType = $byte.readInt();

                            if (dataObj.beginType == 0) {
                                dataObj.beginPos = new Vector3D();
                                dataObj.beginPos.x = $byte.readFloat();
                                dataObj.beginPos.y = $byte.readFloat();
                                dataObj.beginPos.z = $byte.readFloat();
                            } else if (dataObj.beginType == 1) {
                                dataObj.beginSocket = $byte.readUTF();
                            }

                            dataObj.hitSocket = $byte.readUTF();
                            dataObj.endParticle = $byte.readUTF();

                            dataObj.multype = $byte.readInt();
                            dataObj.speed = $byte.readFloat();

                            break;
                        case 3:
                            dataObj.beginSocket = $byte.readUTF()
                            dataObj.beginType = $byte.readFloat()
                            dataObj.multype = $byte.readFloat()
                            dataObj.speed = $byte.readFloat()

                            break;
                        case 4:

                            if (this.version >= 27) {
                                var hasSocket: boolean = $byte.readBoolean();
                                dataObj.hasSocket = hasSocket;
                                if (hasSocket) {
                                    dataObj.socket = $byte.readUTF();
                                } else {
                                    dataObj.pos = this.readV3d($byte);
                                    dataObj.rotation = this.readV3d($byte);
                                }
                            } else {
                                dataObj.hasSocket = false;
                                dataObj.pos = this.readV3d($byte);
                                dataObj.rotation = this.readV3d($byte);
                            }


                            break;
                        default:

                            alert("没有类型readData")
                            break
                    }


                    $obj.data.push(dataObj)



                }

                byteData[$name] = $obj

            }
            return byteData
        }

        public readV3d($byte: Pan3dByteArray): Vector3D {
            var v3d: Vector3D = new Vector3D;
            v3d.x = $byte.readFloat();
            v3d.y = $byte.readFloat();
            v3d.z = $byte.readFloat();
            v3d.w = $byte.readFloat();
            return v3d;
        }


        //public allResCom(): void {

        //}

    }
}