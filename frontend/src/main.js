import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify'
import vuemask from './plugins/vuemask'
import vuemoney from './plugins/vuemoney'
import './plugins/filters'
import router from './config/router'

Vue.config.productionTip = false

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  vuetify,
  vuemask,
  vuemoney,
  router,
  render: h => h(App)
}).$mount('#app')
