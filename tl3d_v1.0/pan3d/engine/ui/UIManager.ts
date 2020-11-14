module Pan3d {
    export class UiTweenVo {
        private _ui: UICompenent;
        private _scale: number = 1;
        private _baseRect: Rectangle;
        public set ui(value: UICompenent) {
            this._ui = value
            this._baseRect = new Rectangle(this._ui.x, this._ui.y, this._ui.width, this._ui.height)
        }
        public get ui(): UICompenent {
            return this._ui;
        }
        public set scale(value: number) {
            this._scale = value
            this._ui.width = this._baseRect.width * this._scale;
            this._ui.height = this._baseRect.height * this._scale;
            this._ui.x = this._baseRect.x + (this._baseRect.width - this._ui.width) / 2;
            this._ui.y = this._baseRect.y + (this._baseRect.height - this._ui.height) / 2;

        }
        public get scale(): number {
            return this._scale;
        }
        public destory(): void {
            this._ui = null;
            this._scale = null;
            this._baseRect = null;
        }
        private static baseUIConatiner: UIConatiner
        public static getPosByPanel($v2d: Vector2D, $layout: any = null, $toUIConatiner: UIConatiner = null): Vector2D {
            if (!this.baseUIConatiner) {
                this.baseUIConatiner = new UIConatiner
            }
            this.baseUIConatiner.width = UIData.designWidth;
            this.baseUIConatiner.height = UIData.designHeight;
            this.baseUIConatiner.middle = 0;
            this.baseUIConatiner.center = 0;
            if ($layout) {
                for (var $key in $layout) {
                    this.baseUIConatiner[$key] = $layout[$key]
                }
            }
            this.baseUIConatiner.resize();
            var $toPos: Vector2D = new Vector2D;
            $toPos.x = $v2d.x + this.baseUIConatiner.x / UIData.Scale
            $toPos.y = $v2d.y + this.baseUIConatiner.y / UIData.Scale;
            if ($toUIConatiner) {
                $toPos.x = $toPos.x - ($toUIConatiner.x / UIData.Scale)
                $toPos.y = $toPos.y - ($toUIConatiner.y / UIData.Scale)
            }
            return $toPos
        }
    }

    export class UiTweenScale {
        private static _instance: UiTweenScale;
        public static getInstance(): UiTweenScale {
            if (!this._instance) {
                this._instance = new UiTweenScale();
            }
            return this._instance;
        }

        public constructor() {
        }
        private _uiTweenVo: UiTweenVo;
        public changeButSize($ui: any): void {
            if (this._uiTweenVo) {
                return;
            }
            this._uiTweenVo = new UiTweenVo;
            this._uiTweenVo.ui = <UICompenent>$ui;
            this._uiTweenVo.scale = 1;
            TweenMoveTo(this._uiTweenVo, 0.07, { scale: 1.2, onComplete: () => { this.changeButScale() } });
        }
        private changeButScale(): void {
            this._uiTweenVo.scale = 1.2
            TweenMoveTo(this._uiTweenVo, 0.05, { scale: 1, onComplete: () => { this.changeButEnd() } });
        }
        private changeButEnd(): void {
            this._uiTweenVo.destory();
            this._uiTweenVo = null;
        }
    }



    export class UIManager {
        public static cando: boolean = true//  标记只会选择一次。此循环结束
        public static popClikNameFun: Function;

        private static _instance: UIManager;
        public static getInstance(): UIManager {
            if (!this._instance) {
                this._instance = new UIManager();
                UIManager.popClikNameFun = ($name: string, $id: number = 0) => { this.uiClikName($name, $id) }
            }
            return this._instance;
        }
        public static uiClikName($name: string, $id: number): void {

        }

        private _uiList: Array<UIRenderComponent>;
        public _containerList: Array<UIConatiner>;

        private _ctx: CanvasRenderingContext2D;
        private _canvas: any;

        public constructor() {
            Scene_data.uiStage = new UIStage();
            Scene_data.uiBlankStage = new UIStage();

            this._canvas = document.createElement("canvas");
            this._canvas.style.zIndex = "3";
            this._canvas.width = 200;
            this._canvas.height = 200;
            this._canvas.style.left = 200;
            this._canvas.style.top = 300;


            this._ctx = this._canvas.getContext("2d");
            this._ctx.textBaseline = TextAlign.TOP;

        }

        public getContext2D($width: number, $height: number, alianDefault: boolean = true): CanvasRenderingContext2D {
            this._canvas.width = $width;
            this._canvas.height = $height;
            this._ctx.clearRect(0, 0, $width, $height);
            alianDefault = true
            if (alianDefault) {
                this._ctx.textBaseline = TextAlign.TOP;
                this._ctx.textAlign = TextAlign.LEFT;
            }
            return this._ctx;
        }
        public getGrayImageDatabyImg($img: any): ImageData {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($img.width, $img.height, false);
            $ctx.drawImage($img, 0, 0);
            var $imgData: ImageData = $ctx.getImageData(0, 0, $img.width, $img.height)
            var $gray: number
            for (var i = 0; i < $imgData.data.length; i += 4) {
                $gray = Math.floor($imgData.data[i + 0] * 0.3) + Math.floor($imgData.data[i + 1] * 0.59) + Math.floor($imgData.data[i + 2] * 0.11)
                $imgData.data[i + 0] = $gray;
                $imgData.data[i + 1] = $gray;
                $imgData.data[i + 2] = $gray;
            }
            return $imgData;
        }
        public makeCtxToGray($ctx: CanvasRenderingContext2D, $rect: Rectangle): void {
            var $imgData: ImageData = $ctx.getImageData($rect.x, $rect.y, $rect.width, $rect.height)
            var $gray: number
            for (var i = 0; i < $imgData.data.length; i += 4) {
                $gray = Math.floor($imgData.data[i + 0] * 0.3) + Math.floor($imgData.data[i + 1] * 0.59) + Math.floor($imgData.data[i + 2] * 0.11)
                $gray = $gray * 0.5 + 0.5;
                $imgData.data[i + 0] = $gray;
                $imgData.data[i + 1] = $gray;
                $imgData.data[i + 2] = $gray;
            }
            $ctx.putImageData($imgData, $rect.x, $rect.y)
        }

        public showCanvas($x: number = 0, $y: number = 0): void {
            this._canvas.style.left = $x;
            this._canvas.style.top = $y;
            document.getElementById("root").appendChild(this._canvas);
        }

        public init(): void {
            ProgrmaManager.getInstance().registe(UIShader.UI_SHADER, new UIShader());
            ProgrmaManager.getInstance().registe(UIImageShader.UI_IMG_SHADER, new UIImageShader());
            ProgrmaManager.getInstance().registe(UIMaskShader.UI_MASK_SHADER, new UIMaskShader());
            ProgrmaManager.getInstance().registe(Movie2DShader.MOVIE2D_SHADER, new Movie2DShader());
            ProgrmaManager.getInstance().registe(Sprite2DShader.SPRITE2D_SHADER, new Sprite2DShader());
            this._uiList = new Array;
            this._containerList = new Array;
            //UIData.setDesignWH(600, 400);
            //UIData.setDesignWH(50 * 16, 50 * 9);
            UIData.setDesignWH(960, 540);
            //  UIData.setDesignWH(1280, 720);
        }

        public addUI($ui: UIRenderComponent): void {
            var $id: number = 0
            for (var i: number = this._uiList.length - 1; i >= 0; i--) {
                if (this._uiList[i].sortnum <= $ui.sortnum) {
                    $id = i + 1
                    break
                }
            }

            this._uiList.splice($id, 0, $ui);



            // this._uiList.push($ui)
            $ui.rendering = true;
        }

        public removeUI($ui: UIRenderComponent): void {
            var index: number = this._uiList.indexOf($ui);
            $ui.rendering = false;
            if (index != -1) {
                this._uiList.splice(index, 1);
            }
        }

        public addUIContainer($container: UIConatiner): void {
            if ($container.hasStage) {
                return;
            }
            this._containerList.push($container);
            $container.resize();
            for (var i: number = 0; i < $container.renderList.length; i++) {
                this.addUI($container.renderList[i]);
            }
            $container.hasStage = true;

        }
        public removeAll(): void {
            while (this._containerList.length) {
                ////console.log("this._containerList.length",this._containerList.length)
                this.removeUIContainer(this._containerList[this._containerList.length - 1]);
            }
        }

        public removeUIContainer($container: UIConatiner): void {

            if (!$container.hasStage) {
                return;
            }

            var index: number = this._containerList.indexOf($container);
            $container.hasStage = false;
            if (index != -1) {
                this._containerList.splice(index, 1);
            }
            for (var i: number = 0; i < $container.renderList.length; i++) {
                this.removeUI($container.renderList[i]);
            }
        }

        public hasWindowUI(): boolean {
     
            return false;
        }
        public removeNoInterfaceUI(): void {
            for (var i: number = (this._containerList.length - 1); i >= 0; i--) {
                if (!this._containerList[i].interfaceUI) { //非主界面的时候
                    this.removeUIContainer(this._containerList[i]);
                }
            }

        }

        public resize(): void {
            if (!this._uiList) {
                return;
            }
            UIData.resize();
            for (var i: number = 0; i < this._uiList.length; i++) {
                this._uiList[i].resize();
            }

            for (var i: number = 0; i < this._containerList.length; i++) {
                this._containerList[i].resize();
            }
        }

        public upBgGroundZero(): void {
            for (var i: number = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].container.layer == -1 || this._uiList[i].sortnum == -1) {
                    this._uiList[i].update();
                }
            }
        }

        public update(): void {
            for (var i: number = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].container.layer >= 0 && this._uiList[i].sortnum != -1) {
                    this._uiList[i].update();
                }
            }
        }


        //private _touch: any;
        public regEvent($touce: any): void {
            //this._touch = $touce;
            //this._touch.on("panstart panmove panend tap", ($e: any) => { this.onTouch($e) });
            // if (false) {
            //     if (Scene_data.isPc) {
            //         document.addEventListener(MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
            //         document.addEventListener(MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
            //         document.addEventListener(MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
            //     } else {

            //         document.addEventListener(MouseType.TouchStart, ($evt: TouchEvent) => { this.onTouch($evt) });
            //         document.addEventListener(MouseType.TouchEnd, ($evt: TouchEvent) => { this.onTouch($evt) });
            //         document.addEventListener(MouseType.TouchMove, ($evt: TouchEvent) => { this.onTouch($evt) });
            //     }
            // }

        }

        private onTouch($e: any): void {
            this.interactiveEvent($e);
        }

        private onMouse($e: any): void {
            this.interactiveEvent($e);

        }
        private lastSwipeDis: number;
        private lastSwipeRot: number;
        public interactiveEvent($e: any): void {

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
                //evt.x = $e.pageX;
                //evt.y = $e.pageY;

                point.x = $e.pageX;
                point.y = $e.pageY;

            } else {
                if ($e.type == MouseType.TouchStart) {
                    //$e.preventDefault();
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                    if ($e.touches.length > 1) {
                        // evt = new InteractiveEvent(InteractiveEvent.PinchStart);
                        // this.lastSwipeDis = MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY);
                        // this.lastSwipeRot = Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX);

                        point.x = $e.touches[$e.touches.length - 1].pageX;
                        point.y = $e.touches[$e.touches.length - 1].pageY;

                    } else {
                        point.x = $e.pageX;
                        point.y = $e.pageY;
                    }



                } else if ($e.type == MouseType.TouchEnd) {
                    //alert("touseend");
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                    point.x = $e.changedTouches[0].pageX;
                    point.y = $e.changedTouches[0].pageY;

                } else if ($e.type == MouseType.TouchMove) {
                    //$e.preventDefault();
                    if ($e.touches.length > 1) {
                        evt = new InteractiveEvent(InteractiveEvent.Pinch);
                        evt.data = MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY) / this.lastSwipeDis
                        evt.roation = (Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX) - this.lastSwipeRot) * 180 / Math.PI

                    } else {
                        evt = new InteractiveEvent(InteractiveEvent.Move);
                    }

                    point.x = $e.pageX;
                    point.y = $e.pageY;

                }
                if ($e.touches.length) {
                    for (var i: number = 0; i < $e.touches.length; i++) {

                        point.x = $e.touches[i].clientX;
                        point.y = $e.touches[i].clientY;
                    }
                }


            }
            ////console.log(point.x, point.y);
            this.mouseEvetData(evt, point)
        }
        private lastMousePos: Vector2D //用来存放按下去时的位置，
        public disMoveNnum(v2d: Vector2D, $num: number): boolean {
            return Vector2D.distance(v2d, this.lastMousePos) < $num
        }
        public mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean  //true为有UI对象 flash为没有
        {
            UIManager.cando = true;
            if (Scene_data.verticalScene) {
                evt.x = point.y;
                evt.y = Scene_data.stageHeight - point.x;
            } else {
                evt.x = point.x;
                evt.y = point.y;
            }

            var tf: boolean = false;
            if (!tf) {
                for (var i: number = this._uiList.length - 1; i >= 0; i--) {
                    if (this._uiList[i]) {
                        if (this._uiList[i].container.interfaceUI == false) { //非主UI
                            if (this._uiList[i] && this._uiList[i].interactiveEvent(evt)) {
                                tf = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (!tf) {
                for (var i: number = this._uiList.length - 1; i >= 0; i--) {
                    if (this._uiList[i]) {
                        if (this._uiList[i].container.interfaceUI == true) { //是主UI
                            if (this._uiList[i] && this._uiList[i].interactiveEvent(evt)) {
                                tf = true;
                                break;
                            }
                        }
                    }
                }
            }

            if (evt.type == InteractiveEvent.Down) {
                this.lastMousePos = new Vector2D(evt.x, evt.y);
                var dt: number = TimeUtil.getTimer() - this.lastTime
                if (dt < 200) { //小于200毫秒就只认为是一次按下事件
                    return true
                }
                this.lastTime = TimeUtil.getTimer()
            }

            var $uistageTemp: boolean = Scene_data.uiStage.interactiveEvent(evt);
            if (!tf) {
                Scene_data.uiBlankStage.interactiveEvent(evt);
                return $uistageTemp;
            } else {
                return true
            }


        }
        private _eventItem: Array<UIConatiner> = new Array
        private setUseMouseEventCon($uiConatiner: UIConatiner): void {
            this._eventItem.length = 0
            if ($uiConatiner) {
                this._eventItem.push($uiConatiner);
            }
        }
        public getObjectsUnderPoint(evt: Vector2D): UICompenent {
            for (var i: number = this._uiList.length - 1; i >= 0; i--) {
                if (this._uiList[i]) {
                    if (this._uiList[i] && this._uiList[i].insetUi(evt)) {
                        return this._uiList[i].insetUi(evt);
                    }
                }
            }

            return null


        }
        private getcurrentList(): Array<UIRenderComponent> {
            var currentList: Array<UIRenderComponent> = new Array();
            for (var i: number = this._uiList.length - 1; i > 0; i--) {
                if (this._eventItem.length) {
                    for (var j: number = 0; j < this._eventItem.length; j++) {
                        if (this._eventItem[j] == this._uiList[i].container) {
                            currentList.push(this._uiList[i]);
                            j = this._eventItem.length;
                            continue;
                        }
                    }
                } else {
                    currentList.push(this._uiList[i]);
                }

            }
            return currentList
        }

        private lastTime: number = 0


    }
}