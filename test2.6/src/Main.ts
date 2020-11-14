import { CameraView } from "./camera/CameraView";
import GameConfig from "./GameConfig";
import { GameView2d } from "./scene/GameView2d";
import { GameView3d } from "./scene/GameView3d";
import { GameMapLayer } from "./scene/layers/GameMapLayer";
import { SystemMgr } from "./scene/SystemMgr";
import { TApp } from "./TApp";
import { ui } from "./ui/layaMaxUI";
class Main {

	constructor() {
		//根据IDE设置初始化引擎		
		let cv = Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		tl3d.mainpan3d.canvas = cv;
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		// Laya.stage.bgColor="#ffffff";
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(false);

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onULoad));
	}

	public onULoad(): void {
		Laya.loader.load("ui.json", Laya.Handler.create(this, this.onLoadImages));
	}

	public onLoadImages(data: any):void{
		Laya.View.uiMap = data;
		Laya.loader.load(["res/atlas/comp.atlas","res/atlas/common/tab.atlas"], Laya.Handler.create(this, this.onConfigLoaded),null,Laya.Loader.ATLAS);
	}

	public onConfigLoaded(): void {
		//加载IDE指定的场景
		// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		tl3d.VertexElementFormat.__init__();
		tl3d.LayaScene2dInit.initData();
		// TApp.gameView = new GameView2d();
		TApp.gameView = new GameView3d();
		//相机组件
		TApp.cameraView=new CameraView();
		Laya.stage.addChild(TApp.cameraView);
		Laya.stage.addChild(new ui.HudUI());
		TApp.gameView.initScene();
		//驱动逻辑
		this.start();
	}

	/**
	 *  功能:开始渲染
	 *  参数:
	 **/
	public start(): void {
		Laya.timer.frameLoop(1, this, this.onEnterFrame);
	}

	/**
	 * 停止渲染 
	 */
	public stop(): void {
		Laya.timer.clear(this, this.onEnterFrame);
	}

	private time: number;

	protected onEnterFrame(): void {
		this.time = Laya.timer.currTimer;
		SystemMgr.singleton.run(this.time);
	}
}
//激活启动类
new Main();
