<template>
    <div class="p15">
        <div class="groupList">
            <Options
                :options="checkedList"
                :isMultiply="true"
								:isRight="true"
                @toparents="childByValueGroup"
            ></Options>
        </div>
        <div class="footerEdit">
            <button class="yk-btn w-100">确定</button>
        </div>
    </div>
</template>

<script>
import Options from '@/components/options'
export default {
    name: 'patientGroup',
    components: { Options },
    data() {
        return {
            checkedList: [
                {
                    label: '高蛋白组',
                    num: 10,
                    value: 1,
                    checked: true
                },
                {
                    label: '轻断食组',
                    num: 20,
                    value: 2,
                    checked: false
                }
            ]
        }
    },
    created() {
        document.title = this.$route.query.userName
        // this.getParams()
    },
    methods: {
        getParams() {
            this.userName = this.$route.query.userName
            this.userId = this.$route.query.userId
        },
        childByValueGroup(childValue) {
					// debugger
            // childValue就是子组件传过来的值
            console.log(childValue)
            // debugger  checkedVal
            let val = childValue
        }
    },
}
</script>

<style lang="less">
.groupList {
    font-size: 16px;
    color: #3a3a3a;
    .chooser-list li {
        background: #ffffff;
        padding: 15px;
        .num {
            font-size: 14px;
            color: #6d6d6d;
        }
    }
}

</style>