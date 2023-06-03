import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cookie from 'js-cookie'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/RegisterView.vue'),
    props: true
  },
  {
    path: '/',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/administrative',
    name: 'administrative',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdministrativeView.vue'),
    beforeEnter(to, from, next) {
      if (!(Cookie.get('token'))) {
        next('/administrative/login')
      }
      next()
    }
  },
  {
    path: '/administrative/login',
    name: 'administrative-login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdministrativeLoginManageView.vue')
  },
  {
    path: '/employee/login',
    name: 'employee-login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginEmployeeView.vue')
  },
  {
    path: '/switch/login',
    name: 'switch-login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginSwitch.vue')
  },
  {
    path: '/products/:id',
    name: 'product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/itemView.vue')
  },
  {
    path: '/:id/checkout/address',
    name: 'checkout-address',
    component: () => import(/* webpackChunkName: "about" */ '../views/checkoutAddressView.vue')
  },
  {
    path: '/checkout/payment',
    name: 'checkout-payment',
    component: () => import(/* webpackChunkName: "about" */ '../views/checkoutPayment.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarCheckout.vue')
  },
  {
    path: '/:search/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/PaymentView.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/ProfileView.vue'),
    
  },
  {
    path: '/profile/address',
    name: 'profile-address',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/ProfileAddressView.vue'),
  },
  {
    path: '/profile/orders',
    name: 'profile-orders',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/ProfileOrdersView.vue'),
  },
  {
    path: '/recovery/password/email',
    name: 'recovery-email',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/RequestRecoveryPassword.vue'),
  },
  {
    path: '/recovery/password/:token',
    name: 'recovery-password',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/RecoveryPasswordView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
