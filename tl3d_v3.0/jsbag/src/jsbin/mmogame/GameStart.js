var GameStart = /** @class */ (function () {
    function GameStart() {
        this.dataReady = false;
        this.uiReadyNum = 0;
        this.uiAllNum = 0;
    }
    GameStart.prototype.init = function () {
        var _this = this;
        TextureManager.getInstance().getTexture(Scene_data.fileRoot + "ui/load/001.jpg", function ($texture) {
        });
        if (GameStart.outNet) {
            GameStart.GM = false;
        }
        var $baseUiList = new Array;
        $baseUiList.push({ xmlurl: "ui/arpgui/textlist.xml", picurl: "ui/arpgui/textlist.png", name: UIData.textlist });
        $baseUiList.push({ xmlurl: "ui/uidata/public/public.xml", picurl: "ui/uidata/public/public.png", name: UIData.publicUi });
        this.uiAllNum = UIData.init($baseUiList, function () {
            _this.loadAll();
        }, function (num) {
            _this.uiReadyNum = num;
            if (_this.dataReady) {
                FpsStage.getInstance().showLoadInfo("读取UI数据：" + _this.uiReadyNum + "/" + _this.uiAllNum);
            }
        });
        if (GameStart.outNet) {
            TableData.getInstance().loadZipGameData(function () {
                _this.dataReady = true;
                _this.loadAll();
            }, function (num) {
                FpsStage.getInstance().showLoadInfo("读取游戏数据" + float2int(num * 100) + "%");
            });
        }
        else {
            TableData.getInstance().loadGameData(function () {
                _this.dataReady = true;
                _this.loadAll();
            }, function (num) {
                FpsStage.getInstance().showLoadInfo("读取游戏数据" + float2int(num * 100) + "%");
            });
        }
        GameMouseManager.getInstance().addMouseEvent();
        this.loadMainUiBase();
    };
    GameStart.prototype.loadMainUiBase = function () {
        var $mainUiList = new Array;
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/left/left.xml", picurl: "ui/uidata/mainui/left/left.png", name: "left", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/right/right.xml", picurl: "ui/uidata/mainui/right/right.png", name: "right", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/top/top.xml", picurl: "ui/uidata/mainui/top/top.png", name: "top", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/bootom/bootom.xml", picurl: "ui/uidata/mainui/bootom/bootom.png", name: "bootom", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/fight/fight.xml", picurl: "ui/uidata/mainui/fight/fight.png", name: "fight", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/home/home.xml", picurl: "ui/uidata/mainui/home/home.png", name: "home", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/left/leftgroup/leftgroup.xml", picurl: "ui/uidata/mainui/left/leftgroup/leftgroup.png", name: "leftgroup", isTexture: true });
        MainUiLoad.init($mainUiList, function () {
            console.log("主UI加载完成");
        }, function (num) {
            console.log("主UI加载进度", num, "/", $mainUiList.length);
        });
    };
    GameStart.prototype.loadAll = function () {
        if (this.uiReadyNum == this.uiAllNum && this.dataReady) {
            this.loadDataComplet();
            FpsStage.getInstance().showLoadInfo("正在连接服务器");
            GameStart.ready = true;
            RedPointManager.getInstance().init();
            //ModuleEventManager.dispatchEvent(new LoginEvent(LoginEvent.LOGIN_ENTER_EVENT));
        }
    };
    GameStart.prototype.loadDataComplet = function () {
        if (GameStart.outNet) {
            GameStart.GM = false;
        }
        ModuleList.startup(); //启动所有模块
        //console.log("启动所有模块-----------------------------")
        GameData.needCreatChar = false;
        if (GameData.userinfo) {
            //GameInstance.init();
            FpsStage.getInstance().removeShowLoad();
            var obj = GameData.userinfo;
            if (!GameData.mergeServerMsgVo) {
                GameData.mergeServerMsgVo = new MergeServerMsgVo();
            }
            if (GameData.sdk == 0) {
                GameData.mergeServerMsgVo.userName = String(obj.userid);
            }
            else if (GameData.sdk == 1) {
                GameData.mergeServerMsgVo.userName = String(obj.uid);
            }
            ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
        }
        else {
            GameInstance.init();
        }
    };
    /**是否是外网 */
    GameStart.outNet = false;
    GameStart.GM = true;
    GameStart.ready = false;
    GameStart.appVersion = 0;
    return GameStart;
}());
//# sourceMappingURL=GameStart.js.map