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
        <v-row>
            <v-col cols="10" align="left" @click="openAlert(alert)">
                <v-list-item-title
                  class="alert-title"
                >
                  {{ alert.title }}</v-list-item-title
                >
                <v-list-item-subtitle style="color: #15b715">
                  {{ alert.content }}
                </v-list-item-subtitle>
                <span style="font-size: 10px">1 hour ago</span>
            </v-col>
            <v-col cols="2">
                <v-btn color="red" rounded class="pa-4" width="100%" @click="confirm(alert)">
                Delete</v-btn>
            </v-col>
        </v-row>
      </v-list-item-content>


    </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import IconVerticalDivider from "../icons/IconVerticalDivider.vue";

export default Vue.extend({
  name: "alert-item",

  props: { alert: { type: Object, default: () => {} } },

  // data: () => ({}),
  components: {
    IconVerticalDivider,
  },

  methods: {
      openAlert (alert: any) {
          this.$emit('openAlert', alert)
      },
      confirm (alert: any) {
          this.$emit('confirmDelete', alert)
      }
  }
});
</script>
