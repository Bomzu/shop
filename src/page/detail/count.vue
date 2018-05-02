<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>数据预测</h2>
      <p>未来，大数据会变得越来越重要，其核心应用预测也会成为互联网行业以及产业变革的重要力量，我们很有必要对数据预测及其分析方法进行全面且深入的了解。在这一点上，《大数据预测》是本很好的读物，适合大数据所有相关行业的人阅读。</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量：
        </div>
        <div class="sales-board-line-right">
          <v-counter :max="100" @on-change="onParamChange('buyNum',$event)"></v-counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          媒介：
        </div>
        <div class="sales-board-line-right">
          <v-multiply :multiply-list="versionList" @on-change="onParamChange('versions', $event)"></v-multiply>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间：
        </div>
        <div class="sales-board-line-right">
          一年
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价：
        </div>
        <div class="sales-board-line-right">
          {{ price }} 元
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">&nbsp;</div>
        <div class="sales-board-line-right">
          <div class="button" @click="showPayDailog">
            立即购买
          </div>
        </div>
      </div>
    </div>
    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线；车内推荐系统会根据你的饮食习惯预测你可能会喜欢吃什么，并推荐沿途的早餐店；你的电子社交助理已经为你自动选择了你可能感兴趣的社交网信息；当车内系统预测到你驾车有些分心时，座椅会自动震动进行提醒……
        以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。
        大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。随着越来越多的数据被记录和整理，未来预测分析必定会成为所有领域的关键技术。
        作为预测分析领域的专家，埃里克·西格尔博士深谙预测分析界已经实现和正在发生的事情、面临的问题和将来可能的前景。在《大数据预测》一书中，他结合预测分析的应用实例，对其进行了深入、细致且全面的解读。
        关于预测分析，你想了解的全部，你的生活以及这个世界会因为预测分析改变到什么程度，《大数据预测》都会告诉你。</p>
    </div>
    <dia-log :is-show="isShowPayDialog" @on-clons="clonePayDailog">
      <pay-main :buy-num="buyNum" :buy-price="price" :buy-period="period"
                :buy-versions="versions" :buy-type="buyType" slot="contents">
      </pay-main>
    </dia-log>
  </div>
</template>

<script>
import VCounter from '@/components/base/counter'
import VMultiply from '@/components/base/multiply'
import PayMain from '@/components/base/pay/paydialog'
import DiaLog from '@/components/base/dialog'
import _ from 'lodash'
export default {
  components: {
    VCounter,
    VMultiply,
    PayMain,
    DiaLog
  },
  data () {
    return {
      buyNum: 1,
      buyType: {
        label: ''
      },
      versions: [],
      period: {
        label: ''
      },
      // 初始数据
      price: 0,
      versionList: [
        {
          label: '纸质报告',
          key: 0
        },
        {
          label: 'pdf',
          key: 1
        },
        {
          label: '页面报告',
          key: 2
        },
        {
          label: '邮件',
          key: 3
        }
      ],
      isShowPayDialog: false
    }
  },
  methods: {
    onParamChange (attr, value) {
      this[attr] = value
      // 每次选择完都请求更新数据
      this.getPrice()
    },
    getPrice () {
      // 取出versions的key
      let buyVersionsArray = _.map(this.versions, (item) => { return item.key })
      // 封装请求参数
      let reqParams = {
        buyNumber: this.buyNum,
        version: buyVersionsArray.join(',')
      }
      // eslint-disable-next-line no-whitespace-before-property
      this.$http.post('/api/getPrice', reqParams) .then((reg) => {
        this.price = reg.data.amount
      }, (err) => {
        console.log(err)
      })
    },
    showPayDailog () {
      this.isShowPayDialog = true
    },
    clonePayDailog () {
      this.isShowPayDialog = false
    }
  },
  mounted () {
    // 初始化数据 (首次进来获取数据请求得到商品价格)
    this.buyNum = 1
    this.versions = [this.versionList[0]]
    this.getPrice()
    console.log(this.$route.query.name)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
