<template>
    <div class="p15 pb70">
        <div class="groupList" v-if="list && list.length > 0">
            <!-- 组 -->
            <div
                v-for="(item, index) in list"
                :key="index"
                class="panelWrp p15 mb10"
                @click="editGroup(item.ID, 'edit', item.Name)"
            >
                <div class="f16 c-3a ellipsis">{{ item.Name }}</div>
            </div>
        </div>
        <div class="noPlanWrapper" v-else>
            <div class="noPlan">
                <img class="img" src="../assets/empty@2x.png" />
                <div class="f14 c-6d mt10">暂无相关模板</div>
            </div>
        </div>
        <div class="footerEdit">
            <button class="yk-btn w-100" @click="editGroup('', 'add', '')">
                添加
            </button>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'templateList',
    data() {
        return {
            list: []
        }
    },
    created() {
        document.title = this.$route.query.name
        this.getPatientWeightLossPlanTemplates()
    },
    methods: {
        getPatientWeightLossPlanTemplates() {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.GetPatientWeightLossPlanTemplates
            let data = {
                doctorId: AccountId,
                typeCode: this.$route.query.id
            }
            this.$fetchGet(url, data, 4121).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.list = result
            })
        },
        editGroup(id, type, name) {
            this.$router.push({
                path: '/editTemplate',
                query: {
                    id: id,
                    type: type,
                    typeCode: this.$route.query.id,
                    name: name
                }
            })
        }
    }
}
</script>

<style lang="less">
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.noPlanWrapper {
    // position: absolute;
    display: table;
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 50%;
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
</style>