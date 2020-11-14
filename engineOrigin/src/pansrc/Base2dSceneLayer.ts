
//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
class Base2dSceneLayer extends layapan.LayaInsideSprite {
        constructor() {
      
            super();
        }

        /**
         * 充值镜头
         */
        protected upFrame(): void {
            Pan3d.Scene_data.context3D.setWriteDepth(true);
            Pan3d.Scene_data.context3D.setDepthTest(true);
            Pan3d.TimeUtil.update();
            //设置为2D的镜头角度
            Pan3d.Scene_data.focus3D.rotationY = 0;
            Pan3d.Scene_data.focus3D.rotationX = -45;
            Pan3d.Scene_data.cam3D.distance = 250;

            //这是是移动2D的基础坐标
            scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new Pan3d.Vector2D(this.x, this.y)
            scene2d.CanvasPostionModel.getInstance().resetSize();


            Pan3d.Scene_data.context3D.renderContext.clear(Pan3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            this.scene.upFrame();

        }



        //目标面板
		public targetPanel:Laya.Component;
		//上限坐标控件
		public topBounds:Laya.Component;
		//下限坐标控件
		public bottomBounds:Laya.Component;
        /**鼠标按下状态 */
        private _mouseState:boolean;

        /**
         * 设置模型旋转盒子
         * @param targetp 
         * @param topb 
         * @param bottomb 
         */
		public setModelBox(targetp:Laya.Component,topb:Laya.Component,bottomb:Laya.Component){
			this.targetPanel=targetp;
			this.topBounds=topb;
			this.bottomBounds=bottomb;
	
		}

		/**显示 */
		public onShow():void
		{	
			this.targetPanel.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
			this.targetPanel.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove); 
            this.targetPanel.on(Laya.Event.MOUSE_UP, this, this.mouseUp); 
		}

		/**关闭 */
		public onExit():void
		{
			this.targetPanel.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
			this.targetPanel.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove); 
		}

		/**点击开始的点 */
		private _startPosX: number = 0;
		private _startPosY: number = 0;
        private _cutShowGods: boolean = false;

		/**点击开始 */
		private mouseDown(e: Laya.Event): void {
            this._mouseState=true;
			this._cutShowGods = false;
			if (e.stageY <= this.bottomBounds.y
				&& e.stageY >= this.topBounds.y) {
				this._startPosX = e.stageX;
				this._startPosY = e.stageY;
				this._cutShowGods = true;
			}
		}

       	/**点击移动 拖动 */
		private mouseMove(e: Laya.Event): void {
            if(!this._mouseState){
                return;
            }
			if (e.stageY > this.bottomBounds.y || e.stageY < this.topBounds.y || !this._cutShowGods) {
				return;
			}
			let diffx = (e.stageX - this._startPosX);
			this._startPosX = e.stageX;
		}

        private mouseUp(e:Laya.Event):void
        {
             this._mouseState=false;
        }
    

}