<template>
  <div>
    <div class="title">
      <span class="text">歌手：</span><span class="singer">{{name}}</span>
    </div>
    <collapse :data="list.data" :name="name" v-if="!list.empty"  v-loading="loading" element-loading-text="拼命加载中" style="width: 100%;height:400px;"></collapse>
    <div v-if="list.empty" class="Done">
      还没有收录这个歌手的歌曲呢~
    </div>
    <!--<card class="card"></card>-->
  </div>
</template>
<script>
  import card from './common/card'
  import collapse from './common/collapse'
  export default {
    created: function () {
      this.name = sessionStorage.getItem('signerName')
      this.getContentInfo()
    },
    data: function () {
      return {
        name: '',
        list: { },
        id: '',
        loading: true
      }
    },
    computed: {},
    components: {
      card,
      collapse
    },
    methods: {
      getContentInfo: function () {
        this.$http.get('/api/contentlist/' + this.$route.query.id)
          .then((res) => {
            if (res.status === 200) {
              this.loading = false
              this.list = res.data
            } else {
              this.loading = false
              this.$message.error('获取列表失败！')
            }
          }, (err) => {
            this.loading = false
            this.$message.error('获取列表失败！')
            console.log(err)
          })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .text
    font-size 15px

  .singer
    color rgba(255,73,73,.8)

  .title
    height: 40px;
    border: 1px solid rgba(255,73,73,.2);
    line-height: 40px;
    font-size: 18px;
    margin-bottom: 10px;

  .Done
    margin-top 40px
    color #bfcbd9
</style>
