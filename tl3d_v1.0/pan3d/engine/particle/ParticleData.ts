module Pan3d {
    export class ParticleData {
        public version: number;
        public _beginTime: number;
        public _delayedTime: number = 0;
        public _width: number = 100;//宽度
        public _height: number = 100;//高度
        public _widthFixed: boolean;//宽度比例不变
        public _heightFixed: boolean;//高度比例不变
        public _tileMode: boolean;//高度比例不变
        public _originWidthScale: number = 0.5;//原点宽度比例
        public _originHeightScale: number = 0.5;//原点高度比例
        public _eyeDistance: number = 0;//距离视点距离
        public _alphaMode: number;//alpha混合模式
        public _uSpeed: number;//u坐标平移速度
        public _vSpeed: number;//v坐标平移速度
        public _animLine: number;//动画行数
        public _animRow: number;//动画列数 
        public _animInterval: number;//动画时间间隔
        public _renderPriority: number;//渲染优先级
        public _distortion: boolean;//是否扭曲
        public _isUV: boolean;
        public _isU: boolean;
        public _isV: boolean;
        public _life: number;//时间长度
        public _watchEye: boolean = false  //是否面向视点
        public _ziZhuanAngly: Vector3D;
        public _isZiZhuan: boolean = false;
        public _center: Vector3D;//中心点
        public overAllScale: number = 1;
        public _materialUrl: string;

        public materialParam: MaterialParam;
        public materialParamData: any;

        public objData: ObjData;

        public timelineData: TimeLineData;

        public rotationV3d: Vector3D;
        public center: Vector3D;

        public vcmatData: Float32Array;
        //public vcData:Float32Array;


        public destory(): void {
            if (this.objData) {
                this.objData.destory();
            }
            this.materialParam.destory();
            this.timelineData.destory();
            this.timelineData = null;
        }

        public uploadGpu(): void {

        }

        public regShader(): void {

        }

        public initVcData(): void {

        }

        public creatPartilce(): Display3DParticle {

            var particle: Display3DParticle = this.getParticle();

            particle.data = this;
            var tl: TimeLine = new TimeLine();
            tl.setAllDataInfo(this.timelineData);
            particle.setTimeLine(tl);

            particle.onCreated();

            return particle;

        }

        public getParticle(): Display3DParticle {
            return null;
        }

        public setAllByteInfo($byte: Pan3dByteArray): void {
            this.timelineData = new TimeLineData();

            this.timelineData.setByteData($byte);
            this._beginTime = this.timelineData.beginTime;
            if (this.version >= 15) {
                this._delayedTime = $byte.readFloat();
            }
            this._width = $byte.readFloat()
            this._height = $byte.readFloat()
            this._widthFixed = $byte.readBoolean()
            this._heightFixed = $byte.readBoolean()
            this._originWidthScale = $byte.readFloat()
            this._originHeightScale = $byte.readFloat()
            this._eyeDistance = $byte.readFloat()
            this._alphaMode = $byte.readFloat()
            this._uSpeed = $byte.readFloat()
            this._vSpeed = $byte.readFloat()


            this._animLine = $byte.readFloat()
            this._animRow = $byte.readFloat()
            this._animInterval = $byte.readFloat()
            this._renderPriority = $byte.readFloat()


            this._distortion = $byte.readBoolean()
            this._isUV = $byte.readBoolean()
            this._isU = $byte.readBoolean()
            this._isV = $byte.readBoolean()

            this._life = $byte.readFloat();
            this._life = this._life > 10000 ? Scene_data.MAX_NUMBER : this._life;

            this._watchEye = $byte.readBoolean();
            this._ziZhuanAngly = new Vector3D();
            this._ziZhuanAngly.x = $byte.readFloat();
            this._ziZhuanAngly.y = $byte.readFloat();
            this._ziZhuanAngly.z = $byte.readFloat();
            this._ziZhuanAngly.w = $byte.readFloat();

            this.rotationV3d = new Vector3D;
            this.rotationV3d.x = $byte.readFloat();
            this.rotationV3d.y = $byte.readFloat();
            this.rotationV3d.z = $byte.readFloat();

            this.center = new Vector3D()
            this.center.x = $byte.readFloat();
            this.center.y = $byte.readFloat();
            this.center.z = $byte.readFloat();
            this.center.w = $byte.readFloat();

            this.overAllScale = $byte.readFloat();

            //var materialParamStr: string = $byte.readUTF();
            //this.materialParamData = JSON.parse(materialParamStr);

            if (this._ziZhuanAngly && (this._ziZhuanAngly.x != 0 || this._ziZhuanAngly.y != 0 || this._ziZhuanAngly.z != 0)) {
                this._isZiZhuan = true;
            }

            this.readMaterialPara($byte)
            var strMaterialUrl: string = $byte.readUTF();
            strMaterialUrl = strMaterialUrl.replace("_byte.txt", ".txt");
            strMaterialUrl = strMaterialUrl.replace(".txt", "_byte.txt");

            this.materialByteUrl = strMaterialUrl



        }

        private set materialByteUrl(value: string) {
            if (this._materialUrl == value) {
                return;
            }
            this._materialUrl = value;
            MaterialManager.getInstance().getMaterialByte(Scene_data.fileRoot + value, ($matrial: Material) => { this.onMaterialLoad($matrial) })
        }

        private onMaterialLoad($matrial: Material): void {
            this.materialParam = new MaterialParam;
            this.materialParam.setMaterial($matrial);
            this.materialParam.setLife(this._life);


            if (this.materialParamData) {
                this.materialParam.setTextObj(this.materialParamData.texAry);
                this.materialParam.setConstObj(this.materialParamData.conAry);
            }

            MaterialManager.getInstance().loadDynamicTexUtil(this.materialParam);

            this.regShader();

        }

        private readMaterialPara($byte: Pan3dByteArray): void {
            this.materialParamData = new Object()
            var $materlUrl: string = $byte.readUTF();
            //  this.materialParamData.materialUrl = materialUrl;
            var texAryLen: number = $byte.readInt()
            this.materialParamData.texAry = new Array
            for (var i: number = 0; i < texAryLen; i++) {
                var temp: any = new Object
                temp.isParticleColor = $byte.readBoolean()
                temp.paramName = $byte.readUTF()
                temp.url = $byte.readUTF()
                if (temp.isParticleColor) {
                    temp.curve = new Object
                    this.readTempCurve($byte, temp.curve);
                }
                this.materialParamData.texAry.push(temp)
            }
            this.readMaterialParaConAry($byte)

        }

        private readTempCurve($byte: Pan3dByteArray, curve: any): void {

            curve.values = new Array()
            var has: boolean = false
            if (this.version >= 12) {
                var valuesLen: number = $byte.readInt()
                if (valuesLen > 0) {
                    var scaleNum: number = $byte.readFloat();
                }
                for (var j: number = 0; j < valuesLen; j++) {
                    var rgbLen: number = $byte.readInt()
                    var valuesArr: Array<number> = new Array
                    for (var k: number = 0; k < rgbLen; k++) {
                        valuesArr.push($byte.readByte() / 127 * scaleNum)
                    }
                    curve.values.push(valuesArr)
                }
                has = true
            }
            curve.type = $byte.readFloat();
            curve.maxFrame = $byte.readFloat();
            curve.sideType = $byte.readBoolean();
            curve.speedType = $byte.readBoolean();
            curve.useColorType = $byte.readBoolean();
            curve.items = this.readItems($byte);
            if (!has) {
                this.makeCurveData(curve)
            }
        }

        private readItems($byte: Pan3dByteArray): Array<any> {
            var items: Array<any> = new Array()
            var itemsLen: number = $byte.readInt()
            for (var u: number = 0; u < itemsLen; u++) {

                var $obj: any = new Object;
                $obj.frame = $byte.readInt();
                $obj.vec3 = $byte.readVector3D(true)
                $obj.rotation = $byte.readVector3D(true)
                $obj.rotationLeft = $byte.readVector3D(true)

                items.push($obj);

            }

            return items;

        }

        private makeCurveData($curve: any): void {

            var arr: Array<any> = $curve.items;
            var r: Array<number> = new Array
            var g: Array<number> = new Array
            var b: Array<number> = new Array
            var a: Array<number> = new Array

            for (var i: number = 0; i < arr.length; i++) {
                if (i == (arr.length - 1)) { //最后一个
                    r.push(arr[i].vec3.x)
                    g.push(arr[i].vec3.y)
                    b.push(arr[i].vec3.z)
                    a.push(arr[i].vec3.w)
                } else {
                    var $speedNum: number = arr[i + 1].frame - arr[i].frame;
                    var $A = arr[i].vec3;
                    var $B = arr[i + 1].vec3;
                    var $a = $curve.items[i].rotation;
                    var $b = $curve.items[i + 1].rotationLeft;

                    r = r.concat(this.getBzData($A.x, $B.x, $a.x, $b.x, $speedNum));
                    g = g.concat(this.getBzData($A.y, $B.y, $a.y, $b.y, $speedNum));
                    b = b.concat(this.getBzData($A.z, $B.z, $a.z, $b.z, $speedNum));
                    a = a.concat(this.getBzData($A.w, $B.w, $a.w, $b.w, $speedNum));

                }


            }

            $curve.values = new Array()
            $curve.values[0] = r;
            $curve.values[1] = g;
            $curve.values[2] = b;
            $curve.values[3] = a;

        }

        private getBzData($ax: number, $bx: number, ar: number, br: number, $speedNum: number): Array<number> {
            var num80: number = 10
            var a: Vector2D = new Vector2D(0, $ax * num80)
            var d: Vector2D = new Vector2D($speedNum, $bx * num80)

            var m: Matrix3D = new Matrix3D;
            var p: Vector3D = new Vector3D;
            m.identity()
            m.appendRotation(-ar, Vector3D.Z_AXIS)
            p = m.transformVector(new Vector3D($speedNum / 2, 0, 0))

            var b: Vector2D = new Vector2D($speedNum / 2, a.y + p.y)

            m.identity()
            m.appendRotation(-br, Vector3D.Z_AXIS)
            p = m.transformVector(new Vector3D(-$speedNum / 2, 0, 0))

            var c: Vector2D = new Vector2D($speedNum / 2, d.y + p.y)


            var ary: Array<Vector2D> = [a, b, c, d]



            var posAry: Array<Vector2D> = new Array
            var baseW: number = 3
            for (var i: number = 1; i < $speedNum * 3; i++) {

                posAry.push(this.drawbezier(ary, i / ($speedNum * 3)));
            }
            var _valueVec: Array<number> = new Array
            for (i = 0; i < $speedNum; i++) {
                for (var j: number = 0; j < posAry.length; j++) {
                    if (posAry[j].x >= i) {
                        _valueVec.push(posAry[j].y / num80);
                        break;
                    }
                }
            }

            return _valueVec



        }

        private drawbezier(_array: Array<Vector2D>, _time: number): Vector2D {
            var _newarray: Array<Vector2D> = new Array()
            if (_array.length == 0) {
                return new Vector2D()
            }
            for (var i in _array) {
                _newarray.push(new Vector2D(_array[i].x, _array[i].y))
            }
            while (_newarray.length > 1) {
                for (var j: number = 0; j < _newarray.length - 1; j++) {
                    this.mathmidpoint(_newarray[j], _newarray[j + 1], _time)
                }
                _newarray.pop()
            }

            return _newarray[0]

        }
        private mathmidpoint(a: Vector2D, b: Vector2D, t: number): void {
            var _nx: number, _ny: number;
            _nx = a.x + (b.x - a.x) * t;
            _ny = a.y + (b.y - a.y) * t;

            a.x = _nx;
            a.y = _ny;

        }

        private readMaterialParaConAry($byte: Pan3dByteArray): void {
            var arr: Array<any> = new Array
            var conAryLen: number = $byte.readInt()
            for (var i: number = 0; i < conAryLen; i++) {
                var obj: any = new Object;
                obj.type = $byte.readFloat();
                obj.indexID = $byte.readFloat();
                obj.paramName = $byte.readUTF();


                obj.curve = new Object()
                this.readTempCurve($byte, obj.curve)

                arr.push(obj);
            }

            this.materialParamData.conAry = arr

        }

        public setFloat32Vec(key: string, ary: Array<number>): void {

        }
        public setFloat32Mat(key: string, ary: Float32Array): void {

        }




    }


}