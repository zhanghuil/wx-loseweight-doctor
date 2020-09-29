<template>
    <div class="chooserList">
        <div class="rel">
            <i
                v-show="targetCheckBoxError"
                class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon3"
            ></i>
            <div class="tit">{{ name }}</div>
        </div>
        <!-- 全选按钮 -->
        <div v-show="isSelectAll" class="selectAllBox">
            <div class="flexBox" @click="checkAll">
                <div v-if="checkedAll">
                    <i class="icon iconfont icon-radiofill"></i>
                </div>
                <div v-else>
                    <i class="icon iconfont icon-radioboxblank "></i>
                </div>
                <div>全选</div>
            </div>
        </div>
        <ul>
            <li
                v-for="(item, index) in options"
                :key="index"
                @click="optionsClick(item)"
            >
                <div class="flexBox">
                    <div v-if="checkActive(item)">
                        <i class="icon iconfont icon-radiofill"></i>
                    </div>
                    <div v-else>
                        <i class="icon iconfont icon-radioboxblank "></i>
                    </div>
                    <div>{{ item.Name }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    model: {
        prop: 'currArr',
        event: 'input'
    },
    props: {
        //标题文字
        name: {
            type: String,
            value: ''
        },
        //显示警告图标
        isShowTips: {
            type: Boolean,
            value: false
        },
        currArr: Array,
        options: Array, //传入的数组
        selectArr: Array, //传入的选中数组
        isMultiply: {
            //是否是多选。默认为false：单选；true：多选
            type: Boolean,
            default: false
        },
        isSelectAll: {
            //是否有全选按钮。默认false-没有；true-有
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            checkedAll: false, //是否全选
            currValArr: [],
            targetCheckBoxError: false //是否显示error图标
        }
    },
    watch: {
        selectArr: {
            handler(newVal, oldVal) {
                this.currValArr = newVal //newVal即是chartData
            },
            deep: true,
            immediate: true
        },
        currValArr() {
            if (this.currValArr.length == this.options.length) {
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
        }
    },
    methods: {
        //全选
        checkAll() {
            if (this.checkedAll) {
                this.currValArr = []
            } else {
                this.options.forEach(item => {
                    if (this.currValArr.indexOf(item) == -1) {
                        this.currValArr.push(item)
                    }
                })
						}
						this.validIsCheck()
            this.$emit('toparents', this.currValArr)
        },
        optionsClick(item) {
            if (this.isMultiply === false) {
                //单选
                this.$set(this.currValArr, 0, item) // 将该值设为当前数组的第一项
            } else {
                //多选
                if (this.currValArr.indexOf(item) === -1) {
                    // 当前数组中没有该值则push到数组
                    this.currValArr.push(item)
                } else {
                    //当前数组中有该值，找到该值下标并删除
                    this.currValArr.splice(this.currValArr.indexOf(item), 1)
                }
            }
            this.validIsCheck()
            this.$emit('toparents', this.currValArr)
        },
        checkActive(item) {
            if (this.isMultiply === false) {
                this.currValArr.length = 1
            }
            return this.currValArr.indexOf(item) !== -1
        },
        isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) return false
            }
            return true
        },
        validIsCheck() {
            let isEmpty = this.isEmpty(this.currValArr)
            if (this.currValArr.length <= 0 || isEmpty)
                this.targetCheckBoxError = true
            else this.targetCheckBoxError = false
            return !this.targetCheckBoxError
        }
    }
}
</script>
<style lang="less" scoped>
.tipsIcon3 {
    top: 1px;
}
.chooserList {
    .tit {
        font-size: 16px;
        color: #3a3a3a;
    }
    ul {
        margin-right: -24px;
        overflow: hidden;
    }
    li {
        float: left;
        margin: 19px 24px 0 0;
        font-size: 14px;
        color: #6d6d6d;
        .flexBox {
            align-items: center;
            display: flex;
        }
        .icon {
            font-size: 18px;
            margin-right: 6px;
        }
        .icon-radiofill {
            color: #9198f7;
        }
        .icon-radioboxblank {
            color: #d8d8e4;
        }
    }
}
.selectAllBox {
    padding: 15px 0 0;
    color: #6d6d6d;
    // border-bottom: 1px dashed #F2F2F2;
    .flexBox {
        align-items: center;
        display: flex;
    }
    .icon {
        font-size: 18px;
        margin-right: 6px;
    }
    .icon-radiofill {
        color: #9198f7;
    }
    .icon-radioboxblank {
        color: #d8d8e4;
    }
}
</style>