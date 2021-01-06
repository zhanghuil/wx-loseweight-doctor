<template>
    <div>
        <!-- 评估日期 -->
        <div class="yk_wx_cell rel" @click="showDatePicker">
            <i
                v-show="dateError"
                class="icon iconfont icon-wuuiconsuotanhao tipsIcon"
            ></i>
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
                :data="questionnaires"
                direction="horizontal"
                class="horizontal-scroll-list-wrap"
            >
                <ul class="list-wrapper">
                    <li
                        v-for="(item, index) in questionnaires"
                        :key="index"
                        class="list-item"
                    >
                        <div
                            class="navbar__item"
                            :class="activeVal === item.Code ? 'on' : ''"
                            @click="tabClick(item.Code)"
                        >
                            {{ item.Name }}
                        </div>
                    </li>
                </ul>
            </cube-scroll>
        </div>
        <!-- 评估表 start -->
        <div
            v-for="(item, index) in questionnaires"
            :key="index"
            v-show="item.Code == activeVal"
        >
            <div
                v-for="(list, idx) in item.Questionnaire.QuestionGroups"
                :key="idx"
            >
                <div class="formTitle" v-show="list.Name">{{ list.Name }}</div>
                <div class="formCon">
                    <ol>
                        <li v-for="(n, qi) in list.Questions" :key="qi">
                            <!-- 输入框 -->
                            <template v-if="n.TypeCode == 'Num'&&(n.IsHidden==null||!n.IsHidden)">
                                <div class="wrap">
                                    <div class="f16 c-3a">
                                        {{ n.Name }}
                                    </div>
                                    <div class="pr10">
                                        <!-- 不可输入 -->
                                        <template v-if="n.IsFixed">
                                            <span class="f16 c-6d">{{n.QuestionAnswerInfo
                                                        .DecimalValue?n.QuestionAnswerInfo
                                                        .DecimalValue:'-'}}</span>
                                            <!-- <span class="f16 c-fb">42</span> -->
                                        </template>
                                        <template v-else>
                                            <input
                                                maxlength="20"
                                                type="number"
                                                v-model="
                                                    n.QuestionAnswerInfo
                                                        .DecimalValue
                                                "
                                                :disabled="n.IsFixed"
                                                :placeholder="n.Placeholder"
																								@blur="changeInput(n.SignCode)"
                                            />
                                            <span class="f16 c-6d">{{
                                                n.Suffix
                                            }}</span>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <!-- 单选 -->
                            <template v-else-if="n.TypeCode == 'SingleSelect'">
                                <singlePicker
                                    @selectValChild="selectValChild"
                                    :option="n"
																		:answerInfoStr="n.QuestionAnswerInfo.StrValue"
                                ></singlePicker>
                            </template>
                            <!-- 多选 -->
                            <template
                                v-else-if="n.TypeCode == 'MultipleSelect'&&(n.IsHidden==null||!n.IsHidden)"
                            >
                                <multipleChoice
                                    @selectValMultipleChild="
                                        selectValMultipleChild
                                    "
																		:answerInfoStr="n.QuestionAnswerInfo.StrValue"
                                    :option="n"
                                ></multipleChoice>
                            </template>
                            <!-- 上传图片 -->
                            <template v-else-if="n.TypeCode == 'Image'">
                                <div class="py16">
                                    <div class="f16 c-3a">
                                        {{ n.Name }}
                                    </div>
                                    <imgUpload
                                        :ans="n.QuestionAnswerInfo"
																				:answerInfoStr="n.QuestionAnswerInfo.StrValue"
                                        :uploadNum="n.Max"
                                        title="上传图片"
                                        @input="imgChildByValue"
                                    ></imgUpload>
                                </div>
                            </template>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- 评估表 end -->
        <div class="bg_h15"></div>
        <div class="footerEdit evalFormFoot">
            <button class="yk-btn" @click="submitForm">保存</button>
        </div>
    </div>
</template>
<script>
import singlePicker from '@/components/public/singlePicker'
import multipleChoice from '@/components/public/multipleChoice'
import imgUpload from '@/components/public/imgUpload'
import { yktoast, convertKey } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
export default {
    name: 'doctorEvalForm',
    components: { singlePicker, multipleChoice, imgUpload },
    data() {
        return {
            dateError: false, //评估日期警示
            assessID: '', //评估ID
            doctorAssessId: '', //传入的评估表id
            planDate: '请选择', //评估日期
            questionnaires: null,
            activeVal: 'Assess_TG',
            questionGroups: []
        }
    },
    created() {
        //不存在医生评估表id  调用空白模板
        let doctorAssessId = this.$route.query.doctorAssessId
        this.doctorAssessId = doctorAssessId
        if (!doctorAssessId) this.init()
        else this.getDoctorAssess()
    },
    methods: {
				changeInput(signCode){
					//todo 参数校验
					var bmiRelationSignCodeArr=['CurrentWeight','CurrentHeight'];
					var WHRRelationSignCodeArr=['CurrentWaistline','CurrentHipline']
					if(this.activeVal == 'Assess_TG' && bmiRelationSignCodeArr.indexOf(signCode)>=0){
						this.calcBMI();
					}else if(this.activeVal == 'Assess_TG' && WHRRelationSignCodeArr.indexOf(signCode)>=0){	
						this.calcWHR();
					}
				},
				calcBMI(){
					let currMenuArr = this.questionnaires.find(
                n => n.Code == 'Assess_TG'
						)
					let currQuestionArr = currMenuArr.Questionnaire.QuestionGroups.find(n=>n.Code=='TGJC')
					if(!currQuestionArr) return

					let currentHeight =  currQuestionArr.Questions.find(m => m.SignCode === 'CurrentHeight').QuestionAnswerInfo.DecimalValue
					let currentWeight =  currQuestionArr.Questions.find(m => m.SignCode === 'CurrentWeight').QuestionAnswerInfo.DecimalValue
					let currentBMIQuestionAnswerInfo = currQuestionArr.Questions.find(m => m.SignCode === 'CurrentBMI').QuestionAnswerInfo
					if(currentHeight&&currentWeight){
						/*
						计算BMI
						BMI：身高、体重缺任一值，显示“—”，两项齐全，自动计算并显示结果值，保留1位小数。
						计算公式：体重kg÷身高m÷身高m
						 */
						currentBMIQuestionAnswerInfo.DecimalValue =  (currentWeight/currentHeight/currentHeight*10000).toFixed(1);
					}else{
						currentBMIQuestionAnswerInfo.DecimalValue = '-';
					}
				},
				calcWHR(){
					let currMenuArr = this.questionnaires.find(
                n => n.Code == 'Assess_TG'
						)
					let currQuestionArr = currMenuArr.Questionnaire.QuestionGroups.find(n=>n.Code=='TGJC')
					if(!currQuestionArr) return

					let currentWaistline =  currQuestionArr.Questions.find(m => m.SignCode === 'CurrentWaistline').QuestionAnswerInfo.DecimalValue
					let currentHipline =  currQuestionArr.Questions.find(m => m.SignCode === 'CurrentHipline').QuestionAnswerInfo.DecimalValue
					let currentWHRQuestionAnswerInfo = currQuestionArr.Questions.find(m => m.SignCode === 'CurrentWHR').QuestionAnswerInfo
					if(currentWaistline&&currentHipline){
						/*
						腰臀比：腰围、臀围缺任一值，显示“—”，两项齐全，自动计算并显示结果值，保留2位小数。
						计算公式：腰围÷臀围
						 */
						currentWHRQuestionAnswerInfo.DecimalValue =  (currentWaistline/currentHipline).toFixed(2);
					}else{
						currentWHRQuestionAnswerInfo.DecimalValue = '-';
					}
				},
        // 获取评估表
        getDoctorAssess() {
            var _this = this
            let url = this.api.userApi.GetDoctorAssess
            let data = {
                assessId: this.doctorAssessId
            }
            this.$fetchGet(url, data, 4110).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('加载失败')
                    return
                }
								_this.questionnaires = result.Questionnaires
								_this.planDate = formatDate(new Date(result.DoctorAssess.AssessDate),'yyyy-MM-dd')
            })
        },
        // 空白评估表
        init() {
            var _this = this
            let url = this.api.userApi.GetEmptyDoctorAssess
            this.$fetchGet(url, '', 4110).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('加载失败')
                    return
								}
								result.Questionnaires.forEach(n=>{n.Questionnaire.QuestionGroups.forEach(n=>{n.Questions.forEach(n=>{
									n.IsHidden=false
								})})})
								_this.questionnaires = result.Questionnaires
								_this.tabClick(_this.activeVal)
            })
        },
        //评估日期
        showDatePicker() {
            if (!this.datePicker) {
							  // 当前日期 + 3年
                var curDate = new Date()
                curDate.setFullYear(curDate.getFullYear() + 3)
                curDate.setDate(curDate.getDate() - 1)
                console.log(curDate)
                this.datePicker = this.$createDatePicker({
										title: '选择评估日期',
										max: new Date(curDate),
                    value: new Date(),
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                })
            }
            this.datePicker.show()
        },
        selectHandle(date, selectedVal, selectedText) {
            this.planDate = selectedText.join('-')
            this.dateError = false
				},
				combine() {
					let arr = [].concat.apply([], arguments); //没有去重复的新数组 
					return Array.from(new Set(arr));
				},
        tabClick(e) {
					var _this=this
					this.activeVal = e
					let currMenuArr = this.questionnaires.find(n => n.Code == this.activeVal)
							currMenuArr.Questionnaire.QuestionGroups.forEach(e => {
								let currentGroupCode = e.Code //eg:体格检查对应groupCode
								let arrQuestionIDs=[]
								e.Questions.forEach(question => {
									if(question.QuestionOptions&&question.QuestionOptions.length>0){
										let rejectQuestionIDs = question.QuestionOptions.filter(n=>n.RejectQuestionID!=null).map(n=>n.RejectQuestionID);
										if(rejectQuestionIDs&&rejectQuestionIDs.length>0){
											//找到要显示的关联题目
											let currentSelectRejectQuestionIDArr=[]; 
											if(question.QuestionAnswerInfo.StrValue){
												let currentSelectRejectQuestionID =  question.QuestionOptions.find(n=>n.ID==question.QuestionAnswerInfo.StrValue).RejectQuestionID
												if(currentSelectRejectQuestionID&&currentSelectRejectQuestionID!='null'){
													currentSelectRejectQuestionIDArr=currentSelectRejectQuestionID.split(',')
												}
											}
											rejectQuestionIDs.forEach(element => {
												arrQuestionIDs = _this.combine(arrQuestionIDs,element.split(','))
											});

											if(currentSelectRejectQuestionIDArr&&currentSelectRejectQuestionIDArr.length>0){
												currentSelectRejectQuestionIDArr.forEach(e => {
													if(arrQuestionIDs.indexOf(e)>=0){
															arrQuestionIDs.splice(arrQuestionIDs.indexOf(e),1)
														}
												});
											}
										}
									}
								});
								//隐藏对应关联题目
								if(arrQuestionIDs.length>0){
									e.Questions.filter(n=>arrQuestionIDs.indexOf(n.ID)>=0).forEach(n=>{
										n.IsHidden=true
									})
								}
							});
        },
        //获取上传图片的值
        imgChildByValue(childValue) {
            console.log(childValue)
            this.setAnswerInfo(childValue)
        },
        //给当前菜单题目答案赋值
        setAnswerInfo(childValue) {
            let currMenuArr = this.questionnaires.find(
                n => n.Code == this.activeVal
            )
            let currQuestionArr = currMenuArr.Questionnaire.QuestionGroups
            //找到对应data中数据 赋值
            let question = currQuestionArr
                .map(n => n.Questions.find(m => m.ID === childValue.QuestionID))
                .find(item => item)
            if (question) {
                question.QuestionAnswerInfo.StrValue = childValue.StrValue
            }
            //this.questionnaires = this.questionnaires
				},
				//初始化关联题目状态
				initRejectQuestionState(questionID,questionGroupID,optionID){
					var _this = this
					let currMenuArr = this.questionnaires.find(n => n.Code == this.activeVal)
					currMenuArr.Questionnaire.QuestionGroups.forEach(e => {
						if(e.ID!=questionGroupID) return
						let currentGroupCode = e.Code //eg:体格检查对应groupCode
						let arrQuestionIDs=[];//所有关联题目
						let currentSelectRejectQuestionIDArr=[]; //找到要显示的关联题目
						e.Questions.forEach(question => {
							if(question.QuestionOptions&&question.QuestionOptions.length>0){
								let rejectQuestionIDs = question.QuestionOptions.filter(n=>n.RejectQuestionID!=null).map(n=>n.RejectQuestionID);
								if(rejectQuestionIDs&&rejectQuestionIDs.length>0){
									//找到要显示的关联题目
									if(question.ID==questionID){
										let currentRejectQuestionID = question.QuestionOptions.find(n=>n.ID==optionID).RejectQuestionID
										// currentRejectQuestionID='4FEEC803A9474FE19A3A9272B715345A'
										if(currentRejectQuestionID){
											currentSelectRejectQuestionIDArr= currentRejectQuestionID.split(',')
										}
									}
									//所有关联题目ID
									rejectQuestionIDs.forEach(element => {
										arrQuestionIDs = _this.combine(arrQuestionIDs,element.split(','))
									});
								}
							}
						});
						//隐藏对应关联题目
						if(arrQuestionIDs.length>0){
							e.Questions.filter(n=>arrQuestionIDs.indexOf(n.ID)>=0).forEach(n=>{
								n.IsHidden=true
							})
							e.Questions.filter(n=>currentSelectRejectQuestionIDArr.indexOf(n.ID)>=0).forEach(n=>{
								n.IsHidden=false
							})
						}
					});
				},
        //单选的值
        selectValChild(childValue,questionGroupID) {
						// childValue就是子组件传过来的值
            console.log(childValue)
						this.setAnswerInfo(childValue)
						this.initRejectQuestionState(childValue.QuestionID,questionGroupID,childValue.StrValue)
				},
        //多选的值
        selectValMultipleChild(childValue) {
            console.log(childValue)
            this.setAnswerInfo(childValue)
        },
        //保存
        submitForm() {
            if (this.planDate == '' || this.planDate == '请选择') {
                yktoast('请填写评估日期')
                this.dateError = true
                return
            }
            // 过滤当前点击菜单下的所有题目
            let currMenuArr = this.questionnaires.find(
                n => n.Code == this.activeVal
            )
            let currQuestionArr = currMenuArr.Questionnaire.QuestionGroups
            //拼装保存数据
            let allQuesAnswerInfoGroup = currQuestionArr.map(n =>
                n.Questions.map(m => m.QuestionAnswerInfo)
            )
            var allQuestionAnswerInfo = []
            allQuesAnswerInfoGroup.forEach(n => {
                var tempArray = allQuestionAnswerInfo
                allQuestionAnswerInfo = tempArray.concat(n)
            })
            console.log(JSON.stringify(allQuestionAnswerInfo))
            // 保存评估表
            var _this = this
            let AccountId = storage.getItem('AccountId')
            let url = this.api.userApi.SaveDoctorAssess
            let data = {
                AssessID: this.doctorAssessId?this.doctorAssessId:this.assessID, //评估ID
                PatientID: this.$route.query.userId, //患者ID
                DoctorID: AccountId, //评估医生ID
                AssessDate: this.planDate, //评估日期
                QuestionnaireCode: this.activeVal, //菜单code
                AssessAnswerInfoStr: JSON.stringify(allQuestionAnswerInfo)
            }
            console.log(data)
            this.$fetchPost(url, data, 4111).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                //保存成功   result.Msg
                yktoast('保存成功')
                _this.assessID = result.ID
                // this.$router.go(0)
            })
        }
    }
}
</script>
<style lang="less">
.tipsIcon {
    color: #fc7a56;
    position: absolute;
    font-size: 12px;
    left: 3px;
    top: 20px;
}
input::placeholder {
    color: #aaaaaa;
    font-size: 16px;
}
.c-a {
    color: #aaaaaa;
}
.horizontalMenu {
    background: #ffffff;
    border-bottom: 1px solid #f7f7f7;
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
.py16{
	padding: 16px 0;
}
.formCon {
    background: #ffffff;
    padding-left: 15px;
    ol {
        li {
            // border-bottom: 1px solid #f2f2f2;
            // padding: 16px 0;
            // &:last-child {
            //     border: none;
            // }
            .wrap {
							  border-bottom: 1px solid #f2f2f2;
                padding: 16px 0;
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
.footerEdit {
    &.evalFormFoot {
        position: relative;
    }
}
.bg_h15 {
    height: 15px;
    background: #f7f7f7;
}
</style>