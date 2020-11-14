declare namespace laya.layagl {

	/**
	 * @private LayaGL
	 */
        class LayaGL {
                static ARRAY_BUFFER_TYPE_DATA: number;           	//创建ArrayBuffer时的类型为Data
                static ARRAY_BUFFER_TYPE_CMD: number;            	//创建ArrayBuffer时的类型为Command

                static ARRAY_BUFFER_REF_REFERENCE: number;			//创建ArrayBuffer时的类型为引用
                static ARRAY_BUFFER_REF_COPY: number;				//创建ArrayBuffer时的类型为拷贝

                static UPLOAD_SHADER_UNIFORM_TYPE_ID: number;      //data按照ID传入
                static UPLOAD_SHADER_UNIFORM_TYPE_DATA: number;    //data按照数据传入

                static instance: WebGLRenderingContext;
        }

}

declare namespace laya.display {

        interface Node {
               /**@internal 子对象集合，请不要直接修改此对象。*/
		_children: any[]; 
        }
}