<template>
  <v-app>
    <AppBarLogged title="Monitoring / Alert" />

    <navigation-app-drawer/>
    <v-content>
      <list-alert/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import AppBarLogged from "../components/layouts/AppBarLogged.vue";
import NavigationAppDrawer from "../components/layouts/NavigationAppDrawer.vue";
import ListAlert from "../components/alerts/ListAlert.vue";

export default Vue.extend({
  name: "Alert",
  data: () => ({}),
  components: {
    AppBarLogged,
    NavigationAppDrawer,
    ListAlert
  },
});
</script>


