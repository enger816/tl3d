
module Pan3d {
    export class GameMouseManager {
        private static _instance: GameMouseManager;
        public static getInstance(): GameMouseManager {
            if (!this._instance) {
                this._instance = new GameMouseManager();
            }
            return this._instance;
        }
        public constructor() {
        }
        private ready: boolean = false
        public setBtn($a: UICompenent, $b: UICompenent): void {
            this.b_yaogan_bar = $a
            this.b_yaogan_bg = $b
            this.ready = true;
        }
        private b_yaogan_bar: UICompenent;
        private b_yaogan_bg: UICompenent;
        public uiConatiner: UIVirtualContainer
        private resetPos: Vector2D = new Vector2D(150, 400)
        private bindPos: Vector2D = new Vector2D()
        public addMouseEvent(): void {
            if (Scene_data.isPc) {
                document.addEventListener(MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
            } else {
                document.addEventListener(MouseType.TouchMove, ($evt: TouchEvent) => { this.onTouchMove($evt) });
                document.addEventListener(MouseType.TouchEnd, ($evt: TouchEvent) => { this.onTouchEnd($evt) });
                document.addEventListener(MouseType.TouchStart, ($evt: TouchEvent) => { this.onTouchStart($evt) });

            }
            this.bindPos.x = this.resetPos.x;
            this.bindPos.y = this.resetPos.y;
            this.updataFun = (t: number) => { this.updata(t) }
        }
        public onMouseWheel($evt: MouseWheelEvent|any): void {
            AstarUtil.sceneVectList = null;
            Scene_data.gameAngle += $evt.wheelDelta / 100;
        }
        public useMouseEvent: boolean = true;

        private isCanUseMouseEvent(): boolean {
            return this.useMouseEvent;
        }

        private onMouse($e: MouseEvent): void {

            if (!this.isCanUseMouseEvent()) {
                return
            }
            var evt: InteractiveEvent;
            var point: Vector2D = new Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == MouseType.MouseDown) {
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                } else if ($e.type == MouseType.MouseUp) {
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                } else if ($e.type == MouseType.MouseMove) {
                    evt = new InteractiveEvent(InteractiveEvent.Move);
                } else if ($e.type == MouseType.MouseClick) {

                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            this.makeMouseEvent(evt, point);
        }
        private canTestClikGroundMove: InteractiveEvent //假如是点地面空白非UI区域才会有数据
        public lastMouseEvetTime: number = 0
        private makeMouseEvent(evt: InteractiveEvent, point: Vector2D): void {


            this.lastMouseEvetTime = TimeUtil.getTimer();
            var temp: boolean = UIManager.getInstance().mouseEvetData(evt, point);
            if (evt.type == InteractiveEvent.Move) {
                return;
            }

        }

        private mouseToEvent($touchEvent: TouchEvent): InteractiveEvent {
            var evt: InteractiveEvent;
            var point: Vector2D = new Vector2D();
            if ($touchEvent.type == MouseType.TouchStart) {
                evt = new InteractiveEvent(InteractiveEvent.Down);
            } else if ($touchEvent.type == MouseType.TouchEnd) {
                evt = new InteractiveEvent(InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            } else if ($touchEvent.type == MouseType.TouchMove) {
                evt = new InteractiveEvent(InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);

            return evt;
        }
        private cantClikGround($mousePos: Vector2D): boolean {
            if (GameInstance.useYaoGan) {
                return false;
            }
            if (!GameInstance.mainChar) {
                return false;
            }
            if (!SceneManager.getInstance().render) {
                return false;
            }
            if (GameInstance.mainChar.isDeath) {
                return false;
            }



            return true
        }



        public onSceneMouseDown($evt: InteractiveEvent): void {

            if (this.ready ) {
                return;
            }
            var $mousePos: Vector2D = new Vector2D
            if (!Scene_data.verticalScene) {
                $mousePos.x = $evt.x
                $mousePos.y = $evt.y
            } else {
                $mousePos.x = $evt.y
                $mousePos.y = Scene_data.stageHeight - $evt.x
            }


        }




        private lastMousePos: Vector2D



        private onTouchStart($e: TouchEvent): void {
            if (!this.isCanUseMouseEvent()) {
                return
            }
            this.mouseToEvent($e);
        }
        private onTouchEnd($e: TouchEvent): void {

            if (!this.isCanUseMouseEvent()) {
                return
            }
            if (GameInstance.useYaoGan) {

                var hasYaoGan: boolean = false
                for (var i: number = 0; i < $e.touches.length; i++) {
                    if ($e.touches[i].identifier == this.yaoganIdentifier) {
                        hasYaoGan = true
                    }
                }
                if (!hasYaoGan) {
                    this.bindPos.x = this.resetPos.x;
                    this.bindPos.y = this.resetPos.y;
                    TimeUtil.removeFrameTick(this.updataFun);
                    this.canTestClikGroundMove = null; //
                    GameInstance.useYaoGan = false;
                    this.setBasePostion();

                }

            }
            this.mouseToEvent($e);

        }
        private setBasePostion(): void {
            this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2;
            this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2;
            //console.log(this.b_yaogan_bar.y)

            this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
            this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2;

        }
        private onTouchMove($e: TouchEvent): void {

            // alert("--MOve--");


            if (!this.isCanUseMouseEvent()) {
                return
            }

        }

        private nextSendTime: number = 0;

        public skipNum: number = 0


        private _speedDirect: Vector3D;
        private isFristTouchMove: boolean = true;
        private yaoganIdentifier: number = -1

        private updataFun: Function;
        private _lastV2dNrm: Vector2D
        public updata(t: number): void {


        }

        private getMouseDownPos($touch: Touch): Vector2D {
            var $mousePos: Vector2D = new Vector2D
            if (!Scene_data.verticalScene) {
                $mousePos.x = $touch.pageX / UIData.Scale
                $mousePos.y = $touch.pageY / UIData.Scale
            } else {
                $mousePos.x = $touch.pageY / UIData.Scale
                $mousePos.y = (Scene_data.stageHeight - $touch.pageX) / UIData.Scale
            }
            $mousePos.y += (Scene_data.stageHeight / UIData.Scale - 540)
            return $mousePos;

        }








    }
}