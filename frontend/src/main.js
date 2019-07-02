import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api' // 导入api接口

Vue.prototype.$api = api; // 将api挂载到vue的原型上

Vue.use(VueAxios,axios);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
