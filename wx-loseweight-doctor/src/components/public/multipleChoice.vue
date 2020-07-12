<template>
    <div>
        <div class="wrap" @click="showPicker">
            <div class="f16 c-3a">
                {{ option.Name }}
            </div>
            <div class="cell_ftM pr10 w-60 ellipsis tr">
                <span
                    class="mr10 f16 dib ellipsis"
                    :class="selectValue == '请选择' ? 'c-a' : ''"
                    >{{ selectValue }}</span
                >
                <i class="icon cubeic-arrow f16"></i>
            </div>
        </div>
        <choiceList
            ref="choiceList"
            :list="list"
						:topID="topID"
						:selectPatientGroupByParent="selectPatientGroup"
            @selGroup="selGroup"
        ></choiceList>
    </div>
</template>
<script>
import choiceList from '@/components/choiceList'
import { yktoast, convertKey } from '../../common/js/util'
export default {
    props: {
				option: Object,
				answerInfoStr: String
    },
    components: { choiceList },
    data() {
        return {
						topID:'',//“无”的ID by zhl2
            selectValue:this.initSelectValue(),// '请选择',
						list: [],
						selectPatientGroup:this.initSelectPatientGroup()//[]
        }
    },
    created() {},
    methods: {
        showPicker() {
						let topQuestionOption = this.option.QuestionOptions.find(n=>n.RejectOptionID);
						if(topQuestionOption) this.topID=topQuestionOption.ID
            //重新组装数组符合组件
            let listNew = this.option.QuestionOptions.map(item => {
                let { ID, Name } = item
                return { ID, Name }
						})
						if(this.option.QuestionAnswerInfo.StrValue){
							let selectIDArr =  this.option.QuestionAnswerInfo.StrValue.split(',')
							let selectCheckboxList = this.option.QuestionOptions.filter(n=>selectIDArr.indexOf(n.ID)>-1).map(n=>{
								 let { ID, Name } = n
                return { ID, Name }
							})
							debugger
							this.selectPatientGroup = convertKey(selectCheckboxList, ['GroupID', 'GroupName'])
							}
						
            let newSelectList = convertKey(listNew, ['GroupID', 'GroupName'])
            this.list = newSelectList
            this.$refs.choiceList.show()
        },
        selGroup(childValue) {
						console.log(childValue)
						this.selectPatientGroup=childValue
            let selMapName = childValue.map(item => item.GroupName)
						this.selectValue = selMapName.join('/')
            this.option.QuestionAnswerInfo.StrValue = childValue.map(n=>n.GroupID).join(',')
            this.$emit('selectValMultipleChild', this.option.QuestionAnswerInfo)
				},
				initSelectValue(){
					if(!this.answerInfoStr) return '请选择'   

					let selectOptionArr=this.answerInfoStr.split(',')
					if(selectOptionArr.length<=0) return '请选择' 

					let selectCheckboxList = this.option.QuestionOptions.filter
					(n=>selectOptionArr.indexOf(n.ID)>-1)
					let selectValueArr=[]
					selectCheckboxList.forEach(element => {
						selectValueArr.push(element.Name)
					});
					 this.selectPatientGroup = convertKey(selectCheckboxList, ['GroupID', 'GroupName'])
					// debugger
					return  selectValueArr.join('/')
				},
				initSelectPatientGroup(){
					if(!this.answerInfoStr) return []   

					let selectOptionArr=this.answerInfoStr.split(',')
					if(selectOptionArr.length<=0) return []

					let selectCheckboxList = this.option.QuestionOptions.filter
					(n=>selectOptionArr.indexOf(n.ID)>-1)
					return convertKey(selectCheckboxList, ['GroupID', 'GroupName'])
				},
        cancle() {},
        confirm() {}
    }
}
</script>
<style lang="less">
.cell_ftM {
    display: flex;
    span {
        flex: 1;
    }
    i {
        width: 16px;
    }
}
</style>