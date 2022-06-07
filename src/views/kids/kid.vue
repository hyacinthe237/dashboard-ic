<template>
    <v-app>
      <AppBarLogged title="Monitoring / Alert" v-show="!isLoading" />

      <navigation-app-drawer v-show="!isLoading"/>
      <v-content>
        <div class="main-content">
                <v-card class="rounded-lg">
                    <v-toolbar color="white" elevation="0">
                        <v-spacer></v-spacer>
                        <template v-slot:extension>
                            <v-tabs v-model="tab" active-class="bordered" align-with-title>
                                <v-tabs-slider color="secondary"></v-tabs-slider>

                                <v-tab :disabled="isLoading"> Personnal informations </v-tab>
                                <v-tab :disabled="isLoading"> Parents informations </v-tab>
                                <v-tab :disabled="isLoading"> School informations </v-tab>
                                <v-tab :disabled="isLoading"> Medical informations </v-tab>
                                <v-tab :disabled="isLoading"> Placement history </v-tab>
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
                                                <v-list-item-title>
                                                  <v-row>
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
                                                <v-list-item-title>
                                                    <v-row>
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
                                                <v-list-item-title>
                                                    <v-row>
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
                                                <v-list-item-title>
                                                      <v-row>
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
                                    <v-card-text v-show="!isLoading">
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
                                    <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text v-show="!isLoading">
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
                                      <v-list-item class="mt-40">
                                          <v-list-item-content>
                                              <v-list-item-title>
                                                  <v-row>
                                                      <v-col cols="4" align="right">
                                                          <v-subheader class="pt-7">Upload school information :</v-subheader>
                                                      </v-col>
                                                      <v-col cols="8">
                                                        <v-file-input
                                                          accept=".pdf"
                                                          label="Click here to select a .pdf file"
                                                          outlined
                                                          name="image"
                                                          @change="onSchoolFileChange"
                                                        ></v-file-input>
                                                      </v-col>
                                                  </v-row>
                                              </v-list-item-title>
                                          </v-list-item-content>
                                      </v-list-item>
                                      <v-simple-table >
                                          <template v-slot:default>
                                              <thead>
                                                  <tr>
                                                    <th class="text-left">Name</th>
                                                    <th class="text-left">Content</th>
                                                    <th class="text-left">Created at</th>
                                                    <th class="text-left"></th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr
                                                      v-for="item in school_files"
                                                      :key="item.id"
                                                  >
                                                      <td>{{ item.name }}</td>
                                                      <td>{{ item.content }}</td>
                                                      <td>{{ item.created_at }}</td>
                                                      <td>
                                                        <a :href="item.image" target="_blank" class="pointer">More...</a>
                                                        <a @click="confirmDeleteSchoolFile(item.id)" target="_blank" class="pointer red">Delete</a>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </template>
                                      </v-simple-table>
                                    </v-card-text>
                                    <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat v-show="!isLoading">
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
                                        <v-list-item class="mt-40">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <v-row>
                                                            <v-col cols="4" align="right">
                                                                <v-subheader class="pt-7">Upload medical information :</v-subheader>
                                                            </v-col>
                                                            <v-col cols="8">
                                                              <v-file-input
                                                                accept=".pdf"
                                                                label="Click here to select a .pdf file"
                                                                outlined
                                                                name="image"
                                                                @change="onMedicalFileChange"
                                                              >
                                                              </v-file-input>
                                                            </v-col>
                                                        <!-- </v-col> -->
                                                    </v-row>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-card-text>
                                    <v-simple-table >
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                  <th class="text-left">Name</th>
                                                  <th class="text-left">Content</th>
                                                  <th class="text-left">Created at</th>
                                                  <th class="text-left"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="item in medical_files"
                                                    :key="item.id"
                                                >
                                                    <td>{{ item.name }}</td>
                                                    <td>{{ item.content }}</td>
                                                    <td>{{ item.created_at }}</td>
                                                    <td>
                                                      <a :href="item.image" target="_blank" class="pointer">More...</a>
                                                      <a @click="confirmDeleteMedicalFile(item.id)" target="_blank" class="pointer red">Delete</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                                <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat v-show="!isLoading">
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
                                        <v-list-item class="mt-40">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <v-row>
                                                          <v-col cols="4" align="right">
                                                              <v-subheader class="pt-7">Upload placement information :</v-subheader>
                                                          </v-col>
                                                          <v-col cols="8">
                                                            <v-file-input
                                                              accept=".pdf"
                                                              label="Click here to select a .pdf file"
                                                              outlined
                                                              name="image"
                                                              @change="onHistoryFileChange"
                                                            >
                                                            </v-file-input>
                                                          </v-col>
                                                    </v-row>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-card-text>
                                    <v-simple-table >
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                  <th class="text-left">Name</th>
                                                  <th class="text-left">Content</th>
                                                  <th class="text-left">Created at</th>
                                                  <th class="text-left"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="item in history_files"
                                                    :key="item.id"
                                                >
                                                    <td>{{ item.name }}</td>
                                                    <td>{{ item.content }}</td>
                                                    <td>{{ item.created_at }}</td>
                                                    <td>
                                                      <a :href="item.image" target="_blank" class="pointer">More...</a>
                                                      <a @click="confirmDeleteHistoryFile(item.id)" target="_blank" class="pointer red">Delete</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                                <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                </v-card>
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
      ghost: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '', user_id: null } as Kid,
      kid: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '', user_id: null } as Kid,
      historyObject: { id: null, kid: null, name: '', image: '', content: '' } as History,
      medicalObject: { id: null, kid: null, name: '', image: '', content: '' } as Medical,
      schoolObject: { id: null, kid: null, name: '', image: '', content: '' } as School,
      parentObject: { id: null, kid: null, father_name: '', father_phone: '', father_address: '', father_profession: '', mother_name: '', mother_phone: '', mother_address: '', mother_profession: '' } as Parent,
      dialog: false,
      isLoading: false,
      edit: false,
      selectedFile: {},
      parentIsNotNull: true,
      tab: null,
      school_files: [],
      history_files: [],
      medical_files: [],
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
  },

  methods: {
    async onParentFileChange (file: any) {
        if(!_.isEmpty(file)) {
          this.isLoading = true
          let id = this.$route.params.id
          let data = new FormData()
          data.append('parent_doc', file)
          await ParentDataService.uploadDocParent(id, data)
          .then((response: ResponseData) => {
              this.isLoading = false
              console.log('Parent doc uploaded', response.data)
              Swal.fire({ title: 'Parent doc uploaded successfull', html: 'Your Parent document have been successfully uploaded.' });
              this.getParentInfos()
          })
          .catch((e: Error) => {
              this.isLoading = false
              console.log(e);
              Swal.fire({ title: 'Upload Parent document error', html: e });
          });
        }
    },

    async onSchoolFileChange (file: any) {
      if(file != null) {
          this.isLoading = true
          let id = this.$route.params.id
          let data = new FormData()
          data.append('school_doc', file)
          await SchoolDataService.uploadDocSchool(id, data)
          .then((response: ResponseData) => {
              this.isLoading = false
              console.log('School doc uploaded', response.data)
              Swal.fire({ title: 'School doc uploaded successfull', html: 'Your school document have been successfully uploaded.' });
              this.getSchoolInfos()
          })
          .catch((e: Error) => {
              this.isLoading = false
              console.log(e);
              Swal.fire({ title: 'Upload school document error', html: e });
          });
      }
    },

    async onHistoryFileChange (file: any) {
        if (file != null) {
            this.isLoading = true
            let id = this.$route.params.id
            let data = new FormData()
            data.append('placement_doc', file)

            await HistoryDataService.uploadDocPlacement(id, data)
            .then((response: ResponseData) => {
                this.isLoading = false
                console.log('History doc uploaded', response.data)
                Swal.fire({ title: 'History doc uploaded successfull', html: 'Your history document have been successfully uploaded.' });
                this.getHistoryInfos()
            })
            .catch((e: Error) => {
                this.isLoading = false
                console.log(e);
                Swal.fire({ title: 'Upload history document error', html: e });
            });
        }
    },

    async onMedicalFileChange (file: any) {
        if (file != null) {
            this.isLoading = true
            let id = this.$route.params.id
            let data = new FormData()
            data.append('medical_doc', file)

            await MedicalDataService.uploadDocMedical(id, data)
            .then((response: ResponseData) => {
                this.isLoading = false
                console.log('Medical doc uploaded', response.data)
                Swal.fire({ title: 'Medical doc uploaded successfull', html: 'Your medical document have been successfully uploaded.' });
                this.getMedicalInfos()
            })
            .catch((e: Error) => {
                this.isLoading = false
                console.log(e);
                Swal.fire({ title: 'Upload medical document error', html: e });
            });
        }
    },

    async getParentInfos () {
        this.isLoading = true

        let id = this.$route.params.id
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
        let id = this.$route.params.id
        await SchoolDataService.getSchoolInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.school_files = response.data
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid school infos error', html: e });
        });
    },

    async getMedicalInfos () {
        this.isLoading = true

        let id = this.$route.params.id
        await MedicalDataService.getMedicalInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.medical_files = response.data
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid medical infos error', html: e });
        });
    },

    async getHistoryInfos () {
        this.isLoading = true

        let id = this.$route.params.id
        await HistoryDataService.getPlacementInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.history_files = response.data
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Get Kid history infos error', html: e });
        });
    },

    resetGhost () {
        this.ghost = { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '', user_id: null }
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
        let id = this.$route.params.id
        await KidDataService.get(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.kid = Object.assign({}, response.data)
            localStorage.setItem('userId', response.data.user_id)
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

      let id = this.$route.params.id
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

    confirmDeleteHistoryFile (id: any) {
        Swal.fire({
            title: 'Are you sure ?',
            html: "Are you sure you want to delete the selected file ?",
        }).then((result) => {
            if (result.value) {
                this.deleteHistoryFile(id)
            }
        })
    },

    async deleteHistoryFile (id: any) {
        this.isLoading = true
        await HistoryDataService.delete(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            Swal.fire({ title: 'History file delete successfull', html: 'Your history file have been successfully deleted.' })
            this.getHistoryInfos()
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'History file delete error', html: e });
        });
    },

    confirmDeleteSchoolFile (id: any) {
        Swal.fire({
            title: 'Are you sure ?',
            html: "Are you sure you want to delete the selected file ?",
        }).then((result) => {
            if (result.value) {
                this.deleteSchoolFile(id)
            }
        })
    },

    async deleteSchoolFile (id: any) {
        this.isLoading = true
        await SchoolDataService.delete(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            Swal.fire({ title: 'School file delete successfull', html: 'Your school file have been successfully deleted.' })
            this.getSchoolInfos()
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'School file delete error', html: e });
        });
    },

    confirmDeleteMedicalFile (id: any) {
        Swal.fire({
            title: 'Are you sure ?',
            html: "Are you sure you want to delete the selected file ?",
        }).then((result) => {
            if (result.value) {
                this.deleteMedicalFile(id)
            }
        })
    },

    async deleteMedicalFile (id: any) {
        this.isLoading = true
        await MedicalDataService.delete(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            Swal.fire({ title: 'Medical file delete successfull', html: 'Your medical file have been successfully deleted.' })
            this.getMedicalInfos()
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Medical file delete error', html: e });
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
