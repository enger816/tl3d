﻿import { Vector3D } from "../math/Vector3D";
import { Util } from "./Util";

    export class ColorTransition {
        // private _canvas: HTMLCanvasElement;
        // private _cxt: CanvasRenderingContext2D;
        // private _gnt: CanvasGradient;

        private static _instance: ColorTransition;
        public static getInstance(): ColorTransition {
            if (!this._instance) {
                this._instance = new ColorTransition();
            }
            return this._instance;
        }

        public constructor() {
            //todo
            // this._canvas = document.createElement("canvas");
            // this._cxt = this._canvas.getContext("2d");
            // this._gnt = this._cxt.createLinearGradient(0, 0, 128, 0);
            // this._canvas.style.zIndex = "1"; 
        }

        public getImageData($data: any): ImageData {
            //todo
            // var length: number = $data.pos.length;
            // var color: Vector3D = new Vector3D();
            // for (var i: number = 0; i < length; i++) {
            //     Util.hexToArgb($data.color[i], false, color);
            //     this._gnt.addColorStop($data.pos[i] / 255, 'rgba(' + color.x + ',' + color.y + ',' + color.z + ',' + $data.alpha[i] + ')');
            // }
            // this._cxt.fillStyle = this._gnt;
            // this._cxt.fillRect(0, 0, 128, 2);
            // return this._cxt.getImageData(0, 0, 128, 2);
            return null; 
        } 

        public getImageDataByVec($data: any, $lenght: number): ImageData {
            //todo
            // var imgData: ImageData = this._cxt.createImageData(64, 1);
            // var index: number;
            // var baseindex: number;
            // for (var i: number = 0; i < 64; i++) {
            //     index = i * 4;
            //     baseindex = Util.float2int(i / 64 * $lenght) * 4;
            //     imgData.data[index] = $data[baseindex];
            //     imgData.data[index + 1] = $data[baseindex + 1];
            //     imgData.data[index + 2] = $data[baseindex + 2];
            //     imgData.data[index + 3] = $data[baseindex + 3];
            // }
            // return imgData;
            return null;
        }

        public setData() {

        }
    }