<template>
    <div>
        <ul class="chooser-list">
            <li
                :style="cssStyle"
                v-for="(item, index) in options"
                :key="index"
                @click="optionsClick(item)"
            >
                <!-- 右侧选择文本框 -->
                <div v-show="isRight" class="flex-bet w-100">
                    <div class="flex-bet">
                        <div>{{ item.GroupName }}</div>
                        <div class="num">（{{ item.PatientCount }}）</div>
                    </div>
                    <div>
                        <div v-if="checkActive(item)">
                            <i class="icon cubeic-square-right"></i>
                        </div>
                        <div v-else>
                            <i class="icon cubeic-square-border"></i>
                        </div>
                    </div>
                </div>
                <div v-show="!isRight" class="flex-bet">
                    <div v-if="checkActive(item)">
                        <i class="icon cubeic-square-right"></i>
                    </div>
                    <div v-else>
                        <i class="icon cubeic-square-border"></i>
                    </div>
                    <div>{{ item.GroupName }}</div>
                    <!-- <div class="num">
                        （{{ item.PatientCount }}）
                    </div> -->
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
        currArr: Array,
        options: Array, //传入的数组
        selectPatientGroup: Array, //传入的选中数组
        isMultiply: {
            //是否是多选。默认为false：单选；true：多选
            type: Boolean,
            default: false
        },
        isRight: {
            //是否右侧选择框。默认为false：左侧；    true：右侧
            type: Boolean,
            default: false
        },
        cssStyle: Object //可以自定义单选或者多选的样式
    },
    data() {
        return {
            currValArr: []
        }
    },
    created() {
        console.log(this.selectPatientGroup)
    },
    // watch: {
    //     selectPatientGroup: function(newVal, oldVal) {
    //         this.currValArr = newVal //newVal即是chartData
    //         console.log(newVal)
    //     }
    // },
    watch: {
        selectPatientGroup: {
            handler(newVal, oldVal) {
                this.currValArr = newVal //newVal即是chartData
            },
            deep: true,
            immediate: true
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
            // debugger
            if (this.isMultiply === false) {
                //单选
                this.currValArr.length = 1
            }
            return this.currValArr.indexOf(item) !== -1 //多选
        }
    }
}
</script>
<style lang="less" scoped>
.flex-bet {
    align-items: center;
    display: flex;
    justify-content: space-between;
}
ul,
li {
    margin: 0;
    padding: 0;
    list-style: none;
}
.chooser {
    position: relative;
    display: inline-block;
}

.chooser-list li {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .icon {
        color: #6049f5;
        font-size: 20px;
        margin-right: 10px;
    }
}
</style>