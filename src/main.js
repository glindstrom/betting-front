import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import Games from './Games.vue'
import moment from 'moment'

Vue.use(VueResource)
Vue.prototype.moment = moment

Vue.component('app-games', Games)

new Vue({
  el: '#app',
  render: h => h(App)
})
