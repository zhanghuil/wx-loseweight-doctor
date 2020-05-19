<template>
    <div class="contenter">
        <div class="wx_cell">
            <div class="cell_bd">未来号</div>
            <div class="cell_ft">{{ doctorInfo.Code }}</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">姓名</div>
            <div class="cell_ft">{{ doctorInfo.Name }}</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">手机号</div>
            <div class="cell_ft">{{ doctorInfo.Phone }}</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">单位</div>
            <div class="cell_ft">{{ doctorInfo.HosName }}</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">身份</div>
            <div class="cell_ft">{{ doctorInfo.IdentityName }}</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">科室</div>
            <div class="cell_ft">{{ doctorInfo.DeptName }}</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">职称</div>
            <div class="cell_ft">{{ doctorInfo.JobName }}</div>
        </div>
        <div class="wx_cell" @click="pMailTap(doctorInfo.Email)">
            <div class="cell_bd">邮箱地址</div>
            <div class="cell_ft">
                <span :class="doctorInfo.Email ? 'c-3a' : 'c-a'">{{
                    doctorInfo.Email ? doctorInfo.Email : '去完善'
                }}</span>
                <i class="icon cubeic-arrow"></i>
            </div>
        </div>
        <div class="wx_cell mt10" @click="editPwd(doctorInfo.Phone)">
            <div class="cell_bd">密码修改</div>
            <div class="cell_ft">
                <i class="icon cubeic-arrow"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'myInfo',
    data() {
        return {
            doctorInfo: {}
        }
    },
    created() {
        this.getDoctorInfoNew()
    },
    methods: {
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
                    console.log(result.data)
                    _this.doctorInfo = result.data
                } else {
                    yktoast(result)
                }
            })
        },
        pMailTap(e) {
            this.$router.push({
                path: '/mailBox',
                query: { email: e }
            })
        },
        editPwd(e) {
            this.$router.push({
                path: '/editPwd',
                query: { phone: e }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.wx_cell {
    padding: 16px;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #3a3a3a;
    background: #fff;
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #f2f2f2;
        left: 16px;
    }
    .cell_bd {
        flex: 1;
    }
    .cell_ft {
        text-align: right;
        color: #333;
    }
}
</style>