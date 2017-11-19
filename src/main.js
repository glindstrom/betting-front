import Vue from 'vue'
import App from './App.vue'
import Games from './Games.vue'
import moment from 'moment'
import axios from 'axios'


Vue.prototype.moment = moment

axios.defaults.baseURL = 'http://localhost:8080'

Vue.component('app-games', Games)

new Vue({
  el: '#app',
  render: h => h(App)
})
