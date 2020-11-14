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
    var UiDraw = Pan3d.UiDraw;
    var Rectangle = Pan3d.Rectangle;
    var TaskMeshVo = /** @class */ (function () {
        function TaskMeshVo() {
        }
        TaskMeshVo.everydayonline = 1;
        TaskMeshVo.everydayendless = 2;
        TaskMeshVo.helpOther = 3;
        TaskMeshVo.everydayLookAd = 4;
        TaskMeshVo.specialLeveladd = 5;
        TaskMeshVo.megameAdd = 6;
        return TaskMeshVo;
    }());
    task.TaskMeshVo = TaskMeshVo;
    var TaskUiList = /** @class */ (function (_super) {
        __extends(TaskUiList, _super);
        function TaskUiList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = 0;
            _this._maskLevel = 7;
            return _this;
        }
        TaskUiList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        TaskUiList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, TaskViewRender, 400, 80 * 6, 0, 80, 6, 256, 1024, 1, 10);
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
            //this.Task_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 64);
            this.Task_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 80, 25, 25);
            $container.addChild(this.Task_bg);
            this.Task_list_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_list_id", 10, 13, 45, 45);
            $container.addChild(this.Task_list_id);
            this.Task_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_ion_pic", 70, 18, 44, 44);
            $container.addChild(this.Task_ion_pic);
            this.Task_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_info", 100, 28, 190, 20);
            $container.addChild(this.Task_info);
            this.Task_but = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_but", 280, 13, 110, 49);
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
                var $tadayStr = GameData.getDayStr();
                var $taskMeshVo = this.itdata.data;
                switch ($taskMeshVo.processdata) {
                    case 0:
                        switch ($taskMeshVo.type) {
                            case TaskMeshVo.specialLeveladd:
                                Pan3d.ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL));
                                break;
                            case TaskMeshVo.megameAdd:
                                if (!TaskViewRender.isClikAddMe) {
                                    TaskViewRender.isClikAddMe = true;
                                    GameData.dispatchEvent(new megame.MeGameEvent(megame.MeGameEvent.SHOW_ME_GAME_PANEL), true);
                                }
                                else {
                                    msgalert.AlertUtil.show("重新从我的小程序进入就可以领取奖励了", "提示", function (bee) {
                                    }, 2);
                                    return;
                                }
                                break;
                            case TaskMeshVo.everydayLookAd:
                                if (GameData.devicetypepc) {
                                    var tempData = GameData.getEveryDataSyncByName("lookVideoNum");
                                    GameData.setEveryDataSyncByName("lookVideoNum", tempData.num + 1);
                                }
                                else {
                                    GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                                        if (value == 0) {
                                            msgalert.AlertUtil.show("网络已断开,无法看到广告", "提示");
                                        }
                                        else if (value == 1) {
                                            var tempData = GameData.getEveryDataSyncByName("lookVideoNum");
                                            GameData.setEveryDataSyncByName("lookVideoNum", tempData.num + 1);
                                            Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                                        }
                                        else if (value == 2) {
                                            msgalert.AlertUtil.show("需要看完视屏才能得到 金币奖励", "提示", function (bee) {
                                                if (bee == 1) {
                                                    Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                                                }
                                            }, 2);
                                        }
                                    });
                                }
                                break;
                            case TaskMeshVo.helpOther:
                                Pan3d.ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.SHOW_HELP_LIST_PANEL));
                                break;
                            default:
                                break;
                        }
                        Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.HIDE_TASK_PANEL));
                        break;
                    case 1:
                        GameData.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_GET_TASK_PANEL), $taskMeshVo);
                        break;
                    default:
                        break;
                }
            }
        };
        TaskViewRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $taskMeshVo = $data.data;
                this.drawPicAndTxt(this.Task_list_id, "List_id_bg", String($data.id), new Vector2D(0, 15), TextAlign.CENTER);
                this.uiAtlas.upDataPicToTexture($taskMeshVo.iconUrl, this.Task_ion_pic.skinName);
                var $textColor = ColorType.Black000000;
                var $processStr = "前往完成";
                var $picStr = "But_base_1";
                if ($taskMeshVo.processdata == 1) {
                    $processStr = "可领取";
                    $picStr = "But_base_1";
                    $textColor = ColorType.Redff0000;
                }
                if ($taskMeshVo.processdata == 2) {
                    $processStr = "已领取";
                    var $picStr = "But_base_2";
                    $textColor = ColorType.Black000000;
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Task_info.skinName, $taskMeshVo.txt, 18, TextAlign.CENTER, $textColor);
                this.drawPicAndTxt(this.Task_but, $picStr, $processStr, new Vector2D(0, 15), TextAlign.CENTER);
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Task_bg.skinName, UIData.textlist, "List_base_bg_1");
            }
        };
        TaskViewRender.prototype.drawPicAndTxt = function ($ui, puslicname, txt, pos, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $rect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 16, pos.x, pos.y, $align);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
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