<template>
    <div class="drawer">
        <div :class="maskClass" @click="closeByMask"></div>
        <div :class="mainClass" :style="mainStyle" class="main">
            <div class="drawer-body" :style="bodyStyle">
                <slot />
            </div>
            <div class="drawer-foot">
                <span v-show="closable" class="btn btn2" @click="resetButton"
                    >重置</span
                >
                <span v-show="closable" class="btn" @click="resetButton"
                    >确定</span
                >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'drawer',
    props: {
        // 是否打开
        display: {
            type: Boolean
        },
        // 标题
        title: {
            type: String,
            default: '标题'
        },
        // 是否显示关闭按钮
        closable: {
            type: Boolean,
            default: true
        },
        // 是否显示遮罩
        mask: {
            type: Boolean,
            default: true
        },
        // 是否点击遮罩关闭
        maskClosable: {
            type: Boolean,
            default: true
        },
        // 宽度
        width: {
            type: String,
            default: '400px'
        },
        // 高度
        height: {
            type: String,
            default: '75%'
        },
        // 是否在父级元素中打开
        inner: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        maskClass: function() {
            return {
                'mask-show': this.mask && this.display,
                'mask-hide': !(this.mask && this.display),
                inner: this.inner
            }
        },
        mainClass: function() {
            return {
                'main-show': this.display,
                'main-hide': !this.display,
                inner: this.inner
            }
        },
        mainStyle: function() {
            return {
                width: this.width,
                height: this.height,
                left: this.display ? '0' : `-${this.width}`,
                borderTop: this.mask ? 'none' : '1px solid #eee'
            }
        },
        bodyStyle: function() {
            return {
                height: this.height
            }
        }
    },
    mounted() {
        if (this.inner) {
            let box = this.$el.parentNode
            box.style.position = 'relative'
        }
    },
    methods: {
        closeByMask() {
            this.maskClosable && this.$emit('update:display', false)
        },
        closeByButton() {
            this.$emit('update:display', false)
        },
        resetButton() {}
    }
}
</script>
<style lang="less" scoped>
.drawer {
    .mask-show {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
        transition: opacity 0.5s;
    }
    .mask-hide {
        opacity: 0;
        transition: opacity 0.5s;
    }
    .main {
        position: fixed;
        z-index: 10;
        bottom: 0;
        height: 100%;
        background: #ffffff;
        transition: all 0.5s;
    }
    .main-show {
        opacity: 1;
    }
    .main-hide {
        opacity: 0;
    }
    .inner {
        position: absolute;
    }
    .drawer-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        padding: 20px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: bold;
        background: #fff;
        position: relative;
        border-bottom: 1px solid #eee;
        .close-btn {
            font-size: 24px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateX(50%);
            display: inline-block;
            cursor: pointer;
        }
    }
    .drawer-foot {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 280px;
        border-top: 1px solid #e7e7f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 16px;
        .btn {
            font-size: 16px;
            color: #ffffff;
            padding: 12px 49px;
            background: #6049f5;
						border-radius: 27px;
						&.btn2{
							background: none;
							color: #AAAAAA;
						}
        }
    }
    .drawer-body {
        padding: 20px 20px 60px;
        font-size: 14px;
				overflow: auto;
    }
}
</style>