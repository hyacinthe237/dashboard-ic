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

export default Vue.extend({
  name: "ManageRessourceView",
  // data: () => ({}),
});
</script>
