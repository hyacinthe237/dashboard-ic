<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage ressources" />

    <navigation-app-drawer/>
    <v-content>
        <list-ressources/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import RessourceTypeDataService from "@/services/RessourceTypeDataService";
import ResponseData from "@/types/ResponseData";

export default Vue.extend({
    name: "ManageRessourceView",

    data: () => ({
      ressource_types: [],
      isLoading: false
    }),

    mounted () {
        this.$nextTick(() => { this.getRessourceTypes() })
    },

    methods: {
        async getRessourceTypes () {
            this.isLoading = true
            await RessourceTypeDataService.getAll()
            .then((response: ResponseData) => {
                this.isLoading = false
                this.ressource_types = response.data.results
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
