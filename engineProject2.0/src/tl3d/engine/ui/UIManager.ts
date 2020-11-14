import { Rectangle } from "../math/Rectangle";
import { Scene_data } from "../context/Scene_data";
import { Vector2D } from "../math/Vector2D";

import { ProgramManager } from "../program/ProgramManager";

import { TimeUtil } from "../utils/TimeUtil";
import { MathClass } from "../math/MathClass";
import { TextAlign } from "./base/TextAlign";


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


    private _ctx: CanvasRenderingContext2D;
    private _canvas: any;

    public constructor() {

        this._canvas = document.createElement("canvas");
        this._canvas.style.zIndex = "3";
        this._canvas.width = 200;
        this._canvas.height = 200;
        this._canvas.style.left = 200;
        this._canvas.style.top = 300;


        this._ctx = this._canvas.getContext("2d");
        this._ctx.textBaseline = "top";

    }

    public getContext2D($width: number, $height: number, alianDefault: boolean = true): CanvasRenderingContext2D {
        this._canvas.width = $width;
        this._canvas.height = $height;
        this._ctx.clearRect(0, 0, $width, $height);
        alianDefault = true
        if (alianDefault) {
            this._ctx.textBaseline = "top";
            this._ctx.textAlign = "left";
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
}