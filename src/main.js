import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from "./store";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import router from "./router";
import Firebase from 'firebase/app'
import credentials from './firebase/credentials'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Firebase.initializeApp(credentials.config)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
