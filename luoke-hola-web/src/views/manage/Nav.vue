<!-- 导航 -->
<template>
<div class='nav'>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @select="handleSelect" >
      <el-menu-item index="1">
        <span slot="title">发放测评</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">查看测评报告</span>
      </el-menu-item>
    </el-menu>
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
            this.goUrl('/ManageIndex')
        } else if (key == 2) {
            this.goUrl('/ManagePresentation')
        }
    }
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
.nav{
    padding: 20px 0px 0px 0px;
}
.nav .el-menu{
    background-color: rgba(232,235,237,1);
}
.nav .el-menu-item.is-active{
    background:rgba(255,255,255,1);
    color: #323541;
}
</style>