<template>
  <div class="notfound">
    <div></div>
    <router-link class="button" :to="{path:'/'}">返回首页</router-link>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .notfound{
    text-align: center;
  }
  .notfound div{
    width: 670px;
    height: 400px;
    margin: 50px auto;
    background: url("../assets/notfound.png");
    background-size: 100%;
  }
</style>
