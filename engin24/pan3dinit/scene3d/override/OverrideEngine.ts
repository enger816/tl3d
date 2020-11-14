import {Matrix3D} from "../../../pan3d/engine/math/Matrix3D"
import {Context3D} from "../../../pan3d/engine/context/Context3D"
import {Camera3D} from "../../../pan3d/engine/base/Camera3D"
import {Object3D} from "../../../pan3d/engine/base/Object3D"
import {Engine} from "../../../pan3d/engine/Engine"
import {TimeUtil} from "../../../pan3d/engine/utils/TimeUtil"
import {SceneManager} from "../../../pan3d/engine/scene/SceneManager"
import {Scene_data} from "../../../pan3d/engine/context/Scene_data"
import {UIManager} from "../../../pan3d/engine/ui/UIManager"
import {BloodManager} from "../../../pan3d/engine/utils/BloodManager"
import {LightVo} from "../../../pan3d/engine/vo/LightVo"

    export class OverrideEngine extends Engine {


        constructor() {
            super()
        }
        public static initConfig(): void {
             Engine.update = () => { this.update() }  //更换update
             Engine.init = ($caves: HTMLCanvasElement) => { this.init($caves) } //更换引擎初始化
             Engine.resetSize = (width?: number, height?: number) => { this.resetSize(width, height) } //更尺寸变化

        }
        public static update(): void {


             TimeUtil.update();
              SceneManager.getInstance().update();



        }
        public static resetSize(width?: number, height?: number): void {
            Scene_data.stageWidth = width;
             Scene_data.stageHeight = height;
            Scene_data.canvas3D.width = Scene_data.stageWidth;
            Scene_data.canvas3D.height = Scene_data.stageHeight;

            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);

              UIManager.getInstance().resize();
              BloodManager.getInstance().resize();
              Engine.resetViewMatrx3D()
        }


        public static init($caves: HTMLCanvasElement): void {

            var isIpad = /ipad/i.test(navigator.userAgent);
            var isIphone = /iPhone/i.test(navigator.userAgent);
            var isAndroid = /android/i.test(navigator.userAgent);
            var isWindow = /iindow/i.test(navigator.userAgent);

            var sUserAgent = navigator.userAgent.toLowerCase();
            ////console.log("--sUserAgent--",sUserAgent,isIpad,isIphone,isAndroid,isWindow);
            if (isIpad || isIphone || isAndroid) {
                 Scene_data.isPc = false;
            } else {
                 Scene_data.isPc = true;
            }

            Scene_data.vpMatrix = new  Matrix3D;
             Scene_data.canvas3D = $caves;
            Scene_data.context3D = new Context3D();
             Scene_data.context3D.init($caves);
             UIManager.getInstance().init();

              Scene_data.cam3D = new  Camera3D;
              Scene_data.focus3D = new Object3D;
             Scene_data.focus3D.x = 0;
             Scene_data.focus3D.y = 0;
             Scene_data.focus3D.z = 0;
             Scene_data.focus3D.rotationY = 135;
             Scene_data.focus3D.rotationX = -45;

            Scene_data.light = new LightVo();

             TimeUtil.init();
            //   Scene_data.supportBlob = true;

        }
    }
