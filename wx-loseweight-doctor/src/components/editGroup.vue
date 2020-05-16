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
            <button class="yk-btn">确定</button>
        </div>

        <div class="footerEdit" v-show="type == 'edit'">
            <button class="yk-btn-del" @click="delTap">删除</button>
            <button class="yk-btn">确定</button>
        </div>
    </div>
</template>

<script>
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
                    this.$createToast({
                        type: 'Timeout',
                        time: 1000,
                        txt: '删除成功'
                    }).show()
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        }
    },
    created() {
        this.getParams()
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