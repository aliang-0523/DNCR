// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,
    properties: {
        btnHall:{
            default:null,
            type:cc.Node
        },
        btnBack:{
            default:null,
            type:cc.Node
        },
        btnRet:{
            default:null,
            type:cc.Node
        },
        btnRet2:{
            default:null,
            type:cc.Node
        },
        btnShop1:{
            default:null,
            type:cc.Node
        },
        btnSet1:{
            default:null,
            type:cc.Node
        },
        SceneDati1:{
            default:null,
            type:cc.Node
        },
        Pipei1:{
            default:null,
            type:cc.Node
        },
        Waiting1:{
            default:null,
            type:cc.Node
        },
        Final1:{
            default:null,
            type:cc.Node
        },
        ButtonBefore1:{
            default:null,
            type:cc.Node
        },
        Background1:{
            default:null,
            type:cc.Node
        },
        Window1:{
            default:null,
            type:cc.Node
        }
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
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
    },
    start () {
        Global.hallNode=this.btnHall;
        Global.backNode=this.btnBack;
        Global.return=this.btnRet;
        Global.return2=this.btnRet2;
        Global.btnSet=this.btnSet1;
        Global.btnShop=this.btnShop1;
        Global.SceneDati=this.SceneDati1;
        Global.Pipei=this.Pipei1;
        Global.Waiting2=this.Waiting1;
        Global.Final=this.Final1;
        Global.ButtonBefore=this.ButtonBefore1;
        Global.Background=this.Background1;
        Global.Window=this.Window1;
    },

    // update (dt) {},
});
