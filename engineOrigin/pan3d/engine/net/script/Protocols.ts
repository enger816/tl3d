/***********************************************************************/
/***************本代码由协议工具自动生成，请勿手动修改****************/
/************************ 协议版本号:#类型名称，注释 ******************************/
/***********************************************************************/





//package cow.net.structs
//{	
//import sys.utils.Stream;	

module Pan3d {


    export class Protocols {
        /*无效动作*/
        private _send_func: Function;
        private _stream: Pan3dByteArray = new Pan3dByteArray;
        private _FUNCS: Object = new Object();
        public constructor(f: Function) {
            this._send_func = f;
            this._stream.endian = Endian.LITTLE_ENDIAN;
        }

        public getFuncName(cmd: number): string {
            if (this._FUNCS[cmd]) {
                return this._FUNCS[cmd];
            }
            return null;
        }
    }
}