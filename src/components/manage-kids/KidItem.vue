<template>
  <v-card
    rounded-lg
    elevation="2"
    class="card-stats"
    @click="openItem(kid)"
  >
    <v-list-item class="mt-2 mb-2">
      <v-img
        alt="Infinite connection"
        class="shrink mr-10"
        contain
        src="@/assets/img/kid.png"
        transition="scale-transition"
        max-height="100%"
        width="75"
      />

      <v-list-item-content>
        <v-list-item-title>{{ kid.first_name }} {{ kid.last_name }}</v-list-item-title>
        <v-list-item>Birthdate: {{ kid.birthdate }}</v-list-item>
        <v-list-item>Joined at: {{ kid.date_of_arrival }}</v-list-item>
        <v-list-item>Created at: {{ kid.created_at }}</v-list-item>
        <v-list-item>Gender: {{ kid.sex }}</v-list-item>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "kid-item",

  props: {
      kid: { type: Object, default: () => {} }
  },

  // data: () => ({}),

  methods: {
      openItem (kid: any) {
        this.$emit('openItem', kid)
      }
  }
});
</script>
