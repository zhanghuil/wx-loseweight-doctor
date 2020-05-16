<template>
    <div class="loginBox">
        <div class="loginTop">
            <img src="../assets/logo.png" class="logo" />
            <div class="logoTxt">医学减重医生工作站</div>
        </div>
        <div class="loginCon">
            <div class="login-panel">
                <div class="cbInput">
                    <div class="rel">
                        <input
                            class="input"
                            type="tel"
                            v-model.trim="loginModel.phone"
                            placeholder="手机号"
                            @focus="focusShow"
                            maxlength="11"
                        />
                        <i
                            v-show="blurHidden"
                            class="clear cubeic-wrong"
                            @click="clearInput"
                        ></i>
                    </div>
                    <div class="rel">
                        <input
                            class="input"
                            type="tel"
                            v-model="loginModel.messageCode"
                            placeholder="验证码"
                            maxlength="4"
                        />
                        <button
                            :disabled="disabled"
                            :class="
                                !loginModel.phone ||
                                loginModel.phone.length < 11
                                    ? 'codeFnDe'
                                    : 'codeFnCl'
                            "
                            class="codeFn"
                            @click="codeFn"
                        >
                            {{ codeText }}
                        </button>
                    </div>
                    <div class="rel">
                        <input
                            class="input"
                            :type="showPass ? 'text' : 'password'"
                            v-model.trim="loginModel.password"
                            placeholder="密码"
                            @focus="focusShow"
                            maxlength="11"
                        />
                        <i
                            class="clear"
                            :class="showPass ? 'icon-kejian' : 'icon-bukejian'"
                            @click="showPass = !showPass"
                        ></i>
                    </div>
                </div>
                <button
                    :disabled="!isLogin"
                    class="loginBtn"
                    :class="isLogin ? 'loginSubmit' : 'loginDefault'"
                    @click.self="loginSubmit"
                >
                    登 录
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'forgetPwd',
    components: {},
    data() {
        return {
            countDown: '60',
            loginModel: {
                phone: '',
                messageCode: '',
                password: ''
            },
            blurHidden: false,
            blurHiddenPwd: false,
            showPass: false
        }
    },
    computed: {
        //登录按钮
        isLogin() {
            return (
                !!this.loginModel.phone &&
                !!this.loginModel.messageCode &&
                !!this.loginModel.password
            )
        },
        codeText() {
            if (this.countDown < 60) {
                return `${this.countDown}秒`
            } else {
                return '获取验证码'
            }
        },
        disabled() {
            return this.countDown != 60 || this.loginModel.phone.length < 11
        }
    },
    methods: {
        focusShow(i) {
            this.blurHidden = true
        },
        clearInput(i) {
            if (this.loginModel.phone) {
                this.loginModel.phone = ''
                this.loginModel.messageCode = ''
            }
        },
        codeFn() {
            alert('1')
            if (!this.loginModel.phone) {
                const toast = this.$createToast({
                    time: 1000,
                    txt: '手机号不能为空',
                    type: 'txt'
                })
                toast.show()
                // this.$myToast.error('手机号不能为空')
                return
            }
            //校验手机号格式
            if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.loginModel.phone)) {
                // this.$myToast.error('手机号格式不正确')
                return
            }
        },
        loginSubmit() {
            alert('tijiaola')
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

<style lang="less" scoped>
.loginBox {
    .loginTop {
        background: #f8f9fa;
        text-align: center;
        padding: 34px 0 38px;
        .logo {
            width: 40px;
            height: 40px;
        }
        .logoTxt {
            border: 0 solid #525481;
            font-family: Helvetica;
            font-size: 19px;
            color: #525481;
            letter-spacing: -1px;
            text-align: center;
            margin-top: 7px;
        }
    }
    .loginCon {
        padding: 36px;
        .nav_tab {
            display: flex;
            font-size: 16px;
            color: #aaaaaa;
            .navBarItem {
                padding-bottom: 5px;
                margin-right: 30px;
                &.on {
                    font-weight: bold;
                    color: #7362f5;
                    border-bottom: 2px solid #7362f5;
                }
            }
        }
        .login-panel {
            .input {
                width: 100%;
                display: block;
                font-size: 20px;
                color: #3a3a3a;
                border-bottom: 1px solid #d8d8e4;
                margin-top: 24px;
                padding-bottom: 2px;
                outline: none;
                &.pointEventNone {
                    pointer-events: none;
                    background: none;
                }
                &:focus {
                    border-bottom: 1px solid #6049f5;
                }
            }
            .clear {
                position: absolute;
                color: #aaaaaa;
                right: 10px;
                bottom: 6px;
                font-size: 18px;
                // &.icon-bukejian {
                //     color: #6049f5;
                // }
            }
            .codeFn {
                position: absolute;
                right: 10px;
                top: 0;
                background: none;
                border: none;
                font-size: 14px;
                &::before {
                    content: '';
                    position: absolute;
                    left: -12px;
                    top: 4px;
                    background: #dde5ed;
                    width: 1px;
                    height: 14px;
                }
                &.codeFnDe {
                    color: #d8d8d8;
                }
                &.codeFnCl {
                    color: #7574f5;
                }
            }
            .loginBtn {
                border: none;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 27px;
                height: 46px;
                font-size: 16px;
                margin-top: 50px;
                &.loginSubmit {
                    background: #6049f5;
                    color: #fff;
                }
                &.loginDefault {
                    background: #f9f8fd;
                    color: #b4b5d9;
                }
            }
            .forgetPwd {
                margin-top: 19px;
                font-size: 14px;
                color: #6049f5;
                .icon {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
