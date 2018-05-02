// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import ReSource from 'vue-resource'
import Layout from '@/components/layout'
import IndexCen from '@/page/index'
import Detail from '@/page/detail'
import DetaliAnalysis from '@/page/detail/analysis'
import DetaliForecast from '@/page/detail/forecast'
import DetaliCount from '@/page/detail/count'
import DetaliPublish from '@/page/detail/publish'
import OrderList from '@/page/orderlist'
import NotFoundInfo from '@/page/notfound'
import store from '@/store'
Vue.use(VueRouter)
Vue.use(ReSource)
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'notPage',
      component: NotFoundInfo
    },
    {
      path: '/',
      name: 'index',
      component: IndexCen
    },
    {
      path: '/orderlist',
      name: 'orderPage',
      component: OrderList
    },
    {
      path: '/detail',
      component: Detail,
      name: 'detailPage',
      redirect: '/detail/analysis',
      children: [
        {
          path: 'analysis',
          name: 'analysisPage',
          component: DetaliAnalysis
        },
        {
          path: 'forecast',
          name: 'forecastPage',
          component: DetaliForecast
        },
        {
          path: 'count',
          name: 'countPage',
          component: DetaliCount
        },
        {
          path: 'publish',
          name: 'publish',
          component: DetaliPublish
        }
      ]
    }
  ]
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ReSource,
  store,
  components: { Layout },
  template: '<Layout/>'
})
