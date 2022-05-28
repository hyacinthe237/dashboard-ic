<template>
    <v-app>
        <AppBar />

        <v-content>
            <v-row style="height: 93.5vh" v-show="!isLoading">
                <v-col cols="6" md="6" sm="12" class="pb-10 pt-10 "  align-self="center">
                    <div class="card-login">
                    <h1 class="mb-10 text-center">Sign In</h1>
                        <v-form style="width: 400px; margin: auto" @submit.prevent="signIn()">
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
                                <a href="#" style="color: #15b715; text-decoration: none">Request new</a>
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
            <v-progress-circular :indeterminate="true" :color="'success'" v-show="isLoading"></v-progress-circular>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import env from '../../env';
import Vue from "vue";
import Swal from 'sweetalert2';
import AppBar from "../components/layouts/AppBar.vue";
import LoginDataService from "@/services/LoginDataService";
import Login from "@/types/Login";
import ResponseData from "@/types/ResponseData";

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
  components: {
    AppBar,
  },

  methods: {
    async signIn () {
        this.isLoading = true
        let data = {
            username: this.ghost.username,
            password: this.ghost.password
        };
        await LoginDataService.login(data)
        .then((response: ResponseData) => {
            this.isLoading = false
            localStorage.setItem(env.USER_NAME, JSON.stringify(response.data))
            localStorage.setItem(env.TOKEN, response.data.token)
            this.submitted = true;
            this.$router.push({ name: 'home' })
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
