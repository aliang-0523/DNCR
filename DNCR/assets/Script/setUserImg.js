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
        UserHeadMy:{
            default:null,
            type:cc.Sprite
        },
        UserHeadOther:{
            default:null,
            type:cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

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
                        cc.log(texture);
                    }
                    node.spriteFrame.setTexture(texture);
                }
            });
        }
    },
     update () {
         //this.loadUrlImage("http://wx.qlogo.cn/mmopen/h0aa7BkejuVPx85xkcz4IJibUj4fgUV0E5jBlg7tvQ9bicMNOiaFLvAMFabTsMSHT3xhqOwoMRWTiaeK800xVMNfZ48LlUbN69yd/132.jpg",this.UserHeadMy);
         //this.loadUrlImage("http://wx.qlogo.cn/mmopen/h0aa7BkejuVPx85xkcz4IJibUj4fgUV0E5jBlg7tvQ9bicMNOiaFLvAMFabTsMSHT3xhqOwoMRWTiaeK800xVMNfZ48LlUbN69yd/132.jpg",this.UserHeadOther);
         this.loadUrlImage(window.m_headURL+"?aaa=aa.jpg",this.UserHeadMy);
         this.loadUrlImage(window.otherheadUrl+"?aaa=aa.jpg",this.UserHeadOther);
     },
});
