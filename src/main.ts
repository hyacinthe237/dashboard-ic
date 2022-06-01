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

Vue.config.productionTip = false

Vue.use(VueSweetalert2)

Vue.component('AppBarLogged', AppBarLogged)
Vue.component('navigation-app-drawer', NavigationAppDrawer)
Vue.component('list-kids', ListKids)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
