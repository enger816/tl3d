module layapan {
    export class LayaOverride2dEngine extends scene3d.OverrideEngine {
        constructor() {
            super()
        }
        public static initConfig(): void {
   
            tl3d.UIData.resize = () => { LayaOverride2dEngine.uiScaleresize() }  //更换update
            tl3d.Engine.update = () => { LayaOverride2dEngine.update() }  //更换update
            tl3d.Engine.init = ($caves: HTMLCanvasElement) => { scene2d.Override2dEngine.init($caves) } //更换引擎初始化
            tl3d.Engine.resetSize = (width?: number, height?: number) => { scene2d.Override2dEngine.resetSize(width, height) } //更尺寸变化

            tl3d.Engine.resetViewMatrx3D = () => { scene2d.Override2dEngine.resetViewMatrx3D() }
        }
        public static uiScaleresize(): void {
            //console.log("重置什么也不做")
            tl3d.UIData.Scale = 1.5
        }

    }
}