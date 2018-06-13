'use strict'
function CSJoinRace(type) {
    this.type=type;
}
CSJoinRace.prototype={
    constructor:CSJoinRace,
    getType:function () {
        return this.type;
    },
    setType:function(s){
        this.type=s;
    }
}
function SCUserInfoRet(id,nick,head,sex) {
    this.id=id;
    this.nick=nick;
    this.head=head;
    this.sex=sex;
}
SCUserInfoRet.prototype={
    constructor:SCUserInfoRet,
    getId:function () {
        return this.id;
    },
    getNikc:function () {
        return this.nick;
    },
    getHead:function () {
        return this.head;
    },
    getSex:function () {
        return this.sex;
    },
    setId:function(s){
        this.id=s;
    },
    setNick:function(s){
        this.sex=s;
    },
    setHead:function(s){
        this.head=s;
    },
    setSex:function(s){
        this.sex=s;
    }
}
function SCJoinSuccess(roomID,type,Users) {
    this.type=type;
    this.roomID=roomID;
    this.users=Users;
}
SCJoinSuccess.prototype={
    constructor:SCJoinSuccess,
    getType:function () {
        return this.type;
    },
    getRoomID:function () {
        return this.roomID;
    },
    getUsers:function () {
        return this.users;
    },
    setType:function(s){
        this.type=s;
    },
    setRoomID:function(s){
        this.roomID=s;
    },
    setUsers:function (s) {
        this.users=s;
    }
}
var scJoinSuccess=new SCJoinSuccess(null,null,null)
var info=0;
var x=new CSJoinRace(0);
var state=true;
var b=require("LoginAndShare")
var cost=new Array(3)
cost[0]=b.scLobbyInfoRet.cost1;
cost[1]=b.scLobbyInfoRet.cost2;
cost[2]=b.scLobbyInfoRet.cost3;
window.othernick=null;
cc.Class({
    extends: cc.Component,
    properties: {
        btnPrimary: {
            default: null,
            type: cc.Node
        },
        btnMedia: {
            default: null,
            type: cc.Node
        },
        btnSenior: {
            default: null,
            type: cc.Node
        },
        btnStart: {
            default: null,
            type: cc.Node
        },
        btnMatch: {
            default: null,
            type: cc.Node
        },
        btnShop: {
            default: null,
            type: cc.Node
        },
        btnSet: {
            default: null,
            type: cc.Node
        },
        btnInfo: {
            default: null,
            type: cc.Node
        },
        btnRet: {
            default: null,
            type: cc.Node
        },
        btnRet2: {
            default: null,
            type: cc.Node
        }
    },
    start() {
    },
    match: function () {
        var ani = Global.backNode.getComponent(cc.Animation);
        ani.play('Ui_1');
        var ani = Global.hallNode.getComponent(cc.Animation);
        ani.play('Ui_0');
        window.setTimeout(function () {
            Global.hallNode.active = false;
            Global.backNode.active = true;
            Global.return.active = true;
            Global.return2.active = false;
        }, 200)
        cc.log("11111111");
    },
    return: function () {
        // if(Global.btnShop.active=true) {
        //     var ani=Global.btnShop.getComponent(cc.Animation);
        //     ani.play('Shop_Back');
        //     window.setTimeout(function () {
        //         Global.btnSet.active=false;
        //         Global.backNode.active=false;
        //         Global.hallNode.active=true;
        //         Global.return.active=true;
        //         Global.return2.active=false;
        //     },200)
        // }
        // if(Global.btnSet.active=true){
        //     // window.setTimeout(function () {
        //     //     Global.btnSet.active=false;
        //     // },200)
        //     var ani=Global.btnSet.getComponent(cc.Animation);
        //     ani.play('Set_Back');
        //     window.setTimeout(function () {
        //         Global.btnShop.active=false;
        //         Global.backNode.active=false;
        //         Global.hallNode.active=true;
        //         Global.return.active=true;
        //         Global.return2.active=false;
        //     },200)
        // }
        cc.director.loadScene("GameHall");
        cc.log("1111");
    },
    shop: function () {
        var ani = Global.btnShop.getComponent(cc.Animation);
        ani.play('Shop');
        var ani = Global.hallNode.getComponent(cc.Animation);
        ani.play('Ui_0');
        window.setTimeout(function () {
            cc.find("information",Global.Window).active=false;
            Global.hallNode.active = false;
            Global.backNode.active = false;
            Global.btnShop.active = true;
            Global.return.active = true;
            Global.return2.active = false;
        }, 200)
    },
    friendPK:function () {
        // var ani = Global.hallNode.getComponent(cc.Animation);
        // ani.play('Ui_0');
        // cc.director.loadScene("GameLogo");
        // // var ani1 = Global.Waiting2.getComponent(cc.Animation);
        // // ani1.play('pipeiwancheng_Pk');
        // Global.Pipei.active=false;
        // Global.Waiting2.active = true;
        // var ani1 = Global.Waiting2.getComponent(cc.Animation);
        // ani1.play('pipeiwancheng_Pk');
        // cc.find("Invite",Global.Waiting2).active=true;
        // cc.find("BackGround_Pipei_0/Bg_Pipei/Firend",Global.Waiting2).active=true;
        // cc.find("Bg_Tips/BackButton",Global.Background).active=true;
        cc.director.loadScene("FriendPK");
    },
    set: function () {
        var ani = Global.btnSet.getComponent(cc.Animation);
        ani.play('Set');
        var ani = Global.hallNode.getComponent(cc.Animation);
        ani.play('Ui_0');
        window.setTimeout(function () {
            Global.hallNode.active = false;
            Global.btnSet.active = true;
            Global.return.active = true;
            Global.return2.active = false;
        }, 200)
    },
    shop2: function () {
        var ani = Global.btnShop.getComponent(cc.Animation);
        ani.play('Shop');
        var ani = Global.backNode.getComponent(cc.Animation);
        ani.play('Ui_1_Back');
        window.setTimeout(function () {
            Global.backNode.active = false;
            Global.btnShop.active = true;
            Global.return.active = false;
            Global.return2.active = true;
        }, 200)
    },
    set2: function () {
        var ani = Global.btnSet.getComponent(cc.Animation);
        ani.play('Set');
        var ani = Global.backNode.getComponent(cc.Animation);
        ani.play('Ui_1_Back');
        window.setTimeout(function () {
            Global.backNode.active = false;
            Global.btnSet.active = true;
            Global.return.active = false;
            Global.return2.active = true;
        }, 200)
    },
    showInfo:function () {
            this.btnStart.active = false;
            this.btnInfo.active = true;
            Global.backNode.active = false;
            Global.btnSet.active=false;
            Global.btnShop.active=false;
            Global.return.active = true;
            Global.return2.active = false;
    },
    setreturn:function () {
        this.btnStart.active=false;
        this.btnInfo.active=true;
    },
    matchPrimary:function () {
        cc.log(window.gold)
        if(window.gold<100){
            cc.find("BUZU",Global.Window).active=true;
            Global.backNode.active=false;
            window.setTimeout(function () {
                cc.find("BUZU",Global.Window).active=false;
                Global.backNode.active=true;
            },500)
        }
        else {
            x.setType(1);
            cc.log(x.getType());
            state = false;
            var topic = "MatchRoom/HD_JoinRace";
            var mqant = window.mqant;
            mqant.request(topic, {
                "type": x.getType(),
            }, function (jsondata) {
                var message = JSON.parse(jsondata)
                cc.log("Match")
                cc.log(message)
                //纪录能否入场
                //JSON.parse(message.Result).state
            });
            cc.director.loadScene("GameLogo");
        }
    },
    matchMedium:function () {
        if(window.gold<200){
            cc.find("BUZU",Global.Window).active=true;
            Global.backNode.active=false;
            window.setTimeout(function () {
                cc.find("BUZU",Global.Window).active=false;
                Global.backNode.active=true;
            },500)
        }
        else {
            x.setType(2);
            cc.log(x.getType());
            state = false;
            var topic = "MatchRoom/HD_JoinRace";
            var mqant = window.mqant;
            mqant.request(topic, {
                "type": x.getType(),
            }, function (jsondata) {
                var message = JSON.parse(jsondata)
                cc.log("Match")
                cc.log(message)
                //纪录能否入场
                //JSON.parse(message.Result).state
            })
            cc.director.loadScene("GameLogo");
        }
    },
    matchSenior:function () {
        if(window.gold<500){
            cc.find("BUZU",Global.Window).active=true;
            Global.backNode.active=false;
            window.setTimeout(function () {
                cc.find("BUZU",Global.Window).active=false;
                Global.backNode.active=true;
            },500)
        }
        else {
            x.setType(3);
            cc.log(x.getType());
            state = false;
            var topic = "MatchRoom/HD_JoinRace";
            var mqant = window.mqant;
            mqant.request(topic, {
                "type": x.getType(),
            }, function (jsondata) {
                var message = JSON.parse(jsondata)
                cc.log("Match")
                cc.log(message)
                //纪录能否入场
                //JSON.parse(message.Result).state
            });
            cc.director.loadScene("GameLogo");
        }
    },
    cancelMatch:function () {
        cc.director.loadScene("GameHall",function () {
            Global.hallNode.active=false;
            Global.backNode.active=true;
        });
        var topic = "MatchRoom/HD_LeaveRace";
        var mqant=window.mqant;
        mqant.request(topic, {
            "type": x.getType(),
        });
    },
    return1:function () {
        var mqant=window.mqant;
        mqant.request("MatchRoom/HD_Exit",);
    },
    return2:function () {
        var ani=Global.backNode.getComponent(cc.Animation);
        ani.play('Ui_1');
        if(Global.btnShop.active=true) {
            var ani=Global.btnShop.getComponent(cc.Animation);
            ani.play('Shop_Back');
            window.setTimeout(function () {
                Global.btnSet.active=false;
                Global.backNode.active=true;
                Global.return.active=true;
                Global.return2.active=false;
            },200)
        }
            // window.setTimeout(function () {
            //     Global.btnSet.active=false;
            // },200)
            var ani=Global.btnSet.getComponent(cc.Animation);
            ani.play('Set_Back');
            window.setTimeout(function () {
                Global.btnShop.active=false
                Global.backNode.active=true;
                Global.return.active=true;
                Global.return2.active=false;
            },200)
    },
    update () {
            var mqant=window.mqant;
            mqant.on("MatchResult",function (jsondata) {
            cc.log("匹配成功"+jsondata);
            var roomMsg=JSON.parse(jsondata)
            cc.log(roomMsg);
            scJoinSuccess.setRoomID(roomMsg.roomID);
            scJoinSuccess.setType(roomMsg.type);
            scJoinSuccess.setUsers(roomMsg.users);
            cc.log(scJoinSuccess);
            cc.log(scJoinSuccess.getRoomID()+" "+scJoinSuccess.getType()+" "+scJoinSuccess.getUsers()[0].head+" "+scJoinSuccess.getUsers()[0].sex+" "+scJoinSuccess.getUsers()[0].nick);
            Global.Pipei.active=false;
            cc.find("Bg_Tips/BackButton",Global.Background).active=false;
                Global.Waiting2.active=true;
                cc.log(window.m_kNickName);
                if(window.m_kNickName==scJoinSuccess.getUsers()[0].nick){
                    window.gold=scJoinSuccess.getUsers()[0].gold
                    window.othernick=scJoinSuccess.getUsers()[1].nick;
                    window.otherheadUrl=scJoinSuccess.getUsers()[1].head;
                    window.myheadUrl=scJoinSuccess.getUsers()[0].head
                    cc.find("BackGround_Pipei_1/Name",Global.Waiting2).getComponent(cc.Label).string=scJoinSuccess.getUsers()[0].nick;
                    cc.find("BackGround_Pipei_0/Name",Global.Waiting2).getComponent(cc.Label).string=scJoinSuccess.getUsers()[1].nick;
                }
                else {
                    window.gold=scJoinSuccess.getUsers()[1].gold
                    window.othernick=scJoinSuccess.getUsers()[0].nick;
                    window.otherheadUrl=scJoinSuccess.getUsers()[0].head;
                    window.myheadUrl=scJoinSuccess.getUsers()[1].head
                    cc.find("BackGround_Pipei_1/Name",Global.Waiting2).getComponent(cc.Label).string=scJoinSuccess.getUsers()[1].nick;
                    cc.find("BackGround_Pipei_0/Name",Global.Waiting2).getComponent(cc.Label).string=scJoinSuccess.getUsers()[0].nick;
                }
                mqant.request("MatchRoom/HD_Join","1",function (jsondata) {
                    var message=JSON.parse(jsondata);
                    cc.log(message);
                    if(message.Error==""){
                        mqant.requestNR("MatchRoom/HD_SitDown","1");
                    }
                })
            var ani10=Global.Waiting2.getComponent(cc.Animation);
            ani10.ShowDati=function () {
                if(window.m_kNickName==scJoinSuccess.getUsers()[0].nick){
                    Global.Waiting2.active=false;
                    Global.SceneDati.active=true;
                    cc.find("User/User_1/Name",Global.SceneDati).getComponent(cc.Label).string=scJoinSuccess.getUsers()[0].nick;
                    cc.find("User/User_2/Name",Global.SceneDati).getComponent(cc.Label).string=scJoinSuccess.getUsers()[1].nick;
                }
                else {
                    Global.Waiting2.active=false;
                    Global.SceneDati.active=true;
                    cc.find("User/User_1/Name",Global.SceneDati).getComponent(cc.Label).string=scJoinSuccess.getUsers()[1].nick;
                    cc.find("User/User_2/Name",Global.SceneDati).getComponent(cc.Label).string=scJoinSuccess.getUsers()[0].nick;
                }
            }.bind(this)
        });
        mqant.on("MatchCancel",function (jsondata) {
            cc.log("取消匹配成功:房间类型:"+x.getType()+jsondata);
        });
    },
});
module.exports={x,scJoinSuccess}