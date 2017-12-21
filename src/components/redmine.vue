<template>
    <div class="bg_wrap" style="padding: 20px;">
        <div class="logo_head" style="height:80px;">
            <div class="float-left">
                <img src="../img/logo.png"width="226" alt="">
            </div>
            <div class="float-right">
                <img src="../img/tgfe.png" width="90" alt="">
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
                        <el-input
                          :placeholder="placeholder"
                          v-model="subject"
                          clearable>
                        </el-input>
                    </div>
                    <div style="margin-top:20px;">
                        <div style="margin-bottom:20px;">
                            <span style="color:#4a4a4a">目标版本</span>
                        </div>
                        <el-select v-model="selected" placeholder="请选择目标版本" style="width:100%">
                          <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.disabled">
                          </el-option>
                        </el-select>
                    </div>
                    <div style="margin-top:20px;">
                        <div style="margin-bottom:20px;">
                            <span style="color:#4a4a4a">指派同学</span>
                        </div>
                        <el-select v-model="numbers" multiple filterable placeholder="请输入指派同学姓名 如“天狗”" style="width:100%">
                          <el-option
                            v-for="item in nameList"
                            :key="item.id"
                            :label="item.login"
                            :value="item.id">
                            <span style="float: left">{{ item.login }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.lastname }}{{ item.firstname }}</span>
                          </el-option>
                        </el-select>
<!--                         <div class="flex-container" style="border-radius: 4px;border: solid 1px rgba(221, 221, 221, 1);">
                            <v-select multiple v-model="numbers" :options="nameList" class="flex1" placeholder="请输入指派同学姓名 如“天狗”"></v-select>
                            <img src="../img/zoom-out-icon.png" width="24" style="position:absolute;right:37px;" alt="">
                        </div> -->
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
  import jwt from 'jsonwebtoken'
  import xml2js from 'xml2js'
  export default {
    created: function () {
      const userInfo = this.getUserInfo()
      if (userInfo !== null) {
        this.id = userInfo.id
        this.token = userInfo.token
      } else {
        this.id = ''
        this.token = ''
      }
      this.getRequmentList()//获取需求列表
    },
    watch: {
    },
    computed: {
    },
    data: function () {
      return {
        id:'',
        token:'',
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
        active_item:'',
        offset:0,
        count:1,
        total_count:0
      }
    },
    methods: {
      getUserInfo: function () {
        const token = sessionStorage.getItem('token')
        if (token != null && token !== 'null') {
          let decode = jwt.verify(token, 'tgfe')
          return decode
        } else {
          return null
        }
      },
      getRequmentList: function () {
        this.$http.get('/rm/issues.xml',{
          headers: {
            'X-Redmine-API-Key': this.token,
            'Content-Type':'application/xml'
          },
          params:{
               // key: this.token,
               assigned_to_id:this.id
          }
        })
          .then((res) => {
            if (res.status === 200) {
                var xmlParser = new xml2js.Parser({ explicitArray : false, mergeAttrs : true });
                xmlParser.parseString(res.data,(err, result) => {
                    this.list = result.issues.issue;
                });
            } else {
              this.$message.error('获取列表失败！')
            }
          }, (err) => {
            this.$message.error(err)
          })
      },
      checked:function (item){
          this.numbers = [];
          this.active_item = item;
          this.placeholder = item.subject;
          this.subject = item.subject;
          this.pmer = item.author.name;
          this.requirement_number = item.id;
          this.requirement_text = item.subject;
          this.$http.get('/rm/projects/17/versions.xml', {
            headers: {
              'X-Redmine-API-Key': this.token,
              'Content-Type':'application/xml'
            },
            })
          .then((res) => {
            if (res.status === 200) {
                var xmlParser = new xml2js.Parser({ explicitArray : false, mergeAttrs : true });
                xmlParser.parseString(res.data,(err, result) => {
                    this.options = result.versions.version.slice(-15);
                    // console.log(this.options)
                    let defaultOp = {
                      id:206,
                      name:'未定版本专用'
                    }
                    this.options.push(defaultOp)
                });
            } else {
              this.$message.error('获取版本信息失败！')
            }
          }, (err) => {
            this.$message.error(err)
          })
          this.$http.get('/rm/users.xml', {
              headers: {
                'X-Redmine-API-Key': '9f48a0f107ecd272dd7b3ca603d9d8e94335c39f',
                'Content-Type':'application/xml'
              },
                params:{
                     //key: '9f48a0f107ecd272dd7b3ca603d9d8e94335c39f', //需要管理员权限，用了运维的账号获取人员列表
                     limit:50,
                     offset:0
                }
            })
          .then((res) => {
                var xmlParser = new xml2js.Parser({ explicitArray : false, mergeAttrs : true });
                xmlParser.parseString(res.data,(err, result) => {
                    this.nameList = this.nameList.concat(result.users.user);
                    this.total_count = result.users.total_count;
                });
                if (this.total_count) {
                    this.getUsers(this.offset)//循环获取人员列表
                } else {
                  this.$message.error('获取人员信息失败！')
                }
          }, (err) => {
            this.$message.error(err)
          })
      },
      getUsers:function (offset){
        for(this.count; this.count * 50 <this.total_count; this.count++){
          this.$http.get('/rm/users.xml', {
              headers: {
                'X-Redmine-API-Key': '9f48a0f107ecd272dd7b3ca603d9d8e94335c39f',
                'Content-Type':'application/xml'
              },
                params:{
                     //key: '9f48a0f107ecd272dd7b3ca603d9d8e94335c39f', //需要管理员权限，用了运维的账号获取人员列表
                     limit:50,
                     offset:50*this.count
                }
            })

          .then((res) => {
                var xmlParser = new xml2js.Parser({ explicitArray : false, mergeAttrs : true });
                xmlParser.parseString(res.data,(err, result) => {
                    this.nameList = this.nameList.concat(result.users.user);
                    console.log(this.total_count,this.count,this.offset)
                });
          }, (err) => {
            this.$message.error(err)
          })
        }
      },
      submit:function () {
        if (this.selected&&this.numbers) {
          let that = this;
          // console.log(this.selected,this.subject,this.numbers,this.requirement_number)
          this.numbers.forEach( function(element, index) {
            that.createIssue(that.numbers[index])
          });
        } else {
            alert("请输入必要信息")
        }
      },
      createIssue:function (id) {
        let url = '/rm/issues.json';
        // let data = {
        //       "issue": {
        //         "tracker_id":2,//跟踪：2->功能
        //         "subject": 'subject',
        //         "priority_id":2,//优先级：2->普通
        //         "custom_field_values":'web',//模块
        //         "fixed_version_id":206,//版本号
        //         "assigned_to_id":182,//指给人员
        //         "parent_issue_id":26823 //父需求
        //       } 
        // }
        // let data = 
        // {
        //     "issue":
        //     {
        //         "tracker":
        //         {
        //             "id": 2,
        //             "name": "功能"
        //         },
        //         "project":
        //         {
        //             "id": 4
        //         },
        //         "subject": "kuaikul",
        //         "status":
        //         {
        //             "id": 1
        //         },
        //         "assigned_to":
        //         {
        //             "id": 182
        //         },
        //         "priority":
        //         {
        //             "id": 2
        //         },
        //         "fixed_version":
        //         {
        //             "id": 206
        //         },
        //         "parent":
        //         {
        //             "id": 26823
        //         },
        //         "custom_fields": [
        //         {
        //             "id": 3,
        //             "value": "web"
        //         }]
        //     }
        
        let data1 = {
          "issue":{
            "project":
            {
                "id": 4,
                "name": "天狗网前端"
            },
            "tracker":
            {
                "id": 2,
                "name": "功能"
            },
            "status":
            {
                "id": 1,
                "name": "新建"
            },
            "priority":
            {
                "id": 2,
                "name": "普通"
            },
            "author":
            {
                "id": 182,
                "name": "徐 强"
            },
            "assigned_to":
            {
               "id": 182,
               "name": "徐 强"
            },
            "parent":
            {
                "id": 26823
            },
            "subject": "aaaaaaaa",
            "description": "",
            "done_ratio": 0
          }
        }
        let headers = {
              'X-Redmine-API-Key': this.token,
              'Content-Type':'application/json'
        }
        this.$http.post(url,data1,{headers:headers})
          .then(function (res) {
            this.selected = '';
            this.numbers = '';
            this.$message.success("分配成功")
          })
          .catch(function (error) {
            this.$message.error(id,error)
          });
      }
    }
  }
</script>
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
