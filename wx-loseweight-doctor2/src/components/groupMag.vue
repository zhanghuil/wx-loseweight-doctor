<template>
    <div class="p15 pb70">
        <div class="groupList" v-if="list && list.length > 0">
            <!-- 组 -->
            <div
                v-for="(item, index) in list"
                :key="index"
                class="panelWrp p15 mb10"
                @click="editGroup(item.GroupID, 'edit')"
            >
                <span class="f16 c-3a">{{ item.GroupName }}</span>
                <span class="f14 c-6d">（{{ item.PatientCount }}）</span>
            </div>
        </div>
        <div class="noPlanWrapper" v-else>
            <div class="noPlan">
                <img class="img" src="../assets/empty@2x.png" />
                <div class="f14 c-6d mt10">暂无相关患者组</div>
            </div>
        </div>
        <div class="footerEdit">
            <button class="yk-btn w-100" @click="editGroup(0, 'add')">
                添加
            </button>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'groupMag',
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getPatientGroups()
    },
    methods: {
        getPatientGroups() {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.GetPatientGroups
            let data = {
                doctorId: AccountId
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
        editGroup(id, type) {
            this.$router.push({
                path: '/editGroup',
                query: { id: id, type: type }
            })
        }
    }
}
</script>

<style lang="less">
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