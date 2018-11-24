import Vue from 'vue';
import App from './App.vue';
import router from '@/scripts/router';
import '@/styles/global.scss';

new Vue({
  router,
  render: h => <App />,
}).$mount('#root');
