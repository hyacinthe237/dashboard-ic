<template>
  <div class="main-content">
    <v-dialog v-model="dialog" persistent width="600">
        <!--<template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success" rounded
                class="pa-4 mb-8" width="200"
                v-bind="attrs" v-on="on"
            >Add new alert</v-btn>
        </template>-->

    <v-card class="rounded-lg">
        <v-toolbar color="white" elevation="0">
            <v-spacer></v-spacer>
            <v-toolbar-items class="pa-4">
                <icon-close @click.native="dialog = false" class="pointer"  :disabled="isLoading"/>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <v-container>
                <v-form style="width: 300px; margin: auto" v-show="!isLoading">
                      <h2 class="mb-10 text-center">{{ 'Alert details'}}</h2>
                      <v-text-field
                          label="Title"
                          solo rounded outlined dense
                          elevation="0" name="title"
                          v-model="ghost.title"
                      ></v-text-field>
                      <v-textarea
                          label="Content"
                          solo rounded outlined
                          dense elevation="0"
                          name="content" v-model="ghost.content"
                      ></v-textarea>
                </v-form>
                <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
            </v-container>
        </v-card-text>
    </v-card>
  </v-dialog>


    <alert-item v-for="a in alerts" :key="a.id" :alert="a" @openAlert="openEdit"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import AlertItem from "./AlertItem.vue";
import ResponseData from "@/types/ResponseData";

// kids http & default json data
import AlertDataService from "@/services/AlertDataService";
import Alert from "@/types/Alert";

export default Vue.extend({
  name: "list-alert",

  props: { alerts: { type: Array, default: () => [] } },
  data: () => ({
    dialog: false,
    isLoading: false,
    isEdit: false,
    ghost: { id: null, title: '', content: '' } as Alert,
  }),
  components: {
    AlertItem,
  },

  methods: {
      async Create () {
          this.isLoading = true
          let data = {
              title: this.ghost.title, content: this.ghost.content
          };

          await AlertDataService.create(data)
          .then((response: ResponseData) => {
              this.isLoading = false
              this.dialog = false
              this.resetGhost()
              Swal.fire({ title: 'Alert create successfull', html: 'Your alert details have been successfully created.' })
              this.$emit('alertAdded')
          })
          .catch((e: any) => {
              this.isLoading = false
              const message = e.response.data.message || e.response.data.msg || e.response.data
              Swal.fire({ title: 'Alert create error', html: message });
          });
      },

      async Update () {
          this.isLoading = true
          let data = {
              title: this.ghost.title, content: this.ghost.content
          };

          await AlertDataService.update(this.ghost.id, data)
          .then((response: ResponseData) => {
              this.isLoading = false
              this.dialog = false
              this.resetGhost()
              Swal.fire({ title: 'Alert update successfull', html: 'Your alert details have been successfully updated.' })
              this.$emit('alertUpdated')
              this.isEdit = false
          })
          .catch((e: any) => {
              this.isLoading = false
              const message = e.response.data.message || e.response.data.msg || e.response.data
              Swal.fire({ title: 'Alert update error', html: message });
          });
      },

      confirmDelete (alert: any) {
          Swal.fire({
              title: 'Are you sure ?',
              html: "Are you sure you want to delete the selected alert ?",
          }).then((result) => {
              if (result.value) {
                  this.delete(alert)
              }
          })
      },

      async delete (alert: any) {
          this.isLoading = true
          await AlertDataService.delete(alert.id)
          .then((response: ResponseData) => {
              this.isLoading = false
              Swal.fire({ title: 'Alert delete successfull', html: 'Your alert details have been successfully deleted.' })
              this.$emit('alertUpdated')
          })
          .catch((e: any) => {
              this.isLoading = false
              const message = e.response.data.message || e.response.data.msg || e.response.data
              Swal.fire({ title: 'Alert delete error', html: message });
          });
      },

      resetGhost () {
          this.ghost = { id: null, title: '', content: '' }
      },

      openEdit (alert: any) {
          this.dialog = true
          this.ghost = Object.assign({}, alert)
          this.isEdit = true
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
  padding: 50px;
}
</style>
