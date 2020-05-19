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
                            :type="showPass ? 'text' : 'password'"
                            v-model.trim="loginModel.password"
                            placeholder="原密码"
                            maxlength="6"
                        />
                        <i
                            class="clear iconfont"
                            :class="showPass ? 'icon-kejian' : 'icon-bukejian'"
                            @click="showPass = !showPass"
                        ></i>
                    </div>
                    <div class="rel">
                        <input
                            class="input"
                            :type="showPassN ? 'text' : 'password'"
                            v-model.trim="loginModel.newPasswoed"
                            placeholder="新密码"
                            maxlength="6"
                        />
                        <i
                            class="clear iconfont"
                            :class="showPassN ? 'icon-kejian' : 'icon-bukejian'"
                            @click="showPassN = !showPassN"
                        ></i>
                    </div>
                </div>
                <button
                    :disabled="!isLogin"
                    class="loginBtn"
                    :class="isLogin ? 'loginSubmit' : 'loginDefault'"
                    @click.self="loginSubmit"
                >
                    确 定
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
import cellInput from '@/components/cellInput'
export default {
    name: 'editPwd',
    components: { cellInput },
    data() {
        return {
            loginModel: {
                password: '',
                newPasswoed: ''
            },
            showPass: false,
            showPassN: false
        }
    },
    computed: {
        //按钮
        isLogin() {
            return !!this.loginModel.password && !!this.loginModel.newPasswoed
        },
        disabled() {
            return (
                this.loginModel.password.length < 6 ||
                this.loginModel.newPasswoed.length < 6
            )
        }
    },
    methods: {
        loginSubmit() {
            if (this.loginModel.password == this.loginModel.newPasswoed) {
                yktoast('密码不能相同')
                return
            }
            var _this = this
            let url = this.api.userApi.ModifyPwd
            let data = {
                Phone: this.$route.query.phone,
                OldPwd: this.loginModel.password,
                NewPwd: this.loginModel.newPasswoed
            }
            this.$fetchPost(url, data, 153).then(response => {
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
