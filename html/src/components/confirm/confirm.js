import Vue from 'vue';

var vm = null;
var tpl = `<div class="mask center" style="z-index: 9;" v-if="destroy">
    <div class="popup popup-confirm border-radius" style="position: relative;">
        <div class="margint50 marginb20 paddingh40 fs-18 popup_title confirm_title" v-show="title" v-html="title"></div>
        <div class="marginb50 paddingh40 fs-15 popup_content confirm_content" v-html="content" v-bind:class="{'margint50':!title}"></div>
            <button class="btn pos-a bottom-n0 popup_cancel confirm_cancel" type="button" :style="cancelStyle" v-html="cancelText" @click="cancel()"></button>
            <button class="btn pos-a bottom-n0 popup_ok confirm_ok" type="button" :style="okStyle"  v-html="okText" @click="ok()"></button>
        </div>
    </div>`;

function Confirm(obj) {

    document.body.classList.add('overflow-h');
    
    if (vm) {
        vm.$destroy(true);
    }

    var options = {
        destroy:true,
        title: '分配指回确认',
        content: '是否将此需求指回PM并添加到svn快速记录？',
        okStyle: '',
        okText: '确定',
        cancelStyle: '',
        cancelText: '取消'
    }
    vm = new Vue({
        el: document.body.appendChild(document.createElement('div')),
        template: tpl,
        data: options,
        methods: {
            cancel: function() {
                this.destroy =false;
                obj.cancelFn && obj.okFn(this.$el);
            },
            ok: function() {
                obj.okFn && obj.okFn(this.$el);
                this.destroy =false;
            }
        },
        beforeDestroy:function(){
            console.log("beforeDestroy");
        },
        destroyed: function() {
            console.log("destroy");
        }
    });

    return vm;
}

export default Confirm;