import Vuex from 'vuex'
import Vue from 'vue'
import orderList from '@/store/modules/orderlist'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orderList
  }
})
