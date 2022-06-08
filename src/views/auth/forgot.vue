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
    async send () {
        this.isLoading = true
        let data = { email: this.ghost.email };
        await LoginDataService.forgot(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            this.submitted = true;
            Swal.fire({ title: 'Password forgot response', html: 'You receive an email, check it please' });
        })
        .catch((e: Error) => {
            this.isLoading = false
            console.log(e);
            Swal.fire({ title: 'Login error', html: e });
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
