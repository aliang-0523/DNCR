'use strict'
function UserInfo(account,pwd) {
    this.account=account;
    this.pwd=pwd;
}
UserInfo.prototype={
    constructor:UserInfo,
    getAccount:function () {
        return this.account;
    },
    getPwd:function () {
        return this.pwd;
    },
    setInfo:function(s,q){
        this.account=s;
        this.pwd=q;
    }
}

function LogInRetData(success1,register1,lastplace,description) {
    this.success1=success1;
    this.register1=register1;
    this.lastplace=lastplace;
    this.description=description;
}
LogInRetData.prototype={
    constructor:LogInRetData,
    getsuccess1:function () {
        return this.success1;
    },
    getregister:function () {
        return this.register1;
    },
    getlastplace:function () {
        return this.lastplace;
    },
    getdescription:function () {
        return this.description;
    }
}

function CSRegister(account1,pwd1,nick,head,sex,openid) {
    this.account1=account1;
    this.pwd1=pwd1;
    this.nick=nick;
    this.head=head;
    this.sex=sex;
    this.openid=openid;
}
CSRegister.prototype={
    constructor:CSRegister,
    getaccount1:function () {
        return this.account1;
    },
    getpwd1:function () {
        return this.pwd1;
    },
    getnick:function () {
        return this.nick;
    },
    gethead:function () {
        return this.head;
    },
    getsex:function () {
        return this.sex;
    },
    getopenid:function () {
        return this.openid;
    }
}
function WeixinInfo(openID,nickname,headimgurl,sex) {
    this.openID=openID;
    this.nickname=nickname;
    this.headimgurl=headimgurl;
    this.sex=sex;
}
WeixinInfo.prototype={
    constructor:WeixinInfo,
    getOpenID:function () {
        return this.openID;
    },
    getNickname:function () {
        return this.nickname;
    },
    getHeadimgurl:function(){
        return this.headimgurl;
    },
    getSex:function () {
        return this.sex;
    }
}

function SCLobbyInfoRet (cost1,cost2,cost3,user) {
    this.cost1=cost1;
    this.cost2=cost2;
    this.cost3=cost3;
    this.user=user;
}
SCLobbyInfoRet .prototype={
    constructor:SCLobbyInfoRet,
    setCost:function (a,b,c) {
        this.cost1=a;
        this.cost2=b;
        this.cost3=c
    },
}
var p=new UserInfo("aclin"+Math.random(),"WeiXinPassword");
var q=new LogInRetData(true,false,"","");
var m_kAccount="aclin"+Math.random()
var m_kPssword="WeiXinPassword";
//window.m_kNickName ="aclin"+Math.random();
window.m_kNickName =null;
var m_bMale = true;
//var m_headURL = "http://wx.qlogo.cn/mmopen/h0aa7BkejuVPx85xkcz4IJibUj4fgUV0E5jBlg7tvQ9bicMNOiaFLvAMFabTsMSHT3xhqOwoMRWTiaeK800xVMNfZ48LlUbN69yd/132";
window.m_headURL = null;
var m_kOpenId = "oMNjFwr2YQS4hkk2NlGAtQUqhzA4";
//var csRegister1 = new CSRegister(m_kAccount,m_kPssword,window.m_kNickName,m_headURL,m_bMale,m_kOpenId);
var csRegister1 = new CSRegister(m_kAccount,m_kPssword,null,null,m_bMale,m_kOpenId);
var topic;
var wxInfo=new WeixinInfo(null,null,null,null)
var scLobbyInfoRet=new SCLobbyInfoRet(null,null,null,null)
window.myheadUrl=null;
window.otherheadUrl=null;
window.gold=null;
var WxFlag=false;
cc.Class({
    extends: cc.Component,
    properties: {
    },
    update:function () {
        if(this.loginFlag){
            //微信登陆时调用
            WxFlag=jsb.reflection.callStaticMethod("com/Mjcompany/HNMajiang/wxapi/WXEntryActivity", "getWxFlag1", "(I)Z", 1);
            if(WxFlag){
                wxInfo.openID = jsb.reflection.callStaticMethod("com/Mjcompany/HNMajiang/wxapi/WXEntryActivity", "getOpenId1", "(I)Ljava/lang/String;", 1);
                wxInfo.nickname = jsb.reflection.callStaticMethod("com/Mjcompany/HNMajiang/wxapi/WXEntryActivity", "getNickname1", "(I)Ljava/lang/String;", 1);
                wxInfo.headimgurl = jsb.reflection.callStaticMethod("com/Mjcompany/HNMajiang/wxapi/WXEntryActivity", "getHeadimgurl1", "(I)Ljava/lang/String;", 1);
                wxInfo.sex = jsb.reflection.callStaticMethod("com/Mjcompany/HNMajiang/wxapi/WXEntryActivity", "getSex1", "(I)Ljava/lang/String;", 1);
                csRegister1.account1 = wxInfo.nickname;
                csRegister1.nick=wxInfo.nickname;
                csRegister1.openid = wxInfo.openID;
                csRegister1.head=wxInfo.headimgurl;
                window.m_kNickName=wxInfo.nickname;
                window.m_headURL=wxInfo.headimgurl;
                p.account = wxInfo.nickname;
            // window.m_kNickName="YouKe"+Math.random();
            // cc.log(window.m_kNickName);
            csRegister1.nick=window.m_kNickName;
                var mqant = window.mqant;
                mqant.init({
                    onFailure: function () {
                    }, onSuccess: function () {
                        topic = "Login/HD_Login";
                        mqant.request(topic, {
                            "account": p.getAccount(),
                            "pwd": p.getPwd()
                        }, function (jsonData) {
                            var message = JSON.parse(jsonData)
                            cc.log(message)
                            if (message.Error == "") {
                                //cc.log("没有错误信息");
                                var loginRet = JSON.parse(message.Result);
                                cc.log(loginRet)
                                if (loginRet.success) {
                                    //cc.log(loginRet.success+"登陆成功");
                                    mqant.request("Lobby/HD_LoginLobby", "1", function (jsondata) {
                                        cc.log(jsondata);
                                        var message2 = JSON.parse(jsondata)
                                        scLobbyInfoRet.setCost(JSON.parse(message2.Result).cost1,JSON.parse(message2.Result).cost2,JSON.parse(message2.Result).cost3);
                                        cc.log(scLobbyInfoRet.cost1+" "+scLobbyInfoRet.cost2+" "+scLobbyInfoRet.cost3+" ");
                                        window.gold=JSON.parse(message2.Result).user.gold;
                                        window.mID = JSON.parse(message2.Result).user.id;
                                        cc.log(message2);
                                        if (message2.Error == "") {
                                            p.setInfo(csRegister1.getaccount1(), csRegister1.getpwd1());
                                            cc.director.loadScene("GameHall");
                                        }
                                    })
                                }
                                else {
                                    if (loginRet.register) {
                                        cc.log("需要注册" + 1111);
                                        //需要注册注册的信息从微信登陆后获取
                                        mqant.request("Login/HD_Register", {
                                            "account": csRegister1.getaccount1(),
                                            "pwd": csRegister1.getpwd1(),
                                            "head": csRegister1.gethead(),
                                            "nick": csRegister1.getnick(),
                                            "openid": csRegister1.getopenid(),
                                            "sex": csRegister1.getsex()
                                        }, function (data1) {
                                            p.setInfo(csRegister1.getaccount1(), csRegister1.getpwd1());
                                            var message1 = JSON.parse(data1)
                                            cc.log(message1);
                                            if (message1.Error == "") {
                                                mqant.request(topic, {
                                                    "account": p.getAccount(),
                                                    "pwd": p.getPwd()
                                                }, function (jsonData) {
                                                    var message = JSON.parse(jsonData)
                                                    cc.log(message)
                                                    if (message.Error == "") {
                                                        //cc.log("没有错误信息");
                                                        //var loginRet = JSON.parse(message);
                                                        //cc.log(loginRet + "登陆成功");
                                                        mqant.request("Lobby/HD_LoginLobby", "1", function (jsondata) {
                                                            cc.log(jsondata);
                                                            var message2 = JSON.parse(jsondata)
                                                            cc.log(message2)
                                                            scLobbyInfoRet.setCost(JSON.parse(message2.Result).cost1,JSON.parse(message2.Result).cost2,JSON.parse(message2.Result).cost3);
                                                            cc.log(scLobbyInfoRet.cost1+" "+scLobbyInfoRet.cost2+" "+scLobbyInfoRet.cost3+" ");
                                                            window.gold=JSON.parse(message2.Result).user.gold;
                                                            window.mID = JSON.parse(message2.Result).user.id;
                                                            if (message2.Error == "") {
                                                                p.setInfo(csRegister1.getaccount1(), csRegister1.getpwd1());
                                                                cc.director.loadScene("GameHall");
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            else {
                                                cc.log("注册失败" + errStr);
                                            }
                                        })
                                    }
                                    else {
                                        cc.log("登陆失败：" + loginRet.description);
                                    }
                                }
                                cc.log(loginRet);
                            }
                        });
                        //cc.log("onSuccess");

                    }, host: "101.132.128.250", port: 3653, client_id: "sss", useSSL: false, onConnectionLost: function () {
                        cc.log("连接断开");
                    }
                });
                this.loginFlag=false;
            }
        }
    },
    login:function(){
        this.loginFlag=true;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","loginByWeiXin","(I)V",1);
    },
    share:function(){
        cc.log("share...");
        //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","loginByWeiXin","(I)V",1);
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","shareWX","(Z)V",true);
        cc.log("share...end");
    },
    setUserInfo:function () {
        cc.director.loadScene("GameHall");
    }
});
module.exports={p,q,csRegister1,scLobbyInfoRet}
window.Global={
    backNode:null,
    hallNode:null,
    return:null,
    return2:null,
    btnShop:null,
    btnSet:null,
    SceneDati:null,
    Pipei:null,
    Waiting2:null,
    Final:null,
    ButtonBefore:null,
    Background:null,
    Window:null
};



