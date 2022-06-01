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

export default Vue.extend({
  name: "Ticket",
  // data: () => ({}),
});
</script>
