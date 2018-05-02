<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>流量分析</h2>
      <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量：
        </div>
        <div class="sales-board-line-right">
          <v-counter :max="5" @on-change="onParamChange('buyNum',$event)"></v-counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品类型：
        </div>
        <div class="sales-board-line-right">
          <v-selection :selections="buyTypes" @on-change="onParamChange('buyType',$event)"></v-selection>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间：
        </div>
        <div class="sales-board-line-right">
          <v-chooser :period-time="periodList" @on-change="onParamChange('period', $event)"></v-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品版本：
        </div>
        <div class="sales-board-line-right">
          <v-multiply :multiply-list="versionList" @on-change="onParamChange('versions', $event)"></v-multiply>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价：
        </div>
        <div class="sales-board-line-right">{{ price }}元
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
      <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

      <h3>用户行为指标</h3>
      <ul>
        <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
        <li>用户在网站的停留时间；</li>
        <li>用户来源网站（也叫“引导网站”）；</li>
        <li>用户所使用的搜索引擎及其关键词；</li>
        <li>在不同时段的用户访问量情况等。</li>
      </ul>

      <h3>浏览网站方式</h3>
      <ul>
        <li>用户上网设备类型</li>
        <li>用户浏览器的名称和版本</li>
        <li>访问者电脑分辨率显示模式</li>
        <li>用户所使用的操作系统名称和版本</li>
        <li>用户所在地理区域分布状况等</li>
      </ul>
    </div>
    <dia-log :is-show="isShowPayDialog" @on-clons="clonePayDailog">
      <pay-main :buy-num="buyNum" :buy-price="price" :buy-type="buyType"
                :buy-versions="versions" :buy-period="period" slot="contents">
      </pay-main>
    </dia-log>
  </div>
</template>

<script>
import VCounter from '@/components/base/counter'
import VSelection from '@/components/base/selection'
import VChooser from '@/components/base/chooser'
import VMultiply from '@/components/base/multiply'
import PayMain from '@/components/base/pay/paydialog'
import DiaLog from '@/components/base/dialog'
import _ from 'lodash'
export default {
  components: {
    VCounter,
    VSelection,
    VChooser,
    VMultiply,
    PayMain,
    DiaLog
  },
  data () {
    return {
      buyNum: 1,
      buyType: {},
      versions: [],
      period: [],
      // 初始数据
      price: 0,
      buyTypes: [
        {
          label: '入门版',
          key: 0
        },
        {
          label: '中级版',
          key: 1
        },
        {
          label: '高级版',
          key: 2
        }
      ],
      versionList: [
        {
          label: '客户版',
          key: 0
        },
        {
          label: '代理商版',
          key: 1
        },
        {
          label: '专家版',
          key: 2
        }
      ],
      periodList: [
        {
          label: '半年',
          key: 0
        },
        {
          label: '一年',
          key: 1
        },
        {
          label: '三年',
          key: 2
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
        buyType: this.buyType.key,
        period: this.period.key,
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
    this.buyType = this.buyTypes[0]
    this.versions = [this.versionList[0]]
    this.period = this.periodList[0]
    this.getPrice()
    console.log(this.$route.query.name)
  }
}
</script>
