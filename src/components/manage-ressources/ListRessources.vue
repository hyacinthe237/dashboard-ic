<template>
  <div class="main-content">
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
            <icon-close @click.native="dialog = false" class="pointer" />
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form style="width: 300px; margin: auto" @submit.prevent>
              <h2 class="mb-10 text-center">Create new resource</h2>
              <v-select
                  v-model="ghost.ressource_type"
                  :items="types"
                  item-text="label"
                  item-value="id"
                  label="Select a category"
                  persistent-hint
                  return-object
                  single-line
              ></v-select>
              <v-select
                  v-model="ghost.age_range"
                  :items="items"
                  label="Select an age range"
              ></v-select>
              <v-text-field
                label="resource name"
                solo
                rounded
                outlined
                dense
                elevation="0"
                v-model="ghost.name"
              ></v-text-field>
              <v-text-field
                label="Permalink"
                solo
                rounded
                outlined
                dense
                elevation="0"
                v-model="ghost.permalink"
              ></v-text-field>
              <v-textarea
                  name="description"
                  v-model="ghost.description"
                  label="Description"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
              ></v-textarea>

              <v-btn color="success" rounded class="pa-4" width="100%" @click="create()">
                Create
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="3" md="3" sm="12" xs="12" v-for="t in types" :key="t.id">
        <v-card
          rounded
          elevation="2"
          dark
          color="secondary"
          class="ressource-card"
        >
          <v-card-title class="justify-center">
            <icon-education v-if="t.label.includes('Education')"/>
            <icon-housing v-if="t.label.includes('House')"/>
            <icon-human v-if="t.label.includes('Human')"/>
            <icon-medical v-if="t.label.includes('Medical')"/>
            <icon-finance v-if="t.label.includes('Financial')"/>
            <icon-emergency v-if="t.label.includes('Emergency')"/>
          </v-card-title>
          <v-card-text class="justify-center" style="color: #fff !important">
            <h3>{{ t.label }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import IconEducation from "../icons/IconEducation.vue";
import IconHousing from "../icons/IconHousing.vue";
import IconHuman from "../icons/IconHuman.vue";
import IconMedical from "../icons/IconMedical.vue";
import IconFinance from "../icons/IconFinance.vue";
import IconEmergency from "../icons/IconEmergency.vue";
import IconClose from "../icons/IconClose.vue";
import Resource from "@/types/Resource";
import ResourceDataService from "@/services/ResourceDataService";
import ResponseData from "@/types/ResponseData";

export default Vue.extend({
  name: "list-ressources",

  props: {
      types: { type: Array, default: () => {} }
  },

  data: () => ({
      ghost: { id: null, name: '', agency:	null, description:	'', ressource_type:	null, age_range: '',  permalink:	'' } as Resource,
      dialog: false,
      isLoading: false,
      items: [ 'Toddler [1-3]', 'Pre Schooler [4-6]', 'Kid [7-10]', 'Underage [11-12]', 'Teenager [13-18]', 'Young Adult [19-25]' ],
  }),
  components: {
    IconEducation,
    IconHousing,
    IconHuman,
    IconEmergency,
    IconMedical,
    IconFinance,
    IconClose,
  },

  methods: {
    resetGhost () {
        this.ghost = { id: null, name: '', agency:	null, description:	'', ressource_type:	null, age_range: '',  permalink:	'' }
    },

    async create () {
        this.isLoading = true
        let data = {
            name: this.ghost.name, age_range: this.ghost.age_range, permalink: this.ghost.permalink,
            ressource_type: this.ghost.ressource_type, description: this.ghost.description
        };

        await ResourceDataService.create(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.resetGhost()
            Swal.fire({ title: 'Resource create successfull', html: 'Your resource details have been successfully created.' });
            this.$emit('addedResource')
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Resource create error', html: e });
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

</style>
