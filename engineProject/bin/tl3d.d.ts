declare namespace tl3d {
    class UnitFunction {
        static getUItittleUrl(name: string): string;
        static getSkillUrl(name: string): string;
        static getModelUrl(name: string): string;
        static getModelUIUrl(name: string): string;
        static getMapUrl(name: string): string;
        static getBaoxiangUrl(): string;
        static getRoleUrl(name: string): string;
        static getZipMapUrl(name: string): string;
        /**标准化数字 */
        static Snum($num: number): string;
        static getEffectUIUrl(name: string): string;
        static getKeyProById($id: number): string;
    }
}
declare namespace tl3d {
    class CharAction {
        static STANAD: string;
        static WALK: string;
        static DEATH: string;
        static JUMP: string;
        static SIT: string;
        static INJURED: string;
        static ATTACK_01: string;
        static ATTACK_02: string;
        static ATTACK_03: string;
        static ATTACK_04: string;
        static ATTACK_05: string;
        static ATTACK_06: string;
        static ATTACK_010: string;
        static ATTACK_020: string;
        static STAND_MOUNT: string;
        static WALK_MOUNT: string;
        static s_attack_01: string;
    }
}
declare namespace tl3d {
    class Engine {
        static canvas: HTMLCanvasElement;
        static init($caves: HTMLCanvasElement): void;
        static resReady(): void;
        static testBlob(): void;
        static initPbr(): void;
        static initShadow(): void;
        static needVertical: Boolean;
        static needInputTxt: boolean;
        static resetSize(a?: number, b?: number): void;
        static sceneCamScale: number;
        static resetViewMatrx3D(): void;
        static update(): void;
        static unload(): void;
    }
}
declare namespace tl3d {
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
        private makeXyzLine;
        private cPos;
        private drawLine;
        resetSize(): void;
    }
}
declare namespace tl3d {
    class BitMapData {
        width: number;
        height: number;
        imgData: ImageData;
        constructor($w: number, $h: number);
        private getIndexByPos;
        setRgb($tx: number, $ty: number, $ve: Vector3D): void;
        getRgb($tx: number, $ty: number): Vector3D;
    }
}
declare namespace tl3d {
    class EventDispatcher {
        protected _eventsMap: Object;
        addEventListener(types: string, listener: Function, thisObject: any): void;
        hasEventListener(type: string): boolean;
        removeEventListener(type: string, listener: Function, thisObject: any): void;
        removeEventListenerByName(type: string): void;
        removeEventListenerByTarget(thisObject: any): void;
        removeEventListenerByNameAndTarget(type: string, thisObject: any): void;
        dispatchEvent(event: BaseEvent): boolean;
    }
}
declare namespace tl3d {
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
        toStringout(): String;
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        set z(value: number);
        get z(): number;
        set scale(value: number);
        set scaleX(value: number);
        get scaleX(): number;
        set scaleY(value: number);
        get scaleY(): number;
        set scaleZ(value: number);
        get scaleZ(): number;
        set rotationX(value: number);
        get rotationX(): number;
        set rotationY(value: number);
        get rotationY(): number;
        set rotationZ(value: number);
        get rotationZ(): number;
        get px(): number;
        set px(val: number);
        get py(): number;
        set py(val: number);
        get pz(): number;
        set pz(val: number);
        updateMatrix(): void;
        updateRotationMatrix(): void;
    }
}
declare namespace tl3d {
    class Camera3D extends Object3D {
        cameraMatrix: Matrix3D;
        private _distance;
        lookAtTarget: Object3D;
        private _astarRect;
        offset: Vector3D;
        constructor();
        get distance(): number;
        set distance(value: number);
        lookAt($target: Object3D): void;
        private _midPos;
        private _scaleVec;
        set astarRect(value: Rectangle);
        private lastFoucs3D;
        needChange: boolean;
        update(): void;
        get postion(): Vector3D;
    }
}
declare namespace tl3d {
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
interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}
declare namespace tl3d {
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
declare namespace tl3d {
    class GC {
        destory(): void;
    }
}
declare namespace tl3d {
    class ResCount extends GC {
        protected _useNum: number;
        idleTime: number;
        static GCTime: number;
        get useNum(): number;
        set useNum(n: number);
        clearUseNum(): void;
    }
}
declare namespace tl3d {
    class ObjData extends ResCount {
        vertices: Array<number>;
        uvs: Array<number>;
        indexs: Array<number>;
        lightuvs: Array<number>;
        normals: Array<number>;
        tangents: Array<number>;
        bitangents: Array<number>;
        collision: CollisionItemVo;
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
declare namespace tl3d {
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
        bindPosAry: Array<Array<number>>;
        bindPosMatrixAry: Array<Matrix3D>;
        bindPosInvertMatrixAry: Array<Matrix3D>;
        getBindPosMatrix(): void;
        destory(): void;
    }
    class BindParticle {
        url: string;
        socketName: string;
        constructor($url: string, $socketName: string);
    }
}
declare namespace tl3d {
    class ResGC {
        _dic: Object;
        constructor();
        gc(): void;
    }
}
declare namespace tl3d {
    class Context3D {
        renderContext: WebGLRenderingContext;
        _contextSetTest: ContextSetTest;
        private nullBuff;
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
declare namespace tl3d {
    class Scene_data {
        static context3D: Context3D;
        static canvas3D: HTMLCanvasElement;
        static stageWidth: number;
        static stageHeight: number;
        static sceneViewHW: number;
        static fileRoot: string;
        static fileSub: string;
        static soundPath: string;
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
        static light: LightVo;
        static scaleLight: Array<number>;
        static useByte: Boolean;
        static fogColor: Array<number>;
        static fogData: Array<number>;
        static gameAngle: number;
        static sceneNumId: number;
        static fbo: FBO;
        static set viewMatrx3D(value: Matrix3D);
        static get viewMatrx3D(): Matrix3D;
        static supportBlob: boolean;
    }
}
interface IShader {
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
    encode($context: WebGLRenderingContext): void;
    binLocation($context: WebGLRenderingContext): void;
}
declare namespace tl3d {
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
declare namespace tl3d {
    class Display3D extends Object3D {
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        beginTime: number;
        type: number;
        protected _onStage: boolean;
        sceneVisible: boolean;
        protected _hasDestory: boolean;
        _scene: tl3d.SceneManager;
        constructor();
        update(): void;
        get onStage(): boolean;
        addStage(): void;
        removeStage(): void;
        resize(): void;
        destory(): void;
    }
}
declare namespace tl3d {
    class BaseDiplay3dShader extends Shader3D {
        static BaseDiplay3dShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class BaseDiplay3dSprite extends Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        update(): void;
    }
}
declare namespace tl3d {
    export class Display2DSprite extends Display3D {
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
    class Sprite extends Object3D {
        posData: Array<number>;
        uvData: UIRectangle;
        setPos(xpos: number, ypos: number, zpos: number): void;
        set scale(value: number);
        get scale(): number;
        set x(value: number);
        set y(value: number);
        set z(value: number);
    }
    export {};
}
declare namespace tl3d {
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
        addStage(): void;
        removeStage(): void;
    }
}
declare namespace tl3d {
    class Display3DSky extends Display3D {
        objurl: string;
        cubeTextList: Array<WebGLTexture>;
        constructor();
        setObjUrl(value: string): void;
        setCubeUrl(value: string): void;
        update(): void;
    }
}
declare namespace tl3d {
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
        aabb: QuadTreeNode;
        dynamic: boolean;
        constructor();
        private _aabbVect;
        get aabbVect(): Array<Vector3D>;
        setObjUrl(value: string): void;
        baseTexture: TextureRes;
        setPicUrl($str: string): void;
        setLightMapUrl(value: string): void;
        get lightMapTexture(): WebGLTexture;
        setMaterialUrl(value: string, $paramData?: Array<any>): void;
        get lightProbe(): boolean;
        set lightProbe(value: boolean);
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
    }
}
declare namespace tl3d {
    class Display3DUISprite extends Display3DSprite {
        private uiMatrix;
        private uiViewMatrix;
        private modelRes;
        constructor();
        private loadRes;
        loadResComFinish(): void;
        loadGroup($name: string): void;
        private loadPartRes;
        resize(): void;
        setCam(): void;
        update(): void;
    }
}
declare namespace tl3d {
    class Display3dMovie extends Display3DSprite implements IBind {
        private _meshUrl;
        protected _skinMesh: SkinMesh;
        protected _animDic: Object;
        protected _preLoadActionDic: Object;
        protected _waitLoadActionDic: Object;
        protected _completeState: number;
        protected _completecb: Function;
        protected _optCbTime: number;
        protected _optCbCurTime: number;
        protected _defaultAction: string;
        protected _comboBackAction: string;
        private _curentAction;
        protected _curentFrame: number;
        protected _actionTime: number;
        isBreak: boolean;
        protected _partDic: Object;
        protected _partUrl: Object;
        private _capsule;
        showCapsule: boolean;
        protected _enablePhysics: boolean;
        protected _shadow: Shadow;
        protected _fileScale: number;
        private _roleRes;
        _hasDestory: boolean;
        private _curMeshUrl;
        private _curMeshLoadCom;
        /**正在播放的技能*/
        _isSinging: boolean;
        get isSinging(): boolean;
        set isSinging(value: boolean);
        meshVisible: boolean;
        constructor();
        get curentAction(): string;
        set curentAction(value: string);
        fixAstartData(pos: Vector2D): void;
        setRoleUrl(value: string, $cb?: Function): void;
        onMeshLoaded(): void;
        clearMesh(): void;
        addSkinMeshParticle(): void;
        removeSkinMeshParticle(): void;
        private roleResCom;
        setMeshUrl(value: string, $batchNum?: number): void;
        private _nextScale;
        set scale(value: number);
        get scale(): number;
        set fileScale(value: number);
        set shadow(value: boolean);
        setShadowSize(value: number): void;
        addStage(): void;
        removeStage(): void;
        loadMaterialCom($material: Material): void;
        setCollision($radius: number, $height: number): void;
        applyVisible(): void;
        removePart($key: string): void;
        /**
            部位，路径，类型 1为粒子 0为其他
        */
        addPart($key: string, $bindSocket: string, $url: string): void;
        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
        protected getFrameMatrix(index: number): Matrix3D;
        addAction(name: string, url: string, needPerLoad?: boolean): void;
        setAnimUrl(name: string, url: string): void;
        randomPlayAction(): void;
        play($action: string, $completeState?: number, needFollow?: boolean, comboBackAction?: string, cb?: Function): boolean;
        private processAnimByMesh;
        update(): void;
        updateFrame(t: number): void;
        protected changeAction($action: string): void;
        destory(): void;
        private capsuleLineSprite;
        updateShowCapsule(): void;
        private drawBall;
        private drawCylinder;
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
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        set z(value: number);
        get z(): number;
        changePos(): void;
    }
}
declare namespace tl3d {
    class Display3dBatchMovie extends Display3dMovie {
        batchNum: number;
        batchPos: Array<Movie3D>;
        constructor();
        set fileScale(value: number);
        addSun($obj: Movie3D): void;
        setVcMatrix($mesh: MeshData): void;
        setLightProbeVc($material: Material): void;
        setVa($mesh: MeshData): void;
        addStage(): void;
        removeStage(): void;
    }
    class Movie3D extends Object3D {
        private _shadow;
        posData: Array<number>;
        retinueShadowFix: Vector3D;
        target: Vector3D;
        hasReach: boolean;
        set shadow(value: boolean);
        _fileScale: number;
        set fileScale(value: number);
        set scale(value: number);
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        set z(value: number);
        get z(): number;
        add(): void;
        remove(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
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
declare namespace tl3d {
    interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
    interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }
}
declare namespace tl3d {
    class GroundDataMesh {
        tx: number;
        ty: number;
        idBitmap: BitMapData;
        infoBitmap: BitMapData;
        sixurl: string;
        private mekeUseTexture;
        calibration(): void;
        static meshAllgroundData($byte: TLByteArray): Array<GroundDataMesh>;
    }
    class TerrainDisplay3DSprite extends Display3DSprite {
        private groundShader;
        private baseSixteenRes;
        private idMapPicDataTexture;
        private infoMapPicDataTexture;
        constructor();
        update(): void;
        private upDataToDraw;
        setGrounDataMesh($groundDataMesh: GroundDataMesh): void;
    }
}
declare namespace tl3d {
    class BaseEvent {
        type: string;
        target: EventDispatcher;
        constructor($type: string);
        static COMPLETE: string;
    }
}
/**
*
*
* pramaType 0 表示无类型 1表示 float 2表示 vec2 3表示vec3
*/
declare namespace tl3d {
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
        set id(value: number);
        get id(): number;
        creat($vc: Float32Array): void;
        setData(obj: any): void;
        setDynamicOffset($dynamic: DynamicBaseConstItem): void;
        setDynamicDirect($ary: Array<number>, $offset: any): void;
        setDynamic($dynamic: DynamicBaseConstItem): void;
    }
}
declare namespace tl3d {
    class DynamicBaseConstItem {
        target: ConstItem;
        paramName: string;
        currentValue: Array<number>;
        targetOffset: number;
        protected _type: number;
        update(t?: number): void;
        get type(): number;
        set type(value: number);
        setTargetInfo($target: ConstItem, $paramName: string, $type: number): void;
        setCurrentVal(...args: any[]): void;
    }
}
declare namespace tl3d {
    class DynamicBaseTexItem {
        target: TexItem;
        paramName: string;
        textureRes: TextureRes;
        destory(): void;
        get texture(): WebGLTexture;
    }
}
declare namespace tl3d {
    class DynamicConstItem extends DynamicBaseConstItem {
        curve: Curve;
        update(t?: number): void;
        set type(value: number);
    }
}
declare namespace tl3d {
    class DynamicTexItem extends DynamicBaseTexItem {
        url: string;
        private _textureDynamic;
        isParticleColor: boolean;
        curve: Curve;
        private _life;
        constructor();
        destory(): void;
        initCurve($type: number): void;
        get texture(): WebGLTexture;
        creatTextureByCurve(): void;
        get life(): number;
        set life(value: number);
    }
}
declare namespace tl3d {
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
        setByteData(byte: TLByteArray): void;
        private readConstLis;
        private readTexList;
        destory(): void;
    }
}
declare namespace tl3d {
    class MaterialBaseParam extends GC {
        material: Material;
        dynamicTexList: Array<any>;
        dynamicConstList: Array<any>;
        destory(): void;
        update(): void;
        setData($material: Material, $ary: Array<any>): void;
    }
}
declare namespace tl3d {
    export class MaterialManager extends ResGC {
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
        private meshByteMaterialByt;
        loadMaterialByteCom($data: ArrayBuffer, _info: MaterialLoad): void;
        addResByte($url: string, $data: TLByteArray): void;
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
        private loadMaterial;
        loadDynamicTexUtil(material: MaterialParam): void;
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
    export {};
}
declare namespace tl3d {
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
declare namespace tl3d {
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
        permul: boolean;
        destory(): void;
        set id(value: number);
        get id(): number;
        get texture(): WebGLTexture;
        static LIGHTMAP: number;
        static LTUMAP: number;
        static CUBEMAP: number;
        static HEIGHTMAP: number;
        static REFRACTIONMAP: number;
    }
}
declare namespace tl3d {
    class TextureCube {
    }
}
declare namespace tl3d {
    class TextureManager extends ResGC {
        private _loadDic;
        private _resDic;
        defaultLightMap: WebGLTexture;
        constructor();
        private static _instance;
        static getInstance(): TextureManager;
        hasTexture($url: string): boolean;
        /**
         * 获取贴图
         * @param 地址
         * @param fun 回调
         * @param wrapType
         * @param info
         * @param filteType
         * @param mipmapType
         */
        getTexture($url: string, $fun: Function, $wrapType?: number, $info?: any, $filteType?: number, $mipmapType?: number): void;
        private loadTextureCom;
        addRes($url: string, $img: any): void;
        removeRes($url: string): void;
        getCanvasTexture(ctx: CanvasRenderingContext2D): TextureRes;
        updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void;
        loadCubeTexture($url: string, $fun: Function): void;
        initDefaultLightMapTexture(): void;
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
declare namespace tl3d {
    class TextureRes extends ResCount {
        texture: WebGLTexture;
        width: number;
        height: number;
        url: string;
        constructor(url?: string);
        destory(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class Circle {
        _x: number;
        _y: number;
        radius: number;
        constructor($x?: number, $y?: number, $radius?: number);
        setData($x: number, $y: number, $radius: number): void;
        setPos($x: number, $y: number): void;
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        setRadius($radius: number): void;
        testPoint($point: Vector2D): boolean;
    }
}
declare namespace tl3d {
    class Groundposition {
        constructor();
        private static _plantObjectMath;
        private static _plantnormal;
        private static _plane_a;
        static getGroundPos($x: number, $y: number): Vector3D;
    }
}
declare namespace tl3d {
    class MathClass {
        constructor();
        static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array;
        static SetShock: boolean;
        private static camOffSetShock;
        static updateVp(): void;
        static MathCam(_Cam: Camera3D): void;
        static viewBoxVecItem: Array<Vector3D>;
        static lastViewScale: Vector2D;
        static GetViewHitBoxData($far: number): void;
        static GetViewHitBoxDataCopy($dis: number): void;
        private static gettempPos;
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
declare namespace tl3d {
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
        private static gettempPos;
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
        private static getLineAndPlaneIntersectPoint;
        static lookAt(eyePos: Vector3D, lookAt: Vector3D): Matrix3D;
        /**
         *  功能:根据两个点返回角度
         *  参数:
         **/
        static getTowPointsAngle2(x1: number, y1: number, x2: number, y2: number): number;
        /**
         * 返回两点的夹角
         * @param $p0
         * @param $p1
         * @return
         */
        static getTowPointsAngle($p0: Laya.Point, $p1: Laya.Point): number;
        /** 返回两个点的距离
         *  **/
        static getDisSquare(x1: number, y1: number, x2: number, y2: number): number;
    }
}
declare namespace tl3d {
    class Matrix3D {
        m: Float32Array;
        isIdentity: boolean;
        constructor();
        static tempM: Matrix3D;
        clone($target?: Matrix3D): Matrix3D;
        get position(): Vector3D;
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
        get x(): number;
        get y(): number;
        get z(): number;
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
declare namespace tl3d {
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
declare namespace tl3d {
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
/**
 * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
 * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
 * @class egret.Endian
 * @classdesc
 */
declare namespace tl3d {
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
    class TLByteArray {
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
        private _setArrayBuffer;
        setdata(srcByte: TLByteArray): void;
        get buffer(): ArrayBuffer;
        /**
         * @private
         */
        set buffer(value: ArrayBuffer);
        get dataView(): DataView;
        /**
         * @private
         */
        set dataView(value: DataView);
        /**
         * @private
         */
        get bufferOffset(): number;
        getByte(i: number): number;
        setByte(i: number, num: number): void;
        /**
         * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
         * @member {number} ByteArray#position
         */
        get position(): number;
        set position(value: number);
        reset(): void;
        optcode: number;
        /**
         * ByteArray 对象的长度（以字节为单位）。
         * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
         * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
         * @member {number} ByteArray#length
         */
        get length(): number;
        set length(value: number);
        /**
         * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
         * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
         * @member {number} ByteArray#bytesAvailable
         */
        get bytesAvailable(): number;
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
        readBytes(bytes: TLByteArray, offset?: number, length?: number): void;
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
        writeBytes(bytes: TLByteArray, offset?: number, length?: number): void;
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
        readVector3D($w?: boolean): tl3d.Vector3D;
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
        private validateBuffer;
        /**
         * UTF-8 Encoding/Decoding
         */
        private encodeUTF8;
        private decodeUTF8;
        private encoderError;
        private decoderError;
        private EOF_byte;
        private EOF_code_point;
        private inRange;
        private div;
        private stringToCodePoints;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class Vector2D {
        x: number;
        y: number;
        constructor($x?: number, $y?: number);
        normalize(): void;
        get length(): number;
        scaleBy(value: number): void;
        sub(val: Vector2D): Vector2D;
        add(val: Vector2D): Vector2D;
        toString(): String;
        static distance(p1: Vector2D, p2: Vector2D): number;
        subtract(value: Vector2D): Vector2D;
    }
}
declare namespace tl3d {
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
        get length(): number;
        scaleBy(value: number): void;
        divideScalar(value: number): void;
        distanceToSquared(v: Vector3D): number;
        scaleByW(): void;
        add(value: Vector3D): Vector3D;
        subtract(value: Vector3D): Vector3D;
        addByNum($x: number, $y: number, $z: number, $w?: number): void;
        setTo($x: number, $y: number, $z: number): void;
        setByte(byte: TLByteArray): void;
        cross(value: Vector3D): Vector3D;
        dot(value: Vector3D): number;
        clone(): Vector3D;
        static distance(v1: Vector3D, v2: Vector3D): number;
        toString(): String;
    }
}
declare namespace tl3d {
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
        onComplete: Function;
        hasDestory: boolean;
        timeScale: number;
        constructor();
        get displayAry(): Array<Display3DParticle>;
        set displayAry(value: Array<Display3DParticle>);
        set maxTime(value: number);
        set bindTarget(value: IBind);
        set bindSocket(value: string);
        set x(value: number);
        set y(value: number);
        set z(value: number);
        get x(): number;
        get y(): number;
        get z(): number;
        setPos($xpos: number, $ypos: number, $zpos: number): void;
        setMulPos(ary: Array<Array<Array<number>>>): void;
        set scaleX(value: number);
        get scaleX(): number;
        set scaleY(value: number);
        get scaleY(): number;
        set scaleZ(value: number);
        get scaleZ(): number;
        set rotationX(value: number);
        set rotationY(value: number);
        set rotationZ(value: number);
        applyRotation(): void;
        setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void;
        setDataByte(byte: TLByteArray): void;
        addPrticleItem($dis: Display3DParticle): void;
        private getDisplay3DById;
        setData(ary: Array<any>): void;
        updateTime(t: number): void;
        updateBind(): void;
        reset(): void;
        update(): void;
        updateItem(idx: number): void;
        get size(): number;
        private getDisplay3D;
        destory(): void;
    }
}
declare namespace tl3d {
    class CombineParticleData extends ResCount {
        maxTime: number;
        dataAry: Array<ParticleData>;
        destory(): void;
        getCombineParticle(): CombineParticle;
        setDataByte(byte: TLByteArray): void;
        private getParticleDataType;
    }
}
declare namespace tl3d {
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
        private get cantUseEffectsLev();
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
        setAllByteInfo($byte: TLByteArray, version?: number): void;
        creatData(): void;
        setTimeLine($tl: TimeLine): void;
        destory(): void;
    }
}
declare namespace tl3d {
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
        setAllByteInfo($byte: TLByteArray): void;
        private set materialByteUrl(value);
        private onMaterialLoad;
        private readMaterialPara;
        private readTempCurve;
        private readItems;
        private makeCurveData;
        private getBzData;
        private drawbezier;
        private mathmidpoint;
        private readMaterialParaConAry;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
    }
}
declare namespace tl3d {
    class ParticleGpuData extends ObjData {
    }
}
declare namespace tl3d {
    class ParticleManager extends ResGC {
        private static _instance;
        static getInstance(): ParticleManager;
        constructor();
        getParticleByte($url: string): CombineParticle;
        registerUrl($url: string): void;
        releaseUrl($url: string): void;
        addResByte($url: string, $data: TLByteArray): void;
    }
}
declare namespace tl3d {
    class Display3DBallPartilce extends Display3DParticle {
        constructor();
        get balldata(): ParticleBallData;
        creatData(): void;
        setVa(): void;
        setVaCompress(): void;
        resetVa(): void;
        setVc(): void;
        updateWatchCaramMatrix(): void;
        updateAllRotationMatrix(): void;
        get particleBallData(): ParticleBallGpuData;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
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
        setAllByteInfo($byte: TLByteArray): void;
        private readRandomColor;
        get objBallData(): ParticleBallGpuData;
        uploadGpu(): void;
        private initBaseData;
        makeRectangleData(verterList: Array<number>, uvAry: Array<number>, width: number, height: number, offsetX?: number, offsetY?: number, isUV?: boolean, isU?: boolean, isV?: boolean, animLine?: number, animRow?: number, indexID?: number): void;
        initBasePos(): void;
        initSpeed(): void;
        initSelfRotaion(): void;
        initBaseColor(): void;
        protected pushToGpu(): void;
        private compressVertex;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        initVcData(): void;
        regShader(): void;
        getShaderParam(): Array<number>;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
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
        get modeldata(): ParticleBoneData;
        creatData(): void;
        update(): void;
        private skipNum;
        setVc(): void;
        setVa(): void;
        resetVa(): void;
    }
}
declare namespace tl3d {
    class ParticleBoneData extends ParticleData {
        _maxAnimTime: number;
        getParticle(): Display3DParticle;
        destory(): void;
        meshData: MeshData;
        animData: AnimData;
        objScale: number;
        setAllByteInfo($byte: TLByteArray): void;
        initVcData(): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        private readFrameQua;
        uploadGpu(): void;
        private uploadMesh;
        regShader(): void;
    }
}
declare namespace tl3d {
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
        set data(value: Array<any>);
        get isDeath(): boolean;
        set isDeath(value: boolean);
        getAllNum(allTime: number): void;
    }
}
declare namespace tl3d {
    class AxisMove extends BaseAnim {
        axis: Vector3D;
        set data(value: Array<any>);
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}
declare namespace tl3d {
    class AxisRotaion extends BaseAnim {
        axis: Vector3D;
        axisPos: Vector3D;
        set data(value: Array<any>);
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}
declare namespace tl3d {
    class KeyFrame {
        frameNum: number;
        animData: Array<any>;
        baseValue: Array<any>;
        constructor();
    }
}
declare namespace tl3d {
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
        set data(value: Array<any>);
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}
declare namespace tl3d {
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
        set data(value: Array<any>);
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
        reset(): void;
        depthReset(): void;
    }
}
declare namespace tl3d {
    class ScaleNoise extends BaseAnim {
        amplitude: number;
        coreCalculate(): void;
        set data(value: Array<any>);
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}
declare namespace tl3d {
    class SelfRotation extends BaseAnim {
        set data(value: Array<any>);
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}
declare namespace tl3d {
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
        private getTarget;
        enterKeyFrame(ary: Array<any>, baseTime?: number, baseValueAry?: Array<number>): void;
        reset(): void;
        private isByteData;
        setAllByteInfo($byte: TLByteArray, $allObj: any): void;
        setAllDataInfo($data: TimeLineData): void;
        private setBaseTimeByte;
        private getByteDataTemp;
        /**
         * 获取最大的帧数
         * @return 最大帧数
         *
         */
        getMaxFrame(): number;
        dispose(): void;
    }
}
declare namespace tl3d {
    class TimeLineData {
        dataAry: Array<any>;
        maxFrameNum: number;
        beginTime: number;
        destory(): void;
        setByteData($byte: TLByteArray): void;
        addKeyFrame(num: number): KeyFrame;
        private getByteDataTemp;
    }
}
declare namespace tl3d {
    class Display3DFacetParticle extends Display3DParticle {
        private _lifeVisible;
        private _resultUvVec;
        constructor();
        get facetdata(): ParticleFacetData;
        creatData(): void;
        update(): void;
        reset(): void;
        setVc(): void;
        setVa(): void;
        updateRotaionMatrix(): void;
        updateUV(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class ParticleFacetData extends ParticleData {
        _maxAnimTime: number;
        _lockx: boolean;
        _locky: boolean;
        _isCycle: boolean;
        setAllByteInfo($byte: TLByteArray): void;
        getParticle(): Display3DParticle;
        uploadGpu(): void;
        private makeRectangleData;
        initVcData(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        regShader(): void;
    }
}
declare namespace tl3d {
    class Display3DFollowPartilce extends Display3DBallPartilce {
        private _bindMatrixAry;
        private _bindFlagAry;
        private flag;
        constructor();
        get followdata(): ParticleFollowData;
        creatData(): void;
        onCreated(): void;
        setVc(): void;
        private initBingMatrixAry;
        updateBind(): void;
        updateMatrix(): void;
        updateAllRotationMatrix(): void;
        reset(): void;
        updateWatchCaramMatrix(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class ParticleFollowData extends ParticleBallData {
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TLByteArray): void;
        regShader(): void;
    }
}
declare namespace tl3d {
    class Display3DFollowLocusPartilce extends Display3DParticle {
        protected _bindPosAry: Array<Array<number>>;
        protected _gpuVc: Float32Array;
        protected _caramPosVec: Array<number>;
        constructor();
        get followlocusdata(): ParticleFollowLocusData;
        creatData(): void;
        onCreated(): void;
        protected initBindMatrixAry(): void;
        setVa(): void;
        setVc(): void;
        setBindPosVc(): void;
        reset(): void;
        updateMatrix(): void;
        resetPos(): void;
        protected flag: number;
        static waitCdTime: number;
        updateBind(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class ParticleFollowLocusData extends ParticleData {
        _fenduanshu: number;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TLByteArray): void;
        uploadGpu(): void;
        protected pushToGpu(): void;
        initVcData(): void;
        regShader(): void;
    }
}
declare namespace tl3d {
    class Display3DLocusPartilce extends Display3DParticle {
        constructor();
        get locusdata(): ParticleLocusData;
        creatData(): void;
        setVa(): void;
        setVc(): void;
        updateUV(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
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
        setAllByteInfo($byte: TLByteArray): void;
        initUV(): void;
        uploadGpu(): void;
        regShader(): void;
        initVcData(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
    }
}
declare namespace tl3d {
    class Display3DLocusBallPartilce extends Display3DBallPartilce {
        constructor();
        creatData(): void;
    }
}
declare namespace tl3d {
    class ParticleLocusballData extends ParticleBallData {
        protected _posAry: Array<number>;
        protected _angleAry: Array<number>;
        protected _tangentAry: Array<number>;
        protected _tangentSpeed: number;
        getParticle(): Display3DParticle;
        initBasePos(): void;
        initSpeed(): void;
        setAllByteInfo($byte: TLByteArray): void;
    }
}
declare namespace tl3d {
    class Display3DModelPartilce extends Display3DParticle {
        protected _resultUvVec: Array<number>;
        constructor();
        get modeldata(): ParticleModelData;
        creatData(): void;
        setVc(): void;
        setVa(): void;
        updateWatchCaramMatrix(): void;
        updateUV(): void;
    }
}
declare namespace tl3d {
    class Display3DModelObjParticle extends Display3DModelPartilce {
        protected _depthMode: boolean;
        constructor();
        update(): void;
    }
}
declare namespace tl3d {
    class Display3dModelAnimParticle extends Display3DModelPartilce {
        constructor();
        updateUV(): void;
    }
}
declare namespace tl3d {
    class ParticleModelData extends ParticleData {
        _maxAnimTime: number;
        _depthMode: number;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: TLByteArray): void;
        initVcData(): void;
        uploadGpu(): void;
        regShader(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
    }
}
declare namespace tl3d {
    class BuildShader extends Shader3D {
        static buildShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class Display3DShadowShader extends Shader3D {
        static Display3DShadowShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class MaterialBatchAnimShader extends Shader3D {
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class MaterialShader extends Shader3D {
        static MATERIAL_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        outstr(str: string): void;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class Movie2DShader extends Shader3D {
        static MOVIE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class ProgrmaManager extends ResGC {
        private static _instance;
        constructor();
        static getInstance(): ProgrmaManager;
        getProgram($str: string): Shader3D;
        registe($str: any, $shader3D: Shader3D): void;
        getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
        outShader($str: string): void;
    }
}
declare namespace tl3d {
    class SkyShader extends Shader3D {
        static Sky_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class Sprite2DShader extends Shader3D {
        static SPRITE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class TerrainDisplay3DShader extends Shader3D {
        static TerrainDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class UIImageShader extends Shader3D {
        static UI_IMG_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class UIMaskShader extends Shader3D {
        static UI_MASK_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class UIShader extends Shader3D {
        static UI_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
    class SceneManager {
        get displayList(): Array<Display3D>;
        fbo: tl3d.FBO;
        light: tl3d.LightVo;
        startTime: number;
        protected _displayList: Array<Display3D>;
        protected _display2DList: Array<Display3D>;
        protected _displaySpriteList: Array<Display3DSprite>;
        protected _displayRoleList: Array<Display3dMovie>;
        protected _time: number;
        protected _ready: boolean;
        render: boolean;
        protected _sceneDic: Object;
        protected _sceneQuadTree: SceneQuadTree;
        protected _currentUrl: string;
        shadowMgr: ShadowManager;
        groupDataMgr: GroupDataManager;
        skillMgr: SkillManager;
        mapData: Object;
        bloodMgr: BloodManager;
        constructor();
        get displayRoleList(): Array<Display3dMovie>;
        get displaySpriteList(): Array<Display3DSprite>;
        testUrl($url: string): boolean;
        loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void;
        private addSceneImgBg;
        getDisplayByID($type: number, $id: number): any;
        fixAstart(pos: Vector2D): void;
        setFogData(obj: any): void;
        loadSceneConfigCom(obj: any): void;
        private getGroundSprite;
        private makeCollisioin;
        set ready($value: boolean);
        get ready(): boolean;
        private getBuildSprite;
        private getParticleSprite;
        private initScene;
        addDisplay($display: Display3D): void;
        removeDisplay($display: Display3D): void;
        /**
         * 动态添加的staticMesh 物件例如武器等
        */
        addSpriteDisplay($display: Display3DSprite): void;
        removeSpriteDisplay($display: Display3DSprite): void;
        addMovieDisplayTop($display: Display3dMovie): void;
        private setParticleVisible;
        cameraMatrix: tl3d.Matrix3D;
        viewMatrx3D: tl3d.Matrix3D;
        static mapQudaTreeDistance: number;
        upFrame(): void;
        updateFBO(): void;
        addDisplay2DList($dis: Display3D): void;
        private mathCamFar;
        protected updateStaticDiplay(): void;
        protected updateStaticBind(): void;
        protected updateSpriteDisplay(): void;
        protected updateMovieDisplay(): void;
        protected updateMovieFrame(): void;
        changeBloodManager($bloodManager: BloodManager): void;
        addMovieDisplay($display: Display3dMovie): void;
        clearStaticScene(): void;
        playLyf($url: string, $pos: tl3d.Vector3D, $r?: number, $scale?: number): void;
        charPlaySkill($char: Display3dMovie, $skillfile: string, $skilleff?: string, $cb?: Function): Skill;
        removeCharSkill($skill: Skill): void;
        removeAllMovieDisplay(): void;
        removeMovieDisplay($display: any): void;
        private onPlayCom;
        private _particleList;
        private _particletime;
        updateParticles(): void;
        clearPaticleVa(): void;
        setParticleHide(): void;
        get particleList(): Array<CombineParticle>;
        updateParticleTime(): void;
        private renderDic;
        private addRenderDic;
        private removeRenderDic;
        private updateRenderDic;
        addParticle($particle: CombineParticle): void;
        removeParticle($particle: CombineParticle): void;
        clearAllParticle(): void;
    }
}
declare namespace tl3d {
    class BaseRes extends ResCount {
        static IMG_TYPE: number;
        static OBJS_TYPE: number;
        static MATERIAL_TYPE: number;
        static PARTICLE_TYPE: number;
        static SCENE_TYPE: number;
        static ZIP_OBJS_TYPE: number;
        static PREFAB_TYPE: number;
        static SCENE_PARTICLE_TYPE: number;
        protected _byte: TLByteArray;
        protected imgNum: number;
        protected imgLoadNum: number;
        protected _imgComplete: boolean;
        protected _progressFun: Function;
        version: number;
        _imgFun: Function;
        private allImgBytes;
        read($imgFun?: Function): void;
        readZipObj(): void;
        /**
         * h5微端解析效率很高
         */
        readImg(): void;
        readJpngImg($url: string): void;
        private urlCache;
        readImgLow(): void;
        loadImg(img: any): void;
        addImg($url: string, img: any): void;
        countImg(): void;
        readObj($srcByte: TLByteArray): void;
        readMaterial(): void;
        readParticle(): void;
        readMaterialInfo(): Array<any>;
        static readFloatTwoByte(byte: TLByteArray, vertices: Array<number>): void;
        static readFloatOneByte(byte: TLByteArray, vertices: Array<number>): void;
        static readIntForTwoByte(byte: TLByteArray, indexs: Array<number>): void;
        static readIntForOneByte(byte: TLByteArray, indexs: Array<number>): void;
        /**
         * $readType
         * 0 readFloatTwoByte
         * 1 readFloatOneByte
         * 2 readIntForOneByte
         *  */
        static readBytes2ArrayBuffer($byte: TLByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType?: number): void;
        static readMaterialParamData(byte: TLByteArray): Array<any>;
        allResCom(): void;
    }
}
declare namespace tl3d {
    class SceneRes extends BaseRes {
        static sceneConfigData: any;
        private _completeFun;
        private _readDataFun;
        protected _progressFun: Function;
        sceneData: any;
        load($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): void;
        loadZipMap(name: string, size: number): void;
        isNeedReload(): boolean;
        loadComplete($byte: ArrayBuffer): void;
        applyByteArray(): void;
        readNext(): void;
        readScene(): void;
        private _terrainDataItem;
        private readTerrainIdInfoBitmapData;
        private _astarDataMesh;
        private readAstat;
        private readAstarFromByte;
        countImg(): void;
        allResCom(): void;
        destory(): void;
    }
}
declare namespace tl3d {
    class LineDisplayShader extends Shader3D {
        static LineShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
declare namespace tl3d {
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
        private getSprite;
        update(): void;
        upToGpu(): void;
        clear(): void;
    }
    class GridLineSprite extends LineDisplaySprite {
        constructor();
        private makeGridData;
    }
}
declare namespace tl3d {
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
        testViewFrustum(face: Array<Vector3D>, ray: Ray): void;
        testViewFrustumResult(face: Array<Vector3D>): boolean;
        testRay(ray: Ray): boolean;
    }
    class Ray {
        o: Vector3D;
        d: Vector3D;
        baseT: number;
        setPos(x: number, y: number, z: number): void;
        setTarget(x: number, y: number, z: number): void;
    }
}
declare namespace tl3d {
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
        private getPanelByVec;
        private capsuleLineSprite;
        updateDraw(): void;
        private drawCylinder;
    }
}
declare namespace tl3d {
    class Skill extends ResCount {
        protected skillVo: SkillVo;
        name: string;
        key: string;
        isDeath: boolean;
        keyAry: Array<SkillKey>;
        completeNum: number;
        src: boolean;
        active: Object3D;
        completeFun: Function;
        actionCompleteFun: Function;
        time: number;
        static MaxTime: number;
        targetFlag: number;
        targetShockFlag: number;
        trajectoryAry: Array<SkillTrajectory>;
        protected _skillData: SkillData;
        batterObj: any;
        tbSkillId: number;
        soundPlay: boolean;
        needSound: boolean;
        needShock: boolean;
        hasDestory: boolean;
        actionEnd: boolean;
        skillMgr: SkillManager;
        constructor(skillMgr: SkillManager);
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
        private getKeyTarget;
        private getShockTarget;
        private getSound;
        configFixEffect($active: Object3D, $actionCompleteFun?: Function, $completeFun?: Function, $posObj?: Array<Vector3D>): void;
        configTrajectory($active: Object3D, $target: Object3D, $completeFun?: Function, types?: number, $bloodFun?: Function): void;
        configMulTrajectory($activeList: Array<Object3D>, $active: Object3D, $target: Object3D, $completeFun?: Function): void;
        removeTrajectory($skilltra: SkillTrajectory): void;
        destory(): void;
    }
}
declare namespace tl3d {
    class SkillData extends ResCount {
        data: any;
        private srcList;
        skillMgr: SkillManager;
        constructor(skillMgr: SkillManager);
        addSrcSkill($skill: Skill): void;
        destory(): void;
        testDestory(): boolean;
    }
}
declare namespace tl3d {
    class SkillManager extends ResGC {
        _skillDic: Object;
        _loadDic: Object;
        _preLoadDic: Object;
        _skillAry: Array<Skill>;
        protected _time: number;
        scene: SceneManager;
        private _shock;
        constructor(scene: SceneManager);
        update(): void;
        private _callBack;
        preLoadSkill($url: string, callBack?: Function): void;
        loadSkillRes(url: string, $fun: Function): void;
        getSkill($url: string, $name: string, $callback?: Function): Skill;
        protected loadSkillCom($url: string, $skillRes: SkillRes): void;
        addSrc($url: string, skillData: SkillData): void;
        playSkill($skill: Skill): void;
        removeSkill($skill: Skill): void;
        removeAllSkill(): void;
        gcSkill(skill: Skill): void;
        gc(): void;
        get shock(): ShockUtil;
    }
    class ShockUtil {
        constructor();
        private upFun;
        private time;
        private amp;
        private ctime;
        private update;
        shock(time: number, amp: number): void;
        clearShock(): void;
    }
}
declare namespace tl3d {
    class SkillKey {
        time: number;
        particle: CombineParticle;
        removeCallFun: Function;
        skillMgr: SkillManager;
        constructor(skillMgr: SkillManager);
        addToRender(): void;
        setInfo(obj: SkillKeyVo): void;
        protected onPlayCom(): void;
        reset(): void;
        destory(): void;
    }
}
declare namespace tl3d {
    class SkillEffect extends SkillKey {
        constructor(skillMgr: SkillManager);
        private _active;
        set active($val: tl3d.Object3D);
        get active(): tl3d.Object3D;
        addToRender(): void;
        protected onPlayCom(event?: Event): void;
    }
}
declare namespace tl3d {
    class SkillBugBind implements IBind {
        bindMatrix: Matrix3D;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
    class SkillFixEffect extends SkillEffect {
        pos: Vector3D;
        rotation: Vector3D;
        outPos: Vector3D;
        hasSocket: boolean;
        socket: string;
        skill: Skill;
        constructor(skill: Skill);
        setInfo(obj: SkillKeyVo): void;
        protected onPlayCom(event?: Event): void;
        addToRender(): void;
    }
}
declare namespace tl3d {
    class SkillTrajectory extends SkillKey implements IBind {
        active: Object3D;
        target: Object3D;
        data: SkillTrajectoryTargetKeyVo;
        protected _currentPos: Vector3D;
        rotationMatrix: Matrix3D;
        protected _socketMaxrix: Matrix3D;
        protected _currentTargetPos: Vector3D;
        endParticle: CombineParticle;
        protected path: SkillPath;
        constructor(skillMgr: SkillManager);
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
declare namespace tl3d {
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
declare namespace tl3d {
    class PathManager {
        private static dic;
        static reg(types: number, cls: any): void;
        static getNewPath(types: number): any;
        static init(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
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
declare namespace tl3d {
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
declare namespace tl3d {
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
declare namespace tl3d {
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
        private getShockAry;
        private getFixEffect;
        private getTrajectoryDynamicTarget;
    }
    /**
     * 技能类型
     */
    class SkillType {
        static TrajectoryDynamicTarget: number;
        static FixEffect: number;
        static TrajectoryDynamicPoint: number;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class UiTweenVo {
        private _ui;
        private _scale;
        private _baseRect;
        set ui(value: UICompenent);
        get ui(): UICompenent;
        set scale(value: number);
        get scale(): number;
        destory(): void;
        private static baseUIConatiner;
        static getPosByPanel($v2d: Vector2D, $layout?: any, $toUIConatiner?: UIConatiner): Vector2D;
    }
    class UiTweenScale {
        private static _instance;
        static getInstance(): UiTweenScale;
        constructor();
        changeButSize($ui: any): void;
    }
    class UIManager {
        static cando: boolean;
        static popClikNameFun: Function;
        private static _instance;
        static getInstance(): UIManager;
        static uiClikName($name: string, $id: number): void;
        private _uiList;
        _containerList: Array<UIConatiner>;
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
        hasWindowUI(): boolean;
        removeNoInterfaceUI(): void;
        resize(): void;
        upBgGroundZero(): void;
        update(): void;
        regEvent($touce: any): void;
        private onTouch;
        private onMouse;
        private lastSwipeDis;
        private lastSwipeRot;
        interactiveEvent($e: any): void;
        private lastMousePos;
        disMoveNnum(v2d: Vector2D, $num: number): boolean;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
        private _eventItem;
        private setUseMouseEventCon;
        getObjectsUnderPoint(evt: Vector2D): UICompenent;
        private getcurrentList;
        private lastTime;
    }
}
declare namespace tl3d {
    class UIStage extends EventDispatcher {
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class TextAlign {
        static LEFT: string;
        static CENTER: string;
        static RIGHT: string;
        static TOP: string;
        static MIDDLE: string;
        static BOTTOM: string;
    }
}
declare namespace tl3d {
    class UIAtlas {
        textureRes: TextureRes;
        configData: any;
        layoutData: any;
        ctx: CanvasRenderingContext2D;
        private _useImgUrl;
        useImg: any;
        constructor();
        get texture(): WebGLTexture;
        setInfo(configUrl: string, imgUrl: string, $fun: Function, useImgUrl?: string): void;
        loadConfig(configUrl: string, $fun: Function): void;
        loadImgUrl(imgUrl: string, $fun: Function): void;
        loadUseImg($fun: Function): void;
        getRec($name: string): UIRectangle;
        getLayoutData($name: string): any;
        getGridRec($name: string): UIGridRentangle;
        get hasData(): boolean;
        getObject($name: string, $x: number, $y: number, $width: number, $height: number, $maxWidth: number, $maxHeight: number, $cellx?: number, $celly?: number): any;
        updateCtx($ctx: any, xpos: number, ypos: number): void;
        upDataPicToTexture($url: string, $iconName: string): void;
        clearCtxTextureBySkilname($iconName: string): void;
        copyPicToTexture($srcSkin: string, $desSkin: string): void;
        /**
         * 渲染文字
         */
        updateLable($key: string, $str: string, fontsize: number, fontColor: string, textBaseline?: CanvasTextBaseline, textAlign?: CanvasTextAlign, bolder?: boolean, maxWidth?: number): void;
        updateArtNum($targetName: string, $srcName: string, num: number): void;
        writeSingleLabel($key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string): void;
        writeSingleLabelToCxt($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number): void;
        /**
         * 未渲染文字。只是绘制到CanvasRenderingContext2D
         * 返回CanvasRenderingContext2D对象
         */
        updateLableCtx($ctx: CanvasRenderingContext2D, $str: string, $x: number, $y: number, $fontsize: number, $textAlign?: CanvasTextAlign, $textBaseline?: CanvasTextBaseline, $textcolor?: string, $textbolder?: string, $maxWidth?: number): void;
        getTextCtx($rec: UIRectangle, $fontsize: number, $fontColor: string, $bolder: boolean, $textBaseline: CanvasTextBaseline, $textAlign: CanvasTextAlign): CanvasRenderingContext2D;
        private getTextxpos;
        private getTextypos;
        private wrapText;
        _hasDispose: boolean;
        dispose(): void;
    }
}
declare namespace tl3d {
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
        set rendering(val: boolean);
        get rendering(): boolean;
        get texture(): WebGLTexture;
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
        insetUi($e: Vector2D): UICompenent;
        interactiveEvent($e: InteractiveEvent): boolean;
        dispose(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
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
        protected _left: number;
        protected _right: number;
        protected _center: number;
        protected _xType: number;
        protected _top: number;
        protected _bottom: number;
        protected _middle: number;
        protected _yType: number;
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
        set rendering(val: boolean);
        get rendering(): boolean;
        addStage(): void;
        removeStage(): void;
        isU: boolean;
        isV: boolean;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        setVc(program: any, index: number): void;
        update(): void;
        applyRenderSize(): void;
        set uvScale(value: number);
        get uvScale(): number;
        setScale(num: number): void;
        applyAbsolutePoint(): void;
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        set width(value: number);
        get width(): number;
        set height(value: number);
        get height(): number;
        set left(value: number);
        set right(value: number);
        set center(value: number);
        set top(value: number);
        set bottom(value: number);
        set middle(value: number);
        testPoint($x: number, $y: number): boolean;
        setPos($x: number, $y: number): void;
        interactiveEvent(e: InteractiveEvent): boolean;
        preShow(): void;
        preHide(): void;
    }
}
declare namespace tl3d {
    class UIConatiner {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        protected _left: number;
        protected _right: number;
        protected _center: number;
        protected _xType: number;
        protected _top: number;
        protected _bottom: number;
        protected _middle: number;
        protected _yType: number;
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
        set layer(val: number);
        get layer(): number;
        set interfaceUI(val: boolean);
        get interfaceUI(): boolean;
        constructor();
        load($complateFun: Function, $needShowLoading?: boolean): void;
        get hasLoad(): boolean;
        protected makeBaseWinUi(): void;
        applyLoad(): void;
        applyLoadComplete(): void;
        set hasStage(val: boolean);
        get hasStage(): boolean;
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
        addRender($uiRender: UIRenderComponent): void;
        addRenderAt($uiRender: UIRenderComponent, $idx: number): void;
        removeRender($uiRender: UIRenderComponent): void;
        resize(): void;
        resizeVirtualList(): void;
        set left(value: number);
        get left(): number;
        set right(value: number);
        get right(): number;
        set center(value: number);
        set top(value: number);
        get top(): number;
        set bottom(value: number);
        get bottom(): number;
        set middle(value: number);
        set width(value: number);
        get width(): number;
        set height(value: number);
        get height(): number;
        applyChild(): void;
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        dispose(): void;
        setSizeForPanelUiCopy($ui: UICompenent, $uiName: string, $uiRender: UIRenderComponent): void;
    }
    class Dis2DUIContianerBase extends UIConatiner {
        constructor();
        update(t: number): void;
        clearOneTemp(): void;
    }
}
declare namespace tl3d {
    class MainUiLoad {
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _itemLoad;
        private static loadBaseConfigCom;
        private static loadOkNum;
        private static _dic;
        private static _imgDic;
        private static loadUIdata;
        static loadOkd(): void;
    }
    class UIData {
        static designWidth: number;
        static designHeight: number;
        static font: string;
        static Scale: number;
        static setDesignWH($width: number, $height: number): void;
        static resize(): void;
        static textImg: any;
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _listUIRenderComponent;
        static get mainUIAtlas(): UIAtlas;
        private static _itemLoad;
        private static loadBaseConfigCom;
        private static loadOkNum;
        static publicUi: string;
        static flytext: string;
        static publicsUi: string;
        static faceItem: Array<string>;
        private static _dic;
        private static _imgDic;
        private static loadUIdata;
        static loadOkd(): void;
        static getImgByKey($key: string): HTMLImageElement;
        static getUiByName($key: string, $name: string): Object;
        static getUiArrByKey($key: string): any;
    }
    class UiDraw {
        static drawUseImg($ui: UICompenent, $useImgAtlas: UIAtlas, $skinName: string): void;
        static clearUI($ui: UICompenent): void;
        /**属性 - value */
        static drawAttVal($ui: UICompenent, $att: number, $val: number, $align?: string, $needadd?: boolean): void;
        /**绘制未获得属性 - value */
        static drawAttValAdd($ui: UICompenent, $att: number, $val: number): void;
        /**绘制增加属性 向上箭头 */
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        /**
         * 绘制需 自身有某id的道具多少个和需要多少数量的道具  a/b
         * @param
         * @param
         * @param
         */
        static drawResHasNumAndAllNum($ui: UICompenent, $CostAry: Array<number>, $txt?: string): boolean;
        /**
         * 在ctx上指定位置绘制一个小图标
         * @param
         * @param
         */
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
        costtype($costid: number): string;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class UIGridRentangle extends UIRectangle {
        ogw: number;
        ogh: number;
    }
}
declare namespace tl3d {
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
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        set width(value: number);
        get width(): number;
        set height(value: number);
        get height(): number;
        private _hasDisposed;
        dispose(): void;
    }
}
declare namespace tl3d {
    class UIVirtualContainer extends UIConatiner {
        parent: UIConatiner;
        visible: boolean;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class Grid9Compenent extends UICompenent {
        ogw: number;
        ogh: number;
        gw: number;
        gh: number;
        constructor();
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
}
declare namespace tl3d {
    class Disp2DBaseText {
        ui: UICompenent;
        textureStr: string;
        parent: UIRenderComponent;
        voRect: Rectangle;
        protected dtime: number;
        protected time: number;
        protected _data: any;
        protected lastKey: any;
        protected oldPos: Vector2D;
        constructor();
        protected needUpData($pos: Vector3D): boolean;
        set data(value: any);
        get data(): any;
        makeData(): void;
        update(): void;
        Vector3DToVector2D($pos: any): Vector2D;
        isEqualLastKey(value: any): boolean;
    }
    class Dis2DUIContianerPanel extends Dis2DUIContianerBase {
        protected _baseRender: UIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
        private initData;
        textureRect: Rectangle;
        voNum: number;
        voRect: Rectangle;
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<tl3d.baseMeshVo>;
        protected makeBaseUi($classVo: any): void;
        showTemp($data: any): Disp2DBaseText;
        private clearLostItem;
        playLost(): void;
        clearOneTemp(): void;
        clearTemp($data: any): void;
        clearAll(): void;
        private updateFun;
        update(t: number): void;
        getUiItemLen(): number;
    }
    class Dis2DUIFram extends Dis2DUIContianerPanel {
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected makeBaseUi($classVo: any): void;
    }
}
declare namespace tl3d {
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
        createFrame($upskin: string): AlphaFrameCompenent;
    }
    class AlphaFrameCompenent extends FrameCompenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
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
declare namespace tl3d {
    export class AnimManager {
        private _dic;
        constructor();
        private static _instance;
        static getInstance(): AnimManager;
        getAnimData($url: string, $fun: Function): void;
        getAnimDataImmediate($url: string): AnimData;
        clearAnim($url: string): void;
        readData(byte: TLByteArray, $url: any): AnimData;
        private readFrameData;
        private readFrameTypeData;
        private processFrame;
        frameToBone(frameData: Array<number>, hierarchyList: Array<ObjectBone>): Array<ObjectBaseBone>;
        private setFrameToMatrix;
        private getW;
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
    export {};
}
declare namespace tl3d {
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
        static num76: string;
        static num77: string;
        static num81: string;
        private static _instance;
        static getInstance(): ArtFont;
        private makeFontRect;
        private getXmlData;
        writeFontToCtxLeft($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        /**
         * 将美术字写到ctx上 右对齐的
         * $tx:绘制的终点x
         * $ty:绘制的起点Y
         */
        writeFontToCtxRight($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        /**
         * 绘制数字到ctx  居中对齐
         * @param ctx
         * @param str
         * @param pw ctx的宽度
         * @param color
         * @param tx x偏移
         * @param ty y偏移
         * @param txtInterval
         */
        writeFontToCtxCenten($ctx: CanvasRenderingContext2D, $str: string, pw: number, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        writeFontToSkinName($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string, $txtInterval?: number, $py?: number): number;
        writeFontToSkinNameCenter($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $txtInterval?: number): void;
        getAirFontWidth($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $txtInterval?: number): number;
        private getRect;
        upArtFont($UIAtlas: UIAtlas, $iconName: string, $str: string, $size?: number, $color?: string, $textAlign?: string): void;
        upArtBase($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string): void;
        private getXpos;
        /**
         *计算总宽度和是否绘制
         */
        private getTotalWandDraw;
        getCharId(str: string): number;
    }
}
declare namespace tl3d {
    class AudioMgr {
        static _soundChannel: Laya.SoundChannel;
        static _curbgm: string;
        static MUSICPAUSE: boolean;
        static SOUNDSTOP: boolean;
        constructor();
        static playMusic(path?: string): void;
        static setPlayRate(val: any): void;
        static pauseMusic(): void;
        static stopMusic(): void;
        static resumeMusic(): void;
        static playSound(path?: string): void;
        static StopSound(path: string): void;
        static pauseSound(): void;
    }
}
/**
* base64-arraybuffer
*/
declare namespace tl3d {
    class Base64 {
        static chars: string;
        static encode: (arraybuffer: any) => string;
        static decode: (base64: any) => ArrayBuffer;
    }
}
declare namespace tl3d {
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
        static N_NORMALDAMAGE: number;
        static N_CRIT: number;
        static N_RESISTANCE: number;
        static N_RESISTANCES: number;
        static N_IMMUNE: number;
        static N_ONCEATTACK: number;
        static N_PASSIVE: number;
        static N_RESURGENCE: number;
        static N_UPHP: number;
        static N_BEATBACK: number;
        static N_DOWNHP: number;
        static N_BOMB: number;
        static N_DIZZY: number;
        static N_INVINCIBLE: number;
        static N_TARGET: number;
        static N_SARCASM: number;
        static N_SILENCE: number;
        static N_SHIELD: number;
        static N_BLEED: number;
        static N_SLEEP: number;
        static N_CRIT_RATE_UP: number;
        static N_RESIST_RATE_UP: number;
        static N_ATTACK_UP: number;
        static N_DEFENSE_UP: number;
        static N_SPEED_UP: number;
        static N_HIT_UP: number;
        static N_CRIT_RATE_DOWN: number;
        static N_RESIST_RATE_DOWN: number;
        static N_ATTACK_DOWN: number;
        static N_DEFENSE_DOWN: number;
        static N_SPEED_DOWN: number;
        static N_HIT_DOWN: number;
        static N_SHIHUA: number;
        static N_MEIHUO: number;
        static N_SHUFU: number;
        static N_BINGFENG: number;
        static N_ZHONGDU: number;
        static N_LEIDIAN: number;
        static N_ANGER_DOWN: number;
        static N_WANGLING: number;
        static N_MABI: number;
        static N_FENNU: number;
        static N_FANTAN: number;
        static N_SHARE: number;
        static N_ZHUOSHAO: number;
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
        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number;
        protected pos: Vector3D;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        protected _lastchange: Array<number>;
        protected changerules(t: number): Array<number>;
    }
    class TextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width;
        makeData(): void;
        protected drawCritTxt($vo: TextJumpUiVo): number;
        private drawTxtBytext;
        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number;
        private pos;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        private _lastchange;
        private changerules;
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
        offsetx: number;
        offsety: number;
        set visible(value: boolean);
        get visible(): boolean;
        pos: Vector3D;
        clear: boolean;
        constructor();
    }
}
declare namespace tl3d {
    class CharTitleMeshVo extends tl3d.baseMeshVo {
        private _num;
        needDraw: boolean;
        destory(): void;
        set num(value: number);
        get num(): number;
    }
    class CharNameMeshVo extends tl3d.baseMeshVo {
        private _name;
        color: string;
        scolor: string;
        size: number;
        needDraw: boolean;
        set name(value: string);
        get name(): string;
        destory(): void;
    }
    class BloodLineMeshVo extends tl3d.baseMeshVo {
        num: number;
        posx: number;
        colortype: number;
        midNum: number;
        destory(): void;
    }
    class JumpTextMeshVo extends tl3d.baseMeshVo {
        str: string;
        destory(): void;
    }
    class JumpTxtContianerPanel extends Dis2DUIContianerPanel {
        constructor($classVo: any, $rect: Rectangle, $num: number);
    }
    class BloodManager {
        private _charNameContianerPanel;
        private _jumpTxtContianerPanel;
        uiContianerItem: Array<Dis2DUIContianerBase>;
        constructor();
        clearOneTemp(): void;
        getCharNameMeshVo(value?: string): CharNameMeshVo;
        getBloodExtMeshVo(): any;
        showFlyText(jumpvo: any): void;
        setJumpNum($textJumpUiVo: tl3d.TextJumpUiVo): void;
        update(): void;
        resize(): void;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class GroupDataManager extends ResGC {
        protected _loadDic: Object;
        scene: SceneManager;
        constructor(scene: SceneManager);
        getGroupData($url: string, $fun: Function): void;
        perLoadData($url: string, $fun: Function): void;
    }
}
declare namespace tl3d {
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
        static get instance(): KeyControl;
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
declare namespace tl3d {
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
declare namespace tl3d {
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
        private static getNextWords;
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
        private static getStartPoint;
        private static drawFaceIcon;
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
        static writeTextLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: CanvasTextAlign, $maxWidth?: number, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): Array<number>;
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
        static writeText($uiAtlas: UIAtlas, $key: string, $x: number, $y: number, $str: string, fontsize: number, fontColor: string, $maxWidth?: number, bolder?: boolean, $textAlign?: CanvasTextAlign): Array<number>;
        /**
         * 按行写入文本 带解析颜色。但只能居中对齐
         */
        static writeTextAutoCenterByAnchor($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean, $filterColor?: string): Array<number>;
        static writeTextAutoVerticalCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, $filterColor?: string, bolder?: boolean): void;
        static writeTextAutoCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean): void;
        private static isNewline;
        private static getTextxpos;
        private static wrapText;
        /**已弃用 请使用clearUI */
        static clearLabel($uiAtlas: UIAtlas, $key: string): void;
    }
}
declare namespace tl3d {
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
}
declare namespace tl3d {
    class LoadManager {
        static BYTE_TYPE: string;
        static IMG_TYPE: string;
        static XML_TYPE: string;
        private static _instance;
        static getInstance(): LoadManager;
        getVersion(vkey: any): string;
        _versions: Object;
        private _loadThreadList;
        private _waitLoadList;
        constructor();
        load($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function): void;
        loadWaitList(): void;
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
        get vurl(): string;
    }
}
declare namespace tl3d {
    class MeshDataManager extends ResGC {
        private _loadDic;
        constructor();
        private static _instance;
        static getInstance(): MeshDataManager;
        getMeshData($url: string, $fun: Function, $batchNum?: number): void;
        loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void;
        private roleResCom;
        readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
        private readBindPosByte;
        readMesh2OneBuffer(byte: TLByteArray, meshData: MeshData): void;
        private cloneMeshData;
        private uploadMesh;
        uploadPbrMesh($mesh: MeshData, $useNormal: boolean): void;
        preLoad($url: string): void;
    }
}
declare namespace tl3d {
    class ObjDataManager extends ResGC {
        private _loadList;
        constructor();
        private static _instance;
        static getInstance(): ObjDataManager;
        getObjData($url: string, $fun: Function): void;
        registerUrl($url: string): void;
        releaseUrl($url: string): void;
        readFloatNrm(byte: TLByteArray, vertices: Array<number>): void;
        private readcollisionItem;
        private getFloadNum;
        loadObjCom($byte: ArrayBuffer, $url: string): ObjData;
        readObj2OneBuffer(byte: TLByteArray, $objData: ObjData): void;
        creatTBNBuffer($objData: ObjData): void;
    }
}
declare namespace tl3d {
    class SceneResManager extends ResGC {
        private static _instance;
        static getInstance(): SceneResManager;
        loadSceneRes($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): SceneRes;
        getRes($url: any): SceneRes;
        clearSceneUseById(id: any): void;
        private clearSceneUse;
    }
}
declare namespace tl3d {
    export class TimeUtil {
        static START_TIME: number;
        static funAry: Array<Function>;
        static timefunAry: Array<TimeFunTick>;
        static outTimeFunAry: Array<TimeFunOut>;
        static time: number;
        static getTimer(startTime?: number): number;
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
        static compareTime($hour: number, $min: number): boolean;
        static init(): void;
        static removeAllTickOut(): void;
        static addTimeTick($time: number, $fun: Function, $beginTime?: number): void;
        static removeTimeTick($fun: Function): void;
        static addTimeOut($time: number, $fun: Function, args?: Array<any>): void;
        static removeTimeOut($fun: Function): void;
        static hasTimeOut($fun: Function): boolean;
        static addFrameTick($fun: Function): void;
        static hasFrameTick($fun: Function): boolean;
        static removeFrameTick($fun: Function): void;
        static update(): void;
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
        args?: any;
        update(t: number): boolean;
    }
    export {};
}
declare namespace tl3d {
    class Util {
        static float2int(value: any): number;
        static radian2angle(value: number): number;
        static angle2radian(value: number): number;
        static makeImage(): any;
        static hexToArgb(expColor: number, is32?: boolean, color?: tl3d.Vector3D): tl3d.Vector3D;
        static hexToArgbNum(expColor: number, is32?: boolean, color?: tl3d.Vector3D): tl3d.Vector3D;
        static getBaseUrl(): string;
        /**描边路径 */
        static strokeFilter(ctx: CanvasRenderingContext2D, width: number, height: number, color: number): void;
        static trim(s: any): String;
        static trimLeft(s: any): String;
        static trimRight(s: any): String;
        static getScencdStr(timeNum: number): string;
        static random($num: number): number;
        static randomByItem(arr: Array<any>): any;
        /**
         * 同时获得多个指定区间的随机数
         * 从min到max中随机much个数
         * 包括min
         * 不包括max
         */
        static getRandomNumAssgin($much: number, $min: number, $max: number): number[];
        static makeArray(a: Array<any>, b: Array<any>): void;
        static unZip($aryBuf: ArrayBuffer): ArrayBuffer;
        static getZipByte($byte: tl3d.TLByteArray): tl3d.TLByteArray;
        static getUrlParam(name: string): string;
        static copy2clipboard(val: string): void;
        static getBit($num: number, offset: number): boolean;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class GroupRes extends BaseRes {
        private _fun;
        scene: SceneManager;
        dataAry: Array<GroupItem>;
        private _objDic;
        private _particleDic;
        private _materialDic;
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNext;
        private readItem;
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
declare namespace tl3d {
    class ModelRes extends BaseRes {
        private _fun;
        objUrl: string;
        light: LightVo;
        materialUrl: string;
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNexte;
    }
}
declare namespace tl3d {
    class RoleRes extends BaseRes {
        roleUrl: string;
        actionAry: Array<string>;
        private actionByte;
        private actionNum;
        private actionIndex;
        private _fun;
        meshBatchNum: number;
        ambientLightColor: Vector3D;
        ambientLightIntensity: number;
        sunLigthColor: Vector3D;
        sunLigthIntensity: number;
        nrmDircet: Vector3D;
        protected resState: string;
        NONE: string;
        READ_MESH: string;
        READ_ACTION: string;
        READ_IMAGE: string;
        READ_IMAGE_LOADING: string;
        READ_MATERIAL: string;
        READ_PARTICLE: string;
        READ_COMPLETE: string;
        constructor();
        load(url: string, $fun: Function): void;
        updateState(): void;
        updateTick: () => void;
        loadComplete($byte: ArrayBuffer): void;
        readMesh(): void;
        /**读取动作*/
        private readActions;
        /**读取单个动作*/
        private readAction;
        /**图片读取完毕*/
        allResCom(): void;
        /**读取材质*/
        readMaterial(): void;
        /**读取粒子*/
        readParticle(): void;
    }
}
declare namespace tl3d {
    class SkillRes extends BaseRes {
        skillUrl: string;
        private _fun;
        meshBatchNum: number;
        data: any;
        constructor();
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNext;
        private readData;
        readV3d($byte: TLByteArray): Vector3D;
    }
}
declare namespace tl3d {
    class Shadow {
        _visible: boolean;
        display: Display3dShadow;
        data: Array<number>;
        constructor();
        set visible(value: boolean);
        get visible(): boolean;
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        set z(value: number);
        get z(): number;
        set size(value: number);
        get size(): number;
    }
}
declare namespace tl3d {
    class ShadowManager {
        private static _instance;
        static getInstance(): ShadowManager;
        private _displayList;
        constructor();
        addShadow(): Shadow;
        removeShadow(sd: Shadow): void;
        update(): void;
        private getIdleShadow;
    }
}
declare namespace tl3d {
    class LightVo {
        sunDirect: Array<number>;
        sunColor: Array<number>;
        ambientColor: Array<number>;
        setData(sd: any, sc: any, ac: any): void;
    }
}
declare class Test {
    static IMG_TYPE: number;
    static OBJS_TYPE: number;
    static MATERIAL_TYPE: number;
    type: number;
    name: string;
    age: number;
    private _byte;
    readData($bytes: tl3d.TLByteArray): void;
    writeData(): void;
}
declare namespace tl3d {
    class CapsuleVo {
        radius: number;
        height: number;
        constructor($radius: number, $height: number);
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
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
        private meshBoneQPAryDic;
        private makeArrBoneQPAry;
        getBoneQPAryByMesh($mesh: MeshData): Array<Array<DualQuatFloat32Array>>;
        private conleMatrixArr;
        private makeFrameDualQuatFloatArray;
    }
}
declare namespace tl3d {
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
declare namespace tl3d {
    class SkinMesh extends ResCount {
        meshAry: Array<MeshData>;
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
        private loadByteMeshDataMaterial;
        setAction(actionAry: Array<string>, roleUrl: string): void;
        destory(): void;
    }
}
declare namespace tl3d {
    class Module {
        constructor();
        getModuleName(): string;
        /**
        * 注册的Processor的集合
        * 请注意：返回为Processor的实例数组
        * @return
        *
        */
        protected listProcessors(): Array<Processor>;
        /**
             * processor字典
             */
        private processorMap;
        /**
         * 模块初始化
         */
        protected onRegister(): void;
        /**
        * 注册所有的Processor
        */
        private registerProcessors;
        /**
        * 注册Processor
        * @param $processor
        */
        private registerProcessor;
        /**
        * namespace字典
        */
        static namespaceMap: Object;
        /**
        * 注册namespace
        * @param $namespace
        */
        static registerModule($namespace: Module): void;
    }
}
declare namespace tl3d {
    class ModuleEventManager {
        private static _instance;
        static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void;
        static dispatchEvent($event: BaseEvent): void;
        static addEvent(type: string, listener: Function, thisObject: any): void;
        static removeEvent(type: string, listener: Function, thisObject: any): void;
        static removeEventByName(type: string): void;
        static removeEventByNameAndTarget(type: string, thisObject: any): void;
        static removeEventByTarget(thisObject: any): void;
    }
}
declare namespace tl3d {
    class Processor {
        constructor();
        getName(): string;
        /**
        * 解析事件，之后交给处理函数
        * @param $notification
        */
        protected receivedModuleEvent($event: BaseEvent): void;
        /**
        * 监听的事件类的集合
        * 请注意：返回为事件的CLASS(这些CLASS必须继承自namespaceEvent)的数组
        * @return
        *
        */
        protected listenModuleEvents(): Array<BaseEvent>;
        registerEvents(): void;
        getHanderMap(): Object;
    }
}
declare namespace tl3d {
    class CanvasPostionModel {
        private static _instance;
        static getInstance(): CanvasPostionModel;
        constructor();
        initSceneFocueEvent(): void;
        private lastPostionV2d;
        private _lastMousePos;
        private _isMouseDown;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
        tureMoveV2d: tl3d.Vector2D;
        static scene2dRotation45: number;
        resetSize(): void;
    }
}
declare namespace tl3d {
    class Ground2dBaseShader extends tl3d.Shader3D {
        static Ground2dBaseShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Ground2dBaseSprite extends tl3d.Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        setPicUrl($url: string): void;
        _uvTextureRes: tl3d.TextureRes;
        upToGpu(): void;
        update(): void;
        width: number;
        height: number;
        static perentpos: tl3d.Vector2D;
        private getMoveSizeData;
    }
    class GroundModel {
        private static _instance;
        static getInstance(): GroundModel;
        constructor();
        update(): void;
        addGroundPicByeUrl($url?: string, $rect?: tl3d.Rectangle): Ground2dBaseSprite;
        private _groundItem;
    }
}
declare namespace tl3d {
    class OverrideEngine extends tl3d.Engine {
        constructor();
        static initConfig(): void;
        static resetSize(width?: number, height?: number): void;
        static init($caves: HTMLCanvasElement): void;
    }
}
declare namespace tl3d {
    class Override2dEngine extends OverrideEngine {
        constructor();
        static htmlScale: number;
        static initConfig(): void;
        static resetSize(width?: number, height?: number): void;
        static init($caves: HTMLCanvasElement): void;
        static resetViewMatrx3D(): void;
    }
}
declare namespace tl3d {
    class ExpTextJumpUiDrawAndRefreash256 extends tl3d.ExpTextJumpUiDrawAndRefreash {
        protected drawTxtBydigitalAndtext($vo: tl3d.TextJumpUiVo): number;
    }
    class OverrideBloodManager extends tl3d.BloodManager {
        private _jumpText256_256;
        constructor();
        setExpJump256_256Num($textJumpUiVo: tl3d.TextJumpUiVo): void;
    }
}
declare namespace tl3d {
    import Shader3D = tl3d.Shader3D;
    import Display3DSprite = tl3d.Display3DSprite;
    import TextureRes = tl3d.TextureRes;
    class DirectShadowDisplay3DShader extends Shader3D {
        static DirectShadowDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class DirectShadowDisplay3DSprite extends Display3DSprite {
        constructor();
        needScanShadow: boolean;
        protected initData(): void;
        protected modelShder: Shader3D;
        setObjUrl(value: string): void;
        private nrmFlag;
        protected _uvTextureRes: TextureRes;
        update(): void;
        protected drawTemp($dis: Display3DSprite): void;
        updateRotationMatrix(): void;
        setPicUrl($str: string): void;
        groupItem: Array<Display3DSprite>;
        setModelById($str: string): void;
    }
}
declare namespace tl3d {
    import Shader3D = tl3d.Shader3D;
    import Matrix3D = tl3d.Matrix3D;
    import FBO = tl3d.FBO;
    class BaseShadowShader extends Shader3D {
        static BaseShadowShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class ShadowModel {
        private static _instance;
        static getInstance(): ShadowModel;
        static shadowViewMatx3D: Matrix3D;
        private renderContext;
        getFBO(): FBO;
        private _uvTextureRes;
        updateDepthTexture(fbo: FBO): void;
        private sunRotationX;
        sunRotationY: number;
        private sunDistens100;
        private makeUseShadowView;
        private isNeedMake;
        private _visible;
        setShowdowVisible(value: boolean): void;
        updateDepth($scene: tl3d.SceneManager): void;
        private drawTempSprite;
    }
}
