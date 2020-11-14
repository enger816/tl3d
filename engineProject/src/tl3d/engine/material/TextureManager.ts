namespace tl3d {
    //贴图管理器
    export class TextureManager extends ResGC {
        private _loadDic: Object;
        private _resDic: Object;

        public defaultLightMap: WebGLTexture;

        constructor() {
            super();
            this._loadDic = new Object();
            this._resDic = new Object();
            this.initDefaultLightMapTexture();
        }

        private static _instance: TextureManager;
        static getInstance(): TextureManager {
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

        /**
         * 获取贴图
         * @param 地址 
         * @param fun 回调 
         * @param wrapType 
         * @param info 
         * @param filteType 
         * @param mipmapType 
         */
        public getTexture($url: string, $fun: Function, $wrapType: number = 0, $info: any = null, $filteType: number = 0, $mipmapType: number = 0): void {
            var textres: TextureRes=this._dic[$url];
            if (textres) {
                if ($info) {
                    $fun(textres, $info);
                } else {
                    $fun(textres);
                }
                textres.useNum++;
                return;
            }
            var textureLoad: TextureLoad = new TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType); //加载完的回调
            var loadList=this._loadDic[$url];
            if (loadList) {
                loadList.push(textureLoad);
                return;
            }
            loadList=new Array;
            loadList.push(textureLoad);
            this._loadDic[$url] = loadList;

            if (this._resDic[$url]) { //内存存在创建显存即可
                this.loadTextureCom(this._resDic[$url], textureLoad);
                delete this._resDic[$url]; 
            } else { //没有贴图对象就加载创建
                LoadManager.getInstance().load($url, LoadManager.IMG_TYPE, ($img: any, _info: TextureLoad) => {
                    this.loadTextureCom($img, _info);
                }, textureLoad);
            }
        }

        //贴图加载完毕
        private loadTextureCom($img: any, _info: TextureLoad): void {
            var texture: WebGLTexture = Scene_data.context3D.getTexture($img, _info.wrap, _info.filter, _info.mipmap);
            var textres: TextureRes = new TextureRes(_info.url);
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
            delete this._loadDic[_info.url]; //加载队列移除
            this._dic[_info.url] = textres;
        }

        //加载好的图片内存缓存一下
        public addRes($url: string, $img: any): void {
            if (!this._dic[$url] && !this._resDic[$url]) {
                this._resDic[$url] = $img;
            }
        }

        //清理缓存
        public removeRes($url: string):void
        {
            var img:HTMLImageElement=this._resDic[$url];
            if(img){
                delete this._resDic[$url];
            }
        }
    
        public getCanvasTexture(ctx: CanvasRenderingContext2D): TextureRes {
            var tres: TextureRes = new TextureRes("");
            var texture: WebGLTexture = Scene_data.context3D.getTexture(ctx.canvas, 0, 0);
            tres.texture = texture;
            return tres;
        }

        public updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void {
            Scene_data.context3D.updateTexture($texture, $offsetx, $offsety, ctx.canvas);
        }

        public loadCubeTexture($url: string, $fun: Function): void {
            var cubeMapLoad: CubemapLoad = new CubemapLoad();
            cubeMapLoad.loadCube($url, ($cubeList: any) => { $fun($cubeList) });
        }

        //初始化默认光照贴图
        public initDefaultLightMapTexture(): void {
            var canvas: any = document.createElement("canvas");
            var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
            canvas.width = 32;
            canvas.height = 32;
            ctx.fillStyle = "rgb(" + 255 / 5 + "," + 255 / 5 + "," + 255 / 5 + ")";
            ctx.fillRect(0, 0, 32, 32);
            this.defaultLightMap = Scene_data.context3D.getTexture(canvas);

        }
    }

    export  class TextureLoad {
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

    export class CubemapLoad {
        private ary: Array<WebGLTexture> = new Array(6);
        private fun: Function;
        private flagNum: number = 0;
        public loadCube($url: string, $fun: Function): void {
            this.fun = $fun;
            for (var i: number = 0; i < 6; i++) {
                var itemUrl: string = $url + "0" + (i + 1) + ".jpg";

                LoadManager.getInstance().load(itemUrl, LoadManager.IMG_TYPE, ($img: any, $info: any) => { this.loadCom($img, $info) }, { "id": i });

            }
        }

        public loadCom($img: HTMLImageElement, $info: any): void {

            var wh: number = $img.width / 4;

            var canvas: any = document.createElement("canvas");
            var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
            canvas.width = wh;
            canvas.height = wh;

            var renderContext: WebGLRenderingContext = Scene_data.context3D.renderContext;
            var texture: WebGLTexture = renderContext.createTexture();
            renderContext.bindTexture(renderContext.TEXTURE_CUBE_MAP, texture);

            ctx.drawImage($img, wh * 2, wh, wh, wh, 0, 0, wh, wh);//right
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, 0, wh, wh, wh, 0, 0, wh, wh);//left
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh, 0, wh, wh, 0, 0, wh, wh);//top
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh, wh * 2, wh, wh, 0, 0, wh, wh);//bottom
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh, wh, wh, wh, 0, 0, wh, wh);//front
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh * 3, wh, wh, wh, 0, 0, wh, wh);//back
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            this.ary[$info.id] = texture;

            this.flagNum++;

            if (this.flagNum == 6) {
                this.fun(this.ary);
            }
        }
    }
}