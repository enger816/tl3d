module Pan3d {
    export class MaterialParam extends MaterialBaseParam {
        //public material: Material;
        public materialUrl: string;

        public program: WebGLProgram;
        public shader: Shader3D;
        //public dynamicTexList:Array<DynamicTexItem>;
        //public dynamicConstList:Array<DynamicConstItem>;

        public constructor() {
            super();
        }

        public destory(): void {
            //this.material.useNum--;
            this.material.useNum--;
            this.shader.useNum--;

            // if(this.material.url.indexOf("m_ef_ver_byte.txt") != -1){
            //     //console.log("bbbbbbbbbbbbbbbbbbb",this.material.useNum)
            // }
            //for (var i: number = 0; i < this.dynamicTexList.length; i++){
            //    this.dynamicTexList[i].destory();
            //}
            //this.dynamicTexList = null;
            //this.dynamicConstList = null;
            super.destory();
        }

        public setMaterial($materialTree: Material): void {
            this.material = $materialTree;
            this.materialUrl = $materialTree.url;

            this.dynamicTexList = new Array;
            this.dynamicConstList = new Array;
            this.setTexList();
            this.setConstList();
        }

        public setLife($life: number): void {
            for (var i: number = 0; i < this.dynamicTexList.length; i++) {
                if (this.dynamicTexList[i].isParticleColor) {
                    this.dynamicTexList[i].life = $life;
                }
            }
        }



        public setTexList(): void {
            var texList: Array<TexItem> = this.material.texList;
            for (var i: number = 0; i < texList.length; i++) {
                var dyTex: DynamicTexItem;
                if (texList[i].isParticleColor) {
                    dyTex = new DynamicTexItem;
                    dyTex.target = texList[i];
                    dyTex.paramName = texList[i].paramName;
                    dyTex.initCurve(4);
                    this.dynamicTexList.push(dyTex);
                    dyTex.isParticleColor = true;
                } else if (texList[i].isDynamic) {
                    dyTex = new DynamicTexItem;
                    dyTex.target = texList[i];
                    dyTex.paramName = texList[i].paramName;
                    this.dynamicTexList.push(dyTex);
                }

            }
        }

        public setConstList(): void {
            var constList: Array<ConstItem> = this.material.constList;

            for (var i: number = 0; i < constList.length; i++) {
                var constItem: ConstItem = constList[i];
                var dyCon: DynamicConstItem;
                if (constItem.param0Type != 0) {
                    dyCon = new DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName0;
                    // dyCon.type = constItem.param0Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName0, constItem.param0Type);
                    this.dynamicConstList.push(dyCon);
                }

                if (constItem.param1Type != 0) {
                    dyCon = new DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName1;
                    // dyCon.type = constItem.param1Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName1, constItem.param1Type);
                    this.dynamicConstList.push(dyCon);
                }

                if (constItem.param2Type != 0) {
                    dyCon = new DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName2;
                    // dyCon.type = constItem.param2Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName2, constItem.param2Type);
                    this.dynamicConstList.push(dyCon);
                }

                if (constItem.param3Type != 0) {
                    dyCon = new DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName3;
                    // dyCon.type = constItem.param3Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName3, constItem.param3Type);
                    this.dynamicConstList.push(dyCon);
                }
            }

        }

        public setTextObj(ary: Array<any>): void {
            for (var i: number = 0; i < ary.length; i++) {
                var obj: any = ary[i];
                for (var j: number = 0; j < this.dynamicTexList.length; j++) {
                    if (this.dynamicTexList[j].paramName == obj.paramName) {
                        if (this.dynamicTexList[j].isParticleColor) {
                            this.dynamicTexList[j].curve.setData(obj.curve);
                        } else {
                            this.dynamicTexList[j].url = obj.url;
                        }
                        break;
                    }
                }
            }

        }

        public setConstObj(ary: Array<any>): void {
            for (var i: number = 0; i < ary.length; i++) {
                var obj: any = ary[i];
                for (var j: number = 0; j < this.dynamicConstList.length; j++) {
                    if (this.dynamicConstList[j].paramName == obj.paramName) {
                        this.dynamicConstList[j].curve.setData(obj.curve)
                        break;
                    }
                }
            }
        }




    }
}