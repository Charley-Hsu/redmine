<template>
    <transition name="bounce">
      <div class="rm_confirm" v-if="visible">
        <div class="bg"></div>
        <div class="confirm_container" :style="{width: width}">
          <div class="header">
            {{title}}
            <i @click="close" class="icon-remove icon-large kiko-close-btn" v-if="closeVisible"></i>
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <slot name="footer">
            <!-- <div class="kiko-footer" slot="footer">
              <a href="javscript:void(0)" class="kiko-btn make-sure">确定</a>
              <a href="javscript:void(0)" class="kiko-btn cancel">取消</a>
            </div> -->
          </slot>
        </div>
      </div>
    </transition>
  </template>

  <script type="text/javascript">
    export default {
      name: 'rm_confirm',
      props: {
        width: {
          type: String,
          default: '260px'
        },
        title: {
          type: String,
          default: '信息'
        },
        visible: {
          type: Boolean,
          default: false
        },
        closeVisible: {
          type: Boolean,
          default: true
        }
      },
      data () {
        return {
        }
      },
      methods: {
        close () {
          this.$emit('update:visible', false)
        }
      }
    }
  </script>