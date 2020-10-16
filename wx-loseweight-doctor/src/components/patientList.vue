<template>
    <div>
        <div class="wrapperPa" v-if="patientInfo">
            <div class="patientPanel">
                <div class="item">
                    <div>
                        <img
                            class="txImg"
                            :src="patientInfo.AvatarUrl"
                            @error="imgError()"
                        />
                    </div>
                    <div class="flex1 rel">
                        <div class="editPBox">
                            <div @click="moreTap">
                                <i class="icon iconfont icon-gengduomore10"></i>
                            </div>
                            <div class="editPTxt" v-show="stopIconState">
                                <div class="arrow">
                                    <i></i>
                                    <span></span>
                                </div>
                                <!-- 0 服务中 10取消服务 -->
                                <div
                                    class="px12 py8"
                                    @click="
                                        serverStateTap(
                                            patientInfo.JZServerState
                                        )
                                    "
                                >
                                    <template
                                        v-if="patientInfo.JZServerState == 0"
                                        >终止门诊</template
                                    >
                                    <template v-else>取消终止</template>
                                </div>
                            </div>
                        </div>
                        <p class="pb8 infoBox">
                            <strong @click="editNameTap(patientInfo.Name)">{{
                                patientInfo.Name
                            }}</strong>
                            <span
                                @click="editNameTap(patientInfo.Name)"
                                class="iconfont icon-bianji1"
                            ></span>
                            <span class="pl5"
                                >{{ patientInfo.Weight }}kg，{{
                                    patientInfo.Sex == 0 ? '男' : '女'
                                }}，{{ patientInfo.Age }}</span
                            >
                        </p>
                        <p class="time" v-show="patientInfo.DiagnoseDate">
                            首诊：{{
                                patientInfo.DiagnoseDate | formatDateStr2
                            }}
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
                    <!-- v-show="patientInfo.DiagnoseWeight" -->
                    <div class="item">
                        <div class="tip">首诊</div>
                        <div class="flex-between">
                            <div>
                                <p class="num">
                                    {{ patientInfo.DiagnoseWeight || '-' }}
                                </p>
                                <p>体重（kg）</p>
                            </div>
                            <div>
                                <p class="num">
                                    {{ patientInfo.DiagnoseBMI || '-' }}
                                </p>
                                <p>BMI指标</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 患者组 -->
            <div
                class="groupPanel"
                @click="lookPaGroup(patientInfo.PatientGroup)"
            >
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
            <!-- 复诊随访日期设置 -->
            <div class="patientPanel mb10" v-if="patientInfo.JZServerState == 0">
                <div class="infoPanel datePanel">
                    <div class="item currentPanel">
                        <div class="tip">下次复诊</div>
                        <div
                            class="flex-center"
                            v-if="!nextReVisitingDate"
                            @click="setTimeTap('FZ')"
                        >
                            <span class="setUpBtn">设置</span>
                        </div>
                        <div
                            class="editDateBox"
                            v-else
                            @click="setTimeTap('FZ')"
                        >
                            <span class="f16">{{ nextReVisitingDate }}</span>
                            <span class="iconfont icon-bianji1"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="tip">下次随访</div>
                        <div
                            class="flex-center"
                            v-if="!nextFollowUpVisitDate"
                            @click="setTimeTap('SF')"
                        >
                            <span class="setUpBtn">设置</span>
                        </div>
                        <div
                            class="editDateBox"
                            v-else
                            @click="setTimeTap('SF')"
                        >
                            <span class="f16">{{ nextFollowUpVisitDate }}</span>
                            <span class="iconfont icon-bianji1"></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 体重柱状图 start-->
            <div class="weightChart" v-if="weightData">
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
                        :options="options"
                        direction="horizontal"
                        class="horizontal-scroll-list-wrap"
                    >
                        <ul class="list-wrapper weightScroll" id="weightScroll">
                            <li
                                v-for="(item, index) in weightData"
                                :key="index"
                                class="list-item"
                                @click="showTap(index)"
                            >
                                <!-- v-show="index == showTipIndex" -->
                                <div class="tips">
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
                <div class="add" @click="doctorForm">
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
                    <div v-else-if="item.TypeCode == 'SZDJ'">
                        <div
                            class="info"
                            @click="lookInfo('first', $route.query.userId)"
                        >
                            {{ item.RecordDate | formatDateStr }} 首诊登记(患者)
                        </div>
                    </div>
                    <!-- 医生评估表 -->
                    <div class="rel" v-else-if="item.TypeCode == 'PGB'">
                        <div class="info">
                            <span
                                >{{
                                    item.RecordDate | formatDateStr
                                }}
                                评估表(医生)</span
                            >
                            <i
                                class="icon iconfont icon-gengduomore10"
                                @click="assessEditBtn(item.DoctorAssess.ID)"
                            ></i>
                        </div>
                        <div
                            class="editBoxwrap"
                            v-show="assessId == item.DoctorAssess.ID"
                        >
                            <div class="editBox">
                                <div class="arrow">
                                    <i></i>
                                    <span></span>
                                </div>
                                <ul class="w-100">
                                    <li
                                        class="editImg"
                                        @click="
                                            editAssessTap(item.DoctorAssess.ID)
                                        "
                                    >
                                        <img
                                            src="../assets/edit1@2x.png"
                                            alt=""
                                        />
                                        编辑
                                    </li>
                                    <li
                                        class="editImg"
                                        @click="
                                            deleteAssessTap(
                                                item.DoctorAssess.ID
                                            )
                                        "
                                    >
                                        <img
                                            src="../assets/edit4@2x.png"
                                            alt=""
                                        />
                                        删除
                                    </li>
                                </ul>
                            </div>
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
                            >{{
                                item.RecordDate | formatDateStr
                            }}
                            减重方案</span
                        >
                        <span
                            class="state"
                            v-if="item.WeightLossPlan.State == 6"
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
                                    <img src="../assets/edit2@2x.png" alt="" />
                                    撤回
                                </li>
                                <li
                                    class="editImg"
                                    @click="copyTap(item.WeightLossPlan.ID)"
                                >
                                    <img src="../assets/edit3@2x.png" alt="" />
                                    复制
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        class="planTxt"
                        @click="lookPlan(item.WeightLossPlan.ID)"
                    >
                        <template
                            v-if="item.WeightLossPlan.TypeCode == 'HighProtein'"
                        >
                            <img src="../assets/icon0.png" alt="" />
                        </template>
                        <template
                            v-else-if="
                                item.WeightLossPlan.TypeCode == 'FastDiet'
                            "
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
                                    <img src="../assets/edit2@2x.png" alt="" />
                                    撤回
                                </li>
                                <li class="editImg">
                                    <img src="../assets/edit3@2x.png" alt="" />
                                    复制
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

        <div class="noPlanWrapper" v-else>
            <div class="noPlan">
                <img class="img" src="../assets/empty@2x.png" />
                <div class="f14 c-6d mt10">您已无权查看该患者信息</div>
            </div>
        </div>
        <selfModal
            v-model="showModal"
            type="prompt"
            title="患者称呼"
            @cancel="clickCancel()"
            @confirm="clickConfirm()"
        >
            <div class="content">
                <div class="cu-input">
                    <input
                        v-model="nameVal"
                        type="text"
                        placeholder="请输入"
                        class="cube-input-field"
                    />
                </div>
            </div>
        </selfModal>
    </div>
</template>

<script>
import selfModal from '@/components/public/selfModal'
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
import qs from 'qs'
export default {
    name: 'patientList',
    components: { selfModal },
    data() {
        return {
            stopIconState: false, //终止门诊框
            nameVal: '', //患者姓名
            showModal: false, //模态框
            errorImg0: require('@/assets/tx1.png'),
            errorImg1: require('@/assets/tx2.png'),
            patientInfo: {}, //患者信息
            patientGroup: [], //患者所属组
            patientGroupDoctorID: '',
            formId: '',
            empty: true,
            tabs: ['评估表', '减重方案'],
            activeIndex: 0,
            startX: 0,
            scrollToTime: 700,
            scrollToEasing: 'bounce',
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
            planId: '',
            assessId: '',
            nextFollowUpVisitDate: '', //下次随访日期
            nextReVisitingDate: '', //下次复诊日期
            followUpVisitPlan: '' // 随诊周期
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
    computed: {
        reverseWeight() {
            return this.weightData.reverse()
        }
    },
    created() {
        let typeIndex = storage.getItem('index')
        if (typeIndex) {
            this.activeIndex = typeIndex
            storage.setItem('index', '')
        }
        let planType = storage.getItem('planType')
        if (planType) {
            this.activeIndex = planType
            storage.setItem('planType', '')
        }

        document.title = this.$route.query.userName
        this.getParams()
        this.getJZMZPatient()
        this.getWeightRecordByType()
        this.getRecordedRegistrations()
        this.getWeightLossPlans()
        this.getWeightLossSchedule()
    },
    computed: {
        options() {
            return {
                eventPassthrough: 'vertical',
                startX: this.startX
            }
        }
    },
    watch: {
        startX() {
            this.rebuildScroll()
        }
    },
    beforeRouteLeave(to, from, next) {
        if (from.name == 'patientList') {
            to.meta.isBack = true
        }
        next()
    },
    methods: {
        //增加“终止门诊”功能
        moreTap() {
            this.stopIconState = !this.stopIconState
        },
        // 0 服务中 10取消服务
        serverStateTap(e) {
            if (e == 0) this.stopTap(e)
            else this.cancelStopTap(e)
        },
        //设置减重服务状态
        setJZServerState(e) {
            var _this = this
            let url = this.api.userApi.SetJZServerState
            let patientId = this.$route.query.userId
            let _value = e == 0 ? 10 : 0
            let data = {
                Value: _value
            }
            this.$fetchPut(
                `${url}?patientId=${patientId}`,
                qs.stringify(data),
                4115
            ).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('设置失败')
                    return
                }
                yktoast('设置成功')
                _this.getJZMZPatient()
            })
        },
        stopTap(e) {
            this.moreTap()
            this.$createDialog({
                type: 'confirm',
                title: '确定要终止门诊吗？',
                content:
                    '终止后系统将停止对该患者推送复诊、随诊、减重打卡等提醒！',
                confirmBtn: {
                    text: '确定',
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
                    console.log('点击确认按钮')
                    this.setJZServerState(e)
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        },
        //取消终止
        cancelStopTap(e) {
            this.moreTap()
            this.$createDialog({
                type: 'confirm',
                content: '确定要取消终止吗？',
                confirmBtn: {
                    text: '确定',
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
                    console.log('点击确认按钮')
                    this.setJZServerState(e)
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        },
        clickCancel() {
            console.log('点击了取消')
        },
        clickConfirm() {
            console.log('点击了confirm')
            if (!this.nameVal) {
                this.$createToast({
                    txt: '姓名不能为空',
                    type: 'txt'
                }).show()
                return
            }
            this.updateInfoByDoctor(this.nameVal)
        },
        //修改患者姓名弹框
        editNameTap(val) {
            this.showModal = true
            this.nameVal = val
            return
            var _this = this
            this.$createDialog({
                type: 'prompt',
                title: '修改患者称呼',
                prompt: {
                    value: val,
                    placeholder: '请输入'
                },
                onConfirm: (e, promptValue) => {
                    console.log(`患者名称：${promptValue}`)
                    if (!promptValue) {
                        _this
                            .$createToast({
                                txt: '姓名不能为空',
                                type: 'txt'
                            })
                            .show()
                        return
                    }
                    _this.updateInfoByDoctor(promptValue)
                },
                onCancel: (e, promptValue) => {
                    console.log('点击了取消按钮')
                }
            }).show()
        },
        //修改患者姓名
        updateInfoByDoctor(name) {
            var _this = this
            let url = this.api.userApi.UpdateInfoByDoctor
            let patientId = this.$route.query.userId
            let data = {
                Name: name
            }
            this.$fetchPut(
                `${url}?patientId=${patientId}`,
                qs.stringify(data),
                4114
            ).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('修改失败')
                    return
                }
                yktoast('修改成功')
                _this.getJZMZPatient()
            })
        },
        imgError() {
            let img = event.srcElement
            img.src = this.errorImg0
            img.onerror = null //防止闪图
        },
        //医生评估表
        doctorForm() {
            // yktoast('努力开发中...')
            this.$router.push({
                path: '/doctorEvalForm',
                query: { userId: this.$route.query.userId }
            })
        },
        //医生评估表操作按钮
        assessEditBtn(id) {
            if (id == this.assessId) {
                this.assessId = ''
            } else {
                this.assessId = id
            }
        },
        //编辑医生评估表
        editAssessTap(id) {
            this.$router.push({
                path: '/doctorEvalForm',
                query: { userId: this.$route.query.userId, doctorAssessId: id }
            })
        },
        //删除医生评估表提示框
        deleteAssessTap(id) {
            this.$createDialog({
                type: 'confirm',
                content: '是否确定删除',
                confirmBtn: {
                    text: '确定',
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
                    this.deleteAssess(id)
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        },
        // 删除医生评估表
        deleteAssess(id) {
            var _this = this
            let url = this.api.userApi.DeleteDoctorAssess
            let data = {
                assessId: id
            }
            this.$fetchDelete(url, data, 4112).then(response => {
                let result = response.data.data //请求返回数据
                if (result.State != 0) {
                    yktoast(result.Msg)
                    _this.assessId = ''
                    return
                }
                yktoast(result.Msg)
                _this.assessId = ''
                _this.getRecordedRegistrations()
            })
        },
        //减重方案操作按钮
        editBtn(id) {
            if (id == this.planId) {
                this.planId = ''
            } else {
                this.planId = id
            }
        },
        //复制减重方案
        copyTap(id) {
            this.$createDialog({
                type: 'confirm',
                content: '确定要复制此方案',
                confirmBtn: {
                    text: '复制',
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
                    this.copyPlan(id)
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        },
        copyPlan(id) {
            this.$router.push({
                path: '/draftPlan',
                query: { userId: this.$route.query.userId, planId: id }
            })
        },
        //获取患者减重计划
        getWeightLossSchedule() {
            var _this = this
            let url = this.api.userApi.GetWeightLossSchedule
            let data = {
                patientId: this.$route.query.userId
            }
            this.$fetchGet(url, data, 4114).then(response => {
                let result = response.data.data //请求返回数据
                //下次随访日期
                if (!result.NextFollowUpVisitDate)
                    _this.nextFollowUpVisitDate = ''
                else
                    _this.nextFollowUpVisitDate = formatDate(
                        new Date(result.NextFollowUpVisitDate),
                        'yyyy-MM-dd'
                    )
                _this.followUpVisitPlan = result.FollowUpVisitPlan //随诊周期
                //下次复诊日期
                if (!result.NextReVisitingDate) _this.nextReVisitingDate = ''
                else
                    _this.nextReVisitingDate = formatDate(
                        new Date(result.NextReVisitingDate),
                        'yyyy-MM-dd'
                    )
            })
        },
        //设置复诊随访时间
        setTimeTap(type) {
            let fxdata = {
                followUpVisitPlan: this.followUpVisitPlan,
                nextReVisitingDate: this.nextReVisitingDate,
                userId: this.$route.query.userId
            }
            this.$router.push({
                path: '/setTime',
                query: {
                    type: type,
                    fxdata: JSON.stringify(fxdata)
                }
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
                if (result.State != 0) {
                    yktoast(result.Msg)
                    return
                }
                yktoast(result.Msg)
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
                    yktoast('您已无权查看该患者信息')
                    _this.patientInfo = null
                    return
                }
                _this.patientInfo = result
                _this.patientGroup = result.PatientGroup
                _this.patientGroupDoctorID = result.DoctorID
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

                _this.weightData = result.reverse()
                this.$nextTick(() => {
                    //todo  横向滑动到最右侧
                    // _this.setWeightStartX(result)
                })
            })
        },
        scrollTo() {
            this.$refs.scroll.scrollTo(this.startX, 0)
        },
        rebuildScroll() {
            this.$nextTick(() => {
                this.$refs.scroll.destroy()
                this.$refs.scroll.initScroll()
                // this.scrollTo()
                this.$refs.scroll.refresh()
            })
        },
        setWeightStartX() {
            var container = this.$el.querySelector('#weightScroll')
            console.log(container.scrollWidth)
            this.startX = -parseFloat(container.scrollWidth + 15)
            console.log(`获取的值：${this.startX}`)
            // this.$refs.scroll.destroy()
            // this.$refs.scroll.initScroll()
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
                    userId: this.$route.query.userId,
                    doctorId: this.patientGroupDoctorID
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
            storage.setItem('planType', this.activeIndex)
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
            .editPBox {
                text-align: right;
                position: absolute;
                right: 5px;
                .icon {
                    font-size: 16px;
                }
                .editPTxt {
										top: 7px;
										right: -3px;
                    border: 1px solid #e7e7f1;
                    box-shadow: 0 2px 6px 0 rgba(120, 122, 167, 0.21);
                    border-radius: 2px;
                    background: #fff;
                    color: #3a3a3a;
                    font-size: 14px;
                    position: relative;
                    .px12 {
                        padding-left: 12px;
                        padding-right: 12px;
                    }
                    .py8 {
                        padding-top: 8px;
                        padding-bottom: 8px;
                    }
                    .arrow {
                        position: absolute;
                        width: 14px;
                        height: 14px;
                        top: -14px;
                        right: 2px;
                    }
                    .arrow i {
                        display: block;
                        border-color: transparent transparent #e7e7f1
                            transparent;
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
                }
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
        .datePanel {
            .item {
                margin-bottom: 0;
                padding: 33px 10px 10px;
                .tip {
                    width: auto;
                    padding: 0 6px;
                }
                .flex-center {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .setUpBtn {
                    background: #b4b5d9;
                    border-radius: 4px;
                    font-size: 12px;
                    color: #ffffff;
                    padding: 5px 10px;
                }
                .editDateBox {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .iconfont {
                        font-size: 18px;
                        margin-left: 6px;
                    }
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
                right: 7px;
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
                margin: 0 16px;
                position: relative;
            }

            .weightScroll .list-item .img:before {
                content: '';
                position: absolute;
                left: -16px;
                bottom: 0;
                width: 16px;
                height: 1px;
                background: #f2f2f2;
            }

            .weightScroll .list-item .img:after {
                content: '';
                position: absolute;
                right: -16px;
                bottom: 0;
                width: 16px;
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
		height: 24px;
		line-height: 24px;
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
.noPlanWrapper {
    position: absolute;
    display: table;
    width: 100%;
    height: 100%;
}
.noPlan {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 138px;
    height: 127px;
}
.noPlan .img {
    width: 128px;
    height: 100px;
}
.pl5 {
    padding-left: 5px;
}
.infoBox {
		width: 85%;
    .iconfont {
        font-size: 17px;
        vertical-align: middle;
    }
}
.flex1 {
    flex: 1;
}
</style>