import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login.vue'
import signup from './components/signup.vue'
import profile from './components/profile.vue'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/signup', component: signup, },
    { path: '/login', component: login },
    { path: '/profile', component: profile }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && localStorage.getItem('token') === "") {
    next({ path: "/login" });
  } else {
    next()
  }
  if (to.path === '/login' && localStorage.getItem('token') !== "") {
    next({ path: "/profile" });
  } else {
    next()
  }
})
export default router