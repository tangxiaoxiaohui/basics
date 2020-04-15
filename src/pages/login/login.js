import Vue from 'vue'
import App from './app/index.vue'

// 阻止启动生产消息
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
