<template>
    <div>
        <ul class="p15">
            <!-- 复诊 -->
            <li class="wrapper2" v-show="type == 'FZ'">
                <checkbox
                    :options="isReVisitingOptions"
                    :selectArr="isReVisitingSelArr"
                    name="下次复诊"
                    @toparents="childByValueCheckR"
                    ref="validIsCheckR"
                ></checkbox>
                <div
                    v-show="reVisitTime"
                    class="yk_wx_cell yk-wx-cell2"
                    @click="showDateFollow"
                >
                    <div class="cell_bd flex-center rel">
                        <!-- <i
                            v-show="followDateError"
                            class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon6"
                        ></i> -->
                        <div>
                            <img
                                src="../assets/time@2x.png"
                                class="img"
                                alt=""
                            />
                        </div>
                        <div class="ml10 f14">复诊时间</div>
                    </div>
                    <div class="cell_ft">
                        <span class="mr10">{{ followDate }}</span>
                        <i class="icon cubeic-arrow"></i>
                    </div>
                </div>
            </li>
            <!-- 随访 -->
            <li class="wrapper2" v-show="type == 'SF'">
                <checkbox
                    :options="followOptions"
                    :selectArr="followSelectArr"
                    name="随访计划"
                    @toparents="childByValueCheckF"
                    ref="validIsCheckF"
                ></checkbox>
            </li>
        </ul>
        <div class="footerEditPlan fix">
            <button class="yk-btn" @click="submitTap">确定</button>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import checkbox from '@/components/public/checkbox'
import qs from 'qs'
export default {
    name: 'setTime',
    components: { checkbox },
    data() {
        return {
            isReVisitingOptions: [
                //下次复诊
                {
                    Name: '不需要',
                    value: false
                },
                {
                    Name: '需要',
                    value: true
                }
            ],
            followDate: '请选择', //复诊时间
            followDateError: false,
            isReVisitingSelArr: [], //选中的
            IsReVisiting: false, //是否需要复诊
            reVisitTime: false, //复诊时间选择框默认隐藏
            followOptions: [
                //随访计划
                {
                    Name: '不需要',
                    value: '-1'
                },
                {
                    Name: '每周',
                    value: '7'
                },
                {
                    Name: '每月',
                    value: '30'
                },
                {
                    Name: '每两月',
                    value: '60'
                },
                {
                    Name: '每季度',
                    value: '90'
                }
            ],
            followSelectArr: [], //选中的
            FollowUpVisitPlan: '', //随访周期计划 = ['0', '7', '14', '30', '90', '180', '360', '-1'],
            fxdata: '', //接收参数
            type: ''
        }
    },
    created() {
        let type = this.$route.query.type
        this.type = type
        if (type == 'SF') document.title = '随访'
        else document.title = '复诊'
        let fxdata = eval('(' + this.$route.query.fxdata + ')') //把传过来的字符串转为对象操作
        this.fxdata = fxdata
        console.log(fxdata)
        this.setDefault()
    },
    methods: {
        submitTap() {
            console.log('点击完成提交')
            //复诊与随访 校验必填项  SetReVisitingDate  SetFollowUpVisitDate
            let isCheck = this.$refs.validIsCheckR.validIsCheck()
            if (this.type == 'FZ') {
                //1、下次复诊
                if (!isCheck) {
                    yktoast('请选择复诊')
                    return
                }
                if (
                    this.IsReVisiting &&
                    (this.followDate == '' || this.followDate == '请选择')
                ) {
                    //需要下次复诊
                    yktoast('请选择复诊时间')
                    return
                }
                this.setReVisitingDate()
            } else {
                //2、随访计划
                isCheck = this.$refs.validIsCheckF.validIsCheck()
                if (!isCheck) {
                    yktoast('请选择随访计划')
                    return
                }
                this.setFollowUpVisitDate()
            }
        },
        //设置随访周期
        setFollowUpVisitDate() {
            var _this = this
            let url = this.api.userApi.SetFollowUpVisitDate
            let patientId = this.fxdata.userId
            let data = {
                value: this.FollowUpVisitPlan
            }
            this.$fetchPut(
                `${url}?patientId=${patientId}`,
                qs.stringify(data),
                4116
            ).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('修改失败')
                    return
                }
                yktoast('修改成功')
                _this.$router.go(-1)
            })
        },
        //设置下次复诊时间
        setReVisitingDate() {
            var _this = this
            let url = this.api.userApi.SetReVisitingDate
            let patientId = this.fxdata.userId
            let _followDate = this.IsReVisiting ? this.followDate : ''
            let data = {
                value: _followDate
            }
            this.$fetchPut(
                `${url}?patientId=${patientId}`,
                qs.stringify(data),
                4115
            ).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('修改失败')
                    return
                }
                yktoast('修改成功')
                _this.$router.go(-1)
            })
        },
        //设置默认值
        setDefault() {
            if (this.type == 'SF') {
                //随访计划
                let _followUpVisitPlan = this.fxdata.followUpVisitPlan
                if (!_followUpVisitPlan || _followUpVisitPlan == 0)
                    _followUpVisitPlan = -1
                this.followSelectArr = this.followOptions.filter(
                    n => n.value == _followUpVisitPlan
                )
                this.FollowUpVisitPlan = this.fxdata.followUpVisitPlan
            } else {
                //下次复诊
                // if (!this.fxdata.nextReVisitingDate) return
                let _IsReVisiting = this.fxdata.nextReVisitingDate
                    ? true
                    : false
                this.isReVisitingSelArr = this.isReVisitingOptions.filter(
                    n => n.value == _IsReVisiting
                )
                if (this.isReVisitingSelArr[0].value == true) {
                    //需要复诊 显示复诊时间
                    this.reVisitTime = true
                    this.followDate = this.fxdata.nextReVisitingDate
                }
                this.IsReVisiting = _IsReVisiting
            }
        },
        //复诊
        childByValueCheckR(childValue) {
            console.log(childValue)
            let val = childValue[0].value
            if (val) {
                this.reVisitTime = true
                if (this.followDate && this.followDate != '请选择')
                    this.followDateError = false
            } else {
                this.reVisitTime = false
                this.followDate = ''
                this.followDateError = false
            }
            this.IsReVisiting = val
            console.log(`是否需要复诊：${val}`)
        },
        //随访计划 单选
        childByValueCheckF(childValue) {
            console.log(childValue)
            this.FollowUpVisitPlan = childValue[0].value
            console.log(`随访计划：${this.FollowUpVisitPlan}`)
        },
        //复诊时间
        showDateFollow() {
            // debugger
            if (!this.datePickerFollow) {
                var _value
                if (this.followDate == '' || this.followDate == '请选择')
                    _value = new Date()
                else _value = new Date(this.followDate.replace(/-/g, '/'))
                // 当前日期 + 3年
                var curDate = new Date()
                curDate.setFullYear(curDate.getFullYear() + 3)
                curDate.setDate(curDate.getDate() - 1)
                console.log(curDate)
                this.datePickerFollow = this.$createDatePicker({
                    title: '选择复诊时间',
                    // min: new Date(2008, 7, 8),
                    max: new Date(curDate),
                    value: _value,
                    onSelect: this.selectHandleF,
                    onCancel: this.cancelHandleF
                })
            }
            this.datePickerFollow.show()
        },
        selectHandleF(date, selectedVal, selectedText) {
            this.followDate = selectedText.join('-')
            this.followDateError = false
            console.log(`复诊时间：${this.followDate}`)
        },
        cancelHandleF() {
            console.log('点击了取消')
        }
    }
}
</script>

<style lang="less">
.tipsIcon {
    color: #fc7a56;
    position: absolute;
    font-size: 12px;
    left: -13px;
    top: 2px;
}
.yk-wx-cell2 {
    margin-top: 19px;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    color: #3a3a3a;
}
.footerEditPlan {
    z-index: 10;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e7e7f1;
    background-color: #ffffff;
    padding: 12px 18px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .yk-btn {
        flex: 1;
        border: none;
        background: #6049f5;
        border-radius: 27px;
        border-radius: 27px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 16px;
        padding: 15px 0;
        font-weight: normal;
        box-sizing: border-box;
    }
    .yk-btn-def {
        flex: 1;
        font-size: 16px;
        color: #aaaaaa;
        background: none;
        border: none;
    }
}
.fix {
    position: fixed;
}
</style>