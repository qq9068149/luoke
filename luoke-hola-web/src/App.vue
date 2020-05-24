<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
#app{
  min-width: 1200px;
}
*{
  padding: 0px;
  margin: 0px;
}
.el-header{
  padding: 0px !important;
}
.main-top-title{
  background-color: #FAFAFA !important;
}
</style>
