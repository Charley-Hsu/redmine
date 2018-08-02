<template>
    <div class="bg-wrap">
        <div class="login-content">
            <div class="flex-container center">
                <div class="login-title" style="margin-right:117px;">
                    <img src="../img/logo.png" width="424px">
                </div>
                <div class="login-box">
                    <div class="text-center fs-20" style="color: rgb(0, 147, 255);border-bottom: solid 2px rgba(234, 234, 234, 1);">
                        登录
                    </div>
                    <div>
                        <div style="margin-top:25px;">
                            <el-input
                                    name="username"
                                    placeholder="请输入用户名"
                                    v-model="account"
                                    clearable>
                            </el-input>
                        </div>
                        <div style="margin-top:20px;">
                            <el-input
                                    type="password"
                                    name="password"
                                    placeholder="请输入密码"
                                    v-model="password"
                                    clearable>
                            </el-input>
                        </div>
                        <div class="fs-12 flex-container" style="margin-top:15px;color: #000000;vertical-align: top;">
                            <!--<div style="float: left;text-align: left;" class="flex1">-->
                                <!--<input type="checkbox"-->
                                       <!--style="width: 14px;height: 14px;float: left;background-color: #0093ff;margin-right: 10px;">-->
                                <!--<div style="line-height: 1">下次自动登录</div>-->
                            <!--</div>-->
                            <!--<div style="float: right">忘记密码</div>-->
                        </div>
                        <button type="submit" class="login-btn" style="margin-top: 15px;" @click="login">登录</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="flex-container footer-conton">
                <div class="fs-14" style="color: #000000;float: left;margin-right: 20px;">Copyright Notice &copy 2017
                    tgfe.51tiangou.com limited, All rights reserved
                </div>
                <div class="flex1">
                    <img src="../img/tgfe.png" alt="" width="90px">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint handle-callback-err: "warn" */
    export default {
        data: function () {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                let obj = {
                    name: this.account,
                    password: this.password
                }
                this.$http.post('/auth/user', obj) // 将信息发送给后端
                    .then((res) => {
                        if (!res.data.success) {
                            this.$message.error(res.data.info) // 登录失败，显示提示语
                            sessionStorage.setItem('token', null) // 将token清空
                        } else { // 如果成功
                            sessionStorage.setItem('token', res.data.token) // 用sessionStorage把token存下来
                            this.$message({ // 登录成功，显示提示语
                                type: 'success',
                                message: '登录成功！'
                            })
                            this.$router.push('/redmine') // 进入content页面，登录成功
                        }
                    }, (err) => {
                        this.$message.error('请求错误！')
                        sessionStorage.setItem('token', null) // 将token清空
                    })
            }
        }
    }
</script>
<style>
    .bg-wrap {
        position: absolute;
        left: 0;
        top: 0;
        background: url(../img/bg.png) center no-repeat;
        background-size: cover;
        min-height: 650px;
        height: 100%;
        width: 100%;
    }

    .login-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login-box {
        background: #fff;
        min-width: 400px;
        border-radius: 4px;
        padding: 30px 40px 40px 40px;
    }

    .footer {
        position: absolute;
        bottom: 70px;
        width: 100%;
    }

    .footer-conton {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
    }

    .login-btn {
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

    .login-input {
        height: 42px;
        line-height: 42px;
        background: #f4f4f4;
        border-radius: 4px;
        width: 100%;
        padding: 0 17px;
    }
</style>
