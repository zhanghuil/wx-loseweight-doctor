<template>
    <div>
        <div class="pb30" v-show="planInfo">
            <div class="doctorPanel rel">
                <div class="doctorPanelCon">
                    <div class="panelTop">
                        <img class="txImg" src="../assets/tx1.png" />
                        <div class="txt">
                            <div class="">
                                <span class="f18 mr10">{{
                                    doctorInfo.Name
                                }}</span
                                >医生
                            </div>
                            <div class="mt10">
                                {{ doctorInfo.HosName }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrapper py20 px15">
                <div class="PanelPlan1">
                    <div class="item">
                        <div class="title">阶段减重目标</div>
                        <div class="f16 c-3a b mt10">
                            减掉{{ WeightLossPlan.WeightLossGoals }}kg
                        </div>
                    </div>
                    <div class="item">
                        <div class="lineL rel pl15">
                            <div class="title">减重方案</div>
                            <div class="f16 c-3a b mt10">
                                {{ WeightLossPlan.Name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="WeightLossPlan.TypeCode == 'FastDiet'">
                <!-- 轻断食 -->
                <div class="wrapper p15">
                    <div class="f16 c-3a b">非断食日供给量（日）</div>
                    <div class="PanelPlan2 mt15">
                        <div class="L">
                            <div class="f24 lh24">
                                {{ WeightLossPlan.Energy }}
                            </div>
                            <div class="f12">大卡</div>
                        </div>
                        <div class="R">
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">蛋白质</div>
                                    <div class="f14 c-3a">
                                        {{ WeightLossPlan.Protein }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">脂肪</div>
                                    <div class="f14 c-3a">
                                        {{ WeightLossPlan.Fat }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">碳水化合物</div>
                                    <div class="f14 c-3a">
                                        {{ WeightLossPlan.CHO }}g
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 断食日  EkadeshiEnergy -->
                <div class="wrapper p15">
                    <div class="f16 c-3a b">断食日供给量（日）</div>
                    <div class="PanelPlan2 mt10">
                        <div class="L">
                            <div class="f24 lh24">
                                {{ WeightLossPlan.EkadeshiEnergy }}
                            </div>
                            <div class="f12">大卡</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="wrapper p15">
                    <div class="f16 c-3a b">供给量（日）</div>
                    <div class="PanelPlan2 mt15">
                        <div class="L">
                            <div class="f24 lh24">
                                {{ WeightLossPlan.Energy }}
                            </div>
                            <div class="f12">大卡</div>
                        </div>
                        <div class="R">
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">蛋白质</div>
                                    <div class="f14 c-3a">
                                        {{ WeightLossPlan.Protein }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">脂肪</div>
                                    <div class="f14 c-3a">
                                        {{ WeightLossPlan.Fat }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">碳水化合物</div>
                                    <div class="f14 c-3a">
                                        {{ WeightLossPlan.CHO }}g
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrapper p15">
                <div class="f16 c-3a b">饮食要求</div>
                <div class="notifyDes mt15">
                    <div
                        class="txt"
                        :class="ellState ? 'ellipsis' : 'unellipsis'"
                    >
                        <div>{{ WeightLossPlan.DietRequire }}</div>
                    </div>
                    <span
                        v-if="
                            WeightLossPlan.DietRequire &&
                                WeightLossPlan.DietRequire.length > 20
                        "
                        @click="toggleHandler(1)"
                        class="toggleTxt"
                        ><span class="spaceCon">{{
                            ellState ? '...　　　' : ''
                        }}</span
                        >{{ ellState ? '展开' : '收起' }}</span
                    >
                </div>
            </div>

            <!-- 减重食谱 -->
            <div class="wrapper p15">
                <div class="f16 c-3a b">减重食谱</div>
                <div v-if="WeightLossPlan.TypeCode == 'FastDiet'">
                    <!-- 轻断食 -->
                    <div class="bigRecipesTabs">
                        <div class="bigNavBar">
                            <div
                                v-for="(item, index) in bigRecipesTabs"
                                :key="index"
                                :class="'tab' + index"
                            >
                                <div
                                    class="item"
                                    :class="bigActiveIndex == index ? 'on' : ''"
                                    @click="BigTabClick(index)"
                                >
                                    <div class="weui-navbar__title">
                                        {{ item }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bigTabCon">
                            <!-- 非断食日 -->
                            <div
                                class="weui-tab recipesTabs"
                                v-show="bigActiveIndex == 0"
                            >
                                <cube-scroll
                                    ref="scroll"
                                    :data="DietQuestionnaire.QuestionGroups"
                                    direction="horizontal"
                                    class="horizontal-scroll-list-wrap"
                                >
                                    <div class="list-wrapper">
                                        <div
                                            class="list-item"
                                            v-for="(item,
                                            index) in DietQuestionnaire.QuestionGroups"
                                            :key="index"
                                        >
                                            <div
                                                :class="
                                                    activeIndex == index
                                                        ? 'navbar__itemOn'
                                                        : ''
                                                "
                                                class="navbar__item"
                                                @click="tabClick(index)"
                                            >
                                                {{ item.Name }}
                                            </div>
                                        </div>
                                    </div>
                                </cube-scroll>
                                <div class="tab__panel">
                                    <div
                                        v-for="(item,
                                        idx) in DietQuestionnaire.QuestionGroups"
                                        :key="idx"
                                    >
                                        <div
                                            class="weui-tab__content"
                                            v-show="activeIndex == idx"
                                        >
                                            <div class="f14 c-6d">
                                                {{ item.Description }}
                                            </div>
                                            <div
                                                v-for="(meal,
                                                index) in item.Questions"
                                                :key="index"
                                            >
                                                <div class="df ju-between pt15">
                                                    <div>{{ meal.Name }}</div>
                                                    <div>
                                                        {{
                                                            meal.Precision > 1
                                                                ? meal
                                                                      .QuestionAnswerInfo
                                                                      .DecimalValue
                                                                : meal
                                                                      .QuestionAnswerInfo
                                                                      .IntValue
                                                        }}
                                                        {{ meal.Suffix }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 断食日 -->
                            <div
                                class="weui-tab recipesTabs"
                                v-show="bigActiveIndex == 1"
                            >
                                <cube-scroll
                                    ref="scroll"
                                    :data="DietQuestionnaire.QuestionGroups"
                                    direction="horizontal"
                                    class="horizontal-scroll-list-wrap"
                                >
                                    <div class="list-wrapper">
                                        <div
                                            class="list-item"
                                            v-for="(item,
                                            index) in DietQuestionnaire.QuestionGroups"
                                            :key="index"
                                        >
                                            <div
                                                :class="
                                                    activeIndex == index
                                                        ? 'navbar__itemOn'
                                                        : ''
                                                "
                                                class="navbar__item"
                                                @click="tabClick(index)"
                                            >
                                                {{ item.Name }}
                                            </div>
                                        </div>
                                    </div>
                                </cube-scroll>
                                <div
                                    class="tab__panel"
                                    v-if="planInfo.DietEkadeshQuestionnaire"
                                >
                                    <div
                                        v-for="(item, idx) in planInfo
                                            .DietEkadeshQuestionnaire
                                            .QuestionGroups"
                                        :key="idx"
                                    >
                                        <div
                                            class="weui-tab__content"
                                            v-show="activeIndex == idx"
                                        >
                                            <div class="f14 c-6d">
                                                {{ item.Description }}
                                            </div>
                                            <div
                                                v-for="(meal,
                                                index) in item.Questions"
                                                :key="index"
                                            >
                                                <div class="df ju-between pt15">
                                                    <div>{{ meal.Name }}</div>
                                                    <div>
                                                        {{
                                                            meal.Precision > 1
                                                                ? meal
                                                                      .QuestionAnswerInfo
                                                                      .DecimalValue
                                                                : meal
                                                                      .QuestionAnswerInfo
                                                                      .IntValue
                                                        }}
                                                        {{ meal.Suffix }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <!-- 高蛋白、限能量 -->
                    <div class="weui-tab recipesTabs">
                        <cube-scroll
                            ref="scroll"
                            :data="DietQuestionnaire.QuestionGroups"
                            direction="horizontal"
                            class="horizontal-scroll-list-wrap"
                        >
                            <div class="list-wrapper">
                                <div
                                    class="list-item"
                                    v-for="(item,
                                    index) in DietQuestionnaire.QuestionGroups"
                                    :key="index"
                                >
                                    <div
                                        :class="
                                            activeIndex == index
                                                ? 'navbar__itemOn'
                                                : ''
                                        "
                                        class="navbar__item"
                                        @click="tabClick(index)"
                                    >
                                        {{ item.Name }}
                                    </div>
                                </div>
                            </div>
                        </cube-scroll>
                        <div class="tab__panel">
                            <div
                                v-for="(item,
                                idx) in DietQuestionnaire.QuestionGroups"
                                :key="idx"
                            >
                                <div
                                    class="weui-tab__content"
                                    v-show="activeIndex == idx"
                                >
                                    <div class="f14 c-6d">
                                        {{ item.Description }}
                                    </div>
                                    <div
                                        v-for="(meal, index) in item.Questions"
                                        :key="index"
                                    >
                                        <div class="df ju-between pt15">
                                            <div>{{ meal.Name }}</div>
                                            <div>
                                                {{
                                                    meal.Precision > 1
                                                        ? meal
                                                              .QuestionAnswerInfo
                                                              .DecimalValue
                                                        : meal
                                                              .QuestionAnswerInfo
                                                              .IntValue
                                                }}
                                                {{ meal.Suffix }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 食谱end -->
            </div>

            <div class="wrapper p15">
                <div class="f16 c-3a b">食谱执行说明</div>
                <div class="notifyDes mt15">
                    <div
                        class="txt"
                        :class="ellState2 ? 'ellipsis' : 'unellipsis'"
                    >
                        <div>{{ WeightLossPlan.DietExecExplain }}</div>
                    </div>
                    <span
                        v-if="
                            WeightLossPlan.DietExecExplain &&
                                WeightLossPlan.DietExecExplain.length > 20
                        "
                        @click="toggleHandler(2)"
                        class="toggleTxt"
                        ><span class="spaceCon">{{
                            ellState2 ? '...　　　' : ''
                        }}</span
                        >{{ ellState2 ? '展开' : '收起' }}</span
                    >
                </div>
            </div>
            <div class="wrapper p15" v-show="WeightLossPlan.SportsAdvice">
                <div class="f16 c-3a b">运动建议</div>
                <div class="c-6d f14 mt15 lh21">
                    {{ WeightLossPlan.SportsAdvice }}
                </div>
            </div>

            <div class="wrapper p15" v-if="WeightLossPlan.IsReVisiting">
                <div class="df ju-between">
                    <div class="f16 c-3a b">下次复诊</div>
                    <div class="timeBTn">
                        {{ WeightLossPlan.ReVisitingDate | formatDateStr }}
                    </div>
                </div>
            </div>

            <div
                class="wrapper p15"
                v-if="WeightLossPlan.FollowUpVisitPlan != 0"
            >
                <div class="f16 c-3a b">随访计划</div>
                <div class="c-6d f14 mt15 lh21">
                    {{ WeightLossPlan.FollowUpPlan }}
                </div>
            </div>
        </div>

        <div class="noPlanWrapper" v-show="!planInfo">
            <div class="noPlan">
                <img class="img" src="../assets/empty@2x.png" />
                <div class="f14 c-6d mt10">该方案已被医师撤回</div>
            </div>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
export default {
    name: 'lookPlan',
    data() {
        return {
            doctorInfo: {},
            planInfo: {},
            WeightLossPlan: {},
            SportsQuestionnaire: {},
            DietQuestionnaire: {},

            ellState: true, // 文字是否收起，默认收起
            ellState2: true, // 文字是否收起，默认收起

            activeIndex: 0,
            bigRecipesTabs: ['非断食日', '断食日'],
            bigActiveIndex: 0
        }
    },
    filters: {
        formatDateStr: function(time) {
            if (time != null && time != '') {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            } else {
                return ''
            }
        }
    },
    created() {
        this.getPatientWeightLossPlan()
        this.getDoctorInfoNew()
    },
    methods: {
        //获取减重方案
        getPatientWeightLossPlan() {
            var _this = this
            let url = this.api.userApi.GetPatientWeightLossPlan
            let data = {
                planId: this.$route.query.id
            }
            this.$fetchGet(url, data, 4112).then(response => {
                let result = response.data.data //请求返回数据
                if (result) {
                    _this.planInfo = result
                    _this.DietQuestionnaire = result.DietQuestionnaire
                    _this.SportsQuestionnaire = result.SportsQuestionnaire
                    _this.WeightLossPlan = result.WeightLossPlan
                } else {
                    yktoast(result)
                }
            })
        },
        //获取医生信息
        getDoctorInfoNew() {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.GetDoctorInfoNew
            let data = {
                AccountId: AccountId
            }
            this.$fetchPost(url, data, 150).then(response => {
                let result = response.data.data //请求返回数据
                if (result.status == 0) {
                    console.log(result.data)
                    _this.doctorInfo = result.data
                } else {
                    yktoast(result)
                }
            })
        },
        tabClick: function(e) {
            this.activeIndex = e
        },
        BigTabClick: function(e) {
            this.bigActiveIndex = e
        },
        /**
         * 收起/展开按钮点击事件
         */
        toggleHandler(e) {
            const id = e
            if (id == 1) this.ellState = !this.ellState
            if (id == 2) this.ellState2 = !this.ellState2
        }
    }
}
</script>

<style lang="less">
.wrapper {
    margin: 10px 15px;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
}
.doctorPanel {
    margin: 15px 15px 0;
    background: url(../assets/bg-img3.png) no-repeat center center;
    height: 90px;
    border-radius: 4px;
    box-sizing: border-box;
}

.doctorPanelCon {
    width: 100%;
    height: 90px;
}

.panelTop {
    display: flex;
    align-items: center;
    padding: 14px 15px;
    box-sizing: border-box;
}

.panelTop .txImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #fff;
}

.panelTop .txt {
    color: #ffffff;
    font-size: 14px;
    padding-left: 10px;
}

.doctorPanel2 .bgImg {
    width: 100%;
    height: 90px;
    border-radius: 4px;
}

.doctorPanel2 .doctorPanelCon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
}

.wrapper {
    margin: 10px 15px;
}

.PanelPlan1 {
    display: flex;
    align-items: center;
}

.PanelPlan1 .title {
    font-size: 14px;
    color: #6d6d6d;
    position: relative;
    padding-left: 10px;
}

.PanelPlan1 .title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0px;
    width: 3px;
    height: 14px;
    background: #7362f5;
    border-radius: 1px;
}

.PanelPlan1 .item {
    flex: 1;
}

.PanelPlan1 .item .lineL::before {
    content: '';
    position: absolute;
    top: 0;
    left: -15px;
    width: 1px;
    height: 50px;
    background: #e7e7f1;
}

.PanelPlan2 {
    display: flex;
}

.PanelPlan2 .L {
    background-image: linear-gradient(-41deg, #a1a7f8 0%, #c0c4ff 100%);
    border-radius: 4px;
    border-radius: 4px;
    width: 90px;
    height: 64px;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.PanelPlan2 .R {
    flex: 1;
    padding-left: 25px;
    font-size: 12px;
    color: #aaaaaa;
}

.PanelPlan2 .R .itemList {
    position: relative;
    padding-left: 15px;
    padding: 4px 0 4px 15px;
    display: flex;
    align-items: center;
}

.PanelPlan2 .R .itemList::before {
    content: '';
    position: absolute;
    left: 0;
    top: 7px;
    width: 5px;
    height: 5px;
    background: #9198f7;
    box-shadow: 0 1px 3px 0 rgba(145, 152, 247, 0.4);
    border-radius: 50%;
}

.w90 {
    width: 90px;
}

.timeBTn {
    background: #c0bce2;
    border-radius: 12px;
    font-size: 12px;
    color: #fff;
    padding: 3px 8px;
}

.notifyDes {
    font-size: 14px;
    color: #6d6d6d;
    text-align: justify;
    line-height: 21px;
    padding: 0 0 2px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.notifyDes .txt {
    line-height: 21px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    /*通过以上四行实现收缩功能 */
}

/* 展开收缩 */
.ellipsis {
    -webkit-line-clamp: 2;
}

.unellipsis {
    -webkit-line-clamp: 0;
}

.spaceCon {
    color: #3a3a3a;
    padding-left: 3px;
}

.toggleTxt {
    font-size: 12px;
    color: #7362f5;
    background: #ffffff;
    position: absolute;
    right: 0;
    bottom: 0;
}

.recipesTabs {
    background: #f8f9fa;
    border-radius: 4px;
    padding: 15px 0 15px 15px;
    margin-top: 15px;
}

.recipesTabs .navbar {
}
.horizontal-scroll-list-wrap {
    padding: 10 20px;
    .cube-scroll-content {
        display: inline-block;
        padding: 0;
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
}
.weui-navbar__item {
    padding: 15px 0;
}

.navbar__item {
    position: relative;
    font-size: 14px;
    color: #6d6d6d;
    margin-right: 30px;
    padding: 0px 0 10px;
}

.navbar__itemOn {
    color: #6049f5;
}

.navbar__itemOn::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -8px;
    background: #6049f5;
    border-radius: 2px;
    width: 16px;
    height: 4px;
}

.tab__panel {
    padding: 20px 15px 5px 0;
    font-size: 14px;
    color: #3a3a3a;
    line-height: 14px;
}

.bigRecipesTabs {
    margin-top: 18px;
}

.bigNavBar {
    display: flex;
    .tab0 {
        .item {
            border-radius: 4px 0 0 0;
        }
    }
    .tab1 {
        .item {
            border-radius: 0 4px 0 0;
        }
    }
}

.bigNavBar .item {
    opacity: 0.5;
    background: #9198f7;
    font-size: 14px;
    color: #ffffff;
    width: 86px;
		box-sizing: border-box;
		text-align: center;
    padding: 7px 0 11px 0;
}

// .bigNavBar .item:first-child {
//     border-radius: 4px 0 0 0;
// }

// .bigNavBar .item:last-child {
//     border-radius: 0 4px 0 0;
// }

.bigNavBar .on {
    opacity: 1;
}

.bigTabCon {
    position: relative;
    top: -3px;
}

.bigTabCon .recipesTabs {
    margin-top: 0;
}

.tips .txt {
    display: inline-block;
    background: #c0bce2;
    border-radius: 2px;
    font-size: 12px;
    color: #ffffff;
    padding: 5px 8px;
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

.assistantBox {
    padding: 12px 15px;
    background: #fff;
    border-radius: 0 0 4px 4px;
}

.assistantBox button {
    background: #7362f5;
    border: 16px 0 0 16px;
    width: 60px;
}
</style>