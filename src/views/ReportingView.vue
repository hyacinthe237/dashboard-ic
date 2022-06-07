<template>
  <v-app>
    <AppBarLogged title="Monitoring / Reporting" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading" />
    <v-content v-show="!isLoading">
      <div class="main-content">
        <v-row>
          <v-col cols="4" md="4" sm="12" xs="12">
            <v-card
              rounded-lg
              elevation="2"
              dark
              color="secondary"
              class="card-stats"
            >
              <v-list-item class="pa-3">
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="title">Number of kids</span> <br />
                    <span class="number">{{ reporting.number_of_kids }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="4" md="4" sm="12" xs="12">
            <v-card
              rounded-lg
              elevation="2"
              color="white"
              class="card-stats"
            >
              <v-list-item class="mt-2 mb-2">
                <v-list-item-content class="text-blue">
                  <v-list-item-title>
                    <span class="title">Number of agencies</span> <br />
                    <span class="number">{{ nb_agency }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="4" md="4" sm="12" xs="12">
            <v-card
              rounded-lg
              elevation="2"
              color="light"
              class="card-stats"
            >
              <v-list-item class="mt-2 mb-2 text-blue">
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="title">Number of users</span> <br />
                    <span class="number">{{ nb_users }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-card
              rounded-lg
              elevation="2"
              color="white"
              class="card-reporting"
            >
              <v-list-item class="mt-2 mb-2">
                <v-list-item-content>
                  <v-list-item-title class="bold"
                    >Number of reported issues
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <br />
              <v-row>
                <v-col cols="3" sm="3" md="3">
                  <v-list-item>
                    <v-list-item-content class="text-center">
                      <v-list-item-title
                        class="mb-2 bold card-reporting-subtitle"
                      >
                        This month</v-list-item-title
                      >
                      <v-list-item-subtitle
                        class="reporting-number"
                      >
                        {{ reporting.number_of_issues_current_month }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <icon-vertical-divider />

                <v-col cols="3" sm="3" md="3">
                  <v-list-item>
                    <v-list-item-content class="text-center">
                      <v-list-item-title
                        class="mb-2 bold card-reporting-subtitle"
                      >
                        Last month</v-list-item-title
                      >
                      <v-list-item-subtitle
                        class="reporting-number"
                      >
                        {{ reporting.number_of_issues_last_month }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <icon-vertical-divider />
                <v-col cols="3" sm="3" md="3">
                  <v-list-item>
                    <v-list-item-content class="text-center">
                      <v-list-item-title
                        class="mb-2 bold card-reporting-subtitle"
                      >
                        Current Year</v-list-item-title
                      >
                      <v-list-item-subtitle
                        class="reporting-number"
                      >
                        {{ reporting.number_of_issues_current_year }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <!-- <v-col cols="3" sm="3" md="3">
                  <v-list-item>
                    <v-list-item-content class="text-center">
                      <v-list-item-title
                        class="mb-2 bold card-reporting-subtitle"
                      >
                        November</v-list-item-title
                      >
                      <v-list-item-subtitle
                        class="reporting-number"
                      >
                        50
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col> -->
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-content>

    <div class="text-center">
        <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";
import _ from 'lodash';

export default Vue.extend({
  name: "ReportingView",
  data: () => ({
      isLoading: false,
      reporting: {
        number_of_agencies: null,
        number_of_issues_current_month: 0,
        number_of_issues_current_year: 0,
        number_of_issues_last_month: 0,
        number_of_kids: 0,
        number_of_users: null,
      },
  }),

  mounted () {
      this.getUserReporting()
  },

  computed: {
      nb_agency () {
        return !_.isEmpty(this.reporting.number_of_agencies)
            ? this.reporting.number_of_agencies : 0
      },

      nb_users () {
        return !_.isEmpty(this.reporting.number_of_users)
            ? this.reporting.number_of_users : 0
      },
  },

  methods: {
    async getUserReporting () {
        this.isLoading = true
        await UserDataService.getUserReporting()
        .then((response: ResponseData) => {
            this.isLoading = false
            this.reporting = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get User Reporting error', html: e });
        });
    }
  }
});
</script>

<style scoped>
.main-content {
  height: 100%;
  width: 100%;
  background: url("../assets/img/fam2.png") no-repeat center center;
  background-size: contain;
  position: relative;
  width: 100%;
  padding: 100px;
}

</style>
