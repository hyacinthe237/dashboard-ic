<template>
    <v-app>
      <AppBarLogged title="Monitoring / Alert" />

      <navigation-app-drawer/>
      <v-content>
        <div class="main-content">
            <!-- Modal off more informations -->
            <!-- <v-dialog v-model="edit" width="1100"> -->
                <v-card class="rounded-lg">
                    <v-toolbar color="white" elevation="0">
                        <v-spacer></v-spacer>
                        <v-toolbar-items class="pa-4">
                            <!-- <icon-close @click.native="edit = false" class="pointer" :disabled="isLoading"/> -->
                        </v-toolbar-items>
                        <template v-slot:extension>
                            <v-tabs v-model="tab" active-class="bordered" align-with-title>
                                <v-tabs-slider color="secondary"></v-tabs-slider>

                                <v-tab> Personnal informations </v-tab>
                                <v-tab> Parents informations </v-tab>
                                <v-tab> School informations </v-tab>
                                <v-tab> Medical informations </v-tab>
                                <v-tab> Placement history </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-card-text>
                        <v-divider
                            color="#28a7e3"
                            style="margin: 0 0 17px 17px !important"
                        ></v-divider>
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <v-card flat v-show="!isLoading">
                                    <v-card-title>
                                    <v-list-item>
                                        <v-img
                                            alt="Infinite connection"
                                            class="shrink mr-2"
                                            contain src="@/assets/img/kid.png"
                                            transition="scale-transition"
                                            max-height="100%"
                                            width="60"
                                        />

                                        <v-list-item-content>
                                            <v-list-item-title class="font-weight-bold">
                                                {{ kid.first_name }} {{ kid.last_name }} <icon-edit class="ml-2" />
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item class="">
                                    <v-list-item-content>
                                    <v-list-item-title
                                    ><v-row>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">First Name :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.first_name" name="first_name"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">Last Name :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.last_name" name="last_name"></v-text-field>
                                    </v-col>
                                    </v-row>
                                    </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item class="">
                                    <v-list-item-content>
                                    <v-list-item-title
                                    ><v-row>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">Email Adress :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.email" name="email"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">Gender :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.sex" name="sex"></v-text-field>
                                    </v-col>
                                    </v-row>
                                    </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item class="">
                                    <v-list-item-content>
                                    <v-list-item-title
                                    ><v-row>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">Date of arrival :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.date_of_arrival" name="date_of_arrival" type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">Birthdate :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.birthdate" name="birthdate" type="date"></v-text-field>
                                    </v-col>
                                    </v-row>
                                    </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item class="">
                                    <v-list-item-content>
                                    <v-list-item-title
                                    ><v-row>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">Age :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.age" name="age"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" align="right">
                                    <v-subheader class="pt-7">Phone :</v-subheader>
                                    </v-col>
                                    <v-col cols="4">
                                    <v-text-field focus v-model="kid.phone" name="phone"></v-text-field>
                                    </v-col>
                                    </v-row>
                                    </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="success"
                                            rounded
                                            class="pa-4"
                                            width="200"
                                            :disabled="isLoading"
                                            @click="updateKid()"
                                        >Update</v-btn>
                                    </v-card-actions>
                                </v-card>
                                <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
                            </v-tab-item>
                        <v-tab-item>
                        <v-card flat>
                        <v-card-text>
                            <v-list-item>
                                <v-img
                                    alt="Infinite connection"
                                    class="shrink mr-2"
                                    contain src="@/assets/img/kid.png"
                                    transition="scale-transition"
                                    max-height="100%"
                                    width="60"
                                />

                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-bold">
                                        {{ kid.first_name }} {{ kid.last_name }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Father Name :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.father_name" name="father_name"></v-text-field>
                                            </v-col>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Father phone :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.father_phone" name="father_phone"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">father address :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.father_address" name="father_address"></v-text-field>
                                            </v-col>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">father profession :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.father_profession" name="father_profession"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">mother Name :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.mother_name" name="mother_name"></v-text-field>
                                            </v-col>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">mother phone :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.mother_phone" name="mother_phone"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">mother address :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.mother_address" name="mother_address"></v-text-field>
                                            </v-col>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">mother profession :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="parentObject.mother_profession" name="mother_profession"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="success"
                                    rounded
                                    class="pa-4"
                                    width="200"
                                    :disabled="isLoading"
                                    v-show="parentIsNotNull"
                                    @click="createParentInfos()"
                                >Create Parent Infos</v-btn>

                                <v-btn
                                    color="success"
                                    rounded
                                    class="pa-4"
                                    width="200"
                                    :disabled="isLoading"
                                    v-show="!parentIsNotNull"
                                    @click="updateParentInfos()"
                                >Update Parent Infos</v-btn>
                            </v-card-actions>
                        </v-card-text>
                        </v-card>
                        </v-tab-item>
                        <v-tab-item>
                        <v-card flat>
                        <v-card-text>
                          <v-list-item>
                              <v-img
                                  alt="Infinite connection"
                                  class="shrink mr-2"
                                  contain src="@/assets/img/kid.png"
                                  transition="scale-transition"
                                  max-height="100%"
                                  width="60"
                              />

                              <v-list-item-content>
                                  <v-list-item-title class="font-weight-bold">
                                      {{ kid.first_name }} {{ kid.last_name }}
                                  </v-list-item-title>
                              </v-list-item-content>
                          </v-list-item>
                          <v-list-item class="">
                              <v-list-item-content>
                                  <v-list-item-title>
                                      <v-row>
                                          <v-col cols="2" align="right">
                                              <v-subheader class="pt-7">Name :</v-subheader>
                                          </v-col>
                                          <v-col cols="4">
                                                <v-text-field focus v-model="schoolObject.name" name="name"></v-text-field>
                                          </v-col>
                                          <v-col cols="2" align="right">
                                              <v-subheader class="pt-7">Content :</v-subheader>
                                          </v-col>
                                          <v-col cols="4">
                                                <v-text-field focus v-model="schoolObject.content" name="content"></v-text-field>
                                          </v-col>
                                      </v-row>
                                  </v-list-item-title>
                              </v-list-item-content>
                          </v-list-item>
                          <v-list-item class="">
                              <v-list-item-content>
                                  <v-list-item-title>
                                      <v-row>
                                          <v-col cols="2" align="right">
                                              <v-subheader class="pt-7">Image :</v-subheader>
                                          </v-col>
                                          <v-col cols="10">
                                            <v-file-input
                                              accept=".png"
                                              label="Click here to select a .png file"
                                              outlined
                                              name="image"
                                              v-model="schoolObject.image"
                                            >
                                            </v-file-input>
                                          </v-col>
                                      </v-row>
                                  </v-list-item-title>
                              </v-list-item-content>
                          </v-list-item>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                  color="success"
                                  rounded
                                  class="pa-4"
                                  width="200"
                                  :disabled="isLoading"
                                  @click="updateSchoolInfos()"
                              >Update School Infos</v-btn>
                          </v-card-actions>
                        </v-card-text>
                        </v-card>
                        </v-tab-item>
                        <v-tab-item>
                        <v-card flat>
                        <v-card-text>
                            <v-list-item>
                                <v-img
                                    alt="Infinite connection"
                                    class="shrink mr-2"
                                    contain src="@/assets/img/kid.png"
                                    transition="scale-transition"
                                    max-height="100%"
                                    width="60"
                                />

                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-bold">
                                        {{ kid.first_name }} {{ kid.last_name }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Name :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="medicalObject.name" name="name"></v-text-field>
                                            </v-col>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Content :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="medicalObject.content" name="content"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Image :</v-subheader>
                                            </v-col>
                                            <v-col cols="10">
                                              <v-file-input
                                                accept=".png"
                                                label="Click here to select a .png file"
                                                outlined
                                                name="image"
                                                v-model="medicalObject.image"
                                              >
                                              </v-file-input>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="success"
                                    rounded
                                    class="pa-4"
                                    width="200"
                                    :disabled="isLoading"
                                    @click="updateMedicalInfos()"
                                >Update Medical Infos</v-btn>
                            </v-card-actions>
                        </v-card-text>
                        </v-card>
                        </v-tab-item>
                        <v-tab-item>
                        <v-card flat>
                        <v-card-text>
                            <v-list-item>
                                <v-img
                                    alt="Infinite connection"
                                    class="shrink mr-2"
                                    contain src="@/assets/img/kid.png"
                                    transition="scale-transition"
                                    max-height="100%"
                                    width="60"
                                />

                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-bold">
                                        {{ kid.first_name }} {{ kid.last_name }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Name :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="historyObject.name" name="name"></v-text-field>
                                            </v-col>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Content :</v-subheader>
                                            </v-col>
                                            <v-col cols="4">
                                                  <v-text-field focus v-model="historyObject.content" name="content"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-row>
                                            <v-col cols="2" align="right">
                                                <v-subheader class="pt-7">Image :</v-subheader>
                                            </v-col>
                                            <v-col cols="10">
                                                  <v-file-input
                                                    accept=".png"
                                                    label="Click here to select a .png file"
                                                    outlined
                                                    name="image"
                                                    v-model="historyObject.image"
                                                  >
                                                  </v-file-input>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="success"
                                    rounded
                                    class="pa-4"
                                    width="200"
                                    :disabled="isLoading"
                                    @click="updateHistoryInfos()"
                                >Update History Infos</v-btn>
                            </v-card-actions>
                        </v-card-text>
                        </v-card>
                        </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                </v-card>
            <!-- </v-dialog> -->
            <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
        </div>
      </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import ResponseData from "@/types/ResponseData";
import _ from 'lodash';
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
  name: "kid",

  data: () => ({
      ghost: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '' } as Kid,
      kid: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '' } as Kid,
      historyObject: { id: null, kid: null, name: '', image: '', content: '' } as History,
      history: { id: null, kid: null, name: '', image: '', content: '' } as History,
      medicalObject: { id: null, kid: null, name: '', image: '', content: '' } as Medical,
      medical: { id: null, kid: null, name: '', image: '', content: '' } as Medical,
      schoolObject: { id: null, kid: null, name: '', image: '', content: '' } as School,
      school: { id: null, kid: null, name: '', image: '', content: '' } as School,
      parentObject: { id: null, kid: null, father_name: '', father_phone: '', father_address: '', father_profession: '', mother_name: '', mother_phone: '', mother_address: '', mother_profession: '' } as Parent,
      parent: { id: null, kid: null, father_name: '', father_phone: '', father_address: '', father_profession: '', mother_name: '', mother_phone: '', mother_address: '', mother_profession: '' } as Parent,
      dialog: false,
      isLoading: false,
      edit: false,
      parentIsNotNull: true,
      tab: null,
      attrs: [],
      items: ["Personnal informations", "shopping", "videos", "images", "news"],
      genders: ["Female", "Male"],
      html: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
  }),

  mounted () {
      this.getKid()
      this.getParentInfos()
      this.getSchoolInfos()
      this.getMedicalInfos()
      this.getHistoryInfos()
      // this.resetHistoryObject()
      // this.resetMedicalObject()
      // this.resetSchoolObject()
      // this.resetParentObject()
  },

  methods: {
    async getParentInfos () {
        this.isLoading = true

        let id = this.$router.history.current.params.id
        await ParentDataService.getParentInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            if (!_.isEmpty(response.data)) this.parentIsNotNull = false
            this.parentObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid parent infos error', html: e });
        });
    },
    async createParentInfos () {
      this.isLoading = true
      let userId: any = localStorage.getItem('userId')
      let user_id = parseInt(userId, 10)
      let data = {
          kid: user_id, father_name: this.parentObject.father_name, father_phone: this.parentObject.father_phone, father_address: this.parentObject.father_address, father_profession: this.parentObject.father_profession,
          mother_name: this.parentObject.mother_name, mother_phone: this.parentObject.mother_phone, mother_address: this.parentObject.mother_address, mother_profession: this.parentObject.mother_profession
      };

      await ParentDataService.create(data)
      .then((response: ResponseData) => {
          this.isLoading = false
          this.getParentInfos()
          Swal.fire({ title: 'Parent infos created successfull', html: 'Your parent infos details have been successfully created.' });
      })
      .catch((e: Error) => {
          this.isLoading = false
          console.log(e);
          Swal.fire({title: 'Kid update error', html: e });
      });
    },
    async updateParentInfos () {
      this.isLoading = true
      let userId: any = localStorage.getItem('userId')
      let user_id = parseInt(userId, 10)
      let data = {
          kid: user_id, father_name: this.parentObject.father_name, father_phone: this.parentObject.father_phone, father_address: this.parentObject.father_address, father_profession: this.parentObject.father_profession,
          mother_name: this.parentObject.mother_name, mother_phone: this.parentObject.mother_phone, mother_address: this.parentObject.mother_address, mother_profession: this.parentObject.mother_profession
      };

      await ParentDataService.update(this.parentObject.id, data)
      .then((response: ResponseData) => {
          this.isLoading = false
          this.getParentInfos()
          Swal.fire({ title: 'Parent infos created successfull', html: 'Your parent infos details have been successfully created.' });
      })
      .catch((e: Error) => {
          this.isLoading = false
          console.log(e);
          Swal.fire({title: 'Kid update error', html: e });
      });
    },

    async getSchoolInfos () {
        this.isLoading = true

        let id = this.$router.history.current.params.id
        await SchoolDataService.getSchoolInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.schoolObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid school infos error', html: e });
        });
    },
    async createSchoolInfos () {
      this.isLoading = true
      let userId: any = localStorage.getItem('userId')
      let user_id = parseInt(userId, 10)
      let data = {
          kid: user_id, name: this.schoolObject.name, image: this.schoolObject.image, content: this.schoolObject.content
      };

      await SchoolDataService.create(data)
      .then((response: ResponseData) => {
          this.isLoading = false
          this.school = Object.assign({}, response.data)
          this.edit = false
          this.resetSchoolObject()
          Swal.fire({ title: 'School infos created successfull', html: 'Your school infos details have been successfully created.' });
      })
      .catch((e: Error) => {
          this.isLoading = false
          console.log(e);
          Swal.fire({title: 'create school infos error', html: e });
      });
    },
    async getMedicalInfos () {
        this.isLoading = true

        let id = this.$router.history.current.params.id
        await MedicalDataService.getMedicalInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.medicalObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid medical infos error', html: e });
        });
    },
    async getHistoryInfos () {
        this.isLoading = true

        let id = this.$router.history.current.params.id
        await HistoryDataService.getPlacementInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.historyObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid history infos error', html: e });
        });
    },

    resetGhost () {
        this.ghost = { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '' }
    },
    resetHistoryObject () {
        this.historyObject= { id: null, kid: null, name: '', image: '', content: '' }
    },
    resetMedicalObject () {
        this.medicalObject= { id: null, kid: null, name: '', image: '', content: '' }
    },
    resetSchoolObject () {
        this.schoolObject= { id: null, kid: null, name: '', image: '', content: '' }
    },
    resetParentObject () {
        this.parentObject= { id: null, kid: null, father_name: '', father_phone: '', father_address: '', father_profession: '', mother_name: '', mother_phone: '', mother_address: '', mother_profession: '' }
    },

    async getKid () {
        this.isLoading = true
        let id = this.$router.history.current.params.id
        await KidDataService.get(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.kid = Object.assign({}, response.data)
            localStorage.setItem('userId', this.kid.user_id)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid infos error', html: e });
        });
    },

    async updateKid () {
      this.isLoading = true
      let data = {
          first_name: this.kid.first_name, last_name: this.kid.last_name, email: this.kid.email,
          date_of_arrival: this.kid.date_of_arrival, birthdate: this.kid.birthdate,
          sex: this.kid.sex, age: this.kid.age, phone: this.kid.phone,
      };

      let id = this.$router.history.current.params.id
      await KidDataService.update(id, data)
      .then((response: ResponseData) => {
          this.isLoading = false
          this.kid = Object.assign({}, response.data)
          this.resetGhost()
          Swal.fire({ title: 'Kid update successfull', html: 'Your kid details have been successfully updated.' });
          this.$emit('updatedKid')
      })
      .catch((e: Error) => {
          this.isLoading = false
          console.log(e);
          Swal.fire({title: 'Kid update error', html: e });
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
