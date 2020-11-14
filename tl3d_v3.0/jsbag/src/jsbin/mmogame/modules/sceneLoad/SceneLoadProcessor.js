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
var SceneLoadEvent = /** @class */ (function (_super) {
    __extends(SceneLoadEvent, _super);
    function SceneLoadEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progress = 0;
        return _this;
    }
    SceneLoadEvent.SHOW_LOAD_EVENT = "show_load_event";
    SceneLoadEvent.REMOVE_LOAD_EVENT = "remove_load_event";
    SceneLoadEvent.PROGRESS_LOAD_EVENT = "progress_load_event";
    SceneLoadEvent.ANALYSIS_LOAD_EVENT = "analysis_load_event";
    SceneLoadEvent.INFO_EVENT = "info_event";
    SceneLoadEvent.SCENE_TRANSITION_EVENT = "scene_transition_event";
    SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT = "scene_transition_hide_event";
    return SceneLoadEvent;
}(BaseEvent));
var SceneLoadModule = /** @class */ (function (_super) {
    __extends(SceneLoadModule, _super);
    function SceneLoadModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneLoadModule.prototype.getModuleName = function () {
        return "SceneLoadModule";
    };
    SceneLoadModule.prototype.listProcessors = function () {
        return [new SceneLoadProcessor()];
    };
    return SceneLoadModule;
}(Module));
var SceneLoadProcessor = /** @class */ (function (_super) {
    __extends(SceneLoadProcessor, _super);
    function SceneLoadProcessor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tempNum = 0;
        return _this;
    }
    SceneLoadProcessor.prototype.getName = function () {
        return "SceneLoadProcessor";
    };
    SceneLoadProcessor.prototype.receivedModuleEvent = function ($event) {
        var evt = $event;
        if (evt.type == SceneLoadEvent.SHOW_LOAD_EVENT) {
            this.showLoadPanel(evt);
            this._sceneLoadUI.setTxt("正在加载地图资源...");
        }
        else if (evt.type == SceneLoadEvent.REMOVE_LOAD_EVENT) {
            this.removeUI();
        }
        else if (evt.type == SceneLoadEvent.PROGRESS_LOAD_EVENT) {
            this._sceneLoadUI.setProgress(evt.progress);
        }
        else if (evt.type == SceneLoadEvent.ANALYSIS_LOAD_EVENT) {
        }
        else if (evt.type == SceneLoadEvent.INFO_EVENT) {
            this._sceneLoadUI.setTxt(evt.str);
        }
        else if (evt.type == SceneLoadEvent.SCENE_TRANSITION_EVENT) {
            this.showTransition();
        }
        else if (evt.type == SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT) {
            this.hideTransition();
        }
    };
    SceneLoadProcessor.prototype.showLoadPanel = function (evt) {
        if (!this._sceneLoadUI) {
            this._sceneLoadUI = new SceneLoadUI();
        }
        this._sceneLoadUI.show();
        this._sceneLoadUI.loadBackImg(evt.backImgUrl);
        this._sceneLoadUI.resize();
        UIManager.getInstance().addUIContainer(this._sceneLoadUI);
    };
    SceneLoadProcessor.prototype.removeUI = function () {
        this._sceneLoadUI.remove();
        UIManager.getInstance().removeUIContainer(this._sceneLoadUI);
        //this.initTransition();
    };
    SceneLoadProcessor.prototype.initTransition = function () {
        if (!this.sceneTransitionUI) {
            this.sceneTransitionUI = new SceneTransitionUI;
        }
    };
    SceneLoadProcessor.prototype.showTransition = function () {
        var _this = this;
        if (!this.sceneTransitionUI) {
            this.sceneTransitionUI = new SceneTransitionUI;
        }
        //SceneManager.getInstance().ready = false;   
        GameInstance.mainChar.toRotationY = 180 - Scene_data.cam3D.rotationY;
        GameInstance.mainChar.refreshPos();
        var target = GameInstance.mainChar;
        var base = GameInstance.mainChar.py;
        this._target = target;
        this._baseY = base;
        this._showTime = TimeUtil.getTimer();
        var runfun = function () { GameInstance.mainChar.refreshPos(); };
        // var hideFun:Function = ()=>{
        //     TweenLite.to(target,0.5,{py:base,onUpdate:runfun,onComplete:()=>{
        //         AttackEffectsManager.playLyf(getModelUrl("ef_xiaosi_lyf"),GameInstance.mainChar,new Vector3D(0,-30,0));
        //         UIManager.getInstance().removeUIContainer(this.sceneTransitionUI);
        //         TimeUtil.addTimeOut(300,()=>{GameInstance.mainChar.visible = true})
        //     }});
        // }
        AttackEffectsManager.playLyf(getModelUrl("ef_xiaosi_lyf"), GameInstance.mainChar, new Vector3D(0, -30, 0));
        TimeUtil.addTimeOut(200, function () {
            TimeUtil.addTimeOut(300, function () { _this.sceneTransitionUI.show(); });
            GameInstance.mainChar.visible = false;
            TweenLite.to(target, 1, { py: base + 200, onComplete: function () {
                    //TimeUtil.addTimeOut(1000,hideFun);
                }, onUpdate: runfun });
        });
    };
    SceneLoadProcessor.prototype.hideTransition = function () {
        var _this = this;
        if (!this._target) {
            return;
        }
        var deltime = 2300 - (TimeUtil.getTimer() - this._showTime);
        if (deltime > 0) {
            TimeUtil.addTimeOut(deltime, function () { _this.applyHide(); });
        }
        else {
            this.applyHide();
        }
    };
    SceneLoadProcessor.prototype.applyHide = function () {
        var _this = this;
        if (this._target != GameInstance.mainChar) {
            this._target = GameInstance.mainChar;
            this._baseY = GameInstance.mainChar.py;
            GameInstance.mainChar.py += 200;
            GameInstance.mainChar.visible = false;
        }
        var runfun = function () { GameInstance.mainChar.refreshPos(); };
        if (this.sceneTransitionUI) {
            this.sceneTransitionUI.hide();
        }
        TweenLite.to(this._target, 0.5, { py: this._baseY, onUpdate: runfun, onComplete: function () {
                AttackEffectsManager.playLyf(getModelUrl("ef_xiaosi_lyf"), GameInstance.mainChar, new Vector3D(0, -30, 0));
                if (_this.sceneTransitionUI) {
                    UIManager.getInstance().removeUIContainer(_this.sceneTransitionUI);
                }
                TimeUtil.addTimeOut(300, function () {
                    GameInstance.mainChar.visible = true;
                    _this._target = null;
                    //SceneManager.getInstance().ready = true;
                });
            } });
    };
    SceneLoadProcessor.prototype.listenModuleEvents = function () {
        return [
            new SceneLoadEvent(SceneLoadEvent.SHOW_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.REMOVE_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.PROGRESS_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.ANALYSIS_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.INFO_EVENT),
            new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT),
            new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT),
        ];
    };
    return SceneLoadProcessor;
}(BaseProcessor));
//# sourceMappingURL=SceneLoadProcessor.js.map