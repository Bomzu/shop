<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>广告发布</h2>
      <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量：
        </div>
        <div class="sales-board-line-right">
          <v-counter :max="50" @on-change="onParamChange('buyNum',$event)"></v-counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          行业：
        </div>
        <div class="sales-board-line-right">
          <v-multiply :multiply-list="buyTypes" @on-change="onParamChange('versions', $event)"></v-multiply>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品版本：
        </div>
        <div class="sales-board-line-right">
          <v-selection :selections="versionList" @on-change="onParamChange('buyType',$event)"></v-selection>
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
          总价：
        </div>
        <div class="sales-board-line-right">
          {{price}} 元
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
      <dia-log :is-show="isShowPayDialog" @on-clons="clonePayDailog">
        <pay-main :buy-num="buyNum" :buy-price="price" :buy-type="buyType"
                  :buy-versions="versions" :buy-period="period" slot="contents">
        </pay-main>
      </dia-log>
    </div>
    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>

      <table class="sales-board-table">
        <tbody>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>安全安保</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>办公文教</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>彩票</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>车辆物流</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>成人用品</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>出版传媒</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>电脑硬件</label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>电子电工</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>房地产建筑装修</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>分类平台</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>服装鞋帽</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>箱包饰品</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>化工原料制品</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>机械设备</label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>家庭日用品</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>家用电器</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>教育培训</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>节能环保</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>金融服务</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>礼品</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>旅游住宿</label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>美容化妆</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>母婴护理</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>农林牧渔</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>软件</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>商务服务</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>生活服务</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>食品保健品</label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>手机数码</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>通讯服务设备</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>网络服务</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>医疗服务</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>游戏</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>运动休闲娱乐</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>招商加盟</label>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
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
      period: {},
      // 初始数据
      price: 0, // 价格
      buyTypes: [
        {
          label: '新闻',
          key: 0
        },
        {
          label: '媒体',
          key: 1
        },
        {
          label: '金融',
          key: 2
        },
        {
          label: '互联网',
          key: 3
        },
        {
          label: '游戏',
          key: 4
        }
      ],
      versionList: [
        {
          label: '初级版',
          key: 0
        },
        {
          label: '中级版',
          key: 1
        },
        {
          label: '高级版',
          key: 2
        },
        {
          label: '专家版',
          key: 3
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
