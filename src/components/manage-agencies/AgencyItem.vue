<template>
  <v-card
    rounded-lg
    elevation="2"
    class="card-stats"
    @click="openItem(agency)"
  >
    <v-list-item class="mt-2 mb-2">
      <v-img
        alt="Infinite connection"
        class="shrink mr-10"
        contain
        src="@/assets/img/user.png"
        transition="scale-transition"
        max-height="100%"
        width="75"
      />

      <v-list-item-content>
        <v-list-item-title>{{ agency.name }}</v-list-item-title>
        <!-- <v-list-item>Email: {{ agency.admin_email }}</v-list-item>
        <v-list-item>Address: {{ agency.address }}</v-list-item>
        <v-list-item>Description: {{ agency.description }}</v-list-item> -->
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "agency-item",

  props: {
      agency: { type: Object, default: () => {} }
  },

  // data: () => ({}),

  methods: {
      openItem (agency: any) {
        this.$emit('openItem', agency)
      }
  }
});
</script>
