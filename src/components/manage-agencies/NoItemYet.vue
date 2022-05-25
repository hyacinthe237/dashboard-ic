<template>
  <div class="main-content text-center">
    <div class="centered">
      <h2 class="mb-1">Not item yet</h2>
      <v-dialog
        v-model="dialog"
        persistent
        width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            rounded
            class="pa-4"
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
                <h2 class="mb-10 text-center">Create agencie</h2>
                <v-text-field
                  label="Name"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                  color="success"
                ></v-text-field>
                <v-text-field
                  label="Address"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  label="Foster home adminitrator"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  label="Login"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  label="Password"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                ></v-text-field>

                <v-btn color="success" rounded class="pa-3" width="100%">
                  Create
                </v-btn>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ResponseData from "@/types/ResponseData";
import IconClose from "../icons/IconClose.vue";

export default Vue.extend({
  name: "NoItemYet",

  data() {
    return {
      dialog: false,
    };
  },
  components: {
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
}

.v-text-field--outlined >>> fieldset {
  border-color: #15b715;
}

</style>
