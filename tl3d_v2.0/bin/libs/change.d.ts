 

declare class ModelsCreate extends layapan.LayaInsideSprite {
    modeldelt(): void
    modelcreate: any
    mouseEnabled: any
    mouseThrough: any
    role3d: any
}
declare class TestRole2dPanel extends layapan.LayaInsideSprite{
}
declare class mainpan3d   {
    public static canvas: HTMLCanvasElement
}
declare module scene2d {
    class Override2dEngine extends scene2d_me.Override2dEngine {
    }
    class CanvasPostionModel extends scene2d_me.CanvasPostionModel {
    }
}

declare module layapan {
    import CharNameMeshVo = Pan3d.CharNameMeshVo;
    import BloodLineMeshVo = Pan3d.BloodLineMeshVo;
    import LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar
    import LayaScene2D = LayaPan3D.LayaScene2D
 
    class LayaOverride2dSceneManager extends layapan_me.LayaOverride2dSceneManager {
        public layaForntPanel: any
        removeAllParticle: any
        public bloodManager: any
    }
    class LayaInsideSprite extends Laya.Sprite {
        public scene: LayaOverride2dSceneManager;
        public ape: any;
        public addSceneChar(value: any): void;
        public removeSceneChar(value: any): void;
        public _layaRenderIndex: any
    }
  
    class OtherLayaRectSprite extends Laya.Sprite {

    }
    class OverrideSkill extends layapan_me.OverrideSkill {

    }
 
    class LayaJumpUiDrawAndRefreash256 extends Pan3d.ExpTextJumpUiDrawAndRefreash {

    }
    export class LayaBloodManager extends Pan3d.BloodManager {

    }

    class Frame3DAtlasParticle extends layapan_me.Frame3DAtlasParticle {
    }
 
    class Pan3dInSideLaya {
        public static overrideMethods: any
    }
    class LayaScene2dInit   {
        public static isConfig: boolean
        public static initData(): void
        public static sceneItem: Array<LayaOverride2dSceneManager>;

    }
}
