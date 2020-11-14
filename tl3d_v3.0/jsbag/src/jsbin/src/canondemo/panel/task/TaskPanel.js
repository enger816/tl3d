var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var task;
(function (task) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var Rectangle = Pan3d.Rectangle;
    var SListItemData = Pan3d.SListItemData;
    var TaskPanel = /** @class */ (function (_super) {
        __extends(TaskPanel, _super);
        function TaskPanel() {
            return _super.call(this) || this;
        }
        TaskPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/task/task.txt", "panelui/task/task.png", function () { _this.loadConfigCom(); });
        };
        TaskPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true;
            this.winRect = new Rectangle(0, -20, 450, 500);
            this.addChild(this._topRender.getComponent("a_win_tittle_txt"));
            this.addChild(this._topRender.getComponent("a_task_label_id"));
            this.addChild(this._topRender.getComponent("a_task_label_contet"));
            this.addChild(this._topRender.getComponent("a_task_label_pro"));
            this._taskUiList = new task.TaskUiList();
            this._taskUiList.init(this._topRender.uiAtlas);
            this.showPanel();
        };
        TaskPanel.prototype.showTaskListData = function () {
            var ary = new Array;
            this._dayStr = GameData.getDayStr();
            this.pushTempSListItemData(ary, this.meshMeGame());
            this.pushTempSListItemData(ary, this.meshEverydayOnLine());
            //  this.pushTempSListItemData(ary, this.meshHelpByEveryDay());
            this.pushTempSListItemData(ary, this.meshLookAdVideoDay());
            this.pushTempSListItemData(ary, this.meshSpecialLevel());
            this._taskUiList.refreshData(ary);
        };
        TaskPanel.prototype.meshSpecialLevel = function () {
            var tempData = GameData.getEveryDataSyncByName("specialLeveladd");
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/7.png";
            $taskMeshVo.type = task.TaskMeshVo.specialLeveladd;
            $taskMeshVo.num = 10;
            $taskMeshVo.tipstr = "完成新的神秘关卡";
            item.data = $taskMeshVo;
            item.id = 1;
            $taskMeshVo.processdata = 0;
            if (tempData.num >= 1) {
                $taskMeshVo.processdata = 1;
            }
            if (tempData.isget) {
                $taskMeshVo.processdata = 2;
            }
            $taskMeshVo.txt = "完成一次新的关卡";
            return item;
        };
        TaskPanel.prototype.meshLookAdVideoDay = function () {
            var tempData = GameData.getEveryDataSyncByName("lookVideoNum");
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/8.png";
            $taskMeshVo.type = task.TaskMeshVo.everydayLookAd;
            $taskMeshVo.num = 20;
            $taskMeshVo.tipstr = "领取视屏奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            $taskMeshVo.processdata = 0;
            if (tempData.num >= 2) {
                $taskMeshVo.processdata = 1;
            }
            if (tempData.isget) {
                $taskMeshVo.processdata = 2;
            }
            $taskMeshVo.txt = "每天观看(" + tempData.num + "/2)次";
            return item;
        };
        TaskPanel.prototype.pushTempSListItemData = function (ary, $vo1) {
            if ($vo1) {
                ary.push($vo1);
                $vo1.id = ary.length;
            }
        };
        TaskPanel.prototype.meshMeGame = function () {
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.txt = "添加我的小程序";
            $taskMeshVo.iconUrl = "ui/panda/88.png";
            $taskMeshVo.type = task.TaskMeshVo.megameAdd;
            $taskMeshVo.num = 10;
            $taskMeshVo.tipstr = "领取奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            var $isUseMeGame = GameData.getStorageSync("scene1104");
            var $lastGetDate = GameData.getStorageSync("getMegameReward");
            if ($isUseMeGame) {
                $taskMeshVo.processdata = 1;
                $taskMeshVo.txt = "从我的小程序进入";
            }
            else {
                $taskMeshVo.processdata = 0;
                if (task.TaskViewRender.isClikAddMe) {
                    $taskMeshVo.txt = "从我的小程序登入可领";
                }
            }
            if ($lastGetDate) {
                $taskMeshVo.txt = "已添加了我的小程序";
                $taskMeshVo.processdata = 2;
            }
            return item;
        };
        TaskPanel.prototype.meshEverydayOnLine = function () {
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.txt = "每日上线奖励";
            $taskMeshVo.iconUrl = "ui/panda/9.png";
            $taskMeshVo.type = task.TaskMeshVo.everydayonline;
            $taskMeshVo.num = 10;
            $taskMeshVo.tipstr = "领取每日奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            var $lastGetDate = GameData.getStorageSync("everydayonline");
            if ($lastGetDate) {
                if ($lastGetDate == this._dayStr) {
                    $taskMeshVo.processdata = 2;
                }
                else {
                    $taskMeshVo.processdata = 1;
                }
            }
            else {
                $taskMeshVo.processdata = 1;
            }
            var $selfMaxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
            if ($selfMaxLevel < 20) {
                $taskMeshVo.txt = "达到20关";
                $taskMeshVo.processdata = 0;
            }
            return item;
        };
        TaskPanel.prototype.meshEverydayEndless = function () {
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.txt = "每日无尽榜单奖励";
            $taskMeshVo.iconUrl = "ui/panda/11.png";
            $taskMeshVo.type = task.TaskMeshVo.everydayendless;
            $taskMeshVo.num = 10;
            $taskMeshVo.tipstr = "领取无尽榜单奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            var $lastGetDate = GameData.getStorageSync("everydayendless");
            var $endlessMaxLevel = GameData.getStorageSyncNumber("endlessMaxLevel");
            if ($lastGetDate) {
                if ($lastGetDate == this._dayStr) {
                    $taskMeshVo.processdata = 2;
                }
                else {
                    $taskMeshVo.processdata = 1;
                }
            }
            else {
                $taskMeshVo.processdata = 1;
            }
            if (isNaN($endlessMaxLevel) || $endlessMaxLevel < 1) {
                $taskMeshVo.processdata = 0;
            }
            return item;
        };
        TaskPanel.prototype.meshHelpByEveryDay = function () {
            var $helpdata = GameData.getStorageSync("helpdata");
            if (!$helpdata) {
                $helpdata = {};
                GameData.setStorageSync("helpdata", $helpdata);
            }
            if ($helpdata.date != this._dayStr) {
                $helpdata.date = this._dayStr;
                $helpdata.helpnum = 0;
                $helpdata.isget = false;
            }
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/1.png";
            $taskMeshVo.type = task.TaskMeshVo.helpOther;
            $taskMeshVo.num = 10;
            $taskMeshVo.tipstr = "领取帮助奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            $taskMeshVo.processdata = 0;
            if ($helpdata.helpnum >= 2) {
                $taskMeshVo.processdata = 1;
            }
            if ($helpdata.isget) {
                $taskMeshVo.processdata = 2;
            }
            $taskMeshVo.txt = "每天帮助(" + $helpdata.helpnum + "/2)人";
            return item;
        };
        TaskPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        TaskPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                if (!this.hasStage) {
                    Pan3d.UIManager.getInstance().addUIContainer(this);
                    this._taskUiList.show();
                    this._taskUiList.middle = 50;
                    this.TweenLiteScale(0.1, UIData.Scale, 0.5);
                }
                this.showTaskListData();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        TaskPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this._taskUiList.resize();
        };
        TaskPanel.prototype.hidePanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                    Pan3d.UIManager.getInstance().removeUIContainer(_this);
                    _this._taskUiList.hide();
                });
            }
        };
        return TaskPanel;
    }(basewin.BaseWinPanel));
    task.TaskPanel = TaskPanel;
})(task || (task = {}));
//# sourceMappingURL=TaskPanel.js.map