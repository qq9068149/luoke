<!-- 网页头部 -->
<template>
<div class='header'>
    <div class="logo">
        <a href="/"><img src="@/assets/logo.png" alt=""></a>
    </div>
    <div class="user-menu">
        <div class="user" v-if="show">
            <el-button type="text"><i class="el-icon-download"></i> 下载报告</el-button>
            <el-button round @click="goUrlsd('/ManageContrast?id='+id)" type="primary">对比报告</el-button>
        </div>
        <div class="user" v-if="!show">
            <el-button type="primary" plain round><i class="el-icon-download"></i> 下载报告</el-button>
        </div>
    </div>
    <div class="user-menu">

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
    
};
},
props: [
    'show',
    'id'
],
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
.header{
    height: 60px;
    background-color: #F0F2F3;
    overflow: hidden;
    box-shadow: 0 0 20px 0px rgb(206, 206, 206);
}
.header .logo{
    height: 60px;
    line-height: 60px;
    float: left;

}
.header .logo img{
    width: 93px;
    float: left;
    margin-top: 17px;
    margin-left: 15px;
}
.header .logo div{
    font-size: 14px;
    float: left;
    margin-left: 10px;
    font-weight: bolder;
    color: #5960ed ;
}
.header .nav{
    float: left;
    margin-left: 59px;
    font-weight: bold;
}
.header .user-menu{
    float: right;
    line-height: 60px;
    margin-right: 15px;
}
// .header .user-menu .el-button--primary{
//     background-color: #5960ED !important;
// }
// .header .user-menu .el-button--text{
//     color: #5960ED !important;
// }
.header .user-menu .login{
    margin-right: 15px;
}
.el-menu--horizontal > .el-menu-item.is-active {
    background-color: #fff !important;
}
</style>