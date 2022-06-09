<template>
  <v-app>
    <AppBarLogged title="Monitoring / Manage ressources" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content v-show="!isLoading" class="main-content">
        <v-container>
          <v-row v-show="!isLoading">
              <v-col cols="6" align="right">
                  <v-dialog
                    v-model="dialog"
                    persistent
                    width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="success"
                        rounded
                        class="pa-4 mb-10"
                        width="200"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Create resource
                      </v-btn>
                    </template>
                    <v-card class="rounded-lg">
                      <v-toolbar color="white" elevation="0">
                        <v-spacer></v-spacer>
                        <v-toolbar-items class="pa-4">
                          <icon-close @click.native="dialog = false" class="pointer" :disabled="isLoading" />
                        </v-toolbar-items>
                      </v-toolbar>
                      <v-card-text>
                        <v-container>
                          <v-form style="width: 300px; margin: auto" @submit.prevent v-show="!isLoading">
                            <h2 class="mb-10 text-center">Create new resource</h2>
                            <v-select
                                name="age_range"
                                v-model="ghost.age_range"
                                :items="items"
                                label="Select an age range"
                            ></v-select>
                            <v-text-field
                              label="resource name"
                              solo
                              name="name"
                              rounded
                              outlined
                              dense
                              elevation="0"
                              v-model="ghost.name"
                            ></v-text-field>
                            <v-text-field
                              label="Permalink"
                              name="permalink"
                              solo
                              rounded
                              outlined
                              dense
                              elevation="0"
                              v-model="ghost.permalink"
                            ></v-text-field>
                            <v-file-input
                              accept="image/*"
                              label="Click here to select an image file"
                              outlined
                              name="image"
                              @change="onFileChange"
                            ></v-file-input>

                            <v-btn color="success" rounded class="pa-4" width="100%" @click="create()">
                              Create
                            </v-btn>
                          </v-form>
                          <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
              </v-col>
              <v-col cols="6" v-show="!isLoading">
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

                        <v-card-title class="primary">{{ r.name }}</v-card-title>

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
import Resource from "@/types/Resource";

export default Vue.extend({
    name: "ManageRessourceView",

    data: () => ({
      ressource_type: {
        created_at: '',
        description: '',
        id: '',
        label: '',
        parent_ressource: '',
        update_at: '',
      },
      resources: [],
      ghost: { id: null, name: '', agency:	null, description:	'', ressource_type:	'', age_range: '',  permalink:	'', image: '' } as Resource,
      dialog: false,
      isLoading: false,
      items: [ 'Toddler [1-3]', 'Pre Schooler [4-6]', 'Kid [7-10]', 'Underage [11-12]', 'Teenager [13-18]', 'Young Adult [19-25]' ],
    }),

    mounted () {
        this.$nextTick(() => {
          this.getResources()
        })
    },

    computed: {
        auth (): any {
          let thau: any = localStorage.getItem('infinite_user')
          return JSON.parse(thau)
        },
    },

    methods: {
        async getResources () {
            this.isLoading = true
            let id = this.$route.params.id
            await RessourceTypeDataService.getResources(id)
            .then((response: ResponseData) => {
                this.isLoading = false
                this.ressource_type = Object.assign({}, response.data.results.ressource_type)
                this.resources = response.data.results.ressources
            })
            .catch((e: any) => {
                this.isLoading = false
                const message = e.response.data.message || e.response.data.msg || e.response.data
                Swal.fire({ title: 'Get resource error', html: message });
            });
        },

        goBack () {
            this.$router.go(-1)
        },

        onFileChange (file: any) {
            this.ghost.image = file
        },

        resetGhost () {
            this.ghost = { id: null, name: '', agency:	null, description:	'', ressource_type:	'', age_range: '',  permalink:	'',  image:	''  }
        },

        async create () {
            this.isLoading = true
            let data = new FormData();
            data.append("name", this.ghost.name)
            data.append("agency", this.auth.agency_id)
            data.append("age_range", this.ghost.age_range)
            data.append("image", this.ghost.image)
            data.append("ressource_type", this.ressource_type.id)

            await ResourceDataService.create(data)
            .then((response: ResponseData) => {
                this.isLoading = false
                this.resetGhost()
                Swal.fire({ title: 'Resource create successfull', html: 'Your resource details have been successfully created.' });
                this.$emit('addedResource')
            })
            .catch((e: any) => {
                this.isLoading = false
                const message = e.response.data.message || e.response.data.msg || e.response.data
                Swal.fire({ title: 'Resource create error', html: message });
            });
        },
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

.primary {
  color: white;
  text-transform: capitalize;
  font-weight: bold;
}

</style>
