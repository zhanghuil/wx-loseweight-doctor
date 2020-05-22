<template>
    <div>
        <div class="weui-navbar">
            <div
                v-for="(item, index) in navTabs"
                :key="index"
                class="weui-navbar__item"
                :class="activeIndex == index ? 'on' : ''"
                @click="tabClick(index)"
            >
                <div class="weui-navbar__title">{{ item }}</div>
            </div>
        </div>
        <div class="weui-tab__panel">
            <div v-for="(page, idx) in questionGroups" :key="idx">
                <div class="weui-tab__content" v-show="activeIndex == idx">
                    <div v-for="(item, index) in page.Questions" :key="index">
                        <div v-if="item.SignCode == 'CurrentBMI'">
                            <!-- BMI start -->
                            <div class="wrapper p15">
                                <div class="rel">
                                    <div class="title b">BMI指标</div>
                                    <div class="bg_img"></div>
                                </div>
                                <div class="mt30">
                                    <div
                                        class="scoreVal rel"
                                        :style="{ left: leftStyle + 'px' }"
                                    >
                                        <span class="value">{{
                                            scoreBMI
                                        }}</span>
                                        <i
                                            :style="{ color: colorStyle }"
                                            class="icon iconfont icon-sanjiaojiantoushang"
                                        >
                                        </i>
                                    </div>
                                </div>
                                <div class="scoreProgress">
                                    <div
                                        class="progressList"
                                        v-for="(it, index) in progressList"
                                        :key="index"
                                    >
                                        <div class="itemList">
                                            <div
                                                v-for="(item, index) in it.grid"
                                                :key="index"
                                                class="item"
                                                :style="{
                                                    background: it.color
                                                }"
                                            ></div>
                                        </div>
                                        <div class="tit">{{ it.title }}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- BMI end -->
                        </div>
                        <div v-else>
                            <div class="wrapper py15 px15">
                                <div class="rel">
                                    <div class="title b">{{ item.Name }}</div>
                                    <div class="bg_img"></div>
                                </div>
                                <div v-if="item.SignCode == 'CurrentHeight'">
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo.IntValue
                                            }}
                                            cm</span
                                        >
                                    </div>
                                </div>
                                <div
                                    v-else-if="
                                        item.SignCode == 'CurrentWeight' ||
                                            item.SignCode == 'WishWeight'
                                    "
                                >
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo
                                                    .DecimalValue
                                            }}
                                            kg</span
                                        >
                                    </div>
                                </div>
                                <div
                                    v-else-if="
                                        item.TypeCode == 'SingleSelect' ||
                                            item.TypeCode == 'MultipleSelect'
                                    "
                                >
                                    <div class="txt">
                                        <span
                                            v-for="(n,
                                            index) in item.QuestionOptions"
                                            :key="index"
                                        >
                                            <template v-if="n.checked == true">
                                                <span class="pr20">{{
                                                    n.Name
                                                }}</span>
                                            </template>
                                        </span>
                                    </div>
                                    <!-- tools.splitStr() -->
                                </div>
                                <div
                                    v-else-if="
                                        item.TypeCode == 'SingleSelectText'
                                    "
                                >
                                    <div class="txt">
                                        <div
                                            v-for="(n,
                                            index) in item.QuestionOptions"
                                            :key="index"
                                        >
                                            <template v-if="n.checked == true">
                                                <span class="pr20">{{
                                                    n.Name
                                                }}</span>
                                            </template>
                                        </div>
                                    </div>
                                    <template
                                        v-if="
                                            item.QuestionAnswerInfo.StrValue ==
                                                item.SingleTextID
                                        "
                                    >
                                        <!-- 输入框 -->
                                        <textarea
                                            class="weui-textarea"
                                            style="width:100%;height: 4.4em"
                                            :value="
                                                item.QuestionAnswerInfo
                                                    .TextValue
                                            "
                                            :disabled="true"
                                        />
                                    </template>
                                </div>
                                <!-- 饥饿感   饱腹感 -->
                                <div v-else-if="item.SignCode == 'Hunger'">
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo.IntValue
                                            }}
                                            -
                                            <span
                                                v-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 4
                                                "
                                                >不饥饿</span
                                            ><span
                                                v-else-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 8
                                                "
                                                >中等饥饿</span
                                            ><span v-else>非常饥饿</span></span
                                        >
                                    </div>
                                </div>
                                <div v-else-if="item.SignCode == 'Satiety'">
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo.IntValue
                                            }}
                                            -
                                            <span
                                                v-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 4
                                                "
                                                >不饱腹</span
                                            ><span
                                                v-else-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 8
                                                "
                                                >中度饱腹</span
                                            ><span v-else>极度饱腹</span></span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- end -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'lookInfo',
    data() {
        return {
            SZtabs: ['疾病', '饮食', '运动', '认知'],
            SFtabs: ['体重', '症状', '饮食', '运动'],
            activeIndex: 0,
            questionGroups: [],

            progressList: [
                { title: '超重', color: '#FFC261', grid: 4 },
                { title: '肥胖', color: '#FFA277', grid: 2 },
                { title: '中度肥胖', color: '#FF7575', grid: 5 },
                { title: '重度肥胖', color: '#EE81CF', grid: 5 },
                { title: '极重度肥胖', color: '#B078F3', grid: 4 }
            ],
            scoreBMI: 30, //BMI值向下取整
            leftStyle: '60',
            colorStyle: ''
        }
    },
    computed: {
        navTabs() {
            if (this.$route.query.type == 'follow') {
                return this.SFtabs
            } else {
                return this.SZtabs
            }
        }
    },
    created() {
        let type = this.$route.query.type
        if (type == 'follow') {
            document.title = '随访信息'
            this.getPatientFollowUpVisit()
        } else {
            document.title = '首诊信息'
            this.getPatientDiagnose()
        }
    },
    methods: {
        //首诊信息
        getPatientDiagnose() {
            var _this = this
            let url = this.api.userApi.GetPatientDiagnose
            let data = {
                patientId: this.$route.query.id
            }
            this.$fetchGet(url, data, 4100).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.questionGroups = result.Questionnaire.QuestionGroups
                _this.scoreBMI = result.Diagnose.CurrentBMI
                _this.computeBMI()
            })
        },
        //查看随访
        getPatientFollowUpVisit() {
            var _this = this
            let url = this.api.userApi.GetPatientFollowUpVisit
            let data = {
                visitId: this.$route.query.id
            }
            this.$fetchGet(url, data, 4102).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.questionGroups = result.Questionnaire.QuestionGroups
                _this.scoreBMI = result.FollowUpVisit.CurrentBMI
                _this.computeBMI()
            })
        },
        computeBMI() {
            //BMI值
            //向下取整,丢弃小数部分  Math.floor(7/2)　　// 3
            var _scoreBMI = parseFloat(this.scoreBMI)
            if (_scoreBMI >= 50) _scoreBMI = 50
            if (_scoreBMI < 24) _scoreBMI = 24
            var BMINum = 0
            BMINum = parseFloat((_scoreBMI - 24).toFixed(1))
            if (BMINum >= 20) BMINum = 19
            let _color = ''
            let _BMINum = Math.floor(BMINum)
            console.log(_BMINum)
            if (_BMINum <= 4) {
                _color = '#FFC261'
            } else if (_BMINum < 6) {
                _color = '#FFA277'
            } else if (_BMINum < 11) {
                _color = '#FF7575'
            } else if (_BMINum < 16) {
                _color = '#EE81CF'
            } else {
                _color = '#B078F3'
            }
            var leftStyle = Math.floor(BMINum) * 16
            if (leftStyle < 0) leftStyle = 0

            this.leftStyle = leftStyle
            this.colorStyle = _color
        },
        tabClick(e) {
            this.activeIndex = e
        }
    }
}
</script>

<style lang="less">
.wrapper {
    margin: 15px;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
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
.txt {
    font-size: 14px;
    color: #6d6d6d;
    padding-top: 15px;
    word-break: break-all;
    word-wrap: break-word;
}
.weui-navbar {
    z-index: 100;
    width: 100%;
    display: flex;
    background: #fff;
    border-bottom: 1px solid #e7e7f1;
    position: fixed;
    top: 0;
    left: 0;
    .weui-navbar__item {
        padding: 15px 0;
        font-size: 15px;
        color: #7a7a7a;
        position: relative;
        display: block;
        flex: 1;
        text-align: center;
        &.on:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -7px;
            width: 15px;
            height: 4px;
            background: #6049f5;
            border-radius: 2.5px;
        }

        &.on .weui-navbar__title {
            font-family: PingFangSC-Medium;
            font-weight: bold;
            font-size: 16px;
            color: #6049f5;
        }
        .weui-navbar__title {
            display: inline-block;
            font-size: 15px;
            max-width: 8em;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
        }
    }
}
.weui-tab__panel {
    box-sizing: border-box;
    height: 100%;
    padding-top: 50px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
/* BMI */
.scoreVal {
    display: inline-block;
}

.scoreVal .value {
    position: absolute;
    left: -22px;
    bottom: 12px;
    font-size: 24px;
    color: #3a3a3a;
    width: 48px;
    text-align: center;
}

.scoreVal .icon {
    position: relative;
    margin-left: -3px;
    font-size: 12px;
    color: #b078f3;
}

.scoreProgress {
    // width: 100%;
    position: relative;
    display: flex;
    margin-right: -5px;
}

.scoreProgress .itemList {
    width: 100%;
    height: 16px;
    display: flex;
}

.progressList .tit {
    margin-left: -8px;
}

.progressList:last-child .tit {
    margin-left: 0;
}

.progressList:last-child .item:last-child {
    margin-right: 0;
}

.progressList .item {
    width: 6px;
    height: 100%;
    border-radius: 4px;
    margin-right: 10px;
}

.progressList .tit {
    text-align: center;
    font-size: 11px;
    color: #6d6d6d;
    margin-top: 11px;
}
</style>