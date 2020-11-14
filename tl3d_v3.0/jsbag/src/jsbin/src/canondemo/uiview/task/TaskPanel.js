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
    var ColorType = Pan3d.ColorType;
    var Rectangle = Pan3d.Rectangle;
    var SListItemData = Pan3d.SListItemData;
    var TaskPanel = /** @class */ (function (_super) {
        __extends(TaskPanel, _super);
        function TaskPanel() {
            var _this = _super.call(this) || this;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            return _this;
        }
        TaskPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("ui/task/task.txt", "ui/task/task.png", function () { _this.loadConfigCom(); });
        };
        TaskPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true;
            this.winRect = new Rectangle(0, -20, 450, 600);
            this.addChild(this._topRender.getComponent("a_task_list_tittle"));
            this._taskUiList = new task.TaskUiList();
            this._taskUiList.init(this._topRender.uiAtlas);
            this.showPanel();
        };
        TaskPanel.prototype.showTaskListData = function () {
            var ary = new Array;
            this.pushTempSListItemData(ary, this.meshEverydayEndless());
            this.pushTempSListItemData(ary, this.meshHelpByEveryDay());
            this._taskUiList.refreshData(ary);
        };
        TaskPanel.prototype.pushTempSListItemData = function (ary, $vo1) {
            if ($vo1) {
                ary.push($vo1);
                $vo1.id = ary.length;
            }
        };
        TaskPanel.prototype.meshEverydayEndless = function () {
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.txt = ColorType.Whitefff4d6 + "每日无尽榜单奖励";
            $taskMeshVo.iconUrl = "ui/panda/11.png";
            $taskMeshVo.type = task.TaskMeshVo.everydayendless;
            item.data = $taskMeshVo;
            item.id = 1;
            var $tadayStr = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
            var $lastGetDate = GameData.getStorageSync("everydayendless");
            var $endlessMaxLevel = GameData.getStorageSyncNumber("endlessMaxLevel");
            if ($lastGetDate) {
                if ($lastGetDate == $tadayStr) {
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
            var $tadayStr = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
            if ($helpdata.date != $tadayStr) {
                $helpdata.date = $tadayStr;
                $helpdata.helpnum = 0;
                $helpdata.isget = false;
            }
            var item = new SListItemData;
            var $taskMeshVo = new task.TaskMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/1.png";
            $taskMeshVo.type = task.TaskMeshVo.helpOther;
            item.data = $taskMeshVo;
            item.id = 1;
            $taskMeshVo.processdata = 0;
            if ($helpdata.helpnum >= 2) {
                $taskMeshVo.processdata = 1;
            }
            if ($helpdata.isget) {
                $taskMeshVo.processdata = 2;
            }
            $taskMeshVo.txt = ColorType.Whitefff4d6 + "每天帮助(" + $helpdata.helpnum + "/2)人";
            return item;
        };
        TaskPanel.prototype.butClik = function (evt) {
            this.hidePanel();
        };
        TaskPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this._taskUiList.show();
                this.showTaskListData();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        TaskPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
                this._taskUiList.hide();
            }
        };
        return TaskPanel;
    }(basewin.BaseWinPanel));
    task.TaskPanel = TaskPanel;
})(task || (task = {}));
//# sourceMappingURL=TaskPanel.js.map