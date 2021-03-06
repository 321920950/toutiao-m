import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '/', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/User.vue'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/Search.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/ArticleIndex.vue'),
    meta: { requiresAuth: false },
    props: true // 路由传参
  },
  {
    path: '/userdata',
    name: 'userdata',
    component: () => import('@/views/userdata/UserData.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/userchat',
    name: 'userchat',
    component: () => import('@/views/user-chat/UserChat.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || !to.meta.requiresAuth) {
    return next()
  }

  if (store.state.user) {
    return next()
  }

  Dialog.confirm({
    title: '该功能需要登录，确认登录吗？'
  }).then(() => {
    next({
      name: 'login',
      query: {
        redirect: from.fullPath
      }
    })
  }).catch(() => {
    // on cancel
  })
})

export default router
