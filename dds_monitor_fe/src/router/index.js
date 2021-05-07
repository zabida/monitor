import { createRouter, createWebHashHistory } from 'vue-router'
// const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
import Login from '../views/Login'
import Home from '../views/Home'
import DashBoard from '../views/Dashboard'
import JobList from '../views/JobList'
import JobDetail from '../views/JobDetail'
import Monitor from '../views/Monitor'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login2',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoard
      },
      {
        path: '/jobList',
        name: 'JobList',
        component: JobList
      },
      {
        path: '/jobDetail',
        name: 'JobDetail',
        component: JobDetail
      },
      {
        path: '/monitor',
        name: 'Monitor',
        component: Monitor
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
