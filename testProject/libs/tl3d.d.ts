declare module tl3d {
    class BitMapData {
        width: number;
        height: number;
        imgData: ImageData;
        constructor($w: number, $h: number);
        private getIndexByPos($tx, $ty);
        setRgb($tx: number, $ty: number, $ve: Vector3D): void;
        getRgb($tx: number, $ty: number): Vector3D;
    }
}
declare module tl3d {
    class Camera3D extends Object3D {
        cameraMatrix: Matrix3D;
        private _distance;
        lookAtTarget: Object3D;
        private _astarRect;
        offset: Vector3D;
        constructor();
        distance: number;
        lookAt($target: Object3D): void;
        private _midPos;
        private _scaleVec;
        astarRect: Rectangle;
        private lastFoucs3D;
        needChange: boolean;
        update(): void;
        readonly postion: Vector3D;
    }
}
declare module tl3d {
    class ColorType {
        static Orange7a2f21: string;
        static Orange9a683f: string;
        static Orange853d07: string;
        static Brown6a4936: string;
        static Brown623424: string;
        static Brownac8965: string;
        static Reddb4051: string;
        static Redd92200: string;
        static Redff0000: string;
        static Brownd8d49c: string;
        static color843b11: string;
        static colorb96d49: string;
        static colorcd2000: string;
        static colorfef3d7: string;
        static color9a683f: string;
        static Brown7a2f21: string;
        static Brown40120a: string;
        static Brown491207: string;
        static Brown541616: string;
        static Brown5a2610: string;
        static Browndf9a68: string;
        static Browndb39264: string;
        static Brownd662c0d: string;
        static colorefe4c4: string;
        static color802626: string;
        static color9f7b4d: string;
        static color4b0808: string;
        static color5f5c59: string;
        static color903713: string;
        static colorfdf6da: string;
        static color73301c: string;
        static colorffeeb5: string;
        static Green98ec2c: string;
        static Green56da35: string;
        static Green20a200: string;
        static Greenadff00: string;
        static Green2ca937: string;
        static Green464b11: string;
        static Green54db36: string;
        static Yellowf7d253: string;
        static Yellowffecc6: string;
        static Yellowffd500: string;
        static Yellowffe9b4: string;
        static Yellowedce7e: string;
        static color4c1c07: string;
        static Whiteffffff: string;
        static Whitefffce6: string;
        static Whitefff7db: string;
        static White9A683F: string;
        static Black000000: string;
        static Whitefff4d6: string;
        static Whiteffeed0: string;
        static Whiteffeec9: string;
        static Whiteffe9b4: string;
        static Whitefff0b4: string;
        static Coffeeff9200: string;
        static Coffeefee87b: string;
        static color2daa35: string;
        static color4392ff: string;
        static colorb759ff: string;
        static colorff7200: string;
        static colorce0a00: string;
        static coloraa874a: string;
        static colorffecc6: string;
        static colorfde87e: string;
        static colord6e7ff: string;
        static colord27262e: string;
        static colorffe9b4: string;
        static color9c9b9b: string;
        static colorfff2d3: string;
        static color451800: string;
    }
}
declare module tl3d {
    interface IDictionary {
        add(key: string, value: any): void;
        remove(key: string): void;
        containsKey(key: string): boolean;
        keys(): string[];
        values(): any[];
    }
    class Dictionary implements IDictionary {
        _keys: string[];
        _values: any[];
        constructor(init: {
            key: string;
            value: any;
        }[]);
        add(key: string, value: any): void;
        has(key: string): boolean;
        remove(key: string): void;
        keys(): string[];
        values(): any[];
        containsKey(key: string): boolean;
        toLookup(): IDictionary;
    }
}
declare module tl3d {
    class GC {
        destory(): void;
    }
}
declare module tl3d {
    class MeshData extends ObjData {
        boneIDAry: Array<number>;
        boneWeightAry: Array<number>;
        boneWeightBuffer: WebGLBuffer;
        boneIdBuffer: WebGLBuffer;
        boneNewIDAry: Array<number>;
        materialUrl: string;
        materialParamData: Array<any>;
        materialParam: MaterialBaseParam;
        material: Material;
        particleAry: Array<BindParticle>;
        uid: number;
        boneIDOffsets: number;
        boneWeightOffsets: number;
        destory(): void;
    }
    class BindParticle {
        url: string;
        socketName: string;
        constructor($url: string, $socketName: string);
    }
}
declare module tl3d {
    class ObjData extends ResCount {
        vertices: Array<number>;
        uvs: Array<number>;
        indexs: Array<number>;
        lightuvs: Array<number>;
        normals: Array<number>;
        tangents: Array<number>;
        bitangents: Array<number>;
        treNum: number;
        vertexBuffer: WebGLBuffer;
        uvBuffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;
        lightUvBuffer: WebGLBuffer;
        normalsBuffer: WebGLBuffer;
        tangentBuffer: WebGLBuffer;
        bitangentBuffer: WebGLBuffer;
        /**顶点 uv lightuv normal 合成一个 va */
        compressBuffer: boolean;
        uvsOffsets: number;
        lightuvsOffsets: number;
        normalsOffsets: number;
        tangentsOffsets: number;
        bitangentsOffsets: number;
        stride: number;
        hasdispose: boolean;
        constructor();
        destory(): void;
    }
}
declare module tl3d {
    class Object3D extends EventDispatcher {
        protected _x: number;
        protected _y: number;
        protected _z: number;
        rx: number;
        ry: number;
        rz: number;
        protected _scaleX: number;
        protected _scaleY: number;
        protected _scaleZ: number;
        protected _rotationX: number;
        protected _rotationY: number;
        protected _rotationZ: number;
        posMatrix: Matrix3D;
        constructor($x?: number, $y?: number, $z?: number);
        toString(): String;
        x: number;
        y: number;
        z: number;
        scale: number;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        px: number;
        py: number;
        pz: number;
        updateMatrix(): void;
        updateRotationMatrix(): void;
    }
}
declare module tl3d {
    class ResCount extends GC {
        protected _useNum: number;
        idleTime: number;
        static GCTime: number;
        useNum: number;
        clearUseNum(): void;
    }
}
declare module tl3d {
    class ResGC {
        protected _dic: Object;
        constructor();
        gc(): void;
    }
}
declare module tl3d {
    class Context3D {
        renderContext: WebGLRenderingContext;
        _contextSetTest: ContextSetTest;
        init($caves: HTMLCanvasElement): void;
        resetSize($width: number, $height: number): void;
        uploadBuff3D($jsData: any): WebGLBuffer;
        uploadBuff3DArrayBuffer($jsData: ArrayBuffer): WebGLBuffer;
        uploadBuff3DByBuffer($buffData: WebGLBuffer, $jsData: Array<number>): void;
        uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer;
        uploadIndexBuff3DByBuffer($iBuffer: WebGLBuffer, $iStrData: Array<number>): void;
        clearContext(): void;
        update(): void;
        updateFBO(fbo: FBO): void;
        setDepthTest(tf: boolean): void;
        setWriteDepth(tf: boolean): void;
        setBlendParticleFactors(type: number): void;
        setProgram($program: WebGLProgram): void;
        getLocation($program: WebGLProgram, $name: string): WebGLUniformLocation;
        /** ***************************setvc */
        setVcMatrix3fv($program: Shader3D, $name: string, $m: Float32Array): void;
        setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array): void;
        setVpMatrix($program: Shader3D, $m: Float32Array): void;
        setVc4fv($program: Shader3D, $name: string, $m: any): void;
        setVc1fv($program: Shader3D, $name: string, $m: any): void;
        setVc3fv($program: Shader3D, $name: string, $m: any): void;
        setVc2fv($program: Shader3D, $name: string, $m: any): void;
        setVcFloat($program: Shader3D, $name: string, $m: any): void;
        /** ******************************************* end setvc */
        setuniform3f($program: Shader3D, $name: string, a: number, b: number, c: number): void;
        setVcMatrix4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
        setVc2f($program: Shader3D, $name: string, a: number, b: number): void;
        setVcMatrix2fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
        setVc4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
        setVa(dataId: number, dataWidth: number, dataBuffer: WebGLBuffer): void;
        pushVa(dataBuffer: WebGLBuffer): boolean;
        setVaOffset(dataId: number, dataWidth: number, stride: number, offset: number): void;
        clearVa(dataId: number): void;
        drawCall($iBuffer: WebGLBuffer, $numTri: number): void;
        drawLine($iBuffer: WebGLBuffer, $numTri: number): void;
        private setTextureNum;
        private setProgramNum;
        setRenderTexture($program: Shader3D, $name: string, $textureObject: WebGLTexture, $level: number, test?: boolean): void;
        setRenderTextureCube($program: WebGLProgram, $name: string, $textureObject: WebGLTexture, $level: number): void;
        updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, $img: any): void;
        getTexture($img: any, $wrap?: number, $filter?: number, $mipmap?: number): WebGLTexture;
        creatTexture($width: number, $height: number, $wrap?: number): WebGLTexture;
        createFramebuffer(): WebGLFramebuffer;
        deleteBuffer(buffer: WebGLBuffer): void;
        deleteTexture(texture: WebGLTexture): void;
        deleteShader(shader: Shader3D): void;
        cullFaceBack(tf: boolean): void;
        getFBO(): FBO;
        clearTest(): void;
    }
    class FBO {
        static fw: number;
        static fh: number;
        frameBuffer: WebGLFramebuffer;
        depthBuffer: WebGLRenderbuffer;
        texture: WebGLRenderbuffer;
    }
    class ContextSetTest {
        private _textureDic;
        private _program;
        enableVaAry: Array<boolean>;
        vaAry: Array<boolean>;
        private _vabuffer;
        private _blendType;
        private _cullType;
        private _zbufferType;
        private _vpMatrix;
        testTexture($name: string, $textureObject: WebGLTexture): boolean;
        testProgram($program: WebGLProgram): boolean;
        testVa(dataBuffer: WebGLBuffer): boolean;
        clear(): void;
        testBlend($type: number): boolean;
        testCull($type: boolean): boolean;
        testZbuffer($type: boolean): boolean;
        testVp(): boolean;
    }
}
declare module tl3d {
    class Scene_data {
        static isPanGm: boolean;
        static isPc: boolean;
        static isIos: boolean;
        static context3D: Context3D;
        static canvas3D: HTMLCanvasElement;
        static stageWidth: number;
        static stageHeight: number;
        static sceneViewHW: number;
        static fileRoot: string;
        static verticalScene: boolean;
        static effectsLev: number;
        static cam3D: Camera3D;
        static focus3D: Object3D;
        private static _viewMatrx3D;
        static vpMatrix: Matrix3D;
        static camFar: number;
        static skyCubeMap: Array<WebGLTexture>;
        static pubLut: WebGLTexture;
        static frameTime: number;
        static MAX_NUMBER: number;
        static uiStage: UIStage;
        static uiBlankStage: UIStage;
        static user: number;
        static light: LightVo;
        static scaleLight: Array<number>;
        static useByte: Boolean;
        static fogColor: Array<number>;
        static fogData: Array<number>;
        static gameAngle: number;
        static sceneNumId: number;
        static fbo: FBO;
        static viewMatrx3D: Matrix3D;
        static supportBlob: boolean;
    }
}
declare module tl3d {
    class BaseDiplay3dShader extends Shader3D {
        static BaseDiplay3dShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class Display2dMovie extends Display3D {
        batchPos: Array<Movie3D>;
        movieTexture: WebGLTexture;
        watchCaramMatrix: Matrix3D;
        private _time;
        private _allFrame;
        private _uvData;
        private _uWidth;
        private _vWidth;
        private _state;
        frameRate: number;
        constructor();
        update(): void;
        updateFrame(t: number): void;
        play(action: string, state?: number): void;
        addSun($obj: Movie3D): void;
        setUrl($url: string): void;
        initData(num: number, scale: number, uscale: number, vscale: number, allFrame: number, random?: boolean): void;
        setScene(scene: SceneManager): void;
        removeSelf(): void;
    }
}
declare module tl3d {
    class Display2DSprite extends Display3D {
        batchPos: Array<Sprite>;
        watchCaramMatrix: Matrix3D;
        private _imgAtlas;
        constructor();
        setInfo($configurl: string, $imgurl: string, $fun: Function): void;
        getSprite($name: string): Sprite;
        addSprite(...spriteAry: Sprite[]): void;
        applyData(): void;
        update(): void;
    }
}
declare module tl3d {
    class Display3D extends Object3D {
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        beginTime: number;
        type: number;
        sceneVisible: boolean;
        protected _hasDestory: boolean;
        _scene: SceneManager;
        constructor();
        update(): void;
        readonly onStage: boolean;
        setScene(scene: any): void;
        removeSelf(): void;
        resize(): void;
        destory(): void;
    }
}
declare module tl3d {
    class Display3dBatchMovie extends Display3dMovie {
        batchNum: number;
        batchPos: Array<Movie3D>;
        constructor();
        fileScale: number;
        addSun($obj: Movie3D): void;
        setVcMatrix($mesh: MeshData): void;
        setLightProbeVc($material: Material): void;
        setVa($mesh: MeshData): void;
        setScene(scene: SceneManager): void;
        removeSelf(): void;
    }
}
declare module tl3d {
    class Display3dBg extends Display3D {
        protected texture: WebGLTexture;
        constructor();
        private _width;
        private _height;
        private _wScale;
        private _hScale;
        private _scaleData;
        protected initData(): void;
        resize(): void;
        setImgInfo($url: string, $width: number, $height: number): void;
        setImgUrl($url: string): void;
        appleyPos(): void;
        update(): void;
    }
}
declare module tl3d {
    class Display3dMovie extends Display3DSprite implements IBind {
        private _meshUrl;
        _onStage: boolean;
        protected _skinMesh: SkinMesh;
        protected _animDic: Object;
        protected _preLoadActionDic: Object;
        protected _waitLoadActionDic: Object;
        protected _completeState: number;
        protected _defaultAction: string;
        private _curentAction;
        protected _curentFrame: number;
        protected _actionTime: number;
        protected _partDic: Object;
        protected _partUrl: Object;
        private _capsule;
        showCapsule: boolean;
        protected _enablePhysics: boolean;
        protected _shadow: Shadow;
        protected _fileScale: number;
        private _roleRes;
        _hasDestory: boolean;
        /**正在播放的技能*/
        _isSinging: boolean;
        isSinging: boolean;
        meshVisible: boolean;
        constructor();
        curentAction: string;
        fixAstartData(pos: Vector2D): void;
        setRoleUrl(value: string, callback?: any): void;
        onMeshLoaded(): void;
        clearMesh(): void;
        addSkinMeshParticle(): void;
        removeSkinMeshParticle(): void;
        private roleResCom($roleRes, $batchNum);
        setMeshUrl(value: string, $batchNum?: number): void;
        private _nextScale;
        scale: number;
        fileScale: number;
        shadow: boolean;
        setShadowSize(value: number): void;
        setScene(scene: SceneManager): void;
        removeSelf(): void;
        loadMaterialCom($material: Material): void;
        setCollision($radius: number, $height: number): void;
        applyVisible(): void;
        removePart($key: string): void;
        /**
            部位，路径，类型 1为粒子 0为其他
        */
        addPart($key: string, $bindSocket: string, $url: string): void;
        protected loadPartRes($bindSocket, groupRes, ary);
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
        protected getFrameMatrix(index: number): Matrix3D;
        addAction(name: string, url: string, needPerLoad?: boolean): void;
        setAnimUrl(name: string, url: string): void;
        play($action: string, $completeState?: number, needFollow?: boolean, cb?: Function): boolean;
        private processAnimByMesh($animData);
        update(): void;
        updateFrame(t: number): void;
        protected changeAction($action: string): void;
        destory(): void;
        private capsuleLineSprite;
        updateShowCapsule(): void;
        private drawBall($r);
        private drawCylinder($w, $h);
        setVcMatrix($mesh: MeshData): void;
        setVa($mesh: MeshData): void;
        setVaIndependent($mesh: MeshData): void;
        setVaCompress($mesh: MeshData): void;
        clearVa(): void;
        updateMaterialMesh($mesh: MeshData): void;
        setLightProbeVc($material: Material): void;
        private locationDic;
        setMeshVc($mesh: MeshData): void;
        setPos($v3d: Vector3D): void;
        x: number;
        y: number;
        z: number;
        changePos(): void;
        addStage(): void;
    }
}
declare module tl3d {
    class Display3dShadow extends Display3D {
        static texture: WebGLTexture;
        shadowList: Array<Shadow>;
        needUpdate: boolean;
        private posProLocation;
        constructor();
        addShadow($shdow: Shadow): void;
        removeShadow($shdow: Shadow): void;
        stateChage(): void;
        hasIdle(): boolean;
        applyObjData(): void;
        private locationFloat32;
        update(): void;
    }
}
declare module tl3d {
    class Display3DSky extends Display3D {
        objurl: string;
        cubeTextList: Array<WebGLTexture>;
        constructor();
        setObjUrl(value: string): void;
        setCubeUrl(value: string): void;
        update(): void;
    }
}
declare module tl3d {
    class Display3DSprite extends Display3D {
        isPerspective: boolean;
        name: string;
        id: number;
        objurl: string;
        picUrl: string;
        materialUrl: string;
        materialInfoArr: Array<any>;
        material: Material;
        materialParam: MaterialBaseParam;
        time: number;
        lightMapTextureRes: TextureRes;
        protected _rotationMatrix: Matrix3D;
        _rotationData: Float32Array;
        bindMatrix: Matrix3D;
        bindTarget: IBind;
        bindSocket: string;
        private _isInGroup;
        private _groupPos;
        private _groupRotation;
        private _groupScale;
        groupMatrix: Matrix3D;
        groupRotationMatrix: Matrix3D;
        private _lightProbe;
        protected resultSHVec: Array<Vector3D>;
        aabb: tree.QuadTreeNode;
        dynamic: boolean;
        constructor();
        private _aabbVect;
        readonly aabbVect: Array<Vector3D>;
        setObjUrl(value: string): void;
        baseTexture: TextureRes;
        setPicUrl($str: string): void;
        setLightMapUrl(value: string): void;
        readonly lightMapTexture: WebGLTexture;
        setMaterialUrl(value: string, $paramData?: Array<any>): void;
        lightProbe: boolean;
        update(): void;
        updateMaterial(): void;
        setMaterialVa(): void;
        setMaterialVaIndependent(): void;
        setMaterialVaCompress(): void;
        setDirectLight($material: Material): void;
        setCam(): void;
        setBind($bindTarget: IBind, $bindSocket: string): void;
        setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void;
        updateBind(): void;
        protected setBaseMaterialVc($material: Material): void;
        setCamPos($material: Material): void;
        setMaterialVc($material: Material, $mp?: MaterialBaseParam): void;
        setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
        checkMaterialTexture($material: Material): boolean;
        updateRotationMatrix(): void;
        setPos($v3d: Vector3D): void;
        destory(): void;
        removeStage(): void;
    }
}
declare module tl3d {
    class Display3DUISprite extends Display3DSprite {
        private uiMatrix;
        private uiViewMatrix;
        private modelRes;
        constructor();
        private loadRes($name);
        loadResComFinish(): void;
        loadGroup($name: string): void;
        private loadPartRes(groupRes);
        resize(): void;
        setCam(): void;
        update(): void;
    }
}
declare module tl3d {
    interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
    interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }
}
/**
* name
*/
declare module tl3d {
    class Movie3D extends Object3D {
        private _shadow;
        posData: Array<number>;
        retinueShadowFix: Vector3D;
        target: Vector3D;
        hasReach: boolean;
        shadow: boolean;
        _fileScale: number;
        fileScale: number;
        scale: number;
        x: number;
        y: number;
        z: number;
        add(): void;
        remove(): void;
    }
}
/**
* name
*/
declare module tl3d {
    class Sprite extends Object3D {
        posData: Array<number>;
        uvData: UIRectangle;
        setPos(xpos: number, ypos: number, zpos: number): void;
        scale: number;
        x: number;
        y: number;
        z: number;
    }
}
/**
* name
*/
declare module tl3d {
    class GroundDataMesh {
        tx: number;
        ty: number;
        idBitmap: BitMapData;
        infoBitmap: BitMapData;
        sixurl: string;
        private mekeUseTexture($img);
        calibration(): void;
        static meshAllgroundData($byte: ByteArray): Array<GroundDataMesh>;
    }
}
declare module tl3d {
    class TerrainDisplay3DSprite extends Display3DSprite {
        private groundShader;
        private baseSixteenRes;
        private idMapPicDataTexture;
        private infoMapPicDataTexture;
        constructor();
        update(): void;
        private upDataToDraw();
        setGrounDataMesh($groundDataMesh: GroundDataMesh): void;
    }
}
declare module tl3d {
    class Engine {
        static init($caves: HTMLCanvasElement): void;
        static resReady(): void;
        static testBlob(): void;
        static initPbr(): void;
        static initShadow(): void;
        private static _width;
        private static _height;
        static needVertical: Boolean;
        static needInputTxt: boolean;
        static resetSize(width?: number, height?: number): void;
        static sceneCamScale: number;
        static resetViewMatrx3D(): void;
        static update(): void;
        static unload(): void;
        static canvas: any;
    }
}
declare module tl3d {
    class BaseEvent {
        type: string;
        target: EventDispatcher;
        constructor($type: string);
        static COMPLETE: string;
    }
}
declare module tl3d {
    class EventDispatcher {
        protected _eventsMap: Object;
        addEventListener(types: string, listener: Function, thisObject: any): void;
        removeEventListener(type: string, listener: Function, thisObject: any): void;
        dispatchEvent(event: BaseEvent): boolean;
    }
}
declare module tl3d {
    class FpsMc {
        drawNum: number;
        fpsStr: string;
        static addFps: number;
        static fpsNowNum: number;
        static tipStr: string;
        constructor();
        static update(): void;
        getStr(): string;
    }
    class FpsStage {
        private static _instance;
        static getInstance(): FpsStage;
        constructor();
        canvas2D: any;
        loadCav: any;
        loadCtx: CanvasRenderingContext2D;
        init($cadves: any, $loadCav: any): void;
        showLoadInfo(str: string): void;
        removeShowLoad(): void;
        private fps;
        private canvasUi;
        static showFps: boolean;
        private lastTime;
        upData(): void;
        private makeXyzLine();
        private cPos;
        private drawLine(a, b, $color?);
        resetSize(): void;
    }
}
declare module tl3d {
    /**
   *
   *
   * pramaType 0 表示无类型 1表示 float 2表示 vec2 3表示vec3
   */
    class ConstItem {
        private _id;
        name: string;
        value: Vector3D;
        vecNum: Float32Array;
        paramName0: string;
        param0Type: number;
        param0Index: number;
        paramName1: string;
        param1Type: number;
        param1Index: number;
        paramName2: string;
        param2Type: number;
        param2Index: number;
        paramName3: string;
        param3Type: number;
        param3Index: number;
        isDynamic: Boolean;
        offset: number;
        id: number;
        creat($vc: Float32Array): void;
        setData(obj: any): void;
        setDynamicOffset($dynamic: DynamicBaseConstItem): void;
        setDynamicDirect($ary: Array<number>, $offset: any): void;
        setDynamic($dynamic: DynamicBaseConstItem): void;
    }
}
declare module tl3d {
    class DynamicBaseConstItem {
        target: ConstItem;
        paramName: string;
        currentValue: Array<number>;
        targetOffset: number;
        protected _type: number;
        update(t?: number): void;
        type: number;
        setTargetInfo($target: ConstItem, $paramName: string, $type: number): void;
        setCurrentVal(...args: any[]): void;
    }
}
declare module tl3d {
    class DynamicBaseTexItem {
        target: TexItem;
        paramName: string;
        textureRes: TextureRes;
        destory(): void;
        readonly texture: WebGLTexture;
    }
}
declare module tl3d {
    class DynamicConstItem extends DynamicBaseConstItem {
        curve: curbes.Curve;
        update(t?: number): void;
        type: number;
    }
}
declare module tl3d {
    class DynamicTexItem extends DynamicBaseTexItem {
        url: string;
        private _textureDynamic;
        isParticleColor: boolean;
        curve: curbes.Curve;
        private _life;
        constructor();
        destory(): void;
        initCurve($type: number): void;
        readonly texture: WebGLTexture;
        creatTextureByCurve(): void;
        life: number;
    }
}
declare module tl3d {
    class Material extends ResCount {
        url: string;
        shaderStr: string;
        texList: Array<TexItem>;
        constList: Array<ConstItem>;
        hasTime: boolean;
        timeSpeed: number;
        blendMode: number;
        backCull: boolean;
        killNum: number;
        hasVertexColor: boolean;
        usePbr: boolean;
        useNormal: boolean;
        roughness: number;
        program: WebGLProgram;
        shader: Shader3D;
        writeZbuffer: boolean;
        hasFresnel: boolean;
        useDynamicIBL: boolean;
        normalScale: number;
        lightProbe: boolean;
        useKill: boolean;
        directLight: boolean;
        noLight: boolean;
        scaleLightMap: boolean;
        fogMode: number;
        fcNum: number;
        fcIDAry: Array<number>;
        hasParticleColor: boolean;
        locationDic: Object;
        fcData: Float32Array;
        sceneNumId: number;
        update(t: number): void;
        updateTime(t: number): void;
        updateCam(x: number, y: number, z: number): void;
        updateScene(): void;
        initFcData(): void;
        setCompileData(_compileData: any): void;
        setByteData(byte: ByteArray): void;
        private readConstLis(fs);
        private readTexList(fs);
        destory(): void;
    }
}
declare module tl3d {
    class MaterialBaseParam extends GC {
        material: Material;
        dynamicTexList: Array<any>;
        dynamicConstList: Array<any>;
        destory(): void;
        update(): void;
        setData($material: Material, $ary: Array<any>): void;
    }
}
declare module tl3d {
    class MaterialManager extends ResGC {
        private _loadDic;
        private _resDic;
        private _regDic;
        constructor();
        private static _instance;
        static getInstance(): MaterialManager;
        /**
        public getMaterial($url: string, $fun: Function, $info: Object = null, $autoReg: boolean = false, $regName: string = null, $shader3D: Shader3D = null): void {
    
            if (this._dic[$url]) {
                if ($info) {
                    $fun(this._dic[$url], $info);
                } else {
                    $fun(this._dic[$url]);
                }
                return;
            }
    
            var materialLoad: MaterialLoad = new MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3D);
            if (this._loadDic[$url]) {
                var ary: Array<MaterialLoad> = this._loadDic[$url];
                ary.push(materialLoad);
                return;
            }
    
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(materialLoad);
    
            if (this._resDic[$url]) {
                this.loadMaterialCom(this._resDic[$url], materialLoad);
            } else {
                LoadManager.getInstance().load($url, LoadManager.XML_TYPE, ($data: string, _info: MaterialLoad) => { this.loadMaterialCom($data, _info) }, materialLoad);
            }
        }
         */
        getMaterialByte($url: string, $fun: Function, $info?: Object, $autoReg?: boolean, $regName?: string, $shader3DCls?: any): void;
        private meshByteMaterialByt(byte, _info);
        loadMaterialByteCom($data: ArrayBuffer, _info: MaterialLoad): void;
        addResByte($url: string, $data: ByteArray): void;
        registerUrl($url: string): void;
        releaseUrl($url: string): void;
        /**
        public loadMaterialCom($data: string, _info: MaterialLoad): void {
            var obj = JSON.parse($data);
            
            var material: Material = new Material();
            material.setCompileData(obj);
            material.url = _info.url;
    
            this.loadMaterial(material);
    
            if (_info.autoReg){
                material.program = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
            }
    
            var ary: Array<TextureLoad> = this._loadDic[_info.url];
            for (var i: number = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(material, ary[i].info);
                } else {
                    ary[i].fun(material);
                }
            }
            
            delete this._loadDic[_info.url];
    
            this._dic[_info.url] = material;
    
        }
        */
        private loadMaterial($material);
        loadDynamicTexUtil(material: MaterialParam): void;
        gc(): void;
    }
    class MaterialLoad {
        fun: Function;
        info: any;
        url: string;
        autoReg: boolean;
        regName: string;
        shader3D: any;
        constructor($fun: Function, $info: any, $url: string, $autoReg: boolean, $regName: string, $shader3D: any);
    }
}
declare module tl3d {
    class MaterialParam extends MaterialBaseParam {
        materialUrl: string;
        program: WebGLProgram;
        shader: Shader3D;
        constructor();
        destory(): void;
        setMaterial($materialTree: Material): void;
        setLife($life: number): void;
        setTexList(): void;
        setConstList(): void;
        setTextObj(ary: Array<any>): void;
        setConstObj(ary: Array<any>): void;
    }
}
declare module tl3d {
    class TexItem {
        private _id;
        url: string;
        textureRes: TextureRes;
        isDynamic: boolean;
        paramName: string;
        isParticleColor: boolean;
        isMain: boolean;
        /**
         * 0 为默认
         * 1 lightmap
         * 2 lutmap
         * 3 cubemap
         * 4 heightMap;
         */
        type: number;
        name: string;
        wrap: number;
        filter: number;
        mipmap: number;
        destory(): void;
        id: number;
        readonly texture: WebGLTexture;
        static LIGHTMAP: number;
        static LTUMAP: number;
        static CUBEMAP: number;
        static HEIGHTMAP: number;
        static REFRACTIONMAP: number;
    }
}
declare module tl3d {
    class TextureCube {
    }
}
declare module tl3d {
    class TextureManager extends ResGC {
        private _loadDic;
        private _resDic;
        defaultLightMap: WebGLTexture;
        constructor();
        private static _instance;
        static getInstance(): TextureManager;
        hasTexture($url: string): boolean;
        getTexture($url: string, $fun: Function, $wrapType?: number, $info?: any, $filteType?: number, $mipmapType?: number): void;
        getImageData($url: string, $fun: Function): void;
        addRes($url: string, $img: any): void;
        getCanvasTexture(ctx: CanvasRenderingContext2D): TextureRes;
        getImageDataTexture(imgdata: any): WebGLTexture;
        getTextureRes($img: any): TextureRes;
        updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void;
        loadCubeTexture($url: string, $fun: Function): void;
        loadTextureCom($img: any, _info: TextureLoad): void;
        initDefaultLightMapTexture(): void;
        gc(): void;
    }
    class TextureLoad {
        fun: Function;
        info: any;
        url: string;
        wrap: number;
        filter: number;
        mipmap: number;
        constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number);
    }
    class CubemapLoad {
        private ary;
        private fun;
        private flagNum;
        loadCube($url: string, $fun: Function): void;
        loadCom($img: HTMLImageElement, $info: any): void;
    }
}
declare module tl3d {
    class TextureRes extends ResCount {
        texture: WebGLTexture;
        width: number;
        height: number;
        destory(): void;
    }
}
declare module tl3d {
    /**
     * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
     * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
     * @class egret.Endian
     * @classdesc
     */
    class Endian {
        /**
         * 表示多字节数字的最低有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @constant {string} egret.Endian.LITTLE_ENDIAN
         */
        static LITTLE_ENDIAN: string;
        /**
         * 表示多字节数字的最高有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @constant {string} egret.Endian.BIG_ENDIAN
         */
        static BIG_ENDIAN: string;
    }
    /**
     * @class ByteArray
     * @classdesc
     * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
     * 注意：ByteArray 类适用于需要在字节层访问数据的高级 开发人员。
     */
    class ByteArray {
        private static SIZE_OF_BOOLEAN;
        private static SIZE_OF_INT8;
        private static SIZE_OF_INT16;
        private static SIZE_OF_INT32;
        private static SIZE_OF_UINT8;
        private static SIZE_OF_UINT16;
        private static SIZE_OF_UINT32;
        private static SIZE_OF_FLOAT32;
        private static SIZE_OF_FLOAT64;
        private BUFFER_EXT_SIZE;
        private data;
        private _position;
        private write_position;
        /**
         * 更改或读取数据的字节顺序；egret.Endian.BIG_ENDIAN 或 egret.Endian.LITTLE_ENDIAN。
         * @default egret.Endian.BIG_ENDIAN
         * @member ByteArray#endian
         */
        endian: string;
        /**
         * 创建一个 ByteArray 对象以引用指定的 ArrayBuffer 对象
         * @param buffer {ArrayBuffer} 数据源
         */
        constructor(buffer?: ArrayBuffer);
        private _setArrayBuffer(buffer);
        setdata(srcByte: ByteArray): void;
        /**
         * @private
         */
        buffer: ArrayBuffer;
        /**
         * @private
         */
        dataView: DataView;
        /**
         * @private
         */
        readonly bufferOffset: number;
        getByte(i: number): number;
        setByte(i: number, num: number): void;
        /**
         * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
         * @member {number} ByteArray#position
         */
        position: number;
        reset(): void;
        optcode: number;
        /**
         * ByteArray 对象的长度（以字节为单位）。
         * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
         * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
         * @member {number} ByteArray#length
         */
        length: number;
        /**
         * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
         * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
         * @member {number} ByteArray#bytesAvailable
         */
        readonly bytesAvailable: number;
        /**
         * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
         * @method ByteArray#clear
         */
        clear(): void;
        /**
         * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
         * @return 如果字节不为零，则返回 true，否则返回 false
         * @method ByteArray#readBoolean
         */
        readBoolean(): boolean;
        /**
         * 从字节流中读取带符号的字节
         * @return 介于 -128 和 127 之间的整数
         * @method ByteArray#readByte
         */
        readByte(): number;
        /**
         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
         * @param bytes 要将数据读入的 ByteArray 对象
         * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
         * @method ByteArray#readBytes
         */
        readBytes(bytes: any, offset?: number, length?: number): void;
        /**
         * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
         * @return 双精度（64 位）浮点数
         * @method ByteArray#readDouble
         */
        readDouble(): number;
        /**
         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
         * @return 单精度（32 位）浮点数
         * @method ByteArray#readFloat
         */
        readFloat(): number;
        /**
         * 从字节流中读取一个带符号的 32 位整数
         * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
         * @method ByteArray#readFloat
         */
        readInt(): number;
        getInt(): number;
        readInt32(): number;
        /**
         * 使用指定的字符集从字节流中读取指定长度的多字节字符串
         * @param length 要从字节流中读取的字节数
         * @param charSet 表示用于解释字节的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
         * @return UTF-8 编码的字符串
         * @method ByteArray#readMultiByte
         */
        /**
         * 从字节流中读取一个带符号的 16 位整数
         * @return 介于 -32768 和 32767 之间的 16 位带符号整数
         * @method ByteArray#readShort
         */
        readShort(): number;
        readFloatTwoByte($scaleNum: number): number;
        readFloatOneByte(): number;
        /**
         * 从字节流中读取无符号的字节
         * @return 介于 0 和 255 之间的 32 位无符号整数
         * @method ByteArray#readUnsignedByte
         */
        readUnsignedByte(): number;
        readUint8(): number;
        readInt8(): number;
        /**
         * 从字节流中读取一个无符号的 32 位整数
         * @return 介于 0 和 4294967295 之间的 32 位无符号整数
         * @method ByteArray#readUnsignedInt
         */
        readUnsignedInt(): number;
        readUint32(): number;
        readUint64(): number;
        /**
         * 从字节流中读取一个无符号的 16 位整数
         * @return 介于 0 和 65535 之间的 16 位无符号整数
         * @method ByteArray#readUnsignedShort
         */
        readUnsignedShort(): number;
        readUint16(): number;
        /**
         * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
         * @return UTF-8 编码的字符串
         * @method ByteArray#readUTF
         */
        readUTF(): string;
        readString(): string;
        /**
         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
         * @param length 指明 UTF-8 字节长度的无符号短整型数
         * @return 由指定长度的 UTF-8 字节组成的字符串
         * @method ByteArray#readUTFBytes
         */
        readUTFBytes(length: number): string;
        readStringByLen(len: number): string;
        /**
         * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
         * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
         * @method ByteArray#writeBoolean
         */
        writeBoolean(value: boolean): void;
        /**
         * 在字节流中写入一个字节
         * 使用参数的低 8 位。忽略高 24 位
         * @param value 一个 32 位整数。低 8 位将被写入字节流
         * @method ByteArray#writeByte
         */
        writeByte(value: number): void;
        writeUint8(value: number): void;
        writeInt8(value: number): void;
        /**
         * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
         * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
         * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
         * @param bytes ByteArray 对象
         * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
         * @param length 一个无符号整数，表示在缓冲区中的写入范围
         * @method ByteArray#writeBytes
         */
        writeBytes(bytes: ByteArray, offset?: number, length?: number): void;
        /**
         * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
         * @param value 双精度（64 位）浮点数
         * @method ByteArray#writeDouble
         */
        writeDouble(value: number): void;
        /**
         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
         * @param value 单精度（32 位）浮点数
         * @method ByteArray#writeFloat
         */
        writeFloat(value: number): void;
        /**
         * 在字节流中写入一个带符号的 32 位整数
         * @param value 要写入字节流的整数
         * @method ByteArray#writeInt
         */
        writeInt(value: number): void;
        writeInt32(value: number): void;
        /**
         * 使用指定的字符集将多字节字符串写入字节流
         * @param value 要写入的字符串值
         * @param charSet 表示要使用的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
         * @method ByteArray#writeMultiByte
         */
        /**
         * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
         * @param value 32 位整数，该整数的低 16 位将被写入字节流
         * @method ByteArray#writeShort
         */
        writeUnsignedShort(value: number): void;
        writeUint16(value: number): void;
        writeUint64(value: number): void;
        writeShort(value: number): void;
        /**
         * 在字节流中写入一个无符号的 32 位整数
         * @param value 要写入字节流的无符号整数
         * @method ByteArray#writeUnsignedInt
         */
        writeUnsignedInt(value: number): void;
        writeUint32(value: number): void;
        /**
         * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
         * @param value 要写入的字符串值
         * @method ByteArray#writeUTF
         */
        writeUTF(value: string): void;
        writeString(value: string): void;
        writeStringByLen(value: string, len: number): void;
        readVector3D($w?: boolean): Vector3D;
        /**
         * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
         * @param value 要写入的字符串值
         * @method ByteArray#writeUTFBytes
         */
        writeUTFBytes(value: string): void;
        toString(): string;
        /**
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        _writeUint8Array(bytes: Uint8Array, validateBuffer?: boolean): void;
        /**
         * @private
         */
        validate(len: number): boolean;
        /**********************/
        /**********************/
        private validateBuffer(len, needReplace?);
        /**
         * UTF-8 Encoding/Decoding
         */
        private encodeUTF8(str);
        private decodeUTF8(data);
        private encoderError(code_point);
        private decoderError(fatal, opt_code_point?);
        private EOF_byte;
        private EOF_code_point;
        private inRange(a, min, max);
        private div(n, d);
        private stringToCodePoints(string);
    }
    class TL3dByteArray extends ByteArray {
        length: number;
    }
}
declare module tl3d {
    class ObjectMath {
        a: number;
        b: number;
        c: number;
        d: number;
    }
    class Calculation {
        constructor();
        static _PanelEquationFromThreePt(p1: Vector3D, p2: Vector3D, p3: Vector3D): ObjectMath;
        static calPlaneLineIntersectPoint(planeVector: Vector3D, planePoint: Vector3D, linePointA: Vector3D, linePointB: Vector3D): Vector3D;
    }
}
declare module tl3d {
    class Circle {
        _x: number;
        _y: number;
        radius: number;
        constructor($x?: number, $y?: number, $radius?: number);
        setData($x: number, $y: number, $radius: number): void;
        setPos($x: number, $y: number): void;
        x: number;
        y: number;
        setRadius($radius: number): void;
        testPoint($point: Vector2D): boolean;
    }
}
declare module tl3d {
    class Groundposition {
        constructor();
        private static _plantObjectMath;
        private static _plantnormal;
        private static _plane_a;
        static getGroundPos($x: number, $y: number): Vector3D;
    }
}
declare module tl3d {
    class MathClass {
        constructor();
        static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array;
        static updateVp(): void;
        static MathCam(_Cam: Camera3D): void;
        static viewBoxVecItem: Array<Vector3D>;
        static lastViewScale: Vector2D;
        static GetViewHitBoxData($far: number): void;
        static GetViewHitBoxDataCopy($dis: number): void;
        private static gettempPos(a, m);
        static mathmidpoint(a: any, b: any, t: number): void;
        static drawbezier(_array: Array<any>, _time: number): Object;
        static math_distance(x1: number, y1: number, x2: number, y2: number): number;
        static math_angle(x1: number, y1: number, x2: number, y2: number): number;
        static easeIn(t: number, b: number, c: number, d: number): number;
        static easeOut(t: number, b: number, c: number, d: number): number;
        static easeInOut(t: number, b: number, c: number, d: number): number;
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $stage3DVO 为stage3d的坐标信息
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        static mathDisplay2Dto3DWorldPos($stage3DVO: Rectangle, $point: Vector2D, $depht?: number): Vector3D;
    }
}
declare module tl3d {
    class MathUtil {
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        static mathDisplay2Dto3DWorldPos($point: Vector2D, $depht?: number): Vector3D;
        static getGroundPanelPos($evt: any): Vector3D;
        private static gettempPos(a, m);
        static math3DWorldtoDisplay2DPos($pos: Vector3D): Vector2D;
        static argbToHex(a: number, r: number, g: number, b: number): number;
        static hexToArgb(expColor: number): Vector3D;
        /**
     *
     * @param linePoint_a  线起点
     * @param linePoint_b  线结点
     * @param planePoint  构成面的三个点
     * @return 交点坐标
     *
     */
        static getLinePlaneInterectPointByTri(linePoint_a: Vector3D, linePoint_b: Vector3D, planePoint: Array<Vector3D>): Vector3D;
        /**
         * 空间一条射线和平面的交点
         * @param linePoint_a  过直线的一点
         * @param linePoint_b  过直线另一点
         * @param planePoint   过平面一点
         * @param planeNormal  平面的法线
         * @return
         *
         */
        private static getLineAndPlaneIntersectPoint(linePoint_a, linePoint_b, planePoint, planeNormal);
        static lookAt(eyePos: Vector3D, lookAt: Vector3D): Matrix3D;
    }
}
declare module tl3d {
    class Matrix3D {
        m: Float32Array;
        isIdentity: boolean;
        constructor();
        static tempM: Matrix3D;
        clone($target?: Matrix3D): Matrix3D;
        readonly position: Vector3D;
        copyTo($target: Matrix3D): void;
        identity(): void;
        invert(): void;
        invertToMatrix($target: Matrix3D): void;
        appendTranslation(x: number, y: number, z: number): void;
        prependTranslation(x: number, y: number, z: number): void;
        transformVector($p: Vector3D): Vector3D;
        append($matrx3d: Matrix3D): void;
        prepend($matrx3d: Matrix3D): void;
        appendRotation(rad: number, axis: Vector3D): void;
        tomat3(): Float32Array;
        getRotaion(b: Float32Array): void;
        identityPostion(): void;
        readonly x: number;
        readonly y: number;
        readonly z: number;
        prependRotation(rad: number, axis: Vector3D): Float32Array;
        prependScale(x: number, y: number, z: number): Float32Array;
        appendScale(x: number, y: number, z: number): void;
        perspectiveFieldOfViewLH(fieldOfViewY: number, aspectRatio: number, zNear: number, zFar: number): void;
        fromVtoV($basePos: Vector3D, $newPos: Vector3D): void;
        buildLookAtLH(eyePos: Vector3D, lookAt: Vector3D, up: Vector3D): void;
        static mul(a: any, b: any, c: any): any;
        toEulerAngles(target?: Vector3D): Vector3D;
    }
}
declare module tl3d {
    class Quaternion {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor($x?: number, $y?: number, $z?: number, $w?: number);
        print(): void;
        toEulerAngles(target?: Vector3D): Vector3D;
        toMatrix3D($matrix3d?: Matrix3D): Matrix3D;
        fromAxisAngle(axis: Vector3D, angle: number): void;
        normalize(val?: number): void;
        fromMatrix($matrix: Matrix3D): void;
        setMd5W(): void;
        slerp(qa: Quaternion, qb: Quaternion, t: number): void;
    }
}
declare module tl3d {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor($x?: number, $y?: number, $width?: number, $height?: number);
        sets($x: number, $y: any, $width: number, $height: any): void;
        setRec($rec: Rectangle): void;
        isHitByPoint(tx: number, ty: number): boolean;
    }
}
declare module tl3d {
    class TestTriangle {
        static baseTri: TestTriangle;
        p1: Vector2D;
        p2: Vector2D;
        p3: Vector2D;
        precision: number;
        constructor($p1?: Vector2D, $p2?: Vector2D, $p3?: Vector2D, $precision?: number);
        setAllPoint($p1: Vector2D, $p2: Vector2D, $p3: Vector2D): void;
        checkPointIn(tp: Vector2D): Boolean;
        getArea(): number;
        static getAreaByPoints(p1: Vector2D, p2: Vector2D, p3: Vector2D): number;
    }
}
declare module tl3d {
    class Vector2D {
        x: number;
        y: number;
        constructor($x?: number, $y?: number);
        normalize(): void;
        readonly length: number;
        scaleBy(value: number): void;
        sub(val: Vector2D): Vector2D;
        add(val: Vector2D): Vector2D;
        toString(): String;
        static distance(p1: Vector2D, p2: Vector2D): number;
    }
}
declare module tl3d {
    class Vector3D {
        x: number;
        y: number;
        z: number;
        w: number;
        static X_AXIS: Vector3D;
        static Y_AXIS: Vector3D;
        static Z_AXIS: Vector3D;
        constructor($x?: number, $y?: number, $z?: number, $w?: number);
        normalize(): void;
        readonly length: number;
        scaleBy(value: number): void;
        divideScalar(value: number): void;
        distanceToSquared(v: Vector3D): number;
        scaleByW(): void;
        add(value: Vector3D): Vector3D;
        subtract(value: Vector3D): Vector3D;
        addByNum($x: number, $y: number, $z: number, $w?: number): void;
        setTo($x: number, $y: number, $z: number): void;
        setByte(byte: ByteArray): void;
        cross(value: Vector3D): Vector3D;
        dot(value: Vector3D): number;
        clone(): Vector3D;
        static distance(v1: Vector3D, v2: Vector3D): number;
        toString(): String;
    }
}
declare module tl3d {
    class Display3DBallPartilce extends Display3DParticle {
        constructor();
        readonly balldata: ParticleBallData;
        creatData(): void;
        setVa(): void;
        setVaCompress(): void;
        resetVa(): void;
        setVc(): void;
        updateWatchCaramMatrix(): void;
        updateAllRotationMatrix(): void;
        readonly particleBallData: ParticleBallGpuData;
    }
}
declare module tl3d {
    class Display3DBallShader extends Shader3D {
        static Display3D_Ball_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
            modelMatrix: number;
            watheye: number;
            rotationMatrix: number;
        };
        static shader_vec4: {
            time: number[];
            scale: number[];
            scaleCtrl: number[];
            force: number[];
            worldPos: number[];
            camPos: number[];
            animCtrl: number[];
            uvCtrl: number[];
        };
        getMat4Str(key: string): string;
        getVec4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class ParticleBallData extends ParticleData {
        _totalNum: number;
        _acceleration: number;
        _toscale: number;
        _shootAngly: Vector3D;
        _shootSpeed: number;
        _isRandom: boolean;
        _isSendRandom: boolean;
        _isSendAngleRandom: boolean;
        _paticleMaxScale: number;
        _paticleMinScale: number;
        _addforce: Vector3D;
        _lixinForce: Vector3D;
        _waveform: Vector3D;
        _round: Vector3D;
        _is3Dlizi: boolean;
        _speed: number;
        _isLoop: boolean;
        _closeSurface: boolean;
        _halfCircle: boolean;
        _isEven: boolean;
        _basePositon: Vector3D;
        _baseRandomAngle: number;
        _shapeType: number;
        _lockX: boolean;
        _lockY: boolean;
        _textureRandomColorInfo: any;
        _islixinAngly: boolean;
        _particleRandomScale: Vector3D;
        _playSpeed: number;
        _beginScale: number;
        facez: Boolean;
        _needSelfRotation: boolean;
        _needRandomColor: boolean;
        _needScale: boolean;
        _needAddSpeed: boolean;
        _uvType: number;
        _timeVec: Array<number>;
        _addSpeedVec: Array<number>;
        _wordPosVec: Array<number>;
        _caramPosVec: Array<number>;
        _scaleVec: Array<number>;
        _scaleCtrlVec: Array<number>;
        _animCtrlVec: Array<number>;
        _uvCtrlVec: Array<number>;
        _allRotationMatrix: Matrix3D;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TL3dByteArray): void;
        private readRandomColor($byte);
        readonly objBallData: ParticleBallGpuData;
        uploadGpu(): void;
        private initBaseData();
        makeRectangleData(verterList: Array<number>, uvAry: Array<number>, width: number, height: number, offsetX?: number, offsetY?: number, isUV?: boolean, isU?: boolean, isV?: boolean, animLine?: number, animRow?: number, indexID?: number): void;
        initBasePos(): void;
        initSpeed(): void;
        initSelfRotaion(): void;
        initBaseColor(): void;
        protected pushToGpu(): void;
        private compressVertex();
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        initVcData(): void;
        regShader(): void;
        getShaderParam(): Array<number>;
    }
}
declare module tl3d {
    class ParticleBallGpuData extends ParticleGpuData {
        basePos: Array<number>;
        basePosBuffer: WebGLBuffer;
        beMove: Array<number>;
        beMoveBuffer: WebGLBuffer;
        randomColor: Array<number>;
        randomColorBuffer: WebGLBuffer;
        randomOffset: number;
        baseRotation: Array<number>;
        baseRotationBuffer: WebGLBuffer;
        destory(): void;
    }
}
declare module tl3d {
    class Display3DBoneShader extends Shader3D {
        static Display3DBoneShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
            posMatrix3D: number;
        };
        getMat4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Display3DBonePartilce extends Display3DParticle {
        constructor();
        readonly modeldata: ParticleBoneData;
        creatData(): void;
        update(): void;
        private skipNum;
        setVc(): void;
        setVa(): void;
        resetVa(): void;
    }
}
declare module tl3d {
    class ParticleBoneData extends ParticleData {
        _maxAnimTime: number;
        getParticle(): Display3DParticle;
        destory(): void;
        meshData: MeshData;
        animData: AnimData;
        objScale: number;
        setAllByteInfo($byte: TL3dByteArray): void;
        initVcData(): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        private readFrameQua($byte);
        uploadGpu(): void;
        private uploadMesh($mesh);
        regShader(): void;
    }
}
declare module tl3d {
    class CombineParticle extends EventDispatcher {
        sourceData: CombineParticleData;
        url: string;
        private _displayAry;
        private _time;
        private _maxTime;
        type: number;
        bindMatrix: Matrix3D;
        bindVecter3d: Vector3D;
        bindScale: Vector3D;
        invertBindMatrix: Matrix3D;
        private _bindTarget;
        private _bindSocket;
        private _rotationX;
        private _rotationY;
        private _rotationZ;
        private _isInGroup;
        private _groupPos;
        private _groupRotation;
        private _groupScale;
        groupMatrix: Matrix3D;
        groupRotationMatrix: Matrix3D;
        hasMulItem: boolean;
        sceneVisible: boolean;
        dynamic: boolean;
        hasDestory: boolean;
        constructor();
        displayAry: Array<Display3DParticle>;
        maxTime: number;
        bindTarget: IBind;
        bindSocket: string;
        x: number;
        y: number;
        z: number;
        setPos($xpos: number, $ypos: number, $zpos: number): void;
        setMulPos(ary: Array<Array<Array<number>>>): void;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        timeScale: number;
        applyRotation(): void;
        setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void;
        setDataByte(byte: ByteArray): void;
        addPrticleItem($dis: Display3DParticle): void;
        private getDisplay3DById(particleType);
        setData(ary: Array<any>): void;
        updateTime(t: number): void;
        updateBind(): void;
        reset(): void;
        update(): void;
        updateItem(idx: number): void;
        readonly size: number;
        private getDisplay3D(obj);
        removeSelf(): void;
        destory(): void;
        onComplete: any;
    }
}
declare module tl3d {
    class CombineParticleData extends ResCount {
        maxTime: number;
        dataAry: Array<ParticleData>;
        destory(): void;
        getCombineParticle(): CombineParticle;
        setDataByte(byte: ByteArray): void;
        private getParticleDataType($type);
    }
}
declare module tl3d {
    class AxisMove extends BaseAnim {
        axis: Vector3D;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}
declare module tl3d {
    class AxisRotaion extends BaseAnim {
        axis: Vector3D;
        axisPos: Vector3D;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}
declare module tl3d {
    class BaseAnim {
        baseNum: number;
        num: number;
        time: number;
        speed: number;
        aSpeed: number;
        beginTime: number;
        lastTime: number;
        baseTime: number;
        protected _isActiva: boolean;
        protected _isDeath: boolean;
        BaseAnim(): void;
        update(t: number): void;
        coreCalculate(): void;
        reset(): void;
        depthReset(): void;
        data: Array<any>;
        isDeath: boolean;
        getAllNum(allTime: number): void;
    }
}
declare module tl3d {
    class KeyFrame {
        frameNum: number;
        animData: Array<any>;
        baseValue: Array<any>;
        constructor();
    }
}
declare module tl3d {
    class ScaleAnim extends BaseAnim {
        scaleAry: Array<any>;
        beginScale: number;
        scaleNum: number;
        private _currentTarget;
        private flag;
        private numAry;
        constructor();
        update(t: number): void;
        coreCalculate(): void;
        reset(): void;
        depthReset(): void;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}
declare module tl3d {
    class ScaleChange extends BaseAnim {
        maxNum: number;
        minNum: number;
        constructor();
        coreCalculate(): void;
        /**
         *
         * @param value
         *
         */
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
        reset(): void;
        depthReset(): void;
    }
}
declare module tl3d {
    class ScaleNoise extends BaseAnim {
        amplitude: number;
        coreCalculate(): void;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}
declare module tl3d {
    class SelfRotation extends BaseAnim {
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}
declare module tl3d {
    class TimeLine extends EventDispatcher {
        private _keyFrameAry;
        maxFrameNum: number;
        private _currentKeyFrame;
        private _currentFrameNum;
        private _time;
        private targetFlag;
        visible: boolean;
        beginTime: number;
        private _selfRotaion;
        private _axisRotaion;
        private _axisMove;
        private _scaleChange;
        private _scaleAnim;
        private _scaleNosie;
        constructor();
        updateMatrix(posMatrix: Matrix3D, $particle: Display3DParticle): void;
        inverAxisRotation($targetMatrix: Matrix3D): void;
        applySelfRotation($targetMatrix: Matrix3D, $axis: Vector3D): void;
        addKeyFrame(num: number): KeyFrame;
        updateTime(t: number): void;
        private getTarget();
        enterKeyFrame(ary: Array<any>, baseTime?: number, baseValueAry?: Array<number>): void;
        reset(): void;
        private isByteData;
        setAllByteInfo($byte: TL3dByteArray, $allObj: any): void;
        setAllDataInfo($data: TimeLineData): void;
        private setBaseTimeByte(ary, baseTime?, baseValueAry?);
        private getByteDataTemp($byte);
        /**
         * 获取最大的帧数
         * @return 最大帧数
         *
         */
        getMaxFrame(): number;
        dispose(): void;
    }
}
declare module tl3d {
    class TimeLineData {
        dataAry: Array<any>;
        maxFrameNum: number;
        beginTime: number;
        destory(): void;
        setByteData($byte: ByteArray): void;
        addKeyFrame(num: number): KeyFrame;
        private getByteDataTemp($byte);
    }
}
declare module tl3d {
    class Display3DParticle extends Object3D {
        visible: boolean;
        timeline: TimeLine;
        protected _time: number;
        private _beginTime;
        data: ParticleData;
        bindMatrix: Matrix3D;
        bindVecter3d: Vector3D;
        bindScale: Vector3D;
        invertBindMatrix: Matrix3D;
        groupMatrix: Matrix3D;
        protected _rotationMatrix: Matrix3D;
        modelMatrix: Matrix3D;
        isInGroup: boolean;
        groupPos: Vector3D;
        groupScale: Vector3D;
        groupRotation: Vector3D;
        constructor();
        onCreated(): void;
        setBind($pos: Vector3D, $rotation: Matrix3D, $scale: Vector3D, $invertRotation: Matrix3D, $groupMatrix: Matrix3D): void;
        getMulBindList(): Array<Vector3D>;
        updateMatrix(): void;
        private readonly cantUseEffectsLev;
        updateTime(t: number): void;
        reset(): void;
        clearAllAnim(): void;
        update(): void;
        setVc(): void;
        pushVc(): void;
        setVa(): void;
        resetVa(): void;
        setMaterialVc(): void;
        setMaterialTexture(): void;
        inverBind(): void;
        resetPos(): void;
        resetMulPos(ary: Array<Array<Array<number>>>): void;
        getVector3DByObject(obj: any): Vector3D;
        clone(): Display3DParticle;
        setAllByteInfo($byte: TL3dByteArray, version?: number): void;
        creatData(): void;
        setTimeLine($tl: TimeLine): void;
        destory(): void;
    }
}
declare module tl3d {
    class Display3DFacetParticle extends Display3DParticle {
        private _lifeVisible;
        private _resultUvVec;
        constructor();
        readonly facetdata: ParticleFacetData;
        creatData(): void;
        update(): void;
        reset(): void;
        setVc(): void;
        setVa(): void;
        updateRotaionMatrix(): void;
        updateUV(): void;
    }
}
declare module tl3d {
    class Display3DFacetShader extends Shader3D {
        static Display3D_Facet_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
            rotationMatrix3D: number;
            posMatrix3D: number;
        };
        static shader_vec4: {
            uvMove: number[];
        };
        getMat4Str(key: string): string;
        getVec4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class ParticleFacetData extends ParticleData {
        _maxAnimTime: number;
        _lockx: boolean;
        _locky: boolean;
        _isCycle: boolean;
        setAllByteInfo($byte: TL3dByteArray): void;
        getParticle(): Display3DParticle;
        uploadGpu(): void;
        private makeRectangleData(width, height, offsetX?, offsetY?, isUV?, isU?, isV?, animLine?, animRow?);
        initVcData(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        regShader(): void;
    }
}
declare module tl3d {
    class Display3DFollowPartilce extends Display3DBallPartilce {
        private _bindMatrixAry;
        private _bindFlagAry;
        private flag;
        constructor();
        readonly followdata: ParticleFollowData;
        creatData(): void;
        onCreated(): void;
        setVc(): void;
        private initBingMatrixAry();
        updateBind(): void;
        updateMatrix(): void;
        updateAllRotationMatrix(): void;
        reset(): void;
        updateWatchCaramMatrix(): void;
    }
}
declare module tl3d {
    class Display3DFollowShader extends Shader3D {
        static Display3D_Follow_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
            modelMatrix: number;
            watheye: number;
            rotationMatrix: number;
        };
        static shader_vec4: {
            time: number[];
            scale: number[];
            scaleCtrl: number[];
            force: number[];
            worldPos: number[];
            camPos: number[];
            animCtrl: number[];
            uvCtrl: number[];
        };
        getMat4Str(key: string): string;
        getVec4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class ParticleFollowData extends ParticleBallData {
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TL3dByteArray): void;
        regShader(): void;
    }
}
declare module tl3d {
    class Display3DFollowLocusPartilce extends Display3DParticle {
        protected _bindPosAry: Array<Array<number>>;
        protected _gpuVc: Float32Array;
        protected _caramPosVec: Array<number>;
        constructor();
        readonly followlocusdata: ParticleFollowLocusData;
        creatData(): void;
        onCreated(): void;
        protected initBindMatrixAry(): void;
        setVa(): void;
        setVc(): void;
        setBindPosVc(): void;
        updateMatrix(): void;
        resetPos(): void;
        protected flag: number;
        updateBind(): void;
    }
}
declare module tl3d {
    class Display3DFollowLocusShader extends Shader3D {
        static Display3D_FollowLocus_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
        };
        static shader_vec4: {
            camPos: number[];
        };
        getMat4Str(key: string): string;
        getVec4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class ParticleFollowLocusData extends ParticleData {
        _fenduanshu: number;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TL3dByteArray): void;
        uploadGpu(): void;
        protected pushToGpu(): void;
        initVcData(): void;
        regShader(): void;
    }
}
declare module tl3d {
    class Display3DLocusPartilce extends Display3DParticle {
        constructor();
        readonly locusdata: ParticleLocusData;
        creatData(): void;
        setVa(): void;
        setVc(): void;
        updateUV(): void;
    }
}
declare module tl3d {
    class Display3DLocusShader extends Shader3D {
        static Display3D_Locus_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
            posMatrix3D: number;
        };
        static shader_vec4: {
            uvMove: number[];
            camPos: number[];
            isUv: number[];
        };
        getMat4Str(key: string): string;
        getVec4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class ParticleLocusData extends ParticleData {
        _speed: number;
        _isLoop: boolean;
        _density: number;
        _isEnd: boolean;
        _resultUvVec: Array<number>;
        _caramPosVec: Array<number>;
        _changUv: boolean;
        _uvVec: Array<number>;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TL3dByteArray): void;
        initUV(): void;
        uploadGpu(): void;
        regShader(): void;
        initVcData(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
    }
}
declare module tl3d {
    class Display3DLocusBallPartilce extends Display3DBallPartilce {
        constructor();
        creatData(): void;
    }
}
declare module tl3d {
    class ParticleLocusballData extends ParticleBallData {
        protected _posAry: Array<number>;
        protected _angleAry: Array<number>;
        protected _tangentAry: Array<number>;
        protected _tangentSpeed: number;
        getParticle(): Display3DParticle;
        initBasePos(): void;
        initSpeed(): void;
        setAllByteInfo($byte: TL3dByteArray): void;
    }
}
declare module tl3d {
    class Display3dModelAnimParticle extends Display3DModelPartilce {
        constructor();
        updateUV(): void;
    }
}
declare module tl3d {
    class Display3DModelObjParticle extends Display3DModelPartilce {
        protected _depthMode: boolean;
        constructor();
        update(): void;
    }
}
declare module tl3d {
    class Display3DModelPartilce extends Display3DParticle {
        protected _resultUvVec: Array<number>;
        constructor();
        readonly modeldata: ParticleModelData;
        creatData(): void;
        setVc(): void;
        setVa(): void;
        updateWatchCaramMatrix(): void;
        updateUV(): void;
    }
}
declare module tl3d {
    class ParticleModelData extends ParticleData {
        _maxAnimTime: number;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TL3dByteArray): void;
        initVcData(): void;
        uploadGpu(): void;
        regShader(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
    }
}
declare module tl3d {
    class ParticleData {
        version: number;
        _beginTime: number;
        _delayedTime: number;
        _width: number;
        _height: number;
        _widthFixed: boolean;
        _heightFixed: boolean;
        _tileMode: boolean;
        _originWidthScale: number;
        _originHeightScale: number;
        _eyeDistance: number;
        _alphaMode: number;
        _uSpeed: number;
        _vSpeed: number;
        _animLine: number;
        _animRow: number;
        _animInterval: number;
        _renderPriority: number;
        _distortion: boolean;
        _isUV: boolean;
        _isU: boolean;
        _isV: boolean;
        _life: number;
        _watchEye: boolean;
        _ziZhuanAngly: Vector3D;
        _isZiZhuan: boolean;
        _center: Vector3D;
        overAllScale: number;
        _materialUrl: string;
        materialParam: MaterialParam;
        materialParamData: any;
        objData: ObjData;
        timelineData: TimeLineData;
        rotationV3d: Vector3D;
        center: Vector3D;
        vcmatData: Float32Array;
        destory(): void;
        uploadGpu(): void;
        regShader(): void;
        initVcData(): void;
        creatPartilce(): Display3DParticle;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TL3dByteArray): void;
        private materialByteUrl;
        private onMaterialLoad($matrial);
        private readMaterialPara($byte);
        private readTempCurve($byte, curve);
        private readItems($byte);
        private makeCurveData($curve);
        private getBzData($ax, $bx, ar, br, $speedNum);
        private drawbezier(_array, _time);
        private mathmidpoint(a, b, t);
        private readMaterialParaConAry($byte);
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
    }
}
declare module tl3d {
    class ParticleGpuData extends ObjData {
    }
}
declare module tl3d {
    class ParticleManager {
        static getInstance(): ParticleManager;
        _dic: any;
        private static _particleGCDic;
        private static readonly particleGCDic;
        static getParticleByte($url: string): CombineParticle;
        static registerUrl(url: string): void;
        static releaseUrl(url: string): void;
        static addResByte(url: string, $data: ByteArray): void;
        private _particleList;
        private renderDic;
        private _time;
        constructor();
        update(): void;
        clearPaticleVa(): void;
        setHide(): void;
        readonly particleList: Array<CombineParticle>;
        updateTime(): void;
        private addRenderDic($particle);
        private removeRenderDic($particle);
        private updateRenderDic();
        addParticle($particle: CombineParticle): void;
        removeParticle($particle: CombineParticle): void;
        getParticleByte(url);
        clearAllParticle();
    }
}
declare module tl3d {
    class BuildShader extends Shader3D {
        static buildShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class Display3DShadowShader extends Shader3D {
        static Display3DShadowShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class MaterialAnimShader extends Shader3D {
        static MATERIAL_ANIM_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static getMd5M44Str(): string;
        static getMd5M44NrmStr(): string;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class MaterialBatchAnimShader extends Shader3D {
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class MaterialShader extends Shader3D {
        static MATERIAL_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        outstr(str: string): void;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class Movie2DShader extends Shader3D {
        static MOVIE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class ProgrmaManager extends ResGC {
        private static _instance;
        constructor();
        static getInstance(): ProgrmaManager;
        getProgram($str: string): Shader3D;
        registe($str: any, $shader3D: Shader3D): void;
        getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
        outShader($str: string): void;
        gc(): void;
    }
}
declare module tl3d {
    interface IShader {
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
        encode($context: WebGLRenderingContext): void;
        binLocation($context: WebGLRenderingContext): void;
    }
    class Shader3D extends ResCount implements IShader {
        vertex: string;
        fragment: string;
        name: string;
        program: WebGLProgram;
        vShader: WebGLShader;
        fShader: WebGLShader;
        paramAry: Array<any>;
        localDic: Object;
        constructor();
        encode(): boolean;
        getWebGLUniformLocation($name: string): WebGLUniformLocation;
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
        destory(): void;
    }
}
declare module tl3d {
    class SkyShader extends Shader3D {
        static Sky_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class Sprite2DShader extends Shader3D {
        static SPRITE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class TerrainDisplay3DShader extends Shader3D {
        static TerrainDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class UIImageShader extends Shader3D {
        static UI_IMG_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class UIMaskShader extends Shader3D {
        static UI_MASK_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class UIShader extends Shader3D {
        static UI_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class LineDisplayShader extends Shader3D {
        static LineShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class LineDisplaySprite extends Display3D {
        constructor();
        lineVecPos: Array<number>;
        lineColor: Array<number>;
        lineIndex: Array<number>;
        baseColor: Vector3D;
        makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
        clear(): void;
        upToGpu(): void;
        update(): void;
    }
    class MulLineSprite extends LineDisplaySprite {
        constructor();
        private itemSprite;
        makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
        private getSprite();
        update(): void;
        upToGpu(): void;
        clear(): void;
    }
    class GridLineSprite extends LineDisplaySprite {
        constructor();
        private makeGridData();
    }
}
declare module tl3d {
    class SceneManager {
        static update(): void;
        static created(): SceneManager;
        static dispose(scene: SceneManager): void;
        readonly displayList: Array<Display3D>;
        private _displayList;
        private _display2DList;
        private _displaySpriteList;
        private _displayRoleList;
        private _sceneParticleList;
        private _time;
        private _ready;
        public startTime;
        render: boolean;
        private _sceneDic;
        private _sceneQuadTree;
        viewFrustum: ViewFrustum;
        private _currentUrl;
        skillMgr: SkillManager;
        constructor();
        readonly displayRoleList: Array<Display3dMovie>;
        readonly displaySpriteList: Array<Display3DSprite>;
        clearScene(): void;
        clearStaticScene(): void;
        testUrl($url: string): boolean;
        loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void;
        private addSceneImgBg(info);
        getDisplayByID($type: number, $id: number): any;
        fixAstart(pos: Vector2D): void;
        loadSceneConfigCom(obj: any): void;
        private getGroundSprite(itemObj, terrain);
        private makeCollisioin(arr);
        ready: boolean;
        private getBuildSprite(itemObj);
        private getParticleSprite(itemObj);
        private initScene();
        addDisplay($display: Display3D): void;
        removeDisplay($display: Display3D): void;
        /**
         * 动态添加的staticMesh 物件例如武器等
        */
        addSpriteDisplay($display: Display3DSprite): void;
        removeSpriteDisplay($display: Display3DSprite): void;
        /**
         * 动态添加的骨骼动画角色
         */
        addMovieDisplay($display: Display3dMovie): void;
        addMovieDisplayTop($display: Display3dMovie): void;
        removeMovieDisplay($display: Display3dMovie): void;
        remove($display: Display3D): void;
        private setParticleVisible();
        static mapQudaTreeDistance: number;
        test: boolean;
        update(): void;
        updateFBO(): void;
        addDisplay2DList($dis: Display3D): void;
        private mathCamFar();
        protected updateStaticDiplay(): void;
        protected updateStaticBind(): void;
        protected updateSpriteDisplay(): void;
        protected updateMovieDisplay(): void;
        protected updateMovieFrame(): void;
        protected dispose(): void;
        upFrame();
        readonly groupDataMgr: GroupDataManager;
        readonly shadowMgr: ShadowManager;
        readonly bloodMgr: BloodManager;
        changeBloodManager(any);
        removeParticle(partilce: CombineParticle);
        addParticle(partilce: CombineParticle);
        clearAllParticle();
        removeAllMovieDisplay();
        charPlaySkill($char: Display3dMovie, $skillfile: string, $skilleff?: string, $cb?: Function): Skill;
        playLyf($url: string, $pos: tl3d.Vector3D, $r?: number, $scale?: number): void;
        removeCharSkill($skill: Skill): void;
        cameraMatrix: any;
        viewMatrx3D: any;
    }
}
declare module tl3d {
    class SceneRes extends BaseRes {
        static sceneConfigData: any;
        private _completeFun;
        private _readDataFun;
        protected _progressFun: Function;
        sceneData: any;
        static getMapUrlFun: Function;
        static getZipMapUrlFun: Function;
        load($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): void;
        loadZipMap(name: string, size: number): void;
        isNeedReload(): boolean;
        loadComplete($byte: ArrayBuffer): void;
        applyByteArray(): void;
        readNext(): void;
        readScene(): void;
        private _terrainDataItem;
        private readTerrainIdInfoBitmapData($byte);
        private _astarDataMesh;
        private readAstat();
        private readAstarFromByte($byte);
    }
    class AstarDataMesh {
        aPos: Vector3D;
        midu: number;
        width: number;
        height: number;
        astarItem: Array<Array<number>>;
        jumpItem: Array<Array<number>>;
        heightItem: Array<Array<number>>;
    }
}
declare module tree {
    class QuadTreeNode {
        x: number;
        y: number;
        z: number;
        width: number;
        height: number;
        depth: number;
        data: Array<any>;
        target: any;
        sun: Array<QuadTreeNode>;
        id: number;
        constructor($x: number, $y: number, $z: number, $width: number, $height: number, $depth: number);
        testViewFrustum(face: Array<tl3d.Vector3D>, ray: Ray): void;
        testViewFrustumResult(face: Array<tl3d.Vector3D>): boolean;
        testRay(ray: Ray): boolean;
    }
    class Ray {
        o: tl3d.Vector3D;
        d: tl3d.Vector3D;
        baseT: number;
        setPos(x: number, y: number, z: number): void;
        setTarget(x: number, y: number, z: number): void;
    }
}
declare module tree {
    class SceneQuadTree {
        private _sceneDic;
        private _rootNode;
        private _circle;
        private _lastx;
        private _lastz;
        needUpdata: boolean;
        private panleAry;
        private _ray;
        init(obj: any, $dic: Object): void;
        getNode(obj: any): QuadTreeNode;
        setCircle($x: number, $z: number, $radius: number): void;
        update(): void;
        private getPanelByVec(v1, v2, v3);
        private capsuleLineSprite;
        updateDraw(): void;
        private drawCylinder($w, $h);
    }
}
declare module tl3d {
    class ViewFrustum {
        private _sceneManager;
        private capsuleLineSprite;
        private panleAry;
        private dataAry;
        constructor(sceneManager: SceneManager);
        init(): void;
        setCam(): void;
        private getPanle(a, b, c, d);
        private getPanelByVec(v1, v2, v3);
        setData(obj: any): void;
        setViewFrustum(): void;
    }
}
declare module tl3d {
    class SkillEffect extends SkillKey {
        active: Object3D;
        addToRender(): void;
        protected onPlayCom(event?);
    }
}
declare module tl3d {
    class SkillFixEffect extends SkillEffect {
        pos: Vector3D;
        rotation: Vector3D;
        outPos: Vector3D;
        hasSocket: boolean;
        socket: string;
        setInfo(obj: SkillKeyVo): void;
        addToRender(): void;
    }
}
declare module tl3d {
    class SkillKey {
        time: number;
        particle: CombineParticle;
        removeCallFun: Function;
        protected _skill: Skill;
        constructor(v: Skill);
        addToRender(): void;
        setInfo(obj: SkillKeyVo): void;
        reset(): void;
        destory(): void;
        protected path: any;
        data: any;
    }
    class SkillBugBind implements IBind {
        bindMatrix: Matrix3D;
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
}
declare module tl3d {
    class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
        activeList: Array<Object3D>;
        currentPosList: Array<Vector3D>;
        pathMul: SkillMulPath;
        update(t: number): void;
        getSunType(): number;
        addToRender(): void;
        setMulPlayData($activeList: Array<Object3D>, $target: Object3D, $removeCallFun: Function, types?: number): void;
        getMulSocket(ary: Array<Vector3D>): void;
    }
}
declare module tl3d {
    class SkillTrajectory extends SkillKey implements IBind {
        active: Object3D;
        target: Object3D;
        data: SkillTrajectoryTargetKeyVo;
        protected _currentPos: Vector3D;
        rotationMatrix: Matrix3D;
        protected _socketMaxrix: Matrix3D;
        protected _currentTargetPos: Vector3D;
        endParticle: CombineParticle;
        protected path;
        constructor(v: Skill);
        update(t: number): void;
        reset(): void;
        endPlayFun(e?: BaseEvent): void;
        setCurrentPos(): boolean;
        addToRender(): void;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
        setInfo(obj: SkillKeyVo): void;
        setPlayData($active: Object3D, $target: Object3D, $removeCallFun: Function, types?: number, $bloodFun?: Function): void;
        destory(): void;
    }
}
declare module tl3d {
    class PathManager {
        private static dic;
        static reg(types: number, cls: any): void;
        static getNewPath(types: number): any;
        static init(): void;
    }
}
declare module tl3d {
    class SkillMulPath extends SkillPath {
        private skillMul;
        private currentPosAry;
        private alltime;
        private lastTime;
        private maxV3d;
        private allTimeList;
        resultAry: Array<Array<Array<number>>>;
        setInitCurrentPos(ary: Array<Vector3D>): void;
        private directAry;
        add(): void;
        setAllData(): void;
        update(t: number): void;
        setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D): void;
        applyData(ary: Array<Vector3D>): void;
        reset(): void;
    }
}
declare module tl3d {
    class SkillPath {
        currentPos: Vector3D;
        currentTargetPos: Vector3D;
        rotationMatrix: Matrix3D;
        time: number;
        /**
        * 是否已经到达
        */
        protected hasReached: boolean;
        endTime: number;
        /**
        * 当前方向
        */
        protected _currentDirect: Vector3D;
        speed: number;
        skillTrajectory: SkillTrajectory;
        endFun: Function;
        bloodFun: Function;
        types: number;
        update(t: number): void;
        setRotationMatrix($newPos: Vector3D): void;
        arrive(): void;
        applyArrive(): void;
        reset(): void;
        add(): void;
        setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D, $bloodFun: Function): void;
    }
}
declare module tl3d {
    class SkillSinPath extends SkillPath {
        private alltime;
        private lastTime;
        protected basePos: Vector3D;
        add(): void;
        update(t: number): void;
        setApplyPos($offset: Vector3D): void;
        getOffset(ypos: number): Vector3D;
        reset(): void;
    }
    class SkillCosPath extends SkillSinPath {
        getOffset(ypos: number): Vector3D;
    }
}
declare module tl3d {
    class Skill extends ResCount {
        skillVo;
        name: string;
        key: string;
        isDeath: boolean;
        keyAry: Array<SkillKey>;
        completeNum: number;
        src: boolean;
        active: Object3D;
        completeFun: Function;
        time: number;
        static MaxTime: number;
        targetFlag: number;
        targetShockFlag: number;
        trajectoryAry: Array<SkillTrajectory>;
        _skillData;
        batterObj: any;
        tbSkillId: number;
        soundPlay: boolean;
        needSound: boolean;
        hasDestory: boolean;
        readonly skillMgr: SkillManager;
        constructor(v: SkillManager);
        setData($data: any, $skillData: SkillData): void;
        getBloodTime(): number;
        play(): void;
        setKeyAry(): void;
        removeKey($key: SkillKey): void;
        /**强制移除技能 */
        removeSkillForce(): void;
        skillComplete(): void;
        reset(): void;
        update(t: number): void;
        updateTrajector(t: number): void;
        private getKeyTarget();
        private getShockTarget();
        private getSound();
        configFixEffect($active: Object3D, $completeFun?: Function, $posObj?: Array<Vector3D>): void;
        configTrajectory($active: Object3D, $target: Object3D, $completeFun?: Function, types?: number, $bloodFun?: Function): void;
        configMulTrajectory($activeList: Array<Object3D>, $active: Object3D, $target: Object3D, $completeFun?: Function): void;
        removeTrajectory($skilltra: SkillTrajectory): void;
        destory(): void;
        needShock: boolean;
    }
}
declare module tl3d {
    class SkillData extends ResCount {
        data: any;
        private srcList;
        srcOutAry: Array<Skill>;
        addSrcSkill($skill: any): void;
        destory(): void;
        testDestory(): boolean;
    }
}
declare module tl3d {
    class SkillManager extends ResGC {
        constructor(any);
        private _scene;
        readonly scene: SceneManager;
        _skillDic;
        _loadDic;
        _preLoadDic;
        _skillAry;
        _time;
        update(): void;
        preLoadSkill($url: string, callback?: any): void;
        loadSkillRes(url: string, $fun: Function): void;
        getSkill($url: string, $name: string, $callback?: Function): Skill;
        protected loadSkillCom($url, $skillRes);
        addSrc($url: string, skillData: SkillData): void;
        playSkill($skill: any): void;
        removeSkill($skill: any): void;
        gcSkill(skill: any): void;
        gc(): void;
        shock: ShockUtil;
    }
    class ShockUtil {
        constructor();
        private upFun;
        private time;
        private amp;
        private ctime;
        private update($dtime);
        shock(time: number, amp: number): void;
        clearShock(): void;
    }
}
declare module tl3d {
    class SkillKeyVo {
        frame: number;
        url: string;
        setData($data: any): void;
    }
    class SkillShockVo {
        time: number;
        lasttime: number;
        amp: number;
        setData($data: any): void;
    }
    class SkillFixEffectKeyVo extends SkillKeyVo {
        pos: Vector3D;
        rotation: Vector3D;
        hasSocket: boolean;
        socket: string;
        setData($data: any): void;
    }
    class SkillTrajectoryTargetKeyVo extends SkillKeyVo {
        beginType: number;
        beginSocket: string;
        beginPos: Vector3D;
        hitSocket: string;
        endParticleUrl: string;
        speed: number;
        multype: number;
        setData($data: any): void;
    }
}
declare module tl3d {
    class SkillVo {
        action: string;
        skillname: string;
        keyAry: Array<SkillKeyVo>;
        shockAry: Array<SkillShockVo>;
        types: number;
        bloodTime: number;
        static defaultBloodTime: number;
        sound: SkillKeyVo;
        setData($info: any): void;
        private getShockAry($ary);
        private getFixEffect($ary);
        private getTrajectoryDynamicTarget($ary);
    }
    class SkillType {
        static TrajectoryDynamicTarget: number;
        static FixEffect: number;
        static TrajectoryDynamicPoint: number;
    }
}
declare module tl3d {
    class FrameUIRender extends UIRenderComponent {
        constructor();
        setImg(url: string, wNum: number, hNum: number, fun: Function, num?: number): void;
        update(): void;
        getFrameTipComponent(wNum: number, hNum: number): FrameTipCompenent;
    }
}
declare module tl3d {
    class InteractiveEvent extends BaseEvent {
        static Down: string;
        static Up: string;
        static Move: string;
        static PinchStart: string;
        static Pinch: string;
        x: number;
        y: number;
        data: number;
        roation: number;
        target: any;
    }
}
declare module tl3d {
    class TextAlign {
        static LEFT: string;
        static CENTER: string;
        static RIGHT: string;
        static TOP: string;
        static MIDDLE: string;
        static BOTTOM: string;
    }
}
declare module tl3d {
    class UIAtlas {
        textureRes: TextureRes;
        configData: any;
        layoutData: any;
        ctx: CanvasRenderingContext2D;
        private _useImgUrl;
        useImg: any;
        constructor();
        readonly texture: WebGLTexture;
        setInfo(configUrl: string, imgUrl: string, $fun: Function, useImgUrl?: string): void;
        loadConfig(configUrl: string, $fun: Function): void;
        loadImgUrl(imgUrl: string, $fun: Function): void;
        loadUseImg($fun: Function): void;
        getRec($name: string): UIRectangle;
        getLayoutData($name: string): any;
        getGridRec($name: string): UIGridRentangle;
        readonly hasData: boolean;
        getObject($name: string, $x: number, $y: number, $width: number, $height: number, $maxWidth: number, $maxHeight: number, $cellx?: number, $celly?: number): any;
        updateCtx($ctx: any, xpos: number, ypos: number): void;
        upDataPicToTexture($url: string, $iconName: string): void;
        clearCtxTextureBySkilname($iconName: string): void;
        copyPicToTexture($srcSkin: string, $desSkin: string): void;
        /**
         * 渲染文字
         */
        updateLable($key: string, $str: string, fontsize: number, fontColor: string, textBaseline?: string, textAlign?: string, bolder?: boolean, maxWidth?: number): void;
        updateArtNum($targetName: string, $srcName: string, num: number): void;
        writeSingleLabel($key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string): void;
        writeSingleLabelToCxt($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number): void;
        /**
         * 未渲染文字。只是绘制到CanvasRenderingContext2D
         * 返回CanvasRenderingContext2D对象
         */
        updateLableCtx($ctx: CanvasRenderingContext2D, $str: string, $x: number, $y: number, $fontsize: number, $textAlign?: string, $textBaseline?: string, $textcolor?: string, $textbolder?: string, $maxWidth?: number): void;
        getTextCtx($rec: UIRectangle, $fontsize: number, $fontColor: string, $bolder: boolean, $textBaseline: string, $textAlign: string): CanvasRenderingContext2D;
        private getTextxpos($textAlign, $ctx);
        private getTextypos($textBaseline, $ctx);
        private wrapText(context, text, x, y, maxWidth, lineHeight);
        _hasDispose: boolean;
        dispose(): void;
    }
}
declare module tl3d {
    class UIBackImg extends UIRenderComponent {
        constructor();
        private _width;
        private _height;
        private _wScale;
        private _hScale;
        private _scaleData;
        private _isFBO;
        alpha: number;
        protected initData(): void;
        resize(): void;
        setImgInfo($url: string, $width: number, $height: number): void;
        appleyPos(): void;
        setFbo(): void;
        update(): void;
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class UIRenderOnlyPicComponent extends UIRenderComponent {
        constructor();
        makeRenderDataVc($vcId: number): void;
        update(): void;
        protected setTextureToGpu(): void;
        dispose(): void;
    }
}
declare module tl3d {
    class UICompenent extends EventDispatcher {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        z: number;
        data: any;
        absoluteX: number;
        absoluteY: number;
        absoluteWidth: number;
        absoluteHeight: number;
        enable: boolean;
        private _left;
        private _right;
        private _center;
        private _xType;
        private _top;
        private _bottom;
        private _middle;
        private _yType;
        name: string;
        tr: Rectangle;
        renderX: number;
        renderY: number;
        renderWidth: number;
        renderHeight: number;
        uiRender: UIRenderComponent;
        parent: UIConatiner;
        preParent: UIConatiner;
        renderData: Array<number>;
        renderData2: Array<number>;
        mouseEnable: boolean;
        scale: number;
        skinName: string;
        baseRec: any;
        isVirtual: boolean;
        vcId: number;
        protected _uvScale: number;
        private _rendering;
        constructor();
        onRenderingFun: Function;
        unRenderingFun: Function;
        rendering: boolean;
        addStage(): void;
        removeStage(): void;
        isU: boolean;
        isV: boolean;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        setVc(program: any, index: number): void;
        update(): void;
        applyRenderSize(): void;
        uvScale: number;
        setScale(num: number): void;
        applyAbsolutePoint(): void;
        x: number;
        y: number;
        width: number;
        height: number;
        left: number;
        right: number;
        center: number;
        top: number;
        bottom: number;
        middle: number;
        testPoint($x: number, $y: number): boolean;
        setPos($x: number, $y: number): void;
        interactiveEvent(e: InteractiveEvent): boolean;
        preShow(): void;
        preHide(): void;
    }
}
declare module tl3d {
    class UIConatiner {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        private _left;
        private _right;
        private _center;
        private _xType;
        private _top;
        private _bottom;
        private _middle;
        private _yType;
        protected _list: Array<UICompenent>;
        renderList: Array<UIRenderComponent>;
        protected _maskList: Array<UIMask>;
        private _hasStage;
        virtualContainerList: Array<UIVirtualContainer>;
        private _hasLoad;
        private _completeFun;
        private _isLoading;
        private _needShowLoading;
        private _interfaceUI;
        private _layer;
        layer: number;
        interfaceUI: boolean;
        constructor();
        load($complateFun: Function, $needShowLoading?: boolean): void;
        readonly hasLoad: boolean;
        protected makeBaseWinUi(): void;
        applyLoad(): void;
        applyLoadComplete(): void;
        hasStage: boolean;
        setUiListVisibleByItem($arr: Array<UICompenent>, $flag: boolean): void;
        onAdd(): void;
        onRemove(): void;
        addChild($ui: UICompenent): UICompenent;
        addVirtualContainer($con: UIVirtualContainer): void;
        removeVirtualContainer($con: UIVirtualContainer): void;
        addUIList($ary: Array<string>, $uiRender: UIRenderComponent): Array<UICompenent>;
        getUIList($ary: Array<string>, $uiRender: UIRenderComponent): Array<UICompenent>;
        addEvntBut($name: string, $uiRender: UIRenderComponent): any;
        addEvntButUp($name: string, $uiRender: UIRenderComponent): any;
        protected removeEvntBut($ui: UICompenent): void;
        protected butClik(evt: InteractiveEvent): void;
        protected renderSetVisibel($list: Array<UIRenderComponent>, value: boolean): void;
        removeChild($ui: UICompenent): void;
        removeAll(): void;
        addMask($mask: UIMask): void;
        removeMaks($mask: UIMask): void;
        addRender($uiRender: any): void;
        addRenderAt($uiRender: UIRenderComponent, $idx: number): void;
        removeRender($uiRender: UIRenderComponent): void;
        resize(): void;
        resizeVirtualList(): void;
        left: number;
        right: number;
        center: number;
        top: number;
        bottom: number;
        middle: number;
        width: number;
        height: number;
        applyChild(): void;
        x: number;
        y: number;
        dispose(): void;
        setSizeForPanelUiCopy($ui: UICompenent, $uiName: string, $uiRender: UIRenderComponent): void;
    }
    class Dis2DUIContianerBase extends UIConatiner {
        constructor();
        update(t: number): void;
        clearOneTemp(): void;
    }
}
declare module tl3d {
    class MainUiLoad {
        private static _dic;
        private static _imgDic;
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _itemLoad;
        private static loadBaseConfigCom();
        private static loadOkNum($num);
        private static loadUIdata($xmlUrl, $imgUrl, $key?, $isTexture?);
        static loadOkd(): void;
    }
    class UIData {
        static flytext: any;
        static publicsUi: any;
        static designWidth: number;
        static designHeight: number;
        static font: string;
        static Scale: number;
        static setDesignWH($width: number, $height: number): void;
        static resize(): void;
        private static _dic;
        private static _imgDic;
        static textImg: any;
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _listUIRenderComponent;
        static readonly mainUIAtlas: UIAtlas;
        private static _itemLoad;
        private static loadBaseConfigCom();
        private static loadOkNum($num);
        static textlist: string;
        static publicUi: string;
        static faceItem: Array<string>;
        private static loadUIdata($xmlUrl, $imgUrl, $key?, $isTexture?);
        static loadOkd(): void;
        static getImgByKey($key: string): HTMLImageElement;
        static getUiByName($key: string, $name: string): Object;
        static getUiArrByKey($key: string): any;
    }
    class UiDraw {
        static drawUseImg($ui: UICompenent, $useImgAtlas: UIAtlas, $skinName: string): void;
        static clearUI($ui: UICompenent): void;
        static drawTxtLab($ui: UICompenent, $str: string, $fontsize: number, $align: string, $tx?: number, $ty?: number): void;
        /**属性 - value */
        static drawAttVal($ui: UICompenent, $att: number, $val: number, $align?: string, $needadd?: boolean): void;
        /**绘制未获得属性 - value */
        static drawAttValAdd($ui: UICompenent, $att: number, $val: number): void;
        /**绘制增加属性 向上箭头 */
        static drawAddValTop($ui: UICompenent, $val: number): void;
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        static drawAddValRight($ui: UICompenent, $val: number, $needadd?: boolean, $align?: string): void;
        /**
         * 在ctx上指定位置绘制一个小图标
         * @param
         * @param
         */
        static drawCost($cxt: CanvasRenderingContext2D, $tx: number, $ty: number, $type: number): void;
        static drawCostUI($ui: UICompenent, $tx: number, $ty: number, $type: number): void;
        static cxtDrawImg($cxt: CanvasRenderingContext2D, $name: any, $rect: Rectangle, $key: string): void;
        static uiAtlasDrawImg($uiAtlas: UIAtlas, $skinName: string, $key: string, $shareName: string): void;
        /**
         * 将共享资源图绘制到$uiAtlas纹理对象中
         * $touiAtlas：绘制到的uiAtlas对象
         * $fromuiAtlas: 资源来源的uiAtlas对象
         * $skinName: 绘制对象名
         * $shareName：资源名
         * $tx：偏移量x
         * $ty：偏移量y
         * $fillflag：是否填充整个对象，若填充，则考虑偏移量，否则反之
         */
        static SharedDrawImg($touiAtlas: UIAtlas, $fromuiAtlas: UIAtlas, $skinName: string, $shareName: string, $tx?: number, $ty?: number, $fillflag?: boolean): void;
        static drawToUiAtlasToCtx($ctx: CanvasRenderingContext2D, $fromuiAtlas: UIAtlas, $shareName: string, $posRect: Rectangle): void;
        static RepeatLoadImg($url1: string, $url2: string, $backFuc?: Function): void;
    }
    class UIuitl {
        private static _instance;
        static getInstance(): UIuitl;
        constructor();
        /**
         * 绘制背景图+资源icon+资源数目
         */
        drawCostUI($uiAtlas: UIAtlas, $skinName: string, $costary: Array<any>, $fontcolor?: string, $bgwidth?: number, $bgheight?: number): void;
        costtype($costid: number): string;
    }
}
declare module tl3d {
    class UIGridRentangle extends UIRectangle {
        ogw: number;
        ogh: number;
    }
}
declare module tl3d {
    class UIListRenderComponent extends UIRenderComponent {
        constructor();
        createList(): List;
        createGridList(): GridList;
    }
}
declare module tl3d {
    class UIMask {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        absoluteX: number;
        absoluteY: number;
        absoluteWidth: number;
        absoluteHeight: number;
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        renderData: Array<number>;
        parent: UIConatiner;
        scale: number;
        level: number;
        constructor();
        protected initData(): void;
        applyAbsolutePoint(): void;
        testPoint($x: number, $y: number): boolean;
        applyRenderSize(): void;
        applyObjData(): void;
        update(): void;
        x: number;
        y: number;
        width: number;
        height: number;
        private _hasDisposed;
        dispose(): void;
    }
}
declare module tl3d {
    class UIRectangle extends Rectangle {
        pixelWitdh: number;
        pixelHeight: number;
        pixelX: number;
        pixelY: number;
        cellX: number;
        cellY: number;
        type: number;
    }
}
declare module tl3d {
    class UIRenderComponent {
        protected _uiList: Array<UICompenent>;
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        textureRes: TextureRes;
        container: UIConatiner;
        uiAtlas: UIAtlas;
        private _rendering;
        mask: UIMask;
        modelRenderList: Array<Display3D>;
        name: string;
        scale: number;
        sortnum: number;
        blenderMode: number;
        constructor();
        rendering: boolean;
        readonly texture: WebGLTexture;
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void;
        resize(): void;
        setImgUrl($url: string): void;
        setInfo(configUrl: string, imgUrl: string, $fun: Function): void;
        setAtlas($atlas: UIAtlas): void;
        creatComponent($tx: number, $ty: number, $tw: number, $th: number): UICompenent;
        getComponent($uiName: string): UICompenent;
        createFrame($upskin: string): FrameCompenent;
        creatBaseComponent($skinName: string): UICompenent;
        creatGrid9Component($skinName: string, $width: number, $height: number): Grid9Compenent;
        creatButton($upskin: string, $downskin: string): Button;
        createSelectButton($upskin: string, $selectedskin: string): SelectButton;
        addRenderUI(ui: UICompenent): void;
        removeRenderUI(ui: UICompenent): void;
        applyObjData(): void;
        protected renderData: Float32Array;
        protected renderData2: Float32Array;
        makeRenderDataVc($vcId: number): void;
        private num;
        visible: boolean;
        update(): void;
        protected setTextureToGpu(): void;
        setVc(): void;
        addModel($display: Display3D): void;
        removeModel($display: Display3D): void;
        interactiveEvent($e: InteractiveEvent): boolean;
        dispose(): void;
    }
}
declare module tl3d {
    class UIVirtualContainer extends UIConatiner {
        parent: UIConatiner;
        visible: boolean;
    }
}
declare module tl3d {
    class AlphaUIShader extends Shader3D {
        static AlphaUiShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class AlphaUIRenderComponent extends UIRenderComponent {
        constructor();
        update(): void;
        protected alphaLocation: WebGLUniformLocation;
        protected initData(): void;
        creatBaseComponent($skinName: string): AlphaUICompenent;
        creatGrid9Component($skinName: string, $width: number, $height: number): AlphaGrid9UICompenent;
    }
    class AlphaGrid9UICompenent extends Grid9Compenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaUICompenent extends UICompenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaUiContianer extends Dis2DUIContianerPanel {
        protected _baseRender: AlphaUIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
    }
}
declare module tl3d {
    class BaseButton extends UICompenent {
        trDown: Rectangle;
        protected _state: number;
        protected _currentState: number;
        constructor();
        update(): void;
        applyRenderSize(): void;
    }
}
declare module tl3d {
    class Button extends BaseButton {
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}
declare module tl3d {
    class CdRenderComponent extends UIRenderComponent {
        constructor();
        setVc(): void;
        protected dataTProLocation: WebGLUniformLocation;
        private initProgram();
        getComponent($uiName: string): UICompenent;
        creatBaseComponent($skinName: string): CdUICompenent;
    }
    class CdUICompenent extends UICompenent {
        constructor();
        cdTotalnum: number;
        lastTime: number;
        private _skipNum;
        isRound: boolean;
        visible: boolean;
        setCdNum(value: number): void;
        readonly isFinish: boolean;
        update(): void;
        clockwise: boolean;
        setVc(program: any, index: number): void;
    }
    class CdUIShader extends Shader3D {
        static CdUIShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare module tl3d {
    class Disp2DBaseText {
        ui: UICompenent;
        textureStr: string;
        parent: any;
        voRect: Rectangle;
        pos: Vector3D;
        protected dtime: number;
        protected time: number;
        protected _data: any;
        protected lastKey: any;
        protected oldPos: Vector2D;
        constructor();
        protected needUpData($pos: Vector3D): boolean;
        data: any;
        makeData(): void;
        update(): void;
        Vector3DToVector2D($pos: any): Vector2D;
        isEqualLastKey(value: any): boolean;
    }
    class Dis2DUIContianerPanel extends Dis2DUIContianerBase {
        protected _baseRender: UIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
        private initData($classVo, $rect, $num);
        private _textureRect;
        private _voNum;
        private _voRect;
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<baseMeshVo>;
        private makeBaseUi($classVo);
        showTemp($data: any): Disp2DBaseText;
        private clearLostItem();
        playLost(): void;
        clearOneTemp(): void;
        clearTemp($data: any): void;
        clearAll(): void;
        private updateFun;
        update(t: number): void;
        getUiItemLen(): number;
    }
}
declare module tl3d {
    class FrameCompenent extends UICompenent {
        constructor();
        setFrameData($rect: UIRectangle): void;
        applyRenderSize(): void;
        getSkinCtxRect(): Rectangle;
        drawToCtx($uiAtlas: UIAtlas, $ctx: CanvasRenderingContext2D): void;
        private _frameData;
        private isTrue;
        current: number;
        totalcurrent: number;
        speed: number;
        endFlag: boolean;
        update(): void;
        goToAndPlay($num: number): void;
        goToAndStop($num: number): void;
        Invisible(): void;
        play(): void;
        stopEnd(): void;
        stopStatic: number;
        speedNum: number;
    }
}
declare module tl3d {
    class FrameTipCompenent extends FrameCompenent {
        constructor();
        playOne($container: UIConatiner): void;
        updateEnd(): void;
    }
}
declare module tl3d {
    class Grid9Compenent extends UICompenent {
        ogw: number;
        ogh: number;
        gw: number;
        gh: number;
        constructor();
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
}
declare module tl3d {
    class GridList extends List {
        private wNum;
        constructor();
        testPoint($x: number, $y: number): boolean;
        setGridData($data: Array<ListItemData>, ItemRender: any, $wNum: number, itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number, $width?: number, $height?: number): void;
        setGridItemData($data: any, $idx: number): boolean;
        setGridItemFun($fun: Function, $idx: number): void;
        clearItemByIndex($idx: number): void;
        clearItemByPos($pos: number): void;
        redraw(): void;
        protected testItemClick($xPos: number, $ypos: number): void;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
    class GridListAtlas extends ListAtlas {
        private getAlphaImg($width, $height);
        setGridData($width: number, $height: number, itemWidth: number, itemHeight: number, wNum: number, itemNum: number): void;
    }
}
declare module tl3d {
    class List extends UICompenent {
        protected _itemRenderAry: Array<ListItemRender>;
        private _contentX;
        private _contentY;
        protected _showHeight: number;
        protected _showWidth: number;
        protected _oHeight: number;
        protected _needScoller: boolean;
        protected _itemWidth: number;
        protected _itemHeight: number;
        constructor();
        applyAbsolutePoint(): void;
        contentX: number;
        contentY: number;
        testPoint($x: number, $y: number): boolean;
        setData($data: Array<ListItemData>, ItemRender: any, itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number, $width?: number, $height?: number): void;
        refresh(): void;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        private _ypos;
        protected onDown(event: InteractiveEvent): void;
        protected onListUp(event: InteractiveEvent): void;
        protected testItemClick($xPos: number, $ypos: number): void;
        private lastcontentY;
        protected onMove(event: InteractiveEvent): void;
        protected onUp(event: InteractiveEvent): void;
    }
    class ListAtlas extends UIAtlas {
        constructor();
        setData($width: number, $height: number, itemWidth: number, itemHeight: number, itemNum: number): void;
    }
    class ListItemData {
        id: number;
        data: any;
        clickFun: Function;
        clickRect: Rectangle;
        itemRender: ListItemRender;
    }
    class ListItemRender {
        height: number;
        widht: number;
        protected _listItemData: ListItemData;
        uvData: any;
        atlas: ListAtlas;
        _selected: boolean;
        setData($listItemData: ListItemData, $atlas: ListAtlas, $uvData: any): void;
        readonly listItemData: ListItemData;
        setNewData($data: any): void;
        selected: boolean;
        draw(): void;
        redraw(): void;
        click(xpos: number, ypos: number): void;
    }
}
declare module tl3d {
    class RoationUIShader extends Shader3D {
        static RoationUiShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class RoationUIRenderComponent extends UIRenderComponent {
        constructor();
        update(): void;
        protected alphaLocation: WebGLUniformLocation;
        protected initData(): void;
        creatBaseComponent($skinName: string): RoationUICompenent;
    }
    class RoationUICompenent extends UICompenent {
        constructor();
        rotation: number;
        aotuRotation: number;
        paix: Vector2D;
        setVc(program: any, index: number): void;
    }
}
declare module tl3d {
    class SelectButton extends BaseButton {
        private _selected;
        constructor();
        selected: boolean;
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}
declare module tl3d {
    class SList extends UIVirtualContainer {
        protected _baseX: number;
        protected _baseY: number;
        protected _contentX: number;
        protected _contentY: number;
        protected p_scrollY: number;
        protected p_scrollX: number;
        protected _itemList: Array<SListItem>;
        protected p_itemHeight: number;
        protected p_itemWidth: number;
        protected _showIndexList: Array<number>;
        protected _dataAry: Array<SListItemData>;
        protected _showItemNum: number;
        protected _allItemNum: number;
        protected _topSize: number;
        protected _bottomSize: number;
        protected _outSize: number;
        protected _showDataIndex: number;
        protected _bgRender: SListBgRender;
        protected _baseRender: SlistFrontRender;
        protected customRenderAry: Array<UIRenderComponent>;
        protected _sAtlas: SListAtlas;
        baseAtlas: UIAtlas;
        protected bgMask: UIMask;
        protected scrollLock: boolean;
        protected _minScrollY: number;
        protected _maskLevel: number;
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number, contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum?: number): void;
        initComplte(): void;
        /**显示层级 */
        setShowLevel($num: number): void;
        private _currentSelIdx;
        setSelect($item: SListItem): void;
        setSelectIndex($index: number): void;
        getCurrentSelectIndex(): number;
        changeMinScrollY(): void;
        refreshData($data: Array<SListItemData>): void;
        setItemData($data: any, $idx: number): void;
        clearItemByPos($idx: number): void;
        getDataSize(): number;
        refreshDraw(): void;
        scroll(): void;
        interactiveEvent($e: InteractiveEvent): boolean;
        private _mouseY;
        onMove($e: InteractiveEvent): void;
        onUp($e: InteractiveEvent): void;
        backFun: Function;
        protected _topflag: boolean;
        protected _bottomflag: boolean;
        /**拖动刷新 */
        protected _dragFlag: boolean;
        protected _dragY: number;
        protected _dragMaxY: number;
        protected _dragUpFun: Function;
        protected _dragDownFun: Function;
        /**设置翻页拖动 */
        setDragFun(upFun: Function, downFun: Function): void;
        dragY: number;
        scrollIdx(idx: number): void;
        getIdxY(idx: number): number;
        getIdxX(idx: number): number;
        scrollY(val: number): void;
        refreshResultPos(): void;
        dispose(): void;
    }
    class SListItem {
        private _height;
        itdata: SListItemData;
        private _list;
        index: number;
        baseY: number;
        baseX: number;
        uiAtlas: SListAtlas;
        protected _selected: boolean;
        parentTarget: SList;
        _bgRender: UIRenderComponent;
        _baseRender: UIRenderComponent;
        _customRenderAry: Array<UIRenderComponent>;
        addUI($ui: UICompenent): void;
        create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry?: Array<UIRenderComponent>): void;
        render($data: SListItemData): void;
        refreshDraw(): void;
        setSelect(): void;
        unSetSelect(): void;
        selected: boolean;
        creatSUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string, x: number, y: number, width: number, height: number): UICompenent;
        private creatGrid9Component(render, $skinName, WW, WH);
        creatGrid9SUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string, x: number, y: number, width: number, height: number, WW?: number, WH?: number): UICompenent;
        getHeight(): number;
        setItemUiX(ui: UICompenent, xpos: number): void;
        _sy: number;
        setY($sy: number): void;
        _sx: number;
        setX($sx: number): void;
    }
    class SListItemData {
        data: any;
        resdata: any;
        id: number;
        selected: boolean;
        click: Function;
    }
    class SListBgRender extends UIRenderComponent {
        slist: SList;
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class SlistFrontRender extends UIRenderComponent {
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class SListAtlas extends UIAtlas {
        constructor();
        xNum: number;
        yNum: number;
        width: number;
        height: number;
        itemHeight: number;
        itemWidth: number;
        setData($width: number, $height: number, $xnum: number, $ynum: number): void;
        addConfig($name: string, $index: number, $baseRec: any): void;
    }
    /**
     * 带特效的list
     */
    class EffectSlist extends SList {
        private _effRender;
        effList: Array<FrameTipCompenent>;
        setEffectUrl($name: string, $wnum: number, $hNum: number, num?: number): void;
        initComplte(): void;
        effectComplte(): void;
        refreshResultPos(): void;
        playEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed?: number): void;
        effplay($effui: FrameTipCompenent): void;
        showEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed?: number): void;
        hideEffect($id?: number): void;
        dispose(): void;
    }
    /**
     * 横向单行滑动的Slist
     */
    class TransverseSList extends EffectSlist {
        private _minScrollX;
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number, contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum?: number): void;
        changeMinScrollX(): void;
        refreshData($data: Array<SListItemData>): void;
        interactiveEvent($e: InteractiveEvent): boolean;
        private _mouseX;
        onMove($e: InteractiveEvent): void;
        onUp($e: InteractiveEvent): void;
        scrollX(val: number): void;
        scrollIdx(idx: number): void;
        refreshResultPos(): void;
    }
}
declare module tl3d {
    class IconManager {
        private static _instance;
        static getInstance(): IconManager;
        private _dic;
        private _loadDic;
        constructor();
        getIconName(name: string, $fun: Function, $info?: any): void;
        getIcon(url: string, $fun: Function, $info?: any): void;
        drawLoadImg($ui: UICompenent, $url: string): void;
        /**
         * 绘制坐骑头像74*74
         * @param  $ui
         * @param  $id
         * @param gray
         * @param select
         */
        drawMountIcon($ui: UICompenent, $id: number, gray?: boolean, select?: boolean): void;
        drawTxtLabel($ui: UICompenent, $str: string): void;
        drawCostTxtLabel($ui: UICompenent, $str: string): void;
        drawSkillIcon($ui: UICompenent): void;
        drawVip($ui: UICompenent, vip: number): void;
    }
}
declare module tl3d {
    class PuiData {
        /** 方形高亮64*64 */
        static A_HIGHT_F: string;
        /** tab高亮边框10*10 */
        static TAB_HIGHT: string;
        /** 圆形高亮75*75 */
        static A_HIGHT_C: string;
        /** 关闭按钮43*41 */
        static A_DELETEBTN: string;
        /** 真气图标27*27 */
        static A_ZHENQI: string;
        /** 兽灵图标27*27 */
        static A_SHOULING: string;
        /** 精华图标27*27 */
        static A_JINGHUA: string;
        /** 箭头36*44 */
        static A_JIANTOU: string;
        /** 物品框44*44 */
        static A_WUPINKUANG: string;
        /** 圆形黑框69*69 */
        static A_BLACK_C: string;
        /** 方形黑框64*64 */
        static A_BLACK_F: string;
        /** 黑色星星28*28 */
        static A_BLACK_START: string;
        /** 亮色星星28*28 */
        static A_HIGHT_START: string;
        /** 圆形头像底色71*71 */
        static A_BLACK_BASE: string;
        /** 红点17*16 */
        static A_RED_POINT: string;
        /** 银币25*23 */
        static A_YINBI: string;
        /** 元宝25*23 */
        static A_YUANBAO: string;
        /** 帮贡25*25 */
        static A_BANGGONG: string;
        /** 斗魂25*25 */
        static A_DOUHUN: string;
        /** 经验25*25 */
        static A_EXP: string;
        /** 荣誉25*25 */
        static A_HONOR: string;
        /** 绑定元宝25*23 */
        static A_BANGYUAN: string;
        /** 右边括号25*19 */
        static A_RIGHT_XING: string;
        /** 单独一个星字18*19 */
        static A_SSTART: string;
        /** 左边括号8*19 */
        static A_LEFT_XING: string;
        /** 武器紫色62*62 */
        static A_GOODS_PURPLE: string;
        /** 武器蓝色62*62 */
        static A_GOODS_BLUE: string;
        /** 武器红色62*62 */
        static A_GOODS_RED: string;
        /** 武器绿色62*62 */
        static A_GOODS_GREEN: string;
        /** 武器白色62*62 */
        static A_GOODS_WHITE: string;
        /** 武器橙色62*62 */
        static A_GOODS_ORANGE: string;
        /** 金星背景24*23 */
        static A_START_BG: string;
        /** 金星24*23 */
        static A_START: string;
        /** 链条65*65 */
        static A_CHAIN: string;
        /** 已装备26*56 */
        static A_OK: string;
        /** 前往按钮78*46 */
        static A_QIANWANG: string;
        /** T左31*62 */
        static T_LEFT: string;
        /** T中8*62 */
        static T_MID: string;
        /** T右60*62 */
        static T_RIGHT: string;
        /** E左31*62 */
        static E_LEFT: string;
        /** E中8*62 */
        static E_MID: string;
        /** E右60*62 */
        static E_RIGHT: string;
        /** F左31*62 */
        static F_LEFT: string;
        /** F中8*62 */
        static F_MID: string;
        /** F右60*62 */
        static F_RIGHT: string;
        /** 22*22的物品框 */
        static A_F_22: string;
        /** 66*66的人物头像框 */
        static A_BLACK_BASE_66: string;
        /** 66*66的人物头像框亮 */
        static A_HIGHR_C_66: string;
        /** 22*19Vip的V */
        static A_V: string;
        /** 8*8赠送物品格的背景 */
        static A_GIVING_BG: string;
        /** 24*24减号 */
        static B_SUB: string;
        /** 90*90家族头像底框 */
        static A_FACTION_ICON: string;
        /** 30*30选中勾选框 */
        static SELECT_1: string;
        /** 30*30未选中勾选框 */
        static SELECT_0: string;
        /** 15*16排行榜用到的阶字 */
        static A_JIE: string;
        /** 15*16排行榜用到的星字 */
        static A_XING: string;
        /** 系统提示文字北京 */
        static T_tips_txt_bg: string;
        /** Item底51*51 */
        static ITEMBG: string;
        /** 左边任务背景 */
        static A_quest_top: string;
        static A_quest_mid: string;
        static A_quest_bottom: string;
        /** 左边任务<主> */
        static A_quest_ion0: string;
        /** 左边任务<支> */
        static A_quest_ion1: string;
        /** 左边任务<奇> */
        static A_quest_ion2: string;
        /** 左边任务<活> */
        static A_quest_ion3: string;
        /** 左边任务<完成> */
        static A_quest_finish: string;
        static S_sys_tip0: string;
        static S_sys_tip1: string;
        /** 站力文字 */
        static A_zhanli_label: string;
        static A_gou: string;
        static A_cha: string;
        /** 战斗飘字 50*25 */
        static TYPE3: string;
        static TYPE5: string;
        static TYPE9: string;
        static TYPE7: string;
        static B_ZHUFUZHI: string;
        static B_DABAOJI: string;
        static B_XIAOBAOJI: string;
        static B_JINGYAN: string;
        static NewPicBg: string;
        static Select: string;
        static CostBg: string;
        static BG2: string;
        static PropBg40: string;
        static PropBg60: string;
        static PropBg100: string;
        static REWARD_BG1: string;
        static SKILL_BG68: string;
        static SKILL_BG58: string;
        static BG6: string;
        static Slist_nselect: string;
        static Slist_select: string;
        static TXTBG: string;
        static ARROW_TOP: string;
        static ARROW_RIGHT: string;
        static MASK: string;
        static BTNADD: string;
        static BOSSBG76: string;
        static BOSSBG64: string;
        static CIRCL74: string;
        static LISTITEMBG: string;
        static ADDITEM: string;
        static HASSEL: string;
        static SKILL_LEV_BG: string;
        static TITLEBG: string;
        static TITLEHIGHT: string;
        static NEWLISTITEMBG: string;
        static CHATBG: string;
        static ITEMBIGBG: string;
        static I1bg_2: string;
        static I1bg_1: string;
        static ARROWUP: string;
        static ARROWDOWN: string;
        static A_EQULEVBG: string;
        static DISABLE: string;
        static EQUBG: string;
        static RESLISTBG: string;
        static A_CARD_C: string;
        static A_CARD_G: string;
        static A_CARD_B: string;
        static RESBG: string;
        static STATEUP_LISTBG: string;
        static A_LEAGUELISTBG: string;
        static TEAMLISTBG: string;
        static A_JJ0: string;
        static A_JJ1: string;
        static A_JJ2: string;
        static A_JJ3: string;
        static A_JJ4: string;
        static A_JJ5: string;
        static A_JJ6: string;
        static A_JJ7: string;
        static A_JJ8: string;
        static A_JJ9: string;
        static A_JJ10: string;
    }
}
declare module tl3d {
    class UILoading extends UIConatiner {
        private static _instance;
        static getInstance(): UILoading;
        constructor();
        private _ui;
        private atls;
        private _render;
        initData(): void;
        private loadCom();
        show(): void;
        hide(): void;
    }
}
declare module tl3d {
    class UiTweenVo {
        private _ui;
        private _scale;
        private _baseRect;
        ui: UICompenent;
        scale: number;
        destory(): void;
        private static baseUIConatiner;
        static getPosByPanel($v2d: Vector2D, $layout?: any, $toUIConatiner?: UIConatiner): Vector2D;
    }
    class UiTweenScale {
        private static _instance;
        static getInstance(): UiTweenScale;
        constructor();
        private _uiTweenVo;
        changeButSize($ui: any): void;
        private changeButScale();
        private changeButEnd();
    }
    class UIManager {
        static cando: boolean;
        static popClikNameFun: Function;
        private static _instance;
        static getInstance(): UIManager;
        static uiClikName($name: string, $id: number): void;
        private _uiList;
        private _containerList;
        private _ctx;
        private _canvas;
        constructor();
        getContext2D($width: number, $height: number, alianDefault?: boolean): CanvasRenderingContext2D;
        getGrayImageDatabyImg($img: any): ImageData;
        makeCtxToGray($ctx: CanvasRenderingContext2D, $rect: Rectangle): void;
        showCanvas($x?: number, $y?: number): void;
        init(): void;
        addUI($ui: UIRenderComponent): void;
        removeUI($ui: UIRenderComponent): void;
        addUIContainer($container: UIConatiner): void;
        removeAll(): void;
        removeUIContainer($container: UIConatiner): void;
        removeNoInterfaceUI(): void;
        resize(): void;
        upBgGroundZero(): void;
        update(): void;
        regEvent($touce: any): void;
        private onTouch($e);
        private onMouse($e);
        private lastSwipeDis;
        private lastSwipeRot;
        interactiveEvent($e: any): void;
        private lastMousePos;
        disMoveNnum(v2d: Vector2D, $num: number): boolean;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
        private _eventItem;
        private setUseMouseEventCon($uiConatiner);
        private getcurrentList();
        private lastTime;
    }
}
declare module tl3d {
    class UIStage extends EventDispatcher {
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}
declare module tl3d {
    class AnimManager {
        private _dic;
        constructor();
        private static _instance;
        static getInstance(): AnimManager;
        getAnimData($url: string, $fun: Function): void;
        getAnimDataImmediate($url: string): AnimData;
        clearAnim($url: string): void;
        readData(byte: ByteArray, $url: any): AnimData;
        private readFrameData(byte, frameAry);
        private readFrameTypeData(byte);
        private processFrame(frameAry, hierarchyList);
        frameToBone(frameData: Array<number>, hierarchyList: Array<ObjectBone>): Array<ObjectBaseBone>;
        private setFrameToMatrix(frameAry);
        private getW(x, y, z);
    }
    class ObjectBaseBone {
        father: number;
        name: string;
        tx: number;
        ty: number;
        tz: number;
        tw: number;
        qx: number;
        qy: number;
        qz: number;
        qw: number;
    }
    class ObjectBone extends ObjectBaseBone {
        changtype: number;
        startIndex: number;
        matrix: Matrix3D;
        clone(): ObjectBone;
    }
}
declare module tl3d {
    class ArtFont {
        fontData: Dictionary;
        fontData_Unit: Dictionary;
        constructor();
        static Red: string;
        static Green: string;
        static Blue: string;
        static White: string;
        static Yellow: string;
        static BOSSBIGTXT: string;
        static CN1: string;
        static num101: string;
        static num102: string;
        static BigYellow: string;
        static num99: string;
        static GARY_TXT: string;
        static ORANGE_TXT: string;
        static num1: string;
        static num2: string;
        static num3: string;
        static num4: string;
        static num5: string;
        static num6: string;
        static num7: string;
        static num10: string;
        static num8: string;
        static num9: string;
        static num11: string;
        static num12: string;
        static num13: string;
        static num14: string;
        static num15: string;
        static num16: string;
        static num17: string;
        static num18: string;
        static num19: string;
        static num20: string;
        static num21: string;
        static num22: string;
        static num23: string;
        static num24: string;
        static num25: string;
        static num26: string;
        static num27: string;
        static num28: string;
        static num30: string;
        static num51: string;
        static num52: string;
        static num53: string;
        static num54: string;
        static num55: string;
        static num56: string;
        static num57: string;
        static num58: string;
        static num59: string;
        static num60: string;
        static num61: string;
        static numVip: string;
        static num63: string;
        static num64: string;
        static num65: string;
        static num66: string;
        private static _instance;
        static getInstance(): ArtFont;
        private makeFontRect();
        private getXmlData();
        private makeBase12pxNum($pos);
        writeFontToCtxLeft($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        /**
         * 将美术字写到ctx上 右对齐的
         * $tx:绘制的终点x
         * $ty:绘制的起点Y
         */
        writeFontToCtxRight($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        writeFontToCtxCenten($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        writeFontToSkinName($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string, $txtInterval?: number): number;
        writeFontToSkinNameCenter($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $txtInterval?: number): void;
        getAirFontWidth($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $txtInterval?: number): number;
        private getRect(numId, $color, $textItem);
        upArtFont($UIAtlas: UIAtlas, $iconName: string, $str: string, $size?: number, $color?: string, $textAlign?: string): void;
        upArtBase($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string): void;
        private getXpos($textAlign, $totalW, $rect);
        /**
         *计算总宽度和是否绘制
         */
        private getTotalWandDraw($rect, $str, $textItem, $scale, $ctx, $isCtx, $xpos?, $txtInterval?);
        getCharId(str: string): number;
    }
}
declare module tl3d {
    class TextJumpType {
        static NORMALDAMAGE: number;
        static CRIT: number;
        static DODGE: number;
        static TREATMENT: number;
        static VERTIGO: number;
        static FREEZE: number;
        static ATTACKADD: number;
        static ATTACKREDUCE: number;
        static EXPERIENCE: number;
        static NORMALDAMAGEUP: number;
        static CRITUP: number;
        static MYNORMALDAMAGE: number;
        static MYNORMALDAMAGEUP: number;
        static MISS: number;
        static N_UPHP: number;
        static N_NORMALDAMAGE: number;
        static N_CRIT: number;
        static N_RESISTANCES: number;
        static N_ONCEATTACK: number;
        static N_PASSIVE: number;
        static N_RESURGENCE: number;
        static N_BEATBACK: number;
        static N_DOWNHP: number;
        static N_SHIELD: number;
        static N_INVINCIBLE: number;
        static N_ATTACK_UP: number;
        static N_ATTACK_DOWN: number;
        static N_DEFENSE_UP: number;
        static N_DEFENSE_DOWN: number;
        static N_SPEED_UP: number;
        static N_SPEED_DOWN: number;
        static N_CRIT_RATE_UP: number;
        static N_CRIT_RATE_DOWN: number;
        static N_HIT_UP: number;
        static N_HIT_DOWN: number;
        static N_RESIST_RATE_UP: number;
        static N_RESIST_RATE_DOWN: number;
        static N_IMMUNE: number;
        static N_BLEED: number;
        static N_DIZZY: number;
        static N_SILENCE: number;
        static N_SARCASM: number;
        static N_SLEEP: number;
        static N_TARGET: number;


        static N_SHIHUA: number;//石化
        static N_MEIHUO: number;//魅惑
        static N_SHUFU: number;//束缚
        static N_BINGFENG: number;//冰封
        static N_ZHONGDU: number;//中毒
        static N_LEIDIAN: number;//雷电
        static N_ANGER_DOWN: number;//减怒
        static N_WANGLING: number;//亡灵
        static N_MABI: number;//麻痹
        static N_FENNU: number;//愤怒
        static N_FANTAN: number;//反弹
        static N_SHARE: number;//分摊
        static N_ZHUOSHAO: number;//灼烧
    }
    class TextJumpUiVo {
        pos: Vector3D;
        str: string;
        type: number;
        endtime: number;
        starttime: number;
    }
    class ExpTextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width;
        makeData(): void;
        protected drawTxtBydigitalAndtext($vo);
        pos;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        private _lastchange;
        private changerules(t);
    }
    class TextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width;
        makeData(): void;
        private drawTxtBytext($vo);
        private drawTxtBydigitalAndtext($vo);
        pos;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        private _lastchange;
        private changerules(t);
    }
    class CharNameUiVo extends Disp2DBaseText {
        private charNameMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class CharTitleUiVo extends Disp2DBaseText {
        private _charTitleMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class baseMeshVo {
        private _visible;
        visibleChange: boolean;
        visible: boolean;
        pos: Vector3D;
        clear: boolean;
        midNum: number;
        constructor();
    }
    class CharTitleMeshVo extends baseMeshVo {
        private _num;
        needDraw: boolean;
        destory(): void;
        num: number;
    }
    class CharNameMeshVo extends baseMeshVo {
        private _name;
        needDraw: boolean;
        name: string;
        destory(): void;
        size: number;
        color: string;
        scolor: string;
    }
    class BloodLineMeshVo extends baseMeshVo {
        num: number;
        colortype: number;
        destory(): void;
        offsety: number;
        posx: number;
    }
    class BloodManager {
        private static _instance;
        static getInstance(): BloodManager;
        private _charTitleContianerPanel;
        private _charNameContianerPanel;
        private _jumpTxtContianerPanel;
        private _expjumpTxtContianerPanel;
        // private _bloodLineUIConatiner;
        uiContianerItem;
        constructor();
        clearOneTemp(): void;
        getCharTitleMeshVo(value?: number): CharTitleMeshVo;
        getCharNameMeshVo(value?: string): CharNameMeshVo;
        // getBloodLineMeshVo(): BloodLineMeshVo;
        setJumpNum($textJumpUiVo: TextJumpUiVo): void;
        setExpJumpNum($textJumpUiVo: TextJumpUiVo): void;
        update(): void;
        resize(): void;
        // clearBloodLineMeshVo(vo);
    }
    // class BloodUIShader extends Shader3D {
    //     static BloodUIShader: string;
    //     constructor();
    //     binLocation($context: WebGLRenderingContext): void;
    //     getVertexShaderString(): string;
    //     getFragmentShaderString(): string;
    // }
    // class BloodUICompenent extends UICompenent {
    //     constructor();
    //     pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    //     lifeNum: number;
    //     colortype: number;
    // }
    // class BloodDisp2DBaseText extends Disp2DBaseText {
    //     private bloodLineMeshVo;
    //     makeData(): void;
    //     private tempMatrix;
    //     update(): void;
    // }
    // class BloodUIRenderComponent extends UIRenderComponent {
    //     constructor();
    //     protected initData(): void;
    //     private nextTime;
    //     update(): void;
    //     creatBaseComponent($skinName: string): BloodUICompenent;
    //     makeRenderDataVc($vcId: number): void;
    // }
    // class BloodLineUIConatiner extends UIConatiner {
    //     private _baseRender;
    //     constructor();
    //     private loadBloodTexture();
    //     protected _uiItem: Array<BloodDisp2DBaseText>;
    //     update(t: number): void;
    //     removeChild($ui: UICompenent): void;
    //     clearOneTemp(): void;
    //     showTemp($data: any): void;
    // }
}
declare module tl3d {
    class ColorTransition {
        private _canvas;
        private _cxt;
        private _gnt;
        private static _instance;
        static getInstance(): ColorTransition;
        constructor();
        getImageData($data: any): ImageData;
        getImageDataByVec($data: any, $lenght: number): ImageData;
        setData(): void;
    }
}
declare module curbes {
    class Curve {
        type: number;
        valueVec: Array<Array<number>>;
        private valueV3d;
        begintFrame: number;
        maxFrame: number;
        constructor();
        getValue($t: number): Array<number>;
        setData(obj: any): void;
    }
}
declare module tl3d {
    class GroupDataManager extends ResGC {
        getGroupData($url: string, $fun: Function): void;
        scene: SceneManager;
        perLoadData($url: string, $fun: Function): void;
    }
}
declare module tl3d {
    class KeyboardType {
        static A: number;
        static B: number;
        static C: number;
        static D: number;
        static E: number;
        static F: number;
        static G: number;
        static H: number;
        static I: number;
        static J: number;
        static K: number;
        static L: number;
        static M: number;
        static N: number;
        static O: number;
        static P: number;
        static Q: number;
        static R: number;
        static S: number;
        static T: number;
        static U: number;
        static V: number;
        static W: number;
        static X: number;
        static Y: number;
        static Z: number;
        static Left: number;
        static Up: number;
        static Right: number;
        static Down: number;
        static Delete: number;
        static F1: number;
        static F2: number;
    }
}
declare module tl3d {
    class MouseType {
        static MouseDown: string;
        static MouseUp: string;
        static MouseMove: string;
        static MouseClick: string;
        static KeyDown: string;
        static KeyUp: string;
        static MouseWheel: string;
        static TouchStart: string;
        static TouchMove: string;
        static TouchEnd: string;
        static TouchClick: string;
    }
    class KeyControl {
        private static _instance;
        _keyDic: Object;
        private _lostMousePos;
        private _lastFousce;
        private _isMouseDown;
        private _isUpData;
        constructor();
        static readonly instance: KeyControl;
        static getInstance(): KeyControl;
        init(): void;
        clearAllEvet(): void;
        clearMouseEvent(): void;
        onMouseMove($evt: MouseEvent): void;
        onMouseDown($evt: MouseEvent): void;
        onMouseUp($evt: MouseEvent): void;
        upData(): void;
        speedNum: number;
        tureLeft(): void;
        tureRight(): void;
        tureUp(): void;
        tureDown(): void;
        mathFocus3D($p: Vector3D): void;
        onKeyDown($evt: KeyboardEvent): void;
        onKeyUp($evt: KeyboardEvent): void;
    }
}
declare module tl3d {
    class TextRegVo {
        begin: number;
        end: number;
        color: string;
    }
    class TextRegExp {
        static item: Array<TextRegVo>;
        static defaultColor: string;
        constructor();
        static pushStr($str: string): void;
        /**
         * 将字符串中所有颜色替换为#号 并返回新的字符串
         * @param
         */
        static pushStrCopy($str: string): string;
        static isColor($index: number, $ctx: CanvasRenderingContext2D): boolean;
        static getTextMetrics($ctx: CanvasRenderingContext2D, text: string): TextMetrics;
        static getTextOnlyTxt($ctx: CanvasRenderingContext2D, text: string): string;
        private static getNextWords($str, indx);
        /**
         * 逐字符写入文本。兼容表情。返回行数
         * @param
         * @param text
         * @param baseColor
         * @param x
         * @param y
         * @param maxWidth
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static wrapText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x?: number, y?: number, maxWidth?: number, lineHeight?: number, fontsize?: number, $filterColor?: string, $filterWidth?: number, $gapScale?: number): number;
        /**
         * 逐字符写入文本。兼容表情。返回行数 竖着写
         * @param
         * @param text
         * @param baseColor
         * @param x
         * @param y
         * @param maxWidth
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static wrapTextVertical($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x?: number, y?: number, maxWidth?: number, lineWidth?: number, fontsize?: number, $filterColor?: string, $filterWidth?: number, $gapScale?: number): number;
        /**
         * 按行写入字符。暂不兼容表情。返回数组行宽行高
         * @param
         * @param text
         * @param baseColor
         * @param
         * @param
         * @param
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static drawText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, $maxWidth?: number, lineHeight?: number, fontsize?: number): Array<number>;
        private static getStartPoint(vo, $textcellary);
        private static drawFaceIcon(ctx, $rect, $faceId);
    }
    class TextCell {
        str: string;
        posy: number;
        width: number;
        color: string;
        maxwidth: number;
        constructor($str: string, $posy: number, $width: number, $color: string, $maxWidth: number);
    }
    class LabelTextFont {
        static writeSingleLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): number;
        static writeTextLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: string, $maxWidth?: number, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): Array<number>;
        static writeSingleLabelToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $align?: string, $baseColor?: string, $filterColor?: string, $bolder?: boolean): number;
        static writeSingleLabelToCtxByVertical($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $baseColor?: string, $filterColor?: string, $bolder?: boolean): void;
        static writeSingleLabelToCtxSetAnchor($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $align?: string, $baseColor?: string, $filterColor?: string, $bolder?: boolean): number;
        /**
         * 整行写入文本 不兼容处理颜色
         * @param $x 文本写入时光标所在x位置
         * @param $y 文本写入时光标所在y位置
         * @param fontsize
         * @param fontColor
         * @param bolder
         * @param  $textAlign 对齐方式
         * @readme 如果需要居中对齐显示，则光标所在位置需要传入中心点坐标，对齐方式也需要传入center
         */
        static writeText($uiAtlas: UIAtlas, $key: string, $x: number, $y: number, $str: string, fontsize: number, fontColor: string, $maxWidth?: number, bolder?: boolean, $textAlign?: string): Array<number>;
        /**
         * 按行写入文本 带解析颜色。但只能居中对齐
         */
        static writeTextAutoCenterByAnchor($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean, $filterColor?: string): Array<number>;
        static writeTextAutoVerticalCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, $filterColor?: string, bolder?: boolean): void;
        static writeTextAutoCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean): void;
        private static isNewline(ctx, $text, $maxWidth);
        private static getTextxpos($textAlign, $ctx);
        private static wrapText($ctx, text, $tx, $ty, maxWidth, $th);
        /**已弃用 请使用clearUI */
        static clearLabel($uiAtlas: UIAtlas, $key: string): void;
    }
}
declare module tl3d {
    class LightProbeManager {
        private static _instance;
        static getInstance(): LightProbeManager;
        private _dataAry;
        private _defaultVec;
        constructor();
        setLightProbeData($arr: Array<any>): void;
        clear(): void;
        getData($pos: Vector3D): Array<Vector3D>;
        testPoint(lightArea: any, $pos: Vector3D): Boolean;
        getResultData(ary: Array<any>, x: number, z: number, y: number, bNum: Number, $pos: Vector3D): Array<Vector3D>;
    }
    class PosItem {
        pos: Vector3D;
        bais: number;
        dis: number;
        vecNum: Array<Vector3D>;
        constructor(basePos: any, centerPos: Vector3D);
        setBais(allDis: number): void;
    }
}
declare module tl3d {
    class LoadManager {
        static BYTE_TYPE: string;
        static IMG_TYPE: string;
        static XML_TYPE: string;
        private static _instance;
        static getInstance(): LoadManager;
        static getVersion(vkey: any): string;
        private _loadThreadList;
        private _waitLoadList;
        constructor();
        load($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function): void;
        loadWaitList(): void;
        _versions: any;
    }
    class LoaderThread {
        private _xhr;
        private _img;
        private _loadInfo;
        idle: boolean;
        private _url;
        constructor();
        load(loadInfo: LoadInfo): void;
        loadError(): void;
        loadByteXML(): void;
        loadByteImg(): void;
        loadImg(): void;
    }
    class LoadInfo {
        url: string;
        type: string;
        fun: Function;
        info: any;
        progressFun: Function;
        version: string;
        constructor($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function);
        readonly vurl: string;
    }
}
declare module tl3d {
    class MeshDataManager extends ResGC {
        private _loadDic;
        constructor();
        private static _instance;
        static getInstance(): MeshDataManager;
        getMeshData($url: string, $fun: Function, $batchNum?: number): void;
        loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void;
        private roleResCom($roleRes, $fun);
        gc(): void;
        readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
        readMesh2OneBuffer(byte: ByteArray, meshData: MeshData): void;
        private cloneMeshData(meshData, num);
        private getBindPosMatrix(bindPosAry, $skinMesh);
        private uploadMesh($mesh);
        uploadPbrMesh($mesh: MeshData, $useNormal: boolean): void;
        preLoad($url: string): void;
    }
}
declare module tl3d {
    class ObjDataManager extends ResGC {
        private _loadList;
        constructor();
        private static _instance;
        static getInstance(): ObjDataManager;
        getObjData($url: string, $fun: Function): void;
        registerUrl($url: string): void;
        releaseUrl($url: string): void;
        gc(): void;
        readFloatNrm(byte: ByteArray, vertices: Array<number>): void;
        loadObjCom($byte: ArrayBuffer, $url: string): ObjData;
        readObj2OneBuffer(byte: ByteArray, $objData: ObjData): void;
        creatTBNBuffer($objData: ObjData): void;
    }
}
declare module tl3d {
    class BaseRes extends ResCount {
        static IMG_TYPE: number;
        static OBJS_TYPE: number;
        static MATERIAL_TYPE: number;
        static PARTICLE_TYPE: number;
        static SCENE_TYPE: number;
        static ZIP_OBJS_TYPE: number;
        static PREFAB_TYPE: number;
        static SCENE_PARTICLE_TYPE: number;
        protected _byte: ByteArray;
        protected imgNum: number;
        protected imgLoadNum: number;
        protected _imgComplete: boolean;
        protected _progressFun: Function;
        version: number;
        _imgFun: Function;
        private allImgBytes;
        read($imgFun?: Function): void;
        readZipObj(): void;
        readImg(): void;
        readJpngImg($url: string): void;
        readImgLow(): void;
        loadImg(img: any): void;
        addImg($url: string, img: any): void;
        countImg(): void;
        readObj($srcByte: ByteArray): void;
        readMaterial(): void;
        readParticle(): void;
        readMaterialInfo(): Array<any>;
        static readFloatTwoByte(byte: ByteArray, vertices: Array<number>): void;
        static readFloatOneByte(byte: ByteArray, vertices: Array<number>): void;
        static readIntForTwoByte(byte: ByteArray, indexs: Array<number>): void;
        static readIntForOneByte(byte: ByteArray, indexs: Array<number>): void;
        /**
         * $readType
         * 0 readFloatTwoByte
         * 1 readFloatOneByte
         * 2 readIntForOneByte
         *  */
        static readBytes2ArrayBuffer($byte: ByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType?: number): void;
        static readMaterialParamData(byte: ByteArray): Array<any>;
        allResCom(): void;
    }
}
declare module tl3d {
    class GroupRes extends BaseRes {
        private _fun;
        dataAry: Array<GroupItem>;
        private _objDic;
        private _particleDic;
        private _materialDic;
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNext();
        private readItem(isG);
        initReg(): void;
        destory(): void;
    }
    class GroupItem extends Object3D {
        objUrl: string;
        materialUrl: string;
        particleUrl: string;
        materialInfoArr: Array<any>;
        isGroup: boolean;
        types: number;
    }
}
declare module tl3d {
    class ModelRes extends BaseRes {
        private _fun;
        objUrl: string;
        light: LightVo;
        materialUrl: string;
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNexte();
    }
}
declare module tl3d {
    class SceneResManager extends ResGC {
        private static _instance;
        static getInstance(): SceneResManager;
        clearSceneUseById(parm): void;
        loadSceneRes($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): SceneRes;
        clearSceneUse(curRes: SceneRes): void;
        gc(): void;
    }
}
declare module tl3d {
    class RoleRes extends BaseRes {
        roleUrl: string;
        actionAry: Array<string>;
        private _fun;
        meshBatchNum: number;
        ambientLightColor: Vector3D;
        ambientLightIntensity: number;
        sunLigthColor: Vector3D;
        sunLigthIntensity: number;
        nrmDircet: Vector3D;
        constructor();
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        readMesh(): void;
        private readAction();
        private readNext();
    }
}
declare module tl3d {
    class RoleResLow extends RoleRes {
    }
}
declare module tl3d {
    class SkillRes extends BaseRes {
        skillUrl: string;
        private _fun;
        meshBatchNum: number;
        data: any;
        constructor();
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNext();
        private readData($byte);
        readV3d($byte: ByteArray): Vector3D;
    }
}
declare module tl3d {
    class Shadow {
        _visible: boolean;
        display: Display3dShadow;
        data: Array<number>;
        constructor();
        visible: boolean;
        x: number;
        y: number;
        z: number;
        size: number;
    }
}
declare module tl3d {
    class ShadowManager {
        private static _instance;
        static getInstance(): ShadowManager;
        private _displayList;
        constructor();
        addShadow(): Shadow;
        removeShadow(sd: Shadow): void;
        update(): void;
        private getIdleShadow();
    }
}
declare module tl3d {
    class SoundManager {
        constructor();
        private static _instance;
        static getInstance(): SoundManager;
        private init;
        private audio;
        private _volume;
        playSound(): void;
        initSound(): void;
        stopSound(): void;
        setVolume(val: number): void;
        setSkillVolume(val: number): void;
        private _skillSoundDic;
        private _skillVolume;
        playSkillSound($name: string): void;
    }
}
declare module tl3d {
    class TimeUtil {
        static START_TIME: number;
        static funAry: Array<Function>;
        static timefunAry: Array<TimeFunTick>;
        static outTimeFunAry: Array<TimeFunOut>;
        static time: number;
        static getTimer(nS: number): number;
        static getTimerSecond(): number;
        private static lastTime;
        static saveNowTime(): void;
        static getUseTime(): number;
        static getZeroTime(nS: number): number;
        /**
        * YYYY-mm-DD HH:MM
        **/
        static getLocalTime(nS: number): string;
        /**
        * YYYY-mm-DD
        **/
        static getLocalTime0(nS: number): string;
        /**
        * YYYY-mm-DD HH:MM:SS
        **/
        static getLocalTime1(nS: number): string;
        /**
         * HH:MM:SS
        **/
        static getLocalTime2(nS: number): string;
        /**
         * HH:MM
        **/
        static getLocalTime6(nS: number): string;
        /**
         * MM:SS
        **/
        static getLocalTime3(nS: number): string;
        /**
         * MM分SS秒
         */
        static getLocalTime4(nS: number): string;
        /**
         * HH时MM分SS秒
         */
        static getLocalTime5(nS: number): string;
        static dayTime: number;
        static HourTime: number;
        static MinuteTime: number;
        /**
         * 时间差转换
         * DD天HH时MM分SS秒
         */
        static getDiffTime1(nS: number): string;
        /**
         * HH:MM:SS
        **/
        static getDiffTime2(nS: number): string;
        static zeroStr(num: number): string;
        static getDelayTimeStr($hourtime: number): string;
        static init(): void;
        static addTimeTick($time: number, $fun: Function, $beginTime?: number): void;
        static removeTimeTick($fun: Function): void;
        static addTimeOut($time: number, $fun: Function): void;
        static removeTimeOut($fun: Function): void;
        static hasTimeOut($fun: Function): boolean;
        static addFrameTick($fun: Function): void;
        static hasFrameTick($fun: Function): boolean;
        static removeFrameTick($fun: Function): void;
        static update(): void;
        static removeAllTickOut(): void;
    }
    class TimeFunTick {
        alltime: number;
        time: number;
        fun: Function;
        update(t: number): void;
    }
    class TimeFunOut {
        alltime: number;
        time: number;
        fun: Function;
        update(t: number): boolean;
    }
}
// declare function float2int(value: any): number;
// declare function hexToArgb(expColor: number, is32?: boolean, color?: Vector3D): Vector3D;
// declare function getBaseUrl(): string;
// declare function trim(s: any): String;
// declare function trimLeft(s: any): String;
// declare function trimRight(s: any): String;
// declare function unZip($aryBuf: ArrayBuffer): ArrayBuffer;
// declare function getZipByte($byte: Pan3dByteArray): Pan3dByteArray;
// declare function getModelUrl(name: string): string;
// declare function getUItittleUrl(name: string): string;
// declare function geteqiconIconUrl(name: string): string;
// declare function getMountIconUrl(name: string): string;
// declare function getVipIconUrl(name: number): string;
// declare function getEffectUIUrl(name: string): string;
// declare function TweenMoveTo(taget: any, t: number, vars: any): void;
// /**标准化数字 */
// declare function Snum($num: number): string;
// declare var keyProp: Array<string>;
// declare function getKeyProById($id: number): string;
declare module tl3d {
    class CapsuleVo {
        radius: number;
        height: number;
        constructor($radius: number, $height: number);
    }
}
declare module tl3d {
    class CollisionVo extends Object3D {
        type: number;
        name: string;
        polygonUrl: string;
        data: any;
        radius: number;
        colorInt: number;
        constructor($x?: number, $y?: number, $z?: number);
    }
    class CollisionItemVo {
        friction: number;
        restitution: number;
        isField: boolean;
        collisionItem: Array<CollisionVo>;
    }
    class CollisionType {
        static Polygon: number;
        static BOX: number;
        static BALL: number;
        static Cylinder: number;
        static Cone: number;
    }
}
declare module tl3d {
    class LightVo {
        sunDirect: Array<number>;
        sunColor: Array<number>;
        ambientColor: Array<number>;
        setData(sd: any, sc: any, ac: any): void;
    }
}
declare module tl3d {
    class DualQuatFloat32Array {
        quat: Float32Array;
        pos: Float32Array;
    }
    class AnimData {
        inLoop: number;
        inter: Array<number>;
        bounds: Array<Vector3D>;
        nameHeight: number;
        posAry: Array<Vector3D>;
        matrixAry: Array<Array<Matrix3D>>;
        boneQPAry: Array<Array<DualQuatFloat32Array>>;
        hasProcess: boolean;
        processMesh($skinMesh: SkinMesh): void;
        private makeFrameDualQuatFloatArray($skinMesh);
    }
}
declare module tl3d {
    class BoneSocketData {
        name: string;
        boneName: string;
        index: number;
        x: number;
        y: number;
        z: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
    }
}
declare module tl3d {
    class SkinMesh extends ResCount {
        meshAry: Array<MeshData>;
        bindPosMatrixAry: Array<Matrix3D>;
        bindPosInvertMatrixAry: Array<Matrix3D>;
        boneSocketDic: Object;
        fileScale: number;
        tittleHeight: number;
        hitBox: Vector2D;
        type: number;
        animDic: Object;
        ready: boolean;
        animUrlAry: Array<string>;
        lightData: Array<Array<number>>;
        hitPosItem: Array<Vector3D>;
        allParticleDic: Object;
        url: string;
        hasDestory: boolean;
        makeHitBoxItem(): void;
        addMesh($mesh: MeshData): void;
        loadParticle(): void;
        loadMaterial($fun?: Function): void;
        private loadByteMeshDataMaterial($meshData, $fun?);
        setAction(actionAry: Array<string>, roleUrl: string): void;
        destory(): void;
    }
}
declare module tl3d {
    class Test {
        static IMG_TYPE: number;
        static OBJS_TYPE: number;
        static MATERIAL_TYPE: number;
        type: number;
        name: string;
        age: number;
        private _byte;
        readData($bytes: ByteArray): void;
        writeData(): void;
    }
}

declare module tl3d {
    class Module {
        static registerModule(module);
    }
    class Processor {

    }
}
declare module tl3d {
    class CharAction {
        static STANAD: string;
        static DEATH: string;
        static INJURED: string;
        static ATTACK_01: string;
        static ATTACK_02: string;
        static WALK: string;
        static JUMP: string;
        static STAND_MOUNT: string;
        static WALK_MOUNT: string;
    }
    class ModuleEventManager {
        static addEvent(type, fun, caller);
        static removeEvent(type, fun, caller);
        static dispatchEvent(e);
        static removeEventByTarget(target);
        static removeEventByNameAndTarget(name, context);
    }

    class Base64 {
        static encode(data);
    }
    class AstarUtil {
        static porcessBak(value);
    }
}

declare module scene2d {
    class CanvasPostionModel {
        static getInstance(): CanvasPostionModel;
        resetSize(): void;
        tureMoveV2d: tl3d.Vector2D;
    }
    class GroundModel {
        static getInstance(): GroundModel;
        update(): void;
    }
    class Override2dEngine {
        static htmlScale: number;
        static init(caves);
        static resetSize(w, h);
        static resetViewMatrx3D();
    }
}
declare module scene3d {
    class OverrideEngine {
        static update(): void;
    }
}
declare function getBaseUrl(): string;
declare function getRoleUrl(parm): string;
declare function getModelUrl(parm): string;
declare function getSkillUrl(parm): string;
declare function random(num): number;
declare function float2int(f): number;
declare function getChiNum(value): string;
declare function getUrlParam(value): string;
declare function randomByItem(value): any;



