var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var GuidObjectTable = /** @class */ (function (_super) {
        __extends(GuidObjectTable, _super);
        function GuidObjectTable() {
            var _this = _super.call(this) || this;
            _this._objs = new Object;
            //std::function<uint32_t(const string&)> 从字符串转换出整形用于节约 
            _this._hashGUID = null;
            //以对象ID的hash希，整型作为key的对象表
            _this._u_2_guid = new Object();
            //用于每次发包的缓存 		 
            _this._packet_pool = new Array;
            _this._newEvent = new Pan3d.NetEventDispatcher(Pan3d.NetEventDispatcher.KEY_TYPE_STRING);
            _this._delEvent = new Pan3d.NetEventDispatcher(Pan3d.NetEventDispatcher.KEY_TYPE_STRING);
            _this._indexer = new Pan3d.StringIndexer();
            return _this;
        }
        GuidObjectTable.prototype.Get = function (k) {
            return (this._objs[k]);
        };
        Object.defineProperty(GuidObjectTable.prototype, "indexer", {
            /**
             * 索引器
             */
            get: function () {
                return this._indexer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 创建对象
         * @param k
         * @return
         */
        GuidObjectTable.prototype.CreateObject = function (k) {
            var p = this._objs[k];
            if (!p) {
                p = new Pan3d.GuidObject();
                p.guid = k;
                this.AttachObject(p);
            }
            return p;
        };
        /**
         * 释放对象
         * @param o
         */
        GuidObjectTable.prototype.ReleaseObject = function (o) {
            var k = o.guid;
            var p = this._objs[k];
            if (!p)
                return;
            this.DetachObject(p);
        };
        GuidObjectTable.prototype.ReleaseKey = function (k) {
            var p = this._objs[k];
            if (!p)
                return;
            this.DetachObject(p);
        };
        GuidObjectTable.prototype.AttachObject = function (o) {
            if (o == null)
                throw new Error("AttachObject,o==null");
            o.add_ref(1);
            this._objs[o.guid] = o;
            //加入对象分类
            this._indexer.insert(o);
            //如果hash函数不为空则要维护一个key对照表	
            var u_guid = 0;
            if (this._hashGUID != null) {
                u_guid = this._hashGUID(o.guid);
                if (u_guid != 0)
                    this._u_2_guid[u_guid] = o.guid;
            }
        };
        GuidObjectTable.prototype.DetachObject = function (o) {
            o.add_ref(-1);
            if (o.ref <= 0) {
                this._indexer.remove(o.guid);
                delete this._objs[o.guid];
                //如果hash函数不为空则要维护一个key对照表	
                var u_guid = 0;
                if (this._hashGUID != null) {
                    u_guid = this._hashGUID(o.guid);
                    if (u_guid != 0) {
                        delete this._u_2_guid[u_guid];
                        ////console.log("删除GUID"+ u_guid);
                    }
                }
            }
        };
        GuidObjectTable.prototype.msgClientsubscription = function ($byte) {
        };
        /**
         * 应用对象更新数据包
         * @param bytes
         */
        GuidObjectTable.prototype.ApplyBlock = function (bytes) {
            while (bytes.bytesAvailable) {
                var flags = bytes.readUnsignedByte();
                var guid; //= bytes.readUTF();	
                //先读出标志，如果是整形guid则转换成字符串
                if (flags & Pan3d.SyncEvent.OBJ_OPT_U_GUID) {
                    var u_guid = bytes.readUnsignedInt();
                    guid = this._u_2_guid[u_guid] ? this._u_2_guid[u_guid] : "";
                    if (guid.length == 0) {
                        //console.log("111没有对象 uguid=>", u_guid);
                    }
                }
                else {
                    guid = bytes.readUTF();
                }
                //if (ObjectDef.getPrefix(guid) == "O"){
                //  //console.log("oooooooooooooodddd " + flags);
                //}
                if (guid.length == 0) {
                    //console.log("没有对象 guid=>", guid);
                    return false;
                }
                var cur_obj = this.Get(guid);
                //对象是否属于索引
                var evFilter;
                //如果是删除则触发事件
                if (flags & Pan3d.SyncEvent.OBJ_OPT_DELETE) {
                    this._delEvent.DispatchString(guid, cur_obj);
                    this.ReleaseKey(guid);
                    evFilter = this._indexer.matchObject(cur_obj);
                    //对象消失了					
                    if (evFilter != null) {
                        evFilter.beginPush(cur_obj);
                        evFilter.pushDelete();
                        evFilter.endPush();
                    }
                    cur_obj.dispose();
                    continue;
                }
                //从流中读出对象,如果没有找到该对象则读取后抛弃
                var applyNew = (flags & Pan3d.SyncEvent.OBJ_OPT_NEW) == 0;
                if (!cur_obj) {
                    if (flags & Pan3d.SyncEvent.OBJ_OPT_NEW) {
                        applyNew = !this._objs[guid];
                        cur_obj = this.CreateObject(guid);
                        // console.log("创建GUID:" + guid);
                    }
                    else {
                        cur_obj = GuidObjectTable.applyBlock_tmp_obj;
                    }
                }
                if (flags & Pan3d.SyncEvent.OBJ_OPT_UPDATE) {
                    // console.log("更新GUID:" + guid);
                }
                evFilter = this._indexer.matchObject(cur_obj);
                if (evFilter) {
                    evFilter.beginPush(cur_obj);
                }
                cur_obj.ReadFrom(flags, bytes, evFilter, applyNew);
                if (evFilter) {
                    evFilter.endPush();
                }
                ;
                //如果是新对象则触发下事件
                if (flags & Pan3d.SyncEvent.OBJ_OPT_NEW) {
                    this._newEvent.DispatchString(cur_obj.guid.charAt(0), cur_obj);
                }
            }
            return true;
        };
        /*根据查询定符串返回对象列表*/
        GuidObjectTable.prototype.SearchObject = function (s, vec) {
            //TODO:这里的正则对象性能优化
            var regex = new RegExp(s);
            vec.length = 0;
            for (var k in this._objs) {
                if (regex.test(k))
                    vec.push(k);
            }
        };
        /*提供一种机制用于遍历所有的对象列表 委托格式 f(obj:GuidObject):void*/
        GuidObjectTable.prototype.ForEachObject = function (f) {
            for (var o in this._objs) {
                f(this._objs[o]);
            }
        };
        /**
         * 调用远程创建对象，成功的时候回调
         * @param guid
         * @param cb function(o:GuidObject):void
         */
        GuidObjectTable.prototype.RegisterCreateEvent = function (guid, cb) {
            this._newEvent.AddListenString(guid, cb);
        };
        /**
         * 调用远程删除对象,成功时回调
         * @param guid
         * @param cb function(o:GuidObject):void
         */
        GuidObjectTable.prototype.RegisterReleaseEvent = function (guid, cb) {
            this._delEvent.AddListenString(guid, cb);
        };
        /**
         * 从池中分配新的数据包,如果没有包号就不要写入
         * @param optCode
         * @return
         */
        GuidObjectTable.prototype.newPacket = function (optCode) {
            if (optCode === void 0) { optCode = 0; }
            var pkt = null;
            if (this._packet_pool.length == 0) {
                pkt = new Pan3d.Pan3dByteArray;
                pkt.endian = Pan3d.Endian.LITTLE_ENDIAN;
            }
            else {
                pkt = this._packet_pool.shift();
                pkt.clear();
            }
            if (optCode)
                pkt.writeShort(optCode);
            return pkt;
        };
        /**
         * 回收数据包到包池
         * @param pkt
         */
        GuidObjectTable.prototype.freePacket = function (pkt) {
            pkt.clear();
            this._packet_pool.push(pkt);
        };
        /**
         * 清理对象
         */
        GuidObjectTable.prototype.clearObjs = function () {
            for (var key in this._objs) {
                if (this._objs[key] instanceof Pan3d.GuidObject) {
                    var obj = this._objs[key];
                    this.removeObject(obj.guid, obj);
                    obj.dispose();
                }
                delete this._objs[key];
            }
        };
        /*移除对象*/
        GuidObjectTable.prototype.removeObject = function (guid, obj) {
            this._delEvent.DispatchString(guid, obj);
            this.ReleaseKey(guid);
            var evFilter = this._indexer.matchObject(obj);
            //对象消失了					
            if (evFilter != null) {
                evFilter.beginPush(obj);
                evFilter.pushDelete();
                evFilter.endPush();
            }
        };
        GuidObjectTable.prototype.dispose = function () {
            this._newEvent.Clear();
            this._delEvent.Clear();
            //this._indexer.Clear();
            for (var key in this._objs) {
                var k = this._objs[key];
                if (k) {
                    k.dispose();
                }
            }
            this._objs = new Object();
        };
        GuidObjectTable.applyBlock_tmp_obj = new Pan3d.GuidObject;
        return GuidObjectTable;
    }(Pan3d.SyncEvent));
    Pan3d.GuidObjectTable = GuidObjectTable;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GuidObjectTable.js.map