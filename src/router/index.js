import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/layout',
    component: Layout,
    name: 'Layout',
    children: [
      {
        path: 'home',
        component: Home,
        name: 'Home'
      },
      {
        path: 'user',
        component: User,
        name: 'User'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
