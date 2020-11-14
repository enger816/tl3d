
class TestRole2dPanel extends Laya.Sprite {
    constructor() {
        super();

         this.ape = new BaseWinPanel()
        this.addChild(this.ape);  
        this.ape.pos(300,100)
        this.layaSceneLevel = new BaseLaya3dSprite();
        this.addChild(this.layaSceneLevel)
    }
        public ape: BaseWinPanel

   public render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }

    private layaSceneLevel: BaseLaya3dSprite

    public addSceneChar(value:layapan.LayaSceneChar):void
    {
      this.layaSceneLevel.scene.addMovieDisplay(value);
 
    }
    public removeSceneChar(value:layapan.LayaSceneChar):void

    {
      this.layaSceneLevel.scene.removeMovieDisplay(value);
 
    }

}