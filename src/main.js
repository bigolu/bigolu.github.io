import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/styles/global.scss';

new Vue({
  router,
  render: h => h(App),
}).$mount('#root');
