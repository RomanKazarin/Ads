import Vue from 'vue'
import store from './store'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal' 
import router from './router/index'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify'

Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () { 
    fb.initializeApp(
      {
      apiKey: "AIzaSyBSVxX3XK8TuRwXZ7u8EjtRIKHxb9844KQ",
      authDomain: "project-ad-68648.firebaseapp.com",
      databaseURL: "https://project-ad-68648.firebaseio.com",
      projectId: "project-ad-68648",
      storageBucket: "project-ad-68648.appspot.com",
      messagingSenderId: "132815012324",
      appId: "1:132815012324:web:5d433391f751c0072207f1",
      measurementId: "G-JJE0G3985F"
    }
    )
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },
}).$mount('#app')
