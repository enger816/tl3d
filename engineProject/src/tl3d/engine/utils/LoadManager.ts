namespace tl3d {
    export class LoadManager {
        static BYTE_TYPE: string = "BYTE_TYPE";
        static IMG_TYPE: string = "IMG_TYPE";
        static XML_TYPE: string = "XML_TYPE";

        private static _instance: LoadManager;
        static getInstance(): LoadManager {
            if (!this._instance) {
                this._instance = new LoadManager();
            }
            return this._instance;
        }

        getVersion(vkey): string {
            vkey=Scene_data.fileSub + vkey;
            if (this._versions) { //有版本管理
                return this._versions[vkey]||vkey;
            }
            return vkey; //没版本管理
        }

        public _versions: Object;
        private _loadThreadList: Array<LoaderThread>;
        private _waitLoadList: Array<LoadInfo>;
        constructor() {
            this._loadThreadList = new Array;
            this._waitLoadList = new Array;

            for (var i: number = 0; i < 5; i++) {
                this._loadThreadList.push(new LoaderThread());
            }
        }

        public load($url: string, $type: string, $fun: Function, $info: any = null, $progressFun: Function = null): void {
            //todo
            if (Scene_data.fileRoot != "") { //原生版本优化
                $url = $url.replace(Scene_data.fileRoot, "");
                $url = Scene_data.fileRoot + this.getVersion($url);
            }
            var loadInfo: LoadInfo = new LoadInfo($url, $type, $fun, $info, $progressFun);
            for (var i: number = 0; i < this._loadThreadList.length; i++) {
                if (this._loadThreadList[i].idle) {
                    this._loadThreadList[i].load(loadInfo);
                    return;
                }
            }
            this._waitLoadList.push(loadInfo);
        }

        public loadWaitList() {
            if (this._waitLoadList.length <= 0) {
                return;
            }

            for (var i: number = 0; i < this._loadThreadList.length; i++) {
                if (this._loadThreadList[i].idle) {
                    this._loadThreadList[i].load(this._waitLoadList.shift());
                    return;
                }
            }

        }
    }

    export class LoaderThread {
        private _xhr: XMLHttpRequest;
        private _img: any;
        private _loadInfo: LoadInfo;

        public idle: boolean;
        private _url: string;
        constructor() {
            this._xhr = new XMLHttpRequest();

            this._xhr.onreadystatechange = () => {
                if (!this._xhr || this._xhr.readyState !== 4) {
                    return;
                }
                if (this._xhr.status !== 0 && this._xhr.status !== 200) {
                    this.loadError();
                    return;
                }
                this.loadByteXML();
            }
            this._xhr.onprogress = (e: ProgressEvent) => {
                if (this._loadInfo.progressFun) {
                    this._loadInfo.progressFun(e.loaded / e.total);
                }
            }
            this._xhr.onerror = () => {
                this.loadError();
            }

            this._img = new Image();
            this._img.onload = () => {
                this.loadImg();
            }

            this._img.onerror = () => {
                this.loadError();
            }

            this.idle = true;
        }

        public load(loadInfo: LoadInfo): void {
            this._loadInfo = loadInfo;
            this.idle = false;
            this._url = loadInfo.url;

            if (this._loadInfo.type == LoadManager.BYTE_TYPE) {
                this._xhr.open("GET", loadInfo.vurl, true);
                this._xhr.responseType = "arraybuffer";
                this._xhr.send();
            } else if (this._loadInfo.type == LoadManager.XML_TYPE) {
                this._xhr.open("GET", loadInfo.vurl, true);
                this._xhr.responseType = "text";
                this._xhr.send();
            } else if (this._loadInfo.type == LoadManager.IMG_TYPE) {
                if (this._img.url == loadInfo.vurl) {//路径相同
                    this.loadImg();
                } else {//执行加载
                    this._img.url = loadInfo.vurl;
                    this._img.src = loadInfo.vurl;
                }

            }


        }

        public loadError(): void {
            this.idle = true;

            this._loadInfo = null;

            LoadManager.getInstance().loadWaitList();
        }

        public loadByteXML(): void {
            // if(this.idle){
            //     //console.log("加载完成*****************************"+this._url );
            // }
            if (this._loadInfo.info) {
                this._loadInfo.fun(this._xhr.response, this._loadInfo.info);
            } else {
                this._loadInfo.fun(this._xhr.response);
            }
            this.idle = true;

            this._loadInfo = null;

            LoadManager.getInstance().loadWaitList();

        }

        public loadByteImg(): void {
            this._img.src = 'data:image/png;base64,' + tl3d.Base64.encode(this._xhr.response);
        }

        public loadImg(): void {
            if (this._loadInfo.info) {
                this._loadInfo.fun(this._img, this._loadInfo.info);
            } else {
                this._loadInfo.fun(this._img);
            }
            this.idle = true;
            this._loadInfo = null;
            LoadManager.getInstance().loadWaitList();
        }

    }

    export class LoadInfo {

        public url: string;

        public type: string;

        public fun: Function;

        public info: any;

        public progressFun: Function;

        public version: string;

        constructor($url: string, $type: string, $fun: Function, $info: any = null, $progressFun: Function = null) {
            this.url = $url;
            this.type = $type;
            this.fun = $fun;
            this.info = $info;
            this.progressFun = $progressFun;
        }
        public get vurl(): string {
            return this.url
        }
    }
}



