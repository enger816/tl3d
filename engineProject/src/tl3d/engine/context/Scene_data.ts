namespace tl3d {
    export class Scene_data {
        static context3D: Context3D;
        static canvas3D: HTMLCanvasElement;
        static stageWidth: number;
        static stageHeight: number;
        static sceneViewHW: number = 500;
        static fileRoot: string = "";
        static fileSub: string="";
        static soundPath:string="skill/sound/";
        static verticalScene: boolean = false;
        static effectsLev: number = 2;  //2高配1中配0低配

        static cam3D: Camera3D;
        static focus3D: Object3D;
        private static _viewMatrx3D: Matrix3D;
        static vpMatrix: Matrix3D;
        static camFar: number = 1000; //镜头最远距离


        static skyCubeMap: Array<WebGLTexture>;
        static pubLut: WebGLTexture;

        static frameTime: number = 1000 / 60;
        static MAX_NUMBER: number = 10000000;
        static uiStage: UIStage;
        static uiBlankStage: UIStage;

        static light: LightVo;

        static scaleLight: Array<number> = [2.0];

        static useByte: Boolean = true

        static fogColor: Array<number> = [0, 0, 0];
        static fogData: Array<number> = [825, 0.003];

        static gameAngle: number = 0
        static sceneNumId: number = 0;
        static fbo: FBO;

        static set viewMatrx3D(value: Matrix3D) {
            Scene_data._viewMatrx3D = value
        }
        static get viewMatrx3D(): Matrix3D {
            return Scene_data._viewMatrx3D;
        }

        static supportBlob: boolean = false;


    }
}