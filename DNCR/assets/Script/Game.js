// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

//id:int型（用户ID）,seat:int型（座位索引）,coin:int型（金币数量）,state:int型（玩家状态:未准备，已准备，已断开连接）,score:int型（玩家总分）
function SCRoomPlayerInfo(id,seat,coin,state,score) {
    this.id=id;
    this.seat=seat;
    this.coin=coin;
    this.state=state;
    this.score=score;
}
SCRoomPlayerInfo.prototype= {
    constructor: SCRoomPlayerInfo,
    getId:function () {
        return this.id;
    },
    getSeat:function () {
        return this.seat;
    },
    getCoin:function () {
        return this.coin;
    },
    getState:function () {
        return this.state;
    },
    getScore:function () {
        return this.score;
    }
}

//id:int型数据（问题ID）；kind:int型数据(问题类别);level:int型数据(问题难度);des:string类型（问题描述）;opA,opB,opC,opD:string类型（问题选项）
function SCQuestionInfo(id,kind,level,des,opA,opB,opC,opD) {
    this.id=id;
    this.kind=kind;
    this.level=level;
    this.des=des;
    this.opA=opA;
    this.opB=opB;
    this.opC=opC;
    this.opD=opD;
}
SCQuestionInfo.prototype={
    constructor:SCQuestionInfo,
    getID:function () {
        return this.id;
    },
    getKind:function () {
        return this.kind;
    },
    getLevel:function () {
        return this.level;
    },
    getDes:function(){
        return this.des;
    },
    getOpA:function(){
        return this.opA;
    },
    getOpB:function () {
        return this.opB;
    },
    getOpC:function () {
        return this.opC;
    },
    getOpD:function () {
        return this.opD;
    }
}

//addscore:int类型（增加的得分）;curscore:int类型(当前总分)
function SCScoreUpdate(addscore,curscore) {
    this.addscore=addscore;
    this.curscore=curscore;
}
SCScoreUpdate.prototype= {
    constructor: SCScoreUpdate,
    getAddscore:function () {
        return this.addscore;
    },
    getCurscore:function () {
        return this.curscore;
    }
}

//asID：int型数据（答案,获取客户端答题答案）
function SCAnswerInfo(asID) {
    this.asID=asID;
}
SCAnswerInfo.prototype= {
    constructor: SCAnswerInfo,
    getAsID:function () {
        return this.asID;
    },
    setAsID:function (s) {
        this.asID=s;
    }
}

//uID：int型(用户ID)；score：SCScoreUpdate类型(答题后返回分数信息)；right:SCAnswerInfo(正确答案);self:SCAnswerInfo(自己的答案)
function SCAnswerRet(uID,score,right,self) {
    this.uID=uID;
    this.score=score;
    this.right=right;
    this.self=self;
}
SCAnswerRet.prototype= {
    constructor: SCAnswerRet,
    getUID:function () {
        return this.uID;
    },
    getScore:function () {
        return this.score;
    },
    getRight:function () {
        return this.right;
    },
    getSelf:function () {
        return this.self;
    }
}

//user是SCAnswerRet类型数组(单个玩家本局信息)
function SCOpenRet(user) {
    this.user=user;
}
SCOpenRet.prototype= {
    constructor: SCOpenRet,
    getUser:function () {
        return this.user;
    }
}

//uID:玩家ID（int型）；score：总得分（int类型）；perscore：每局总分（int型数组）
function SCUserSettlement(uID,score,perscore) {
    this.uID=uID;
    this.score=score;
    this.perscore=perscore;
}
SCUserSettlement.prototype= {
    constructor: SCUserSettlement,
    getuID:function () {
        return this.uID;
    },
    getScore:function () {
        return this.score;
    },
    getPerscore:function () {
        return this.perscore
    }
}

//users:玩家结算信息（SCUserSettlement类型数组）
function SCSettlement(wdl,users) {
    this.wdl=wdl;
    this.users=users;
}
SCSettlement.prototype= {
    constructor: SCSettlement,
    getWdl:function () {
        return this.wdl;
    },
    getUsers:function () {
        return this.users;
    }
}

function Time(time) {
    this.time=time;
}
Time.prototype= {
    constructor: Time,
    getTime:function () {
        return this.time;
    }
}
var rightAnswer=0
var rightAnswerOppo=0
var right=0;
var right1=0;
var scQuestionInfo=new SCQuestionInfo(null,null,null,null,null,null,null,null)
var scAnswerInfoSelf=new SCAnswerInfo(null)
var scAnswerInfoSelf1=new SCAnswerInfo(null)
var scAnswerInfoRight=new SCAnswerInfo(null)
var time=new Time(null)
var scAnswerRet=new SCAnswerRet(null,null,null,null)
var scScoreUpdate=new SCScoreUpdate(null,null)
var scOpenRetOppo=new SCOpenRet(null)
var scAnswerRetOppo=new SCAnswerRet(null,null,null,null)
var scScoreUpdateOppo=new SCScoreUpdate(null,null)
var scAnswerInfoSelfOppo=new SCAnswerInfo(null)
var scSettlement=new SCSettlement(null,null)
var scUserSettlementSelf=new SCUserSettlement(null,null,null)
var scUserSettlement=new SCUserSettlement(null,null,null)
var isInteractable=true
var isChallengeSuccess=true
var timuNum=0;
var timuNumCN=new Array(5)
timuNumCN[0]="第一题"
timuNumCN[1]="第二题"
timuNumCN[2]="第三题"
timuNumCN[3]="第四题"
timuNumCN[4]="第五题"
window.mID=0;
var NotChoose=0;
var pingju=false;
cc.Class({
    extends: cc.Component,
    properties:{
    },

    loadUrlImage:function (url, node)
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
    start:function () {
        var mqant=window.mqant;
        mqant.on("game/UserJoin", function (jsondata) {
            // var message=JSON.parse(jsondata);
            // cc.log(message)
            cc.log("UserJoin");
        })
        mqant.on("game/EnterIdle", function (jsondata) {
            // var message=JSON.parse(jsondata);
            // cc.log(message)
            cc.log("EnterIdle");
        })
        //设置问题内容
        mqant.on("game/Answer", function (jsondata) {
            var message=JSON.parse(jsondata);
            scQuestionInfo=message;
            cc.log(message);
            cc.find("Leibie/Leibie",Global.SceneDati).getComponent(cc.Label).string="类别:"+scQuestionInfo.kind;
            cc.find("problem",Global.SceneDati).getComponent(cc.Label).string=scQuestionInfo.des;
            cc.find("OptionButton/Button_1/Answer0",Global.SceneDati).getComponent(cc.Label).string=scQuestionInfo.opA;
            cc.find("OptionButton/Button_2/Answer1",Global.SceneDati).getComponent(cc.Label).string=scQuestionInfo.opB;
            cc.find("OptionButton/Button_3/Answer2",Global.SceneDati).getComponent(cc.Label).string=scQuestionInfo.opC;
            cc.find("OptionButton/Button_4/Answer3",Global.SceneDati).getComponent(cc.Label).string=scQuestionInfo.opD;
            cc.log("Answer");
        })
        //按钮点击后发回的点击信息
        mqant.on("game/updateScore", function (jsondata) {
            var message=JSON.parse(jsondata);
            cc.log(message)
            scAnswerRet=message;
            window.mID=scAnswerRet.uID;
            scScoreUpdate=scAnswerRet.score;
            scAnswerInfoRight=scAnswerRet.right;
            cc.log(scAnswerInfoRight.asID)
            if(scAnswerInfoRight.asID==scAnswerInfoSelf.asID){
                cc.log("回答正确");
                rightAnswer++;
                cc.loader.loadRes("Texture/Logo/option_Right", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("OptionButton/Button_"+scAnswerInfoRight.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.find("OptionButton/ButtonCorrect/right"+scAnswerInfoRight.asID,Global.SceneDati).active=true
                cc.find("Score_1/grade",Global.SceneDati).getComponent(cc.Label).string=scScoreUpdate.curscore;
                cc.log(rightAnswer);
                cc.log(scAnswerInfoRight.asID*100)
                cc.log(scScoreUpdate.curscore)
                cc.find("Score_1/bar",Global.SceneDati).height=scScoreUpdate.curscore/4500*547;
            }
            else{
                var ani1 = Global.SceneDati.getComponent(cc.Animation);
                ani1.play('Mistake');
                cc.log("回答错误");
                cc.loader.loadRes("Texture/Logo/option_Mistake", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("OptionButton/Button_"+scAnswerInfoSelf.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.loader.loadRes("Texture/Logo/option_Right", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("OptionButton/Button_"+scAnswerInfoRight.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.find("OptionButton/ButtonCorrect/mistake"+scAnswerInfoSelf.asID,Global.SceneDati).active=true
                cc.log(scAnswerInfoSelf.asID*100)
            }
            //cc.log(scAnswerRet.uID+scScoreUpdate.addscore+scScoreUpdate.curscore)
            cc.log("updateScore");
        })
        //每次答题后的结算
        mqant.on("game/Opening", function (jsondata) {
            var message=JSON.parse(jsondata);
            scOpenRetOppo=message;
            cc.log(scOpenRetOppo.user[1]);
            cc.log(scOpenRetOppo.user[0]);
            scAnswerRetOppo=scOpenRetOppo.user[1];
            if(scAnswerRet.uID==null){
                scAnswerInfoSelfOppo=scAnswerRetOppo.self;
                scAnswerInfoSelf1=scOpenRetOppo.user[0].self;
                //判断是哪个未选择
                if(scAnswerInfoSelfOppo.asID==0&&scAnswerInfoSelf1.asID!=0){
                    NotChoose=2;
                    scAnswerInfoRight=scOpenRetOppo.user[0].right;
                    right1=scAnswerInfoSelf1.asID;
                    if (scAnswerInfoSelf1.asID == scAnswerInfoRight.asID) {
                        rightAnswerOppo++;
                        cc.loader.loadRes("Texture/Logo/option_Right", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_"+scAnswerInfoRight.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.find("Score_2/bar", Global.SceneDati).height = scOpenRetOppo.user[0].score.curscore/4500 * 547;
                        cc.find("OptionButton/ButtonCorrect/right" + scAnswerInfoRight.asID + "OPPO", Global.SceneDati).active = true
                    }
                    else {
                        cc.loader.loadRes("Texture/Logo/option_Right", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_"+scAnswerInfoRight.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_" + scAnswerInfoSelf1.asID, Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.find("OptionButton/ButtonCorrect/mistake" + scAnswerInfoSelf1.asID + "OPPO", Global.SceneDati).active = true
                    }
                    cc.find("Score_2/grade", Global.SceneDati).getComponent(cc.Label).string = scOpenRetOppo.user[0].score.curscore;
                }
                else if(scAnswerInfoSelfOppo.asID!=0&&scAnswerInfoSelf1.asID==0){
                    NotChoose=1;
                    scAnswerInfoRight=scAnswerRetOppo.right;
                    right1=scAnswerInfoSelfOppo.asID;
                    if (scAnswerInfoSelfOppo.asID == scAnswerInfoRight.asID) {
                        rightAnswerOppo++;
                        cc.find("Score_2/bar", Global.SceneDati).height = scAnswerRetOppo.score.curscore/4500 * 547;
                        cc.find("OptionButton/ButtonCorrect/right" + scAnswerInfoRight.asID + "OPPO", Global.SceneDati).active = true
                        cc.loader.loadRes("Texture/Logo/option_Right", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_"+scAnswerInfoRight.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                    }
                    else {
                        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_" + scAnswerInfoSelfOppo.asID, Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("Texture/Logo/option_Right", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_"+scAnswerInfoRight.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.find("OptionButton/ButtonCorrect/mistake" + scAnswerInfoSelfOppo.asID + "OPPO", Global.SceneDati).active = true
                    }
                    cc.find("Score_2/grade", Global.SceneDati).getComponent(cc.Label).string = scAnswerRetOppo.score.curscore;
                }
                else if(scAnswerInfoSelfOppo.asID==0&&scAnswerInfoSelf1.asID==0){
                    NotChoose=0;
                    cc.loader.loadRes("Texture/Logo/option_Right", cc.SpriteFrame, function (err, spriteFrame) {
                        cc.find("OptionButton/Button_"+scAnswerRetOppo.right.asID,Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                }
            }
            else if(scAnswerRet.uID!=scAnswerRetOppo.uID){
                scScoreUpdateOppo=scAnswerRetOppo.score;
                cc.log(scScoreUpdateOppo.curscore);
                scAnswerInfoSelfOppo=scAnswerRetOppo.self;
                right=scAnswerInfoSelfOppo.asID;
                if(scAnswerInfoSelfOppo.asID!=0){
                    if (scAnswerInfoSelfOppo.asID == scAnswerInfoRight.asID) {
                        rightAnswerOppo++;
                        cc.log(scScoreUpdateOppo.curscore)
                        cc.find("Score_2/bar", Global.SceneDati).height = scScoreUpdateOppo.curscore/4500 * 547;
                        cc.find("OptionButton/ButtonCorrect/right" + scAnswerInfoRight.asID + "OPPO", Global.SceneDati).active = true
                    }
                    else {
                        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_" + scAnswerInfoSelfOppo.asID, Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.find("OptionButton/ButtonCorrect/mistake" + scAnswerInfoSelfOppo.asID + "OPPO", Global.SceneDati).active = true
                    }
                    cc.find("Score_2/grade", Global.SceneDati).getComponent(cc.Label).string = scScoreUpdateOppo.curscore;
                }
            }
            else{
                scAnswerRetOppo=scOpenRetOppo.user[0];
                scScoreUpdateOppo=scAnswerRetOppo.score;
                cc.log(scScoreUpdateOppo.curscore);
                scAnswerInfoSelfOppo=scAnswerRetOppo.self;
                right=scAnswerInfoSelfOppo.asID;
                if(scAnswerInfoSelfOppo.asID!=0){
                    if (scAnswerInfoSelfOppo.asID == scAnswerInfoRight.asID) {
                        rightAnswerOppo++;
                        cc.find("Score_2/bar", Global.SceneDati).height = scScoreUpdateOppo.curscore/4500 * 547;
                        cc.find("OptionButton/ButtonCorrect/right" + scAnswerInfoRight.asID + "OPPO", Global.SceneDati).active = true
                    }
                    else {
                        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("OptionButton/Button_" + scAnswerInfoSelfOppo.asID, Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.find("OptionButton/ButtonCorrect/mistake" + scAnswerInfoSelfOppo.asID + "OPPO", Global.SceneDati).active = true
                    }
                    cc.find("Score_2/grade", Global.SceneDati).getComponent(cc.Label).string = scScoreUpdateOppo.curscore;
                }
            }
            scAnswerRet=new SCAnswerRet(null,null,null,null)
        })
        //结算
        mqant.on("game/Settlement", function (jsondata) {
            var message=JSON.parse(jsondata);
            scSettlement=message;
            scUserSettlement=scSettlement.users[1];
            cc.log(scSettlement.users[0])
            cc.log(scSettlement.users[1]);
            cc.log(scSettlement.wdl);
            //本地是玩家1
            if(window.mID!=scUserSettlement.uID){
                scUserSettlementSelf=scSettlement.users[0];
                scUserSettlement=scSettlement.users[1];
                if(scSettlement.wdl=='W:L'){
                    cc.find("User/User_1/Name",Global.Final).getComponent(cc.Label).string=window.m_kNickName;
                    cc.find("User/User_2/Name",Global.Final).getComponent(cc.Label).string=window.othernick;
                    // this.loadUrlImage(window.myheadUrl, cc.find("User/User_1/Touxiang",Global.Final));
                    // this.loadUrlImage(window.otherheadUrl, cc.find("User/User_2/Touxiang",Global.Final));
                    cc.find("User/User_1/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlementSelf.score;
                    cc.find("User/User_2/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlement.score;
                    cc.log("挑战成功");
                    isChallengeSuccess=true
                }
                else if(scSettlement.wdl=='L:W'){
                    cc.find("User/User_1/Name",Global.Final).getComponent(cc.Label).string=window.m_kNickName;
                    cc.find("User/User_2/Name",Global.Final).getComponent(cc.Label).string=window.othernick;
                    // this.loadUrlImage(window.myheadUrl, cc.find("User/User_1/Touxiang",Global.Final));
                    // this.loadUrlImage(window.otherheadUrl, cc.find("User/User_2/Touxiang",Global.Final));
                    cc.find("User/User_1/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlementSelf.score;
                    cc.find("User/User_2/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlement.score;
                    cc.log("挑战失败");
                    isChallengeSuccess=false;
                }
                else if(scSettlement.wdl=='D:D'){
                    cc.find("User/User_1/Name",Global.Final).getComponent(cc.Label).string=window.m_kNickName;
                    cc.find("User/User_2/Name",Global.Final).getComponent(cc.Label).string=window.othernick;
                    // this.loadUrlImage(window.myheadUrl, cc.find("User/User_1/Touxiang",Global.Final));
                    // this.loadUrlImage(window.otherheadUrl, cc.find("User/User_2/Touxiang",Global.Final));
                    cc.find("User/User_1/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlementSelf.score;
                    cc.find("User/User_2/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlement.score;
                    pingju=true;
                    isChallengeSuccess=false;
                }
            }
            //本地是玩家2
            else if(window.mID==scUserSettlement.uID){
                scUserSettlementSelf=scSettlement.users[1];
                scUserSettlement=scSettlement.users[0];
                if(scSettlement.wdl=='W:L'){
                    cc.find("User/User_1/Name",Global.Final).getComponent(cc.Label).string=window.m_kNickName;
                    cc.find("User/User_2/Name",Global.Final).getComponent(cc.Label).string=window.othernick;
                    // this.loadUrlImage(window.myheadUrl, cc.find("User/User_1/Touxiang",Global.Final));
                    // this.loadUrlImage(window.otherheadUrl, cc.find("User/User_2/Touxiang",Global.Final));
                    cc.find("User/User_1/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlementSelf.score;
                    cc.find("User/User_2/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlement.score;
                    cc.log("挑战失败");
                    isChallengeSuccess=false;
                }
                else if(scSettlement.wdl=='L:W'){
                    cc.find("User/User_1/Name",Global.Final).getComponent(cc.Label).string=window.m_kNickName;
                    cc.find("User/User_2/Name",Global.Final).getComponent(cc.Label).string=window.othernick;
                    // this.loadUrlImage(window.myheadUrl, cc.find("User/User_1/Touxiang",Global.Final));
                    // this.loadUrlImage(window.otherheadUrl, cc.find("User/User_2/Touxiang",Global.Final));
                    cc.find("User/User_1/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlementSelf.score;
                    cc.find("User/User_2/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlement.score;
                    cc.log("挑战成功");
                    isChallengeSuccess=true;
                }
                else if(scSettlement.wdl=='D:D'){
                    cc.find("User/User_1/Name",Global.Final).getComponent(cc.Label).string=window.m_kNickName;
                    cc.find("User/User_2/Name",Global.Final).getComponent(cc.Label).string=window.othernick;
                    // this.loadUrlImage(window.myheadUrl, cc.find("User/User_1/Touxiang",Global.Final));
                    // this.loadUrlImage(window.otherheadUrl, cc.find("User/User_2/Touxiang",Global.Final));
                    cc.find("User/User_1/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlementSelf.score;
                    cc.find("User/User_2/Fen/Score", Global.Final).getComponent(cc.Label).string = scUserSettlement.score;
                    pingju=true;
                    isChallengeSuccess=false;
                }
            }
            rightAnswer=0;
            rightAnswerOppo=0
            right=0;
            right1=0;
            timuNum=0;
            cc.log("Settlement");
        })
        //倒计时UI更新
        mqant.on("game/TimeUpdate", function (jsondata) {
            var message=JSON.parse(jsondata);
            cc.log(message)
            time=message;
            if(time.time==1){
                isInteractable=false;
                cc.find("OptionButton/Button_1",Global.SceneDati).getComponent(cc.Button).interactable=false
                cc.find("OptionButton/Button_2",Global.SceneDati).getComponent(cc.Button).interactable=false;
                cc.find("OptionButton/Button_3",Global.SceneDati).getComponent(cc.Button).interactable=false;
                cc.find("OptionButton/Button_4",Global.SceneDati).getComponent(cc.Button).interactable=false;
            }
            if(time.time==10){
                var ani = Global.SceneDati.getComponent(cc.Animation);
                ani.play('Leibie_Button');
                cc.find("Bg_Pipeizhong",Global.Background).active=false;
                timuNum++;
                cc.find("Leibie/NO",Global.SceneDati).getComponent(cc.Label).string=timuNumCN[timuNum-1];
                isInteractable=true;
                cc.find("OptionButton/ButtonCorrect/right"+1+"OPPO",Global.SceneDati).active=false;
                cc.find("OptionButton/ButtonCorrect/mistake"+1+"OPPO",Global.SceneDati).active=false;
                cc.find("OptionButton/ButtonCorrect/right"+2+"OPPO",Global.SceneDati).active=false;
                cc.find("OptionButton/ButtonCorrect/mistake"+2+"OPPO",Global.SceneDati).active=false;
                cc.find("OptionButton/ButtonCorrect/right"+3+"OPPO",Global.SceneDati).active=false;
                cc.find("OptionButton/ButtonCorrect/mistake"+3+"OPPO",Global.SceneDati).active=false;
                cc.find("OptionButton/ButtonCorrect/right"+4+"OPPO",Global.SceneDati).active=false;
                cc.find("OptionButton/ButtonCorrect/mistake"+4+"OPPO",Global.SceneDati).active=false;
                if(scAnswerInfoSelf.asID!=null&&scAnswerInfoSelfOppo.asID!=null){
                    cc.find("OptionButton/ButtonCorrect/mistake"+scAnswerInfoSelf.asID,Global.SceneDati).active=false;
                    cc.find("OptionButton/ButtonCorrect/right"+scAnswerInfoSelf.asID,Global.SceneDati).active=false;
                }
                cc.loader.loadRes("Texture/Logo/option", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("OptionButton/Button_1",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.loader.loadRes("Texture/Logo/option", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("OptionButton/Button_2",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.loader.loadRes("Texture/Logo/option", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("OptionButton/Button_3",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.loader.loadRes("Texture/Logo/option", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("OptionButton/Button_4",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
            if(isInteractable) {
                cc.find("OptionButton/Button_1", Global.SceneDati).getComponent(cc.Button).interactable = true
                cc.find("OptionButton/Button_2", Global.SceneDati).getComponent(cc.Button).interactable = true;
                cc.find("OptionButton/Button_3", Global.SceneDati).getComponent(cc.Button).interactable = true;
                cc.find("OptionButton/Button_4", Global.SceneDati).getComponent(cc.Button).interactable = true;
            }
            cc.find("Time/time",Global.SceneDati).getComponent(cc.Label).string=time.time;
            cc.log("TimeUpdate");
        }),

        //游戏结束
        mqant.on("game/GameEnd", function () {
            cc.log("GameEnd");
            if(isChallengeSuccess){
                Global.Final.active=true;
                var ani7 = Global.Final.getComponent(cc.Animation);
                ani7.play('Final');
                cc.find("Fefeat", Global.Final).active=false;
                cc.find("Pingju", Global.Final).active=false;
                cc.find("Success", Global.Final).active=true;
            }
            else if(pingju){
                Global.Final.active=true;
                var ani9 = Global.Final.getComponent(cc.Animation);
                ani9.play('Final_Pingju');
                cc.find("Success", Global.Final).active=false;
                cc.find("Fefeat", Global.Final).active=false;
                cc.find("Pingju", Global.Final).active=true;
            }
            else if(isChallengeSuccess==false&&pingju==false){
                Global.Final.active=true;
                var ani8 = Global.Final.getComponent(cc.Animation);
                ani8.play('Final_Defeat');
                cc.find("Pingju", Global.Final).active=false;
                cc.find("Success", Global.Final).active=false;
                cc.find("Fefeat", Global.Final).active=true;
            }
            Global.SceneDati.active=false;
            rightAnswer=0;
            rightAnswerOppo=0
            right=0;
            right1=0;
            isChallengeSuccess=false;
            pingju=false;
        })
    },
    ChooseA:function () {
        isInteractable=false;
        scAnswerInfoSelf.setAsID(1);
        cc.log(scAnswerInfoSelf.getAsID());
        var mqant=window.mqant;
        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("OptionButton/Button_1",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.find("OptionButton/Button_1",Global.SceneDati).getComponent(cc.Button).interactable=false
        cc.find("OptionButton/Button_2",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_3",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_4",Global.SceneDati).getComponent(cc.Button).interactable=false;
        mqant.requestNR("MatchRoom/HD_UserAnswer",scAnswerInfoSelf);
    },
    ChooseB:function () {
        isInteractable=false;
        scAnswerInfoSelf.setAsID(2);
        cc.log(scAnswerInfoSelf.getAsID());
        var mqant=window.mqant;
        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("OptionButton/Button_2",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.find("OptionButton/Button_1",Global.SceneDati).getComponent(cc.Button).interactable=false
        cc.find("OptionButton/Button_2",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_3",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_4",Global.SceneDati).getComponent(cc.Button).interactable=false;
        mqant.requestNR("MatchRoom/HD_UserAnswer",scAnswerInfoSelf);
    },
    ChooseC:function () {
        isInteractable=false;
        scAnswerInfoSelf.setAsID(3);
        cc.log(scAnswerInfoSelf.getAsID());
        var mqant=window.mqant;
        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("OptionButton/Button_3",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.find("OptionButton/Button_1",Global.SceneDati).getComponent(cc.Button).interactable=false
        cc.find("OptionButton/Button_2",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_3",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_4",Global.SceneDati).getComponent(cc.Button).interactable=false;
        mqant.requestNR("MatchRoom/HD_UserAnswer",scAnswerInfoSelf);
    },
    ChooseD:function () {
        isInteractable=false;
        scAnswerInfoSelf.setAsID(4);
        cc.log(scAnswerInfoSelf.getAsID());
        var mqant=window.mqant;
        cc.loader.loadRes("Texture/Logo/option_0", cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("OptionButton/Button_4",Global.SceneDati).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.find("OptionButton/Button_1",Global.SceneDati).getComponent(cc.Button).interactable=false
        cc.find("OptionButton/Button_2",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_3",Global.SceneDati).getComponent(cc.Button).interactable=false;
        cc.find("OptionButton/Button_4",Global.SceneDati).getComponent(cc.Button).interactable=false;
        mqant.requestNR("MatchRoom/HD_UserAnswer",scAnswerInfoSelf);
    },

    Continue:function () {
        cc.log("continue");
    },
});