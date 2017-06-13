import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Menu from '../components/menu/menu.vue';
import Reserve from '../components/reserve/reserve.vue';
import Queue from '../components/queue/queue.vue';
import Order from '../components/order/order.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: NaN
    },
     {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/reserve',
      name: 'Reserve',
      component: Reserve
    },
     {
      path: '/queue',
      name: 'Queue',
      component: Queue
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
});
