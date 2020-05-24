<!-- 导航 -->
<template>
<div class='nav'>
    <el-menu
     style="height: 860px;background-color: #fff;box-shadow:0px 2px 10px 0px rgba(174,171,201,0.35);border-radius:0px 10px 0px 0px;"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#FFFFFF"
      active-text-color="#5960ED"
      @select="handleSelect" >
      <el-menu-item index="1">
        <span slot="title">作答有效性分析</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">报告总述</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">技术咨询能力分析</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">技术咨询能力分析</span>
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
        
    },
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
    padding: 10px 20px 0px 0px;
}
.nav .el-menu{
    background-color: rgba(232,235,237,1);
    font-weight: bold;
    border: 0px;
} 
.nav .el-menu-item.is-active{
    background:rgba(255,255,255,1);
    color: #323541;
}

</style>