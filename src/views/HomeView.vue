<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage agencies" />

    <navigation-app-drawer/>
    <v-content>
      <no-item-yet/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import AppBarLogged from "../components/layouts/AppBarLogged.vue";
import NavigationAppDrawer from "../components/layouts/NavigationAppDrawer.vue";
import NoItemYet from "../components/manage-agencies/NoItemYet.vue";

export default Vue.extend({
  name: "Login",
  data: () => ({}),
  components: {
    AppBarLogged,
    NavigationAppDrawer,
    NoItemYet
  },
});
</script>


