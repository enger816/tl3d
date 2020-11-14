var selectserver;
(function (selectserver) {
    var SelectServerModel = /** @class */ (function () {
        function SelectServerModel() {
            this.StateKey = ["red", "orange", "green", "gray"];
        }
        SelectServerModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SelectServerModel();
            }
            return this._instance;
        };
        SelectServerModel.prototype.convertObj = function ($obj) {
            console.log("-------$obj---", $obj);
            if (!this._finalAry) {
                this._finalAry = new Array;
                // var objary: Array<Array<Object>> = $obj["aaa"];
                //已有角色
                var hasserverAryVo = new ServerAryVo();
                hasserverAryVo.serverary = new Array;
                hasserverAryVo.tabname = "已有角色";
                // for (var i = 0; i < objary.length; i++) {
                //     var obja: Array<Object> = objary[i];
                var serverAryVo;
                for (var k = 0; k < $obj.length; k++) {
                    var element = $obj[k];
                    var serverVo = new ServerVo();
                    serverVo.id = element["id"];
                    serverVo.isnew = element["isnew"];
                    serverVo.name = element["name"];
                    serverVo.state = element["state"];
                    // serverVo.curvo = element["curvo"]//是否为当前选则的服（第一次则为推荐）
                    serverVo.sid = element["sid"];
                    serverVo.pid = element["pid"];
                    serverVo.gate_ip = element["gate_ip"];
                    serverVo.gate_port = element["gate_port"];
                    var elm_rolevo = this.combackVo(serverVo.id);
                    if (elm_rolevo) {
                        // var roleVo: RoleVo = new RoleVo();
                        // roleVo.roleid = element["role"]["roleid"]
                        // roleVo.rolelev = element["role"]["rolelev"]
                        // roleVo.rolename = element["role"]["rolename"]
                        // roleVo.roletype = element["role"]["roletype"]
                        serverVo.role = elm_rolevo.role;
                        hasserverAryVo.serverary.push(serverVo);
                    }
                    //每十个一组
                    if (k % 10 == 0) {
                        serverAryVo = new ServerAryVo();
                        serverAryVo.serverary = new Array;
                        this._finalAry.push(serverAryVo);
                    }
                    serverAryVo.serverary.push(serverVo);
                    // if (serverVo.curvo) {
                    //     this._currentVo = serverVo;
                    //     serverAryVo.select = true;
                    // }
                }
                // }
                this._finalAry.unshift(hasserverAryVo);
                //默认选中服初始化数据
                for (var n = 0; n < hasserverAryVo.serverary.length; n++) {
                    if (this._listAry[0].id == hasserverAryVo.serverary[n].id) {
                        this._currentVo = hasserverAryVo.serverary[n];
                        break;
                    }
                }
                //console.log("---最终解析vo----",this._finalAry);
            }
            else {
            }
        };
        SelectServerModel.prototype.combackVo = function ($id) {
            if (!this._listAry) {
                this._listAry = this.readServerLog();
            }
            for (var i = 0; i < this._listAry.length; i++) {
                if (this._listAry[i].id == $id) {
                    return this._listAry[i];
                }
            }
            return null;
        };
        SelectServerModel.prototype.readServerLog = function () {
            var str = localStorage.getItem("loginseverlist");
            if (str) {
                return JSON.parse(str);
            }
            else {
                return [];
            }
        };
        SelectServerModel.prototype.writeServerLog = function () {
            if (!this._listAry) {
                this._listAry = this.readServerLog();
            }
            for (var i = 0; i < this._listAry.length; i++) {
                if (this._listAry[i].id == GameData.mergeServerMsgVo.id) {
                    if (i == 0) {
                        return;
                    }
                    else {
                        this._listAry.splice(i, 1);
                    }
                }
            }
            var vo = new ServerVo;
            vo.id = GameData.mergeServerMsgVo.id;
            vo.role = new RoleVo;
            vo.role.rolename = GuidData.player.getBaseName();
            vo.role.roletype = GuidData.player.getCharType();
            this._listAry.unshift(vo);
            localStorage.setItem("loginseverlist", JSON.stringify(this._listAry));
        };
        SelectServerModel.prototype.ChgCurVo = function ($vo) {
            this._currentVo = $vo;
        };
        //this._currentVo不存在时，代表新玩家
        SelectServerModel.prototype.hasCurVo = function () {
            if (this._currentVo) {
                return true;
            }
            return false;
        };
        //获得当前服务器
        SelectServerModel.prototype.getCurVo = function () {
            if (this._currentVo) {
                return this._currentVo;
            }
            else {
                var index = this._finalAry[this._finalAry.length - 1].serverary.length;
                return this._finalAry[this._finalAry.length - 1].serverary[index - 1];
            }
        };
        SelectServerModel.prototype.getFinalList = function () {
            if (!this._finalAry) {
            }
            else {
                return this._finalAry;
            }
        };
        return SelectServerModel;
    }());
    selectserver.SelectServerModel = SelectServerModel;
    var ServerAryVo = /** @class */ (function () {
        function ServerAryVo() {
            this.select = false;
        }
        return ServerAryVo;
    }());
    selectserver.ServerAryVo = ServerAryVo;
    var ServerVo = /** @class */ (function () {
        function ServerVo() {
        }
        return ServerVo;
    }());
    selectserver.ServerVo = ServerVo;
    var RoleVo = /** @class */ (function () {
        function RoleVo() {
        }
        return RoleVo;
    }());
    selectserver.RoleVo = RoleVo;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=SelectServerModel.js.map