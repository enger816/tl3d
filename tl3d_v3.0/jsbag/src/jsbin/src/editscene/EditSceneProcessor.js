var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var editscene;
(function (editscene) {
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var EditSceneEvent = /** @class */ (function (_super) {
        __extends(EditSceneEvent, _super);
        function EditSceneEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditSceneEvent.SHOW_EDITSCENE_PANEL = "SHOW_EDITSCENE_PANEL";
        EditSceneEvent.EDITE_SCENE_RESIZE = "EDITE_SCENE_RESIZE";
        EditSceneEvent.SHOW_HIDE_EDIT_TEMP_PANEL = "SHOW_HIDE_EDIT_TEMP_PANEL";
        EditSceneEvent.EDITE_SCENE_UI_LOAD_COMPLETE = "EDITE_SCENE_UI_LOAD_COMPLETE";
        return EditSceneEvent;
    }(BaseEvent));
    editscene.EditSceneEvent = EditSceneEvent;
    var EditSceneModule = /** @class */ (function (_super) {
        __extends(EditSceneModule, _super);
        function EditSceneModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditSceneModule.prototype.getModuleName = function () {
            return "EditSceneModule";
        };
        EditSceneModule.prototype.listProcessors = function () {
            return [new EditSceneProcessor()];
        };
        return EditSceneModule;
    }(Module));
    editscene.EditSceneModule = EditSceneModule;
    var EditSceneProcessor = /** @class */ (function (_super) {
        __extends(EditSceneProcessor, _super);
        function EditSceneProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditSceneProcessor.prototype.getName = function () {
            return "EditSceneProcessor";
        };
        EditSceneProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof EditSceneEvent) {
                var $editSceneEvent = $event;
                if ($editSceneEvent.type == EditSceneEvent.SHOW_EDITSCENE_PANEL) {
                    this._editScenePanel = new editscene.EditScenePanel;
                    this._editScenePanel.x = 300;
                    this._editScenePanel.y = 300;
                    this._editScenePanel.width = 450;
                    this._editScenePanel.height = 500;
                    win.LayerManager.getInstance().addPanel(this._editScenePanel, 100);
                }
                if ($editSceneEvent.type == EditSceneEvent.EDITE_SCENE_UI_LOAD_COMPLETE) {
                    this.initSceneData();
                }
            }
        };
        EditSceneProcessor.prototype.initSceneData = function () {
            var $nameKey = "scene.map";
            if (localStorage.getItem("mapurl")) {
                $nameKey = localStorage.getItem("mapurl");
            }
            if (getUrlParam("mapurl")) {
                $nameKey = getUrlParam("mapurl");
                console.log($nameKey);
            }
            maineditor.EditorModel.getInstance().openFileByUrl($nameKey);
            //if ($nameKey.indexOf(".material") != -1) {
            //    Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), $nameKey);//加载材质
            //}
            //if ($nameKey.indexOf(".map") != -1) {
            //    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), $nameKey); //加载场景
            //}
        };
        EditSceneProcessor.prototype.listenModuleEvents = function () {
            return [
                new EditSceneEvent(EditSceneEvent.SHOW_EDITSCENE_PANEL),
                new EditSceneEvent(EditSceneEvent.SHOW_HIDE_EDIT_TEMP_PANEL),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_UI_LOAD_COMPLETE),
            ];
        };
        return EditSceneProcessor;
    }(BaseProcessor));
    editscene.EditSceneProcessor = EditSceneProcessor;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditSceneProcessor.js.map