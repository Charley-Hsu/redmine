<!-- APP.vue -->
<template>
  <div id="app">
    <router-view></router-view> <!-- 原本的Login换成了router-view 这就是路由视图渲染的目标元素-->
  </div>
</template>
<script>
  export default {
    data: function () {
      return {

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
</style>
