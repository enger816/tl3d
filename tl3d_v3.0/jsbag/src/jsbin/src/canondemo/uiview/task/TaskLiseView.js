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
    var SList = Pan3d.SList;
    var UIManager = Pan3d.UIManager;
    var SListItem = Pan3d.SListItem;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var Vector2D = Pan3d.Vector2D;
    var TextureManager = Pan3d.TextureManager;
    var TaskMeshVo = /** @class */ (function () {
        function TaskMeshVo() {
        }
        TaskMeshVo.onlyget = 1;
        TaskMeshVo.everydayendless = 2;
        TaskMeshVo.helpOther = 3;
        return TaskMeshVo;
    }());
    task.TaskMeshVo = TaskMeshVo;
    var TaskUiList = /** @class */ (function (_super) {
        __extends(TaskUiList, _super);
        function TaskUiList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -0;
            _this._maskLevel = 7;
            return _this;
        }
        TaskUiList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        TaskUiList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, TaskViewRender, 400, 64 * 8, 0, 64, 8, 256, 1024, 1, 14);
        };
        TaskUiList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        TaskUiList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return TaskUiList;
    }(SList));
    task.TaskUiList = TaskUiList;
    var TaskViewRender = /** @class */ (function (_super) {
        __extends(TaskViewRender, _super);
        function TaskViewRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        TaskViewRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Task_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 64);
            $container.addChild(this.Task_bg);
            this.Task_list_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_list_id", 10, 28, 50, 20);
            $container.addChild(this.Task_list_id);
            this.Task_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_ion_pic", 70, 15, 44, 44);
            $container.addChild(this.Task_ion_pic);
            this.Task_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_info", 110, 28, 190, 20);
            $container.addChild(this.Task_info);
            this.Task_but = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_but", 280, 28, 60, 20);
            $container.addChild(this.Task_but);
            this.Task_but.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.Task_but.addEventListener(InteractiveEvent.Up, this.butUp, this);
        };
        TaskViewRender.prototype.butDown = function (evt) {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y);
            this.downTarget = evt.target;
        };
        TaskViewRender.prototype.butUp = function (evt) {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $taskMeshVo = this.itdata.data;
                switch ($taskMeshVo.type) {
                    case TaskMeshVo.everydayendless:
                        if ($taskMeshVo.processdata == 1) {
                            var $endlessMaxLevel = GameData.getStorageSyncNumber("endlessMaxLevel");
                            msgalert.AlertUtil.show("领取无尽榜单奖励 " + $endlessMaxLevel + " 钻石", "提示", function (value) {
                                if (value == 1) {
                                    GameData.hasdiamondsHavenum += $endlessMaxLevel;
                                    var $tadayStr = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
                                    GameData.setStorageSync("everydayendless", $tadayStr);
                                    Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                                }
                            }, 2);
                        }
                        break;
                    case TaskMeshVo.helpOther:
                        if ($taskMeshVo.processdata == 1) {
                            msgalert.AlertUtil.show("领取帮助奖励 " + 100 + " 钻石", "提示", function (value) {
                                if (value == 1) {
                                    GameData.hasdiamondsHavenum += 100;
                                    var $helpdata = GameData.getStorageSync("helpdata");
                                    $helpdata.isget = true;
                                    GameData.setStorageSync("helpdata", $helpdata);
                                    Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                                }
                            }, 2);
                        }
                        break;
                    default:
                        break;
                }
                // console.log($taskMeshVo)
            }
        };
        TaskViewRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $taskMeshVo = $data.data;
                var $txtColor = ColorType.Green20a200;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Task_list_id.skinName, String($data.id), 16, TextAlign.CENTER, $txtColor);
                this.uiAtlas.upDataPicToTexture($taskMeshVo.iconUrl, this.Task_ion_pic.skinName);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Task_info.skinName, $taskMeshVo.txt, 16, TextAlign.CENTER, $txtColor);
                var $processStr = ColorType.White9A683F + "未完成";
                if ($taskMeshVo.processdata == 1) {
                    $processStr = ColorType.Green20a200 + "可领取";
                }
                if ($taskMeshVo.processdata == 2) {
                    $processStr = ColorType.Whiteffeed0 + "已领取";
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Task_but.skinName, $processStr, 16, TextAlign.CENTER);
                this.fileColor(this.Task_bg.skinName, $data.id % 2 == 0 ? "rgba(66,66,66,1)" : "rgba(56,53,54,1)");
            }
        };
        TaskViewRender.prototype.fileColor = function ($iconName, $color) {
            var rec = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color;
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        };
        return TaskViewRender;
    }(SListItem));
    task.TaskViewRender = TaskViewRender;
})(task || (task = {}));
//# sourceMappingURL=TaskLiseView.js.map