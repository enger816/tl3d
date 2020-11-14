module Pan3d {
    export class ModelRes extends BaseRes {
        private _fun: Function;
        public objUrl: string;
        public light: LightVo;
        public materialUrl: string;

        public load(url: string, $fun: Function): void {
            this._fun = $fun;
            LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadComplete($byte);
            });
        }

        public loadComplete($byte: ArrayBuffer): void {

            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0
            this.read(() => { this.readNexte() });//img
        }

        private readNexte(): void {
            this.read();//obj
            this.read();//material

            this.objUrl = this._byte.readUTF();
            this.materialUrl = this._byte.readUTF();


            if (this._byte.readBoolean()) {

                this.light = new LightVo();

                this.light.ambientColor[0] = this._byte.readFloat();
                this.light.ambientColor[1] = this._byte.readFloat();
                this.light.ambientColor[2] = this._byte.readFloat();

                this.light.sunColor[0] = this._byte.readFloat();
                this.light.sunColor[1] = this._byte.readFloat();
                this.light.sunColor[2] = this._byte.readFloat();

                this.light.sunDirect[0] = this._byte.readFloat();
                this.light.sunDirect[1] = this._byte.readFloat();
                this.light.sunDirect[2] = this._byte.readFloat();

            }

            this._fun();
        }


    }


}