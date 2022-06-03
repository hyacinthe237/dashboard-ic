<template>
  <v-app>
    <AppBarLogged title="Monitoring / Alert" />

    <navigation-app-drawer/>
    <v-content>
      <list-alert :alerts="alerts" @alertAdded="getAlerts" />
    </v-content>
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
            .catch((e: Error) => {
                this.isLoading = false
                console.log(e);
                Swal.fire({ title: 'Get Kids error', html: e });
            });
        }
    }
});
</script>
