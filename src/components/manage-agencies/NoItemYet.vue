<template>
  <div class="main-content text-center">
    <!-- <div class="centered"> -->
      <h2 class="mb-1" v-if="agencies.length==0 && !isLoading">Not item yet</h2>
      <template>
        <v-btn
          color="success"
          rounded
          class="pa-4 mb-10"
          width="200"
          @click="createModal()"
          :disabled="isLoading"
        >
          Create new
        </v-btn>
      </template>
      <v-dialog
        v-model="dialog"
        persistent
        width="600"
      >
        <v-card class="rounded-lg">
          <v-toolbar color="white" elevation="0">
            <v-spacer></v-spacer>
            <v-toolbar-items class="pa-4">
              <icon-close @click.native="dialog = false" class="pointer" />
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form style="width: 300px; margin: auto" v-show="!isLoading">
                <h2 class="mb-10 text-center" v-show="isCreate">Create agency</h2>
                <h2 class="mb-10 text-center" v-show="!isCreate">Update agency</h2>
                <v-text-field
                  label="Name"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                  color="success"
                  v-model="agencyObject.name"
                  name="name"
                ></v-text-field>
                <v-text-field
                  label="Address"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                  v-model="agencyObject.address"
                  name="address"
                ></v-text-field>
                <v-text-field
                  label="Admin email"
                  solo
                  rounded
                  elevation="0"
                  outlined
                  dense
                  v-model="agencyObject.admin_email"
                  name="admin_email"
                ></v-text-field>
                <v-textarea
                    name="description"
                    v-model="agencyObject.description"
                    label="Description"
                    solo
                    rounded
                    elevation="0"
                    outlined
                    dense
                ></v-textarea>

                <v-btn color="success" v-show="isCreate" rounded class="pa-3" width="100%" @click="CreateAgency()">
                  Create
                </v-btn>
                <v-btn color="success" v-show="!isCreate" rounded class="pa-3" width="100%" @click="UpdateAgency()">
                  Update
                </v-btn>
              </v-form>
              <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-row v-show="!isLoading">
          <v-col cols="4" md="4" sm="12" xs="12" v-for="a in agencies" :key="a.id">
              <agency-item class="pointer" :agency="a" @openAgency="openEdit" />
          </v-col>
      </v-row>
      <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2'
import ResponseData from "@/types/ResponseData";
import IconClose from "../icons/IconClose.vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import AgencyDataService from "@/services/AgencyDataService";
import Agency from "@/types/Agency";
import AgencyItem from "./AgencyItem.vue";

export default Vue.extend({
  name: "NoItemYet",

  props: {
      agencies: { type: Array, default: () => {} },
  },

  data: () => ({
      agencyObject: { id: null, admin_email: '', name: '', address: '', description: '' } as Agency,
      userObject: { id: null, email: '', username: '', password: '', phone: '', is_kid: false, is_family: false, is_agency_admin: false, is_superuser: false } as User,
      dialog: false,
      isLoading: false,
      isCreate: true,
  }),

  components: {
    IconClose,
    AgencyItem
  },

  methods: {
    async CreateUserAgency () {
        this.isLoading = true
        let data = {
            email: this.userObject.email, username: this.userObject.username, password: this.userObject.password,
            phone: this.userObject.phone, is_kid: this.userObject.is_kid,
            is_family: this.userObject.is_family, is_agency_admin: true, is_superuser: this.userObject.is_superuser
        };

        await UserDataService.create(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data)
            this.resetGhost()
            Swal.fire({ title: 'user agency create successfull', html: 'Your user details have been successfully created.' });
        })
        .catch((e: any) => {
            this.isLoading = false
            const message = e.response.data.message
            Swal.fire({ title: 'user agency create error', html: message });
        });
    },

    resetGhost () {
        this.agencyObject = { id: null, admin_email: '', name: '', address: '', description: '' }
    },

    openEdit (agency: any) {
        this.isCreate = false
        this.dialog = true
        this.agencyObject = Object.assign({}, agency)
        localStorage.setItem('agencyId', agency.id)
    },

    createModal () {
        this.dialog = true
        this.isCreate = true
        this.resetGhost()
        localStorage.removeItem('agencyId')
    },

    async CreateAgency () {
        this.isLoading = true
        let data = {
            admin_email: this.agencyObject.admin_email, name: this.agencyObject.name,
            address: this.agencyObject.address, description: this.agencyObject.description
        };

        await AgencyDataService.create(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.dialog = false
            this.resetGhost()
            Swal.fire({ title: 'Agency create successfull', html: 'Your agency details have been successfully created.' });
            this.$emit('addedAgency')
        })
        .catch((e: any) => {
            this.isLoading = false
            const message = e.response.data.message
            Swal.fire({ title: 'Agency create error', html: message });
        });
    },

    async UpdateAgency () {
        this.isLoading = true
        let data = {
            admin_email: this.agencyObject.admin_email, name: this.agencyObject.name,
            address: this.agencyObject.address, description: this.agencyObject.description
        };

        let id: any = localStorage.getItem('agencyId')

        await AgencyDataService.update(id, data)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.dialog = false
            this.isCreate = true
            this.resetGhost()
            Swal.fire({ title: 'Agency update successfull', html: 'Your agency details have been successfully updated.' });
            this.$emit('addedAgency')
            localStorage.removeItem('agencyId')
        })
        .catch((e: any) => {
            this.isLoading = false
            const message = e.response.data.message
            Swal.fire({ title: 'Agency update error', html: message });
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
  padding: 50px;
}

.v-text-field--outlined >>> fieldset {
  border-color: #15b715;
}

.bordered {
  background: #28a7e3;
  border-radius: 20px 20px 0 0;
  height: 50px;
  color: #fff !important;
  font-weight: bold;
}

v-row {
  padding: 40px;
}

</style>
