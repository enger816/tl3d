namespace tl3d {
    export class TexItem {
        private _id: number;
        public url: string;
        //public texture: WebGLTexture;
        public textureRes: TextureRes;
        public isDynamic: boolean;
        public paramName: string;
        public isParticleColor: boolean;
        public isMain: boolean;
        /**
         * 0 为默认 
         * 1 lightmap 
         * 2 lutmap
         * 3 cubemap
         * 4 heightMap;
         */
        public type: number;
        public name: string;
        public wrap: number;
        public filter: number;
        public mipmap: number;
        public permul: boolean;

        public destory(): void {
            if (this.textureRes) {
                this.textureRes.clearUseNum();
            }
        }

        public set id(value: number) {
            this._id = value;
            this.name = "fs" + value;
        }

        public get id(): number {
            return this._id;
        }

        public get texture(): WebGLTexture {
            if (this.textureRes) {
                return this.textureRes.texture;
            } else {
                return null;
            }

        }

        static LIGHTMAP: number = 1;
        static LTUMAP: number = 2;
        static CUBEMAP: number = 3;
        static HEIGHTMAP: number = 4;
        static REFRACTIONMAP: number = 5;
    }
}