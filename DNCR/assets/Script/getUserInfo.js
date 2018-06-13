'use strict'
var x1=require("LoginAndShare")
var Flag=true;
function UserDataInfo(id,total,win,duce,type,kind) {
    this.id=id;
    this.total=total;
    this.win=win;
    this.duce=duce;
    this.type=type;
    this.kind=kind;
}
UserDataInfo.prototype={
    constructor:UserDataInfo,
}

function UserTypeData(type,max,now) {
    this.type=type;
    this.max=max;
    this.now=now;
}
UserTypeData.prototype={
    constructor:UserTypeData,
}

function UserKindData(kind,total,right) {
    this.kind=kind;
    this.total=total;
    this.right=right;
}
UserKindData.prototype={
    constructor:UserKindData,
}
var userDataInfo=new UserDataInfo(null,null,null,null,null,null)
var usertypeInfo1=new UserTypeData(null,null,null)
var usertypeInfo2=new UserTypeData(null,null,null)
var usertypeInfo3=new UserTypeData(null,null,null)
var userKindData1=new UserKindData(null,null,null)
var userKindData2=new UserKindData(null,null,null)
var userKindData3=new UserKindData(null,null,null)
var userKindData4=new UserKindData(null,null,null)
var userKindData5=new UserKindData(null,null,null)
cc.Class({
    extends: cc.Component,
    properties:{
        UserName:{
            default:null,
            type:cc.Label
        },
        UserHeadImg:{
          default:null,
          type:cc.Sprite
        },
        Gold:{
            default:null,
            type:cc.Node
        },
        UserWin:{
            default:null,
            type:cc.Node
        },
        UserTotal:{
            default:null,
            type:cc.Node
        },
        Kind1:{
            default:null,
            type:cc.Node
        },
        Kind2:{
            default:null,
            type:cc.Node
        },
        Kind3:{
            default:null,
            type:cc.Node
        },
        Kind4:{
            default:null,
            type:cc.Node
        },
        Kind5:{
            default:null,
            type:cc.Node
        },
        Shenglv:{
            default:null,
            type:cc.Node
        }
    },
    loadUrlImage: function (url, node)
    {
        if (url != null && url != undefined && url != "")
        {
            cc.loader.load(url, {isCrossOrigin : true}, function(err,img){
                if(err)
                {
                    cc.log(err);
                }
                else
                {
                    //cc.log("ok");
                    var texture;
                    if (cc.sys.isNative)
                    {
                        cc.log(img);
                        texture = img;
                    }
                    else
                    {
                        //cc.log(img);
                        var texture2d = new cc.Texture2D();
                        texture2d.initWithElement(img);
                        texture2d.handleLoadedTexture();
                        texture = texture2d;
                    }
                    node.spriteFrame.setTexture(texture);
                }
            });
        }
    },
    start(){
        this.UserName.string=x1.p.getAccount();
        this.loadUrlImage("http://wx.qlogo.cn/mmopen/h0aa7BkejuVPx85xkcz4IJibUj4fgUV0E5jBlg7tvQ9bicMNOiaFLvAMFabTsMSHT3xhqOwoMRWTiaeK800xVMNfZ48LlUbN69yd/132.jpg",this.UserHeadImg);
        var mqant=window.mqant;
        mqant.request("Lobby/HD_GetRecordInfo","",function (jsondata) {
            var message=JSON.parse(jsondata);
            cc.log("getUserInfo");
            cc.log(message);
            userDataInfo=JSON.parse(message.Result);
            cc.log(userDataInfo.id+" "+userDataInfo.duce+" "+userDataInfo.total+" "+userDataInfo.win);
            usertypeInfo1=userDataInfo.type[0];
            cc.log(usertypeInfo1);
            usertypeInfo2=userDataInfo.type[1];
            cc.log(usertypeInfo2);
            usertypeInfo3=userDataInfo.type[2];
            cc.log(usertypeInfo3);
            userKindData1=userDataInfo.kind[0];
            cc.log(userKindData1);
            userKindData2=userDataInfo.kind[1];
            cc.log(userKindData2);
            userKindData3=userDataInfo.kind[2];
            cc.log(userKindData3);
            userKindData4=userDataInfo.kind[3];
            cc.log(userKindData4);
            userKindData5=userDataInfo.kind[4];
            cc.log(userKindData5);
        })
    },
    update () {
      // var node=this.node;
      // var label=this.getComponent(cc.Label);
        //cc.log(x1.csRegister1.getnick()+x1.csRegister1.gethead()+x1.csRegister1.getsex());
        // this.loadUrlImage(window.m_headURL+"?aaa=aa.jpg",this.UserHeadImg);
        // if(Flag){
        //     cc.director.loadScene("GameHall");
        //     Flag=false;
        // }
        cc.find("Name Text",this.Gold).getComponent(cc.Label).string=window.gold;
        this.UserWin.getComponent(cc.Label).string=userDataInfo.win+1;
        this.UserTotal.getComponent(cc.Label).string=userDataInfo.total+1;
        if(userDataInfo.total!=0){
            this.Shenglv.getComponent(cc.Label).string=userDataInfo.win/userDataInfo.total;
        }
        else {this.Shenglv.getComponent(cc.Label).string="0";}
        if(userKindData1.total!=0){
            this.Kind1.getComponent(cc.Label).string="类型1答对率为"+userKindData1.right/userKindData1.total;
        }
        else {this.Kind1.getComponent(cc.Label).string="类型1答对率为"+"0";}
        if(userKindData2.total!=0){
            this.Kind2.getComponent(cc.Label).string="类型2答对率为"+userKindData2.right/userKindData2.total;
        }
        else {this.Kind2.getComponent(cc.Label).string="类型2答对率为"+"0";}
        if(userKindData3.total!=0){
            this.Kind3.getComponent(cc.Label).string="类型3答对率为"+userKindData3.right/userKindData3.total;
        }
        else {this.Kind3.getComponent(cc.Label).string="类型3答对率为"+"0";}
        if(userKindData4.total!=0){
            this.Kind4.getComponent(cc.Label).string="类型4答对率为"+userKindData4.right/userKindData4.total;
        }
        else {this.Kind4.getComponent(cc.Label).string="类型4答对率为"+"0";}
        if(userKindData5.total!=0){
            this.Kind5.getComponent(cc.Label).string="类型5答对率为"+userKindData5.right/userKindData5.total;
        }
        else {this.Kind5.getComponent(cc.Label).string="类型5答对率为"+"0";}
    },
});