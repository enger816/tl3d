import {Pan3dByteArray} from "../../math/Pan3dByteArray"
import {Endian} from "../../math/Pan3dByteArray"
/***********************************************************************/
/***************��������Э�鹤���Զ����ɣ������ֶ��޸�****************/
/************************ Э��汾��:#�������ƣ�ע�� ******************************/
/***********************************************************************/





//package cow.net.structs
//{	
//import sys.utils.Stream;	




    export class Protocols {
        /*��Ч����*/
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
