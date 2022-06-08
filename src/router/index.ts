import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Guard from '../middleware/middleware'
import Login from '../views/auth/signin.vue'
import HomeView from '../views/home/home.vue'
import ManageKidView from '../views/kids/kids.vue'
import KidView from '../views/kids/kid.vue'
import ManageRessourcesView from '../views/resources/resources.vue'
import ManageRessourceView from '../views/resources/resource.vue'
import AlertView from  '../views/alerts/alerts.vue'
import TicketView from  '../views/tickets/tickets.vue'
import ReportingView from  '../views/reporting/reporting.vue'
import ReportedIssueView from  '../views/issues/issues.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'home', component: HomeView, beforeEnter: Guard.auth },
  { path: '/manage-kids', name: 'manage-kids', component: ManageKidView, beforeEnter: Guard.auth },
  { path: '/manage-kids/:id/profile', name: 'kid-profile', component: KidView, beforeEnter: Guard.auth },
  { path: '/manage-resources', name: 'manage-ressources', component: ManageRessourcesView, beforeEnter: Guard.auth },
  { path: '/manage/:id/resource', name: 'manage-ressource', component: ManageRessourceView, beforeEnter: Guard.auth },
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
