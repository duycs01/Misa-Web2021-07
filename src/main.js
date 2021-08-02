import Vue from 'vue'
import App from './App.vue'
import Common from './utils/commom'
Vue.prototype.$common = Common

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
