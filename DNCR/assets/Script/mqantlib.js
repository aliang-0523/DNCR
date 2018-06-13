'use strict'
/**
 * Created by liangdas on 17/2/25.
 * Email 1587790525@qq.com
 */
var hashmap = function () {
}
hashmap.prototype = {
    constructor: hashmap,
    add: function (k, v) {
        if (!this.hasOwnProperty(k)) {
            this[k] = v;
        }
    },
    remove: function (k) {
        if (this.hasOwnProperty(k)) {
            delete this[k];
        }
    },
    update: function (k, v) {
        this[k] = v;
    },
    has: function (k) {
        var type = typeof k;
        if (type === 'string' || type === 'number') {
            return this.hasOwnProperty(k);
        } else if (type === 'function' && this.some(k)) {
            return true;
        }
        return false;
    },
    clear: function () {
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                delete this[k];
            }
        }
    },
    empty: function () {
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    },
    each: function (fn) {
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                fn.call(this, this[k], k, this);
            }
        }
    },
    map: function (fn) {
        var hash = new Hash;
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                hash.add(k, fn.call(this, this[k], k, this));
            }
        }
        return hash;
    },
    filter: function (fn) {
        var hash = new Hash;
        for (var k in this) {

        }
    },
    join: function (split) {
        split = split !== undefined ? split : ',';
        var rst = [];
        this.each(function (v) {
            rst.push(v);
        });
        return rst.join(split);
    },
    every: function (fn) {
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                if (!fn.call(this, this[k], k, this)) {
                    return false;
                }
            }
        }
        return true;
    },
    some: function (fn) {
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                if (fn.call(this, this[k], k, this)) {
                    return true;
                }
            }
        }
        return false;
    },
    find: function (k) {
        var type = typeof k;
        if (type === 'string' || type === 'number' && this.has(k)) {
            return this[k];
        } else if (type === 'function') {
            for (var _k in this) {
                if (this.hasOwnProperty(_k) && k.call(this, this[_k], _k, this)) {
                    return this[_k];
                }
            }
        }
        return null;
    }
};
var mqtt=require('umdMqtt');
var mqant = function () {
}
mqant.prototype = {
    constructor: window.mqant,
    curr_id: 0,
    client:null,
    waiting_queue:new hashmap(),
    init:function(prop){
        prop["onFailure"]=prop["onFailure"]||function () {
                console.log("onFailure");
        }
        prop["onConnectionLost"]=prop["onConnectionLost"]||function (responseObject) {
                if (responseObject.errorCode !== 0) {
                    console.log("onConnectionLost:" + responseObject.errorMessage);
                    console.log("连接已断开");
                }
        }
        prop["useSSL"]=prop["useSSL"]||false
        this.client = mqtt.connect("ws://101.132.128.250:3653",{
            //var client = mqtt.connect("egret://127.0.0.1:3653",{
            //var client = mqtt.connect("laya://127.0.0.1:3653",{
            protocolId: 'MQIsdp',
            protocolVersion: 3,
            clientId:'mqttjs_' + Math.random().toString(16).substr(2, 8),
            reconnectPeriod:0, //不自动重连
        })
        this.client.on("error", function () {
            prop["onConnectionLost"]()
        })
        this.client.on("connect", function () {
            prop["onSuccess"]()
        })

        //this.client.onConnectionLost =prop["onConnectionLost"] ;//注册连接断开处理事件
        this.client.on("message",onMessageArrived ) ;//注册消息接收处理事件
        var self=this;
        function onMessageArrived(topic, message) {
            var callback=self.waiting_queue.find(topic);
            if(typeof(callback)!="undefined"){
                //有等待消息的callback 还缺一个信息超时的处理机制
                var h=topic.split("/")
                if(h.length>2){
                    //这个topic存在msgid 那么这个回调只使用一次
                    self.waiting_queue.remove(topic)
                }
                callback(message);
            }
        }
    },
    /**
     * 向服务器发送一条消息
     * @param topic
     * @param msg
     * @param callback
     */
    request:function(topic,msg,callback){
        this.curr_id=this.curr_id+1
        var topic=topic+"/"+this.curr_id; //给topic加一个msgid 这样服务器就会返回这次请求的结果,否则服务器不会返回结果
        var payload=" "+JSON.stringify(msg);
        cc.log("sending top and msg is " + topic + ":" + payload)
        this.on(topic,callback);
        this.client.publish(topic,payload ,1);
    },
    /**
     * 向服务器发送一条消息,但不要求服务器返回结果
     * @param topic
     * @param msg
     */
    requestNR:function(topic,msg){
        var payload=JSON.stringify(msg);
        this.client.publish(topic,payload ,1);
    },
    /**
     * 监听指定类型的topic消息
     * @param topic
     * @param callback
     */
    on:function(topic,callback){
        //服务器不会返回结果
        this.waiting_queue.add(topic,callback); //添加这条消息到等待队列
    }
}
window.mqant=new mqant();
window.hashmap=new hashmap();





