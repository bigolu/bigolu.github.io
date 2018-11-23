import Vue from 'vue';
import Router from 'vue-router';
import About from '@/views/About.vue';
import Code from '@/views/Code.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About,
    },
    {
      path: '/code',
      name: 'Code',
      component: Code,
    },
  ],
});
