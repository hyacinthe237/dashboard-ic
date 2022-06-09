<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent width="600">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="success" rounded
                    class="pa-4 mb-8" width="200"
                    v-bind="attrs" v-on="on"
                >Add new kid</v-btn>
            </template>

        <!-- Modal off Add Kid -->
        <v-card class="rounded-lg">
            <v-toolbar color="white" elevation="0">
                <v-spacer></v-spacer>
                <v-toolbar-items class="pa-4">
                    <icon-close @click.native="dialog = false" class="pointer" :disabled="isLoading"/>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-container v-show="!isLoading">
                    <v-form style="width: 300px; margin: auto" @submit.prevent="CreateKid()">
                          <h2 class="mb-10 text-center">Add new kid</h2>
                          <v-text-field
                              label="First Name"
                              solo rounded outlined dense
                              elevation="0" name="first_name"
                              v-model="ghost.first_name"
                          ></v-text-field>
                          <v-text-field
                              label="Last Name"
                              solo rounded outlined
                              dense elevation="0"
                              name="last_name" v-model="ghost.last_name"
                          ></v-text-field>
                          <v-text-field
                              label="Email"
                              solo rounded outlined
                              dense elevation="0"
                              name="email" v-model="ghost.email"
                          ></v-text-field>
                          <!-- <v-text-field
                              label="username"
                              solo rounded outlined
                              dense elevation="0"
                              name="username" v-model="ghost.username"
                          ></v-text-field> -->
                          <label>Date of arrival</label>
                          <v-text-field
                              label="Date of arrival"
                              solo rounded outlined dense
                              elevation="0" name="date_of_arrival"
                              v-model="ghost.date_of_arrival" type="date"
                          ></v-text-field>
                          <label>Birthdate</label>
                          <v-text-field
                              label="Birthdate"
                              solo rounded outlined dense
                              elevation="0" name="birthdate"
                              v-model="ghost.birthdate" type="date"
                          ></v-text-field>

                          <v-text-field
                              label="Age"
                              solo rounded outlined dense
                              elevation="0" name="age"
                              v-model="ghost.age" type="number"
                          ></v-text-field>

                          <v-text-field
                              label="Phone"
                              solo rounded outlined dense
                              elevation="0" name="phone"
                              v-model="ghost.phone"
                          ></v-text-field>

                      <v-radio-group name="sex" v-model="ghost.sex">
                          <v-radio
                              v-for="(g, index) in genders"
                              :key="index+1"
                              :label="`${g}`"
                              :value="`${g}`"
                          ></v-radio>
                      </v-radio-group>

                      <v-btn color="success" rounded class="pa-4" width="100%" @click="CreateKid()">
                      Create</v-btn>
                    </v-form>
                </v-container>
                <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
            </v-card-text>
        </v-card>
        </v-dialog>

        <v-row v-show="!isLoading">
            <v-col cols="4" md="4" sm="12" xs="12" v-for="kid in kids" :key="kid.id">
                <kid-item @openItem="openItem" class="pointer" :kid="kid" />
            </v-col>
        </v-row>
        <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import IconClose from "../icons/IconClose.vue";
// import IconEdit from "../icons/IconEdit.vue";
import KidItem from "./KidItem.vue";
import ResponseData from "@/types/ResponseData";

// kids http & default json data
import KidDataService from "@/services/KidDataService";
import Kid from "@/types/Kid";

// parentinfos http & default json data
import ParentDataService from "@/services/ParentDataService";
import Parent from "@/types/Parent";

// medicalinfos http & default json data
import MedicalDataService from "@/services/MedicalDataService";
import Medical from "@/types/Medical";

// placementhistory http & default json data
import HistoryDataService from "@/services/HistoryDataService";
import History from "@/types/History";

// scoolinfos http & default json data
import SchoolDataService from "@/services/SchoolDataService";
import School from "@/types/School";

export default Vue.extend({
  name: "list-kids",

  props: {
      kids: { type: Array, default: () => [] },
  },

  data: () => ({
      ghost: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '', user_id: null } as Kid,
      kid: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '', user_id: null } as Kid,
      dialog: false,
      isLoading: false,
      edit: false,
      tab: null,
      attrs: [],
      genders: ["Female", "Male"],
  }),

  components: {
    KidItem,
    IconClose,
  },

  mounted () {
      this.resetGhost()
  },

  methods: {
    async CreateKid () {
        this.isLoading = true
        let data = {
            first_name: this.ghost.first_name, last_name: this.ghost.last_name, email: this.ghost.email,
            date_of_arrival: this.ghost.date_of_arrival, birthdate: this.ghost.birthdate,
            sex: this.ghost.sex, age: this.ghost.age, phone: this.ghost.phone,
        };

        await KidDataService.create(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.$router.push({ name: 'manage-kids' })
            this.resetGhost()
            Swal.fire({ title: 'Kid create successfull', html: 'Your kid details have been successfully created.' })
            this.$emit('addedKid')
        })
        .catch((e: any) => {
            this.isLoading = false
            const message = e.response.data.message
            Swal.fire({ title: 'Kid create error', html: message });
        });
    },

    resetGhost () {
        this.ghost = { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '', user_id: null }
    },

    openItem (kid: any) {
        this.$router.push({ name: 'kid-profile', params: { id: kid.id } })
    },

    async updateKid () {
      this.isLoading = true
      let data = {
          first_name: this.kid.first_name, last_name: this.kid.last_name, email: this.kid.email,
          date_of_arrival: this.kid.date_of_arrival, birthdate: this.kid.birthdate,
          sex: this.kid.sex, age: this.kid.age, phone: this.kid.phone,
      };

      let id = localStorage.getItem('kidId')
      await KidDataService.update(id, data)
      .then((response: ResponseData) => {
          this.isLoading = false
          console.log(response.data);
          this.kid = Object.assign({}, response.data)
          this.edit = false
          this.resetGhost()
          Swal.fire({ title: 'Kid update successfull', html: 'Your kid details have been successfully updated.' });
          this.$emit('updatedKid')
      })
      .catch((e: any) => {
          this.isLoading = false
          const message = e.response.data.message
          Swal.fire({title: 'Kid update error', html: message });
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

</style>
