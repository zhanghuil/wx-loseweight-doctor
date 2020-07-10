<template>
    <transition name="move">
        <div>
            <div class="insTmpBox" v-show="showFlag">
                <cube-scroll ref="scrollSearch">
                    <div class="pb70">
                        <div class="tmpList" v-if="list && list.length > 0">
                            <template v-if="list && list.length > 0">
                                <Options
                                    :options="list"
                                    :selectPatientGroup="selectPatientGroup"
                                    :isMultiply="true"
                                    @toparents="childByValue"
                                ></Options>
                            </template>
                        </div>
                    </div>
                </cube-scroll>
            </div>

            <div
                class="footerEdit footerTmpEdit"
                v-if="list && list.length > 0 && showFlag"
            >
                <button class="yk-btn yk-btn-def" @click="cancelTap">
                    取消
                </button>
                <button class="yk-btn" @click="submitTap">确定</button>
            </div>
        </div>
    </transition>
</template>

<script>
import Options from '@/components/public/options'
export default {
    components: { Options },
    props: {
        list: {
            type: Array
        }
    },
    data() {
        return {
            childValueArr: [],
            selectPatientGroup: [],
            showFlag: false //显示
        }
    },
    created() {
        console.log(this.list)
    },
    methods: {
        refreshCard() {
            this.$refs.scrollSearch.refresh()
        },
        show() {
            this.showFlag = true
            this.$nextTick(() => {
                this.refreshCard()
            })
        },
        hide() {
            this.showFlag = false
        },
        childByValue(childValue) {
            // childValue就是子组件传过来的值
            console.log(childValue)
            this.childValueArr = childValue
        },
        cancelTap() {
            this.$emit('cancle')
            this.hide()
        },
        submitTap() {
            this.$emit('selGroup', this.childValueArr)
            this.hide()
        }
    }
}
</script>

<style lang="less">
.insTmpBox {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 101;
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    transform: translate3d(0, 0, 0);
    &.move-enter-active,
    &.move-leave-active {
        transition: all 0.2s linear;
    }
    &.move-enter,
    &.move-leave-active {
        transform: translate3d(100%, 0, 0);
    }
}
.footerTmpEdit {
    z-index: 110;
}
.tmpList {
    margin: 15px;
    .chooser-list li {
        padding: 15px;
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
        border-radius: 4px;
        font-size: 16px;
        color: #3a3a3a;
    }
}
.noTmp {
    width: 100%;
    height: 100%;
    text-align: center;
    .wrap {
        padding-top: 200px;
        img {
            width: 138px;
            height: 100px;
        }
        .noTxt {
            margin: 20px 0 40px;
        }
    }
}
</style>