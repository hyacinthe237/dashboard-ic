import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Guard from '../middleware/middleware'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView.vue'
import ManageKidView from '../views/ManageKidView.vue'
import ManageRessourceView from '../views/ManageRessourceView.vue'
import AlertView from  '../views/AlertView.vue'
import TicketView from  '../views/TicketView.vue'
import ReportingView from  '../views/ReportingView.vue'
import ReportedIssueView from  '../views/ReportedIssueView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'home', component: HomeView, beforeEnter: Guard.auth },
  { path: '/manage-kids', name: 'manage-kids', component: ManageKidView, beforeEnter: Guard.auth },
  { path: '/manage-ressources', name: 'manage-ressources', component: ManageRessourceView, beforeEnter: Guard.auth },
  { path: '/tickets', name: 'tickets', component: TicketView, beforeEnter: Guard.auth },
  { path: '/alerts', name: 'alerts', component: AlertView, beforeEnter: Guard.auth },
  { path: '/reporting', name: 'reporting', component: ReportingView, beforeEnter: Guard.auth },
  { path: '/reported-issues', name: 'reported-issues', component: ReportedIssueView, beforeEnter: Guard.auth }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
