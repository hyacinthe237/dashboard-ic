<template>
  <v-app>
    <AppBarLogged title="Monitoring / Reporting" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading" />
    <v-content>
      <div class="main-content" v-show="!isLoading">
        <v-list-group active no-action v-for="ie in issues" :key="ie.id">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold pl-0">{{ ie.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ ie.description }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
      <div class="text-center mt-20">
          <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import IssueDataService from "@/services/IssueDataService";
import ResponseData from "@/types/ResponseData";

export default Vue.extend({
  name: "ReportedIssueView",
  data: () => ({
      issues: [],
      isLoading: false,
      nextUrl: ''
  }),

  mounted () {
      this.$nextTick(() => { this.getIssues() })
  },

  methods: {
      async getIssues () {
          this.isLoading = true
          await IssueDataService.getAll()
          .then((response: ResponseData) => {
              this.isLoading = false
              this.issues = response.data.results
              this.nextUrl = response.data.next
          })
          .catch((e: any) => {
              this.isLoading = false
              console.log(e);
              const message = e.response.data.message
              Swal.fire({ title: 'Get issues error', html: message });
          });
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
  padding: 100px 200px 200px 200px;
}

.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 2px;
}
</style>
