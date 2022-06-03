<template>
  <v-list-item class="mt-2 mb-2">
      <v-img
        alt="Infinite connection"
        class="shrink mr-10"
        contain
        src="@/assets/img/alert.png"
        transition="scale-transition"
        max-height="100%"
        width="50"
      />
      <icon-vertical-divider />

      <v-list-item-content class="pa-6">
        <v-list-item-title
          class="alert-title"
        >
          New alert</v-list-item-title
        >
        <v-list-item-subtitle style="color: #15b715">
          Lorem ipsum it donet sum.
        </v-list-item-subtitle>
        <span style="font-size: 10px">1 hour ago</span>
      </v-list-item-content>
      <v-divider/>
    </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import IconVerticalDivider from "../icons/IconVerticalDivider.vue";

export default Vue.extend({
  name: "alert-item",

  // data: () => ({}),
  components: {
    IconVerticalDivider,
  },
});
</script>
