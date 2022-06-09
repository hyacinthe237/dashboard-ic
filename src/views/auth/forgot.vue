<template>
    <v-app>
        <AppBar v-show="!isLoading" />

        <v-content>
            <v-row style="height: 93.5vh" v-show="!isLoading">
                <v-col cols="6" md="6" sm="12" class="pb-10 pt-10 "  align-self="center">
                    <div class="card-login">
                    <h1 class="mb-10 text-center">Enter your email</h1>
                        <v-form style="width: 400px; margin: auto" @submit.prevent>
                            <v-text-field
                                label="Email"
                                placeholder="Enter your email"
                                filled rounded dense
                                name="email"
                                v-model="ghost.email"
                            ></v-text-field>

                            <v-btn
                                color="success"
                                rounded class="pa-6"
                                width="100%" @click="send()"
                            > Send </v-btn>

                            <v-row align="text-center mb-7 mt-2 ml-2">
                                <span class="ml-5 pt-2" style="font-size: 13px">You have an account ?
                                <a @click="signin()" class="pointer" style="color: #15b715; text-decoration: none">Connect here</a>
                                </span>
                            </v-row>
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
import ResponseData from "@/types/ResponseData";
import http from "@/http-common";

export default Vue.extend({
  name: "Login",

  data: () => ({
      ghost: {
          email: '',
      },
      submitted: false,
      isLoading: false
  }),

  methods: {
    signin () { this.$router.push({ name: 'login' }) },
    async send () {
        this.isLoading = true
        let data = { email: this.ghost.email };
        await LoginDataService.forgot(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.submitted = true;
            Swal.fire({ title: 'Password forgot response', html: 'You receive an email, check it please' });
        })
        .catch((e: any) => {
            this.isLoading = false
            console.log(e)
            const message = e.response.data.message || e.response.data.msg || e.response.data
            Swal.fire({ title: 'Password forgot error', html: message })
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
