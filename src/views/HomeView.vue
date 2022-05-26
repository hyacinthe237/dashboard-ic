<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage agencies" v-show="!isLoading"/>

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content v-show="!isLoading">
      <no-item-yet :agencies="agencies" @added="getAgencies"/>
    </v-content>
    <div class="centered">
          <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import AppBarLogged from "../components/layouts/AppBarLogged.vue";
import NavigationAppDrawer from "../components/layouts/NavigationAppDrawer.vue";
import NoItemYet from "../components/manage-agencies/NoItemYet.vue";
import AgencyDataService from "@/services/AgencyDataService";
import Agency from "@/types/Agency";
import ResponseData from "@/types/ResponseData";

export default Vue.extend({
  name: "Login",
  data: () => ({
      agencies: [],
      isLoading: false
  }),
  components: {
    AppBarLogged,
    NavigationAppDrawer,
    NoItemYet
  },

  mounted () {
      this.getAgencies()
  },

  methods: {
      async getAgencies () {
          this.isLoading = true
          await AgencyDataService.getAll()
          .then((response: ResponseData) => {
              this.isLoading = false
              this.agencies = response.data.results
          })
          .catch((e: Error) => {
              this.isLoading = false
              console.log(e);
          });
      }
  }
});
</script>
