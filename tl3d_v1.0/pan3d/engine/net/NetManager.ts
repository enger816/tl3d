module Pan3d {


    export class NetManager {

        private static _instance: NetManager;
        public static getInstance(): NetManager {
            if (!this._instance) {
                this._instance = new NetManager();
            }
            return this._instance;
        }

        private _socket: WebSocket;
        private _handlerMap: Object;
        public protocolos: Protocols;
        private _connetFun: Function;
        public connectState: number = 0;// 0断开 1正在连接 2连接成功

        public constructor() {
            this._handlerMap = new Object;
            this.protocolos = new Protocols(($byte: Pan3dByteArray) => {
                this.send($byte);
            })
        }

        public connect(ip: string, port: number, conntFun: Function): void {
            // var str:string = window.location.toString();
            // var preStr:string = "ws://"
            // if(str.indexOf("https") != -1){
            //     preStr = "wss://"
            // }
            this._socket = new WebSocket("ws://" + ip + ":" + port);
            this._socket.binaryType = "arraybuffer"
            this._socket.onopen = (evt: any) => { this.onopenEvent(evt) }
            this._socket.onmessage = (evt: any) => { this.onmessageEvent(evt) }
            this._socket.onclose = (evt: any) => { this.oncloseEvent(evt) }
            this._socket.onerror = (evt: any) => { this.onErrorEvent(evt) }
            this._connetFun = conntFun;
            this.connectState = 1;
        }

        private onErrorEvent(evt: any): void {
            console.log("socket error", evt);
            this.connectState = 0;
        }

        private onopenEvent(evt: any): void {
            //console.log("连接服务器成功");
            this._connetFun();
            // TimeUtil.addTimeOut(30 * 1000, () => {
            //     if (!GuidData.player) {
            //         alert("服务器关闭，请换服务器")
            //         window.location.href = "login.html";
            //     }
            // });

            this.connectState = 2;
        }

        private onmessageEvent(evt: any): void {
            var $byte: Pan3dByteArray = new Pan3dByteArray(evt.data);
            $byte.endian = Endian.LITTLE_ENDIAN;
            var optcode: number = $byte.readUnsignedShort();
            //console.log("消息号:" + optcode + ":" + this.protocolos.getFuncName(optcode))
            if (this._handlerMap[optcode]) {
                this._handlerMap[optcode]($byte);
            } else {
                console.log("未注册的消息号:" + optcode + ":" + this.protocolos.getFuncName(optcode));
            }

        }

        private oncloseEvent(evt: any): void {
            this.connectState = 2;
            console.log("服务器断开");

        }

        public reg(netReg: any): void {  //any Processor
            var obj: Object = netReg.getHanderMap();
            for (var key in obj) {
                this._handlerMap[key] = obj[key];
            }
        }

        public unReg(key: any): void {
            delete this._handlerMap[key];
        }

        public send($byte: Pan3dByteArray): void {
            this._socket.send($byte.buffer);
        }

        public close(): void {
            this._socket.close();
        }


    }
}