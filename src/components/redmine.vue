<template>
    <div class="bg_wrap">
        <div class="logo_head" style="height:80px;">
            <div class="float-left">
                <img src="../img/rmtext.png" width="300" alt="">
            </div>
            <div class="float-right">
                <a href="https://github.com/tgoufe">
                    <img src="../img/github.png" width="90" alt="">
                </a>
            </div>
        </div>
        <div class="content_wrap flex-container" style="margin-top:90px;align-items:flex-start;padding-left: 40px;padding-right: 40px;">
            <div class="list_content flex1">
                <div>
                    <img src="../img/folder-opened-icon.png" width="24" alt="">
                    <span class="fs-14" style="padding-left:10px;">需求列表</span>
                </div>
                <div style="margin-top:20px;" class="bg-white">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="需求" name="4"></el-tab-pane>
                        <el-tab-pane label="功能" name="2"></el-tab-pane>
                        <el-tab-pane label="错误" name="1"></el-tab-pane>
                    </el-tabs>
                    <div class="list_item" @click="checked(item)" :class="{active_item: active_item == item}"
                         v-for="item in list">
                        <div style="margin-bottom:20px;">
                            <span class="fs-14" style="font-weight: bold;">#{{item.id}}</span>
                            <el-tag type="danger" style="height:20px;line-height:20px;margin-left:10px;"
                                    v-if="item.tracker">{{item.tracker.name}}
                            </el-tag>
                            <el-tag type="success" style="height:20px;line-height:20px;margin-left:10px;"
                                    v-if="item.status">{{item.status.name}}
                            </el-tag>
                            <el-tag type="info" style="height:20px;line-height:20px;margin-left:10px;"
                                    v-if="activeName == 1 && item.custom_fields">{{item.custom_fields[0].value}}
                            </el-tag>
                            <el-tag type="info" style="height:20px;line-height:20px;float: right;margin-right: 30px;"
                                    v-if="item.fixed_version">{{item.fixed_version.name}}
                            </el-tag>
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
            <div class="submit_content flex2" v-if="this.activeName > 0">
                <div class="flex-container">
                    <div class="flex1 fs-18">
                        <img src="../img/document-text-icon.png" width="24" alt="">
                        <span style="padding-left:10px;color:#000000;" v-text="'#'+requirement_number+ requirement_text"
                              v-if="requirement_number"></span>
                    </div>
                    <div style="float-right">
                        <img src="../img/user-icon.png" width="24" alt="">
                        <span class="fs-14" style="padding-left:10px;color:#000000;" v-if="pmer">来源 {{pmer}}</span>
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
                    <!-- 功能模块专属 -->
                    <div style="margin-top:20px;" v-if="activeName == 2">
                        <div style="margin-bottom:20px;">
                            <span style="color:#4a4a4a">完成情况</span>
                        </div>
                        <div>
                            <div style="width:80%;float:left;">
                                <el-slider
                                        v-model="percent"
                                        :step="10">
                                </el-slider>
                            </div>

                            <el-dropdown style="width:20%;padding-left:10px" size="small">
                                <el-button type="primary">
                                    状态选择<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>进行中</el-dropdown-item>
                                    <el-dropdown-item>已解决待发布</el-dropdown-item>
                                    <el-dropdown-item>待验证</el-dropdown-item>
                                    <el-dropdown-item>反馈</el-dropdown-item>
                                    <el-dropdown-item>测试通过</el-dropdown-item>
                                    <el-dropdown-item>无需处理</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                    <div style="margin-top:20px;">
                        <div style="margin-bottom:20px;">
                            <span style="color:#4a4a4a">指派同学</span>
                        </div>
                        <el-select v-model="numbers" multiple filterable placeholder="请输入指派同学姓名 如“天狗”"
                                   style="width:100%">
                            <el-option
                                    v-for="item in nameList"
                                    :key="item.id"
                                    :label="item.login"
                                    :value="item.id">
                                <span style="float: left">{{ item.login }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.lastname
                                    }}{{ item.firstname }}</span>
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <button type="submit" :style="selected&&numbers?'':'background-color:#cccccc'"
                                class="submit-btn" @click="submit()">完成
                        </button>
                    </div>
                </div>
            </div>
            <!-- 未选择功能项目加载 -->
            <div class="submit_content flex2 center text-center" v-else>
                <div>
                <span>
                  请点击选择左边TAB项，或者点击下方按钮进入2017年度总结。
                </span>
                </div>
                <el-button type="primary" style="margin-top:20px;" @click="goMap()">2017<i
                        class="el-icon-upload el-icon-date"></i>
                </el-button>
            </div>
        </div>
        <!--  loading显示 -->
        <el-button type="primary" v-if="loading">
        </el-button>
        <!-- 已分配回调显示 -->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>是否将该宣讲指回PM，并设置为已分配？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="assignedBack()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import jwt from 'jsonwebtoken'

    export default {
        created: function () {
            const userInfo = this.getUserInfo()
            if (userInfo !== null) {
                this.id = userInfo.id;
                this.token = userInfo.token
            } else {
                this.id = ''
                this.token = ''
            }
            this.getRequmentList()//获取需求列表
            this.$message({
                dangerouslyUseHTMLString: true,
                duration: 0,
                center: true,
                showClose: true,
                message: '<a href="./main" style="color:#ef7c6f">更多内容敬请期待！</a>'
            });
        },
        watch: {},
        computed: {},
        data: function () {
            return {
                percent: '',
                loading: false,
                dialogVisible: false,
                loadingType: '',
                id: '',
                token: '',
                placeholder: '',
                subject: '',
                list: '',
                token: '',
                numbers: [],
                options: [],
                nameList: [],
                selectedNambers: [],
                numberOpition: {},
                selected: '',
                pmer: '',
                pmid: '',
                requirement_number: '',
                requirement_text: '',
                active_item: '',
                activeName: '',
                count: 1,
                total_count: 0
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
            handleClick(tab, event) {
                this.getRequmentList(tab.name);
            },
//            获取需求列表 isok
            getRequmentList: function (id) {
                let headers = {
                    'X-Redmine-API-Key': this.token,
                    'Content-Type': 'application/json'
                };
                this.$http.post('/rm/issues', {
                    token: this.token,
                    assigned_to_id: this.id,
                    tracker_id: id || null
                }, {headers: headers})
                    .then((res) => {
                        this.list = res.data.data.issues;
                    }, (err) => {
                        this.$message.error(err)
                    })
            },
//            点击选择状态 isok
            checked: function (item) {
                let headers = {
                    'X-Redmine-API-Key': this.token,
                    'Content-Type': 'application/json'
                };
                this.numbers = [];
                this.nameList = [];
                this.options = [];
                this.active_item = item;
                this.placeholder = item.subject;
                this.subject = item.subject;
                this.pmer = item.author.name;
                this.pmid = item.author.id;
                this.requirement_number = item.id;
                this.requirement_text = item.subject;
                this.$http.post('/rm/projects', {
                    token: this.token
                }, {headers: headers})
                    .then((res) => {
                        if (res.status === 200) {
                            let defaultOp = {
                                id: 206,
                                name: '未定版本专用'
                            }
                            this.options = res.data.data.versions.slice(-15);
                            this.options.push(defaultOp)
                            console.log(this.options)
                        } else {
                            this.$message.error('获取版本信息失败！')
                        }
                    }, (err) => {
                        this.$message.error(err)
                    })
                this.$http.post('/rm/users', {
                    token: '9f48a0f107ecd272dd7b3ca603d9d8e94335c39f', //需要管理员权限，用了运维的账号获取人员列表
                    limit: 100,
                    offset: 0
                }, {headers: headers})
                    .then((res) => {
                        this.nameList = this.nameList.concat(res.data.data.users);
                        this.total_count = res.data.data.total_count;
                        if (this.total_count) {
                            this.getUsers()//循环获取人员列表
                        } else {
                            this.$message.error('获取人员信息失败！')
                        }
                    }, (err) => {
                        this.$message.error(err)
                    })
            },
//            获取人员列表 isok
            getUsers: function () {
                let headers = {
                    'X-Redmine-API-Key': this.token,
                    'Content-Type': 'application/json'
                };
                for (this.count; this.count * 100 < this.total_count; this.count++) {
                    this.$http.post('/rm/users', {
                        token: '9f48a0f107ecd272dd7b3ca603d9d8e94335c39f',
                        limit: 100,
                        offset: 100 * this.count
                    }, {headers: headers})
                        .then((res) => {
                            this.nameList = this.nameList.concat(res.data.data.users);
                        }, (err) => {
                            this.$message.error(err)
                        })
                }
            },
//            拆分功能按钮
            submit: function () {
                if (this.selected && this.numbers) {
                    let that = this;
                    this.loadingType = this.$loading({
                        lock: true,
                        text: '正在为您拆分，请稍后',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.loading = false;
                    this.numbers.forEach(function (element, index) {
                        that.createIssue(that.numbers[index])
                    });
                } else {
                    alert("请输入必要信息")
                }
            },
//            创建功能
            createIssue: function (id) {
                let url = '/rm/creatIssues';
                let headers = {
                    'X-Redmine-API-Key': this.token,
                    'Content-Type': 'application/json'
                };
                this.$http.post(url, {
                    "issue": {
                        "project_id": 4,
                        "tracker_id": 2,//跟踪：2->功能
                        "status_id": 1,
                        "subject": this.subject,
                        "priority_id": 2,//优先级：2->普通
                        "fixed_version_id": this.selected,//版本号
                        "assigned_to_id": id,//指给人员
                        "parent_issue_id": this.requirement_number,//父需求
                        //"category_id":7,//类别
                        "custom_fields": [
                            {
                                "id": 3,
                                "name": "模块",//模块
                                "value": "web"
                            }
                        ],
                    },
                    token: this.token
                }, {headers: headers})
                    .then((res) => {
                        if (res.data.success) {
                            this.numbers = '';
                            this.loadingType.close();
                            this.loading = false;
                            this.$message.success("一条功能设置成功");
                            this.dialogVisible = true;
                        } else {
                            this.$message.error(res.data)
                            this.loadingType.close();
                            this.loading = false;
                        }
                    })
            },
//            需求指回
            assignedBack: function () {
                let url = '/rm/assignedBack';
                let headers = {
                    'X-Redmine-API-Key': this.token,
                    'Content-Type': 'application/json'
                }
                this.$http.post(url, {
                    fixed_version_id: this.selected,
                    assigned_to_id: this.pmid,
                    token: this.token,
                    number: this.requirement_number
                }, {headers: headers})
                    .then((res) => {
                        if (res.data.success) {
                            this.$message.success("指回成功");
                            this.dialogVisible = false;
                            this.addSvn()
                        } else {
                            this.$message.error("指回失败")
                            this.dialogVisible = false;
                        }
                    })
            },
//            添加到svn管理
            addSvn: function () {
                let url = '/svn/addSvn';
                let headers = {
                    'Content-Type': 'application/json'
                }
                this.$http.post(url, {
                    release: this.selected,
                    description: this.subject,
                    requirement: this.requirement_number,
                    date: this.selected
                }, {headers: headers})
                    .then((res) => {
                        if (res.data.success) {
                            this.$message.success("添加Svn成功");
                            location.reload();
                        } else {
                            this.$message.error("添加Svn失败")
                        }
                    })
            },
            goMap: function () {
                this.$router.push({path: '/map'})
            }
        }
    }
</script>
<style scoped>
    .bg_wrap {
        position: absolute;
        left: 0;
        top: 0;
        background: url(../img/bg.png) center no-repeat;
        background-size: cover;
        min-height: 650px;
        height: 100%;
        width: 100%;
    }

    .logo_head {
        line-height: 1;
    }

    .list_content {
        /*    width: 460px;*/
        margin-right: 10px;
    }

    .list_item {
        padding: 15px;
        color: #666666;
        border-radius: 4px;
        border: solid 1px rgba(230, 234, 237, 1);
        position: relative;
    }

    .submit_detail {
        min-height: 578px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: solid 1px rgba(230, 234, 237, 1);
        margin-top: 20px;
        padding: 20px;
        position: relative;
    }

    .link_icon {
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 15px;
        margin-top: 15px;
    }

    .submit-btn {
        border: none;
        margin-top: 50px;
        font-size: 16px;
        height: 47px;
        line-height: 47px;
        background-color: #0093ff;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        color: white;
    }

    .active_item {
        color: #0093ff;
        border: solid 1px rgb(0, 146, 255);
    }
</style>
