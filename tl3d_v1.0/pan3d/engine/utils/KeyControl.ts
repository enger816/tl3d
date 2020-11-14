module Pan3d {
    export class MouseType {
        public static MouseDown = "mousedown";
        public static MouseUp = "mouseup";
        public static MouseMove = "mousemove";
        public static MouseClick = "mouseclick";
        public static KeyDown = "keydown";
        public static KeyUp = "keyup";
        public static MouseWheel = "mousewheel";

        //public static TouchMown = "panstart";   
        //public static TouchMove = "panmove";
        //public static TouchUp = "panend";
        //public static TouchClick = "tap";

        public static TouchStart = "touchstart";
        public static TouchMove = "touchmove";
        public static TouchEnd = "touchend";
        public static TouchClick = "touchstart";

    }

    export class KeyControl {
        private static _instance: KeyControl;
        public _keyDic: Object
        private _lostMousePos: Object3D;
        private _lastFousce: Object3D;
        private _isMouseDown: boolean;
        private _isUpData: boolean = true

        constructor() {
            this._keyDic = new Object;
            this._lostMousePos = new Object3D;
            this._lastFousce = new Object3D;
            this._isMouseDown = false;

            setInterval(() => { this.upData() }, 1000 / 60);
        }
        public static get instance(): KeyControl {
            if (!this._instance) {
                this._instance = new KeyControl();
            }
            return this._instance;
        }
        public static getInstance(): KeyControl {
            if (!this._instance) {
                this._instance = new KeyControl();
            }
            return this._instance;
        }
        public init(): void {

            document.addEventListener(MouseType.MouseDown, this.onMouseDown)
            document.addEventListener(MouseType.MouseUp, this.onMouseUp)
            document.addEventListener(MouseType.MouseMove, this.onMouseMove)
            document.addEventListener(MouseType.KeyDown, this.onKeyDown)
            document.addEventListener(MouseType.KeyUp, this.onKeyUp)

        }
        public clearAllEvet(): void {
            document.removeEventListener(MouseType.MouseDown, this.onMouseDown)
            document.removeEventListener(MouseType.MouseUp, this.onMouseUp)
            document.removeEventListener(MouseType.MouseMove, this.onMouseMove)
            document.removeEventListener(MouseType.KeyDown, this.onKeyDown)
            document.removeEventListener(MouseType.KeyUp, this.onKeyUp)

        }
        public clearMouseEvent(): void {
            document.removeEventListener(MouseType.MouseDown, this.onMouseDown)
            document.removeEventListener(MouseType.MouseUp, this.onMouseUp)
            document.removeEventListener(MouseType.MouseMove, this.onMouseMove)
            this._isUpData = false;
        }

        public onMouseMove($evt: MouseEvent): void {
            var $keyControl: KeyControl = KeyControl.instance
            var $nowPos: Object3D = new Object3D;
            $nowPos.x = $evt.pageX;
            $nowPos.y = $evt.pageY;
            if ($keyControl._isMouseDown) {
                Scene_data.cam3D.rotationY = $keyControl._lastFousce.rotationY - ($nowPos.x - $keyControl._lostMousePos.x) / 10;
                Scene_data.cam3D.rotationX = $keyControl._lastFousce.rotationX - ($nowPos.y - $keyControl._lostMousePos.y) / 10;

            }


        }
        public onMouseDown($evt: MouseEvent): void {
            var $keyControl: KeyControl = KeyControl.instance
            $keyControl._isMouseDown = true

            $keyControl._lostMousePos.x = $evt.pageX;
            $keyControl._lostMousePos.y = $evt.pageY;

            $keyControl._lastFousce.rotationX = Scene_data.cam3D.rotationX
            $keyControl._lastFousce.rotationY = Scene_data.cam3D.rotationY


        }
        public onMouseUp($evt: MouseEvent): void {
            var $keyControl: KeyControl = KeyControl.instance
            $keyControl._isMouseDown = false

            // FpsMc.tipStr = $evt.layerX + ":" + $evt.layerY;


        }
        public upData(): void {
            if (!this._isUpData) {
                return;
            }
            var _keyDic: Object = this._keyDic
            if (_keyDic[65]) {   //A

                this.tureLeft()
            }
            if (_keyDic[83]) {   //S
                // FpsMc.tipStr = "S"
                this.tureDown()

            }
            if (_keyDic[68]) {   //D
                this.tureRight()

            }
            if (_keyDic[87]) {   //W
                this.tureUp()

            }
            if (_keyDic[81]) {   //Q
                Scene_data.cam3D.y -= this.speedNum
            }
            if (_keyDic[69]) {   //E
                Scene_data.cam3D.y += this.speedNum
            }
            MathClass.MathCam(Scene_data.cam3D)


        }
        public speedNum: number = 10;

        public tureLeft(): void {

            var $p: Vector3D = new Vector3D(-this.speedNum, 0, 0, 1)   //dis
            var $m: Matrix3D = new Matrix3D;
            this.mathFocus3D($p)
        }
        public tureRight(): void {

            var $p: Vector3D = new Vector3D(this.speedNum, 0, 0, 1)   //dis
            this.mathFocus3D($p)
        }

        public tureUp(): void {

            var $p: Vector3D = new Vector3D(0, 0, this.speedNum, 1)   //dis
            this.mathFocus3D($p)
        }
        public tureDown(): void {

            var $p: Vector3D = new Vector3D(0, 0, -this.speedNum, 1)   //dis

            this.mathFocus3D($p)

        }
        public mathFocus3D($p: Vector3D): void {
            var $m: Matrix3D = new Matrix3D;
            $m.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
            $m.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);
            $p = $m.transformVector($p)
            Scene_data.cam3D.x += $p.x
            Scene_data.cam3D.y += $p.y;
            Scene_data.cam3D.z += $p.z;
        }
        public onKeyDown($evt: KeyboardEvent): void {
            var _keyDic: Object = KeyControl.instance._keyDic
            _keyDic[$evt.keyCode] = true;
            if ($evt.keyCode == 0) {

            }
        }
        public onKeyUp($evt: KeyboardEvent): void {

            var _keyDic: Object = KeyControl.instance._keyDic
            _keyDic[$evt.keyCode] = false


        }

    }

}