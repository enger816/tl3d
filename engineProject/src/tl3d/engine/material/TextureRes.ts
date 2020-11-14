namespace tl3d {
    export class TextureRes extends ResCount {
        public texture: WebGLTexture;
        public width: number;
        public height: number;
        public url:string;
        constructor(url:string=""){
            super();
            this.url=url;
        }
        public destory(): void {
            Scene_data.context3D.deleteTexture(this.texture);
            //console.log("销毁纹理",this.url);
        }
    }
}