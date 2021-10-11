import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './main.css';
import router from './router';


Vue.use(VueRouter);

Vue.config.productionTip = false;

export default new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
