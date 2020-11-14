var RoomUserVo = /** @class */ (function () {
    function RoomUserVo() {
    }
    return RoomUserVo;
}());
var MsEngine = /** @class */ (function () {
    function MsEngine() {
        this.engine = new MatchvsEngine();
        this.response = new MatchvsResponse();
        this.BrokenLine = false;
        this.gameID = 202304;
        this.appKey = "cdc257a229c84d6a910e37d19a93934a";
        this.secretKey = "55ce63699f6b422490314921af81bf83";
        this.roomType = "wudiroom";
        this.roomProperty = "";
        this.engine = new MatchvsEngine();
        this.response = new MatchvsResponse();
    }
    MsEngine.getInstance = function () {
        if (!MsEngine._instance) {
            MsEngine._instance = new MsEngine();
        }
        return MsEngine._instance;
    };
    MsEngine.prototype.getUserByuserId = function (userID) {
        for (var i = 0; i < this.roomUserInfoList.length; i++) {
            if (this.roomUserInfoList[i].msRoomUserInfo.userID == userID) {
                return this.roomUserInfoList[i];
            }
        }
        return null;
    };
    MsEngine.prototype.isRoomOwner = function () {
        return this.roomInfo.owner == this.msRegistRsp.userID;
    };
    MsEngine.prototype.init = function () {
        var _this = this;
        this.response.initResponse = function (status) {
            if (status == 200) {
                _this.registerUser();
            }
            else {
                console.log("失败");
            }
        };
        this.response.reconnectResponse = function (status, roomUserInfoList, roomInfo) {
            _this.BrokenLine = false;
            if (MsEngine.linkplayGamestatus == -1) {
                console.log("已退出联机就不再处理联机后续");
                return;
            }
            if (status == 200) {
                _this.roomInfo = roomInfo;
                console.log("重连成功,有房间数据");
                if (_this.roomInfo.state == 1) {
                    _this.roomUserInfoList = new Array;
                    for (var i = 0; i < roomUserInfoList.length; i++) {
                        var vo = new RoomUserVo();
                        vo.msRoomUserInfo = roomUserInfoList[i];
                        _this.roomUserInfoList.push(vo);
                    }
                    if (roomInfo.owner == _this.msRegistRsp.userID) {
                        _this.roomUserInfoList.unshift(_this.getSelfRoomUserVo());
                    }
                    else {
                        _this.roomUserInfoList.push(_this.getSelfRoomUserVo());
                    }
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT));
                }
                if (_this.roomInfo.state == 2) {
                    console.log("重连接，但已在游戏场景中了");
                    if (MsEngine.linkplayGamestatus != 2) {
                        MsEngine.getInstance().leaveRoom(function () {
                            if (MsEngine.linkplayGamestatus == 1) {
                                Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.HIDE_LINK_PLAY_START_PANEL));
                            }
                            msgalert.AlertUtil.show("已断开连接", "提示", function (value) {
                                if (value == 1) {
                                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                                }
                            }, 2);
                        });
                    }
                }
            }
            else if (status == 201) {
                console.log("重连成功,没在房间里");
                if (MsEngine.linkplayGamestatus == 1) {
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                }
                if (MsEngine.linkplayGamestatus == 2) {
                    msgalert.AlertUtil.show("已断开连接返回", "提示", function (value) {
                        Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL));
                        Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                    }, 2);
                }
            }
            else {
                console.log("重连接失败");
                _this.BrokenLine = true;
            }
        };
        this.response.joinRoomResponse = function (status, roomUserInfoList, roomInfo) {
            if (status == 200) {
                console.log("自己进入房间", roomUserInfoList);
                _this.roomInfo = roomInfo;
                _this.roomUserInfoList = new Array;
                for (var i = 0; i < roomUserInfoList.length; i++) {
                    var vo = new RoomUserVo();
                    vo.msRoomUserInfo = roomUserInfoList[i];
                    _this.roomUserInfoList.push(vo);
                }
                _this.roomUserInfoList.push(_this.getSelfRoomUserVo());
                Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT));
            }
            else {
                console.log("加入房间失败");
                msgalert.AlertUtil.show("没进入成功", "提示", function (value) {
                    if (value == 1) {
                        Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                    }
                }, 2);
            }
        };
        this.response.joinRoomNotify = function (roomUserInfo) {
            console.log("别人加入了房间=>", roomUserInfo);
            var vo = new RoomUserVo();
            vo.msRoomUserInfo = roomUserInfo;
            _this.roomUserInfoList.push(vo);
            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT));
        };
        this.response.joinOverNotify = function (notifyInfo) {
            console.log("禁止新人加入房间", notifyInfo);
            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_START_ENTER_SCENE_EVET));
        };
        this.response.networkStateNotify = function (netnotify) {
            if (netnotify.state == 1) {
                console.log("有用户掉线，正在重新连接", netnotify);
            }
            else if (netnotify.state == 2) {
                console.log("用户重新登录了游戏，但是还没有重连进房间", netnotify);
            }
            else {
                _this.roomInfo.owner = netnotify.owner;
                _this.removeUserByuserID(netnotify.userID);
            }
        };
        this.response.errorResponse = function (errCode, errMsg) {
            console.log("联机错误", errCode, errMsg);
            switch (errCode) {
                case 1001:
                    /*
                    msgalert.AlertUtil.show("短线了请重新连接", "提示", (value: any) => {
                        if (value == 1) {
                          
                        }
                    }, 2)
                    */
                    //自动重连接
                    _this.BrokenLine = true;
                    Pan3d.TimeUtil.addTimeOut(2000, function () {
                        MsEngine.linkplayGamestatus != -1;
                        {
                            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.SHOW_RECONNECT_TXT));
                            MsEngine.getInstance().reconnect();
                        }
                    });
                    break;
                default:
                    console.log("没有处理逻辑", errCode);
                    break;
            }
        };
        this.response.sendEventResponse = function (rsp) {
            if (rsp.status == 200) {
                //   console.log("发送成功", rsp)
            }
            else {
                console.log("发送失败");
            }
        };
        this.response.sendEventNotify = function (eventInfo) {
            GameData.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_CATCH_EVENT_NOTIFY), eventInfo);
        };
        this.response.loginResponse = function (login) {
            console.log("登入成功");
            _this.BrokenLine = false;
            _this._finishFun();
        };
        this.response.joinOverResponse = function (rsp) {
            if (rsp.status == 200) {
                console.log("禁示房间成功");
                if (MsEngine.getInstance().isRoomOwner()) {
                    console.log("分配房间坐标");
                    var $kkkk = JSON.parse(_this.roomInfo.roomProperty);
                    var $posArr = new Array;
                    for (var i = 0; i < _this.roomUserInfoList.length; i++) {
                        var vo = _this.roomUserInfoList[i];
                        vo.pos = new Pan3d.Vector3D($kkkk.basepos[i].x, $kkkk.basepos[i].y, $kkkk.basepos[i].z);
                        $posArr.push({ userID: vo.msRoomUserInfo.userID, pos: vo.pos });
                    }
                    _this.sendEventJason(JSON.stringify({ type: 3, data: $posArr }));
                }
                Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_START_ENTER_SCENE_EVET));
            }
            else {
                console.log("禁示房间失败");
            }
        };
        this.response.getRoomDetailResponse = function (rsp) {
            if (rsp.status == 200) {
                console.log("房主信息", rsp);
                _this.roomDetailFun && _this.roomDetailFun(rsp);
            }
            else {
            }
        };
        this.response.leaveRoomResponse = function (rsp) {
            if (rsp.status == 200) {
                //成功
                console.log("我成功退出了房间");
                _this.leaveRoomFun && _this.leaveRoomFun();
            }
            else {
                console.log("我成功退出了房间");
            }
        };
        this.response.leaveRoomNotify = function (leaveRoomInfo) {
            //leaveRoomInfo.srcUserID 离开房间 leaveRoomInfo.roomID
            console.log("有人离开的房间", leaveRoomInfo);
            console.log(_this.roomInfo);
            _this.roomInfo.owner = leaveRoomInfo.owner;
            _this.roomInfo.ownerId = leaveRoomInfo.owner;
            _this.removeUserByuserID(leaveRoomInfo.userID);
        };
        /*
        this.response.getRoomListResponse = (status: number, roomInfos: Array<MsRoomInfoEx>) => {

            //console.log("房间列表", status, roomInfos)

            //var $ddd: linkplay.LinkPlayRoomEvent = new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT)
            //$ddd.data = roomInfos
            //Pan3d.ModuleEventManager.dispatchEvent($ddd)
        }
        */
        this.response.getRoomListExResponse = function (rsp) {
            console.log("getRoomListExResponse房间列表", rsp);
            if (rsp.status == 200) {
                //获取成功
                GameData.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT), rsp.roomAttrs);
            }
            else {
                //获取失败
            }
        };
        this.response.createRoomResponse = function (roomRsp) {
            console.log("自己创建了房间", roomRsp);
            _this.roomInfo = new MsRoomInfo(roomRsp.roomID, _this.roomType, roomRsp.owner, 1);
            _this.roomInfo.roomProperty = _this.roomProperty;
            _this.msCreateRoomRsp = roomRsp;
            _this.roomUserInfoList = new Array();
            _this.roomUserInfoList.push(_this.getSelfRoomUserVo());
            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT));
        };
        this.response.registerUserResponse = function (userInfo) {
            if (userInfo.status == 0) {
                _this.msRegistRsp = userInfo;
                console.log("得到了自己的用户信息", _this.msRegistRsp);
                MatchvsLog.closeLog();
                _this.login();
            }
            else if (userInfo.status == 200) {
                console.log("login完成");
            }
            else {
                console.log("失败");
            }
        };
        this.engine.init(this.response, "Matchvs", "alpha", this.gameID);
    };
    MsEngine.prototype.getSelfRoomUserVo = function () {
        var $vo = new RoomUserVo();
        $vo.msRoomUserInfo = new MsRoomUserInfo(this.msRegistRsp.userID, this.getSelfInfoTostr());
        return $vo;
    };
    MsEngine.prototype.removeUserByuserID = function (userID) {
        for (var i = 0; this.roomUserInfoList && i < this.roomUserInfoList.length; i++) {
            if (this.roomUserInfoList[i].msRoomUserInfo.userID == userID) {
                var vo = this.roomUserInfoList[i];
                this.roomUserInfoList.splice(i, 1);
                if (vo.dis) {
                    vo.dis.destory();
                }
            }
        }
        Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT));
    };
    MsEngine.prototype.registerUser = function () {
        this.engine.registerUser();
    };
    MsEngine.prototype.login = function () {
        if (this.msRegistRsp) {
            console.log("请求login");
            this.engine.login(this.msRegistRsp.userID, this.msRegistRsp.token, this.gameID, 1, this.appKey, this.secretKey, "v", 1);
        }
        else {
            console.log("还没有初始化");
        }
    };
    MsEngine.prototype.initMsEngine = function ($fun) {
        this._finishFun = $fun;
        this.init();
    };
    MsEngine.prototype.reconnect = function () {
        this.engine.reconnect();
    };
    MsEngine.prototype.showSelfInfo = function () {
        console.log("自己的=>", this.msRegistRsp);
    };
    MsEngine.prototype.getRoomListEx = function () {
        var filter = new MsRoomFilterEx(0, 0, 0, "", 0, 0, 0, 0, 0, 8);
        this.engine.getRoomListEx(filter);
    };
    MsEngine.prototype.joinRandomRoom = function () {
        //this.engine.joinRandomRoom(4, this.getSelfJonstr());
    };
    MsEngine.prototype.joinRoom = function (value) {
        this.engine.joinRoom(value.roomID, this.getSelfInfoTostr());
    };
    MsEngine.prototype.getRoomDetail = function (value, roomDetailFun) {
        if (roomDetailFun === void 0) { roomDetailFun = null; }
        this.roomDetailFun = roomDetailFun;
        this.engine.getRoomDetail(value.roomID);
    };
    MsEngine.prototype.leaveRoom = function ($fun) {
        if ($fun === void 0) { $fun = null; }
        this.leaveRoomFun = $fun;
        this.engine.leaveRoom(this.roomType);
    };
    MsEngine.prototype.joinOver = function () {
        this.engine.joinOver(this.roomType);
    };
    MsEngine.prototype.sendEventJason = function (value) {
        this.engine.sendEvent(value);
    };
    MsEngine.prototype.createRoom = function (value) {
        var $msvo = new MsCreateRoomInfo(GameData.getStorageSync("openid"), 4, 1, 2, 1, this.roomType);
        this.roomProperty = JSON.stringify(value); //地图信息
        $msvo.roomProperty = this.roomProperty;
        this.engine.createRoom($msvo, this.getSelfInfoTostr());
    };
    MsEngine.prototype.getSelfInfoTostr = function () {
        return JSON.stringify({ userInfo: GameData.userInfo, skinType: GameData.getStorageSyncNumber("skinType") });
    };
    MsEngine.linkplayGamestatus = -1; //0在房间列表页面， 1在准备页面，2正在游戏场景中
    return MsEngine;
}());
//# sourceMappingURL=MsEngine.js.map