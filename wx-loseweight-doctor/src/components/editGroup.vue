<template>
    <div class="p15">
        <div class="wrapper2">
            <p class="yk_tit">组名</p>
            <input
                type="text"
                placeholder="请输入（必填）"
                class="nameInput"
                v-model="name"
                maxlength="10"
            />
        </div>
        <div class="wrapper2">
            <p class="yk_tit">描述</p>
            <textarea
                rows="3"
                placeholder="请输入，不超过100字（选填）"
                class="textarea"
                v-model="desc"
                maxlength="100"
            ></textarea>
        </div>
        <div class="footerEdit" v-show="type == 'add'">
            <button class="yk-btn" @click="addGroup">确定</button>
        </div>

        <div class="footerEdit" v-show="type == 'edit'">
            <button class="yk-btn-del" @click="delTap">删除</button>
            <button class="yk-btn" @click="editTap">确定</button>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'editGroup',
    data() {
        return {
            name: '',
            desc: ''
        }
    },
    methods: {
        getParams() {
            this.type = this.$route.query.type
            this.id = this.$route.query.id
        },
        //获取患者组信息
        getPatientGroup() {
            if (this.$route.query.id == 0) return
            var _this = this
            let url = this.api.userApi.GetPatientGroup
            let data = {
                groupId: this.$route.query.id
            }
            this.$fetchGet(url, data, 4122).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.name = result.Name
                _this.desc = result.Description
            })
        },
        //添加组
        addGroup() {
            if (this.name == '') {
                yktoast('请填写组名')
                return
            }
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.AddPatientGroup
            let data = {
                Name: this.name,
                Description: this.desc,
                DoctorID: AccountId
            }
            this.$fetchPost(url, data, 4123).then(response => {
                let result = response.data.data //请求返回数据
                if (result) {
                    yktoast('添加成功')
                    _this.$router.go(-1)
                }
            })
        },
        //编辑组
        editTap() {
            if (this.name == '') {
                yktoast('请填写组名')
                return
            }
            var _this = this
            let url = this.api.userApi.EditPatientGroup
            let groupId = this.$route.query.id
            let data = {
                Name: this.name,
                Description: this.desc
            }
            this.$fetchPut(`${url}?groupId=${groupId}`, qs.stringify(data), 4124).then(
                response => {
                    let result = response.data.data //请求返回数据
                    if (!result) {
                        yktoast(result)
                        return
										}
										yktoast('修改成功')
                    _this.$router.go(-1)
                }
            )
        },
        //删除组
        delGroup() {
            var _this = this
            let url = this.api.userApi.DeletePatientGroup
            let data = {
                groupId: this.$route.query.id
            }
            this.$fetchDelete(url, data, 4125).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast('患者组已删除')
                    return
                }
                this.$createToast({
                    type: 'Timeout',
                    time: 1000,
                    txt: '删除成功'
                }).show()
                _this.$router.go(-1)
            })
        },
        delTap() {
            this.$createDialog({
                type: 'confirm',
                content: '删除该组别后组内患者将退出该组',
                confirmBtn: {
                    text: '确定',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    this.delGroup()
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        }
    },
    created() {
        this.getParams()
        this.getPatientGroup()
        if (this.$route.query.type == 'add') document.title = '添加组'
        else document.title = '编辑组'
    }
}
</script>

<style lang="less">
.nameInput {
    margin-top: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    color: #3a3a3a;
}
.textarea {
    font-family: PingFangSC-Regular;
    margin-top: 15px;
    border: none;
    padding: 11px 15px;
    background: #f8f9fa;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 21px;
    color: #3a3a3a;
}
</style>