<template>
  <v-app-bar clipped flat app color="primary" class="flex-grow-0" dark>
    <div class="d-flex align-center pa-10">
      <v-img
        alt="Infinite connection"
        class="shrink mr-15"
        contain
        src="@/assets/infinitewhite.png"
        transition="scale-transition"
        max-height="100%"
        width="150"
        max-width="150"
      />
      <!-- <p class="pt-5">Monitoring / Manage agencies</p> -->
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-items class="mr-10">
      <IconSearch class="icon-search" />
      <v-img
        alt="Infinite connection"
        class="shrink mr-2"
        contain
        src="@/assets/img/avatar.png"
        transition="scale-transition"
        max-height="100%"
        width="36"
        max-width="36"
      />
      <v-icon x-small>fa fa-angle-down fa-xs</v-icon>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import IconSearch from '../icons/IconSearch.vue';

export default Vue.extend({
  name: "app-bar",

  data: () => ({}),
  components: {
      IconSearch
  }
});
</script>

<style scoped>
    
</style>