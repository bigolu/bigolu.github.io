import Vue from 'vue';
import Router from 'vue-router';
import About from '@/views/About.vue';
import Code from '@/views/Code.vue';
import Data from '@/scripts/data.js';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About,
      props: {data: Data.about},
    },
    {
      path: '/code',
      name: 'Code',
      component: Code,
    },
  ],
});
