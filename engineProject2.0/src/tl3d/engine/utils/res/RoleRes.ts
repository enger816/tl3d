import { BaseRes } from "./BaseRes";
import { Vector3D } from "../../math/Vector3D";
import { LoadManager } from "../LoadManager";
import { TimeUtil } from "../TimeUtil";
import { MeshDataManager } from "../MeshDataManager";
import { Util } from "../Util";
import { AnimManager } from "../AnimManager";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";

    export class RoleRes extends BaseRes {

        public roleUrl: string;
        public actionAry: Array<string>;
        private actionByte: Pan3dByteArray;
        private actionNum: number = 0;
        private actionIndex: number = 0;
        private _fun: Function;
        public meshBatchNum: number;

        public ambientLightColor: Vector3D;
        public ambientLightIntensity: number;
        public sunLigthColor: Vector3D;
        public sunLigthIntensity: number;
        public nrmDircet: Vector3D;

        //资源状态
        protected resState: string = "none";
        //开始加载
        public NONE: string = "none";
        //读取mesh
        public READ_MESH: string = "read_mesh";
        //读取动作
        public READ_ACTION: string = "read_action";
        //读取贴图
        public READ_IMAGE: string = "read_image";
        //读取贴图
        public READ_IMAGE_LOADING: string = "read_image_loading";
        //读取材质
        public READ_MATERIAL: string = "read_material";
        //读取粒子
        public READ_PARTICLE: string = "read_particle";
        //读取资源完毕
        public READ_COMPLETE: string = "read_complete";


        constructor() {
            super();
            this.meshBatchNum = 1;
        }

        public load(url: string, $fun: Function): void {
            this._fun = $fun;
            LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadComplete($byte);
            });
        }

        //更新资源状态
        public updateState(): void {
            switch (this.resState) {
                case this.READ_MESH://1.加载三角面
                    // console.log("updateState 1.加载三角面");
                    this.readMesh();
                    break;
                case this.READ_ACTION: //2.读取动作
                    // console.log("updateState 2.读取动作");
                    this.readAction(); //这里是循环多次的
                    break;
                case this.READ_IMAGE://3.读取贴图
                    this.resState = this.READ_IMAGE_LOADING;
                    // console.log("updateState 3.读取贴图");
                    this.read();
                    break;
                case this.READ_MATERIAL://4.读取材质
                    // console.log("updateState 4.读取材质");
                    this.read();
                    break;
                case this.READ_PARTICLE://5.读取粒子
                    // console.log("updateState 5.读取粒子");
                    this.read();
                    break;
                case this.READ_COMPLETE:
                    // console.log("updateState READ_COMPLETE");
                    TimeUtil.removeFrameTick(this.updateTick);
                    if (this._fun) {
                        this._fun();
                        this._fun = null;
                    }
                    break;
            }
        }

        //心跳
        public updateTick = () => {
            this.updateState();
        }

        //角色配置文件加载完毕
        public loadComplete($byte: ArrayBuffer): void {
            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0
            this.version = this._byte.readInt();
            this.resState = this.READ_MESH; //1.开始加载
            TimeUtil.addFrameTick(this.updateTick);
        }

        //读取三角面
        public readMesh(): void {
            this.roleUrl = this._byte.readUTF();
            if (this.version >= 16) { //环境参数
                this.ambientLightColor = new Vector3D;
                this.sunLigthColor = new Vector3D;
                this.nrmDircet = new Vector3D;

                this.ambientLightColor.x = this._byte.readFloat();
                this.ambientLightColor.y = this._byte.readFloat();
                this.ambientLightColor.z = this._byte.readFloat();
                this.ambientLightIntensity = this._byte.readFloat();
                this.ambientLightColor.scaleBy(this.ambientLightIntensity);

                this.sunLigthColor.x = this._byte.readFloat();
                this.sunLigthColor.y = this._byte.readFloat();
                this.sunLigthColor.z = this._byte.readFloat();
                this.sunLigthIntensity = this._byte.readFloat();
                this.sunLigthColor.scaleBy(this.sunLigthIntensity);

                this.nrmDircet.x = this._byte.readFloat();
                this.nrmDircet.y = this._byte.readFloat();
                this.nrmDircet.z = this._byte.readFloat();
            }
            MeshDataManager.getInstance().readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);
            //开始读取动作
            this.readActions();
        }

        /**读取动作*/
        private readActions(): void {
            if (this.version >= 30) {
                this.actionByte = Util.getZipByte(this._byte)
            } else {
                this.actionByte = this._byte
            }
            this.actionAry = new Array;
            this.actionNum = this.actionByte.readInt();
            this.resState = this.READ_ACTION;  //读完mesh读动作
        }

        /**读取单个动作*/
        private readAction(): void {
            if (this.actionIndex >= this.actionNum) { //动作读完就读图片
                this.resState = this.READ_IMAGE;
                return;
            }
            var actionName: string = this.actionByte.readUTF();
            AnimManager.getInstance().readData(this.actionByte, this.roleUrl + actionName);
            this.actionAry.push(actionName);
            this.actionIndex++;
        }

        /**图片读取完毕*/
        public allResCom(): void {
            this.resState = this.READ_MATERIAL;  //读完图片读材质
            this.actionByte = null; //动作用完就清空
            this.actionNum = 0;
            this.actionIndex = 0;
        }

        /**读取材质*/
        public readMaterial(): void {
            super.readMaterial();
            this.resState = this.READ_PARTICLE; //读完材质，读粒子
        }

        /**读取粒子*/
        public readParticle(): void {
            super.readParticle();
            this.resState = this.READ_COMPLETE;//读完粒子就结束
        }

    }
