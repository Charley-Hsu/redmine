<!-- APP.vue -->
<template>
  <div id="app">
    <el-carousel :interval="4000" type="card" height="100px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item" class="logoImg">
      </el-carousel-item>
    </el-carousel>
    <router-view></router-view> <!-- 原本的Login换成了router-view 这就是路由视图渲染的目标元素-->
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        imgList: ['./static/node.png', './static/vue.png', './static/element.png', './static/music2.jpg']
      }
    },
    name: 'app' // 不需要再引入`Login`组件了，因为在路由里已经注册了
  }
</script>
<style lang="stylus" scoped>
  #app
    font-family:'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    text-align:center;
    color:#2c3e50;
    margin-top:30px;

  .logoImg
    width:100px;
    margin-bottom:20px;

</style>
