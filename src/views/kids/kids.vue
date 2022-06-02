<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage kids" />

    <navigation-app-drawer/>
    <v-content>
        <list-kids :kids="kids" v-show="!isLoading" @addedKid="getKids" />
        <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import KidDataService from "@/services/KidDataService";
// import Kid from "@/types/Kid";
import ResponseData from "@/types/ResponseData";

export default Vue.extend({
    name: "Kids",

    data: () => ({
        kids: [],
        isLoading: false
    }),

    mounted () {
        this.$nextTick(() => { this.getKids() })
    },

    methods: {
        async getKids () {
            this.isLoading = true
            await KidDataService.getAll()
            .then((response: ResponseData) => {
                this.isLoading = false
                this.kids = response.data.results
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
