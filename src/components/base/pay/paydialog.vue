<template>
  <div>
    <table class="buy-dialog-table">
      <tr>
        <th>购买数量</th>
        <th>产品类型</th>
        <th>有效时间</th>
        <th>产品版本</th>
        <th>总价</th>
      </tr>
      <tr>
        <td>{{ buyNum }}</td>
        <td>{{ buyType.label }}</td>
        <td>{{ buyPeriod.label }}</td>
        <td>
          <span v-for="(item,index) in buyVersions" :key="index">{{ item.label + ' ' }}</span>
        </td>
        <td>{{ buyPrice }}</td>
      </tr>
    </table>
    <h3 class="buy-dialog-title">请选择银行</h3>
    <v-bank @on-choose="chooseBank($event)"></v-bank>
    <div v-if="!orderId" class="button buy-dialog-btn" @click="confirmBuy" :class="{nopay: !isChoose}">
      确认购买
    </div>
    <a v-if="orderId" class="button" @click="goToOrder">查看订单</a>
    <pay-dialog :is-show="successPayDialog" @on-clons="clonePayDailog">
      <success-order slot="contents"></success-order>
    </pay-dialog>
    <pay-dialog :is-show="failPayDialog" @on-clons="clonePayDailog">
      <fail-order slot="contents"></fail-order>
    </pay-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import VBank from '@/components/base/pay/bank'
import PayDialog from '@/components/base/dialog'
import successOrder from '@/components/base/pay/successorder'
import failOrder from '@/components/base/pay/failorder'
export default {
  components: {
    VBank,
    PayDialog,
    successOrder,
    failOrder
  },
  props: {
    buyNum: {
      type: Number
    },
    buyPrice: {
      type: Number
    },
    buyType: {
      type: Object
    },
    buyVersions: {
      type: Array
    },
    buyPeriod: {
      type: Object
    }
  },
  data () {
    return {
      bankId: null, // 银行id
      orderId: null, // 订单号
      isChoose: false,
      successPayDialog: false,
      failPayDialog: false
    }
  },
  methods: {
    chooseBank (obj) {
      this.bankId = obj.bankVlu.id
      this.isChoose = obj.status
    },
    confirmBuy () {
      if (this.isChoose) {
        let buyVersionsArray = _.map(this.buyVersions, (item) => {
          return item.key
        })
        if (this.orderId) {
          alert('已下过订单')
          return
        }
        let reqParams = {
          buyNumber: this.buyNum,
          buyType: this.buyType.key,
          price: this.buyPrice.key,
          version: buyVersionsArray.join(','),
          period: this.buyPeriod.key
        }
        this.$http.post('/api/createOrder', reqParams).then((res) => {
          this.orderId = res.data.orderId
          this.successPayDialog = true
        }, (err) => {
          this.failPayDialog = true
          console.log(err)
        })
      }
    },
    clonePayDailog () {
      this.failPayDialog = false
      this.successPayDialog = false
    },
    goToOrder () {
      this.clonePayDailog()
      this.$router.push(
        {
          path: '/orderlist',
          query: {
            'id': this.orderId
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
  }
  .buy-dialog-btn {
    margin-top: 20px;
  }
  .nopay {
    background: #bbbbbb;
  }
  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }
  .buy-dialog-table td,
  .buy-dialog-table th{
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }
  .buy-dialog-table th {
    background: #363636;
    color: #fff;
    border: 1px solid #363636;
  }
</style>
