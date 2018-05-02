<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>
        <div v-for="(product, index) in productList" :key="index">
          <h3>{{ product.title }}</h3>
          <ul>
            <li v-for="(items, index) in product.list" :title="items.name" :key="index">
              <a :href="items.url">{{ items.name }}<span v-if="items.hot" class="hot-tag">HOT</span></a>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </div>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="(item, index) in newsList" :title="item.title" :key="index">
            <a :href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
        <!--<router-link :to="{path: '/orderlist', query:{id:'link',color:'green'}}">green</router-link>
        <button @click="goQueryList">red</button>
        <button @click="goParamsList">yellow</button>-->
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slideList" :ivtime="slitime"></slide-show>
      <div class="index-board-list">
        <div class="index-board-item" v-for="(item, index) in boardList"
             :class="[{'line-last': index % 2 !== 0}, 'index-board-' + item.id]" :key="index">
          <div class="index-board-item-inner">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="index-board-button">
              <router-link class="button" :to="{path: 'detail/'+item.toKey}">查看详情</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideShow from '@/components/slideshow'
export default {
  components: {
    SlideShow
  },
  created () {
    this.$http.post('/api/getProductList').then((res) => {
      this.productList = res.data
    }, (err) => {
      console.log(err)
    })
    this.$http.post('/api/getNewsList').then((res) => {
      this.newsList = res.data
    }, (err) => {
      console.log(err)
    })
    this.$http.post('/api/getBoardList').then((res) => {
      this.boardList = res.data
    }, (err) => {
      console.log(err)
    })
  },
  data () {
    return {
      productList: [],
      newsList: [],
      boardList: [],
      slitime: 3000,
      slideList: [
        {
          img: require('@/assets/slideimg/slide1.jpg'),
          title: '绝地求生1',
          href: 'http://pubg.qq.com/'
        },
        {
          img: require('@/assets/slideimg/slide2.jpg'),
          title: '绝地求生2',
          href: 'http://pubg.qq.com/'
        },
        {
          img: require('@/assets/slideimg/slide3.jpg'),
          title: '绝地求生3',
          href: 'http://pubg.qq.com/'
        },
        {
          img: require('@/assets/slideimg/slide4.jpg'),
          title: '绝地求生4',
          href: 'http://pubg.qq.com/'
        }
      ]
    }
  },
  methods: {
    goQueryList () {
      this.$router.push(
        {
          path: '/orderlist',
          query: {
            id: 'query',
            color: 'red'
          }
        }
      )
    },
    goParamsList () {
      this.$router.push(
        {
          name: 'orderPage',
          params: {
            id: 'params',
            color: 'yellow'
          }
        }
      )
    }
  }
}
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #363636;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .lastest-news {
    min-height: 512px;
  }
  .hot-tag {
    background: red;
    color: #fff;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
