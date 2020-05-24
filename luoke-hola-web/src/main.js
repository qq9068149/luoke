import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './element-variables.scss'
import echarts from 'echarts'
import jq from 'jquery'
import global_func from './store/global_func.js'
import global_variable from './store/global_variable.js'
Vue.use(echarts)
Vue.prototype.GLOBAL = global_variable
Vue.config.productionTip = false
Vue.use(global_func);

 Vue.directive('anchor',{
  inserted : function(el,binding){
    el.onclick = function(){
      document.documentElement.scrollTop = jq('#anchor-'+binding.value).offset().top
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
