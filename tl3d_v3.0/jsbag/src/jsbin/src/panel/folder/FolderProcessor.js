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
var folder;
(function (folder) {
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var Panel = win.Panel;
    var FileListPanel = filelist.FileListPanel;
    var BaseFolderWindow = basefolderwin.BaseFolderWindow;
    var OssFolderPanel = ossfolder.OssFolderPanel;
    var FolderEvent = /** @class */ (function (_super) {
        __extends(FolderEvent, _super);
        function FolderEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FolderEvent.SHOW_FOLDER_PANEL = "SHOW_FOLDER_PANEL";
        FolderEvent.EDITSCENE_RESET_SIZE = "EDITSCENE_RESET_SIZE";
        FolderEvent.RESET_FOLDE_WIN_SIZE = "RESET_FOLDE_WIND_SIZE";
        FolderEvent.LIST_DIS_ALL_FILE = "LIST_DIS_ALL_FILE";
        FolderEvent.LIST_OSS_FOLDER_FILE = "LIST_OSS_FOLDER_FILE";
        return FolderEvent;
    }(BaseEvent));
    folder.FolderEvent = FolderEvent;
    var FolderModule = /** @class */ (function (_super) {
        __extends(FolderModule, _super);
        function FolderModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FolderModule.prototype.getModuleName = function () {
            return "FolderModule";
        };
        FolderModule.prototype.listProcessors = function () {
            return [new FolderProcessor()];
        };
        return FolderModule;
    }(Module));
    folder.FolderModule = FolderModule;
    var FolderProcessor = /** @class */ (function (_super) {
        __extends(FolderProcessor, _super);
        function FolderProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FolderProcessor.prototype.getName = function () {
            return "FolderProcessor";
        };
        FolderProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof FolderEvent) {
                var _folderEvent = $event;
                if (_folderEvent.type == FolderEvent.SHOW_FOLDER_PANEL) {
                    if (!this._baseFolderWindow) {
                        this._baseFolderWindow = new BaseFolderWindow();
                    }
                    this.addUIContainer(this._baseFolderWindow);
                    if (!this._folderPanel) {
                        this._folderPanel = new OssFolderPanel();
                    }
                    this.addUIContainer(this._folderPanel);
                    if (!this._fileListPanel) {
                        this._fileListPanel = new FileListPanel();
                    }
                    this.addUIContainer(this._fileListPanel);
                    if (this.fristRect) {
                        this._baseFolderWindow.setRect(this.fristRect);
                    }
                }
                if (_folderEvent.type == FolderEvent.EDITSCENE_RESET_SIZE) {
                    if (this._baseFolderWindow) {
                        this._baseFolderWindow.setRect(_folderEvent.data);
                    }
                    else {
                        this.fristRect = _folderEvent.data;
                    }
                }
                if (_folderEvent.type == FolderEvent.LIST_DIS_ALL_FILE) {
                    this._fileListPanel.refrishPath(String(_folderEvent.data));
                }
                if (_folderEvent.type == FolderEvent.LIST_OSS_FOLDER_FILE) {
                    this._folderPanel.fileOssFolderDic(String(_folderEvent.data));
                }
                if (_folderEvent.type == FolderEvent.RESET_FOLDE_WIN_SIZE) {
                    this.resetFolderWinSize();
                }
            }
        };
        FolderProcessor.prototype.resetFolderWinSize = function () {
            var $perentWinRect = this._baseFolderWindow.getPageRect().clone();
            var A = $perentWinRect.clone();
            A.x = 0;
            A.y += 13;
            A.width = $perentWinRect.width * this._baseFolderWindow.percentNum + 5;
            A.height -= 18;
            this._folderPanel.setRect(A);
            var B = $perentWinRect.clone();
            B.x = $perentWinRect.width * this._baseFolderWindow.percentNum;
            B.y = $perentWinRect.y + 40;
            B.width = $perentWinRect.width * (1 - this._baseFolderWindow.percentNum);
            B.height -= 43;
            this._fileListPanel.setRect(B);
        };
        FolderProcessor.prototype.addOtherPanel = function () {
            win.LayerManager.getInstance().addPanel(new Panel, 200);
        };
        FolderProcessor.prototype.addUIContainer = function (value) {
            if (!this.folderPanel) {
                this.folderPanel = new Panel();
                this.folderPanel.x = 0;
                this.folderPanel.y = 0;
                this.folderPanel.width = 450;
                this.folderPanel.height = 250;
                win.LayerManager.getInstance().addPanel(this.folderPanel, 200);
                // this.addOtherPanel()
            }
            this.folderPanel.addUIContainer(value);
            //   layout.LayerManager.getInstance().mainTab.addUIContainer(value);
            //  UIManager.getInstance().addUIContainer(value);
        };
        FolderProcessor.prototype.listenModuleEvents = function () {
            return [
                new FolderEvent(FolderEvent.SHOW_FOLDER_PANEL),
                new FolderEvent(FolderEvent.RESET_FOLDE_WIN_SIZE),
                new FolderEvent(FolderEvent.EDITSCENE_RESET_SIZE),
                new FolderEvent(FolderEvent.LIST_DIS_ALL_FILE),
                new FolderEvent(FolderEvent.LIST_OSS_FOLDER_FILE),
            ];
        };
        return FolderProcessor;
    }(BaseProcessor));
    folder.FolderProcessor = FolderProcessor;
})(folder || (folder = {}));
//# sourceMappingURL=FolderProcessor.js.map