<template>
    <div class="px20 pt28">
        <div class="f16 c-3a">邮箱地址</div>
        <div>
            <cellInput
                clearable
                v-model="email"
                @clear="emailClear"
            ></cellInput>
        </div>
        <div class="footerEdit">
            <button
                :disabled="!isLogin"
                class="loginBtn"
                :class="isLogin ? 'loginSubmit' : 'loginDefault'"
                @click.self="submitTap"
            >
                确 定
            </button>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
import cellInput from '@/components/public/cellInput'
export default {
    name: 'mailBox',
    components: { cellInput },
    data() {
        return {
            email: ''
        }
    },
    computed: {
        //按钮
        isLogin() {
            return !!this.email
        }
    },
    created() {
        this.email = this.$route.query.email
    },
    methods: {
        emailClear() {
            this.email = ''
        },
        //邮箱格式校验
        checkEmail(email) {
            let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if (str.test(email)) {
                return true
            } else {
                return false
            }
        },
        submitTap() {
            let checkEmail = this.checkEmail(this.email)
            if (checkEmail != true) {
                this.$createToast({
                    txt: '邮箱格式不正确',
                    type: 'txt'
                }).show()
                return
            }

            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.EditEmail
            let data = {
                AccountId: AccountId,
                Email: this.email
            }
            this.$fetchPost(url, data, 174).then(response => {
                let result = response.data.data //请求返回数据
                if (result.status == 0) {
										yktoast(result.data)
										_this.$router.go(-1)
                } else {
                    yktoast(result.data)
                }
            })
        }
    },
    mounted() {
        document
            .querySelector('body')
            .setAttribute('style', 'background-color:#ffffff')
    },
    beforeDestroy() {
        document.querySelector('body').setAttribute('style', '')
    }
}
</script>

<style lang="less">
.loginBtn {
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 27px;
    height: 46px;
    font-size: 16px;
    &.loginSubmit {
        background: #6049f5;
        color: #fff;
    }
    &.loginDefault {
        background: #f9f8fd;
        color: #b4b5d9;
    }
}
</style>