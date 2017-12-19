<template>
  <div>
    <el-collapse v-model="activeName" accordion class="box_collapse" v-if="data">
      <el-collapse-item  :name="index" v-for="(item,index) in data">
        <template slot="title">
          {{item.title}}<el-badge :value="item.comment" :max="999" class="item" style="float: right;padding-right: 10px;"></el-badge>
        </template>
        <div class="content">{{item.content}}</div>
        <div class="name" v-if="item.nickname">~From：{{item.nickname}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  export default {
    props: ['data', 'name'],
    data: function () {
      return {
        activeName: '-1'
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="stylus" scoped>
  .box_collapse {
    text-align:left;
  }
  .content
    font-size:14px;

  .name
    font-size:12px;
    margin-top:5px;


</style>
