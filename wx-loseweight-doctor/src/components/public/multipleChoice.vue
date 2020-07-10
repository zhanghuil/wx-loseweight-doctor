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
            @selGroup="selGroup"
        ></choiceList>
    </div>
</template>
<script>
import choiceList from '@/components/choiceList'
import { yktoast, convertKey } from '../../common/js/util'
export default {
    props: {
        option: Object
    },
    components: { choiceList },
    data() {
        return {
            selectValue: '请选择',
            list: []
        }
    },
    created() {},
    methods: {
        showPicker() {
            //重新组装数组符合组件
            let listNew = this.option.QuestionOptions.map(item => {
                let { ID, Name } = item
                return { ID, Name }
            })
            let newSelectList = convertKey(listNew, ['GroupID', 'GroupName'])
            this.list = newSelectList
            this.$refs.choiceList.show()
        },
        selGroup(childValue) {
            console.log(childValue)
            let selMapName = childValue.map(item => item.GroupName)
            this.selectValue = selMapName.join('/')
            this.option.QuestionAnswerInfo.StrValue = childValue.join(',')
            this.$emit('selectValMultipleChild', this.option.QuestionAnswerInfo)
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