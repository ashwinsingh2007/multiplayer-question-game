import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://www.omdbapi.com/?apikey=b76b385c&page=1&type=movie&Content-Type=application/json'
axios.defaults.baseURL = 'http://localhost:9000/api'
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

