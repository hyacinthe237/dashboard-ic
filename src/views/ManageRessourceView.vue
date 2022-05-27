<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage ressources" />

    <navigation-app-drawer/>
    <v-content>
        <list-ressources/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBarLogged from "../components/layouts/AppBarLogged.vue";
import NavigationAppDrawer from "../components/layouts/NavigationAppDrawer.vue";
import ListRessources from "../components/manage-ressources/ListRessources.vue";

export default Vue.extend({
  name: "ManageRessourceView",
  // data: () => ({}),
  components: {
    AppBarLogged,
    NavigationAppDrawer,
    ListRessources
  },
});
</script>
