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
        <div style="margin-top: 70px;position: fixed;">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened="true">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-news"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<style>
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
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>

<script>
    export default {
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>