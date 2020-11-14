// /*
// * name;//添加模型
// */
// class ModelVo {

//     public Char: layapan.LayaSceneChar;
//     public type: number;
//     public name: string;
// }
// class ModelsCreate extends Laya.Sprite{
   
//   constructor() {
      
//         super();
//         // this.ape = new BaseWinPanel()
//         // this.addChild(this.ape);
//         //   this.ape.pos(0, 200)

//         this.layaSceneLevel = new Scene3dLaya3dSprite();
//         this.layaSceneLevel.camAotuMove = false;
//         this.layaSceneLevel.camRotationY = 45
//         this.layaSceneLevel.camDistance = 520
//         // this.ape.x = x
//         // this.ape.y = y
//         //  this.layaSceneLevel.camViewLH = 1
//         this.addChild(this.layaSceneLevel)
//         this.roleItem = new Array()
//         // 
//     }
//     private mainSceneComplete(): void {
//     }
//     private mainSceneProgress(num: number): void {

//     }
   
//    // private uiLayaSceneChar: layapan.LayaSceneChar
//     render(context: Laya.RenderContext, x: number, y: number): void {
//         super.render(context, x, y)
//         this.layaSceneLevel.x =  x
//         this.layaSceneLevel.y =  y
//     }

//     private ape: BaseWinPanel
//     private layaSceneLevel: Scene3dLaya3dSprite
//     private roleItem: Array<layapan.LayaSceneChar>
  
//     private addBaseRole($str: string = "ms_0001", $pos: Pan3d.Vector3D=null, $rotation: number=0): void {    
//         var $baseChar: layapan.LayaSceneChar = new layapan.LayaSceneChar();
//         this.layaSceneLevel.scene.addMovieDisplay($baseChar);
//         $baseChar.setRoleUrl(getRoleUrl($str));
//         if ($pos) {
//             $baseChar.px = $pos.x
//             $baseChar.py = $pos.y
//             $baseChar.pz = $pos.z 
         
//         }
//         if(parseInt($str)>=1010101 && parseInt($str)<=1010106){
//             $baseChar.scale =2
//         }
//         else{
//             $baseChar.scale =1.5
//         }       
//         $baseChar.rotationY = $rotation
//         this.roleItem.push($baseChar);
//     }
//      public modelcreate(id:string,x:number,y:number,z:number,pos:number):void{//宠物模型IDstring类型，xyz 坐标，宠物朝向
//         this.addBaseRole(id, new Pan3d.Vector3D(x, y, z),pos);     
//     }
    
//     public modeldelt():void{
//         if(this.roleItem.length!=0){
//             for (var index = 0; index < this.roleItem.length; index++) {
//                 var $char: layapan.LayaSceneChar = this.roleItem.pop()
//                 this.layaSceneLevel.scene.removeMovieDisplay($char)                
//             }            
//         }        
//     }
// }
class ModelVo {
    public Char: layapan.LayaSceneChar;
    public type: number;
    public name: string;
}
class ModelsCreate extends Laya.Sprite{
  constructor() {
        super();
    }
    public role3d:YxChar3d
    private mainSceneComplete(): void {
    }
    private mainSceneProgress(num: number): void {

    }
  
    public modelcreate(id:string,x:number,y:number,z:number,pos:number):void{//宠物模型IDstring类型，xyz 坐标，宠物朝向
 
    }
    
    public modeldelt():void{
      
    }
}