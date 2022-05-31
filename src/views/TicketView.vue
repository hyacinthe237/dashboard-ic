<template>
  <v-app>
    <AppBarLogged title="Monitoring / Alert" />

    <navigation-app-drawer/>
    <v-content>
      <list-ticket/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBarLogged from "../components/layouts/AppBarLogged.vue";
import NavigationAppDrawer from "../components/layouts/NavigationAppDrawer.vue";
import ListTicket from "../components/tickets/ListTicket.vue";

export default Vue.extend({
  name: "Ticket",
  // data: () => ({}),
  components: {
    AppBarLogged,
    NavigationAppDrawer,
    ListTicket
  },
});
</script>
