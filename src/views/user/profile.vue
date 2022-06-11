<template>
  <v-app>
    <AppBarLogged title="Monitoring / Profile" v-show="!isLoading" />

    <navigation-app-drawer v-show="!isLoading"/>
    <v-content>
      <v-form style="width: 300px; margin: auto; margin-top: 40px;" @submit.prevent v-show="!isLoading">
        <h2 class="mb-10 text-center">User Profile</h2>
        <label for="email">Email</label>
        <v-text-field
          label="Email"
          solo
          name="email"
          rounded
          outlined
          dense
          elevation="0"
          v-model="ghost.email"
        ></v-text-field>

        <label for="username">Username</label>
        <v-text-field
          label="Username"
          name="username"
          solo
          rounded
          outlined
          dense
          elevation="0"
          v-model="ghost.username"
        ></v-text-field>

        <label for="phone">Phone</label>
        <v-text-field
          label="Phone"
          name="phone"
          solo
          rounded
          outlined
          dense
          elevation="0"
          v-model="ghost.phone"
        ></v-text-field>

        <label for="image">Click here to select an image file</label>
        <v-file-input
          accept="image/*"
          label="Click here to select an image file"
          outlined
          name="image"
          @change="onFileChange"
          v-model="ghost.image"
        ></v-file-input>

        <v-img
            :src="image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            v-if="image != null"
        >
        </v-img>

        <v-btn color="success" rounded class="pa-4" width="100%" @click="update()" style="margin-top:20px;">
          Update
        </v-btn>
      </v-form>
      <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from 'sweetalert2';
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";
import User from "@/types/User";

export default Vue.extend({
    name: "UserProfile",
    data: () => ({
      ghost: { id: null, email: '', username: '', password: '', phone: '', is_kid: false, is_family: false, is_agency_admin: false, is_superuser: false } as User,
      dialog: false,
      isLoading: false,
      image: null
    }),

    mounted () {
        this.$nextTick(() => {
          this.getUser()
        })
    },

    computed: {
        auth (): any {
          let thau: any = localStorage.getItem('infinite_user')
          return JSON.parse(thau)
        },
    },

    methods: {
        async getUser () {
            this.isLoading = true
            let id = this.auth.user_id
            await UserDataService.get(id)
            .then((response: ResponseData) => {
                this.isLoading = false
                this.ghost = Object.assign({}, response.data)
                this.image = response.data.image
            })
            .catch((e: any) => {
                this.isLoading = false
                const message = e.response.data.message
                Swal.fire({ title: 'Get user connect error', html: message });
            });
        },

        goBack () {
            this.$router.go(-1)
        },

        onFileChange (file: any) {
            this.ghost.image = file
        },

        resetGhost () {
            this.ghost = { id: null, email: '', username: '', password: '', phone: '', image: '', is_kid: false, is_family: false, is_agency_admin: false, is_superuser: false }
        },

        async update () {
            this.isLoading = true
            let data = new FormData();
            data.append("email", this.ghost.email)
            data.append("username", this.ghost.username)
            data.append("phone", this.ghost.phone)
            data.append("image", this.ghost.image)
            // data.append("is_kid", this.ghost.is_kid)
            // data.append("is_family", this.ghost.is_family)
            // data.append("is_agency_admin", this.ghost.is_agency_admin)
            // data.append("is_superuser", this.ghost.is_superuser)

            let id = this.auth.user_id
            await UserDataService.update(id, data)
            .then((response: ResponseData) => {
                Swal.fire({ title: 'Profile update successfull', html: 'Your profile details have been successfully updated.' });
                this.ghost = Object.assign({}, response.data)
                localStorage.setItem('infinite_user', JSON.stringify(response.data))
                this.image = response.data.image
                this.isLoading = false
            })
            .catch((e: any) => {
                this.isLoading = false
                const message = e.response.data.message
                Swal.fire({ title: 'User connect update error', html: message });
            });
        },
    }
});
</script>
