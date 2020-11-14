import { Pan3dByteArray } from "../math/Pan3dByteArray";
import { MaterialParam } from "./MaterialParam";
import { ResGC } from "../base/ResGC";
export declare class MaterialManager extends ResGC {
    private _loadDic;
    private _resDic;
    private _regDic;
    constructor();
    private static _instance;
    static getInstance(): MaterialManager;
    /**
    public getMaterial($url: string, $fun: Function, $info: Object = null, $autoReg: boolean = false, $regName: string = null, $shader3D: Shader3D = null): void {

        if (this._dic[$url]) {
            if ($info) {
                $fun(this._dic[$url], $info);
            } else {
                $fun(this._dic[$url]);
            }
            return;
        }

        var materialLoad: MaterialLoad = new MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3D);
        if (this._loadDic[$url]) {
            var ary: Array<MaterialLoad> = this._loadDic[$url];
            ary.push(materialLoad);
            return;
        }

        this._loadDic[$url] = new Array;
        this._loadDic[$url].push(materialLoad);

        if (this._resDic[$url]) {
            this.loadMaterialCom(this._resDic[$url], materialLoad);
        } else {
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE, ($data: string, _info: MaterialLoad) => { this.loadMaterialCom($data, _info) }, materialLoad);
        }
    }
     */
    getMaterialByte($url: string, $fun: Function, $info?: Object, $autoReg?: boolean, $regName?: string, $shader3DCls?: any): void;
    private meshByteMaterialByt;
    loadMaterialByteCom($data: ArrayBuffer, _info: MaterialLoad): void;
    addResByte($url: string, $data: Pan3dByteArray): void;
    registerUrl($url: string): void;
    releaseUrl($url: string): void;
    /**
    public loadMaterialCom($data: string, _info: MaterialLoad): void {
        var obj = JSON.parse($data);
        
        var material: Material = new Material();
        material.setCompileData(obj);
        material.url = _info.url;

        this.loadMaterial(material);

        if (_info.autoReg){
            material.program = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
        }

        var ary: Array<TextureLoad> = this._loadDic[_info.url];
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i].info) {
                ary[i].fun(material, ary[i].info);
            } else {
                ary[i].fun(material);
            }
        }
        
        delete this._loadDic[_info.url];

        this._dic[_info.url] = material;

    }
    */
    private loadMaterial;
    loadDynamicTexUtil(material: MaterialParam): void;
    gc(): void;
}
declare class MaterialLoad {
    fun: Function;
    info: any;
    url: string;
    autoReg: boolean;
    regName: string;
    shader3D: any;
    constructor($fun: Function, $info: any, $url: string, $autoReg: boolean, $regName: string, $shader3D: any);
}
export {};
