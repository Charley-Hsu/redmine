<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        {{name}},开始你的寻找热评之旅吧！
      </span>
      <el-input :placeholder="placeholder" v-model="searchName" @keyup.enter.native="search" icon="search"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌手" name="singer">
          <div :xs="24" v-if="!list.empty&&loading" v-loading="loading" element-loading-text="拼命加载中" style="width: 100%;height:300px;"></div>
          <el-col :xs="24" v-if="!list.empty">
            <template> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item,index) in list.data">
                <div class="singer-list">
                  <span class="itemCount">
                    {{ index + 1 }}.
                  </span>
                  <span class="itemName">
                    {{ item.name }}
                  </span>
                  <el-tag :type="itemType(item.id)" style="margin-left: 20px;">{{item.type}}</el-tag>
                  <span class="pull-right">
                    <el-button type="primary" size="mini" @click="enter(item.singer, item.name)">Enter<i class="el-icon-arrow-right"></i></el-button>
                  </span>
                </div>
              </template>
            </template>
          </el-col>
          <div v-if="list.empty" class="Done">
            你寻找的歌手已经突破地球了~
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌曲" name="song">
          <div :xs="24" v-if="!songList.empty && loading" v-loading="loading" element-loading-text="拼命加载中" style="width: 100%;height:300px;"></div>
          <el-col :xs="24" v-if="!songList.empty">
            <template> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item,index) in songList">
                <div class="singer-list">
                  <span class="itemCount">
                    {{ index + 1 }}.
                  </span>
                  <span class="itemName">
                    {{ item.title }}
                  </span>
                </div>
              </template>
            </template>
          </el-col>
          <div v-if="songList.empty" class="Done">
            或许你应该去宇宙寻找这首歌曲~
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
  import jwt from 'jsonwebtoken'
  export default {
    created: function () {
      const userInfo = this.getUserInfo()
      if (userInfo !== null) {
        this.id = userInfo.id
        this.name = userInfo.name
      } else {
        this.id = ''
        this.name = ''
      }
    },
    watch: {
      activeName: function () {
        this.searchName = ''
        this.loading = false
        this.list.empty = true
        this.songList.empty = true
      }
    },
    computed: {
      placeholder: function () {
        if (this.activeName !== 'song') {
          return '快来查查你喜欢的歌手吧'
        } else {
          return '快来查查你钟情的歌曲吧'
        }
      }
    },
    data: function () {
      return {
        activeName: 'singer',
        name: '',
        searchName: '',
        loading: false,
        list: {},
        songList: {}
      }
    },
    methods: {
      getUserInfo: function () {
        const token = sessionStorage.getItem('demo-token')
        if (token != null && token !== 'null') {
          let decode = jwt.verify(token, 'tgfe')
          return decode
        } else {
          return null
        }
      },
      search: function () {
        this.list = { }
        if (this.searchName.length < 1) {
          this.$message.warning('输入内容为空！')
        } else {
          if (this.activeName === 'singer') {
            this.searchSinger()
          } else {
            this.searchSong()
          }
        }
      },
      searchSong: function () {
        this.songList = { }
        if (this.searchName.length < 1) {
          this.$message.warning('输入内容为空！')
        } else {
          this.loading = true
          this.$http.get('/api/searchsong/' + this.searchName)
            .then((res) => {
              if (res.status === 200) {
                this.songList = res.data.data
                this.loading = false
                console.log(this.songList)
              } else {
                this.$message.error('获取列表失败！')
              }
            }, (err) => {
              this.loading = false
              this.$message.error(err)
            })
        }
      },
      searchSinger: function () {
        this.loading = true
        this.$http.get('/api/searchlist/' + this.searchName)
          .then((res) => {
            if (res.status === 200) {
              this.list = res.data
              this.loading = false
            } else {
              this.$message.error('获取列表失败！')
            }
          }, (err) => {
            this.loading = false
            this.$message.error(err)
          })
      },
      itemType: function (id) {
        id = id[0]
        switch (id) {
          case '1':
            return 'danger'
          case '2':
            return 'gray'
          case '6':
            return 'warning'
          case '7':
            return 'success'
          default:
            return ''
        }
      },
      enter (singerId, signerName) {
        sessionStorage.setItem('signerName', signerName)
        this.$router.push({path: '/content', query: {id: singerId}})
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .el-input
    margin 10px auto

  .singer-list
    width 100%
    margin-top 6px
    padding-bottom 6px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left
    .itemCount
      font-size: 12px;
      color: #8391a5
    .itemName
      font-size 14px

  .pull-right
    float right

  .Done
    margin-top 40px
    color #bfcbd9
</style>
