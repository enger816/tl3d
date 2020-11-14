module Pan3d {
    export class CombineParticle extends EventDispatcher {
        //private _sourceComNum: number; 
        //private _sourceAllNum: number;

        public sourceData: CombineParticleData;

        public url: string;

        private _displayAry: Array<Display3DParticle>;
        private _time: number;
        private _maxTime: number = 1000000;
        public type: number; //类型  
        public bindMatrix: Matrix3D;
        public bindVecter3d: Vector3D;
        public bindScale: Vector3D;
        public invertBindMatrix: Matrix3D;

        //public groupBindMatrix: Matrix3D;

        private _bindTarget: IBind;
        private _bindSocket: string;

        private _rotationX: number = 0;
        private _rotationY: number = 0;
        private _rotationZ: number = 0;

        private _isInGroup: boolean;
        private _groupPos: Vector3D;
        private _groupRotation: Vector3D;
        private _groupScale: Vector3D;
        public groupMatrix: Matrix3D;
        public groupRotationMatrix: Matrix3D;

        public hasMulItem: boolean = false;

        public sceneVisible: boolean = true;

        public dynamic: boolean = false;
        public hasDestory: boolean = false;

        public constructor() {
            super();
            this._displayAry = new Array;
            this._time = 0;

            this.bindMatrix = new Matrix3D;
            this.invertBindMatrix = new Matrix3D;
            this.bindVecter3d = new Vector3D();
            this.bindScale = new Vector3D(1, 1, 1);
            this.groupMatrix = new Matrix3D();
            this.groupRotationMatrix = new Matrix3D();
            //this.groupBindMatrix = new Matrix3D();

        }
        public get displayAry(): Array<Display3DParticle> {
            return this._displayAry;
        }
        public set displayAry(value: Array<Display3DParticle>) {
            this._displayAry = value
        }

        public set maxTime(value: number) {
            this._maxTime = value;
        }

        public set bindTarget(value: IBind) {
            this._bindTarget = value;

            this.invertBindMatrix.isIdentity = false;
        }

        public set bindSocket(value: string) {
            this._bindSocket = value;
        }

        public set x(value: number) {
            this.bindVecter3d.x = value;
        }

        public set y(value: number) {
            this.bindVecter3d.y = value;
        }

        public set z(value: number) {
            this.bindVecter3d.z = value;
        }

        public get x(): number {
            return this.bindVecter3d.x;
        }

        public get y(): number {
            return this.bindVecter3d.y;
        }

        public get z(): number {
            return this.bindVecter3d.z;
        }

        public setPos($xpos: number, $ypos: number, $zpos: number): void {
            this.bindVecter3d.setTo($xpos, $ypos, $zpos);
            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].resetPos();
            }
        }

        public setMulPos(ary: Array<Array<Array<number>>>): void {
            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].resetMulPos(ary);
            }
        }

        public set scaleX(value: number) {
            this.bindScale.x = value;
        }

        public set scaleY(value: number) {
            this.bindScale.y = value;
        }

        public set scaleZ(value: number) {
            this.bindScale.z = value;
        }

        public set rotationX(value: number) {
            this._rotationX = value;
            this.applyRotation();
        }

        public set rotationY(value: number) {
            this._rotationY = value;
            this.applyRotation();
        }

        public set rotationZ(value: number) {
            this._rotationZ = value;
            this.applyRotation();
        }

        public applyRotation(): void {
            this.bindMatrix.identity();
            this.bindMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS);
            this.bindMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
            this.bindMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS);

            this.bindMatrix.copyTo(this.invertBindMatrix);
            this.invertBindMatrix.invert();
            this.invertBindMatrix.isIdentity = false;
        }

        public setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void {
            this._isInGroup = true;
            this._groupPos = $pos;
            this._groupRotation = $rotaion;
            this._groupScale = $scale;

            this.groupMatrix.isIdentity = false;
            this.groupMatrix.identity();

            this.groupMatrix.appendScale($scale.x, $scale.y, $scale.z);
            this.groupMatrix.appendRotation($rotaion.x, Vector3D.X_AXIS);
            this.groupMatrix.appendRotation($rotaion.y, Vector3D.Y_AXIS);
            this.groupMatrix.appendRotation($rotaion.z, Vector3D.Z_AXIS);
            this.groupMatrix.appendTranslation($pos.x, $pos.y, $pos.z);

            this.groupRotationMatrix.isIdentity = false;
            this.groupRotationMatrix.identity();

            this.groupRotationMatrix.prependRotation($rotaion.z, Vector3D.Z_AXIS);
            this.groupRotationMatrix.prependRotation($rotaion.y, Vector3D.Y_AXIS);
            this.groupRotationMatrix.prependRotation($rotaion.x, Vector3D.X_AXIS);

        }
        public setDataByte(byte: Pan3dByteArray): void {
            byte.position = 0;

            var version: number = byte.readInt();

            var len: number = byte.readInt();
            //this._sourceComNum = 0;
            this._maxTime = 0;
            //this._sourceAllNum = len;
            this._displayAry = new Array;
            for (var i: number = 0; i < len; i++) {

                var $particleType: number = byte.readInt();

                var display3D: Display3DParticle = this.getDisplay3DById($particleType);
                display3D.setAllByteInfo(byte, version);
                display3D.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);

                this._displayAry.push(display3D);

                if (display3D.timeline.maxFrameNum > this._maxTime) {
                    this._maxTime = display3D.timeline.maxFrameNum;
                }

            }

            this._maxTime *= Scene_data.frameTime;
        }

        public addPrticleItem($dis: Display3DParticle): void {
            $dis.visible = false;
            $dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
            this._displayAry.push($dis);
        }
        private getDisplay3DById(particleType: number): Display3DParticle {
            var diaplayInfo: any = new Object;
            diaplayInfo.particleType = particleType
            return this.getDisplay3D(diaplayInfo);
        }

        public setData(ary: Array<any>): void {
            //this._sourceComNum = 0;
            //this._sourceAllNum = ary.length; 
            this._displayAry = new Array;
            this._maxTime = 0;

            for (var i: number = 0; i < ary.length; i++) {
                var diaplayInfo: Object = ary[i].display;

                var display3D: Display3DParticle = this.getDisplay3D(diaplayInfo);
                //display3D.setAllInfo(ary[i]);
                display3D.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);

                //display3D.addEventListener(EngineEvent.COMPLETE, this.onSourceLoadCom, this);

                //display3D.bindTarget = _bindTarget;
                //display3D.bindSocket = _bindSocket;

                //display3D.setAllInfo(diaplayInfo);

                //display3D.priority = priority;

                //display3D.outVisible = this._visible;

                //display3D.isInGroup = _isInGroup;
                //display3D.groupPos = _groupPos;
                //display3D.groupRotation = _groupRotation;
                //display3D.groupScale = _groupScale;

                this._displayAry.push(display3D);

                if (display3D.timeline.maxFrameNum > this._maxTime) {
                    this._maxTime = display3D.timeline.maxFrameNum;
                }

            }

            this._maxTime *= Scene_data.frameTime;


            //updateMatrix();

            //updateBind();

            //if (_hasStage) {
            //    addToRender();
            //}

            //maxTime = getMaxNum();
            //_hasData = true;
            //if (_cloneList) {//如果有对应的克隆队列
            //    for (i = 0; i < _cloneList.length; i++) {
            //        _cloneList[i].cloneData(this);
            //    }
            //    _cloneList.length = 0;
            //    _cloneList = null;
            //}

            //if (_hasRealDispose) {
            //    realDispose();
            //}

        }

        public updateTime(t: number): void {
            this._time += t;
            if (!this._displayAry) {
                return;
            }

            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].updateTime(this._time);
            }

            this.updateBind();

            if (this._time >= this._maxTime) {
                this.dispatchEvent(new BaseEvent(BaseEvent.COMPLETE));
            }

        }

        public updateBind(): void {
            if (this._bindTarget) {

                this._bindTarget.getSocket(this._bindSocket, this.bindMatrix);

                this.bindVecter3d.setTo(this.bindMatrix.x, this.bindMatrix.y, this.bindMatrix.z);

                this.bindMatrix.identityPostion();

                if (!this.groupRotationMatrix.isIdentity) {
                    this.bindMatrix.copyTo(this.invertBindMatrix);
                    this.invertBindMatrix.prepend(this.groupRotationMatrix);
                    this.invertBindMatrix.invert();
                } else {
                    this.bindMatrix.invertToMatrix(this.invertBindMatrix);
                }

                //if (this.hasMulItem){
                //    if (this._bindTarget.getSunType() == 1){
                //        var bt: any = this._bindTarget;

                //        if (typeof bt.getMulSocket == 'function') {
                //            for (var i: number = 0; i < this._displayAry.length; i++) {
                //                bt.getMulSocket(this._displayAry[i].getMulBindList());
                //            }
                //        }

                //    }
                //}

            }

        }

        public reset(): void {
            this._time = 0;
            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].reset();
            }
        }

        public update(): void {
            if (!this.sceneVisible) {
                return;
            }
            if (!this._displayAry) {
                return;
            }
            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].update();
            }
        }

        public updateItem(idx: number): void {
            if (!this.sceneVisible) {
                return;
            }
            if (this.hasDestory) {
                return;
            }
            this._displayAry[idx].update();
        }

        public get size(): number {
            if (!this._displayAry) {
                return 0;
            }
            return this._displayAry.length;
        }

        //private onSourceLoadCom(event: BaseEvent): void {
        //    //console.log(event.type);
        //    event.target.removeEventListener(BaseEvent.COMPLETE, this.onSourceLoadCom, this);
        //}

        private getDisplay3D(obj: any): Display3DParticle {
            var types: number = obj.particleType;
            var display3D: Display3DParticle;
            switch (types) {
                case 1:
                    {
                        display3D = new Display3DFacetParticle();
                        break;
                    }
                case 18:
                    {
                        display3D = new Display3DBallPartilce();
                        break;
                    }
                case 3:
                    {
                        display3D = new Display3DLocusPartilce();
                        break;
                    }
                case 14:
                    {
                        display3D = new Display3DLocusBallPartilce();
                        break;
                    }
                case 9:
                    {
                        display3D = new Display3DModelObjParticle();
                        break;
                    }
                case 4:
                    {
                        display3D = new Display3DModelPartilce();
                        break;
                    }
                case 7:
                    {
                        display3D = new Display3dModelAnimParticle();
                        break;
                    }
                case 8:
                    {
                        display3D = new Display3DFollowPartilce();
                        break;
                    }
                // case 12:
                //     {
                //         display3D = new Display3DFollowLocusPartilce();
                //         break;
                //     }
                //case 22:
                //    {
                //        display3D = new Display3DFollowMulLocusParticle();
                //        this.hasMulItem = true;
                //        break;
                //    }
            }

            display3D.visible = false;

            return display3D;
        }

        public destory(): void {
            if (this.sourceData) {
                this.sourceData.useNum--;
            }
            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].destory();
            }
            this._displayAry.length = 0;
            this._displayAry = null;

            this.bindMatrix = null;
            this.bindVecter3d = null;
            this.bindScale = null;
            this.invertBindMatrix = null;

            this._bindTarget = null;
            this._bindSocket = null;

            this._groupPos = null;
            this._groupRotation = null;
            this._groupScale = null;
            this.groupMatrix = null;
            this.groupRotationMatrix = null;
            this.hasDestory = true;
        }

    }
}