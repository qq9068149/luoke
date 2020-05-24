<!-- Evaluation -->
<template>
    <div class='evaluation'>
        <div class='home-header'>
            <div class="logo">
                <a href="/"><img src="@/assets/logo-home.png" alt=""></a>
            </div>
            <div class="user-menu">
                <div class="login" v-if="!userLogin">
                    <el-button type="text" @click="showLogin" style="color: #fff;">登录/注册</el-button>
                </div>
                <div class="user" v-if="userLogin">
                    <el-button type="text" @click="goUrl('/Workbench')" style="color:#fff;font-size:14px;">
                        进入管理后台
                    </el-button>
                    <el-popover placement="bottom" width="" popper-class="noP" trigger="click">
                        <el-button style="width:100%;background:rgba(246,246,246,1);border: 0px;" @click="loginOut">退出</el-button>
                        <el-button slot="reference" type="text" style="font-size:14px;color:rgba(255,255,255,1);margin-right: 20px;">
                            <img style="width:30px;border-radius: 50%;float:left;margin: -10px 11px 0px 25px;" :src="loginUserMsg.avatar" alt="">{{loginUserMsg.nickname}}
                        </el-button>
                    </el-popover>
                </div>
            </div>
            <div class="user-menu">
            </div>
        </div>
        <div class="head-top">
            <el-breadcrumb separator="/" class="head-top-nav">
                <el-breadcrumb-item :to="{ path: (this.$route.query.path||'/') }">{{this.$route.query.pathName||'首页'}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: ('/EvaluationIndex?id='+this.$route.query.fid) }" v-if="this.$route.query.fname">{{this.$route.query.fname}}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="details-top">
            <div class="box">
                <div class="details-top-left">
                    <img :src="paperData.setting.img" alt="" class="details-img">
                    <div class="details-left-time">测评有效期：{{(paperData.setting.date||{}).num}}个月</div>
                </div>
                <div class="details-top-left">
                    <div class="details-title">{{paperData.name}}</div>
                    <div class="details-info">· {{paperData.setting.type1}} · {{paperData.quesCount}}题 · 预估用时{{paperData.setting.time}}分钟</div>
                    <div class="details-price">
                        <span class="details-price-new">¥{{paperData.setting.price}}</span>
                        <span class="details-price-old">¥{{paperData.setting.defaultPrice||0}}</span>
                        <span class="details-price-info" v-if="!isVip">升级VIP，平均每份测评仅需16.6元</span>
                        <span class="details-price-btn" v-if="!isVip">
                            <el-button type="danger" round size="small" @click="goUrl('/Vip')">立即升级</el-button>
                        </span>
                    </div>
                    <div class="details-btn">
                        <el-button type="primary" @click="buying">立即购买</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="details-account">
            <div class="box">
                <div class="details-account-title">测评简介</div>
                <div class="details-account-bord"></div>
                <div class="details-account-info">{{paperData.setting.info}}</div>
                <template v-if="paperData.setting.showMeasureDimension">
                    <div class="details-account-title">测量维度</div>
                    <div class="details-account-bord"></div>
                    <div class="details-account-count" :class="(paperData.setting.measureDimension||[]).length == 1 ? 'lll3': ''">
                        <div class="details-account-count-list" v-for="(item,index) in paperData.setting.measureDimension" :key="index">{{item}}</div>
                    </div>
                </template>
            </div>
        </div>
        <div class="details-account" style="background:rgba(248,251,255,1);margin-top: 0px;">
            <div class="box">
                <div v-if="paperData.setting.showTag">
                    <div class="details-account-title">适用场景</div>
                    <div class="details-account-bord"></div>
                    <div class="details-account-scene"
                         :class="(paperData.setting.apply||[]).length == 1 ? 'lll': (paperData.setting.apply||[]).length == 2 ? 'lll2' :  ''">
                        <div class="details-account-scene-list" v-for="(item,index) in (paperData.setting.apply||[])" :key="index">
                            <img :src="item.icon||'@/assets/scene.png'" alt="">
                            <div class="details-account-scene-title">{{item.name}}</div>
                            <div class="details-account-scene-info">{{item.content}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="paperData.setting.showApplyObjArr">
                    <div class="details-account-title">适用行业</div>
                    <div class="details-account-bord"></div>
                    <div class="details-account-count" :class="(paperData.setting.applyObjArr||[]).length == 1 ? 'lll3': ''">
                        <div class="details-account-count-list" v-for="(item,index) in (paperData.setting.applyObjArr||[])" :key="index">{{item}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="details-account" style="margin-top: 0px;">
            <div class="box">
                <div class="details-account-title">题型介绍</div>
                <div class="details-account-bord"></div>
                <div class="details-subject" :class="(paperData.setting.quesType||[]).length == 1 ? 'lll4' : ''">
                    <div class="details-subject-count" v-for="(item,index) in (paperData.setting.quesType||[])" :key="index">
                        <div class="details-subject-title">{{index+1}}、{{item.ques.stem}}</div>
                        <div class="details-subject-list" v-for="(option,i) in (item.ques.options||[])" :key="i">
                            <div class="details-subject-list-left">{{charts[i]}}:</div>
                            <div class="details-subject-list-right">{{option}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="details-account" style="margin-top: 0px;">
            <div class="footer" style="margin-top:0px;">
                <div class="footer-top">
                    <div class="footer-top-left">
                        <div class="footer-list">电话：4008877091</div>
                        <div class="footer-list">邮箱：hz@luoke101.com</div>
                        <div class="footer-list">地址：福建省厦门市思明区望海路61号</div>
                    </div>
                    <div class="footer-top-right">
                        <div class="footer-code">
                            <img src="@/assets/qrCode.jpg" alt="">
                            <div class="footer-code-count">扫码关注<br>好啦测评公众号</div>
                        </div>
                        <div class="footer-code">
                            <img src="@/assets/miniProgram.jpg" alt="">
                            <div class="footer-code-count">扫码关注<br>好啦测评小程序</div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">罗课（厦门）网络科技有限公司 Copyright ©2019 <a href="http://www.miitbeian.gov.cn" target="_blank" style="color: #ffffff">闽ICP备19024736号-2</a>
                </div>
            </div>
            <el-dialog title="" :visible.sync="wxLogin" width="412px" center>
                <span style="text-align: center">
                    <div class="wx-login-title">微信扫码登录</div>
                    <div class="wx-login-bord"></div>
                    <div class="wx-login-info">请使用微信扫一扫登录</div>
                    <div class="wx-login-img">
                        <img :src="qrcode" alt="">
                    </div>
                    <div class="wx-login-foot" v-if="isBuy">
                        您还没有登录，登录后才可购买测评
                    </div>
                </span>
            </el-dialog>
            <el-dialog title="" :visible.sync="userBuy" width="419px">
                <span>
                    <div class="user-buy-top">
                        <div class="user-buy-left">
                            <img :src="paperData.setting.img" alt="">
                        </div>
                        <div class="user-buy-left">
                            <div class="user-buy-title">{{paperData.name}}</div>
                            <div class="user-buy-sale">单价：{{paperData.setting.price}}</div>
                        </div>
                    </div>
                    <div class="user-buy-form">
                        <el-input-number v-model="num" @change="handleChange" :min="1" :max="999" label="描述文字"></el-input-number>
                        <span class="user-buy-label">合计：</span>
                        <span class="user-buy-price">{{allPrice}}元</span>
                    </div>
                    <div class="user-buy-mode">
                        <div class="user-buy-mode-title">支付方式：</div>
                        <div class="user-buy-mode-count">
                            <div class="left">
                                <img src="@/assets/wx.png" alt="">
                                <span class="mode-title">微信支付</span>
                            </div>
                            <div class="right">
                                <el-radio v-model="buyMode" label="1"></el-radio>
                            </div>
                        </div>
                        <div class="user-buy-mode-count">
                            <div class="left">
                                <img src="@/assets/quan.png" alt="">
                                <span class="mode-title">用券兑换</span>
                            </div>
                            <div class="right"><span style="font-size:14px;color:rgba(144,145,156,1);margin-right: 19px;">{{(paperData.userPapersNum.freeTicket ||0)+ (paperData.userPapersNum.vipTicket||0)}}张券可用于本测评</span>
                                <el-radio v-model="buyMode" label="3"></el-radio>
                            </div>
                        </div>
                        <div class="user-buy-mode-btn">
                            <el-button type="primary" @click="buyed">立即购买</el-button>
                        </div>
                    </div>
                </span>
            </el-dialog>
            <el-dialog title="" :visible.sync="buyOk" width="419px" center>
                <span style="text-align: center">
                    <div style="font-size: 35px;color:rgba(103,194,58,1);margin-top: 103px;"><i class="el-icon-check"></i></div>
                    <div style="font-size:16px;color:rgba(103,194,58,1);margin-top: 20px;">购买成功</div>
                    <div style="">
                        <el-button type="primary" style="width:301px;margin-top: 53px;margin-bottom: 142px;"
                                   @click="goUrl('/ManageIndex')">进入管理后台发放测评</el-button>
                    </div>
                </span>
            </el-dialog>
            <el-dialog class="payDlg" title="" v-if="payQrcode" :visible.sync="payDlg" width="419px" center>
                <img :src="payQrcode" alt="" width="150px" height="150px">
                <div class="mind">请使用微信扫描此二维码进行支付</div>
                <el-button type="primary" @click="checkPay(true)">我已完成支付</el-button>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import QRCode from "qrcode";

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                id: "",
                orderId: "",
                isVip: false,
                loginUserMsg: {},
                payQrcode: "",
                payDlg: false,
                payUrl: "",
                charts: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"],
                userLogin: false,
                name: '',
                paperData: {
                    setting: {},
                    userPapersNum: {}
                },
                wxLogin: false,
                userBuy: false,
                isBuy: true,//是否购买进入的登录界面
                buyOk: false,
                num: 1,
                buyMode: '1',
                allPrice: 0,
                loginData: {},
                qrcode: ""
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            //获取微信二维码
            getQrcode() {
                var _this = this;
                axios({
                    url: this.GLOBAL.baseURL + 'pcLogin',
                    method: "post",
                    data: {}
                }).then(function(response) {
                    // console.log(response);
                    if (response.status == 200) {
                        response.data.now = new Date().getTime();
                        _this.loginData = response.data;
                        QRCode.toDataURL(_this.loginData.url, {
                            errorCorrectionLevel: "L",
                            margin: 2
                        }, function(err, url) {
                            _this.qrcode = url;
                            _this.checkPCLogin();
                        });
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            },
            //检查用户登录
            checkPCLogin() {
                var _this = this;
                var loginData = _this.loginData;
                var now = new Date().getTime();
                var t = (now - loginData.now) / 1000;
                if (t >= loginData.time) {
                    //刷新二维码
                    _this.getQrcode();
                    return;
                }
                _this.doAjax({
                    url: 'checkPCLogin',
                    method: "post",
                    data: {
                        "key": _this.loginData.key
                    },
                    success: function(response) {
                        // console.log(response);
                        if (response.status == 200 && response.data) {
                            var token = response.data;
                            //存储token到本地缓存--完成登录操作
                            _this.GLOBAL.token = token;
                            _this.GLOBAL.tokenGetTime = new Date().getTime();
                            localStorage.setItem("tokenMsg", JSON.stringify({
                                token: token,
                                tokenGetTime: _this.GLOBAL.tokenGetTime
                            }));
                            window.location.reload();
                        } else {
                            setTimeout(_this.checkPCLogin, 1000); //每秒重复请求
                        }
                    }
                });
            },
            buyed() {
                var _this = this;
                var type = +_this.buyMode;
                var num = _this.num;
                var paperData = _this.paperData;
                _this.doAjax({
                    url: "buyPaper",
                    method: "post",
                    data: {
                        payPC: true,
                        id: paperData.id,
                        count: num,
                        type: type || 1
                    },
                    success: function(ret) {
                        ret = ret.data;
                        if (type != 1) {
                            //用券购买
                            _this.buyOk = true;
                            _this.loadPaperDetail();
                            return;
                        }
                        QRCode.toDataURL(ret.code_url, {
                            errorCorrectionLevel: "L",
                            margin: 2
                        }, function(err, url) {
                            _this.payQrcode = url;
                            _this.payDlg = true;
                        });
                        _this.orderId = ret.orderId;
                        _this.checkPay();
                    }
                });
            },
            checkPay(checkOnes) {
                //微信支付购买测评
                var _this = this;
                if (!_this.payDlg || !_this.orderId) return;
                _this.doAjax({
                    url: "checkOrderStatus",
                    method: "post",
                    data: {
                        id: _this.orderId
                    },
                    success: function(ret) {
                        if (ret.data == "true") {
                            _this.buyOk = true;
                            _this.loadPaperDetail();
                        } else {
                            if (checkOnes) return;
                            setTimeout(_this.checkPay, 1000);
                        }
                    }
                });
            },
            handleChange(value) {
                var price = this.paperData.setting.price
                this.allPrice = price * value
            },
            showLogin() {
                this.getQrcode();
                this.wxLogin = true;
                this.isBuy = false;
            },
            buying() {
                var _this = this
                var userToken = _this.GLOBAL.token;
                if (userToken == '' || !userToken) {
                    _this.getQrcode();
                    _this.wxLogin = true;
                    _this.isBuy = true;
                } else {
                    _this.userBuy = true
                }
            },
            loadPaperDetail() {
                var _this = this;
                var id = _this.id;
                _this.doAjax({
                    url: 'paperDetail',
                    method: "get",
                    data: {
                        id: id
                    },
                    success: function(response) {
                        _this.paperData = response.data;
                        _this.allPrice = response.data.setting.price;
                        var isVip1 = _this.GLOBAL.isvip1;
                        var isVip2 = _this.GLOBAL.isvip2;
                        _this.isVip = isVip1 || isVip2;
                    }
                });
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            var _this = this;
            var id = _this.$route.query.id;
            this.loginUserMsg = this.GLOBAL.loginUserMsg;
            this.userLogin = this.GLOBAL.token ? true : false;
            this.id = id;
            _this.loadPaperDetail();//未登录也可以查看测评详情
            this.checkUserTeam(function() {
                if (!id) return;
            });
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            var _this = this;
            var name = _this.$route.query.name
            var id = _this.$route.query.id
            _this.name = name;
            this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0)
            })
        },
        beforeCreate() {
        }, //生命周期 - 创建之前
        beforeMount() {
        }, //生命周期 - 挂载之前
        beforeUpdate() {
        }, //生命周期 - 更新之前
        updated() {
        }, //生命周期 - 更新之后
        beforeDestroy() {
            this.payDlg = false;
        }, //生命周期 - 销毁之前
        destroyed() {
        }, //生命周期 - 销毁完成
        activated() {
        }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类

    .toptop {
        margin-top: 17px !important;
    }

    .lll {
        margin-left: 450px !important;
    }

    .lll2 {
        margin-left: 310px !important;
    }

    .lll3 {
        margin-left: 350px !important;
    }

    .lll4 {
        margin-left: 320px !important;
    }

    .user-buy-mode {
        padding-top: 20px;
    }

    .user-buy-mode-title {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(92, 97, 113, 1);
        margin-bottom: 10px;
    }

    .user-buy-mode-count {
        overflow: hidden;
        height: 40px;
        line-height: 40px;
    }

    .user-buy-mode-count .left {
        float: left;
    }

    .user-buy-mode-count .right {
        float: right;
    }

    .user-buy-mode-count img {
        width: 20px;
        float: left;
        margin-top: 10px;
        margin-right: 13px;
    }

    .user-buy-mode-btn .el-button {
        width: 359px;
        height: 47px;
        background: rgba(89, 96, 237, 1);
        border-radius: 4px;
        text-align: center;
        margin-top: 30px;
    }

    .mode-title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
    }

    .user-buy-form {
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #D8D8D8;
    }

    .user-buy-label {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        margin-left: 32px;
    }

    .user-buy-price {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(235, 47, 47, 1);
        margin-left: 4px;
    }

    .user-buy-top {
        overflow: hidden;
        padding-bottom: 20px;
        border-bottom: 1px solid #D8D8D8;
    }

    .user-buy-left {
        float: left;
    }

    .user-buy-left img {
        width: 136px;
        height: 73px;
    }

    .user-buy-title {
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        margin-left: 28px;
    }

    .user-buy-sale {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(235, 47, 47, 1);
        margin-left: 28px;
        margin-top: 8px;
    }

    .wx-login-title {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(89, 96, 237, 1);
        padding-bottom: 12px;
        border-bottom: 2px solid rgba(89, 96, 237, 1);
        width: 148px;
        margin: auto;
        text-align: center;
    }

    .wx-login-bord {
        width: 353px;
        height: 1px;
        background: rgba(216, 216, 216, 1);
    }

    .wx-login-info {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
        margin-top: 41px;
    }

    .wx-login-img {
        width: 170px;
        margin: auto;
        border: 1px solid rgba(236, 238, 246, 1);
        margin-top: 10px;
    }

    .wx-login-img img {
        width: 100%;
    }

    .wx-login-foot {
        margin-top: 54px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(235, 47, 47, 1);
    }

    .details-subject {
        overflow: hidden;
        margin-left: 89px;
        padding-bottom: 70px;
    }

    .details-subject-count {
        margin-top: 40px;
        float: left;
        text-align: center;
        margin-left: 121px;
    }

    .details-subject .details-subject-title {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(92, 97, 113, 1);
        margin-bottom: 32px;
        width: 335px;
        text-align: left;
    }

    .details-subject .details-subject-list {
        overflow: hidden;
        // min-height:73px;
        background: rgba(254, 255, 254, 1);
        box-shadow: 0px 0px 7px 0px rgba(167, 185, 237, 0.36);
        border-radius: 8px;
        width: 90%;
        // line-height: 73px;
        margin-bottom: 10px;
        width: 305px;
        padding: 15px;
    }

    .details-subject .details-subject-list-left {
        float: left;
        // margin-left: 25px;
        width: 10%;
    }

    .details-subject .details-subject-list-right {
        float: left;
        width: 90%;
        text-align: left;
        line-height: 20px;
        // margin-top: 27px;
    }

    .details-account {
        background-color: #fff;
        margin-top: 10px;
        overflow: hidden;
    }

    .details-account .details-account-scene {
        overflow: hidden;
        margin-left: 200px;
    }

    .details-account .details-account-scene .details-account-scene-list {
        width: 247px;
        float: left;
        margin-left: 21px;
        height: 246px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 10px 20px 0px rgba(217, 224, 255, 0.5);
        border-radius: 4px;
        text-align: center;
        margin-top: 42px;
        margin-right: 21px;
        margin-bottom: 31px;
    }

    .details-account .details-account-scene .details-account-scene-list img {
        width: 45px;
        margin-top: 26px;
    }

    .details-account .details-account-scene .details-account-scene-list .details-account-scene-title {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        margin-top: 12px;
    }

    .details-account .details-account-scene .details-account-scene-list .details-account-scene-info {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
        margin-top: 40px;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }

    .details-account .details-account-title {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        text-align: center;
        padding-top: 40px;
    }

    .details-account .details-account-bord {
        width: 32px;
        height: 1px;
        background: rgba(89, 96, 237, 1);
        margin: 5px auto;
    }

    .details-account .details-account-info {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
        text-align: center;
        margin-top: 15px;
        width: 582px;
        margin-left: auto;
        margin-right: auto;
    }

    .details-account .details-account-count {
        width: 80%;
        overflow: hidden;
        margin: 25px auto;
    }

    .details-account .details-account-count .details-account-count-list {
        width: 40%;
        margin-left: 6.3%;
        float: left;
        text-align: center;
        border: 1px solid #e7E7E7;
        height: 50px;
        line-height: 50px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        margin-bottom: 15px;
    }

    .details-account .details-account-count .details-account-count-list:hover {
        box-shadow: 0px 2px 8px 0px rgba(186, 181, 225, 0.5);
    }

    .details-top {
        overflow: hidden;
        padding-top: 36px;
        background-color: #fff;
        padding-bottom: 36px;
    }

    .details-top .details-top-left {
        float: left;
        width: 50%;
    }

    .details-top .details-top-left .details-img {
        width: 480px;
        height: 257px;
        float: right;
        border-radius: 5px;
        margin-right: 20px;
    }

    .details-top .details-top-left .details-left-time {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        margin-left: 36px;
    }

    .details-top .details-top-left .details-title {
        font-size: 28px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        margin-left: 36px;
        margin-top: 5px;
    }

    .details-top .details-top-left .details-info {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        margin-left: 36px;
        margin-top: 10px;
    }

    .details-top .details-top-left .details-price {
        margin-left: 36px;
        margin-top: 27px;
        height: 72px;
        line-height: 72px;
        border-top: 1px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
    }

    .details-top .details-top-left .details-btn .el-button {
        width: 200px;
        margin-left: 36px;
        margin-top: 27px;
    }

    .details-top .details-top-left .details-price .details-price-new {
        font-size: 28px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(235, 47, 47, 1);
    }

    .details-top .details-top-left .details-price .details-price-old {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(130, 130, 130, 1);
        text-decoration: line-through;
        margin-left: 10px;
    }

    .details-top .details-top-left .details-price .details-price-info {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(245, 108, 108, 1);
        margin-left: 38px;
    }

    .details-top .details-top-left .details-price .details-price-btn {
        width: 90px;
        margin-left: 10px;
    }

    .footer {
        height: 266px;
        background: rgba(92, 97, 113, 1);
        color: rgba(255, 255, 255, 1);
        margin-top: 50px;
    }

    .footer .footer-top {
        overflow: hidden;
    }

    .footer .footer-top .footer-top-left {
        float: left;
        margin-left: 10%;
        margin-top: 40px;
    }

    .footer .footer-top .footer-top-left .footer-list {
        margin-bottom: 12px;
    }

    .footer .footer-top .footer-top-right {
        float: right;
        margin-right: 10%;
        overflow: hidden;
        margin-top: 40px;

    }

    .footer .footer-top .footer-top-right .footer-code {
        float: left;
        width: 100px;
        text-align: center;
        margin-left: 54px;
    }

    .footer .footer-top .footer-top-right .footer-code img {
        background-color: #fff;
        width: 100%;
    }

    .footer .footer-top .footer-top-right .footer-code .footer-code-count {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        margin-top: 10px;
    }

    .footer .footer-bottom {
        margin-top: 20px;
        text-align: center;
    }

    .evaluation .column-count {
        overflow: hidden;
        padding-bottom: 20px;
    }

    .evaluation .column-count-list {
        width: 30%;
        float: left;
        min-height: 950px;
        border-radius: 4px;
        border: 1px solid rgba(236, 238, 246, 1);
        margin-left: 2%;
        margin-top: 10px;
        box-shadow: 0 0 20px 0px rgb(206, 206, 206);
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .evaluation .column-count-list img {
        width: 100%;
        border-radius: 4px;
    }

    .evaluation .column-count-list .column-count-list-title {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        margin-left: 20px;
        margin-top: 20px;
    }

    .evaluation .column-count-list .column-count-list-count {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        margin-left: 20px;
        margin-top: 12px;
        margin-right: 20px;
    }

    .evaluation .column-count-list .column-count-list-main {
        margin-left: 20px;
    }

    .evaluation .column-count-list .column-count-list-main .column-count-list-main-title {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        line-height: 20px;
        margin-top: 40px;
    }

    .evaluation .column-count-list .column-count-list-main ul {
        margin-top: 10px;
    }

    .evaluation .column-count-list .column-count-list-main li {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        margin-left: 20px;
    }

    .evaluation .column-count-list .column-count-list-btn {
        width: 20%;
        position: absolute;
        bottom: 20px;
        left: 40%;
    }

    .evaluation .column {
        margin-top: 43px;
        overflow: hidden;
    }

    .evaluation .head-top {
        margin-top: 60px;
        background: rgba(246, 246, 246, 1);
        height: 50px;
        box-shadow: 0px 2px 8px 0px rgba(186, 181, 225, 0.5);
        line-height: 50px;
    }

    .evaluation .head-top-nav {
        line-height: 50px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
        margin-left: 20px;
    }

    .evaluation .home-header {
        height: 60px;
        background-color: #5960ED;
        overflow: hidden;
        position: fixed;
        width: 100%;
        top: 0px;
        z-index: 999;
    }

    .evaluation .home-header .logo {
        height: 60px;
        line-height: 60px;
        float: left;

    }

    .evaluation .home-header .logo img {
        width: 93px;
        float: left;
        margin-top: 17px;
        margin-left: 15px;
    }

    .evaluation .home-header .logo div {
        font-size: 14px;
        float: left;
        margin-left: 10px;
        font-weight: bolder;
        color: #5960ed;
    }

    .evaluation .home-header .nav {
        float: left;
        margin-left: 59px;
        font-weight: bold;
    }

    .evaluation .home-header .user-menu {
        float: right;
        line-height: 60px;
        margin-right: 15px;
    }

    .evaluation .home-header .user-menu .login {
        margin-right: 15px;
    }

    .payDlg img {
        display: block;
        width: 160px;
        height: 160px;
        margin: auto;
    }

    .payDlg .mind {
        margin-top: 40px;
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
        line-height: 20px;
        letter-spacing: 1px;
    }

    .payDlg .el-button {
        width: 301px;
        margin-top: 53px;
        margin-bottom: 142px;
        display: block;
        margin: 70px auto 30px;
    }
</style>
