<template>
    <div class="wrap" @click="showPicker">
        <div class="f16 c-3a">
            {{ option.Name }}
        </div>
        <div class="cell_ft pr10">
            <span
                class="mr10 f16"
                :class="selectValue == '请选择' ? 'c-a' : ''"
                >{{ selectValue }}</span
            >
            <i class="icon cubeic-arrow f16"></i>
        </div>
    </div>
</template>
<script>
import { yktoast, convertKey } from '../../common/js/util'
export default {
    props: {
				option: Object,
				answerInfoStr: String
    },
    data() {
        return {
						selectValue: this.initSelectValue(), //'请选择',
						selectIndex:0,
        }
    },
		created() {},
    methods: {
        showPicker() {
            //重新组装数组符合组件
            let listNew = this.option.QuestionOptions.map(item => {
                let { Name, ID } = item
                return { Name, ID }
            })
            let newSelectList = convertKey(listNew, ['text', 'value'])
            if (!this.picker) {
                this.picker = this.$createPicker({
                    title: `${this.option.Name}`,
										data: [newSelectList],
										selectedIndex: [this.selectIndex],
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                })
            }
            this.picker.show()
        },
        selectHandle(selectedVal, selectedIndex, selectedText) {
            this.selectValue = selectedText.join(' ')
						this.option.QuestionAnswerInfo.StrValue = selectedVal.join(', ')
            this.$emit('selectValChild', this.option.QuestionAnswerInfo,this.option.QuestionGroupID)
        },
        cancelHandle() {
            console.log('点击了取消')
				},
				initSelectValue(){
					let option = this.option.QuestionOptions.find(n=>this.answerInfoStr&&n.ID==this.answerInfoStr)
					if(option) return option.Name
					else return '请选择'
				}
    }
}
</script>