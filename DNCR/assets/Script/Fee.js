// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var z=require("Button")
var a=require("LoginAndShare")
cc.Class({
    extends: cc.Component,
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        Ruchangfei:{
            default:null,
            type:cc.Node
        },
        Myname:{
            default:null,
            type:cc.Node
        }
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start () {
    },
    update (dt) {
        var cost=new Array(3)
        cost[0]=a.scLobbyInfoRet.cost1;
        cost[1]=a.scLobbyInfoRet.cost2;
        cost[2]=a.scLobbyInfoRet.cost3;
        //cc.log(cost[0]);
        this.Ruchangfei.getComponent(cc.Label).string=cost[z.x.getType()-1];
        this.Myname.getComponent(cc.Label).string=window.m_kNickName;
    },
});
