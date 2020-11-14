function getWxAvatar64UrlByUrl(value) {
    return value;
}
function getWxAvatar132UrlByUrl(value) {
    return value;
}
var EveryDataSync = /** @class */ (function () {
    function EveryDataSync($daystr, $num, $isget) {
        if ($isget === void 0) { $isget = false; }
        this.daystr = $daystr;
        this.num = $num;
        this.isget = $isget;
    }
    ;
    return EveryDataSync;
}());
var GameData = /** @class */ (function () {
    function GameData() {
    }
    Object.defineProperty(GameData, "gameType", {
        get: function () {
            return this._gameType;
        },
        set: function (value) {
            this._gameType = value;
        },
        enumerable: true,
        configurable: true
    });
    GameData.getSeverTime = function (bfun) {
        if (bfun === void 0) { bfun = null; }
        if (isNaN(this.loginTime)) {
            GameData.loginTime = Pan3d.TimeUtil.START_TIME; //先等于本地时间
            GameData.WEB_SEVER_EVENT_AND_BACK("get_server_time", "", function (res) {
                if (res && res.data && res.data.success) {
                    GameData.loginTime = res.data.time * 1000;
                    console.log("服务器时间", GameData.loginTime);
                }
                bfun && bfun();
            });
        }
        else {
            bfun && bfun();
        }
        return this.loginTime + Pan3d.TimeUtil.getTimer();
    };
    GameData.getDiamodsConfigByLevel = function (value) {
        for (var key in GameData.diamondsconfigRes.tabels) {
            if (GameData.diamondsconfigRes.tabels[key] && GameData.diamondsconfigRes.tabels[key].name == String(value)) {
                return GameData.diamondsconfigRes.tabels[key].list;
            }
        }
        return null;
    };
    GameData.getBaoxiangConfigByLevelStr = function (value) {
        for (var key in GameData.diamondsconfigRes.baoxiang) {
            if (GameData.diamondsconfigRes.baoxiang[key] && GameData.diamondsconfigRes.baoxiang[key].mapstr == value) {
                return GameData.diamondsconfigRes.baoxiang[key].list;
            }
        }
        return null;
    };
    GameData.getNeedDiamodsResetPlayByLevel = function (value) {
        for (var key in GameData.diamondsconfigRes.restpaly) {
            if (GameData.diamondsconfigRes.restpaly[key].level == String(value)) {
                return GameData.diamondsconfigRes.restpaly[key].num;
            }
        }
    };
    Object.defineProperty(GameData, "hasWinPanel", {
        get: function () {
            for (var i = 0; i < Pan3d.UIManager.getInstance()._containerList.length; i++) {
                if (Pan3d.UIManager.getInstance()._containerList[i].interfaceUI == false) {
                    var $clas = Pan3d.UIManager.getInstance()._containerList[i];
                    if ($clas instanceof msgalert.OnlyTopTxt) {
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    GameData.lookVideoFinishAdd = function () {
        var tempData = GameData.getEveryDataSyncByName("todaylookvideonum");
        GameData.setEveryDataSyncByName("todaylookvideonum", tempData.num + 1);
        console.log("今天已观看过了", tempData.num + 1);
    };
    GameData.isLookVideoErr = function () {
        console.log("视屏加载错误");
        var tempData = GameData.getEveryDataSyncByName("todaylookvideonum");
        this.isCanLookVidel = false;
    };
    Object.defineProperty(GameData, "isCanUseLookVideoBut", {
        get: function () {
            if (!this.isCanLookVidel) {
                return false;
            }
            var tempData = GameData.getEveryDataSyncByName("todaylookvideonum");
            console.log("今天已观看过了", tempData.num);
            if (tempData.num > 10) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    GameData.getNeedTimeResetPlayByLevel = function (value) {
        for (var key in GameData.diamondsconfigRes.restpaly) {
            if (GameData.diamondsconfigRes.restpaly[key].level == value) {
                return GameData.diamondsconfigRes.restpaly[key].waittime;
            }
        }
    };
    GameData.getNeedDiamondsReviveByLevel = function (value) {
        for (var key in GameData.diamondsconfigRes.restpaly) {
            if (GameData.diamondsconfigRes.restpaly[key].level == value) {
                if (GameData.diamondsconfigRes.restpaly[key].revivenum) {
                    return GameData.diamondsconfigRes.restpaly[key].revivenum;
                }
            }
        }
        return 2;
    };
    GameData.getDiamodsByShareInput = function (value) {
        for (var key in GameData.diamondsconfigRes.shareinput) {
            if (GameData.diamondsconfigRes.shareinput[key].level == String(value)) {
                return GameData.diamondsconfigRes.shareinput[key].num;
            }
        }
    };
    GameData.getFristLevelUpByLevel = function (value) {
        for (var key in GameData.diamondsconfigRes.fristreward) {
            if (GameData.diamondsconfigRes.fristreward[key].level == String(value)) {
                return GameData.diamondsconfigRes.fristreward[key].num;
            }
        }
        return 0;
    };
    GameData.getDayStr = function () {
        return Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
    };
    GameData.saveUseClikInfo = function ($key) {
        if (GameData.webuserInfo) {
            console.log(GameData.webuserInfo.info);
            if (GameData.webuserInfo.info && GameData.webuserInfo.info.length) {
            }
            else {
                GameData.webuserInfo.info = "{}";
            }
            var $obj = JSON.parse(GameData.webuserInfo.info);
            var keyname = "r" + $key;
            if (!Boolean($obj[keyname])) {
                $obj[keyname] = 0;
            }
            $obj[keyname] += 1;
            GameData.webuserInfo.info = JSON.stringify($obj);
            this.changeWebUserInfo("info", GameData.webuserInfo.info);
        }
    };
    GameData.changeWebUserInfo = function ($key, $value) {
        //user_update_info (openid,user_key,user_value) key["avatar","name","area","gender","enter_type"]
        var $postStr = "";
        $postStr += "openid=" + GameData.getStorageSync("openid");
        $postStr += "&user_key=" + $key;
        $postStr += "&user_value=" + $value;
        GameData.WEB_SEVER_EVENT_AND_BACK("user_update_info", $postStr);
    };
    //如果是首
    GameData.clearFristLevelUp = function ($level) {
        var $str = GameData.getStorageSync("fristlevelupdata");
        if ($str) {
            var $arr = JSON.parse($str);
            for (var i = 0; i < $arr.length; i++) {
                if ($arr[i] == $level) {
                    $arr.splice(i, 1);
                    GameData.setStorageSync("fristlevelupdata", JSON.stringify($arr));
                    return;
                }
            }
        }
    };
    GameData.saveFristLevelUp = function ($level) {
        var $str = GameData.getStorageSync("fristlevelupdata");
        var $arr;
        if (!$str) {
            console.log("第一次获取钻石");
            $arr = new Array;
        }
        else {
            $arr = JSON.parse($str);
        }
        var $isTrue = true;
        for (var i = 0; i < $arr.length; i++) {
            if ($arr[i] == $level) {
                $isTrue = false;
            }
        }
        if ($isTrue) {
            $arr.push($level);
            GameData.setStorageSync("fristlevelupdata", JSON.stringify($arr));
        }
        return $isTrue;
    };
    //记录收集过的钻石
    GameData.saveDiamondsByKey = function ($name) {
        var $str = GameData.getStorageSync("hasDiamonds");
        var $arr;
        if (!$str) {
            console.log("第一次获取钻石");
            $arr = new Array;
        }
        else {
            $arr = JSON.parse($str);
        }
        $arr.push({ name: $name, time: Date.now().toString() });
        GameData.setStorageSync("hasDiamonds", JSON.stringify($arr));
    };
    Object.defineProperty(GameData, "haveAdvertiseListLen", {
        get: function () {
            //1分钟可以更新一次
            if (this.lastGetAdvertiseTm < Pan3d.TimeUtil.getTimer() - 60 * 1000) {
                this.getAdvertiseList();
            }
            if (this.advertiseList) {
                return this.advertiseList.length;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    GameData.getAdvertiseList = function () {
        var _this = this;
        //获取所有邀请列表
        if (!this.advertiseList) {
            this.advertiseList = new Array;
        }
        this.lastGetAdvertiseTm = Pan3d.TimeUtil.getTimer();
        var $postStr = "";
        $postStr += "openid=" + GameData.getStorageSync("openid");
        $postStr += "&time=" + 0;
        $postStr += "&type=" + 99;
        console.log("$postStr", $postStr);
        GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, function (res) {
            if (res && res.data && res.data.list && res.data.list.length) {
                _this.advertiseList = res.data.list;
                console.log("获取了全部邀请", _this.advertiseList);
            }
        });
        return this.advertiseList;
    };
    GameData.sendFailToWeb = function ($level) {
        var useTim = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
        var $postStr = "";
        $postStr += "level=" + $level;
        $postStr += "&openid=" + GameData.getStorageSync("openid"); //自己的
        if (GameData.userInfo && GameData.userInfo.nickName) {
            $postStr += "&info=" + GameData.userInfo.nickName + "_" + String(GameData.hasdiamondsHavenum) + "-v-" + GameData.version + "-u-" + GameData.haveAdvertiseListLen;
        }
        else {
            $postStr += "&info=" + "没名-" + "_" + String(GameData.hasdiamondsHavenum);
        }
        if (GameData.isOtherPlay()) {
            GameData.WEB_SEVER_EVENT_AND_BACK("add_fail", $postStr);
        }
    };
    GameData.sendSuccessToWeb = function (value) {
        var useTim = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
        var $postStr = "";
        $postStr += "level=" + value;
        $postStr += "&openid=" + GameData.getStorageSync("openid");
        $postStr += "&time=" + useTim;
        if (GameData.isOtherPlay()) {
            if (GameData.userInfo && GameData.userInfo.nickName) {
                $postStr += "&info=" + GameData.userInfo.nickName + "_" + String(GameData.hasdiamondsHavenum) + "-v-" + GameData.version + "-u-" + GameData.haveAdvertiseListLen;
            }
            else {
                var $addStrinfo = "";
                if (GameData.userInfo) {
                    $addStrinfo = String(GameData.userInfo.nickName);
                }
                $postStr += "&info=" + "没名-" + $addStrinfo + "_" + String(GameData.hasdiamondsHavenum);
            }
            console.log("成功发送参数", $postStr);
            GameData.WEB_SEVER_EVENT_AND_BACK("add_success", $postStr);
        }
    };
    GameData.makeWebUserInfo = function () {
        GameData.userInfo = GameData.getStorageSync("userInfo");
        if (!GameData.userInfo) {
            GameData.userInfo = {};
            GameData.userInfo.avatarUrl = GameData.emptyiconUrl;
            GameData.userInfo.city = "未确定";
            GameData.userInfo.country = "China";
            GameData.userInfo.gender = 1;
            GameData.userInfo.language = "zh_CN";
            GameData.userInfo.nickName = "未授权名";
            GameData.userInfo.province = "Beijin";
            console.log("没有自己的省份，准备杜撰");
            GameData.setStorageSync("userInfo", GameData.userInfo);
        }
    };
    GameData.initGameGetAllSync = function (bfun) {
        var _this = this;
        GameData.getStorageWxAndBase(this.gameStorageKey, function ($str) {
            GameData.storageSession = JSON.parse($str ? $str : "{}");
            _this.makeWebUserInfo();
            GameData.userInfo = GameData.getStorageSync("userInfo");
            console.log("登入进来得到userInfo", GameData.userInfo);
            var openid = GameData.getStorageSync("openid");
            if (!openid) {
                openid = "id" + Date.now() + "_" + random(9999);
                GameData.setStorageSync("openid", openid);
                console.log("新人创建openid", openid);
                var $postStr = "";
                $postStr += "level=" + 0;
                $postStr += "&openid=" + GameData.getStorageSync("openid");
                $postStr += "&time=" + 0;
                $postStr += "&info=" + "新用户首次进来";
                GameData.WEB_SEVER_EVENT_AND_BACK("add_success", $postStr, function (res) {
                    console.log("进来的第一次", res);
                });
            }
            bfun();
        });
    };
    GameData.clearStorageSync = function () {
        this.clearStorageWxAndBase();
        GameData.storageSession = {};
    };
    Object.defineProperty(GameData, "hasdiamondsHavenum", {
        get: function () {
            var $num = Number(GameData.getStorageSync("diamondsHavenum"));
            return isNaN($num) ? 0 : $num;
        },
        set: function (value) {
            if (isNaN(value) || value > 10000 || value < 0) {
                value = 0;
            }
            GameData.setStorageSync("diamondsHavenum", value);
            Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.DIAMONDS_CHANGE_EVENT));
        },
        enumerable: true,
        configurable: true
    });
    GameData.setStorageSync = function (key, value) {
        if (GameData.storageSession) {
            GameData.storageSession[key] = value;
            this.setStorageWxAndBase(this.gameStorageKey, JSON.stringify(GameData.storageSession));
        }
    };
    GameData.getStorageSync = function (key) {
        if (GameData.storageSession) {
            return GameData.storageSession[key];
        }
        else {
            return null;
        }
    };
    //获取每日的数据，如果当前没有，就为空
    GameData.getEveryDataSyncByName = function ($keystr) {
        var dayStr = GameData.getDayStr();
        var $keyData = GameData.getStorageSync($keystr);
        if (!$keyData || $keyData.daystr != dayStr) {
            $keyData = { daystr: dayStr, num: 0 };
        }
        GameData.setStorageSync($keystr, $keyData);
        return new EveryDataSync($keyData.daystr, $keyData.num, $keyData.isget);
    };
    //保存每日数据
    GameData.setEveryDataSyncByName = function ($keystr, $num) {
        var dayStr = GameData.getDayStr();
        var $keyData = GameData.getStorageSync($keystr);
        if (!$keyData || $keyData.daystr != dayStr) {
            $keyData = { daystr: dayStr, num: 0 };
        }
        $keyData.num = $num;
        GameData.setStorageSync($keystr, $keyData);
        return $keyData;
    };
    GameData.getStorageSyncNumber = function (key) {
        if (!GameData.storageSession) {
            return 0;
        }
        return isNaN(Number(GameData.storageSession[key])) ? 0 : Number(GameData.storageSession[key]);
    };
    GameData.getStorageWxAndBase = function (key, bfun) {
        bfun(sessionStorage.getItem(key));
    };
    GameData.setStorageWxAndBase = function (key, value) {
        sessionStorage.setItem(key, value);
    };
    GameData.clearStorageWxAndBase = function () {
        sessionStorage.clear();
    };
    GameData.isOtherPlay = function () {
        return true;
    };
    GameData.dispatchToLevel = function ($toLevenNum) {
        GameData.gameType = 1;
        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL), $toLevenNum);
        GameData.setStorageSync("gameLevel", $toLevenNum);
    };
    GameData.GET_USER_INFO_LIST = function ($arr, $fun) {
        //get_user_info_list (list)
        var $postStr = "list=" + JSON.stringify($arr);
        GameData.WEB_SEVER_EVENT_AND_BACK("get_user_info_list", $postStr, function (res) {
            console.log("get_user_info_list===>", res);
            if (res && res.data && res.data.list && res.data.list.length) {
                $fun(res.data.list);
            }
            else {
                $fun(null);
            }
        });
    };
    GameData.WEB_SEVER_EVENT_AND_BACK = function (webname, postStr, $bfun) {
        if ($bfun === void 0) { $bfun = null; }
        webname = webname.replace(/\s+/g, "");
        var $obj = new Object();
        $obj.webname = webname;
        $obj.postStr = postStr.replace(/\s+/g, "");
        $obj.fun = $bfun;
        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WEB_SEVER_EVENT_AND_BACK), $obj);
        this.isPostWeboffwx(webname, postStr, $bfun);
    };
    //网页模式的WEB请求
    GameData.isPostWeboffwx = function (webname, postStr, $bfun) {
        if ($bfun === void 0) { $bfun = null; }
        var ajax = new XMLHttpRequest();
        var url = GameData.webseverurl + webname;
        var timestamp = String(Pan3d.TimeUtil.getTimer());
        var keystr = "ABC";
        var self_sign = hex_md5(postStr + timestamp + keystr);
        ajax.open("post", url, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.setRequestHeader("timestamp", timestamp);
        ajax.setRequestHeader("sign", self_sign);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    $bfun ? $bfun({ data: JSON.parse(ajax.responseText) }) : null;
                }
                else {
                    console.log("HTTP请求错误！错误码：" + ajax.status);
                    $bfun ? $bfun(null) : null;
                }
            }
        };
        ajax.send(postStr);
    };
    GameData.WEB_SAVE_SAMPE_FILE_BACK_NAME = function ($clasName, $byte, $bfun) {
        if (GameData.devicetypepc) {
            var fileObj = new File([$byte.buffer], "talkfile.mp3");
            var url = "https://api.h5key.com/api/" + $clasName; // 接收上传文件的后台地址 
            var form = new FormData(); // FormData 对象
            form.append("mf", fileObj); // 文件对象
            var xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        $bfun ? $bfun({ data: JSON.parse(xhr.responseText) }) : null;
                        console.log("发送成功", JSON.parse(xhr.responseText));
                    }
                    else {
                        console.log("HTTP请求错误！错误码：" + xhr.status);
                        $bfun ? $bfun(null) : null;
                    }
                }
            };
            xhr.send(form); //开始上传，发送form数据
        }
        else {
            var $obj = new Object();
            $obj.clasName = $clasName;
            $obj.fun = $bfun;
            $obj.data = $byte;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WEB_SAVE_SAMPE_FILE_BACK_NAME), $obj);
        }
    };
    GameData.WEB_SAVE_VIDEO_FILE = function ($clasName, byte, time, $bfun) {
        if ($bfun === void 0) { $bfun = null; }
        var $evt = new game.SceneEvent(game.SceneEvent.SAVE_VIDEO_FILE_TO_WEB);
        var $obj = new Object();
        $obj.clasName = $clasName;
        $obj.fun = $bfun;
        $obj.data = byte;
        $obj.time = time;
        $obj.openid = GameData.getStorageSync("openid");
        $obj.level = game.GameDataModel.levelNum;
        $evt.data = $obj;
        Pan3d.ModuleEventManager.dispatchEvent($evt);
        this.isWebSaveVideoFile($clasName, byte, time);
    };
    GameData.isWebSaveVideoFile = function ($clasName, $byte, time) {
        //$data.levelStartTm = GameDataModel.levelStartTm;
        //$data.byte = GameVideoManager.ItemFrameByte;
        //$data.time = Pan3d.TimeUtil.getTimer() - GameDataModel.levelStartTm
        var fileObj = new File([$byte.buffer], "jek.txt");
        var url = GameData.webseverurl + $clasName; // 接收上传文件的后台地址 
        var form = new FormData(); // FormData 对象
        form.append("level", String(game.GameDataModel.levelNum)); // 文件对象
        form.append("time", String(time)); // 文件对象
        form.append("openid", GameData.getStorageSync("openid")); // 文件对象
        form.append("mf", fileObj); // 文件对象
        var xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.send(form); //开始上传，发送form数据
    };
    GameData.sendToWebCallHelp = function () {
        var nickName = "无名失者";
        var picUrl = GameData.emptyiconUrl;
        if (GameData.userInfo) {
            nickName = GameData.userInfo.nickName;
            picUrl = GameData.userInfo.avatarUrl;
        }
        console.log("发送帮助后的图片", picUrl);
        var $postStr = "";
        $postStr += "level=" + game.GameDataModel.levelNum;
        $postStr += "&openid=" + GameData.getStorageSync("openid");
        $postStr += "&user_info=" + nickName + "|" + picUrl;
        GameData.WEB_SEVER_EVENT_AND_BACK("call_help", $postStr, function (res) {
            Pan3d.ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.CHECK_SELF_HELP_INFO));
        });
    };
    GameData.WX_ON_SHARE_APP_MESSAGE = function ($title, $query, $bfun, $drawBmp) {
        if ($bfun === void 0) { $bfun = null; }
        if ($drawBmp === void 0) { $drawBmp = false; }
        var $evtA = new game.SceneEvent(game.SceneEvent.ON_SHARE_APP_MESSAGE);
        var $info = {};
        $info.title = $title;
        $info.query = $query;
        $info.bfun = $bfun;
        $info.drawBmp = $drawBmp;
        $evtA.data = $info;
        Pan3d.ModuleEventManager.dispatchEvent($evtA);
        this.isShareOffWx($title, $query, $bfun);
    };
    //在网页中，分享成功
    GameData.isShareOffWx = function ($title, $query, $bfun) {
        if ($bfun === void 0) { $bfun = null; }
        $bfun ? $bfun({}) : null;
    };
    GameData.addFileNameToItem = function (value) {
        this.localFileItem.push(value);
    };
    GameData.loadImgByPicUrl = function ($url, $fun) {
        //在这里先统一用这个方法加载图片，需要找到原因，现在只是实现
        if ($url && $url.length > 10) {
            $url = GameData.getLoadFileIsLocalUrl($url);
            Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.IMG_TYPE, function ($img) {
                $fun($img);
            });
        }
    };
    GameData.WX_RECORDER_START_EVENT = function ($fun) {
        if (GameData.devicetypepc) {
            $fun({ "success": true, "data": "1" });
        }
        else {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_RECORDER_START_EVENT), $fun);
        }
    };
    GameData.WX_RECORDER_END_EVENT = function ($fun) {
        if ($fun === void 0) { $fun = null; }
        if (GameData.devicetypepc) {
            if ($fun) {
                var $byte = new Pan3d.Pan3dByteArray();
                $byte.writeUTF("录音内容");
                GameData.WEB_SAVE_SAMPE_FILE_BACK_NAME("upload_voice", $byte, function (res) {
                    if (res.data && res.data.success) {
                        $fun && $fun({ "success": true, "filename": "webtest11111111.mp3" }); //先固定给个文件
                    }
                });
            }
        }
        else {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_RECORDER_END_EVENT), $fun);
        }
    };
    GameData.changeLocalUrlByArr = function ($arr) {
        this.localFileItem = new Array();
        for (var i = 0; i < $arr.length; i++) {
            this.addFileNameToItem($arr[i]);
        }
    };
    GameData.getLoadFileIsLocalUrl = function (value) {
        if (!this.localFileItem) {
            this.localFileItem = new Array();
        }
        for (var i = 0; i < this.localFileItem.length; i++) {
            if (value.search(this.localFileItem[i]) != -1) {
                // console.log("本地", "res/" + this.localFileItem[i])
                return "res/" + this.localFileItem[i];
            }
        }
        if (value.indexOf("com/fish") == -1 && value.indexOf("//picconfig") == -1) {
            console.log("web文件", value);
        }
        return value;
    };
    GameData.clearPandaOrInof = function ($type, $key) {
        var obj = new rightpanda.PandaMeshData();
        obj.type = $type; //清理求助
        obj.key = $key; //清理求助
        GameData.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.CLEAR_PANDA_INFO), obj);
    };
    GameData.addShareToWeb = function ($type, $num) {
        if ($type === void 0) { $type = 0; }
        if ($num === void 0) { $num = 0; }
        var $postAddShare = "";
        $postAddShare += "openid=" + GameData.getStorageSync("openid");
        if (GameData.userInfo && GameData.userInfo.nickName) {
            var $addStr = "u_" + GameData.haveAdvertiseListLen + "m_" + GameData.hasdiamondsHavenum;
            $postAddShare += "&info=" + GameData.userInfo.nickName + $addStr;
        }
        else {
            $postAddShare += "&info=" + "没授权用户";
        }
        $postAddShare += "&type=" + $type;
        $postAddShare += "&num=" + $num;
        $postAddShare += "&level=" + game.GameDataModel.levelNum;
        GameData.WEB_SEVER_EVENT_AND_BACK("add_share", $postAddShare);
        GameData.setStorageSync("shareSuccessNum", GameData.getStorageSyncNumber("shareSuccessNum") + 1);
    };
    GameData.dispatchEvent = function (evt, data) {
        evt.data = data;
        Pan3d.ModuleEventManager.dispatchEvent(evt);
    };
    GameData._gameType = 1; //1为关卡模式，2.为无尽模式，5特殊关卡副本//
    GameData.devicetypepc = true; //true是pc ，false是微信
    GameData.skinType = 1;
    GameData.pixelRatio = 2;
    GameData.maxLevel = 55; //游戏可玩的最大等级;
    GameData.version = 65;
    GameData.SELF_MAX_LEVEL = "SELF_MAX_LEVEL";
    GameData.isCanLookVidel = true;
    GameData.gameStorageKey = "qiuqiu20181112";
    GameData.emptyiconUrl = "https://commcdn.chiji-h5.com/wdqq/emptyicon.jpg";
    return GameData;
}());
//# sourceMappingURL=GameData.js.map