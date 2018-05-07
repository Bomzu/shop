<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="getStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="(head,index) in tableHeads" :key="index" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="(item, index) in tableData" :key="item.period" :class="{even:index %2 !== 0}">
          <td v-for="(head, index) in tableHeads" :key="index">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable indent */

import VSelection from '@/components/base/selection'
import VDatePicker from '@/components/datepicker'
import _ from 'lodash'
export default {
  components: {
    VSelection,
    VDatePicker
  },
  data () {
    return {
      count: 0,
      query: '',
      productId: 0,
      startDate: '',
      endDate: '',
      products: [
        {
          label: '数据统计',
          key: 0
        },
        {
          label: '数据预测',
          key: 1
        },
        {
          label: '流量分析',
          key: 2
        },
        {
          label: '广告发布',
          key: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      currentOrder: 'asc'
      // tableData: []
    }
  },
  computed: {
    tableData () {
        return this.$store.getters.getOrderList
    }
  },
  watch: {
    query () {
      this.$store.commit('updateParams', {
        key: 'query',
        val: this.query
      })
      this.$store.dispatch('fetchOrderList')
    }
  },
  methods: {
    productChange (obj) { // 商品类型
      this.subActionsFun('productId', obj.key)
    },
    getStartDate (date) { // 开始日期
      this.subActionsFun('startDate', date)
    },
    getEndDate (date) { // 结束日期
      this.subActionsFun('endDate', date)
    },
    subActionsFun (key, val) { // 请求获取商品列表
      this.$store.commit('updateParams', {
        key: key,
        val: val
      })
      this.$store.dispatch('fetchOrderList')
    },
    changeOrderType (headItem) { // 排序
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      } else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.$store.commit('updateOrderList', _.orderBy(this.$store.getters.getOrderList, headItem.key, this.currentOrder))
    }
  },
  mounted () {
    // 获取商品列表
    this.$store.dispatch('fetchOrderList')
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #363636;
  color: #fff;
  border: 1px solid #363636;
  cursor: pointer;
}
.order-list-table th.active {
  background: #6c0707;
}
.order-list-table .even {
  background: #f1f0f0;
}
</style>
