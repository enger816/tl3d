﻿import { ResGC } from "../base/ResGC";
import { LoadManager } from "../utils/LoadManager";
import { UIManager } from "../ui/UIManager";
import { Scene_data } from "../context/Scene_data";
import { TextureRes } from "./TextureRes";

export class TextureManager extends ResGC {
    //private _dic: Object;
    private _loadDic: Object;
    private _resDic: Object;
    private _init:boolean=false;

    public defaultLightMap: WebGLTexture;

    constructor() {
        super();
        this._loadDic = new Object();
        this._resDic = new Object();
        this.initDefaultLightMapTexture();
    }

    private static _instance: TextureManager;
    public static getInstance(): TextureManager {
        if (!this._instance) {
            this._instance = new TextureManager();
        }
        return this._instance;
    }

    public hasTexture($url: string): boolean {
        if (this._dic[$url]) {
            return true;
        }
        return false;
    }

    public getTexture($url: string, $fun: Function, $wrapType: number = 0, $info: any = null, $filteType: number = 0, $mipmapType: number = 0): void {
        if (this._dic[$url]) {
            if ($info) {
                $fun(this._dic[$url], $info);
            } else {
                $fun(this._dic[$url]);
            }
            this._dic[$url].useNum++;
            return;
        }

        var textureLoad: TextureLoad = new TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType);
        if (this._loadDic[$url]) {
            var ary: Array<TextureLoad> = this._loadDic[$url];
            ary.push(textureLoad);
            return;
        }

        this._loadDic[$url] = new Array;
        this._loadDic[$url].push(textureLoad);

        if (this._resDic[$url]) {
            this.loadTextureCom(this._resDic[$url], textureLoad);
            delete this._resDic[$url];
        } else {
            LoadManager.getInstance().load($url, LoadManager.IMG_TYPE, ($img: any, _info: TextureLoad) => {
                this.loadTextureCom($img, _info);
            }, textureLoad);
        }

    }

    public getImageData($url: string, $fun: Function): void {
        LoadManager.getInstance().load($url, LoadManager.IMG_TYPE, ($img: any) => {
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($img.width, $img.height, false);
            ctx.drawImage($img, 0, 0, $img.width, $img.height);
            var imgData: ImageData = ctx.getImageData(0, 0, $img.width, $img.height);
            $fun(imgData);
        });
    }


    public getImgResByurl($url: string): any {
        return this._resDic[$url]
    }
    public addRes($url: string, $img: any): void {
        if (!this._dic[$url] && !this._resDic[$url]) {
            this._resDic[$url] = $img;
        }
    }
    public addImgRes($url: string, $img: any): void {
        this._resDic[$url] = $img
        var texture: WebGLTexture = Scene_data.context3D.getTexture($img);
        var textres: TextureRes = new TextureRes();
        textres.texture = texture;
        textres.width = $img.width;
        textres.height = $img.height;
        textres.useNum++;
        this._dic[$url] = textres;

    }

    public getCanvasTexture(ctx: CanvasRenderingContext2D): TextureRes {
        var tres: TextureRes = new TextureRes;
        var texture: WebGLTexture = Scene_data.context3D.getTexture(ctx.canvas, 0, 0);
        tres.texture = texture;
        return tres;
    }

    public getImageDataTexture(imgdata: any): WebGLTexture {
        var texture: WebGLTexture = Scene_data.context3D.getTexture(imgdata, 0, 0);
        return texture;
    }

    public getTextureRes($img: any): TextureRes {
        var tres: TextureRes = new TextureRes;
        var texture: WebGLTexture = Scene_data.context3D.getTexture($img, 0, 0);
        tres.texture = texture;
        return tres;
    }

    public updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void {
        Scene_data.context3D.updateTexture($texture, $offsetx, $offsety, ctx.canvas);
    }

    public loadTextureCom($img: any, _info: TextureLoad): void {
        var texture: WebGLTexture = Scene_data.context3D.getTexture($img, _info.wrap, _info.filter, _info.mipmap);

        var textres: TextureRes = new TextureRes();
        textres.texture = texture;
        textres.width = $img.width;
        textres.height = $img.height;
        var ary: Array<TextureLoad> = this._loadDic[_info.url];
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i].info) {
                ary[i].fun(textres, ary[i].info);
            } else {
                ary[i].fun(textres);
            }
            textres.useNum++;
        }

        delete this._loadDic[_info.url];

        this._dic[_info.url] = textres;
    }

    public initDefaultLightMapTexture(): void {
        // var canvas: any = document.createElement("canvas");
        // var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        // canvas.width = 32;
        // canvas.height = 32;
        // ctx.fillStyle = "rgb(" + 255 / 5 + "," + 255 / 5 + "," + 255 / 5 + ")";
        // ctx.fillRect(0, 0, 32, 32);
        // this.defaultLightMap = Scene_data.context3D.getTexture(canvas);
        //todo
        this.getTexture(Scene_data.fileRoot + "base/shadow.png", ($texture: TextureRes) => {
            this.defaultLightMap = $texture.texture;
        });
        // this.defaultLightMap=Scene_data.tex32;
    }

    public gc(): void {
        super.gc();
    }

}

export class TextureLoad {
    public fun: Function;
    public info: any;
    public url: string;
    public wrap: number;
    public filter: number;
    public mipmap: number;

    constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number) {
        this.fun = $fun;
        this.info = $info;
        this.url = $url;
        this.wrap = $wrap;
        this.filter = $filter;
        this.mipmap = $mipmap;
    }
}