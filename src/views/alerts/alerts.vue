<template>
  <v-app>
    <AppBarLogged title="Monitoring / Alert" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content v-show="!isLoading">
      <list-alert :alerts="alerts" @alertAdded="getAlerts" @alertUpdated="getAlerts"/>
    </v-content>
    <div class="text-center mt-20">
        <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import AlertDataService from "@/services/AlertDataService";
import ResponseData from "@/types/ResponseData";

export default Vue.extend({
    name: "Alerts",

    data: () => ({
        alerts: [],
        isLoading: false
    }),

    mounted () {
        this.$nextTick(() => { this.getAlerts() })
    },

    methods: {
        async getAlerts () {
            this.isLoading = true
            await AlertDataService.getAll()
            .then((response: ResponseData) => {
                this.isLoading = false
                this.alerts = response.data.results
            })
            .catch((e: any) => {
                this.isLoading = false
                console.log(e);
                const message = e.response.data.message || e.response.data.msg || e.response.data
                Swal.fire({ title: 'Get Kids error', html: message });
            });
        }
    }
});
</script>
