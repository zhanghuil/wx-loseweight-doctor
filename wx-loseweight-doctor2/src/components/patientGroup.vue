<template>
    <div class="p15 pb70">
        <div class="groupList">
            <Options
                :options="checkedList"
                :selectPatientGroup="selectPatientGroup"
                :isMultiply="true"
                :isRight="true"
                @toparents="childByValueGroup"
            ></Options>
        </div>
        <div class="footerEdit">
            <button class="yk-btn w-100" @click="setGroup">确定</button>
        </div>
    </div>
</template>

<script>
import Options from '@/components/public/options'
import qs from 'qs'
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'patientGroup',
    components: { Options },
    data() {
        return {
            checkedList: [], //医生下的患者组
            selGroupId: '', //选择的组
            selectPatientGroup: [] //患者所属组
        }
    },
    created() {
        document.title = this.$route.query.userName
        this.getPatientGroups()
    },
    methods: {
        //设置患者的分组
        setGroup() {
						if(!this.selGroupId) return
            var _this = this
            let url = this.api.userApi.SetJZMZPatientGroup
            let patientId = this.$route.query.userId
            let data = {
                Value: this.selGroupId
            }
            this.$fetchPut(
                `${url}?patientId=${patientId}`,
                qs.stringify(data),
                4113
            ).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('更新失败，请稍后重试')
                    return
                }
                yktoast('更新成功')
                _this.$router.go(-1)
            })
        },
        //获取医生下患者组
        getPatientGroups() {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.GetPatientGroups
            let data = {
                doctorId: this.$route.query.doctorId
            }
            this.$fetchGet(url, data, 4121).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                result.forEach(v => {
                    v.checked = false
                })
                _this.checkedList = result

                let _patientGroup = storage.getObjItem('patientGroup')
                _patientGroup.forEach(e => {
                    let group = result.find(n => n.GroupID == e.ID)
                    if (group) {
                        _this.selectPatientGroup.push(group)
                        let selMap = _this.selectPatientGroup.map(item => item.GroupID)
                        _this.selGroupId = selMap.join(',')
                    }
                })
                console.log(_this.selectPatientGroup)
            })
        },
        childByValueGroup(childValue) {
            // childValue就是子组件传过来的值
            console.log(childValue)
            let selMap = childValue.map(item => item.GroupID)
            this.selGroupId = selMap.join(',')
        }
    }
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