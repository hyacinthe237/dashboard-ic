import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

import AppBarLogged from "./components/layouts/AppBarLogged.vue";
import NavigationAppDrawer from "./components/layouts/NavigationAppDrawer.vue";
import ListKids from "./components/manage-kids/ListKids.vue";
import AppBar from "./components/layouts/AppBar.vue";
import NoItemYet from "./components/manage-agencies/NoItemYet.vue";
import ListAlert from "./components/alerts/ListAlert.vue";
import ListRessources from "./components/manage-ressources/ListRessources.vue";
import IconHorizontalDivider from "./components/icons/IconHorizontalDivider.vue";
import IconVerticalDivider from "./components/icons/IconVerticalDivider.vue";
import ListTicket from "./components/tickets/ListTicket.vue";

Vue.config.productionTip = false

Vue.use(VueSweetalert2)

Vue.component('AppBar', AppBar)
Vue.component('AppBarLogged', AppBarLogged)
Vue.component('navigation-app-drawer', NavigationAppDrawer)
Vue.component('list-kids', ListKids)
Vue.component('no-item-yet', NoItemYet)
Vue.component('list-alert', ListAlert)
Vue.component('list-ressources', ListRessources)
Vue.component('icon-horizontal-divider', IconHorizontalDivider)
Vue.component('icon-vertical-divider', IconVerticalDivider)
Vue.component('list-ticket', ListTicket)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
