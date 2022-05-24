
import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
  iconfont: 'fa'
});

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#232b3b',
          secondary: '#28a7e3',
          success: '#15b715',
          white: '#fff',
          light: '#ebf1fe',
          transparent: 'transparent'
        },
      },
    },
  })

export default new Vuetify({
});
