<!-- 网页头部 -->
<template>
    <div class='header'>
        <div class="logo">
            <a href="/"><img src="@/assets/logo.png" alt=""></a>
        </div>
        <div class="nav" v-if="showNav">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#F0F2F3" @select="handleSelect" active-text-color="#5960ed ">
                <el-menu-item index="1">工作台</el-menu-item>
                <el-menu-item index="2">测评管理</el-menu-item>
                <el-menu-item index="3">组织管理</el-menu-item>
            </el-menu>
        </div>
        <div class="user-menu" v-if="!showNav">
            <div class="login" v-if="userLogin">
                <el-button type="primary" @click="goUrl('/workbench')">登录/注册</el-button>
            </div>
            <div class="user" v-if="!userLogin">
                <el-button type="text">进入管理后台</el-button>
            </div>
        </div>
        <div class="user-menu" v-if="showNav">
            <div class="user-menu-count">
                <el-button type="text" style="width:100px;overflow: hidden; margin-top: 5px;" @click="goUrlsd('/Vip')"><img src="@/assets/vip2.png" alt="" style="width:20px;float:left;">
                    <div style="float:left; margin-top: 5px;margin-left: 5px;color:rgba(92,97,113,1);">升级VIP</div>
                </el-button>
            </div>
            <div class="user-menu-count">
                <el-button type="text" style="color:rgba(92,97,113,1);" @click="goUrl('/')"><i class="el-icon-shopping-cart-1"></i> 测评商城</el-button>
            </div>
            <div class="user-menu-count">
                <el-popover placement="bottom" width="" popper-class="noP" trigger="hover">
                    <el-button style="width:100%;border: 0px;" @click="loginOut">退出</el-button>
                    <el-button slot="reference" type="text" style="font-size:14px;margin-right: 20px;color:rgba(92,97,113,1);"><img style="width:30px;border-radius: 50%;float:left;margin: -10px 11px 0px 25px;" :src="loginUserMsg.avatar" alt=""> {{loginUserMsg.nickname}}</el-button>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            loginUserMsg: {
                avatar: "",
                nickname: ""
            }
        };
    },
    props: [
        'showNav',
        'userLogin',
        'activeIndex'
    ],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleSelect(key, keyPath) {
            if (key == 1) {
                this.goUrl('/workbench')
            } else if (key == 2) {
                this.goUrl('/ManageIndex')
            } else if (key == 3) {
                this.goUrl('/SystemIndex')
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.loginUserMsg = this.GLOBAL.loginUserMsg || {};
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
.user-menu-count {
    float: left;
    margin-left: 41px;
}

.user-menu-count .user-adv {
    width: 26px;
    border-radius: 50%;
    float: left;
    margin-top: 16px;
}

.user-menu-count .user-name {
    float: left;
    font-size: 12px;
    color: rgba(92, 97, 113, 1);
    margin-left: 5px;
}

.header {
    height: 60px;
    background-color: #F0F2F3;
    overflow: hidden;
    box-shadow: 0 0 20px 0px rgb(206, 206, 206);
    min-width: 1200px;
}

.header .logo {
    height: 60px;
    line-height: 60px;
    float: left;

}

.header .logo img {
    width: 93px;
    float: left;
    margin-top: 17px;
    margin-left: 15px;
}

.header .logo div {
    font-size: 14px;
    float: left;
    margin-left: 10px;
    font-weight: bolder;
    color: #5960ed;
}

.header .nav {
    float: left;
    margin-left: 59px;
    font-weight: bold;
}

.header .user-menu {
    float: right;
    line-height: 60px;
    margin-right: 15px;
    overflow: hidden;
}

// .header .user-menu .el-button--primary{
//     background-color: #5960ED !important;
// }
// .header .user-menu .el-button--text{
//     color: #5960ED !important;
// }
.header .user-menu .login {
    margin-right: 15px;
}

.el-menu--horizontal>.el-menu-item.is-active {
    background-color: #fff !important;
}
</style>