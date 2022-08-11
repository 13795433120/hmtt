import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'
import Search from '@/views/Search'
import SearchResult from '@/views/Search/SearchResult'
import ArticleDetail from '@/views/ArticleDetail'
import UserEdit from '@/views/User/UserEdit'

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
  },
  {
    path: '/search',
    component: Search,
    name: 'Search'
  },
  {
    path: '/search/:kw',
    component: SearchResult,
    name: 'SearchResult'
  },
  {
    path: '/article_detail',
    component: ArticleDetail,
    name: 'ArticleDetail'
  },
  {
    path: '/user_editor',
    component: UserEdit,
    name: 'UserEdit'
  }

]

const router = new VueRouter({
  routes
})

export default router
