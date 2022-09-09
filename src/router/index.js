import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import NProgress from 'nprogress';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "ProductList" */'../views/products/ProductList.vue')
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: () => import(/* webpackChunkName: "ProductCreate" */'../views/products/ProductCreate.vue')
  },
  {
    path: '/products/edit/:id',
    name: 'ProductEdit',
    component: () => import(/* webpackChunkName: "ProductEdit" */'../views/products/ProductEdit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

export default router
