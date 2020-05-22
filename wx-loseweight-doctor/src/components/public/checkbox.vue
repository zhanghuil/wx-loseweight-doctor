<template>
    <div class="chooserList">
        <div class="tit">{{ name }}</div>
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
                    <div>{{ item.label }}</div>
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
        isMultiply: {
            //是否是多选。默认为false：单选；true：多选
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currValArr: []
        }
    },
    methods: {
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
            this.$emit('toparents', this.currValArr)
        },
        checkActive(item) {
            if (this.isMultiply === false) {
                this.currValArr.length = 1
            }
            return this.currValArr.indexOf(item) !== -1
        }
    }
}
</script>
<style lang="less" scoped>
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
</style>