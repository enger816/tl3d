
module Pan3d {
    export class FpsMc {
        public drawNum: number = 0;
        public fpsStr: string = "";
        public static addFps: number = 0;
        public static fpsNowNum: number = 0;
        static tipStr: string = "";
        constructor() {


        }
        public static update(): void {

        }
        getStr(): string {
            if (true) {
                // FpsMc.fpsNowNum = Math.min(this.drawNum + float2int(this.drawNum / 10 * FpsMc.addFps), 60)
                FpsMc.fpsNowNum = Math.min(this.drawNum, 600)
                this.fpsStr = "Fps:" + String(FpsMc.fpsNowNum) + "-" + FpsMc.tipStr;
            }
            return this.fpsStr;
        }
    }


    export  class FpsStage {
        private static _instance: FpsStage;
        public static getInstance(): FpsStage {
            if (!this._instance) {
                this._instance = new FpsStage();
            }
            return this._instance;
        }
        constructor() {
        }
        public canvas2D: any;
        public loadCav: any;
        public loadCtx: CanvasRenderingContext2D;
        public init($cadves: any, $loadCav: any): void {

            this.canvas2D = $cadves;
            this.loadCav = $loadCav;
            this.fps = new FpsMc();
            this.canvasUi = this.canvas2D.getContext("2d");
            this.loadCtx = this.loadCav.getContext("2d");
            TimeUtil.addFrameTick(() => { this.upData() });

        }
        public showLoadInfo(str: string): void {
            /*
            this.loadCtx.clearRect(0, 0, this.loadCav.width, this.loadCav.height);
            this.loadCtx.font = "40px Helvetica";
            this.loadCtx.fillStyle = "#ffffff";
            this.loadCtx.textBaseline = "top";
            this.loadCtx.textAlign = "left";
            this.loadCtx.fillText(str, 0, 0);
    
            */
         
        }

        public removeShowLoad(): void {
            if (this.loadCav.parentElement) {
                this.loadCav.parentElement.removeChild(this.loadCav);
            }
            FpsStage.showFps = true;
        }
        private fps: FpsMc;
        private canvasUi: CanvasRenderingContext2D
        public static showFps: boolean = false;
        private lastTime: number = 0
        public upData(): void {
            this.fps.drawNum++;
            if (this.lastTime >= TimeUtil.getTimer() - 1000) {
                return;
            }
            this.lastTime = TimeUtil.getTimer();
            if (!FpsStage.showFps) {
                this.canvasUi.clearRect(0, 0, this.canvas2D.width, this.canvas2D.height)
                return
            }
            this.canvasUi.font = "40px Helvetica";
            var wNum: number = this.canvasUi.measureText(this.fps.getStr()).width;
            this.canvas2D.width = wNum;
            this.canvas2D.height = 30;
            this.canvasUi.clearRect(50, 0, this.canvas2D.width - 50, this.canvas2D.height)
            this.canvasUi.fillStyle = "#000000"; // text color
            this.canvasUi.fillRect(50, 0, this.canvas2D.width - 50, this.canvas2D.height);
            this.canvasUi.font = "30px Helvetica";
            this.canvasUi.fillStyle = "#ffffff"; // text color
            this.canvasUi.textBaseline = TextAlign.TOP;
            this.canvasUi.textAlign = TextAlign.LEFT;
            this.canvasUi.fillText(this.fps.getStr(), 50, 0);
            this.fps.drawNum = 0
        }



        private makeXyzLine(): void {
            var xPos: Vector3D = new Vector3D(80, 0, 0);
            var yPos: Vector3D = new Vector3D(0, 70, 0);
            var zPos: Vector3D = new Vector3D(0, 0, 80);

            var $m: Matrix3D = new Matrix3D;
            $m.appendRotation(Scene_data.cam3D.rotationY, Vector3D.Y_AXIS)
            $m.appendRotation(Scene_data.cam3D.rotationX, Vector3D.X_AXIS)


            xPos = $m.transformVector(xPos)
            yPos = $m.transformVector(yPos)
            zPos = $m.transformVector(zPos)


            this.drawLine(new Vector2D(0, 0), new Vector2D(xPos.x, -xPos.y), "#ff0000")
            this.drawLine(new Vector2D(0, 0), new Vector2D(yPos.x, -yPos.y), "#00ff00")
            this.drawLine(new Vector2D(0, 0), new Vector2D(zPos.x, -zPos.y), "#0000ff")

            this.canvasUi.font = "12px Helvetica";
            this.canvasUi.fillStyle = "#ff0000"; // text color
            this.canvasUi.fillText("x", xPos.x + this.cPos.x, -xPos.y + this.cPos.y);
            this.canvasUi.fillStyle = "#00ff00"; // text color
            this.canvasUi.fillText("y", yPos.x + this.cPos.x, -yPos.y + this.cPos.y);
            this.canvasUi.fillStyle = "#0000ff"; // text color
            this.canvasUi.fillText("z", zPos.x + this.cPos.x, -zPos.y + this.cPos.y);
        }
        private cPos: Vector2D = new Vector2D(150, 100)
        private drawLine(a: Vector2D, b: Vector2D, $color: string = "red"): void {

            this.canvasUi.beginPath();
            this.canvasUi.lineWidth = 2;
            this.canvasUi.strokeStyle = $color;
            this.canvasUi.moveTo(a.x + this.cPos.x, a.y + this.cPos.y);
            this.canvasUi.lineTo(b.x + this.cPos.x, b.y + this.cPos.y);
            this.canvasUi.stroke();

        }
        public resetSize(): void {

            this.cPos = new Vector2D(150, Scene_data.stageHeight - 100)
        }

    }


}