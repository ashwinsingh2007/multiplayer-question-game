import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ChannelLanding from '@/components/ChannelLanding'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/channel/:id',
      name: 'ChannelLanding',
      props: true,
      component: ChannelLanding,
    },
  ],
  mode: 'history'
})
