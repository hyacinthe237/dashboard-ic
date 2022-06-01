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

export default Vue.extend({
  name: "Alert",
  // data: () => ({}),
});
</script>
