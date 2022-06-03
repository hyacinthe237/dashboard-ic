<template>
  <div class="main-content">
    <v-dialog v-model="dialog" persistent width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success" rounded
                class="pa-4 mb-8" width="200"
                v-bind="attrs" v-on="on"
            >Add new issue</v-btn>
        </template>

    <!-- Modal off Add Kid -->
    <v-card class="rounded-lg">
        <v-toolbar color="white" elevation="0">
            <v-spacer></v-spacer>
            <v-toolbar-items class="pa-4">
                <icon-close @click.native="dialog = false" class="pointer"  :disabled="isLoading"/>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <v-container>
                <v-form style="width: 300px; margin: auto" @submit.prevent="Create()" v-show="!isLoading">
                      <h2 class="mb-10 text-center">{{ isEdit ? 'Edit issue' : 'Add new issue'}}</h2>
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

                  <v-btn color="success" rounded class="pa-4" width="100%" @click="Create()" v-show="!isEdit">
                  Create</v-btn>

                  <v-btn color="success" rounded class="pa-4" width="100%" @click="Update()" v-show="isEdit">
                  Update</v-btn>
                </v-form>
                <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
            </v-container>
        </v-card-text>
    </v-card>
  </v-dialog>


    <issue-item v-for="i in issues" :key="i.id" :issue="i" @openissue="openEdit" @confirmDelete="confirmDelete" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import IssueItem from "./IssueItem.vue";
import ResponseData from "@/types/ResponseData";

// kids http & default json data
import IssueDataService from "@/services/IssueDataService";
import Issue from "@/types/Issue";

export default Vue.extend({
  name: "list-issue",

  props: { issues: { type: Array, default: () => [] } },
  data: () => ({
    dialog: false,
    isLoading: false,
    isEdit: false,
    ghost: { id: null, title: '', content: '' } as issue,
  }),
  components: {
    issueItem,
  },

  methods: {
      async Create () {
          this.isLoading = true
          let data = {
              title: this.ghost.title, content: this.ghost.content
          };

          await issueDataService.create(data)
          .then((response: ResponseData) => {
              this.isLoading = false
              this.dialog = false
              this.resetGhost()
              Swal.fire({ title: 'issue create successfull', html: 'Your issue details have been successfully created.' })
              this.$emit('issueAdded')
          })
          .catch((e: Error) => {
              this.isLoading = false
              console.log(e);
              Swal.fire({ title: 'issue create error', html: e });
          });
      },

      async Update () {
          this.isLoading = true
          let data = {
              title: this.ghost.title, content: this.ghost.content
          };

          await issueDataService.update(this.ghost.id, data)
          .then((response: ResponseData) => {
              this.isLoading = false
              this.dialog = false
              this.resetGhost()
              Swal.fire({ title: 'issue update successfull', html: 'Your issue details have been successfully updated.' })
              this.$emit('issueUpdated')
              this.isEdit = false
          })
          .catch((e: Error) => {
              this.isLoading = false
              console.log(e);
              Swal.fire({ title: 'issue update error', html: e });
          });
      },

      confirmDelete (issue: any) {
          Swal.fire({
              title: 'Are you sure ?',
              html: "Are you sure you want to delete the selected issue ?",
          }).then((result) => {
              if (result.value) {
                  this.delete(issue)
              }
          })
      },

      async delete (issue: any) {
          this.isLoading = true
          await issueDataService.delete(issue.id)
          .then((response: ResponseData) => {
              this.isLoading = false
              Swal.fire({ title: 'issue delete successfull', html: 'Your issue details have been successfully deleted.' })
              this.$emit('issueUpdated')
          })
          .catch((e: Error) => {
              this.isLoading = false
              console.log(e);
              Swal.fire({ title: 'issue delete error', html: e });
          });
      },

      resetGhost () {
          this.ghost = { id: null, title: '', content: '' }
      },

      openEdit (issue: any) {
          this.dialog = true
          this.ghost = Object.assign({}, issue)
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
