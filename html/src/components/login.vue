<template>
  <div class="bg-wrap">
      <div class="login-content">
          <div class="flex-container center">
              <div class="login-title" style="margin-right:117px;">
                  <img src="../img/logo.png" width="424px">
              </div>
              <div class="login-box">
                  <div class="text-center fs-16" style="color: #000;border-bottom: solid 2px rgba(234, 234, 234, 1);">登录
                  </div>
                  <div>
                      <div style="margin-top:25px;">
                          <div>
                              <input class="login-input" type="text" name="username" placeholder="请输入用户名" v-model="username">
                          </div>
                      </div>
                      <div style="margin-top:20px;">
                          <div>
                              <input class="login-input" type="password" name="password" placeholder="请输入密码" v-model="password">
                          </div>
                      </div>
                      <div class="fs-12 flex-container" style="margin-top:15px;color: #000000;vertical-align: top;">
                          <div style="float: left;text-align: left;" class="flex1">
                              <input type="checkbox" style="width: 14px;height: 14px;float: left;background-color: #0093ff;margin-right: 10px;">
                              <div style="line-height: 1">下次自动登录</div>
                          </div>
                          <div style="float: right">忘记密码</div>
                      </div>
                      <button type="submit" class="login-btn" style="margin-top: 15px;" @click="login">登录</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="footer">
          <div class="flex-container footer-conton">
              <div class="fs-14 paddingr10" style="color: #000000;float: left;">Copyright Notice &copy 2017 TGFE.51tiangou.com limited, All rights reserved</div>
              <div class="flex1">
                  <img src="../img/tgfe.png" alt="" width="90px">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      username:'',
      password:'',
      token:'',
      cookie:''
    }
  },
  created: function () {
    var that = this;
    axios.get('http://node.51tiangou.com/requireManagerColler/info', { })
      .then(function (response) {
        that.cookie = response.data.cookie;
        that.token = response.data.token;
      })
  },
  methods:{
    login:function(){
      var that = this
      axios.post('http://node.51tiangou.com/requireManagerColler/login', {
          username: this.username,
          password: this.password,
          cookie:this.cookie,
          token:this.token
        })
        .then(function (response) {
          if (response.data.message == 'success') {
            // that.$router.push('/redmine',params:{cookie: response.data.cookie})
            that.$router.push({path: '/redmine',query:{cookie: response.data.cookie}})
          }else{
            alert("刷新重试")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

input::-webkit-input-placeholder { /* webkit browsers*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
input:-moz-placeholder {  /* mozilla firefox 4 to 18*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
input::-moz-placeholder {  /* mozilla firefox 19+*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
input:-ms-input-placeholder { /* internet explorer 10+*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
.bg-wrap{
    position: absolute;
    left: 0;
    top: 0;
    background: url(../img/bg.png) center no-repeat;
    background-size: cover;
    min-height: 650px;
    height: 100%;
    width: 100%;
}
.login-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.login-box{
    background: #fff;
    min-width: 400px;
    border-radius: 4px;
    padding: 30px 40px 40px 40px;
}
.footer{
    position: absolute;
    bottom: 70px;
    width: 100%;
}
.footer-conton{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
}
.login-btn{
    border: none;
    font-size: 16px;
    height: 47px;
    line-height: 47px;
    background-color: #0093ff;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    color: white;
}
.login-input{
    height: 42px;
    line-height: 42px;
    background: #f4f4f4;
    border-radius: 4px;
    width: 100%;
    padding:0 17px; 
}
</style>
