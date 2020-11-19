<template>
    <div class="contenter">
        <div
            @touchstart="gotouchstart"
            @touchmove="gotouchmove"
            @touchend="gotouchend"
        >
            测试按钮
        </div>
    </div>
</template>

<script>
var timeOutEvent = 0 //定时器
export default {
    name: 'demo',
    components: {},
    data() {
        return {
            Loop: 0
        }
    },
    created() {},
    methods: {
        gotouchstart() {
            var that = this
            this.Loop = setTimeout(function() {
                that.Loop = 0
                //执行长按要执行的内容，如弹出菜单
                //执行长按要执行的内容，
                that.$createDialog({
                    type: 'alert',
                    title: '我是长按',
                    content: '我是长按弹框内容',
                    icon: 'cubeic-alert'
                }).show()
            }, 500)
            return false
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gotouchend() {
            var that = this
            clearTimeout(this.Loop)
            if (that.Loop != 0) {
                //这里写要执行的内容（尤如onclick事件）
                that.$createDialog({
                    title: '我是点击',
                    content: '我是点击弹框内容',
                    icon: 'cubeic-alert'
                }).show()
            }
            return false
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gotouchmove() {
            clearTimeout(timeOutEvent) //清除定时器
            timeOutEvent = 0
        }
    }
}
</script>

<style lang="less" scoped>
.contenter {
    margin: 40px 15px;
    padding: 10px;
    font-size: 16px;
    background: #cccccc;
}
</style>
