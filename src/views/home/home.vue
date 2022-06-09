<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage agencies" v-show="!isLoading"/>

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content v-show="!isLoading">
      <no-item-yet :agencies="agencies" @addedAgency="getAgencies"/>
    </v-content>
    <div class="centered">
          <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import AgencyDataService from "@/services/AgencyDataService";
// import Agency from "@/types/Agency";
import ResponseData from "@/types/ResponseData";
// import env from '../../env';

export default Vue.extend({
  name: "Login",
  data: () => ({
      agencies: [],
      isLoading: false
  }),

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
          .catch((e: any) => {
              this.isLoading = false
              console.log(e);
              const message = e.response.data.message
              Swal.fire({ title: 'Get Agencies error', html: message });
          });
      }
  }
});
</script>
