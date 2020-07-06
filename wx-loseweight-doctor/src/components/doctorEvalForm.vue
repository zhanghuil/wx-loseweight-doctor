<template>
    <div>
        <!-- 评估日期 -->
        <div class="yk_wx_cell" @click="showDatePicker">
            <div class="cell_bd flex-center">
                <div>
                    <img src="../assets/time@2x.png" class="img" alt="" />
                </div>
                <div class="ml10 f16">评估日期</div>
            </div>
            <div class="cell_ft">
                <span class="mr10" :class="planDate == '请选择' ? 'c-a' : ''">{{
                    planDate
                }}</span>
                <i class="icon cubeic-arrow"></i>
            </div>
        </div>
        <!-- 评估表横向菜单 -->
        <div class="horizontalMenu">
            <cube-scroll
                ref="scroll"
                :data="items"
                direction="horizontal"
                class="horizontal-scroll-list-wrap"
            >
                <ul class="list-wrapper">
                    <li
                        v-for="(item, index) in items"
                        :key="index"
                        class="list-item"
                    >
                        {{ item }}
                    </li>
                </ul>
            </cube-scroll>
        </div>
    </div>
</template>
<script>
import { yktoast, convertKey } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
export default {
    name: 'doctorEvalForm',
    data() {
        return {
            planDate: '请选择', //评估日期
            items: ['体格', '实验室检查', '胰岛功能', 'RMR', '影像学', '体成分']
        }
    },
    created() {},
    methods: {
        //评估日期
        showDatePicker() {
            if (!this.datePicker) {
                this.datePicker = this.$createDatePicker({
                    title: '选择评估日期',
                    value: new Date(),
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                })
            }
            this.datePicker.show()
        },
        selectHandle(date, selectedVal, selectedText) {
            this.planDate = selectedText.join('-')
        }
    }
}
</script>
<style lang="less">
.c-a {
    color: #aaaaaa;
}
.horizontalMenu {
    background: #ffffff;
    margin-top: 10px;
    .horizontal-scroll-list-wrap {
        .cube-scroll-content {
            display: inline-block;
        }
        .list-wrapper {
            padding: 15px;
            font-size: 14px;
            color: #6d6d6d;
            white-space: nowrap;
        }
        .list-item {
            padding: 0 30px 0 0;
						display: inline-block;
						&:last-child{
							padding-right: 0;
						}
        }
    }
}
</style>