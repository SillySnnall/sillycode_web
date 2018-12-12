import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router'
import iView from 'iview';
import router from './router'
import App from './App.vue'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'



Vue.use(BootstrapVue);
Vue.use(iView);
Vue.use(VueRouter);
Vue.use(preview);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
