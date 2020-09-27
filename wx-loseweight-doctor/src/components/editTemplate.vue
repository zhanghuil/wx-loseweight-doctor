<template>
    <div class="pb70">
        <!-- 饮食方案 start-->
        <div class="dietPlan">
            <!-- 高蛋白、限能量饮食方案 -->
            <div
                class="con"
                v-show="
                    activeVal == 'HighProtein' || activeVal == 'LimitEnergy'
                "
            >
                <div
                    class="panelCon"
                    v-for="(item, index) in DietQuestionnaire.QuestionGroups"
                    :key="index"
                >
                    <div class="flex-between rel">
                        <i
                            v-show="item.TargetNumError"
                            class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon2"
                        ></i>
                        <div class="f16 c-3a">
                            {{ item.Name }}
                            <i
                                v-show="item.IsRequired"
                                class="c-fb iconfont icon-bitian-"
                            ></i>
                        </div>
                        <div class="f14 c-6d">{{ item.Description }}</div>
                    </div>
                    <ol class="mt15">
                        <li v-for="(n, idx) in item.Questions" :key="idx">
														<!-- 多行文本框 -->
														<div v-if="n.TypeCode == 'Textarea'">
																<div class="f14 c-3a">{{ n.Name }}</div>
																<div class="my-textarea">
																		<myTextarea
																				:placeholder="n.Placeholder"
																				:parentValue="
																						n.QuestionAnswerInfo.StrValue
																				"
																				@parentValue="
																						n.QuestionAnswerInfo.StrValue = $event
																				"
																		></myTextarea>
																</div>
														</div>
                            <div class="wrap" v-else>
                                <div class="f14 c-3a">{{ n.Name }}</div>
                                <div class="pr10">
                                    <template v-if="n.TypeCode == 'Num'">
                                        <template v-if="n.Precision > 0">
                                            <input
                                                @input="
                                                    checkInput(
                                                        index,
                                                        idx,
                                                        'DecimalValue'
                                                    )
                                                "
                                                type="tel"
                                                :placeholder="n.Placeholder"
                                                v-model="
                                                    n.QuestionAnswerInfo
                                                        .DecimalValue
                                                "
                                            />
                                        </template>
                                        <template v-else>
                                            <input
                                                @input="
                                                    checkInput(
                                                        index,
                                                        idx,
                                                        'IntValue'
                                                    )
                                                "
                                                type="tel"
                                                :placeholder="n.Placeholder"
                                                v-model="
                                                    n.QuestionAnswerInfo
                                                        .IntValue
                                                "
                                            />
                                        </template>
                                    </template>
                                    <template v-else-if="n.TypeCode == 'Text'">
                                        <!-- @input="checkInput(index,idx,'StrValue')" -->
																				<input
                                            :placeholder="n.Placeholder"
                                            type="text"
                                            v-model="
                                                n.QuestionAnswerInfo.StrValue
                                            "
                                        />
                                    </template>
                                    <span class="f14 c-6d">{{ n.Suffix }}</span>
                                </div>
                            </div>
                            <p class="desc" v-show="n.Description">
                                {{ n.Description }}
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
            <!-- 轻断食饮食方案 -->
            <ul v-show="activeVal == 'FastDiet'">
                <li>
                    <div class="tag">
                        <span>非断食日</span>
                    </div>
                    <div class="con con2">
                        <div
                            class="panelCon"
                            v-for="(item,
                            index) in DietQuestionnaire.QuestionGroups"
                            :key="index"
                        >
                            <div class="flex-between rel">
                                <i
                                    v-show="item.TargetNumError"
                                    class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon2"
                                ></i>
                                <div class="f16 c-3a">
                                    {{ item.Name }}
                                    <i
                                        v-show="item.IsRequired"
                                        class="c-fb iconfont icon-bitian-"
                                    ></i>
                                </div>
                                <div class="f14 c-6d">
                                    {{ item.Description }}
                                </div>
                            </div>
                            <ol class="mt15">
                                <li
                                    v-for="(n, idx) in item.Questions"
                                    :key="idx"
                                >
																    <!-- 多行文本框 -->
																		<div v-if="n.TypeCode == 'Textarea'">
																				<div class="f14 c-3a">{{ n.Name }}</div>
																				<div class="my-textarea">
																						<myTextarea
																								:placeholder="n.Placeholder"
																								:parentValue="
																										n.QuestionAnswerInfo.StrValue
																								"
																								@parentValue="
																										n.QuestionAnswerInfo.StrValue = $event
																								"
																						></myTextarea>
																				</div>
																		</div>
                                    <div class="wrap" v-else>
                                        <div class="f14 c-3a">
                                            {{ n.Name }}
                                        </div>
                                        <div class="pr10">
                                            <template
                                                v-if="n.TypeCode == 'Num'"
                                            >
                                                <template
                                                    v-if="n.Precision > 0"
                                                >
                                                    <input
                                                        @input="
                                                            checkInput(
                                                                index,
                                                                idx,
                                                                'DecimalValue'
                                                            )
                                                        "
                                                        :placeholder="
                                                            n.Placeholder
                                                        "
                                                        type="tel"
                                                        v-model="
                                                            n.QuestionAnswerInfo
                                                                .DecimalValue
                                                        "
                                                    />
                                                </template>
                                                <template v-else>
                                                    <input
                                                        @input="
                                                            checkInput(
                                                                index,
                                                                idx,
                                                                'IntValue'
                                                            )
                                                        "
                                                        :placeholder="
                                                            n.Placeholder
                                                        "
                                                        type="tel"
                                                        v-model="
                                                            n.QuestionAnswerInfo
                                                                .IntValue
                                                        "
                                                    />
                                                </template>
                                            </template>
                                            <template
                                                v-else-if="n.TypeCode == 'Text'"
                                            >
                                                <input
                                                    @input="
                                                        checkInput(
                                                            index,
                                                            idx,
                                                            'StrValue'
                                                        )
                                                    "
                                                    :placeholder="n.Placeholder"
                                                    type="tel"
                                                    v-model="
                                                        n.QuestionAnswerInfo
                                                            .StrValue
                                                    "
                                                />
                                            </template>
                                            <span class="f14 c-6d">{{
                                                n.Suffix
                                            }}</span>
                                        </div>
                                    </div>
                                    <p class="desc" v-show="n.Description">
                                        {{ n.Description }}
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="tag">
                        <span>断食日</span>
                    </div>
                    <div class="con con2" v-if="DietEkadeshQuestionnaire">
                        <div
                            class="panelCon"
                            v-for="(item,
                            index) in DietEkadeshQuestionnaire.QuestionGroups"
                            :key="index"
                        >
                            <div class="flex-between rel">
                                <i
                                    v-show="item.TargetNumError"
                                    class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon2"
                                ></i>
                                <div class="f16 c-3a">
                                    {{ item.Name }}
                                    <i
                                        v-show="item.IsRequired"
                                        class="c-fb iconfont icon-bitian-"
                                    ></i>
                                </div>
                                <div class="f14 c-6d">
                                    {{ item.Description }}
                                </div>
                            </div>
                            <ol class="mt15">
                                <li
                                    v-for="(n, idx) in item.Questions"
                                    :key="idx"
                                >
																		<!-- 多行文本框 -->
																		<div v-if="n.TypeCode == 'Textarea'">
																				<div class="f14 c-3a">{{ n.Name }}</div>
																				<div class="my-textarea">
																						<myTextarea
																								:placeholder="n.Placeholder"
																								:parentValue="
																										n.QuestionAnswerInfo.StrValue
																								"
																								@parentValue="
																										n.QuestionAnswerInfo.StrValue = $event
																								"
																						></myTextarea>
																				</div>
																		</div>
                                    <div class="wrap" v-else>
                                        <div class="f14 c-3a">
                                            {{ n.Name }}
                                        </div>
                                        <div class="pr10">
                                            <template
                                                v-if="n.TypeCode == 'Num'"
                                            >
                                                <template
                                                    v-if="n.Precision > 0"
                                                >
                                                    <input
                                                        @input="
                                                            checkInput(
                                                                index,
                                                                idx,
                                                                'DecimalValue',
                                                                1
                                                            )
                                                        "
                                                        :disabled="n.IsFixed"
                                                        :placeholder="
                                                            n.Placeholder
                                                        "
                                                        type="tel"
                                                        v-model="
                                                            n.QuestionAnswerInfo
                                                                .DecimalValue
                                                        "
                                                    />
                                                </template>
                                                <template v-else>
                                                    <input
                                                        @input="
                                                            checkInput(
                                                                index,
                                                                idx,
                                                                'IntValue',
                                                                1
                                                            )
                                                        "
                                                        :disabled="n.IsFixed"
                                                        :placeholder="
                                                            n.Placeholder
                                                        "
                                                        type="tel"
                                                        v-model="
                                                            n.QuestionAnswerInfo
                                                                .IntValue
                                                        "
                                                    />
                                                </template>
                                            </template>
                                            <template
                                                v-else-if="n.TypeCode == 'Text'"
                                            >
                                                <input
                                                    @input="
                                                        checkInput(
                                                            index,
                                                            idx,
                                                            'StrValue',
                                                            1
                                                        )
                                                    "
                                                    :disabled="n.IsFixed"
                                                    :placeholder="n.Placeholder"
                                                    type="tel"
                                                    v-model="
                                                        n.QuestionAnswerInfo
                                                            .StrValue
                                                    "
                                                />
                                            </template>
                                            <span class="f14 c-6d">{{
                                                n.Suffix
                                            }}</span>
                                        </div>
                                    </div>
                                    <p class="desc" v-show="n.Description">
                                        {{ n.Description }}
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 饮食方案 end -->
        <div class="footerEdit" v-show="type == 'add'">
            <button class="yk-btn" @click="confirmTap">确定</button>
        </div>

        <div class="footerEdit" v-show="type == 'edit'">
            <button class="yk-btn-del" @click="delTap">删除</button>
            <button class="yk-btn" @click="confirmTap">确定</button>
        </div>

        <!-- 保存模板 saveTemplate -->
        <drawerFoot
            title="保存模板"
            :display.sync="showTmp"
            :width="drawerWidth"
            :height="drawerHeight"
            @cancle="cancleTmp"
            @confirm="confirmTmp"
            ref="drawertemplate"
        >
            <div class="mx15">
                <textarea
                    v-model="templateName"
                    class="tmpTxtArea"
                    rows="3"
                    maxlength="30"
                    placeholder="输入模板名称，不超过30字"
                ></textarea>
            </div>
        </drawerFoot>
    </div>
</template>

<script>
import drawerFoot from '@/components/public/drawerFoot'
import myTextarea from '@/components/public/myTextarea'
import qs from 'qs'
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'editTemplate',
    components: { drawerFoot, myTextarea },
    data() {
        return {
            templateName: '',
            showTmp: false, //保存模板弹窗
            drawerWidth: '100%',
            drawerHeight: '245px',
            doctorInfo: {}, //医生信息
            activeVal: '', //方案类型
            DietQuestionnaire: {}, //方案  非断食日
            DietEkadeshQuestionnaire: {} //轻断食断食日饮食方案
        }
    },
    created() {
        this.getParams()
        if (!this.$route.query.id) this.getPatientEmptyWeightLossPlanTemplate()
        else this.getPatientWeightLossPlanTemplate()

        this.getDoctorInfoNew()

        let typeCode = this.$route.query.typeCode
        this.activeVal = typeCode
        if (this.$route.query.name) document.title = this.$route.query.name
        else {
            if (typeCode == 'HighProtein') document.title = '高蛋白饮食方案'
            else if (typeCode == 'FastDiet') document.title = '轻断食饮食方案'
            else document.title = '限能量平衡饮食方案'
        }
    },
    methods: {
        getParams() {
            this.type = this.$route.query.type
            this.id = this.$route.query.id
        },
        checkInput(index, idx, type, isDietQuestionnaire) {
            let questionnaires = this.DietQuestionnaire
            if (isDietQuestionnaire == 1)
                questionnaires = this.DietEkadeshQuestionnaire
            let value =
                questionnaires.QuestionGroups[index].Questions[idx]
                    .QuestionAnswerInfo[type]

            let convertValue = this.dealYinShiInputVal(value)
            questionnaires.QuestionGroups[index].Questions[
                idx
            ].QuestionAnswerInfo[type] = convertValue

            if (convertValue) {
                //查找是否存在其他为空的
                let isValid = true
                this.dealYinShiInputVal(value)
                if (questionnaires.QuestionGroups[index].IsRequired) {
                    for (
                        let questionIndex = 0;
                        questionIndex <
                        questionnaires.QuestionGroups[index].Questions.length;
                        questionIndex++
                    ) {
                        //具体题目
                        let question =
                            questionnaires.QuestionGroups[index].Questions[
                                questionIndex
                            ]
                        if (!question.IsRequired) continue
                        //找到类型 DecimalValue int。。 text..
                        let type = this.getTypeName(
                            question.TypeCode,
                            question.Precision
                        )
                        //找到input值
                        let value =
                            questionnaires.QuestionGroups[index].Questions[
                                questionIndex
                            ].QuestionAnswerInfo[type]
                        if (!value || !parseFloat(value)) {
                            isValid = false
                        }
                    }
                }
                if (isValid) {
                    this.$set(
                        questionnaires.QuestionGroups[index],
                        'TargetNumError',
                        false
                    )
                }
            }
        },
        getTypeName(code, precision) {
            let name = ''
            switch (code) {
                case 'Num':
                    if (precision > 0) name = 'DecimalValue'
                    else name = 'IntValue'
                    break
                case 'Text':
                    name = 'StrValue'
                    break
                default:
                    name = ''
            }
            return name
        },
        //饮食方案 校验
        dealYinShiInputVal(value) {
            if (value == null || value == undefined) return ''
            value = value.replace(/^0*(0\.|[1-9])/, '$1')
            value = value.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
            value = value.replace(/^\./g, '') //验证第一个字符是数字而不是字符
            value = value.replace(/\.{1,}/g, '.') //只保留第一个.清除多余的
            value = value
                .replace('.', '$#$')
                .replace(/\./g, '')
                .replace('$#$', '.')
            value = value.replace(/^(\-)*(\d*)\.(\d).*$/, '$1$2.$3') //只能输入1个小数
            value =
                value.indexOf('.') > 0
                    ? value.split('.')[0].substring(0, 4) +
                      '.' +
                      value.split('.')[1]
                    : value.substring(0, 4)
            return value
        },
        getAnswerArr(array) {
            let questionInfoArr = []
            let questionGroups = array
            for (let i = 0; i < questionGroups.length; i++) {
                let array = questionGroups[i].Questions
                for (let j = 0; j < array.length; j++) {
                    // debugger
                    const element = array[j]
                    if (element.TypeCode == 'Num') {
                        //是数值
                        if (element.Precision > 0) {
                            //小数值
                            var items = {
                                DecimalValue: '',
                                QuestionID: ''
                            }
                            items.DecimalValue =
                                element.QuestionAnswerInfo.DecimalValue
                        } else {
                            //整数值
                            var items = {
                                IntValue: '',
                                QuestionID: ''
                            }
                            items.IntValue = element.QuestionAnswerInfo.IntValue
                        }
                    } else if (element.TypeCode == 'Text' || element.TypeCode == 'Textarea') {
                        //字符串
                        var items = {
                            StrValue: '',
                            QuestionID: ''
                        }
                        items.StrValue = element.QuestionAnswerInfo.StrValue
                    }
                    items.QuestionID = element.QuestionAnswerInfo.QuestionID
                    questionInfoArr.push(items)
                }
            }
            return questionInfoArr
            console.log(questionInfoArr)
        },
        //获取饮食方案答案数据
        getAnswerStr(typeCode) {
            // typeCode 模板类型
            if (typeCode == 'HighProtein' || typeCode == 'LimitEnergy') {
                //高蛋白、限能量饮食
                let arr = this.getAnswerArr(
                    this.DietQuestionnaire.QuestionGroups
                )
                this.DietAnswerInfoStr = JSON.stringify(arr)
                this.EkadeshDietAnswerInfoStr = ''
            } else {
                //断食日
                let arr = this.getAnswerArr(
                    this.DietQuestionnaire.QuestionGroups
                )
                let arrFasts = this.getAnswerArr(
                    this.DietEkadeshQuestionnaire.QuestionGroups
                )
                this.DietAnswerInfoStr = JSON.stringify(arr)
                this.EkadeshDietAnswerInfoStr = JSON.stringify(arrFasts)
            }
        },
        validQuestionnairesCommon(questionnaires) {
            let isValid = true
            //筛选必填项
            let requireQuestionGroup = questionnaires
            // .filter(
            //     n => n.IsRequired == true
            // )
            if (!requireQuestionGroup || requireQuestionGroup.length <= 0)
                return true

            //循环校验
            for (let index = 0; index < requireQuestionGroup.length; index++) {
                if (!requireQuestionGroup[index].IsRequired) continue
                if (!isValid) break
                for (
                    let questionIndex = 0;
                    questionIndex <
                    requireQuestionGroup[index].Questions.length;
                    questionIndex++
                ) {
                    //具体题目
                    let question =
                        requireQuestionGroup[index].Questions[questionIndex]
                    if (!question.IsRequired) continue
                    //找到类型 DecimalValue int。。 text..
                    let type = this.getTypeName(
                        question.TypeCode,
                        question.Precision
                    )
                    //找到input值
                    let value =
                        questionnaires[index].Questions[questionIndex]
                            .QuestionAnswerInfo[type]

                    //校验
                    if (!value || !parseFloat(value)) {
                        this.$set(
                            requireQuestionGroup[index],
                            'TargetNumError',
                            true
                        )
                        yktoast('有未填写项')
                        isValid = false
                        break
                    }
                    this.$set(
                        requireQuestionGroup[index],
                        'TargetNumError',
                        false
                    )
                }
            }
            return isValid
        },
        validYinShi2() {
            let isValid = true
            //高蛋白、限能量饮食方案
            if (
                this.activeVal == 'HighProtein' ||
                this.activeVal == 'LimitEnergy'
            ) {
                //DietQuestionnaire
                isValid = this.validQuestionnairesCommon(
                    this.DietQuestionnaire.QuestionGroups
                )
            } else if (this.activeVal == 'FastDiet') {
                //轻断食
                isValid = this.validQuestionnairesCommon(
                    this.DietQuestionnaire.QuestionGroups
                )
                if (!isValid) return isValid
                isValid = this.validQuestionnairesCommon(
                    this.DietEkadeshQuestionnaire.QuestionGroups
                )
            }
            return isValid
        },
        //确定按钮
        confirmTap() {
            let isValid = this.validYinShi2()
            if (!isValid) return
            //新增出现名称弹框
            if (!this.$route.query.id) this.showTmp = true
            else this.saveTemplate()
        },
        //取消保存模板操作
        cancleTmp() {
            console.log('点击了取消保存模板')
            this.$refs.drawertemplate.closeByButton()
        },
        //确定保存
        confirmTmp() {
            let templateName = this.templateName
            if (!templateName) {
                yktoast('请输入模板名称')
                return
            }
            this.saveTemplate()
        },
        //保存模板
        saveTemplate() {
            this.getAnswerStr(this.activeVal)
            // 保存减重方案模板
            var _this = this
            let AccountId = storage.getItem('AccountId')
            let url = this.api.userApi.SaveWeightLossPlanTemplate
            let data = {
                TemplateID: this.$route.query.id || '', //模板ID
                TemplateName: this.templateName || '', //模板名称
                DoctorID: AccountId, //模板制定医生ID
                HospID: this.doctorInfo.HosId, //医院ID
                TypeCode: this.activeVal, //模板类型
                DietAnswerInfoStr: this.DietAnswerInfoStr,
                EkadeshDietAnswerInfoStr: this.EkadeshDietAnswerInfoStr
            }
            console.log(data)
            this.$fetchPost(url, data, 4332).then(response => {
                let result = response.data.data //请求返回数据
                if (result.State != 0) {
                    yktoast(result.Msg)
                    return
                }
                //保存成功
                yktoast(result.Msg)
                this.$refs.drawertemplate.closeByButton()
                _this.$router.go(-1)
            })
        },
        //获取空白方案模板
        getPatientEmptyWeightLossPlanTemplate() {
            var _this = this
            let url = this.api.userApi.GetPatientEmptyWeightLossPlanTemplate
            let data = {
                typeCode: this.$route.query.typeCode
            }
            this.$fetchGet(url, data, 4331).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.DietQuestionnaire = result.DietQuestionnaire
                _this.DietEkadeshQuestionnaire = result.DietEkadeshQuestionnaire
            })
        },
        //获取模板详情信息
        getPatientWeightLossPlanTemplate() {
            var _this = this
            let url = this.api.userApi.GetPatientWeightLossPlanTemplate
            let data = {
                templateId: this.$route.query.id || ''
            }
            this.$fetchGet(url, data, 4331).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.DietQuestionnaire = result.DietQuestionnaire
                _this.DietEkadeshQuestionnaire = result.DietEkadeshQuestionnaire
                _this.templateName = result.WeightLossPlanTemplate.Name
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
                    // console.log(result.data)
                    _this.doctorInfo = result.data
                } else {
                    yktoast(result)
                }
            })
        },
        //删除模板
        delTem() {
            var _this = this
            let url = this.api.userApi.DeleteTemplate
            let data = {
                templateId: this.$route.query.id
            }
            this.$fetchDelete(url, data, 4334).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('模板已删除')
                    return
                }
                this.$createToast({
                    type: 'Timeout',
                    time: 1000,
                    txt: '删除成功'
                }).show()
                _this.$router.go(-1)
            })
        },
        delTap() {
            this.$createDialog({
                type: 'confirm',
                content: '确定要删除该模板？',
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
                    this.delTem()
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
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
.tipsIcon2 {
    font-size: 12px !important;
    top: 2.5px;
}
.tipsIcon6 {
    top: 8px;
}
.dietPlan {
    padding: 15px;
    li {
        padding-bottom: 25px;
    }
    .tag {
        span {
            position: relative;
            z-index: 0;
            background: #9198f7;
            border-radius: 4px 4px 0 0;
            font-size: 14px;
            color: #ffffff;
            padding: 7px 15px 11px 15px;
            display: inline-block;
        }
    }
    .con {
        position: relative;
        z-index: 1;
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
        border-radius: 4px;
        &.con2 {
            top: -4px;
        }
    }
}
.panelCon {
    padding: 15px;
    border-bottom: 1px solid #f2f2f2;
    &:last-child {
        border: none;
    }
    .iconfont {
        font-size: 18px;
    }
    ol {
        background: #f8f9fa;
        border-radius: 4px;
        padding: 0 0 0 10px;
        li {
            border-bottom: 1px solid #f2f2f2;
            padding: 18px 0;
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
.tmpTxtArea {
    font-family: PingFangSC-Regular;
    margin-top: 10px;
    border: none;
    padding: 11px 15px;
    background: #f8f9fa;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 21px;
    color: #3a3a3a;
}
</style>