<template>
    <div class="p15 pb70">
        <div class="groupList">
            <!-- 组 -->
            <div
                v-for="(item, index) in list"
                :key="index"
                class="panelWrp p15 mb10"
                @click="lookList(item.TypeCode, item.TypeName)"
            >
                <span class="f16 c-3a">{{ item.TypeName }}</span>
                <span class="f14 c-6d">（{{ item.TemplateCount }}）</span>
            </div>
        </div>
    </div>
</template>
<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'templateMag',
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getPatientWeightLossPlanTypes()
    },
    methods: {
        getPatientWeightLossPlanTypes() {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.GetPatientWeightLossPlanTypes
            let data = {
                doctorId: AccountId
            }
            this.$fetchGet(url, data, 4335).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.list = result
            })
        },
        lookList(id, name) {
            this.$router.push({
                path: '/templateList',
                query: { id: id, name: name }
            })
        }
    }
}
</script>
<style lang="less" scoped>
</style>