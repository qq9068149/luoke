<!-- 登录 -->
<template>
    <div class='login' :style="{height: scrollerHeight}" style="background-color: #fff;">
        <div class='home-header'>
            <div class="logo">
                <a href="/"><img src="@/assets/logo-home.png" alt=""></a>
            </div>
        </div>
        <div class="login-count">
            <div class="login-left">
                <div class="login-title">
                    <div class="bord">微信扫码登录</div>
                </div>
                <div class="login-info">扫码关注【好啦测评】公众号进行登录</div>
                <div class="login-code">
                    <img :src="qrcode" alt="">
                </div>
            </div>
            <div class="login-left">
                <img src="@/assets/loginImg.png" alt="" class="tu">
            </div>
        </div>
        <div class="foot">罗课（厦门）网络科技有限公司 Copyright ©2019 <a href="http://www.miitbeian.gov.cn" target="_blank" style="color: #ffffff">闽ICP备19024736号-2</a></div>
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
            loginData: {},
            qrcode: ""
        };
    },
    //监听属性 类似于data概念
    computed: {
        scrollerHeight: function() {
            return (window.innerHeight) + 'px';
        }
    },
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
            axios({
                    url: this.GLOBAL.baseURL + 'checkPCLogin',
                    method: "post",
                    data: {
                        "key": _this.loginData.key
                    }
                })
                .then(function(response) {
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
                        _this.goUrl("/");
                    } else {
                        setTimeout(_this.checkPCLogin, 1000); //每秒重复请求
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var _this = this;
        _this.getQrcode();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.login {
    background: rgba(247, 248, 251, 1);
}

.foot {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0px;
    background: rgba(247, 248, 250, 1);
    min-width: 1200px;
}

.login .login-count {
    // background-color: #fff;
    overflow: hidden;
    padding-top: 100px;
    padding-bottom: 100px;
    // box-shadow:0px 7px 13px 0px rgba(197,197,218,0.33);
}

.login .login-count .login-left {
    float: left;
    width: 50%;
    text-align: center;
}

.login .login-count .login-left .tu {
    width: 70%;
    display: block;
}

.login .login-count .login-title {
    width: 353px;
    margin: auto;
    text-align: center;
    border-bottom: 1px solid #D8D8D8;
}

.login .login-count .bord {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(89, 96, 237, 1);
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(89, 96, 237, 1);
    width: 108px;
    margin: auto;
}

.login .login-count .login-info {
    margin-top: 40px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
}

.login .login-count .login-code {
    width: 170px;
    height: 170px;
    margin: 10px auto;
}

.login .login-count .login-code img {
    width: 100%;
}

.login .home-header {
    height: 60px;
    background-color: #5960ED;
    overflow: hidden;

    width: 100%;

    z-index: 999;
}

.login .home-header .logo {
    height: 60px;
    line-height: 60px;
    float: left;

}

.login .home-header .logo img {
    width: 93px;
    float: left;
    margin-top: 17px;
    margin-left: 15px;
}

.login .home-header .logo div {
    font-size: 14px;
    float: left;
    margin-left: 10px;
    font-weight: bolder;
    color: #5960ed;
}

.login .home-header .nav {
    float: left;
    margin-left: 59px;
    font-weight: bold;
}

.login .home-header .user-menu {
    float: right;
    line-height: 60px;
    margin-right: 15px;
}

.login .home-header .user-menu .login {
    margin-right: 15px;
}
</style>