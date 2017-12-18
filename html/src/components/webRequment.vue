<template>
    <span>{{data}}</span> 
</template>
<script>
import axios from 'axios';

export default {
  components: {

  },
  data () {
    return {
        data:''
    }
  },
  created: function () {
    console.log("Ssss")
    var that = this;
    var cookie = this.$route.query.cookie;
    axios.post('http://node.51tiangou.com/requireManagerColler/web', {
        cookie:cookie
      })
      .then(function (response) {
        that.data =response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg_wrap{
    position: absolute;
    left: 0;
    top: 0;
    background: url(../img/bg.png) center no-repeat;
    background-size: cover;
    min-height: 650px;
    height: 100%;
    width: 100%;
}
</style>
