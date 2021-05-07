import Vue from 'vue'
import App from './App.vue'
import Tbl from './TBL/index'

Vue.config.productionTip = false

Vue.use(Tbl)
new Vue({
  render: h => h(App),
}).$mount('#app')
