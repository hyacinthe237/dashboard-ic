<template>
  <div>
    <v-app-bar clipped-left app flat color="primary" class="flex-grow-0" dark>
      <div class="d-flex align-center pa-2">
        <v-img
          alt="Infinite connection"
          class="shrink mr-10"
          contain
          src="@/assets/infinitewhite.png"
          transition="scale-transition"
          max-height="100%"
          width="150"
          max-width="150"
        />
      </div>
      <p class="page-title">{{ title }}</p>

      <v-spacer></v-spacer>

      <v-toolbar-items class="mr-10 pointer">
        <IconSearch class="icon-search" />
        <span style="margin-top:20px; padding-right:50px; padding-left:50px; font-weight:bold;">Welcome, {{ username }}</span>
        <v-img
          v-if="file != null"
          alt="Infinite connection"
          class="shrink mr-2"
          contain
          :src="file"
          transition="scale-transition"
          max-height="100%"
          width="36"
          max-width="36"
          @click="openProfile()"
        />
        <v-img
          v-if="file == null"
          alt="Infinite connection"
          class="shrink mr-2"
          contain
          src="@/assets/img/user.png"
          transition="scale-transition"
          max-height="100%"
          width="36"
          max-width="36"
          @click="openProfile()"
        />
        <v-icon x-small>fa fa-angle-down fa-xs</v-icon>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconSearch from "../icons/IconSearch.vue";

export default Vue.extend({
  name: "app-bar-logged",

  // data: () => ({}),
  components: {
    IconSearch,
  },

  props: ["title"],

  computed: {
      auth (): any {
        let thau: any = localStorage.getItem('infinite_user')
        return JSON.parse(thau)
      },

      file () {
          return null
      },

      username (): any {
          return this.auth.username
      }
  },

  methods: {
    openProfile () {
        this.$router.push({ name: 'user-profile' })
    }
  }
});
</script>
