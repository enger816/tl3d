module Pan3d {
    export class ObjData extends ResCount {

        public vertices: Array<number> = new Array;
        public uvs: Array<number> = new Array;
        public indexs: Array<number> = new Array;
        public lightuvs: Array<number> = new Array;
        public normals: Array<number> = new Array;
        public tangents: Array<number> = new Array;
        public bitangents: Array<number> = new Array;
        public collision: CollisionItemVo;


        public treNum: number = 0;

        public vertexBuffer: WebGLBuffer;
        public uvBuffer: WebGLBuffer;
        public indexBuffer: WebGLBuffer;
        public lightUvBuffer: WebGLBuffer;
        public normalsBuffer: WebGLBuffer;
        public tangentBuffer: WebGLBuffer;
        public bitangentBuffer: WebGLBuffer;

        /**顶点 uv lightuv normal 合成一个 va */
        public compressBuffer: boolean = false;
        public uvsOffsets: number;
        public lightuvsOffsets: number;
        public normalsOffsets: number;
        public tangentsOffsets: number;
        public bitangentsOffsets: number;
        public stride: number;
        public hasdispose: boolean = false;

        constructor() {
            super();
        }

        public destory(): void {

            this.vertices.length = 0;
            this.vertices = null;

            this.uvs.length = 0;
            this.uvs = null;

            this.indexs.length = 0;
            this.indexs = null;

            this.lightuvs.length = 0;
            this.lightuvs = null;

            this.normals.length = 0;
            this.normals = null;

            this.tangents.length = 0;
            this.tangents = null;

            this.bitangents.length = 0;
            this.bitangents = null;


            if (this.vertexBuffer) {
                Scene_data.context3D.deleteBuffer(this.vertexBuffer);
                this.vertexBuffer = null;
            }
            if (this.uvBuffer) {
                Scene_data.context3D.deleteBuffer(this.uvBuffer);
                this.uvBuffer = null;
            }
            if (this.indexBuffer) {
                Scene_data.context3D.deleteBuffer(this.indexBuffer);
                this.indexBuffer = null;
            }
            if (this.lightUvBuffer) {
                Scene_data.context3D.deleteBuffer(this.lightUvBuffer);
                this.lightUvBuffer = null;
            }
            if (this.normalsBuffer) {



                Scene_data.context3D.deleteBuffer(this.normalsBuffer);
                this.normalsBuffer = null;
            }
            if (this.tangentBuffer) {
                Scene_data.context3D.deleteBuffer(this.tangentBuffer);
                this.tangentBuffer = null;
            }
            if (this.bitangentBuffer) {
                Scene_data.context3D.deleteBuffer(this.bitangentBuffer);
                this.bitangentBuffer = null;
            }

            this.hasdispose = true;


        }




    }
}