import Vue from 'vue'
import App from './App.vue'
import Common from './utils/commom'
import StatusCode from './enum/StatusCode'

import BaseButton from './components/base/BaseButton'
import BaseDropdown from './components/base/BaseDropdown'

Vue.prototype.$common = Common
Vue.prototype.$statusCode = StatusCode

Vue.config.productionTip = false

Vue.component('BaseButton', BaseButton)
Vue.component('BaseDropdown', BaseDropdown)


new Vue({
  render: h => h(App),
}).$mount('#app')
