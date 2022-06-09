<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage ressources" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content v-show="!isLoading">
        <list-ressources :types="ressource_types" @addedResource="getResources" @openType="openDetails" />
    </v-content>
    <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import RessourceTypeDataService from "@/services/RessourceTypeDataService";
import ResourceDataService from "@/services/ResourceDataService";
import ResponseData from "@/types/ResponseData";

export default Vue.extend({
    name: "ManageRessourceView",

    data: () => ({
      ressource_types: [],
      resources: [],
      isLoading: false
    }),

    mounted () {
        this.$nextTick(() => {
          this.getRessourceTypes()
          this.getResources()
        })
    },

    methods: {
        openDetails (type: any) {
            this.$router.push({ name: 'manage-ressource', params: { id: type.id } })
        },
        async getRessourceTypes () {
            this.isLoading = true
            await RessourceTypeDataService.getAll()
            .then((response: ResponseData) => {
                this.isLoading = false
                this.ressource_types = response.data.results
            })
            .catch((e: any) => {
                this.isLoading = false
                const message = e.response.data.message || e.response.data.msg || e.response.data
                Swal.fire({ title: 'Get resource type error', html: message });
            });
        },
        async getResources () {
            this.isLoading = true
            await ResourceDataService.getAll()
            .then((response: ResponseData) => {
                this.isLoading = false
                this.resources = response.data.results
            })
            .catch((e: any) => {
                this.isLoading = false
                const message = e.response.data.message || e.response.data.msg || e.response.data
                Swal.fire({ title: 'Get resource error', html: message });
            });
        },
    }
});
</script>
