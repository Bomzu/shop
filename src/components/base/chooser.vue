<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in periodTime" @click="changePeriod(index)"
          :title="item.label" :key="index" :class="{active: index === nowIndex}">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    periodTime: {
      type: Array
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    changePeriod (index) {
      //  阻止没有更新数据反复请求相同的数据
      if (this.nowIndex === index) return
      this.nowIndex = index
      this.$emit('on-change', this.periodTime[this.nowIndex])
    }
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #363636;
  background: #363636;
  color: #fff;
}
</style>
