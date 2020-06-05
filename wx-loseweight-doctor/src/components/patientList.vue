<template>
    <div class="wrapperPa">
        <div class="patientPanel">
            <div class="item">
                <div>
                    <img class="txImg" src="../assets/tx1.png" alt="" />
                </div>
                <div>
                    <p class="pb8">
                        <strong>{{ patientInfo.Name }}</strong>
                        <span
                            >{{ patientInfo.Weight }}kg，{{
                                patientInfo.Sex == 0 ? '男' : '女'
                            }}，{{ patientInfo.Age }}岁</span
                        >
                    </p>
                    <p class="time" v-show="patientInfo.DiagnoseDate">
                        首诊：{{ patientInfo.DiagnoseDate | formatDateStr2 }}
                    </p>
                    <p class="time" v-show="patientInfo.ReVisitingDate">
                        计划复诊：{{
                            patientInfo.ReVisitingDate | formatDateStr2
                        }}
                    </p>
                </div>
            </div>
            <div class="infoPanel">
                <div class="item currentPanel" v-show="patientInfo.Weight">
                    <div class="tip">当前</div>
                    <div class="flex-between">
                        <div>
                            <p class="num">{{ patientInfo.Weight }}</p>
                            <p>体重（kg）</p>
                        </div>
                        <div>
                            <p class="num">{{ patientInfo.BMI }}</p>
                            <p>BMI指标</p>
                        </div>
                    </div>
                </div>
                <div class="item" v-show="patientInfo.DiagnoseWeight">
                    <div class="tip">首诊</div>
                    <div class="flex-between">
                        <div>
                            <p class="num">{{ patientInfo.DiagnoseWeight }}</p>
                            <p>体重（kg）</p>
                        </div>
                        <div>
                            <p class="num">{{ patientInfo.DiagnoseBMI }}</p>
                            <p>BMI指标</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 患者组 -->
        <div class="groupPanel" @click="lookPaGroup(patientInfo.PatientGroup)">
            <div class="L">
                <div>
                    <img
                        class="cell_icon"
                        src="../assets/group@2x.png"
                        alt=""
                    />
                </div>
                <div v-if="patientGroup && patientGroup.length == 0">
                    暂无所属患者组
                </div>
                <div v-else class="groupPanelTxt">
                    <span
                        v-for="(g, idx) in patientInfo.PatientGroup"
                        :key="idx"
                        >{{ g.Name }}</span
                    >
                </div>
            </div>
            <div><i class="icon cubeic-arrow"></i></div>
        </div>
        <!-- 体重柱状图 start-->
        <div class="weightChart">
            <div class="infoTit">
                <div class="rel">
                    <div class="title b">体重</div>
                    <div class="bg_img"></div>
                </div>
                <div class="c-a f14">单位：kg</div>
            </div>
            <div class="px15">
                <cube-scroll
                    ref="scroll"
                    :data="weightData"
                    direction="horizontal"
                    class="horizontal-scroll-list-wrap"
                >
                    <ul class="list-wrapper weightScroll">
                        <li
                            v-for="(item, index) in weightData"
                            :key="index"
                            class="list-item"
                            @click="showTap(index)"
                        >
                            <div class="tips" v-show="index == showTipIndex">
                                <div class="arrow2">
                                    <i></i>
                                    <span></span>
                                </div>
                                <div class="tipTxt">
                                    {{ item.CurrentWeight }}
                                </div>
                            </div>
                            <div
                                class="img"
                                :style="{ height: item.heightClass + 'px' }"
                            ></div>
                            <div class="txt">
                                {{ item.RecordDate | formatDateStr }}
                            </div>
                        </li>
                    </ul>
                </cube-scroll>
                <div class="tagTab">
                    <ul>
                        <li
                            class="item"
                            v-for="(item, index) in tagTab"
                            :key="index"
                            :class="item.id == tagTabId ? 'on' : ''"
                            @click="tagTabTap(item.id)"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 体重柱状图 end-->
        <div class="navList">
            <div
                v-for="(item, index) in tabs"
                :key="index"
                class="weui-navbar__item"
                :class="activeIndex == index ? 'on' : ''"
                @click="tabClick(index)"
            >
                <div class="weui-navbar__title">{{ item }}</div>
            </div>
        </div>
        <!-- 评估表 -->
        <div v-show="activeIndex == 0" class="listBox">
            <div class="add">
                <img src="../assets/icon0@2x.png" alt="" />
                医生评估表
            </div>
            <div v-for="(item, index) in infoList" :key="index">
                <div v-if="item.TypeCode == 'SFDJ'">
                    <!-- 随访登记 -->
                    <div
                        class="info"
                        @click="lookInfo('follow', item.FollowUpVisit.ID)"
                    >
                        {{ item.RecordDate | formatDateStr }} 随访登记(患者)
                    </div>
                </div>
                <!-- 首诊登记 -->
                <div v-if="item.TypeCode == 'SZDJ'">
                    <div
                        class="info"
                        @click="lookInfo('first', $route.query.userId)"
                    >
                        {{ item.RecordDate | formatDateStr }} 首诊登记(患者)
                    </div>
                </div>
            </div>
            <!-- 医生评估表 -->
            <div class="rel dn">
                <div class="info">
                    <span>03/20 评估表(医生)</span>
                    <i class="icon iconfont icon-gengduomore10"></i>
                </div>
                <div class="editBoxwrap">
                    <div class="editBox">
                        <div class="arrow">
                            <i></i>
                            <span></span>
                        </div>
                        <ul class="w-100">
                            <li class="editImg">
                                <img src="../assets/edit1@2x.png" alt="" /> 编辑
                            </li>
                            <li class="editImg">
                                <img src="../assets/edit4@2x.png" alt="" /> 删除
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 减重方案 -->
        <div v-show="activeIndex == 1" class="listBox">
            <div class="add" @click="draftPlan">
                <img src="../assets/icon0@2x.png" alt="" />
                制定新的减重方案
            </div>
            <div
                class="wrapper2"
                v-for="(item, index) in planList"
                :key="index"
            >
                <div class="title">
                    <span class="plan"
                        >{{ item.RecordDate | formatDateStr }} 减重方案</span
                    >
                    <span class="state" v-if="item.WeightLossPlan.State == 6"
                        >已撤回</span
                    >
                    <i
                        class="icon iconfont icon-gengduomore10"
                        @click="editBtn(item.WeightLossPlan.ID)"
                    ></i>
                </div>
                <div
                    class="editBoxwrap"
                    v-show="planId == item.WeightLossPlan.ID"
                >
                    <div class="editBox">
                        <div class="arrow">
                            <i></i>
                            <span></span>
                        </div>
                        <ul class="w-100">
                            <li
                                class="editImg"
                                v-if="item.IsModifiable == true"
                                @click="withdrawTap(item.WeightLossPlan.ID)"
                            >
                                <img src="../assets/edit2@2x.png" alt="" /> 撤回
                            </li>
                            <li
                                class="editImg"
                                @click="copyTap(item.WeightLossPlan.ID)"
                            >
                                <img src="../assets/edit3@2x.png" alt="" /> 复制
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="planTxt" @click="lookPlan(item.WeightLossPlan.ID)">
                    <template
                        v-if="item.WeightLossPlan.TypeCode == 'HighProtein'"
                    >
                        <img src="../assets/icon0.png" alt="" />
                    </template>
                    <template
                        v-else-if="item.WeightLossPlan.TypeCode == 'FastDiet'"
                    >
                        <img src="../assets/icon2.png" alt="" />
                    </template>
                    <template
                        v-else-if="
                            item.WeightLossPlan.TypeCode == 'LimitEnergy'
                        "
                    >
                        <img src="../assets/icon3.png" alt="" />
                    </template>

                    <div class="">#{{ item.WeightLossPlan.Name }}#</div>
                </div>
            </div>

            <div class="wrapper2 dn">
                <div class="title">
                    <span class="plan">03/22 减重方案</span>
                    <span class="state">已撤回</span>
                    <i class="icon iconfont icon-gengduomore10"></i>
                </div>
                <div class="editBoxwrap">
                    <div class="editBox">
                        <div class="arrow">
                            <i></i>
                            <span></span>
                        </div>
                        <ul class="w-100">
                            <li class="editImg">
                                <img src="../assets/edit2@2x.png" alt="" /> 撤回
                            </li>
                            <li class="editImg">
                                <img src="../assets/edit3@2x.png" alt="" /> 复制
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="planTxt">
                    <img src="../assets/icon3.png" alt="" />
                    <div class="">#限能量方案#</div>
                </div>
            </div>
        </div>
        <!-- end -->
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
export default {
    name: 'patientList',
    data() {
        return {
            patientInfo: {}, //患者信息
            patientGroup: [], //患者所属组
            formId: '',
            empty: true,
            tabs: ['评估表', '减重方案'],
            activeIndex: 0,

            tagTab: [
                {
                    name: '日',
                    id: 1
                },
                {
                    name: '周',
                    id: 2
                },
                {
                    name: '月',
                    id: 3
                }
            ],
            tagTabId: 1, //默认体重类型  日
            showTipIndex: 0,
            weightData: [], //体重记录
            infoList: [], //评估表
            planList: [], //减重方案
            planId: ''
        }
    },
    filters: {
        formatDateStr: function(time) {
            if (time != null && time != '') {
                var date = new Date(time)
                return formatDate(date, 'MM/dd')
            } else {
                return ''
            }
        },
        formatDateStr2: function(time) {
            if (time != null && time != '') {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            } else {
                return ''
            }
        }
    },
    created() {
        document.title = this.$route.query.userName
        this.getParams()
        this.getJZMZPatient()
        this.getWeightRecordByType()
        this.getRecordedRegistrations()
        this.getWeightLossPlans()
    },
    methods: {
        //操作按钮
        editBtn(id) {
            if (id == this.planId) {
                this.planId = ''
            } else {
                this.planId = id
            }
        },
        //复制减重方案
        copyTap(id) {
            this.$router.push({
                path: '/draftPlan',
                query: { userId: this.$route.query.userId, planId: id }
            })
        },
        //撤回操作提示框
        withdrawTap(id) {
            this.$createDialog({
                type: 'confirm',
                content: '确定要撤回此方案',
                confirmBtn: {
                    text: '撤回',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    this.recallPlan(id)
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        },
        //撤回减重方案
        recallPlan(id) {
            var _this = this
            let url = this.api.userApi.RecallPatientWeightLossPlan
            let data = {
                planId: id
            }
            this.$fetchDelete(url, data, 4109).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                yktoast('撤回成功')
                _this.planId = ''
                _this.getWeightLossPlans()
            })
        },
        getParams() {
            this.userName = this.$route.query.userName
            this.userId = this.$route.query.userId
        },
        //获取患者详情
        getJZMZPatient() {
            var _this = this
            let url = this.api.userApi.GetJZMZPatient
            let data = {
                patientId: this.$route.query.userId
            }
            this.$fetchGet(url, data, 4112).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.patientInfo = result
                _this.patientGroup = result.PatientGroup
            })
        },
        //获取患者体重记录
        getWeightRecordByType() {
            var _this = this
            let url = this.api.userApi.GetWeightRecordByType
            let data = {
                patientId: this.$route.query.userId,
                showType: this.tagTabId
            }
            this.$fetchGet(url, data, 4201).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                result.forEach(element => {
                    element.heightClass = element.CurrentWeight / 2
                })
                _this.weightData = result
            })
        },
        // 获取病人完成的评估表
        getRecordedRegistrations() {
            var _this = this
            let url = this.api.userApi.GetRecordedRegistrations
            let data = {
                patientId: this.$route.query.userId
            }
            this.$fetchGet(url, data, 4105).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.infoList = result
            })
        },
        //获取减重方案列表
        getWeightLossPlans() {
            var _this = this
            let url = this.api.userApi.GetWeightLossPlans
            let data = {
                patientId: this.$route.query.userId
            }
            this.$fetchGet(url, data, 4106).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.planList = result
            })
        },
        lookPaGroup(e) {
            storage.setObjItem('patientGroup', e) //患者所属组
            this.$router.push({
                path: '/patientGroup',
                query: {
                    userName: this.userName,
                    userId: this.$route.query.userId
                }
            })
        },
        showTap(e) {
            this.showTipIndex = e
        },
        //体重切换标签
        tagTabTap(e) {
            this.tagTabId = e
            this.getWeightRecordByType()
        },
        tabClick(e) {
            this.activeIndex = e
        },
        //查看随访 首诊 信息
        lookInfo(type, id) {
            this.$router.push({
                path: '/lookInfo',
                query: { type: type, id: id }
            })
        },
        //查看减重方案
        lookPlan(id) {
            this.$router.push({
                path: '/lookPlan',
                query: { id: id }
            })
        },
        //制定减重方案
        draftPlan(e) {
            this.$router.push({
                path: '/draftPlan',
                query: { userId: this.$route.query.userId }
            })
        }
    }
}
</script>

<style lang="less">
.wrapperPa {
    padding: 15px;
    .patientPanel {
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
        border-radius: 4px;
        padding: 15px;
        .item {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #6d6d6d;
            .txImg {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-right: 15px;
            }
            strong {
                font-size: 16px;
                color: #3a3a3a;
            }
            .time {
                line-height: 15px;
                font-size: 12px;
                color: #aaaaaa;
            }
        }
        .infoPanel {
            display: flex;
            justify-content: space-between;
            .item {
                margin-right: 9px;
                width: 50%;
                position: relative;
                background: #f8f9fa;
                border-radius: 4px;
                padding: 33px 10px 15px;
                font-size: 12px;
                color: #6d6d6d;
                &.currentPanel {
                    background: url(../assets/bg.png) no-repeat center;
                    background-size: 100% 100%;
                    color: #ffffff;
                    .num {
                        color: #ffffff;
                    }
                }
                .tip {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: #b4b5d9;
                    border-radius: 4px;
                    font-size: 12px;
                    color: #ffffff;
                    width: 44px;
                    height: 23px;
                    display: -webkit-box; /*flex弹性布*/
                    -webkit-box-align: center;
                    -webkit-box-pack: center;
                }
                .num {
                    font-size: 22px;
                    color: #3a3a3a;
                    margin-bottom: 5px;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
    .groupPanel {
        margin: 10px 0;
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        position: relative;
        align-items: center;
        font-size: 14px;
        color: #5a5a5a;
        padding: 12px 15px;
        border-bottom: 1px solid #f2f2f2;
        .L {
            display: flex;
            position: relative;
            align-items: center;
            .cell_icon {
                width: 24px;
                height: 24px;
                margin: 0 9px 0 4px;
            }
        }
    }
    .weightChart {
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
        border-radius: 4px;
        .infoTit {
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .title {
            font-size: 16px;
            color: #3a3a3a;
        }
        .bg_img {
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 50px;
            height: 9px;
            background-image: linear-gradient(
                90deg,
                rgba(115, 98, 245, 0.5) 0%,
                rgba(115, 98, 245, 0) 100%
            );
        }
        .horizontal-scroll-list-wrap {
            padding: 10px 15px;
            .cube-scroll-content {
                display: inline-block;
                padding-top: 30px;
            }
            .cube-scroll-list-wrapper {
                overflow: visible;
            }
            .list-wrapper {
                white-space: nowrap;
            }
            .list-item {
                position: relative;
                display: inline-block;
            }
            .weightScroll .navbar {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                width: 100%;
                min-height: 158px;
            }

            .weightScroll .list-item .tips {
                position: absolute;
                z-index: 10;
                width: 34px;
                height: 22px;
                background: #f9f8fd;
                border: 1px solid #e2e2f3;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                top: -35px;
            }

            .weightScroll .list-item .tips .arrow2 {
                position: absolute;
                width: 15px;
                height: 15px;
                bottom: -15px;
                right: 10px;
            }

            .weightScroll .list-item .tips .arrow2 i {
                display: block;
                border-color: #e2e2f3 transparent transparent transparent;
                border-width: 7px;
                position: absolute;
                border-style: solid dashed dashed dashed;
                font-size: 0;
                line-height: 0;
                bottom: 1px;
            }

            .weightScroll .list-item .tips .arrow2 span {
                display: block;
                border-color: #f9f8fd transparent transparent transparent;
                bottom: 2px;
                border-width: 7px;
                position: absolute;
                border-style: solid dashed dashed dashed;
                font-size: 0;
                line-height: 0;
            }

            .weightScroll .list-item .tips .tipTxt {
                font-size: 12px;
                color: #8d89b4;
            }

            .weightScroll .list-item .img {
                width: 8px;
                background: #b4b5d9;
                margin: 0 13px;
                position: relative;
            }

            .weightScroll .list-item .img:before {
                content: '';
                position: absolute;
                left: -13px;
                bottom: 0;
                width: 13px;
                height: 1px;
                background: #f2f2f2;
            }

            .weightScroll .list-item .img:after {
                content: '';
                position: absolute;
                right: -13px;
                bottom: 0;
                width: 13px;
                height: 1px;
                background: #f2f2f2;
            }

            .weightScroll .list-item .txt {
                font-size: 10px;
                color: #aaaaaa;
                padding-top: 4px;
            }
        }
    }
    .tagTab {
        padding: 8px 60px 20px;
        ul {
            display: flex;
            justify-content: space-between;
            margin-right: -20px;
        }
        .item {
            background: #f8f9fa;
            border-radius: 12px;
            font-size: 12px;
            color: #3a3a3a;
            padding: 5px 19px;
            margin-right: 20px;
            &.on {
                background: #7362f5;
                color: #ffffff;
            }
        }
    }
    .navList {
        display: flex;
        margin-top: 25px;
        padding: 0 80px;
        .weui-navbar__item {
            position: relative;
            display: block;
            flex: 1;
            text-align: center;
            padding: 5px 0;
            font-size: 16px;
            color: #aaaaaa;
            font-weight: bold;
        }

        .on:after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            margin-left: -10px;
            width: 20px;
            height: 5px;
            background: #7362f5;
            border-radius: 3px;
        }
        .on .weui-navbar__title {
            font-family: PingFangSC-Medium;
            font-weight: bold;
            font-size: 16px;
            color: #7362f5;
        }
    }
    .listBox {
        margin-top: 30px;
        padding-bottom: 20px;
        .add {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            background: #ffffff;
            box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
            border-radius: 4px;
            padding: 20px 0;
            font-size: 14px;
            color: #3a3a3a;
            margin-bottom: 10px;
            img {
                width: 24px;
                height: 24px;
                margin-right: 5px;
            }
        }
        .info {
            position: relative;
            display: flex;
            justify-content: space-between;
            background: #ffffff;
            box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
            border-radius: 4px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #3a3a3a;
            padding: 15px;
            margin-bottom: 10px;
            .icon {
                color: #3a3a3a;
                font-size: 16px;
            }
        }
        .planTxt {
            font-size: 14px;
            color: #6d6d6d;
            display: flex;
            align-items: center;
            margin-top: 13px;
        }
        .title {
            display: flex;
            align-items: center;
            position: relative;
            .plan {
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #3a3a3a;
            }
            .state {
                margin-left: 10px;
                background: #aaaaaa;
                border-radius: 12px;
                padding: 5px 8px;
                font-size: 12px;
                color: #fff;
            }
            .icon {
                position: absolute;
                right: 0;
                color: #3a3a3a;
                font-size: 16px;
            }
        }
        .editBoxwrap {
            z-index: 10;
            position: absolute;
            right: 25px;
            top: 40px;
            width: 86px;
            min-height: 42px;
            font-size: 16px;
            color: #8d89b4;
            .editBox {
                position: relative;
                width: 100px;
                min-height: 42px;
                background: #ffffff;
                border: 1px solid #e7e7f1;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .arrow {
                position: absolute;
                width: 14px;
                height: 14px;
                top: -14px;
                right: 4px;
            }
            .arrow i {
                display: block;
                border-color: transparent transparent #e7e7f1 transparent;
                border-width: 6px;
                position: absolute;
                border-style: dashed dashed solid dashed;
                font-size: 0;
                line-height: 0;
                bottom: 1px;
            }
            .arrow span {
                display: block;
                border-color: transparent transparent #fff transparent;
                top: 2px;
                border-width: 6px;
                position: absolute;
                border-style: dashed dashed solid dashed;
                font-size: 0;
                line-height: 0;
            }
            .editImg {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 15px;
                color: #3a3a3a;
                padding: 12px 0;
                .icon {
                    font-size: 28px;
                }
                &:nth-child(2) {
                    background: #f9f8fd;
                    border-radius: 0 0 2px 2px;
                }
            }
            .editImg img {
                width: 16px;
                height: 16px;
                margin-right: 6px;
                display: inline-block;
                vertical-align: top;
                margin-top: 2px;
            }
        }
        .planTxt img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
    }
}
.groupPanelTxt {
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    span {
        position: relative;
        &::after {
            content: '/';
            font-weight: bold;
        }
        &:last-child::after {
            content: '';
        }
    }
}
</style>