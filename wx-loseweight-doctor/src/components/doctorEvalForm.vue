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
                        <div
                            class="navbar__item"
                            :class="activeVal == item ? 'on' : ''"
                            @click="tabClick(item)"
                        >
                            {{ item }}
                        </div>
                    </li>
                </ul>
            </cube-scroll>
        </div>
        <!-- 评估表 start -->
        <div>
            <div class="formTitle">体格检查</div>
            <div class="formCon">
                <ol>
                    <li>
                        <div class="wrap">
                            <div class="f16 c-3a">目前身高</div>
                            <div class="pr10">
                                <input
                                    @input="checkInput()"
                                    type="tel"
                                    placeholder="请输入"
                                />
                                <span class="f16 c-6d">cm</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrap">
                            <div class="f16 c-3a">BMI</div>
                            <div class="pr10">
                                <span class="f16 c-6d">-</span>
                                <span class="f16 c-fb">42</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrap">
                            <div class="f16 c-3a">下肢水肿</div>
                            <div class="cell_ft pr10">
                                <span
                                    class="mr10 f16"
                                    :class="planDate == '请选择' ? 'c-a' : ''"
                                    >{{ planDate }}</span
                                >
                                <i class="icon cubeic-arrow f16"></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrap">
                            <div class="f16 c-3a">BMI</div>
                            <div class="pr10">
                                <span class="f16 c-6d">-</span>
                                <span class="f16 c-fb">42</span>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
        <!-- 评估表 end -->
        <div class="footerEdit">
            <button class="yk-btn">保存</button>
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
            items: [
                '体格',
                '实验室检查',
                '胰岛功能',
                'RMR',
                '影像学',
                '体成分'
            ],
            activeVal: '体格'
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
        },
        tabClick(e) {
            this.activeVal = e
        }
    }
}
</script>
<style lang="less">
input::placeholder {
    color: #aaaaaa;
    font-size: 16px;
}
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

            &:last-child {
                padding-right: 0;
            }
            .navbar__item {
                position: relative;
                &.on:after {
                    content: '';
                    position: absolute;
                    bottom: -9px;
                    left: 50%;
                    margin-left: -7px;
                    background: #6049f5;
                    border-radius: 2.5px;
                    width: 15px;
                    height: 4px;
                }
            }
        }
    }
}
.formTitle {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #aaaaaa;
    line-height: 12px;
    padding: 6px 15px 7px;
}
.formCon {
    background: #ffffff;
    padding-left: 15px;
    ol {
        li {
            border-bottom: 1px solid #f2f2f2;
            padding: 16px 0;
            &:last-child {
                border: none;
            }
            .wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
                input {
                    background: none;
                    width: 80px;
                    font-size: 16px;
                    color: #3a3a3a;
                    text-align: right;
                    margin-right: 7px;
                }
            }
            .desc {
                font-size: 12px;
                color: #aaaaaa;
                margin-top: 10px;
            }
        }
    }
}
</style>