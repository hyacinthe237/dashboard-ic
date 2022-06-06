<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage ressources" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content v-show="!isLoading" class="main-content">
        <v-container>
          <v-row align="center" justify="center">
              <v-col>
                <template>
                  <v-btn
                    color="blue"
                    rounded
                    class="pa-4 mb-10"
                    width="200"
                    @click="goBack"
                  >
                    Back
                  </v-btn>
                </template>
              </v-col>
          </v-row>
        </v-container>
        <v-container>
            <v-row dense>
                <v-col
                    v-for="r in resources"
                    :key="r.id"
                    cols="3" md="3" sm="12" xs="12"
                    @click="openPermalink(r.permalink)"
                >
                    <v-card>
                        <v-img
                            :src="r.image"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            v-if="r.image != null"
                        >
                            <v-card-title>{{ r.ressource_type }}</v-card-title>
                        </v-img>
                        <v-img
                            src="https://www.thebluediamondgallery.com/wooden-tile/images/resource.jpg"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            v-else
                        >
                            <v-card-title>{{ r.ressource_type }}</v-card-title>
                        </v-img>

                        <v-card-title color="primary">{{ r.name }}</v-card-title>

                        <v-card-text>
                          <v-chip-group
                            active-class="deep-purple accent-4 white--text"
                            column
                          >
                            <v-chip>{{ r.age_range }}</v-chip>
                          </v-chip-group>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
    <div class="text-center">
        <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </div>
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
      ressource_type: {},
      resources: [],
      isLoading: false
    }),

    mounted () {
        this.$nextTick(() => {
          this.getResources()
        })
    },

    methods: {
        async getResources () {
            this.isLoading = true
            let id = this.$route.params.id
            await RessourceTypeDataService.getResources(id)
            .then((response: ResponseData) => {
                this.isLoading = false
                this.ressource_type = response.data.results.ressource_type
                this.resources = response.data.results.ressources
            })
            .catch((e: Error) => {
                this.isLoading = false
                console.log(e);
                Swal.fire({ title: 'Get resource error', html: e });
            });
        },

        openPermalink (permalink) {
            window.open(permalink, "_blank")
        },

        goBack () {
            this.$router.go(-1)
        }
    }
});
</script>

<style scoped>
.main-content {
  height: 100%;
  width: 100%;
  background: url("../../assets/img/fam2.png") no-repeat center center;
  background-size: contain;
  position: relative;
  width: 100%;
  padding: 75px;
}

.v-text-field--outlined >>> fieldset {
  border-color: #15b715;
}

.ressource-card {
  border-radius: 20px !important;
  padding: 10px !important;
  text-align: center;
  height: 150px;
}

</style>
