import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from "./store";
import firebase from 'firebase/app'
import "firebase/firestore";
import router from "./router";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCQyGdfMSkIxipEX6ikUn2gFCfNzbQ0GjU",
  authDomain: "firstfirebases.firebaseapp.com",
  databaseURL: "https://firstfirebases.firebaseio.com",
  projectId: "firstfirebases",
  storageBucket: "firstfirebases.appspot.com",
  messagingSenderId: "45320671798",
  appId: "1:45320671798:web:12f4e3607d7c0db521fe97",
  measurementId: "G-HFK5HY7NNS"
};

firebase.initializeApp(firebaseConfig);


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
