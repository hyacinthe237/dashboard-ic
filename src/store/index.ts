import Vue from 'vue'
import Vuex from 'vuex'
import KidDataService from "@/services/KidDataService";
import ResponseData from "@/types/ResponseData";

Vue.use(Vuex)

const kidsModule = {
    state: () => ({
        kid: {},
        kids: []
    }),
    mutations: {
        SET_KID (state: any, payload: any) { state.kid = payload },
        ADD_KID (state: any, payload: any) { state.kids.push(payload) },
        SET_KIDS (state: any, payload: any) { state.kids = payload }
    },
    actions: {
        setKid(context: any, payload: any) {
            context.commit('SET_KID', payload)
        },

        async getKids (context: any) {
            const response = await KidDataService.getAll()
                .catch(error => console.log(error))

            context.commit('SET_KIDS', response.data)
        },

        async getKid (context: any, id: any) {
            const response = await KidDataService.get(id)
                .catch(error => console.log(error))

            context.commit('SET_KID', response.data)
        },
    },
    getters: {

    }
}

export default new Vuex.Store({
  state: {},

  getters: {},

  mutations: {},

  actions: {},

  modules: {
      kids: kidsModule,
  }
})
