<template>
    <div class="bg_wrap" style="padding: 20px;">
        <div class="logo_head" style="height:80px;">
            <div class="float-left">
                <img src="../img/logo.png"width="226" alt="">
            </div>
            <div class="float-right">
                <img src="../img/tgfe.png" width="90" alt="" @click="assignedBack">
            </div>
        </div>
        <div class="content_wrap flex-container" style="margin-top:90px;align-items:flex-start">
            <div class="list_content flex1">
                <div>
                    <img src="../img/folder-opened-icon.png" width="24" alt="">
                    <span class="fs-14" style="padding-left:10px;">需求列表</span>
                </div>
                <div style="margin-top:20px;" class="bg-white" v-for="item in list" >
                    <div class="list_item" @click="checked(item)" :class="{active_item: active_item == item}">
                        <div style="margin-bottom:20px;">
                            <span class="fs-14" style="font-weight: bold;">#{{item.id}}</span>
                        </div>
                        <div>
                            <span class="fs-12">{{item.subject}}</span>
                        </div>
                        <div class="link_icon">
                            <img src="../img/link-blue.png" width="24" v-if="active_item == item">
                            <img src="../img/link-icon.png" width="24" v-else>
                        </div>
                    </div>
                </div>
            </div>
            <div class="submit_content flex2">
                <div class="flex-container">
                    <div class="flex1 fs-18">
                        <img src="../img/document-text-icon.png" width="24" alt="">
                        <span style="padding-left:10px;color:#000000;" v-text="'#'+requirement_number+ requirement_text" v-if="requirement_number"></span>
                    </div>
                    <div style="float-right">
                        <img src="../img/user-icon.png" width="24" alt="">
                        <span class="fs-14" style="padding-left:10px;color:#000000;" v-if="pmer">PM {{pmer}}</span>
                    </div>
                </div>
                <div class="bg-white submit_detail fs-14">
                    <div>
                        <div style="margin-bottom:20px;">
                            <span style="color:#4a4a4a">需求名称</span>
                        </div>
                        <div class="flex-container" style="border-radius: 4px;border: solid 1px rgba(221, 221, 221, 1);padding:0 17px; ">
                            <input class="title_input flex1" v-model="subject" type="text" name="title" :placeholder="placeholder">
                            <img src="../img/edit-icon.png" width="24" class="float-right" alt="">
                        </div>
                    </div>
                    <div style="margin-top:20px;">
                        <div style="margin-bottom:20px;">
                            <span style="color:#4a4a4a">目标版本</span>
                        </div>
                        <div class="flex-container" style="border-radius: 4px;border: solid 1px rgba(221, 221, 221, 1);">
                            <select v-model="selected" class="flex1">
                                 <option v-for="item in options" v-bind:value="item.id">
                                     {{item.text}}
                                 </option>
                             </select>
                        </div>
                    </div>
                    <div style="margin-top:20px;">
                        <div style="margin-bottom:20px;">
                            <span style="color:#4a4a4a">指派同学</span>
                        </div>
                        <div class="flex-container" style="border-radius: 4px;border: solid 1px rgba(221, 221, 221, 1);">
                            <v-select multiple v-model="numbers" :options="nameList" class="flex1" placeholder="请输入指派同学姓名 如“天狗”"></v-select>
                            <img src="../img/zoom-out-icon.png" width="24" style="position:absolute;right:37px;" alt="">
                        </div>
                    </div>
                    <div>
                        <button type="submit" :style="selected&&numbers?'':'background-color:#cccccc'" class="submit-btn" @click="submit()">完成</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import rm_confirm from './confirm/confirm.js'
import vSelect from "vue-select";
export default {
  components: {
    vSelect,
    rm_confirm
  },
  data () {
    return {
      placeholder:'',
      subject:'',
      list: '',
      cookie:'',
      token:'',
      numbers:[],
      options:[],
      nameList:[],
      selectedNambers:[],
      numberOpition:{},
      selected:'',
      pmer:'',
      requirement_number:'',
      requirement_text:'',
      active_item:''
    }
  },
  created: function () {
    var that = this;
    var cookie = this.$route.query.cookie;
    axios.post('http://node.51tiangou.com/requireManagerColler/page', {
        cookie:cookie
      })
      .then(function (response) {
        that.list = response.data.data;
        that.cookie = response.data.cookie;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods:{
    checked:function(item){
        var that = this;
        that.active_item = item;
        that.placeholder = item.subject;
        that.subject = item.subject;
        that.pmer = item.pmer;
        that.requirement_number = item.id;
        that.requirement_text = item.subject;
        axios.post('http://node.51tiangou.com/requireManagerColler/detail', {
            cookie:this.cookie,
            id:item.id
          })
          .then(function (response) {
            that.options = response.data.optionList;
            that.nameList = response.data.nameList;
            that.numberOpition = response.data.nameOption;
            that.cookie = response.data.cookie;
            that.token = response.data.token;
          })
          .catch(function (error) {
            alert("单身30年的手速吧,试着刷新重试")
          });
    },
    submit:function(){
        var that = this;
        if (this.selected&&this.numbers) {
            this.numbers.forEach(function(value, index){
                that.selectedNambers[index] = that.numberOpition[value];
            })
            axios.post('http://node.51tiangou.com/requireManagerColler/submit', {
                cookie:this.cookie,
                token:this.token,
                subject:this.subject,
                version:this.selected,
                id:this.requirement_number,
                assigned:this.selectedNambers
              })
              .then(function (response) {
                console.log("循环测试结果",response.data.cookie)
                that.cookie = response.data.cookie;
                that.selected = '';
                that.numbers = '';
                // that.assignedBack();
              })
              .catch(function (error) {
                console.log("循环测试结果",error);
                alert("发生了错误，快来抓虫子")
              });
        } else {
            alert("请输入必要信息")
        }
    },
    assignedBack:function(){
        rm_confirm({
            okFn: () => {
                axios.post('http://node.51tiangou.com/requireManagerColler/assignedBack', {
                    cookie:this.cookie,
                    pmer:this.pmer,
                    id:this.requirement_number
                  })
                  .then(function (response) {
                    console.log("指回产品结果",response)
                    that.cookie = response.data.cookie;
                    alert("分配成功")
                  })
                  .catch(function (error) {
                    console.log("循环测试结果",error);
                  });
            }
        })
    },
    gohome:function(){
        var that = this;
        that.$router.push({path: '/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select{
    border:0;
    appearance:none;  
    -moz-appearance:none;  
    -webkit-appearance:none;  
    background: url("../img/arrow-down-1-icon.png") no-repeat scroll right center transparent;   
    background-size:24px;
    padding: 0 17px; 
    margin-right: 17px;
    line-height: 42px;
}
option:focus{
    background-color: rgba(0, 146, 255, 0.5);
}
input::-webkit-input-placeholder { /* WebKit browsers*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
input:-moz-placeholder {  /* Mozilla Firefox 4 to 18*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
input::-moz-placeholder {  /* Mozilla Firefox 19+*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
input:-ms-input-placeholder { /* Internet Explorer 10+*/ 
　　margin-left:15px;font-size: 14px;color: #bababa;
}
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
.logo_head{
    line-height: 1;
}
.list_content{
/*    width: 460px;*/
    margin-right:10px;
}
.list_item{
    padding:15px;
    color: #666666;
    border-radius: 4px;
    border: solid 1px rgba(230, 234, 237, 1);
    position: relative;
}
.submit_detail{
    min-height: 578px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: solid 1px rgba(230, 234, 237, 1);
    margin-top: 20px;
    padding: 20px;
    position: relative;
}
.title_input{
    color:#666666;
    line-height: 42px;
    height: 42px;
}
.link_icon{
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 15px;
    margin-top: 15px;
}
.submit-btn{
    border: none;
    margin-top: 230px;
    font-size: 16px;
    height: 47px;
    line-height: 47px;
    background-color: #0093ff;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    color: white;
}
.active_item{
    color: #0093ff;
    border: solid 1px rgb(0, 146, 255);
}
</style>
<style>
    .v-select input[type=search], .v-select input[type=search]:focus{
        line-height: 42px !important;
        height: 42px !important;
    }
    .open-indicator{
        display: none !important;
    }
    .v-select .dropdown-toggle{        
        padding-left:15px !important;
        padding-right:37px !important;
        font-size: 14px !important;
    }
    .v-select .selected-tag{
        line-height: 30px !important;
        height: 30px !important;
        margin-top: 6px !important;
    }
    .popup{
        width: 30%;
        text-align: center;
    }
</style>