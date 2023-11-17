import * as VueRouter from 'vue-router'

const routes = [
  { path: '/', name: 'notFound', component: () => import('@views/notFound.vue') },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('@views/notFound.vue') }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  next()
})
export default router
