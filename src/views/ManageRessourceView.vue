<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage ressources" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content v-show="!isLoading">
        <list-ressources :types="ressource_types" />
    </v-content>
    <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
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
