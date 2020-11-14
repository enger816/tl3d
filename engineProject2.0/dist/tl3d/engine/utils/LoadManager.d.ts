export declare class LoadManager {
    static BYTE_TYPE: string;
    static IMG_TYPE: string;
    static XML_TYPE: string;
    private static _instance;
    static getInstance(): LoadManager;
    static getVersion(vkey: any): string;
    private _loadThreadList;
    private _waitLoadList;
    constructor();
    load($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function): void;
    loadWaitList(): void;
}
export declare class LoaderThread {
    private _xhr;
    private _img;
    private _loadInfo;
    idle: boolean;
    private _url;
    constructor();
    load(loadInfo: LoadInfo): void;
    loadError(): void;
    loadByteXML(): void;
    loadByteImg(): void;
    loadImg(): void;
}
export declare class LoadInfo {
    url: string;
    type: string;
    fun: Function;
    info: any;
    progressFun: Function;
    version: string;
    constructor($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function);
    get vurl(): string;
}
