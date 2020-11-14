var Pan3d;
(function (Pan3d) {
    var NetManager = /** @class */ (function () {
        function NetManager() {
            var _this = this;
            this.connectState = 0; // 0断开 1正在连接 2连接成功
            this._handlerMap = new Object;
            this.protocolos = new Pan3d.Protocols(function ($byte) {
                _this.send($byte);
            });
        }
        NetManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new NetManager();
            }
            return this._instance;
        };
        NetManager.prototype.connect = function (ip, port, conntFun) {
            var _this = this;
            // var str:string = window.location.toString();
            // var preStr:string = "ws://"
            // if(str.indexOf("https") != -1){
            //     preStr = "wss://"
            // }
            this._socket = new WebSocket("ws://" + ip + ":" + port);
            this._socket.binaryType = "arraybuffer";
            this._socket.onopen = function (evt) { _this.onopenEvent(evt); };
            this._socket.onmessage = function (evt) { _this.onmessageEvent(evt); };
            this._socket.onclose = function (evt) { _this.oncloseEvent(evt); };
            this._socket.onerror = function (evt) { _this.onErrorEvent(evt); };
            this._connetFun = conntFun;
            this.connectState = 1;
        };
        NetManager.prototype.onErrorEvent = function (evt) {
            console.log("socket error", evt);
            this.connectState = 0;
        };
        NetManager.prototype.onopenEvent = function (evt) {
            //console.log("连接服务器成功");
            this._connetFun();
            // TimeUtil.addTimeOut(30 * 1000, () => {
            //     if (!GuidData.player) {
            //         alert("服务器关闭，请换服务器")
            //         window.location.href = "login.html";
            //     }
            // });
            this.connectState = 2;
        };
        NetManager.prototype.onmessageEvent = function (evt) {
            var $byte = new Pan3d.Pan3dByteArray(evt.data);
            $byte.endian = Pan3d.Endian.LITTLE_ENDIAN;
            var optcode = $byte.readUnsignedShort();
            //console.log("消息号:" + optcode + ":" + this.protocolos.getFuncName(optcode))
            if (this._handlerMap[optcode]) {
                this._handlerMap[optcode]($byte);
            }
            else {
                console.log("未注册的消息号:" + optcode + ":" + this.protocolos.getFuncName(optcode));
            }
        };
        NetManager.prototype.oncloseEvent = function (evt) {
            this.connectState = 2;
            console.log("服务器断开");
        };
        NetManager.prototype.reg = function (netReg) {
            var obj = netReg.getHanderMap();
            for (var key in obj) {
                this._handlerMap[key] = obj[key];
            }
        };
        NetManager.prototype.unReg = function (key) {
            delete this._handlerMap[key];
        };
        NetManager.prototype.send = function ($byte) {
            this._socket.send($byte.buffer);
        };
        NetManager.prototype.close = function () {
            this._socket.close();
        };
        return NetManager;
    }());
    Pan3d.NetManager = NetManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=NetManager.js.map