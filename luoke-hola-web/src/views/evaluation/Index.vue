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
                            <img style="width:30px;border-radius: 50%;float:left;margin: -10px 11px 0px 25px;" :src="loginUserMsg.avatar" alt="">
                            {{loginUserMsg.nickname}}
                        </el-button>
                    </el-popover>
                </div>
            </div>
            <div class="user-menu">
            </div>
        </div>
        <div class="head-top">
            <el-breadcrumb separator="/" class="head-top-nav">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{list.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="column">
                <div class="column-count-list" v-for="(item, index) in list.papers" :key="index">
                    <img :src="item.img" alt="">
                    <div class="column-count-list-title">{{item.name}}</div>
                    <div class="column-count-list-count">{{item.info}}</div>
                    <div class="column-count-list-main">
                        <div class="column-count-list-main-title"><img src="@/assets/iaia.png" alt="" style="width: 18px;height:20px;"> 测量维度</div>
                        <ul>
                            <li v-for="(itemList, indexList) in item.measureDimension" :key="indexList">{{itemList}}</li>
                        </ul>
                    </div>
                    <div class="column-count-list-btn">
                        <el-button type="primary" @click="goUrld('/EvaluationDetails',list.name,list.id,item.name, item.id)">查看详情</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
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
                </span>
        </el-dialog>
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
                loginUserMsg: {},
                userLogin: false,
                list: {},
                wxLogin: false,
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
                        console.log(response);
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
            showLogin() {
                this.getQrcode();
                this.wxLogin = true;
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            var id = this.$route.query.id;
            this.loginUserMsg = this.GLOBAL.loginUserMsg;
            var _this = this;
            this.userLogin = this.GLOBAL.token ? true : false;
            if (id) {
                _this.doAjax({
                    url: 'getColumnDetail',
                    method: "get",
                    data: {
                        id: id
                    },
                    success: function(response) {
                        var papers = [];
                        response.data.classify.forEach(function(node) {
                            papers = papers.concat(node.papers);
                        });
                        response.data.papers = papers;
                        _this.list = response.data;
                        _this.$router.afterEach((to, from, next) => {
                            window.scrollTo(0, 0)
                        })
                    }
                });
            } else {

            }

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

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
        }, //生命周期 - 销毁之前
        destroyed() {
        }, //生命周期 - 销毁完成
        activated() {
        }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类
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

    .evaluation .column-count {
        overflow: hidden;
        padding-bottom: 20px;
    }

    .evaluation .column-count-list {
        width: 30%;
        float: left;
        min-height: 557px;
        border-radius: 4px;
        border: 1px solid rgba(236, 238, 246, 1);
        margin-left: 2%;
        margin-top: 30px;

        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
        transition: .4s
    }

    .evaluation .column-count-list:hover {
        box-shadow: 0 2px 8px 0 rgba(186, 181, 225, 0.5);
        transition: .4s
    }

    .evaluation .column-count-list img {
        width: 100%;
        height: 198px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
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
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
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

    .evaluation {
        background-color: #fff;
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
</style>
