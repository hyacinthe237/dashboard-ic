<template>
    <v-app>
        <AppBar v-show="!isLoading" />

        <v-content>
            <v-row style="height: 93.5vh" v-show="!isLoading">
                <v-col cols="6" md="6" sm="12" class="pb-10 pt-10 "  align-self="center">
                    <div class="card-login">
                    <h1 class="mb-10 text-center">Sign In</h1>
                        <v-form style="width: 400px; margin: auto" @submit.prevent>
                            <v-text-field
                                label="Login"
                                placeholder="Enter your login"
                                filled rounded dense
                                name="username"
                                v-model="ghost.username"
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                placeholder="Enter your password"
                                filled rounded dense
                                name="password"
                                v-model="ghost.password"
                                type="password"
                            ></v-text-field>

                            <v-row align="center mb-7 mt-2 ml-2">
                                <v-checkbox
                                    hide-details
                                    class="shrink mr-2 mt-0"
                                    label="remember me"
                                ></v-checkbox>
                                <span class="ml-5 pt-2" style="font-size: 13px">Forgot password ?
                                <a @click="forgot()" class="pointer" style="color: #15b715; text-decoration: none">Request new</a>
                                </span>
                            </v-row>

                            <v-btn
                                color="success"
                                rounded class="pa-6"
                                width="100%" @click="signIn()"
                            > Sign In </v-btn>
                        </v-form>
                    </div>
                </v-col>
                <v-col cols="6" md="6" sm="12">
                    <img src="@/assets/img/fam.png" class="login-img-right" alt="" />
                </v-col>
            </v-row>
            <div class="text-center">
                <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
            </div>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import env from '../../../env';
import Vue from "vue";
import Swal from 'sweetalert2';
import LoginDataService from "@/services/LoginDataService";
import Login from "@/types/Login";
import ResponseData from "@/types/ResponseData";
import http from "@/http-common";

export default Vue.extend({
  name: "Login",

  data: () => ({
      ghost: {
          username: '',
          password: ''
      } as Login,
      submitted: false,
      isLoading: false
  }),

  methods: {
    forgot () { this.$router.push({ name: 'forgot'}) },
    async signIn () {
        this.isLoading = true
        let data = {
            username: this.ghost.username,
            password: this.ghost.password
        };
        await LoginDataService.login(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            http.defaults.headers.common['Authorization'] = 'Token ' + response.data.token
            localStorage.setItem(env.USER_NAME, JSON.stringify(response.data))
            localStorage.setItem(env.TOKEN, response.data.token)
            this.submitted = true;
            if(response.data.is_superuser) {
              this.$router.push({ name: 'home' })
            }

            if(response.data.is_agency_admin) {
              this.$router.push({ name: 'manage-kids' })
            }

        })
        .catch((e: any) => {
            this.isLoading = false
            console.log(e)
            const message = e.response.data.message || e.response.data.msg || e.response.data
            Swal.fire({ title: 'Login error', html: message })
        });
    }
  }
});
</script>

<style scoped>
.login-img-right {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #eee;
}

.remember {
  font-size: 12px !important;
}
</style>
