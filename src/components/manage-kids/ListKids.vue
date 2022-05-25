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
                    <icon-close @click.native="dialog = false" class="pointer"  :disabled="isLoading"/>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-container>
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
                              :value="g"
                          ></v-radio>
                      </v-radio-group>

                      <v-btn color="success" rounded class="pa-4" width="100%" @click="CreateKid()">
                      Create</v-btn>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
        </v-dialog>

    <!-- Modal off more informations -->
    <v-dialog v-model="edit" width="1100">
        <v-card class="rounded-lg">
            <v-toolbar color="white" elevation="0">
                <v-spacer></v-spacer>
                <v-toolbar-items class="pa-4">
                    <icon-close @click.native="edit = false" class="pointer" :disabled="isLoading"/>
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
                            @click="createParentInfos()"
                        >Create Parent Infos</v-btn>
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
import * as swal from 'sweetalert2';
import IconClose from "../icons/IconClose.vue";
import IconEdit from "../icons/IconEdit.vue";
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
      ghost: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '' } as Kid,
      kid: { id: null, first_name: '', last_name: '', email: '', date_of_arrival: new Date(), birthdate: new Date(), sex: '', age: null, phone: '' } as Kid,
      historyObject: { id: null, kid: null, name: '', image: '', content: '' } as History,
      medicalObject: { id: null, kid: null, name: '', image: '', content: '' } as Medical,
      schoolObject: { id: null, kid: null, name: '', image: '', content: '' } as School,
      parentObject: { id: null, kid: null, father_name: '', father_phone: '', father_address: '', father_profession: '', mother_name: '', mother_phone: '', mother_address: '', mother_profession: '' } as Parent,
      dialog: false,
      isLoading: false,
      edit: false,
      tab: null,
      attrs: [],
      items: ["Personnal informations", "shopping", "videos", "images", "news"],
      genders: ["Female", "Male"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
  }),

  components: {
    KidItem,
    IconClose,
    IconEdit,
  },

  mounted () {
      this.resetGhost()
      this.resetHistoryObject()
      this.resetMedicalObject()
      this.resetSchoolObject()
      this.resetParentObject()
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
            swal.fire({ type: 'success', title: 'Kid create successfull', text: 'Your kid details have been successfully created.' });
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            swal.fire({ type: 'error', title: 'Kid create error', text: e });
        });
    },
    async getParentInfos () {
        this.isLoading = true

        let id = localStorage.getItem('kidId')
        await ParentDataService.getParentInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.parentObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            swal.fire({ type: 'error', title: 'Get Kid parent infos error', text: e });
        });
    },
    async getSchoolInfos () {
        this.isLoading = true

        let id = localStorage.getItem('kidId')
        await SchoolDataService.getSchoolInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.schoolObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            swal.fire({ type: 'error', title: 'Get Kid school infos error', text: e });
        });
    },
    async getMedicalInfos () {
        this.isLoading = true

        let id = localStorage.getItem('kidId')
        await MedicalDataService.getMedicalInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.medicalObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            swal.fire({ type: 'error', title: 'Get Kid medical infos error', text: e });
        });
    },
    async getHistoryInfos () {
        this.isLoading = true

        let id = localStorage.getItem('kidId')
        await HistoryDataService.getPlacementInfos(id)
        .then((response: ResponseData) => {
            this.isLoading = false
            console.log(response.data);
            this.historyObject = Object.assign({}, response.data)
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            swal.fire({ type: 'error', title: 'Get Kid history infos error', text: e });
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

    async openItem (kid: any) {
        console.log('OpenItem ==> ', kid)
        this.isLoading = true
        await KidDataService.get(kid.id)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.kid = Object.assign({}, response.data)
            this.getParentInfos()
            this.getHistoryInfos()
            this.getSchoolInfos()
            this.getMedicalInfos()
            localStorage.setItem('kidId', response.data.id)
            this.edit = true
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            swal.fire({ type: 'error', title: 'Get Kid infos error', text: e });
        });
    },

    async createParentInfos () {
      this.isLoading = true
      let id = localStorage.getItem('kidId')
      let data = {
          kid: id, father_name: this.parentObject.father_name, father_phone: this.parentObject.father_phone, father_address: this.parentObject.father_address, father_profession: this.parentObject.father_profession,
          mother_name: this.parentObject.mother_name, mother_phone: this.parentObject.mother_phone, mother_address: this.parentObject.mother_address, mother_profession: this.parentObject.mother_profession
      };

      await ParentDataService.create(data)
      .then((response: ResponseData) => {
          this.isLoading = false
          console.log(response.data);
          this.kid = Object.assign({}, response.data)
          this.edit = false
          this.resetGhost()
          swal.fire({ type: 'success', title: 'Parent infos created successfull', text: 'Your parent infos details have been successfully created.' });
      })
      .catch((e: Error) => {
          this.isLoading = false
          console.log(e);
          swal.fire({ type: 'error', title: 'Kid update error', text: e });
      });
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
          swal.fire({ type: 'success', title: 'Kid update successfull', text: 'Your kid details have been successfully updated.' });
          this.$emit('added')
      })
      .catch((e: Error) => {
          this.isLoading = false
          console.log(e);
          swal.fire({ type: 'error', title: 'Kid update error', text: e });
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
