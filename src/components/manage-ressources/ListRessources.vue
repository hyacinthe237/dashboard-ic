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
          Create new
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
            <v-form style="width: 300px; margin: auto">
              <h2 class="mb-10 text-center">Create new category</h2>
              <v-select
                :items="items"
                label="Select age range"
                rounded
                outlined
                dense
                solo
              ></v-select>
              <v-text-field
                label="Name of category"
                solo
                rounded
                outlined
                dense
                elevation="0"
              ></v-text-field>
              <v-text-field
                label="Permalink"
                solo
                rounded
                outlined
                dense
                elevation="0"
              ></v-text-field>

              <v-btn color="success" rounded class="pa-4" width="100%">
                Create
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="3" md="3" sm="12" xs="12">
        <v-card
          rounded
          elevation="2"
          dark
          color="secondary"
          class="ressource-card"
        >
          <v-card-title class="justify-center">
            <icon-education />
          </v-card-title>
          <v-card-text class="justify-center" style="color: #fff !important">
            <h3>Education</h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3" md="3" sm="12" xs="12">
        <v-card
          rounded
          elevation="2"
          dark
          color="secondary"
          class="ressource-card"
        >
          <v-card-title class="justify-center">
            <icon-housing />
          </v-card-title>
          <v-card-text
            class="justify-center text-white"
            style="color: #fff !important"
          >
            <h3>
              Housing <br />
              Assistance
            </h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3" md="3" sm="12" xs="12">
        <v-card
          rounded
          elevation="2"
          dark
          color="secondary"
          class="ressource-card"
        >
          <v-card-title class="justify-center">
            <icon-human />
          </v-card-title>
          <v-card-text
            class="justify-center text-white"
            style="color: #fff !important"
          >
            <h3>
              Human <br />
              Services
            </h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" md="3" sm="12" xs="12">
        <v-card
          rounded
          elevation="2"
          dark
          color="secondary"
          class="ressource-card"
        >
          <v-card-title class="justify-center">
            <icon-finance />
          </v-card-title>
          <v-card-text
            class="justify-center text-white"
            style="color: #fff !important"
          >
            <h3>
              Financial <br />
              Assistance
            </h3>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3" md="3" sm="12" xs="12">
        <v-card
          rounded
          elevation="2"
          dark
          color="secondary"
          class="ressource-card"
        >
          <v-card-title class="justify-center">
            <icon-medical />
          </v-card-title>
          <v-card-text
            class="justify-center text-white"
            style="color: #fff !important"
          >
            <h3>
              Medical <br />
              Assistance
            </h3>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3" md="3" sm="12" xs="12">
        <v-card
          rounded
          elevation="2"
          dark
          color="secondary"
          class="ressource-card"
        >
          <v-card-title class="justify-center">
            <icon-emergency />
          </v-card-title>
          <v-card-text
            class="justify-center text-white"
            style="color: #fff !important"
          >
            <h3>
              Emergency <br />
              Services
            </h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconEducation from "../icons/IconEducation.vue";
import IconHousing from "../icons/IconHousing.vue";
import IconHuman from "../icons/IconHuman.vue";
import IconMedical from "../icons/IconMedical.vue";
import IconFinance from "../icons/IconFinance.vue";
import IconEmergency from "../icons/IconEmergency.vue";
import IconClose from "../icons/IconClose.vue";

export default Vue.extend({
  name: "list-ressources",

  data() {
    return {
      dialog: false,
      items: ["1-10 ans", "11-20 ans", "21-50 ans"],
    };
  },
  components: {
    IconEducation,
    IconHousing,
    IconHuman,
    IconEmergency,
    IconMedical,
    IconFinance,
    IconClose,
  },
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
