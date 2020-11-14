module Pan3d {
    export class DynamicBaseTexItem {
        public target: TexItem;
        public paramName: string;
        public textureRes: TextureRes;

        public destory(): void {

            if (this.textureRes) {
                this.textureRes.useNum--;
            }
            this.target = null;

        }

        public get texture(): WebGLTexture {
            if (this.textureRes) {
                return this.textureRes.texture;
            }
            return null;
        }

    }
}