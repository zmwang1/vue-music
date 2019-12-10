import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import '../flexible'
import 'common/css/reset.css'
import 'common/css/base.css'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
