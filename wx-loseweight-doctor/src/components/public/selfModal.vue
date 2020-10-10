<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-title">{{ title }}</div>
            <!-- 自定义内容 -->
            <slot></slot>
            <div class="btns">
                <div
                    v-if="type != 'confirm'"
                    class="default-btn"
                    @click="closeBtn"
                >
                    {{ cancelText }}
                </div>
                <div
                    v-if="type == 'prompt'"
                    class="confirm-btn"
                    @click="confirmBtn"
                >
                    {{ confirmText }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type: {
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,
            default: '确认'
        }
    },
    data() {
        return {
            showMask: false
        }
    },
    methods: {
        closeMask() {
            this.showMask = false
        },
        closeBtn() {
            this.$emit('cancel')
            this.closeMask()
        },
        confirmBtn() {
            this.$emit('confirm')
            this.closeMask()
        }
    },
    mounted() {
        this.showMask = this.value
    },
    watch: {
        value(newVal, oldVal) {
            this.showMask = newVal
        },
        showMask(val) {
            this.$emit('input', val)
        }
    }
}
</script>
<style lang="less" scoped>
.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .dialog-container {
        width: 80%;
        max-width: 100%;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        position: relative;
        .dialog-title {
            text-align: center;
            width: 100%;
            font-size: 16px;
            color: #333;
            padding: 20px 16px 15px;
            box-sizing: border-box;
        }
        .content {
            color: #797979;
            line-height: 26px;
            padding: 10px 20px 0;
            box-sizing: border-box;
            .cu-input {
                display: flex;
                align-items: center;
                font-size: 15px;
                line-height: 1.429;
                background-color: #fff;
								position: relative;
								border: 1px solid #f2f2f2;
                .cube-input-field {
                    display: block;
                    flex: 1;
                    width: 100%;
                    min-width: 0;
                    padding: 8px 10px;
                    box-sizing: border-box;
                    color: #666;
                    line-height: inherit;
                    background-color: inherit;
                    border-radius: 2px;
                    outline: none;
                }
            }
        }
        .btns {
            width: 100%;
            padding: 16px 16px 10px;
            position: relative;
            bottom: 0;
            left: 0;
            text-align: right;
            font-size: 15px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            & > div {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                padding: 0 30px;
                color: #999;
                border-radius: 8px;
                cursor: pointer;
            }
            .default-btn {
                color: #999;
            }
            .danger-btn {
                background: #ef8c8c;
                &:hover {
                    background: rgb(224, 135, 135);
                }
                &:active {
                    background: #ef8c8c;
                }
            }
            .confirm-btn {
                color: #fc9153;
                background: #fff;
                &:hover {
                    background: #fff;
                }
            }
        }
        .close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
            &:hover {
                font-weight: 600;
            }
        }
    }
}
</style>