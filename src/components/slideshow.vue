<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="autoSlide">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].img">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].img">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">《 </li>
      <li v-for="(item, index) in slides" :key="index">
        <a @mouseover="goto(index)" :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)"> 》</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable vue/require-valid-default-prop */

export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    ivtime: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      isShow: true,
      nowIndex: 0
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1 // 后退如果nowIndex是第一张则nowIndex为最后一张
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) { // 前进如果nowIndex是最后一张，nowIndex=0
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      this.isShow = false
      this.nowIndex = index
    },
    autoSlide () { // 自动slide
      this.ivnId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.ivtime)
    },
    clearInv () { // 悬停停止
      clearInterval(this.ivnId)
    }
  },
  mounted () {
    this.autoSlide()
  }
}
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
    line-height: 2;
    font-weight: bold;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }
  .slide-pages li .on {
    text-decoration: underline;
  }
</style>
